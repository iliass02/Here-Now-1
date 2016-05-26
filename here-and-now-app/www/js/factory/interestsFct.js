angular.module('interestsFactory', [])
  .factory('InterestsFct', function($http) {
    return {
      getInterests : function() {
        return $http.get(path_url+'/api/v1/interests');
      },
      postInterests : function(interests, userId) {
        return $http.post(path_url+"/api/v1/users/"+userId+"/interests", interests);
      }
    }
  });
