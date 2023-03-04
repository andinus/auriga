import auth from './auth.js';
import dashboard from './dashboard.js';
import events from './events.js';

import express from 'express';

export const mountRoutes = app => {
    app.set('view engine', 'ejs');

    // Resources.
    app.use('/resources', express.static('resources'));

    for (const r of [auth, dashboard, events])
        app.use(r);

    // Custom 404.
    app.use((req, res, next) => res.sendStatus(404));
};
