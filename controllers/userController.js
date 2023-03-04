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

    res.sendStatus(204);
};

// Handle user login.
export const userLogin = (req, res, next) => {

};
