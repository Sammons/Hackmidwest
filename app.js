var express = require('express');
var app = express();

app.set('view engine', 'vash');


app.get('/', function(req, res) {
	res.render('test.vash')
	res.end();
})

app.use(express.static('public'));
app.listen(3000);