var express = require('express');
var app = express();
var repo = require('./testRepository');

app.set('view engine', 'vash');


app.get('/', function(req, res) {
	res.render('index.vash', { title : 'Rdio Thing'});
	res.end();
});

app.get('/:page', function(req, res) {
	//TODO: hit the db
	res.render('party.vash', {
		title : "Ben's Party",
		name : "Ben's Party",
		votedTracks : repo.getVotedTracks()
	})
	res.end();
});

app.use(express.static('public'));
app.listen(3000);