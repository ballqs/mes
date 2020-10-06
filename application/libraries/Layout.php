<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 레이아웃을 관리하는 class 입니다.
 */
class Layout extends CI_Controller {

    function __construct()
    {

    }

    function view($path = array(), $data = array()){
        // print_r($path);

        $CI =& get_instance();
        $data['menu_title'] = '';
        if ($CI->uri->segment(1) != 'password') {
            $data['menus'] = $CI->mms_m->tbWhereObj(array(), 'tbc_pgminfo', 'pgm_ordr ASC');

            $CI->load->helper('url');
            $data['menu_title'] = $CI->mms_m->tbWhereObj(array('url' => uri_string()), 'tbc_pgminfo')[0]->pgm_nm;
            $data['menu_sub_title'] = explode('/', uri_string())[0];
            $data['header_btns'] = $CI->mes_m->btn_list(uri_string())->data;

        }
        if($path[0] == '/common/index'){
            $CI->load->view('layouts/main_header.php', $data);
            foreach ($path as $key => $value) {
                $CI->load->view($value, $data);
            }
        }
        else{
            $CI->load->view('layouts/inner_header.php', $data);
            foreach ($path as $key => $value) {
                $CI->load->view($value, $data);
            }
            $CI->load->view('layouts/footer.php', $data);
        }

    }
}
