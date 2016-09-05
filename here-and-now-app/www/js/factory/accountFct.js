angular.module('accountFactory', ['ngCordova'])
  .factory('AccountFct', function ($http) {
    return {
      getOpinionByUserId: function (userId) {
        return $http.get(path_url+'/api/v1/users/'+userId+'/opinion');
      },
      getNewsFeedByUserId: function (userId) {
        return $http.get(path_url+'/api/v1/users/'+userId+'/news-feed');
      }
    }
  });
