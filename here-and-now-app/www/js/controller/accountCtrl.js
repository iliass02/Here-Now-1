app
.controller('AccountCtrl', function($scope, $location, $stateParams, $ionicLoading, UsersFct, MapFct, AccountFct, InterestsFct) {
  var userId = $stateParams.userId;

  $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
  });

  //android menu
  $scope.android = ionic.Platform.isAndroid();

  $scope.userId = userId;

  UsersFct.getUserById(userId)
    .success(function (user) {
      $scope.user = user.data;
    })
    .error(function () {
      Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
    })
    .finally(function () {
      $ionicLoading.hide();
    });

  MapFct.getUserInterest(userId)
    .success(function (interests) {
      $scope.interests = interests.data;
    })
    .error(function () {
      Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
    });

  AccountFct.getNewsFeedByUserId(userId)
    .success(function (newsFeed) {
      $scope.AllnewsFeed = newsFeed.data;
    })
    .error(function () {
      Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
    });


  $scope.removeInterest = function (interestId) {

    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

    InterestsFct.removeInterest(interestId, userId)
      .success(function () {
        Materialize.toast("Le centre d'intérêt a bien été supprimer", 1500, "green");
      })
      .error(function (error) {
        Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
      })
      .finally(function () {
        $ionicLoading.hide();
      });
  };

});
