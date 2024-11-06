<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<input type="search" id="search-field" class="search-field" placeholder="<?php echo esc_attr_x( 'Search', 'placeholder', 'corppix_site' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
  <button type="submit" class="submit">
  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.75 15.1429C11.4779 15.1429 14.5 11.9769 14.5 8.07143C14.5 4.16599 11.4779 1 7.75 1C4.02208 1 1 4.16599 1 8.07143C1 11.9769 4.02208 15.1429 7.75 15.1429Z" stroke="#0D2D5F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.8125 13.3751L16.75 17.5001" stroke="#0D2D5F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</form>