"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_list_1 = require("../Controllers/contact-list");
const router = express_1.default.Router();
exports.default = router;
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
router.get('/', requireAuth, contact_list_1.DisplayContactList);
router.get('/edit/:id', requireAuth, contact_list_1.DisplayEditPage);
router.get('/add', requireAuth, contact_list_1.DisplayAddPage);
router.post('/edit/:id', requireAuth, contact_list_1.ProcessEditPage);
router.post('/add', requireAuth, contact_list_1.ProcessAddPage);
router.get('/delete/:id', requireAuth, contact_list_1.ProcessDeletePage);
//# sourceMappingURL=contact-list.js.map