<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('add_inst_id')) {
    function add_inst_id($arr = array())
    {
        $CI =& get_instance();
        $arr['inst_id'] = $CI->session->userdata('emp_id');
        $arr['updt_id'] = $CI->session->userdata('emp_id');
        return $arr;
    }
}

if ( ! function_exists('add_updt_id')) {
    function add_updt_id($arr = array())
    {
        $CI =& get_instance();
        $arr['updt_id'] = $CI->session->userdata('emp_id');
        return $arr;
    }
}
