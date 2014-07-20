var repository = {};

function filter_track( track ) {
	return track;
}
function filter_album( album ) {
	return album;
}
function filter_artist( artist ) {
	return artist;
}

repository.search = function(query, entities, rdio, callback) {
	 rdio.call('search', {
	 	query: query,
		types: entities,
		count: 60
	}, function(err, data) {
		var track_count = data.result.track_count;
		var results    = data.result.results
		var result     = {
	         albums  : [],
		     artists : [],
		     tracks  : []
		 }
		for (var i = 0; i < results.length; i++) {
			var type_ch = results[i].key[0];
			if (type_ch === 't') 
				{ result.tracks.push( filter_track( results[i] ) ) }
			if (type_ch === 'a')
				{ result.albums.push( filter_album( results[i] ) ) }
			if (type_ch === 'r')
			    { result.artists.push( filter_artist( results[i] ) )}
		}
		callback( result )
	})
	 // return; 

};

repository.getPartyInfo = function(partyUrl, db, callback) {
	callback(db.parties[partyUrl]);
};

repository.getAlbumsForArtist = function(artistId, rdio, callback) {
	rdio.call('getAlbumsForArtist', {
		artist : artistId
	}, function(err, data) {
		callback(filter_album(data.result));
	});
};

repository.getTracksForAlbum = function(albumId, rdio, callback) {
	rdio.call('get', {
		keys : albumId,
		extras : '-*,trackKeys'
	}, function(err, data) {
		rdio.call('get', {
			keys : data.result.trackKeys.join(',')
		}, function(err, data) {
			callback(data.result);
		})
	});
};

repository.createParty = function (partyName, db, callback) {
	var partyUrl = partyName.replace(" ", "_").replace("'", "");
	db.parties[partyUrl] = {
		title : partyName,
		trackVotes : {}
	}
	callback(partyUrl);
};

repository.addTrackToPartyOptions = function(trackInfo, partyUrl, db, callback) {
	trackInfo.votes = 1;
	db.parties[partyUrl].trackVotes[trackInfo.key] = trackInfo;
};

repository.removeTrackFromPartyOptions = function(trackId, partyUrl, db, callback) {
	delete db.parties[partyUrl].trackVotes[trackInfo.key];
};

repository.voteForTrackForParty = function(trackId, partyUrl, db, callback) {
	db.parties[partyUrl].trackVotes[trackId].votes++;
};

repository.voteAgainstTrackForParty = function(trackId, partyUrl, db, callback) {
	db.parties[partyUrl].trackVotes[trackId].votes--;
};

module.exports = repository;