<?php
    get_template_part( 'template-parts/careers-top-banner');
    $page_content = get_field('careers_text');
    if(!empty($page_content)){
        echo '<div class="careers-content-section">';
            echo '<div class="container careers-content-section__container">';
                echo '<div class="careers-content-section__wrapper">';
                    echo do_shortcode( $page_content );
                echo '</div>';
            echo '</div>';
        echo '</div>';
    }
?>
<div class="comeet-departments-section">
    <div class="container comeet-departments-section__container">
    <?php
        if (isset($comeet_groups) && !empty($comeet_groups)) { 
    ?>
        <div class="comeet-departments-section__wrapper">
        <?php
            foreach ($comeet_groups as $category) { 
            ?>
                <a href="<?php echo rtrim($base,'/') . '/' . $this->comeet_prefix . '/' . strtolower(comeet_string_clean($category)) . '/all'; ?>" class="comeet-departments-section__department">
                    <span class="comeet-departments-section__name"><?php echo $category; ?></span>
                </a>
            <?php
            }
        ?>
        </div>
    <?php
        } else {
            echo "We don't have any open positions at this time. Please visit again soon.";
        }
    ?>
    </div>
</div>
