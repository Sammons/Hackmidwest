var express = require('express');
var cookieparser = require('cookie-parser')
var session = require('express-session');
var init_rdio = require('./initialize_rdio.js');
var repo = require('./testRepository');
var app = express();

app.use(session({secret: "sosecret", resave: true, saveUninitialized: true}))
app.set('port', process.env.PORT || 3000)

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

init_rdio(app);

app.use(express.static('public'));

app.listen(app.get('port'));