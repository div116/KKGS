const LocalStrategy = require('passport-local').Strategy
const { User } = require('./models/User')
const crypto = require('crypto')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const passport = require('passport');

const SECRET_KEY = 'SECRET_KEY';

const initializePassport = (passport) => {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email })
            crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
                if (user == null) {
                    return done(null, false, { message: "No user with that email" });
                }
                else if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                    return done(null, false, { message: "Invalid Credentials" });
                } else {
                    const token = jwt.sign({ id: data.id, email: data.email, role: data.role }, SECRET_KEY);
                    return done(null, token);
                }
            })
        } catch (error) {
            return done(error);
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
}

const initializeJWT = (passport) => {
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = SECRET_KEY;
    try {
        passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id).then((user) => {
                if (user) {
                    return done(null, user); //calls serializer
                } else {
                    return done(null, false);
                }
            }).catch((error) => {
                return done(error, false);
            });
        }));
    } catch (error) {
        return done(error, false);
    }
}

passport.serializeUser((user, done) => {
    done(null, { id: user.id, role: user.role })
});

passport.deserializeUser((user, done) => {
    User.findById(user.id).then((user) => {
        return done(null, user)
    }).catch((err) => {
        return done(err, null)
    })
});

module.exports = {
    initializePassport,
    initializeJWT
}