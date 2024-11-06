</main><!-- end of <main> -->

<?php
do_action("corppix_before_site_footer"); ?>

<?php
global $global_options;

$social_links_repeater = getFieldValue($global_options, "social_links");
$app_links_repeater    = getFieldValue($global_options, "app_links");
$footer_logo           = getFieldValue($global_options, "header_logo");
$footer_copyright      = getFieldValue($global_options, "footer_bottom_text");

$show_welcome_popup        = getFieldValue($global_options, "show_welcome_popup");
$how_often_to_show_popup   = getFieldValue($global_options, "how_often_to_show_popup");
$welcome_popup_image       = getFieldValue($global_options, "welcome_popup_image");
$welcome_popup_title       = getFieldValue($global_options, "welcome_popup_title");
$welcome_popup_text        = getFieldValue($global_options, "welcome_popup_text");
$welcome_popup_button_text = getFieldValue($global_options, "welcome_popup_button_text");
$welcome_popup_button_link = getFieldValue($global_options, "welcome_popup_button_link");

$show_pelican_pete       = getFieldValue($global_options, "show_pelican_pete");
$pelican_pete_identifier = getFieldValue($global_options, "pelican_pete_identifier");
$pelican_pete_title      = getFieldValue($global_options, "pelican_pete_title");
$pelican_pete_text       = getFieldValue($global_options, "pelican_pete_text");
$pelican_pete_button     = getFieldValue($global_options, "pelican_pete_button");
?>

<footer id="site-footer" class="site-footer">
    <div class="container site-footer__top-section">
        <?php
        if ( ! empty($footer_logo)) { ?>
            <a class="site-footer__logo" href="<?php
            echo get_site_url(); ?>">
                <img src="#" data-src="<?php
                echo $footer_logo; ?>" width="129" height="46" alt="footer logo" class="lozad"/>
            </a>
            <?php
        } ?>

        <?php
        // Footer menu
        wp_nav_menu([
            "theme_location"  => "footer",
            "menu"            => "",
            "container"       => "nav",
            "container_class" => "site-footer__nav",
            "container_id"    => "",
            "menu_class"      => "site-footer__menu",
            "menu_id"         => "",
            "echo"            => true,
            "fallback_cb"     => "wp_page_menu",
            "before"          => "",
            "after"           => "",
            "link_before"     => "",
            "link_after"      => "",
            "items_wrap"      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
            "depth"           => 0,
            "walker"          => "",
        ]); ?>

        <div class="site-footer__apps">

            <?php
            if ( ! empty($app_links_repeater)) { ?>
                <div class="site-footer__apps-label"><?php
                    _e("Get our app"); ?></div>

                <div class="site-footer__apps-links">
                    <?php
                    foreach ($app_links_repeater as $app_item) {
                        $app_link = $app_item["link"];
                        $app_name = $app_item["name"];
                        ?>
                        <a href="<?php
                        echo $app_link; ?>"
                           target="_blank"
                           class="site-footer__apps-link apps-link apps-link__<?php
                           echo strtolower($app_name); ?>">
                        </a>
                        <?php
                    } ?>
                </div>
                <?php
            } ?>

        </div>
    </div>

    <div class="container site-footer__top-section site-footer__top-section_center">
        <?php
        // Footer menu
        wp_nav_menu([
            "theme_location"  => "privacy_menu",
            "menu"            => "",
            "container"       => "nav",
            "container_class" => "site-footer__nav site-footer__nav_bottom",
            "container_id"    => "",
            "menu_class"      => "site-footer__menu",
            "menu_id"         => "",
            "echo"            => true,
            "fallback_cb"     => "wp_page_menu",
            "before"          => "",
            "after"           => "",
            "link_before"     => "",
            "link_after"      => "",
            "items_wrap"      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
            "depth"           => 0,
            "walker"          => "",
        ]); ?>

        <div class="site-footer__apps site-footer__apps_mobile">
            <div class="site-footer__apps-label"><?php
                _e("Get our app"); ?></div>

            <?php
            if ( ! empty($app_links_repeater)) { ?>
                <div class="site-footer__apps-links">
                    <?php
                    foreach ($app_links_repeater as $app_item) {
                        $app_link = $app_item["link"];
                        $app_name = $app_item["name"];
                        ?>
                        <a href="<?php
                        echo $app_link; ?>"
                           target="_blank"
                           class="site-footer__apps-link apps-link apps-link__<?php
                           echo strtolower($app_name); ?>">
                        </a>
                        <?php
                    } ?>
                </div>
                <?php
            } ?>

        </div>
        <div class="site-footer__social">
            <div class="site-footer__social-label"><?php
                _e("Follow us"); ?></div>

            <?php
            if ( ! empty($social_links_repeater)) { ?>
                <div class="site-footer__social-links">
                    <?php
                    foreach ($social_links_repeater as $item) {
                        $link = $item["link"];
                        $name = $item["name"];
                        ?>
                        <a href="<?php
                        echo $link; ?>"
                           target="_blank"
                           class="site-footer__social-link social-link social-link__<?php
                           echo strtolower($name); ?>">
                        </a>
                        <?php
                    } ?>
                </div>
                <?php
            } ?>

        </div>

    </div>

    <div class="container site-footer__bottom-section">

        <?php
        echo $footer_copyright ? '<p class="site-footer__copyright">' . do_shortcode($footer_copyright) . "</p>" : ""; ?>

    </div>

</footer>
<?php
if ($show_welcome_popup == true && is_front_page()) {
    $popupHtml = "";
    $popupHtml .= '<div class="welcome-popup">';
    if ( ! empty($welcome_popup_image)) {
        $popupHtml .= '<div class="welcome-popup__image-wrapper">';
        $popupHtml .= '<img src="' . $welcome_popup_image["url"] . '"  class="welcome-popup__image" alt="' . $welcome_popup_image["alt"] . '" width="' . $welcome_popup_image["width"] . '" height="' . $welcome_popup_image["height"] . '">';
        $popupHtml .= "</div>";
    }
    if ( ! empty($welcome_popup_title)) {
        $popupHtml .= '<h2 class="welcome-popup__title">' . $welcome_popup_title . "</h2>";
    }
    if ( ! empty($welcome_popup_text)) {
        $popupHtml .= '<p class="welcome-popup__text">' . $welcome_popup_text . "</p>";
    }
    if ( ! empty($welcome_popup_button_text)) {
        $popupHtml .= '<div class="welcome-popup__button-wrapper"><button type="button" class="btn-primary welcome-popup__button js-popup-close" data-href="' . $welcome_popup_button_link . '">' . $welcome_popup_button_text . "</button></div>";
    }
    $popupHtml .= '<input type="hidden" name="how_often_to_show_popup" class="how_often_to_show_popup" value="' . $how_often_to_show_popup . '" />';
    $popupHtml .= "</div>";
    echo do_shortcode('[popup_box box_id="welcome-popup"]' . $popupHtml . "[/popup_box]");
} ?>

<?php
do_action("corppix_after_site_footer"); ?>

</div><!-- .wrapper -->
<?php
// $pelican_pete_identifier
$pelican_pete_title = ! empty($pelican_pete_title) ? '<h3 class="pelican-pete__message-title">' . $pelican_pete_title . "</h3>" : "";
$pelican_pete_text  = ! empty($pelican_pete_text) ? '<p class="pelican-pete__message-text">' . $pelican_pete_text . "</p>" : "";
$pelican_pete_btn   = "";
if ( ! empty($pelican_pete_button)) {
    $pelican_pete_btn = '<a href="' . $pelican_pete_button["url"] . '" class="pelican-pete__message-btn" ' . ($pelican_pete_button["target"] != "" ? 'target="_blank"' : "") . ">" . $pelican_pete_button["title"] . "</a>";
}
if ($show_pelican_pete) {
    echo '
                <div class="pelican-pete">
                    <div class="pelican-pete__message">
                        <button class="pelican-pete__message-close" data-role="close-palacan-message">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.2571 11.2566V11.2555L6.00043 5.9985L5.99971 5.99923L11.2571 11.2566ZM5.99971 5.99923L0.743718 0.744737L5.99971 5.99923ZM11.255 11.9999C11.0648 11.9999 10.8753 11.9274 10.7309 11.7818L5.99971 7.05034L1.26997 11.7818C0.979624 12.0711 0.509989 12.074 0.218192 11.7818C-0.0714285 11.4907 -0.0714285 11.0196 0.218192 10.73L4.94938 6.00031L0.218192 1.27029C-0.0714285 0.979205 -0.0714285 0.508091 0.218192 0.218453C0.507086 -0.0722731 0.978172 -0.0733619 1.26997 0.218453L5.99971 4.94811L10.7309 0.218453C11.0205 -0.0711842 11.4887 -0.0733619 11.7812 0.218453C12.0723 0.509906 12.0708 0.979205 11.7812 1.26848L7.05149 5.9985L11.7827 10.73C12.0723 11.0211 12.0723 11.4907 11.7812 11.7818C11.636 11.927 11.4451 11.9996 11.255 11.9999Z" fill="#121213"/>
                            </svg>
                        </button>
                        ' . $pelican_pete_title . '
                        ' . $pelican_pete_text . '
                        ' . $pelican_pete_btn . '
                        <div class="pelican-pete__message-triangle"></div>
                    </div>
                    <button class="pelican-pete__btn" data-role="open-palacan-message">
                        <span class="pelican-pete__new" data-role="open-palacan-message">1</span>
                        <span class="pelican-pete__icon" data-role="open-palacan-message"></span>
                    </button>
                    <button class="pelican-pete__message-close-pete" data-role="close-pelican">
                        <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#744BDA">
                            <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-570.000000, -1089.000000)" fill="#744BDA">
                                <path d="M591.657,1109.24 C592.048,1109.63 592.048,1110.27 591.657,1110.66 C591.267,1111.05 590.633,1111.05 590.242,1110.66 L586.006,1106.42 L581.74,1110.69 C581.346,1111.08 580.708,1111.08 580.314,1110.69 C579.921,1110.29 579.921,1109.65 580.314,1109.26 L584.58,1104.99 L580.344,1100.76 C579.953,1100.37 579.953,1099.73 580.344,1099.34 C580.733,1098.95 581.367,1098.95 581.758,1099.34 L585.994,1103.58 L590.292,1099.28 C590.686,1098.89 591.323,1098.89 591.717,1099.28 C592.11,1099.68 592.11,1100.31 591.717,1100.71 L587.42,1105.01 L591.657,1109.24 L591.657,1109.24 Z M586,1089 C577.163,1089 570,1096.16 570,1105 C570,1113.84 577.163,1121 586,1121 C594.837,1121 602,1113.84 602,1105 C602,1096.16 594.837,1089 586,1089 L586,1089 Z" id="cross-circle" sketch:type="MSShapeGroup"> </path> 
                            </g> 
                        </svg>
                    </button>
                </div>
            ';
}
do_action("corppix_after_site_page_tag");
wp_footer();
do_action("corppix_before_body_closing_tag");
?>
<script type="text/javascript">
    //close Pelican Pete
    var closeButton = document.querySelector('[data-role="close-pelican"]');
    var pelicanPete = document.querySelector('.pelican-pete');

    closeButton.addEventListener('click', function () {
        pelicanPete.style.display = 'none';
    });

    var $zoho = $zoho || {};
    $zoho.salesiq = $zoho.salesiq ||
        {
            mode: "async",
            widgetcode: "44adbae08898970fe48348c6ef73b6c50ddaaaef867b3db45e606ae1d470c0eb2650a6eb66581451abaf530109e1f41f",
            values: {},
            ready: function () {
                $zoho.salesiq.floatbutton.coin.hidetooltip();
            }
        };
    var d = document;
    s = d.createElement("script");
    s.type = "text/javascript";
    s.id = "zsiqscript";
    s.defer = true;
    s.src = "https://salesiq.zoho.com/widget";
    t = d.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(s, t);
    let elemDiv = document.createElement('div');
    elemDiv.setAttribute('id', 'zsiqwidget');
    d.body.appendChild(elemDiv);
</script>

<div class="scroll-to-top js-scroll-to-top" data-role="scroll-page-to-top"></div>
<style>
    .zsiq_floatmain {
        z-index: 100000001 !important;
    }
</style>
</body>
</html>
