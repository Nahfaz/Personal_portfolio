import express from 'express';
import { getContactList } from '../controllers/contacts.js';
import { createNewContact } from '../controllers/contacts.js';
import { getContact } from '../controllers/contacts.js';
import { updateContact } from '../controllers/contacts.js';
import { deleteContact } from '../controllers/contacts.js';

const router = express.Router();

const checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) { return next() }
    res.redirect("/login");
}

router.get('/', checkLoggedIn, async (req, res) => {
    const contacts = await getContactList();
        console.log(contacts);
        if (contacts) {
            res.render('../views/contacts/private/index.html.ejs', { contacts: contacts });
        }
});

router.get('/create', checkLoggedIn, (req, res) => {
    console.log("HERE TO CREATE NEW CONTACT : GET");
    res.render('../views/contacts/private/new.html.ejs', { errors: [] });
});

router.post('/create', checkLoggedIn, async (req, res) => {
    console.log("HERE TO CREATE NEW CONTACT : POST");
    console.log(req.body);

    const contact = await createNewContact(req.body);
    
    if (contact !== undefined && contact._id !== undefined) {
        res.redirect('/contacts/private/');
    } else {
        res.render('../views/contacts/private/new.html.ejs', { errors: ['Unable to create contact!'] });
    }
});

router.get('/edit/:id', checkLoggedIn, async (req, res) => {
    console.log("FETCH EDIT PAGE FOR THE CONTACT");
    console.log(req.params.id);

    const contact = await getContact(req.params.id);

    if (contact) {
        res.render('../views/contacts/private/edit.html.ejs', { contact: contact });
    }
    
});

router.post('/update/:id', checkLoggedIn, async (req, res) => {
    console.log("HERE TO UPDATE THE CONTACT");
    console.log(req.body);

    const contact = await updateContact(req.params.id, req.body);

    if (contact) {
        res.redirect('/contacts/private/');
    }
    
});

router.get('/delete/:id', checkLoggedIn, async (req, res) => {
    console.log("HERE TO DELETE THE CONTACT");
    console.log(req.params.id);

    const contact = await deleteContact(req.params.id);

    if (contact) {
        res.redirect('/contacts/private/');
    }
    
});

export default router;