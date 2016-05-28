angular.module('mapFactory', ["ngCordova"])
  .factory('MapFct', function($http, $ionicLoading, $ionicPlatform, $cordovaLocalNotification) {
    return {
      getUserInterest: function(userId) {
        return $http.get(path_url + '/api/v1/users/'+userId+'/interests');
      },
      getGoogleInterestsByUserInterests: function (position, allInterest, radius) {
        var params = {
          location: position.coords.latitude+', '+position.coords.longitude,
          radius: radius,
          types: allInterest,
          key: 'AIzaSyAksXWsv6qT5z_DJk-kWW5wmDXs1TG_BP8'
        };

        return $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {params: params});
      },
      notification: function(interestId, title, text) {
        $ionicPlatform.ready(function () {
          return $cordovaLocalNotification.schedule({
            id: interestId,
            text: text,
            title: title
          });
        });
      }
    }
  });
