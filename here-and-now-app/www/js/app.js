// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

//path_url = "http://debian.dev:3000";
path_url = "http://172.16.4.32:3000";

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'authFactory'])

.run(function($ionicPlatform, AuthFct, $location) {

  var userAuth = AuthFct.getAccessToken();

  if (!userAuth) {
    $location.path('/signin');
  }


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

    .state('signin', {
      url: '/signin',
      views: {
        '': {
          templateUrl: 'templates/login.html',
          controller: 'SigninCtrl'
        }
      }
    })

    .state('signup', {
      url: '/signup',
      views: {
        '': {
          templateUrl: 'templates/signup.html',
          controller: 'SignupCtrl'
        }
      }
    })
    .state('interests', {
      url: '/interests/:user_id',
      views: {
        '': {
          templateUrl: 'templates/interests.html',
          controller: 'InterestsCtrl'
        }
      }
    })

    .state('map', {
      url: '/map/:userId',
      views: {
        '': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
        }
      },
      authenticated: true
    })
    .state('favorites', {
      url: '/favorites/:userId',
      views: {
        '': {
          templateUrl: 'templates/favorites.html',
          controller: 'FavoritesCtrl'
        }
      },
      authenticated: true
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/signin');

});
