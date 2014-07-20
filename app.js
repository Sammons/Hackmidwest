var express = require('express');
var app = express();

app.set('view engine', 'vash');

app.use(express.static('public'));


app.listen(3000);