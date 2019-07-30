var displayAll = function(input) {
// /api/charaters
	app.get(input, function(req, res) {
	  return res.json(characters);
	});

};

var displayIndividual = function(input) {
// /api/characters/:character

app.get(input, function(req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

};

var postSomething = function(input) {
// /api/characters

app.post(input, function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newcharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  characters.push(newcharacter);

  res.json(newcharacter);
});

};

moduel.exports = {
	displayAll: displayAll,
	displayIndividual: displayIndividual,
	postSomething: postSomething
}
