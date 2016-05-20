app

.controller("InterestsCtrl", ['$scope', '$stateParams', '$http', '$location', function ($scope, $stateParams, $http, $location)  {


  console.log($stateParams.user_id);

  // list dynamic checkboxes
  $scope.roles = [];
  $scope.user = {
    roles: []
  };

  $scope.test = function () {
    console.log($scope.user.roles);
  }

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
  $http.get(path_url+'/api/v1/interests')
    .success(function(data) {
      console.log(data);
      $scope.roles = data.data;
    })
    .error(function(data) {
      console.log(data);
    })


  $scope.newInterests = function(interests_id) {

    var data = {
      'interests_id': interests_id
    };


    $http.post(path_url+"/api/v1/users/"+$stateParams.user_id+"/interests", data)
      .success(function (data) {
        Materialize.toast("Ajout des centres d'intérêts réussi", 2000, "green");
        $location.path('/map/'+$stateParams.user_id);
      })
      .error(function (data, status) {
        if (status == 500) {
          Materialize.toast("Erreur : Vous devez selectionner au moins 1 centre d'intérêt", 1500, "red");
        } else {
          Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
        }
      });

  }


}]);
