<?php
$cookie_name = 'lake_havasu_message';
if (empty($_COOKIE[$cookie_name])) {
    add_action('corppix_after_open_body_tag', function () {
        ?>
        <div class="top-message">
            <div class="title">Visit&nbsp;Ahoy at Lake&nbsp;Havasu Boat&nbsp;Show&nbsp;in&nbsp;Arizona</div>
            <div class="content">April&nbsp;8-9-10,&nbsp;2022 | Booth&nbsp;#600 at the Park&nbsp;Pavilion</div>
            <span class="fish fish1"></span>
            <span class="fish fish2"></span>
            <span class="close-icon">&times;</span>
        </div>
        <?php
    });
    add_action('corppix_before_site_header', function() {
        ?>

        <script>
            function setCookie(cname, cvalue, exdays) {
                const d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                let expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            }

            const topMessage = document.querySelector('.top-message');
            const close_icon = document.querySelector('.close-icon');
            if (close_icon) {
                close_icon.addEventListener('click', () => {
                    setCookie('lake_havasu_message', 1, 1);
                    topMessage.classList.add('hidden');
                });
            }
        </script>

        <?php
    });
}