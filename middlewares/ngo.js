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

// Check is page is multipage, if not then simply redirect to single
// page.
export const isThemeMultipage = async (req, res, next) => {
    const stmt = conn.prepare('SELECT theme FROM ngo_detail WHERE name = ?');
    const detail = stmt.get(req.params.name);

    if (detail?.theme === 'multipage')
        next();
    else
        res.redirect(`/ngo/${req.params.name}`);
};
