app

.controller('SigninCtrl', function ($scope, $location, $firebaseAuth, UsersFct, $cookieStore, $ionicLoading) {

  var ref = new Firebase('https://here-and-now.firebaseio.com');
  var authObject = $firebaseAuth(ref);
  var userObj = $cookieStore.get('userObj');


  $scope.facebook = function () {

    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

    UsersFct.socialSignin(authObject, 'facebook')
      .then(function(authData) {
        //get user login facebook
        var firstname = authData.facebook.cachedUserProfile.first_name,
          lastname = authData.facebook.cachedUserProfile.last_name,
          loginuser = firstname + '_' + lastname,
          profileImageURL = authData.facebook.cachedUserProfile.picture.data.url;

        //find user by login
        UsersFct.findUserByLogin(loginuser)
          .success(function(user) {
            if (user.data == null){
              //user doesn't exist => signup
              $scope.signup(loginuser, authData.facebook.email, authData.facebook.id, profileImageURL);
            } else{
              //user exist => signin
              $cookieStore.put('userObj', user.data);
              Materialize.toast("Connexion réussi", 2000, "green");
              $location.path("/map/"+user.data.id);
            }
          })
          .finally(function () {
            $ionicLoading.hide();
          });
      });

  };


  $scope.google = function () {

    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

    UsersFct.socialSignin(authObject, 'google')
      .then(function(authData) {
        //get user login google
        var firstname = authData.google.cachedUserProfile.family_name,
          lastname = authData.google.cachedUserProfile.given_name,
          loginuser = firstname + '_' + lastname,
          profileImageURL = authData.google.profileImageURL;


        //find user by login
        UsersFct.findUserByLogin(loginuser)
          .success(function(user) {
            if (user.data == null){
              //user doesn't exist => signup
              $scope.signup(loginuser, authData.google.email, authData.google.id, profileImageURL);
            } else{
              //user exist => signin
              $cookieStore.put('userObj', user.data);
              Materialize.toast("Connexion réussi", 2000, "green");
              $location.path("/map/"+user.data.id);
            }
          })
          .finally(function () {
            $ionicLoading.hide();
          });
      });

  };


  $scope.connect = function (login, password) {

    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

    var data = {
      login: login,
      password: password
    };

    UsersFct.signin(data)
      .success(function(data) {
        $cookieStore.put('userObj', data.data);
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
      })
      .finally(function () {
        $ionicLoading.hide();
      });

  };

  $scope.signup = function (login, email, password, profileImageURL) {

    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

      var data = {
        login: login,
        email: email,
        password: password,
        profileImageURL: profileImageURL,
        social: 1
      };

      UsersFct.signup(data)
        .success(function(data) {
          $cookieStore.put('userObj', data.data);
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
        })
        .finally(function () {
          $ionicLoading.hide();
        });

  }

});
