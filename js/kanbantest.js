document.body.onload = function(){
		var kanban = new jKanban({
			element: '#testlist',
			gutter: '15px',
			widthBoard: '250px',
			addItemButton : true,
			buttonClick: (elem, id) => addFormElement(id),
			boards: [
			{
				"id": "test1",
				"title": "テスト",
				"item": [{"title": "タスク内容"}]
			}
			]
		});
		function addFormElement( id ) {
			const formItem = document.createElement('form');
			formItem.innerHTML = '<input type="text">';
			kanban.addForm( id, formItem );
			formItem.addEventListener('submit', (e) => {
				e.preventDefault();
				//入力された「タスク」をボードに登録
				kanban.addElement(id, {"title": e.target[0].value});
				//フォーム要素を非表示にするため削除
				formItem.parentNode.removeChild(formItem);
			})
		}
}