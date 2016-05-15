app

.controller('SigninCtrl', function ($scope, $http, $location, $firebaseAuth) {

  $scope.facebook = function () {
    var ref = new Firebase('https://here-and-now.firebaseio.com');
    var authObject = $firebaseAuth(ref);

    authObject.$authWithOAuthPopup('facebook').then(function (authData) {
      console.log(authData);
      alert ('cool');
    }).catch(function (err) {
      console.log(err)
    })

  }

  $scope.twitter = function () {
    var ref = new Firebase('https://here-and-now.firebaseio.com');
    var authObject = $firebaseAuth(ref);

    authObject.$authWithOAuthPopup('twitter').then(function (authData) {
      console.log(authData);
      alert ('cool');
    }).catch(function (err) {
      console.log(err)
    })

  }

  $scope.google = function () {
    var ref = new Firebase('https://here-and-now.firebaseio.com');
    var authObject = $firebaseAuth(ref);

    authObject.$authWithOAuthPopup('google').then(function (authData) {
      console.log(authData);
      alert ('cool');
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
        $location.path("/map");
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
