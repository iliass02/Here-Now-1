app
  .controller("NewsFeedCtrl", function ($scope, NewsFeedFct, $mdDialog, $stateParams) {
    var GetNews = function() {
      NewsFeedFct.getNewsFeed()
        .success(function (newsFeeds) {
          $scope.newsFeeds = newsFeeds.data;
        })
        .error(function (error) {
          console.log("KO", error);
        });
    };

    GetNews();

    $(document).ready(function(){
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal-trigger').leanModal();
    });



    $scope.showPrompt = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('Ajouter un message')
        .textContent('Veuillez ajouter votre message:')
        .placeholder('Votre message...')
        .targetEvent(ev)
        .ok('Envoyer')
        .cancel('Annuler');
      $mdDialog.show(confirm).then(function(message) {
        if (!message) {
          Materialize.toast("Veuillez entrer un message", 2000, "red");
        } else {
          NewsFeedFct.postNewsFeed($stateParams.userId, message)
            .success(function () {
              Materialize.toast("Ajout du message réussi", 2000, "green");
              GetNews();
            })
            .error(function () {
              Materialize.toast("Impossible d'ajouter d'un message", 2000, "red");
            });
        }
      }, function() {
        console.log("KO");
      });
    };

    $scope.userId = $stateParams.userId;

  });
