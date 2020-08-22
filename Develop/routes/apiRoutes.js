var noteData = require("../db/db.json");

// Routing

module.exports = function(app) {
// GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
 app.get("/api/notes", function(req, res){
     req.json(noteData);
 });

// POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("api/notes", function(req, res){
    var newNote = req.body;
    var id = noteData.length;
    newNote.id = id + 1;
    noteData.push(newNote);
    res.json(true);
});

// DELETE DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.
app.delete("api/notes", function(req, res){
    var id = req.params.id;
    delete noteData[id - 1];
    res.json({ok: true});
});
}