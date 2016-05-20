app

.controller('SigninCtrl', function ($scope, $http, $location, $firebaseAuth) {

  var ref = new Firebase('https://here-and-now.firebaseio.com');
  var authObject = $firebaseAuth(ref);

  $scope.facebook = function () {

    authObject.$authWithOAuthPopup('facebook', {
      remember: "sessionOnly",
      scope: "email"
    }).then(function (authData) {
      var loginuser = authData.facebook.cachedUserProfile.first_name + '_' + authData.facebook.cachedUserProfile.last_name;

      console.log(authData);
      $http.get(path_url+'/api/v1/users/' + loginuser)
        .success(function(user) {
          if (user.data == null){
            $scope.signup(loginuser, authData.facebook.email, authData.facebook.id);
          } else{
            Materialize.toast("Connexion réussi", 2000, "green");
            $location.path("/map/"+user.data.id);
          }
        });
    }).catch(function (err) {
      console.log(err)
    })

  }


  $scope.google = function () {


    authObject.$authWithOAuthPopup('google', {
      remember: "sessionOnly",
      scope: "email"
    }).then(function (authData) {
      var loginuser = authData.google.cachedUserProfile.family_name + '_' + authData.google.cachedUserProfile.given_name;

      $http.get(path_url+'/api/v1/users/' + loginuser)
        .success(function(user) {
            if (user.data == null) {
              $scope.signup(loginuser, authData.google.email, authData.google.id);
            } else {
              Materialize.toast("Connexion réussi", 2000, "green");
              $location.path("/map/"+user.data.id);
            }
        });

    }).catch(function (err) {
      console.log(err)
    })

  }


  $scope.connect = function (login, password) {


    var data = {
      login: login,
      password: password
    };

    console.log(data);

    $http.post(path_url+'/api/v1/signin', data)
      .success(function(data) {
        console.log(data);
        Materialize.toast("Connexion réussi", 2000, "green");
        $location.path("/map/"+data.data.id);
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
          $location.path("/interests/"+data.data.id);
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


})
