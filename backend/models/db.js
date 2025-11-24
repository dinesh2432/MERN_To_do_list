const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo_list')
    .then(() => console.log("MongoDB connected successfully"))
    .catch(() => console.log("Error connecting to MongoDB"));

module.exports = mongoose;
