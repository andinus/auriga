import db from '../utils/db.js';

import bcrypt from 'bcrypt';
const saltRounds = 10; // Goes through 2^rounds of processing.

const conn = db();

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
            const b = req.body;
            const stmt = conn.prepare(
                'INSERT INTO account (email, password, ngo_name) VALUES (?, ?, ?);'
            );
            stmt.run(b.email, hashedPassword, b.ngoName);
        }
    });

    let alert = {
        message: "Registration Successful",
        classes: "alert-success"
    };
    return res.render('login', {alert});
};

// Handle user login.
export const userLogin = (req, res, next) => {
    // regenerate the session, which is good practice to help
    // guard against forms of session fixation.
    req.session.regenerate((err) => {
        if (err) next(err);

        const stmt = conn.prepare('SELECT password FROM account WHERE email = ?');
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
            req.session.email = req.body.email;

            // save the session before redirection to ensure page.
            // load does not happen before session is saved.
            req.session.save(function (err) {
                if (err) return next(err);
                res.redirect('/dashboard');
            });
        });
    });
};
