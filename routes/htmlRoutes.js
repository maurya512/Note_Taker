// file where we will route to html files 
const path = require("path");

module.exports = function(app){
    // routes to the notes' html
    app.get("/notes", function(req, res){
        res.sendFile(path.join(__dirname,"../public/notes.html"));
    });

    // routes to the index html
    app.get("*/", function(req, res){
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};

