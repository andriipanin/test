<?php
/**
 * Block Name: Welcome steps
 *
 * @param array $block The block settings and attributes.
 * @param string $content The block inner HTML (empty).
 * @param bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */
$page_fields = get_fields();
global $global_options;
$app_links_repeater      = getFieldValue($global_options, 'app_links');
$additional_class         = ( isset($block['className']) ) ? $block['className'] : '';
$top_text           = getFieldValue($page_fields, 'top_text');
$app_store_link           = getFieldValue($page_fields, 'app_store_link');
$goggle_play_link           = getFieldValue($page_fields, 'goggle_play_link');
$welcome_steps           = getFieldValue($page_fields, 'welcome_steps');
?>
<section class="welcome-steps <?php echo $additional_class; ?>">
  <div class="bubble-top rellax" data-rellax-speed="-1"></div>
  <div class="container welcome-steps__container">
  <?php
    if ( $top_text ) {
      echo '<div class="welcome-steps__top-text wow animate__fadeInUp">';
        echo do_shortcode( wpautop($top_text) );
      echo '</div>';
    }
  ?>
  </div>
  <?php
    if($welcome_steps){
      echo '<div class="welcome-steps__wrapper">';
      $couter = 1;
      foreach($welcome_steps as $step){
        echo '<div class="welcome-steps__step">';
          echo '<div class="bubble-'.$couter.' rellax"></div>';
          echo '<div class="container welcome-steps__step-container">';
            echo '<div class="welcome-steps__step-text">';
              echo '<span class=" welcome-steps__step-count">'.$couter.'.</span>';
              echo do_shortcode( wpautop($step['text']) );
            echo '</div>';
            if($couter == 1 && !empty($app_links_repeater)){
              echo '<div class="welcome-steps__step-apps">';
              foreach($app_links_repeater as $app_item){
                echo '
                <a href="'.$app_item['link'].'"
                    target="_blank"
                    class="welcome-steps__step-apps-link">
                    <img src="'.get_template_directory_uri().'/build/img/'.$app_item['name'].'.svg" alt="'.$app_item['name'].' link" class="style-svg">
                </a>
                ';
              }
              echo '</div>';
            }
            if(!empty($step['content_with_image'])){
              echo '<div class="content-image-block container">';
              foreach($step['content_with_image'] as $item){
                $reversed_block_check = $item['is_it_reversed_block'] ? 'block-revert' : '';
                $side_image_url           = $item['side_image'];
                $side_image_url_mobile    = $item['side_image_mobile'];
                $image_desktop = '';
                if ($side_image_url_mobile) {
                  $image_desktop = 'content-image-block__image_desktop';
                }
                echo '<div class="content-image-block__sides-sections flex-block '.$reversed_block_check.'">';
                  echo '<figure class="content-image-block__side-image flex-block-image">';
                    if($side_image_url) {
                      echo '<img class="content-image-block__image '.$image_desktop.' lozad"  src="#" data-src="'.$side_image_url['url'].'" width="'.$side_image_url['width'].'" height="'.$side_image_url['height'].'" alt="'.$side_image_url['alt'].'" />';
                    }
                    if($side_image_url_mobile) {
                        echo '<img class="content-image-block__image content-image-block__image_mobile lozad"  src="#" data-src="'.$side_image_url_mobile['url'].'" width="'.$side_image_url_mobile['width'].'" height="'.$side_image_url_mobile['height'].'" alt="'.$side_image_url_mobile['alt'].'" />';
                    }
                  echo '</figure>';
                  if ( $item['main_content'] ) {
                    echo '<div class="content-image-block__main-content flex-block-content wow animate__fadeInUp">';
                      echo ( $item['main_content'] ) ? do_shortcode( wpautop($item['main_content']) ) : '';
                    echo '</div>';
                  }
                echo '</div>';
              }
              echo '</div>';
            }
          echo '</div>';
        echo '</div>';
        $couter++;
      }
      echo '</div>';
    }
  ?>
</section>