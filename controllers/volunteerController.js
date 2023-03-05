import db from '../utils/db.js';

const conn = db();

export const volunteerList = (req, res, next) => {
    const stmt = conn.prepare(
        'SELECT name, phone, email, introduction FROM ngo_volunteer WHERE ngo_id = ?'
    );
    const volunteers = stmt.all(req.session.user);
    console.log(volunteers)

    return res.render('volunteer', {volunteers});
};

// For uesrs.
export const volunteerCreate = (req, res, next) => {
    const stmtId = conn.prepare(
        'SELECT ngo_id FROM ngo_detail WHERE name = ?;'
    );
    const id = stmtId.get(req.params.name);
    console.log(id);
    const b = req.body;
    const stmt = conn.prepare(
        'INSERT INTO ngo_volunteer (ngo_id, name, phone, email, introduction) VALUES (?, ?, ?, ?, ?);'
    );
    stmt.run(id.ngo_id, b.name, b.phone, b.email, b.introduction);
    res.redirect('/ngo/' + req.params.name)
};
