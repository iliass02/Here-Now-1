app

.controller('SignupCtrl', function ($scope, $http, $location) {

  // list dynamic checkboxes
  $scope.roles = [];
  $scope.user = {
    roles: []
  };

  $scope.test = function () {
    console.log($scope.user.roles);
  }

  $scope.checkAll = function() {
    $scope.user.roles = angular.copy($scope.roles);
  };
  $scope.uncheckAll = function() {
    $scope.user.roles = [];
  };
  $scope.checkFirst = function() {
    $scope.user.roles.splice(0, $scope.user.roles.length);
    $scope.user.roles.push('guest');
  };



  //Get all interests
  $http.get(path_url+'/api/v1/interests-category')
    .success(function(data) {
      console.log(data);
      $scope.roles = data.data;
    })
    .error(function(data) {
      console.log(data);
    })


  //Inscription
  $scope.signup = function (login, email, password, interests_id) {

    var data = {
      login: login,
      email: email,
      password: password,
      interests_id: interests_id
    }

    $http.post(path_url+'/api/v1/signup', data)
      .success(function(data) {
        console.log(data);

        Materialize.toast("Inscription réussi", 2000, "green");
        $location.path("/interests/"+data.data.insertId);
      })
      .error(function(data, status) {
        console.log(status);
        console.log(data);

        if (status == 500) {
          Materialize.toast("Erreur : tous les champs sont requis !", 1500, "red");
        } else if (status == 401) {
          Materialize.toast("Erreur : le login ou le mail existe déjà !", 1500, "red");
        } else {
          Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
        }
      })

  }

});
