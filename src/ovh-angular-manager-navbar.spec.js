"use strict";

angular.module("ovh-angular-manager-navbar").constant("UNIVERSE", "TEST");

describe("ovh-angular-manager-navbar", function () {

    var $compile,
        $rootScope,
        $scope,
        $httpBackend,
        elem;

    beforeEach(angular.mock.module("ovh-angular-manager-navbar"));

    beforeEach(angular.mock.inject(function (_$rootScope_, _$compile_, _$httpBackend_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;

        $httpBackend.whenGET("ovh-angular-manager-navbar.html").respond(200, {});

        elem = $("<div>").prependTo("body");
        $scope.$digest();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        $scope.$destroy();
        elem.remove();
    });

    var templates = {
        "default": {
            element: "<manager-navbar></manager-navbar",
            scope: {}
        }
    };

    function compileDirective (template, locals) {
        template = templates[template];
        angular.extend($scope, angular.copy(template.scope) || angular.copy(templates.default.scope), locals);
        var element = $(template.element).appendTo(elem);
        element = $compile(element)($scope);
        $scope.$digest();
        return jQuery(element[0]);
    }


    // ---


    describe("Initialization", function () {

        it("should load the default directive", angular.mock.inject(function () {

            compileDirective("default");
            $httpBackend.flush();

            expect(true).toBeTruthy();

        }));

    });

});
