import smoothscroll from 'smoothscroll-polyfill';
import Popup from './modules/popup-window.js';


// Take some useful functions
import {
	isInViewport,
	closest_polyfill,
	setCookie,
	deleteCookie,
	checkLifeTime,
	getCookie,
	debounce,        // Very useful function. Always use it for such events like:
				     // scroll, resize, keyup, keydown, keypress etc..
} from './modules/helpers.js';

// Tabs functionality (uncomment it if you need it)
import { tabsNavigation } from './modules/navi-tabs';

/**
 * All custom code is wrapped in IIFE function
 * to prevent affect our code to another parts of code
 */
;(function ( $ ) {

	/**
	 * PLease Collect here all variables with DOM elements
	 * Use const for all DOM elements and type it as UPPERCASE text
	 * It will help to each developer understand that it's a const not a variable
	 */

	/** @type HTMLElement */
	const SITE_HEADER = document.querySelector('#site-header');
	const SITE_HEADER_JS = document.querySelector('.js-site-header');
	const SELECT_WITH_PLACEHOLDERs = document.querySelectorAll('.js-select-with-placeholder');

	const checkNewPelecanMessage = () =>{
		const PELECAN_CONTAINER = document.querySelector('.pelican-pete');
		if(PELECAN_CONTAINER){
			const PELECAN_IDENTIFIER = getCookie('pelican_pete_identifier');
			console.log(PELECAN_IDENTIFIER);
			if(!PELECAN_CONTAINER || var_from_php.pelican_pete_identifier != PELECAN_IDENTIFIER){
				PELECAN_CONTAINER.classList.add('new');
			}
		}
	}
	checkNewPelecanMessage();

	let $temp = $("<input class='abs'>");
	let $url = $(location).attr('href');

	$('#copy-link-btn').on('click', function() {
		$("body").append($temp);
		$temp.val($url).select();
		document.execCommand("copy");
		$temp.remove();
		$('.copy-text').fadeIn();
		setTimeout(() => {
			$('.copy-text').fadeOut();
		}, 2000);
	})

	/**
	 * Occurs when all HTML has been fully loaded and passed by the parser,
	 * without waiting for the stylesheets, images and frames to finish loading
	 */
	document.addEventListener("DOMContentLoaded", function(event) {
		console.log("DOM fully loaded and parsed - READY event");

		// kick off the polyfill ( Don't delete it )
		smoothscroll.polyfill();

		// Init Closest polyfill method ( Don't delete it )
		closest_polyfill();

		// Init Popup Windows ( use it if you need Popup functionality )
		const popup_instance = new Popup();
		popup_instance.init();
		const WELCOME_POPUP = document.querySelector('#welcome-popup');
		if(WELCOME_POPUP){
			const WELCOME_POPUP_COOKIE_TIME = getCookie('welcome_popup_time');
			const POPUP_COOKIE_TIME = var_from_php.how_often_to_show_popup;
			WELCOME_POPUP && checkLifeTime(WELCOME_POPUP_COOKIE_TIME, POPUP_COOKIE_TIME);
			const WELCOME_POPUP_COOKIE = getCookie('welcome_popup');
			!WELCOME_POPUP_COOKIE && WELCOME_POPUP && popup_instance.openOnePopup('#welcome-popup', 3000);
		}

		// Init Tabs Navigation
		tabsNavigation( '.js-tabs-nav-btn', '.js-tabs-nav-panel', true);

		if ( typeof WOW !== 'undefined' ) {
			new WOW({animateClass: 'animate__animated'}).init();
		}
		const swiper = new Swiper( ".js-partners", {
			slidesPerView: 1,
			loop:true,
			breakpoints: {
				570: {
					slidesPerView: 2,
					spaceBetween: 40,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 40,
				},

				1030: {
					slidesPerView: 4,
					spaceBetween: 40,
				},
			},
		} );


		//init elements paralax scroll
		let rellax = new Rellax('.rellax',{
			center: true
		});

		const observer = lozad(); // lazy loads elements with default selector as '.lozad'
		observer.observe();

		//Close popup after sent form

		document.addEventListener( 'wpcf7mailsent', function( event ) {
			setTimeout( () => {
				$('.js-popup-close').trigger('click');
			},2000);

		}, false );

		$(document).ready(function() {
			$('input[name="sortby"]').each(function() {
				$(this).prop("checked", false);
			});
			$('.js-select-with-placeholder').select2({
				dropdownParent: $('.js-select-wrapper'),
				placeholder: "How can we help?",
				allowClear: true,
				minimumResultsForSearch: -1,
			});

			/**
			 * @type {jQuery}
			 */
			const $stateSelectWrapper = $('.js-select-state-wrapper');
			$stateSelectWrapper.each((i, el) => {
				const $el = $(el);
				const $select = $el.find('.js-select-state');
				const isMultiple = !!$select.attr('multiple');
				$select.select2({
					closeOnSelect: !isMultiple,
					dropdownParent: $el,
					dropdownCssClass: isMultiple ? 'container--multiple' : '',
					placeholder: $select.find('option').first().text(),
					allowClear: false,
					minimumResultsForSearch: -1,
				})
			})
			//clearing state fields when they are available after submitting the form.
			$(document).on('wpcf7mailsent', () => {
				$stateSelectWrapper.find('select').val('').trigger('change');
			})

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
				minimumResultsForSearch: -1,
			});
				$('#block-form-sticky .js-select-category').select2({
				dropdownParent: $('#block-form-sticky .js-select-category-wrapper'),
				placeholder: "I would like to receive",
				allowClear: true,
				minimumResultsForSearch: -1,
			});
		});

		//scroll up
		const scrollUp = document.getElementById('scroll-top');
		if (typeof(scrollUp) != 'undefined' && scrollUp != null){
			scrollUp.addEventListener('click', function(event){
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});
			});
		}
		// (SELECT_WITH_PLACEHOLDERs)
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
		 document.addEventListener( 'wpcf7mailsent', function( event ) {
			if ( '236' == event.detail.contactFormId ) {
        window.location.href = window.location.origin+"/thank-you-faq/";
    	}else if('559' == event.detail.contactFormId){
				window.location.href = window.location.origin+"/thank-you-resources/";
			}else if('654' == event.detail.contactFormId){
				window.location.href = window.location.origin+"/thank-you-resources/";
			}else if('263' == event.detail.contactFormId){
				if(event.detail.inputs[8].value == 'Contact Us- General Inquiry'){
					window.location.href = window.location.origin+"/thank-you-contact-us/";
				}else if(event.detail.inputs[8].value == 'Contact Us- Get Notified'){
					let endpointUrl = (event.detail.inputs[8].value == 3) ? 'thank-you-state-home' : 'thank-you-state-quote';
					window.location.href = window.location.origin+"/"+endpointUrl+"/?state="+event.detail.inputs[5].value;
				}else if(event.detail.inputs[8].value == 'Contact Us- Partnerships'){
					window.location.href = window.location.origin+"/thank-you-partnership/";
				}
			}
		}, false );
		//show state name by hover on state map
		const stateList = document.querySelectorAll('.svg-hover');
		if (typeof(stateList) != 'undefined' && stateList != null){
			stateList.forEach((el) =>
			el.addEventListener("mouseover", (event) => {
				let stateName = el.dataset.info;
				const stateElem = document.getElementById('insuring-boat__map-state');
				stateElem.innerHTML = stateName;
				stateElem.style.opacity = "0.6";
				//document.getElementById('insuring-boat__map-state').classList.add('active');
			}));
			stateList.forEach((el) =>
			el.addEventListener("mouseout", (event) => {
				const stateElem = document.getElementById('insuring-boat__map-state');
				stateElem.style.opacity = "0";
				//stateElem.innerHTML = '';
			}));
		}
		const showContactForm = document.querySelector('.insuring-boat__map-bottom-link');
		if(showContactForm){
			showContactForm.addEventListener('click', () => {
				const sourseSelect = document.querySelector('.sourse-select');
				sourseSelect.value = 'Contact Us- Get Notified';
				sourseSelect.dispatchEvent(new window.Event('change', { bubbles: true }));
			});
		}
		document.body.addEventListener( 'click', event => {
			const ROLE = event.target.dataset.role;
			const TARGET = event.target;
			if ( !ROLE ) return;

			switch ( ROLE ) {

				// Scroll page to top
				case 'play-video':
				{
					let videoId = event.target.dataset.id
					let video = document.getElementById(videoId);
					if (video.paused) {
						video.play();
					}
					else  {
						video.pause();
					}
				}
					break;
				case 'open-palacan-message':
				{
					const PELECAN_CONTAINER = TARGET.closest('.pelican-pete');
					if(PELECAN_CONTAINER.classList.contains('new')){
						setCookie('pelican_pete_identifier', var_from_php.pelican_pete_identifier, 365);
						PELECAN_CONTAINER.classList.remove('new')
					}
					if(!PELECAN_CONTAINER.classList.contains('active')){
						console.log(PELECAN_CONTAINER.classList);
						PELECAN_CONTAINER.classList.add('active');
					}else{
						PELECAN_CONTAINER.classList.remove('active');
					}
				}
					break;
				case 'close-palacan-message':
				{
					const PELECAN_CONTAINER = document.querySelector('.pelican-pete');
					PELECAN_CONTAINER && PELECAN_CONTAINER.classList.remove('active');
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
						let faq = event.target.nextElementSibling;
						faq.classList.toggle("active");
						if (faq.style.maxHeight) {
							faq.style.maxHeight = null;
						} else {
							faq.style.maxHeight = faq.scrollHeight + "px";
						}

					}
						break;

				case 'element2':
				{
					// some required action
				}
					break;
			}
		} );

	});
	const getOffsetTop = element => {
		let offsetTop = 0;
		while(element) {
			offsetTop += element.offsetTop;
			element = element.offsetParent;
		}
		return offsetTop;
	}
	let sticky_form = document.getElementById("block-form-sticky");
	let origOffset = getOffsetTop(sticky_form);
	function stickySubscribeForm() {
		let bottom_section = document.getElementById("bottom-section");
		let origOffsetBottom = getOffsetTop(bottom_section);
		let headerHeight = SITE_HEADER.offsetHeight;
		let blockHeight = document.getElementById("block-form-sticky").offsetHeight;
		if (window.screen.width > 1030) {
			if(window.pageYOffset + 110 >= origOffset && ((window.pageYOffset + blockHeight) + 110 + 145) < origOffsetBottom){
				sticky_form.classList.add("fixed");
				sticky_form.classList.remove("fixed-bottom");
			}else if(((window.pageYOffset + blockHeight) + 110 + 145) >= origOffsetBottom){
				sticky_form.classList.add("fixed-bottom");
				sticky_form.classList.remove("fixed");
			}else{
				sticky_form.classList.remove("fixed");
			}
		}else{
			sticky_form.classList.remove("fixed-bottom");
			sticky_form.classList.remove("fixed");
		}
	}
	if(typeof(sticky_form) != 'undefined' && sticky_form != null){
		stickySubscribeForm();
	}
	//show scroll Up button when scroll more than 500
	const showScrollUp = () => {
		const scrollBtn = document.getElementById("scroll-top");
		let operationType = ( window.pageYOffset > 500 ) ? 'add' : 'remove';
		(scrollBtn) && scrollBtn.classList[operationType]('show');
		(scrollBtn) && document.body.classList[operationType]('has-scroll-up');
	}
	showScrollUp();
	//show scroll hint
	const showHideScrollHint = () =>{
		const SCROLL_HINT = document.querySelector('.scroll-hint');
		if(SCROLL_HINT){
			let operationType = ( window.pageYOffset > 0 ) ? 'add' : 'remove';
			SCROLL_HINT.classList[operationType]("hide");
		}
	}
	/**
	 * Catch Scroll event
	 */
	showHideScrollHint();
	window.addEventListener('scroll', debounce( (event) => {
		//show hide scroll hint
		showHideScrollHint();
		let scrollAmount  = window.pageYOffset || document.documentElement.scrollTop;
		let operationType = ( scrollAmount>0 ) ? 'add' : 'remove';

		// Add/remove site header additional "sticky" class
		(SITE_HEADER_JS) && SITE_HEADER_JS.classList[operationType]('site-header__sticky');
		//show get a quote on homepage when cta from banner is not in portview
		let cta_btn = document.getElementById("cta-btn");
		if(typeof(cta_btn) != 'undefined' && cta_btn != null){
			let headerHeight = SITE_HEADER.offsetHeight;
			let get_quote = document.getElementById('site-header__btn');
			let show = isInViewport(cta_btn, 0 - headerHeight);
			if (show == false) {
				get_quote.classList.remove("hide");
			} else {
				get_quote.classList.add("hide");
			}
		}
		let cruisingSlider = document.getElementById('cruising-section__scroll');
		if(typeof(cruisingSlider) != 'undefined' && cruisingSlider != null){
			let isCruising = isInViewport(cruisingSlider, 0);
			if(!isCruising){
				cruisingSliderReset();
			}else{
				$('#cruising-section__slider').slick('slickSetOption', 'autoplay', true);
				$('#cruising-section__slider').slick("play");
			}

		}
		let sticky_form = document.getElementById("block-form-sticky");
		if(typeof(sticky_form) != 'undefined' && sticky_form != null){
			stickySubscribeForm();
		}
		showScrollUp();
	}, 0));

	const resizeObserver = new ResizeObserver((entries) => {
		/** @type HTMLElement */
		const primaryWrapper = document.getElementById('primary-wrapper');
		primaryWrapper.style.marginBlockStart = `${SITE_HEADER.offsetHeight}px`;
	});
	resizeObserver.observe(SITE_HEADER);

	// Use it when you need to know that everything is loaded (html, styles, images)
	window.addEventListener('load', (event) => {
		console.log('page is fully loaded');
		boatAnimate();
		sideImageAnimation();
		/**
		 * Simple hack for some cases
		 */
		setTimeout( () => {
			document.body.classList.add( 'loaded' );
		}, 500 );


		let questions = document.querySelectorAll('.faq-section__questions.active');
		for (let i = 0; i < questions.length; i++){
			questions[i].style.maxHeight = questions[i].scrollHeight + "px";
		}

	});
	//show mobile menu
	const menuBtn = document.getElementById('mobile-menu-btn');
	menuBtn && menuBtn.addEventListener('click', function () {
		this.classList.toggle('menu-open');
		document.getElementById('site-header').classList.toggle('menu-opened');
		document.getElementById('mobile-menu').classList.toggle('show');
	});
	//cutting edge slider
	if($('.cutting-edge-technology__slider').length > 0){
		$('.cutting-edge-technology__slider').each(function(){
			$(this).slick({
				dots: true,
				arrows: false,
				speed: 500,
				fade: true,
				cssEase: 'linear',
				slidesToShow: 1,
				infinite: true,
				autoplay: true,
  			autoplaySpeed: 10000,
			}).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
				let id = $(this).attr('data-id');
				$('.cutting-edge-technology__phone-btn-container-'+id).removeClass('active');
				$('.cutting-edge-technology__phone-btn-'+id).removeClass('active');
				$('.cutting-edge-technology__phone-image-'+id).removeClass('active');
				$('.cutting-edge-technology__phone-image-'+id+'-'+nextSlide).addClass('active');
				$('#cutting-edge-'+id+'-'+nextSlide).addClass('active');
				$('#cutting-edge-'+id+'-'+nextSlide).find('.cutting-edge-technology__phone-btn').addClass('active');
			});
		});
	}
	//change cutting-edge-slider slide by clicking on icons
	$('.cutting-edge-technology__phone-btn').each(function () {
		$(this).click(function(){
			if(!$(this).hasClass('active')){
				let id = $(this).attr('data-id');
				let setSlide = $(this).attr('data-slide');
				// $('.cutting-edge-technology__phone-btn-container-'+id).removeClass('active');
				// $('.cutting-edge-technology__phone-btn-'+id).removeClass('active');
				// $(this).addClass('active');
				// $(this).closest('.cutting-edge-technology__phone-btn-container').addClass('active');
				$('#cutting-edge-slider-'+id).slick('slickGoTo', setSlide);
			}
		});
	});
	//testimonials slider
	if($('.testimonials-block__slider').length > 0) {
		$('.testimonials-block__slider').each(function(){
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
				prevArrow:'<button type="button" class="slick-prev"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0422 7.49997L15 -9.35787e-06L8.9437e-08 7.49997L15 15L12.0422 7.49997ZM1.43944 7.49997L11.4025 7.49997C11.4026 7.5809 11.4178 7.66111 11.4473 7.73638L13.793 13.674L1.43944 7.49997Z" fill="white"/></svg></button>',
                nextArrow:'<button type="button" class="slick-next"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.95777 7.50003L-8.4042e-06 15L15 7.50003L-8.58307e-06 1.78873e-07L2.95777 7.50003ZM13.5606 7.50003L3.59752 7.50003C3.59745 7.4191 3.58225 7.33889 3.55273 7.26362L1.20698 1.32597L13.5606 7.50003Z" fill="white"/></svg></button>',
				responsive: [
					{
						breakpoint: 850,
						settings: {
							arrows: true
						}
					},
				]
			});
		});
	}
	//insuring boat slider
	if($('.js-boat-slider-left').length > 0) {
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
			prevArrow:'<button type="button" class="slick-prev"><svg width="30" height="39" viewBox="0 0 30 39" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_18144_271855)"><path d="M23.9543 19.6962L29.5972 38.9235L0.979737 19.6962L29.5972 0.468748L23.9543 19.6962ZM3.72594 19.6962L22.7337 19.6962C22.7339 19.4887 22.7629 19.2831 22.8192 19.0901L27.2945 3.86806L3.72594 19.6962Z" fill="white"/></g>			<defs><clipPath id="clip0_18144_271855"><rect width="38.4547" height="28.6174" fill="white" transform="matrix(3.22682e-08 1 1 -5.92126e-08 0.979736 0.46875)"/></clipPath></defs></svg></button>',
            nextArrow:'<button type="button" class="slick-next"><svg width="29" height="39" viewBox="0 0 29 39" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_18144_271852)"><path d="M5.76034 19.6962L0.117402 38.9235L28.7349 19.6962L0.117404 0.468749L5.76034 19.6962ZM25.9887 19.6962L6.98087 19.6962C6.98073 19.4887 6.95174 19.2831 6.89542 19.0901L2.42013 3.86806L25.9887 19.6962Z" fill="#F6F2FD"/></g><defs><clipPath id="clip0_18144_271852"><rect width="38.4547" height="28.6174" fill="white" transform="translate(28.7349 0.46875) rotate(90)"/></clipPath>	</defs></svg></button>',
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {

            let id = slick.$slider.attr('data-id');

            $('.js-slide-title-left.active').fadeOut(function(){
                $('#title-'+nextSlide+id).fadeIn().addClass('active');
            }).removeClass('active')

        });

		$('.js-boat-thumbnail-slider-left').slick({
			slidesToShow: 5,
			slidesToScroll: 5,
			initialSlide:2,
			asNavFor: '.js-boat-slider-left',
			dots: false,
			arrows: false,
			infinite: true,
			centerMode: true,
			focusOnSelect: true,
		});
	}

    if($('.js-boat-slider-right').length > 0){
        $('.js-boat-slider-right').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide:2,
            arrows: true,
            dots:false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
            asNavFor: '.js-boat-thumbnail-slider-right',
            prevArrow:'<button type="button" class="slick-prev"><svg width="30" height="39" viewBox="0 0 30 39" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_18144_271855)"><path d="M23.9543 19.6962L29.5972 38.9235L0.979737 19.6962L29.5972 0.468748L23.9543 19.6962ZM3.72594 19.6962L22.7337 19.6962C22.7339 19.4887 22.7629 19.2831 22.8192 19.0901L27.2945 3.86806L3.72594 19.6962Z" fill="white"/></g>			<defs><clipPath id="clip0_18144_271855"><rect width="38.4547" height="28.6174" fill="white" transform="matrix(3.22682e-08 1 1 -5.92126e-08 0.979736 0.46875)"/></clipPath></defs></svg></button>',
            nextArrow:'<button type="button" class="slick-next"><svg width="29" height="39" viewBox="0 0 29 39" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_18144_271852)"><path d="M5.76034 19.6962L0.117402 38.9235L28.7349 19.6962L0.117404 0.468749L5.76034 19.6962ZM25.9887 19.6962L6.98087 19.6962C6.98073 19.4887 6.95174 19.2831 6.89542 19.0901L2.42013 3.86806L25.9887 19.6962Z" fill="#F6F2FD"/></g><defs><clipPath id="clip0_18144_271852"><rect width="38.4547" height="28.6174" fill="white" transform="translate(28.7349 0.46875) rotate(90)"/></clipPath>	</defs></svg></button>',
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {

            let id = slick.$slider.attr('data-id');

            $('.js-slide-title-right.active').fadeOut(function(){
                $('#title-'+nextSlide+id).fadeIn().addClass('active');
            }).removeClass('active');

            $('.js-slide-text-right.active').fadeOut(function(){
                $('#text-'+nextSlide+id).fadeIn().addClass('active');
            }).removeClass('active');

        });
        $('.js-boat-thumbnail-slider-right').slick({
            slidesToShow: 6,
            slidesToScroll: 5,
            initialSlide:2,
            asNavFor: '.js-boat-slider-right',
            dots: false,
            arrows: false,
            infinite: true,
            centerMode: true,
            focusOnSelect: true,
        });
    }

    console.log('init');

	//technology slider
	if($('.technology-slider-section__slider').length > 0){
		$('.technology-slider-section__slider').each(function(){
			$(this).slick({
				dots: true,
				arrows: true,
				speed: 500,
				slidesToShow: 1,
				infinite: true,
				autoplay: true,
  			    autoplaySpeed: 5000,
				prevArrow:'<button type="button" class="slick-prev"><svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.8873 15.4999L31 30.9999L-1.84836e-07 15.4999L31 -0.000121701L24.8873 15.4999ZM2.97484 15.4999L23.5651 15.4999C23.5653 15.3327 23.5967 15.1669 23.6577 15.0114L28.5056 2.74021L2.97484 15.4999Z" fill="#0D2D5F"/></svg></button>',
                nextArrow:'<button type="button" class="slick-next"><svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.11272 15.4999L-1.67965e-05 30.9999L31 15.4999L-1.71661e-05 -0.000121701L6.11272 15.4999ZM28.0252 15.4999L7.43487 15.4999C7.43472 15.3327 7.40331 15.1669 7.34231 15.0114L2.49443 2.74021L28.0252 15.4999Z" fill="#0D2D5F"/></svg></button>',
			}).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
				let id = $(this).attr('data-id');
				$('.technology-slider-section__slider-text.active').fadeOut(function(){
					$('#text-'+nextSlide+id).fadeIn().addClass('active');
				}).removeClass('active')

			})

		});
	}
	if($('.ensuring-slider-section__slider').length > 0){
		$('.ensuring-slider-section__slider').each(function(){
			$(this).slick({
				dots: false,
				arrows: true,
				speed: 500,
				slidesToShow: 1,
				infinite: true,
				autoplay: true,
  			    autoplaySpeed: 2000,
				prevArrow:'<button type="button" class="slick-prev"><svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1057_8074)"><path d="M34.5211 21.5001L43 43L9.39799e-07 21.5001L43 -1.87959e-06L34.5211 21.5001ZM4.12639 21.5001L32.6871 21.5001C32.6873 21.2681 32.7309 21.0381 32.8155 20.8224L39.54 3.8011L4.12639 21.5001Z" fill="white"/></g><defs><clipPath id="clip0_1057_8074"><rect width="43" height="43" fill="white" transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 0)"/></clipPath></defs></svg></button>',
                nextArrow:'<button type="button" class="slick-next"><svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1057_8071)"><path d="M8.47894 21.5001L-2.09531e-05 43L43 21.5001L-1.90735e-05 -1.87959e-06L8.47894 21.5001ZM38.8736 21.5001L10.3129 21.5001C10.3127 21.2681 10.2691 21.0381 10.1845 20.8224L3.46001 3.8011L38.8736 21.5001Z" fill="#F6F2FD"/></g><defs><clipPath id="clip0_1057_8071"><rect width="43" height="43" fill="white" transform="translate(43) rotate(90)"/></clipPath></defs></svg></button>'

			});
		});
	}
	if($('.cruising-section__slider').length > 0){
		$('.cruising-section__slider').each(function(){
			let slider = $(this);
			slider.slick({
				dots: true,
				arrows: false,
				speed: 500,
				slidesToShow: 2,
				infinite: false,
				variableWidth: true,
				draggable:true,
				autoplay: false,
  			    autoplaySpeed: 5000,
				responsive: [
					{
						breakpoint: 991,
						settings: {
							variableWidth: false,
							slidesToShow: 1,
							dots: true,
							draggable:true,
						}
					},
				]
			}).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
				//let count  = $('#cruising-step').attr('data-count');
				if(nextSlide > 0){
					$('.cruising-section__boat').removeClass('start');
					$('.cruising-section__boat').css({
						"-webkit-transform":"translateX("+slider.find('.slick-active:not(.slick-current)').outerWidth( true )+"px)",
						"-ms-transform":"translateX("+slider.find('.slick-active:not(.slick-current)').outerWidth( true )+"px)",
						"transform":"translateX("+slider.find('.slick-active:not(.slick-current)').outerWidth( true )+"px)"
					});
					let step = $('#cruising-step').val();
					$('#cruising-step').val(parseInt(step)+1);
				}else if(nextSlide == 0){
					$('#cruising-step').val(0);
					$('.cruising-section__boat').addClass('start');
					$('.cruising-section__boat').css({
						"-webkit-transform":"translateX(0px)",
						"-ms-transform":"translateX(0px)",
						"transform":"translateX(0px)"
					});
					$('#cruising-step').val(0);
				}
			});
			$(window).on('load', function() {
				$('.cruising-section__slider').each(function(){
					let carousel = $(this);
					if ($(window).width() > 991) {
						//carousel.slick('slickAdd', '<div class="item"></div>', 0);
					}
					else if($(window).width() < 991){
						carousel.slick('slickRemove', 0);
					}
				});
			});
		});
	}
	function cruisingSliderReset(){
		if($('.cruising-section__slider').length > 0){
			$('.cruising-section__slider').each(function(){
				$(this).slick('slickGoTo', 0);
				$('#cruising-step').val(0);
				$('.cruising-section__boat').addClass('start');
				$('.cruising-section__boat').css({
					"-webkit-transform":"translateX(0px)",
					"-ms-transform":"translateX(0px)",
					"transform":"translateX(0px)"
				});
			});
		}
	}
	//animate the boat
	function boatAnimate() {
		let boatAnimation = document.getElementsByClassName('boatAnimation');
		for (let i = 0; i < boatAnimation.length; i++) {

				const animation = bodymovin.loadAnimation({
						container: boatAnimation.item(i),
						renderer: 'svg',
						loop: true,
						autoplay: true,
						path: boatAnimation[i].dataset.file,

				});
				animation.setSpeed(0.3);
		}
	}
	function sideImageAnimation(){
		let animationBlock = document.getElementsByClassName('svg-json-animation');
		for (let i = 0; i < animationBlock.length; i++) {
				const animation = bodymovin.loadAnimation({
						container: animationBlock.item(i),
						renderer: 'svg',
						loop: true,
						autoplay: true,
						path: animationBlock[i].dataset.file,

				});
				animation.setSpeed(0.3);
		}
		return false;
	}
	//sourse change
	$('.sourse-select').on('change', function () {
		$('.source-field').val($(this).find(":selected").val());
	});

    $("#mobile-header-menu .menu-item-has-children > .like-link, #mobile-header-menu .menu-item-has-children > a").click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        let item = $(this).parent();
        let arrow = item.children('.like-link, a').find('.arrow-down');

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
		$(this).text(function(i, text){
			return text === "See more" ? "See less" : "See more";
		});

	});
	//post pagination------------------------------------------------
	function load_all_posts(page) {
		$(".resources-posts-section__container .loader").fadeIn();
		let tags = [];
		$('.resources-tags-section__tag:checked').each(function() {
				tags.push($(this).val());
		});
		let orderby = null
		orderby = $('.resources-search-section__categories-sortby:checked').val();
		let data = {
				page: page,
				tags: tags,
				order: orderby,
				tax_id: $('#resources-taxonomy').val(),
				tax: $('#resources-taxonomy').attr('data-tax'),
				per_page: $('#per_page').val(),
				action: "post_pagination",
		};

		$.post(var_from_php.ajax_url, data, function(response) {
				$(".resources-posts-section__container .resources-posts-section__ajax").html(response);
				$('html, body').animate({
						scrollTop: $(".resources-search-section").offset().top - 87
				}, 500);
				$('.resources-posts-section__container .loader').fadeOut(300);
		});
	}
	$(document).on('click', '.pagination .active', function() {
			let page = $(this).attr('data-page');
			load_all_posts(page);
	});
	$(document).on('change', '.resources-tags-section__tag', function() {
		load_all_posts(1);
	});
	$(".resources-search-section__categories-sortby").on('click', function() {
		// in the handler, 'this' refers to the box clicked on
		let $box = $(this);
		if ($box.is(":checked")) {
			let group = "input:checkbox[name='" + $box.attr("name") + "']";
			$(group).prop("checked", false);
			$box.prop("checked", true);
		} else {
			$box.prop("checked", false);
		}
		load_all_posts(1);
	});
	//---------------------------------------------------------------

})( jQuery );
//Add logic fo show/hide FAQ
document.addEventListener('DOMContentLoaded', function() {
    const faqTitles = document.querySelectorAll('.faq__section-title');

    faqTitles.forEach(function(title) {
        title.addEventListener('click', function() {

            this.classList.toggle('active');

            const faqItems = this.nextElementSibling;

            if (faqItems.style.maxHeight) {
                faqItems.style.maxHeight = null;
            } else {
                faqItems.style.maxHeight = faqItems.scrollHeight + 'px';
            }
        });
    });
});
