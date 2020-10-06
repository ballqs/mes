<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
//메세지 출력 후 이동
if ( ! function_exists('checkDevice')) {
    function checkDevice() {
        // checkDevice() : checks if user device is phone, tablet, or desktop
        // RETURNS 0 for desktop, 1 for mobile, 2 for tablets
        if (is_numeric(strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "mobile"))) {
            return is_numeric(strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "tablet"))
                ? 2 : 1 ;
        } else { return 0; }
    }
}

