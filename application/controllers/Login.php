<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {
	
	function __construct(){
		parent::__construct();		
	}
	
	public function index(){
		$this->login();
	}
	
	public function login(){
	    if($this->session->userdata('emp_id')){
            redirect('/');
        }
		$data = array();
				
		$param = $this->input->post(null, true);
		$this->db = $this->load->database(isset($param['dbname']) ? $param['dbname'] : 'default', TRUE);
		$this->load->library('form_validation');
		$this->form_validation->set_rules('loginId', 'ID', 'required');
		$this->form_validation->set_rules('loginPw', 'PASSWORD', 'required');
		
		$this->form_validation->set_error_delimiters("", "");
		if($this->form_validation->run() == TRUE){			
			$login_chk = $this->login_chk($param);
			if ($login_chk->result) redirect('/');
			else $data['error_msg'] = $login_chk->msg;
		}else{		
			$this->load->helper('form_validation');
			$data['error_msg'] = error_string($this->form_validation->error_array());
		}
		
		$this->load->view('login/login', $data);
	}
	
	public function login_chk($param){		
		$result = (object) array();
		$result->result = false;
		$result->msg = '';
		$user = $this->mms_m->tbWhere(array('emp_id' => $param['loginId']), 'tbc_userinfo');
				
		if(empty($user)) {
			$result->msg = '없는 유저입니다.';
		}else{
			if(password_verify($param['loginPw'], $user['pwd'])){
                $db_name = $param['dbname'] == 'default' ? 'mes' : $param['dbname'];
			    $fact_cd = $this->db->query("SELECT * FROM {$db_name}.tbc_codeinfo WHERE up_cd = 'fact_cd' AND use_yn = 'Y' ORDER BY cd_ordr ASC LIMIT 1")->row();
				$userdata = array(
					'fact_cd' => $user['fact_cd'], 
					'emp_id' => $user['emp_id'],
					'db_name' => $param['dbname'],
                    'device' => $param['device'],
                    'fact_cd' => $fact_cd->cd,
					);
				$this->session->set_userdata($userdata);
				$result->result = true;
			}else{
				$result->msg = '비밀번호가 틀렸습니다.';
			}
		}
		return $result;
	}
	
	public function logout(){
		$this->session->sess_destroy();
		redirect(base_url('login'));
	}
}
