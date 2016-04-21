app

.controller('SignupCtrl', function ($scope, $http, $location) {

  //Get all interests
  $http.get(path_url+'/api/v1/interests-category')
    .success(function(data) {
      console.log(data);
      $scope.categories = data.data;
    })
    .error(function(data) {
      console.log(data);
    })


  //Inscription
  $scope.signup = function (login, email, password) {

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
