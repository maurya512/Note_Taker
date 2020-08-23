// file where the routing to apis will be done
// import required modules 
const fs = require("fs");
const noteData = require("../db/db.json");

module.exports = function(app) {
    function updateDB(notes) {
        // Converts the json array into a string
        notes = JSON.stringify(notes);
        console.log(notes);
        // writes String back to db.json
        fs.writeFileSync("/db/db.json", notes,function(err){
            if(err) throw err;
        });
    }

    // api routes
    app.get("/api/notes", function(req, res){
        res.json(noteData);
    });

    app.post("/api/notes", function(req, res){
        // set a unique id to each note create by the user
        if(noteData.length === 0){
            req.body.id = 0;
        }
        else {
            req.body.id = JSON.stringify(JSON.parse(noteData[noteData.length - 1].id) + 1);
        }

        console.log("ID: " + req.body.id);

        // populate the new array by pushing things into it
        noteData.push(req.body);

        // update notes data to database
        updateDB(noteData);
        // logging to see everything got pushed
        console.log(updateDB);
    });

    // a method to delete each note individually with the help of a unique id
    app.delete("/api/notes/:id", function(req,res){
        // get id and convert them into string
        let id = req.params.id.toString();
        console.log("id is:" + id);

        // loop through the array to check for matching id 
        for(i=0; i < noteData.length; i++){
            if(noteData[i].id == id) {
                res.send(noteData[i]);
                // removes the deleted note from the array
                noteData.splice(i,1);
                break;
            }
        }
        // update notes into database
        updateDB(noteData);
    });
}