document.body.onload = function() {
	chrome.storage.sync.get("task", function(tasks) {
		var tasklist = new Array();
		tasklist.push(tasks.task);
		for (var taskname in tasklist) {
			document.getElementById('tasklist').innerHTML += taskname;
		}
	});
}