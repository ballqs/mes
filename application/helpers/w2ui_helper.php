<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('console')) {
    function console($data, $name = '')
    {
        $html  = '<script>';
        $html .= 'var console_'.$name.' = '.json_encode($data).';';
        // $html .= "console.log('".$name."(".gettype($data).")');";
        $html .= "console.log(console_".$name.", '".$name."(".gettype($data).")');";
        $html .= '</script>';
        echo $html;
    }
}

if ( ! function_exists('w2ui_select_str')) {
    function w2ui_select_str($tbl)
    {
        return "@recid:=@recid+1 as recid, $tbl.*, if($tbl.use_yn = 'Y', TRUE, FALSE) use_yn";
    }
}

if ( ! function_exists('w2ui_tbl_nm')) {
    function w2ui_tbl_nm($tbl)
    {
        return $tbl.', (SELECT @recid:=0) r';
    }
}

if ( ! function_exists('add_code_name_query')) {
    function add_code_name_query($codes = array())
    {
        $join_str = '';

        foreach ($codes as $key => $value) {
            $col = '';
            $val_arr = explode('_', $value);
            if ($val_arr[count($val_arr) - 1] == 'cd'){
                $val_arr[count($val_arr) - 1] = 'nm';

                $col = implode($val_arr, '_');
            }
//            $join_str .= ", $key.cd $col";
            $join_str .= ", tbc_codeinfo.cd $col";
//            $join_str .= ", fnc_cd_nm(tbm_prtnbrinfo.$value, '$value') AS $col";
        }
        return $join_str;
    }
}

if ( ! function_exists('add_select_nm')) {
    function add_select_nm($codes = array())
    {
        $join_str = '';

        foreach ($codes as $key => $value) {
            $join_str .= ", $value as {$value}_nm";
        }

        return $join_str;
    }
}

//if ( ! function_exists('add_select_nm')) {
//    function add_select_nm($codes = array())
//    {
//        $join_str = '';
//
//        foreach ($codes as $key => $value) {
//            $col = '';
//            $val_arr = explode('_', $value);
//            if ($val_arr[count($val_arr) - 1] == 'cd'){
//                $val_arr[count($val_arr) - 1] = 'nm';
//
//                $col = implode('_', $val_arr);
//            }
//            $join_str .= ", $value as $col";
//        }
//
//        return $join_str;
//    }
//}