document.body.onchange = function(){
		var a = $(".kanban-board").map(function(){
			var b = $(this).attr('data-id');
			return [
		    {
		    	id:$(this).attr('data-id'),
		    	title:"日課",
		    	item:[{title:$(this).find(".kanban-item").text()}]
		    }
		    ]
		}).get();
	  	console.log(a);
	  	console.log(JSON.stringify(a));
}