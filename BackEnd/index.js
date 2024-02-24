const express = require('express')
const app = express()
const port = 8080
const connectDB = require('./config/db')
const cors = require('cors')

connectDB();

app.use(express.json());
app.use(cors());
app.use('/products', require('./routes/Product'));
app.use('/categories', require('./routes/Categories'));
app.use('/brands', require('./routes/Brands'));
app.use('/cart', require('./routes/Cart'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})