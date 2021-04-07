// Express Configuration
import express, {Request, Response, NextFunction} from 'express';
import { DisplayAddPage, DisplayContactList, DisplayEditPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage } from '../Controllers/contact-list';
const router = express.Router();
export default router;

// authGuard helper function
function requireAuth(req:Request, res:Response, next:NextFunction):void
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET contact-list page - with /contact-list */
router.get('/', requireAuth, DisplayContactList);

/* Display edit/:id page - with /edit/:id */
router.get('/edit/:id', requireAuth, DisplayEditPage);


/* Display add page - with /add */
router.get('/add', requireAuth, DisplayAddPage);


/* Process edit/:id page - with /edit/:id */
router.post('/edit/:id', requireAuth, ProcessEditPage);

/* Process add page - with /add */
router.post('/add', requireAuth, ProcessAddPage);

/* Process delete/:id page - with /delete/:id */
router.get('/delete/:id', requireAuth, ProcessDeletePage);
