import { fadeIn, fadeOut } from './helpers';

export default class Popup {
	constructor() {
		this.body = document.querySelector( 'body' );
		this.html = document.querySelector( 'html' );
	}


	/**
	 * Force Close All opened popup window
	 * and clear the traces of an opened popup window
	 */
	forceCloseAllPopup() {
		[...document.querySelectorAll( '.popup' )].forEach( ( item ) => {
			fadeOut( item );
			
			const MAIL_SENT_OK_BOX = item.querySelector( '.wpcf7-mail-sent-ok' );
			if ( MAIL_SENT_OK_BOX ) {
				MAIL_SENT_OK_BOX.style.display = 'none';
			}
			const OFTEN_TO_SHOW_POPUP = item.querySelector( '.how_often_to_show_popup' );
			if ( OFTEN_TO_SHOW_POPUP ) {
				const COOKIE_TIME = OFTEN_TO_SHOW_POPUP.value;
				const d = new Date();
				d.setTime(d.getTime() + (COOKIE_TIME*24*60*60*1000));
				let expires = COOKIE_TIME != 0 ? "expires="+ d.toUTCString() : "expires=0";
				document.cookie = "welcome_popup=1;" + expires + ";path=/";
				document.cookie = "welcome_popup_time="+COOKIE_TIME+";" + expires + ";path=/";
			}

		} );

		this.body.classList.remove( 'popup-opened' );
		this.html.classList.remove( 'popup-opened' );
	}


	/**
	 * Open selected popup window
	 * @param popupSelector - css selector of popup that should be opened
	 * @param timeOut - ms
	 */
	openOnePopup( popupSelector = null, timeOut = 1000 ) {
		//this.forceCloseAllPopup();

		setTimeout( () => {
			this.body.classList.add( 'popup-opened' );
			this.html.classList.add( 'popup-opened' );

			fadeIn( document.querySelector( popupSelector ) );
		}, timeOut );
	}


	/**
	 * Opening popup window
	 */
	openPopup() {

		this.body.addEventListener( 'click', ( event ) => {

			if ( ![...event.target.classList].includes( 'js-open-popup-activator' ) ) {
				return false;
			}

			event.preventDefault();

			let el_href = (event.target.nodeName === 'A')
				? event.target.getAttribute( 'href' )
				: event.target.dataset.href;

			const POPUP_ELEMENT = document.querySelector(el_href);

			if (POPUP_ELEMENT) {
				const POPUP_FORM_SUBJECT = POPUP_ELEMENT.querySelector( 'form input.subject' );

				if ( POPUP_FORM_SUBJECT ) {
					POPUP_FORM_SUBJECT.value = event.target.dataset.subject;
				}
			}

			this.body.classList.add( 'popup-opened' );
			this.html.classList.add( 'popup-opened' );

			if ( event.target.classList.contains('js-add-to-cart') ) {
				const POPUP_INNER = POPUP_ELEMENT.querySelector('.js-add-to-cart-popup-inner');

 				if (POPUP_INNER) {
				    POPUP_INNER.style.display = 'none';

				    let formData = new FormData();
				    formData.append( 'action', 'get_add_to_cart_popup_content' );
				    formData.append( 'product_id', event.target.dataset?.parent_id );

				    fetch( var_from_php.ajax_url,
					    {
						    method: 'POST',
						    body: formData,
					    } )
					    .then( response => response.json() )
					    .then( response => {
						    if ( response.success ) {
							    POPUP_INNER.style.display = 'block';
							    POPUP_INNER.innerHTML = response.data;
						    }
					    } );
			    }
			}

			fadeIn( POPUP_ELEMENT );

			//POPUP_FORM_INPUT && POPUP_FORM_INPUT.focus();
		} );

	}


	/**
	 * Closing popup window
	 */
	closePopup() {
		this.body.addEventListener( 'click', ( event ) => {

			// Check if user click on close element
			if ( ![...event.target.classList].includes( 'js-popup-close' ) ) {
				return false;
			}

			event.preventDefault();
			this.forceCloseAllPopup();

			if (event.target.dataset.href) {
				window.location.assign(event.target.dataset.href)
			}

		} );


		// Checking ESC button for closing opened popup window
		document.addEventListener( 'keydown', ( event ) => {
			if ( event.keyCode === 27 ) {
				this.forceCloseAllPopup();
			}
		} );
	}


	init() {
		this.openPopup();
		this.closePopup();
	}
}
