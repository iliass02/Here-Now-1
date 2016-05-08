app

  .controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading) {
    var options = {timeout: 10000, enableHighAccuracy: true};

    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

    ionic.Platform.ready( function() {  

      var myLatlng = new google.maps.LatLng(48.8534100, 2.3488000);  
      var mapOptions = { 
        center: myLatlng, 
        zoom: 12, 
        mapTypeId: google.maps.MapTypeId.ROADMAP 
      };  

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      $cordovaGeolocation.getCurrentPosition(options).then(function(position){  
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);  
        map.setCenter(latLng); 

        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });

        var infoWindow = new google.maps.InfoWindow({
          content: "My Location"
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });

        var marker2 = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: myLatlng
        });

        var infoWindow2 = new google.maps.InfoWindow({
          content: "Paris"
        });

        google.maps.event.addListener(marker2, 'click', function () {
          infoWindow2.open($scope.map, marker2);
        });

      }).finally(function () { 
        $ionicLoading.hide(); 
      });

      $scope.map = map;

    });


  })
