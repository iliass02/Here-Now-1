angular.module('interestDetailFactory', ['ngCordova'])
  .factory('InterestDetailFct', function ($http) {
    return {
      getInterestDetail:  function (interestId) {
        return $http.get('https://maps.googleapis.com/maps/api/place/details/json?placeid='+interestId+'&key=AIzaSyAksXWsv6qT5z_DJk-kWW5wmDXs1TG_BP8');
      },
      getOpinions: function (interestId) {
        return $http.get(path_url+'/api/v1/opinions/interest/'+interestId);
      },
      postOpinions: function (interestId, userId, content) {
        var params = {
          Content: content,
          InterestId: interestId
        };

        return $http.post(path_url+'/api/v1/users/'+userId+'/opinion', params);
      }
    }
  });
