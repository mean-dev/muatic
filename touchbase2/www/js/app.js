// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngMockE2E'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })
    .state('main', {
        url: '/',
        abstract: true,
        templateUrl: 'templates/main.html'
    })


    .state('main.leads', {
        url: 'main/leads',
        views: {
            'leads-tab': {
                templateUrl: 'templates/leads.html',
                controller: 'DashCtrl'
            }
        }
    })
      .state('main.lead-detail', {
        url: 'main/lead/:id',
        views: {
          'leads-tab': {
            templateUrl: 'templates/lead.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('main.lead-detail-detail', {
        url: 'main/lead/:id/detail',
        views: {
          'leads-tab': {
            templateUrl: 'templates/lead-detail.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('main.lead-detail-history', {
        url: 'main/lead/:id/history',
        views: {
          'leads-tab': {
            templateUrl: 'templates/lead-history.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('main.lead-detail-notes', {
        url: 'main/lead/:id/notes',
        views: {
          'leads-tab': {
            templateUrl: 'templates/lead-notes.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('main.lead-detail-social', {
        url: 'main/lead/:id/social',
        views: {
          'leads-tab': {
            templateUrl: 'templates/lead-social.html',
            controller: 'DashCtrl'
          }
        }
      })

    .state('main.lists', {
        url: 'main/lists',
        views: {
            'lists-tab': {
                templateUrl: 'templates/lists.html'
            }
        }
    })
    .state('main.admin', {
        url: 'main/admin',
        views: {
            'admin-tab': {
                templateUrl: 'templates/admin.html'
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    });

    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get("$state");
        $state.go("main.leads");
    });
})

.run(function($httpBackend){
  $httpBackend.whenGET('http://localhost:8100/valid')
        .respond({message: 'This is my valid response!'});
  $httpBackend.whenGET('http://localhost:8100/notauthenticated')
        .respond(401, {message: "Not Authenticated"});
  $httpBackend.whenGET('http://localhost:8100/notauthorized')
        .respond(403, {message: "Not Authorized"});

  $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
 })

 .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }

    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
})
