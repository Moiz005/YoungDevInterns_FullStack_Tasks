import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import env from "dotenv";

env.config();

const app = express();
const port = 3000;

const db = new pg.Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

app.post('/submit', (req, res)=>{
    let name = req.body['name'];
    let email = req.body['email'];
    let phone = req.body['phone'];
    let subject = req.body['subject'];
    let message = req.body['message'];
    db.query('Insert into messages (name, email, phone, subject, message) values($1, $2, $3, $4, $5)', [name, email, phone, subject, message]);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});