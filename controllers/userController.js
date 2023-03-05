import db from '../utils/db.js';

import crypto from 'crypto';

import bcrypt from 'bcrypt';
const saltRounds = 10; // Goes through 2^rounds of processing.

const conn = db();

// Update detail will update the details.
export const updateDetail = (req, res, next) => {
    const b = req.body;
    const detail = conn.prepare(
        'UPDATE ngo_detail SET name = ?, description = ?, theme = ?, publish = ?, phone = ?, image = ?, upi = ? WHERE ngo_id = ?;'
    );
    detail.run(b.ngoName, b.description, b.theme, b.publish === 'on' ? 1 : 0 , b.phone, b.image, b.upi, req.session.user);
    res.redirect('/dashboard?updated');
};

// Handle user logout.
export const userLogout = (req, res, next) => {
    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user.
    req.session.email = null;
    req.session.save(function (err) {
        if (err) next(err);

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation.
        req.session.regenerate(function (err) {
            if (err) next(err);

            res.redirect('/login?logout');
        });
    });
};

// Handle user registration.
export const userRegister = (req, res, next) => {
    // bcrypt only uses first 72 bytes.
    if (!(typeof(req.body.password) === 'string'))
        return res.status(400).send('Password type invalid.');

    const byteLength = Buffer.byteLength(req.body.password, 'utf8');
    if (6 > byteLength || byteLength > 72)
        return res.status(400).send(
            'Invalid Password. Should be between 6 to 72 bytes.'
        );

    // Hash the password before storing.
    bcrypt.hash(req.body.password, saltRounds, async (err, hashedPassword) => {
        if (err)
            next(err);
        else {
            // !!! We should use transactions here !!!
            const b = req.body;
            const account = conn.prepare(
                'INSERT INTO account (email, password) VALUES (?, ?);'
            );
            const accountInfo = account.run(b.email, hashedPassword);

            const detail = conn.prepare(
                'INSERT INTO ngo_detail (ngo_id, name, notif) VALUES (?, ?, ?);'
            );
            detail.run(accountInfo.lastInsertRowid, b.ngoName, 'auriga-' + crypto.randomBytes(8).toString('hex'));

            res.redirect('/login?registerSuccess');
        }
    });
};

// Handle user login.
export const userLogin = (req, res, next) => {
    // regenerate the session, which is good practice to help
    // guard against forms of session fixation.
    req.session.regenerate((err) => {
        if (err) next(err);

        const stmt = conn.prepare('SELECT id, email, password FROM account WHERE email = ?');
        const acct = stmt.get(req.body.email);

        // No account exists.
        if (acct === undefined) {
            let alert = {
                message: "Account doesn't exist",
                classes: "alert-danger"
            };
            return res.render('login', {alert});
        }

        // Compare the password with stored hash.
        bcrypt.compare(req.body.password, acct.password, (err, result) => {
            if (err) next(err);

            // Incorrect password.
            if (!result) {
                let alert = {
                    message: "Incorrect Password",
                    classes: "alert-danger"
                };
                return res.render('login', {alert});
            }

            // store user information in session, typically a user id.
            req.session.user = acct.id;
            req.session.email = acct.email;

            // save the session before redirection to ensure page.
            // load does not happen before session is saved.
            req.session.save(function (err) {
                if (err) return next(err);
                res.redirect('/dashboard');
            });
        });
    });
};
