app

  .controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading) {
    var options = {timeout: 10000, enableHighAccuracy: true};

    $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
      });

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


    }, function(error){
      console.log("Could not get location");
    }).finally(function () {
        $ionicLoading.hide();
    });
  })
