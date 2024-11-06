<?php
/**
 * Add Dropcap option but keep the defaults.
 */
add_filter( 'tiny_mce_before_init', 'my_wpeditor_formats_options' );
function my_wpeditor_formats_options( $settings )
{

	/* Default Style Formats */
	$default_style_formats = array(
		array(
			'title' => 'Headings',
			'items' => array(
				array(
					'title' => 'Heading 1',
					'format' => 'h1',
				),
				array(
					'title' => 'Heading 2',
					'format' => 'h2',
				),
				array(
					'title' => 'Heading 3',
					'format' => 'h3',
				),
				array(
					'title' => 'Heading 4',
					'format' => 'h4',
				),
				array(
					'title' => 'Heading 5',
					'format' => 'h5',
				),
				array(
					'title' => 'Heading 6',
					'format' => 'h6',
				),
			),
		),
		array(
			'title' => 'Inline',
			'items' => array(
				array(
					'title' => 'Bold',
					'format' => 'bold',
					'icon' => 'bold',
				),
				array(
					'title' => 'Italic',
					'format' => 'italic',
					'icon' => 'italic',
				),
				array(
					'title' => 'Underline',
					'format' => 'underline',
					'icon' => 'underline',
				),
				array(
					'title' => 'Strikethrough',
					'format' => 'strikethrough',
					'icon' => 'strikethrough',
				),
				array(
					'title' => 'Superscript',
					'format' => 'superscript',
					'icon' => 'superscript',
				),
				array(
					'title' => 'Subscript',
					'format' => 'subscript',
					'icon' => 'subscript',
				),
				array(
					'title' => 'Code',
					'format' => 'code',
					'icon' => 'code',
				),
			),
		),
		array(
			'title' => 'Blocks',
			'items' => array(
				array(
					'title' => 'Paragraph',
					'format' => 'p',
				),
				array(
					'title' => 'Blockquote',
					'format' => 'blockquote',
				),
				array(
					'title' => 'Div',
					'format' => 'div',
				),
				array(
					'title' => 'Pre',
					'format' => 'pre',
				),
			),
		),
		array(
			'title' => 'Alignment',
			'items' => array(
				array(
					'title' => 'Left',
					'format' => 'alignleft',
					'icon' => 'alignleft',
				),
				array(
					'title' => 'Center',
					'format' => 'aligncenter',
					'icon' => 'aligncenter',
				),
				array(
					'title' => 'Right',
					'format' => 'alignright',
					'icon' => 'alignright',
				),
				array(
					'title' => 'Justify',
					'format' => 'alignjustify',
					'icon' => 'alignjustify',
				),
			),
		),
	);

	/* Our Own Custom Options */
	$custom_style_formats = array(
		array(
			'title' => 'Special',
			'items' => array(
				array(
					'title' => 'Caption 1',
					'block' => 'p',
					'classes' => 'caption1',
					//'styles' => array('color' => '#fff')
				),
				array(
					'title' => 'Caption 2',
					'block' => 'p',
					'classes' => 'caption2',
					//'styles' => array('color' => '#fff')
				),
				array(
					'title' => 'Form Caption',
					'block' => 'p',
					'classes' => 'form-caption',
					//'styles' => array('color' => '#fff')
				),

				/*array(
					'title'   => 'Justify',
					'format'  => 'alignjustify',
					'icon'    => 'alignjustify',
				),*/
			),
		),
	);

	/* Merge It */
	$new_style_formats = array_merge( $default_style_formats, $custom_style_formats );

	/* Add it in tinymce config as json data */
	$settings['style_formats'] = json_encode( $new_style_formats );

	return $settings;
}