document.body.onload = function() {
	chrome.storage.sync.get("task", function(tasks) {
		document.getElementById('tasklist').innerHTML = tasks.task;
	});
}