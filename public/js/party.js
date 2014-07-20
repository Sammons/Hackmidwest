$(function() {
	$("#searchButton").click(function() {
		var $searchForm = $("#searchForm");
		$.post($searchForm.attr("action"), $searchForm.serialize(), function(data) {
			$("#content").html(data);
		});
	});
});