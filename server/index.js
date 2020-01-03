require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
//controllers
const authCtrl = require('./controllers/authController');
const treasureCtrl = require('./controllers/treasureController');
//middleware
const auth = require('./middleware/authMiddleware');

const PORT = 4000;

const {CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express();

app.use(express.json());

massive(CONNECTION_STRING).then((db) => {
    app.set('db', db)
    // console.log(db)
})

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure);
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure);
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure);
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure);

app.listen(PORT, () => console.log(`Listening on ${PORT}, BAAYYBBEEEE!`));