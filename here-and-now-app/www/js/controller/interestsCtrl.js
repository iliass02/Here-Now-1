app

.controller("InterestsCtrl", function ($scope, $stateParams, $http, $location, InterestsFct)  {

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



  $scope.newInterests = function(interests_id) {

    var data = {
      'interests_id': interests_id
    };
    var userId = $stateParams.user_id;

    //post new interest for current user
    InterestsFct.postInterests(data, userId)
      .success(function (data) {
        Materialize.toast("Ajout des centres d'intérêts réussi", 2000, "green");
        $location.path('/map/'+userId);
      })
      .error(function (data, status) {
        //gest error
        if (status == 500) {
          Materialize.toast("Erreur : Vous devez selectionner au moins 1 centre d'intérêt", 1500, "red");
        } else {
          Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
        }
      });

  }


});
