<?php
require get_template_directory() . '/inc/Corppix.php';
require get_template_directory() . '/inc/initial-setup.php';
require get_template_directory() . '/inc/enqueue-scripts.php';
require get_template_directory() . '/inc/wpeditor-formats-options.php';
require get_template_directory() . '/inc/analytics-settings.php';
require get_template_directory() . '/inc/acf-setting.php';
require get_template_directory() . '/inc/custom-posts-type.php';
require get_template_directory() . '/inc/woocommerce-customization.php';
require get_template_directory() . '/inc/register-acf-blocks.php';
require get_template_directory() . '/inc/ajax-requests.php';
require get_template_directory() . '/inc/custom-accept-cookies.php';
require get_template_directory() . '/inc/cpt/landing-page.php';

//require get_template_directory() . '/inc/custom_top-message.php';


/* Disable WordPress Admin Bar for all users */
add_filter( 'show_admin_bar', '__return_false' );