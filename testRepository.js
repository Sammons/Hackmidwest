var repository = {};

repository.search = function(query, entities) {
	return {
		tracks : [
			{
				id : "t123",
				name : "A Song Name",
				album : "I don't know",
				artist : "Someone",
				albumIcon : "http://placehold.it/50&text=dunno"
			},
			{
				id : "t423",
				name : "Bannana",
				album : "Fruit",
				artist : "Farmer",
				albumIcon : "http://placehold.it/50&text=fruit"
			}
		],
		albums : [
			{
				id : "a523",
				name : "I don't know",
				artist : "Someone",
				icon : "http://placehold.it/50&text=dunno"
			},
			{
				id : "a623",
				name : "Just a song",
				artist : "Silly Person",
				icon : "http://placehold.it/50&text=song"
			}
		],
		artists : [
			{
				id : "r723",
				name : "Brittany Spears",
				icon : "http://placehold.it/50&text=Brit"
			},
			{
				id : "r823",
				name : "Weird Al",
				icon : "http://placehold.it/50&text=Al"
			}
		]
	};
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