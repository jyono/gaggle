// import * as express from 'express';
// import { Message } from '@gaggle/api-interfaces';
// const Message = require('@gaggle/api-interfaces')
const bcrypt = require('bcrypt');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
var Sequelize = require("sequelize");
const flash = require('connect-flash');
const app = express();
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbConfig = require("apps/api/src/app/db.config.js");
const sessionAuth = require("apps/api/src/app/models/auth.js");

// database
const db_pos = require("./app/models/index_db");
db_pos.USERS.sync({alter: true});

// save session to the  
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
});

var myStore = new SequelizeStore({
  db: sequelize,
});



//cors
// var corsOptions = {
//   // credentials: 'true',
//   origin: "http://localhost:3000"
// };
app.use(cors());

//cookie
app.use(cookieParser());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// csrf
// const csrfProtection = csrf();
// app.use(csrfProtection);
// app.use(flash());
app.use(
  session({
    secret: "keyboard cat",
    store: myStore,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
  })
);
myStore.sync();


app.use('/', function(req, res, next){
 next();
});

// sign up
app.post('/api/signUp', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

        (async () => {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);
          const newUser = db_pos.USERS.create({ firstName: firstName,lastName: lastName, email: email, password: hash })
          .then(function(user) {
          // you can now access the newly created user
          res.send({toProfile: true});
          console.log('success', user.toJSON());
          })
          .catch(function(err) {
          // print the error details
          res.send({redirectToSignIn: true})
          console.log(err, req.body.email);
          });
        })();

});

app.post('/api/signIn', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  (async () => {
    const user = await db_pos.USERS.findByPk(email);
    if (user === null) {
      res.send({user: "none"});
      console.log('Not found!');
    } else if (bcrypt.compare(password, user.password)) {
      sessionAuth(req, email);
      res.cookie('name', user.firstName);
      res.send({user: user.firstName});
      console.log("This user is " + user.firstName);
      console.log("This user is " + user.email);
      console.log(req.session);
      console.log(user);
    } else {
      console.log("error");
    }
  })();

});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});





