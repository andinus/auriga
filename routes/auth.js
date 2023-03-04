import Router from 'express-promise-router';
import ejs from 'ejs';

const router = new Router();
export default router;

// import * as controller from '../controllers/userController.js';

router.get('/login', (req, res) => {
    res.render('index', {foo: 'FOO'});
});
