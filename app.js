var morgan = require('morgan');
var express = require('express');
var cookieparser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var init_rdio = require('./initialize_rdio.js');
// var database = require('./database.js')
var repo = require('./repository');
var app = express();

//dirty database because I'm lazy
app.db = {
	parties : {

	}
};

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
	res.render('create.vash');
	res.end();
})

app.post('/create', function(req, res) {
	repo.createParty(req.body.partyName, app.db, function(result) {
		res.redirect('/' + result)
	});
})

// ?song="something"
app.post('/:page/upvote',function(req, res) {
	// endpoint to upvote a song
	repo.voteForTrackForPary(req.body.trackId, req.params.page, app.db);
	res.end();
})

// ?song="something"
app.post('/:page/downvote',function(req, res) {
	// to downvote
	repo.voteAgainstTrackForPary(req.body.trackId, req.params.page, app.db);
	res.end();
})

app.post('/:page/addTrack', function(req, res) {
	repo.addTrackToPartyOptions(req.body.trackId, req.params.page, app.db);
	res.end();
});

app.post('/:page/removeTrack', function(req, res) {
	repo.removeTrackFromPartyOptions(req.body.trackId, req.params.page, app.db);
	res.end();
});

app.post('/search', function(req, res) {
	repo.search(req.body.searchText, "album,artist,track", app.users[req.session.key].rdio, 
		function( result ) {
			res.render('searchresults.vash', result);
			res.end();
		}
	);
});

app.post('/albumTracks', function(req, res) {
	repo.getTracksForAlbum(req.body.albumId, app.users[req.session.key].rdio, function(result) {
		res.render('albumtracks.vash', result);
		res.end();
	});
});

app.post('/artistAlbums', function(req, res) {
	repo.getAlbumsForArtist(req.body.artistId, app.users[req.session.key].rdio, function(result) {
		res.render('artistalbums.vash', result);
		res.end();
	});
});

app.get('/:page', function(req, res) {
	repo.getPartyInfo(req.params.page, app.db, function(result) {
		try {
		result.playbackToken = app.users[req.session.key].playbackToken;
		}
		catch (e) {
			result.playbackToken = '';
		}
		res.render('party.vash', result);
		res.end();
	});
});


app.use(express.static('public'));

app.listen(app.get('port'));
