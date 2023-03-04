import morgan from 'morgan';
import express from 'express';
import expressSession from 'express-session';

const app = express();
app.set('x-powered-by', false);
app.set('strict routing', true);
app.set('trust proxy', 1); // trust first proxy

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Some logging to STDOUT.
app.use(morgan(':remote-addr [:date[clf]] :method :url :status :response-time ms :res[content-length]'));

// Development mode.
if (process.env.DEVELOPMENT === undefined && process.env.NODE_ENV !== "production")
    console.warn("[!!!] Set the environment variable NODE_ENV to production, to run the app in production mode.");

// Mount the routes.
import {mountRoutes} from './routes/index.js';
mountRoutes(app);

const port = 3000;
const server = app.listen(port, () => {
    console.log(`[...] Server started on port ${port}.`);
});

process.on('SIGTERM', () => {
    server.close(() => console.log('[!!!] Process terminated.'));
});
