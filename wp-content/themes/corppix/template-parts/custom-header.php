<?php
global $global_options, $post;
$detect = new Mobile_Detect;
$post_id    = get_queried_object_id();
$image_url       = getFieldValue($global_options, 'header_logo');

$my_account_page = getFieldValue($global_options, 'my_account_page');
$header_get_a_quote_button = getFieldValue($global_options, 'header_get_a_quote_button');
$show_header_get_a_quote_button = is_front_page() || ($post && $post->post_name === 'quote');
$social_links_repeater   = getFieldValue($global_options, 'social_links');

$header_classes = [];

$header_dark_color = '';
$show_only_logo = false;
if (!is_search() && function_exists('get_fields') ) {
	$header_dark_color = ( get_field( 'header_dark_color', $post_id ) ) ?: '';
    $show_only_logo = ( get_field( 'show_only_logo', $post_id ) ) ?: '';
    $transparent_header = get_field('transparent_header', $post_id) || '';
}

if ( $header_dark_color || is_404() ) {
    $header_classes[] = 'header-dark-color';
}
if ( $show_only_logo ) {
    $header_classes[] = 'header-center-logo';
}
if ( $detect->isMobile() || (isset($transparent_header) && $transparent_header )) {
    $header_classes[] = 'js-site-header';
} elseif (!$detect->isMobile()) {
    $header_classes[] = 'site-header__sticky';
}

?>
<div class="mobile-menu" id="mobile-menu">
	<div class="mobile-menu__wrapper">
	<?php
			class AWP_Menu_Walker extends Walker_Nav_Menu {
				function start_el(&$output, $item, $depth=0, $args=[], $id=0) {
						$output .= "<li class='" . implode(" ", $item->classes) . "'>";
						if(in_array("current_page_item",$item->classes)){
							$tag1 = '<span class="like-link nav__link">';
							$tag2 = '</span>';
						}else{
							$tag1 = '<a href="' . $item->url . '">';
							$tag2 = '</a>';
						}
						$output .= $tag1;
							$output .= $item->title;
							if ($args->walker->has_children) {
									$output .= '<span class="arrow-down"></span>';
							}
						$output .= $tag2;
				}
		}
		wp_nav_menu( [
			'theme_location'  => 'primary',
			'menu'            => '',
			'container'       => 'nav',
			'container_class' => 'mobile-menu__nav',
			'container_id'    => '',
			'menu_class'      => 'mobile-menu__menu',
			'menu_id'         => 'mobile-header-menu',
			'echo'            => true,
			'fallback_cb'     => 'wp_page_menu',
			'before'          => '',
			'after'           => '',
			'link_before'     => '',
			'link_after'      => '',
			'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
			'depth'           => 0,
			'walker' => new AWP_Menu_Walker(),
		] );
		if ( $my_account_page ) {
		?>
			<a class="mobile-menu__account-link" href="<?php echo $my_account_page['url']; ?>" onclick="dataLayer.push({'event': 'login'});"><?php echo $my_account_page['title']; ?></a>
		<?php }
	?>
	</div>

	<div class="mobile-menu__footer">
		<?php
			if($header_get_a_quote_button){
		?>
			<a href="<?php echo $header_get_a_quote_button['url']; ?>" class="btn-primary-white mobile-menu__btn">
				<?php echo  $header_get_a_quote_button['title']; ?>
			</a>
		<?php
			}
			if ( ! empty( $social_links_repeater ) ) { ?>
				<div class="mobile-menu__social-links">
				<?php
					foreach ( $social_links_repeater as $item ) {
						$link  = $item['link'];
						$name  = $item['name'];
						?>
						<a href="<?php echo $link; ?>"
							target="_blank"
							class="mobile-menu__social-link social-link social-link__<?php echo strtolower($name); ?>">
						</a>
						<?php
					}
				?>
				</div>
		<?php } ?>
	</div>
</div>
<header id="site-header" class="site-header <?php echo join(' ', $header_classes); ?> ">
	<div class="container site-header__container">
		<a href="<?php echo get_site_url(); ?>" class="site-header__logo">
			<img class="style-svg site-header__logo-img" src="<?php echo $image_url; ?>" alt="site logo" />
		</a>

		<?php
		if ( !$show_only_logo ){
		wp_nav_menu( [
			'theme_location'  => 'primary',
			'menu'            => '',
			'container'       => 'nav',
			'container_class' => 'site-header__nav',
			'container_id'    => '',
			'menu_class'      => 'site-header__menu',
			'menu_id'         => '',
			'echo'            => true,
			'fallback_cb'     => 'wp_page_menu',
			'before'          => '',
			'after'           => '',
			'link_before'     => '',
			'link_after'      => '',
			'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
			'depth'           => 0,
			'walker'          => '',
		] );
		?>
		<div class="site-header__right-section">
			<?php
				if($header_get_a_quote_button){
			?>
			<a href="<?php echo $header_get_a_quote_button['url']; ?>" class="btn-primary site-header__btn<?php echo ( $show_header_get_a_quote_button ? ' hide' : ''); ?>" id="site-header__btn">
				<?php echo  $header_get_a_quote_button['title']; ?>
			</a>
			<?php
				}
				if ( $my_account_page ) {
				?>
					<a class="site-header__account-link" href="<?php echo $my_account_page['url']; ?>" onclick="dataLayer.push({'event': 'login'});"><?php echo $my_account_page['title']; ?></a>
				<?php }
			?>
			<button type="button" class="site-header__mobile-menu-btn" data-role="mobile-menu" id="mobile-menu-btn">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
		<?php } ?>
	</div>
</header>