import db from '../utils/db.js';

const conn = db();

// Renders the user dashboard.
export const userDashboard = (req, res, next) => {
    const stmt = conn.prepare(
        'SELECT name, description, theme, published FROM ngo_detail WHERE ngo_id = ?'
    );
    const acct = stmt.get(req.session.user);
    console.log(acct)
    return res.render('dashboard', acct);
};
