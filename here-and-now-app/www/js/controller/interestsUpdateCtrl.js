app
.controller('InterestsUpdateCtrl', function ($scope, $stateParams, $state, InterestsFct, MapFct, $location) {
  var userId = $stateParams.userId;

  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

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

  console.log($scope.user);

  //Get all interests
  InterestsFct.getInterests()
    .success(function(data1) {
      $scope.roles = data1.data;
      //Get User Interests
      InterestsFct.getUserInterests(userId)
        .success(function (data2) {
          for (var i = 0; i < data1.data.length; i++) {
            for (var j = 0; j < data2.data.length; j++) {
              if (data1.data[i].id == data2.data[j].interest_id) {
                data1.data.splice(i, 1);
              }
            }
          }
          $scope.roles = data1.data;
        })
        .error(function (err) {
          console.log(err);
        });
    })
    .error(function(data) {
      console.log(data);
    });


  $scope.updateInterests = function (interests) {
    var params = {
      interests_id: interests
    };
    console.log(params);

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
