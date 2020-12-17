const express = require('express');
const mongoose = require('mongoose');

const users= require('./Routes/api/users');
const profile= require('./Routes/api/profile');
const posts= require('./Routes/api/posts');

const app= express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongoose
mongoose
    .connect(db,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(()=> console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res)=>res.send('Hello World'));

//Use routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.port || 5000;

app.listen(port, ()=> console.log(`Server running on port ${port}`));
