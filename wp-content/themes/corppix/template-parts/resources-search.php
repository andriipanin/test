<?php
  $page_for_posts = get_option( 'page_for_posts' );
  $categories = get_categories( array(
    'taxonomy' => 'category',
    'parent'  => 0,
    'hide_empty' => true,
    'exclude' => 1
  ));
  $curent = get_queried_object();
  $tax = ($curent->ID == $page_for_posts ? 'all' : $curent->term_id);
?>
<section class="resources-search-section">
  <div class="container resources-search-section__container">
    <div class="resources-search-section__categories-wrapper">
      <div class="resources-search-section__categories-list">
        <div class="resources-search-section__categories-list-selected">
          <?php echo ($curent->ID == $page_for_posts ? __('All', 'corppix_site') : $curent->name); ?>
        </div>
        <div class="resources-search-section__categories-list-wrapper">
          <input type="hidden" value="<?php echo $tax; ?>" data-tax="<?php echo $curent->taxonomy; ?>" name="resources-taxonomy" id="resources-taxonomy">
          <div class="resources-search-section__categories-list-item">
            <a href="<?php echo get_permalink($page_for_posts); ?>" class="resources-search-section__categories-list-link<?php echo ($curent->ID == $page_for_posts ? ' active' : ''); ?>"><span><?php _e('All', 'corppix_site'); ?></span></a>
          </div>
          <?php
            foreach($categories as $item){
              echo '
              <div class="resources-search-section__categories-list-item">
                <a href="' . get_category_link($item->term_id) . '" class="resources-search-section__categories-list-link'.($item->term_id == $curent->term_id ? ' active' : '').'"><span>' . $item->name . '</span></a>
              </div>
              ';
            }
          ?>
        </div>
      </div>
      <div class="resources-search-section__categories-search">
        <?php get_search_form(); ?>
      </div>
      <div class="resources-search-section__categories-sorting">
        <div class="resources-search-section__categories-sorting-wrapper">
          <div class="resources-search-section__categories-sorting-title"><?php _e('Sort by', 'corppix_site') ?></div>
          <div class="resources-search-section__categories-sorting-options">
            <div class="resources-search-section__categories-sorting-options-group">
              <label class="resources-search-section__categories-sorting-option">
                <input type="checkbox" class="resources-search-section__categories-sortby" value="1" name="sortby" />
                <span class="resources-search-section__categories-sort-name"><?php _e('A-Z', 'corppix_site') ?></span>
              </label>
              <label class="resources-search-section__categories-sorting-option">
                <input type="checkbox" class="resources-search-section__categories-sortby" value="2" name="sortby" />
                <span class="resources-search-section__categories-sort-name"><?php _e('Z-A', 'corppix_site') ?></span>
              </label>
              <label class="resources-search-section__categories-sorting-option">
                <input type="checkbox" class="resources-search-section__categories-sortby" value="3" name="sortby" />
                <span class="resources-search-section__categories-sort-name"><?php _e('Date', 'corppix_site') ?></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    
</section>