document.body.onload = function(){

  var defboard = [
      {
        "id": "test1",
        "title": "日課",
        "item": [
                {"title": "散歩"},
                {"title": "散歩2"},
                {"title": "散歩3"}
                ]
      },
      {
        "id": "test2",
        "title": "優先タスク",
        "item": [{"title": "掃除"}]
      },
      {
        "id": "test3",
        "title": "予定",
        "item": [{"title": "買い物"}]
      }
  ];
  chrome.storage.sync.get("board", function(ddd){
    if(ddd.board != null ){
      defboard = ddd.board;
    }
    var kanban = new jKanban({
      element: '#testlist',
      gutter: '15px',
      widthBoard: '250px',
      addItemButton : true,
      buttonClick: (elem, id) => addFormElement(id),
      boards: defboard,
      click: (elem) => kanban.removeElement(elem)
    });

    function addFormElement( id ) {
      var boardid = id;
      function getRecNum(objArray,key,data){
        var Val1;
        for(i = 0;i < objArray.length;i++){
          for(key in objArray[i]){
            if(objArray[i][key] == data) Val1 = i;
          }
        }
        return Val1;
      };
      boardid = getRecNum(defboard,"id",id);

      var formItem = document.createElement('form');
      formItem.innerHTML = '<input type="text">';
      kanban.addForm( id, formItem );
      formItem.addEventListener('submit', (e) => {
        e.preventDefault();
        //入力された「タスク」をボードに登録
        kanban.addElement(id, {"title": e.target[0].value});
        defboard[boardid]["item"][defboard[boardid]["item"].length] = {"title": e.target[0].value};
        chrome.storage.sync.set({board:defboard});
        //フォーム要素を非表示にするため削除
        formItem.parentNode.removeChild(formItem);
      })
    }
  });
}