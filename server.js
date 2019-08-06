var express = require('express');
var path = require('path');

var friends = require("./app/data/friends.js");

var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.get("/api/friends", function(req, res) {
    res.json(friends);
});


app.post("/api/friends", function(req, res) {
    var newtable = req.body;

    // newtable.routeName = newtable.customerName.replace(/\s+/g, "").toLowerCase();
    console.log(newtable);


    // if(tables.length<5) {
    //     tables.push(newtable);
    //     console.log(tables);
    //     res.json(newtable);

    // } else {
    //     waitlist.push(newtable);
    //     console.log("THIS IS ON THE WAITLIST" + waitlist);
    //     res.json(newtable);
    // }


});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
