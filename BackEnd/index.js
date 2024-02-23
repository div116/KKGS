const express = require('express')
const app = express()
const port = 8080
const connectDB = require('./config/db')

connectDB();

app.use(express.json());

app.use('/', require('./routes/Product'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})