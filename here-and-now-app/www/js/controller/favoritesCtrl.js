app
.controller('FavoritesCtrl', function($scope, $location, $stateParams, FavoritesFct, $mdDialog, $ionicLoading) {
  var userId = $stateParams.userId;

  $scope.userId = userId;
  $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
  });

  //get favorites by userId
  FavoritesFct.getFavorites(userId)
    .success(function(data) {
      $scope.favorites = data.data;
    })
    .error(function(error, status) {
      Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
    }).finally(function () {
      $ionicLoading.hide();
    });

  //confirm modal to remove favorite
  $scope.showConfirm = function(ev, favoriteId, id) {
    var confirm = $mdDialog.confirm()
      .title('Supprimer une adresse')
      .textContent('Voulez-vous vraiment supprimer cette adresse ?!')
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('Oui')
      .cancel('Non');
    $mdDialog.show(confirm).then(function() {
      removeFavorite(favoriteId, id);
    });
  };

  //remove favorite by favoriteId and refresh $scope.favorites
  function removeFavorite(favoriteId, id) {
    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

    FavoritesFct.deleteFavorite(favoriteId)
      .success(function () {
        $scope.favorites.splice(id,1);
      })
      .error(function (error) {
        Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
      }).finally(function () {
        $ionicLoading.hide();
      });
  }

});
