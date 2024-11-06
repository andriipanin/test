<?php
/**
 * Create Theme General Settings
 */
if( function_exists('acf_add_options_page') ) {

	$parent = acf_add_options_page( array(
		'page_title' => 'Theme General Settings',
		'menu_title' => 'Theme Settings',
		'menu_slug'  => 'theme-general-settings',
		'post_id'    => "theme-general-settings",
		'capability' => 'edit_posts',
		'redirect'   => false
	) );
}