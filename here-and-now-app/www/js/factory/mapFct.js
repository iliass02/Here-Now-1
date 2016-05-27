angular.module('mapFactory', [])
  .factory('MapFct', function($http, $ionicLoading) {
    return {
      getUserInterest: function(userId) {
        return $http.get(path_url + '/api/v1/users/'+userId+'/interests');
      },
      getGoogleInterestsByUserInterests: function (position, allInterest) {
        var params = {
          location: position.coords.latitude+', '+position.coords.longitude,
          radius: 200,
          types: allInterest,
          key: 'AIzaSyAksXWsv6qT5z_DJk-kWW5wmDXs1TG_BP8'
        };

        return $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {params: params});
      }
    }
  });
