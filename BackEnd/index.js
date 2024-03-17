const express = require('express')
const app = express()
const port = 8080
const connectDB = require('./config/db')
const cors = require('cors')
const passport = require('passport');
const session = require('express-session');
const { initializePassport, initializeJWT } = require('./passport-config');
const { isAuth } = require('./common')

connectDB();

const SECRET_KEY = 'SECRET_KEY';

initializePassport(passport);
initializeJWT(passport);

app.use(
    session({
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

app.use(express.json());
app.use(cors());

app.use('/products', isAuth(), require('./routes/Product'));
app.use('/categories', isAuth(), require('./routes/Categories'));
app.use('/brands', isAuth(), require('./routes/Brands'));
app.use('/cart', isAuth(), require('./routes/Cart'));
app.use('/users', isAuth(), require('./routes/User'));
app.use('/auth', require('./routes/Auth'));
app.use('/orders', isAuth(), require('./routes/Order'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})