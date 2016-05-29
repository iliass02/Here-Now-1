app

  .controller('MapCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $stateParams, NgMap, MapFct, FavoritesFct, AuthFct) {
    var options = {timeout: 10000, enableHighAccuracy: true};
    var GoogleKey = "AIzaSyAksXWsv6qT5z_DJk-kWW5wmDXs1TG_BP8";
    var vm = this;
    var userId = $stateParams.userId;
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 10000 });

    $scope.userId = userId;

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
      GetPosition(position);
    });

    $scope.addFavorites = function (name, address, latitude, longitude) {

      var data = {
        userId: userId,
        name: name,
        address: address,
        latitude: latitude,
        longitude: longitude
      };

      FavoritesFct.postFavorite(userId, data)
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

    };

    $scope.directions = function (latitude, longitude) {
      $scope.direction = latitude+', '+longitude;
      $scope.itineraire = true;
    };


    //callback for geolocation watch
    function onSuccess(position) {
      console.log(position);
      GetPosition(position);
    }

    //callback for geolocation watch
    function onError(error) {
      console.log('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    }

    //function get
    function GetPosition (position) {
      $scope.latLng = position.coords.latitude+", "+position.coords.longitude;
      MapFct.getUserInterest(userId)
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
          //get all interest for map
          MapFct.getGoogleInterestsByUserInterests(position, allInterest, 200)
            .success(function (data) {
              $scope.interests = data.results;
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              $ionicLoading.hide();
            });

          //check interest for notification
          MapFct.getGoogleInterestsByUserInterests(position, allInterest, 10)
            .success(function (data) {
              if (data.results.length) {
                var interestId = data.results[0].place_id;
                var text = data.results[0].name;
                var title = "Un point d'intérêt pourrait vous intéresser !";
                var latitude = data.results[0].geometry.location.lat;
                var longitude = data.results[0].geometry.location.lng;

                MapFct.notification(interestId, title, text, latitude, longitude);
              }
            });
        })
        .error(function (err) {
          console.log(err);
        });
    }

  });


