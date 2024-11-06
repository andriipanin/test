<?php
/**
 * The template for displaying 404 pages (not found)
 *

 */

get_header();
$lang = get_locale();
?>

<div class="error-404-wrapper text-center ">
    <div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>
    <div class="cloud cloud-3"></div>
    <div class="cloud cloud-4"></div>
    <div class="container error-404-wrapper__container">
        <div class="error-404-wrapper__404">
            404
        </div>
        <p class="text-center error-404-wrapper__text">
            <?php _e('oops! we can\'t seem to find the page you\'re looking for.', 'corppix_site'); ?>
        </p>
        <div class="error-404-wrapper__wrapper-btn">
            <a href="<?php echo get_site_url(); ?>" class="btn-primary">
                <?php _e('Take me back to shore', 'corppix_site'); ?>
            </a>
        </div>
    </div>
    <div class="wave wave-1"></div>
    <div class="wave wave-2"></div>
    <div class="wave wave-3"></div>
    <div class="wave wave-4"></div>
    <div class="fin fin-1"></div>
    <div class="fin fin-2"></div>
</div>

<?php get_footer(); ?>
