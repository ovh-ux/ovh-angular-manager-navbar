/* global angular*/

/* /
Change to provider
/*/

/**
 * @ngdoc service
 * @name ovh-angular-manager-navbar.managerNavbar
 * @description
 *
 *
 */
angular.module("ovh-angular-manager-navbar")
    .service("managerNavbar", function ($rootScope) {
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
     * @methodOf ovh-angular-manager-navbar.managerNavbar
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
     * @methodOf ovh-angular-manager-navbar.managerNavbar
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
     * @methodOf ovh-angular-manager-navbar.managerNavbar
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
     * @methodOf ovh-angular-manager-navbar.managerNavbar
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
     * @methodOf ovh-angular-manager-navbar.managerNavbar
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
     * @methodOf ovh-angular-manager-navbar.managerNavbar
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
     * @methodOf ovh-angular-manager-navbar.managerNavbar
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
     * @methodOf ovh-angular-manager-navbar.managerNavbar
     * @description
     *
     * Sets and broadcast the status of the menu: true if opened, false if closed
     *
     */
        this.toggleNavbarStatus = function (button) {
            switch (button) {
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

            // no default
            }

            self.isOpen = self.navbarUnivers || self.navbarAccount;

            self.scopeOverlay.$apply(function () {
                $rootScope.$broadcast("managerNavbar.status", self.isOpen);
            });
        };
    });
