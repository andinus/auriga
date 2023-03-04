import ejs from 'ejs';
import Router from 'express-promise-router';

const router = new Router();
export default router;

import checkRequiredBody from '../middlewares/checkRequiredBody.js';4

import * as controller from '../controllers/userController.js';

// GET routes for authentication.
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

// POST route for user login.
router.post(
    '/login',
    checkRequiredBody(["password", "email"]),
    controller.userLogin
);


// POST route for user registration.
router.post(
    '/register',
    checkRequiredBody(["password", "ngoName", "email"]),
    controller.userRegister
);
