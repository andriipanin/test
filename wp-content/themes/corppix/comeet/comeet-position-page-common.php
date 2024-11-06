<?php
    if(isset($this->post_data)){
        $this->plugin_debug(['Template page: comeet-position-page-common.php', 'Data:', $this->post_data], __LINE__, __FILE__);
    }
    if(isset($post)){
        $this->plugin_debug(['Template page: comeet-position-page-common.php', 'Data:', $post], __LINE__, __FILE__);
    }
    global $global_options;
    // Getting block fields
    $image_url                = getFieldValue($global_options, 'careers_image');
    $image_url_mobile                = getFieldValue($global_options, 'careers_image_mobile');
    
    $banner_image_url = $image_url;
    $detect = new Mobile_Detect;
    // Any mobile device (phones or tablets).
    if ( $detect->isMobile() && !$detect->isTablet() && $image_url_mobile ) {
        $banner_image_url = $image_url_mobile;
    }
    ?>
<div class="top-banner careers-top-banner">
    <?php
    if ( $banner_image_url ) {
        echo '<img src="#" data-src="'.$banner_image_url.'" alt="top image" class="top-banner__image careers-top-banner__image lozad" />';
    }
    ?>
    <div class="container careers-top-banner__back-container">
        <?php
            $options = $this->get_options();
            $post = get_post($options['post_id']);
        ?>
        <a href="<?php echo site_url() . '/' . $post->post_name . '/' . $this->comeet_prefix . '/' . strtolower(comeet_string_clean($this->post_data['department'])) . '/all'; ?>" class="careers-top-banner__back"><svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.4555 18.901L1.92947 10.1545L10.4555 1.40799C10.6081 1.25172 10.6936 1.04194 10.6936 0.823491C10.6936 0.605043 10.6081 0.395262 10.4555 0.238991C10.3813 0.163325 10.2928 0.103213 10.1952 0.0621751C10.0975 0.0211376 9.99265 -3.07142e-08 9.88672 -3.53447e-08C9.78079 -3.99752e-08 9.67592 0.0211376 9.57826 0.0621751C9.4806 0.103213 9.39211 0.163325 9.31797 0.238991L0.24597 9.54374C0.086696 9.70714 -0.00244565 9.9263 -0.00244566 10.1545C-0.00244567 10.3827 0.086696 10.6018 0.24597 10.7652L9.31622 20.07C9.39041 20.1462 9.47912 20.2068 9.5771 20.2481C9.67509 20.2895 9.78036 20.3108 9.88672 20.3108C9.99307 20.3108 10.0984 20.2895 10.1963 20.2481C10.2943 20.2068 10.383 20.1462 10.4572 20.07C10.6099 19.9137 10.6953 19.7039 10.6953 19.4855C10.6953 19.267 10.6099 19.0573 10.4572 18.901L10.4555 18.901Z" fill="white"/>
        </svg></a>
    </div>
    <div class="container top-banner__container careers-top-banner__container">
        <div class="top-banner__content careers-top-banner__content wow animate__fadeInUp">
            <h2 class="careers-top-banner__title"><?php echo $this->post_data['department']; ?></h2>
        </div>
    </div>
</div>
<div class="comeet-single-position">
    <div class="container comeet-single-position__container">
        <?php
        if (empty($this->post_data) || (isset($this->post_data) && (isset($this->post_data['status'])) && ($this->post_data['status'] == 404))) {
            $careerurl = site_url() . (isset($post) ? '/' . $post->post_name : '');
            echo 'The position may have been closed or the link is incorrect. You will be redirected to the careers page, if nothing happens click <a href="' . $careerurl .'">here</a>.';
        } else {
            ?>
            <div id="<?php echo $this->post_data['uid']; ?>" class="comeet-single-position__wrapper">
                <h1 class="comeet-single-position__name"><?php echo $this->post_data['name']; ?></h1>
                <div class="comeet-single-position__location"><?php echo $this->post_data['location']['name']; ?></div>
                <div class="comeet-single-position__info">
                    <?php if (isset($this->post_data['details'])) : ?>
                        <?php foreach ($this->post_data['details'] as $details): ?>
                            <div class="comeet-single-position__info-item">
                            <?php if (isset($details['value']) && !empty($details['value']) && !empty(trim($details['value']))) : ?>
                                <?php $title = $this->get_position_title($details['name']); ?>
                                <?php $css = $this->get_position_css($details['name']); ?>
                                <?php $prop = $this->get_schema_prop($details['name']); ?>
                                <?php  
                                    if($details['name'] != 'Description'){
                                ?>
                                <h3 class="comeet-single-position__info-title"><?php echo $title; ?></h3>
                                <?php 
                                    }
                                ?>
                                <div class="comeet-position-<?php echo $css; ?> comeet-single-position__info-text">
                                    <?php echo $details['value'] ?>
                                </div>
                            <?php endif; ?>
                            </div>
                            
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
            <div class="comeet-apply comeet-single-position__form-container">
                <div class="comeet-single-position__form-wrapper">
                    <h3 class="comeet-single-position__form-title">Apply for this position</h3>
                    <script type="comeet-applyform" data-position-uid="<?php echo $this->post_data['uid'] ?>"></script>
                </div>
            </div>
            <?php
        }
        ?>
    </div>
</div>
