angular.module("phoneList").component("phoneList", {
    templateUrl: "phone-list/phone-list.template.html",
    controller: [
        "Phone",
        function PhoneListController(Phone) {
            var self = this;
            self.orderProp = "age";
            self.phones = Phone.query();
        },
    ],
});
