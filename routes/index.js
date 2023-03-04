import auth from './auth.js';

export const mountRoutes = app => {
    app.set('view engine', 'ejs');

    for (const r of [auth])
        app.use(r);

    // Custom 404.
    app.use((req, res, next) => res.sendStatus(404));
};
