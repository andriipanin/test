<?php
/*
 *  Taxonomy category links list shortcode
 */

if ( !function_exists( 'shortcode_taxonomy_links_list' ) ) {


	function shortcode_taxonomy_links_list( $atts, $content = null )
	{

		extract( shortcode_atts( array(
			'post_type' => '',
			'taxonomy' => '',
			'hide_empty' => '',
		), $atts ) );

		$args = array(
			'title_li' => '',
			'taxonomy' => $taxonomy,
			'hide_empty' => false,
		);

		$output = '<div class="taxonomy-links-list">';
		ob_start();
		
		custom_wp_list_categories( $args );
		$output .= ob_get_clean();

		$output .= '</div>';

		return $output;

	}

	add_shortcode( 'taxonomy_links_list', 'shortcode_taxonomy_links_list' );

}


/********************************/


/*
 *  CONTAINER SHORTCODE
 */

if ( !function_exists( 'container_shortcode' ) ) {

	function container_shortcode( $atts, $content = null )
	{

		extract( shortcode_atts(
			array(
				'class' => ''
			), $atts ) );

		$class_arr = explode( ' ', $class );

		$initial_class = ( in_array( 'fluid', $class_arr ) ) ? 'container-fluid' : 'container';
		$output = '<div class="' . $initial_class . ' ' . $class . '">' . do_shortcode( $content ) . '</div>';

		return $output;
	}

	add_shortcode( 'container', 'container_shortcode' );

}



/********************************/


/*
 *  H1 SHORTCODE
 */

if ( !function_exists( 'h1_shortcode' ) ) {

	function h1_shortcode( $atts, $content = null )
	{

		extract( shortcode_atts(
			array(
				'class' => ''
			), $atts ) );
		$output = '<h1 class="' . $class . '">' . do_shortcode( $content ) . '</h1>';

		return $output;
	}

	add_shortcode( 'h1', 'h1_shortcode' );

}


/***************************************************/

/*
 *  COLUMN SHORTCODE
 */

if ( !function_exists( 'bs_column_column_shortcode' ) ) {

	function bs_column_column_shortcode( $atts, $content = null )
	{

		extract( shortcode_atts(
			array(
				'class' => ''
			), $atts ) );

		$output = '<div class="' . $class . '">' . do_shortcode( $content ) . '</div>';
		return $output;
	}

	add_shortcode( 'bs_column', 'bs_column_column_shortcode' );

}

/***************************************************/

/*
 *  COLUMN  inner SHORTCODE
 */

if ( !function_exists( 'column_inner_shortcode' ) ) {

	function column_inner_shortcode( $atts, $content = null )
	{

		extract( shortcode_atts(
			array(
				'class' => ''
			), $atts ) );

		$output = '<div class="' . $class . '">' . do_shortcode( $content ) . '</div>';
		return $output;
	}

	add_shortcode( 'bs_column_inner', 'column_inner_shortcode' );

}

/***************************************************/

/*
 *  ROW SHORTCODE
 */
if ( !function_exists( 'row_shortcode' ) ) {

	function row_shortcode( $atts, $content = null )
	{
		extract( shortcode_atts(
			array(
				'class' => ''
			), $atts ) );

		$output = '<div class="row ' . $class . '">' . do_shortcode( $content ) . '</div>';

		return $output;
	}

	add_shortcode( 'row', 'row_shortcode' );

}

/***************************************************/

/*
 *  ROW inner SHORTCODE
 */
if ( !function_exists( 'row_inner_shortcode' ) ) {

	function row_inner_shortcode( $atts, $content = null )
	{
		extract( shortcode_atts(
			array(
				'class' => ''
			), $atts ) );

		$output = '<div class="row ' . $class . '">' . do_shortcode( $content ) . '</div>';

		return $output;
	}

	add_shortcode( 'row_inner', 'row_inner_shortcode' );

}

/***************************************************/

/*
 *  BR SHORTCODE
 */
if ( !function_exists( 'br_shortcode' ) ) {

	function br_shortcode( $atts, $content = null )
	{
		extract( shortcode_atts(
			array(
				'class' => ''
			), $atts ) );

		$output = '<br class="custom-br ' . $class . '">';

		return $output;
	}

	add_shortcode( 'br', 'br_shortcode' );

}

/***************************************************/

/*
 *  hr SHORTCODE
 */
if ( !function_exists( 'hr_shortcode' ) ) {

	function hr_shortcode( $atts, $content = null )
	{
		return '<hr>';
	}

	add_shortcode( 'hr', 'hr_shortcode' );

}

/***************************************************/

/*
 *  Strong SHORTCODE
 */
if ( !function_exists( 'strong_shortcode' ) ) {

	function strong_shortcode( $atts, $content = null )
	{
		return '<strong>'.do_shortcode($content).'</strong>';
	}

	add_shortcode( 'b', 'strong_shortcode' );

}

/***************************************************/

/*
 *  SPACER SHORTCODE
 */

if ( !function_exists( 'spacer_big_shortcode' ) ) {

	function spacer_big_shortcode( $atts )
	{
		$output = '<div class="spacer_big"></div>';
		return $output;
	}

	add_shortcode( 'spacer_big', 'spacer_big_shortcode' );

}

/***************************************************/

/*
 *  SPACER SMALL SHORTCODE
 */

if ( !function_exists( 'spacer_small_shortcode' ) ) {

	function spacer_small_shortcode( $atts )
	{
		$output = '<div class="spacer_small"></div>';
		return $output;
	}

	add_shortcode( 'spacer_small', 'spacer_small_shortcode' );

}

/***************************************************/

/*
 *  SPACER SUPER SMALL SHORTCODE
 */

if ( !function_exists( 'spacer_super_small_shortcode' ) ) {

	function spacer_super_small_shortcode( $atts )
	{
		$output = '<div class="spacer_super_small"></div>';
		return $output;
	}

	add_shortcode( 'spacer_super_small', 'spacer_super_small_shortcode' );

}
/***************************************************/

/*
 *  SPACER big SHORTCODE
 */

if ( !function_exists( 'spacer_big_shortcode' ) ) {

	function spacer_big_shortcode( $atts )
	{
		$output = '<div class="spacer_big"></div>';
		return $output;
	}

	add_shortcode( 'spacer_big', 'spacer_big_shortcode' );

}

/***************************************************/

/*
 *  JUST LINK SHORTCODE
 */

if ( !function_exists( 'link_wrapper_shortcode' ) ) {

	function link_wrapper_shortcode( $atts, $content = null )
	{

		extract( shortcode_atts(
			array(
				'class' => '',
			), $atts ) );

		return '<span class="link-wrapper">' . $content . '</span>';
	}

	add_shortcode( 'link', 'link_wrapper_shortcode' );
}


/***************************************************/

/*
 *  logo_link SHORTCODE
 */

if ( !function_exists( 'logo_link_shortcode' ) ) {

	function logo_link_shortcode( $atts, $content = null )
	{
		extract( shortcode_atts(
			array(
				'class' => '',
			), $atts ) );


		if ( is_front_page() ) {
			$output = '<div class="' . $class . ' logo-link">' . $content . '</div>';
		} else {
			$output = '<a class="' . $class . ' logo-link" href="' . get_site_url() . '">' . $content . '</a>';
		}

		return $output;
	}

	add_shortcode( 'logo_link', 'logo_link_shortcode' );
}

/***************************************************/

/*
 *  INFO BOX SHORTCODE
 */

if ( !function_exists( 'info_box_shortcode' ) ) {

	function info_box_shortcode( $atts, $content = null )
	{

		extract( shortcode_atts(
			array(
				'class' => '',
				'id' => ''
			), $atts ) );

		$id_attr = $id ? 'id="' . $id . '"' : '';
		$output = '<div ' . $id_attr . ' class="info_box ' . $class . '">' . do_shortcode( $content ) . '</div>';

		return $output;
	}

	add_shortcode( 'info_box', 'info_box_shortcode' );

}

/***************************************************/

/*
 *  INFO INNER BOX SHORTCODE
 */

if ( !function_exists( 'info_box_inner_shortcode' ) ) {

	function info_box_inner_shortcode( $atts, $content = null )
	{

		extract( shortcode_atts(
			array(
				'class' => '',
				'id' => ''
			), $atts ) );

		$id_attr = $id ? 'id="' . $id . '"' : '';
		$output = '<div ' . $id_attr . ' class="info_box_inner ' . $class . '">' . do_shortcode( $content ) . '</div>';

		return $output;
	}

	add_shortcode( 'info_box_inner', 'info_box_inner_shortcode' );

}

/***************************************************/

/*
 *  JUST WRAPPER SHORTCODE
 */

if ( !function_exists( 'just_wrapper_shortcode' ) ) {

	function just_wrapper_shortcode( $atts, $content = null )
	{

		extract( shortcode_atts(
			array(
				'class' => '',
				'id' => ''
			), $atts ) );

		$id_attr = $id ? 'id="' . $id . '"' : '';
		$output = '<div ' . $id_attr . ' class="just_wrapper ' . $class . '">' . do_shortcode( $content ) . '</div>';

		return $output;
	}

	add_shortcode( 'just_wrapper', 'just_wrapper_shortcode' );

}

/***************************************************/

/*
 *  JUST WRAPPER INNER SHORTCODE
 */

if ( !function_exists( 'just_wrapper_inner_shortcode' ) ) {

	function just_wrapper_inner_shortcode( $atts, $content = null )
	{

		extract( shortcode_atts(
			array(
				'class' => '',
				'id' => ''
			), $atts ) );

		$id_attr = $id ? 'id="' . $id . '"' : '';
		$output = '<div ' . $id_attr . ' class="just_wrapper_inner ' . $class . '">' . do_shortcode( $content ) . '</div>';

		return $output;
	}

	add_shortcode( 'just_wrapper_inner', 'just_wrapper_inner_shortcode' );

}

/***************************************************/


/*
 *  CURRENT YEAR SHORTCODE
 */

if ( !function_exists( 'current_year_shortcode' ) ) {

	function current_year_shortcode()
	{

		$output = '<span>' . date( "Y" ) . '</span>';
		return $output;
	}

	add_shortcode( 'current_year', 'current_year_shortcode' );

}


/*
 *  CUSTOM MENU SHORTCODE
 */


if ( !function_exists( 'custom_menu_shortcode' ) ) {

	function custom_menu_shortcode( $atts, $content = null )
	{

		extract( shortcode_atts(
			array(
				'menu_name' => '',
				'container_class' => '',
				'class' => '',
				'walker' => '',
				'theme_location' => '',
			), $atts ) );

		ob_start();

		$args = array(
			'container' => 'nav',
			'container_class' => $container_class,
			'menu_class' => $class . ' custom_menu clearfix',
			'menu_id' => '',
			'depth' => 0,
			'menu' => $menu_name,
		);

		if ( $theme_location ) {
			$args['theme_location'] = $theme_location;
		}

		if ( $walker === 'true' ) {
			$args['walker'] = new Custom_sublevel_menu();
		}

		wp_nav_menu( $args );

		$output = ob_get_clean();

		return $output;
	}

	add_shortcode( 'custom_menu', 'custom_menu_shortcode' );

}


/******************************/


/*
 *  CUSTOM widget SHORTCODE
 */


if ( !function_exists( 'custom_widget_display_shortcode' ) ) {

	function custom_widget_display_shortcode( $atts, $content = null )
	{

		extract( shortcode_atts(
			array(
				'widget_name' => ''
			), $atts ) );

		ob_start();

		dynamic_sidebar( $widget_name );

		$output = ob_get_clean();

		return $output;
	}

	add_shortcode( 'custom_widget', 'custom_widget_display_shortcode' );

}


/*
 *  ONLY FOR MOBILE SHORTCODE
 */

if ( !function_exists( 'only_for_mobile_shortcode' ) ) {

	function only_for_mobile_shortcode( $atts, $content = null )
	{

		$detect2 = new Mobile_Detect;
		if ( $detect2->isMobile() ) {
			$output = '<section class="only_for_mobile">' . do_shortcode( $content ) . '</section>';
		} else $output = '';

		return $output;
	}

	add_shortcode( 'only_for_mobile', 'only_for_mobile_shortcode' );

}


/*
 *  ONLY FOR DESKTOP SHORTCODE
 */

if ( !function_exists( 'only_for_desktop_shortcode' ) ) {

	function only_for_desktop_shortcode( $atts, $content = null )
	{

		$detect2 = new Mobile_Detect;
		if ( !$detect2->isMobile() ) {
			$output = '<section class="only_for_desktop">' . do_shortcode( $content ) . '</section>';
		} else $output = '';

		return $output;
	}

	add_shortcode( 'only_for_desktop', 'only_for_desktop_shortcode' );

}


/*
 *  admin_notes SHORTCODE - you should use this shortcode if you want add big comment in admin editor, but you don't
 *  want to display this info in front area
 */

if ( !function_exists( 'admin_notes_shortcode' ) ) {

	function admin_notes_shortcode( $atts, $content = null )
	{
		return '';
	}

	add_shortcode( 'admin_notes', 'admin_notes_shortcode' );

}


/**************************/


/*
 *  SEARCH FORM SHORTCODE
 */

if ( !function_exists( 'search_form_shortcode' ) ) {

	function search_form_shortcode( $atts, $content = null )
	{

		extract( shortcode_atts(
			array(
				'class' => '',
				'btn_title' => 'найти',
				'placeholder_text' => 'Найти:'

			), $atts ) );

		$output = ' <form role="search" method="get" id="searchform" class="' . $class . '" action="' . home_url( '' ) . '" >
						<label class="screen-reader-text" for="s">Найти: </label>
						<input type="text" value="' . get_search_query() . '" name="s" id="s" placeholder="' . $placeholder_text . '"/>
						<button type="submit" id="searchsubmit">' . $btn_title . '</button>
					</form>';
		return $output;
	}

	add_shortcode( 'search_form', 'search_form_shortcode' );

}


/***************************************************/


/*
 * Content for logged user shortcode
 */

if ( !function_exists( 'logged_user_shortcode' ) ) {

	function logged_user_shortcode( $atts, $content = null )
	{

		if ( is_user_logged_in() ) {
			return do_shortcode( $content );
		}

		return '';
	}

	add_shortcode( 'logged_user', 'logged_user_shortcode' );
}

/********************************/

/*
 *  Popup box shortcode
 */

if ( !function_exists( 'shortcode__boxpopup' ) ) {
	function shortcode_popup_box( $atts, $content = null )
	{
		extract( shortcode_atts( array(
			'box_id' => '',
			'box_caption' => '',
		), $atts ) );


		$output = '<div id="' . $box_id . '" class="popup">';
		$output .= '<div class="my_overlay js-popup-close"></div>';

		$output .= '<div class="popup-wrapper-inner">';
		
		$output .= '<div class="in text-center js-popup-inner">';

		if ( !empty( $box_caption ) ) {
			$output .= '<p class="box-caption">' . $box_caption . '</p>';
		}

		$output .= do_shortcode( $content );
		$output .= '</div>';
		$output .= '<button
                        data-role="login-close"
                        class="popup-close js-popup-close js-open-popup-activator">
                        close popup
                    </button>';
		$output .= '</div>';
		$output .= '</div>';

		return $output;

	}

	add_shortcode( 'popup_box', 'shortcode_popup_box' );

}
/***************************************************/
/*
 *  CALL US
 */

if ( !function_exists( 'call_us_shortcode' ) ) {

	function call_us_shortcode( $atts, $content = null )
	{

		extract( shortcode_atts(
			array(
				'class' => '',
			), $atts ) );

		return '<span class="call-us">' . $content . '</span>';
	}

	add_shortcode( 'call_us', 'call_us_shortcode' );
}

/***************************************************/

/*
 *  RETURN STATE NAME SHORTCODE
 */
if ( !function_exists( 'return_state_name' ) ) {

	function return_state_name( $atts, $content = null )
	{
		global $global_options;
		$output = '';
		$states_list = getFieldValue($global_options, 'states_list');
		if(isset($_GET['state']) && $_GET['state'] != '' && !empty($states_list)){
			$key = array_search($_GET['state'], array_column($states_list, 'state_abbreviation'));
			if($key !== false){
				$output = $states_list[$key]['state_name'];
			}
		}

		return $output;
	}

	add_shortcode( 'state_name', 'return_state_name' );

}

/***************************************************/

/*
 *  RETURN STATE INSURANCE MESSAGE SHORTCODE
 */
if ( !function_exists( 'return_state_insurance_message' ) ) {

	function return_state_insurance_message( $atts, $content = null )
	{
		global $global_options;
		$output = '';
		$states_list = getFieldValue($global_options, 'states_list');
		$selling_insurance = getFieldValue($global_options, 'selling_insurance');
		$rates_are_programmed = getFieldValue($global_options, 'rates_are_programmed');
		$not_selling_insurance = getFieldValue($global_options, 'not_selling_insurance');
		if(isset($_GET['state']) && $_GET['state'] != '' && !empty($states_list)){
			$key = array_search($_GET['state'], array_column($states_list, 'state_abbreviation'));
			if($key !== false){
				$selling_insurance_val = $states_list[$key]['selling_insurance'];
				if($selling_insurance_val == 1){
					$output = $selling_insurance;
				}elseif($selling_insurance_val == 2){
					$output = $rates_are_programmed;
				}elseif($selling_insurance_val == 3){
					$output = $not_selling_insurance;
				}
			}
		}

		return $output;
	}

	add_shortcode( 'state_insurance_message', 'return_state_insurance_message' );

}

/***************************************************/