document.getElementById('set').onclick = function() {
	var newtask = {
		prioritytask: [],
		taskst:[]
	};
	var tasklist = new Array();

	chrome.storage.sync.get("task", function(tasks){
		newtask["prioritytask"] = document.getElementById('tasktext').value;
		newtask["taskst"] = "nocomp";
		tasklist = tasks.task;
		tasklist.push(newtask);
		chrome.storage.sync.set({task:tasklist});
	});
}