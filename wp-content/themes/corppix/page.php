<?php
/**
 * The template for displaying pages
 *
 */
get_header();
?>


<?php
do_action( 'corppix_before_page_content' );

if ( have_posts() ) :
	// Start the loop.
	while ( have_posts() ) : the_post();
		add_filter( 'the_content', 'wpautop' );
		the_content();
	endwhile;
endif;

do_action( 'corppix_after_page_content' );
?>


<?php get_footer(); ?>