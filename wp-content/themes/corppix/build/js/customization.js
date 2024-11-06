(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _smoothscrollPolyfill = _interopRequireDefault(require("smoothscroll-polyfill"));

var _popupWindow = _interopRequireDefault(require("./modules/popup-window.js"));

var _helpers = require("./modules/helpers.js");

var _naviTabs = require("./modules/navi-tabs");

// Take some useful functions
// Tabs functionality (uncomment it if you need it)

/**
 * All custom code is wrapped in IIFE function
 * to prevent affect our code to another parts of code
 */
;

(function ($) {
  /**
   * PLease Collect here all variables with DOM elements
   * Use const for all DOM elements and type it as UPPERCASE text
   * It will help to each developer understand that it's a const not a variable
   */

  /** @type HTMLElement */
  var SITE_HEADER = document.querySelector('#site-header');
  var SITE_HEADER_JS = document.querySelector('.js-site-header');
  var SELECT_WITH_PLACEHOLDERs = document.querySelectorAll('.js-select-with-placeholder');

  var checkNewPelecanMessage = function checkNewPelecanMessage() {
    var PELECAN_CONTAINER = document.querySelector('.pelican-pete');

    if (PELECAN_CONTAINER) {
      var PELECAN_IDENTIFIER = (0, _helpers.getCookie)('pelican_pete_identifier');
      console.log(PELECAN_IDENTIFIER);

      if (!PELECAN_CONTAINER || var_from_php.pelican_pete_identifier != PELECAN_IDENTIFIER) {
        PELECAN_CONTAINER.classList.add('new');
      }
    }
  };

  checkNewPelecanMessage();
  var $temp = $("<input class='abs'>");
  var $url = $(location).attr('href');
  $('#copy-link-btn').on('click', function () {
    $("body").append($temp);
    $temp.val($url).select();
    document.execCommand("copy");
    $temp.remove();
    $('.copy-text').fadeIn();
    setTimeout(function () {
      $('.copy-text').fadeOut();
    }, 2000);
  });
  /**
   * Occurs when all HTML has been fully loaded and passed by the parser,
   * without waiting for the stylesheets, images and frames to finish loading
   */

  document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed - READY event"); // kick off the polyfill ( Don't delete it )

    _smoothscrollPolyfill["default"].polyfill(); // Init Closest polyfill method ( Don't delete it )


    (0, _helpers.closest_polyfill)(); // Init Popup Windows ( use it if you need Popup functionality )

    var popup_instance = new _popupWindow["default"]();
    popup_instance.init();
    var WELCOME_POPUP = document.querySelector('#welcome-popup');

    if (WELCOME_POPUP) {
      var WELCOME_POPUP_COOKIE_TIME = (0, _helpers.getCookie)('welcome_popup_time');
      var POPUP_COOKIE_TIME = var_from_php.how_often_to_show_popup;
      WELCOME_POPUP && (0, _helpers.checkLifeTime)(WELCOME_POPUP_COOKIE_TIME, POPUP_COOKIE_TIME);
      var WELCOME_POPUP_COOKIE = (0, _helpers.getCookie)('welcome_popup');
      !WELCOME_POPUP_COOKIE && WELCOME_POPUP && popup_instance.openOnePopup('#welcome-popup', 3000);
    } // Init Tabs Navigation


    (0, _naviTabs.tabsNavigation)('.js-tabs-nav-btn', '.js-tabs-nav-panel', true);

    if (typeof WOW !== 'undefined') {
      new WOW({
        animateClass: 'animate__animated'
      }).init();
    }

    var swiper = new Swiper(".js-partners", {
      slidesPerView: 1,
      loop: true,
      breakpoints: {
        570: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40
        },
        1030: {
          slidesPerView: 4,
          spaceBetween: 40
        }
      }
    }); //init elements paralax scroll

    var rellax = new Rellax('.rellax', {
      center: true
    });
    var observer = lozad(); // lazy loads elements with default selector as '.lozad'

    observer.observe(); //Close popup after sent form

    document.addEventListener('wpcf7mailsent', function (event) {
      setTimeout(function () {
        $('.js-popup-close').trigger('click');
      }, 2000);
    }, false);
    $(document).ready(function () {
      $('input[name="sortby"]').each(function () {
        $(this).prop("checked", false);
      });
      $('.js-select-with-placeholder').select2({
        dropdownParent: $('.js-select-wrapper'),
        placeholder: "How can we help?",
        allowClear: true,
        minimumResultsForSearch: -1
      });
      /**
       * @type {jQuery}
       */

      var $stateSelectWrapper = $('.js-select-state-wrapper');
      $stateSelectWrapper.each(function (i, el) {
        var $el = $(el);
        var $select = $el.find('.js-select-state');
        var isMultiple = !!$select.attr('multiple');
        $select.select2({
          closeOnSelect: !isMultiple,
          dropdownParent: $el,
          dropdownCssClass: isMultiple ? 'container--multiple' : '',
          placeholder: $select.find('option').first().text(),
          allowClear: false,
          minimumResultsForSearch: -1
        });
      }); //clearing state fields when they are available after submitting the form.

      $(document).on('wpcf7mailsent', function () {
        $stateSelectWrapper.find('select').val('').trigger('change');
      });
      /* $('.js-select-state').select2({
      	closeOnSelect : false,
      	dropdownParent: $('.js-select-state-wrapper'),
      	placeholder: "*State",
      	allowClear: false,
      	minimumResultsForSearch: -1,
      }).on("change", function (e) {
      	let state = $('.js-select-state option:selected').val();
      	if (typeof statelist !== "undefined" && state_list && state_list[state]) {
      		$('.selling-insurance-field').val(state_list[state]);
      	}
      }); */

      $('.resources-form .js-select-category').select2({
        dropdownParent: $('.resources-form .js-select-category-wrapper'),
        placeholder: "I would like to receive",
        allowClear: true,
        minimumResultsForSearch: -1
      });
      $('#block-form-sticky .js-select-category').select2({
        dropdownParent: $('#block-form-sticky .js-select-category-wrapper'),
        placeholder: "I would like to receive",
        allowClear: true,
        minimumResultsForSearch: -1
      });
    }); //scroll up

    var scrollUp = document.getElementById('scroll-top');

    if (typeof scrollUp != 'undefined' && scrollUp != null) {
      scrollUp.addEventListener('click', function (event) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    } // (SELECT_WITH_PLACEHOLDERs)
    // && [...SELECT_WITH_PLACEHOLDERs].forEach( item => {
    // 	const emptyOption = item.querySelector('option[value=""]');
    // 	console.log('emptyOption', emptyOption);
    // 	emptyOption && emptyOption.setAttribute('disabled', true);
    // });

    /**
     * Add global handler for click event
     * The main idea - to improve site performance
     * We added only 1 event handler to "click" event
     * and then use date-role attribute on each( needed ) elements
     * to define on which element event was executed..
     */


    document.addEventListener('wpcf7mailsent', function (event) {
      if ('236' == event.detail.contactFormId) {
        window.location.href = window.location.origin + "/thank-you-faq/";
      } else if ('559' == event.detail.contactFormId) {
        window.location.href = window.location.origin + "/thank-you-resources/";
      } else if ('654' == event.detail.contactFormId) {
        window.location.href = window.location.origin + "/thank-you-resources/";
      } else if ('263' == event.detail.contactFormId) {
        if (event.detail.inputs[8].value == 'Contact Us- General Inquiry') {
          window.location.href = window.location.origin + "/thank-you-contact-us/";
        } else if (event.detail.inputs[8].value == 'Contact Us- Get Notified') {
          var endpointUrl = event.detail.inputs[8].value == 3 ? 'thank-you-state-home' : 'thank-you-state-quote';
          window.location.href = window.location.origin + "/" + endpointUrl + "/?state=" + event.detail.inputs[5].value;
        } else if (event.detail.inputs[8].value == 'Contact Us- Partnerships') {
          window.location.href = window.location.origin + "/thank-you-partnership/";
        }
      }
    }, false); //show state name by hover on state map

    var stateList = document.querySelectorAll('.svg-hover');

    if (typeof stateList != 'undefined' && stateList != null) {
      stateList.forEach(function (el) {
        return el.addEventListener("mouseover", function (event) {
          var stateName = el.dataset.info;
          var stateElem = document.getElementById('insuring-boat__map-state');
          stateElem.innerHTML = stateName;
          stateElem.style.opacity = "0.6"; //document.getElementById('insuring-boat__map-state').classList.add('active');
        });
      });
      stateList.forEach(function (el) {
        return el.addEventListener("mouseout", function (event) {
          var stateElem = document.getElementById('insuring-boat__map-state');
          stateElem.style.opacity = "0"; //stateElem.innerHTML = '';
        });
      });
    }

    var showContactForm = document.querySelector('.insuring-boat__map-bottom-link');

    if (showContactForm) {
      showContactForm.addEventListener('click', function () {
        var sourseSelect = document.querySelector('.sourse-select');
        sourseSelect.value = 'Contact Us- Get Notified';
        sourseSelect.dispatchEvent(new window.Event('change', {
          bubbles: true
        }));
      });
    }

    document.body.addEventListener('click', function (event) {
      var ROLE = event.target.dataset.role;
      var TARGET = event.target;
      if (!ROLE) return;

      switch (ROLE) {
        // Scroll page to top
        case 'play-video':
          {
            var videoId = event.target.dataset.id;
            var video = document.getElementById(videoId);

            if (video.paused) {
              video.play();
            } else {
              video.pause();
            }
          }
          break;

        case 'open-palacan-message':
          {
            var PELECAN_CONTAINER = TARGET.closest('.pelican-pete');

            if (PELECAN_CONTAINER.classList.contains('new')) {
              (0, _helpers.setCookie)('pelican_pete_identifier', var_from_php.pelican_pete_identifier, 365);
              PELECAN_CONTAINER.classList.remove('new');
            }

            if (!PELECAN_CONTAINER.classList.contains('active')) {
              console.log(PELECAN_CONTAINER.classList);
              PELECAN_CONTAINER.classList.add('active');
            } else {
              PELECAN_CONTAINER.classList.remove('active');
            }
          }
          break;

        case 'close-palacan-message':
          {
            var _PELECAN_CONTAINER = document.querySelector('.pelican-pete');

            _PELECAN_CONTAINER && _PELECAN_CONTAINER.classList.remove('active');
          }
          break;

        case 'faq':
          {
            /*if(!event.target.classList.contains('active')){
            	event.target.classList.remove("active");
            	let sections = document.querySelectorAll('.faq-section__title.active');
            	for (let i = 0; i < sections.length; i++){
            			sections[i].classList.remove('active');
            	}
            	let questions = document.querySelectorAll('.faq-section__questions.active');
            	for (let i = 0; i < questions.length; i++){
            		//questions[i].style.maxHeight = null;
            		questions[i].classList.remove('active');
            	}
            	event.target.classList.add("active");
            }else{
            	event.target.classList.remove("active");
            }*/
            event.target.classList.toggle("active");
            var faq = event.target.nextElementSibling;
            faq.classList.toggle("active");

            if (faq.style.maxHeight) {
              faq.style.maxHeight = null;
            } else {
              faq.style.maxHeight = faq.scrollHeight + "px";
            }
          }
          break;

        case 'element2':
          {// some required action
          }
          break;
      }
    });
  });

  var getOffsetTop = function getOffsetTop(element) {
    var offsetTop = 0;

    while (element) {
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    }

    return offsetTop;
  };

  var sticky_form = document.getElementById("block-form-sticky");
  var origOffset = getOffsetTop(sticky_form);

  function stickySubscribeForm() {
    var bottom_section = document.getElementById("bottom-section");
    var origOffsetBottom = getOffsetTop(bottom_section);
    var headerHeight = SITE_HEADER.offsetHeight;
    var blockHeight = document.getElementById("block-form-sticky").offsetHeight;

    if (window.screen.width > 1030) {
      if (window.pageYOffset + 110 >= origOffset && window.pageYOffset + blockHeight + 110 + 145 < origOffsetBottom) {
        sticky_form.classList.add("fixed");
        sticky_form.classList.remove("fixed-bottom");
      } else if (window.pageYOffset + blockHeight + 110 + 145 >= origOffsetBottom) {
        sticky_form.classList.add("fixed-bottom");
        sticky_form.classList.remove("fixed");
      } else {
        sticky_form.classList.remove("fixed");
      }
    } else {
      sticky_form.classList.remove("fixed-bottom");
      sticky_form.classList.remove("fixed");
    }
  }

  if (typeof sticky_form != 'undefined' && sticky_form != null) {
    stickySubscribeForm();
  } //show scroll Up button when scroll more than 500


  var showScrollUp = function showScrollUp() {
    var scrollBtn = document.getElementById("scroll-top");
    var operationType = window.pageYOffset > 500 ? 'add' : 'remove';
    scrollBtn && scrollBtn.classList[operationType]('show');
    scrollBtn && document.body.classList[operationType]('has-scroll-up');
  };

  showScrollUp(); //show scroll hint

  var showHideScrollHint = function showHideScrollHint() {
    var SCROLL_HINT = document.querySelector('.scroll-hint');

    if (SCROLL_HINT) {
      var operationType = window.pageYOffset > 0 ? 'add' : 'remove';
      SCROLL_HINT.classList[operationType]("hide");
    }
  };
  /**
   * Catch Scroll event
   */


  showHideScrollHint();
  window.addEventListener('scroll', (0, _helpers.debounce)(function (event) {
    //show hide scroll hint
    showHideScrollHint();
    var scrollAmount = window.pageYOffset || document.documentElement.scrollTop;
    var operationType = scrollAmount > 0 ? 'add' : 'remove'; // Add/remove site header additional "sticky" class

    SITE_HEADER_JS && SITE_HEADER_JS.classList[operationType]('site-header__sticky'); //show get a quote on homepage when cta from banner is not in portview

    var cta_btn = document.getElementById("cta-btn");

    if (typeof cta_btn != 'undefined' && cta_btn != null) {
      var headerHeight = SITE_HEADER.offsetHeight;
      var get_quote = document.getElementById('site-header__btn');
      var show = (0, _helpers.isInViewport)(cta_btn, 0 - headerHeight);

      if (show == false) {
        get_quote.classList.remove("hide");
      } else {
        get_quote.classList.add("hide");
      }
    }

    var cruisingSlider = document.getElementById('cruising-section__scroll');

    if (typeof cruisingSlider != 'undefined' && cruisingSlider != null) {
      var isCruising = (0, _helpers.isInViewport)(cruisingSlider, 0);

      if (!isCruising) {
        cruisingSliderReset();
      } else {
        $('#cruising-section__slider').slick('slickSetOption', 'autoplay', true);
        $('#cruising-section__slider').slick("play");
      }
    }

    var sticky_form = document.getElementById("block-form-sticky");

    if (typeof sticky_form != 'undefined' && sticky_form != null) {
      stickySubscribeForm();
    }

    showScrollUp();
  }, 0));
  var resizeObserver = new ResizeObserver(function (entries) {
    /** @type HTMLElement */
    var primaryWrapper = document.getElementById('primary-wrapper');
    primaryWrapper.style.marginBlockStart = "".concat(SITE_HEADER.offsetHeight, "px");
  });
  resizeObserver.observe(SITE_HEADER); // Use it when you need to know that everything is loaded (html, styles, images)

  window.addEventListener('load', function (event) {
    console.log('page is fully loaded');
    boatAnimate();
    sideImageAnimation();
    /**
     * Simple hack for some cases
     */

    setTimeout(function () {
      document.body.classList.add('loaded');
    }, 500);
    var questions = document.querySelectorAll('.faq-section__questions.active');

    for (var i = 0; i < questions.length; i++) {
      questions[i].style.maxHeight = questions[i].scrollHeight + "px";
    }
  }); //show mobile menu

  var menuBtn = document.getElementById('mobile-menu-btn');
  menuBtn && menuBtn.addEventListener('click', function () {
    this.classList.toggle('menu-open');
    document.getElementById('site-header').classList.toggle('menu-opened');
    document.getElementById('mobile-menu').classList.toggle('show');
  }); //cutting edge slider

  if ($('.cutting-edge-technology__slider').length > 0) {
    $('.cutting-edge-technology__slider').each(function () {
      $(this).slick({
        dots: true,
        arrows: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 10000
      }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var id = $(this).attr('data-id');
        $('.cutting-edge-technology__phone-btn-container-' + id).removeClass('active');
        $('.cutting-edge-technology__phone-btn-' + id).removeClass('active');
        $('.cutting-edge-technology__phone-image-' + id).removeClass('active');
        $('.cutting-edge-technology__phone-image-' + id + '-' + nextSlide).addClass('active');
        $('#cutting-edge-' + id + '-' + nextSlide).addClass('active');
        $('#cutting-edge-' + id + '-' + nextSlide).find('.cutting-edge-technology__phone-btn').addClass('active');
      });
    });
  } //change cutting-edge-slider slide by clicking on icons


  $('.cutting-edge-technology__phone-btn').each(function () {
    $(this).click(function () {
      if (!$(this).hasClass('active')) {
        var id = $(this).attr('data-id');
        var setSlide = $(this).attr('data-slide'); // $('.cutting-edge-technology__phone-btn-container-'+id).removeClass('active');
        // $('.cutting-edge-technology__phone-btn-'+id).removeClass('active');
        // $(this).addClass('active');
        // $(this).closest('.cutting-edge-technology__phone-btn-container').addClass('active');

        $('#cutting-edge-slider-' + id).slick('slickGoTo', setSlide);
      }
    });
  }); //testimonials slider

  if ($('.testimonials-block__slider').length > 0) {
    $('.testimonials-block__slider').each(function () {
      $(this).slick({
        dots: true,
        arrows: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: '<button type="button" class="slick-prev"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0422 7.49997L15 -9.35787e-06L8.9437e-08 7.49997L15 15L12.0422 7.49997ZM1.43944 7.49997L11.4025 7.49997C11.4026 7.5809 11.4178 7.66111 11.4473 7.73638L13.793 13.674L1.43944 7.49997Z" fill="white"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.95777 7.50003L-8.4042e-06 15L15 7.50003L-8.58307e-06 1.78873e-07L2.95777 7.50003ZM13.5606 7.50003L3.59752 7.50003C3.59745 7.4191 3.58225 7.33889 3.55273 7.26362L1.20698 1.32597L13.5606 7.50003Z" fill="white"/></svg></button>',
        responsive: [{
          breakpoint: 850,
          settings: {
            arrows: true
          }
        }]
      });
    });
  } //insuring boat slider


  if ($('.js-boat-slider-left').length > 0) {
    $('.js-boat-slider-left').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 2,
      arrows: true,
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      asNavFor: '.js-boat-thumbnail-slider-left',
      prevArrow: '<button type="button" class="slick-prev"><svg width="30" height="39" viewBox="0 0 30 39" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_18144_271855)"><path d="M23.9543 19.6962L29.5972 38.9235L0.979737 19.6962L29.5972 0.468748L23.9543 19.6962ZM3.72594 19.6962L22.7337 19.6962C22.7339 19.4887 22.7629 19.2831 22.8192 19.0901L27.2945 3.86806L3.72594 19.6962Z" fill="white"/></g>			<defs><clipPath id="clip0_18144_271855"><rect width="38.4547" height="28.6174" fill="white" transform="matrix(3.22682e-08 1 1 -5.92126e-08 0.979736 0.46875)"/></clipPath></defs></svg></button>',
      nextArrow: '<button type="button" class="slick-next"><svg width="29" height="39" viewBox="0 0 29 39" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_18144_271852)"><path d="M5.76034 19.6962L0.117402 38.9235L28.7349 19.6962L0.117404 0.468749L5.76034 19.6962ZM25.9887 19.6962L6.98087 19.6962C6.98073 19.4887 6.95174 19.2831 6.89542 19.0901L2.42013 3.86806L25.9887 19.6962Z" fill="#F6F2FD"/></g><defs><clipPath id="clip0_18144_271852"><rect width="38.4547" height="28.6174" fill="white" transform="translate(28.7349 0.46875) rotate(90)"/></clipPath>	</defs></svg></button>'
    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      var id = slick.$slider.attr('data-id');
      $('.js-slide-title-left.active').fadeOut(function () {
        $('#title-' + nextSlide + id).fadeIn().addClass('active');
      }).removeClass('active');
    });
    $('.js-boat-thumbnail-slider-left').slick({
      slidesToShow: 5,
      slidesToScroll: 5,
      initialSlide: 2,
      asNavFor: '.js-boat-slider-left',
      dots: false,
      arrows: false,
      infinite: true,
      centerMode: true,
      focusOnSelect: true
    });
  }

  if ($('.js-boat-slider-right').length > 0) {
    $('.js-boat-slider-right').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 2,
      arrows: true,
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      asNavFor: '.js-boat-thumbnail-slider-right',
      prevArrow: '<button type="button" class="slick-prev"><svg width="30" height="39" viewBox="0 0 30 39" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_18144_271855)"><path d="M23.9543 19.6962L29.5972 38.9235L0.979737 19.6962L29.5972 0.468748L23.9543 19.6962ZM3.72594 19.6962L22.7337 19.6962C22.7339 19.4887 22.7629 19.2831 22.8192 19.0901L27.2945 3.86806L3.72594 19.6962Z" fill="white"/></g>			<defs><clipPath id="clip0_18144_271855"><rect width="38.4547" height="28.6174" fill="white" transform="matrix(3.22682e-08 1 1 -5.92126e-08 0.979736 0.46875)"/></clipPath></defs></svg></button>',
      nextArrow: '<button type="button" class="slick-next"><svg width="29" height="39" viewBox="0 0 29 39" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_18144_271852)"><path d="M5.76034 19.6962L0.117402 38.9235L28.7349 19.6962L0.117404 0.468749L5.76034 19.6962ZM25.9887 19.6962L6.98087 19.6962C6.98073 19.4887 6.95174 19.2831 6.89542 19.0901L2.42013 3.86806L25.9887 19.6962Z" fill="#F6F2FD"/></g><defs><clipPath id="clip0_18144_271852"><rect width="38.4547" height="28.6174" fill="white" transform="translate(28.7349 0.46875) rotate(90)"/></clipPath>	</defs></svg></button>'
    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      var id = slick.$slider.attr('data-id');
      $('.js-slide-title-right.active').fadeOut(function () {
        $('#title-' + nextSlide + id).fadeIn().addClass('active');
      }).removeClass('active');
      $('.js-slide-text-right.active').fadeOut(function () {
        $('#text-' + nextSlide + id).fadeIn().addClass('active');
      }).removeClass('active');
    });
    $('.js-boat-thumbnail-slider-right').slick({
      slidesToShow: 6,
      slidesToScroll: 5,
      initialSlide: 2,
      asNavFor: '.js-boat-slider-right',
      dots: false,
      arrows: false,
      infinite: true,
      centerMode: true,
      focusOnSelect: true
    });
  }

  console.log('init'); //technology slider

  if ($('.technology-slider-section__slider').length > 0) {
    $('.technology-slider-section__slider').each(function () {
      $(this).slick({
        dots: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button type="button" class="slick-prev"><svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.8873 15.4999L31 30.9999L-1.84836e-07 15.4999L31 -0.000121701L24.8873 15.4999ZM2.97484 15.4999L23.5651 15.4999C23.5653 15.3327 23.5967 15.1669 23.6577 15.0114L28.5056 2.74021L2.97484 15.4999Z" fill="#0D2D5F"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.11272 15.4999L-1.67965e-05 30.9999L31 15.4999L-1.71661e-05 -0.000121701L6.11272 15.4999ZM28.0252 15.4999L7.43487 15.4999C7.43472 15.3327 7.40331 15.1669 7.34231 15.0114L2.49443 2.74021L28.0252 15.4999Z" fill="#0D2D5F"/></svg></button>'
      }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var id = $(this).attr('data-id');
        $('.technology-slider-section__slider-text.active').fadeOut(function () {
          $('#text-' + nextSlide + id).fadeIn().addClass('active');
        }).removeClass('active');
      });
    });
  }

  if ($('.ensuring-slider-section__slider').length > 0) {
    $('.ensuring-slider-section__slider').each(function () {
      $(this).slick({
        dots: false,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1057_8074)"><path d="M34.5211 21.5001L43 43L9.39799e-07 21.5001L43 -1.87959e-06L34.5211 21.5001ZM4.12639 21.5001L32.6871 21.5001C32.6873 21.2681 32.7309 21.0381 32.8155 20.8224L39.54 3.8011L4.12639 21.5001Z" fill="white"/></g><defs><clipPath id="clip0_1057_8074"><rect width="43" height="43" fill="white" transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 0)"/></clipPath></defs></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1057_8071)"><path d="M8.47894 21.5001L-2.09531e-05 43L43 21.5001L-1.90735e-05 -1.87959e-06L8.47894 21.5001ZM38.8736 21.5001L10.3129 21.5001C10.3127 21.2681 10.2691 21.0381 10.1845 20.8224L3.46001 3.8011L38.8736 21.5001Z" fill="#F6F2FD"/></g><defs><clipPath id="clip0_1057_8071"><rect width="43" height="43" fill="white" transform="translate(43) rotate(90)"/></clipPath></defs></svg></button>'
      });
    });
  }

  if ($('.cruising-section__slider').length > 0) {
    $('.cruising-section__slider').each(function () {
      var slider = $(this);
      slider.slick({
        dots: true,
        arrows: false,
        speed: 500,
        slidesToShow: 2,
        infinite: false,
        variableWidth: true,
        draggable: true,
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [{
          breakpoint: 991,
          settings: {
            variableWidth: false,
            slidesToShow: 1,
            dots: true,
            draggable: true
          }
        }]
      }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        //let count  = $('#cruising-step').attr('data-count');
        if (nextSlide > 0) {
          $('.cruising-section__boat').removeClass('start');
          $('.cruising-section__boat').css({
            "-webkit-transform": "translateX(" + slider.find('.slick-active:not(.slick-current)').outerWidth(true) + "px)",
            "-ms-transform": "translateX(" + slider.find('.slick-active:not(.slick-current)').outerWidth(true) + "px)",
            "transform": "translateX(" + slider.find('.slick-active:not(.slick-current)').outerWidth(true) + "px)"
          });
          var step = $('#cruising-step').val();
          $('#cruising-step').val(parseInt(step) + 1);
        } else if (nextSlide == 0) {
          $('#cruising-step').val(0);
          $('.cruising-section__boat').addClass('start');
          $('.cruising-section__boat').css({
            "-webkit-transform": "translateX(0px)",
            "-ms-transform": "translateX(0px)",
            "transform": "translateX(0px)"
          });
          $('#cruising-step').val(0);
        }
      });
      $(window).on('load', function () {
        $('.cruising-section__slider').each(function () {
          var carousel = $(this);

          if ($(window).width() > 991) {//carousel.slick('slickAdd', '<div class="item"></div>', 0);
          } else if ($(window).width() < 991) {
            carousel.slick('slickRemove', 0);
          }
        });
      });
    });
  }

  function cruisingSliderReset() {
    if ($('.cruising-section__slider').length > 0) {
      $('.cruising-section__slider').each(function () {
        $(this).slick('slickGoTo', 0);
        $('#cruising-step').val(0);
        $('.cruising-section__boat').addClass('start');
        $('.cruising-section__boat').css({
          "-webkit-transform": "translateX(0px)",
          "-ms-transform": "translateX(0px)",
          "transform": "translateX(0px)"
        });
      });
    }
  } //animate the boat


  function boatAnimate() {
    var boatAnimation = document.getElementsByClassName('boatAnimation');

    for (var i = 0; i < boatAnimation.length; i++) {
      var animation = bodymovin.loadAnimation({
        container: boatAnimation.item(i),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: boatAnimation[i].dataset.file
      });
      animation.setSpeed(0.3);
    }
  }

  function sideImageAnimation() {
    var animationBlock = document.getElementsByClassName('svg-json-animation');

    for (var i = 0; i < animationBlock.length; i++) {
      var animation = bodymovin.loadAnimation({
        container: animationBlock.item(i),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationBlock[i].dataset.file
      });
      animation.setSpeed(0.3);
    }

    return false;
  } //sourse change


  $('.sourse-select').on('change', function () {
    $('.source-field').val($(this).find(":selected").val());
  });
  $("#mobile-header-menu .menu-item-has-children > .like-link, #mobile-header-menu .menu-item-has-children > a").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var item = $(this).parent();
    var arrow = item.children('.like-link, a').find('.arrow-down');

    if (!item.hasClass("active")) {
      item.siblings(".menu-item-has-children").removeClass("active").find(".sub-menu").stop(true, true).slideUp();
      item.siblings(".menu-item-has-children").children('.like-link, a').find('.arrow-down').removeClass('rotate-arrow');
      item.find(".sub-menu").first().stop(true, true).slideDown();
      item.children('.like-link, a').find('.arrow-down').addClass('rotate-arrow');
      item.addClass("active");
    } else {
      item.find(".sub-menu").first().stop(true, true).slideUp();
      item.children('.like-link, a').find('.arrow-down').removeClass('rotate-arrow');
      item.removeClass("active");
    }
  });
  $("#mobile-header-menu .menu-item-has-children .sub-menu a").click(function (e) {
    e.stopPropagation();
  });
  $('.show-tags').click(function () {
    $(this).toggleClass('active');
    $('.resources-tags-section__wrapper-limited').toggleClass('active');
    $(this).text(function (i, text) {
      return text === "See more" ? "See less" : "See more";
    });
  }); //post pagination------------------------------------------------

  function load_all_posts(page) {
    $(".resources-posts-section__container .loader").fadeIn();
    var tags = [];
    $('.resources-tags-section__tag:checked').each(function () {
      tags.push($(this).val());
    });
    var orderby = null;
    orderby = $('.resources-search-section__categories-sortby:checked').val();
    var data = {
      page: page,
      tags: tags,
      order: orderby,
      tax_id: $('#resources-taxonomy').val(),
      tax: $('#resources-taxonomy').attr('data-tax'),
      per_page: $('#per_page').val(),
      action: "post_pagination"
    };
    $.post(var_from_php.ajax_url, data, function (response) {
      $(".resources-posts-section__container .resources-posts-section__ajax").html(response);
      $('html, body').animate({
        scrollTop: $(".resources-search-section").offset().top - 87
      }, 500);
      $('.resources-posts-section__container .loader').fadeOut(300);
    });
  }

  $(document).on('click', '.pagination .active', function () {
    var page = $(this).attr('data-page');
    load_all_posts(page);
  });
  $(document).on('change', '.resources-tags-section__tag', function () {
    load_all_posts(1);
  });
  $(".resources-search-section__categories-sortby").on('click', function () {
    // in the handler, 'this' refers to the box clicked on
    var $box = $(this);

    if ($box.is(":checked")) {
      var group = "input:checkbox[name='" + $box.attr("name") + "']";
      $(group).prop("checked", false);
      $box.prop("checked", true);
    } else {
      $box.prop("checked", false);
    }

    load_all_posts(1);
  }); //---------------------------------------------------------------
})(jQuery); //Add logic fo show/hide FAQ


document.addEventListener('DOMContentLoaded', function () {
  var faqTitles = document.querySelectorAll('.faq__section-title');
  faqTitles.forEach(function (title) {
    title.addEventListener('click', function () {
      this.classList.toggle('active');
      var faqItems = this.nextElementSibling;

      if (faqItems.style.maxHeight) {
        faqItems.style.maxHeight = null;
      } else {
        faqItems.style.maxHeight = faqItems.scrollHeight + 'px';
      }
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfZjNmMGUwMDIuanMiXSwibmFtZXMiOlsiJCIsIlNJVEVfSEVBREVSIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiU0lURV9IRUFERVJfSlMiLCJTRUxFQ1RfV0lUSF9QTEFDRUhPTERFUnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2hlY2tOZXdQZWxlY2FuTWVzc2FnZSIsIlBFTEVDQU5fQ09OVEFJTkVSIiwiUEVMRUNBTl9JREVOVElGSUVSIiwiY29uc29sZSIsImxvZyIsInZhcl9mcm9tX3BocCIsInBlbGljYW5fcGV0ZV9pZGVudGlmaWVyIiwiY2xhc3NMaXN0IiwiYWRkIiwiJHRlbXAiLCIkdXJsIiwibG9jYXRpb24iLCJhdHRyIiwib24iLCJhcHBlbmQiLCJ2YWwiLCJzZWxlY3QiLCJleGVjQ29tbWFuZCIsInJlbW92ZSIsImZhZGVJbiIsInNldFRpbWVvdXQiLCJmYWRlT3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwic21vb3Roc2Nyb2xsIiwicG9seWZpbGwiLCJwb3B1cF9pbnN0YW5jZSIsIlBvcHVwIiwiaW5pdCIsIldFTENPTUVfUE9QVVAiLCJXRUxDT01FX1BPUFVQX0NPT0tJRV9USU1FIiwiUE9QVVBfQ09PS0lFX1RJTUUiLCJob3dfb2Z0ZW5fdG9fc2hvd19wb3B1cCIsIldFTENPTUVfUE9QVVBfQ09PS0lFIiwib3Blbk9uZVBvcHVwIiwiV09XIiwiYW5pbWF0ZUNsYXNzIiwic3dpcGVyIiwiU3dpcGVyIiwic2xpZGVzUGVyVmlldyIsImxvb3AiLCJicmVha3BvaW50cyIsInNwYWNlQmV0d2VlbiIsInJlbGxheCIsIlJlbGxheCIsImNlbnRlciIsIm9ic2VydmVyIiwibG96YWQiLCJvYnNlcnZlIiwidHJpZ2dlciIsInJlYWR5IiwiZWFjaCIsInByb3AiLCJzZWxlY3QyIiwiZHJvcGRvd25QYXJlbnQiLCJwbGFjZWhvbGRlciIsImFsbG93Q2xlYXIiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsIiRzdGF0ZVNlbGVjdFdyYXBwZXIiLCJpIiwiZWwiLCIkZWwiLCIkc2VsZWN0IiwiZmluZCIsImlzTXVsdGlwbGUiLCJjbG9zZU9uU2VsZWN0IiwiZHJvcGRvd25Dc3NDbGFzcyIsImZpcnN0IiwidGV4dCIsInNjcm9sbFVwIiwiZ2V0RWxlbWVudEJ5SWQiLCJ3aW5kb3ciLCJzY3JvbGxUbyIsInRvcCIsImJlaGF2aW9yIiwiZGV0YWlsIiwiY29udGFjdEZvcm1JZCIsImhyZWYiLCJvcmlnaW4iLCJpbnB1dHMiLCJ2YWx1ZSIsImVuZHBvaW50VXJsIiwic3RhdGVMaXN0IiwiZm9yRWFjaCIsInN0YXRlTmFtZSIsImRhdGFzZXQiLCJpbmZvIiwic3RhdGVFbGVtIiwiaW5uZXJIVE1MIiwic3R5bGUiLCJvcGFjaXR5Iiwic2hvd0NvbnRhY3RGb3JtIiwic291cnNlU2VsZWN0IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiYnViYmxlcyIsImJvZHkiLCJST0xFIiwidGFyZ2V0Iiwicm9sZSIsIlRBUkdFVCIsInZpZGVvSWQiLCJpZCIsInZpZGVvIiwicGF1c2VkIiwicGxheSIsInBhdXNlIiwiY2xvc2VzdCIsImNvbnRhaW5zIiwidG9nZ2xlIiwiZmFxIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwibWF4SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiZ2V0T2Zmc2V0VG9wIiwiZWxlbWVudCIsIm9mZnNldFRvcCIsIm9mZnNldFBhcmVudCIsInN0aWNreV9mb3JtIiwib3JpZ09mZnNldCIsInN0aWNreVN1YnNjcmliZUZvcm0iLCJib3R0b21fc2VjdGlvbiIsIm9yaWdPZmZzZXRCb3R0b20iLCJoZWFkZXJIZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJibG9ja0hlaWdodCIsInNjcmVlbiIsIndpZHRoIiwicGFnZVlPZmZzZXQiLCJzaG93U2Nyb2xsVXAiLCJzY3JvbGxCdG4iLCJvcGVyYXRpb25UeXBlIiwic2hvd0hpZGVTY3JvbGxIaW50IiwiU0NST0xMX0hJTlQiLCJzY3JvbGxBbW91bnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxUb3AiLCJjdGFfYnRuIiwiZ2V0X3F1b3RlIiwic2hvdyIsImNydWlzaW5nU2xpZGVyIiwiaXNDcnVpc2luZyIsImNydWlzaW5nU2xpZGVyUmVzZXQiLCJzbGljayIsInJlc2l6ZU9ic2VydmVyIiwiUmVzaXplT2JzZXJ2ZXIiLCJlbnRyaWVzIiwicHJpbWFyeVdyYXBwZXIiLCJtYXJnaW5CbG9ja1N0YXJ0IiwiYm9hdEFuaW1hdGUiLCJzaWRlSW1hZ2VBbmltYXRpb24iLCJxdWVzdGlvbnMiLCJsZW5ndGgiLCJtZW51QnRuIiwiZG90cyIsImFycm93cyIsInNwZWVkIiwiZmFkZSIsImNzc0Vhc2UiLCJzbGlkZXNUb1Nob3ciLCJpbmZpbml0ZSIsImF1dG9wbGF5IiwiYXV0b3BsYXlTcGVlZCIsImN1cnJlbnRTbGlkZSIsIm5leHRTbGlkZSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJjbGljayIsImhhc0NsYXNzIiwic2V0U2xpZGUiLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwic2xpZGVzVG9TY3JvbGwiLCJpbml0aWFsU2xpZGUiLCJhc05hdkZvciIsIiRzbGlkZXIiLCJjZW50ZXJNb2RlIiwiZm9jdXNPblNlbGVjdCIsInNsaWRlciIsInZhcmlhYmxlV2lkdGgiLCJkcmFnZ2FibGUiLCJjc3MiLCJvdXRlcldpZHRoIiwic3RlcCIsInBhcnNlSW50IiwiY2Fyb3VzZWwiLCJib2F0QW5pbWF0aW9uIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImFuaW1hdGlvbiIsImJvZHltb3ZpbiIsImxvYWRBbmltYXRpb24iLCJjb250YWluZXIiLCJpdGVtIiwicmVuZGVyZXIiLCJwYXRoIiwiZmlsZSIsInNldFNwZWVkIiwiYW5pbWF0aW9uQmxvY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJwYXJlbnQiLCJhcnJvdyIsImNoaWxkcmVuIiwic2libGluZ3MiLCJzdG9wIiwic2xpZGVVcCIsInNsaWRlRG93biIsInRvZ2dsZUNsYXNzIiwibG9hZF9hbGxfcG9zdHMiLCJwYWdlIiwidGFncyIsInB1c2giLCJvcmRlcmJ5IiwiZGF0YSIsIm9yZGVyIiwidGF4X2lkIiwidGF4IiwicGVyX3BhZ2UiLCJhY3Rpb24iLCJwb3N0IiwiYWpheF91cmwiLCJyZXNwb25zZSIsImh0bWwiLCJhbmltYXRlIiwib2Zmc2V0IiwiJGJveCIsImlzIiwiZ3JvdXAiLCJqUXVlcnkiLCJmYXFUaXRsZXMiLCJ0aXRsZSIsImZhcUl0ZW1zIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0FBQ0E7O0FBSUE7O0FBWUE7O0FBYkE7QUFZQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFDLENBQUMsVUFBV0EsQ0FBWCxFQUFlO0FBRWhCO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUM7QUFDQSxNQUFNQyxXQUFXLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixjQUF2QixDQUFwQjtBQUNBLE1BQU1DLGNBQWMsR0FBR0YsUUFBUSxDQUFDQyxhQUFULENBQXVCLGlCQUF2QixDQUF2QjtBQUNBLE1BQU1FLHdCQUF3QixHQUFHSCxRQUFRLENBQUNJLGdCQUFULENBQTBCLDZCQUExQixDQUFqQzs7QUFFQSxNQUFNQyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXlCLEdBQUs7QUFDbkMsUUFBTUMsaUJBQWlCLEdBQUdOLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixlQUF2QixDQUExQjs7QUFDQSxRQUFHSyxpQkFBSCxFQUFxQjtBQUNwQixVQUFNQyxrQkFBa0IsR0FBRyx3QkFBVSx5QkFBVixDQUEzQjtBQUNBQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsa0JBQVo7O0FBQ0EsVUFBRyxDQUFDRCxpQkFBRCxJQUFzQkksWUFBWSxDQUFDQyx1QkFBYixJQUF3Q0osa0JBQWpFLEVBQW9GO0FBQ25GRCxRQUFBQSxpQkFBaUIsQ0FBQ00sU0FBbEIsQ0FBNEJDLEdBQTVCLENBQWdDLEtBQWhDO0FBQ0E7QUFDRDtBQUNELEdBVEQ7O0FB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QUFELENBQUQsQ0FBU25MLElBQVQsQ0FBYyxTQUFkLEVBQXlCLEtBQXpCO0FBQ0FpTCxNQUFBQSxJQUFJLENBQUNqTCxJQUFMLENBQVUsU0FBVixFQUFxQixJQUFyQjtBQUNBLEtBSkQsTUFJTztBQUNOaUwsTUFBQUEsSUFBSSxDQUFDakwsSUFBTCxDQUFVLFNBQVYsRUFBcUIsS0FBckI7QUFDQTs7QUFDRGdLLElBQUFBLGNBQWMsQ0FBQyxDQUFELENBQWQ7QUFDQSxHQVhELEVBN3hCZ0IsQ0F5eUJoQjtBQUVBLENBM3lCQSxFQTJ5QkdvQixNQTN5QkgsRSxDQTR5QkQ7OztBQUNBN08sUUFBUSxDQUFDMkIsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDckQsTUFBTW1OLFNBQVMsR0FBRzlPLFFBQVEsQ0FBQ0ksZ0JBQVQsQ0FBMEIscUJBQTFCLENBQWxCO0FBRUEwTyxFQUFBQSxTQUFTLENBQUN0SixPQUFWLENBQWtCLFVBQVN1SixLQUFULEVBQWdCO0FBQzlCQSxJQUFBQSxLQUFLLENBQUNwTixnQkFBTixDQUF1QixPQUF2QixFQUFnQyxZQUFXO0FBRXZDLFdBQUtmLFNBQUwsQ0FBZXNHLE1BQWYsQ0FBc0IsUUFBdEI7QUFFQSxVQUFNOEgsUUFBUSxHQUFHLEtBQUs1SCxrQkFBdEI7O0FBRUEsVUFBSTRILFFBQVEsQ0FBQ2xKLEtBQVQsQ0FBZXVCLFNBQW5CLEVBQThCO0FBQzFCMkgsUUFBQUEsUUFBUSxDQUFDbEosS0FBVCxDQUFldUIsU0FBZixHQUEyQixJQUEzQjtBQUNILE9BRkQsTUFFTztBQUNIMkgsUUFBQUEsUUFBUSxDQUFDbEosS0FBVCxDQUFldUIsU0FBZixHQUEyQjJILFFBQVEsQ0FBQzFILFlBQVQsR0FBd0IsSUFBbkQ7QUFDSDtBQUNKLEtBWEQ7QUFZSCxHQWJEO0FBY0gsQ0FqQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc21vb3Roc2Nyb2xsIGZyb20gJ3Ntb290aHNjcm9sbC1wb2x5ZmlsbCc7XG5pbXBvcnQgUG9wdXAgZnJvbSAnLi9tb2R1bGVzL3BvcHVwLXdpbmRvdy5qcyc7XG5cblxuLy8gVGFrZSBzb21lIHVzZWZ1bCBmdW5jdGlvbnNcbmltcG9ydCB7XG5cdGlzSW5WaWV3cG9ydCxcblx0Y2xvc2VzdF9wb2x5ZmlsbCxcblx0c2V0Q29va2llLFxuXHRkZWxldGVDb29raWUsXG5cdGNoZWNrTGlmZVRpbWUsXG5cdGdldENvb2tpZSxcblx0ZGVib3VuY2UsICAgICAgICAvLyBWZXJ5IHVzZWZ1bCBmdW5jdGlvbi4gQWx3YXlzIHVzZSBpdCBmb3Igc3VjaCBldmVudHMgbGlrZTpcblx0XHRcdFx0ICAgICAvLyBzY3JvbGwsIHJlc2l6ZSwga2V5dXAsIGtleWRvd24sIGtleXByZXNzIGV0Yy4uXG59IGZyb20gJy4vbW9kdWxlcy9oZWxwZXJzLmpzJztcblxuLy8gVGFicyBmdW5jdGlvbmFsaXR5ICh1bmNvbW1lbnQgaXQgaWYgeW91IG5lZWQgaXQpXG5pbXBvcnQgeyB0YWJzTmF2aWdhdGlvbiB9IGZyb20gJy4vbW9kdWxlcy9uYXZpLXRhYnMnO1xuXG4vKipcbiAqIEFsbCBjdXN0b20gY29kZSBpcyB3cmFwcGVkIGluIElJRkUgZnVuY3Rpb25cbiAqIHRvIHByZXZlbnQgYWZmZWN0IG91ciBjb2RlIHRvIGFub3RoZXIgcGFydHMgb2YgY29kZVxuICovXG47KGZ1bmN0aW9uICggJCApIHtcblxuXHQvKipcblx0ICogUExlYXNlIENvbGxlY3QgaGVyZSBhbGwgdmFyaWFibGVzIHdpdGggRE9NIGVsZW1lbnRzXG5cdCAqIFVzZSBjb25zdCBmb3IgYWxsIERPTSBlbGVtZW50cyBhbmQgdHlwZSBpdCBhcyBVUFBFUkNBU0UgdGV4dFxuXHQgKiBJdCB3aWxsIGhlbHAgdG8gZWFjaCBkZXZlbG9wZXIgdW5kZXJzdGFuZCB0aGF0IGl0J3MgYSBjb25zdCBub3QgYSB2YXJpYWJsZVxuXHQgKi9cblxuXHQvKiogQHR5cGUgSFRNTEVsZW1lbnQgKi9cblx0Y29uc3QgU0lURV9IRUFERVIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2l0ZS1oZWFkZXInKTtcblx0Y29uc3QgU0lURV9IRUFERVJfSlMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc2l0ZS1oZWFkZXInKTtcblx0Y29uc3QgU0VMRUNUX1dJVEhfUExBQ0VIT0xERVJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXNlbGVjdC13aXRoLXBsYWNlaG9sZGVyJyk7XG5cblx0Y29uc3QgY2hlY2tOZXdQZWxlY2FuTWVzc2FnZSA9ICgpID0+e1xuXHRcdGNvbnN0IFBFTEVDQU5fQ09OVEFJTkVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBlbGljYW4tcGV0ZScpO1xuXHRcdGlmKFBFTEVDQU5fQ09OVEFJTkVSKXtcblx0XHRcdGNvbnN0IFBFTEVDQU5fSURFTlRJRklFUiA9IGdldENvb2tpZSgncGVsaWNhbl9wZXRlX2lkZW50aWZpZXInKTtcblx0XHRcdGNvbnNvbGUubG9nKFBFTEVDQU5fSURFTlRJRklFUik7XG5cdFx0XHRpZighUEVMRUNBTl9DT05UQUlORVIgfHwgdmFyX2Zyb21fcGhwLnBlbGljYW5fcGV0ZV9pZGVudGlmaWVyICE9IFBFTEVDQU5fSURFTlRJRklFUil7XG5cdFx0XHRcdFBFTEVDQU5fQ09OVEFJTkVSLmNsYXNzTGlzdC5hZGQoJ25ldycpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjaGVja05ld1BlbGVjYW5NZXNzYWdlKCk7XG5cblx0bGV0ICR0ZW1wID0gJChcIjxpbnB1dCBjbGFzcz0nYWJzJz5cIik7XG5cdGxldCAkdXJsID0gJChsb2NhdGlvbikuYXR0cignaHJlZicpO1xuXG5cdCQoJyNjb3B5LWxpbmstYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0JChcImJvZHlcIikuYXBwZW5kKCR0ZW1wKTtcblx0XHQkdGVtcC52YWwoJHVybCkuc2VsZWN0KCk7XG5cdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xuXHRcdCR0ZW1wLnJlbW92ZSgpO1xuXHRcdCQoJy5jb3B5LXRleHQnKS5mYWRlSW4oKTtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdCQoJy5jb3B5LXRleHQnKS5mYWRlT3V0KCk7XG5cdFx0fSwgMjAwMCk7XG5cdH0pXG5cblx0LyoqXG5cdCAqIE9jY3VycyB3aGVuIGFsbCBIVE1MIGhhcyBiZWVuIGZ1bGx5IGxvYWRlZCBhbmQgcGFzc2VkIGJ5IHRoZSBwYXJzZXIsXG5cdCAqIHdpdGhvdXQgd2FpdGluZyBmb3IgdGhlIHN0eWxlc2hlZXRzLCBpbWFnZXMgYW5kIGZyYW1lcyB0byBmaW5pc2ggbG9hZGluZ1xuXHQgKi9cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRjb25zb2xlLmxvZyhcIkRPTSBmdWxseSBsb2FkZWQgYW5kIHBhcnNlZCAtIFJFQURZIGV2ZW50XCIpO1xuXG5cdFx0Ly8ga2ljayBvZmYgdGhlIHBvbHlmaWxsICggRG9uJ3QgZGVsZXRlIGl0IClcblx0XHRzbW9vdGhzY3JvbGwucG9seWZpbGwoKTtcblxuXHRcdC8vIEluaXQgQ2xvc2VzdCBwb2x5ZmlsbCBtZXRob2QgKCBEb24ndCBkZWxldGUgaXQgKVxuXHRcdGNsb3Nlc3RfcG9seWZpbGwoKTtcblxuXHRcdC8vIEluaXQgUG9wdXAgV2luZG93cyAoIHVzZSBpdCBpZiB5b3UgbmVlZCBQb3B1cCBmdW5jdGlvbmFsaXR5IClcblx0XHRjb25zdCBwb3B1cF9pbnN0YW5jZSA9IG5ldyBQb3B1cCgpO1xuXHRcdHBvcHVwX2luc3RhbmNlLmluaXQoKTtcblx0XHRjb25zdCBXRUxDT01FX1BPUFVQID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dlbGNvbWUtcG9wdXAnKTtcblx0XHRpZihXRUxDT01FX1BPUFVQKXtcblx0XHRcdGNvbnN0IFdFTENPTUVfUE9QVVBfQ09PS0lFX1RJTUUgPSBnZXRDb29raWUoJ3dlbGNvbWVfcG9wdXBfdGltZScpO1xuXHRcdFx0Y29uc3QgUE9QVVBfQ09PS0lFX1RJTUUgPSB2YXJfZnJvbV9waHAuaG93X29mdGVuX3RvX3Nob3dfcG9wdXA7XG5cdFx0XHRXRUxDT01FX1BPUFVQICYmIGNoZWNrTGlmZVRpbWUoV0VMQ09NRV9QT1BVUF9DT09LSUVfVElNRSwgUE9QVVBfQ09PS0lFX1RJTUUpO1xuXHRcdFx0Y29uc3QgV0VMQ09NRV9QT1BVUF9DT09LSUUgPSBnZXRDb29raWUoJ3dlbGNvbWVfcG9wdXAnKTtcblx0XHRcdCFXRUxDT01FX1BPUFVQX0NPT0tJRSAmJiBXRUxDT01FX1BPUFVQICYmIHBvcHVwX2luc3RhbmNlLm9wZW5PbmVQb3B1cCgnI3dlbGNvbWUtcG9wdXAnLCAzMDAwKTtcblx0XHR9XG5cblx0XHQvLyBJbml0IFRhYnMgTmF2aWdhdGlvblxuXHRcdHRhYnNOYXZpZ2F0aW9uKCAnLmpzLXRhYnMtbmF2LWJ0bicsICcuanMtdGFicy1uYXYtcGFuZWwnLCB0cnVlKTtcblxuXHRcdGlmICggdHlwZW9mIFdPVyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRuZXcgV09XKHthbmltYXRlQ2xhc3M6ICdhbmltYXRlX19hbmltYXRlZCd9KS5pbml0KCk7XG5cdFx0fVxuXHRcdGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoIFwiLmpzLXBhcnRuZXJzXCIsIHtcblx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0XHRsb29wOnRydWUsXG5cdFx0XHRicmVha3BvaW50czoge1xuXHRcdFx0XHQ1NzA6IHtcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAyLFxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogNDAsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdDc2ODoge1xuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiA0MCxcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQxMDMwOiB7XG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogNCxcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDQwLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHR9ICk7XG5cblxuXHRcdC8vaW5pdCBlbGVtZW50cyBwYXJhbGF4IHNjcm9sbFxuXHRcdGxldCByZWxsYXggPSBuZXcgUmVsbGF4KCcucmVsbGF4Jyx7XG5cdFx0XHRjZW50ZXI6IHRydWVcblx0XHR9KTtcblxuXHRcdGNvbnN0IG9ic2VydmVyID0gbG96YWQoKTsgLy8gbGF6eSBsb2FkcyBlbGVtZW50cyB3aXRoIGRlZmF1bHQgc2VsZWN0b3IgYXMgJy5sb3phZCdcblx0XHRvYnNlcnZlci5vYnNlcnZlKCk7XG5cblx0XHQvL0Nsb3NlIHBvcHVwIGFmdGVyIHNlbnQgZm9ybVxuXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3dwY2Y3bWFpbHNlbnQnLCBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHRcdCQoJy5qcy1wb3B1cC1jbG9zZScpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdFx0XHR9LDIwMDApO1xuXG5cdFx0fSwgZmFsc2UgKTtcblxuXHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnaW5wdXRbbmFtZT1cInNvcnRieVwiXScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCQodGhpcykucHJvcChcImNoZWNrZWRcIiwgZmFsc2UpO1xuXHRcdFx0fSk7XG5cdFx0XHQkKCcuanMtc2VsZWN0LXdpdGgtcGxhY2Vob2xkZXInKS5zZWxlY3QyKHtcblx0XHRcdFx0ZHJvcGRvd25QYXJlbnQ6ICQoJy5qcy1zZWxlY3Qtd3JhcHBlcicpLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogXCJIb3cgY2FuIHdlIGhlbHA/XCIsXG5cdFx0XHRcdGFsbG93Q2xlYXI6IHRydWUsXG5cdFx0XHRcdG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcblx0XHRcdH0pO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIEB0eXBlIHtqUXVlcnl9XG5cdFx0XHQgKi9cblx0XHRcdGNvbnN0ICRzdGF0ZVNlbGVjdFdyYXBwZXIgPSAkKCcuanMtc2VsZWN0LXN0YXRlLXdyYXBwZXInKTtcblx0XHRcdCRzdGF0ZVNlbGVjdFdyYXBwZXIuZWFjaCgoaSwgZWwpID0+IHtcblx0XHRcdFx0Y29uc3QgJGVsID0gJChlbCk7XG5cdFx0XHRcdGNvbnN0ICRzZWxlY3QgPSAkZWwuZmluZCgnLmpzLXNlbGVjdC1zdGF0ZScpO1xuXHRcdFx0XHRjb25zdCBpc011bHRpcGxlID0gISEkc2VsZWN0LmF0dHIoJ211bHRpcGxlJyk7XG5cdFx0XHRcdCRzZWxlY3Quc2VsZWN0Mih7XG5cdFx0XHRcdFx0Y2xvc2VPblNlbGVjdDogIWlzTXVsdGlwbGUsXG5cdFx0XHRcdFx0ZHJvcGRvd25QYXJlbnQ6ICRlbCxcblx0XHRcdFx0XHRkcm9wZG93bkNzc0NsYXNzOiBpc011bHRpcGxlID8gJ2NvbnRhaW5lci0tbXVsdGlwbGUnIDogJycsXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI6ICRzZWxlY3QuZmluZCgnb3B0aW9uJykuZmlyc3QoKS50ZXh0KCksXG5cdFx0XHRcdFx0YWxsb3dDbGVhcjogZmFsc2UsXG5cdFx0XHRcdFx0bWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxuXHRcdFx0XHR9KVxuXHRcdFx0fSlcblx0XHRcdC8vY2xlYXJpbmcgc3RhdGUgZmllbGRzIHdoZW4gdGhleSBhcmUgYXZhaWxhYmxlIGFmdGVyIHN1Ym1pdHRpbmcgdGhlIGZvcm0uXG5cdFx0XHQkKGRvY3VtZW50KS5vbignd3BjZjdtYWlsc2VudCcsICgpID0+IHtcblx0XHRcdFx0JHN0YXRlU2VsZWN0V3JhcHBlci5maW5kKCdzZWxlY3QnKS52YWwoJycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdFx0fSlcblxuXHRcdFx0LyogJCgnLmpzLXNlbGVjdC1zdGF0ZScpLnNlbGVjdDIoe1xuXHRcdFx0XHRjbG9zZU9uU2VsZWN0IDogZmFsc2UsXG5cdFx0XHRcdGRyb3Bkb3duUGFyZW50OiAkKCcuanMtc2VsZWN0LXN0YXRlLXdyYXBwZXInKSxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IFwiKlN0YXRlXCIsXG5cdFx0XHRcdGFsbG93Q2xlYXI6IGZhbHNlLFxuXHRcdFx0XHRtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXG5cdFx0XHR9KS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRsZXQgc3RhdGUgPSAkKCcuanMtc2VsZWN0LXN0YXRlIG9wdGlvbjpzZWxlY3RlZCcpLnZhbCgpO1xuXHRcdFx0XHRpZiAodHlwZW9mIHN0YXRlbGlzdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzdGF0ZV9saXN0ICYmIHN0YXRlX2xpc3Rbc3RhdGVdKSB7XG5cdFx0XHRcdFx0JCgnLnNlbGxpbmctaW5zdXJhbmNlLWZpZWxkJykudmFsKHN0YXRlX2xpc3Rbc3RhdGVdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7ICovXG5cdFx0XHQkKCcucmVzb3VyY2VzLWZvcm0gLmpzLXNlbGVjdC1jYXRlZ29yeScpLnNlbGVjdDIoe1xuXHRcdFx0XHRkcm9wZG93blBhcmVudDogJCgnLnJlc291cmNlcy1mb3JtIC5qcy1zZWxlY3QtY2F0ZWdvcnktd3JhcHBlcicpLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogXCJJIHdvdWxkIGxpa2UgdG8gcmVjZWl2ZVwiLFxuXHRcdFx0XHRhbGxvd0NsZWFyOiB0cnVlLFxuXHRcdFx0XHRtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXG5cdFx0XHR9KTtcblx0XHRcdFx0JCgnI2Jsb2NrLWZvcm0tc3RpY2t5IC5qcy1zZWxlY3QtY2F0ZWdvcnknKS5zZWxlY3QyKHtcblx0XHRcdFx0ZHJvcGRvd25QYXJlbnQ6ICQoJyNibG9jay1mb3JtLXN0aWNreSAuanMtc2VsZWN0LWNhdGVnb3J5LXdyYXBwZXInKSxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IFwiSSB3b3VsZCBsaWtlIHRvIHJlY2VpdmVcIixcblx0XHRcdFx0YWxsb3dDbGVhcjogdHJ1ZSxcblx0XHRcdFx0bWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvL3Njcm9sbCB1cFxuXHRcdGNvbnN0IHNjcm9sbFVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njcm9sbC10b3AnKTtcblx0XHRpZiAodHlwZW9mKHNjcm9sbFVwKSAhPSAndW5kZWZpbmVkJyAmJiBzY3JvbGxVcCAhPSBudWxsKXtcblx0XHRcdHNjcm9sbFVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0XHR3aW5kb3cuc2Nyb2xsVG8oe1xuXHRcdFx0XHRcdHRvcDogMCxcblx0XHRcdFx0XHRiZWhhdmlvcjogXCJzbW9vdGhcIlxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHQvLyAoU0VMRUNUX1dJVEhfUExBQ0VIT0xERVJzKVxuXHRcdC8vICYmIFsuLi5TRUxFQ1RfV0lUSF9QTEFDRUhPTERFUnNdLmZvckVhY2goIGl0ZW0gPT4ge1xuXHRcdC8vIFx0Y29uc3QgZW1wdHlPcHRpb24gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ29wdGlvblt2YWx1ZT1cIlwiXScpO1xuXHRcdC8vIFx0Y29uc29sZS5sb2coJ2VtcHR5T3B0aW9uJywgZW1wdHlPcHRpb24pO1xuXHRcdC8vIFx0ZW1wdHlPcHRpb24gJiYgZW1wdHlPcHRpb24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdC8vIH0pO1xuXG5cdFx0LyoqXG5cdFx0ICogQWRkIGdsb2JhbCBoYW5kbGVyIGZvciBjbGljayBldmVudFxuXHRcdCAqIFRoZSBtYWluIGlkZWEgLSB0byBpbXByb3ZlIHNpdGUgcGVyZm9ybWFuY2Vcblx0XHQgKiBXZSBhZGRlZCBvbmx5IDEgZXZlbnQgaGFuZGxlciB0byBcImNsaWNrXCIgZXZlbnRcblx0XHQgKiBhbmQgdGhlbiB1c2UgZGF0ZS1yb2xlIGF0dHJpYnV0ZSBvbiBlYWNoKCBuZWVkZWQgKSBlbGVtZW50c1xuXHRcdCAqIHRvIGRlZmluZSBvbiB3aGljaCBlbGVtZW50IGV2ZW50IHdhcyBleGVjdXRlZC4uXG5cdFx0ICovXG5cdFx0IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICd3cGNmN21haWxzZW50JywgZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0aWYgKCAnMjM2JyA9PSBldmVudC5kZXRhaWwuY29udGFjdEZvcm1JZCApIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luK1wiL3RoYW5rLXlvdS1mYXEvXCI7XG4gICAgXHR9ZWxzZSBpZignNTU5JyA9PSBldmVudC5kZXRhaWwuY29udGFjdEZvcm1JZCl7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbitcIi90aGFuay15b3UtcmVzb3VyY2VzL1wiO1xuXHRcdFx0fWVsc2UgaWYoJzY1NCcgPT0gZXZlbnQuZGV0YWlsLmNvbnRhY3RGb3JtSWQpe1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4rXCIvdGhhbmsteW91LXJlc291cmNlcy9cIjtcblx0XHRcdH1lbHNlIGlmKCcyNjMnID09IGV2ZW50LmRldGFpbC5jb250YWN0Rm9ybUlkKXtcblx0XHRcdFx0aWYoZXZlbnQuZGV0YWlsLmlucHV0c1s4XS52YWx1ZSA9PSAnQ29udGFjdCBVcy0gR2VuZXJhbCBJbnF1aXJ5Jyl7XG5cdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luK1wiL3RoYW5rLXlvdS1jb250YWN0LXVzL1wiO1xuXHRcdFx0XHR9ZWxzZSBpZihldmVudC5kZXRhaWwuaW5wdXRzWzhdLnZhbHVlID09ICdDb250YWN0IFVzLSBHZXQgTm90aWZpZWQnKXtcblx0XHRcdFx0XHRsZXQgZW5kcG9pbnRVcmwgPSAoZXZlbnQuZGV0YWlsLmlucHV0c1s4XS52YWx1ZSA9PSAzKSA/ICd0aGFuay15b3Utc3RhdGUtaG9tZScgOiAndGhhbmsteW91LXN0YXRlLXF1b3RlJztcblx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4rXCIvXCIrZW5kcG9pbnRVcmwrXCIvP3N0YXRlPVwiK2V2ZW50LmRldGFpbC5pbnB1dHNbNV0udmFsdWU7XG5cdFx0XHRcdH1lbHNlIGlmKGV2ZW50LmRldGFpbC5pbnB1dHNbOF0udmFsdWUgPT0gJ0NvbnRhY3QgVXMtIFBhcnRuZXJzaGlwcycpe1xuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbitcIi90aGFuay15b3UtcGFydG5lcnNoaXAvXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LCBmYWxzZSApO1xuXHRcdC8vc2hvdyBzdGF0ZSBuYW1lIGJ5IGhvdmVyIG9uIHN0YXRlIG1hcFxuXHRcdGNvbnN0IHN0YXRlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdmctaG92ZXInKTtcblx0XHRpZiAodHlwZW9mKHN0YXRlTGlzdCkgIT0gJ3VuZGVmaW5lZCcgJiYgc3RhdGVMaXN0ICE9IG51bGwpe1xuXHRcdFx0c3RhdGVMaXN0LmZvckVhY2goKGVsKSA9PlxuXHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQpID0+IHtcblx0XHRcdFx0bGV0IHN0YXRlTmFtZSA9IGVsLmRhdGFzZXQuaW5mbztcblx0XHRcdFx0Y29uc3Qgc3RhdGVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3VyaW5nLWJvYXRfX21hcC1zdGF0ZScpO1xuXHRcdFx0XHRzdGF0ZUVsZW0uaW5uZXJIVE1MID0gc3RhdGVOYW1lO1xuXHRcdFx0XHRzdGF0ZUVsZW0uc3R5bGUub3BhY2l0eSA9IFwiMC42XCI7XG5cdFx0XHRcdC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3VyaW5nLWJvYXRfX21hcC1zdGF0ZScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdFx0fSkpO1xuXHRcdFx0c3RhdGVMaXN0LmZvckVhY2goKGVsKSA9PlxuXHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIChldmVudCkgPT4ge1xuXHRcdFx0XHRjb25zdCBzdGF0ZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5zdXJpbmctYm9hdF9fbWFwLXN0YXRlJyk7XG5cdFx0XHRcdHN0YXRlRWxlbS5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XG5cdFx0XHRcdC8vc3RhdGVFbGVtLmlubmVySFRNTCA9ICcnO1xuXHRcdFx0fSkpO1xuXHRcdH1cblx0XHRjb25zdCBzaG93Q29udGFjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5zdXJpbmctYm9hdF9fbWFwLWJvdHRvbS1saW5rJyk7XG5cdFx0aWYoc2hvd0NvbnRhY3RGb3JtKXtcblx0XHRcdHNob3dDb250YWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0Y29uc3Qgc291cnNlU2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvdXJzZS1zZWxlY3QnKTtcblx0XHRcdFx0c291cnNlU2VsZWN0LnZhbHVlID0gJ0NvbnRhY3QgVXMtIEdldCBOb3RpZmllZCc7XG5cdFx0XHRcdHNvdXJzZVNlbGVjdC5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuRXZlbnQoJ2NoYW5nZScsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBldmVudCA9PiB7XG5cdFx0XHRjb25zdCBST0xFID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQucm9sZTtcblx0XHRcdGNvbnN0IFRBUkdFVCA9IGV2ZW50LnRhcmdldDtcblx0XHRcdGlmICggIVJPTEUgKSByZXR1cm47XG5cblx0XHRcdHN3aXRjaCAoIFJPTEUgKSB7XG5cblx0XHRcdFx0Ly8gU2Nyb2xsIHBhZ2UgdG8gdG9wXG5cdFx0XHRcdGNhc2UgJ3BsYXktdmlkZW8nOlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGV0IHZpZGVvSWQgPSBldmVudC50YXJnZXQuZGF0YXNldC5pZFxuXHRcdFx0XHRcdGxldCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZpZGVvSWQpO1xuXHRcdFx0XHRcdGlmICh2aWRlby5wYXVzZWQpIHtcblx0XHRcdFx0XHRcdHZpZGVvLnBsYXkoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSAge1xuXHRcdFx0XHRcdFx0dmlkZW8ucGF1c2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnb3Blbi1wYWxhY2FuLW1lc3NhZ2UnOlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgUEVMRUNBTl9DT05UQUlORVIgPSBUQVJHRVQuY2xvc2VzdCgnLnBlbGljYW4tcGV0ZScpO1xuXHRcdFx0XHRcdGlmKFBFTEVDQU5fQ09OVEFJTkVSLmNsYXNzTGlzdC5jb250YWlucygnbmV3Jykpe1xuXHRcdFx0XHRcdFx0c2V0Q29va2llKCdwZWxpY2FuX3BldGVfaWRlbnRpZmllcicsIHZhcl9mcm9tX3BocC5wZWxpY2FuX3BldGVfaWRlbnRpZmllciwgMzY1KTtcblx0XHRcdFx0XHRcdFBFTEVDQU5fQ09OVEFJTkVSLmNsYXNzTGlzdC5yZW1vdmUoJ25ldycpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKCFQRUxFQ0FOX0NPTlRBSU5FUi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKXtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFBFTEVDQU5fQ09OVEFJTkVSLmNsYXNzTGlzdCk7XG5cdFx0XHRcdFx0XHRQRUxFQ0FOX0NPTlRBSU5FUi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFBFTEVDQU5fQ09OVEFJTkVSLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdjbG9zZS1wYWxhY2FuLW1lc3NhZ2UnOlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgUEVMRUNBTl9DT05UQUlORVIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGVsaWNhbi1wZXRlJyk7XG5cdFx0XHRcdFx0UEVMRUNBTl9DT05UQUlORVIgJiYgUEVMRUNBTl9DT05UQUlORVIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnZmFxJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKmlmKCFldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSl7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuXHRcdFx0XHRcdFx0XHRsZXQgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmFxLXNlY3Rpb25fX3RpdGxlLmFjdGl2ZScpO1xuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNlY3Rpb25zLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRcdFx0XHRcdHNlY3Rpb25zW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGxldCBxdWVzdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmFxLXNlY3Rpb25fX3F1ZXN0aW9ucy5hY3RpdmUnKTtcblx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdFx0XHRcdC8vcXVlc3Rpb25zW2ldLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XG5cdFx0XHRcdFx0XHRcdFx0cXVlc3Rpb25zW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuXHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuXHRcdFx0XHRcdFx0fSovXG5cdFx0XHRcdFx0XHRldmVudC50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcblx0XHRcdFx0XHRcdGxldCBmYXEgPSBldmVudC50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xuXHRcdFx0XHRcdFx0ZmFxLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XG5cdFx0XHRcdFx0XHRpZiAoZmFxLnN0eWxlLm1heEhlaWdodCkge1xuXHRcdFx0XHRcdFx0XHRmYXEuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGZhcS5zdHlsZS5tYXhIZWlnaHQgPSBmYXEuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAnZWxlbWVudDInOlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gc29tZSByZXF1aXJlZCBhY3Rpb25cblx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHR9KTtcblx0Y29uc3QgZ2V0T2Zmc2V0VG9wID0gZWxlbWVudCA9PiB7XG5cdFx0bGV0IG9mZnNldFRvcCA9IDA7XG5cdFx0d2hpbGUoZWxlbWVudCkge1xuXHRcdFx0b2Zmc2V0VG9wICs9IGVsZW1lbnQub2Zmc2V0VG9wO1xuXHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuXHRcdH1cblx0XHRyZXR1cm4gb2Zmc2V0VG9wO1xuXHR9XG5cdGxldCBzdGlja3lfZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmxvY2stZm9ybS1zdGlja3lcIik7XG5cdGxldCBvcmlnT2Zmc2V0ID0gZ2V0T2Zmc2V0VG9wKHN0aWNreV9mb3JtKTtcblx0ZnVuY3Rpb24gc3RpY2t5U3Vic2NyaWJlRm9ybSgpIHtcblx0XHRsZXQgYm90dG9tX3NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvdHRvbS1zZWN0aW9uXCIpO1xuXHRcdGxldCBvcmlnT2Zmc2V0Qm90dG9tID0gZ2V0T2Zmc2V0VG9wKGJvdHRvbV9zZWN0aW9uKTtcblx0XHRsZXQgaGVhZGVySGVpZ2h0ID0gU0lURV9IRUFERVIub2Zmc2V0SGVpZ2h0O1xuXHRcdGxldCBibG9ja0hlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmxvY2stZm9ybS1zdGlja3lcIikub2Zmc2V0SGVpZ2h0O1xuXHRcdGlmICh3aW5kb3cuc2NyZWVuLndpZHRoID4gMTAzMCkge1xuXHRcdFx0aWYod2luZG93LnBhZ2VZT2Zmc2V0ICsgMTEwID49IG9yaWdPZmZzZXQgJiYgKCh3aW5kb3cucGFnZVlPZmZzZXQgKyBibG9ja0hlaWdodCkgKyAxMTAgKyAxNDUpIDwgb3JpZ09mZnNldEJvdHRvbSl7XG5cdFx0XHRcdHN0aWNreV9mb3JtLmNsYXNzTGlzdC5hZGQoXCJmaXhlZFwiKTtcblx0XHRcdFx0c3RpY2t5X2Zvcm0uY2xhc3NMaXN0LnJlbW92ZShcImZpeGVkLWJvdHRvbVwiKTtcblx0XHRcdH1lbHNlIGlmKCgod2luZG93LnBhZ2VZT2Zmc2V0ICsgYmxvY2tIZWlnaHQpICsgMTEwICsgMTQ1KSA+PSBvcmlnT2Zmc2V0Qm90dG9tKXtcblx0XHRcdFx0c3RpY2t5X2Zvcm0uY2xhc3NMaXN0LmFkZChcImZpeGVkLWJvdHRvbVwiKTtcblx0XHRcdFx0c3RpY2t5X2Zvcm0uY2xhc3NMaXN0LnJlbW92ZShcImZpeGVkXCIpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHN0aWNreV9mb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJmaXhlZFwiKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHN0aWNreV9mb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJmaXhlZC1ib3R0b21cIik7XG5cdFx0XHRzdGlja3lfZm9ybS5jbGFzc0xpc3QucmVtb3ZlKFwiZml4ZWRcIik7XG5cdFx0fVxuXHR9XG5cdGlmKHR5cGVvZihzdGlja3lfZm9ybSkgIT0gJ3VuZGVmaW5lZCcgJiYgc3RpY2t5X2Zvcm0gIT0gbnVsbCl7XG5cdFx0c3RpY2t5U3Vic2NyaWJlRm9ybSgpO1xuXHR9XG5cdC8vc2hvdyBzY3JvbGwgVXAgYnV0dG9uIHdoZW4gc2Nyb2xsIG1vcmUgdGhhbiA1MDBcblx0Y29uc3Qgc2hvd1Njcm9sbFVwID0gKCkgPT4ge1xuXHRcdGNvbnN0IHNjcm9sbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Nyb2xsLXRvcFwiKTtcblx0XHRsZXQgb3BlcmF0aW9uVHlwZSA9ICggd2luZG93LnBhZ2VZT2Zmc2V0ID4gNTAwICkgPyAnYWRkJyA6ICdyZW1vdmUnO1xuXHRcdChzY3JvbGxCdG4pICYmIHNjcm9sbEJ0bi5jbGFzc0xpc3Rbb3BlcmF0aW9uVHlwZV0oJ3Nob3cnKTtcblx0XHQoc2Nyb2xsQnRuKSAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdFtvcGVyYXRpb25UeXBlXSgnaGFzLXNjcm9sbC11cCcpO1xuXHR9XG5cdHNob3dTY3JvbGxVcCgpO1xuXHQvL3Nob3cgc2Nyb2xsIGhpbnRcblx0Y29uc3Qgc2hvd0hpZGVTY3JvbGxIaW50ID0gKCkgPT57XG5cdFx0Y29uc3QgU0NST0xMX0hJTlQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLWhpbnQnKTtcblx0XHRpZihTQ1JPTExfSElOVCl7XG5cdFx0XHRsZXQgb3BlcmF0aW9uVHlwZSA9ICggd2luZG93LnBhZ2VZT2Zmc2V0ID4gMCApID8gJ2FkZCcgOiAncmVtb3ZlJztcblx0XHRcdFNDUk9MTF9ISU5ULmNsYXNzTGlzdFtvcGVyYXRpb25UeXBlXShcImhpZGVcIik7XG5cdFx0fVxuXHR9XG5cdC8qKlxuXHQgKiBDYXRjaCBTY3JvbGwgZXZlbnRcblx0ICovXG5cdHNob3dIaWRlU2Nyb2xsSGludCgpO1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZGVib3VuY2UoIChldmVudCkgPT4ge1xuXHRcdC8vc2hvdyBoaWRlIHNjcm9sbCBoaW50XG5cdFx0c2hvd0hpZGVTY3JvbGxIaW50KCk7XG5cdFx0bGV0IHNjcm9sbEFtb3VudCAgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcblx0XHRsZXQgb3BlcmF0aW9uVHlwZSA9ICggc2Nyb2xsQW1vdW50PjAgKSA/ICdhZGQnIDogJ3JlbW92ZSc7XG5cblx0XHQvLyBBZGQvcmVtb3ZlIHNpdGUgaGVhZGVyIGFkZGl0aW9uYWwgXCJzdGlja3lcIiBjbGFzc1xuXHRcdChTSVRFX0hFQURFUl9KUykgJiYgU0lURV9IRUFERVJfSlMuY2xhc3NMaXN0W29wZXJhdGlvblR5cGVdKCdzaXRlLWhlYWRlcl9fc3RpY2t5Jyk7XG5cdFx0Ly9zaG93IGdldCBhIHF1b3RlIG9uIGhvbWVwYWdlIHdoZW4gY3RhIGZyb20gYmFubmVyIGlzIG5vdCBpbiBwb3J0dmlld1xuXHRcdGxldCBjdGFfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdGEtYnRuXCIpO1xuXHRcdGlmKHR5cGVvZihjdGFfYnRuKSAhPSAndW5kZWZpbmVkJyAmJiBjdGFfYnRuICE9IG51bGwpe1xuXHRcdFx0bGV0IGhlYWRlckhlaWdodCA9IFNJVEVfSEVBREVSLm9mZnNldEhlaWdodDtcblx0XHRcdGxldCBnZXRfcXVvdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2l0ZS1oZWFkZXJfX2J0bicpO1xuXHRcdFx0bGV0IHNob3cgPSBpc0luVmlld3BvcnQoY3RhX2J0biwgMCAtIGhlYWRlckhlaWdodCk7XG5cdFx0XHRpZiAoc2hvdyA9PSBmYWxzZSkge1xuXHRcdFx0XHRnZXRfcXVvdGUuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRnZXRfcXVvdGUuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGxldCBjcnVpc2luZ1NsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcnVpc2luZy1zZWN0aW9uX19zY3JvbGwnKTtcblx0XHRpZih0eXBlb2YoY3J1aXNpbmdTbGlkZXIpICE9ICd1bmRlZmluZWQnICYmIGNydWlzaW5nU2xpZGVyICE9IG51bGwpe1xuXHRcdFx0bGV0IGlzQ3J1aXNpbmcgPSBpc0luVmlld3BvcnQoY3J1aXNpbmdTbGlkZXIsIDApO1xuXHRcdFx0aWYoIWlzQ3J1aXNpbmcpe1xuXHRcdFx0XHRjcnVpc2luZ1NsaWRlclJlc2V0KCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0JCgnI2NydWlzaW5nLXNlY3Rpb25fX3NsaWRlcicpLnNsaWNrKCdzbGlja1NldE9wdGlvbicsICdhdXRvcGxheScsIHRydWUpO1xuXHRcdFx0XHQkKCcjY3J1aXNpbmctc2VjdGlvbl9fc2xpZGVyJykuc2xpY2soXCJwbGF5XCIpO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHRcdGxldCBzdGlja3lfZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmxvY2stZm9ybS1zdGlja3lcIik7XG5cdFx0aWYodHlwZW9mKHN0aWNreV9mb3JtKSAhPSAndW5kZWZpbmVkJyAmJiBzdGlja3lfZm9ybSAhPSBudWxsKXtcblx0XHRcdHN0aWNreVN1YnNjcmliZUZvcm0oKTtcblx0XHR9XG5cdFx0c2hvd1Njcm9sbFVwKCk7XG5cdH0sIDApKTtcblxuXHRjb25zdCByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoZW50cmllcykgPT4ge1xuXHRcdC8qKiBAdHlwZSBIVE1MRWxlbWVudCAqL1xuXHRcdGNvbnN0IHByaW1hcnlXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW1hcnktd3JhcHBlcicpO1xuXHRcdHByaW1hcnlXcmFwcGVyLnN0eWxlLm1hcmdpbkJsb2NrU3RhcnQgPSBgJHtTSVRFX0hFQURFUi5vZmZzZXRIZWlnaHR9cHhgO1xuXHR9KTtcblx0cmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShTSVRFX0hFQURFUik7XG5cblx0Ly8gVXNlIGl0IHdoZW4geW91IG5lZWQgdG8ga25vdyB0aGF0IGV2ZXJ5dGhpbmcgaXMgbG9hZGVkIChodG1sLCBzdHlsZXMsIGltYWdlcylcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZlbnQpID0+IHtcblx0XHRjb25zb2xlLmxvZygncGFnZSBpcyBmdWxseSBsb2FkZWQnKTtcblx0XHRib2F0QW5pbWF0ZSgpO1xuXHRcdHNpZGVJbWFnZUFuaW1hdGlvbigpO1xuXHRcdC8qKlxuXHRcdCAqIFNpbXBsZSBoYWNrIGZvciBzb21lIGNhc2VzXG5cdFx0ICovXG5cdFx0c2V0VGltZW91dCggKCkgPT4ge1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCAnbG9hZGVkJyApO1xuXHRcdH0sIDUwMCApO1xuXG5cblx0XHRsZXQgcXVlc3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZhcS1zZWN0aW9uX19xdWVzdGlvbnMuYWN0aXZlJyk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspe1xuXHRcdFx0cXVlc3Rpb25zW2ldLnN0eWxlLm1heEhlaWdodCA9IHF1ZXN0aW9uc1tpXS5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XG5cdFx0fVxuXG5cdH0pO1xuXHQvL3Nob3cgbW9iaWxlIG1lbnVcblx0Y29uc3QgbWVudUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2JpbGUtbWVudS1idG4nKTtcblx0bWVudUJ0biAmJiBtZW51QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudS1vcGVuJyk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpdGUtaGVhZGVyJykuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudS1vcGVuZWQnKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9iaWxlLW1lbnUnKS5jbGFzc0xpc3QudG9nZ2xlKCdzaG93Jyk7XG5cdH0pO1xuXHQvL2N1dHRpbmcgZWRnZSBzbGlkZXJcblx0aWYoJCgnLmN1dHRpbmctZWRnZS10ZWNobm9sb2d5X19zbGlkZXInKS5sZW5ndGggPiAwKXtcblx0XHQkKCcuY3V0dGluZy1lZGdlLXRlY2hub2xvZ3lfX3NsaWRlcicpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdCQodGhpcykuc2xpY2soe1xuXHRcdFx0XHRkb3RzOiB0cnVlLFxuXHRcdFx0XHRhcnJvd3M6IGZhbHNlLFxuXHRcdFx0XHRzcGVlZDogNTAwLFxuXHRcdFx0XHRmYWRlOiB0cnVlLFxuXHRcdFx0XHRjc3NFYXNlOiAnbGluZWFyJyxcblx0XHRcdFx0c2xpZGVzVG9TaG93OiAxLFxuXHRcdFx0XHRpbmZpbml0ZTogdHJ1ZSxcblx0XHRcdFx0YXV0b3BsYXk6IHRydWUsXG4gIFx0XHRcdGF1dG9wbGF5U3BlZWQ6IDEwMDAwLFxuXHRcdFx0fSkub24oJ2JlZm9yZUNoYW5nZScsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZSwgbmV4dFNsaWRlKSB7XG5cdFx0XHRcdGxldCBpZCA9ICQodGhpcykuYXR0cignZGF0YS1pZCcpO1xuXHRcdFx0XHQkKCcuY3V0dGluZy1lZGdlLXRlY2hub2xvZ3lfX3Bob25lLWJ0bi1jb250YWluZXItJytpZCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQkKCcuY3V0dGluZy1lZGdlLXRlY2hub2xvZ3lfX3Bob25lLWJ0bi0nK2lkKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdCQoJy5jdXR0aW5nLWVkZ2UtdGVjaG5vbG9neV9fcGhvbmUtaW1hZ2UtJytpZCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQkKCcuY3V0dGluZy1lZGdlLXRlY2hub2xvZ3lfX3Bob25lLWltYWdlLScraWQrJy0nK25leHRTbGlkZSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQkKCcjY3V0dGluZy1lZGdlLScraWQrJy0nK25leHRTbGlkZSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQkKCcjY3V0dGluZy1lZGdlLScraWQrJy0nK25leHRTbGlkZSkuZmluZCgnLmN1dHRpbmctZWRnZS10ZWNobm9sb2d5X19waG9uZS1idG4nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXHQvL2NoYW5nZSBjdXR0aW5nLWVkZ2Utc2xpZGVyIHNsaWRlIGJ5IGNsaWNraW5nIG9uIGljb25zXG5cdCQoJy5jdXR0aW5nLWVkZ2UtdGVjaG5vbG9neV9fcGhvbmUtYnRuJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0JCh0aGlzKS5jbGljayhmdW5jdGlvbigpe1xuXHRcdFx0aWYoISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcblx0XHRcdFx0bGV0IGlkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XG5cdFx0XHRcdGxldCBzZXRTbGlkZSA9ICQodGhpcykuYXR0cignZGF0YS1zbGlkZScpO1xuXHRcdFx0XHQvLyAkKCcuY3V0dGluZy1lZGdlLXRlY2hub2xvZ3lfX3Bob25lLWJ0bi1jb250YWluZXItJytpZCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQvLyAkKCcuY3V0dGluZy1lZGdlLXRlY2hub2xvZ3lfX3Bob25lLWJ0bi0nK2lkKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdC8vICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQvLyAkKHRoaXMpLmNsb3Nlc3QoJy5jdXR0aW5nLWVkZ2UtdGVjaG5vbG9neV9fcGhvbmUtYnRuLWNvbnRhaW5lcicpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0JCgnI2N1dHRpbmctZWRnZS1zbGlkZXItJytpZCkuc2xpY2soJ3NsaWNrR29UbycsIHNldFNsaWRlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cdC8vdGVzdGltb25pYWxzIHNsaWRlclxuXHRpZigkKCcudGVzdGltb25pYWxzLWJsb2NrX19zbGlkZXInKS5sZW5ndGggPiAwKSB7XG5cdFx0JCgnLnRlc3RpbW9uaWFscy1ibG9ja19fc2xpZGVyJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0JCh0aGlzKS5zbGljayh7XG5cdFx0XHRcdGRvdHM6IHRydWUsXG5cdFx0XHRcdGFycm93czogZmFsc2UsXG5cdFx0XHRcdHNwZWVkOiA1MDAsXG5cdFx0XHRcdGZhZGU6IHRydWUsXG5cdFx0XHRcdGNzc0Vhc2U6ICdsaW5lYXInLFxuXHRcdFx0XHRzbGlkZXNUb1Nob3c6IDEsXG5cdFx0XHRcdGluZmluaXRlOiB0cnVlLFxuXHRcdFx0XHRhdXRvcGxheTogdHJ1ZSxcbiAgXHRcdFx0ICAgIGF1dG9wbGF5U3BlZWQ6IDMwMDAsXG5cdFx0XHRcdHByZXZBcnJvdzonPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1wcmV2XCI+PHN2ZyB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTVcIiB2aWV3Qm94PVwiMCAwIDE1IDE1XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0xMi4wNDIyIDcuNDk5OTdMMTUgLTkuMzU3ODdlLTA2TDguOTQzN2UtMDggNy40OTk5N0wxNSAxNUwxMi4wNDIyIDcuNDk5OTdaTTEuNDM5NDQgNy40OTk5N0wxMS40MDI1IDcuNDk5OTdDMTEuNDAyNiA3LjU4MDkgMTEuNDE3OCA3LjY2MTExIDExLjQ0NzMgNy43MzYzOEwxMy43OTMgMTMuNjc0TDEuNDM5NDQgNy40OTk5N1pcIiBmaWxsPVwid2hpdGVcIi8+PC9zdmc+PC9idXR0b24+JyxcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6JzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stbmV4dFwiPjxzdmcgd2lkdGg9XCIxNVwiIGhlaWdodD1cIjE1XCIgdmlld0JveD1cIjAgMCAxNSAxNVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMi45NTc3NyA3LjUwMDAzTC04LjQwNDJlLTA2IDE1TDE1IDcuNTAwMDNMLTguNTgzMDdlLTA2IDEuNzg4NzNlLTA3TDIuOTU3NzcgNy41MDAwM1pNMTMuNTYwNiA3LjUwMDAzTDMuNTk3NTIgNy41MDAwM0MzLjU5NzQ1IDcuNDE5MSAzLjU4MjI1IDcuMzM4ODkgMy41NTI3MyA3LjI2MzYyTDEuMjA2OTggMS4zMjU5N0wxMy41NjA2IDcuNTAwMDNaXCIgZmlsbD1cIndoaXRlXCIvPjwvc3ZnPjwvYnV0dG9uPicsXG5cdFx0XHRcdHJlc3BvbnNpdmU6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRicmVha3BvaW50OiA4NTAsXG5cdFx0XHRcdFx0XHRzZXR0aW5nczoge1xuXHRcdFx0XHRcdFx0XHRhcnJvd3M6IHRydWVcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXHQvL2luc3VyaW5nIGJvYXQgc2xpZGVyXG5cdGlmKCQoJy5qcy1ib2F0LXNsaWRlci1sZWZ0JykubGVuZ3RoID4gMCkge1xuXHRcdCQoJy5qcy1ib2F0LXNsaWRlci1sZWZ0Jykuc2xpY2soe1xuXHRcdFx0c2xpZGVzVG9TaG93OiAxLFxuXHRcdFx0c2xpZGVzVG9TY3JvbGw6IDEsXG5cdFx0XHRpbml0aWFsU2xpZGU6IDIsXG5cdFx0XHRhcnJvd3M6IHRydWUsXG5cdFx0XHRkb3RzOiBmYWxzZSxcblx0XHRcdGluZmluaXRlOiB0cnVlLFxuXHRcdFx0YXV0b3BsYXk6IHRydWUsXG5cdFx0XHRhdXRvcGxheVNwZWVkOiA1MDAwLFxuXHRcdFx0YXNOYXZGb3I6ICcuanMtYm9hdC10aHVtYm5haWwtc2xpZGVyLWxlZnQnLFxuXHRcdFx0cHJldkFycm93Oic8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLXByZXZcIj48c3ZnIHdpZHRoPVwiMzBcIiBoZWlnaHQ9XCIzOVwiIHZpZXdCb3g9XCIwIDAgMzAgMzlcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48ZyBjbGlwLXBhdGg9XCJ1cmwoI2NsaXAwXzE4MTQ0XzI3MTg1NSlcIj48cGF0aCBkPVwiTTIzLjk1NDMgMTkuNjk2MkwyOS41OTcyIDM4LjkyMzVMMC45Nzk3MzcgMTkuNjk2MkwyOS41OTcyIDAuNDY4NzQ4TDIzLjk1NDMgMTkuNjk2MlpNMy43MjU5NCAxOS42OTYyTDIyLjczMzcgMTkuNjk2MkMyMi43MzM5IDE5LjQ4ODcgMjIuNzYyOSAxOS4yODMxIDIyLjgxOTIgMTkuMDkwMUwyNy4yOTQ1IDMuODY4MDZMMy43MjU5NCAxOS42OTYyWlwiIGZpbGw9XCJ3aGl0ZVwiLz48L2c+XHRcdFx0PGRlZnM+PGNsaXBQYXRoIGlkPVwiY2xpcDBfMTgxNDRfMjcxODU1XCI+PHJlY3Qgd2lkdGg9XCIzOC40NTQ3XCIgaGVpZ2h0PVwiMjguNjE3NFwiIGZpbGw9XCJ3aGl0ZVwiIHRyYW5zZm9ybT1cIm1hdHJpeCgzLjIyNjgyZS0wOCAxIDEgLTUuOTIxMjZlLTA4IDAuOTc5NzM2IDAuNDY4NzUpXCIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPjwvYnV0dG9uPicsXG4gICAgICAgICAgICBuZXh0QXJyb3c6JzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stbmV4dFwiPjxzdmcgd2lkdGg9XCIyOVwiIGhlaWdodD1cIjM5XCIgdmlld0JveD1cIjAgMCAyOSAzOVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxnIGNsaXAtcGF0aD1cInVybCgjY2xpcDBfMTgxNDRfMjcxODUyKVwiPjxwYXRoIGQ9XCJNNS43NjAzNCAxOS42OTYyTDAuMTE3NDAyIDM4LjkyMzVMMjguNzM0OSAxOS42OTYyTDAuMTE3NDA0IDAuNDY4NzQ5TDUuNzYwMzQgMTkuNjk2MlpNMjUuOTg4NyAxOS42OTYyTDYuOTgwODcgMTkuNjk2MkM2Ljk4MDczIDE5LjQ4ODcgNi45NTE3NCAxOS4yODMxIDYuODk1NDIgMTkuMDkwMUwyLjQyMDEzIDMuODY4MDZMMjUuOTg4NyAxOS42OTYyWlwiIGZpbGw9XCIjRjZGMkZEXCIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9XCJjbGlwMF8xODE0NF8yNzE4NTJcIj48cmVjdCB3aWR0aD1cIjM4LjQ1NDdcIiBoZWlnaHQ9XCIyOC42MTc0XCIgZmlsbD1cIndoaXRlXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDI4LjczNDkgMC40Njg3NSkgcm90YXRlKDkwKVwiLz48L2NsaXBQYXRoPlx0PC9kZWZzPjwvc3ZnPjwvYnV0dG9uPicsXG4gICAgICAgIH0pLm9uKCdiZWZvcmVDaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQsIHNsaWNrLCBjdXJyZW50U2xpZGUsIG5leHRTbGlkZSkge1xuXG4gICAgICAgICAgICBsZXQgaWQgPSBzbGljay4kc2xpZGVyLmF0dHIoJ2RhdGEtaWQnKTtcblxuICAgICAgICAgICAgJCgnLmpzLXNsaWRlLXRpdGxlLWxlZnQuYWN0aXZlJykuZmFkZU91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoJyN0aXRsZS0nK25leHRTbGlkZStpZCkuZmFkZUluKCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAgICAgfSk7XG5cblx0XHQkKCcuanMtYm9hdC10aHVtYm5haWwtc2xpZGVyLWxlZnQnKS5zbGljayh7XG5cdFx0XHRzbGlkZXNUb1Nob3c6IDUsXG5cdFx0XHRzbGlkZXNUb1Njcm9sbDogNSxcblx0XHRcdGluaXRpYWxTbGlkZToyLFxuXHRcdFx0YXNOYXZGb3I6ICcuanMtYm9hdC1zbGlkZXItbGVmdCcsXG5cdFx0XHRkb3RzOiBmYWxzZSxcblx0XHRcdGFycm93czogZmFsc2UsXG5cdFx0XHRpbmZpbml0ZTogdHJ1ZSxcblx0XHRcdGNlbnRlck1vZGU6IHRydWUsXG5cdFx0XHRmb2N1c09uU2VsZWN0OiB0cnVlLFxuXHRcdH0pO1xuXHR9XG5cbiAgICBpZigkKCcuanMtYm9hdC1zbGlkZXItcmlnaHQnKS5sZW5ndGggPiAwKXtcbiAgICAgICAgJCgnLmpzLWJvYXQtc2xpZGVyLXJpZ2h0Jykuc2xpY2soe1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBpbml0aWFsU2xpZGU6MixcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGRvdHM6ZmFsc2UsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJvYXQtdGh1bWJuYWlsLXNsaWRlci1yaWdodCcsXG4gICAgICAgICAgICBwcmV2QXJyb3c6JzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldlwiPjxzdmcgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjM5XCIgdmlld0JveD1cIjAgMCAzMCAzOVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxnIGNsaXAtcGF0aD1cInVybCgjY2xpcDBfMTgxNDRfMjcxODU1KVwiPjxwYXRoIGQ9XCJNMjMuOTU0MyAxOS42OTYyTDI5LjU5NzIgMzguOTIzNUwwLjk3OTczNyAxOS42OTYyTDI5LjU5NzIgMC40Njg3NDhMMjMuOTU0MyAxOS42OTYyWk0zLjcyNTk0IDE5LjY5NjJMMjIuNzMzNyAxOS42OTYyQzIyLjczMzkgMTkuNDg4NyAyMi43NjI5IDE5LjI4MzEgMjIuODE5MiAxOS4wOTAxTDI3LjI5NDUgMy44NjgwNkwzLjcyNTk0IDE5LjY5NjJaXCIgZmlsbD1cIndoaXRlXCIvPjwvZz5cdFx0XHQ8ZGVmcz48Y2xpcFBhdGggaWQ9XCJjbGlwMF8xODE0NF8yNzE4NTVcIj48cmVjdCB3aWR0aD1cIjM4LjQ1NDdcIiBoZWlnaHQ9XCIyOC42MTc0XCIgZmlsbD1cIndoaXRlXCIgdHJhbnNmb3JtPVwibWF0cml4KDMuMjI2ODJlLTA4IDEgMSAtNS45MjEyNmUtMDggMC45Nzk3MzYgMC40Njg3NSlcIi8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+PC9idXR0b24+JyxcbiAgICAgICAgICAgIG5leHRBcnJvdzonPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1uZXh0XCI+PHN2ZyB3aWR0aD1cIjI5XCIgaGVpZ2h0PVwiMzlcIiB2aWV3Qm94PVwiMCAwIDI5IDM5XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PGcgY2xpcC1wYXRoPVwidXJsKCNjbGlwMF8xODE0NF8yNzE4NTIpXCI+PHBhdGggZD1cIk01Ljc2MDM0IDE5LjY5NjJMMC4xMTc0MDIgMzguOTIzNUwyOC43MzQ5IDE5LjY5NjJMMC4xMTc0MDQgMC40Njg3NDlMNS43NjAzNCAxOS42OTYyWk0yNS45ODg3IDE5LjY5NjJMNi45ODA4NyAxOS42OTYyQzYuOTgwNzMgMTkuNDg4NyA2Ljk1MTc0IDE5LjI4MzEgNi44OTU0MiAxOS4wOTAxTDIuNDIwMTMgMy44NjgwNkwyNS45ODg3IDE5LjY5NjJaXCIgZmlsbD1cIiNGNkYyRkRcIi8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD1cImNsaXAwXzE4MTQ0XzI3MTg1MlwiPjxyZWN0IHdpZHRoPVwiMzguNDU0N1wiIGhlaWdodD1cIjI4LjYxNzRcIiBmaWxsPVwid2hpdGVcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMjguNzM0OSAwLjQ2ODc1KSByb3RhdGUoOTApXCIvPjwvY2xpcFBhdGg+XHQ8L2RlZnM+PC9zdmc+PC9idXR0b24+JyxcbiAgICAgICAgfSkub24oJ2JlZm9yZUNoYW5nZScsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZSwgbmV4dFNsaWRlKSB7XG5cbiAgICAgICAgICAgIGxldCBpZCA9IHNsaWNrLiRzbGlkZXIuYXR0cignZGF0YS1pZCcpO1xuXG4gICAgICAgICAgICAkKCcuanMtc2xpZGUtdGl0bGUtcmlnaHQuYWN0aXZlJykuZmFkZU91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoJyN0aXRsZS0nK25leHRTbGlkZStpZCkuZmFkZUluKCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAkKCcuanMtc2xpZGUtdGV4dC1yaWdodC5hY3RpdmUnKS5mYWRlT3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCgnI3RleHQtJytuZXh0U2xpZGUraWQpLmZhZGVJbigpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0pLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLmpzLWJvYXQtdGh1bWJuYWlsLXNsaWRlci1yaWdodCcpLnNsaWNrKHtcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNixcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA1LFxuICAgICAgICAgICAgaW5pdGlhbFNsaWRlOjIsXG4gICAgICAgICAgICBhc05hdkZvcjogJy5qcy1ib2F0LXNsaWRlci1yaWdodCcsXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnaW5pdCcpO1xuXG5cdC8vdGVjaG5vbG9neSBzbGlkZXJcblx0aWYoJCgnLnRlY2hub2xvZ3ktc2xpZGVyLXNlY3Rpb25fX3NsaWRlcicpLmxlbmd0aCA+IDApe1xuXHRcdCQoJy50ZWNobm9sb2d5LXNsaWRlci1zZWN0aW9uX19zbGlkZXInKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHQkKHRoaXMpLnNsaWNrKHtcblx0XHRcdFx0ZG90czogdHJ1ZSxcblx0XHRcdFx0YXJyb3dzOiB0cnVlLFxuXHRcdFx0XHRzcGVlZDogNTAwLFxuXHRcdFx0XHRzbGlkZXNUb1Nob3c6IDEsXG5cdFx0XHRcdGluZmluaXRlOiB0cnVlLFxuXHRcdFx0XHRhdXRvcGxheTogdHJ1ZSxcbiAgXHRcdFx0ICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG5cdFx0XHRcdHByZXZBcnJvdzonPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1wcmV2XCI+PHN2ZyB3aWR0aD1cIjMxXCIgaGVpZ2h0PVwiMzFcIiB2aWV3Qm94PVwiMCAwIDMxIDMxXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0yNC44ODczIDE1LjQ5OTlMMzEgMzAuOTk5OUwtMS44NDgzNmUtMDcgMTUuNDk5OUwzMSAtMC4wMDAxMjE3MDFMMjQuODg3MyAxNS40OTk5Wk0yLjk3NDg0IDE1LjQ5OTlMMjMuNTY1MSAxNS40OTk5QzIzLjU2NTMgMTUuMzMyNyAyMy41OTY3IDE1LjE2NjkgMjMuNjU3NyAxNS4wMTE0TDI4LjUwNTYgMi43NDAyMUwyLjk3NDg0IDE1LjQ5OTlaXCIgZmlsbD1cIiMwRDJENUZcIi8+PC9zdmc+PC9idXR0b24+JyxcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6JzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stbmV4dFwiPjxzdmcgd2lkdGg9XCIzMVwiIGhlaWdodD1cIjMxXCIgdmlld0JveD1cIjAgMCAzMSAzMVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNNi4xMTI3MiAxNS40OTk5TC0xLjY3OTY1ZS0wNSAzMC45OTk5TDMxIDE1LjQ5OTlMLTEuNzE2NjFlLTA1IC0wLjAwMDEyMTcwMUw2LjExMjcyIDE1LjQ5OTlaTTI4LjAyNTIgMTUuNDk5OUw3LjQzNDg3IDE1LjQ5OTlDNy40MzQ3MiAxNS4zMzI3IDcuNDAzMzEgMTUuMTY2OSA3LjM0MjMxIDE1LjAxMTRMMi40OTQ0MyAyLjc0MDIxTDI4LjAyNTIgMTUuNDk5OVpcIiBmaWxsPVwiIzBEMkQ1RlwiLz48L3N2Zz48L2J1dHRvbj4nLFxuXHRcdFx0fSkub24oJ2JlZm9yZUNoYW5nZScsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZSwgbmV4dFNsaWRlKSB7XG5cdFx0XHRcdGxldCBpZCA9ICQodGhpcykuYXR0cignZGF0YS1pZCcpO1xuXHRcdFx0XHQkKCcudGVjaG5vbG9neS1zbGlkZXItc2VjdGlvbl9fc2xpZGVyLXRleHQuYWN0aXZlJykuZmFkZU91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdCQoJyN0ZXh0LScrbmV4dFNsaWRlK2lkKS5mYWRlSW4oKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdH0pLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuXG5cdFx0XHR9KVxuXG5cdFx0fSk7XG5cdH1cblx0aWYoJCgnLmVuc3VyaW5nLXNsaWRlci1zZWN0aW9uX19zbGlkZXInKS5sZW5ndGggPiAwKXtcblx0XHQkKCcuZW5zdXJpbmctc2xpZGVyLXNlY3Rpb25fX3NsaWRlcicpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdCQodGhpcykuc2xpY2soe1xuXHRcdFx0XHRkb3RzOiBmYWxzZSxcblx0XHRcdFx0YXJyb3dzOiB0cnVlLFxuXHRcdFx0XHRzcGVlZDogNTAwLFxuXHRcdFx0XHRzbGlkZXNUb1Nob3c6IDEsXG5cdFx0XHRcdGluZmluaXRlOiB0cnVlLFxuXHRcdFx0XHRhdXRvcGxheTogdHJ1ZSxcbiAgXHRcdFx0ICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXG5cdFx0XHRcdHByZXZBcnJvdzonPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1wcmV2XCI+PHN2ZyB3aWR0aD1cIjQzXCIgaGVpZ2h0PVwiNDNcIiB2aWV3Qm94PVwiMCAwIDQzIDQzXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PGcgY2xpcC1wYXRoPVwidXJsKCNjbGlwMF8xMDU3XzgwNzQpXCI+PHBhdGggZD1cIk0zNC41MjExIDIxLjUwMDFMNDMgNDNMOS4zOTc5OWUtMDcgMjEuNTAwMUw0MyAtMS44Nzk1OWUtMDZMMzQuNTIxMSAyMS41MDAxWk00LjEyNjM5IDIxLjUwMDFMMzIuNjg3MSAyMS41MDAxQzMyLjY4NzMgMjEuMjY4MSAzMi43MzA5IDIxLjAzODEgMzIuODE1NSAyMC44MjI0TDM5LjU0IDMuODAxMUw0LjEyNjM5IDIxLjUwMDFaXCIgZmlsbD1cIndoaXRlXCIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9XCJjbGlwMF8xMDU3XzgwNzRcIj48cmVjdCB3aWR0aD1cIjQzXCIgaGVpZ2h0PVwiNDNcIiBmaWxsPVwid2hpdGVcIiB0cmFuc2Zvcm09XCJtYXRyaXgoNC4zNzExNGUtMDggMSAxIC00LjM3MTE0ZS0wOCAwIDApXCIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPjwvYnV0dG9uPicsXG4gICAgICAgICAgICAgICAgbmV4dEFycm93Oic8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLW5leHRcIj48c3ZnIHdpZHRoPVwiNDNcIiBoZWlnaHQ9XCI0M1wiIHZpZXdCb3g9XCIwIDAgNDMgNDNcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48ZyBjbGlwLXBhdGg9XCJ1cmwoI2NsaXAwXzEwNTdfODA3MSlcIj48cGF0aCBkPVwiTTguNDc4OTQgMjEuNTAwMUwtMi4wOTUzMWUtMDUgNDNMNDMgMjEuNTAwMUwtMS45MDczNWUtMDUgLTEuODc5NTllLTA2TDguNDc4OTQgMjEuNTAwMVpNMzguODczNiAyMS41MDAxTDEwLjMxMjkgMjEuNTAwMUMxMC4zMTI3IDIxLjI2ODEgMTAuMjY5MSAyMS4wMzgxIDEwLjE4NDUgMjAuODIyNEwzLjQ2MDAxIDMuODAxMUwzOC44NzM2IDIxLjUwMDFaXCIgZmlsbD1cIiNGNkYyRkRcIi8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD1cImNsaXAwXzEwNTdfODA3MVwiPjxyZWN0IHdpZHRoPVwiNDNcIiBoZWlnaHQ9XCI0M1wiIGZpbGw9XCJ3aGl0ZVwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSg0Mykgcm90YXRlKDkwKVwiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz48L2J1dHRvbj4nXG5cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cdGlmKCQoJy5jcnVpc2luZy1zZWN0aW9uX19zbGlkZXInKS5sZW5ndGggPiAwKXtcblx0XHQkKCcuY3J1aXNpbmctc2VjdGlvbl9fc2xpZGVyJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0bGV0IHNsaWRlciA9ICQodGhpcyk7XG5cdFx0XHRzbGlkZXIuc2xpY2soe1xuXHRcdFx0XHRkb3RzOiB0cnVlLFxuXHRcdFx0XHRhcnJvd3M6IGZhbHNlLFxuXHRcdFx0XHRzcGVlZDogNTAwLFxuXHRcdFx0XHRzbGlkZXNUb1Nob3c6IDIsXG5cdFx0XHRcdGluZmluaXRlOiBmYWxzZSxcblx0XHRcdFx0dmFyaWFibGVXaWR0aDogdHJ1ZSxcblx0XHRcdFx0ZHJhZ2dhYmxlOnRydWUsXG5cdFx0XHRcdGF1dG9wbGF5OiBmYWxzZSxcbiAgXHRcdFx0ICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG5cdFx0XHRcdHJlc3BvbnNpdmU6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRicmVha3BvaW50OiA5OTEsXG5cdFx0XHRcdFx0XHRzZXR0aW5nczoge1xuXHRcdFx0XHRcdFx0XHR2YXJpYWJsZVdpZHRoOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAxLFxuXHRcdFx0XHRcdFx0XHRkb3RzOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRkcmFnZ2FibGU6dHJ1ZSxcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdXG5cdFx0XHR9KS5vbignYmVmb3JlQ2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaywgY3VycmVudFNsaWRlLCBuZXh0U2xpZGUpIHtcblx0XHRcdFx0Ly9sZXQgY291bnQgID0gJCgnI2NydWlzaW5nLXN0ZXAnKS5hdHRyKCdkYXRhLWNvdW50Jyk7XG5cdFx0XHRcdGlmKG5leHRTbGlkZSA+IDApe1xuXHRcdFx0XHRcdCQoJy5jcnVpc2luZy1zZWN0aW9uX19ib2F0JykucmVtb3ZlQ2xhc3MoJ3N0YXJ0Jyk7XG5cdFx0XHRcdFx0JCgnLmNydWlzaW5nLXNlY3Rpb25fX2JvYXQnKS5jc3Moe1xuXHRcdFx0XHRcdFx0XCItd2Via2l0LXRyYW5zZm9ybVwiOlwidHJhbnNsYXRlWChcIitzbGlkZXIuZmluZCgnLnNsaWNrLWFjdGl2ZTpub3QoLnNsaWNrLWN1cnJlbnQpJykub3V0ZXJXaWR0aCggdHJ1ZSApK1wicHgpXCIsXG5cdFx0XHRcdFx0XHRcIi1tcy10cmFuc2Zvcm1cIjpcInRyYW5zbGF0ZVgoXCIrc2xpZGVyLmZpbmQoJy5zbGljay1hY3RpdmU6bm90KC5zbGljay1jdXJyZW50KScpLm91dGVyV2lkdGgoIHRydWUgKStcInB4KVwiLFxuXHRcdFx0XHRcdFx0XCJ0cmFuc2Zvcm1cIjpcInRyYW5zbGF0ZVgoXCIrc2xpZGVyLmZpbmQoJy5zbGljay1hY3RpdmU6bm90KC5zbGljay1jdXJyZW50KScpLm91dGVyV2lkdGgoIHRydWUgKStcInB4KVwiXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0bGV0IHN0ZXAgPSAkKCcjY3J1aXNpbmctc3RlcCcpLnZhbCgpO1xuXHRcdFx0XHRcdCQoJyNjcnVpc2luZy1zdGVwJykudmFsKHBhcnNlSW50KHN0ZXApKzEpO1xuXHRcdFx0XHR9ZWxzZSBpZihuZXh0U2xpZGUgPT0gMCl7XG5cdFx0XHRcdFx0JCgnI2NydWlzaW5nLXN0ZXAnKS52YWwoMCk7XG5cdFx0XHRcdFx0JCgnLmNydWlzaW5nLXNlY3Rpb25fX2JvYXQnKS5hZGRDbGFzcygnc3RhcnQnKTtcblx0XHRcdFx0XHQkKCcuY3J1aXNpbmctc2VjdGlvbl9fYm9hdCcpLmNzcyh7XG5cdFx0XHRcdFx0XHRcIi13ZWJraXQtdHJhbnNmb3JtXCI6XCJ0cmFuc2xhdGVYKDBweClcIixcblx0XHRcdFx0XHRcdFwiLW1zLXRyYW5zZm9ybVwiOlwidHJhbnNsYXRlWCgwcHgpXCIsXG5cdFx0XHRcdFx0XHRcInRyYW5zZm9ybVwiOlwidHJhbnNsYXRlWCgwcHgpXCJcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQkKCcjY3J1aXNpbmctc3RlcCcpLnZhbCgwKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHQkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0JCgnLmNydWlzaW5nLXNlY3Rpb25fX3NsaWRlcicpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRsZXQgY2Fyb3VzZWwgPSAkKHRoaXMpO1xuXHRcdFx0XHRcdGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDk5MSkge1xuXHRcdFx0XHRcdFx0Ly9jYXJvdXNlbC5zbGljaygnc2xpY2tBZGQnLCAnPGRpdiBjbGFzcz1cIml0ZW1cIj48L2Rpdj4nLCAwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZigkKHdpbmRvdykud2lkdGgoKSA8IDk5MSl7XG5cdFx0XHRcdFx0XHRjYXJvdXNlbC5zbGljaygnc2xpY2tSZW1vdmUnLCAwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblx0ZnVuY3Rpb24gY3J1aXNpbmdTbGlkZXJSZXNldCgpe1xuXHRcdGlmKCQoJy5jcnVpc2luZy1zZWN0aW9uX19zbGlkZXInKS5sZW5ndGggPiAwKXtcblx0XHRcdCQoJy5jcnVpc2luZy1zZWN0aW9uX19zbGlkZXInKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCQodGhpcykuc2xpY2soJ3NsaWNrR29UbycsIDApO1xuXHRcdFx0XHQkKCcjY3J1aXNpbmctc3RlcCcpLnZhbCgwKTtcblx0XHRcdFx0JCgnLmNydWlzaW5nLXNlY3Rpb25fX2JvYXQnKS5hZGRDbGFzcygnc3RhcnQnKTtcblx0XHRcdFx0JCgnLmNydWlzaW5nLXNlY3Rpb25fX2JvYXQnKS5jc3Moe1xuXHRcdFx0XHRcdFwiLXdlYmtpdC10cmFuc2Zvcm1cIjpcInRyYW5zbGF0ZVgoMHB4KVwiLFxuXHRcdFx0XHRcdFwiLW1zLXRyYW5zZm9ybVwiOlwidHJhbnNsYXRlWCgwcHgpXCIsXG5cdFx0XHRcdFx0XCJ0cmFuc2Zvcm1cIjpcInRyYW5zbGF0ZVgoMHB4KVwiXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdC8vYW5pbWF0ZSB0aGUgYm9hdFxuXHRmdW5jdGlvbiBib2F0QW5pbWF0ZSgpIHtcblx0XHRsZXQgYm9hdEFuaW1hdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvYXRBbmltYXRpb24nKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGJvYXRBbmltYXRpb24ubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHRjb25zdCBhbmltYXRpb24gPSBib2R5bW92aW4ubG9hZEFuaW1hdGlvbih7XG5cdFx0XHRcdFx0XHRjb250YWluZXI6IGJvYXRBbmltYXRpb24uaXRlbShpKSxcblx0XHRcdFx0XHRcdHJlbmRlcmVyOiAnc3ZnJyxcblx0XHRcdFx0XHRcdGxvb3A6IHRydWUsXG5cdFx0XHRcdFx0XHRhdXRvcGxheTogdHJ1ZSxcblx0XHRcdFx0XHRcdHBhdGg6IGJvYXRBbmltYXRpb25baV0uZGF0YXNldC5maWxlLFxuXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRhbmltYXRpb24uc2V0U3BlZWQoMC4zKTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gc2lkZUltYWdlQW5pbWF0aW9uKCl7XG5cdFx0bGV0IGFuaW1hdGlvbkJsb2NrID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3ZnLWpzb24tYW5pbWF0aW9uJyk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhbmltYXRpb25CbG9jay5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBhbmltYXRpb24gPSBib2R5bW92aW4ubG9hZEFuaW1hdGlvbih7XG5cdFx0XHRcdFx0XHRjb250YWluZXI6IGFuaW1hdGlvbkJsb2NrLml0ZW0oaSksXG5cdFx0XHRcdFx0XHRyZW5kZXJlcjogJ3N2ZycsXG5cdFx0XHRcdFx0XHRsb29wOiB0cnVlLFxuXHRcdFx0XHRcdFx0YXV0b3BsYXk6IHRydWUsXG5cdFx0XHRcdFx0XHRwYXRoOiBhbmltYXRpb25CbG9ja1tpXS5kYXRhc2V0LmZpbGUsXG5cblx0XHRcdFx0fSk7XG5cdFx0XHRcdGFuaW1hdGlvbi5zZXRTcGVlZCgwLjMpO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Ly9zb3Vyc2UgY2hhbmdlXG5cdCQoJy5zb3Vyc2Utc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuc291cmNlLWZpZWxkJykudmFsKCQodGhpcykuZmluZChcIjpzZWxlY3RlZFwiKS52YWwoKSk7XG5cdH0pO1xuXG4gICAgJChcIiNtb2JpbGUtaGVhZGVyLW1lbnUgLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4gPiAubGlrZS1saW5rLCAjbW9iaWxlLWhlYWRlci1tZW51IC5tZW51LWl0ZW0taGFzLWNoaWxkcmVuID4gYVwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgpO1xuICAgICAgICBsZXQgYXJyb3cgPSBpdGVtLmNoaWxkcmVuKCcubGlrZS1saW5rLCBhJykuZmluZCgnLmFycm93LWRvd24nKTtcblxuICAgICAgICBpZiAoIWl0ZW0uaGFzQ2xhc3MoXCJhY3RpdmVcIikpIHtcbiAgICAgICAgICAgIGl0ZW0uc2libGluZ3MoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKS5maW5kKFwiLnN1Yi1tZW51XCIpLnN0b3AodHJ1ZSwgdHJ1ZSkuc2xpZGVVcCgpO1xuICAgICAgICAgICAgaXRlbS5zaWJsaW5ncyhcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLmNoaWxkcmVuKCcubGlrZS1saW5rLCBhJykuZmluZCgnLmFycm93LWRvd24nKS5yZW1vdmVDbGFzcygncm90YXRlLWFycm93Jyk7XG5cbiAgICAgICAgICAgIGl0ZW0uZmluZChcIi5zdWItbWVudVwiKS5maXJzdCgpLnN0b3AodHJ1ZSwgdHJ1ZSkuc2xpZGVEb3duKCk7XG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuKCcubGlrZS1saW5rLCBhJykuZmluZCgnLmFycm93LWRvd24nKS5hZGRDbGFzcygncm90YXRlLWFycm93Jyk7XG4gICAgICAgICAgICBpdGVtLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5maW5kKFwiLnN1Yi1tZW51XCIpLmZpcnN0KCkuc3RvcCh0cnVlLCB0cnVlKS5zbGlkZVVwKCk7XG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuKCcubGlrZS1saW5rLCBhJykuZmluZCgnLmFycm93LWRvd24nKS5yZW1vdmVDbGFzcygncm90YXRlLWFycm93Jyk7XG4gICAgICAgICAgICBpdGVtLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKFwiI21vYmlsZS1oZWFkZXItbWVudSAubWVudS1pdGVtLWhhcy1jaGlsZHJlbiAuc3ViLW1lbnUgYVwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG5cblxuICAgICQoJy5zaG93LXRhZ3MnKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG5cdFx0JCgnLnJlc291cmNlcy10YWdzLXNlY3Rpb25fX3dyYXBwZXItbGltaXRlZCcpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcblx0XHQkKHRoaXMpLnRleHQoZnVuY3Rpb24oaSwgdGV4dCl7XG5cdFx0XHRyZXR1cm4gdGV4dCA9PT0gXCJTZWUgbW9yZVwiID8gXCJTZWUgbGVzc1wiIDogXCJTZWUgbW9yZVwiO1xuXHRcdH0pO1xuXG5cdH0pO1xuXHQvL3Bvc3QgcGFnaW5hdGlvbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRmdW5jdGlvbiBsb2FkX2FsbF9wb3N0cyhwYWdlKSB7XG5cdFx0JChcIi5yZXNvdXJjZXMtcG9zdHMtc2VjdGlvbl9fY29udGFpbmVyIC5sb2FkZXJcIikuZmFkZUluKCk7XG5cdFx0bGV0IHRhZ3MgPSBbXTtcblx0XHQkKCcucmVzb3VyY2VzLXRhZ3Mtc2VjdGlvbl9fdGFnOmNoZWNrZWQnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0YWdzLnB1c2goJCh0aGlzKS52YWwoKSk7XG5cdFx0fSk7XG5cdFx0bGV0IG9yZGVyYnkgPSBudWxsXG5cdFx0b3JkZXJieSA9ICQoJy5yZXNvdXJjZXMtc2VhcmNoLXNlY3Rpb25fX2NhdGVnb3JpZXMtc29ydGJ5OmNoZWNrZWQnKS52YWwoKTtcblx0XHRsZXQgZGF0YSA9IHtcblx0XHRcdFx0cGFnZTogcGFnZSxcblx0XHRcdFx0dGFnczogdGFncyxcblx0XHRcdFx0b3JkZXI6IG9yZGVyYnksXG5cdFx0XHRcdHRheF9pZDogJCgnI3Jlc291cmNlcy10YXhvbm9teScpLnZhbCgpLFxuXHRcdFx0XHR0YXg6ICQoJyNyZXNvdXJjZXMtdGF4b25vbXknKS5hdHRyKCdkYXRhLXRheCcpLFxuXHRcdFx0XHRwZXJfcGFnZTogJCgnI3Blcl9wYWdlJykudmFsKCksXG5cdFx0XHRcdGFjdGlvbjogXCJwb3N0X3BhZ2luYXRpb25cIixcblx0XHR9O1xuXG5cdFx0JC5wb3N0KHZhcl9mcm9tX3BocC5hamF4X3VybCwgZGF0YSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdFx0JChcIi5yZXNvdXJjZXMtcG9zdHMtc2VjdGlvbl9fY29udGFpbmVyIC5yZXNvdXJjZXMtcG9zdHMtc2VjdGlvbl9fYWpheFwiKS5odG1sKHJlc3BvbnNlKTtcblx0XHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdFx0XHRcdFx0c2Nyb2xsVG9wOiAkKFwiLnJlc291cmNlcy1zZWFyY2gtc2VjdGlvblwiKS5vZmZzZXQoKS50b3AgLSA4N1xuXHRcdFx0XHR9LCA1MDApO1xuXHRcdFx0XHQkKCcucmVzb3VyY2VzLXBvc3RzLXNlY3Rpb25fX2NvbnRhaW5lciAubG9hZGVyJykuZmFkZU91dCgzMDApO1xuXHRcdH0pO1xuXHR9XG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcucGFnaW5hdGlvbiAuYWN0aXZlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRsZXQgcGFnZSA9ICQodGhpcykuYXR0cignZGF0YS1wYWdlJyk7XG5cdFx0XHRsb2FkX2FsbF9wb3N0cyhwYWdlKTtcblx0fSk7XG5cdCQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnLnJlc291cmNlcy10YWdzLXNlY3Rpb25fX3RhZycsIGZ1bmN0aW9uKCkge1xuXHRcdGxvYWRfYWxsX3Bvc3RzKDEpO1xuXHR9KTtcblx0JChcIi5yZXNvdXJjZXMtc2VhcmNoLXNlY3Rpb25fX2NhdGVnb3JpZXMtc29ydGJ5XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdC8vIGluIHRoZSBoYW5kbGVyLCAndGhpcycgcmVmZXJzIHRvIHRoZSBib3ggY2xpY2tlZCBvblxuXHRcdGxldCAkYm94ID0gJCh0aGlzKTtcblx0XHRpZiAoJGJveC5pcyhcIjpjaGVja2VkXCIpKSB7XG5cdFx0XHRsZXQgZ3JvdXAgPSBcImlucHV0OmNoZWNrYm94W25hbWU9J1wiICsgJGJveC5hdHRyKFwibmFtZVwiKSArIFwiJ11cIjtcblx0XHRcdCQoZ3JvdXApLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcblx0XHRcdCRib3gucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRib3gucHJvcChcImNoZWNrZWRcIiwgZmFsc2UpO1xuXHRcdH1cblx0XHRsb2FkX2FsbF9wb3N0cygxKTtcblx0fSk7XG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbn0pKCBqUXVlcnkgKTtcbi8vQWRkIGxvZ2ljIGZvIHNob3cvaGlkZSBGQVFcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBmYXFUaXRsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmFxX19zZWN0aW9uLXRpdGxlJyk7XG5cbiAgICBmYXFUaXRsZXMuZm9yRWFjaChmdW5jdGlvbih0aXRsZSkge1xuICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICBjb25zdCBmYXFJdGVtcyA9IHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgICAgICBpZiAoZmFxSXRlbXMuc3R5bGUubWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgZmFxSXRlbXMuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmFxSXRlbXMuc3R5bGUubWF4SGVpZ2h0ID0gZmFxSXRlbXMuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdfQ==
},{"./modules/helpers.js":2,"./modules/navi-tabs":3,"./modules/popup-window.js":4,"@babel/runtime/helpers/interopRequireDefault":10,"smoothscroll-polyfill":17}],2:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add_product_to_favorites = void 0;
exports.anchorLinkScroll = anchorLinkScroll;
exports.close_top_menu = exports.checkboxInnerTextWrapping = exports.check_filter_tags = exports.check_and_login_user = exports.checkLifeTime = void 0;
exports.closest_polyfill = closest_polyfill;
exports.deliveryTypeSwitcher = exports.deliveryCheckboxesState = exports.deleteCookie = exports.debounce = exports.custom_add_to_cart = exports.copyToClipboard = void 0;
exports.equalHeights = equalHeights;
exports.equalHeights_inrow = equalHeights_inrow;
exports.fadeIn = fadeIn;
exports.fadeOut = fadeOut;
exports.getFormFields = exports.getCookie = exports.getAllUrlParams = exports.fetch_display_color_slider = exports.fetchFiled = void 0;
exports.isInViewport = isInViewport;
exports.setCookie = exports.search_product = exports.putFileIntoFormData = exports.open_top_menu = exports.load_more_products = void 0;
exports.trimParagraph = trimParagraph;
exports.validateField = exports.updated_cart_totals_func = exports.update_favorites_count = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _smoothscrollPolyfill = _interopRequireDefault(require("smoothscroll-polyfill"));

// kick off the polyfill!
_smoothscrollPolyfill["default"].polyfill();
/**
 * Fade Out method
 * @param el
 */


function fadeOut(el) {
  if (!el) {
    throw Error('"fadeOut function - "You didn\'t add required parameters');
  }

  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}
/**
 * Fade In method
 * @param el      - element that need to fade in
 * @param display - display variant
 */


function fadeIn(el, display) {
  if (!el) {
    throw Error('"fadeIn function - "You didn\'t add required parameters');
  }

  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);

    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
/**
 *  Set equal height to selected elements calculated as bigger height
 * @param elementsSelector  - selector for searching elements
 * @param minOrMax          - Define what dimension should be calculated (minHeight or maxHeight)
 * @returns elementsSelector
 */


function equalHeights(elementsSelector) {
  var minOrMax = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'max';

  if (!elementsSelector) {
    throw Error('"equalHeights function - "You didn\'t add required parameters');
  }

  var heights = [];
  var elementsSelectorArr = Array.isArray(elementsSelector) ? elementsSelector : (0, _toConsumableArray2["default"])(document.querySelectorAll(elementsSelector));
  elementsSelectorArr.forEach(function (item) {
    item.style.height = 'auto';
  });
  elementsSelectorArr.forEach(function (item) {
    heights.push(item.offsetHeight);
  });
  var commonHeight = minOrMax === 'max' ? Math.max.apply(0, heights) : Math.min.apply(0, heights);
  elementsSelectorArr.forEach(function (item) {
    item.style.height = commonHeight + 'px';
  });
  return elementsSelector;
}
/**
 * Set equal height to selected elements in row calculated as bigger height
 * @param elementsSelector - selector for searching elements
 * @param numItem_inrow    - Items amount that will be used for each equal height iteration
 * @returns elementsSelector
 */


function equalHeights_inrow(elementsSelector, numItem_inrow) {
  if (!elementsSelector || !numItem_inrow) {
    throw Error('"equalHeights_inrow function - "You didn\'t add required parameters');
  }

  var ELEMENTS_ARR = (0, _toConsumableArray2["default"])(document.querySelectorAll(elementsSelector));
  var EL_LENGTH = ELEMENTS_ARR.length;

  for (var i = 0; i <= EL_LENGTH / numItem_inrow; i++) {
    var temp = ELEMENTS_ARR.slice(i * numItem_inrow, i * numItem_inrow + numItem_inrow);
    equalHeights(temp);
  }

  return elementsSelector;
}
/**
 * Trim all paragraph from unneeded space symbol
 */


function trimParagraph() {
  (0, _toConsumableArray2["default"])(document.querySelectorAll('p')).forEach(function (item) {
    item.innerHTML = item.innerHTML.trim();
  });
}
/**
 * Check if element in viewport
 * @param el
 * @param offset - Adjustable offset value when element becomes visible
 * @returns {boolean}
 */


function isInViewport(el) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

  if (!el) {
    throw Error('"isInViewport function - "You didn\'t add required parameters');
  }

  var scroll = window.scrollY || window.pageYOffset;
  var boundsTop = el.getBoundingClientRect().top + offset + scroll;
  var viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight
  };
  var bounds = {
    top: boundsTop,
    bottom: boundsTop + el.clientHeight
  };
  return bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom || bounds.top <= viewport.bottom && bounds.top >= viewport.top;
}
/**
 * Debounce function
 * @param fn     - function that should be executed
 * @param time   - time delay
 * @returns {Function}
 */


var debounce = function debounce(fn) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

  if (!fn) {
    throw Error('"debounce function - "You didn\'t add required parameters');
  }

  var timeout;
  return function () {
    var _arguments = arguments,
        _this = this;

    var functionCall = function functionCall() {
      return fn.apply(_this, _arguments);
    };

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
/**
 * Copy to clipboard
 * @param element -  element that  contain value to copy
 */


exports.debounce = debounce;

var copyToClipboard = function copyToClipboard(parent, element) {
  if (!parent || !element) {
    throw Error('"copyToClipboard function - "You didn\'t add required parameters');
  }

  var el = document.createElement('textarea');
  el.value = element.value;
  document.body.appendChild(el);
  el.select();

  try {
    var successful = document.execCommand('copy');

    if (successful) {
      parent.classList.add('copied');
      setTimeout(function () {
        parent.classList.remove('copied');
      }, 3000);
    }
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(el);
};
/**
 * Test value with regex
 * @param {(name|email|phone|postal)} fieldType  - The allowed type of the fields
 * @param value
 * @return {boolean}
 */


exports.copyToClipboard = copyToClipboard;

var validateField = function validateField() {
  var fieldType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!fieldType || !value) {
    throw Error('"validateField function - "You didn\'t add required parameters');
  }

  var phoneREGEX = /^[0-9\+]{6,13}$/;
  var nameREGEX = /^[a-zA-Zа-яА-Я\s]{2,30}$/;
  var postalREGEX = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
  var emailREGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var dummyREGEX = /^.+$/;
  var checkResult = false;

  switch (fieldType) {
    case 'name':
      checkResult = nameREGEX.test(value);
      break;

    case 'phone':
      checkResult = phoneREGEX.test(value);
      break;

    case 'postal':
      checkResult = postalREGEX.test(value);
      break;

    case 'email':
      checkResult = emailREGEX.test(value);
      break;

    case 'price':
      checkResult = dummyREGEX.test(value);
      break;

    case 'aim':
      checkResult = dummyREGEX.test(value);
      break;

    case 'date':
      checkResult = dummyREGEX.test(value);
      break;

    case 'subject':
      checkResult = dummyREGEX.test(value);
      break;
  }

  return checkResult;
};
/**
 * Polyfill for closest method
 */


exports.validateField = validateField;

function closest_polyfill() {
  if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i,
          el = this;

      do {
        i = matches.length;

        while (--i >= 0 && matches.item(i) !== el) {}

        ;
      } while (i < 0 && (el = el.parentElement));

      return el;
    };
  }
}
/**
 * Smooth scroll to element on page
 * @param elementsSelector string -- css selector (anchor links)
 * @param callback function       -- callback for some additional actions
 */


function anchorLinkScroll(elementsSelector) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!elementsSelector) {
    throw Error('"anchorLinkScroll function - "You didn\'t add correct selector for anchor links');
  }

  var elements = document.querySelectorAll(elementsSelector);
  elements && (0, _toConsumableArray2["default"])(elements).forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      var el_href = event.target.nodeName === 'A' ? event.target.getAttribute('href') : event.target.dataset.href;
      var ANCHOR_ELEMENT = document.querySelector(el_href);
      ANCHOR_ELEMENT && window.scroll({
        'behavior': 'smooth',
        'left': 0,
        'top': ANCHOR_ELEMENT.offsetTop
      });
      if (callback) callback();
    });
  });
}
/**
 * Add/remove product from Favorite list
 * @param productID
 * @param operationType
 */


var add_product_to_favorites = function add_product_to_favorites(productID, operationType) {
  if (!productID) return;
  var favorite_products = Cookies.get('favorite_products');

  if (!favorite_products && operationType === 'add') {
    Cookies.set('favorite_products', JSON.stringify([productID]), {
      expires: 30
    });
    return;
  }

  var convertedArr = JSON.parse(favorite_products);

  switch (operationType) {
    case 'remove':
      convertedArr = convertedArr.filter(function (item) {
        return +item !== +productID;
      });
      break;

    case 'add':
      convertedArr.push(productID);
      break;
  }

  Cookies.set('favorite_products', JSON.stringify(convertedArr), {
    expires: 30
  });
  return;
};

exports.add_product_to_favorites = add_product_to_favorites;

var update_favorites_count = function update_favorites_count(counterContainer) {
  if (!counterContainer) return;
  var COOK = Cookies.get('favorite_products');
  var COUNT_OF_FAVORITES = COOK ? JSON.parse(COOK) : null;
  var EXISTING_SPAN = document.querySelector('.favorite_count');

  if (EXISTING_SPAN && COUNT_OF_FAVORITES && +COUNT_OF_FAVORITES.length < 1) {
    EXISTING_SPAN.remove();
  }

  if (EXISTING_SPAN && COUNT_OF_FAVORITES && +COUNT_OF_FAVORITES.length) {
    EXISTING_SPAN.innerText = JSON.parse(Cookies.get('favorite_products')).length;
  }

  if (!EXISTING_SPAN && COUNT_OF_FAVORITES && +COUNT_OF_FAVORITES.length > 0) {
    var SPAN = document.createElement('span');
    SPAN.classList.add('favorite_count');
    SPAN.innerText = JSON.parse(Cookies.get('favorite_products')).length;
    counterContainer.appendChild(SPAN);
  }
};
/**
 * Send product ID to store as Favorite product
 * @param formElement
 */


exports.update_favorites_count = update_favorites_count;

var load_more_products = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(formID, offset, step_per_page) {
    var formData, option;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!formID || !offset)) {
              _context.next = 3;
              break;
            }

            console.log('Some of parameter are missed (formID, offset)');
            return _context.abrupt("return");

          case 3:
            formData = new FormData(document.querySelector(formID));
            formData.append('action', 'load_more_products');
            formData.append('offset', offset);
            option = {
              method: 'POST',
              body: formData
            };
            _context.next = 9;
            return fetch(var_from_php.ajax_url, option);

          case 9:
            return _context.abrupt("return", _context.sent);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function load_more_products(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Search product request function
 * @param elem
 */


exports.load_more_products = load_more_products;

var search_product = function search_product(elem) {
  if (!elem) {
    throw Error('"search_product" function - You didn\'t add required parameters');
  }

  var FORM_TAG = elem.closest('.js-box-search');
  var SEARCH_RESULTS_INPUT = document.querySelector('.js-search-results-input');
  var SEARCH_RESULTS_BLOCK = document.querySelector('.js-search-result');
  var FORM_WRAPPER = document.querySelector('.js-form-wrapper');
  var SEARCH_BUTTON = document.querySelector('.js-search-button');
  var formData = new FormData(FORM_TAG);

  if (!FORM_TAG) {
    throw Error('"search_product" function - FORM_TAG can\'t be found ');
  }

  SEARCH_RESULTS_INPUT && SEARCH_RESULTS_INPUT.setAttribute('disabled', 'disabled');
  formData.append('action', 'get_search_results');

  if (SEARCH_RESULTS_INPUT.value !== "") {
    fetch(var_from_php.ajax_url, {
      method: 'POST',
      body: formData
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      if (response.success && response.data !== "") {
        if (SEARCH_RESULTS_BLOCK) {
          SEARCH_RESULTS_BLOCK.innerHTML = response.data.html;
        }

        FORM_WRAPPER.classList.add('open');
        SEARCH_BUTTON.classList.add('open');
        SEARCH_RESULTS_BLOCK.classList.add('open');
      } else {
        FORM_WRAPPER.classList.add('open');
        SEARCH_BUTTON.classList.add('open');
        SEARCH_RESULTS_BLOCK.classList.add('open');
        SEARCH_RESULTS_BLOCK.innerHTML = '<p class="search-box__search-not-found">Ничего не найдено</p>';
      }

      SEARCH_RESULTS_INPUT.removeAttribute('disabled');
    });
  } else {
    FORM_WRAPPER && FORM_WRAPPER.classList.remove('open');
    SEARCH_BUTTON && FORM_WRAPPER.classList.remove('open');
    SEARCH_RESULTS_BLOCK && SEARCH_RESULTS_BLOCK.classList.remove('open');
    SEARCH_RESULTS_INPUT && SEARCH_RESULTS_INPUT.removeAttribute('disabled');
  }
};
/**
 * Check and login user functionality
 * @param form_instance
 */


exports.search_product = search_product;

var check_and_login_user = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(form_instance) {
    var EMAIL_PHONE_INPUT, TYPE_OF_ENTERED_EL, SUBMIT_BTN_EL, EMAIL_PHONE_INPUT_ERROR_EL, VALIDATE_AS_EMAIL, VALIDATE_AS_PHONE, formData;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (form_instance) {
              _context2.next = 2;
              break;
            }

            throw Error('"check_and_login_user" function - You didn\'t add required parameters');

          case 2:
            EMAIL_PHONE_INPUT = form_instance['login-email-phone'];
            TYPE_OF_ENTERED_EL = form_instance['type-of-entered'];
            SUBMIT_BTN_EL = form_instance['submit-btn'];
            EMAIL_PHONE_INPUT_ERROR_EL = EMAIL_PHONE_INPUT.nextElementSibling;
            VALIDATE_AS_EMAIL = validateField('email', EMAIL_PHONE_INPUT.value);
            VALIDATE_AS_PHONE = validateField('phone', EMAIL_PHONE_INPUT.value); // Fill helper field for backend request

            if (TYPE_OF_ENTERED_EL) {
              TYPE_OF_ENTERED_EL.value = VALIDATE_AS_EMAIL ? 'email' : VALIDATE_AS_PHONE ? 'phone' : '';
            } // Show error message when user entered invalid email/phone


            if (!(!VALIDATE_AS_EMAIL && !VALIDATE_AS_PHONE && EMAIL_PHONE_INPUT_ERROR_EL)) {
              _context2.next = 12;
              break;
            }

            EMAIL_PHONE_INPUT_ERROR_EL.innerHTML = var_from_php.string_translation['email_phone_not_valid'];
            return _context2.abrupt("return");

          case 12:
            SUBMIT_BTN_EL && SUBMIT_BTN_EL.classList.add('loading');

            if (EMAIL_PHONE_INPUT_ERROR_EL) {
              EMAIL_PHONE_INPUT_ERROR_EL.innerHTML = '';
            }

            formData = new FormData(form_instance);
            formData.append('action', 'check_and_login_user');
            fetch(var_from_php.ajax_url, {
              method: 'POST',
              body: formData
            }).then(function (response) {
              return response.json();
            }).then(function (response) {
              SUBMIT_BTN_EL && SUBMIT_BTN_EL.classList.remove('loading');

              if (response.success) {
                window.location.href = var_from_php.account_url;
              }
            });

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function check_and_login_user(_x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Updated cart totals function
 */


exports.check_and_login_user = check_and_login_user;

var updated_cart_totals_func = function updated_cart_totals_func() {
  var itemsAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var cartTotal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var CURRENT_ORDER_VALUE = document.querySelectorAll('.js-current-order-value');
  var BLOCK_INFO = document.querySelector('.js-heading-area-warnings-text');
  var current_total_cart = cartTotal;
  var current_total_cart_value = 0;

  if (!cartTotal) {
    current_total_cart = document.querySelector('.js-cart-total').innerHTML;
    current_total_cart_value = document.querySelector('.js-cart-total').dataset.total;
  }

  var min_total_el = document.querySelector('.js-min-order-value');
  var MIN_TOTAL = null;

  if (min_total_el) {
    MIN_TOTAL = min_total_el.innerHTML;
  }

  var TOTAL_BLOCK_INFO = document.querySelectorAll('.js-current-order-value');
  var TOTAL_HEADER_STICKY = document.querySelectorAll('.js-sticky-header-cart-price');
  var TOTAL_BLOCK_HEADER = document.querySelectorAll('.js-header-cart-price');
  var HEADER_CART_COUNT = document.querySelectorAll('.js-header-cart-count');
  var INPUT_QTYs = document.querySelectorAll('.input-text.qty');
  var items_amount = itemsAmount; // Update current order amount for visual layouts

  [].concat((0, _toConsumableArray2["default"])(TOTAL_BLOCK_INFO), (0, _toConsumableArray2["default"])(TOTAL_HEADER_STICKY), (0, _toConsumableArray2["default"])(TOTAL_BLOCK_HEADER), (0, _toConsumableArray2["default"])(CURRENT_ORDER_VALUE)).forEach(function (item) {
    if (item) {
      item.innerHTML = current_total_cart;
    }
  });

  if (!cartTotal) {
    // Hide/show notice about minimal amount of order
    var operationType = +current_total_cart_value > parseInt(MIN_TOTAL) ? 'add' : 'remove';
    BLOCK_INFO && BLOCK_INFO.classList[operationType]('hidden');
  } // Get total items amount in the cart


  if (!itemsAmount) {
    items_amount = INPUT_QTYs && (0, _toConsumableArray2["default"])(INPUT_QTYs).reduce(function (accum, curr) {
      return accum + +curr.value;
    }, 0);
  } // Update cart count in 3 places


  HEADER_CART_COUNT && (0, _toConsumableArray2["default"])(HEADER_CART_COUNT).forEach(function (item) {
    return item.innerHTML = items_amount;
  });
};
/**
 * Custom add to cart functionality and update cart counters
 * @param product_id
 * @param amount
 * @param event
 * @return {Promise<void>}
 */


exports.updated_cart_totals_func = updated_cart_totals_func;

var custom_add_to_cart = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(product_id, amount) {
    var event,
        formData,
        _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            event = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : null;

            if (!(!product_id || !amount || !event)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return");

          case 3:
            formData = new FormData();
            formData.append('action', 'add_to_cart');
            formData.append('product_id', product_id);
            formData.append('amount', amount);
            fetch(var_from_php.ajax_url, {
              method: 'POST',
              body: formData
            }).then(function (response) {
              return response.json();
            }).then(function (response) {
              event && event.target.classList.remove('loading');

              if (response.success) {
                updated_cart_totals_func(response.data['qty'], response.data['total']);
              }
            });

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function custom_add_to_cart(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Collect order details to backend
 * @param target
 */


exports.custom_add_to_cart = custom_add_to_cart;

var getFormFields = function getFormFields(target) {
  var data = new FormData(target);
  data.append('action', 'create_order');
  document.body.addEventListener('change', function (event) {
    if (event.target.type === 'file') {
      console.log(event.target.files[0].size > 0);
      data.append('file', event.target.files);
    }
  });
  fetchFiled(data);
};
/**
 * Send order details to backend
 * @param fieldsArray
 */


exports.getFormFields = getFormFields;

var fetchFiled = function fetchFiled(fieldsArray) {
  if (!fieldsArray) return;
  fetch(var_from_php.ajax_url, {
    method: 'POST',
    body: fieldsArray
  }).then(function (response) {
    return response;
  }).then(function (data) {
    console.log(data);
  });
};

exports.fetchFiled = fetchFiled;

var putFileIntoFormData = function putFileIntoFormData(fileInput, FormData) {
  if (!fileInput) return;
  FormData.append('file', fileInput);
  console.log(FormData);
};
/**
 * Switcher of delivery types in woocommerce
 * @param deliveryList
 * @param target
 */


exports.putFileIntoFormData = putFileIntoFormData;

var deliveryTypeSwitcher = function deliveryTypeSwitcher(target, deliveryList) {
  if (!deliveryList) return;
  var FLAT_RATE = deliveryList[0];
  var NOVA_POSHTA = deliveryList[1];
  var SHIPPING_ADDRESS_CONTAINER = document.querySelector('.shipping_address');
  if (!SHIPPING_ADDRESS_CONTAINER || !NOVA_POSHTA || !FLAT_RATE) return;
  deliveryList.forEach(function (item) {
    return item.checked = false;
  });

  if (target.dataset.type === 'nova-poshta') {
    NOVA_POSHTA.checked = true;
    SHIPPING_ADDRESS_CONTAINER.style.display = 'none';
    document.body.dispatchEvent(new Event('update_checkout'));
  }

  if (target.dataset.type === 'address-delivery') {
    FLAT_RATE.checked = true;
    SHIPPING_ADDRESS_CONTAINER.style.display = 'block';
    document.body.dispatchEvent(new Event('update_checkout'));
  }
};
/**
 * Check what delivery type are chosen and activate appropriate checkbox for delivery method
 * @param deliveryList
 */


exports.deliveryTypeSwitcher = deliveryTypeSwitcher;

var deliveryCheckboxesState = function deliveryCheckboxesState(deliveryList) {
  var NOVA_POSHTA_FIELD = document.querySelector('input[data-type="nova-poshta"]');
  var FLAT_RATE_FIELD = document.querySelector('input[data-type="address-delivery"]');
  var SHIPPING_ADDRESS_CONTAINER = document.querySelector('.shipping_address');
  if (!FLAT_RATE_FIELD || !NOVA_POSHTA_FIELD || !SHIPPING_ADDRESS_CONTAINER) return;

  if (!deliveryList || deliveryList.length === 0) {
    FLAT_RATE_FIELD.checked = true;
    SHIPPING_ADDRESS_CONTAINER.style.display = 'block';
    return;
  }

  deliveryList.forEach(function (elem) {
    var elem_id = elem.id;
    var checked_elem = elem.checked;

    switch (elem_id) {
      case 'shipping_method_0_flat_rate1':
        if (checked_elem) {
          FLAT_RATE_FIELD.checked = true;
          SHIPPING_ADDRESS_CONTAINER.style.display = 'block';
        }

        break;

      case 'shipping_method_0_nova_poshta_shipping2':
        if (checked_elem) {
          NOVA_POSHTA_FIELD.checked = true;
          SHIPPING_ADDRESS_CONTAINER.style.display = 'none';
        }

        break;
    }
  });
};
/**
 * Wrapping label inner text into span
 */


exports.deliveryCheckboxesState = deliveryCheckboxesState;

var checkboxInnerTextWrapping = function checkboxInnerTextWrapping() {
  var LABEL = document.querySelector('#wcus_np_billing_fields .wc-ukr-shipping-checkbox');
  if (!LABEL) return;
  var INPUT = LABEL.querySelector('input');
  var LABEL_TEXT = LABEL.innerText.trim();
  LABEL.innerText = '';
  var span = document.createElement('span');
  span.innerText = LABEL_TEXT;
  LABEL.appendChild(INPUT);
  LABEL.appendChild(span);
}; //get GET params from url


exports.checkboxInnerTextWrapping = checkboxInnerTextWrapping;

var getAllUrlParams = function getAllUrlParams(url) {
  // fetch string from url or window object
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1); // object for storing parameters

  var obj = {}; // if there is a query string

  if (queryString) {
    // data after the # sign will be omitted
    queryString = queryString.split('#')[0]; // share parameters

    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // split the parameter into key => value
      var a = arr[i].split('='); // processing data like: list [] = thing1 & list [] = thing2

      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function (v) {
        paramNum = v.slice(1, -1);
        return '';
      }); // passing parameter value ('true' if no value is specified)

      var paramValue = typeof a[1] === 'undefined' ? true : a[1]; // register conversion

      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase(); // if the parameter key is already set

      if (obj[paramName]) {
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        } // if no index is given ...


        if (typeof paramNum === 'undefined') {
          // помещаем значение в конец массива
          obj[paramName].push(paramValue);
        } // if index is given ...
        else {
          obj[paramName][paramNum] = paramValue;
        }
      } else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
};
/**
 * Filters products based on collected user data
 */


exports.getAllUrlParams = getAllUrlParams;

var check_filter_tags = function check_filter_tags(event) {
  var apply_filter_button = event.target;
  var FILTERS_SETTINGS = document.querySelector('.js-checked-filters-settings');
  var FILTERS_SETTINGS_WRAP = document.querySelector('.js-checked-filters-settings-wrap');
  var JS_TAB_PANEL_FILTER_ARR = (0, _toConsumableArray2["default"])(document.querySelectorAll('.js-tab-panel-filter'));
  var SWITCHER_FILTER_ACTIVE = document.querySelectorAll('.js-tab-switcher-filter');
  var html_filter = '';
  var TAB_PANEL_FILTER = apply_filter_button && apply_filter_button.closest('.js-tab-panel-filter');
  var id_tab_panel = TAB_PANEL_FILTER && TAB_PANEL_FILTER.id;
  var checkedRadio = false;
  JS_TAB_PANEL_FILTER_ARR && JS_TAB_PANEL_FILTER_ARR.forEach(function (tab_panel_filter) {
    var data_type = tab_panel_filter.getAttribute('id');
    checkedRadio = tab_panel_filter.querySelectorAll('input[type=checkbox]:checked');

    if (checkedRadio && checkedRadio.length) {
      checkedRadio.forEach(function (elem) {
        var filter_val = elem.value;
        console.log('filter_val', filter_val);
        var label_input = elem.nextElementSibling.innerText;
        var TAB_SWITCHER_FILTER = document.querySelector('.js-tab-switcher-filter.active');
        var type_text = TAB_SWITCHER_FILTER && TAB_SWITCHER_FILTER.innerText;

        if (!document.querySelector(".filter-settings-item[data-id=\"".concat(filter_val, "\"]"))) {
          html_filter += "<div data-type=\"".concat(data_type, "\"\n\t\t\t\t\t\t\t\t\t data-id=\"").concat(filter_val, "\"\n\t\t\t\t\t\t\t\t\t class=\"filter-settings-item js-filter-settings-item\">\n\t\t\t\t\t\t\t\t\t    <span>").concat(type_text, ":</span>\n\t\t\t\t\t\t\t\t\t\t").concat(label_input, "\n\t\t\t\t\t\t\t\t\t\t<span class=\"remove-filter-settings\" data-role=\"remove-filter-settings\" ></span>\n\t\t\t\t\t\t\t\t\t</div>");
        }
      });

      if (html_filter !== '' && FILTERS_SETTINGS_WRAP && FILTERS_SETTINGS_WRAP) {
        if (FILTERS_SETTINGS) {
          FILTERS_SETTINGS.innerHTML += html_filter;
        }

        FILTERS_SETTINGS_WRAP && FILTERS_SETTINGS_WRAP.classList.add('active');
      }

      (0, _toConsumableArray2["default"])(SWITCHER_FILTER_ACTIVE).forEach(function (item) {
        item && item.nextElementSibling.classList.remove('active');
      }); // if (SWITCHER_FILTER_ACTIVE.nextElementSibling) {
      // 	SWITCHER_FILTER_ACTIVE.nextElementSibling.classList.remove( 'active' );
      // }

      apply_filter_button && apply_filter_button.closest('.js-tab-panel-filter') && apply_filter_button.closest('.js-tab-panel-filter').classList.remove('active');
      var SELECTED_ID_TAB_PANEL = document.querySelector(".js-tab-switcher-filter[href=\"#".concat(id_tab_panel, "\"]"));
      SELECTED_ID_TAB_PANEL && SELECTED_ID_TAB_PANEL.classList.remove('active');
    }
  });
};
/**
 * Opens TOP_MENU on hover over a link
 */


exports.check_filter_tags = check_filter_tags;

var open_top_menu = function open_top_menu(event) {
  var BUTTON_CATEGORY_ARR = document.querySelectorAll('.js-button-category');
  var ELEM_TARGET = event.target;
  var CATALOG_MENU = document.querySelector('.js-catalog-menu-top');

  if (ELEM_TARGET && (ELEM_TARGET.classList.contains('js-catalog-link') || ELEM_TARGET.classList.contains('js-button-category'))) {
    CATALOG_MENU && CATALOG_MENU.classList.add('open');
    BUTTON_CATEGORY_ARR && (0, _toConsumableArray2["default"])(BUTTON_CATEGORY_ARR).forEach(function (item) {
      item.classList.add('open');
    });
  }
};
/**
 * Opens TOP_MENU on hover over a link
 */


exports.open_top_menu = open_top_menu;

var close_top_menu = function close_top_menu() {
  var BUTTON_CATEGORY_ARR = document.querySelectorAll('.js-button-category');
  var CATALOG_MENU_TOP = document.querySelector('.js-catalog-menu-top');
  CATALOG_MENU_TOP.classList.remove('open');
  BUTTON_CATEGORY_ARR && (0, _toConsumableArray2["default"])(BUTTON_CATEGORY_ARR).forEach(function (item) {
    item.classList.remove('open');
  });
};

exports.close_top_menu = close_top_menu;

var fetch_display_color_slider = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(variation) {
    var _ID_PRODUCT$dataset;

    var ID_PRODUCT, JS_SLIDER_SOLO, JS_SLIDER_SOLO_NAV, havePhoto, html_big, html_small, formData, RESPONSE;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            ID_PRODUCT = document.querySelector('.js-id-product');
            JS_SLIDER_SOLO = document.querySelector('.js-slider-solo');
            JS_SLIDER_SOLO_NAV = document.querySelector('.js-slider-solo-nav');
            html_big = '';
            html_small = '';
            formData = new FormData();
            formData.append('action', 'products_colors_galleries');
            formData.append('id_product', ID_PRODUCT === null || ID_PRODUCT === void 0 ? void 0 : (_ID_PRODUCT$dataset = ID_PRODUCT.dataset) === null || _ID_PRODUCT$dataset === void 0 ? void 0 : _ID_PRODUCT$dataset.id);
            _context4.next = 10;
            return fetch(var_from_php.ajax_url, {
              method: 'POST',
              body: formData
            }).then(function (response) {
              return response.json();
            });

          case 10:
            RESPONSE = _context4.sent;

            if (RESPONSE) {
              RESPONSE.forEach(function (item) {
                if (variation.active_color === item.color.slug) {
                  if (item.gallery) {
                    havePhoto = true;
                    item.gallery.forEach(function (image) {
                      if (image) {
                        havePhoto = true;
                        html_big += "<div class=\"solo-slider__slide\">\n\t\t                        <a class=\"solo-slider__link\" data-fancybox=\"slider\"\n\t\t                           href=\"".concat(image.url, "\">\n\t\t                            <img class=\"solo-slider__img\" src=\"").concat(image.url, "\">\n\t\t                        </a>\n\t\t                    </div>");
                        html_small += "<div class=\"solo-slider__slide\">\n\t\t\t\t\t\t\t\t<img class=\"solo-slider__img  solo-slider__small\" src=\"".concat(image.url, "\" alt=\"img\">\n\t\t\t\t\t\t\t</div>");
                      }
                    });
                  } else {
                    havePhoto = !havePhoto;
                  }
                }
              });
            }

            if (!havePhoto && JS_SLIDER_SOLO && JS_SLIDER_SOLO_NAV) {
              JS_SLIDER_SOLO.innerHTML = "<div class=\"solo-slider__slide solo-slider__slide_no-photo\">\n\t\t                        \t\t NO PHOTO\n\t\t                    \t\t</div>";
              JS_SLIDER_SOLO_NAV.innerHTML = '';
            }

            if (JS_SLIDER_SOLO && JS_SLIDER_SOLO_NAV && havePhoto) {
              if (JS_SLIDER_SOLO.classList.contains('slick-initialized') && JS_SLIDER_SOLO_NAV.classList.contains('slick-initialized')) {
                JS_SLIDER_SOLO.classList.remove('slick-initialized');
                JS_SLIDER_SOLO_NAV.classList.remove('slick-initialized');
              }

              JS_SLIDER_SOLO.innerHTML = html_big;
              JS_SLIDER_SOLO_NAV.innerHTML = html_small;
              jQuery(JS_SLIDER_SOLO).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                asNavFor: '.js-slider-solo-nav',
                row: 0,
                prevArrow: jQuery('.js-gallery-prev'),
                nextArrow: jQuery('.js-gallery-next')
              });
              jQuery(JS_SLIDER_SOLO_NAV).slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: '.js-slider-solo',
                dots: false,
                arrows: false,
                centerMode: false,
                focusOnSelect: true,
                row: 0
              });
            }

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function fetch_display_color_slider(_x7) {
    return _ref4.apply(this, arguments);
  };
}(); // Create cookie


exports.fetch_display_color_slider = fetch_display_color_slider;

var setCookie = function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = exdays != 0 ? "expires=" + d.toUTCString() : "expires=0";
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}; // Delete cookie


exports.setCookie = setCookie;

var deleteCookie = function deleteCookie(cname) {
  var d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=;" + expires + ";path=/";
}; // Read cookie


exports.deleteCookie = deleteCookie;

var getCookie = function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return false;
};

exports.getCookie = getCookie;

var checkLifeTime = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(WELCOME_POPUP_COOKIE_TIME, POPUP_COOKIE_TIME) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (WELCOME_POPUP_COOKIE_TIME != POPUP_COOKIE_TIME) {
              deleteCookie('welcome_popup');
              deleteCookie('welcome_popup_time');
            }

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function checkLifeTime(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

exports.checkLifeTime = checkLifeTime;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlcnMuanMiXSwibmFtZXMiOlsic21vb3Roc2Nyb2xsIiwicG9seWZpbGwiLCJmYWRlT3V0IiwiZWwiLCJFcnJvciIsInN0eWxlIiwib3BhY2l0eSIsImZhZGUiLCJkaXNwbGF5IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZmFkZUluIiwidmFsIiwicGFyc2VGbG9hdCIsImVxdWFsSGVpZ2h0cyIsImVsZW1lbnRzU2VsZWN0b3IiLCJtaW5Pck1heCIsImhlaWdodHMiLCJlbGVtZW50c1NlbGVjdG9yQXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIml0ZW0iLCJoZWlnaHQiLCJwdXNoIiwib2Zmc2V0SGVpZ2h0IiwiY29tbW9uSGVpZ2h0IiwiTWF0aCIsIm1heCIsImFwcGx5IiwibWluIiwiZXF1YWxIZWlnaHRzX2lucm93IiwibnVtSXRlbV9pbnJvdyIsIkVMRU1FTlRTX0FSUiIsIkVMX0xFTkdUSCIsImxlbmd0aCIsImkiLCJ0ZW1wIiwic2xpY2UiLCJ0cmltUGFyYWdyYXBoIiwiaW5uZXJIVE1MIiwidHJpbSIsImlzSW5WaWV3cG9ydCIsIm9mZnNldCIsInNjcm9sbCIsIndpbmRvdyIsInNjcm9sbFkiLCJwYWdlWU9mZnNldCIsImJvdW5kc1RvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsInZpZXdwb3J0IiwiYm90dG9tIiwiaW5uZXJIZWlnaHQiLCJib3VuZHMiLCJjbGllbnRIZWlnaHQiLCJkZWJvdW5jZSIsImZuIiwidGltZSIsInRpbWVvdXQiLCJmdW5jdGlvbkNhbGwiLCJhcmd1bWVudHMiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY29weVRvQ2xpcGJvYXJkIiwicGFyZW50IiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ2YWx1ZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInNlbGVjdCIsInN1Y2Nlc3NmdWwiLCJleGVjQ29tbWFuZCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJyZW1vdmVDaGlsZCIsInZhbGlkYXRlRmllbGQiLCJmaWVsZFR5cGUiLCJwaG9uZVJFR0VYIiwibmFtZVJFR0VYIiwicG9zdGFsUkVHRVgiLCJlbWFpbFJFR0VYIiwiZHVtbXlSRUdFWCIsImNoZWNrUmVzdWx0IiwidGVzdCIsImNsb3Nlc3RfcG9seWZpbGwiLCJFbGVtZW50IiwicHJvdG90eXBlIiwiY2xvc2VzdCIsInMiLCJtYXRjaGVzIiwib3duZXJEb2N1bWVudCIsInBhcmVudEVsZW1lbnQiLCJhbmNob3JMaW5rU2Nyb2xsIiwiY2FsbGJhY2siLCJlbGVtZW50cyIsImxpbmsiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImVsX2hyZWYiLCJ0YXJnZXQiLCJub2RlTmFtZSIsImdldEF0dHJpYnV0ZSIsImRhdGFzZXQiLCJocmVmIiwiQU5DSE9SX0VMRU1FTlQiLCJxdWVyeVNlbGVjdG9yIiwib2Zmc2V0VG9wIiwiYWRkX3Byb2R1Y3RfdG9fZmF2b3JpdGVzIiwicHJvZHVjdElEIiwib3BlcmF0aW9uVHlwZSIsImZhdm9yaXRlX3Byb2R1Y3RzIiwiQ29va2llcyIsImdldCIsInNldCIsIkpTT04iLCJzdHJpbmdpZnkiLCJleHBpcmVzIiwiY29udmVydGVkQXJyIiwicGFyc2UiLCJmaWx0ZXIiLCJ1cGRhdGVfZmF2b3JpdGVzX2NvdW50IiwiY291bnRlckNvbnRhaW5lciIsIkNPT0siLCJDT1VOVF9PRl9GQVZPUklURVMiLCJFWElTVElOR19TUEFOIiwiaW5uZXJUZXh0IiwiU1BBTiIsImxvYWRfbW9yZV9wcm9kdWN0cyIsImZvcm1JRCIsInN0ZXBfcGVyX3BhZ2UiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwib3B0aW9uIiwibWV0aG9kIiwiZmV0Y2giLCJ2YXJfZnJvbV9waHAiLCJhamF4X3VybCIsInNlYXJjaF9wcm9kdWN0IiwiZWxlbSIsIkZPUk1fVEFHIiwiU0VBUkNIX1JFU1VMVFNfSU5QVVQiLCJTRUFSQ0hfUkVTVUxUU19CTE9DSyIsIkZPUk1fV1JBUFBFUiIsIlNFQVJDSF9CVVRUT04iLCJzZXRBdHRyaWJ1dGUiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwic3VjY2VzcyIsImRhdGEiLCJodG1sIiwicmVtb3ZlQXR0cmlidXRlIiwiY2hlY2tfYW5kX2xvZ2luX3VzZXIiLCJmb3JtX2luc3RhbmNlIiwiRU1BSUxfUEhPTkVfSU5QVVQiLCJUWVBFX09GX0VOVEVSRURfRUwiLCJTVUJNSVRfQlROX0VMIiwiRU1BSUxfUEhPTkVfSU5QVVRfRVJST1JfRUwiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJWQUxJREFURV9BU19FTUFJTCIsIlZBTElEQVRFX0FTX1BIT05FIiwic3RyaW5nX3RyYW5zbGF0aW9uIiwibG9jYXRpb24iLCJhY2NvdW50X3VybCIsInVwZGF0ZWRfY2FydF90b3RhbHNfZnVuYyIsIml0ZW1zQW1vdW50IiwiY2FydFRvdGFsIiwiQ1VSUkVOVF9PUkRFUl9WQUxVRSIsIkJMT0NLX0lORk8iLCJjdXJyZW50X3RvdGFsX2NhcnQiLCJjdXJyZW50X3RvdGFsX2NhcnRfdmFsdWUiLCJ0b3RhbCIsIm1pbl90b3RhbF9lbCIsIk1JTl9UT1RBTCIsIlRPVEFMX0JMT0NLX0lORk8iLCJUT1RBTF9IRUFERVJfU1RJQ0tZIiwiVE9UQUxfQkxPQ0tfSEVBREVSIiwiSEVBREVSX0NBUlRfQ09VTlQiLCJJTlBVVF9RVFlzIiwiaXRlbXNfYW1vdW50IiwicGFyc2VJbnQiLCJyZWR1Y2UiLCJhY2N1bSIsImN1cnIiLCJjdXN0b21fYWRkX3RvX2NhcnQiLCJwcm9kdWN0X2lkIiwiYW1vdW50IiwiZ2V0Rm9ybUZpZWxkcyIsInR5cGUiLCJmaWxlcyIsInNpemUiLCJmZXRjaEZpbGVkIiwiZmllbGRzQXJyYXkiLCJwdXRGaWxlSW50b0Zvcm1EYXRhIiwiZmlsZUlucHV0IiwiZGVsaXZlcnlUeXBlU3dpdGNoZXIiLCJkZWxpdmVyeUxpc3QiLCJGTEFUX1JBVEUiLCJOT1ZBX1BPU0hUQSIsIlNISVBQSU5HX0FERFJFU1NfQ09OVEFJTkVSIiwiY2hlY2tlZCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImRlbGl2ZXJ5Q2hlY2tib3hlc1N0YXRlIiwiTk9WQV9QT1NIVEFfRklFTEQiLCJGTEFUX1JBVEVfRklFTEQiLCJlbGVtX2lkIiwiaWQiLCJjaGVja2VkX2VsZW0iLCJjaGVja2JveElubmVyVGV4dFdyYXBwaW5nIiwiTEFCRUwiLCJJTlBVVCIsIkxBQkVMX1RFWFQiLCJzcGFuIiwiZ2V0QWxsVXJsUGFyYW1zIiwidXJsIiwicXVlcnlTdHJpbmciLCJzcGxpdCIsInNlYXJjaCIsIm9iaiIsImFyciIsImEiLCJwYXJhbU51bSIsInVuZGVmaW5lZCIsInBhcmFtTmFtZSIsInJlcGxhY2UiLCJ2IiwicGFyYW1WYWx1ZSIsInRvTG93ZXJDYXNlIiwiY2hlY2tfZmlsdGVyX3RhZ3MiLCJhcHBseV9maWx0ZXJfYnV0dG9uIiwiRklMVEVSU19TRVRUSU5HUyIsIkZJTFRFUlNfU0VUVElOR1NfV1JBUCIsIkpTX1RBQl9QQU5FTF9GSUxURVJfQVJSIiwiU1dJVENIRVJfRklMVEVSX0FDVElWRSIsImh0bWxfZmlsdGVyIiwiVEFCX1BBTkVMX0ZJTFRFUiIsImlkX3RhYl9wYW5lbCIsImNoZWNrZWRSYWRpbyIsInRhYl9wYW5lbF9maWx0ZXIiLCJkYXRhX3R5cGUiLCJmaWx0ZXJfdmFsIiwibGFiZWxfaW5wdXQiLCJUQUJfU1dJVENIRVJfRklMVEVSIiwidHlwZV90ZXh0IiwiU0VMRUNURURfSURfVEFCX1BBTkVMIiwib3Blbl90b3BfbWVudSIsIkJVVFRPTl9DQVRFR09SWV9BUlIiLCJFTEVNX1RBUkdFVCIsIkNBVEFMT0dfTUVOVSIsImNvbnRhaW5zIiwiY2xvc2VfdG9wX21lbnUiLCJDQVRBTE9HX01FTlVfVE9QIiwiZmV0Y2hfZGlzcGxheV9jb2xvcl9zbGlkZXIiLCJ2YXJpYXRpb24iLCJJRF9QUk9EVUNUIiwiSlNfU0xJREVSX1NPTE8iLCJKU19TTElERVJfU09MT19OQVYiLCJodG1sX2JpZyIsImh0bWxfc21hbGwiLCJSRVNQT05TRSIsImFjdGl2ZV9jb2xvciIsImNvbG9yIiwic2x1ZyIsImdhbGxlcnkiLCJoYXZlUGhvdG8iLCJpbWFnZSIsImpRdWVyeSIsInNsaWNrIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhcnJvd3MiLCJhc05hdkZvciIsInJvdyIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsImRvdHMiLCJjZW50ZXJNb2RlIiwiZm9jdXNPblNlbGVjdCIsInNldENvb2tpZSIsImNuYW1lIiwiY3ZhbHVlIiwiZXhkYXlzIiwiZCIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvVVRDU3RyaW5nIiwiY29va2llIiwiZGVsZXRlQ29va2llIiwiZ2V0Q29va2llIiwibmFtZSIsImRlY29kZWRDb29raWUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJjYSIsImMiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwiY2hlY2tMaWZlVGltZSIsIldFTENPTUVfUE9QVVBfQ09PS0lFX1RJTUUiLCJQT1BVUF9DT09LSUVfVElNRSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0FBLGlDQUFhQyxRQUFiO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLFNBQVNDLE9BQVQsQ0FBa0JDLEVBQWxCLEVBQXVCO0FBRTdCLE1BQUssQ0FBQ0EsRUFBTixFQUFXO0FBQ1YsVUFBTUMsS0FBSyxDQUFFLDBEQUFGLENBQVg7QUFDQTs7QUFFREQsRUFBQUEsRUFBRSxDQUFDRSxLQUFILENBQVNDLE9BQVQsR0FBbUIsQ0FBbkI7O0FBRUEsR0FBQyxTQUFTQyxJQUFULEdBQWdCO0FBQ2hCLFFBQUssQ0FBQ0osRUFBRSxDQUFDRSxLQUFILENBQVNDLE9BQVQsSUFBb0IsRUFBckIsSUFBMkIsQ0FBaEMsRUFBb0M7QUFDbkNILE1BQUFBLEVBQUUsQ0FBQ0UsS0FBSCxDQUFTRyxPQUFULEdBQW1CLE1BQW5CO0FBQ0Es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QUFDLENBQUNFLFNBQUYsQ0FBWSxDQUFaLENBQUo7QUFDRDs7QUFDRCxRQUFJRixDQUFDLENBQUNHLE9BQUYsQ0FBVVAsSUFBVixLQUFtQixDQUF2QixFQUEwQjtBQUN4QixhQUFPSSxDQUFDLENBQUNFLFNBQUYsQ0FBWU4sSUFBSSxDQUFDeFEsTUFBakIsRUFBeUI0USxDQUFDLENBQUM1USxNQUEzQixDQUFQO0FBQ0Q7QUFDRjs7QUFDRCxTQUFPLEtBQVA7QUFDQSxDQWRNOzs7O0FBZUEsSUFBTWdSLGFBQWE7QUFBQSw0RkFBRyxrQkFBT0MseUJBQVAsRUFBa0NDLGlCQUFsQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQzVCLGdCQUFHRCx5QkFBeUIsSUFBSUMsaUJBQWhDLEVBQWtEO0FBQ2pEWixjQUFBQSxZQUFZLENBQUMsZUFBRCxDQUFaO0FBQ0FBLGNBQUFBLFlBQVksQ0FBQyxvQkFBRCxDQUFaO0FBQ0E7O0FBSjJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQWJVLGFBQWE7QUFBQTtBQUFBO0FBQUEsR0FBbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc21vb3Roc2Nyb2xsIGZyb20gJ3Ntb290aHNjcm9sbC1wb2x5ZmlsbCc7XG5cbi8vIGtpY2sgb2ZmIHRoZSBwb2x5ZmlsbCFcbnNtb290aHNjcm9sbC5wb2x5ZmlsbCgpO1xuXG4vKipcbiAqIEZhZGUgT3V0IG1ldGhvZFxuICogQHBhcmFtIGVsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmYWRlT3V0KCBlbCApIHtcblxuXHRpZiAoICFlbCApIHtcblx0XHR0aHJvdyBFcnJvciggJ1wiZmFkZU91dCBmdW5jdGlvbiAtIFwiWW91IGRpZG5cXCd0IGFkZCByZXF1aXJlZCBwYXJhbWV0ZXJzJyApO1xuXHR9XG5cblx0ZWwuc3R5bGUub3BhY2l0eSA9IDE7XG5cblx0KGZ1bmN0aW9uIGZhZGUoKSB7XG5cdFx0aWYgKCAoZWwuc3R5bGUub3BhY2l0eSAtPSAuMSkgPCAwICkge1xuXHRcdFx0ZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGZhZGUgKTtcblx0XHR9XG5cdH0pKCk7XG59XG5cblxuLyoqXG4gKiBGYWRlIEluIG1ldGhvZFxuICogQHBhcmFtIGVsICAgICAgLSBlbGVtZW50IHRoYXQgbmVlZCB0byBmYWRlIGluXG4gKiBAcGFyYW0gZGlzcGxheSAtIGRpc3BsYXkgdmFyaWFudFxuICovXG5leHBvcnQgZnVuY3Rpb24gZmFkZUluKCBlbCwgZGlzcGxheSApIHtcblxuXHRpZiAoICFlbCApIHtcblx0XHR0aHJvdyBFcnJvciggJ1wiZmFkZUluIGZ1bmN0aW9uIC0gXCJZb3UgZGlkblxcJ3QgYWRkIHJlcXVpcmVkIHBhcmFtZXRlcnMnICk7XG5cdH1cblxuXHRlbC5zdHlsZS5vcGFjaXR5ID0gMDtcblx0ZWwuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXkgfHwgXCJibG9ja1wiO1xuXG5cdChmdW5jdGlvbiBmYWRlKCkge1xuXHRcdGxldCB2YWwgPSBwYXJzZUZsb2F0KCBlbC5zdHlsZS5vcGFjaXR5ICk7XG5cdFx0aWYgKCAhKCh2YWwgKz0gLjEpID4gMSkgKSB7XG5cdFx0XHRlbC5zdHlsZS5vcGFjaXR5ID0gdmFsO1xuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmYWRlICk7XG5cdFx0fVxuXHR9KSgpO1xufVxuXG5cbi8qKlxuICogIFNldCBlcXVhbCBoZWlnaHQgdG8gc2VsZWN0ZWQgZWxlbWVudHMgY2FsY3VsYXRlZCBhcyBiaWdnZXIgaGVpZ2h0XG4gKiBAcGFyYW0gZWxlbWVudHNTZWxlY3RvciAgLSBzZWxlY3RvciBmb3Igc2VhcmNoaW5nIGVsZW1lbnRzXG4gKiBAcGFyYW0gbWluT3JNYXggICAgICAgICAgLSBEZWZpbmUgd2hhdCBkaW1lbnNpb24gc2hvdWxkIGJlIGNhbGN1bGF0ZWQgKG1pbkhlaWdodCBvciBtYXhIZWlnaHQpXG4gKiBAcmV0dXJucyBlbGVtZW50c1NlbGVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbEhlaWdodHMoIGVsZW1lbnRzU2VsZWN0b3IsIG1pbk9yTWF4ID0gJ21heCcgKSB7XG5cblx0aWYgKCAhZWxlbWVudHNTZWxlY3RvciApIHtcblx0XHR0aHJvdyBFcnJvciggJ1wiZXF1YWxIZWlnaHRzIGZ1bmN0aW9uIC0gXCJZb3UgZGlkblxcJ3QgYWRkIHJlcXVpcmVkIHBhcmFtZXRlcnMnICk7XG5cdH1cblxuXHRsZXQgaGVpZ2h0cyA9IFtdO1xuXHRsZXQgZWxlbWVudHNTZWxlY3RvckFyciA9IChBcnJheS5pc0FycmF5KCBlbGVtZW50c1NlbGVjdG9yICkpXG5cdFx0PyBlbGVtZW50c1NlbGVjdG9yXG5cdFx0OiBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggZWxlbWVudHNTZWxlY3RvciApXTtcblxuXHRlbGVtZW50c1NlbGVjdG9yQXJyLmZvckVhY2goICggaXRlbSApID0+IHtcblx0XHRpdGVtLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcblx0fSApO1xuXG5cdGVsZW1lbnRzU2VsZWN0b3JBcnIuZm9yRWFjaCggKCBpdGVtICkgPT4ge1xuXHRcdGhlaWdodHMucHVzaCggaXRlbS5vZmZzZXRIZWlnaHQgKTtcblx0fSApO1xuXG5cdGxldCBjb21tb25IZWlnaHQgPSAobWluT3JNYXggPT09ICdtYXgnKVxuXHRcdD8gTWF0aC5tYXguYXBwbHkoIDAsIGhlaWdodHMgKVxuXHRcdDogTWF0aC5taW4uYXBwbHkoIDAsIGhlaWdodHMgKTtcblxuXHRlbGVtZW50c1NlbGVjdG9yQXJyLmZvckVhY2goICggaXRlbSApID0+IHtcblx0XHRpdGVtLnN0eWxlLmhlaWdodCA9IGNvbW1vbkhlaWdodCArICdweCc7XG5cdH0gKTtcblxuXHRyZXR1cm4gZWxlbWVudHNTZWxlY3RvcjtcblxufVxuXG5cbi8qKlxuICogU2V0IGVxdWFsIGhlaWdodCB0byBzZWxlY3RlZCBlbGVtZW50cyBpbiByb3cgY2FsY3VsYXRlZCBhcyBiaWdnZXIgaGVpZ2h0XG4gKiBAcGFyYW0gZWxlbWVudHNTZWxlY3RvciAtIHNlbGVjdG9yIGZvciBzZWFyY2hpbmcgZWxlbWVudHNcbiAqIEBwYXJhbSBudW1JdGVtX2lucm93ICAgIC0gSXRlbXMgYW1vdW50IHRoYXQgd2lsbCBiZSB1c2VkIGZvciBlYWNoIGVxdWFsIGhlaWdodCBpdGVyYXRpb25cbiAqIEByZXR1cm5zIGVsZW1lbnRzU2VsZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVxdWFsSGVpZ2h0c19pbnJvdyggZWxlbWVudHNTZWxlY3RvciwgbnVtSXRlbV9pbnJvdyApIHtcblxuXHRpZiAoICFlbGVtZW50c1NlbGVjdG9yIHx8ICFudW1JdGVtX2lucm93ICkge1xuXHRcdHRocm93IEVycm9yKCAnXCJlcXVhbEhlaWdodHNfaW5yb3cgZnVuY3Rpb24gLSBcIllvdSBkaWRuXFwndCBhZGQgcmVxdWlyZWQgcGFyYW1ldGVycycgKTtcblx0fVxuXG5cdGNvbnN0IEVMRU1FTlRTX0FSUiA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCBlbGVtZW50c1NlbGVjdG9yICldO1xuXHRjb25zdCBFTF9MRU5HVEggPSBFTEVNRU5UU19BUlIubGVuZ3RoO1xuXG5cdGZvciAoIGxldCBpID0gMDsgaSA8PSBFTF9MRU5HVEggLyBudW1JdGVtX2lucm93OyBpKysgKSB7XG5cdFx0bGV0IHRlbXAgPSBFTEVNRU5UU19BUlIuc2xpY2UoIGkgKiBudW1JdGVtX2lucm93LCBpICogbnVtSXRlbV9pbnJvdyArIG51bUl0ZW1faW5yb3cgKTtcblx0XHRlcXVhbEhlaWdodHMoIHRlbXAgKTtcblx0fVxuXG5cdHJldHVybiBlbGVtZW50c1NlbGVjdG9yO1xufVxuXG5cbi8qKlxuICogVHJpbSBhbGwgcGFyYWdyYXBoIGZyb20gdW5uZWVkZWQgc3BhY2Ugc3ltYm9sXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmltUGFyYWdyYXBoKCkge1xuXHRbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJ3AnICldLmZvckVhY2goIGl0ZW0gPT4ge1xuXHRcdGl0ZW0uaW5uZXJIVE1MID0gaXRlbS5pbm5lckhUTUwudHJpbSgpO1xuXHR9ICk7XG59XG5cblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGluIHZpZXdwb3J0XG4gKiBAcGFyYW0gZWxcbiAqIEBwYXJhbSBvZmZzZXQgLSBBZGp1c3RhYmxlIG9mZnNldCB2YWx1ZSB3aGVuIGVsZW1lbnQgYmVjb21lcyB2aXNpYmxlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW5WaWV3cG9ydCggZWwsIG9mZnNldCA9IDEwMCApIHtcblxuXHRpZiAoICFlbCApIHtcblx0XHR0aHJvdyBFcnJvciggJ1wiaXNJblZpZXdwb3J0IGZ1bmN0aW9uIC0gXCJZb3UgZGlkblxcJ3QgYWRkIHJlcXVpcmVkIHBhcmFtZXRlcnMnICk7XG5cdH1cblxuXHRjb25zdCBzY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cdGNvbnN0IGJvdW5kc1RvcCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIG9mZnNldCArIHNjcm9sbDtcblxuXHRjb25zdCB2aWV3cG9ydCA9IHtcblx0XHR0b3A6IHNjcm9sbCxcblx0XHRib3R0b206IHNjcm9sbCArIHdpbmRvdy5pbm5lckhlaWdodCxcblx0fTtcblxuXHRjb25zdCBib3VuZHMgPSB7XG5cdFx0dG9wOiBib3VuZHNUb3AsXG5cdFx0Ym90dG9tOiBib3VuZHNUb3AgKyBlbC5jbGllbnRIZWlnaHQsXG5cdH07XG5cblx0cmV0dXJuIChib3VuZHMuYm90dG9tID49IHZpZXdwb3J0LnRvcCAmJiBib3VuZHMuYm90dG9tIDw9IHZpZXdwb3J0LmJvdHRvbSlcblx0XHR8fCAoYm91bmRzLnRvcCA8PSB2aWV3cG9ydC5ib3R0b20gJiYgYm91bmRzLnRvcCA+PSB2aWV3cG9ydC50b3ApO1xuXG59XG5cblxuLyoqXG4gKiBEZWJvdW5jZSBmdW5jdGlvblxuICogQHBhcmFtIGZuICAgICAtIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkXG4gKiBAcGFyYW0gdGltZSAgIC0gdGltZSBkZWxheVxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZGVib3VuY2UgPSAoIGZuLCB0aW1lID0gMTAwMCApID0+IHtcblxuXHRpZiAoICFmbiApIHtcblx0XHR0aHJvdyBFcnJvciggJ1wiZGVib3VuY2UgZnVuY3Rpb24gLSBcIllvdSBkaWRuXFwndCBhZGQgcmVxdWlyZWQgcGFyYW1ldGVycycgKTtcblx0fVxuXG5cdGxldCB0aW1lb3V0O1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgZnVuY3Rpb25DYWxsID0gKCkgPT4gZm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXG5cdFx0Y2xlYXJUaW1lb3V0KCB0aW1lb3V0ICk7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uQ2FsbCwgdGltZSApO1xuXHR9XG59O1xuXG5cbi8qKlxuICogQ29weSB0byBjbGlwYm9hcmRcbiAqIEBwYXJhbSBlbGVtZW50IC0gIGVsZW1lbnQgdGhhdCAgY29udGFpbiB2YWx1ZSB0byBjb3B5XG4gKi9cbmV4cG9ydCBjb25zdCBjb3B5VG9DbGlwYm9hcmQgPSAoIHBhcmVudCwgZWxlbWVudCApID0+IHtcblxuXHRpZiAoICFwYXJlbnQgfHwgIWVsZW1lbnQgKSB7XG5cdFx0dGhyb3cgRXJyb3IoICdcImNvcHlUb0NsaXBib2FyZCBmdW5jdGlvbiAtIFwiWW91IGRpZG5cXCd0IGFkZCByZXF1aXJlZCBwYXJhbWV0ZXJzJyApO1xuXHR9XG5cblx0Y29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAndGV4dGFyZWEnICk7XG5cdGVsLnZhbHVlID0gZWxlbWVudC52YWx1ZTtcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggZWwgKTtcblx0ZWwuc2VsZWN0KCk7XG5cblx0dHJ5IHtcblx0XHRjb25zdCBzdWNjZXNzZnVsID0gZG9jdW1lbnQuZXhlY0NvbW1hbmQoICdjb3B5JyApO1xuXG5cdFx0aWYgKCBzdWNjZXNzZnVsICkge1xuXHRcdFx0cGFyZW50LmNsYXNzTGlzdC5hZGQoICdjb3BpZWQnICk7XG5cblx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcblx0XHRcdFx0cGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoICdjb3BpZWQnICk7XG5cdFx0XHR9LCAzMDAwICk7XG5cdFx0fVxuXHR9IGNhdGNoICggZXJyICkge1xuXHRcdGNvbnNvbGUubG9nKCAnT29wcywgdW5hYmxlIHRvIGNvcHknICk7XG5cdH1cblxuXHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKCBlbCApO1xufTtcblxuXG4vKipcbiAqIFRlc3QgdmFsdWUgd2l0aCByZWdleFxuICogQHBhcmFtIHsobmFtZXxlbWFpbHxwaG9uZXxwb3N0YWwpfSBmaWVsZFR5cGUgIC0gVGhlIGFsbG93ZWQgdHlwZSBvZiB0aGUgZmllbGRzXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUZpZWxkID0gKCBmaWVsZFR5cGUgPSBudWxsLCB2YWx1ZSA9IG51bGwgKSA9PiB7XG5cblx0aWYgKCAhZmllbGRUeXBlIHx8ICF2YWx1ZSApIHtcblx0XHR0aHJvdyBFcnJvciggJ1widmFsaWRhdGVGaWVsZCBmdW5jdGlvbiAtIFwiWW91IGRpZG5cXCd0IGFkZCByZXF1aXJlZCBwYXJhbWV0ZXJzJyApO1xuXHR9XG5cblx0Y29uc3QgcGhvbmVSRUdFWCA9IC9eWzAtOVxcK117NiwxM30kLztcblx0Y29uc3QgbmFtZVJFR0VYID0gL15bYS16QS1a0LAt0Y/QkC3Qr1xcc117MiwzMH0kLztcblx0Y29uc3QgcG9zdGFsUkVHRVggPSAvXltBLVpdezEsMn1bMC05XXsxLDJ9ID9bMC05XVtBLVpdezJ9JC9pO1xuXHRjb25zdCBlbWFpbFJFR0VYID0gL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDN9KSskLztcblx0Y29uc3QgZHVtbXlSRUdFWCA9IC9eLiskLztcblxuXHRsZXQgY2hlY2tSZXN1bHQgPSBmYWxzZTtcblxuXHRzd2l0Y2ggKCBmaWVsZFR5cGUgKSB7XG5cdFx0Y2FzZSAnbmFtZSc6XG5cdFx0XHRjaGVja1Jlc3VsdCA9IG5hbWVSRUdFWC50ZXN0KCB2YWx1ZSApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAncGhvbmUnOlxuXHRcdFx0Y2hlY2tSZXN1bHQgPSBwaG9uZVJFR0VYLnRlc3QoIHZhbHVlICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdwb3N0YWwnOlxuXHRcdFx0Y2hlY2tSZXN1bHQgPSBwb3N0YWxSRUdFWC50ZXN0KCB2YWx1ZSApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnZW1haWwnOlxuXHRcdFx0Y2hlY2tSZXN1bHQgPSBlbWFpbFJFR0VYLnRlc3QoIHZhbHVlICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdwcmljZSc6XG5cdFx0XHRjaGVja1Jlc3VsdCA9IGR1bW15UkVHRVgudGVzdCggdmFsdWUgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2FpbSc6XG5cdFx0XHRjaGVja1Jlc3VsdCA9IGR1bW15UkVHRVgudGVzdCggdmFsdWUgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2RhdGUnOlxuXHRcdFx0Y2hlY2tSZXN1bHQgPSBkdW1teVJFR0VYLnRlc3QoIHZhbHVlICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdzdWJqZWN0Jzpcblx0XHRcdGNoZWNrUmVzdWx0ID0gZHVtbXlSRUdFWC50ZXN0KCB2YWx1ZSApO1xuXHRcdFx0YnJlYWs7XG5cdH1cblxuXHRyZXR1cm4gY2hlY2tSZXN1bHQ7XG5cbn07XG5cblxuLyoqXG4gKiBQb2x5ZmlsbCBmb3IgY2xvc2VzdCBtZXRob2RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsb3Nlc3RfcG9seWZpbGwoKSB7XG5cdGlmICggd2luZG93LkVsZW1lbnQgJiYgIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgKSB7XG5cdFx0RWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCA9XG5cdFx0XHRmdW5jdGlvbiAoIHMgKSB7XG5cdFx0XHRcdGxldCBtYXRjaGVzID0gKHRoaXMuZG9jdW1lbnQgfHwgdGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKCBzICksXG5cdFx0XHRcdFx0aSxcblx0XHRcdFx0XHRlbCA9IHRoaXM7XG5cdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRpID0gbWF0Y2hlcy5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCAtLWkgPj0gMCAmJiBtYXRjaGVzLml0ZW0oIGkgKSAhPT0gZWwgKSB7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fSB3aGlsZSAoIChpIDwgMCkgJiYgKGVsID0gZWwucGFyZW50RWxlbWVudCkgKTtcblx0XHRcdFx0cmV0dXJuIGVsO1xuXHRcdFx0fTtcblx0fVxufVxuXG5cbi8qKlxuICogU21vb3RoIHNjcm9sbCB0byBlbGVtZW50IG9uIHBhZ2VcbiAqIEBwYXJhbSBlbGVtZW50c1NlbGVjdG9yIHN0cmluZyAtLSBjc3Mgc2VsZWN0b3IgKGFuY2hvciBsaW5rcylcbiAqIEBwYXJhbSBjYWxsYmFjayBmdW5jdGlvbiAgICAgICAtLSBjYWxsYmFjayBmb3Igc29tZSBhZGRpdGlvbmFsIGFjdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFuY2hvckxpbmtTY3JvbGwoIGVsZW1lbnRzU2VsZWN0b3IsIGNhbGxiYWNrID0gJycgKSB7XG5cblx0aWYgKCAhZWxlbWVudHNTZWxlY3RvciApIHtcblx0XHR0aHJvdyBFcnJvciggJ1wiYW5jaG9yTGlua1Njcm9sbCBmdW5jdGlvbiAtIFwiWW91IGRpZG5cXCd0IGFkZCBjb3JyZWN0IHNlbGVjdG9yIGZvciBhbmNob3IgbGlua3MnICk7XG5cdH1cblxuXHRjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIGVsZW1lbnRzU2VsZWN0b3IgKTtcblxuXHQoZWxlbWVudHMpICYmIFsuLi5lbGVtZW50c10uZm9yRWFjaCggbGluayA9PiB7XG5cblx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsICggZXZlbnQgKSA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRsZXQgZWxfaHJlZiA9IChldmVudC50YXJnZXQubm9kZU5hbWUgPT09ICdBJylcblx0XHRcdFx0PyBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCAnaHJlZicgKVxuXHRcdFx0XHQ6IGV2ZW50LnRhcmdldC5kYXRhc2V0LmhyZWY7XG5cblx0XHRcdGNvbnN0IEFOQ0hPUl9FTEVNRU5UID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggZWxfaHJlZiApO1xuXG5cdFx0XHQoQU5DSE9SX0VMRU1FTlQpICYmIHdpbmRvdy5zY3JvbGwoIHtcblx0XHRcdFx0J2JlaGF2aW9yJzogJ3Ntb290aCcsXG5cdFx0XHRcdCdsZWZ0JzogMCxcblx0XHRcdFx0J3RvcCc6IEFOQ0hPUl9FTEVNRU5ULm9mZnNldFRvcFxuXHRcdFx0fSApO1xuXG5cdFx0XHRpZiAoIGNhbGxiYWNrICkgY2FsbGJhY2soKTtcblxuXHRcdH0gKTtcblxuXHR9ICk7XG5cbn1cblxuXG4vKipcbiAqIEFkZC9yZW1vdmUgcHJvZHVjdCBmcm9tIEZhdm9yaXRlIGxpc3RcbiAqIEBwYXJhbSBwcm9kdWN0SURcbiAqIEBwYXJhbSBvcGVyYXRpb25UeXBlXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRfcHJvZHVjdF90b19mYXZvcml0ZXMgPSAoIHByb2R1Y3RJRCwgb3BlcmF0aW9uVHlwZSApID0+IHtcblx0aWYgKCAhcHJvZHVjdElEICkgcmV0dXJuO1xuXG5cdGxldCBmYXZvcml0ZV9wcm9kdWN0cyA9IENvb2tpZXMuZ2V0KCAnZmF2b3JpdGVfcHJvZHVjdHMnICk7XG5cblx0aWYgKCAhZmF2b3JpdGVfcHJvZHVjdHMgJiYgb3BlcmF0aW9uVHlwZSA9PT0gJ2FkZCcgKSB7XG5cdFx0Q29va2llcy5zZXQoICdmYXZvcml0ZV9wcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KCBbcHJvZHVjdElEXSApLCB7ZXhwaXJlczogMzB9ICk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0bGV0IGNvbnZlcnRlZEFyciA9IEpTT04ucGFyc2UoIGZhdm9yaXRlX3Byb2R1Y3RzICk7XG5cblx0c3dpdGNoICggb3BlcmF0aW9uVHlwZSApIHtcblx0XHRjYXNlICdyZW1vdmUnOlxuXHRcdFx0Y29udmVydGVkQXJyID0gY29udmVydGVkQXJyLmZpbHRlciggaXRlbSA9PiAraXRlbSAhPT0gK3Byb2R1Y3RJRCk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdhZGQnOlxuXHRcdFx0Y29udmVydGVkQXJyLnB1c2goIHByb2R1Y3RJRCApO1xuXHRcdFx0YnJlYWs7XG5cdH1cblxuXHRDb29raWVzLnNldCggJ2Zhdm9yaXRlX3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoIGNvbnZlcnRlZEFyciApLCB7ZXhwaXJlczogMzB9IClcblx0cmV0dXJuO1xufVxuXG5leHBvcnQgY29uc3QgdXBkYXRlX2Zhdm9yaXRlc19jb3VudCA9IChjb3VudGVyQ29udGFpbmVyKSA9PiB7XG5cdGlmKCAhY291bnRlckNvbnRhaW5lciApIHJldHVybjtcblx0XHRjb25zdCBDT09LID0gQ29va2llcy5nZXQoICdmYXZvcml0ZV9wcm9kdWN0cycgKTtcblx0XHRjb25zdCBDT1VOVF9PRl9GQVZPUklURVMgPVx0KENPT0spID8gSlNPTi5wYXJzZShDT09LKSA6IG51bGw7XG5cblx0XHRjb25zdCBFWElTVElOR19TUEFOID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhdm9yaXRlX2NvdW50Jyk7XG5cblxuXHRcdGlmKEVYSVNUSU5HX1NQQU4gJiYgQ09VTlRfT0ZfRkFWT1JJVEVTICYmICgrQ09VTlRfT0ZfRkFWT1JJVEVTLmxlbmd0aCA8IDEpKSB7XG5cdFx0XHRFWElTVElOR19TUEFOLnJlbW92ZSgpO1xuXHRcdH1cblxuXHRcdGlmKEVYSVNUSU5HX1NQQU4gJiYgQ09VTlRfT0ZfRkFWT1JJVEVTICYmICgrQ09VTlRfT0ZfRkFWT1JJVEVTLmxlbmd0aCkpIHtcblx0XHRcdEVYSVNUSU5HX1NQQU4uaW5uZXJUZXh0ID0gSlNPTi5wYXJzZShDb29raWVzLmdldCggJ2Zhdm9yaXRlX3Byb2R1Y3RzJyApKS5sZW5ndGg7XG5cblx0XHR9XG5cblx0XHRpZiggIUVYSVNUSU5HX1NQQU4gJiYgQ09VTlRfT0ZfRkFWT1JJVEVTICYmICgrQ09VTlRfT0ZfRkFWT1JJVEVTLmxlbmd0aCA+IDApKXtcblx0XHRcdGNvbnN0IFNQQU4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0XHRTUEFOLmNsYXNzTGlzdC5hZGQoJ2Zhdm9yaXRlX2NvdW50Jyk7XG5cdFx0XHRTUEFOLmlubmVyVGV4dCA9IEpTT04ucGFyc2UoQ29va2llcy5nZXQoICdmYXZvcml0ZV9wcm9kdWN0cycgKSkubGVuZ3RoO1xuXHRcdFx0Y291bnRlckNvbnRhaW5lci5hcHBlbmRDaGlsZChTUEFOKTtcblx0XHR9XG59XG4vKipcbiAqIFNlbmQgcHJvZHVjdCBJRCB0byBzdG9yZSBhcyBGYXZvcml0ZSBwcm9kdWN0XG4gKiBAcGFyYW0gZm9ybUVsZW1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRfbW9yZV9wcm9kdWN0cyA9IGFzeW5jICggZm9ybUlELCBvZmZzZXQsIHN0ZXBfcGVyX3BhZ2UgKSA9PiB7XG5cdGlmICggIWZvcm1JRCB8fCAhb2Zmc2V0ICkge1xuXHRcdGNvbnNvbGUubG9nKCAnU29tZSBvZiBwYXJhbWV0ZXIgYXJlIG1pc3NlZCAoZm9ybUlELCBvZmZzZXQpJyApO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBmb3JtSUQgKSApO1xuXHRmb3JtRGF0YS5hcHBlbmQoICdhY3Rpb24nLCAnbG9hZF9tb3JlX3Byb2R1Y3RzJyApO1xuXHRmb3JtRGF0YS5hcHBlbmQoICdvZmZzZXQnLCBvZmZzZXQgKTtcblxuXHRjb25zdCBvcHRpb24gPSB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0Ym9keTogZm9ybURhdGEsXG5cdH1cblx0cmV0dXJuIGF3YWl0IGZldGNoKCB2YXJfZnJvbV9waHAuYWpheF91cmwsIG9wdGlvbiApO1xufVxuXG5cbi8qKlxuICogU2VhcmNoIHByb2R1Y3QgcmVxdWVzdCBmdW5jdGlvblxuICogQHBhcmFtIGVsZW1cbiAqL1xuZXhwb3J0IGNvbnN0IHNlYXJjaF9wcm9kdWN0ID0gKCBlbGVtICkgPT4ge1xuXG5cdGlmICggIWVsZW0gKSB7XG5cdFx0dGhyb3cgRXJyb3IoICdcInNlYXJjaF9wcm9kdWN0XCIgZnVuY3Rpb24gLSBZb3UgZGlkblxcJ3QgYWRkIHJlcXVpcmVkIHBhcmFtZXRlcnMnICk7XG5cdH1cblxuXHRjb25zdCBGT1JNX1RBRyA9IGVsZW0uY2xvc2VzdCggJy5qcy1ib3gtc2VhcmNoJyApO1xuXHRjb25zdCBTRUFSQ0hfUkVTVUxUU19JTlBVVCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcuanMtc2VhcmNoLXJlc3VsdHMtaW5wdXQnICk7XG5cdGNvbnN0IFNFQVJDSF9SRVNVTFRTX0JMT0NLID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5qcy1zZWFyY2gtcmVzdWx0JyApO1xuXHRjb25zdCBGT1JNX1dSQVBQRVIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLmpzLWZvcm0td3JhcHBlcicgKTtcblx0Y29uc3QgU0VBUkNIX0JVVFRPTiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcuanMtc2VhcmNoLWJ1dHRvbicgKTtcblxuXHRsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoIEZPUk1fVEFHICk7XG5cblx0aWYgKCAhRk9STV9UQUcgKSB7XG5cdFx0dGhyb3cgRXJyb3IoICdcInNlYXJjaF9wcm9kdWN0XCIgZnVuY3Rpb24gLSBGT1JNX1RBRyBjYW5cXCd0IGJlIGZvdW5kICcgKTtcblx0fVxuXG5cdChTRUFSQ0hfUkVTVUxUU19JTlBVVClcblx0JiYgU0VBUkNIX1JFU1VMVFNfSU5QVVQuc2V0QXR0cmlidXRlKCAnZGlzYWJsZWQnLCAnZGlzYWJsZWQnICk7XG5cblx0Zm9ybURhdGEuYXBwZW5kKCAnYWN0aW9uJywgJ2dldF9zZWFyY2hfcmVzdWx0cycgKTtcblx0aWYgKCBTRUFSQ0hfUkVTVUxUU19JTlBVVC52YWx1ZSAhPT0gXCJcIiApIHtcblx0XHRmZXRjaCggdmFyX2Zyb21fcGhwLmFqYXhfdXJsLFxuXHRcdFx0e1xuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0Ym9keTogZm9ybURhdGEsXG5cdFx0XHR9IClcblx0XHRcdC50aGVuKCByZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkgKVxuXHRcdFx0LnRoZW4oIHJlc3BvbnNlID0+IHtcblx0XHRcdFx0aWYgKCByZXNwb25zZS5zdWNjZXNzICYmIHJlc3BvbnNlLmRhdGEgIT09IFwiXCIgKSB7XG5cdFx0XHRcdFx0aWYgKCBTRUFSQ0hfUkVTVUxUU19CTE9DSyApIHtcblx0XHRcdFx0XHRcdFNFQVJDSF9SRVNVTFRTX0JMT0NLLmlubmVySFRNTCA9IHJlc3BvbnNlLmRhdGEuaHRtbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRGT1JNX1dSQVBQRVIuY2xhc3NMaXN0LmFkZCggJ29wZW4nICk7XG5cdFx0XHRcdFx0U0VBUkNIX0JVVFRPTi5jbGFzc0xpc3QuYWRkKCAnb3BlbicgKTtcblx0XHRcdFx0XHRTRUFSQ0hfUkVTVUxUU19CTE9DSy5jbGFzc0xpc3QuYWRkKCAnb3BlbicgKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdEZPUk1fV1JBUFBFUi5jbGFzc0xpc3QuYWRkKCAnb3BlbicgKTtcblx0XHRcdFx0XHRTRUFSQ0hfQlVUVE9OLmNsYXNzTGlzdC5hZGQoICdvcGVuJyApO1xuXHRcdFx0XHRcdFNFQVJDSF9SRVNVTFRTX0JMT0NLLmNsYXNzTGlzdC5hZGQoICdvcGVuJyApO1xuXHRcdFx0XHRcdFNFQVJDSF9SRVNVTFRTX0JMT0NLLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cInNlYXJjaC1ib3hfX3NlYXJjaC1ub3QtZm91bmRcIj7QndC40YfQtdCz0L4g0L3QtSDQvdCw0LnQtNC10L3QvjwvcD4nO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0U0VBUkNIX1JFU1VMVFNfSU5QVVQucmVtb3ZlQXR0cmlidXRlKCAnZGlzYWJsZWQnICk7XG5cdFx0XHR9ICk7XG5cdH0gZWxzZSB7XG5cdFx0KEZPUk1fV1JBUFBFUikgJiYgRk9STV9XUkFQUEVSLmNsYXNzTGlzdC5yZW1vdmUoICdvcGVuJyApO1xuXHRcdChTRUFSQ0hfQlVUVE9OKSAmJiBGT1JNX1dSQVBQRVIuY2xhc3NMaXN0LnJlbW92ZSggJ29wZW4nICk7XG5cdFx0KFNFQVJDSF9SRVNVTFRTX0JMT0NLKSAmJiBTRUFSQ0hfUkVTVUxUU19CTE9DSy5jbGFzc0xpc3QucmVtb3ZlKCAnb3BlbicgKTtcblx0XHQoU0VBUkNIX1JFU1VMVFNfSU5QVVQpICYmIFNFQVJDSF9SRVNVTFRTX0lOUFVULnJlbW92ZUF0dHJpYnV0ZSggJ2Rpc2FibGVkJyApO1xuXHR9XG59XG5cblxuLyoqXG4gKiBDaGVjayBhbmQgbG9naW4gdXNlciBmdW5jdGlvbmFsaXR5XG4gKiBAcGFyYW0gZm9ybV9pbnN0YW5jZVxuICovXG5leHBvcnQgY29uc3QgY2hlY2tfYW5kX2xvZ2luX3VzZXIgPSBhc3luYyAoIGZvcm1faW5zdGFuY2UgKSA9PiB7XG5cblx0aWYgKCAhZm9ybV9pbnN0YW5jZSApIHtcblx0XHR0aHJvdyBFcnJvciggJ1wiY2hlY2tfYW5kX2xvZ2luX3VzZXJcIiBmdW5jdGlvbiAtIFlvdSBkaWRuXFwndCBhZGQgcmVxdWlyZWQgcGFyYW1ldGVycycgKTtcblx0fVxuXG5cdGNvbnN0IEVNQUlMX1BIT05FX0lOUFVUID0gZm9ybV9pbnN0YW5jZVsnbG9naW4tZW1haWwtcGhvbmUnXTtcblx0Y29uc3QgVFlQRV9PRl9FTlRFUkVEX0VMID0gZm9ybV9pbnN0YW5jZVsndHlwZS1vZi1lbnRlcmVkJ107XG5cdGNvbnN0IFNVQk1JVF9CVE5fRUwgPSBmb3JtX2luc3RhbmNlWydzdWJtaXQtYnRuJ107XG5cdGNvbnN0IEVNQUlMX1BIT05FX0lOUFVUX0VSUk9SX0VMID0gRU1BSUxfUEhPTkVfSU5QVVQubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG5cdGNvbnN0IFZBTElEQVRFX0FTX0VNQUlMID0gdmFsaWRhdGVGaWVsZCggJ2VtYWlsJywgRU1BSUxfUEhPTkVfSU5QVVQudmFsdWUgKTtcblx0Y29uc3QgVkFMSURBVEVfQVNfUEhPTkUgPSB2YWxpZGF0ZUZpZWxkKCAncGhvbmUnLCBFTUFJTF9QSE9ORV9JTlBVVC52YWx1ZSApO1xuXG5cdC8vIEZpbGwgaGVscGVyIGZpZWxkIGZvciBiYWNrZW5kIHJlcXVlc3Rcblx0aWYgKCBUWVBFX09GX0VOVEVSRURfRUwgKSB7XG5cdFx0VFlQRV9PRl9FTlRFUkVEX0VMLnZhbHVlID0gKFZBTElEQVRFX0FTX0VNQUlMKSA/ICdlbWFpbCcgOiAoVkFMSURBVEVfQVNfUEhPTkUpID8gJ3Bob25lJyA6ICcnO1xuXHR9XG5cblx0Ly8gU2hvdyBlcnJvciBtZXNzYWdlIHdoZW4gdXNlciBlbnRlcmVkIGludmFsaWQgZW1haWwvcGhvbmVcblx0aWYgKCAhVkFMSURBVEVfQVNfRU1BSUwgJiYgIVZBTElEQVRFX0FTX1BIT05FICYmIEVNQUlMX1BIT05FX0lOUFVUX0VSUk9SX0VMICkge1xuXHRcdEVNQUlMX1BIT05FX0lOUFVUX0VSUk9SX0VMLmlubmVySFRNTCA9IHZhcl9mcm9tX3BocC5zdHJpbmdfdHJhbnNsYXRpb25bJ2VtYWlsX3Bob25lX25vdF92YWxpZCddO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdChTVUJNSVRfQlROX0VMKSAmJiBTVUJNSVRfQlROX0VMLmNsYXNzTGlzdC5hZGQoICdsb2FkaW5nJyApO1xuXG5cdGlmICggRU1BSUxfUEhPTkVfSU5QVVRfRVJST1JfRUwgKSB7XG5cdFx0RU1BSUxfUEhPTkVfSU5QVVRfRVJST1JfRUwuaW5uZXJIVE1MID0gJyc7XG5cdH1cblxuXHRjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSggZm9ybV9pbnN0YW5jZSApO1xuXHRmb3JtRGF0YS5hcHBlbmQoICdhY3Rpb24nLCAnY2hlY2tfYW5kX2xvZ2luX3VzZXInICk7XG5cblx0ZmV0Y2goIHZhcl9mcm9tX3BocC5hamF4X3VybCxcblx0XHR7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdGJvZHk6IGZvcm1EYXRhLFxuXHRcdH0gKVxuXHRcdC50aGVuKCByZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkgKVxuXHRcdC50aGVuKCByZXNwb25zZSA9PiB7XG5cdFx0XHQoU1VCTUlUX0JUTl9FTCkgJiYgU1VCTUlUX0JUTl9FTC5jbGFzc0xpc3QucmVtb3ZlKCAnbG9hZGluZycgKTtcblx0XHRcdGlmICggcmVzcG9uc2Uuc3VjY2VzcyApIHtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB2YXJfZnJvbV9waHAuYWNjb3VudF91cmw7XG5cdFx0XHR9XG5cdFx0fSApO1xuXG59XG5cblxuLyoqXG4gKiBVcGRhdGVkIGNhcnQgdG90YWxzIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCB1cGRhdGVkX2NhcnRfdG90YWxzX2Z1bmMgPSAoIGl0ZW1zQW1vdW50ID0gbnVsbCwgY2FydFRvdGFsID0gbnVsbCApID0+IHtcblxuXHRjb25zdCBDVVJSRU5UX09SREVSX1ZBTFVFID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJy5qcy1jdXJyZW50LW9yZGVyLXZhbHVlJyApO1xuXHRjb25zdCBCTE9DS19JTkZPID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5qcy1oZWFkaW5nLWFyZWEtd2FybmluZ3MtdGV4dCcgKTtcblx0bGV0IGN1cnJlbnRfdG90YWxfY2FydCA9IGNhcnRUb3RhbDtcblx0bGV0IGN1cnJlbnRfdG90YWxfY2FydF92YWx1ZSA9IDA7XG5cblx0aWYgKCAhY2FydFRvdGFsICkge1xuXHRcdGN1cnJlbnRfdG90YWxfY2FydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcuanMtY2FydC10b3RhbCcgKS5pbm5lckhUTUw7XG5cdFx0Y3VycmVudF90b3RhbF9jYXJ0X3ZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5qcy1jYXJ0LXRvdGFsJyApLmRhdGFzZXQudG90YWw7XG5cdH1cblxuXHRsZXQgbWluX3RvdGFsX2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5qcy1taW4tb3JkZXItdmFsdWUnICk7XG5cdGxldCBNSU5fVE9UQUwgPSBudWxsO1xuXHRpZiAoIG1pbl90b3RhbF9lbCApIHtcblx0XHRNSU5fVE9UQUwgPSBtaW5fdG90YWxfZWwuaW5uZXJIVE1MO1xuXHR9XG5cdGNvbnN0IFRPVEFMX0JMT0NLX0lORk8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLmpzLWN1cnJlbnQtb3JkZXItdmFsdWUnICk7XG5cdGNvbnN0IFRPVEFMX0hFQURFUl9TVElDS1kgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLmpzLXN0aWNreS1oZWFkZXItY2FydC1wcmljZScgKTtcblx0Y29uc3QgVE9UQUxfQkxPQ0tfSEVBREVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJy5qcy1oZWFkZXItY2FydC1wcmljZScgKTtcblx0Y29uc3QgSEVBREVSX0NBUlRfQ09VTlQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLmpzLWhlYWRlci1jYXJ0LWNvdW50JyApO1xuXHRjb25zdCBJTlBVVF9RVFlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJy5pbnB1dC10ZXh0LnF0eScgKTtcblxuXHRsZXQgaXRlbXNfYW1vdW50ID0gaXRlbXNBbW91bnQ7XG5cblxuXHQvLyBVcGRhdGUgY3VycmVudCBvcmRlciBhbW91bnQgZm9yIHZpc3VhbCBsYXlvdXRzXG5cdFsuLi5UT1RBTF9CTE9DS19JTkZPLCAuLi5UT1RBTF9IRUFERVJfU1RJQ0tZLCAuLi5UT1RBTF9CTE9DS19IRUFERVIsIC4uLkNVUlJFTlRfT1JERVJfVkFMVUVdLmZvckVhY2goIGl0ZW0gPT4ge1xuXHRcdGlmICggaXRlbSApIHtcblx0XHRcdGl0ZW0uaW5uZXJIVE1MID0gY3VycmVudF90b3RhbF9jYXJ0O1xuXHRcdH1cblx0fSApO1xuXHRpZiAoICFjYXJ0VG90YWwgKSB7XG5cdFx0Ly8gSGlkZS9zaG93IG5vdGljZSBhYm91dCBtaW5pbWFsIGFtb3VudCBvZiBvcmRlclxuXHRcdGxldCBvcGVyYXRpb25UeXBlID0gKCtjdXJyZW50X3RvdGFsX2NhcnRfdmFsdWUgPiBwYXJzZUludCggTUlOX1RPVEFMICkpID8gJ2FkZCcgOiAncmVtb3ZlJztcblx0XHQoQkxPQ0tfSU5GTykgJiYgQkxPQ0tfSU5GTy5jbGFzc0xpc3Rbb3BlcmF0aW9uVHlwZV0oICdoaWRkZW4nICk7XG5cdH1cblx0Ly8gR2V0IHRvdGFsIGl0ZW1zIGFtb3VudCBpbiB0aGUgY2FydFxuXHRpZiAoICFpdGVtc0Ftb3VudCApIHtcblx0XHRpdGVtc19hbW91bnQgPSAoSU5QVVRfUVRZcykgJiYgWy4uLklOUFVUX1FUWXNdLnJlZHVjZSggKCBhY2N1bSwgY3VyciApID0+IGFjY3VtICsgK2N1cnIudmFsdWUsIDAgKTtcblx0fVxuXHQvLyBVcGRhdGUgY2FydCBjb3VudCBpbiAzIHBsYWNlc1xuXHQoSEVBREVSX0NBUlRfQ09VTlQpICYmIFsuLi5IRUFERVJfQ0FSVF9DT1VOVF0uZm9yRWFjaCggaXRlbSA9PiBpdGVtLmlubmVySFRNTCA9IGl0ZW1zX2Ftb3VudCApO1xuXG59XG5cblxuLyoqXG4gKiBDdXN0b20gYWRkIHRvIGNhcnQgZnVuY3Rpb25hbGl0eSBhbmQgdXBkYXRlIGNhcnQgY291bnRlcnNcbiAqIEBwYXJhbSBwcm9kdWN0X2lkXG4gKiBAcGFyYW0gYW1vdW50XG4gKiBAcGFyYW0gZXZlbnRcbiAqIEByZXR1cm4ge1Byb21pc2U8dm9pZD59XG4gKi9cbmV4cG9ydCBjb25zdCBjdXN0b21fYWRkX3RvX2NhcnQgPSBhc3luYyAoIHByb2R1Y3RfaWQsIGFtb3VudCwgZXZlbnQgPSBudWxsICkgPT4ge1xuXG5cdGlmKCFwcm9kdWN0X2lkIHx8ICFhbW91bnQgfHwgIWV2ZW50KSByZXR1cm47XG5cblx0Y29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblx0Zm9ybURhdGEuYXBwZW5kKCAnYWN0aW9uJywgJ2FkZF90b19jYXJ0JyApO1xuXHRmb3JtRGF0YS5hcHBlbmQoICdwcm9kdWN0X2lkJywgcHJvZHVjdF9pZCApO1xuXHRmb3JtRGF0YS5hcHBlbmQoICdhbW91bnQnLCBhbW91bnQgKTtcblxuXHRmZXRjaCggdmFyX2Zyb21fcGhwLmFqYXhfdXJsLFxuXHRcdHtcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0Ym9keTogZm9ybURhdGEsXG5cdFx0fSApXG5cdFx0LnRoZW4oIHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSApXG5cdFx0LnRoZW4oIHJlc3BvbnNlID0+IHtcblx0XHRcdChldmVudCkgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoICdsb2FkaW5nJyApO1xuXG5cdFx0XHRpZiAoIHJlc3BvbnNlLnN1Y2Nlc3MgKSB7XG5cdFx0XHRcdHVwZGF0ZWRfY2FydF90b3RhbHNfZnVuYyggcmVzcG9uc2UuZGF0YVsncXR5J10sIHJlc3BvbnNlLmRhdGFbJ3RvdGFsJ10gKTtcblx0XHRcdH1cblx0XHR9ICk7XG59XG5cblxuLyoqXG4gKiBDb2xsZWN0IG9yZGVyIGRldGFpbHMgdG8gYmFja2VuZFxuICogQHBhcmFtIHRhcmdldFxuICovXG5leHBvcnQgY29uc3QgZ2V0Rm9ybUZpZWxkcyA9ICggdGFyZ2V0ICkgPT4ge1xuXHRjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCB0YXJnZXQgKTtcblx0ZGF0YS5hcHBlbmQoICdhY3Rpb24nLCAnY3JlYXRlX29yZGVyJyApO1xuXG5cdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciggJ2NoYW5nZScsICggZXZlbnQgKSA9PiB7XG5cdFx0aWYgKCBldmVudC50YXJnZXQudHlwZSA9PT0gJ2ZpbGUnICkge1xuXHRcdFx0Y29uc29sZS5sb2coIGV2ZW50LnRhcmdldC5maWxlc1swXS5zaXplID4gMCApO1xuXHRcdFx0ZGF0YS5hcHBlbmQoICdmaWxlJywgZXZlbnQudGFyZ2V0LmZpbGVzICk7XG5cblx0XHR9XG5cdH0gKTtcblxuXHRmZXRjaEZpbGVkKCBkYXRhICk7XG59XG5cbi8qKlxuICogU2VuZCBvcmRlciBkZXRhaWxzIHRvIGJhY2tlbmRcbiAqIEBwYXJhbSBmaWVsZHNBcnJheVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hGaWxlZCA9ICggZmllbGRzQXJyYXkgKSA9PiB7XG5cdGlmICggIWZpZWxkc0FycmF5ICkgcmV0dXJuO1xuXG5cdGZldGNoKCB2YXJfZnJvbV9waHAuYWpheF91cmwsIHtcblx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRib2R5OiBmaWVsZHNBcnJheSxcblxuXHR9IClcblx0XHQudGhlbiggKCByZXNwb25zZSApID0+IHtcblx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHR9IClcblx0XHQudGhlbiggKCBkYXRhICkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coIGRhdGEgKTtcblx0XHR9ICk7XG59XG5cbmV4cG9ydCBjb25zdCBwdXRGaWxlSW50b0Zvcm1EYXRhID0gKCBmaWxlSW5wdXQsIEZvcm1EYXRhICkgPT4ge1xuXHRpZiAoICFmaWxlSW5wdXQgKSByZXR1cm47XG5cdEZvcm1EYXRhLmFwcGVuZCggJ2ZpbGUnLCBmaWxlSW5wdXQgKTtcblx0Y29uc29sZS5sb2coIEZvcm1EYXRhICk7XG59XG5cbi8qKlxuICogU3dpdGNoZXIgb2YgZGVsaXZlcnkgdHlwZXMgaW4gd29vY29tbWVyY2VcbiAqIEBwYXJhbSBkZWxpdmVyeUxpc3RcbiAqIEBwYXJhbSB0YXJnZXRcbiAqL1xuZXhwb3J0IGNvbnN0IGRlbGl2ZXJ5VHlwZVN3aXRjaGVyID0gKCB0YXJnZXQsIGRlbGl2ZXJ5TGlzdCApID0+IHtcblx0aWYgKCAhZGVsaXZlcnlMaXN0ICkgcmV0dXJuO1xuXG5cdGNvbnN0IEZMQVRfUkFURSA9IGRlbGl2ZXJ5TGlzdFswXTtcblx0Y29uc3QgTk9WQV9QT1NIVEEgPSBkZWxpdmVyeUxpc3RbMV07XG5cdGNvbnN0IFNISVBQSU5HX0FERFJFU1NfQ09OVEFJTkVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5zaGlwcGluZ19hZGRyZXNzJyApO1xuXG5cdGlmICggIVNISVBQSU5HX0FERFJFU1NfQ09OVEFJTkVSIHx8ICFOT1ZBX1BPU0hUQSB8fCAhRkxBVF9SQVRFICkgcmV0dXJuO1xuXG5cdGRlbGl2ZXJ5TGlzdC5mb3JFYWNoKCBpdGVtID0+IGl0ZW0uY2hlY2tlZCA9IGZhbHNlICk7XG5cblx0aWYgKCB0YXJnZXQuZGF0YXNldC50eXBlID09PSAnbm92YS1wb3NodGEnICkge1xuXHRcdE5PVkFfUE9TSFRBLmNoZWNrZWQgPSB0cnVlO1xuXHRcdFNISVBQSU5HX0FERFJFU1NfQ09OVEFJTkVSLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KCBuZXcgRXZlbnQoICd1cGRhdGVfY2hlY2tvdXQnICkgKTtcblx0fVxuXG5cdGlmICggdGFyZ2V0LmRhdGFzZXQudHlwZSA9PT0gJ2FkZHJlc3MtZGVsaXZlcnknICkge1xuXHRcdEZMQVRfUkFURS5jaGVja2VkID0gdHJ1ZTtcblx0XHRTSElQUElOR19BRERSRVNTX0NPTlRBSU5FUi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRkb2N1bWVudC5ib2R5LmRpc3BhdGNoRXZlbnQoIG5ldyBFdmVudCggJ3VwZGF0ZV9jaGVja291dCcgKSApO1xuXHR9XG59XG5cbi8qKlxuICogQ2hlY2sgd2hhdCBkZWxpdmVyeSB0eXBlIGFyZSBjaG9zZW4gYW5kIGFjdGl2YXRlIGFwcHJvcHJpYXRlIGNoZWNrYm94IGZvciBkZWxpdmVyeSBtZXRob2RcbiAqIEBwYXJhbSBkZWxpdmVyeUxpc3RcbiAqL1xuZXhwb3J0IGNvbnN0IGRlbGl2ZXJ5Q2hlY2tib3hlc1N0YXRlID0gKCBkZWxpdmVyeUxpc3QgKSA9PiB7XG5cblx0Y29uc3QgTk9WQV9QT1NIVEFfRklFTEQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnaW5wdXRbZGF0YS10eXBlPVwibm92YS1wb3NodGFcIl0nICk7XG5cdGNvbnN0IEZMQVRfUkFURV9GSUVMRCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICdpbnB1dFtkYXRhLXR5cGU9XCJhZGRyZXNzLWRlbGl2ZXJ5XCJdJyApO1xuXHRjb25zdCBTSElQUElOR19BRERSRVNTX0NPTlRBSU5FUiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcuc2hpcHBpbmdfYWRkcmVzcycgKTtcblxuXHRpZiAoICFGTEFUX1JBVEVfRklFTEQgfHwgIU5PVkFfUE9TSFRBX0ZJRUxEIHx8ICFTSElQUElOR19BRERSRVNTX0NPTlRBSU5FUiApIHJldHVybjtcblxuXHRpZiAoICFkZWxpdmVyeUxpc3QgfHwgKGRlbGl2ZXJ5TGlzdC5sZW5ndGggPT09IDApICkge1xuXHRcdEZMQVRfUkFURV9GSUVMRC5jaGVja2VkID0gdHJ1ZTtcblx0XHRTSElQUElOR19BRERSRVNTX0NPTlRBSU5FUi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRyZXR1cm47XG5cdH1cblxuXHRkZWxpdmVyeUxpc3QuZm9yRWFjaCggKCBlbGVtICkgPT4ge1xuXHRcdGxldCBlbGVtX2lkID0gZWxlbS5pZDtcblx0XHRsZXQgY2hlY2tlZF9lbGVtID0gZWxlbS5jaGVja2VkO1xuXG5cdFx0c3dpdGNoICggZWxlbV9pZCApIHtcblx0XHRcdGNhc2UgJ3NoaXBwaW5nX21ldGhvZF8wX2ZsYXRfcmF0ZTEnOlxuXHRcdFx0XHRpZiAoIGNoZWNrZWRfZWxlbSApIHtcblx0XHRcdFx0XHRGTEFUX1JBVEVfRklFTEQuY2hlY2tlZCA9IHRydWU7XG5cdFx0XHRcdFx0U0hJUFBJTkdfQUREUkVTU19DT05UQUlORVIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnc2hpcHBpbmdfbWV0aG9kXzBfbm92YV9wb3NodGFfc2hpcHBpbmcyJzpcblx0XHRcdFx0aWYgKCBjaGVja2VkX2VsZW0gKSB7XG5cdFx0XHRcdFx0Tk9WQV9QT1NIVEFfRklFTEQuY2hlY2tlZCA9IHRydWU7XG5cdFx0XHRcdFx0U0hJUFBJTkdfQUREUkVTU19DT05UQUlORVIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9ICk7XG59XG5cbi8qKlxuICogV3JhcHBpbmcgbGFiZWwgaW5uZXIgdGV4dCBpbnRvIHNwYW5cbiAqL1xuZXhwb3J0IGNvbnN0IGNoZWNrYm94SW5uZXJUZXh0V3JhcHBpbmcgPSAoKSA9PiB7XG5cdGNvbnN0IExBQkVMID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJyN3Y3VzX25wX2JpbGxpbmdfZmllbGRzIC53Yy11a3Itc2hpcHBpbmctY2hlY2tib3gnICk7XG5cdGlmICggIUxBQkVMICkgcmV0dXJuO1xuXHRjb25zdCBJTlBVVCA9IExBQkVMLnF1ZXJ5U2VsZWN0b3IoICdpbnB1dCcgKTtcblx0Y29uc3QgTEFCRUxfVEVYVCA9IChMQUJFTC5pbm5lclRleHQpLnRyaW0oKTtcblx0TEFCRUwuaW5uZXJUZXh0ID0gJyc7XG5cdGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NwYW4nICk7XG5cdHNwYW4uaW5uZXJUZXh0ID0gTEFCRUxfVEVYVDtcblxuXHRMQUJFTC5hcHBlbmRDaGlsZCggSU5QVVQgKTtcblx0TEFCRUwuYXBwZW5kQ2hpbGQoIHNwYW4gKTtcbn1cblxuLy9nZXQgR0VUIHBhcmFtcyBmcm9tIHVybFxuZXhwb3J0IGNvbnN0IGdldEFsbFVybFBhcmFtcyA9ICggdXJsICkgPT4ge1xuXG5cdC8vIGZldGNoIHN0cmluZyBmcm9tIHVybCBvciB3aW5kb3cgb2JqZWN0XG5cdGxldCBxdWVyeVN0cmluZyA9IHVybCA/IHVybC5zcGxpdCggJz8nIClbMV0gOiB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNsaWNlKCAxICk7XG5cblx0Ly8gb2JqZWN0IGZvciBzdG9yaW5nIHBhcmFtZXRlcnNcblx0bGV0IG9iaiA9IHt9O1xuXG5cdC8vIGlmIHRoZXJlIGlzIGEgcXVlcnkgc3RyaW5nXG5cdGlmICggcXVlcnlTdHJpbmcgKSB7XG5cblx0XHQvLyBkYXRhIGFmdGVyIHRoZSAjIHNpZ24gd2lsbCBiZSBvbWl0dGVkXG5cdFx0cXVlcnlTdHJpbmcgPSBxdWVyeVN0cmluZy5zcGxpdCggJyMnIClbMF07XG5cblx0XHQvLyBzaGFyZSBwYXJhbWV0ZXJzXG5cdFx0bGV0IGFyciA9IHF1ZXJ5U3RyaW5nLnNwbGl0KCAnJicgKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyApIHtcblx0XHRcdC8vIHNwbGl0IHRoZSBwYXJhbWV0ZXIgaW50byBrZXkgPT4gdmFsdWVcblx0XHRcdGxldCBhID0gYXJyW2ldLnNwbGl0KCAnPScgKTtcblxuXHRcdFx0Ly8gcHJvY2Vzc2luZyBkYXRhIGxpa2U6IGxpc3QgW10gPSB0aGluZzEgJiBsaXN0IFtdID0gdGhpbmcyXG5cdFx0XHRsZXQgcGFyYW1OdW0gPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgcGFyYW1OYW1lID0gYVswXS5yZXBsYWNlKCAvXFxbXFxkKlxcXS8sIGZ1bmN0aW9uICggdiApIHtcblx0XHRcdFx0cGFyYW1OdW0gPSB2LnNsaWNlKCAxLCAtMSApO1xuXHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHR9ICk7XG5cblx0XHRcdC8vIHBhc3NpbmcgcGFyYW1ldGVyIHZhbHVlICgndHJ1ZScgaWYgbm8gdmFsdWUgaXMgc3BlY2lmaWVkKVxuXHRcdFx0bGV0IHBhcmFtVmFsdWUgPSB0eXBlb2YgKGFbMV0pID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBhWzFdO1xuXG5cdFx0XHQvLyByZWdpc3RlciBjb252ZXJzaW9uXG5cdFx0XHRwYXJhbU5hbWUgPSBwYXJhbU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdHBhcmFtVmFsdWUgPSBwYXJhbVZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdC8vIGlmIHRoZSBwYXJhbWV0ZXIga2V5IGlzIGFscmVhZHkgc2V0XG5cdFx0XHRpZiAoIG9ialtwYXJhbU5hbWVdICkge1xuXG5cdFx0XHRcdGlmICggdHlwZW9mIG9ialtwYXJhbU5hbWVdID09PSAnc3RyaW5nJyApIHtcblx0XHRcdFx0XHRvYmpbcGFyYW1OYW1lXSA9IFtvYmpbcGFyYW1OYW1lXV07XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gaWYgbm8gaW5kZXggaXMgZ2l2ZW4gLi4uXG5cdFx0XHRcdGlmICggdHlwZW9mIHBhcmFtTnVtID09PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdFx0XHQvLyDQv9C+0LzQtdGJ0LDQtdC8INC30L3QsNGH0LXQvdC40LUg0LIg0LrQvtC90LXRhiDQvNCw0YHRgdC40LLQsFxuXHRcdFx0XHRcdG9ialtwYXJhbU5hbWVdLnB1c2goIHBhcmFtVmFsdWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBpZiBpbmRleCBpcyBnaXZlbiAuLi5cblx0XHRcdFx0ZWxzZSB7XG5cblx0XHRcdFx0XHRvYmpbcGFyYW1OYW1lXVtwYXJhbU51bV0gPSBwYXJhbVZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvYmpbcGFyYW1OYW1lXSA9IHBhcmFtVmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG9iajtcbn1cblxuXG4vKipcbiAqIEZpbHRlcnMgcHJvZHVjdHMgYmFzZWQgb24gY29sbGVjdGVkIHVzZXIgZGF0YVxuICovXG5leHBvcnQgY29uc3QgY2hlY2tfZmlsdGVyX3RhZ3MgPSAoIGV2ZW50ICkgPT4ge1xuXHRsZXQgYXBwbHlfZmlsdGVyX2J1dHRvbiA9IGV2ZW50LnRhcmdldDtcblx0Y29uc3QgRklMVEVSU19TRVRUSU5HUyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcuanMtY2hlY2tlZC1maWx0ZXJzLXNldHRpbmdzJyApO1xuXHRjb25zdCBGSUxURVJTX1NFVFRJTkdTX1dSQVAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLmpzLWNoZWNrZWQtZmlsdGVycy1zZXR0aW5ncy13cmFwJyApO1xuXHRjb25zdCBKU19UQUJfUEFORUxfRklMVEVSX0FSUiA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLmpzLXRhYi1wYW5lbC1maWx0ZXInICldO1xuXHRjb25zdCBTV0lUQ0hFUl9GSUxURVJfQUNUSVZFID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJy5qcy10YWItc3dpdGNoZXItZmlsdGVyJyApO1xuXHRsZXQgaHRtbF9maWx0ZXIgPSAnJztcblx0bGV0IFRBQl9QQU5FTF9GSUxURVIgPSAoYXBwbHlfZmlsdGVyX2J1dHRvbikgJiYgYXBwbHlfZmlsdGVyX2J1dHRvbi5jbG9zZXN0KCAnLmpzLXRhYi1wYW5lbC1maWx0ZXInICk7XG5cdGxldCBpZF90YWJfcGFuZWwgPSAoVEFCX1BBTkVMX0ZJTFRFUikgJiYgVEFCX1BBTkVMX0ZJTFRFUi5pZDtcblx0bGV0IGNoZWNrZWRSYWRpbyA9IGZhbHNlO1xuXG5cdChKU19UQUJfUEFORUxfRklMVEVSX0FSUikgJiYgSlNfVEFCX1BBTkVMX0ZJTFRFUl9BUlIuZm9yRWFjaCggKCB0YWJfcGFuZWxfZmlsdGVyICkgPT4ge1xuXHRcdGxldCBkYXRhX3R5cGUgPSB0YWJfcGFuZWxfZmlsdGVyLmdldEF0dHJpYnV0ZSggJ2lkJyApO1xuXG5cdFx0Y2hlY2tlZFJhZGlvID0gdGFiX3BhbmVsX2ZpbHRlci5xdWVyeVNlbGVjdG9yQWxsKCAnaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCcgKTtcblx0XHRpZiAoIGNoZWNrZWRSYWRpbyAmJiBjaGVja2VkUmFkaW8ubGVuZ3RoICkge1xuXG5cdFx0XHRjaGVja2VkUmFkaW8uZm9yRWFjaCggKCBlbGVtICkgPT4ge1xuXHRcdFx0XHRsZXQgZmlsdGVyX3ZhbCA9IGVsZW0udmFsdWU7XG5cblx0XHRcdFx0Y29uc29sZS5sb2coICdmaWx0ZXJfdmFsJywgZmlsdGVyX3ZhbCApO1xuXHRcdFx0XHRsZXQgbGFiZWxfaW5wdXQgPSBlbGVtLm5leHRFbGVtZW50U2libGluZy5pbm5lclRleHQ7XG5cdFx0XHRcdGxldCBUQUJfU1dJVENIRVJfRklMVEVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5qcy10YWItc3dpdGNoZXItZmlsdGVyLmFjdGl2ZScgKTtcblx0XHRcdFx0bGV0IHR5cGVfdGV4dCA9IChUQUJfU1dJVENIRVJfRklMVEVSKSAmJiBUQUJfU1dJVENIRVJfRklMVEVSLmlubmVyVGV4dDtcblxuXHRcdFx0XHRpZiAoICFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBgLmZpbHRlci1zZXR0aW5ncy1pdGVtW2RhdGEtaWQ9XCIke2ZpbHRlcl92YWx9XCJdYCApICkge1xuXHRcdFx0XHRcdGh0bWxfZmlsdGVyICs9IGA8ZGl2IGRhdGEtdHlwZT1cIiR7ZGF0YV90eXBlfVwiXG5cdFx0XHRcdFx0XHRcdFx0XHQgZGF0YS1pZD1cIiR7ZmlsdGVyX3ZhbH1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0IGNsYXNzPVwiZmlsdGVyLXNldHRpbmdzLWl0ZW0ganMtZmlsdGVyLXNldHRpbmdzLWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdCAgICA8c3Bhbj4ke3R5cGVfdGV4dH06PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQke2xhYmVsX2lucHV0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInJlbW92ZS1maWx0ZXItc2V0dGluZ3NcIiBkYXRhLXJvbGU9XCJyZW1vdmUtZmlsdGVyLXNldHRpbmdzXCIgPjwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PmA7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSApO1xuXG5cdFx0XHRpZiAoIGh0bWxfZmlsdGVyICE9PSAnJyAmJiBGSUxURVJTX1NFVFRJTkdTX1dSQVAgJiYgRklMVEVSU19TRVRUSU5HU19XUkFQICkge1xuXHRcdFx0XHRpZiAoIEZJTFRFUlNfU0VUVElOR1MgKSB7XG5cdFx0XHRcdFx0RklMVEVSU19TRVRUSU5HUy5pbm5lckhUTUwgKz0gaHRtbF9maWx0ZXI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQoRklMVEVSU19TRVRUSU5HU19XUkFQKSAmJiBGSUxURVJTX1NFVFRJTkdTX1dSQVAuY2xhc3NMaXN0LmFkZCggJ2FjdGl2ZScgKTtcblx0XHRcdH1cblxuXHRcdFx0Wy4uLlNXSVRDSEVSX0ZJTFRFUl9BQ1RJVkVdLmZvckVhY2goKCBpdGVtICk9Pntcblx0XHRcdFx0KGl0ZW0pICYmIGl0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoICdhY3RpdmUnICk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gaWYgKFNXSVRDSEVSX0ZJTFRFUl9BQ1RJVkUubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG5cdFx0XHQvLyBcdFNXSVRDSEVSX0ZJTFRFUl9BQ1RJVkUubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoICdhY3RpdmUnICk7XG5cdFx0XHQvLyB9XG5cblxuXHRcdFx0KGFwcGx5X2ZpbHRlcl9idXR0b24pXG5cdFx0XHQmJiAoYXBwbHlfZmlsdGVyX2J1dHRvbi5jbG9zZXN0KCAnLmpzLXRhYi1wYW5lbC1maWx0ZXInICkpXG5cdFx0XHQmJiBhcHBseV9maWx0ZXJfYnV0dG9uLmNsb3Nlc3QoICcuanMtdGFiLXBhbmVsLWZpbHRlcicgKS5jbGFzc0xpc3QucmVtb3ZlKCAnYWN0aXZlJyApO1xuXG5cdFx0XHRjb25zdCBTRUxFQ1RFRF9JRF9UQUJfUEFORUwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBgLmpzLXRhYi1zd2l0Y2hlci1maWx0ZXJbaHJlZj1cIiMke2lkX3RhYl9wYW5lbH1cIl1gICk7XG5cdFx0XHQoU0VMRUNURURfSURfVEFCX1BBTkVMKSAmJiBTRUxFQ1RFRF9JRF9UQUJfUEFORUwuY2xhc3NMaXN0LnJlbW92ZSggJ2FjdGl2ZScgKTtcblx0XHR9XG5cdH0gKTtcbn1cblxuXG4vKipcbiAqIE9wZW5zIFRPUF9NRU5VIG9uIGhvdmVyIG92ZXIgYSBsaW5rXG4gKi9cbmV4cG9ydCBjb25zdCBvcGVuX3RvcF9tZW51ID0gKCBldmVudCApID0+IHtcblx0Y29uc3QgQlVUVE9OX0NBVEVHT1JZX0FSUiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcuanMtYnV0dG9uLWNhdGVnb3J5JyApO1xuXHRjb25zdCBFTEVNX1RBUkdFVCAgICAgICAgID0gZXZlbnQudGFyZ2V0O1xuXHRjb25zdCBDQVRBTE9HX01FTlUgICAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5qcy1jYXRhbG9nLW1lbnUtdG9wJyApO1xuXG5cdGlmICggKEVMRU1fVEFSR0VUICYmIChFTEVNX1RBUkdFVC5jbGFzc0xpc3QuY29udGFpbnMoICdqcy1jYXRhbG9nLWxpbmsnICkgfHxcblx0XHRFTEVNX1RBUkdFVC5jbGFzc0xpc3QuY29udGFpbnMoICdqcy1idXR0b24tY2F0ZWdvcnknICkpKSkge1xuXG5cdFx0KENBVEFMT0dfTUVOVSkgJiYgQ0FUQUxPR19NRU5VLmNsYXNzTGlzdC5hZGQoICdvcGVuJyApO1xuXG5cdFx0KEJVVFRPTl9DQVRFR09SWV9BUlIpICYmIFsuLi5CVVRUT05fQ0FURUdPUllfQVJSXS5mb3JFYWNoKCAoIGl0ZW0gKSA9PiB7XG5cdFx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoICdvcGVuJyApO1xuXHRcdH0gKTtcblx0fVxufVxuXG4vKipcbiAqIE9wZW5zIFRPUF9NRU5VIG9uIGhvdmVyIG92ZXIgYSBsaW5rXG4gKi9cbmV4cG9ydCBjb25zdCBjbG9zZV90b3BfbWVudSA9ICgpID0+IHtcblx0Y29uc3QgQlVUVE9OX0NBVEVHT1JZX0FSUiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1idXR0b24tY2F0ZWdvcnknKTtcblx0Y29uc3QgQ0FUQUxPR19NRU5VX1RPUCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jYXRhbG9nLW1lbnUtdG9wJyk7XG5cblx0Q0FUQUxPR19NRU5VX1RPUC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG5cdChCVVRUT05fQ0FURUdPUllfQVJSKSAmJiBbLi4uQlVUVE9OX0NBVEVHT1JZX0FSUl0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuXHRcdGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaF9kaXNwbGF5X2NvbG9yX3NsaWRlciA9IGFzeW5jICh2YXJpYXRpb24pID0+IHtcblxuXHRjb25zdCBJRF9QUk9EVUNUID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWlkLXByb2R1Y3QnKTtcblx0Y29uc3QgSlNfU0xJREVSX1NPTE8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc2xpZGVyLXNvbG8nKTtcblx0Y29uc3QgSlNfU0xJREVSX1NPTE9fTkFWID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXNsaWRlci1zb2xvLW5hdicpO1xuXG5cdGxldCBoYXZlUGhvdG87XG5cdGxldCBodG1sX2JpZyA9ICcnO1xuXHRsZXQgaHRtbF9zbWFsbCA9ICcnO1xuXG5cdGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cdGZvcm1EYXRhLmFwcGVuZCgnYWN0aW9uJywgJ3Byb2R1Y3RzX2NvbG9yc19nYWxsZXJpZXMnKTtcblx0Zm9ybURhdGEuYXBwZW5kKCdpZF9wcm9kdWN0JywgSURfUFJPRFVDVD8uZGF0YXNldD8uaWQpO1xuXG5cdGNvbnN0IFJFU1BPTlNFID0gYXdhaXQgZmV0Y2goIHZhcl9mcm9tX3BocC5hamF4X3VybCwge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdGJvZHkgOiBmb3JtRGF0YSxcblx0fSkudGhlbiggcmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcblxuXHRpZihSRVNQT05TRSl7XG5cdFx0UkVTUE9OU0UuZm9yRWFjaCgoIGl0ZW0gKSA9PiB7XG5cdFx0XHRpZih2YXJpYXRpb24uYWN0aXZlX2NvbG9yID09PSBpdGVtLmNvbG9yLnNsdWcpIHtcblx0XHRcdFx0aWYoaXRlbS5nYWxsZXJ5KXtcblx0XHRcdFx0XHRoYXZlUGhvdG8gPSB0cnVlO1xuXHRcdFx0XHRcdGl0ZW0uZ2FsbGVyeS5mb3JFYWNoKChpbWFnZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoaW1hZ2Upe1xuXHRcdFx0XHRcdFx0XHRoYXZlUGhvdG8gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRodG1sX2JpZyArPSBgPGRpdiBjbGFzcz1cInNvbG8tc2xpZGVyX19zbGlkZVwiPlxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwic29sby1zbGlkZXJfX2xpbmtcIiBkYXRhLWZhbmN5Ym94PVwic2xpZGVyXCJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiJHtpbWFnZS51cmx9XCI+XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJzb2xvLXNsaWRlcl9faW1nXCIgc3JjPVwiJHtpbWFnZS51cmx9XCI+XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuXHRcdCAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcblxuXHRcdFx0XHRcdFx0XHRodG1sX3NtYWxsICs9IGA8ZGl2IGNsYXNzPVwic29sby1zbGlkZXJfX3NsaWRlXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGltZyBjbGFzcz1cInNvbG8tc2xpZGVyX19pbWcgIHNvbG8tc2xpZGVyX19zbWFsbFwiIHNyYz1cIiR7aW1hZ2UudXJsfVwiIGFsdD1cImltZ1wiPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5gO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGhhdmVQaG90byA9ICFoYXZlUGhvdG87XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGlmKCFoYXZlUGhvdG8gJiYgSlNfU0xJREVSX1NPTE8gJiYgSlNfU0xJREVSX1NPTE9fTkFWKXtcblx0XHRKU19TTElERVJfU09MTy5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cInNvbG8tc2xpZGVyX19zbGlkZSBzb2xvLXNsaWRlcl9fc2xpZGVfbm8tcGhvdG9cIj5cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICBcdFx0IE5PIFBIT1RPXG5cdFx0ICAgICAgICAgICAgICAgICAgICBcdFx0PC9kaXY+YDtcblxuXHRcdEpTX1NMSURFUl9TT0xPX05BVi5pbm5lckhUTUwgPSAnJztcblxuXG5cdH1cblxuXHRpZihKU19TTElERVJfU09MTyAmJiBKU19TTElERVJfU09MT19OQVYgJiYgaGF2ZVBob3RvKXtcblxuXHRcdGlmKEpTX1NMSURFUl9TT0xPLmNsYXNzTGlzdC5jb250YWlucygnc2xpY2staW5pdGlhbGl6ZWQnKVxuXHRcdFx0JiYgSlNfU0xJREVSX1NPTE9fTkFWLmNsYXNzTGlzdC5jb250YWlucygnc2xpY2staW5pdGlhbGl6ZWQnKSkge1xuXG5cdFx0XHRKU19TTElERVJfU09MTy5jbGFzc0xpc3QucmVtb3ZlKCdzbGljay1pbml0aWFsaXplZCcpO1xuXHRcdFx0SlNfU0xJREVSX1NPTE9fTkFWLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWNrLWluaXRpYWxpemVkJyk7XG5cdFx0fVxuXG5cdFx0SlNfU0xJREVSX1NPTE8uaW5uZXJIVE1MID0gaHRtbF9iaWc7XG5cdFx0SlNfU0xJREVSX1NPTE9fTkFWLmlubmVySFRNTCA9IGh0bWxfc21hbGw7XG5cblx0XHRqUXVlcnkoSlNfU0xJREVSX1NPTE8pLnNsaWNrKCB7XG5cdFx0XHRzbGlkZXNUb1Nob3c6IDEsXG5cdFx0XHRzbGlkZXNUb1Njcm9sbDogMSxcblx0XHRcdGFycm93czogdHJ1ZSxcblx0XHRcdGZhZGU6IHRydWUsXG5cdFx0XHRhc05hdkZvcjogJy5qcy1zbGlkZXItc29sby1uYXYnLFxuXHRcdFx0cm93OiAwLFxuXHRcdFx0cHJldkFycm93OiBqUXVlcnkoICcuanMtZ2FsbGVyeS1wcmV2JyApLFxuXHRcdFx0bmV4dEFycm93OiBqUXVlcnkoICcuanMtZ2FsbGVyeS1uZXh0JyApLFxuXHRcdH0gKTtcblxuXHRcdGpRdWVyeShKU19TTElERVJfU09MT19OQVYpLnNsaWNrKCB7XG5cdFx0XHRzbGlkZXNUb1Nob3c6IDQsXG5cdFx0XHRzbGlkZXNUb1Njcm9sbDogMSxcblx0XHRcdGFzTmF2Rm9yOiAnLmpzLXNsaWRlci1zb2xvJyxcblx0XHRcdGRvdHM6IGZhbHNlLFxuXHRcdFx0YXJyb3dzOiBmYWxzZSxcblx0XHRcdGNlbnRlck1vZGU6IGZhbHNlLFxuXHRcdFx0Zm9jdXNPblNlbGVjdDogdHJ1ZSxcblx0XHRcdHJvdzogMFxuXHRcdH0gKTtcblx0fVxufVxuXG4vLyBDcmVhdGUgY29va2llXG5leHBvcnQgY29uc3Qgc2V0Q29va2llID0gKGNuYW1lLCBjdmFsdWUsIGV4ZGF5cykgPT4ge1xuXHRjb25zdCBkID0gbmV3IERhdGUoKTtcblx0ZC5zZXRUaW1lKGQuZ2V0VGltZSgpICsgKGV4ZGF5cyoyNCo2MCo2MCoxMDAwKSk7XG5cdGxldCBleHBpcmVzID0gZXhkYXlzICE9IDAgPyBcImV4cGlyZXM9XCIrIGQudG9VVENTdHJpbmcoKSA6IFwiZXhwaXJlcz0wXCI7XG5cdGRvY3VtZW50LmNvb2tpZSA9IGNuYW1lICsgXCI9XCIgKyBjdmFsdWUgKyBcIjtcIiArIGV4cGlyZXMgKyBcIjtwYXRoPS9cIjtcbn1cblxuLy8gRGVsZXRlIGNvb2tpZVxuZXhwb3J0IGNvbnN0IGRlbGV0ZUNvb2tpZSA9IChjbmFtZSkgPT4ge1xuXHRjb25zdCBkID0gbmV3IERhdGUoKTtcblx0ZC5zZXRUaW1lKGQuZ2V0VGltZSgpICsgKDI0KjYwKjYwKjEwMDApKTtcblx0bGV0IGV4cGlyZXMgPSBcImV4cGlyZXM9XCIrIGQudG9VVENTdHJpbmcoKTtcblx0ZG9jdW1lbnQuY29va2llID0gY25hbWUgKyBcIj07XCIgKyBleHBpcmVzICsgXCI7cGF0aD0vXCI7XG59XG5cbi8vIFJlYWQgY29va2llXG5leHBvcnQgY29uc3QgZ2V0Q29va2llID0gKGNuYW1lKSA9PiB7XG5cdGxldCBuYW1lID0gY25hbWUgKyBcIj1cIjtcblx0bGV0IGRlY29kZWRDb29raWUgPSBkZWNvZGVVUklDb21wb25lbnQoZG9jdW1lbnQuY29va2llKTtcblx0bGV0IGNhID0gZGVjb2RlZENvb2tpZS5zcGxpdCgnOycpO1xuXHRmb3IobGV0IGkgPSAwOyBpIDxjYS5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IGMgPSBjYVtpXTtcblx0XHRcdHdoaWxlIChjLmNoYXJBdCgwKSA9PSAnICcpIHtcblx0XHRcdFx0XHRjID0gYy5zdWJzdHJpbmcoMSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoYy5pbmRleE9mKG5hbWUpID09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gYy5zdWJzdHJpbmcobmFtZS5sZW5ndGgsIGMubGVuZ3RoKTtcblx0XHRcdH1cblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59XG5leHBvcnQgY29uc3QgY2hlY2tMaWZlVGltZSA9IGFzeW5jIChXRUxDT01FX1BPUFVQX0NPT0tJRV9USU1FLCBQT1BVUF9DT09LSUVfVElNRSkgPT4ge1xuXHRpZihXRUxDT01FX1BPUFVQX0NPT0tJRV9USU1FICE9IFBPUFVQX0NPT0tJRV9USU1FKXtcblx0XHRkZWxldGVDb29raWUoJ3dlbGNvbWVfcG9wdXAnKTtcblx0XHRkZWxldGVDb29raWUoJ3dlbGNvbWVfcG9wdXBfdGltZScpO1xuXHR9XG59Il19
},{"@babel/runtime/helpers/asyncToGenerator":7,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/toConsumableArray":13,"@babel/runtime/regenerator":16,"smoothscroll-polyfill":17}],3:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabsNavigation = tabsNavigation;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

/**
 * Tabs Navigation functionality
 * @param tabSwitchSelectors  -  css selectors
 * @param tabPanelSelectors   -  css selectors
 * @param closeToClick        -  close child tab by click (default false)
 */
function tabsNavigation(tabSwitchSelectors, tabPanelSelectors) {
  var closeToClick = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  tabSwitchSelectors && (0, _toConsumableArray2["default"])(document.querySelectorAll(tabSwitchSelectors)).forEach(function (item) {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      var parent = event.target.closest('.js-tabs-block-buttons');
      var prev = event.target.previousElementSibling;
      var next = event.target.nextElementSibling;

      if (prev === null && next && !next.classList.contains('active')) {
        parent.scrollLeft += 0;
      } else if (next === null) {
        parent.scrollLeft += event.target.offsetWidth + 50;
      } else if (next && next.classList.contains('active')) {
        parent.scrollLeft -= event.target.offsetWidth;
      } else {
        parent.scrollLeft += event.target.offsetWidth - 50;
      }

      var TAB_ID = event.target.nodeName === 'A' ? event.target.getAttribute('href') : event.target.dataset.href;

      if (closeToClick && event.target.classList.contains('active')) {
        // Remove active state from all switch elements
        (0, _toConsumableArray2["default"])(document.querySelectorAll(tabSwitchSelectors)).forEach(function (el) {
          return el.classList.remove('active');
        }); // Remove active state from all tabs panels

        (0, _toConsumableArray2["default"])(document.querySelectorAll(tabPanelSelectors)).forEach(function (el) {
          return el.classList.remove('active');
        });
        return;
      } else {
        // Remove active state from all switch elements
        (0, _toConsumableArray2["default"])(document.querySelectorAll(tabSwitchSelectors)).forEach(function (el) {
          return el.classList.remove('active');
        }); // Remove active state from all tabs panels

        (0, _toConsumableArray2["default"])(document.querySelectorAll(tabPanelSelectors)).forEach(function (el) {
          return el.classList.remove('active');
        });
      } // Set active state to current


      event.target.classList.add('active');
      document.querySelector(TAB_ID).classList.add('active'); // force trigger resize event for the document

      if (document.createEvent) {
        window.dispatchEvent(new Event('resize'));
      } else {
        document.body.fireEvent('onresize');
      }
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmktdGFicy5qcyJdLCJuYW1lcyI6WyJ0YWJzTmF2aWdhdGlvbiIsInRhYlN3aXRjaFNlbGVjdG9ycyIsInRhYlBhbmVsU2VsZWN0b3JzIiwiY2xvc2VUb0NsaWNrIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIml0ZW0iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInBhcmVudCIsInRhcmdldCIsImNsb3Nlc3QiLCJwcmV2IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsIm5leHQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInNjcm9sbExlZnQiLCJvZmZzZXRXaWR0aCIsIlRBQl9JRCIsIm5vZGVOYW1lIiwiZ2V0QXR0cmlidXRlIiwiZGF0YXNldCIsImhyZWYiLCJlbCIsInJlbW92ZSIsImFkZCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFdmVudCIsIndpbmRvdyIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImJvZHkiLCJmaXJlRXZlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU0EsY0FBVCxDQUF5QkMsa0JBQXpCLEVBQTZDQyxpQkFBN0MsRUFBc0Y7QUFBQSxNQUF0QkMsWUFBc0IsdUVBQVIsS0FBUTtBQUUzRkYsRUFBQUEsa0JBQUQsSUFDRyxvQ0FBSUcsUUFBUSxDQUFDQyxnQkFBVCxDQUEyQkosa0JBQTNCLENBQUosRUFBcURLLE9BQXJELENBQThELFVBQUVDLElBQUYsRUFBWTtBQUU1RUEsSUFBQUEsSUFBSSxDQUFDQyxnQkFBTCxDQUF1QixPQUF2QixFQUFnQyxVQUFFQyxLQUFGLEVBQWE7QUFFNUNBLE1BQUFBLEtBQUssQ0FBQ0MsY0FBTjtBQUVDLFVBQUlDLE1BQU0sR0FBR0YsS0FBSyxDQUFDRyxNQUFOLENBQWFDLE9BQWIsQ0FBc0Isd0JBQXRCLENBQWI7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QUFjQyxTQUFkLENBQXlCLFVBQXpCO0FBQ0E7QUFFRCxLQXZERDtBQXlEQSxHQTNERSxDQURIO0FBNkRBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUYWJzIE5hdmlnYXRpb24gZnVuY3Rpb25hbGl0eVxuICogQHBhcmFtIHRhYlN3aXRjaFNlbGVjdG9ycyAgLSAgY3NzIHNlbGVjdG9yc1xuICogQHBhcmFtIHRhYlBhbmVsU2VsZWN0b3JzICAgLSAgY3NzIHNlbGVjdG9yc1xuICogQHBhcmFtIGNsb3NlVG9DbGljayAgICAgICAgLSAgY2xvc2UgY2hpbGQgdGFiIGJ5IGNsaWNrIChkZWZhdWx0IGZhbHNlKVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGFic05hdmlnYXRpb24oIHRhYlN3aXRjaFNlbGVjdG9ycywgdGFiUGFuZWxTZWxlY3RvcnMsIGNsb3NlVG9DbGljaz0gZmFsc2UgKSB7XG5cblx0KHRhYlN3aXRjaFNlbGVjdG9ycylcblx0JiYgWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhYlN3aXRjaFNlbGVjdG9ycyApXS5mb3JFYWNoKCAoIGl0ZW0gKSA9PiB7XG5cblx0XHRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsICggZXZlbnQgKSA9PiB7XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0bGV0IHBhcmVudCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCAnLmpzLXRhYnMtYmxvY2stYnV0dG9ucycgKTtcblx0XHRcdFx0bGV0IHByZXYgPSBldmVudC50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZztcblx0XHRcdFx0bGV0IG5leHQgPSBldmVudC50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG5cdFx0XHRcdGlmICggcHJldiA9PT0gbnVsbCAmJiBuZXh0ICYmICFuZXh0LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcblx0XHRcdFx0XHRwYXJlbnQuc2Nyb2xsTGVmdCArPSAwO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBuZXh0ID09PSBudWxsICkge1xuXHRcdFx0XHRcdHBhcmVudC5zY3JvbGxMZWZ0ICs9IChldmVudC50YXJnZXQub2Zmc2V0V2lkdGggKyA1MCk7XG5cdFx0XHRcdH0gZWxzZSBpZihuZXh0ICYmIG5leHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSl7XG5cdFx0XHRcdFx0cGFyZW50LnNjcm9sbExlZnQgLT0gKGV2ZW50LnRhcmdldC5vZmZzZXRXaWR0aCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cGFyZW50LnNjcm9sbExlZnQgKz0gKGV2ZW50LnRhcmdldC5vZmZzZXRXaWR0aCAtIDUwKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRjb25zdCBUQUJfSUQgPSAoZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnQScpXG5cdFx0XHRcdD8gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSggJ2hyZWYnIClcblx0XHRcdFx0OiBldmVudC50YXJnZXQuZGF0YXNldC5ocmVmO1xuXG5cdFx0XHRpZiggY2xvc2VUb0NsaWNrICYmIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpICkge1xuXHRcdFx0XHQvLyBSZW1vdmUgYWN0aXZlIHN0YXRlIGZyb20gYWxsIHN3aXRjaCBlbGVtZW50c1xuXHRcdFx0XHRbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggdGFiU3dpdGNoU2VsZWN0b3JzICldXG5cdFx0XHRcdFx0LmZvckVhY2goIGVsID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoICdhY3RpdmUnICkgKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgYWN0aXZlIHN0YXRlIGZyb20gYWxsIHRhYnMgcGFuZWxzXG5cdFx0XHRcdFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCB0YWJQYW5lbFNlbGVjdG9ycyApXVxuXHRcdFx0XHRcdC5mb3JFYWNoKCBlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCAnYWN0aXZlJyApICk7XG5cdFx0XHRcdHJldHVybjtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gUmVtb3ZlIGFjdGl2ZSBzdGF0ZSBmcm9tIGFsbCBzd2l0Y2ggZWxlbWVudHNcblx0XHRcdFx0Wy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhYlN3aXRjaFNlbGVjdG9ycyApXVxuXHRcdFx0XHRcdC5mb3JFYWNoKCBlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCAnYWN0aXZlJyApICk7XG5cblx0XHRcdFx0Ly8gUmVtb3ZlIGFjdGl2ZSBzdGF0ZSBmcm9tIGFsbCB0YWJzIHBhbmVsc1xuXHRcdFx0XHRbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggdGFiUGFuZWxTZWxlY3RvcnMgKV1cblx0XHRcdFx0XHQuZm9yRWFjaCggZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSggJ2FjdGl2ZScgKSApO1xuXHRcdFx0fVxuXG5cblx0XHRcdC8vIFNldCBhY3RpdmUgc3RhdGUgdG8gY3VycmVudFxuXHRcdFx0ZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoICdhY3RpdmUnICk7XG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBUQUJfSUQgKS5jbGFzc0xpc3QuYWRkKCAnYWN0aXZlJyApO1xuXG5cblx0XHRcdC8vIGZvcmNlIHRyaWdnZXIgcmVzaXplIGV2ZW50IGZvciB0aGUgZG9jdW1lbnRcblx0XHRcdGlmICggZG9jdW1lbnQuY3JlYXRlRXZlbnQgKSB7XG5cdFx0XHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KCBuZXcgRXZlbnQoICdyZXNpemUnICkgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuZmlyZUV2ZW50KCAnb25yZXNpemUnICk7XG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0fSApO1xufSJdfQ==
},{"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/toConsumableArray":13}],4:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _helpers = require("./helpers");

var Popup = /*#__PURE__*/function () {
  function Popup() {
    (0, _classCallCheck2["default"])(this, Popup);
    this.body = document.querySelector('body');
    this.html = document.querySelector('html');
  }
  /**
   * Force Close All opened popup window
   * and clear the traces of an opened popup window
   */


  (0, _createClass2["default"])(Popup, [{
    key: "forceCloseAllPopup",
    value: function forceCloseAllPopup() {
      (0, _toConsumableArray2["default"])(document.querySelectorAll('.popup')).forEach(function (item) {
        (0, _helpers.fadeOut)(item);
        var MAIL_SENT_OK_BOX = item.querySelector('.wpcf7-mail-sent-ok');

        if (MAIL_SENT_OK_BOX) {
          MAIL_SENT_OK_BOX.style.display = 'none';
        }

        var OFTEN_TO_SHOW_POPUP = item.querySelector('.how_often_to_show_popup');

        if (OFTEN_TO_SHOW_POPUP) {
          var COOKIE_TIME = OFTEN_TO_SHOW_POPUP.value;
          var d = new Date();
          d.setTime(d.getTime() + COOKIE_TIME * 24 * 60 * 60 * 1000);
          var expires = COOKIE_TIME != 0 ? "expires=" + d.toUTCString() : "expires=0";
          document.cookie = "welcome_popup=1;" + expires + ";path=/";
          document.cookie = "welcome_popup_time=" + COOKIE_TIME + ";" + expires + ";path=/";
        }
      });
      this.body.classList.remove('popup-opened');
      this.html.classList.remove('popup-opened');
    }
    /**
     * Open selected popup window
     * @param popupSelector - css selector of popup that should be opened
     * @param timeOut - ms
     */

  }, {
    key: "openOnePopup",
    value: function openOnePopup() {
      var _this = this;

      var popupSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var timeOut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
      //this.forceCloseAllPopup();
      setTimeout(function () {
        _this.body.classList.add('popup-opened');

        _this.html.classList.add('popup-opened');

        (0, _helpers.fadeIn)(document.querySelector(popupSelector));
      }, timeOut);
    }
    /**
     * Opening popup window
     */

  }, {
    key: "openPopup",
    value: function openPopup() {
      var _this2 = this;

      this.body.addEventListener('click', function (event) {
        if (!(0, _toConsumableArray2["default"])(event.target.classList).includes('js-open-popup-activator')) {
          return false;
        }

        event.preventDefault();
        var el_href = event.target.nodeName === 'A' ? event.target.getAttribute('href') : event.target.dataset.href;
        var POPUP_ELEMENT = document.querySelector(el_href);

        if (POPUP_ELEMENT) {
          var POPUP_FORM_SUBJECT = POPUP_ELEMENT.querySelector('form input.subject');

          if (POPUP_FORM_SUBJECT) {
            POPUP_FORM_SUBJECT.value = event.target.dataset.subject;
          }
        }

        _this2.body.classList.add('popup-opened');

        _this2.html.classList.add('popup-opened');

        if (event.target.classList.contains('js-add-to-cart')) {
          var POPUP_INNER = POPUP_ELEMENT.querySelector('.js-add-to-cart-popup-inner');

          if (POPUP_INNER) {
            var _event$target$dataset;

            POPUP_INNER.style.display = 'none';
            var formData = new FormData();
            formData.append('action', 'get_add_to_cart_popup_content');
            formData.append('product_id', (_event$target$dataset = event.target.dataset) === null || _event$target$dataset === void 0 ? void 0 : _event$target$dataset.parent_id);
            fetch(var_from_php.ajax_url, {
              method: 'POST',
              body: formData
            }).then(function (response) {
              return response.json();
            }).then(function (response) {
              if (response.success) {
                POPUP_INNER.style.display = 'block';
                POPUP_INNER.innerHTML = response.data;
              }
            });
          }
        }

        (0, _helpers.fadeIn)(POPUP_ELEMENT); //POPUP_FORM_INPUT && POPUP_FORM_INPUT.focus();
      });
    }
    /**
     * Closing popup window
     */

  }, {
    key: "closePopup",
    value: function closePopup() {
      var _this3 = this;

      this.body.addEventListener('click', function (event) {
        // Check if user click on close element
        if (!(0, _toConsumableArray2["default"])(event.target.classList).includes('js-popup-close')) {
          return false;
        }

        event.preventDefault();

        _this3.forceCloseAllPopup();

        if (event.target.dataset.href) {
          window.location.assign(event.target.dataset.href);
        }
      }); // Checking ESC button for closing opened popup window

      document.addEventListener('keydown', function (event) {
        if (event.keyCode === 27) {
          _this3.forceCloseAllPopup();
        }
      });
    }
  }, {
    key: "init",
    value: function init() {
      this.openPopup();
      this.closePopup();
    }
  }]);
  return Popup;
}();

exports["default"] = Popup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvcHVwLXdpbmRvdy5qcyJdLCJuYW1lcyI6WyJQb3B1cCIsImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJodG1sIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJpdGVtIiwiTUFJTF9TRU5UX09LX0JPWCIsInN0eWxlIiwiZGlzcGxheSIsIk9GVEVOX1RPX1NIT1dfUE9QVVAiLCJDT09LSUVfVElNRSIsInZhbHVlIiwiZCIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsImV4cGlyZXMiLCJ0b1VUQ1N0cmluZyIsImNvb2tpZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsInBvcHVwU2VsZWN0b3IiLCJ0aW1lT3V0Iiwic2V0VGltZW91dCIsImFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInRhcmdldCIsImluY2x1ZGVzIiwicHJldmVudERlZmF1bHQiLCJlbF9ocmVmIiwibm9kZU5hbWUiLCJnZXRBdHRyaWJ1dGUiLCJkYXRhc2V0IiwiaHJlZiIsIlBPUFVQX0VMRU1FTlQiLCJQT1BVUF9GT1JNX1NVQkpFQ1QiLCJzdWJqZWN0IiwiY29udGFpbnMiLCJQT1BVUF9JTk5FUiIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJwYXJlbnRfaWQiLCJmZXRjaCIsInZhcl9mcm9tX3BocCIsImFqYXhfdXJsIiwibWV0aG9kIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInN1Y2Nlc3MiLCJpbm5lckhUTUwiLCJkYXRhIiwiZm9yY2VDbG9zZUFsbFBvcHVwIiwid2luZG93IiwibG9jYXRpb24iLCJhc3NpZ24iLCJrZXlDb2RlIiwib3BlblBvcHVwIiwiY2xvc2VQb3B1cCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBRXFCQSxLO0FBQ3BCLG1CQUFjO0FBQUE7QUFDYixTQUFLQyxJQUFMLEdBQVlDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF3QixNQUF4QixDQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZRixR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OlsiaW1wb3J0IHsgZmFkZUluLCBmYWRlT3V0IH0gZnJvbSAnLi9oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnYm9keScgKTtcblx0XHR0aGlzLmh0bWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnaHRtbCcgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEZvcmNlIENsb3NlIEFsbCBvcGVuZWQgcG9wdXAgd2luZG93XG5cdCAqIGFuZCBjbGVhciB0aGUgdHJhY2VzIG9mIGFuIG9wZW5lZCBwb3B1cCB3aW5kb3dcblx0ICovXG5cdGZvcmNlQ2xvc2VBbGxQb3B1cCgpIHtcblx0XHRbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJy5wb3B1cCcgKV0uZm9yRWFjaCggKCBpdGVtICkgPT4ge1xuXHRcdFx0ZmFkZU91dCggaXRlbSApO1xuXHRcdFx0XG5cdFx0XHRjb25zdCBNQUlMX1NFTlRfT0tfQk9YID0gaXRlbS5xdWVyeVNlbGVjdG9yKCAnLndwY2Y3LW1haWwtc2VudC1vaycgKTtcblx0XHRcdGlmICggTUFJTF9TRU5UX09LX0JPWCApIHtcblx0XHRcdFx0TUFJTF9TRU5UX09LX0JPWC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgT0ZURU5fVE9fU0hPV19QT1BVUCA9IGl0ZW0ucXVlcnlTZWxlY3RvciggJy5ob3dfb2Z0ZW5fdG9fc2hvd19wb3B1cCcgKTtcblx0XHRcdGlmICggT0ZURU5fVE9fU0hPV19QT1BVUCApIHtcblx0XHRcdFx0Y29uc3QgQ09PS0lFX1RJTUUgPSBPRlRFTl9UT19TSE9XX1BPUFVQLnZhbHVlO1xuXHRcdFx0XHRjb25zdCBkID0gbmV3IERhdGUoKTtcblx0XHRcdFx0ZC5zZXRUaW1lKGQuZ2V0VGltZSgpICsgKENPT0tJRV9USU1FKjI0KjYwKjYwKjEwMDApKTtcblx0XHRcdFx0bGV0IGV4cGlyZXMgPSBDT09LSUVfVElNRSAhPSAwID8gXCJleHBpcmVzPVwiKyBkLnRvVVRDU3RyaW5nKCkgOiBcImV4cGlyZXM9MFwiO1xuXHRcdFx0XHRkb2N1bWVudC5jb29raWUgPSBcIndlbGNvbWVfcG9wdXA9MTtcIiArIGV4cGlyZXMgKyBcIjtwYXRoPS9cIjtcblx0XHRcdFx0ZG9jdW1lbnQuY29va2llID0gXCJ3ZWxjb21lX3BvcHVwX3RpbWU9XCIrQ09PS0lFX1RJTUUrXCI7XCIgKyBleHBpcmVzICsgXCI7cGF0aD0vXCI7XG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0XHR0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSggJ3BvcHVwLW9wZW5lZCcgKTtcblx0XHR0aGlzLmh0bWwuY2xhc3NMaXN0LnJlbW92ZSggJ3BvcHVwLW9wZW5lZCcgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIE9wZW4gc2VsZWN0ZWQgcG9wdXAgd2luZG93XG5cdCAqIEBwYXJhbSBwb3B1cFNlbGVjdG9yIC0gY3NzIHNlbGVjdG9yIG9mIHBvcHVwIHRoYXQgc2hvdWxkIGJlIG9wZW5lZFxuXHQgKiBAcGFyYW0gdGltZU91dCAtIG1zXG5cdCAqL1xuXHRvcGVuT25lUG9wdXAoIHBvcHVwU2VsZWN0b3IgPSBudWxsLCB0aW1lT3V0ID0gMTAwMCApIHtcblx0XHQvL3RoaXMuZm9yY2VDbG9zZUFsbFBvcHVwKCk7XG5cblx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHR0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCggJ3BvcHVwLW9wZW5lZCcgKTtcblx0XHRcdHRoaXMuaHRtbC5jbGFzc0xpc3QuYWRkKCAncG9wdXAtb3BlbmVkJyApO1xuXG5cdFx0XHRmYWRlSW4oIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIHBvcHVwU2VsZWN0b3IgKSApO1xuXHRcdH0sIHRpbWVPdXQgKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIE9wZW5pbmcgcG9wdXAgd2luZG93XG5cdCAqL1xuXHRvcGVuUG9wdXAoKSB7XG5cblx0XHR0aGlzLmJvZHkuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgKCBldmVudCApID0+IHtcblxuXHRcdFx0aWYgKCAhWy4uLmV2ZW50LnRhcmdldC5jbGFzc0xpc3RdLmluY2x1ZGVzKCAnanMtb3Blbi1wb3B1cC1hY3RpdmF0b3InICkgKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0bGV0IGVsX2hyZWYgPSAoZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnQScpXG5cdFx0XHRcdD8gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSggJ2hyZWYnIClcblx0XHRcdFx0OiBldmVudC50YXJnZXQuZGF0YXNldC5ocmVmO1xuXG5cdFx0XHRjb25zdCBQT1BVUF9FTEVNRU5UID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbF9ocmVmKTtcblxuXHRcdFx0aWYgKFBPUFVQX0VMRU1FTlQpIHtcblx0XHRcdFx0Y29uc3QgUE9QVVBfRk9STV9TVUJKRUNUID0gUE9QVVBfRUxFTUVOVC5xdWVyeVNlbGVjdG9yKCAnZm9ybSBpbnB1dC5zdWJqZWN0JyApO1xuXG5cdFx0XHRcdGlmICggUE9QVVBfRk9STV9TVUJKRUNUICkge1xuXHRcdFx0XHRcdFBPUFVQX0ZPUk1fU1VCSkVDVC52YWx1ZSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnN1YmplY3Q7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoICdwb3B1cC1vcGVuZWQnICk7XG5cdFx0XHR0aGlzLmh0bWwuY2xhc3NMaXN0LmFkZCggJ3BvcHVwLW9wZW5lZCcgKTtcblxuXHRcdFx0aWYgKCBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1hZGQtdG8tY2FydCcpICkge1xuXHRcdFx0XHRjb25zdCBQT1BVUF9JTk5FUiA9IFBPUFVQX0VMRU1FTlQucXVlcnlTZWxlY3RvcignLmpzLWFkZC10by1jYXJ0LXBvcHVwLWlubmVyJyk7XG5cbiBcdFx0XHRcdGlmIChQT1BVUF9JTk5FUikge1xuXHRcdFx0XHQgICAgUE9QVVBfSU5ORVIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuXHRcdFx0XHQgICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cdFx0XHRcdCAgICBmb3JtRGF0YS5hcHBlbmQoICdhY3Rpb24nLCAnZ2V0X2FkZF90b19jYXJ0X3BvcHVwX2NvbnRlbnQnICk7XG5cdFx0XHRcdCAgICBmb3JtRGF0YS5hcHBlbmQoICdwcm9kdWN0X2lkJywgZXZlbnQudGFyZ2V0LmRhdGFzZXQ/LnBhcmVudF9pZCApO1xuXG5cdFx0XHRcdCAgICBmZXRjaCggdmFyX2Zyb21fcGhwLmFqYXhfdXJsLFxuXHRcdFx0XHRcdCAgICB7XG5cdFx0XHRcdFx0XHQgICAgbWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdFx0XHQgICAgYm9keTogZm9ybURhdGEsXG5cdFx0XHRcdFx0ICAgIH0gKVxuXHRcdFx0XHRcdCAgICAudGhlbiggcmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpIClcblx0XHRcdFx0XHQgICAgLnRoZW4oIHJlc3BvbnNlID0+IHtcblx0XHRcdFx0XHRcdCAgICBpZiAoIHJlc3BvbnNlLnN1Y2Nlc3MgKSB7XG5cdFx0XHRcdFx0XHRcdCAgICBQT1BVUF9JTk5FUi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRcdFx0XHRcdFx0ICAgIFBPUFVQX0lOTkVSLmlubmVySFRNTCA9IHJlc3BvbnNlLmRhdGE7XG5cdFx0XHRcdFx0XHQgICAgfVxuXHRcdFx0XHRcdCAgICB9ICk7XG5cdFx0XHQgICAgfVxuXHRcdFx0fVxuXG5cdFx0XHRmYWRlSW4oIFBPUFVQX0VMRU1FTlQgKTtcblxuXHRcdFx0Ly9QT1BVUF9GT1JNX0lOUFVUICYmIFBPUFVQX0ZPUk1fSU5QVVQuZm9jdXMoKTtcblx0XHR9ICk7XG5cblx0fVxuXG5cblx0LyoqXG5cdCAqIENsb3NpbmcgcG9wdXAgd2luZG93XG5cdCAqL1xuXHRjbG9zZVBvcHVwKCkge1xuXHRcdHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCAoIGV2ZW50ICkgPT4ge1xuXG5cdFx0XHQvLyBDaGVjayBpZiB1c2VyIGNsaWNrIG9uIGNsb3NlIGVsZW1lbnRcblx0XHRcdGlmICggIVsuLi5ldmVudC50YXJnZXQuY2xhc3NMaXN0XS5pbmNsdWRlcyggJ2pzLXBvcHVwLWNsb3NlJyApICkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLmZvcmNlQ2xvc2VBbGxQb3B1cCgpO1xuXG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0LmRhdGFzZXQuaHJlZikge1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uYXNzaWduKGV2ZW50LnRhcmdldC5kYXRhc2V0LmhyZWYpXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblxuXHRcdC8vIENoZWNraW5nIEVTQyBidXR0b24gZm9yIGNsb3Npbmcgb3BlbmVkIHBvcHVwIHdpbmRvd1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgKCBldmVudCApID0+IHtcblx0XHRcdGlmICggZXZlbnQua2V5Q29kZSA9PT0gMjcgKSB7XG5cdFx0XHRcdHRoaXMuZm9yY2VDbG9zZUFsbFBvcHVwKCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9XG5cblxuXHRpbml0KCkge1xuXHRcdHRoaXMub3BlblBvcHVwKCk7XG5cdFx0dGhpcy5jbG9zZVBvcHVwKCk7XG5cdH1cbn1cbiJdfQ==
},{"./helpers":2,"@babel/runtime/helpers/classCallCheck":8,"@babel/runtime/helpers/createClass":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/toConsumableArray":13}],5:[function(require,module,exports){
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],6:[function(require,module,exports){
var arrayLikeToArray = require("./arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayLikeToArray.js":5}],7:[function(require,module,exports){
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],8:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],9:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],10:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],11:[function(require,module,exports){
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],12:[function(require,module,exports){
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],13:[function(require,module,exports){
var arrayWithoutHoles = require("./arrayWithoutHoles.js");

var iterableToArray = require("./iterableToArray.js");

var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

var nonIterableSpread = require("./nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayWithoutHoles.js":6,"./iterableToArray.js":11,"./nonIterableSpread.js":12,"./unsupportedIterableToArray.js":14}],14:[function(require,module,exports){
var arrayLikeToArray = require("./arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayLikeToArray.js":5}],15:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],16:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":15}],17:[function(require,module,exports){
/* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
(function () {
  'use strict';

  // polyfill
  function polyfill() {
    // aliases
    var w = window;
    var d = document;

    // return if scroll behavior is supported and polyfill is not forced
    if (
      'scrollBehavior' in d.documentElement.style &&
      w.__forceSmoothScrollPolyfill__ !== true
    ) {
      return;
    }

    // globals
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    // object gathering original scroll methods
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    // define timing method
    var now =
      w.performance && w.performance.now
        ? w.performance.now.bind(w.performance)
        : Date.now;

    /**
     * indicates if a the current browser is made by Microsoft
     * @method isMicrosoftBrowser
     * @param {String} userAgent
     * @returns {Boolean}
     */
    function isMicrosoftBrowser(userAgent) {
      var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

      return new RegExp(userAgentPatterns.join('|')).test(userAgent);
    }

    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    function shouldBailOut(firstArg) {
      if (
        firstArg === null ||
        typeof firstArg !== 'object' ||
        firstArg.behavior === undefined ||
        firstArg.behavior === 'auto' ||
        firstArg.behavior === 'instant'
      ) {
        // first argument is not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError(
        'behavior member of ScrollOptions ' +
          firstArg.behavior +
          ' is not a valid value for enumeration ScrollBehavior.'
      );
    }

    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function hasScrollableSpace(el, axis) {
      if (axis === 'Y') {
        return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
      }

      if (axis === 'X') {
        return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
      }
    }

    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function canOverflow(el, axis) {
      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

      return overflowValue === 'auto' || overflowValue === 'scroll';
    }

    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function isScrollable(el) {
      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

      return isScrollableY || isScrollableX;
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      while (el !== d.body && isScrollable(el) === false) {
        el = el.parentNode || el.host;
      }

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scroll.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object'
              ? arguments[0]
              : w.scrollX || w.pageXOffset,
          // use top prop, second argument if present or fallback to scrollY
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined
              ? arguments[1]
              : w.scrollY || w.pageYOffset
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        arguments[0].left !== undefined
          ? ~~arguments[0].left
          : w.scrollX || w.pageXOffset,
        arguments[0].top !== undefined
          ? ~~arguments[0].top
          : w.scrollY || w.pageYOffset
      );
    };

    // w.scrollBy
    w.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object' ? arguments[0] : 0,
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined ? arguments[1] : 0
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        ~~arguments[0].left + (w.scrollX || w.pageXOffset),
        ~~arguments[0].top + (w.scrollY || w.pageYOffset)
      );
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        // if one number is passed, throw error to match Firefox implementation
        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
          throw new SyntaxError('Value could not be converted');
        }

        original.elementScroll.call(
          this,
          // use left prop, first number argument or fallback to scrollLeft
          arguments[0].left !== undefined
            ? ~~arguments[0].left
            : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
          // use top prop, second argument or fallback to scrollTop
          arguments[0].top !== undefined
            ? ~~arguments[0].top
            : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
        );

        return;
      }

      var left = arguments[0].left;
      var top = arguments[0].top;

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        this,
        this,
        typeof left === 'undefined' ? this.scrollLeft : ~~left,
        typeof top === 'undefined' ? this.scrollTop : ~~top
      );
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.elementScroll.call(
          this,
          arguments[0].left !== undefined
            ? ~~arguments[0].left + this.scrollLeft
            : ~~arguments[0] + this.scrollLeft,
          arguments[0].top !== undefined
            ? ~~arguments[0].top + this.scrollTop
            : ~~arguments[1] + this.scrollTop
        );

        return;
      }

      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function() {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scrollIntoView.call(
          this,
          arguments[0] === undefined ? true : arguments[0]
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(
          this,
          scrollableParent,
          scrollableParent.scrollLeft + clientRects.left - parentRects.left,
          scrollableParent.scrollTop + clientRects.top - parentRects.top
        );

        // reveal parent in viewport unless is fixed
        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
          w.scrollBy({
            left: parentRects.left,
            top: parentRects.top,
            behavior: 'smooth'
          });
        }
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  if (typeof exports === 'object' && typeof module !== 'undefined') {
    // commonjs
    module.exports = { polyfill: polyfill };
  } else {
    // global
    polyfill();
  }

}());

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjdXN0b21pemF0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzbW9vdGhzY3JvbGwgZnJvbSAnc21vb3Roc2Nyb2xsLXBvbHlmaWxsJztcbmltcG9ydCBQb3B1cCBmcm9tICcuL21vZHVsZXMvcG9wdXAtd2luZG93LmpzJztcblxuXG4vLyBUYWtlIHNvbWUgdXNlZnVsIGZ1bmN0aW9uc1xuaW1wb3J0IHtcblx0aXNJblZpZXdwb3J0LFxuXHRjbG9zZXN0X3BvbHlmaWxsLFxuXHRzZXRDb29raWUsXG5cdGRlbGV0ZUNvb2tpZSxcblx0Y2hlY2tMaWZlVGltZSxcblx0Z2V0Q29va2llLFxuXHRkZWJvdW5jZSwgICAgICAgIC8vIFZlcnkgdXNlZnVsIGZ1bmN0aW9uLiBBbHdheXMgdXNlIGl0IGZvciBzdWNoIGV2ZW50cyBsaWtlOlxuXHRcdFx0XHQgICAgIC8vIHNjcm9sbCwgcmVzaXplLCBrZXl1cCwga2V5ZG93biwga2V5cHJlc3MgZXRjLi5cbn0gZnJvbSAnLi9tb2R1bGVzL2hlbHBlcnMuanMnO1xuXG4vLyBUYWJzIGZ1bmN0aW9uYWxpdHkgKHVuY29tbWVudCBpdCBpZiB5b3UgbmVlZCBpdClcbmltcG9ydCB7IHRhYnNOYXZpZ2F0aW9uIH0gZnJvbSAnLi9tb2R1bGVzL25hdmktdGFicyc7XG5cbi8qKlxuICogQWxsIGN1c3RvbSBjb2RlIGlzIHdyYXBwZWQgaW4gSUlGRSBmdW5jdGlvblxuICogdG8gcHJldmVudCBhZmZlY3Qgb3VyIGNvZGUgdG8gYW5vdGhlciBwYXJ0cyBvZiBjb2RlXG4gKi9cbjsoZnVuY3Rpb24gKCAkICkge1xuXG5cdC8qKlxuXHQgKiBQTGVhc2UgQ29sbGVjdCBoZXJlIGFsbCB2YXJpYWJsZXMgd2l0aCBET00gZWxlbWVudHNcblx0ICogVXNlIGNvbnN0IGZvciBhbGwgRE9NIGVsZW1lbnRzIGFuZCB0eXBlIGl0IGFzIFVQUEVSQ0FTRSB0ZXh0XG5cdCAqIEl0IHdpbGwgaGVscCB0byBlYWNoIGRldmVsb3BlciB1bmRlcnN0YW5kIHRoYXQgaXQncyBhIGNvbnN0IG5vdCBhIHZhcmlhYmxlXG5cdCAqL1xuXG5cdC8qKiBAdHlwZSBIVE1MRWxlbWVudCAqL1xuXHRjb25zdCBTSVRFX0hFQURFUiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaXRlLWhlYWRlcicpO1xuXHRjb25zdCBTSVRFX0hFQURFUl9KUyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zaXRlLWhlYWRlcicpO1xuXHRjb25zdCBTRUxFQ1RfV0lUSF9QTEFDRUhPTERFUnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtc2VsZWN0LXdpdGgtcGxhY2Vob2xkZXInKTtcblxuXHRjb25zdCBjaGVja05ld1BlbGVjYW5NZXNzYWdlID0gKCkgPT57XG5cdFx0Y29uc3QgUEVMRUNBTl9DT05UQUlORVIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGVsaWNhbi1wZXRlJyk7XG5cdFx0aWYoUEVMRUNBTl9DT05UQUlORVIpe1xuXHRcdFx0Y29uc3QgUEVMRUNBTl9JREVOVElGSUVSID0gZ2V0Q29va2llKCdwZWxpY2FuX3BldGVfaWRlbnRpZmllcicpO1xuXHRcdFx0Y29uc29sZS5sb2coUEVMRUNBTl9JREVOVElGSUVSKTtcblx0XHRcdGlmKCFQRUxFQ0FOX0NPTlRBSU5FUiB8fCB2YXJfZnJvbV9waHAucGVsaWNhbl9wZXRlX2lkZW50aWZpZXIgIT0gUEVMRUNBTl9JREVOVElGSUVSKXtcblx0XHRcdFx0UEVMRUNBTl9DT05UQUlORVIuY2xhc3NMaXN0LmFkZCgnbmV3Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGNoZWNrTmV3UGVsZWNhbk1lc3NhZ2UoKTtcblxuXHRsZXQgJHRlbXAgPSAkKFwiPGlucHV0IGNsYXNzPSdhYnMnPlwiKTtcblx0bGV0ICR1cmwgPSAkKGxvY2F0aW9uKS5hdHRyKCdocmVmJyk7XG5cblx0JCgnI2NvcHktbGluay1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHQkKFwiYm9keVwiKS5hcHBlbmQoJHRlbXApO1xuXHRcdCR0ZW1wLnZhbCgkdXJsKS5zZWxlY3QoKTtcblx0XHRkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XG5cdFx0JHRlbXAucmVtb3ZlKCk7XG5cdFx0JCgnLmNvcHktdGV4dCcpLmZhZGVJbigpO1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0JCgnLmNvcHktdGV4dCcpLmZhZGVPdXQoKTtcblx0XHR9LCAyMDAwKTtcblx0fSlcblxuXHQvKipcblx0ICogT2NjdXJzIHdoZW4gYWxsIEhUTUwgaGFzIGJlZW4gZnVsbHkgbG9hZGVkIGFuZCBwYXNzZWQgYnkgdGhlIHBhcnNlcixcblx0ICogd2l0aG91dCB3YWl0aW5nIGZvciB0aGUgc3R5bGVzaGVldHMsIGltYWdlcyBhbmQgZnJhbWVzIHRvIGZpbmlzaCBsb2FkaW5nXG5cdCAqL1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdGNvbnNvbGUubG9nKFwiRE9NIGZ1bGx5IGxvYWRlZCBhbmQgcGFyc2VkIC0gUkVBRFkgZXZlbnRcIik7XG5cblx0XHQvLyBraWNrIG9mZiB0aGUgcG9seWZpbGwgKCBEb24ndCBkZWxldGUgaXQgKVxuXHRcdHNtb290aHNjcm9sbC5wb2x5ZmlsbCgpO1xuXG5cdFx0Ly8gSW5pdCBDbG9zZXN0IHBvbHlmaWxsIG1ldGhvZCAoIERvbid0IGRlbGV0ZSBpdCApXG5cdFx0Y2xvc2VzdF9wb2x5ZmlsbCgpO1xuXG5cdFx0Ly8gSW5pdCBQb3B1cCBXaW5kb3dzICggdXNlIGl0IGlmIHlvdSBuZWVkIFBvcHVwIGZ1bmN0aW9uYWxpdHkgKVxuXHRcdGNvbnN0IHBvcHVwX2luc3RhbmNlID0gbmV3IFBvcHVwKCk7XG5cdFx0cG9wdXBfaW5zdGFuY2UuaW5pdCgpO1xuXHRcdGNvbnN0IFdFTENPTUVfUE9QVVAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2VsY29tZS1wb3B1cCcpO1xuXHRcdGlmKFdFTENPTUVfUE9QVVApe1xuXHRcdFx0Y29uc3QgV0VMQ09NRV9QT1BVUF9DT09LSUVfVElNRSA9IGdldENvb2tpZSgnd2VsY29tZV9wb3B1cF90aW1lJyk7XG5cdFx0XHRjb25zdCBQT1BVUF9DT09LSUVfVElNRSA9IHZhcl9mcm9tX3BocC5ob3dfb2Z0ZW5fdG9fc2hvd19wb3B1cDtcblx0XHRcdFdFTENPTUVfUE9QVVAgJiYgY2hlY2tMaWZlVGltZShXRUxDT01FX1BPUFVQX0NPT0tJRV9USU1FLCBQT1BVUF9DT09LSUVfVElNRSk7XG5cdFx0XHRjb25zdCBXRUxDT01FX1BPUFVQX0NPT0tJRSA9IGdldENvb2tpZSgnd2VsY29tZV9wb3B1cCcpO1xuXHRcdFx0IVdFTENPTUVfUE9QVVBfQ09PS0lFICYmIFdFTENPTUVfUE9QVVAgJiYgcG9wdXBfaW5zdGFuY2Uub3Blbk9uZVBvcHVwKCcjd2VsY29tZS1wb3B1cCcsIDMwMDApO1xuXHRcdH1cblxuXHRcdC8vIEluaXQgVGFicyBOYXZpZ2F0aW9uXG5cdFx0dGFic05hdmlnYXRpb24oICcuanMtdGFicy1uYXYtYnRuJywgJy5qcy10YWJzLW5hdi1wYW5lbCcsIHRydWUpO1xuXG5cdFx0aWYgKCB0eXBlb2YgV09XICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdG5ldyBXT1coe2FuaW1hdGVDbGFzczogJ2FuaW1hdGVfX2FuaW1hdGVkJ30pLmluaXQoKTtcblx0XHR9XG5cdFx0Y29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlciggXCIuanMtcGFydG5lcnNcIiwge1xuXHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdGxvb3A6dHJ1ZSxcblx0XHRcdGJyZWFrcG9pbnRzOiB7XG5cdFx0XHRcdDU3MDoge1xuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiA0MCxcblx0XHRcdFx0fSxcblx0XHRcdFx0NzY4OiB7XG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDQwLFxuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdDEwMzA6IHtcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiA0LFxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogNDAsXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdH0gKTtcblxuXG5cdFx0Ly9pbml0IGVsZW1lbnRzIHBhcmFsYXggc2Nyb2xsXG5cdFx0bGV0IHJlbGxheCA9IG5ldyBSZWxsYXgoJy5yZWxsYXgnLHtcblx0XHRcdGNlbnRlcjogdHJ1ZVxuXHRcdH0pO1xuXG5cdFx0Y29uc3Qgb2JzZXJ2ZXIgPSBsb3phZCgpOyAvLyBsYXp5IGxvYWRzIGVsZW1lbnRzIHdpdGggZGVmYXVsdCBzZWxlY3RvciBhcyAnLmxvemFkJ1xuXHRcdG9ic2VydmVyLm9ic2VydmUoKTtcblxuXHRcdC8vQ2xvc2UgcG9wdXAgYWZ0ZXIgc2VudCBmb3JtXG5cblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnd3BjZjdtYWlsc2VudCcsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcblx0XHRcdFx0JCgnLmpzLXBvcHVwLWNsb3NlJykudHJpZ2dlcignY2xpY2snKTtcblx0XHRcdH0sMjAwMCk7XG5cblx0XHR9LCBmYWxzZSApO1xuXG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdFx0XHQkKCdpbnB1dFtuYW1lPVwic29ydGJ5XCJdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0JCh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XG5cdFx0XHR9KTtcblx0XHRcdCQoJy5qcy1zZWxlY3Qtd2l0aC1wbGFjZWhvbGRlcicpLnNlbGVjdDIoe1xuXHRcdFx0XHRkcm9wZG93blBhcmVudDogJCgnLmpzLXNlbGVjdC13cmFwcGVyJyksXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBcIkhvdyBjYW4gd2UgaGVscD9cIixcblx0XHRcdFx0YWxsb3dDbGVhcjogdHJ1ZSxcblx0XHRcdFx0bWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQHR5cGUge2pRdWVyeX1cblx0XHRcdCAqL1xuXHRcdFx0Y29uc3QgJHN0YXRlU2VsZWN0V3JhcHBlciA9ICQoJy5qcy1zZWxlY3Qtc3RhdGUtd3JhcHBlcicpO1xuXHRcdFx0JHN0YXRlU2VsZWN0V3JhcHBlci5lYWNoKChpLCBlbCkgPT4ge1xuXHRcdFx0XHRjb25zdCAkZWwgPSAkKGVsKTtcblx0XHRcdFx0Y29uc3QgJHNlbGVjdCA9ICRlbC5maW5kKCcuanMtc2VsZWN0LXN0YXRlJyk7XG5cdFx0XHRcdGNvbnN0IGlzTXVsdGlwbGUgPSAhISRzZWxlY3QuYXR0cignbXVsdGlwbGUnKTtcblx0XHRcdFx0JHNlbGVjdC5zZWxlY3QyKHtcblx0XHRcdFx0XHRjbG9zZU9uU2VsZWN0OiAhaXNNdWx0aXBsZSxcblx0XHRcdFx0XHRkcm9wZG93blBhcmVudDogJGVsLFxuXHRcdFx0XHRcdGRyb3Bkb3duQ3NzQ2xhc3M6IGlzTXVsdGlwbGUgPyAnY29udGFpbmVyLS1tdWx0aXBsZScgOiAnJyxcblx0XHRcdFx0XHRwbGFjZWhvbGRlcjogJHNlbGVjdC5maW5kKCdvcHRpb24nKS5maXJzdCgpLnRleHQoKSxcblx0XHRcdFx0XHRhbGxvd0NsZWFyOiBmYWxzZSxcblx0XHRcdFx0XHRtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXG5cdFx0XHRcdH0pXG5cdFx0XHR9KVxuXHRcdFx0Ly9jbGVhcmluZyBzdGF0ZSBmaWVsZHMgd2hlbiB0aGV5IGFyZSBhdmFpbGFibGUgYWZ0ZXIgc3VibWl0dGluZyB0aGUgZm9ybS5cblx0XHRcdCQoZG9jdW1lbnQpLm9uKCd3cGNmN21haWxzZW50JywgKCkgPT4ge1xuXHRcdFx0XHQkc3RhdGVTZWxlY3RXcmFwcGVyLmZpbmQoJ3NlbGVjdCcpLnZhbCgnJykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0XHR9KVxuXG5cdFx0XHQvKiAkKCcuanMtc2VsZWN0LXN0YXRlJykuc2VsZWN0Mih7XG5cdFx0XHRcdGNsb3NlT25TZWxlY3QgOiBmYWxzZSxcblx0XHRcdFx0ZHJvcGRvd25QYXJlbnQ6ICQoJy5qcy1zZWxlY3Qtc3RhdGUtd3JhcHBlcicpLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogXCIqU3RhdGVcIixcblx0XHRcdFx0YWxsb3dDbGVhcjogZmFsc2UsXG5cdFx0XHRcdG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcblx0XHRcdH0pLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGxldCBzdGF0ZSA9ICQoJy5qcy1zZWxlY3Qtc3RhdGUgb3B0aW9uOnNlbGVjdGVkJykudmFsKCk7XG5cdFx0XHRcdGlmICh0eXBlb2Ygc3RhdGVsaXN0ICE9PSBcInVuZGVmaW5lZFwiICYmIHN0YXRlX2xpc3QgJiYgc3RhdGVfbGlzdFtzdGF0ZV0pIHtcblx0XHRcdFx0XHQkKCcuc2VsbGluZy1pbnN1cmFuY2UtZmllbGQnKS52YWwoc3RhdGVfbGlzdFtzdGF0ZV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTsgKi9cblx0XHRcdCQoJy5yZXNvdXJjZXMtZm9ybSAuanMtc2VsZWN0LWNhdGVnb3J5Jykuc2VsZWN0Mih7XG5cdFx0XHRcdGRyb3Bkb3duUGFyZW50OiAkKCcucmVzb3VyY2VzLWZvcm0gLmpzLXNlbGVjdC1jYXRlZ29yeS13cmFwcGVyJyksXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBcIkkgd291bGQgbGlrZSB0byByZWNlaXZlXCIsXG5cdFx0XHRcdGFsbG93Q2xlYXI6IHRydWUsXG5cdFx0XHRcdG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcblx0XHRcdH0pO1xuXHRcdFx0XHQkKCcjYmxvY2stZm9ybS1zdGlja3kgLmpzLXNlbGVjdC1jYXRlZ29yeScpLnNlbGVjdDIoe1xuXHRcdFx0XHRkcm9wZG93blBhcmVudDogJCgnI2Jsb2NrLWZvcm0tc3RpY2t5IC5qcy1zZWxlY3QtY2F0ZWdvcnktd3JhcHBlcicpLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogXCJJIHdvdWxkIGxpa2UgdG8gcmVjZWl2ZVwiLFxuXHRcdFx0XHRhbGxvd0NsZWFyOiB0cnVlLFxuXHRcdFx0XHRtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8vc2Nyb2xsIHVwXG5cdFx0Y29uc3Qgc2Nyb2xsVXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2Nyb2xsLXRvcCcpO1xuXHRcdGlmICh0eXBlb2Yoc2Nyb2xsVXApICE9ICd1bmRlZmluZWQnICYmIHNjcm9sbFVwICE9IG51bGwpe1xuXHRcdFx0c2Nyb2xsVXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG5cdFx0XHRcdHdpbmRvdy5zY3JvbGxUbyh7XG5cdFx0XHRcdFx0dG9wOiAwLFxuXHRcdFx0XHRcdGJlaGF2aW9yOiBcInNtb290aFwiXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdC8vIChTRUxFQ1RfV0lUSF9QTEFDRUhPTERFUnMpXG5cdFx0Ly8gJiYgWy4uLlNFTEVDVF9XSVRIX1BMQUNFSE9MREVSc10uZm9yRWFjaCggaXRlbSA9PiB7XG5cdFx0Ly8gXHRjb25zdCBlbXB0eU9wdGlvbiA9IGl0ZW0ucXVlcnlTZWxlY3Rvcignb3B0aW9uW3ZhbHVlPVwiXCJdJyk7XG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnZW1wdHlPcHRpb24nLCBlbXB0eU9wdGlvbik7XG5cdFx0Ly8gXHRlbXB0eU9wdGlvbiAmJiBlbXB0eU9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0Ly8gfSk7XG5cblx0XHQvKipcblx0XHQgKiBBZGQgZ2xvYmFsIGhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50XG5cdFx0ICogVGhlIG1haW4gaWRlYSAtIHRvIGltcHJvdmUgc2l0ZSBwZXJmb3JtYW5jZVxuXHRcdCAqIFdlIGFkZGVkIG9ubHkgMSBldmVudCBoYW5kbGVyIHRvIFwiY2xpY2tcIiBldmVudFxuXHRcdCAqIGFuZCB0aGVuIHVzZSBkYXRlLXJvbGUgYXR0cmlidXRlIG9uIGVhY2goIG5lZWRlZCApIGVsZW1lbnRzXG5cdFx0ICogdG8gZGVmaW5lIG9uIHdoaWNoIGVsZW1lbnQgZXZlbnQgd2FzIGV4ZWN1dGVkLi5cblx0XHQgKi9cblx0XHQgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3dwY2Y3bWFpbHNlbnQnLCBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRpZiAoICcyMzYnID09IGV2ZW50LmRldGFpbC5jb250YWN0Rm9ybUlkICkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4rXCIvdGhhbmsteW91LWZhcS9cIjtcbiAgICBcdH1lbHNlIGlmKCc1NTknID09IGV2ZW50LmRldGFpbC5jb250YWN0Rm9ybUlkKXtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luK1wiL3RoYW5rLXlvdS1yZXNvdXJjZXMvXCI7XG5cdFx0XHR9ZWxzZSBpZignNjU0JyA9PSBldmVudC5kZXRhaWwuY29udGFjdEZvcm1JZCl7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbitcIi90aGFuay15b3UtcmVzb3VyY2VzL1wiO1xuXHRcdFx0fWVsc2UgaWYoJzI2MycgPT0gZXZlbnQuZGV0YWlsLmNvbnRhY3RGb3JtSWQpe1xuXHRcdFx0XHRpZihldmVudC5kZXRhaWwuaW5wdXRzWzhdLnZhbHVlID09ICdDb250YWN0IFVzLSBHZW5lcmFsIElucXVpcnknKXtcblx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4rXCIvdGhhbmsteW91LWNvbnRhY3QtdXMvXCI7XG5cdFx0XHRcdH1lbHNlIGlmKGV2ZW50LmRldGFpbC5pbnB1dHNbOF0udmFsdWUgPT0gJ0NvbnRhY3QgVXMtIEdldCBOb3RpZmllZCcpe1xuXHRcdFx0XHRcdGxldCBlbmRwb2ludFVybCA9IChldmVudC5kZXRhaWwuaW5wdXRzWzhdLnZhbHVlID09IDMpID8gJ3RoYW5rLXlvdS1zdGF0ZS1ob21lJyA6ICd0aGFuay15b3Utc3RhdGUtcXVvdGUnO1xuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbitcIi9cIitlbmRwb2ludFVybCtcIi8/c3RhdGU9XCIrZXZlbnQuZGV0YWlsLmlucHV0c1s1XS52YWx1ZTtcblx0XHRcdFx0fWVsc2UgaWYoZXZlbnQuZGV0YWlsLmlucHV0c1s4XS52YWx1ZSA9PSAnQ29udGFjdCBVcy0gUGFydG5lcnNoaXBzJyl7XG5cdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luK1wiL3RoYW5rLXlvdS1wYXJ0bmVyc2hpcC9cIjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIGZhbHNlICk7XG5cdFx0Ly9zaG93IHN0YXRlIG5hbWUgYnkgaG92ZXIgb24gc3RhdGUgbWFwXG5cdFx0Y29uc3Qgc3RhdGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN2Zy1ob3ZlcicpO1xuXHRcdGlmICh0eXBlb2Yoc3RhdGVMaXN0KSAhPSAndW5kZWZpbmVkJyAmJiBzdGF0ZUxpc3QgIT0gbnVsbCl7XG5cdFx0XHRzdGF0ZUxpc3QuZm9yRWFjaCgoZWwpID0+XG5cdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChldmVudCkgPT4ge1xuXHRcdFx0XHRsZXQgc3RhdGVOYW1lID0gZWwuZGF0YXNldC5pbmZvO1xuXHRcdFx0XHRjb25zdCBzdGF0ZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5zdXJpbmctYm9hdF9fbWFwLXN0YXRlJyk7XG5cdFx0XHRcdHN0YXRlRWxlbS5pbm5lckhUTUwgPSBzdGF0ZU5hbWU7XG5cdFx0XHRcdHN0YXRlRWxlbS5zdHlsZS5vcGFjaXR5ID0gXCIwLjZcIjtcblx0XHRcdFx0Ly9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5zdXJpbmctYm9hdF9fbWFwLXN0YXRlJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0XHR9KSk7XG5cdFx0XHRzdGF0ZUxpc3QuZm9yRWFjaCgoZWwpID0+XG5cdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRcdGNvbnN0IHN0YXRlRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnN1cmluZy1ib2F0X19tYXAtc3RhdGUnKTtcblx0XHRcdFx0c3RhdGVFbGVtLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcblx0XHRcdFx0Ly9zdGF0ZUVsZW0uaW5uZXJIVE1MID0gJyc7XG5cdFx0XHR9KSk7XG5cdFx0fVxuXHRcdGNvbnN0IHNob3dDb250YWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnN1cmluZy1ib2F0X19tYXAtYm90dG9tLWxpbmsnKTtcblx0XHRpZihzaG93Q29udGFjdEZvcm0pe1xuXHRcdFx0c2hvd0NvbnRhY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBzb3Vyc2VTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc291cnNlLXNlbGVjdCcpO1xuXHRcdFx0XHRzb3Vyc2VTZWxlY3QudmFsdWUgPSAnQ29udGFjdCBVcy0gR2V0IE5vdGlmaWVkJztcblx0XHRcdFx0c291cnNlU2VsZWN0LmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5FdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIGV2ZW50ID0+IHtcblx0XHRcdGNvbnN0IFJPTEUgPSBldmVudC50YXJnZXQuZGF0YXNldC5yb2xlO1xuXHRcdFx0Y29uc3QgVEFSR0VUID0gZXZlbnQudGFyZ2V0O1xuXHRcdFx0aWYgKCAhUk9MRSApIHJldHVybjtcblxuXHRcdFx0c3dpdGNoICggUk9MRSApIHtcblxuXHRcdFx0XHQvLyBTY3JvbGwgcGFnZSB0byB0b3Bcblx0XHRcdFx0Y2FzZSAncGxheS12aWRlbyc6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgdmlkZW9JZCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmlkXG5cdFx0XHRcdFx0bGV0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmlkZW9JZCk7XG5cdFx0XHRcdFx0aWYgKHZpZGVvLnBhdXNlZCkge1xuXHRcdFx0XHRcdFx0dmlkZW8ucGxheSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlICB7XG5cdFx0XHRcdFx0XHR2aWRlby5wYXVzZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdvcGVuLXBhbGFjYW4tbWVzc2FnZSc6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBQRUxFQ0FOX0NPTlRBSU5FUiA9IFRBUkdFVC5jbG9zZXN0KCcucGVsaWNhbi1wZXRlJyk7XG5cdFx0XHRcdFx0aWYoUEVMRUNBTl9DT05UQUlORVIuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXcnKSl7XG5cdFx0XHRcdFx0XHRzZXRDb29raWUoJ3BlbGljYW5fcGV0ZV9pZGVudGlmaWVyJywgdmFyX2Zyb21fcGhwLnBlbGljYW5fcGV0ZV9pZGVudGlmaWVyLCAzNjUpO1xuXHRcdFx0XHRcdFx0UEVMRUNBTl9DT05UQUlORVIuY2xhc3NMaXN0LnJlbW92ZSgnbmV3Jylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoIVBFTEVDQU5fQ09OVEFJTkVSLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpe1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coUEVMRUNBTl9DT05UQUlORVIuY2xhc3NMaXN0KTtcblx0XHRcdFx0XHRcdFBFTEVDQU5fQ09OVEFJTkVSLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0UEVMRUNBTl9DT05UQUlORVIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2Nsb3NlLXBhbGFjYW4tbWVzc2FnZSc6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBQRUxFQ0FOX0NPTlRBSU5FUiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wZWxpY2FuLXBldGUnKTtcblx0XHRcdFx0XHRQRUxFQ0FOX0NPTlRBSU5FUiAmJiBQRUxFQ0FOX0NPTlRBSU5FUi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdmYXEnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qaWYoIWV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKXtcblx0XHRcdFx0XHRcdFx0ZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG5cdFx0XHRcdFx0XHRcdGxldCBzZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mYXEtc2VjdGlvbl9fdGl0bGUuYWN0aXZlJyk7XG5cdFx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2VjdGlvbnMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VjdGlvbnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0bGV0IHF1ZXN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mYXEtc2VjdGlvbl9fcXVlc3Rpb25zLmFjdGl2ZScpO1xuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0aW9ucy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0XHRcdFx0Ly9xdWVzdGlvbnNbaV0uc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcblx0XHRcdFx0XHRcdFx0XHRxdWVzdGlvbnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0ZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG5cdFx0XHRcdFx0XHR9Ki9cblx0XHRcdFx0XHRcdGV2ZW50LnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xuXHRcdFx0XHRcdFx0bGV0IGZhcSA9IGV2ZW50LnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cdFx0XHRcdFx0XHRmYXEuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcblx0XHRcdFx0XHRcdGlmIChmYXEuc3R5bGUubWF4SGVpZ2h0KSB7XG5cdFx0XHRcdFx0XHRcdGZhcS5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0ZmFxLnN0eWxlLm1heEhlaWdodCA9IGZhcS5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdlbGVtZW50Mic6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBzb21lIHJlcXVpcmVkIGFjdGlvblxuXHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdH0pO1xuXHRjb25zdCBnZXRPZmZzZXRUb3AgPSBlbGVtZW50ID0+IHtcblx0XHRsZXQgb2Zmc2V0VG9wID0gMDtcblx0XHR3aGlsZShlbGVtZW50KSB7XG5cdFx0XHRvZmZzZXRUb3AgKz0gZWxlbWVudC5vZmZzZXRUb3A7XG5cdFx0XHRlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG5cdFx0fVxuXHRcdHJldHVybiBvZmZzZXRUb3A7XG5cdH1cblx0bGV0IHN0aWNreV9mb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibG9jay1mb3JtLXN0aWNreVwiKTtcblx0bGV0IG9yaWdPZmZzZXQgPSBnZXRPZmZzZXRUb3Aoc3RpY2t5X2Zvcm0pO1xuXHRmdW5jdGlvbiBzdGlja3lTdWJzY3JpYmVGb3JtKCkge1xuXHRcdGxldCBib3R0b21fc2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm90dG9tLXNlY3Rpb25cIik7XG5cdFx0bGV0IG9yaWdPZmZzZXRCb3R0b20gPSBnZXRPZmZzZXRUb3AoYm90dG9tX3NlY3Rpb24pO1xuXHRcdGxldCBoZWFkZXJIZWlnaHQgPSBTSVRFX0hFQURFUi5vZmZzZXRIZWlnaHQ7XG5cdFx0bGV0IGJsb2NrSGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibG9jay1mb3JtLXN0aWNreVwiKS5vZmZzZXRIZWlnaHQ7XG5cdFx0aWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPiAxMDMwKSB7XG5cdFx0XHRpZih3aW5kb3cucGFnZVlPZmZzZXQgKyAxMTAgPj0gb3JpZ09mZnNldCAmJiAoKHdpbmRvdy5wYWdlWU9mZnNldCArIGJsb2NrSGVpZ2h0KSArIDExMCArIDE0NSkgPCBvcmlnT2Zmc2V0Qm90dG9tKXtcblx0XHRcdFx0c3RpY2t5X2Zvcm0uY2xhc3NMaXN0LmFkZChcImZpeGVkXCIpO1xuXHRcdFx0XHRzdGlja3lfZm9ybS5jbGFzc0xpc3QucmVtb3ZlKFwiZml4ZWQtYm90dG9tXCIpO1xuXHRcdFx0fWVsc2UgaWYoKCh3aW5kb3cucGFnZVlPZmZzZXQgKyBibG9ja0hlaWdodCkgKyAxMTAgKyAxNDUpID49IG9yaWdPZmZzZXRCb3R0b20pe1xuXHRcdFx0XHRzdGlja3lfZm9ybS5jbGFzc0xpc3QuYWRkKFwiZml4ZWQtYm90dG9tXCIpO1xuXHRcdFx0XHRzdGlja3lfZm9ybS5jbGFzc0xpc3QucmVtb3ZlKFwiZml4ZWRcIik7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0c3RpY2t5X2Zvcm0uY2xhc3NMaXN0LnJlbW92ZShcImZpeGVkXCIpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0c3RpY2t5X2Zvcm0uY2xhc3NMaXN0LnJlbW92ZShcImZpeGVkLWJvdHRvbVwiKTtcblx0XHRcdHN0aWNreV9mb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJmaXhlZFwiKTtcblx0XHR9XG5cdH1cblx0aWYodHlwZW9mKHN0aWNreV9mb3JtKSAhPSAndW5kZWZpbmVkJyAmJiBzdGlja3lfZm9ybSAhPSBudWxsKXtcblx0XHRzdGlja3lTdWJzY3JpYmVGb3JtKCk7XG5cdH1cblx0Ly9zaG93IHNjcm9sbCBVcCBidXR0b24gd2hlbiBzY3JvbGwgbW9yZSB0aGFuIDUwMFxuXHRjb25zdCBzaG93U2Nyb2xsVXAgPSAoKSA9PiB7XG5cdFx0Y29uc3Qgc2Nyb2xsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY3JvbGwtdG9wXCIpO1xuXHRcdGxldCBvcGVyYXRpb25UeXBlID0gKCB3aW5kb3cucGFnZVlPZmZzZXQgPiA1MDAgKSA/ICdhZGQnIDogJ3JlbW92ZSc7XG5cdFx0KHNjcm9sbEJ0bikgJiYgc2Nyb2xsQnRuLmNsYXNzTGlzdFtvcGVyYXRpb25UeXBlXSgnc2hvdycpO1xuXHRcdChzY3JvbGxCdG4pICYmIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0W29wZXJhdGlvblR5cGVdKCdoYXMtc2Nyb2xsLXVwJyk7XG5cdH1cblx0c2hvd1Njcm9sbFVwKCk7XG5cdC8vc2hvdyBzY3JvbGwgaGludFxuXHRjb25zdCBzaG93SGlkZVNjcm9sbEhpbnQgPSAoKSA9Pntcblx0XHRjb25zdCBTQ1JPTExfSElOVCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtaGludCcpO1xuXHRcdGlmKFNDUk9MTF9ISU5UKXtcblx0XHRcdGxldCBvcGVyYXRpb25UeXBlID0gKCB3aW5kb3cucGFnZVlPZmZzZXQgPiAwICkgPyAnYWRkJyA6ICdyZW1vdmUnO1xuXHRcdFx0U0NST0xMX0hJTlQuY2xhc3NMaXN0W29wZXJhdGlvblR5cGVdKFwiaGlkZVwiKTtcblx0XHR9XG5cdH1cblx0LyoqXG5cdCAqIENhdGNoIFNjcm9sbCBldmVudFxuXHQgKi9cblx0c2hvd0hpZGVTY3JvbGxIaW50KCk7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBkZWJvdW5jZSggKGV2ZW50KSA9PiB7XG5cdFx0Ly9zaG93IGhpZGUgc2Nyb2xsIGhpbnRcblx0XHRzaG93SGlkZVNjcm9sbEhpbnQoKTtcblx0XHRsZXQgc2Nyb2xsQW1vdW50ICA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuXHRcdGxldCBvcGVyYXRpb25UeXBlID0gKCBzY3JvbGxBbW91bnQ+MCApID8gJ2FkZCcgOiAncmVtb3ZlJztcblxuXHRcdC8vIEFkZC9yZW1vdmUgc2l0ZSBoZWFkZXIgYWRkaXRpb25hbCBcInN0aWNreVwiIGNsYXNzXG5cdFx0KFNJVEVfSEVBREVSX0pTKSAmJiBTSVRFX0hFQURFUl9KUy5jbGFzc0xpc3Rbb3BlcmF0aW9uVHlwZV0oJ3NpdGUtaGVhZGVyX19zdGlja3knKTtcblx0XHQvL3Nob3cgZ2V0IGEgcXVvdGUgb24gaG9tZXBhZ2Ugd2hlbiBjdGEgZnJvbSBiYW5uZXIgaXMgbm90IGluIHBvcnR2aWV3XG5cdFx0bGV0IGN0YV9idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN0YS1idG5cIik7XG5cdFx0aWYodHlwZW9mKGN0YV9idG4pICE9ICd1bmRlZmluZWQnICYmIGN0YV9idG4gIT0gbnVsbCl7XG5cdFx0XHRsZXQgaGVhZGVySGVpZ2h0ID0gU0lURV9IRUFERVIub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0bGV0IGdldF9xdW90ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaXRlLWhlYWRlcl9fYnRuJyk7XG5cdFx0XHRsZXQgc2hvdyA9IGlzSW5WaWV3cG9ydChjdGFfYnRuLCAwIC0gaGVhZGVySGVpZ2h0KTtcblx0XHRcdGlmIChzaG93ID09IGZhbHNlKSB7XG5cdFx0XHRcdGdldF9xdW90ZS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGdldF9xdW90ZS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0bGV0IGNydWlzaW5nU2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NydWlzaW5nLXNlY3Rpb25fX3Njcm9sbCcpO1xuXHRcdGlmKHR5cGVvZihjcnVpc2luZ1NsaWRlcikgIT0gJ3VuZGVmaW5lZCcgJiYgY3J1aXNpbmdTbGlkZXIgIT0gbnVsbCl7XG5cdFx0XHRsZXQgaXNDcnVpc2luZyA9IGlzSW5WaWV3cG9ydChjcnVpc2luZ1NsaWRlciwgMCk7XG5cdFx0XHRpZighaXNDcnVpc2luZyl7XG5cdFx0XHRcdGNydWlzaW5nU2xpZGVyUmVzZXQoKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQkKCcjY3J1aXNpbmctc2VjdGlvbl9fc2xpZGVyJykuc2xpY2soJ3NsaWNrU2V0T3B0aW9uJywgJ2F1dG9wbGF5JywgdHJ1ZSk7XG5cdFx0XHRcdCQoJyNjcnVpc2luZy1zZWN0aW9uX19zbGlkZXInKS5zbGljayhcInBsYXlcIik7XG5cdFx0XHR9XG5cblx0XHR9XG5cdFx0bGV0IHN0aWNreV9mb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibG9jay1mb3JtLXN0aWNreVwiKTtcblx0XHRpZih0eXBlb2Yoc3RpY2t5X2Zvcm0pICE9ICd1bmRlZmluZWQnICYmIHN0aWNreV9mb3JtICE9IG51bGwpe1xuXHRcdFx0c3RpY2t5U3Vic2NyaWJlRm9ybSgpO1xuXHRcdH1cblx0XHRzaG93U2Nyb2xsVXAoKTtcblx0fSwgMCkpO1xuXG5cdGNvbnN0IHJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG5cdFx0LyoqIEB0eXBlIEhUTUxFbGVtZW50ICovXG5cdFx0Y29uc3QgcHJpbWFyeVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpbWFyeS13cmFwcGVyJyk7XG5cdFx0cHJpbWFyeVdyYXBwZXIuc3R5bGUubWFyZ2luQmxvY2tTdGFydCA9IGAke1NJVEVfSEVBREVSLm9mZnNldEhlaWdodH1weGA7XG5cdH0pO1xuXHRyZXNpemVPYnNlcnZlci5vYnNlcnZlKFNJVEVfSEVBREVSKTtcblxuXHQvLyBVc2UgaXQgd2hlbiB5b3UgbmVlZCB0byBrbm93IHRoYXQgZXZlcnl0aGluZyBpcyBsb2FkZWQgKGh0bWwsIHN0eWxlcywgaW1hZ2VzKVxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldmVudCkgPT4ge1xuXHRcdGNvbnNvbGUubG9nKCdwYWdlIGlzIGZ1bGx5IGxvYWRlZCcpO1xuXHRcdGJvYXRBbmltYXRlKCk7XG5cdFx0c2lkZUltYWdlQW5pbWF0aW9uKCk7XG5cdFx0LyoqXG5cdFx0ICogU2ltcGxlIGhhY2sgZm9yIHNvbWUgY2FzZXNcblx0XHQgKi9cblx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoICdsb2FkZWQnICk7XG5cdFx0fSwgNTAwICk7XG5cblxuXHRcdGxldCBxdWVzdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmFxLXNlY3Rpb25fX3F1ZXN0aW9ucy5hY3RpdmUnKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0aW9ucy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRxdWVzdGlvbnNbaV0uc3R5bGUubWF4SGVpZ2h0ID0gcXVlc3Rpb25zW2ldLnNjcm9sbEhlaWdodCArIFwicHhcIjtcblx0XHR9XG5cblx0fSk7XG5cdC8vc2hvdyBtb2JpbGUgbWVudVxuXHRjb25zdCBtZW51QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vYmlsZS1tZW51LWJ0bicpO1xuXHRtZW51QnRuICYmIG1lbnVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdtZW51LW9wZW4nKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2l0ZS1oZWFkZXInKS5jbGFzc0xpc3QudG9nZ2xlKCdtZW51LW9wZW5lZCcpO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2JpbGUtbWVudScpLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcblx0fSk7XG5cdC8vY3V0dGluZyBlZGdlIHNsaWRlclxuXHRpZigkKCcuY3V0dGluZy1lZGdlLXRlY2hub2xvZ3lfX3NsaWRlcicpLmxlbmd0aCA+IDApe1xuXHRcdCQoJy5jdXR0aW5nLWVkZ2UtdGVjaG5vbG9neV9fc2xpZGVyJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0JCh0aGlzKS5zbGljayh7XG5cdFx0XHRcdGRvdHM6IHRydWUsXG5cdFx0XHRcdGFycm93czogZmFsc2UsXG5cdFx0XHRcdHNwZWVkOiA1MDAsXG5cdFx0XHRcdGZhZGU6IHRydWUsXG5cdFx0XHRcdGNzc0Vhc2U6ICdsaW5lYXInLFxuXHRcdFx0XHRzbGlkZXNUb1Nob3c6IDEsXG5cdFx0XHRcdGluZmluaXRlOiB0cnVlLFxuXHRcdFx0XHRhdXRvcGxheTogdHJ1ZSxcbiAgXHRcdFx0YXV0b3BsYXlTcGVlZDogMTAwMDAsXG5cdFx0XHR9KS5vbignYmVmb3JlQ2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaywgY3VycmVudFNsaWRlLCBuZXh0U2xpZGUpIHtcblx0XHRcdFx0bGV0IGlkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XG5cdFx0XHRcdCQoJy5jdXR0aW5nLWVkZ2UtdGVjaG5vbG9neV9fcGhvbmUtYnRuLWNvbnRhaW5lci0nK2lkKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdCQoJy5jdXR0aW5nLWVkZ2UtdGVjaG5vbG9neV9fcGhvbmUtYnRuLScraWQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0JCgnLmN1dHRpbmctZWRnZS10ZWNobm9sb2d5X19waG9uZS1pbWFnZS0nK2lkKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdCQoJy5jdXR0aW5nLWVkZ2UtdGVjaG5vbG9neV9fcGhvbmUtaW1hZ2UtJytpZCsnLScrbmV4dFNsaWRlKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdCQoJyNjdXR0aW5nLWVkZ2UtJytpZCsnLScrbmV4dFNsaWRlKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdCQoJyNjdXR0aW5nLWVkZ2UtJytpZCsnLScrbmV4dFNsaWRlKS5maW5kKCcuY3V0dGluZy1lZGdlLXRlY2hub2xvZ3lfX3Bob25lLWJ0bicpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cdC8vY2hhbmdlIGN1dHRpbmctZWRnZS1zbGlkZXIgc2xpZGUgYnkgY2xpY2tpbmcgb24gaWNvbnNcblx0JCgnLmN1dHRpbmctZWRnZS10ZWNobm9sb2d5X19waG9uZS1idG4nKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHQkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cdFx0XHRpZighJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpe1xuXHRcdFx0XHRsZXQgaWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcblx0XHRcdFx0bGV0IHNldFNsaWRlID0gJCh0aGlzKS5hdHRyKCdkYXRhLXNsaWRlJyk7XG5cdFx0XHRcdC8vICQoJy5jdXR0aW5nLWVkZ2UtdGVjaG5vbG9neV9fcGhvbmUtYnRuLWNvbnRhaW5lci0nK2lkKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdC8vICQoJy5jdXR0aW5nLWVkZ2UtdGVjaG5vbG9neV9fcGhvbmUtYnRuLScraWQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0Ly8gJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdC8vICQodGhpcykuY2xvc2VzdCgnLmN1dHRpbmctZWRnZS10ZWNobm9sb2d5X19waG9uZS1idG4tY29udGFpbmVyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQkKCcjY3V0dGluZy1lZGdlLXNsaWRlci0nK2lkKS5zbGljaygnc2xpY2tHb1RvJywgc2V0U2xpZGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblx0Ly90ZXN0aW1vbmlhbHMgc2xpZGVyXG5cdGlmKCQoJy50ZXN0aW1vbmlhbHMtYmxvY2tfX3NsaWRlcicpLmxlbmd0aCA+IDApIHtcblx0XHQkKCcudGVzdGltb25pYWxzLWJsb2NrX19zbGlkZXInKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHQkKHRoaXMpLnNsaWNrKHtcblx0XHRcdFx0ZG90czogdHJ1ZSxcblx0XHRcdFx0YXJyb3dzOiBmYWxzZSxcblx0XHRcdFx0c3BlZWQ6IDUwMCxcblx0XHRcdFx0ZmFkZTogdHJ1ZSxcblx0XHRcdFx0Y3NzRWFzZTogJ2xpbmVhcicsXG5cdFx0XHRcdHNsaWRlc1RvU2hvdzogMSxcblx0XHRcdFx0aW5maW5pdGU6IHRydWUsXG5cdFx0XHRcdGF1dG9wbGF5OiB0cnVlLFxuICBcdFx0XHQgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcblx0XHRcdFx0cHJldkFycm93Oic8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLXByZXZcIj48c3ZnIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNVwiIHZpZXdCb3g9XCIwIDAgMTUgMTVcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTEyLjA0MjIgNy40OTk5N0wxNSAtOS4zNTc4N2UtMDZMOC45NDM3ZS0wOCA3LjQ5OTk3TDE1IDE1TDEyLjA0MjIgNy40OTk5N1pNMS40Mzk0NCA3LjQ5OTk3TDExLjQwMjUgNy40OTk5N0MxMS40MDI2IDcuNTgwOSAxMS40MTc4IDcuNjYxMTEgMTEuNDQ3MyA3LjczNjM4TDEzLjc5MyAxMy42NzRMMS40Mzk0NCA3LjQ5OTk3WlwiIGZpbGw9XCJ3aGl0ZVwiLz48L3N2Zz48L2J1dHRvbj4nLFxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzonPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1uZXh0XCI+PHN2ZyB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTVcIiB2aWV3Qm94PVwiMCAwIDE1IDE1XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk0yLjk1Nzc3IDcuNTAwMDNMLTguNDA0MmUtMDYgMTVMMTUgNy41MDAwM0wtOC41ODMwN2UtMDYgMS43ODg3M2UtMDdMMi45NTc3NyA3LjUwMDAzWk0xMy41NjA2IDcuNTAwMDNMMy41OTc1MiA3LjUwMDAzQzMuNTk3NDUgNy40MTkxIDMuNTgyMjUgNy4zMzg4OSAzLjU1MjczIDcuMjYzNjJMMS4yMDY5OCAxLjMyNTk3TDEzLjU2MDYgNy41MDAwM1pcIiBmaWxsPVwid2hpdGVcIi8+PC9zdmc+PC9idXR0b24+Jyxcblx0XHRcdFx0cmVzcG9uc2l2ZTogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGJyZWFrcG9pbnQ6IDg1MCxcblx0XHRcdFx0XHRcdHNldHRpbmdzOiB7XG5cdFx0XHRcdFx0XHRcdGFycm93czogdHJ1ZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cdC8vaW5zdXJpbmcgYm9hdCBzbGlkZXJcblx0aWYoJCgnLmpzLWJvYXQtc2xpZGVyLWxlZnQnKS5sZW5ndGggPiAwKSB7XG5cdFx0JCgnLmpzLWJvYXQtc2xpZGVyLWxlZnQnKS5zbGljayh7XG5cdFx0XHRzbGlkZXNUb1Nob3c6IDEsXG5cdFx0XHRzbGlkZXNUb1Njcm9sbDogMSxcblx0XHRcdGluaXRpYWxTbGlkZTogMixcblx0XHRcdGFycm93czogdHJ1ZSxcblx0XHRcdGRvdHM6IGZhbHNlLFxuXHRcdFx0aW5maW5pdGU6IHRydWUsXG5cdFx0XHRhdXRvcGxheTogdHJ1ZSxcblx0XHRcdGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG5cdFx0XHRhc05hdkZvcjogJy5qcy1ib2F0LXRodW1ibmFpbC1zbGlkZXItbGVmdCcsXG5cdFx0XHRwcmV2QXJyb3c6JzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldlwiPjxzdmcgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjM5XCIgdmlld0JveD1cIjAgMCAzMCAzOVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxnIGNsaXAtcGF0aD1cInVybCgjY2xpcDBfMTgxNDRfMjcxODU1KVwiPjxwYXRoIGQ9XCJNMjMuOTU0MyAxOS42OTYyTDI5LjU5NzIgMzguOTIzNUwwLjk3OTczNyAxOS42OTYyTDI5LjU5NzIgMC40Njg3NDhMMjMuOTU0MyAxOS42OTYyWk0zLjcyNTk0IDE5LjY5NjJMMjIuNzMzNyAxOS42OTYyQzIyLjczMzkgMTkuNDg4NyAyMi43NjI5IDE5LjI4MzEgMjIuODE5MiAxOS4wOTAxTDI3LjI5NDUgMy44NjgwNkwzLjcyNTk0IDE5LjY5NjJaXCIgZmlsbD1cIndoaXRlXCIvPjwvZz5cdFx0XHQ8ZGVmcz48Y2xpcFBhdGggaWQ9XCJjbGlwMF8xODE0NF8yNzE4NTVcIj48cmVjdCB3aWR0aD1cIjM4LjQ1NDdcIiBoZWlnaHQ9XCIyOC42MTc0XCIgZmlsbD1cIndoaXRlXCIgdHJhbnNmb3JtPVwibWF0cml4KDMuMjI2ODJlLTA4IDEgMSAtNS45MjEyNmUtMDggMC45Nzk3MzYgMC40Njg3NSlcIi8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+PC9idXR0b24+JyxcbiAgICAgICAgICAgIG5leHRBcnJvdzonPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1uZXh0XCI+PHN2ZyB3aWR0aD1cIjI5XCIgaGVpZ2h0PVwiMzlcIiB2aWV3Qm94PVwiMCAwIDI5IDM5XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PGcgY2xpcC1wYXRoPVwidXJsKCNjbGlwMF8xODE0NF8yNzE4NTIpXCI+PHBhdGggZD1cIk01Ljc2MDM0IDE5LjY5NjJMMC4xMTc0MDIgMzguOTIzNUwyOC43MzQ5IDE5LjY5NjJMMC4xMTc0MDQgMC40Njg3NDlMNS43NjAzNCAxOS42OTYyWk0yNS45ODg3IDE5LjY5NjJMNi45ODA4NyAxOS42OTYyQzYuOTgwNzMgMTkuNDg4NyA2Ljk1MTc0IDE5LjI4MzEgNi44OTU0MiAxOS4wOTAxTDIuNDIwMTMgMy44NjgwNkwyNS45ODg3IDE5LjY5NjJaXCIgZmlsbD1cIiNGNkYyRkRcIi8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD1cImNsaXAwXzE4MTQ0XzI3MTg1MlwiPjxyZWN0IHdpZHRoPVwiMzguNDU0N1wiIGhlaWdodD1cIjI4LjYxNzRcIiBmaWxsPVwid2hpdGVcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMjguNzM0OSAwLjQ2ODc1KSByb3RhdGUoOTApXCIvPjwvY2xpcFBhdGg+XHQ8L2RlZnM+PC9zdmc+PC9idXR0b24+JyxcbiAgICAgICAgfSkub24oJ2JlZm9yZUNoYW5nZScsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZSwgbmV4dFNsaWRlKSB7XG5cbiAgICAgICAgICAgIGxldCBpZCA9IHNsaWNrLiRzbGlkZXIuYXR0cignZGF0YS1pZCcpO1xuXG4gICAgICAgICAgICAkKCcuanMtc2xpZGUtdGl0bGUtbGVmdC5hY3RpdmUnKS5mYWRlT3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCgnI3RpdGxlLScrbmV4dFNsaWRlK2lkKS5mYWRlSW4oKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KS5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICAgICB9KTtcblxuXHRcdCQoJy5qcy1ib2F0LXRodW1ibmFpbC1zbGlkZXItbGVmdCcpLnNsaWNrKHtcblx0XHRcdHNsaWRlc1RvU2hvdzogNSxcblx0XHRcdHNsaWRlc1RvU2Nyb2xsOiA1LFxuXHRcdFx0aW5pdGlhbFNsaWRlOjIsXG5cdFx0XHRhc05hdkZvcjogJy5qcy1ib2F0LXNsaWRlci1sZWZ0Jyxcblx0XHRcdGRvdHM6IGZhbHNlLFxuXHRcdFx0YXJyb3dzOiBmYWxzZSxcblx0XHRcdGluZmluaXRlOiB0cnVlLFxuXHRcdFx0Y2VudGVyTW9kZTogdHJ1ZSxcblx0XHRcdGZvY3VzT25TZWxlY3Q6IHRydWUsXG5cdFx0fSk7XG5cdH1cblxuICAgIGlmKCQoJy5qcy1ib2F0LXNsaWRlci1yaWdodCcpLmxlbmd0aCA+IDApe1xuICAgICAgICAkKCcuanMtYm9hdC1zbGlkZXItcmlnaHQnKS5zbGljayh7XG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIGluaXRpYWxTbGlkZToyLFxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgZG90czpmYWxzZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgYXNOYXZGb3I6ICcuanMtYm9hdC10aHVtYm5haWwtc2xpZGVyLXJpZ2h0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzonPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1wcmV2XCI+PHN2ZyB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzlcIiB2aWV3Qm94PVwiMCAwIDMwIDM5XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PGcgY2xpcC1wYXRoPVwidXJsKCNjbGlwMF8xODE0NF8yNzE4NTUpXCI+PHBhdGggZD1cIk0yMy45NTQzIDE5LjY5NjJMMjkuNTk3MiAzOC45MjM1TDAuOTc5NzM3IDE5LjY5NjJMMjkuNTk3MiAwLjQ2ODc0OEwyMy45NTQzIDE5LjY5NjJaTTMuNzI1OTQgMTkuNjk2MkwyMi43MzM3IDE5LjY5NjJDMjIuNzMzOSAxOS40ODg3IDIyLjc2MjkgMTkuMjgzMSAyMi44MTkyIDE5LjA5MDFMMjcuMjk0NSAzLjg2ODA2TDMuNzI1OTQgMTkuNjk2MlpcIiBmaWxsPVwid2hpdGVcIi8+PC9nPlx0XHRcdDxkZWZzPjxjbGlwUGF0aCBpZD1cImNsaXAwXzE4MTQ0XzI3MTg1NVwiPjxyZWN0IHdpZHRoPVwiMzguNDU0N1wiIGhlaWdodD1cIjI4LjYxNzRcIiBmaWxsPVwid2hpdGVcIiB0cmFuc2Zvcm09XCJtYXRyaXgoMy4yMjY4MmUtMDggMSAxIC01LjkyMTI2ZS0wOCAwLjk3OTczNiAwLjQ2ODc1KVwiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz48L2J1dHRvbj4nLFxuICAgICAgICAgICAgbmV4dEFycm93Oic8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLW5leHRcIj48c3ZnIHdpZHRoPVwiMjlcIiBoZWlnaHQ9XCIzOVwiIHZpZXdCb3g9XCIwIDAgMjkgMzlcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48ZyBjbGlwLXBhdGg9XCJ1cmwoI2NsaXAwXzE4MTQ0XzI3MTg1MilcIj48cGF0aCBkPVwiTTUuNzYwMzQgMTkuNjk2MkwwLjExNzQwMiAzOC45MjM1TDI4LjczNDkgMTkuNjk2MkwwLjExNzQwNCAwLjQ2ODc0OUw1Ljc2MDM0IDE5LjY5NjJaTTI1Ljk4ODcgMTkuNjk2Mkw2Ljk4MDg3IDE5LjY5NjJDNi45ODA3MyAxOS40ODg3IDYuOTUxNzQgMTkuMjgzMSA2Ljg5NTQyIDE5LjA5MDFMMi40MjAxMyAzLjg2ODA2TDI1Ljk4ODcgMTkuNjk2MlpcIiBmaWxsPVwiI0Y2RjJGRFwiLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPVwiY2xpcDBfMTgxNDRfMjcxODUyXCI+PHJlY3Qgd2lkdGg9XCIzOC40NTQ3XCIgaGVpZ2h0PVwiMjguNjE3NFwiIGZpbGw9XCJ3aGl0ZVwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgyOC43MzQ5IDAuNDY4NzUpIHJvdGF0ZSg5MClcIi8+PC9jbGlwUGF0aD5cdDwvZGVmcz48L3N2Zz48L2J1dHRvbj4nLFxuICAgICAgICB9KS5vbignYmVmb3JlQ2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaywgY3VycmVudFNsaWRlLCBuZXh0U2xpZGUpIHtcblxuICAgICAgICAgICAgbGV0IGlkID0gc2xpY2suJHNsaWRlci5hdHRyKCdkYXRhLWlkJyk7XG5cbiAgICAgICAgICAgICQoJy5qcy1zbGlkZS10aXRsZS1yaWdodC5hY3RpdmUnKS5mYWRlT3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCgnI3RpdGxlLScrbmV4dFNsaWRlK2lkKS5mYWRlSW4oKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICQoJy5qcy1zbGlkZS10ZXh0LXJpZ2h0LmFjdGl2ZScpLmZhZGVPdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKCcjdGV4dC0nK25leHRTbGlkZStpZCkuZmFkZUluKCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtYm9hdC10aHVtYm5haWwtc2xpZGVyLXJpZ2h0Jykuc2xpY2soe1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2LFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDUsXG4gICAgICAgICAgICBpbml0aWFsU2xpZGU6MixcbiAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmpzLWJvYXQtc2xpZGVyLXJpZ2h0JyxcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdpbml0Jyk7XG5cblx0Ly90ZWNobm9sb2d5IHNsaWRlclxuXHRpZigkKCcudGVjaG5vbG9neS1zbGlkZXItc2VjdGlvbl9fc2xpZGVyJykubGVuZ3RoID4gMCl7XG5cdFx0JCgnLnRlY2hub2xvZ3ktc2xpZGVyLXNlY3Rpb25fX3NsaWRlcicpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdCQodGhpcykuc2xpY2soe1xuXHRcdFx0XHRkb3RzOiB0cnVlLFxuXHRcdFx0XHRhcnJvd3M6IHRydWUsXG5cdFx0XHRcdHNwZWVkOiA1MDAsXG5cdFx0XHRcdHNsaWRlc1RvU2hvdzogMSxcblx0XHRcdFx0aW5maW5pdGU6IHRydWUsXG5cdFx0XHRcdGF1dG9wbGF5OiB0cnVlLFxuICBcdFx0XHQgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcblx0XHRcdFx0cHJldkFycm93Oic8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLXByZXZcIj48c3ZnIHdpZHRoPVwiMzFcIiBoZWlnaHQ9XCIzMVwiIHZpZXdCb3g9XCIwIDAgMzEgMzFcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTI0Ljg4NzMgMTUuNDk5OUwzMSAzMC45OTk5TC0xLjg0ODM2ZS0wNyAxNS40OTk5TDMxIC0wLjAwMDEyMTcwMUwyNC44ODczIDE1LjQ5OTlaTTIuOTc0ODQgMTUuNDk5OUwyMy41NjUxIDE1LjQ5OTlDMjMuNTY1MyAxNS4zMzI3IDIzLjU5NjcgMTUuMTY2OSAyMy42NTc3IDE1LjAxMTRMMjguNTA1NiAyLjc0MDIxTDIuOTc0ODQgMTUuNDk5OVpcIiBmaWxsPVwiIzBEMkQ1RlwiLz48L3N2Zz48L2J1dHRvbj4nLFxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzonPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1uZXh0XCI+PHN2ZyB3aWR0aD1cIjMxXCIgaGVpZ2h0PVwiMzFcIiB2aWV3Qm94PVwiMCAwIDMxIDMxXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk02LjExMjcyIDE1LjQ5OTlMLTEuNjc5NjVlLTA1IDMwLjk5OTlMMzEgMTUuNDk5OUwtMS43MTY2MWUtMDUgLTAuMDAwMTIxNzAxTDYuMTEyNzIgMTUuNDk5OVpNMjguMDI1MiAxNS40OTk5TDcuNDM0ODcgMTUuNDk5OUM3LjQzNDcyIDE1LjMzMjcgNy40MDMzMSAxNS4xNjY5IDcuMzQyMzEgMTUuMDExNEwyLjQ5NDQzIDIuNzQwMjFMMjguMDI1MiAxNS40OTk5WlwiIGZpbGw9XCIjMEQyRDVGXCIvPjwvc3ZnPjwvYnV0dG9uPicsXG5cdFx0XHR9KS5vbignYmVmb3JlQ2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaywgY3VycmVudFNsaWRlLCBuZXh0U2xpZGUpIHtcblx0XHRcdFx0bGV0IGlkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XG5cdFx0XHRcdCQoJy50ZWNobm9sb2d5LXNsaWRlci1zZWN0aW9uX19zbGlkZXItdGV4dC5hY3RpdmUnKS5mYWRlT3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0JCgnI3RleHQtJytuZXh0U2xpZGUraWQpLmZhZGVJbigpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0fSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cblx0XHRcdH0pXG5cblx0XHR9KTtcblx0fVxuXHRpZigkKCcuZW5zdXJpbmctc2xpZGVyLXNlY3Rpb25fX3NsaWRlcicpLmxlbmd0aCA+IDApe1xuXHRcdCQoJy5lbnN1cmluZy1zbGlkZXItc2VjdGlvbl9fc2xpZGVyJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0JCh0aGlzKS5zbGljayh7XG5cdFx0XHRcdGRvdHM6IGZhbHNlLFxuXHRcdFx0XHRhcnJvd3M6IHRydWUsXG5cdFx0XHRcdHNwZWVkOiA1MDAsXG5cdFx0XHRcdHNsaWRlc1RvU2hvdzogMSxcblx0XHRcdFx0aW5maW5pdGU6IHRydWUsXG5cdFx0XHRcdGF1dG9wbGF5OiB0cnVlLFxuICBcdFx0XHQgICAgYXV0b3BsYXlTcGVlZDogMjAwMCxcblx0XHRcdFx0cHJldkFycm93Oic8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLXByZXZcIj48c3ZnIHdpZHRoPVwiNDNcIiBoZWlnaHQ9XCI0M1wiIHZpZXdCb3g9XCIwIDAgNDMgNDNcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48ZyBjbGlwLXBhdGg9XCJ1cmwoI2NsaXAwXzEwNTdfODA3NClcIj48cGF0aCBkPVwiTTM0LjUyMTEgMjEuNTAwMUw0MyA0M0w5LjM5Nzk5ZS0wNyAyMS41MDAxTDQzIC0xLjg3OTU5ZS0wNkwzNC41MjExIDIxLjUwMDFaTTQuMTI2MzkgMjEuNTAwMUwzMi42ODcxIDIxLjUwMDFDMzIuNjg3MyAyMS4yNjgxIDMyLjczMDkgMjEuMDM4MSAzMi44MTU1IDIwLjgyMjRMMzkuNTQgMy44MDExTDQuMTI2MzkgMjEuNTAwMVpcIiBmaWxsPVwid2hpdGVcIi8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD1cImNsaXAwXzEwNTdfODA3NFwiPjxyZWN0IHdpZHRoPVwiNDNcIiBoZWlnaHQ9XCI0M1wiIGZpbGw9XCJ3aGl0ZVwiIHRyYW5zZm9ybT1cIm1hdHJpeCg0LjM3MTE0ZS0wOCAxIDEgLTQuMzcxMTRlLTA4IDAgMClcIi8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+PC9idXR0b24+JyxcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6JzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stbmV4dFwiPjxzdmcgd2lkdGg9XCI0M1wiIGhlaWdodD1cIjQzXCIgdmlld0JveD1cIjAgMCA0MyA0M1wiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxnIGNsaXAtcGF0aD1cInVybCgjY2xpcDBfMTA1N184MDcxKVwiPjxwYXRoIGQ9XCJNOC40Nzg5NCAyMS41MDAxTC0yLjA5NTMxZS0wNSA0M0w0MyAyMS41MDAxTC0xLjkwNzM1ZS0wNSAtMS44Nzk1OWUtMDZMOC40Nzg5NCAyMS41MDAxWk0zOC44NzM2IDIxLjUwMDFMMTAuMzEyOSAyMS41MDAxQzEwLjMxMjcgMjEuMjY4MSAxMC4yNjkxIDIxLjAzODEgMTAuMTg0NSAyMC44MjI0TDMuNDYwMDEgMy44MDExTDM4Ljg3MzYgMjEuNTAwMVpcIiBmaWxsPVwiI0Y2RjJGRFwiLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPVwiY2xpcDBfMTA1N184MDcxXCI+PHJlY3Qgd2lkdGg9XCI0M1wiIGhlaWdodD1cIjQzXCIgZmlsbD1cIndoaXRlXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDQzKSByb3RhdGUoOTApXCIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPjwvYnV0dG9uPidcblxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblx0aWYoJCgnLmNydWlzaW5nLXNlY3Rpb25fX3NsaWRlcicpLmxlbmd0aCA+IDApe1xuXHRcdCQoJy5jcnVpc2luZy1zZWN0aW9uX19zbGlkZXInKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRsZXQgc2xpZGVyID0gJCh0aGlzKTtcblx0XHRcdHNsaWRlci5zbGljayh7XG5cdFx0XHRcdGRvdHM6IHRydWUsXG5cdFx0XHRcdGFycm93czogZmFsc2UsXG5cdFx0XHRcdHNwZWVkOiA1MDAsXG5cdFx0XHRcdHNsaWRlc1RvU2hvdzogMixcblx0XHRcdFx0aW5maW5pdGU6IGZhbHNlLFxuXHRcdFx0XHR2YXJpYWJsZVdpZHRoOiB0cnVlLFxuXHRcdFx0XHRkcmFnZ2FibGU6dHJ1ZSxcblx0XHRcdFx0YXV0b3BsYXk6IGZhbHNlLFxuICBcdFx0XHQgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcblx0XHRcdFx0cmVzcG9uc2l2ZTogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGJyZWFrcG9pbnQ6IDk5MSxcblx0XHRcdFx0XHRcdHNldHRpbmdzOiB7XG5cdFx0XHRcdFx0XHRcdHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDEsXG5cdFx0XHRcdFx0XHRcdGRvdHM6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGRyYWdnYWJsZTp0cnVlLFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF1cblx0XHRcdH0pLm9uKCdiZWZvcmVDaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQsIHNsaWNrLCBjdXJyZW50U2xpZGUsIG5leHRTbGlkZSkge1xuXHRcdFx0XHQvL2xldCBjb3VudCAgPSAkKCcjY3J1aXNpbmctc3RlcCcpLmF0dHIoJ2RhdGEtY291bnQnKTtcblx0XHRcdFx0aWYobmV4dFNsaWRlID4gMCl7XG5cdFx0XHRcdFx0JCgnLmNydWlzaW5nLXNlY3Rpb25fX2JvYXQnKS5yZW1vdmVDbGFzcygnc3RhcnQnKTtcblx0XHRcdFx0XHQkKCcuY3J1aXNpbmctc2VjdGlvbl9fYm9hdCcpLmNzcyh7XG5cdFx0XHRcdFx0XHRcIi13ZWJraXQtdHJhbnNmb3JtXCI6XCJ0cmFuc2xhdGVYKFwiK3NsaWRlci5maW5kKCcuc2xpY2stYWN0aXZlOm5vdCguc2xpY2stY3VycmVudCknKS5vdXRlcldpZHRoKCB0cnVlICkrXCJweClcIixcblx0XHRcdFx0XHRcdFwiLW1zLXRyYW5zZm9ybVwiOlwidHJhbnNsYXRlWChcIitzbGlkZXIuZmluZCgnLnNsaWNrLWFjdGl2ZTpub3QoLnNsaWNrLWN1cnJlbnQpJykub3V0ZXJXaWR0aCggdHJ1ZSApK1wicHgpXCIsXG5cdFx0XHRcdFx0XHRcInRyYW5zZm9ybVwiOlwidHJhbnNsYXRlWChcIitzbGlkZXIuZmluZCgnLnNsaWNrLWFjdGl2ZTpub3QoLnNsaWNrLWN1cnJlbnQpJykub3V0ZXJXaWR0aCggdHJ1ZSApK1wicHgpXCJcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRsZXQgc3RlcCA9ICQoJyNjcnVpc2luZy1zdGVwJykudmFsKCk7XG5cdFx0XHRcdFx0JCgnI2NydWlzaW5nLXN0ZXAnKS52YWwocGFyc2VJbnQoc3RlcCkrMSk7XG5cdFx0XHRcdH1lbHNlIGlmKG5leHRTbGlkZSA9PSAwKXtcblx0XHRcdFx0XHQkKCcjY3J1aXNpbmctc3RlcCcpLnZhbCgwKTtcblx0XHRcdFx0XHQkKCcuY3J1aXNpbmctc2VjdGlvbl9fYm9hdCcpLmFkZENsYXNzKCdzdGFydCcpO1xuXHRcdFx0XHRcdCQoJy5jcnVpc2luZy1zZWN0aW9uX19ib2F0JykuY3NzKHtcblx0XHRcdFx0XHRcdFwiLXdlYmtpdC10cmFuc2Zvcm1cIjpcInRyYW5zbGF0ZVgoMHB4KVwiLFxuXHRcdFx0XHRcdFx0XCItbXMtdHJhbnNmb3JtXCI6XCJ0cmFuc2xhdGVYKDBweClcIixcblx0XHRcdFx0XHRcdFwidHJhbnNmb3JtXCI6XCJ0cmFuc2xhdGVYKDBweClcIlxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdCQoJyNjcnVpc2luZy1zdGVwJykudmFsKDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdCQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkKCcuY3J1aXNpbmctc2VjdGlvbl9fc2xpZGVyJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGxldCBjYXJvdXNlbCA9ICQodGhpcyk7XG5cdFx0XHRcdFx0aWYgKCQod2luZG93KS53aWR0aCgpID4gOTkxKSB7XG5cdFx0XHRcdFx0XHQvL2Nhcm91c2VsLnNsaWNrKCdzbGlja0FkZCcsICc8ZGl2IGNsYXNzPVwiaXRlbVwiPjwvZGl2PicsIDApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmKCQod2luZG93KS53aWR0aCgpIDwgOTkxKXtcblx0XHRcdFx0XHRcdGNhcm91c2VsLnNsaWNrKCdzbGlja1JlbW92ZScsIDApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXHRmdW5jdGlvbiBjcnVpc2luZ1NsaWRlclJlc2V0KCl7XG5cdFx0aWYoJCgnLmNydWlzaW5nLXNlY3Rpb25fX3NsaWRlcicpLmxlbmd0aCA+IDApe1xuXHRcdFx0JCgnLmNydWlzaW5nLXNlY3Rpb25fX3NsaWRlcicpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdFx0JCh0aGlzKS5zbGljaygnc2xpY2tHb1RvJywgMCk7XG5cdFx0XHRcdCQoJyNjcnVpc2luZy1zdGVwJykudmFsKDApO1xuXHRcdFx0XHQkKCcuY3J1aXNpbmctc2VjdGlvbl9fYm9hdCcpLmFkZENsYXNzKCdzdGFydCcpO1xuXHRcdFx0XHQkKCcuY3J1aXNpbmctc2VjdGlvbl9fYm9hdCcpLmNzcyh7XG5cdFx0XHRcdFx0XCItd2Via2l0LXRyYW5zZm9ybVwiOlwidHJhbnNsYXRlWCgwcHgpXCIsXG5cdFx0XHRcdFx0XCItbXMtdHJhbnNmb3JtXCI6XCJ0cmFuc2xhdGVYKDBweClcIixcblx0XHRcdFx0XHRcInRyYW5zZm9ybVwiOlwidHJhbnNsYXRlWCgwcHgpXCJcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblx0Ly9hbmltYXRlIHRoZSBib2F0XG5cdGZ1bmN0aW9uIGJvYXRBbmltYXRlKCkge1xuXHRcdGxldCBib2F0QW5pbWF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm9hdEFuaW1hdGlvbicpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYm9hdEFuaW1hdGlvbi5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRcdGNvbnN0IGFuaW1hdGlvbiA9IGJvZHltb3Zpbi5sb2FkQW5pbWF0aW9uKHtcblx0XHRcdFx0XHRcdGNvbnRhaW5lcjogYm9hdEFuaW1hdGlvbi5pdGVtKGkpLFxuXHRcdFx0XHRcdFx0cmVuZGVyZXI6ICdzdmcnLFxuXHRcdFx0XHRcdFx0bG9vcDogdHJ1ZSxcblx0XHRcdFx0XHRcdGF1dG9wbGF5OiB0cnVlLFxuXHRcdFx0XHRcdFx0cGF0aDogYm9hdEFuaW1hdGlvbltpXS5kYXRhc2V0LmZpbGUsXG5cblx0XHRcdFx0fSk7XG5cdFx0XHRcdGFuaW1hdGlvbi5zZXRTcGVlZCgwLjMpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBzaWRlSW1hZ2VBbmltYXRpb24oKXtcblx0XHRsZXQgYW5pbWF0aW9uQmxvY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzdmctanNvbi1hbmltYXRpb24nKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFuaW1hdGlvbkJsb2NrLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0IGFuaW1hdGlvbiA9IGJvZHltb3Zpbi5sb2FkQW5pbWF0aW9uKHtcblx0XHRcdFx0XHRcdGNvbnRhaW5lcjogYW5pbWF0aW9uQmxvY2suaXRlbShpKSxcblx0XHRcdFx0XHRcdHJlbmRlcmVyOiAnc3ZnJyxcblx0XHRcdFx0XHRcdGxvb3A6IHRydWUsXG5cdFx0XHRcdFx0XHRhdXRvcGxheTogdHJ1ZSxcblx0XHRcdFx0XHRcdHBhdGg6IGFuaW1hdGlvbkJsb2NrW2ldLmRhdGFzZXQuZmlsZSxcblxuXHRcdFx0XHR9KTtcblx0XHRcdFx0YW5pbWF0aW9uLnNldFNwZWVkKDAuMyk7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHQvL3NvdXJzZSBjaGFuZ2Vcblx0JCgnLnNvdXJzZS1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5zb3VyY2UtZmllbGQnKS52YWwoJCh0aGlzKS5maW5kKFwiOnNlbGVjdGVkXCIpLnZhbCgpKTtcblx0fSk7XG5cbiAgICAkKFwiI21vYmlsZS1oZWFkZXItbWVudSAubWVudS1pdGVtLWhhcy1jaGlsZHJlbiA+IC5saWtlLWxpbmssICNtb2JpbGUtaGVhZGVyLW1lbnUgLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4gPiBhXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBsZXQgaXRlbSA9ICQodGhpcykucGFyZW50KCk7XG4gICAgICAgIGxldCBhcnJvdyA9IGl0ZW0uY2hpbGRyZW4oJy5saWtlLWxpbmssIGEnKS5maW5kKCcuYXJyb3ctZG93bicpO1xuXG4gICAgICAgIGlmICghaXRlbS5oYXNDbGFzcyhcImFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgaXRlbS5zaWJsaW5ncyhcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLmZpbmQoXCIuc3ViLW1lbnVcIikuc3RvcCh0cnVlLCB0cnVlKS5zbGlkZVVwKCk7XG4gICAgICAgICAgICBpdGVtLnNpYmxpbmdzKFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikuY2hpbGRyZW4oJy5saWtlLWxpbmssIGEnKS5maW5kKCcuYXJyb3ctZG93bicpLnJlbW92ZUNsYXNzKCdyb3RhdGUtYXJyb3cnKTtcblxuICAgICAgICAgICAgaXRlbS5maW5kKFwiLnN1Yi1tZW51XCIpLmZpcnN0KCkuc3RvcCh0cnVlLCB0cnVlKS5zbGlkZURvd24oKTtcbiAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4oJy5saWtlLWxpbmssIGEnKS5maW5kKCcuYXJyb3ctZG93bicpLmFkZENsYXNzKCdyb3RhdGUtYXJyb3cnKTtcbiAgICAgICAgICAgIGl0ZW0uYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmZpbmQoXCIuc3ViLW1lbnVcIikuZmlyc3QoKS5zdG9wKHRydWUsIHRydWUpLnNsaWRlVXAoKTtcbiAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4oJy5saWtlLWxpbmssIGEnKS5maW5kKCcuYXJyb3ctZG93bicpLnJlbW92ZUNsYXNzKCdyb3RhdGUtYXJyb3cnKTtcbiAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoXCIjbW9iaWxlLWhlYWRlci1tZW51IC5tZW51LWl0ZW0taGFzLWNoaWxkcmVuIC5zdWItbWVudSBhXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cblxuXG4gICAgJCgnLnNob3ctdGFncycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcblx0XHQkKCcucmVzb3VyY2VzLXRhZ3Mtc2VjdGlvbl9fd3JhcHBlci1saW1pdGVkJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdCQodGhpcykudGV4dChmdW5jdGlvbihpLCB0ZXh0KXtcblx0XHRcdHJldHVybiB0ZXh0ID09PSBcIlNlZSBtb3JlXCIgPyBcIlNlZSBsZXNzXCIgOiBcIlNlZSBtb3JlXCI7XG5cdFx0fSk7XG5cblx0fSk7XG5cdC8vcG9zdCBwYWdpbmF0aW9uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdGZ1bmN0aW9uIGxvYWRfYWxsX3Bvc3RzKHBhZ2UpIHtcblx0XHQkKFwiLnJlc291cmNlcy1wb3N0cy1zZWN0aW9uX19jb250YWluZXIgLmxvYWRlclwiKS5mYWRlSW4oKTtcblx0XHRsZXQgdGFncyA9IFtdO1xuXHRcdCQoJy5yZXNvdXJjZXMtdGFncy1zZWN0aW9uX190YWc6Y2hlY2tlZCcpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRhZ3MucHVzaCgkKHRoaXMpLnZhbCgpKTtcblx0XHR9KTtcblx0XHRsZXQgb3JkZXJieSA9IG51bGxcblx0XHRvcmRlcmJ5ID0gJCgnLnJlc291cmNlcy1zZWFyY2gtc2VjdGlvbl9fY2F0ZWdvcmllcy1zb3J0Ynk6Y2hlY2tlZCcpLnZhbCgpO1xuXHRcdGxldCBkYXRhID0ge1xuXHRcdFx0XHRwYWdlOiBwYWdlLFxuXHRcdFx0XHR0YWdzOiB0YWdzLFxuXHRcdFx0XHRvcmRlcjogb3JkZXJieSxcblx0XHRcdFx0dGF4X2lkOiAkKCcjcmVzb3VyY2VzLXRheG9ub215JykudmFsKCksXG5cdFx0XHRcdHRheDogJCgnI3Jlc291cmNlcy10YXhvbm9teScpLmF0dHIoJ2RhdGEtdGF4JyksXG5cdFx0XHRcdHBlcl9wYWdlOiAkKCcjcGVyX3BhZ2UnKS52YWwoKSxcblx0XHRcdFx0YWN0aW9uOiBcInBvc3RfcGFnaW5hdGlvblwiLFxuXHRcdH07XG5cblx0XHQkLnBvc3QodmFyX2Zyb21fcGhwLmFqYXhfdXJsLCBkYXRhLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0XHQkKFwiLnJlc291cmNlcy1wb3N0cy1zZWN0aW9uX19jb250YWluZXIgLnJlc291cmNlcy1wb3N0cy1zZWN0aW9uX19hamF4XCIpLmh0bWwocmVzcG9uc2UpO1xuXHRcdFx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG5cdFx0XHRcdFx0XHRzY3JvbGxUb3A6ICQoXCIucmVzb3VyY2VzLXNlYXJjaC1zZWN0aW9uXCIpLm9mZnNldCgpLnRvcCAtIDg3XG5cdFx0XHRcdH0sIDUwMCk7XG5cdFx0XHRcdCQoJy5yZXNvdXJjZXMtcG9zdHMtc2VjdGlvbl9fY29udGFpbmVyIC5sb2FkZXInKS5mYWRlT3V0KDMwMCk7XG5cdFx0fSk7XG5cdH1cblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5wYWdpbmF0aW9uIC5hY3RpdmUnLCBmdW5jdGlvbigpIHtcblx0XHRcdGxldCBwYWdlID0gJCh0aGlzKS5hdHRyKCdkYXRhLXBhZ2UnKTtcblx0XHRcdGxvYWRfYWxsX3Bvc3RzKHBhZ2UpO1xuXHR9KTtcblx0JChkb2N1bWVudCkub24oJ2NoYW5nZScsICcucmVzb3VyY2VzLXRhZ3Mtc2VjdGlvbl9fdGFnJywgZnVuY3Rpb24oKSB7XG5cdFx0bG9hZF9hbGxfcG9zdHMoMSk7XG5cdH0pO1xuXHQkKFwiLnJlc291cmNlcy1zZWFyY2gtc2VjdGlvbl9fY2F0ZWdvcmllcy1zb3J0YnlcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0Ly8gaW4gdGhlIGhhbmRsZXIsICd0aGlzJyByZWZlcnMgdG8gdGhlIGJveCBjbGlja2VkIG9uXG5cdFx0bGV0ICRib3ggPSAkKHRoaXMpO1xuXHRcdGlmICgkYm94LmlzKFwiOmNoZWNrZWRcIikpIHtcblx0XHRcdGxldCBncm91cCA9IFwiaW5wdXQ6Y2hlY2tib3hbbmFtZT0nXCIgKyAkYm94LmF0dHIoXCJuYW1lXCIpICsgXCInXVwiO1xuXHRcdFx0JChncm91cCkucHJvcChcImNoZWNrZWRcIiwgZmFsc2UpO1xuXHRcdFx0JGJveC5wcm9wKFwiY2hlY2tlZFwiLCB0cnVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JGJveC5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XG5cdFx0fVxuXHRcdGxvYWRfYWxsX3Bvc3RzKDEpO1xuXHR9KTtcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxufSkoIGpRdWVyeSApO1xuLy9BZGQgbG9naWMgZm8gc2hvdy9oaWRlIEZBUVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGZhcVRpdGxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mYXFfX3NlY3Rpb24tdGl0bGUnKTtcblxuICAgIGZhcVRpdGxlcy5mb3JFYWNoKGZ1bmN0aW9uKHRpdGxlKSB7XG4gICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGZhcUl0ZW1zID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgICAgIGlmIChmYXFJdGVtcy5zdHlsZS5tYXhIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBmYXFJdGVtcy5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmYXFJdGVtcy5zdHlsZS5tYXhIZWlnaHQgPSBmYXFJdGVtcy5zY3JvbGxIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sImZpbGUiOiJjdXN0b21pemF0aW9uLmpzIn0=
