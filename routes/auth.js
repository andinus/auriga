import ejs from 'ejs';
import Router from 'express-promise-router';

const router = new Router();
export default router;

import { isLoggedIn } from '../middlewares/authentication.js'
import checkRequiredBody from '../middlewares/checkRequiredBody.js';4

import * as controller from '../controllers/userController.js';

// GET routes for authentication.
router.get('/login', (req, res) => {
    let alert;
    let status = 200;

    if (req.query.logout === '')
        alert = {
            message: "Logged out",
            classes: "alert-success"
        };
    else if (req.query.authRequired === '') {
        status = 401;
        alert = {
            message: "Login to continue",
            classes: "alert-danger"
        };
    } else if (req.query.registerSuccess === '')
        alert = {
            message: "Registration Successful",
            classes: "alert-success"
        };

    res.render('login', {alert})
});
router.get('/register', (req, res) => res.render('register'));

// GET route for user logout.
router.get(
    '/logout', isLoggedIn, controller.userLogout
);

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

// POST request to update ngo details.
router.post(
    '/detail',
    isLoggedIn,
    checkRequiredBody(["description", "ngoName", "theme"]),
    controller.updateDetail
);
