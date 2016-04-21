app

.controller('SignupCtrl', function ($scope, $http, $location) {

  //Inscription
  $scope.signup = function (login, email, password) {


    console.log(login, email, password);

    var data = {
      login: login,
      email: email,
      password: password
    }

    $http.post(path_url+'/api/v1/signup', data)
      .success(function(data) {
        console.log(data);
        $location.path("/tab/dash")
      })
      .error(function(data) {
        console.log(data);
      })

  }


});
