// Create variable for API route and require FS for file system functions (read/write) //
// Create a variable for ID route to differentiate notes for Index.Js //
const apiRouter = require('express').Router();
const fs = require('fs');
const uuid = require('../public/assets/js/uuid');

// GET route for retrieving the notes //
// Essentially gets data/notes from the api/notes path (check in Insomnia) //
// Then reads the JSON data in db file, parses that data into an object, and then responds with that JSON data //
apiRouter.get('/api/notes', (req,res) => {
    const data = fs.readFileSync('db/db.json');
    const db = JSON.parse(data);
    res.json(db);
});

// POST route for new note //
// Similar process as GET, but includes a body //
apiRouter.post('/api/notes', (req, res) => {
    const data = fs.readFileSync('db/db.json');
    const db = JSON.parse(data);
    
    // Sets req.body to be the title and text inputs //
    const { title, text } = req.body;

    // If request body exists, it creates a new note and adds a unique ID key pair //
    // ID uses function exported from UUID.js //
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      // If req.body is unique, it will push the "newNote" to the notes array in the db file (or db parsed data) //
      // db file data is "re-written" and all the data is stringified and updated in the db file  //
      // Response back to the user is the updated JSON data from the db file //
      db.push(newNote);
      fs.writeFileSync('db/db.json',JSON.stringify(db));
      res.json(db);
    } else {
      res.error('Error in adding note');
    }
});

// Similar to GET and POST but using DELETE //
// Using :id as a route paramater to get ID specific data //
// db file is read, parsed and filtered to return only notes that DO NOT have the specific id clicked (see Index.js function) //
// Utilized note.id to NOT equal the request paramater id //
// the newNote variable containing all notes except the selected note (i.e., the one getting deleted) is re-written into the db file //
apiRouter.delete('/api/notes/:id', (req,res) => {
  const data = fs.readFileSync('db/db.json');
  const db = JSON.parse(data);
  const newNote = db.filter((note) => {
    return note.id !== req.params.id; 
  });
  fs.writeFileSync('db/db.json',JSON.stringify(newNote));
  res.json('Deleted.');
});

// Export apiRouter for server.js //
module.exports = apiRouter;
