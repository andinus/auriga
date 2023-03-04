import ejs from 'ejs';
import Router from 'express-promise-router';

const router = new Router();
export default router;

// import * as controller from '../controllers/userController.js';

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});
