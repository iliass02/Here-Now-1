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
        Materialize.toast("Inscription réussi", 2000, "green");
        $location.path("/tab/dash")
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
