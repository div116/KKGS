const LocalStrategy = require('passport-local').Strategy
const { User } = require('./models/User')
const crypto = require('crypto')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const initializePassport = (passport) => {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email })
            crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async (err, hashedPassword) => {        
                if (user == null) {
                    return done(null, false, { message: "No user with that email" })
                }
                else if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                    return done(null, false, { message: "Invalid Credentials" })   
                } else {
                    return done(null, user)
                }
            })         
        } catch (error) {
            return done(error)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => {
        done(null, { id: user.id, role: user.role })
    })
    passport.deserializeUser((user, done) => {
        User.findById(user.id).then((user) => {
            return done(null, user)
        }).catch((err) => {
            return done(err, null)
        })
    })
}

const initializeJWT = (passport, opts) => {
    try {
        passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
            console.log("================jwt payload", {jwt_payload})
            User.findOne({id: jwt_payload.sub}, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
        }));
    } catch (error) {
        
    }
}

module.exports = {
    initializePassport,
    initializeJWT
}