const passport = require('passport');

const isAuth = (req, res, done) => {
   return passport.authenticate('jwt');
}

module.exports = { isAuth }