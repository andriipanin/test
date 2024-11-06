import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();

/**
 * Fade Out method
 * @param el
 */
export function fadeOut( el ) {

	if ( !el ) {
		throw Error( '"fadeOut function - "You didn\'t add required parameters' );
	}

	el.style.opacity = 1;

	(function fade() {
		if ( (el.style.opacity -= .1) < 0 ) {
			el.style.display = "none";
		} else {
			requestAnimationFrame( fade );
		}
	})();
}


/**
 * Fade In method
 * @param el      - element that need to fade in
 * @param display - display variant
 */
export function fadeIn( el, display ) {

	if ( !el ) {
		throw Error( '"fadeIn function - "You didn\'t add required parameters' );
	}

	el.style.opacity = 0;
	el.style.display = display || "block";

	(function fade() {
		let val = parseFloat( el.style.opacity );
		if ( !((val += .1) > 1) ) {
			el.style.opacity = val;
			requestAnimationFrame( fade );
		}
	})();
}


/**
 *  Set equal height to selected elements calculated as bigger height
 * @param elementsSelector  - selector for searching elements
 * @param minOrMax          - Define what dimension should be calculated (minHeight or maxHeight)
 * @returns elementsSelector
 */
export function equalHeights( elementsSelector, minOrMax = 'max' ) {

	if ( !elementsSelector ) {
		throw Error( '"equalHeights function - "You didn\'t add required parameters' );
	}

	let heights = [];
	let elementsSelectorArr = (Array.isArray( elementsSelector ))
		? elementsSelector
		: [...document.querySelectorAll( elementsSelector )];

	elementsSelectorArr.forEach( ( item ) => {
		item.style.height = 'auto';
	} );

	elementsSelectorArr.forEach( ( item ) => {
		heights.push( item.offsetHeight );
	} );

	let commonHeight = (minOrMax === 'max')
		? Math.max.apply( 0, heights )
		: Math.min.apply( 0, heights );

	elementsSelectorArr.forEach( ( item ) => {
		item.style.height = commonHeight + 'px';
	} );

	return elementsSelector;

}


/**
 * Set equal height to selected elements in row calculated as bigger height
 * @param elementsSelector - selector for searching elements
 * @param numItem_inrow    - Items amount that will be used for each equal height iteration
 * @returns elementsSelector
 */
export function equalHeights_inrow( elementsSelector, numItem_inrow ) {

	if ( !elementsSelector || !numItem_inrow ) {
		throw Error( '"equalHeights_inrow function - "You didn\'t add required parameters' );
	}

	const ELEMENTS_ARR = [...document.querySelectorAll( elementsSelector )];
	const EL_LENGTH = ELEMENTS_ARR.length;

	for ( let i = 0; i <= EL_LENGTH / numItem_inrow; i++ ) {
		let temp = ELEMENTS_ARR.slice( i * numItem_inrow, i * numItem_inrow + numItem_inrow );
		equalHeights( temp );
	}

	return elementsSelector;
}


/**
 * Trim all paragraph from unneeded space symbol
 */
export function trimParagraph() {
	[...document.querySelectorAll( 'p' )].forEach( item => {
		item.innerHTML = item.innerHTML.trim();
	} );
}


/**
 * Check if element in viewport
 * @param el
 * @param offset - Adjustable offset value when element becomes visible
 * @returns {boolean}
 */
export function isInViewport( el, offset = 100 ) {

	if ( !el ) {
		throw Error( '"isInViewport function - "You didn\'t add required parameters' );
	}

	const scroll = window.scrollY || window.pageYOffset;
	const boundsTop = el.getBoundingClientRect().top + offset + scroll;

	const viewport = {
		top: scroll,
		bottom: scroll + window.innerHeight,
	};

	const bounds = {
		top: boundsTop,
		bottom: boundsTop + el.clientHeight,
	};

	return (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom)
		|| (bounds.top <= viewport.bottom && bounds.top >= viewport.top);

}


/**
 * Debounce function
 * @param fn     - function that should be executed
 * @param time   - time delay
 * @returns {Function}
 */
export const debounce = ( fn, time = 1000 ) => {

	if ( !fn ) {
		throw Error( '"debounce function - "You didn\'t add required parameters' );
	}

	let timeout;

	return function () {
		const functionCall = () => fn.apply( this, arguments );

		clearTimeout( timeout );
		timeout = setTimeout( functionCall, time );
	}
};


/**
 * Copy to clipboard
 * @param element -  element that  contain value to copy
 */
export const copyToClipboard = ( parent, element ) => {

	if ( !parent || !element ) {
		throw Error( '"copyToClipboard function - "You didn\'t add required parameters' );
	}

	const el = document.createElement( 'textarea' );
	el.value = element.value;
	document.body.appendChild( el );
	el.select();

	try {
		const successful = document.execCommand( 'copy' );

		if ( successful ) {
			parent.classList.add( 'copied' );

			setTimeout( () => {
				parent.classList.remove( 'copied' );
			}, 3000 );
		}
	} catch ( err ) {
		console.log( 'Oops, unable to copy' );
	}

	document.body.removeChild( el );
};


/**
 * Test value with regex
 * @param {(name|email|phone|postal)} fieldType  - The allowed type of the fields
 * @param value
 * @return {boolean}
 */
export const validateField = ( fieldType = null, value = null ) => {

	if ( !fieldType || !value ) {
		throw Error( '"validateField function - "You didn\'t add required parameters' );
	}

	const phoneREGEX = /^[0-9\+]{6,13}$/;
	const nameREGEX = /^[a-zA-Zа-яА-Я\s]{2,30}$/;
	const postalREGEX = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
	const emailREGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const dummyREGEX = /^.+$/;

	let checkResult = false;

	switch ( fieldType ) {
		case 'name':
			checkResult = nameREGEX.test( value );
			break;
		case 'phone':
			checkResult = phoneREGEX.test( value );
			break;
		case 'postal':
			checkResult = postalREGEX.test( value );
			break;
		case 'email':
			checkResult = emailREGEX.test( value );
			break;
		case 'price':
			checkResult = dummyREGEX.test( value );
			break;
		case 'aim':
			checkResult = dummyREGEX.test( value );
			break;
		case 'date':
			checkResult = dummyREGEX.test( value );
			break;
		case 'subject':
			checkResult = dummyREGEX.test( value );
			break;
	}

	return checkResult;

};


/**
 * Polyfill for closest method
 */
export function closest_polyfill() {
	if ( window.Element && !Element.prototype.closest ) {
		Element.prototype.closest =
			function ( s ) {
				let matches = (this.document || this.ownerDocument).querySelectorAll( s ),
					i,
					el = this;
				do {
					i = matches.length;
					while ( --i >= 0 && matches.item( i ) !== el ) {
					}
					;
				} while ( (i < 0) && (el = el.parentElement) );
				return el;
			};
	}
}


/**
 * Smooth scroll to element on page
 * @param elementsSelector string -- css selector (anchor links)
 * @param callback function       -- callback for some additional actions
 */
export function anchorLinkScroll( elementsSelector, callback = '' ) {

	if ( !elementsSelector ) {
		throw Error( '"anchorLinkScroll function - "You didn\'t add correct selector for anchor links' );
	}

	const elements = document.querySelectorAll( elementsSelector );

	(elements) && [...elements].forEach( link => {

		link.addEventListener( 'click', ( event ) => {
			event.preventDefault();

			let el_href = (event.target.nodeName === 'A')
				? event.target.getAttribute( 'href' )
				: event.target.dataset.href;

			const ANCHOR_ELEMENT = document.querySelector( el_href );

			(ANCHOR_ELEMENT) && window.scroll( {
				'behavior': 'smooth',
				'left': 0,
				'top': ANCHOR_ELEMENT.offsetTop
			} );

			if ( callback ) callback();

		} );

	} );

}


/**
 * Add/remove product from Favorite list
 * @param productID
 * @param operationType
 */
export const add_product_to_favorites = ( productID, operationType ) => {
	if ( !productID ) return;

	let favorite_products = Cookies.get( 'favorite_products' );

	if ( !favorite_products && operationType === 'add' ) {
		Cookies.set( 'favorite_products', JSON.stringify( [productID] ), {expires: 30} );
		return;
	}

	let convertedArr = JSON.parse( favorite_products );

	switch ( operationType ) {
		case 'remove':
			convertedArr = convertedArr.filter( item => +item !== +productID);
			break;
		case 'add':
			convertedArr.push( productID );
			break;
	}

	Cookies.set( 'favorite_products', JSON.stringify( convertedArr ), {expires: 30} )
	return;
}

export const update_favorites_count = (counterContainer) => {
	if( !counterContainer ) return;
		const COOK = Cookies.get( 'favorite_products' );
		const COUNT_OF_FAVORITES =	(COOK) ? JSON.parse(COOK) : null;

		const EXISTING_SPAN = document.querySelector('.favorite_count');


		if(EXISTING_SPAN && COUNT_OF_FAVORITES && (+COUNT_OF_FAVORITES.length < 1)) {
			EXISTING_SPAN.remove();
		}

		if(EXISTING_SPAN && COUNT_OF_FAVORITES && (+COUNT_OF_FAVORITES.length)) {
			EXISTING_SPAN.innerText = JSON.parse(Cookies.get( 'favorite_products' )).length;

		}

		if( !EXISTING_SPAN && COUNT_OF_FAVORITES && (+COUNT_OF_FAVORITES.length > 0)){
			const SPAN = document.createElement('span');
			SPAN.classList.add('favorite_count');
			SPAN.innerText = JSON.parse(Cookies.get( 'favorite_products' )).length;
			counterContainer.appendChild(SPAN);
		}
}
/**
 * Send product ID to store as Favorite product
 * @param formElement
 */
export const load_more_products = async ( formID, offset, step_per_page ) => {
	if ( !formID || !offset ) {
		console.log( 'Some of parameter are missed (formID, offset)' );
		return;
	}

	const formData = new FormData( document.querySelector( formID ) );
	formData.append( 'action', 'load_more_products' );
	formData.append( 'offset', offset );

	const option = {
		method: 'POST',
		body: formData,
	}
	return await fetch( var_from_php.ajax_url, option );
}


/**
 * Search product request function
 * @param elem
 */
export const search_product = ( elem ) => {

	if ( !elem ) {
		throw Error( '"search_product" function - You didn\'t add required parameters' );
	}

	const FORM_TAG = elem.closest( '.js-box-search' );
	const SEARCH_RESULTS_INPUT = document.querySelector( '.js-search-results-input' );
	const SEARCH_RESULTS_BLOCK = document.querySelector( '.js-search-result' );
	const FORM_WRAPPER = document.querySelector( '.js-form-wrapper' );
	const SEARCH_BUTTON = document.querySelector( '.js-search-button' );

	let formData = new FormData( FORM_TAG );

	if ( !FORM_TAG ) {
		throw Error( '"search_product" function - FORM_TAG can\'t be found ' );
	}

	(SEARCH_RESULTS_INPUT)
	&& SEARCH_RESULTS_INPUT.setAttribute( 'disabled', 'disabled' );

	formData.append( 'action', 'get_search_results' );
	if ( SEARCH_RESULTS_INPUT.value !== "" ) {
		fetch( var_from_php.ajax_url,
			{
				method: 'POST',
				body: formData,
			} )
			.then( response => response.json() )
			.then( response => {
				if ( response.success && response.data !== "" ) {
					if ( SEARCH_RESULTS_BLOCK ) {
						SEARCH_RESULTS_BLOCK.innerHTML = response.data.html;
					}

					FORM_WRAPPER.classList.add( 'open' );
					SEARCH_BUTTON.classList.add( 'open' );
					SEARCH_RESULTS_BLOCK.classList.add( 'open' );

				} else {
					FORM_WRAPPER.classList.add( 'open' );
					SEARCH_BUTTON.classList.add( 'open' );
					SEARCH_RESULTS_BLOCK.classList.add( 'open' );
					SEARCH_RESULTS_BLOCK.innerHTML = '<p class="search-box__search-not-found">Ничего не найдено</p>';
				}

				SEARCH_RESULTS_INPUT.removeAttribute( 'disabled' );
			} );
	} else {
		(FORM_WRAPPER) && FORM_WRAPPER.classList.remove( 'open' );
		(SEARCH_BUTTON) && FORM_WRAPPER.classList.remove( 'open' );
		(SEARCH_RESULTS_BLOCK) && SEARCH_RESULTS_BLOCK.classList.remove( 'open' );
		(SEARCH_RESULTS_INPUT) && SEARCH_RESULTS_INPUT.removeAttribute( 'disabled' );
	}
}


/**
 * Check and login user functionality
 * @param form_instance
 */
export const check_and_login_user = async ( form_instance ) => {

	if ( !form_instance ) {
		throw Error( '"check_and_login_user" function - You didn\'t add required parameters' );
	}

	const EMAIL_PHONE_INPUT = form_instance['login-email-phone'];
	const TYPE_OF_ENTERED_EL = form_instance['type-of-entered'];
	const SUBMIT_BTN_EL = form_instance['submit-btn'];
	const EMAIL_PHONE_INPUT_ERROR_EL = EMAIL_PHONE_INPUT.nextElementSibling;

	const VALIDATE_AS_EMAIL = validateField( 'email', EMAIL_PHONE_INPUT.value );
	const VALIDATE_AS_PHONE = validateField( 'phone', EMAIL_PHONE_INPUT.value );

	// Fill helper field for backend request
	if ( TYPE_OF_ENTERED_EL ) {
		TYPE_OF_ENTERED_EL.value = (VALIDATE_AS_EMAIL) ? 'email' : (VALIDATE_AS_PHONE) ? 'phone' : '';
	}

	// Show error message when user entered invalid email/phone
	if ( !VALIDATE_AS_EMAIL && !VALIDATE_AS_PHONE && EMAIL_PHONE_INPUT_ERROR_EL ) {
		EMAIL_PHONE_INPUT_ERROR_EL.innerHTML = var_from_php.string_translation['email_phone_not_valid'];
		return;
	}

	(SUBMIT_BTN_EL) && SUBMIT_BTN_EL.classList.add( 'loading' );

	if ( EMAIL_PHONE_INPUT_ERROR_EL ) {
		EMAIL_PHONE_INPUT_ERROR_EL.innerHTML = '';
	}

	const formData = new FormData( form_instance );
	formData.append( 'action', 'check_and_login_user' );

	fetch( var_from_php.ajax_url,
		{
			method: 'POST',
			body: formData,
		} )
		.then( response => response.json() )
		.then( response => {
			(SUBMIT_BTN_EL) && SUBMIT_BTN_EL.classList.remove( 'loading' );
			if ( response.success ) {
				window.location.href = var_from_php.account_url;
			}
		} );

}


/**
 * Updated cart totals function
 */
export const updated_cart_totals_func = ( itemsAmount = null, cartTotal = null ) => {

	const CURRENT_ORDER_VALUE = document.querySelectorAll( '.js-current-order-value' );
	const BLOCK_INFO = document.querySelector( '.js-heading-area-warnings-text' );
	let current_total_cart = cartTotal;
	let current_total_cart_value = 0;

	if ( !cartTotal ) {
		current_total_cart = document.querySelector( '.js-cart-total' ).innerHTML;
		current_total_cart_value = document.querySelector( '.js-cart-total' ).dataset.total;
	}

	let min_total_el = document.querySelector( '.js-min-order-value' );
	let MIN_TOTAL = null;
	if ( min_total_el ) {
		MIN_TOTAL = min_total_el.innerHTML;
	}
	const TOTAL_BLOCK_INFO = document.querySelectorAll( '.js-current-order-value' );
	const TOTAL_HEADER_STICKY = document.querySelectorAll( '.js-sticky-header-cart-price' );
	const TOTAL_BLOCK_HEADER = document.querySelectorAll( '.js-header-cart-price' );
	const HEADER_CART_COUNT = document.querySelectorAll( '.js-header-cart-count' );
	const INPUT_QTYs = document.querySelectorAll( '.input-text.qty' );

	let items_amount = itemsAmount;


	// Update current order amount for visual layouts
	[...TOTAL_BLOCK_INFO, ...TOTAL_HEADER_STICKY, ...TOTAL_BLOCK_HEADER, ...CURRENT_ORDER_VALUE].forEach( item => {
		if ( item ) {
			item.innerHTML = current_total_cart;
		}
	} );
	if ( !cartTotal ) {
		// Hide/show notice about minimal amount of order
		let operationType = (+current_total_cart_value > parseInt( MIN_TOTAL )) ? 'add' : 'remove';
		(BLOCK_INFO) && BLOCK_INFO.classList[operationType]( 'hidden' );
	}
	// Get total items amount in the cart
	if ( !itemsAmount ) {
		items_amount = (INPUT_QTYs) && [...INPUT_QTYs].reduce( ( accum, curr ) => accum + +curr.value, 0 );
	}
	// Update cart count in 3 places
	(HEADER_CART_COUNT) && [...HEADER_CART_COUNT].forEach( item => item.innerHTML = items_amount );

}


/**
 * Custom add to cart functionality and update cart counters
 * @param product_id
 * @param amount
 * @param event
 * @return {Promise<void>}
 */
export const custom_add_to_cart = async ( product_id, amount, event = null ) => {

	if(!product_id || !amount || !event) return;

	const formData = new FormData();
	formData.append( 'action', 'add_to_cart' );
	formData.append( 'product_id', product_id );
	formData.append( 'amount', amount );

	fetch( var_from_php.ajax_url,
		{
			method: 'POST',
			body: formData,
		} )
		.then( response => response.json() )
		.then( response => {
			(event) && event.target.classList.remove( 'loading' );

			if ( response.success ) {
				updated_cart_totals_func( response.data['qty'], response.data['total'] );
			}
		} );
}


/**
 * Collect order details to backend
 * @param target
 */
export const getFormFields = ( target ) => {
	const data = new FormData( target );
	data.append( 'action', 'create_order' );

	document.body.addEventListener( 'change', ( event ) => {
		if ( event.target.type === 'file' ) {
			console.log( event.target.files[0].size > 0 );
			data.append( 'file', event.target.files );

		}
	} );

	fetchFiled( data );
}

/**
 * Send order details to backend
 * @param fieldsArray
 */
export const fetchFiled = ( fieldsArray ) => {
	if ( !fieldsArray ) return;

	fetch( var_from_php.ajax_url, {
		method: 'POST',
		body: fieldsArray,

	} )
		.then( ( response ) => {
			return response;
		} )
		.then( ( data ) => {
			console.log( data );
		} );
}

export const putFileIntoFormData = ( fileInput, FormData ) => {
	if ( !fileInput ) return;
	FormData.append( 'file', fileInput );
	console.log( FormData );
}

/**
 * Switcher of delivery types in woocommerce
 * @param deliveryList
 * @param target
 */
export const deliveryTypeSwitcher = ( target, deliveryList ) => {
	if ( !deliveryList ) return;

	const FLAT_RATE = deliveryList[0];
	const NOVA_POSHTA = deliveryList[1];
	const SHIPPING_ADDRESS_CONTAINER = document.querySelector( '.shipping_address' );

	if ( !SHIPPING_ADDRESS_CONTAINER || !NOVA_POSHTA || !FLAT_RATE ) return;

	deliveryList.forEach( item => item.checked = false );

	if ( target.dataset.type === 'nova-poshta' ) {
		NOVA_POSHTA.checked = true;
		SHIPPING_ADDRESS_CONTAINER.style.display = 'none';
		document.body.dispatchEvent( new Event( 'update_checkout' ) );
	}

	if ( target.dataset.type === 'address-delivery' ) {
		FLAT_RATE.checked = true;
		SHIPPING_ADDRESS_CONTAINER.style.display = 'block';
		document.body.dispatchEvent( new Event( 'update_checkout' ) );
	}
}

/**
 * Check what delivery type are chosen and activate appropriate checkbox for delivery method
 * @param deliveryList
 */
export const deliveryCheckboxesState = ( deliveryList ) => {

	const NOVA_POSHTA_FIELD = document.querySelector( 'input[data-type="nova-poshta"]' );
	const FLAT_RATE_FIELD = document.querySelector( 'input[data-type="address-delivery"]' );
	const SHIPPING_ADDRESS_CONTAINER = document.querySelector( '.shipping_address' );

	if ( !FLAT_RATE_FIELD || !NOVA_POSHTA_FIELD || !SHIPPING_ADDRESS_CONTAINER ) return;

	if ( !deliveryList || (deliveryList.length === 0) ) {
		FLAT_RATE_FIELD.checked = true;
		SHIPPING_ADDRESS_CONTAINER.style.display = 'block';
		return;
	}

	deliveryList.forEach( ( elem ) => {
		let elem_id = elem.id;
		let checked_elem = elem.checked;

		switch ( elem_id ) {
			case 'shipping_method_0_flat_rate1':
				if ( checked_elem ) {
					FLAT_RATE_FIELD.checked = true;
					SHIPPING_ADDRESS_CONTAINER.style.display = 'block';
				}

				break;

			case 'shipping_method_0_nova_poshta_shipping2':
				if ( checked_elem ) {
					NOVA_POSHTA_FIELD.checked = true;
					SHIPPING_ADDRESS_CONTAINER.style.display = 'none';
				}

				break
		}
	} );
}

/**
 * Wrapping label inner text into span
 */
export const checkboxInnerTextWrapping = () => {
	const LABEL = document.querySelector( '#wcus_np_billing_fields .wc-ukr-shipping-checkbox' );
	if ( !LABEL ) return;
	const INPUT = LABEL.querySelector( 'input' );
	const LABEL_TEXT = (LABEL.innerText).trim();
	LABEL.innerText = '';
	let span = document.createElement( 'span' );
	span.innerText = LABEL_TEXT;

	LABEL.appendChild( INPUT );
	LABEL.appendChild( span );
}

//get GET params from url
export const getAllUrlParams = ( url ) => {

	// fetch string from url or window object
	let queryString = url ? url.split( '?' )[1] : window.location.search.slice( 1 );

	// object for storing parameters
	let obj = {};

	// if there is a query string
	if ( queryString ) {

		// data after the # sign will be omitted
		queryString = queryString.split( '#' )[0];

		// share parameters
		let arr = queryString.split( '&' );

		for ( let i = 0; i < arr.length; i++ ) {
			// split the parameter into key => value
			let a = arr[i].split( '=' );

			// processing data like: list [] = thing1 & list [] = thing2
			let paramNum = undefined;
			let paramName = a[0].replace( /\[\d*\]/, function ( v ) {
				paramNum = v.slice( 1, -1 );
				return '';
			} );

			// passing parameter value ('true' if no value is specified)
			let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

			// register conversion
			paramName = paramName.toLowerCase();
			paramValue = paramValue.toLowerCase();

			// if the parameter key is already set
			if ( obj[paramName] ) {

				if ( typeof obj[paramName] === 'string' ) {
					obj[paramName] = [obj[paramName]];
				}
				// if no index is given ...
				if ( typeof paramNum === 'undefined' ) {
					// помещаем значение в конец массива
					obj[paramName].push( paramValue );
				}
				// if index is given ...
				else {

					obj[paramName][paramNum] = paramValue;
				}
			} else {
				obj[paramName] = paramValue;
			}
		}
	}

	return obj;
}


/**
 * Filters products based on collected user data
 */
export const check_filter_tags = ( event ) => {
	let apply_filter_button = event.target;
	const FILTERS_SETTINGS = document.querySelector( '.js-checked-filters-settings' );
	const FILTERS_SETTINGS_WRAP = document.querySelector( '.js-checked-filters-settings-wrap' );
	const JS_TAB_PANEL_FILTER_ARR = [...document.querySelectorAll( '.js-tab-panel-filter' )];
	const SWITCHER_FILTER_ACTIVE = document.querySelectorAll( '.js-tab-switcher-filter' );
	let html_filter = '';
	let TAB_PANEL_FILTER = (apply_filter_button) && apply_filter_button.closest( '.js-tab-panel-filter' );
	let id_tab_panel = (TAB_PANEL_FILTER) && TAB_PANEL_FILTER.id;
	let checkedRadio = false;

	(JS_TAB_PANEL_FILTER_ARR) && JS_TAB_PANEL_FILTER_ARR.forEach( ( tab_panel_filter ) => {
		let data_type = tab_panel_filter.getAttribute( 'id' );

		checkedRadio = tab_panel_filter.querySelectorAll( 'input[type=checkbox]:checked' );
		if ( checkedRadio && checkedRadio.length ) {

			checkedRadio.forEach( ( elem ) => {
				let filter_val = elem.value;

				console.log( 'filter_val', filter_val );
				let label_input = elem.nextElementSibling.innerText;
				let TAB_SWITCHER_FILTER = document.querySelector( '.js-tab-switcher-filter.active' );
				let type_text = (TAB_SWITCHER_FILTER) && TAB_SWITCHER_FILTER.innerText;

				if ( !document.querySelector( `.filter-settings-item[data-id="${filter_val}"]` ) ) {
					html_filter += `<div data-type="${data_type}"
									 data-id="${filter_val}"
									 class="filter-settings-item js-filter-settings-item">
									    <span>${type_text}:</span>
										${label_input}
										<span class="remove-filter-settings" data-role="remove-filter-settings" ></span>
									</div>`;
				}

			} );

			if ( html_filter !== '' && FILTERS_SETTINGS_WRAP && FILTERS_SETTINGS_WRAP ) {
				if ( FILTERS_SETTINGS ) {
					FILTERS_SETTINGS.innerHTML += html_filter;
				}

				(FILTERS_SETTINGS_WRAP) && FILTERS_SETTINGS_WRAP.classList.add( 'active' );
			}

			[...SWITCHER_FILTER_ACTIVE].forEach(( item )=>{
				(item) && item.nextElementSibling.classList.remove( 'active' );
			});

			// if (SWITCHER_FILTER_ACTIVE.nextElementSibling) {
			// 	SWITCHER_FILTER_ACTIVE.nextElementSibling.classList.remove( 'active' );
			// }


			(apply_filter_button)
			&& (apply_filter_button.closest( '.js-tab-panel-filter' ))
			&& apply_filter_button.closest( '.js-tab-panel-filter' ).classList.remove( 'active' );

			const SELECTED_ID_TAB_PANEL = document.querySelector( `.js-tab-switcher-filter[href="#${id_tab_panel}"]` );
			(SELECTED_ID_TAB_PANEL) && SELECTED_ID_TAB_PANEL.classList.remove( 'active' );
		}
	} );
}


/**
 * Opens TOP_MENU on hover over a link
 */
export const open_top_menu = ( event ) => {
	const BUTTON_CATEGORY_ARR = document.querySelectorAll( '.js-button-category' );
	const ELEM_TARGET         = event.target;
	const CATALOG_MENU        = document.querySelector( '.js-catalog-menu-top' );

	if ( (ELEM_TARGET && (ELEM_TARGET.classList.contains( 'js-catalog-link' ) ||
		ELEM_TARGET.classList.contains( 'js-button-category' )))) {

		(CATALOG_MENU) && CATALOG_MENU.classList.add( 'open' );

		(BUTTON_CATEGORY_ARR) && [...BUTTON_CATEGORY_ARR].forEach( ( item ) => {
			item.classList.add( 'open' );
		} );
	}
}

/**
 * Opens TOP_MENU on hover over a link
 */
export const close_top_menu = () => {
	const BUTTON_CATEGORY_ARR = document.querySelectorAll('.js-button-category');
	const CATALOG_MENU_TOP = document.querySelector('.js-catalog-menu-top');

	CATALOG_MENU_TOP.classList.remove('open');
	(BUTTON_CATEGORY_ARR) && [...BUTTON_CATEGORY_ARR].forEach((item) => {
		item.classList.remove('open');
	});
};

export const fetch_display_color_slider = async (variation) => {

	const ID_PRODUCT = document.querySelector('.js-id-product');
	const JS_SLIDER_SOLO = document.querySelector('.js-slider-solo');
	const JS_SLIDER_SOLO_NAV = document.querySelector('.js-slider-solo-nav');

	let havePhoto;
	let html_big = '';
	let html_small = '';

	const formData = new FormData();
	formData.append('action', 'products_colors_galleries');
	formData.append('id_product', ID_PRODUCT?.dataset?.id);

	const RESPONSE = await fetch( var_from_php.ajax_url, {
		method: 'POST',
		body : formData,
	}).then( response => response.json());

	if(RESPONSE){
		RESPONSE.forEach(( item ) => {
			if(variation.active_color === item.color.slug) {
				if(item.gallery){
					havePhoto = true;
					item.gallery.forEach((image) => {
						if(image){
							havePhoto = true;
							html_big += `<div class="solo-slider__slide">
		                        <a class="solo-slider__link" data-fancybox="slider"
		                           href="${image.url}">
		                            <img class="solo-slider__img" src="${image.url}">
		                        </a>
		                    </div>`;

							html_small += `<div class="solo-slider__slide">
								<img class="solo-slider__img  solo-slider__small" src="${image.url}" alt="img">
							</div>`;
						}
					});
				} else {
					havePhoto = !havePhoto;
				}
			}
		});
	}

	if(!havePhoto && JS_SLIDER_SOLO && JS_SLIDER_SOLO_NAV){
		JS_SLIDER_SOLO.innerHTML = `<div class="solo-slider__slide solo-slider__slide_no-photo">
		                        		 NO PHOTO
		                    		</div>`;

		JS_SLIDER_SOLO_NAV.innerHTML = '';


	}

	if(JS_SLIDER_SOLO && JS_SLIDER_SOLO_NAV && havePhoto){

		if(JS_SLIDER_SOLO.classList.contains('slick-initialized')
			&& JS_SLIDER_SOLO_NAV.classList.contains('slick-initialized')) {

			JS_SLIDER_SOLO.classList.remove('slick-initialized');
			JS_SLIDER_SOLO_NAV.classList.remove('slick-initialized');
		}

		JS_SLIDER_SOLO.innerHTML = html_big;
		JS_SLIDER_SOLO_NAV.innerHTML = html_small;

		jQuery(JS_SLIDER_SOLO).slick( {
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			fade: true,
			asNavFor: '.js-slider-solo-nav',
			row: 0,
			prevArrow: jQuery( '.js-gallery-prev' ),
			nextArrow: jQuery( '.js-gallery-next' ),
		} );

		jQuery(JS_SLIDER_SOLO_NAV).slick( {
			slidesToShow: 4,
			slidesToScroll: 1,
			asNavFor: '.js-slider-solo',
			dots: false,
			arrows: false,
			centerMode: false,
			focusOnSelect: true,
			row: 0
		} );
	}
}

// Create cookie
export const setCookie = (cname, cvalue, exdays) => {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = exdays != 0 ? "expires="+ d.toUTCString() : "expires=0";
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Delete cookie
export const deleteCookie = (cname) => {
	const d = new Date();
	d.setTime(d.getTime() + (24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=;" + expires + ";path=/";
}

// Read cookie
export const getCookie = (cname) => {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
					c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
			}
	}
	return false;
}
export const checkLifeTime = async (WELCOME_POPUP_COOKIE_TIME, POPUP_COOKIE_TIME) => {
	if(WELCOME_POPUP_COOKIE_TIME != POPUP_COOKIE_TIME){
		deleteCookie('welcome_popup');
		deleteCookie('welcome_popup_time');
	}
}