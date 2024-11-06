<?php
  global $post;
  $author = get_field('author', $post->ID);
  $press_release = get_field('press_release', $post->ID);
  $link = get_permalink($post->ID);
  $rel = '';
  $target = '';
  $external_link = get_field('external_link', $post->ID);
  if($press_release == true && !empty($external_link)){
    $link = $external_link;
    $rel = 'rel="nofollow"';
    $target = 'target="_blank"';
  }

?>
<div class="post-card">
  <a href="<?php echo $link; ?>" <?php echo $rel; ?> class="post-card__image-wrapper">
  <?php
    $thumb   = get_post_thumbnail_id();
    echo wp_get_attachment_image( $thumb, 'post-resources', "" );
    echo '<span class="post-card__category">'. get_the_category( $post->ID )[0]->name .'</span>';
  ?>
  </a>
  <div class="post-card__wrapper">
    <?php 
    $post_tags = get_the_tags($post->ID);
    if ( !empty($post_tags) ) {
        echo '<div class="post-card__tags">';
        foreach($post_tags as $tag){
          $tags[] = $tag->name;
        }
        echo implode(', ', $tags);
        echo '</div>';
    }
    ?>
    <h3 class="post-card__title">
      <a href="<?php echo $link; ?>" <?= $target ?> <?php echo $rel; ?>>
        <?php the_title(); ?>
      </a>
    </h3>
    <?php if(trim($author) != ''){ ?>
    <div class="post-card__author"><?php echo $author; ?></div>
    <?php } ?>
    <div class="post-card__excerpt-wrapper">
      <p class="post-card__excerpt"><?php echo get_the_excerpt($post->ID); ?></p>
    </div>
    <a href="<?php echo $link; ?>" <?= $target ?> <?php echo $rel; ?> class="post-card__read">
    <?php _e('Read more', 'corppix_site'); ?>
    </a>
  </div>
  
</div>