// Check if the user is logged in.
export const isLoggedIn = async (req, res, next) => {
    if (req.session.email)
        next();
    else {
        let alert = {
            message: "Login to continue",
            classes: "alert-danger"
        };
        return res.render('login', {alert});
        // res.sendStatus(401);
    }
};
