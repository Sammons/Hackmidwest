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

repository.getPartyInfo = function(partyUrl) {
	return {
		title : "Ben's Party",
		partyId : 3
	}
};

repository.getVotedTracks = function(partyId) {
	//this information should actually be stored in our database so we don't have to hit the rdio ws
	return [{
		name : "A Song Name",
		album : "I don't know",
		artist : "Someone",
		votes : 5,
		icon : "http://placehold.it/50&text=dunno"
	},
	{
		name : "Bannana",
		album : "Fruit",
		artist : "Farmer",
		votes : 15,
		icon : "http://placehold.it/50&text=fruit"
	}];
};

repository.getAlbumsForArtist = function(artistId) {
	return [{
		name : "I don't know",
		artist : "Someone",
		icon : "http://placehold.it/50&text=dunno"
	}];
};

repository.getTracksForAlbum = function(albumId) {
	return [{
		name : "Bannana",
		album : "Fruit",
		artist : "Farmer",
		icon : "http://placehold.it/50&text=fruit"
	}];
};

repository.addTrackToPartyOptions = function(trackId, partyId) {
	//TODO: stuff
};

repository.removeTrackFromPartyOptions = function(trackId, partyId) {
	//TODO: stuff
	//this should be the result of a track getting too heavily downvoted or the admin removing it
	//if the admin removes it maybe we should ban it too (that would be some extra work)
};

repository.voteForTrackForParty = function(trackId, partyId) {
	//TODO: stuff
};

repository.voteAgainstTrackForParty = function(trackId, partyId) {
	//TODO: stuff
};

module.exports = repository;