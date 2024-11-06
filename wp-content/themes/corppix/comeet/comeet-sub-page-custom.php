<?php
$comeet_count_result = count(comeet_search($data, $sub_group, $comeet_cat));
$this->plugin_debug(['Template page: comeet-sub-page-custom.php', 'Data:', 'Comeetgroups:', $comeet_groups, 'Comeet sub group is:', $sub_group, 'Comeet cat is:', $comeet_cat, 'comeet search result count:', $comeet_count_result], __LINE__, __FILE__);

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
        <a href="<?php echo site_url() . '/' . $post->post_name; ?>" class="careers-top-banner__back"><svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.4555 18.901L1.92947 10.1545L10.4555 1.40799C10.6081 1.25172 10.6936 1.04194 10.6936 0.823491C10.6936 0.605043 10.6081 0.395262 10.4555 0.238991C10.3813 0.163325 10.2928 0.103213 10.1952 0.0621751C10.0975 0.0211376 9.99265 -3.07142e-08 9.88672 -3.53447e-08C9.78079 -3.99752e-08 9.67592 0.0211376 9.57826 0.0621751C9.4806 0.103213 9.39211 0.163325 9.31797 0.238991L0.24597 9.54374C0.086696 9.70714 -0.00244565 9.9263 -0.00244566 10.1545C-0.00244567 10.3827 0.086696 10.6018 0.24597 10.7652L9.31622 20.07C9.39041 20.1462 9.47912 20.2068 9.5771 20.2481C9.67509 20.2895 9.78036 20.3108 9.88672 20.3108C9.99307 20.3108 10.0984 20.2895 10.1963 20.2481C10.2943 20.2068 10.383 20.1462 10.4572 20.07C10.6099 19.9137 10.6953 19.7039 10.6953 19.4855C10.6953 19.267 10.6099 19.0573 10.4572 18.901L10.4555 18.901Z" fill="white"/>
        </svg></a>
    </div>
	<div class="container top-banner__container careers-top-banner__container">
		<div class="top-banner__content careers-top-banner__content wow animate__fadeInUp">
			<h1 class="careers-top-banner__title"><?php $this->sub_page_get_group_value($data, $sub_group, $comeet_cat); ?></h1>
		</div>
	</div>
</div>

<div class="comeet-positions-section">
<?php if (isset($comeet_groups) && !empty($comeet_groups) && $comeet_count_result > 0) { ?>
    <div class="container comeet-positions-section__container">
        <p class="comeet-positions-section__openings">
            <?php
                $text = ($comeet_count_result == 1 ? ' Opening' : ' Openings');
                echo $comeet_count_result.$text;
            ?>
        </p>
        <div class="comeet-positions-section__wrapper">
        <?php if (isset($group_element)) {
            foreach ($comeet_groups as $category) {
                $hasGroup = $this->get_has_group($data, $group_element, $category, $sub_group, $comeet_cat);
                if ($hasGroup) { 
                    foreach ($data as $post) {
                        if ($this->check_for_category($post, $group_element, $category, $sub_group, $comeet_cat)) {
                            echo '<a href="' . $this->generate_sub_page_url($options, $category, $post) . '" class="comeet-positions-section__position">';
                                echo '<span class="comeet-positions-section__name">' . $post['name'] . '</span>';
                                echo '<span class="comeet-positions-section__location">' . $post['location']['name'] . '</span>';
                                echo '<span class="comeet-positions-section__arrow"><svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.239842 1.40956L8.76584 10.1561L0.239843 18.9026C0.0872036 19.0588 0.00174983 19.2686 0.00174984 19.4871C0.00174985 19.7055 0.0872036 19.9153 0.239843 20.0716C0.31398 20.1472 0.40247 20.2073 0.500131 20.2484C0.597792 20.2894 0.70266 20.3105 0.808592 20.3105C0.914525 20.3105 1.01939 20.2894 1.11705 20.2484C1.21471 20.2073 1.3032 20.1472 1.37734 20.0716L10.4493 10.7668C10.6086 10.6034 10.6978 10.3842 10.6978 10.1561C10.6978 9.92787 10.6086 9.70871 10.4493 9.5453L1.37909 0.240555C1.3049 0.164354 1.21619 0.103788 1.11821 0.0624332C1.02022 0.0210781 0.914946 -0.000227014 0.808592 -0.00022701C0.702237 -0.000227005 0.59696 0.0210781 0.498976 0.0624332C0.400991 0.103788 0.312284 0.164354 0.238091 0.240555C0.085452 0.396826 -8.61287e-07 0.606607 -8.51738e-07 0.825056C-8.42189e-07 1.0435 0.0854521 1.25328 0.238091 1.40956L0.239842 1.40956Z" fill="#744BDA"/>
                                </svg>
                                </span>';
                            echo '</a>';
                        }
                    }
                } 
            }
        } 
        ?>
        </div>
    </div>
<?php
} else {
    echo "Sorry, no open positions here at this time. Please visit again soon.";
}
?>
</div>
