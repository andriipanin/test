<?php 
  global $post;
  $post_tags = get_the_tags($post->ID);
  if ( !empty($post_tags) ) {
    echo '<div class="post-single__tags">';
      echo '<h3 class="post-single__tags-title">'.__('Tags', 'corppix_site').'</h3>';
      echo '<div class="post-single__tags-wrapper">';
      foreach($post_tags as $tag){
        echo '<a class="post-single__tags-tag" href="'.get_tag_link($tag->term_id).'">'.$tag->name.'</a>';
      }
      echo '</div>';
    echo '</div>';
  }
?>