var morgan = require('morgan');
var express = require('express');
var cookieparser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var init_rdio = require('./initialize_rdio.js');
// var database = require('./database.js')
var repo = require('./testRepository');
var app = express();


app.use(morgan('dev'));
app.use(session({secret: "sosecret", resave: true, saveUninitialized: true}));
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'vash');

app.use(bodyParser.urlencoded());


app.get('/', function(req, res) {
	res.render('index.vash', { title : 'Rdio Thing'});
	res.end();
});
init_rdio(app);

app.get('/create',function(req, res) {
	// page to create event
	// needs event + password
	// store properties in req.session =)
	res.end('unsupported');
})

// ?song="something"
app.post('/:page/upvote',function(req, res) {
	// endpoint to upvote a song
	// 
})

// ?song="something"
app.post('/:page/downvote',function(req, res) {
	// to downvote
})

// we should just do up-insert functionality
// a song enters the queue on it's first vote
// so at any given time a user finds a song and 
// just upvotes/suggests it

app.post('/vote', function(req, res) {
	repo.voteForTrackForParty(res.body.trackId, res.body.partyId);
	res.end();
});

app.post('/addTrack', function(req, res) {
	repo.addTrackToPartyOptions(req.body.trackId, res.body.partyId);
	res.end();
});

app.post('/removeTrack', function(req, res) {
	repo.removeTrackFromPartyOptions(req.body.trackId, res.body.partyId);
	res.end();
});

app.post('/search', function(req, res) {
	res.render('searchresults.vash', repo.search(req.body.searchText));
	res.end();
});

app.get('/:page', function(req, res) {
	//TODO: hit the db
	var partyInfo = repo.getPartyInfo(req.params.page);
	partyInfo.votedTracks = repo.getVotedTracks(partyInfo.partyId);

	res.render('party.vash', partyInfo);
	res.end();
});


app.use(express.static('public'));

app.listen(app.get('port'));
