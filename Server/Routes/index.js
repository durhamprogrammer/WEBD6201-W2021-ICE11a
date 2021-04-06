"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const contact_1 = __importDefault(require("../Models/contact"));
const index_1 = require("../Controllers/index");
router.get('/', index_1.DisplayHomePage);
router.get('/home', index_1.DisplayHomePage);
router.get('/about', index_1.DisplayAboutPage);
router.get('/services', index_1.DisplayServicesPage);
router.get('/projects', index_1.DisplayProjectsPage);
router.get('/contact', index_1.DisplayContactPage);
router.get('/login', index_1.DisplayLoginPage);
router.get('/register', index_1.DisplayRegisterPage);
router.post('/login', index_1.ProcessLoginPage);
router.post('/register', index_1.ProcessRegisterPage);
router.get('/logout', index_1.ProcessLogoutPage);
router.get('/contact-list', function (req, res, next) {
    contact_1.default.find(function (err, contacts) {
        if (err) {
            return console.error(err);
        }
        res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contacts, displayName: 'temp' });
    });
});
router.get('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    contact_1.default.findById(id, {}, {}, (err, contactToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'edit', contact: contactToEdit, displayName: '' });
    });
});
router.post('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    let updatedContact = new contact_1.default({
        "_id": id,
        "FullName": req.body.FullName,
        "ContactNumber": req.body.ContactNumber,
        "EmailAddress": req.body.EmailAddress
    });
    contact_1.default.updateOne({ _id: id }, updatedContact, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
});
router.get('/add', function (req, res, next) {
    res.render('index', { title: 'Add', page: 'edit', contact: '', displayName: '' });
});
router.post('/add', function (req, res, next) {
    let newContact = new contact_1.default({
        "FullName": req.body.FullName,
        "ContactNumber": req.body.ContactNumber,
        "EmailAddress": req.body.EmailAddress
    });
    contact_1.default.create(newContact, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
});
router.get('/delete/:id', function (req, res, next) {
    let id = req.params.id;
    contact_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
});
//# sourceMappingURL=index.js.map