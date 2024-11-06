<?php
if ( function_exists('get_field') ) {

	add_action( 'corppix_before_close_head_tag', 'custom_analytics_1', 100 );
	function custom_analytics_1()
	{
		echo get_field( 'analytics_content_before_closing_head_tag', 'theme-general-settings' );
	}

	add_action( 'corppix_after_open_body_tag', 'custom_analytics_2', 100 );
	function custom_analytics_2()
	{
		echo get_field( 'analytics_content_after_open_body_tag', 'theme-general-settings' );
	}

}