var morgan = require('morgan');
var express = require('express');
var cookieparser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var init_rdio = require('./initialize_rdio.js');
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

app.get('/search', function(req, res) {
	console.log(req.body);
	res.render('searchresults.vash', repo.search());
	res.end();
});

app.get('/:page', function(req, res) {
	//TODO: hit the db
	var partyInfo = repo.getPartyInfo(req.params.page);
	partyInfo.votedTracks = repo.getVotedTracks(partyInfo.partyId);

	res.render('party.vash', partyInfo);
	res.end();
});

init_rdio(app);

app.use(express.static('public'));

app.listen(app.get('port'));