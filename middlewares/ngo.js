import db from '../utils/db.js';
const conn = db();

// Check is page is viewable.
export const isPageViewable = async (req, res, next) => {
    const stmt = conn.prepare('SELECT publish FROM ngo_detail WHERE name = ?');
    const detail = stmt.get(req.params.name);

    if (detail?.publish)
        next();
    else
        res.sendStatus(404);
};
