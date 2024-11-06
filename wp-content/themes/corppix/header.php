<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>"/>
   
    <?php
    if ( strpos( $_SERVER['HTTP_USER_AGENT'], 'Mac' ) !== false ) { 
        echo '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1"/>';
    } else {
        echo '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1"/>';
    }
    ?>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE"/>
	<?php if ( is_404() ) { ?>
        <meta name="robots" content="noindex, nofollow"/>
	<?php } ?>
	<?php wp_head(); ?>
	<?php do_action( 'corppix_before_close_head_tag' ); ?>
</head>

<?php
global $global_options; 
$page_class = '';
$post_id    = get_queried_object_id();

if ( function_exists('get_fields') ) {
	$page_class = ( get_field( 'body_class', $post_id ) ) ?: '';
}
?>

<body <?php body_class( $page_class ); ?>>

<?php do_action( 'corppix_after_open_body_tag' ); ?>

<div id="wrapper" class="wrapper">

    <main id="main-wrapper">
		<?php do_action( 'corppix_before_site_header' ); ?>
		
        <?php include( locate_template( 'template-parts/custom-header.php', false, false ) ); ?>
		
		<?php do_action( 'corppix_after_site_header' ); ?>
        
        <?php if ( !is_front_page() && !is_404()  ) { ?>
            <div class="breadcrumbs">
                <div class="breadcrumbs-nav container" typeof="BreadcrumbList" vocab="http://schema.org/">
                    <?php
                    if ( function_exists( 'bcn_display' ) ) {
                        bcn_display();
                    }
                    ?>
                </div>
            </div>
        <?php } ?>
