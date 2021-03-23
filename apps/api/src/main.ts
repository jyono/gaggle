// import * as express from 'express';
// import { Message } from '@gaggle/api-interfaces';
// const Message = require('@gaggle/api-interfaces')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const app = express();

// database
const db = require("./app/models/index_db");
db.USERS.sync();

//cors
var corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//session
// app.use(
//   session({
//     secret: 'my secret',
//     resave: false,
//     saveUninitialized: false,
//     store: store
//   })
// );

// csrf
// const csrfProtection = csrf();
// app.use(csrfProtection);
// app.use(flash());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.post("/user", (req, res) => {
  res.json({ message: "edc"
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});










// const greeting: Message = { message: 'Welcome to api!' };

// app.get('/api', (req, res) => {
//   res.send(greeting);
// });

// const port = process.env.port || 4000;
// const server = app.listen(port, () => {
//   console.log('Listening at http://localhost:' + port + '/api');
// });
// server.on('error', console.error);




