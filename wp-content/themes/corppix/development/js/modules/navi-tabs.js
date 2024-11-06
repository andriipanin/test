/**
 * Tabs Navigation functionality
 * @param tabSwitchSelectors  -  css selectors
 * @param tabPanelSelectors   -  css selectors
 * @param closeToClick        -  close child tab by click (default false)
 */
export function tabsNavigation( tabSwitchSelectors, tabPanelSelectors, closeToClick= false ) {

	(tabSwitchSelectors)
	&& [...document.querySelectorAll( tabSwitchSelectors )].forEach( ( item ) => {

		item.addEventListener( 'click', ( event ) => {

			event.preventDefault();

				let parent = event.target.closest( '.js-tabs-block-buttons' );
				let prev = event.target.previousElementSibling;
				let next = event.target.nextElementSibling;

				if ( prev === null && next && !next.classList.contains('active')) {
					parent.scrollLeft += 0;
				} else if ( next === null ) {
					parent.scrollLeft += (event.target.offsetWidth + 50);
				} else if(next && next.classList.contains('active')){
					parent.scrollLeft -= (event.target.offsetWidth);
				} else {
					parent.scrollLeft += (event.target.offsetWidth - 50);
				}

			const TAB_ID = (event.target.nodeName === 'A')
				? event.target.getAttribute( 'href' )
				: event.target.dataset.href;

			if( closeToClick && event.target.classList.contains('active') ) {
				// Remove active state from all switch elements
				[...document.querySelectorAll( tabSwitchSelectors )]
					.forEach( el => el.classList.remove( 'active' ) );

				// Remove active state from all tabs panels
				[...document.querySelectorAll( tabPanelSelectors )]
					.forEach( el => el.classList.remove( 'active' ) );
				return;

			} else {
				// Remove active state from all switch elements
				[...document.querySelectorAll( tabSwitchSelectors )]
					.forEach( el => el.classList.remove( 'active' ) );

				// Remove active state from all tabs panels
				[...document.querySelectorAll( tabPanelSelectors )]
					.forEach( el => el.classList.remove( 'active' ) );
			}


			// Set active state to current
			event.target.classList.add( 'active' );
			document.querySelector( TAB_ID ).classList.add( 'active' );


			// force trigger resize event for the document
			if ( document.createEvent ) {
				window.dispatchEvent( new Event( 'resize' ) );
			} else {
				document.body.fireEvent( 'onresize' );
			}

		} );

	} );
}