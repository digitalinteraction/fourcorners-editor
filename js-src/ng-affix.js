'use strict';

module.exports = function (app) {
    app.directive("ngAffix", ['$window', directiveFun]);

    function directiveFun($window) {
        function controller(scope, element, attributes) {
            var initialTop, affixClass, offsetTop, affix, active, visibleOnScrollTop,
                fixedTop;

            attributes.$observe('ngAffix', init);
            scope.$on('$destroy', function () {
                clean();
            });

            function init() {
                var attrs = scope.$eval(attributes.ngAffix);
                attrs = attrs != undefined ? attrs : {};
                initialTop = attrs.initialTop != undefined ?
                    parseInt(attrs.initialTop) :
                    element[0].getBoundingClientRect().top;
                fixedTop = attrs.fixedTop != undefined ? parseInt(attrs.fixedTop) : 0;
                affixClass = attrs.class != undefined ? attrs.class : 'affix';
                active = attrs.active != undefined ? attrs.active : true;
                visibleOnScrollTop = attrs.visibleOnScrollTop != undefined ? attrs.visibleOnScrollTop : false;
                clean();
                angular.element($window).bind('scroll', scrollWatcher);
            }

            function clean() {
                angular.element($window).unbind('scroll', scrollWatcher);
            }

            function scrollWatcher() {
                stickIfScrolled();
            }

            function stickIfScrolled() {
                offsetTop = element[0].getBoundingClientRect().top;
                offsetTop = fixedTop ? offsetTop - fixedTop : offsetTop;
                offsetTop = offsetTop < 0 ? 0 : offsetTop;
                affix = offsetTop <= 0 && active && ($window.pageYOffset >= initialTop || initialTop == undefined);
                if (affix) {
                    element.addClass(affixClass);
                } else {
                    element.removeClass(affixClass);
                }
            }

        }

        return {
            restrict: 'A',
            link: controller
        };
    }

};
