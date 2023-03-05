import ejs from 'ejs';
import Router from 'express-promise-router';

const router = new Router();
export default router;

import { isLoggedIn } from '../middlewares/authentication.js'
import { isPageViewable, isThemeMultipage } from '../middlewares/ngo.js'

import * as controller from '../controllers/volunteerController.js';

// GET routes for list of volunteer.
router.get('/volunteers', isLoggedIn, controller.volunteerList);

// POST route to create a new event.
router.post('/ngo/:name/volunteer', isPageViewable, controller.volunteerCreate);
