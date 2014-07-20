var mongoose = require('mongoose');
var user = process.env.DBUSER;
var pass = process.env.DBPASS;
mongoose.connect("devrecord.com:27017/hm",{
	user: user,
	password:pass
});

var Schema = mongoose.Schema

var User = new Schema({
	 rdioId: String
	,rdioAccess: String
	,rdioAccessSecret: String
})

var UserModel = mongoose.model('user',User);
module.exports.user = UserModel;