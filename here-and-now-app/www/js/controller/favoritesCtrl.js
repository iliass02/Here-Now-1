app
.controller('FavoritesCtrl', function($scope, $location, $stateParams, FavoritesFct, $mdDialog) {
  var userId = $stateParams.userId;

  $scope.userId = userId;

  FavoritesFct.getFavorites(userId)
    .success(function(data) {
      console.log(data);
      $scope.favorites = data.data;
    })
    .error(function(error, status) {
      console.log(error, status);
    });

  $scope.showConfirm = function(ev, favoriteId, id) {
    // Appending dialog to document.body to cover sidenav in docs app
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

  function removeFavorite(favoriteId, id) {
    console.log('remove favorite', favoriteId);
    FavoritesFct.deleteFavorite(favoriteId)
      .success(function () {
        console.log('OK');
        $scope.favorites.splice(id,1);
      })
      .error(function (error) {
        console.log(error);
      });
  }

});
