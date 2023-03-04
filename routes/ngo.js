import ejs from 'ejs';
import Router from 'express-promise-router';

const router = new Router();
export default router;

import { isLoggedIn } from '../middlewares/authentication.js'
import { isPageViewable } from '../middlewares/ngo.js'

import * as controller from '../controllers/ngoController.js';

// GET request to generate an NGO's landing page.
router.get('/ngo/:name', isPageViewable, controller.renderLanding);
