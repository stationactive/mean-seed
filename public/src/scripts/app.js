'use strict';
angular.module('ngApp', ['ngRoute', 'ngResource', 'restangular' ]);

angular.module('ngApp').config(function(RestangularProvider){
    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRestangularFields({
        id: "_id"
    });
});

angular.module('ngApp').config(function ($routeProvider, $locationProvider) {
     var routeRoleCheck = {
         admin: {
             auth: function(Auth){
                 return Auth.authorizeCurrentUserForRoute('admin');
             }
         },
         user: {
             auth: function(Auth){
                 return Auth.authorizeAuthenticatedUserForRoute();
             }
         }
     };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/views/main/index',
            controller: 'MainCtrl'
        })
        .when('/login', {
            templateUrl: '/partials/views/account/login',
            controller: 'LoginCtrl'
        })

        .when('/signup', {
            templateUrl: '/partials/views/account/signup',
            controller: 'SignupCtrl'
        })

        .when('/profile', {
            templateUrl: '/partials/views/account/profile',
            controller: 'ProfileCtrl',
            resolve: routeRoleCheck.user
        })

        .when('/admin/users', {
            templateUrl: '/partials/views/admin/user-list',
            controller: 'AdminUsersCtrl',
            resolve: routeRoleCheck.admin
        })


        .otherwise({
            template: '<h3>Page Not found</h3>'
        });

//      .otherwise({
//        redirectTo: '/'
//      });
});

angular.module('ngApp').run(function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
        if(rejection === 'Not Authorized'){
            $location.path('/');
        }
    });
});

