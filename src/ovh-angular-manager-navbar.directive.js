/*global angular*/

/**
 * @ngdoc directive
 * @name ovh-angular-manager-navbar.directive:managerNavbar
 * @scope
 * @restrict EA
 * @description
 *
 * Create and manage a nav bar for the manager
 *
 * To use managerNavbar, you had to inject ovh-angular-manager-navbar as dependency and use it like this example
 * <pre>
 *  angular.module('myApp', ['ovh-angular-manager-navbar]);
 * </pre>
 *
 *
 */
angular.module("ovh-angular-manager-navbar")
  .directive("managerNavbar", function (managerNavbar, UNIVERSE) {
    "use strict";
    return {
        templateUrl: "ovh-angular-manager-navbar.html",
        transclude: false,
        restrict : "EA",
        scope : {},
        link: function($scope) {
            managerNavbar.init();

            $scope.isActiveLink = function (universe) {
                if (universe && UNIVERSE) {
                    return universe.toUpperCase() === UNIVERSE.toUpperCase();
                }
                return false;
            };

            $scope.toggleNavbarStatus = function(button){
                managerNavbar.toggleNavbarStatus(button);
            };

            var unregisterExt = $scope.$watch(managerNavbar.getExternalLinks, function (externalLinks) {
                if (externalLinks && externalLinks.length) {
                    $scope.externalLinks = externalLinks;
                    unregisterExt();
                }
            });

            var unregisterCurr = $scope.$watch(managerNavbar.getCurrentLink, function (currentLink) {
                if (currentLink) {
                    $scope.currentLink = currentLink;
                    unregisterCurr();
                }
            }, true);

            /*var unregisterint =*/
            $scope.$watch(managerNavbar.getInternalLinks, function (internalLinks) {
                if (internalLinks && internalLinks.length) {
                    $scope.internalLinks = internalLinks;
                    //unregisterint();
                }
            }, true);
        }
    };
});
