function TodoCtrl($scope) {
  
  $scope.todos = [
                  {text: "lean Erlang",  done:true},
		  {text: "lean Angular", done:false}];

  $scope.addTodo = function() {
    $scope.todos.push({text: $scope.todoText,  done:false})
    $scope.todoText = "";
  }

  $scope.nokori = function() {
    var count = 0;

    angular.forEach($scope.todos, function(todo) {
	count += todo.done ? 0 : 1;
      })

    return count;
  }
}
