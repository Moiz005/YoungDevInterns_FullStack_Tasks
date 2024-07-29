import express from 'express'
import bodyParser from 'body-parser'
import pg from 'pg'
import passport from 'passport';
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";

env.config();

const app = express();
const port = 3000;

app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {maxAge: 1000*60*60}
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});
db.connect();

let taskStatus = 'Unlocked';
let name = '';
let fileSubmitted = false;

app.get('/', (req, res)=>{
    res.render('index.ejs');
});

app.get('/contact', (req, res)=>{
    res.render('contact.ejs');
});

app.get('/internship', (req, res)=>{
    res.render('internship.ejs');
});

app.get('/browse-internship', (req, res)=>{
    res.render('browse_internship.ejs');
});

app.get('/company', (req, res)=>{
    res.render('company.ejs');
});

app.get('/login', (req, res)=>{
    res.render('login.ejs');
});

app.get('/internee', (req, res)=>{
    if(req.isAuthenticated()){
        res.render('internee.ejs', {name: req.user.name, status: taskStatus, submitted: fileSubmitted});
    }
    else{
        res.redirect('/login');
    }
});

app.get('/apply_backend', (req, res)=>{
    res.render('apply_backend.ejs');
});

app.get('/apply_app', (req, res)=>{
    res.render('apply_app.ejs');
});

app.get('/apply_graphics', (req, res)=>{
    res.render('apply_graphics.ejs');
});

app.get('/apply_chatbot', (req, res)=>{
    res.render('apply_chatbot.ejs');
});

app.get('/apply_frontend', (req, res)=>{
    res.render('apply_frontend.ejs');
});

app.post('/login', async(req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/internee',
        failureRedirect: '/login',
        failureMessage: true,
    })(req, res, next);
});

app.post('/submit', (req, res)=>{
    if(req.body['file'] != ''){
        fileSubmitted = true;
        taskStatus = 'Completed';
    }
    res.redirect('/internee');
});

app.get("/logout", (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});

passport.use(
    new Strategy({usernameField: 'email'}, async function verify(email, password, cb){
        try{
            let result = await db.query('select * from login where email=$1', [email]);
            if(result.rows.length > 0){
                let user = result.rows[0];
                if(user.password == password){
                    name = user.name;
                    return cb(null, user);
                }
                else{
                    return cb(null, false);
                }
            }
            else{
                return cb(null, false, {message: 'User not found'});
            }
        }
        catch(err){
            console.error(err);
        }
    })
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

app.listen(port, ()=>{
    console.log("Running app on port localhost:3000");
});