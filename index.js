import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import homeRoutes from './routes/home.js';
import loginRoutes from './routes/login.js';
import contactRoutes from './routes/contact.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Database connection
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', (error) => {
    console.log(`Database connection error due to ${error}`)
});

db.once('open', () => {
    console.log('Database connected successfully!')
});

// Middlewares
app.use(express.urlencoded({ extended: false }));

app.use(session({ 
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(bodyParser.json());

// Template engine
app.set('view engine', 'ejs');

// Public routes for other files such as images
app.use(express.static('public'));

app.use('/', homeRoutes);
app.use('/login', loginRoutes);
app.use('/contacts/private', contactRoutes);
// app.get('/', (req, res) => {
//     // res.send('Hello from home page!');
// });

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT: http://localhost:${PORT}`);
});