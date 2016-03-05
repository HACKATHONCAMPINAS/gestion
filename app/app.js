var App = angular.module('GestionApp', ['ngRoute', 'ngCookies']);


App.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    //.when('/', {
    //    templateUrl: 'denied.html'
    //    , caseInsensitiveMatch: true
    //})
    //.when('/notfound', {
    //    templateUrl: 'notfound.html'
    //            , caseInsensitiveMatch: true
    //})
    //.when('/error', {
    //    templateUrl: 'error.html'
    //        , caseInsensitiveMatch: true
    //})
    
    .when('/', {
        //templateUrl: 'app/views/main.html',
        controller: 'mainController',
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
            resolve: {
                delay: function ($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 0);
                    return delay.promise;
                }
            }
         , caseInsensitiveMatch: true
        })
    .otherwise({ redirectTo: "/notfound" });
});