// Create variable for API route and require FS for file system functions (read/write) //
const apiRouter = require('express').Router();
const fs = require('fs');
const uuid = require('../uuid');

// GET route for retrieving the notes //
apiRouter.get('/api/notes', (req,res) => {
    const data = fs.readFileSync('db/db.json');
    const db = JSON.parse(data);
    res.json(db);
});

// POST route for new note //
apiRouter.post('/api/notes', (req, res) => {
    const data = fs.readFileSync('db/db.json');
    const db = JSON.parse(data);
    
    const { title, text } = req.body;

    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      db.push(newNote);
      fs.writeFileSync('db/db.json',JSON.stringify(db));
      res.json(db);
    } else {
      res.error('Error in adding note');
    }
});

module.exports = apiRouter;
