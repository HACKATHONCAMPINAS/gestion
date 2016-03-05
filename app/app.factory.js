GestionApp
    .factory('windowDimensions', ['$window', function ($window) {
        return {
            height: function () {
                return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            },
            width: function () {
                return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            }
        }
    }
    ])
    .factory('utils', ['$rootScope', function ($rootScope) {
        return {
            // Util for finding an object by its 'id' property among an array
            findByItemId: function findById(a, id) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].item_id == id) return a[i];
                }
                return null;
            },
            // serialize form
            serializeObject: function (form) {
                var o = {};
                var a = form.serializeArray();
                $.each(a, function () {
                    if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            },
            // high density test
            isHighDensity: function () {
                return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
            },
            // touch device test
            isTouchDevice: function () {
                return !!('ontouchstart' in window);
            },
            // local storage test
            lsTest: function () {
                var test = 'test';
                try {
                    localStorage.setItem(test, test);
                    localStorage.removeItem(test);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            // show/hide card
            card_show_hide: function (card, begin_callback, complete_callback, callback_element) {
                $(card).velocity({
                    scale: 0,
                    opacity: 0.2
                }, {
                    duration: 400,
                    easing: [0.4, 0, 0.2, 1],
                    // on begin callback
                    begin: function () {
                        if (typeof begin_callback !== 'undefined') {
                            begin_callback(callback_element);
                        }
                    },
                    // on complete callback
                    complete: function () {
                        if (typeof complete_callback !== 'undefined') {
                            complete_callback(callback_element);
                        }
                    }
                })
                    .velocity('reverse');
            },
            alert: function (type, message, top) {
                $rootScope.content_preloader_hide();
                UIkit.notify({
                    message: message,
                    status: type,
                    timeout: type == 'success' ? 6000 : 0,
                    pos: 'top-center'
                });

                if (top) {
                    $('body').find('.uk-notify').css('top', 10)
                }
            },
            isEmpty: function (obj) {
                for (var prop in obj) {
                    if (obj[prop])
                        return false;
                }
                return true;
            },
            notHasEmpty: function (obj) {
                for (var prop in obj) {
                    if (!obj[prop])
                        return false;
                }
                return true;
            },
            resetForm: function (form) {
                form.parsley().reset()
                angular.forEach(form.find('input'), function (node) {
                    $(node).focus()
                });
            },
            setForm: function (form, type) {
                if (type == 'add') {
                    $('.update').css('display', 'none')
                    $('.add').css('display', 'inline-block')
                    form.attr('ng-submit', 'Add()')
                } else {
                    $('.add').css('display', 'none')
                    $('.update').css('display', 'inline-block')
                    form.attr('ng-submit', 'Update()')
                }
            },
            fillObject: function (source, dest) {
                for (var propertyName in source) {
                    for (var _propertyName in dest) {
                        if (propertyName == _propertyName) {
                            dest[_propertyName] = source[propertyName]
                        }
                    }
                }

                return dest;
            }
        };
    }])
    .factory('message', ['$rootScope', function ($rootScope) {
        return {
            show: function (type, message, top) {
                $rootScope.content_preloader_hide();
                UIkit.notify({
                    message: message,
                    status: type,
                    timeout: type == 'success' ? 6000 : 0,
                    pos: 'top-center'
                });

                if (top) {
                    $('body').find('.uk-notify').css('top', 10)
                }
            }
        };
    }])
    .factory('maskCheck', function () {
        var maskID = {
            new: function (m, v) {
                v = v ? v : ''
                if (m == '###.###.###-##|##.###.###/####-##') {
                    if (v.length > 14) {
                        return maskID.new('##.###.###/####-##', v);
                    } else {
                        return maskID.new('###.###.###-##', v);
                    }
                }

                if (m == '## ####-####|## #####-####') {
                    if (v.length > 12) {
                        return maskID.new('## #####-####', v);
                    } else {
                        return maskID.new('## ####-####', v);
                    }
                }

                var tv = "";
                var ret = "";
                var character = "#";
                var separator = "|";
                var maskUse = "";
                v = maskID.empty(v);
                if (v == "") {
                    return v
                };
                var temp = m.split(separator);
                var dif = 1000;

                var vm = v;
                // removing the mask value existing
                for (var i = 0; i < v.length; i++) {
                    if (!isNaN(v.substr(i, 1))) {
                        tv = tv + v.substr(i, 1);
                    }
                }

                v = tv;

                // dynamic format mask
                for (var i = 0; i < temp.length; i++) {
                    var mult = "";
                    var validate = 0;
                    for (var j = 0; j < temp[i].length; j++) {
                        if (temp[i].substr(j, 1) == "]") {
                            temp[i] = temp[i].substr(j + 1);
                            break;
                        }
                        if (validate == 1) mult = mult + temp[i].substr(j, 1);
                        if (temp[i].substr(j, 1) == "[") validate = 1;
                    }
                    for (var j = 0; j < v.length; j++) {
                        temp[i] = mult + temp[i];
                    }
                }

                // check which masks use
                if (temp.length == 1) {
                    maskUse = temp[0];
                    var cleanMask = "";
                    for (var j = 0; j < maskUse.length; j++) {
                        if (maskUse.substr(j, 1) == character) {
                            cleanMask = cleanMask + character;
                        }
                    }
                    var tam = cleanMask.length;
                } else {
                    // clean different characters of the character of the mask
                    for (var i = 0; i < temp.length; i++) {
                        var cleanMask = "";
                        for (var j = 0; j < temp[i].length; j++) {
                            if (temp[i].substr(j, 1) == character) {
                                cleanMask = cleanMask + character;
                            }
                        }
                        if (v.length > cleanMask.length) {
                            if (dif > (v.length - cleanMask.length)) {
                                dif = v.length - cleanMask.length;
                                maskUse = temp[i];
                                tam = cleanMask.length;
                            }
                        } else if (v.length < cleanMask.length) {
                            if (dif > (cleanMask.length - v.length)) {
                                dif = cleanMask.length - v.length;
                                maskUse = temp[i];
                                tam = cleanMask.length;
                            }
                        } else {
                            maskUse = temp[i];
                            tam = cleanMask.length;
                            break;
                        }
                    }
                }

                // validating mask size according to the size of the value
                if (v.length > tam) {
                    v = v.substr(0, tam);
                } else if (v.length < tam) {
                    var masct = "";
                    var j = v.length;
                    for (var i = maskUse.length - 1; i >= 0; i--) {
                        if (j == 0) break;
                        if (maskUse.substr(i, 1) == character) {
                            j--;
                        }
                        masct = maskUse.substr(i, 1) + masct;
                    }
                    maskUse = masct;
                }

                // Apply mask
                j = maskUse.length - 1;
                for (var i = v.length - 1; i >= 0; i--) {
                    if (maskUse.substr(j, 1) != character) {
                        ret = maskUse.substr(j, 1) + ret;
                        j--;
                    }
                    ret = v.substr(i, 1) + ret;
                    j--;
                }
                return ret;
            },

            empty: function (v) {
                var vclean = "";
                var len = v.length;
                for (var i = 0; i < 30; i++) {
                    if (v && v.substr(i, 1) == " ") {
                    } else {
                        vclean = vclean + v.substr(i, 1);
                    }
                }
                return vclean;
            }
        };

        return maskID;
    })
    .factory('menu', ['$rootScope', function ($rootScope) {
        return {
            build: function (data) {
                var count = 0
                angular.forEach(data, function (value, key) {
                    angular.forEach(actions.admin.modules, function (actionsValue, actionsKey) {
                        if (value == actionsValue[0].id) {
                            actions.admin.modules[actionsKey][0].show = true
                            count++
                        }
                    });

                    actions.admin.show = (count > 0)

                    $rootScope.useractions = actions
                });
            }
        }
    }])
;

angular
    .module("ConsoleLogger", [])
    // router.ui debug
    // app.js (run section "PrintToConsole")
    .factory("PrintToConsole", [
        "$rootScope",
        function ($rootScope) {
            var handler = { active: false };
            handler.toggle = function () { handler.active = !handler.active; };

            if (handler.active) {
                console.log($state + ' = ' + $state.current.name);
                console.log($stateParams + '=' + $stateParams);
                console.log($state_full_url + '=' + $state.$current.url.source);
                console.log(Card_fullscreen + '=' + card_fullscreen);

                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                    console.log("$stateChangeStart --- event, toState, toParams, fromState, fromParams");
                    console.log(arguments);
                });
                $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                    console.log("$stateChangeError --- event, toState, toParams, fromState, fromParams, error");
                    console.log(arguments);
                });
                $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    console.log("$stateChangeSuccess --- event, toState, toParams, fromState, fromParams");
                    console.log(arguments);
                });
                $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
                    console.log("$viewContentLoading --- event, viewConfig");
                    console.log(arguments);
                });
                $rootScope.$on('$viewContentLoaded', function (event) {
                    console.log("$viewContentLoaded --- event");
                    console.log(arguments);
                });
                $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
                    console.log("$stateNotFound --- event, unfoundState, fromState, fromParams");
                    console.log(arguments);
                });
            }

            return handler;
        }
    ])
    .factory('httpInterceptor', function ($q, $rootScope, $log, $cookies) {
        return {
            request: function (config) {

                config.headers = config.headers || {};

                config.headers = {
                    'Content-Type': 'application/json',
                    'AUTH-TOKEN': $cookies.get("AUTH-TOKEN")
                }

                return config || $q.when(config)

            },
            response: function (response) {

                return response || $q.when(response);
            },
            responseError: function (response) {
                if (response.status === 401) {
                    $cookies.remove('AUTH-TOKEN');
                    window.location = param.path.wsPath
                }
                else if (response.status === 500) {
                    $rootScope.content_preloader_hide();
                    UIkit.notify({
                        message: response.data.exceptionMessage,
                        status: 'danger',
                        timeout: 0,
                        pos: 'top-center'
                    });
                }
                return $q.reject(response);
            }
        };
    }).config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    })
;