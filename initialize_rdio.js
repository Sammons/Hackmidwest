var Rdio = require('./node_modules/rdio/rdio.js')
var RdioCredentials = require('./rdio_consumer_credentials');

// takes an app and injects the 
// logic for a master user logging in
module.exports = function( app ) {

	app.get('/login',function(req,res) {
		var rdio = new Rdio([RdioCredentials.RDIO_CONSUMER_KEY, RdioCredentials.RDIO_CONSUMER_SECRET]);
	    var port = ( app.get('port') == 3000 ? ':3000' : '')
	    var callbackUrl = req.protocol + "://" + req.hostname + port + "/callback";

	    rdio.beginAuthentication(callbackUrl, function(err, authUrl) {
			if (err) {
				console.log(err);
				res.end(new Error("Error beginning authentication"));
			}
			req.session.req_token = { token: rdio.token[0], secret: rdio.token[1] };
			res.redirect(authUrl);
	    });

	})

	app.get('/callback', function(req, res) {
		var requestToken = req.session.req_token;
		//clear token from session
		req.session.req_token = null;
		var verifier = req.query.oauth_verifier;
		if (requestToken && verifier) {
			// exchange the request token and verifier for an access token.
			var rdio = new Rdio(
				[RdioCredentials.RDIO_CONSUMER_KEY,
				 RdioCredentials.RDIO_CONSUMER_SECRET],
				[requestToken.token,
				 requestToken.secret]
				 );

			rdio.completeAuthentication(verifier, function(err) {
				if (err) {
					return console.log(err);
				}
				// log out access token rdio.token[0] and secret [1]
				res.end("success");
			});
		} else {
			res.redirect('/logout');
		}
	})

	app.get('/logout',function( req, res ) {
		for (var i in Object.keys(req.session)) req.session[i] = null;
		res.redirect('/');
	})
}