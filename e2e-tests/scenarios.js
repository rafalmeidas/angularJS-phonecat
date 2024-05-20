"use strict";

describe("PhoneCat Application", function () {
    var until;

    it("should redirect `index.html` to `index.html#!/phones", function () {
        browser.get("index.html");
        browser.wait(
            protractor.ExpectedConditions.urlContains("index.html#!/phones"),
            10000,
        );
        expect(browser.getCurrentUrl()).toContain("index.html#!/phones");
    });

    describe("View: Phone list", function () {
        var queryField;
        var orderSelect;

        beforeEach(function () {
            browser.get("index.html#!/phones");
            until = protractor.ExpectedConditions;
            browser.wait(
                until.presenceOf(element(by.model("$ctrl.query"))),
                10000,
                "Search box taking too long to appear in the DOM",
            );

            queryField = element(by.model("$ctrl.query"));
            orderSelect = element(by.model("$ctrl.orderProp"));

            queryField.clear();
        });

        it("should filter the phone list as a user types into the search box", function () {
            var phoneList = element.all(by.repeater("phone in $ctrl.phones"));

            expect(phoneList.count()).toBe(20);

            queryField.sendKeys("nexus");
            browser.wait(
                until.presenceOf(
                    element(by.repeater("phone in $ctrl.phones").row(0)),
                ),
                5000,
            );
            expect(phoneList.count()).toBe(1);

            queryField.clear();
            queryField.sendKeys("motorola");
            browser.wait(
                until.presenceOf(
                    element(by.repeater("phone in $ctrl.phones").row(0)),
                ),
                5000,
            );
            expect(phoneList.count()).toBe(8);
        });

        it("should be possible to control phone order via the drop-down menu", function () {
            var nameOption = orderSelect.element(
                by.css('option[value="name"]'),
            );
            var phoneNameColumn = element.all(
                by.repeater("phone in $ctrl.phones").column("phone.name"),
            );

            function getNames() {
                return phoneNameColumn.map(function (elem) {
                    return elem.getText();
                });
            }

            queryField.sendKeys("tablet");

            browser.wait(
                until.presenceOf(phoneNameColumn.first()),
                10000,
                "Phone names taking too long to appear in the DOM",
            );

            expect(getNames()).toEqual([
                "Motorola XOOM\u2122 with Wi-Fi",
                "MOTOROLA XOOM\u2122",
            ]);

            nameOption.click();

            browser.wait(
                until.textToBePresentInElement(
                    phoneNameColumn.first(),
                    "MOTOROLA XOOM\u2122",
                ),
                10000,
                "Phone names taking too long to reorder",
            );

            expect(getNames()).toEqual([
                "MOTOROLA XOOM\u2122",
                "Motorola XOOM\u2122 with Wi-Fi",
            ]);
        });

        it("should render phone specific links", function () {
            var phoneLink = element.all(by.css(".phones li a")).first();

            queryField.sendKeys("nexus");

            browser.wait(
                until.presenceOf(phoneLink),
                10000,
                "Phone link taking too long to appear in the DOM",
            );

            phoneLink.click();

            browser.wait(
                until.urlContains("index.html#!/phones/nexus-s"),
                10000,
            );

            expect(browser.getCurrentUrl()).toContain(
                "index.html#!/phones/nexus-s",
            );
        });
    });

    describe("View: Phone detail", function () {
        beforeEach(function () {
            browser.get("index.html#!/phones/nexus-s");
            until = protractor.ExpectedConditions;
            browser.wait(
                until.presenceOf(element(by.binding("$ctrl.phone.name"))),
                10000,
                "Phone details taking too long to appear in the DOM",
            );
        });

        it("should display the `nexus-s` page", function () {
            expect(element(by.binding("$ctrl.phone.name")).getText()).toBe(
                "Nexus S",
            );
        });
    });
});
