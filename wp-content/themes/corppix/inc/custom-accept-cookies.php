<?php
add_action('corppix_after_site_page_tag', function(){
	?>
	<div class="accept-cookie-box js-accept-cookie-box">
		<div class="accept-cookie-box__container">
			<div class="accept-cookie-box__inner">
				<button class="accept-cookie-box__accept-btn btn bg-pink js-accept-cookie-btn"
				        data-role="accept-cookie">
					<?php echo _e('Accept cookies'); ?>
				</button>
				<div class="accept-cookie-box__text">
					<?php echo get_field('cookie_text', 'theme-general-settings'); ?>
				</div>	
			</div>
		</div>
		<button class="accept-cookie-box__close-btn js-close-accept-cookie-box-btn"
		        data-role="close-accept-cookie-box">
						<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 1L1 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
					<path d="M1 1L12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
					</svg>

		</button>
	</div>

	<script>
		const ACCEPT_COOKIE_BOX   = document.querySelector('.js-accept-cookie-box');
		const CHAT_ICON           = document.querySelector('.chat-icon');
		const ACCEPT_COOKIE_CHECK = localStorage.getItem('accept-cookie');

		if ( !ACCEPT_COOKIE_CHECK || +ACCEPT_COOKIE_CHECK !== 1 ) {
			(ACCEPT_COOKIE_BOX) && ACCEPT_COOKIE_BOX.classList.add('opened');
			document.body.classList.add('accept-cookie-box-is-opened');
		}

		document.body.addEventListener('click', function(event){
			const ROLE = event.target.dataset.role;
			if ( !ROLE ) return;

			switch ( ROLE ) {
				case 'accept-cookie':
					localStorage.setItem('accept-cookie', 1);
					(ACCEPT_COOKIE_BOX) && ACCEPT_COOKIE_BOX.classList.remove('opened');
					document.body.classList.remove('accept-cookie-box-is-opened');
					break;
				case 'close-accept-cookie-box':
					(ACCEPT_COOKIE_BOX) && ACCEPT_COOKIE_BOX.classList.remove('opened');
					document.body.classList.remove('accept-cookie-box-is-opened');
					break;
			}
		});
	</script>
	<?php
});
?>