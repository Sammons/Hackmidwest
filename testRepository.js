var repository = {};

repository.search = function(query, entities) {
	return {
		tracks : [
			{
				name : "A Song Name",
				album : "I don't know",
				artist : "Someone",
				icon : "http://placehold.it/50&text=dunno"
			},
			{
				name : "Bannana",
				album : "Fruit",
				artist : "Farmer",
				icon : "http://placehold.it/50&text=fruit"
			}
		],
		albums : [
			{
				name : "I don't know",
				artist : "Someone",
				icon : "http://placehold.it/50&text=dunno"
			},
			{
				name : "Just a song",
				artist : "Silly Person",
				icon : "http://placehold.it/50&text=song"
			}
		],
		artists : [
			{
				name : "Brittany Spears",
				icon : "http://placehold.it/50&text=Brit"
			},
			{
				name : "Weird Al",
				icon : "http://placehold.it/50&text=Al"
			}
		]
	};
};

repository.getVotedTracks = function(partyId) {
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


module.exports = repository;