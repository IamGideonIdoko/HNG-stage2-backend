const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const members = require('./Contacts');

const app = express();

/*>>> MIDDLEWARE <<<*/
// Initialize middleware
app.use(logger);


// Initialize Body Parser Middleware (for parsing application/json)
app.use(express.json());
app.use(express.urlencoded({ extended: false}))


//CREATE A ROUTE
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// app.get('*', (req, res) => {
// 	res.redirect('/');
// })

// SET STATIC FOLDER for static files
app.use(express.static(path.join(__dirname, 'public')));

// MEMBERS API ROUTES
app.use('/api/contact', require('./routes/api/contact'));

const PORT = process.env.PORT || 5000; //normally this should be in a separate config file

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));