angular
    .module("phonecatApp")
    .animation(".phone", function phoneAnimationFactory() {
        var duration = 500;

        return {
            addClass: animateIn,
            removeClass: animateOut,
        };

        function animateIn(element, className, done) {
            if (className !== "selected") return;

            element
                .css({
                    display: "block",
                    position: "absolute",
                    top: -500,
                    left: 0,
                })
                .animate(
                    {
                        top: 0,
                    },
                    duration,
                    done,
                );

            return function animateInEnd(wasCanceled) {
                if (wasCanceled) element.stop();
            };
        }

        function animateOut(element, className, done) {
            if (className !== "selected") return;

            element
                .css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                })
                .animate(
                    {
                        top: 500,
                    },
                    duration,
                    done,
                );

            return function animateOutEnd(wasCanceled) {
                if (wasCanceled) element.stop();
            };
        }
    });
