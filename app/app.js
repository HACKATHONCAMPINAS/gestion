; "use strict";

var GestionApp = angular.module('GestionApp', [
    'ui.router',
    'oc.lazyLoad',
    'ngSanitize',
    'ngAnimate',      
    'ngCookies'
]);

GestionApp
    .run([
        '$rootScope',
        '$state',
        '$stateParams',
        '$http',
        '$window',
        '$timeout',                  
        function ($rootScope, $state, $stateParams, $http, $window, $timeout) {

           
        }
    ])