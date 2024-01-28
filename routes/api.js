// Create variable for API route and require FS for file system functions (read/write) //
const apiRouter = require('express').Router();
const fs = require('fs');
const uuid = require('../public/assets/js/uuid');

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
        id: uuid(),
      };
  
      db.push(newNote);
      fs.writeFileSync('db/db.json',JSON.stringify(db));
      res.json(db);
    } else {
      res.error('Error in adding note');
    }
});

apiRouter.delete('/api/notes/:id', (req,res) => {
  const data = fs.readFileSync('db/db.json');
  const db = JSON.parse(data);
  const newNote = db.filter((note) => {
    return note.id !== req.params.id; 
  });
  fs.writeFileSync('db/db.json',JSON.stringify(newNote));
  res.json('Deleted.');
});

module.exports = apiRouter;
