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
	repo.voteForTrackForPary(req.body.trackId, req.params.page);
	res.end();
})

// ?song="something"
app.post('/:page/downvote',function(req, res) {
	// to downvote
	repo.voteAgainstTrackForPary(req.body.trackId, req.params.page);
	res.end();
})

app.post('/:page/addTrack', function(req, res) {
	repo.addTrackToPartyOptions(req.body.trackId, req.params.page);
	res.end();
});

app.post('/:page/removeTrack', function(req, res) {
	repo.removeTrackFromPartyOptions(req.body.trackId, req.params.page);
	res.end();
});

app.post('/search', function(req, res) {
	res.render('searchresults.vash', repo.search(req.body.searchText));
	res.end();
});

app.post('/albumTracks', function(req, res) {
	res.render('albumtracks.vash', repo.getTracksForAlbum(req.body.albumId));
	res.end();
});

app.post('/artistAlbums', function(req, res) {
	res.render('artistalbums.vash', repo.getAlbumsForArtist(req.body.artistId));
	res.end();
});

app.get('/:page', function(req, res) {
	var partyInfo = repo.getPartyInfo(req.params.page);
	partyInfo.votedTracks = repo.getVotedTracks(partyInfo.partyId);

	res.render('party.vash', partyInfo);
	res.end();
});


app.use(express.static('public'));

app.listen(app.get('port'));
