require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use(require('./middleware/authJwt'));
app.use('/api/user', require("./routes/user"))
app.use('api/card', require('./routes/card'))

mongoose.connect(process.env.database_url);
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});