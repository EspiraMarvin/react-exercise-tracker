const express = require('express');
// for cross site scripting
const cors = require('cors');
const mongoose = require('mongoose');

//configures to have environment variables in the .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //allows us to parse json

const uri = process.env.DB_CONNECT;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongoose database connection successful');
});


const exercisesRouter =  require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//starts server
app.listen(port, () => {
   console.log(`Server is running on port: ${port}`);
});
