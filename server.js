const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/user', require("./routes/user"))

mongoose.connect('mongodb+srv://gmunson:dOVZZKwElBGG7ndd@cluster0-t0tne.mongodb.net/soccer?retryWrites=true&w=majority');
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});