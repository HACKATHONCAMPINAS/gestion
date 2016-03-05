GestionApp
    .service('detectBrowser', [
        '$window',
        function ($window) {
            // http://stackoverflow.com/questions/22947535/how-to-detect-browser-using-angular
            return function () {
                var userAgent = $window.navigator.userAgent,
                    browsers = {
                        chrome: /chrome/i,
                        safari: /safari/i,
                        firefox: /firefox/i,
                        ie: /internet explorer/i
                    };

                for (var key in browsers) {
                    if (browsers[key].test(userAgent)) {
                        return key;
                    }
                }
                return 'unknown';
            }
        }
    ])
    .service('preloaders', [
        '$rootScope',
        '$timeout',
        'utils',
        function ($rootScope, $timeout, utils) {
            $rootScope.content_preloader_show = function (style, container) {
                var $body = $('body');
                if (!$body.find('.content-preloader').length) {
                    var image_density = utils.isHighDensity() ? '@2x' : '';

                    var preloader_content = (typeof style !== 'undefined' && style == 'regular')
                        ? '<img src="assets/img/spinners/spinner' + image_density + '.gif" alt="" width="48" height="48">'
                        : '<div class="md-preloader"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="48" width="48" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg></div>';
                    var thisContainer = (typeof container !== 'undefined') ? container : $body;

                    thisContainer.append('<div class="content-preloader">' + preloader_content + '</div>');

                    $timeout(function () {
                        $('.content-preloader').addClass('preloader-active');
                    });
                }
            };
            $rootScope.content_preloader_hide = function () {
                var $body = $('body');
                if ($body.find('.content-preloader').length) {
                    // hide preloader
                    $('.content-preloader').removeClass('preloader-active');
                    // remove preloader
                    $timeout(function () {
                        $('.content-preloader').remove();
                    }, 500);
                }
            };
        }
    ])
    .service('auth', [
        '$rootScope',
        '$http',
        '$location',
        '$cookies',
        '$state',
        function ($rootScope, $http, $location, $cookies, $state) {
            $rootScope.isTokenValid = function () {
                var token = $location.search().t
                if ((!token || token.length < 100) && !$cookies.get("AUTH-TOKEN") && !(window.location.hash == '#/login')) {
                    window.location = '/#login'
                }
                else if (token && token.length > 100 && !$cookies.get("AUTH-TOKEN")) {
                    $http.get(param.path.wsPath.concat('/api/Account/IsTokenValid'), { params: { token: token } }).then(function (result) {
                        if (result.data.isValid) {
                            $cookies.put("AUTH-TOKEN", token, {
                                expires: result.data.expirationDate
                            })
                            $location.url($location.path() + "#/")
                        }
                    })
                }
                else if (token && token.length > 100 && $cookies.get("AUTH-TOKEN")) {
                    $http.get(param.path.wsPath.concat('/api/Account/IsTokenValid'), { params: { token: token } }).then(function (result) {
                        if (result.data.isValid) {
                            $cookies.put("AUTH-TOKEN", $cookies.get("AUTH-TOKEN"), {
                                expires: result.data.expirationDate
                            })
                            $location.url($location.path() + "#/")
                        }
                    })
                }
                else if (!token && $cookies.get("AUTH-TOKEN")) {
                    $http.get(param.path.wsPath.concat('/api/Account/IsTokenValid'), { params: { token: $cookies.get("AUTH-TOKEN") } }).then(function (result) {
                        if (!result.data.isValid) {
                            $cookies.remove("AUTH-TOKEN")
                            window.location = '/#login'
                        } else if ($location.path() == '') {
                            window.location = '#/'
                        }
                    })
                }
            },
            $rootScope.loadUserAction = function () {

                $rootScope.useractions = actions;

                $http.get(param.path.wsPath.concat('/api/Admin/ProfileRole/GetUserProfileRoles')).then(function (result) {

                })
            }
        }
    ])
;