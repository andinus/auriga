import db from '../utils/db.js';
const conn = db();

// Renders the events page.
export const eventList = (req, res, next) => {
    const stmt = conn.prepare(
        'SELECT name, description, starts, ends FROM ngo_event WHERE ngo_id = ?'
    );
    const events = stmt.all(req.session.user);
    console.log(events)

    let alert;
    if (req.query.created === '')
        alert = {
            message: "Event added successfully",
            classes: "alert-success"
        };

    return res.render('events', {alert, events});
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

export const eventDelete = (req, res, next) => {
    const stmt = conn.prepare(
        'DELETE FROM ngo_event WHERE name = ?;'
    );
    stmt.run(req.params.name);

    res.redirect('/events')
};
