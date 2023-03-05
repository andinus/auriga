import db from '../utils/db.js';
const conn = db();

import fetch from 'node-fetch';

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
        'SELECT ngo_id, notif FROM ngo_detail WHERE name = ?;'
    );
    const id = stmtId.get(req.params.name);

    const b = req.body;
    const stmt = conn.prepare(
        'INSERT INTO ngo_volunteer (ngo_id, name, phone, email, introduction) VALUES (?, ?, ?, ?, ?);'
    );
    stmt.run(id.ngo_id, b.name, b.phone, b.email, b.introduction);

    fetch('https://ntfy.sh/' + id.notif, {
        method: 'POST', // PUT works too
        body: 'New Volunteer: ' + b.name + ' | ' + b.phone
    })
    fetch('https://ntfy.envs.net/' + id.notif, {
        method: 'POST', // PUT works too
        body: 'New Volunteer: ' + b.name + ' | ' + b.phone
    })

    res.redirect('/ngo/' + req.params.name)
};
