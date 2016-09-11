angular.module('usersFactory', [])
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
      },
      socialSignin : function(authObject, social) {
        return authObject.$authWithOAuthPopup(social, {
          remember: "sessionOnly",
          scope: "email"
        });
      },
      getUserById: function(userId) {
        return $http.get(path_url+'/api/v1/users/'+userId);
      },
      updateUserInfoById: function (userId, login, email, password, lastname, firstname, birth_day, sexe) {
        var params = {
          login: login,
          email: email,
          password: password,
          lastname: lastname,
          firstname: firstname,
          birth_day: birth_day,
          sexe: sexe
        };

        return $http.put(path_url+'/api/v1/users/'+userId, {}, {params: params});
      }
    }
  });
