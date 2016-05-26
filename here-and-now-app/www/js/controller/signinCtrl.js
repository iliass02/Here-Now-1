app

.controller('SigninCtrl', function ($scope, $location, $firebaseAuth, UsersFct) {

  var ref = new Firebase('https://here-and-now.firebaseio.com');
  var authObject = $firebaseAuth(ref);

  $scope.facebook = function () {

    UsersFct.socialSignin(authObject, 'facebook')
      .then(function(authData) {
        //get user login facebook
        var firstname = authData.facebook.cachedUserProfile.first_name;
        var lastname = authData.facebook.cachedUserProfile.last_name;
        var loginuser = firstname + '_' + lastname;

        //find user by login
        UsersFct.findUserByLogin(loginuser)
          .success(function(user) {
            if (user.data == null){
              //user doesn't exist => signup
              $scope.signup(loginuser, authData.facebook.email, authData.facebook.id);
            } else{
              //user exist => signin
              Materialize.toast("Connexion réussi", 2000, "green");
              $location.path("/map/"+user.data.id);
            }
          });
      });

  };


  $scope.google = function () {

    UsersFct.socialSignin(authObject, 'google')
      .then(function(authData) {
        //get user login google
        var firstname = authData.google.cachedUserProfile.family_name;
        var lastname = authData.google.cachedUserProfile.given_name;
        var loginuser = firstname + '_' + lastname;

        //find user by login
        UsersFct.findUserByLogin(loginuser)
          .success(function(user) {
            if (user.data == null){
              //user doesn't exist => signup
              $scope.signup(loginuser, authData.google.email, authData.google.id);
            } else{
              //user exist => signin
              Materialize.toast("Connexion réussi", 2000, "green");
              $location.path("/map/"+user.data.id);
            }
          });
      });

  };


  $scope.connect = function (login, password) {

    var data = {
      login: login,
      password: password
    };

    UsersFct.signin(data)
      .success(function(data) {
        Materialize.toast("Connexion réussi", 2000, "green");
        $location.path("/map/"+data.data.id);
      })
      .error(function(data, status) {
        //gest error
        if (status == 500) {
          Materialize.toast("Erreur : tous les champs sont requis", 1500, "red");
        } else if (status == 401) {
          Materialize.toast("Erreur :  Login / Email ou mot de passe incorrect", 1500, "red");
        } else  {
          Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
        }
      });

  };

  $scope.signup = function (login, email, password) {

      var data = {
        login: login,
        email: email,
        password: password
      };

      UsersFct.signup(data)
        .success(function(data) {
          Materialize.toast("Inscription réussi", 2000, "green");
          $location.path("/interests/"+data.data.id);
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
