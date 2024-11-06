<?php
  $page_for_posts = get_option( 'page_for_posts' );
  $categories = get_categories( array(
    'taxonomy' => 'category',
    'parent'  => 0,
    'hide_empty' => true,
    'exclude' => 1
  ));
?>
<section class="resources-search-section">
  <div class="resources-search-section-anchor"></div>
  <div class="container resources-search-section__container">
    <div class="resources-search-section__categories-wrapper">
      <div class="resources-search-section__categories-list">
        <div class="resources-search-section__categories-list-selected">
          <?php _e('All', 'corppix_site'); ?>
        </div>
        <div class="resources-search-section__categories-list-wrapper">
          <div class="resources-search-section__categories-list-item">
            <a href="<?php echo get_permalink($page_for_posts); ?>" class="resources-search-section__categories-list-link active"><span><?php _e('All', 'corppix_site') ?></span></a>
          </div>
          <?php
            foreach($categories as $item){
              echo '
              <div class="resources-search-section__categories-list-item">
                <a href="' . get_category_link($item->term_id) . '" class="resources-search-section__categories-list-link"><span>' . $item->name . '</span></a>
              </div>
              ';
            }
          ?>
        </div>
      </div>
      <div class="resources-search-section__categories-search">
        <div id="algolia-search-box"></div>
      </div>
      <div class="resources-search-section__categories-sorting">
        <section class="ais-facets" id="sort-by"></section>
        <div class="resources-search-section__categories-sorting-wrapper">
          <div class="resources-search-section__categories-sorting-title"><?php _e('Sort by', 'corppix_site') ?></div>
          <div class="resources-search-section__categories-sorting-options">
            <div class="resources-search-section__categories-sorting-options-group">
              <label class="resources-search-section__categories-sorting-option">
                <input type="checkbox" class="algolia-search-section__categories-sortby" value="wp_posts_post_az" name="sortby" />
                <span class="resources-search-section__categories-sort-name"><?php _e('A-Z', 'corppix_site') ?></span>
              </label>
              <label class="resources-search-section__categories-sorting-option">
                <input type="checkbox" class="algolia-search-section__categories-sortby" value="wp_posts_post_za" name="sortby" />
                <span class="resources-search-section__categories-sort-name"><?php _e('Z-A', 'corppix_site') ?></span>
              </label>
              <label class="resources-search-section__categories-sorting-option">
                <input type="checkbox" class="algolia-search-section__categories-sortby" value="wp_posts_post_sortByDate" name="sortby" />
                <span class="resources-search-section__categories-sort-name"><?php _e('Date', 'corppix_site') ?></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    
</section>