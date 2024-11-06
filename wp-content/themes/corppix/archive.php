<?php 
get_header(); 
do_action( 'corppix_before_page_content' );
get_template_part( 'template-parts/resources-top-banner');
get_template_part( 'template-parts/resources-search');
get_template_part( 'template-parts/resources-tags');
$per_page = 9;
$detect = new Mobile_Detect;
if ( $detect->isMobile() && !$detect->isTablet() ) {
	$per_page = 4;
}
$page = 1;
$cur_page = $page;
$page -= 1; 
// Set the number of results to display
$previous_btn = true;
$next_btn = true;
$first_btn = true;
$last_btn = true;
$start = $page * $per_page;
$curent = get_queried_object();
$args = array(
	'post_type' => 'post',
	'post_status' => 'publish',
	'posts_per_page' => $per_page,
	'offset' => $start,
	'orderby' => 'post_date',
	'order' => 'DESC',
	'tax_query' => array(
		array(
				'taxonomy' => $curent->taxonomy,
				'field'    => 'term_id',
				'terms'    => $curent->term_id,
		),
	),
);
$page_fields = get_fields($curent);
$style = getFieldValue($page_fields, 'style');
$wp_query = new WP_Query( $args );
$count = $wp_query->found_posts;
echo '<div class="resources-posts-section">';
	echo '<input type="hidden" value="'.$per_page.'" id="per_page">';
	echo '<div class="container resources-posts-section__container">';
		if($wp_query->have_posts()){
			echo '<div class="loader">
				<img src="'.get_template_directory_uri().'/build/img/loader.svg" width="129" height="46"; alt="Loader" class="icon-loader" />
			</div>';
			echo '<div class="resources-posts-section__ajax">';
				echo '<div class="resources-posts-section__wrapper '.($style == 1 ? 'resources-posts-section__wrapper-grid' : 'resources-posts-section__wrapper-block').'">';
				while($wp_query->have_posts()){
					$wp_query->the_post();
					if($style == 1){
						get_template_part( 'template-parts/post-card' );
					}else{
						get_template_part( 'template-parts/post-card-full' );
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
			echo '</div>';
		}else{
			echo '<div class="not-found">' . apply_filters('no_posts_found_message', __('Sorry, no posts were found', 'corppix_site')) . '</div>';
		}
		
	echo '</div>';
echo '</div>';
get_template_part( 'template-parts/section-form');
get_template_part( 'template-parts/section-our-offices');
do_action( 'corppix_after_page_content' );
?>


<?php get_footer(); ?>