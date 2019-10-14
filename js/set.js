document.getElementById('set').onclick = function() {
	chrome.storage.sync.get("task", function(task){
		var newtask = document.getElementById('tasktext').value;
		var newtasks = task.task.concat(newtask);
		chrome.storage.sync.set({task:newtasks});
	});
}