app
.controller('AccountUpdateCtrl', function ($state, $stateParams, $scope, $location, $ionicLoading, UsersFct) {
  var userId = $stateParams.userId;

  //TODO Change function getUserByLogin to getUserByEmail


  $scope.userId = userId;
  $scope.onezoneDatepicker = {
    date: new Date().getYear() - 10, // MANDATORY
    mondayFirst: false,
    months: new Date().getMonth(),
    disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
    showDatepicker: false,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    callback: function(value){
      // your code
    }
  };

  UsersFct.getUserById(userId)
    .success(function (user) {
      $scope.user = user.data;
    })
    .error(function () {
      Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
    });

  $scope.updateInfo = function (lastname, firstname, login, password, password_, email, sexe, birth_day) {
    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

    console.log(sexe);
    console.log($scope.birth_day);

    if(password != password_) {
      $ionicLoading.hide();
      return Materialize.toast("Erreur : les mots de passe ne correspondent pas !", 1500, "red");
    } else if (!email || !login) {
      $ionicLoading.hide();
      return  Materialize.toast("Erreur : les champs login et email sont requis !", 1500, "red");
    }

    if (email.length == 0 && login.length == 0 ) {
      console.log('password null');
      $ionicLoading.hide();
    } else {
      console.log('send');
      UsersFct.updateUserInfoById(userId, login, email, password, lastname, firstname, birth_day, sexe)
        .success(function (success) {
          Materialize.toast("Vos informations ont bien été mis à jours ", 1500, "green");
        })
        .error(function (error) {
          Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
        })
        .finally(function () {
          $ionicLoading.hide();
        });
    }
  }


});
