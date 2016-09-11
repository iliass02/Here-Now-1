app
  .controller("InterestDetailCtrl", function ($scope, InterestDetailFct, $stateParams, $mdDialog, $ionicLoading){
    var interestId = $stateParams.interestId,
      GetInterestDetail = function () {
        $ionicLoading.show({
          template: '<ion-spinner icon="android"></ion-spinner>'
        });

        InterestDetailFct.getOpinions(interestId)
          .success(function (opinions) {
            $scope.opinions = opinions.data;
          })
          .error(function (error) {
            console.log(error);
          })
          .finally(function () {
            $ionicLoading.hide();
          })
    };

    GetInterestDetail();

    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

    InterestDetailFct.getInterestDetail(interestId)
      .success(function (results) {
        $scope.interestDetails = results.result;
      })
      .error(function (error) {
        console.log(error);
      })
      .finally(function () {
        $scope.finish = true;
        $ionicLoading.hide();
      });


    $scope.showPrompt = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('Avis')
        .textContent('Postez un avis:')
        .placeholder('Votre avis')
        .targetEvent(ev)
        .ok('Envoyer')
        .cancel('Annuler');
      $mdDialog.show(confirm).then(function(message) {
        if (!message) {
          Materialize.toast("Veuillez entrer un message", 2000, "red");
        } else {
          InterestDetailFct.postOpinions(interestId, $stateParams.userId, message)
            .success(function () {
              Materialize.toast("Ajout de l'avis réussi", 2000, "green");
              GetInterestDetail();
            })
            .error(function () {
              Materialize.toast("Impossible de poster un avis", 2000, "red");
            })
        }
      }, function() {
        console.log("KO");
      });
    };

});
