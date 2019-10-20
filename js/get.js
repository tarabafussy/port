document.body.onload = function() {
	chrome.storage.sync.get("task", function(tasks) {
		document.getElementById('tasklist').innerHTML = Object.keys(tasks.task);
	});
}