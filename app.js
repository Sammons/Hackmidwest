var express = require('express');
var cookieparser = require('cookie-parser')
var session = require('express-session');
var init_rdio = require('./initialize_rdio.js');
var database = require('./database.js')
var app = express();
app.use(session({secret: "sosecret", resave: true, saveUninitialized: true}))
app.set('port', process.env.PORT || 3000)

app.set('view engine', 'vash');


app.get('/', function(req, res) {
	res.render('test.vash')
	res.end();
})

init_rdio(app);

app.use(express.static('public'));
app.listen(3000);