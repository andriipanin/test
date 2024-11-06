<?php
global $post;
$cat = get_the_category( $post->ID );
$args1 = array(
  'post_type' => 'post',
  'post_status' => 'publish',
  'posts_per_page' => 2,
  'orderby' => 'rand',
  'order' => 'DESC',
  'post__not_in' => array ($post->ID),
  'cat' => $cat[0]->term_id,
);
$acf_related = get_field('related_media', $post->ID);
if(!empty($acf_related)){
  $count = count($acf_related);
  $args2 = array(
    'post_type' => 'post',
    'post_status'    => 'publish',
    'post__in' => $acf_related,
    'orderby' => 'post__in', 
  );
  if($count < 2){
    $args1['posts_per_page'] = 2 - $count;
    $args2['posts_per_page'] = 2 - $count;
    $loop1 = new WP_Query( $args2 );
    $loop2  = new WP_Query( $args1 );
    $wp_query = new WP_Query();
    $wp_query->posts = array_merge( $loop1->posts, $loop2->posts );
    $wp_query->post_count = $loop1->post_count + $loop2->post_count;
  }else{
    $args2['posts_per_page'] = 2;
    $wp_query  = new WP_Query( $args2 );
  }
}else{
  $wp_query  = new WP_Query( $args1 );
}
if($wp_query->have_posts()){
?>
<div class="related-media">
  <h3 class="related-media__title"><?php _e('Related media', 'corppix_site') ?></h3>
  <div class="related-media__wrapper">
  <?php
    while($wp_query->have_posts()){
      $wp_query->the_post();
      get_template_part( 'template-parts/post-card' );
    }
    wp_reset_query();
  ?>
  </div>
</div>
<?php } ?>