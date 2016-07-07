angular.module('newsFeedFactory', ['ngCordova'])
  .factory('NewsFeedFct', function ($http) {
    return {
      getNewsFeed: function() {
        return $http.get(path_url+'/api/v1/news-feed');
      },
      postNewsFeed: function(userId, content) {
        var params = {
          Content: content
        };

        return $http.post(path_url+'/api/v1/users/'+userId+'/news-feed', params);
      }
    }

  });
