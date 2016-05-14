app

  .controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading, $stateParams, $http, NgMap) {
    var options = {timeout: 10000, enableHighAccuracy: true};

    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAksXWsv6qT5z_DJk-kWW5wmDXs1TG_BP8";


        $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

          $scope.latLng = position.coords.latitude+", "+position.coords.longitude;


          $http.get(path_url + '/api/v1/interests/user/' + $stateParams.user_id)
            .success(function (data) {
              var interests = data.data;




              var params = {
                location: position.coords.latitude+', '+position.coords.longitude,
                radius: 500,
                types: 'university|food',
                key: 'AIzaSyAksXWsv6qT5z_DJk-kWW5wmDXs1TG_BP8'
              }



              $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {params: params})
                .success(function (data) {
                  $scope.interests = data.results;
                })
                .error(function (err) {
                  console.log(err);
                })
                .finally(function () {
                  $ionicLoading.hide();
                })

            })
            .error(function (err) {
              console.log(err);
            })
        });

  })
