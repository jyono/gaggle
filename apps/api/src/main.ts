// import * as express from 'express';
// import { Message } from '@gaggle/api-interfaces';
// const Message = require('@gaggle/api-interfaces')
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
db_pos.USERS.sync();


// session object
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
});

var myStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: "keyboard cat",
    store: myStore,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
  })
);
myStore.sync();





//cors
var corsOptions = {
  // credentials: 'true',
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

//cookie
app.use(cookieParser());

//session
// app.use(session({secret: "Your secret key"}));

// parse requests of content-type - application/json
app.use(bodyParser.json());



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// csrf
// const csrfProtection = csrf();
// app.use(csrfProtection);
// app.use(flash());

app.use('/', function(req, res, next){

  var name = '123';
  // res.cookie(name, 'value', {expire: 360000 + Date.now()}); 
  res.cookie(name, 'value', {maxAge: 360000}); 
  //  res.cookie('name', 'express').send('cookie set'); 
  // res.clearCookie('123');
  // res.send('cookie foo cleared');
  if(req.session.page_views){
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
 } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
 }
 console.log(req.session);
  next();
});


app.post('/api/user', (req, res) => {
//   if(req.session.page_views){
//     req.session.page_views++;
//     res.send("You visited this page " + req.session.page_views + " times");
//  } else {
//     req.session.page_views = 1;
//     res.send("Welcome to this page for the first time!");
//  }
  console.log("A request for things received at " + Date.now());

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

// const greeting: Message = { message: 'Welcome to api!' };

// app.get('/api', (req, res) => {
//   res.send(greeting);
// });

// const port = process.env.port || 4000;
// const server = app.listen(port, () => {
//   console.log('Listening at http://localhost:' + port + '/api');
// });
// server.on('error', console.error);




