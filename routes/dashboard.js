import ejs from 'ejs';
import Router from 'express-promise-router';

const router = new Router();
export default router;

import { isLoggedIn } from '../middlewares/authentication.js'

import * as controller from '../controllers/dashboardController.js';

// GET routes for authentication.
router.get('/dashboard', isLoggedIn, controller.userDashboard);
