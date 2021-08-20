const express = require('express');
const {uuid} = require('../../helper');
const router = express.Router();
let contacts = require('../../Contacts');

/* NB: Not all routers are for handling api request */

// GET ALL MEMBERS
router.get('/', (req, res) => {
	res.json(contacts); // will show json data
})


// GET A SINGLE MEMBER
router.get('/:id', (req, res) => {
	/*NB: req.params.id holds the id passed to the url*/
	const found = contacts.some(contact => contact.id === parseInt(req.params.id));

	if(found) {
		res.json(contacts.filter(contact => contact.id === parseInt(req.params.id)));
	} else {
		res.status(400).json({ msg: `No contact with the id of ${req.params.id}` })
	}

});


// CREATE MEMBER
router.post('/', (req, res) => {
	const newContact = {
		id: uuid(),
		name: req.body.name,
		email: req.body.email,
		message: req.body.message
	}
	
	if (!newContact.name || !newContact.email || !newContact.message) {
		return res.status(400).json({ msg: 'Please include a name, email and message' });
	}
	

	if (contacts.length > 3) {
		contacts = [];
	}

	contacts.push(newContact);

	// res.redirect('/'); // will redirect to home
	res.json(contacts);
});


module.exports = router;