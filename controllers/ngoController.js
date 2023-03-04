import db from '../utils/db.js';

const conn = db();

// Renders NGO's landing page.
export const renderLanding = (req, res, next) => {
    let template = 'theme/multipage/index';

    const stmt = conn.prepare(
        'SELECT name, description, theme FROM ngo_detail WHERE name = ?'
    );
    const detail = stmt.get(req.params.name);
    console.log(detail);

    return res.render(template, {detail});
};

// Adds event to table.
export const eventCreate = (req, res, next) => {
    const b = req.body;
    const stmt = conn.prepare(
        'INSERT INTO ngo_event (ngo_id, name, description, starts, ends) VALUES (?, ?, ?, ?, ?);'
    );
    stmt.run(req.session.user, b.name, b.description, b.starts, b.ends);
    res.redirect('/events?created')
};
