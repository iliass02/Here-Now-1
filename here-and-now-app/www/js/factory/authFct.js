angular.module('authFactory', ['ngCookies'])
  .factory('AuthFct', function($cookieStore) {
    return {
      setAccessToken : function(accessToken) {
        return $cookieStore.put('accessToken', accessToken);
      },
      getAccessToken : function() {
        return $cookieStore.get('accessToken');
      }
    }
  });
