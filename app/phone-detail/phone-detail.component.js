"use strict";

angular.module("phoneDetail").component("phoneDetail", {
    templateUrl: "phone-detail/phone-detail.component.html",
    controller: [
        "$http",
        "$routeParams",
        function PhoneDetailController($http, $routeParams) {
            var self = this;

            $http
                .get(`phones/${$routeParams.phoneId}.json`)
                .then(function (response) {
                    console.log(response.data);
                    self.phone = response.data;
                });
        },
    ],
});
