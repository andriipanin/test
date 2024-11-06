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
<div class="post-card-full">
  <div class="post-card-full__side">
    <?php
      echo '<div class="post-card-full__category">'. get_the_category( $post->ID )[0]->name .'</div>';
    ?>
    <h3 class="post-card-full__title">
      <a href="<?php echo $link; ?>" <?= $target ?> <?php echo $rel; ?>>
        <?php the_title(); ?>
      </a>
    </h3>
    <?php if(trim($author) != ''){ ?>
    <div class="post-card-full__author"><?php echo $author; ?></div>
    <?php } ?>
  </div>
  <div class="post-card-full__wrapper">
    <div class="post-card-full__excerpt-wrapper">
      <p class="post-card-full__excerpt"><?php echo get_the_excerpt($post->ID); ?></p>
    </div>
    <?php 
      $post_tags = get_the_tags($post->ID);
      if ( !empty($post_tags) ) {
        echo '<div class="post-card-full__tags">';
          foreach($post_tags as $tag){
            echo '<span class="post-card-full__tag">'.$tag->name.'</span>';
          }
        echo '</div>';
      }
    ?>
    <div class="post-card-full__read-wrapper">
      <a href="<?php echo $link; ?>" <?= $target ?> <?php echo $rel; ?> class="post-card-full__read">
        <?php _e('Read More', 'corppix_site'); ?>
      </a>
    </div>
    
  </div>
  
</div>