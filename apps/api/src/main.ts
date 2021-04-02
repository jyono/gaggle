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
var corsOptions = {
  // credentials: 'true',
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

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
  // if (req.session.views) {
  //   req.session.views++
  //   res.setHeader('Content-Type', 'text/html')
  //   res.write('<p>views: ' + req.session.views + '</p>')
  //   res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
  //   res.end()
  // } else {
  //   req.session.views = 1
  //   res.end('welcome to the session demo. refresh!')
  // }
 console.log(req.session);
 next();
});

// sign up
app.post('/api/signUp', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const saltRounds = 10;
  // const salt = bcrypt.genSaltSync(saltRounds);
  // var hash2 = bcrypt.hashSync(password, salt);
  // console.log("i am hash2");
  // console.log(hash2);


        (async () => {
          const salt = await bcrypt.genSalt(10);
          const hash = bcrypt.hash(password, salt);
          const newUser = db_pos.USERS.create({ firstName: firstName,lastName: lastName, email: email, password: await hash })
        .then(function(user) {
          // you can now access the newly created user
          console.log('success', user.toJSON());
        })
        .catch(function(err) {
          // print the error details
        console.log(err, req.body.email);
        });
        })();
});

app.post('/api/signIn', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  (async () => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    const user = await db_pos.USERS.findByPk(email);
    console.log(await hash);
    console.log(await hash);
    if (user === null) {
      res.send({user: "none"});
      console.log('Not found!');
    } else if (user.password === await hash) {
      console.log("This user is " + user.email);
    } else {
      console.log("error");
    }
  })();
  
  // if(user == null) {
  //     res.redirect('https://www.google.co.jp/?gfe_rd=cr&ei=JF-ZWNiHKqiL8Qfvz5KADg&gws_rd=ssl');
  // }
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





