
$(function() {
	$("#searchButton").click(function() {
		var $searchForm = $("#searchForm");
		$.post($searchForm.attr("action"), $searchForm.serialize(), function(data) {
			$("#content").html(data);
		});
	});
	$('form').submit(function(e){
		e.preventDefault();
		$("#searchButton").click();
	})
	$("#content").on("click", ".add-track-button", function() {
		// $.post('addTrack', { trackId : $(this).data("trackId")});
		apiswf.rdio_play($(this).data("trackId"));
	}).on("click", ".up-vote-button", function() {
		$.post('upvote', { trackId : $(this).data("trackId")});
	}).on("click", ".down-vote-button", function() {
		$.post('downvote', { trackId : $(this).data("trackId")});
	}).on("click", ".album-button", function() {
		$.post('removeTrack', { trackId : $(this).data("albumId")}, function(data) {
			$("#content").html(data);
		});
	}).on("click", ".artist-button", function() {
		$.post('upvote', { trackId : $(this).data("artistId")}, function(data) {
			$("#content").html(data);
		});
	});
});