<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Common extends CI_Controller {

	function __construct(){
		parent::__construct();

		// $this->load->library('session');
		// $db_name = $this->session->userdata('db_name') ? $this->session->userdata('db_name') : 'default';
		// $this->load->database($db_name);
	}

	public function index()
	{
	  redirect('/common/user_management');
// 		$this->role_management();
	}

	public function menupgm_management()
	{
		$data = array();

		$view = array('common/menupgm_management');
		$this->layout->view($view, $data);
	}

	public function button_management()
	{
		$data = array();

		$view = array('common/button_management');
		$this->layout->view($view, $data);
	}

	public function role_management()
	{		
		$data = array();
		$param = $this->input->get(null, true);

		if (count($param)) {
		  switch ($param['load_type']) {
				case 'save': $data['msg'] = '저장되었습니다.'; break;
				case 'delete': $data['msg'] = '삭제되었습니다.'; break;
				default: $data['msg'] = '조회되었습니다.'; break;
			}
			unset($param['load_type']);
			$data['role_info'] = $this->mms_m->tbLikeObj($param, 'tbc_roleinfo', 'role_id ASC');	
		}else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
			$data['role_info'] = array();
		}
    $data['param'] = $param;
    
		$view = array('common/role_management');
		$this->layout->view($view, $data);
	}
	
	public function user_management()
	{
	  $data = array();
	  $param = $this->input->get(null, true);
	  
	  if (count($param)) {
	    switch ($param['load_type']) {
	      case 'save': $data['msg'] = '저장되었습니다.'; break;
	      case 'delete': $data['msg'] = '삭제되었습니다.'; break;
	      default: $data['msg'] = '조회되었습니다.'; break;
	    }
	    unset($param['load_type']);
	    $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
	  }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
	    $data['info'] = array();
	  }
	  $data['param'] = $param;
	  
	  $view = array('common/user_management');
	  $this->layout->view($view, $data);
	}
	
	public function user_role_management()
	{ 
	  $data = array();
	  $param = $this->input->get(null, true);
	  
	  if (count($param)) {
	    switch ($param['load_type']) {
	      case 'save': $data['msg'] = '저장되었습니다.'; break;
	      case 'delete': $data['msg'] = '삭제되었습니다.'; break;
	      default: $data['msg'] = '조회되었습니다.'; break;
	    }
	    unset($param['load_type']);
	    $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
	  }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
	    $data['info'] = array();
	  }
	  $data['param'] = $param;
	  
	  $view = array('common/user_role_management');
	  $this->layout->view($view, $data);
	}
	
	public function program_button_management()
	{
	  $data = array();
	  $param = $this->input->get(null, true);
	  
	  if (count($param)) {
	    switch ($param['load_type']) {
	      case 'save': $data['msg'] = '저장되었습니다.'; break;
	      case 'delete': $data['msg'] = '삭제되었습니다.'; break;
	      default: $data['msg'] = '조회되었습니다.'; break;
	    }
	    unset($param['load_type']);
	    $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
	  }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
	    $data['info'] = array();
	  }
	  $data['param'] = $param;
	  
	  $view = array('common/program_button_management');
	  $this->layout->view($view, $data);
	}
	
	public function batch_log_management()
	{
	  $data = array();
	  $param = $this->input->get(null, true);
	  
	  if (count($param)) {
	    switch ($param['load_type']) {
	      case 'save': $data['msg'] = '저장되었습니다.'; break;
	      case 'delete': $data['msg'] = '삭제되었습니다.'; break;
	      default: $data['msg'] = '조회되었습니다.'; break;
	    }
	    unset($param['load_type']);
	    $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
	  }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
	    $data['info'] = array();
	  }
	  $data['param'] = $param;
	  
	  $view = array('common/batch_log_management');
	  $this->layout->view($view, $data);
	}
	
	public function pc_ip_management()
	{
	  $data = array();
	  $param = $this->input->get(null, true);
	  
	  if (count($param)) {
	    switch ($param['load_type']) {
	      case 'save': $data['msg'] = '저장되었습니다.'; break;
	      case 'delete': $data['msg'] = '삭제되었습니다.'; break;
	      default: $data['msg'] = '조회되었습니다.'; break;
	    }
	    unset($param['load_type']);
	    $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
	  }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
	    $data['info'] = array();
	  }
	  $data['param'] = $param;
	  
	  $view = array('common/pc_ip_management');
	  $this->layout->view($view, $data);
	}
	
	public function program_version_management()
	{
	  $data = array();
	  $param = $this->input->get(null, true);
	  
	  if (count($param)) {
	    switch ($param['load_type']) {
	      case 'save': $data['msg'] = '저장되었습니다.'; break;
	      case 'delete': $data['msg'] = '삭제되었습니다.'; break;
	      default: $data['msg'] = '조회되었습니다.'; break;
	    }
	    unset($param['load_type']);
	    $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
	  }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
	    $data['info'] = array();
	  }
	  $data['param'] = $param;
	  
	  $view = array('common/program_version_management');
	  $this->layout->view($view, $data);
	}
	
	public function program_error_management()
	{
	  $data = array();
	  $param = $this->input->get(null, true);
	  
	  if (count($param)) {
	    switch ($param['load_type']) {
	      case 'save': $data['msg'] = '저장되었습니다.'; break;
	      case 'delete': $data['msg'] = '삭제되었습니다.'; break;
	      default: $data['msg'] = '조회되었습니다.'; break;
	    }
	    unset($param['load_type']);
	    $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
	  }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
	    $data['info'] = array();
	  }
	  $data['param'] = $param;
	  
	  $view = array('common/program_error_management');
	  $this->layout->view($view, $data);
	}
	
	public function common_code_management()
	{
	  $data = array();
	  $param = $this->input->get(null, true);
	  
	  if (count($param)) {
	    switch ($param['load_type']) {
	      case 'save': $data['msg'] = '저장되었습니다.'; break;
	      case 'delete': $data['msg'] = '삭제되었습니다.'; break;
	      default: $data['msg'] = '조회되었습니다.'; break;
	    }
	    unset($param['load_type']);
	    $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
	  }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
	    $data['info'] = array();
	  }
	  $data['param'] = $param;
	  
	  $view = array('common/common_code_management');
	  $this->layout->view($view, $data);
	}
	
	public function role_program_button_management()
	{
	  $data = array();
	  $param = $this->input->get(null, true);
	  
	  if (count($param)) {
	    switch ($param['load_type']) {
	      case 'save': $data['msg'] = '저장되었습니다.'; break;
	      case 'delete': $data['msg'] = '삭제되었습니다.'; break;
	      default: $data['msg'] = '조회되었습니다.'; break;
	    }
	    unset($param['load_type']);
	    $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
	  }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
	    $data['info'] = array();
	  }
	  $data['param'] = $param;
	  
	  $view = array('common/role_program_button_management');
	  $this->layout->view($view, $data);
	}
}
