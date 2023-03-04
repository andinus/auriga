import db from '../utils/db.js';

const conn = db();

// Renders the user dashboard.
export const userDashboard = (req, res, next) => {
    return res.render('dashboard', { email: req.session.email });
};
