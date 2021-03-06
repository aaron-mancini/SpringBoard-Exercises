const Router = require("express").Router;
const router = new Router();
const User = require("../models/user");
const ExpressError = require("../expressError");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post("/login", async function(req, res, next) {
    try {
        const { username, password } = req.body;
        if (await User.authenticate(username, password)) {
            User.updateLoginTimestamp(username);
            let token = jwt.sign({ username }, SECRET_KEY);
            return res.json({ token });
        }
        throw new ExpressError("Invalid user/password", 400);
    } catch (err) {
        return next(err);
    }
});


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post("/register", async function(req, res, next) {
    try {
        const { username, password, first_name, last_name, phone } = req.body;
        await User.register(username, password, first_name, last_name, phone);
        let token = jwt.sign({username}, SECRET_KEY);
        User.updateLoginTimestamp(username);
        return res.json({token});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;