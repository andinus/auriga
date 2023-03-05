import ejs from 'ejs';
import Router from 'express-promise-router';

const router = new Router();
export default router;

import { isLoggedIn } from '../middlewares/authentication.js'
import { isPageViewable, isThemeMultipage } from '../middlewares/ngo.js'

import * as controller from '../controllers/ngoController.js';

// GET request to generate an NGO's landing page.
router.get('/ngo/:name', isPageViewable, controller.renderLanding);

// GET request to generate an NGO's events page.
router.get(
    '/ngo/:name/events', isPageViewable, isThemeMultipage,
    controller.renderEventPage
);

// GET request to return NGO's background.
// router.get('/ngo/:name/background', isPageViewable, (req, res) => res.redirect('https://images.unsplash.com/flagged/photo-1567116681178-c326fa4e2c8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'));
// router.get('/ngo/:name/background', isPageViewable, controller.redirectToImage (req, res) => res.redirect('https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1475&q=80'));
