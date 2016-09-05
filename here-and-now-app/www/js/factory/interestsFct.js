angular.module('interestsFactory', [])
  .factory('InterestsFct', function($http) {
    return {
      getInterests : function() {
        return $http.get(path_url+'/api/v1/interests');
      },
      postInterests : function(interests, userId) {
        return $http.post(path_url+"/api/v1/users/"+userId+"/interests", interests);
      },
      updateInterests : function (interests, userId) {
        return $http.put(path_url+'/api/v1/users/'+userId+'/interests', {}, {params: interests});
      },
      removeInterest: function (interest, userId) {
        var params = {
          interests_id: interest
        };

        return $http.delete(path_url+'/api/v1/users/'+userId+'/interests', {params: params});
      },
      getUserInterests : function (userId) {
        return $http.get(path_url+'/api/v1/users/'+userId+'/interests');
      }
    }
  });
