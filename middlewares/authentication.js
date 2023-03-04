// Check if the user is logged in.
export const isLoggedIn = async (req, res, next) => {
    if (req.session.email)
        next();
    else
        res.redirect('/login?authRequired');
        // res.sendStatus(401);
};
