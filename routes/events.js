import ejs from 'ejs';
import Router from 'express-promise-router';

const router = new Router();
export default router;

import { isLoggedIn } from '../middlewares/authentication.js'

import * as controller from '../controllers/eventsController.js';

// GET routes for list of events.
router.get('/events', isLoggedIn, controller.eventList);

// POST route to create a new event.
router.post('/event', isLoggedIn, controller.eventCreate);

// GET routes to delete an event.
router.get('/event/delete/:name', isLoggedIn, controller.eventDelete);
