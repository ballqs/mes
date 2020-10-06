<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| Hooks
| -------------------------------------------------------------------------
| This file lets you define "hooks" to extend CI without hacking the core
| files.  Please see the user guide for info:
|
|	https://codeigniter.com/user_guide/general/hooks.html
|
*/


// 선택한 데이터베이스 로드
$hook['post_controller_constructor'][] = array(
	'class'    => 'Mes_common',
	'function' => 'change_database',
	'filename' => 'Mes_common.php',
	'filepath' => 'hooks',
  'params'  => ''
);

$hook['post_controller_constructor'][] = array(
	'class'    => 'Mes_common',
	'function' => 'session_check',
	'filename' => 'Mes_common.php',
	'filepath' => 'hooks',
  'params'  => ''
);

$hook['post_controller_constructor'][] = array(
	'class'    => 'Mes_common',
	'function' => 'usercnct',
	'filename' => 'Mes_common.php',
	'filepath' => 'hooks',
	'params'  => ''
);