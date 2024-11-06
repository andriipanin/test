<?php
function custom_gutenberg_block()
{
	if ( !function_exists( 'acf_register_block' ) ) {
		return;
	}

	// Example how to register new ACF Gutenberg block
	acf_register_block( array (
		'name'            => 'top-banner',
		'title'           => __( 'Top Banner', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'banner')
	) );

	// Example how to register new ACF Gutenberg block
	acf_register_block( array (
		'name'            => 'image-content',
		'title'           => __( 'Image with content block', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'content', 'image')
	) );

	// Example how to register new ACF Gutenberg block
	acf_register_block( array (
		'name'            => 'home-sailer',
		'title'           => __( 'Home sailer block', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'content', 'sailer')
	) );
	
	// Example how to register new ACF Gutenberg block
	acf_register_block( array (
		'name'            => 'tab-content',
		'title'           => __( 'Tab block', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'content', 'tab')
	) );
	
	// Example how to register new ACF Gutenberg block
	acf_register_block( array (
		'name'            => 'team',
		'title'           => __( 'Team block', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'content', 'team')
	) );
	
	// Example how to register new ACF Gutenberg block
	acf_register_block( array (
		'name'            => 'partners',
		'title'           => __( 'Partners block', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'content', 'partners')
	) );
		
	acf_register_block( array (
		'name'            => 'testimonials-content',
		'title'           => __( 'Testimonials block', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'testimonials')
	) );
	acf_register_block( array (
		'name'            => 'content-block',
		'title'           => __( 'Content block', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'content')
	) );
	acf_register_block( array (
		'name'            => 'blue-content-block',
		'title'           => __( 'Blue content block', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'content', 'blue')
	) );
	acf_register_block( array (
		'name'            => 'benefits',
		'title'           => __( 'Benefits block', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'benefits')
	) );
    acf_register_block( array (
        'name'            => 'benefits-new',
        'title'           => __( 'Benefits block new', 'corppix_site' ),
        'render_callback' => 'wpahead_acf_block_render_callback',
        'category'        => 'layout',
        'icon'            => 'lightbulb',
        'post_types'      => array( 'page', 'post' ),
        'keywords'        => array( 'benefits')
    ) );
	acf_register_block( array (
		'name'            => 'cruising-with-ahoy',
		'title'           => __( 'Cruising with Ahoy', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'cruising')
	) );
	acf_register_block( array (
		'name'            => 'technology-slider',
		'title'           => __( 'Technology slider', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'technology', 'slider')
	) );
	acf_register_block( array (
		'name'            => 'ensuring-slider',
		'title'           => __( 'Ensuring slider', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'ensuring', 'slider')
	) );
	acf_register_block( array (
		'name'            => 'news-block',
		'title'           => __( 'News and resources', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'news', 'resources')
	) ); 
	acf_register_block( array (
		'name'            => 'our-offices',
		'title'           => __( 'Our offices', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'offices')
	) );
	acf_register_block( array (
		'name'            => 'contact',
		'title'           => __( 'Contact', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'contact')
	) );
	acf_register_block( array (
		'name'            => 'faq-content',
		'title'           => __( 'FAQ', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'faq')
	) );
	acf_register_block( array (
		'name'            => 'faq-form',
		'title'           => __( 'Ask us anything', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'form', 'ask us')
	) );
	acf_register_block( array (
		'name'            => 'bubbel-top-banner',
		'title'           => __( 'Bubbels top banner', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'bubbels', 'banner')
	) );
	acf_register_block( array (
		'name'            => 'socials',
		'title'           => __( 'Socials block', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'socials')
	) );
	acf_register_block( array (
		'name'            => 'block-form',
		'title'           => __( 'Form block', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'form')
	) );
	acf_register_block( array (
		'name'            => 'thank-you',
		'title'           => __( 'Thank you', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'Thank you')
	) );
	acf_register_block( array (
		'name'            => 'welcome-steps',
		'title'           => __( 'Welcome steps', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'welcome', 'steps', 'steps')
	) );
	acf_register_block( array (
		'name'            => 'hop-onboard',
		'title'           => __( 'Hop onboard', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'hop', 'onboard')
	) );
	acf_register_block( array (
		'name'            => 'cutting-edge-technology',
		'title'           => __( 'Cutting Edge Technology', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'cutting', 'edge', 'technology')
	) );
	acf_register_block( array (
		'name'            => 'insuring-boat',
		'title'           => __( 'Insuring every boat', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'insuring', 'boat')
	) );
	acf_register_block( array (
		'name'            => 'content-image-two-cta',
		'title'           => __( 'Image with content and two CTA', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'image', 'content', 'two', 'cta')
	) );
	acf_register_block( array (
		'name'            => 'small-text-content',
		'title'           => __( 'Small text content', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'small', 'text', 'content')
	) );
	acf_register_block( array (
		'name'            => 'side-image-animation-content-list',
		'title'           => __( 'Side image animation content list', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'small', 'text', 'content')
	) );
	acf_register_block( array (
		'name'            => 'check-cross-list',
		'title'           => __( 'Check/cross content list', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'saved',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'check', 'cross', 'content')
	) );
	acf_register_block( array (
		'name'            => 'content-with-text-list',
		'title'           => __( 'Content with text list', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'text', 'list', 'content')
	) );
	acf_register_block( array (
		'name'            => 'our-partners',
		'title'           => __( 'Our Partners', 'corppix_site' ),
		'render_callback' => 'wpahead_acf_block_render_callback',
		'category'        => 'layout',
		'icon'            => 'lightbulb',
		'post_types'      => array( 'page', 'post' ),
		'keywords'        => array( 'logo', 'partners')
	) );
    acf_register_block( array (
        'name'            => 'seo-step1',
        'title'           => __( 'SEO step 1: Main screen', 'corppix_site' ),
        'render_callback' => 'wpahead_acf_block_render_callback',
        'category'        => 'layout',
        'icon'            => 'edit-large',
        'post_types'      => array( 'page', 'post' ),
        'keywords'        => array( 'seo', 'hero')
    ) );
    acf_register_block( array (
        'name'            => 'seo-step2',
        'title'           => __( 'SEO step 2: Title + Image + Paragraph', 'corppix_site' ),
        'render_callback' => 'wpahead_acf_block_render_callback',
        'category'        => 'layout',
        'icon'            => 'edit-large',
        'post_types'      => array( 'page', 'post' ),
        'keywords'        => array( 'seo', 'cabin')
    ) );
    acf_register_block( array (
        'name'            => 'seo-step3',
        'title'           => __( 'SEO step 3: Title + 3  icons', 'corppix_site' ),
        'render_callback' => 'wpahead_acf_block_render_callback',
        'category'        => 'layout',
        'icon'            => 'edit-large',
        'post_types'      => array( 'page', 'post' ),
        'keywords'        => array( 'seo', 'benefits')
    ) );
    acf_register_block( array (
        'name'            => 'seo-step4',
        'title'           => __( 'SEO step 4: Multiple Content boxes with wave', 'corppix_site' ),
        'render_callback' => 'wpahead_acf_block_render_callback',
        'category'        => 'layout',
        'icon'            => 'edit-large',
        'post_types'      => array( 'page', 'post' ),
        'keywords'        => array( 'seo', 'cozy')
    ) );
    acf_register_block( array (
        'name'            => 'seo-step5',
        'title'           => __( 'SEO step 5: FAQ', 'corppix_site' ),
        'render_callback' => 'wpahead_acf_block_render_callback',
        'category'        => 'layout',
        'icon'            => 'edit-large',
        'post_types'      => array( 'page', 'post' ),
        'keywords'        => array( 'seo', 'faq')
    ) );
    acf_register_block( array (
        'name'            => 'seo-step6',
        'title'           => __( 'SEO step 6: Title + 4  icons + descriptions', 'corppix_site' ),
        'render_callback' => 'wpahead_acf_block_render_callback',
        'category'        => 'layout',
        'icon'            => 'edit-large',
        'post_types'      => array( 'page', 'post' ),
        'keywords'        => array( 'seo', 'step')
    ) );
    acf_register_block( array (
        'name'            => 'seo-step7',
        'title'           => __( 'SEO step 7: Title + Image + Paragraph + Button', 'corppix_site' ),
        'render_callback' => 'wpahead_acf_block_render_callback',
        'category'        => 'layout',
        'icon'            => 'edit-large',
        'post_types'      => array( 'page', 'post' ),
        'keywords'        => array( 'seo', 'cabin')
    ) );
    acf_register_block( array (
        'name'            => 'seo-step8',
        'title'           => __( 'SEO step 8: Multiple Content boxes with wave + Title', 'corppix_site' ),
        'render_callback' => 'wpahead_acf_block_render_callback',
        'category'        => 'layout',
        'icon'            => 'edit-large',
        'post_types'      => array( 'page', 'post' ),
        'keywords'        => array( 'seo', 'box')
    ) );
}

add_action( 'init', 'custom_gutenberg_block' );

function wpahead_acf_block_render_callback( $block )
{
	$name = str_replace( 'acf/', '', $block['name'] );

	if ( file_exists( get_theme_file_path( "/template-parts/block-{$name}.php" ) ) ) {
		include( get_theme_file_path( "/template-parts/block-{$name}.php" ) );
	}
}


