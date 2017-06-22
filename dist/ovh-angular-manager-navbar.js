/*global angular*/
angular.module("ovh-angular-manager-navbar", ["ovh-angular-toggleClass"]);

/*global angular*/

/*/
Change to provider
/*/

/**
 * @ngdoc service
 * @name managerNavbar.managerNavbar
 * @description
 *
 *
 */
angular.module("ovh-angular-manager-navbar")
.service("managerNavbar", ["$rootScope", function ($rootScope) {
    "use strict";

    var self = this;

    this.externalLinks = [];
    this.internalLinks = [];
    self.currentLink = null;
    this.navbarUnivers = false;
    this.navbarAccount = false;
    this.isOpen = false;
    this.overlay = null;
    this.scopeOverlay = null;

    function onClick (event) {
        self.toggleNavbarStatus("close");
        if (event.type === "touchstart") {
            event.preventDefault();
        }
    }

    /**
     * @ngdoc function
     * @name init
     * @methodOf managerNavbar.managerNavbar
     * @description
     *
     * Initialize the navbar and insert-it in the dom
     *
     */
    this.init = function () {
        if (!$("#full-overlay").length) {
            $("body").prepend($("<div id='full-overlay'></div>"));
        }

        self.overlay = angular.element("#full-overlay");
        self.scopeOverlay = self.overlay.scope();

        self.overlay.on("touchstart", onClick);

        self.overlay.on("click", onClick);

        self.overlay.on("$destroy", function () {
            self.overlay.off("touchstart", onClick);
            self.overlay.off("click", onClick);
        });
    };
    /**
     * @ngdoc function
     * @name getExternalLinks
     * @methodOf managerNavbar.managerNavbar
     * @description
     *
     * Get the external links
     *
     * @return {[object]} External links {url, click}
     */
    this.getExternalLinks = function () {
        return self.externalLinks;
    };

    /**
     * @ngdoc function
     * @name setExternalLinks
     * @methodOf managerNavbar.managerNavbar
     * @description
     *
     * Set the external links
     *
     * @param {[object]} links External links to set {url, click}
     */
    this.setExternalLinks = function (links) {
        self.externalLinks = links;
    };

    /**
     * @ngdoc function
     * @name setCurrentLink
     * @methodOf managerNavbar.managerNavbar
     * @description
     *
     * Set the current links
     *
     * @param {[object]} links current links to set {url, click}
     */
    this.setCurrentLink = function (link) {
        self.currentLink = link;
    };

    /**
     * @ngdoc function
     * @name getCurrentLink
     * @methodOf managerNavbar.managerNavbar
     * @description
     *
     * Get the current links
     *
     * @return {[object]} CurrentLink links {url, click}
     */
    this.getCurrentLink = function () {
        var link = self.currentLink || self.externalLinks[0];
        return link;
    };

    /**
     * @ngdoc function
     * @name setInternalLinks
     * @methodOf managerNavbar.managerNavbar
     * @description
     *
     * Set the internal links
     *
     * @param {[object]} links Internal links to set {url, click}
     */
    this.setInternalLinks = function (links) {
        self.internalLinks = links;
    };

    /**
     * @ngdoc function
     * @name getInternalLinks
     * @methodOf managerNavbar.managerNavbar
     * @description
     *
     * Get the internal links
     *
     * @return {[object]} Internal links {url, click}
     */
    this.getInternalLinks = function () {
        return self.internalLinks;
    };

    /**
     * @ngdoc function
     * @name toggleNavbarStatus
     * @methodOf managerNavbar.managerNavbar
     * @description
     *
     * Sets and broadcast the status of the menu: true if opened, false if closed
     *
     */
    this.toggleNavbarStatus = function (button) {
        switch(button) {
        case "navbar-univers":
            if (self.navbarUnivers === true) {
                self.navbarUnivers = false;
            } else if (self.navbarAccount === true) {
                self.navbarUnivers = true;
                self.navbarAccount = false;
            } else {
                self.navbarUnivers = true;
            }
            break;
        case "navbar-account":
            if (self.navbarAccount === true) {
                self.navbarAccount = false;
            } else if (self.navbarUnivers === true) {
                self.navbarAccount = true;
                self.navbarUnivers = false;
            } else {
                self.navbarAccount = true;
            }
            break;
        case "close":
            self.navbarUnivers = false;
            self.navbarAccount = false;
        }

        self.isOpen = (self.navbarUnivers || self.navbarAccount);

        self.scopeOverlay.$apply(function () {
            $rootScope.$broadcast("managerNavbar.status", self.isOpen);
        });
    };
}]);

/*global angular*/

/**
 * @ngdoc directive
 * @name managerNavbar.directive:managerNavbar
 * @scope
 * @restrict EA
 * @description
 *
 * Create and manage a nav bar for the manager
 *
 * To use managerNavbar, you had to inject managerNavbar as dependency and use it like this example
 * <pre>
 *  angular.module('myApp', ['ovh-angular-manager-navbar]);
 * </pre>
 *
 *
 */
angular.module("ovh-angular-manager-navbar")
  .directive("managerNavbar", ["managerNavbar", "UNIVERSE", function (managerNavbar, UNIVERSE) {
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
}]);

angular.module('ovh-angular-manager-navbar').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ovh-angular-manager-navbar.html',
    "<div id=manager-navbar><div id=navbar-responsive><toggle-class class=\"navbar-button pull-left\" data-toggle-class-group=navGroup data-toggle-class-target=#sidebar-menu data-toggle-class-target-backdrop=#full-overlay data-toggle-class-name=nav-open data-toggle-class-trigger-close=\"#full-overlay, .sideNavBtnClose\"><span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></toggle-class><toggle-class class=\"navbar-button pull-right\" data-toggle-class-group=navGroup data-toggle-class-target=#navbar-account data-toggle-class-target-backdrop=#full-overlay data-toggle-class-name=nav-open data-toggle-class-trigger-close=#full-overlay data-toggle-class-click=toggleNavbarStatus(&quot;navbar-account&quot;)><span class=\"glyphicon glyphicon-user\"></span></toggle-class><toggle-class class=\"navbar-button pull-right\" data-toggle-class-group=navGroup data-toggle-class-target=#navbar-univers data-toggle-class-target-backdrop=#full-overlay data-toggle-class-name=nav-open data-toggle-class-trigger-close=#full-overlay data-toggle-class-click=toggleNavbarStatus(&quot;navbar-univers&quot;)><span class=\"glyphicon glyphicon-globe\"></span></toggle-class></div><div id=navbar class=clearfix><div id=navbar-univers class=navbar-section><ul><li class=logo><a href={{::currentLink.url}}><svg xmlns=http://www.w3.org/2000/svg viewbox=\"0 0 44 26\"><title data-ng-bind=::currentLink.url></title><path d=M40.83,1.67,36.17,10h-4.9L25.5,20h4.9l-3.71,6h12a21.91,21.91,0,0,0,4.93-13.7A21.29,21.29,0,0,0,40.83,1.67Z></path><path d=M17,26h0L32,0H19.29L10.66,15,2.84,1.42A21.72,21.72,0,0,0,0,12.19,22.24,22.24,0,0,0,4.93,26H17Z></path></svg></a></li><li class=univers-link-{{::link.universe}} data-ng-class=\"{active : isActiveLink(link.universe)}\" data-ng-repeat=\"link in externalLinks\"><a href={{::link.url}} title=\"{{link.title || link.label}}\" data-ng-click=link.click()><i data-ng-if=::link.icon class={{link.icon}} aria-hidden=true></i> <span data-ng-if=::link.label data-ng-bind=::link.label></span></a></li></ul></div><div id=navbar-account class=\"navbar-section pull-right\" data-ng-if=internalLinks><ul><li data-ng-repeat=\"link in internalLinks\" data-ng-attr-title={{::link.title}} data-ng-class=\"{ 'btn-group': link.subLinks }\" data-uib-dropdown><a data-ng-if=\"!link.subLinks && link.url && !link.click\" href={{::link.url}}><i data-ng-if=::link.icon class={{link.icon}} aria-hidden=true></i> <span data-ng-bind=link.label></span></a> <button data-ng-if=\"!link.subLinks && link.click && !link.url\" type=button data-ng-bind-html=link.label data-ng-click=link.click()><i data-ng-if=::link.icon class={{link.icon}} aria-hidden=true></i> <span data-ng-bind=link.label></span></button> <button data-ng-if=link.subLinks id=\"{{'dLabel' + link.label}}\" type=button class=dropdown-toggle data-uib-dropdown-toggle><i data-ng-if=::link.icon class={{link.icon}} aria-hidden=true></i> <span data-ng-bind=link.label></span></button><div class=dropdown-menu><div data-ng-if=link.headerTemplate data-ng-bind-html=link.headerTemplate></div><ul data-ng-if=link.subLinks class=\"{{ link.listClass }}\" role=menu><li data-ng-repeat=\"subLink in link.subLinks\"><a href={{::subLink.url}} data-ng-if=\"subLink.url && !subLink.template\"><i data-ng-if=::subLink.icon class={{subLink.icon}} aria-hidden=true></i> <span data-ng-bind=subLink.label></span></a> <a href={{::subLink.url}} data-ng-if=\"subLink.url && subLink.template\" data-ng-bind-html=subLink.template></a> <span data-ng-if=\"!subLink.url && !subLink.click && subLink.template\" data-ng-bind-html=subLink.template></span> <button type=button data-ng-click=subLink.click(); data-ng-if=subLink.click data-ng-attr-lang={{subLink.lang}}><i data-ng-if=::subLink.icon class={{subLink.icon}} aria-hidden=true></i> <span data-ng-bind=subLink.label></span></button></li></ul><div data-ng-if=link.footerTemplate data-ng-bind-html=link.footerTemplate></div></div></li></ul></div></div></div>"
  );

}]);
