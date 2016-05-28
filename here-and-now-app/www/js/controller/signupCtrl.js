app

.controller('SignupCtrl', function ($scope, $location, UsersFct) {

  $scope.signup = function (login, email, password, interests_id) {

    var data = {
      login: login,
      email: email,
      password: password,
      interests_id: interests_id
    };

    //signup new user
    UsersFct.signup(data)
      .success(function(data) {
        Materialize.toast("Inscription réussi", 2000, "green");
        $location.path("/interests/"+data.data.insertId);
      })
      .error(function(data, status) {
        //gest error
        if (status == 500) {
          Materialize.toast("Erreur : tous les champs sont requis !", 1500, "red");
        } else if (status == 401) {
          Materialize.toast("Erreur : le login ou le mail existe déjà !", 1500, "red");
        } else {
          Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
        }
      });
  }

});
