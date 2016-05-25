angular.module('usersFactory', [])

// super simple service
// each function returns a promise object
  .factory('UsersFct', function($http) {
    return {
      getUsers : function() {
        return $http.get(path_url+'/api/v1/users');
      },
      signin : function(dataUser) {
        return $http.post(path_url+'/api/v1/signin', dataUser);
      },
      signup : function(dataUser) {
        return $http.post(path_url+'/api/v1/signup', dataUser);
      },
      findUserByLogin : function(login) {
        return $http.get(path_url+'/api/v1/users/' + login);
      }

    }
  });
