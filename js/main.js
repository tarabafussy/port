var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
  	chrome.storage.sync.get("tasklist", function(items){
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items.tasklist))
	});
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    chrome.storage.sync.set({tasklist:todos});
  }
}

var app = new Vue({
	el: '#app',
	data: {
		todos:[],
		current:-1,
		options:[
		{value:-1,label:"すべて"},
		{value:0,label:"途中"},
		{value:1,label:"完了"}
		]
	},
	computed: {
		computedTodos:function(){
			return this.todos.filter(function(el){
				return this.current< 0 ? true:this.current === el.state
			},this)
		},
		labels(){
			return this.options.reduce(function(a,b){
				return Object.assign(a,{[b.value]:b.label})
			},{})
		}
	},
	watch: {
		todos:{
			handler:function(todos){
				todoStorage.save(todos)
			},
			deep:true
		}
	},
	created(){
		this.todos = todoStorage.fetch()
			if (localStorage.year != undefined){
				var endyear = parseInt(localStorage.year, 10);
				var endmonth = parseInt(localStorage.month, 10);
				var endday = parseInt(localStorage.day, 10);
				var endhour = parseInt(localStorage.hour, 10);
				var nowdate = new Date();
		    	var nowyear = nowdate.getFullYear();
		   		var nowmonth = nowdate.getMonth();
		    	var nowday = nowdate.getDate();
		    	var nowhour = nowdate.getHours();
		    	if(nowmonth >= endmonth){
		    		if(nowday >= endday){
		    			if(nowhour >= 7){
		    				if(endhour < 7){
		    					this.todos.forEach((object, index) => {
									this.$set(this.todos[index], 'state', 0)
								})
								var enddate = new Date();
								var year = enddate.getFullYear();
								var month = enddate.getMonth();
								var day = enddate.getDate();
								var hour = enddate.getHours();
								localStorage.year = year;
								localStorage.month = month;
								localStorage.day = day;
								localStorage.hour = hour;
		    				}
		    				else if(nowday > endday){
		    					this.todos.forEach((object, index) => {
									this.$set(this.todos[index], 'state', 0)
								})
								var enddate = new Date();
								var year = enddate.getFullYear();
								var month = enddate.getMonth();
								var day = enddate.getDate();
								var hour = enddate.getHours();
								localStorage.year = year;
								localStorage.month = month;
								localStorage.day = day;
								localStorage.hour = hour;
		    				}
		    			}
		    		}
		    		else if(nowmonth > endmonth){
		    			this.todos.forEach((object, index) => {
							this.$set(this.todos[index], 'state', 0)
						})
						var enddate = new Date();
						var year = enddate.getFullYear();
						var month = enddate.getMonth();
						var day = enddate.getDate();
						var hour = enddate.getHours();
						localStorage.year = year;
						localStorage.month = month;
						localStorage.day = day;
						localStorage.hour = hour;
		    		}
		    	}
		    	else if(nowyear > endyear){
		    		this.todos.forEach((object, index) => {
						this.$set(this.todos[index], 'state', 0)
					})
					var enddate = new Date();
					var year = enddate.getFullYear();
					var month = enddate.getMonth();
					var day = enddate.getDate();
					var hour = enddate.getHours();
					localStorage.year = year;
					localStorage.month = month;
					localStorage.day = day;
					localStorage.hour = hour;
		    	}
	    	}
	    	else {
	    		var enddate = new Date();
				var year = enddate.getFullYear();
				var month = enddate.getMonth();
				var day = enddate.getDate();
				var hour = enddate.getHours();
				localStorage.year = year;
				localStorage.month = month;
				localStorage.day = day;
				localStorage.hour = hour;
	    	}
	},
	methods: {
		doAdd:function(event, value){
			var comment = this.$refs.comment
			if (!comment.value.length){
				return
			}
			this.todos.push({
				id:todoStorage.uid++,
				comment:comment.value,
				state:0
			})
			comment.value = ""
		},
		doChangeState:function(item){
			item.state = item.state ? 0:1
		},
		doRemove:function(item){
			var index = this.todos.indexOf(item)
			this.todos.splice(index, 1)
		}
	}
})