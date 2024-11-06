<?php
// Enqueue scripts and styles.
function px_site_scripts()
{
    $min     = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
	// Load our main stylesheet.
	wp_enqueue_style( 'corppix_site-style', get_stylesheet_uri() );

    $path = "/build/styles/screen{$min}.css";
    $ver = crc32(filemtime(get_template_directory() . $path));
	wp_enqueue_style( 'corppix_site_style', get_template_directory_uri() . $path, [], $ver );

    wp_enqueue_style( 'dashicons' );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	wp_localize_script( 'corppix_site-script', 'screenReaderText', array(
		'expand' => '<span class="screen-reader-text">' . __( 'expand child menu', 'corppix_site' ) . '</span>',
		'collapse' => '<span class="screen-reader-text">' . __( 'collapse child menu', 'corppix_site' ) . '</span>',
	) );

    $path = '/build/js/libs.js';
    $ver = crc32(filemtime(get_template_directory() . $path));
	wp_enqueue_script( 'libs_js', get_template_directory_uri() . $path, array( 'jquery' ), $ver, true );

    $path = "/build/js/customization{$min}.js";
    $ver = crc32(filemtime(get_template_directory() . $path));
	wp_enqueue_script( 'customization_js', get_template_directory_uri() . $path , array(
		'jquery',
		'libs_js'
	), $ver, true );

	global $global_options;
	$how_often_to_show_popup = $global_options['how_often_to_show_popup'];
	$pelican_pete_identifier = $global_options['pelican_pete_identifier'];
	$vars = array(
		'ajax_url'           => admin_url( 'admin-ajax.php' ),
		'theme_path'         => get_stylesheet_directory_uri(),
		'site_url'           => get_site_url(),
		'how_often_to_show_popup'      => $how_often_to_show_popup,
		'pelican_pete_identifier'      => $pelican_pete_identifier,
	);

	wp_localize_script( 'customization_js', 'var_from_php', $vars );
	if(!is_search()){
		remove_action( 'wp_head', 'wp_print_scripts' );
		remove_action( 'wp_head', 'wp_print_head_scripts', 9 );
		remove_action( 'wp_head', 'wp_enqueue_scripts', 1 );
	
		add_action( 'wp_footer', 'wp_print_scripts', 5 );
		add_action( 'wp_footer', 'wp_enqueue_scripts', 5 );
		add_action( 'wp_footer', 'wp_print_head_scripts', 5 );
	}
	//wp_enqueue_script('jquery', false, array(), false, false);


}

add_action( 'wp_enqueue_scripts', 'px_site_scripts' );



