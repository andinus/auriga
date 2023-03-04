import ejs from 'ejs';
import Router from 'express-promise-router';

const router = new Router();
export default router;

import { isLoggedIn } from '../middlewares/authentication.js'

// import * as controller from '../controllers/eventsController.js';

// GET routes for list of events.
// router.get('/events', isLoggedIn, controller.eventsList);
router.get('/events', (req, res) => res.render('events'));
