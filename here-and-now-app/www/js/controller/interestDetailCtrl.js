app
  .controller("InterestDetailCtrl", function ($scope, InterestDetailFct, $stateParams, $mdDialog){
    var interestId = $stateParams.interestId;
    var GetInterestDetail = function () {
      InterestDetailFct.getOpinions(interestId)
        .success(function (opinions) {
          console.log(opinions.data);
          $scope.opinions = opinions.data;
        })
        .error(function (error) {
          console.log(error);
        });
    };

    GetInterestDetail();

    console.log('Controller InterestDetail');
    InterestDetailFct.getInterestDetail(interestId)
      .success(function (results) {
        console.log(results.result);
        $scope.interestDetails = results.result;
      })
      .error(function (error) {
        console.log(error);
      });

    $scope.showPrompt = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('Avis')
        .textContent('Poster un avis')
        .placeholder('message')
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
