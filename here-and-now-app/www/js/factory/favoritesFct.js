angular.module('favoritesFactory', [])
  .factory('FavoritesFct', function($http) {
    return {
      getFavorites : function(userId) {
        return $http.get(path_url+'/api/v1//users/'+userId+'/interests/favorites');
      },
      postFavorite : function(userId, data) {
        return $http.post(path_url+'/api/v1//users/'+userId+'/interests/favorites', data);
      },
      deleteFavorite : function(favoriteId) {
        return $http.delete(path_url+'/api/v1/interests/favorites/'+favoriteId);
      }
    }
  });
