app

.controller('SigninCtrl', ["$scope", "$cordovaOauth", "$http"] function ($scope, $http, $location, $cordovaOauth) {
 window.cordovaOauth = $cordovaOauth;
    window.http = $http;
  $scope.connect = function (login, password) {


    var data = {
      login: login,
      password: password
    };

    console.log(data);

    $http.post(path_url+'/api/v1/signin', data)
      .success(function(data) {
        console.log(data);
        Materialize.toast("Connexion réussi", 2000, "green");
        $location.path("/map");
      })
      .error(function(data, status) {
        console.log(data);

        if (status == 500) {
          Materialize.toast("Erreur : tous les champs sont requis", 1500, "red");
        } else if (status == 401) {
          Materialize.toast("Erreur :  Login / Email ou mot de passe incorrect", 1500, "red");
        } else  {
          Materialize.toast("Erreur : veuillez réessayer ultérieurement !", 1500, "red");
        }
      });

  }


$scope.login = function(){
    //facebookLogin(window.cordovaOauth, window.http);
    $cordovaOauth.facebook("1136528509700960", ["email", "public_profile"], {redirect_uri: "http://localhost/callback"}).then(function(result){
        displayData($http, result.access_token);
    },  function(error){
            alert("Error: " + error);
    });
}

function facebookLogin($cordovaOauth, $http)
{
    $cordovaOauth.facebook("1136528509700960", ["email", "public_profile"], {redirect_uri: "http://localhost/callback"}).then(function(result){
        displayData($http, result.access_token);
    },  function(error){
            alert("Error: " + error);
    });
}

function displayData($http, access_token)
{
    $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "name,gender,location,picture", format: "json" }}).then(function(result) {
        var name = result.data.name;
        var gender = result.data.gender;
        var picture = result.data.picture;

        var html = '<table id="table" data-role="table" data-mode="column" class="ui-responsive"><thead><tr><th>Field</th><th>Info</th></tr></thead><tbody>';
        html = html + "<tr><td>" + "Name" + "</td><td>" + name + "</td></tr>";
        html = html + "<tr><td>" + "Gender" + "</td><td>" + gender + "</td></tr>";
        html = html + "<tr><td>" + "Picture" + "</td><td><img src='" + picture.data.url + "' /></td></tr>";

        html = html + "</tbody></table>";

        document.getElementById("listTable").innerHTML = html;
        $.mobile.changePage($("#profile"), "slide", true, true);
    }, function(error) {
        alert("Error: " + error);
    });
}


//$scope.facebook = function(){
//$cordovaOauth.facebook("1136528509700960", ["email"]).then(function(result) {
//    console.log("Response Object -> " + JSON.stringify(result));
//}, function(error) {
//    console.log("Error -> " + error);
//});
//}
})
