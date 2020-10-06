<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
*	$err = $this->form_validation->error_array()
*
*/ 

function error_string($err, $tag = 'li')
{
	$result = '';
	if($tag != '') foreach ($err as $key => $value) { $result .= '<'.$tag.'>'.$value.'</'.$tag.'>'; }
	else foreach ($err as $key => $value) { $result .= $value; }
	
	return $result;
}