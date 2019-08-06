var express = require('express');
var path = require('path');
var fs = require('fs');

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

function compare(input1, input2) {
  var totalDifference = 0;
  for(var i = 0; i < input1.length; i++){
      totalDifference += Math.abs(input1[i] - input2[i]);
  }
  return totalDifference;
}




app.post("/api/friends", function(req, res) {
    var newFriendAdd = req.body;

    // console.log(friends);
    var bestMatch;

    for(var i = 0; i < friends.length; i++){
      var score1 = newFriendAdd.scores;
      var score2 = friends[i].scores;
      var numberify1 = [];
      var numberify2 = [];
      for(var j = 0; j < score1.length; j++){
        numberify1.push(Number(score1[j]));
        numberify2.push(Number(score2[j]));
      };
      // console.log("numberify: " + numberify1 + "\n" + numberify2);
      var score = compare(numberify1, numberify2);

      console.log("Score for " + friends[i].name + ": " + score);
      bestMatch = friends[i];
      console.log("Best Match: " + bestMatch.name);
    }

    friends.push(newFriendAdd);

    var createFile = "var friends = " + JSON.stringify(friends) + "; \n module.exports = friends;"
    fs.writeFile("./app/data/friends.js", createFile, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Content Added!");
      }
    });

    res.json(bestMatch);

});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
