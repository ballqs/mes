<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Common extends CI_Controller {

	function __construct(){
		parent::__construct();		
	}

	public function index()
	{	
		$data = array();
		$data['menu_title'] = '사용자 관리';
		$data['menu_sub_title'] = '사용자 정보';
		// echo 'main<br/>';
		// print_r($this->session->userdata());
		// print_r($this->db);
		// $hash = password_hash('momos2013', PASSWORD_BCRYPT);
		// echo $hash;
		// echo '<br>';
		// if(password_verify('123', $hash)){
			// echo 'pass';
		// }else{
			// echo 'failed';
		// }
		// $this->load->library('layout');
		$view = array('main');
		$this->layout->view($view, $data);
		
	}
	
	public function menupgm_management()
	{
		$data = array();
		$data['menu_title'] = '메뉴관리';
		$data['menu_sub_title'] = '사용자 정보';
		
		$data['menu_top'] = $this->mms_m->tbWhere(array('up_pgm_id' => ''), 'tbc_pgminfo');
		print_r($data['menu_top']);
		$view = array('common/menupgm_management');
		$this->layout->view($view, $data);
	}
}
