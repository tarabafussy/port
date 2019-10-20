document.getElementById('set').onclick = function() {
	var tasklist = {};
	chrome.storage.sync.get("task", function(tasks){
		if(tasks.task != null ){
			tasklist = tasks.task;
		}
		tasklist[document.getElementById('tasktext').value] = "nocomp";
		chrome.storage.sync.set({task:tasklist});
	});
}