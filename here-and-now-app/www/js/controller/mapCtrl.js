app

  .controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading) {
    var options = {timeout: 10000, enableHighAccuracy: true};

    $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
      });

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      navigator.geolocation.getCurrentPosition(function(pos) {
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        /*var myLocation = new google.maps.Marker({
          position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
          map: map,
          title: "My Location"
        });*/
      });

      $scope.map = map;


    }, function(error){
      console.log("Could not get location");
    }).finally(function () {
        $ionicLoading.hide();
    });

  })
