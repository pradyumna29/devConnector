const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./Routes/api/users');
const profile = require('./Routes/api/profile');
const posts = require('./Routes/api/posts');

const app = express();

// bodyparser middleware

app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongoose
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//Pass port middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Use routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
