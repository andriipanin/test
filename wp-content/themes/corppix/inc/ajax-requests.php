<?php
$corppix = new corppix();

/**
 * Search product by name and term in DB
 * @param $search_query
 * @param $term_id
 *
 * @return array|object|null
 */
function search_by_name_and_term($search_query, $term_id = null) {
	global $wpdb;
	
	if ( !$term_id && !$search_query) return array();
	
	$searchQuery = ( $search_query ) ? '%'.$search_query.'%': '';
	
	if ( $term_id ) {
		$request = "SELECT ID
                FROM $wpdb->posts
                LEFT JOIN $wpdb->term_relationships ON $wpdb->term_relationships.object_id = $wpdb->posts.ID
                WHERE $wpdb->posts.post_title LIKE '$searchQuery'
                AND $wpdb->term_relationships.term_taxonomy_id = '$term_id'
                ";
		
		return $wpdb->get_results($request);
	}
	
	$request = "SELECT ID
            FROM $wpdb->posts
            WHERE $wpdb->posts.post_title LIKE ('$searchQuery')
            AND $wpdb->posts.post_status = 'publish'
            AND $wpdb->posts.post_type IN ('product', 'product_variation')
            ";
	
	
	return $wpdb->get_results($request);
}


/**
 * Search user by phone in DB
 *
 * @param $phone
 * @return array|object|null
 */
function get_user_by_phone($phone) {
	global $wpdb;
	
	if ( !$phone) return null;
	
	$request = "SELECT user_email
                FROM $wpdb->users as users
                LEFT JOIN $wpdb->usermeta as usermeta ON usermeta.user_id = users.ID
                WHERE usermeta.meta_key='billing_phone' AND usermeta.meta_value=$phone";
	
	return $wpdb->get_results($request);
}


/**
 * Reset user password
 */
function reset_customer_password() {
	
	if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) { // check if it's ajax request (simple defence)
		
		global $global_options;
		
		//We shall SQL escape all inputs
		$user_email = filter_input(INPUT_POST, 'recovery-email', FILTER_SANITIZE_STRING);
		
		// get user meta data
		$userMeta = null;
		
		if ( filter_var($user_email, FILTER_VALIDATE_EMAIL) ) {
			$userMeta = get_user_by( 'email', $user_email );
		} else {
			$userMeta = get_user_by( 'login', $user_email );
		}
		
		if ( $userMeta ) {
			$userId = $userMeta->ID;
			$user      = get_userdata($userId );
			$userLogin = $user->user_login;
			$user_email = $user->user_email;
			$rand_key = md5( uniqid( rand(), true ) );
			set_transient( 'temp_key_'.$userId, $rand_key, 60*15 );
			
			// get user activation key
			$user_activation_hash = get_password_reset_key( $user );
			
			$msg = __( 'Привет!', 'personalize-login' ) . "\r\n\r\n";
			$msg .= sprintf( __( 'Вы попросили нас сбросить пароль для вашей учетной записи, используя адрес электронной почты %s.', 'personalize-login' ), $user_email ) . "\r\n\r\n";
			$msg .= __( "Если это была ошибка или вы не просили сбросить пароль, просто проигнорируйте это письмо, и ничего не произойдет.", 'personalize-login' ) . "\r\n\r\n";
			$msg .= __( 'Чтобы сбросить пароль, посетите следующий адрес:', 'personalize-login' ) . "\r\n\r\n";
			$msg .= site_url( "wp-login.php?action=rp&key=$user_activation_hash&login=" . rawurlencode( $userLogin ), 'login' ) . "\r\n\r\n";
			$msg .= 'Ваш проверочный код: '.$userId.'1der1'.$rand_key;
			$msg .= "\r\n\r\n";
			$msg .= __( 'Спасибо!', 'personalize-login' ) . "\r\n";
			$msg .= "-------------------\r\n";
			$msg .= site_url() . "\r\n\r\n";
			
			$headers = array( 'Content-Type: text; charset=UTF-8' );
			
			$subject = $global_options['translation_string_group']['new_password'];
			
			$response_text_success = pll__('Пожалуйста, проверьте свой электронный ящик');
			
			$response_text_error = pll__('Что-то пошло не так ... Повторите попытку позже.');
			
			if ( wp_mail( $user_email, $subject, $msg, $headers ) ) {
				wp_send_json_success( $response_text_success );
			} else {
				wp_send_json_success( $response_text_error );
			}
			
		} else {
			wp_send_json_success( pll__('Указанные данные не связаны ни с одним пользователем.') );
		}
	}
	
	die();
	
}
$corppix->ajax_front_to_backend( 'reset_customer_password', 'reset_customer_password', true );


/**
 * Set new user password
 */
function set_new_pass_logged_users() {
	
	if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) { // check if it's ajax request (simple defence)
		
		$password = filter_input(INPUT_POST, 'recovery-password', FILTER_SANITIZE_STRING);
		$password_repeat = filter_input(INPUT_POST, 'recovery-repeat-password', FILTER_SANITIZE_STRING);
		$verification_code = filter_input(INPUT_POST, 'verification-code', FILTER_SANITIZE_STRING);
		
		if(!$verification_code || $verification_code ==="" ) {
			
			wp_send_json_success( pll_('Введите проверочный код!') );
			
			die();
		}
		
		if(!$password_repeat || $password_repeat ==="" ) {
			wp_send_json_success( pll_('Введите подтверждение пароля!') );
			die();
		}
		
		if($password_repeat !== $password) {
			wp_send_json_success( pll_('Пароли не совпадают!') );
		}
		
		$user_check_data = explode('1der1', $verification_code);
		
		$userID = $user_check_data[0];
		
		$user_login = get_userdata( $userID )->user_login;
		
		$temp_key  = get_transient( 'temp_key_'.$userID);
		
		if ( $user_check_data[1] === $temp_key ) {
			
			wp_set_password( $password, $userID );
			
			$new_password = pll__('Ваш пароль был изменен!');
			
			$login_data = array();
			
			//We shall SQL escape all inputs
			$login_data['user_login']    = $user_login;
			$login_data['user_password'] = $password;
			
			// force login user
			$check = wp_signon( $login_data, false );
			
			if( $check ) {
				echo json_encode( array('success'=>true,
				                        'data'=> $new_password,
				                        'redirect_url' => get_home_url() ));
				die();
			}
			
			exit;
		}
	}
	
	die();
}
$corppix->ajax_front_to_backend( 'set_new_pass_logged_users', 'set_new_pass_logged_users', true );


/**
 * Add product to cart
 */
function add_to_cart(){
	if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) { // check if it's ajax request (simple defence)
		$product_id = filter_input( INPUT_POST, 'product_id', FILTER_SANITIZE_NUMBER_INT );
		$amount     = filter_input( INPUT_POST, 'amount', FILTER_SANITIZE_NUMBER_INT );
		
		if ( $product_id ) {
			WC()->cart->add_to_cart( $product_id, $amount);
			wp_send_json_success(
				array(
					'qty'   => WC()->cart->get_cart_contents_count(),
					'total' => WC()->cart->get_cart_subtotal(),
				)
			);
		}
	}
	die;
}
$corppix->ajax_front_to_backend( 'add_to_cart', 'add_to_cart' );


/**
 * Check and login user
 */
function check_and_login_user(){
	if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) { // check if it's ajax request (simple defence)
		$email_phone = filter_input( INPUT_POST, 'login-email-phone', FILTER_SANITIZE_STRING );
		$password    = filter_input( INPUT_POST, 'login-password', FILTER_SANITIZE_STRING );
		$value_type  = filter_input( INPUT_POST, 'type-of-entered', FILTER_SANITIZE_STRING );
		
		$login_data = array();
		
		//We shall SQL escape all inputs
		$login_data['user_login']    = ($value_type === 'email') ? $email_phone : '';
		$login_data['user_password'] = $password;
		
		if ( $value_type === 'phone' ) {
			$user_email = get_user_by_phone($email_phone);
			
			if ( $user_email ) {
				$login_data['user_login'] = $user_email[0]->user_email;
			}
		}
		
		if ( $login_data['user_login'] && $login_data['user_password'] ) {
			
			// force login user
			$user_verify = wp_signon( $login_data, false );
			
			if ( is_wp_error( $user_verify ) ) {
				wp_send_json_error( 'Invalid login details');
			}
			
			wp_send_json_success();
		}
		
		wp_send_json_error( 'Something goes wrong...');
	}
	die;
}
$corppix->ajax_front_to_backend( 'check_and_login_user', 'check_and_login_user' );


/**
 * Check and register user
 */

function check_and_register_user(){
	$mail = filter_input( INPUT_POST, 'register-email', FILTER_SANITIZE_STRING );
	
	if ( filter_var($mail, FILTER_VALIDATE_EMAIL) ) {
		$userMeta = get_user_by( 'email', $mail );
		
		if($userMeta) {
			wp_send_json_success( pll__('Пользователь с таким e-mail уже существует') );
		} else {
			
			$username = explode('@', $mail)[0];
			$rand_password = uniqid( rand(), true );
			$user_id = wp_create_user( $username, $rand_password, $mail );
			
			if ( !is_wp_error($user_id) ) {
				
				$headers = array( 'Content-Type: text; charset=UTF-8' );
				$subject = 'Регистрация';
				$msg = pll__( 'Привет!') . "\r\n\r\n";
				$msg .= pll__('Вы зарегистрировались на сайте ').' '. get_home_url() . "\r\n\r\n";
				$msg .= pll__('Ваш Login:').' '. $username. "\r\n\r\n";
				$msg .= pll__('Ваш Password: ').' '. $rand_password. "\r\n\r\n";
				$msg .= pll__('Спасибо что вы с нами!'). "\r\n\r\n";
				$msg .= "-------------------\r\n";
				$msg .= site_url() . "\r\n\r\n";
				
				if ( wp_mail( $mail, $subject, $msg, $headers ) ) {
					echo json_encode( array('success'=>true,
					                        'data'=> "",
					                        'new_user' => pll__('Письмо с логином и паролем для входа отправленно вам на почту.')));
				} else {
					wp_send_json_success( pll__('Что-то пошло не так ... Повторите попытку позже.') );
				}
			}
		}
		
	} else {
		wp_send_json_success( pll__('Введите корректный e-mail') );
	}
	
	die;
}
$corppix->ajax_front_to_backend( 'check_and_register_user', 'check_and_register_user' );


/**
 * Log out user
 */

function log_out_user(){
	wp_logout();
	
	wp_send_json_success('');
	
	die;
}
$corppix->ajax_front_to_backend( 'log_out_user', 'log_out_user' );

//post pagination----------------------------------------------------------------
add_action( 'wp_ajax_post_pagination', 'post_pagination' );
add_action( 'wp_ajax_nopriv_post_pagination', 'post_pagination' );
function post_pagination() {
  $page = sanitize_text_field($_POST['page']);
	if(empty($page)){ $page = 1;}
	$tags = $_POST['tags'];
	$order = sanitize_text_field($_POST['order']);
	$tax_id = sanitize_text_field($_POST['tax_id']);
	$tax = sanitize_text_field($_POST['tax']);
	$per_page = sanitize_text_field($_POST['per_page']);
  $cur_page = $page;
	$page -= 1;
	// Set the number of results to display

	$previous_btn = true;
	$next_btn = true;
	$first_btn = true;
	$last_btn = true;
	$start = $page * $per_page;
	$args = array(
		'post_type' => 'post',
		'post_status' => 'publish',
		'posts_per_page' => $per_page,
		'offset' => $start,
		'orderby' => 'post_date',
		'order' => 'DESC'
	);
	$args['tax_query'] = [];
	if(!empty($tags) && $tax != 'post_tag'){
		$args['tax_query']['relation'] = 'AND';
		$args['tax_query'][] = 	array(
			'taxonomy' => 'post_tag',
			'field'    => 'term_id',
			'terms'    => $tags,
		);
	}
	if($tax_id != 'all'){
		$args['tax_query'][] = array(
			'taxonomy' => $tax,
			'field'    => 'term_id',
			'terms'    => $tax_id,
		);
	} 

	if(!empty($order)){
		if($order == 1){
			$args['orderby'] = 'title';
			$args['order'] = 'ASC';
		}elseif($order == 2){
			$args['orderby'] = 'title';
			$args['order'] = 'DESC';
		}elseif($order == 3){
			$args['orderby'] = 'post_date';
			$args['order'] = 'ASC';
		}
	}
	$style = get_field('style', $tax.'_'.$tax_id);
	$wp_query = new WP_Query($args);
	$count = $wp_query->found_posts;
	if($wp_query->have_posts()){
		echo '<div class="resources-posts-section__wrapper '.($style == 2 ? 'resources-posts-section__wrapper-block' : 'resources-posts-section__wrapper-grid').'">';
		while($wp_query->have_posts()){
			$wp_query->the_post();
			if($style == 2){
				get_template_part( 'template-parts/post-card-full' );
			}else{
				get_template_part( 'template-parts/post-card' );
			}
		}
		echo '</div>';
		wp_reset_query();
		$no_of_paginations = ceil($count / $per_page);
		$aprev = '<svg width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M14.1055 27.1499L1.66039 14.7048L14.1055 2.25974" stroke="#744BDA" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
		';
		$anext = '<svg width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1.89453 27.1499L14.3396 14.7048L1.89453 2.25974" stroke="#744BDA" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
		';
		if ($cur_page >= 4) {
			$start_loop = $cur_page - 3;
			if ($no_of_paginations > $cur_page + 1)
					$end_loop = $cur_page + 1;
			else if ($cur_page <= $no_of_paginations && $cur_page > $no_of_paginations - 3) {
					$start_loop = $no_of_paginations - 3;
					$end_loop = $no_of_paginations;
			} else {
					$end_loop = $no_of_paginations;
			}
		} else {
			$start_loop = 1;
			if ($no_of_paginations > 4)
					$end_loop = 4;
			else
					$end_loop = $no_of_paginations;
		}
		$pag_container = "";
		$pag_container .= "<ul class='pagination post-pagination'>";
		if ($previous_btn && $cur_page > 1) {
				$pre = $cur_page - 1;
				$pag_container .= "<li data-page='$pre' class='active nav-button prev'>$aprev</li>";
		} else if ($previous_btn) {
				$pag_container .= "<li class='inactive nav-button prev'>$aprev</li>";
		}
		if($start_loop != 1){
			$pag_container .= "<li class='page inactive'>....</li>";
		}
		for ($i = $start_loop; $i <= $end_loop; $i++) {

				if ($cur_page == $i)
						$pag_container .= "<li data-page='$i' class = 'selected page' >{$i}</li>";
				else
						$pag_container .= "<li data-page='$i' class='active page'>{$i}</li>";
		}
		if($end_loop != $no_of_paginations){
			$pag_container .= "<li class='page inactive'>....</li>";
		}
		if ($next_btn && $cur_page < $no_of_paginations) {
				$nex = $cur_page + 1;
				$pag_container .= "<li data-page='$nex' class='active nav-button next'>$anext</li>";
		} else if ($next_btn) {
				$pag_container .= "<li class='inactive nav-button next'>$anext</li>";
		}

		$pag_container = $pag_container . "</ul>";

		// We echo the final output
		if($count > $per_page){
			echo '<div class = "pagination-container">' . $pag_container . '</div>';
		}
	}else{
		echo '<div class="not-found">' . __('Sorry, no posts were found', 'corppix_site') . '</div>';
	}
  die();
}