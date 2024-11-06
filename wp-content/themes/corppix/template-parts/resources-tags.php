<?php
  $page_for_posts = get_option( 'page_for_posts' );
  $curent = get_queried_object();
  if($curent->ID == $page_for_posts){
    $page_fields = get_fields($page_for_posts);
  }else{
    $page_fields = get_fields($curent);
  }
  $tags = getFieldValue($page_fields, 'tags');
?>
<?php
if($tags):
?>
<section class="resources-tags-section">
  <div class="container resources-tags-section__container">
    <div class="resources-tags-section__wrapper<?php if($tags && count($tags) >= 10){echo ' resources-tags-section__wrapper-limited';} ?>">
    <?php
    foreach($tags as $tag){
      echo '
      <label class="resources-tags-section__tag-label">
        <input type="checkbox" name="resources-tag[]" class="resources-tags-section__tag" value="'.$tag->term_id.'" />
        <span class="resources-tags-section__tag-name">'.$tag->name.'</span>
      </label>
      ';
    }
    ?>
    </div>
    <?php 
      if(!empty($tags) && count($tags) >= 10){
        echo '<button type="button" class="show-tags">'.__('See more','corppix_site').'</button>';
      } 
    ?>
  </div>
</section>
<?php
endif;
?>