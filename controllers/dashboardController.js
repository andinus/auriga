import db from '../utils/db.js';

const conn = db();

// Renders the user dashboard.
export const userDashboard = (req, res, next) => {
    const stmt = conn.prepare(
        'SELECT name, image, description, theme, publish, phone, notif, upi FROM ngo_detail WHERE ngo_id = ?'
    );
    const acct = stmt.get(req.session.user);

    let alert;
    if (req.query.updated === '')
        alert = {
            message: "Details updated",
            classes: "alert-success"
        };
    return res.render('dashboard', {acct, alert});
};
