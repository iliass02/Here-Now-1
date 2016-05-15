app

  .controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading, $stateParams, $http, NgMap) {
    var options = {timeout: 10000, enableHighAccuracy: true};
    var GoogleKey = "AIzaSyAksXWsv6qT5z_DJk-kWW5wmDXs1TG_BP8";
    var vm = this;
    NgMap.getMap().then(function(map) {
      vm.map = map;
    });

    // vm.clicked = function() {
    //   alert('Clicked a link inside infoWindow');
    // };

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
      alert($scope.latLng);


      $http.get(path_url + '/api/v1/interests/user/' + $stateParams.user_id)
        .success(function (data) {
          var interests = data.data;
          var allInterest;
          var params = {
            location: position.coords.latitude+', '+position.coords.longitude,
            radius: 100,
            types: allInterest,
            key: 'AIzaSyAksXWsv6qT5z_DJk-kWW5wmDXs1TG_BP8'
          };

          for (i = 0; i < interests.length; i ++) {
            if (i == 0) {
              allInterest = interests[i].name;
            } else {
              allInterest = allInterest+'|'+interests[i].name;
            }
          }


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

  })
