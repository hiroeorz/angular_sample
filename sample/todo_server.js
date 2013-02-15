function TodoServerCtrl($scope, $http) {

  var todo_list_url = "/buckets/angular_sample/keys/todo_list.json";

  /* 最初にサーバー上のjsonファイルを読み込んで$scope.todoに入れる */
  $http({
    url: todo_list_url,
	method: "GET",
	
    }).success(function(data, status, headers, config) {
        $scope.todos = data;

    }).error(function(data, status, headers, config) {
	$scope.todos = [];
    });

  /* リストへの項目の追加。サーバーへ保存する */
  $scope.addTodo = function() {
    var data = {id: nextId(), text: $scope.todoText,  done:false}
    var newList = $scope.todos.concat([data]);

    $http({
      url: todo_list_url,
	  method: "POST",
	  data: newList

      }).success(function(data, status, headers, config) {
          $scope.todos = newList;
          $scope.todoText = "";

      }).error(function(data, status, headers, config) {
	  alert("サーバーとの通信に失敗しました");
      });
  }

  /* todoをクリアする。サーバー上のデータを削除します */
  $scope.clearTodo = function() {
    $http({
      url: todo_list_url,
	  method: "DELETE",

      }).success(function(data, status, headers, config) {
          $scope.todos = [];

      }).error(function(data, status, headers, config) {
	  alert("サーバーとの通信に失敗しました");
      });
  }

  /* 実施済みかどうかのチェックボックスが状態変化したとき */
  /* サーバーに変更を保存する                        */
  $scope.changeDone = function(todo) {
    $http({
      url: todo_list_url,
	  method: "PUT",
	  data: $scope.todos

      }).success(function(data, status, headers, config) {

      }).error(function(data, status, headers, config) {
	  alert("サーバーとの通信に失敗しました");
      });
  }

  /* まだ実行していない項目の項目数をかえす */
  $scope.nokori = function() {
    var count = 0;

    angular.forEach($scope.todos, function(todo) {
	count += todo.done ? 0 : 1;
    })

    return count;
  }

  /*  
   @private
   現在持っているリストの最大値に+1したものをかえす
   */
  var nextId = function() {
    var _maxId = 0;

    angular.forEach($scope.todos, function(todo) {
	_maxId = todo.id > _maxId ? todo.id : _maxId;
    })

    return _maxId + 1;
  }
}
