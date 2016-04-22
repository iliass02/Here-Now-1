app

.controller('SigninCtrl', function ($scope, $http, $location) {

  $scope.connect = function (login, password) {


    var data = {
      login: login,
      password: password
    };

    console.log(data);

    $http.post(path_url+'/api/v1/signin', data)
      .success(function(data) {
        console.log(data);
        Materialize.toast("Inscription réussi", 2000, "green");
        $location.path("/tab/dash")
      })
      .error(function(data, status) {
        console.log(data);

        if (status == 500) {
          Materialize.toast("Erreur : tous les champs sont requis", 1500, "red");
        } else if (status == 401) {
          Materialize.toast("Erreur :  Login / Email ou mot de passe incorrect", 1500, "red");
        } else  {
          Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
        }
      });

  }

})
