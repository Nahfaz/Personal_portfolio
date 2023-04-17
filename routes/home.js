import express from 'express';
const router = express.Router();
import { getAllUsers } from '../controllers/users.js';

// const checkLoggedIn = (req, res, next) => {
//     if (req.isAuthenticated()) { return next() }
//     res.redirect("/login")
// }

router.get('/', (req, res) => {
    const users = getAllUsers();
    console.log(users);
    res.render("../views/home.html.ejs", {loggedIn: req.user ? true : false});
});

router.get('/about-me', (req, res) => {
    res.render("../views/about_me.html.ejs");
});

router.get('/projects', (req, res) => {
    res.render("../views/projects.html.ejs");
});

router.get('/services', (req, res) => {
    res.render("../views/services.html.ejs");
});

router.get('/contacts/local', (req, res) => {
    res.render("../views/contacts/local/contacts.html.ejs");
});

export default router;