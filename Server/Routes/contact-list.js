"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const contact_1 = __importDefault(require("../Models/contact"));
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
router.get('/', requireAuth, function (req, res, next) {
    console.log(req.user);
    contact_1.default.find(function (err, contacts) {
        if (err) {
            return console.error(err);
        }
        res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contacts, displayName: 'temp' });
    });
});
router.get('/edit/:id', requireAuth, function (req, res, next) {
    let id = req.params.id;
    contact_1.default.findById(id, {}, {}, (err, contactToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'edit', contact: contactToEdit, displayName: '' });
    });
});
router.post('/edit/:id', requireAuth, function (req, res, next) {
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
router.get('/add', requireAuth, function (req, res, next) {
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
router.get('/delete/:id', requireAuth, function (req, res, next) {
    let id = req.params.id;
    contact_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
});
//# sourceMappingURL=contact-list.js.map