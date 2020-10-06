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

if ( ! function_exists('xmp')) {
    function xmp($data, $name = ''){
        echo '<br>'.$name;
        echo '<xmp>';
        print_r($data);
        echo '</xmp>';
    }
}
