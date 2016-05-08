app

  .controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading, $stateParams, $http) {
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


        $http.get(path_url+'/api/v1/interests/user/'+$stateParams.user_id)
          .success(function (data) {
            console.log(data);
            var interests = data.data;

              $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ position.coords.latitude+","+position.coords.longitude +"&radius=500&types="+interests[0].name +"&key=AIzaSyAksXWsv6qT5z_DJk-kWW5wmDXs1TG_BP8")
                .success(function (data) {
                  console.log(data);
                })
                .error(function (err) {
                  console.log(err);
                })

          })
          .error(function (err) {
            console.log(err);
          })

/*        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });

        var infoWindow = new google.maps.InfoWindow({
          content: "My Location"
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });*/


      }).finally(function () { 
        $ionicLoading.hide(); 
      });

      $scope.map = map;

    });


  })
