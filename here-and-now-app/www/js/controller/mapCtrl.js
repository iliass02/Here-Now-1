app

  .controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading, $stateParams, $http, NgMap) {
    var options = {timeout: 10000, enableHighAccuracy: true};
    var GoogleKey = "AIzaSyAksXWsv6qT5z_DJk-kWW5wmDXs1TG_BP8";
    var vm = this;
    var userId = $stateParams.userId;

    NgMap.getMap().then(function(map) {
      vm.map = map;
    });

    vm.showDetail = function(e, interest) {
      console.log(interest);
      vm.interest = interest;
      console.log(interest.id);
      vm.map.showInfoWindow('foo-iw', interest.id);
    };


    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key="+GoogleKey;





    $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

      $scope.latLng = position.coords.latitude+", "+position.coords.longitude;


      $http.get(path_url + '/api/v1/users/'+ $stateParams.userId+'/interests')
        .success(function (data) {
          var interests = data.data;
          var allInterest;

          for (i = 0; i < interests.length; i ++) {
            if (i == 0) {
              allInterest = interests[i].interest.name;
            } else {
              allInterest = allInterest+'|'+interests[i].interest.name;
            }
          }
          
          var params = {
            location: position.coords.latitude+', '+position.coords.longitude,
            radius: 100,
            types: allInterest,
            key: 'AIzaSyAksXWsv6qT5z_DJk-kWW5wmDXs1TG_BP8'
          };



          $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {params: params})
            .success(function (data) {
              console.log(allInterest);
              $scope.interests = data.results;
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              $ionicLoading.hide();
            });

        })
        .error(function (err) {
          console.log(err);
        });
    });


    $scope.addFavorites = function (name, address, latitude, longitude) {

      var data = {
        userId: userId,
        name: name,
        address: address,
        latitude: latitude,
        longitude: longitude
      };

      $http.post(path_url+'/api/v1/users/'+$stateParams.userId+'/interests/favorites', data)
        .success(function (data) {
          Materialize.toast("Ajout en favoris réussi", 2000, "green");
        })
        .error(function (err, status) {
          if (status == 401) {
            Materialize.toast("Erreur : Ce point d'intérêt est déjà dans vos favoris !", 1500, "red");
          } else {
            Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
          }
        });

    }


    $scope.directions = function (latitude, longitude) {

      $scope.direction = latitude+', '+longitude;
      $scope.itineraire = true;
    }

  });
