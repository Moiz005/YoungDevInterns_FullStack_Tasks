import express from 'express'
import bodyParser from 'body-parser'
import pg from 'pg'
import passport from 'passport';
import { Strategy } from "passport-local";
import session from "express-session";
import bcrypt from 'bcrypt'
import env from "dotenv";

env.config();

const app = express();
const port = 3000;
const saltRounds = process.env.SALT_ROUNDS;

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

let checkLogin = false;
let incorrectInfo = false;
let Name = '';
let isAdmin = false;

app.get('/', (req, res)=>{
    if(isAdmin === false){
        if (req.isAuthenticated()) {
            res.render("index.ejs");
        }
        else {
            res.redirect("/login");
        }
    }
    else{
        if (req.isAuthenticated()) {
            res.render("admin.ejs");
        }
        else {
            res.redirect("/login");
        }
    }
});

app.get('/login', (req, res)=>{
    if(incorrectInfo){
        incorrectInfo = false;
        res.render('login.ejs', {
            message: 'Incorrect Information'
        });
    }
    else{
        res.render('login.ejs');
    }
});

app.get('/register', (req, res)=>{
    res.render('register.ejs');
});

app.get('/editprofile', (req, res)=>{
    if(isAdmin == true){
        if(req.isAuthenticated()){
            res.render('editProfile.ejs');
        }
        else{
            res.redirect('/login');
        }
    }
});

app.get('/addstudent', (req, res)=>{
    if(isAdmin == true){
        if(req.isAuthenticated()){
            res.render('addStudent.ejs');
        }
        else{
            res.redirect('/login');
        }
    }
});

app.get('/removestudent', (req, res)=>{
    if(isAdmin == true){
        if(req.isAuthenticated()){
            res.render('removeStudent.ejs');
        }
        else{
            res.redirect('/login');
        }
    }
});

app.get('/search_updatestudent', (req, res)=>{
    if(isAdmin == true){
        if(req.isAuthenticated()){
            res.render('updateStudent.ejs');
        }
        else{
            res.redirect('/login');
        }
    }
});

app.get('/search_updatestudent/:username', (req, res)=>{
    if(isAdmin == true){
        if(req.isAuthenticated()){
            let previousUsername = req.params.username;
            res.render('updateStudent.ejs', {previousUser: previousUsername});
        }
        else{
            res.redirect('/login');
        }
    }
});

app.get('/search_viewstudent', (req, res)=>{
    if(isAdmin == true){
        if(req.isAuthenticated()){
            res.render('viewStudent.ejs');
        }
        else{
            res.redirect('/login');
        }
    }
});

app.get('/search_viewstudent/:username', async(req, res)=>{
    if(isAdmin == true){
        if(req.isAuthenticated()){
            let currentUsername = req.params.username;
            let result = await db.query('select * from student where username=$1', [currentUsername]);
            if(result.rows.length > 0){
                res.render('viewStudent.ejs', {selectedStudent: result.rows[0]});
            }
            else{
                res.render('viewStudent.ejs');
            }
        }
        else{
            res.redirect('/login');
        }
    }
});

app.get('/search_managecourses', (req, res)=>{
    if(isAdmin == true){
        if(req.isAuthenticated()){
            res.render('manageCourses.ejs');
        }
        else{
            res.redirect('/login');
        }
    }
});

app.get('/search_managecourses/:username', async(req, res)=>{
    if(isAdmin == true){
        if(req.isAuthenticated()){
            let currentUsername = req.params.username;
            let result = await db.query('select * from student where username=$1', [currentUsername]);
            res.render('manageCourses.ejs', {selectedStudent: result.rows[0]});
        }
        else{
            res.redirect('/login');
        }
    }
});

app.get('/view_student_profile', async(req, res)=>{
    if(isAdmin == false){
        if(req.isAuthenticated()){
            let currentUser = req.user;
            let result = await db.query('select * from student where username=$1', [currentUser.username]);
            res.render('viewStudentProfile.ejs', {selectedStudent: result.rows[0]});
        }
        else{
            res.redirect('/login');
        }
    }
});

app.get('/view_student_courses', async(req, res)=>{
    if(isAdmin == false){
        if(req.isAuthenticated()){
            let currentUser = req.user;
            let result = await db.query('select courses from student where username=$1', [currentUser.username]);
            res.render('viewStudentCourses.ejs', {courses: result.rows[0].courses});
        }
        else{
            res.redirect('/login');
        }
    }
});

app.get('/add_student_courses', async(req, res)=>{
    if(isAdmin == false){
        if(req.isAuthenticated()){
            res.render('addStudentCourses.ejs');
        }
        else{
            res.redirect('/login');
        }
    }
});

app.get('/remove_student_courses', async(req, res)=>{
    if(isAdmin == false){
        if(req.isAuthenticated()){
            res.render('removeStudentCourses.ejs');
        }
        else{
            res.redirect('/login');
        }
    }
});

app.post('/editprofile', async (req, res)=>{
    let name = req.body['name'];
    let phone = req.body['phone'];
    let username = req.body['username'];
    let password = req.body['password'];
    let currentUser = req.user['username'];
    if(name != ''){
        await db.query('update admin set name=$1 where username=$2', [name, currentUser]);
    }
    if(phone != ''){
        await db.query('update admin set phone=$1 where username=$2', [phone, currentUser]);
    }
    if(username != ''){
        await db.query('update admin set username=$1 where username=$2', [username, currentUser]);
    }
    if(password != ''){
        await db.query('update admin set password=$1 where username=$2', [password, currentUser]);
    }
    res.redirect('/editprofile');
});

app.post('/addstudent', (req, res) => {
    let name = req.body['name'];
    let phone = req.body['phone'];
    let father = req.body['father'];
    let username = req.body['username'];
    let password = req.body['password'];
    let previousGrade = req.body['previousGrade'];
    let type = 'student';
    bcrypt.hash(password, saltRounds, async(err, hash)=>{
        if(err){
            console.error('Error hashing password:', err);
        }
        else{
            await db.query('insert into student (name, phone, father_name, username, password, type, previousgrade) values($1, $2, $3, $4, $5, $6, $7)', [name, phone, father, username, hash, type, previousGrade]);
        }
    });
    res.redirect('/addstudent');
});

app.post('/removestudent', async(req, res)=>{
    let search = req.body['search'];
    let result = null;
    try{
        result = await db.query('select * from student where username like $1', [`%${search}%`]);
    }
    catch(err){
        console.log('Error searching for student:', err);
    }
    if(result.rows.length > 0){
        res.render('removeStudent.ejs', {
            students: result.rows
        });
    }
    else{
        res.render('removeStudent.ejs', {
            message: 'Error cannot find this username'
        });
    }
});

app.post('/removestudent/:username', async(req, res)=>{
    let username = req.params.username;
    await db.query('delete from student where username like $1', [`%${username}%`]);
    res.redirect('/removestudent');
});

app.post('/search_updatestudent', async(req, res)=>{
    let search = req.body['search'];
    let result = null;
    try{
        result = await db.query('select * from student where username like $1', [`%${search}%`]);
    }
    catch(err){
        console.log('Error searching for student:', err);
    }
    if(result.rows.length > 0){
        res.render('updateStudent.ejs', {
            students: result.rows
        });
    }
    else{
        res.render('updateStudent.ejs', {
            message: 'Error cannot find this username'
        });
    }
});

app.post('/search_updatestudent/:username', async(req, res)=>{
    let username = req.params.username;
    res.redirect(`/search_updatestudent/${username}`);
});

app.post('/updatestudent/:username', async(req, res)=>{
    let currentUser = req.params.username;
    let name = req.body['name'];
    let phone = req.body['phone'];
    let father = req.body['father'];
    let username = req.body['username'];
    let password = req.body['password'];
    let previousGrade = req.body['previousGrade'];
    if(name != ''){
        await db.query('update student set name=$1 where username=$2', [name, currentUser]);
    }
    if(phone != ''){
        await db.query('update student set phone=$1 where username=$2', [phone, currentUser]);
    }
    if(father != ''){
        await db.query('update student set father_name=$1 where username=$2', [father, currentUser]);
    }
    if(username != ''){
        await db.query('update student set username=$1 where username=$2', [username, currentUser]);
    }
    if(password != ''){
        await db.query('update student set password=$1 where username=$2', [password, currentUser]);
    }
    if(previousGrade != ''){
        await db.query('update student set previousgrade=$1 where username=$2', [previousGrade, currentUser]);
    }
    res.redirect('/search_updatestudent');
});

app.post('/search_viewstudent', async(req, res)=>{
    let search = req.body['search'];
    let result = null;
    try{
        result = await db.query('select * from student where username like $1', [`%${search}%`]);
    }
    catch(err){
        console.log('Error searching for student:', err);
    }
    if(result.rows.length > 0){
        res.render('viewStudent.ejs', {
            students: result.rows
        });
    }
    else{
        res.render('viewStudent.ejs', {
            message: 'Error cannot find this username'
        });
    }
});

app.post('/search_viewstudent/:username', async(req, res)=>{
    let username = req.params.username;
    res.redirect(`/search_viewstudent/${username}`);
});

app.post('/search_managecourses', async(req, res)=>{
    let search = req.body['search'];
    let result = null;
    try{
        result = await db.query('select * from student where username like $1', [`%${search}%`]);
    }
    catch(err){
        console.log('Error searching for student:', err);
    }
    if(result.rows.length > 0){
        res.render('manageCourses.ejs', {
            students: result.rows
        });
    }
    else{
        res.render('viewStudent.ejs', {
            message: 'Error cannot find this username'
        });
    }
});

app.post('/search_managecourses/:username', (req, res)=>{
    let username = req.params.username;
    res.redirect(`/search_managecourses/${username}`);
});

app.post('/search_managecourses/:username/add_course', async(req, res)=>{
    let currentUsername = req.params.username;
    let courses = req.body.courses;
    await db.query('update student set courses=$1 and username=$2', [courses, currentUsername]);
    res.redirect(`/search_managecourses/${currentUsername}`);
});

app.post('/search_managecourses/:username/remove_course', async(req, res)=>{
    let currentUsername = req.params.username;
    let courses = req.body.courses;
    let result = await db.query('select courses from student where username=$1', [currentUsername]);
    let storedCourses = result.rows[0].courses;
    for(let i=0; i<storedCourses.length; i+=1) {
        for(let j=0; j<courses.length; j+=1){
            if(storedCourses[i] === courses[j]){
                let index = storedCourses.indexOf(storedCourses[i]);
                storedCourses.splice(index, 1);
            }
        }
    }
    await db.query('update student set courses=$1 where username=$2', [storedCourses, currentUsername]);
    res.redirect(`/search_managecourses/${currentUsername}`);
});

app.post('/add_student_courses', async(req, res)=>{
    let currentUser = req.user;
    let courses = req.body['courses'];
    let result = await db.query('select courses from student where username=$1', [currentUser.username]);
    let storedCourses = result.rows[0].courses;
    for(let i=0; i<courses.length; i+=1){
        for(let j=0; j<storedCourses.length; j+=1){
            if(courses[i] != storedCourses[j]){
                if(j == storedCourses.length - 1){
                    storedCourses.push(courses[i]);
                }
            }
        }
    }
    await db.query('update student set courses=$1 where username=$2', [storedCourses, currentUser.username]);
    res.render('addStudentCourses.ejs');
});

app.post('/remove_student_courses', async(req, res)=>{
    let currentUser = req.user;
    let courses = req.body['courses'];
    let result = await db.query('select courses from student where username=$1', [currentUser.username]);
    let storedCourses = result.rows[0].courses;
    if(typeof(courses) == 'string'){
        courses =  courses.split();
    }
    for(let i=0; i<storedCourses.length; i+=1) {
        for(let j=0; j<courses.length; j+=1){
            if(storedCourses[i] === courses[j]){
                let index = storedCourses.indexOf(storedCourses[i]);
                storedCourses.splice(index, 1);
            }
        }
    }
    await db.query('update student set courses=$1 where username=$2', [storedCourses, currentUser.username]);
    res.redirect(`/remove_student_courses`);
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureMessage: true,
      })(req, res, next);
    });

app.post('/register', async(req, res)=>{
    let name = req.body['name'];
    let phone = req.body['phone'];
    let userName = req.body['username'];
    let password = req.body['password'];
    let userType = 'admin';
    try{
        let checkResult = await db.query('select * from admin where username = $1', [userName]);
        if(checkResult.rows.length > 0){
            console.log('A user with that username already exists');
            res.redirect('/login');
        }
        else{
            bcrypt.hash(password, saltRounds, async(err, hash)=>{
                if(err){
                    console.error('Error hashing password');
                }
                else{
                    let result = db.query('insert into admin (name, phone, username, password, type) values($1, $2, $3, $4, $5)', [name, phone, userName, hash, userType]);
                }
            });
            res.redirect('/login');
        }
    }
    catch(err){
        console.error(err);
    }
});

passport.use(
    new Strategy({ passReqToCallback: true }, async function verify(req, username, password, cb){
        try{
            let userType = req.body['userType'];
            if(userType === 'admin'){
                isAdmin = true;
                let result = await db.query('select * from admin where username=$1 and type=$2', [username, userType]);
                if(result.rows.length > 0){
                    let user = result.rows[0];
                    let storedPassword = user.password;
                    bcrypt.compare(password, storedPassword, (err, valid) => {
                        if(err){
                            console.error('Error comparing passwords:', err);
                            return cb(err);
                        }
                        else{
                            if(valid){
                                return cb(null, user);
                            }
                            else{
                                return cb(null, false);
                            }
                        }
                    });
                }
                else{
                    return cb('User not found');
                }
            }
            else{
                isAdmin = false;
                let result = await db.query('select * from student where username=$1 and type=$2', [username, userType]);
                if(result.rows.length > 0){
                    let user = result.rows[0];
                    let storedPassword = user.password;
                    bcrypt.compare(password, storedPassword, (err, valid) => {
                        if(err){
                            console.error('Error comparing passwords:', err);
                            return cb(err);
                        }
                        else{
                            if(valid){
                                return cb(null, user);
                            }
                            else{
                                return cb(null, false);
                            }
                        }
                    });
                }
                else{
                    return cb('User not found');
                }
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