app

.controller('LoginCtrl', function ($scope, $http, $location) {

  $scope.connect = function (login, password) {


    var data = {
      login: login,
      password: password
    };

    $http.post(path_url+'/api/v1/login', data)
      .success(function(data) {
        console.log(data);
        $location.path("/tab/dash")
      })
      .error(function(data) {
        console.log(data);
      });

  }

})
