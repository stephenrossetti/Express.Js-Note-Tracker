// Set up Router //
// Standard require express and path functionalities //
const htmlRouter = require('express').Router();
const path = require('path');

// Utilized Module 11 - Activity 22 for example code on GET functions //
// Utilize htmlRouter variable (router()) to create GET route for homepage //
htmlRouter.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Create GET route for notes page //
htmlRouter.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Export htmlRouter if needed
module.exports = htmlRouter;
