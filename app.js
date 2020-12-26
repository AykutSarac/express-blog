const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const routes = require('./routes/pages');
const passport = require('passport');
const mongoose = require('mongoose');
const { mongopath } = require('./config.json');
const flash = require('connect-flash');
const app = express();
mongoose.connect(mongopath, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, err => {
  console.error("Error occured while database connection");
});*/

mongoose.connection.once("open", ()=>{
  console.log("Connected to database.");
});

const PORT = 5000 || process.env.PORT;

app.use(cookieParser("your-secret-key"));
app.use(session({ 
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false,
    secret: "your-secret-key"
}));
app.use(flash());

app.use(express.static('public'));

//  Passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");

  next();
});

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: false}));

app.use(routes);

app.use((req, res, next) => {
  res.send("404 Page Cannot be Found"); 
});

app.listen(PORT, (err) => {
    if (err) return console.error(err);
    console.log("Server running at http://localhost:" + PORT);
});