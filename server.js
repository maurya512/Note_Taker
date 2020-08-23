//call all dependencies
var express = require("express");
var apiroutes = require ("./routes/apiRoutes");
var htmlroutes = require("./routes/htmlRoutes");

var app = express();
var PORT  = process.env.PORT || 8080;

// fireup the server

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiroutes);
app.use("/",htmlroutes);



app.listen(PORT,function(){
    console.log("App running on port http://localhost:" + PORT + "/");
});