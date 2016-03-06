var App = angular.module('GestionApp', ['ngRoute', 'ngCookies']);

App.run(function ($rootScope) {
   
});

App.config(function ($routeProvider, $locationProvider) {
    $routeProvider    
    .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'mainController',
        animation: 'slide',
        resolve: {
            delay: function ($q, $timeout) {
                var delay = $q.defer();
                $timeout(delay.resolve, 0);
                return delay.promise;
            }
        }
         , caseInsensitiveMatch: true
    })
    .when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'loginController',
        animation: 'slide',
        resolve: {
            delay: function ($q, $timeout) {
                var delay = $q.defer();
                $timeout(delay.resolve, 0);
                return delay.promise;
            }
        }
        , caseInsensitiveMatch: true
    })
    .when('/register', {
        templateUrl: 'app/views/register.html',
        controller: 'registerController',
        animation: 'slide',
        resolve: {
            delay: function ($q, $timeout) {
                var delay = $q.defer();
                $timeout(delay.resolve, 0);
                return delay.promise;
            }
        }
    , caseInsensitiveMatch: true
    })
    .when('/search', {
        templateUrl: 'app/views/search.html',
        controller: 'searchController',
        animation: 'slide',
        resolve: {
            delay: function ($q, $timeout) {
                var delay = $q.defer();
                $timeout(delay.resolve, 0);
                return delay.promise;
            }
        }
    , caseInsensitiveMatch: true
    })
    .when('/favoritos', {
        templateUrl: 'app/views/favoritos.html',
        controller: 'favoritosController',
        animation: 'slide',
        resolve: {
            delay: function ($q, $timeout) {
                var delay = $q.defer();
                $timeout(delay.resolve, 0);
                return delay.promise;
            }
        }
    , caseInsensitiveMatch: true
    })
    .otherwise({ redirectTo: "/" });
});

