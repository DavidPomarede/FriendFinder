var homeGet = function(input) {
	app.get(input, function(req, res) {
	  res.sendFile(path.join(__dirname, "home.html"));
	});
};

var surveyGet = function(input) {
	app.get(input, function(req, res) {
	  res.sendFile(path.join(__dirname, "survey.html"));
	});
};

module.exports =  { 
homeGet: homeGet,
surveyGet: surveyGet
}
