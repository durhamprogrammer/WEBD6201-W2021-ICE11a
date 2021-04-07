// Express Configuration
import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
export default router;

// Contact Model
import Contact from "../Models/contact";

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
router.get('/', requireAuth, function(req, res, next) 
{
  console.log(req.user);

    // db.contacts.find()
    Contact.find(function(err, contacts){
      if(err)
      {
        return console.error(err);
      }
      res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contacts, displayName: 'temp'  });
    });

});

/* Display edit/:id page - with /edit/:id */
router.get('/edit/:id', requireAuth, function(req, res, next) 
{
  let id = req.params.id;

  // pass the id to the db

  // db.contacts.find({"_id": id})
  Contact.findById(id, {}, {}, (err, contactToEdit) =>{
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // show the edit view
    res.render('index', { title: 'Edit', page: 'edit', contact: contactToEdit, displayName: '' });
  });
  
});

/* Process edit/:id page - with /edit/:id */
router.post('/edit/:id', requireAuth, function(req, res, next) 
{
  let id = req.params.id;

  // instantiate a new Contact
  let updatedContact = new Contact
  ({
    "_id": id,
    "FullName": req.body.FullName,
    "ContactNumber": req.body.ContactNumber,
    "EmailAddress": req.body.EmailAddress
  });

  // db.contacts.update({"_id":id} and then update)
  Contact.updateOne({_id: id}, updatedContact, {}, (err) =>{
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contact-list');
  });
  
});

/* Display add page - with /add */
router.get('/add', requireAuth, function(req, res, next) 
{
  res.render('index', { title: 'Add', page: 'edit', contact: '', displayName: ''    });
});

/* Process edit/:id page - with /edit/:id */
router.post('/add', function(req, res, next) 
{
  // instantiate a new Contact
  let newContact = new Contact
  ({
    "FullName": req.body.FullName,
    "ContactNumber": req.body.ContactNumber,
    "EmailAddress": req.body.EmailAddress
  });

  // db.contacts.insert({contact data is here...})
  Contact.create(newContact, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contact-list');
  });

});

/* Process delete/:id page - with /delete/:id */
router.get('/delete/:id', requireAuth, function(req, res, next) 
{
  let id = req.params.id;

  // db.contacts.remove({"_id: id"})
  Contact.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contact-list');
  });
  
});
