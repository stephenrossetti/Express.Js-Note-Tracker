// Require express //
// Set up route variables for html and api routes created in js //
const express = require('express');
const htmlRoute = require('./public/assets/js/routes/html');
const apiRoute = require('./public/assets/js/routes/api');

// Instead of PORT = 3001 this variable will process on any environment that Heroku dynamically sets //
// Otherwise it will default to 3001 if no port is set up //
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use of html and api routes//
app.use(htmlRoute);
app.use(apiRoute);

// Middleware for use of static files in public folder //
app.use(express.static('public'));

// Set up to listen on specific PORT (defined by Heroku or default to 3001) //
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
