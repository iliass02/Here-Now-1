app
.controller('InterestsUpdateCtrl', function ($scope, $stateParams, $state, InterestsFct, MapFct, $location) {
  var userId = $stateParams.userId;

  // list dynamic checkboxes
  $scope.roles = [];
  $scope.user = {
    roles: []
  };

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
  InterestsFct.getInterests()
    .success(function(data) {
      console.log(data);
      $scope.roles = data.data;
    })
    .error(function(data) {
      console.log(data);
    });


  $scope.updateInterests = function (interests) {
    var params = {
      interests_id: interests
    };

    InterestsFct.updateInterests(params, userId)
      .success(function (success) {
        Materialize.toast("Ajout des centres d'intérêts réussi", 2000, "green");
        $location.path('/account/'+userId);
      })
      .error(function (error, status) {
        //gest error
        if (status == 400) {
          Materialize.toast("Erreur : Vous devez selectionner au moins 1 centre d'intérêt", 1500, "red");
        } else {
          Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
        }
      });
  };


});
