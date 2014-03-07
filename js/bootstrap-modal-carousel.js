/*! bootstrap-modal-carousel 2014-03-07 */
(function(factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery", "bootstrap" ], factory);
    } else {
        factory(window.jQuery);
    }
})(function($) {
    "use strict";
    $.extend($.fn.carousel.Constructor.prototype, {
        fit: function(height) {
            if (!height) {
                height = $(".item.active", this.$element).height();
            }
            if (height != this.$element.height()) {
                if ($.support.transition) {
                    this.$element.animate({
                        height: height
                    });
                } else {
                    this.$element.height(height);
                }
                this.$element.trigger($.Event("fit.bs.carousel", {
                    height: height
                }));
            }
            if (this.$element.find(".item.active img").length == 1) {
                var $img = this.$element.find(".item.active img"), pos = {
                    left: $img.position().left,
                    right: $img.position().left
                };
                if ($.support.transition) {
                    this.$element.find(".carousel-caption").animate(pos);
                } else {
                    this.$element.find(".carousel-caption").css(pos);
                }
            }
        }
    });
    $(document).on("slide.bs.carousel", ".carousel.carousel-fit", function(event) {
        var data = $(this).data("bs.carousel");
        data.$element.height($(".item.active", data.$element).height());
        var $next = $(".item.active", data.$element)[event.direction == "left" ? "next" : "prev"]();
        if (!$next.length) {
            $next = $(".item:" + (event.direction == "left" ? "first" : "last") + "-child", data.$element);
        }
        var height;
        height = $next.height();
        data.fit(height);
    }).on("slid.bs.carousel", ".carousel.carousel-fit", function(event) {
        var data = $(this).data("bs.carousel");
        data.fit();
    });
});

(function(factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery", "bootstrap" ], factory);
    } else {
        factory(window.jQuery);
    }
})(function($) {
    "use strict";
    function updateCarouselTopMargin($carousel, height) {
        if (!height) {
            height = $carousel.height();
        }
        var $parent = $carousel.parents(".modal:first"), needHeadingHandle = !$parent.hasClass("force-fullscreen"), parentFreeSpace = $parent.height();
        if (needHeadingHandle) {
            parentFreeSpace = parentFreeSpace - $(".modal-header", $parent).height();
            parentFreeSpace = parentFreeSpace - $(".modal-footer", $parent).height();
        }
        if ($.support.transition && $carousel.hasClass("slide")) {
            $carousel.animate({
                marginTop: (parentFreeSpace - height) / 2
            });
        } else {
            $carousel.css({
                marginTop: (parentFreeSpace - height) / 2
            });
        }
    }
    $(document).on("shown.bs.modal", ".modal", function(event) {
        if ($(".carousel", this).length) {
            $(".carousel", this).data("bs.carousel").fit();
        }
    }).on("shown.bs.modal", ".modal.modal-fullscreen", function(event) {
        if ($(".carousel", this).length) {
            updateCarouselTopMargin($(".carousel", this).data("bs.carousel").$element);
        }
    }).on("fit.bs.carousel", ".modal.modal-fullscreen .carousel", function(event) {
        updateCarouselTopMargin($(this).data("bs.carousel").$element, event.height);
    }).on("replaced.bs.local", ".carousel", function(event) {
        $(this).css("margin-top", 0);
        if ($(this).hasClass("carousel-fit")) {
            $(this).data("bs.carousel").fit();
        }
    });
});

(function(factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery", "bootstrap" ], factory);
    } else {
        factory(window.jQuery);
    }
})(function($) {
    "use strict";
    $.extend($.fn.modal.Constructor.prototype, {
        local: function(selector) {
            this.options.local = selector;
        },
        detach: function() {
            $(this.options.local).trigger($.Event("detach.bs.local"));
            if (!this.$placeholder) {
                this.$placeholder = $("<div></div>").addClass("hidden").html(this.$element.find(".modal-body").html()).insertBefore($(this.options.local));
            }
            this.$local = $(this.options.local).detach();
            this.$element.find(".modal-body").empty().append(this.$local);
            $(this.options.local).trigger($.Event("detached.bs.local"));
        },
        replace: function() {
            $(this.options.local).trigger($.Event("replace.bs.local"));
            this.$local.detach().insertAfter(this.$placeholder);
            this.$element.find(".modal-body").html(this.$placeholder.html());
            $(this.options.local).trigger($.Event("replaced.bs.local"));
        }
    });
    $(document).on("show.bs.modal", ".modal", function() {
        var data = $(this).data("bs.modal");
        if (data.options.local) {
            data.detach();
        }
    }).on("hidden.bs.modal", ".modal", function() {
        var data = $(this).data("bs.modal");
        if (data.options.local) {
            data.replace();
        }
    }).on("click.bs.modal.data-api", '[data-toggle="modal"][data-local]', function(event) {
        $($(this).attr("data-target")).modal("local", $(this).data("local"));
    });
});