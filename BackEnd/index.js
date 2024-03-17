const express = require('express')
const app = express()
const port = 8080
const connectDB = require('./config/db')
const cors = require('cors')
const passport = require('passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { initializePassport, initializeJWT } = require('./passport-config');

connectDB();

const SECRET_KEY = 'SECRET_KEY';


//JWT
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

initializePassport(passport);
initializeJWT(passport, opts);

app.use(
    session({
        secret: 'keyboard cat',
        resave: false, // don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));


app.use(express.json());
app.use(cors());


app.use('/products', require('./routes/Product'));
app.use('/categories', require('./routes/Categories'));
app.use('/brands', require('./routes/Brands'));
app.use('/cart', require('./routes/Cart'));
app.use('/users', require('./routes/User'));
app.use('/auth', require('./routes/Auth'));
app.use('/orders', require('./routes/Order'));

// //Passport Startegies
// passport.use(new LocalStrategy(
//     async(username, password, done) => {
//         console.log("inside passowrd---------------")
//         try {
//             const user = await User.findOne({ email: username }).exec();
//             console.log("========user", user)
//             if (user) {
//                 if (password === user.password) {
//                     done(null, { id: user.id, role: user.role })
//                 } else {
//                     done(null, false, { message: "Invalid Credentials" })
//                 }
//             } else {
//                 done(null, false, { message: "Invalid Credentials" })
//             }
//         } catch (err) {
//             done(err)
//         }
//     }
// ));

// passport.serializeUser(function (user, cb) {
//     process.nextTick(function () {
//         return cb(null, 
//             { id: user.id, role: user.role }
//         );
//     });
// });

// passport.deserializeUser(function (user, cb) {
//     process.nextTick(function () {
//         return cb(null, user);
//     });
// });



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})