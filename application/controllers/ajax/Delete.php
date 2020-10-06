<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Delete extends CI_Controller {

	private $_btn_path = '/home/momosmes/uploads/img/buttons/';
	// private $_btn_path = '/home/momosmes/uploads/img/buttons/';

	function __construct(){
		parent::__construct();

		// $this->load->library('session');
		// $db_name = $this->session->userdata('db_name') ? $this->session->userdata('db_name') : 'default';
		// $this->load->database($db_name);
    }

    function role(){
  		$param = json_decode($this->input->post(null, true)['del_list']);
  		$tb = 'tbc_roleinfo';
  		$col = 'role_id';
  		$result = (object) [];
  		
  		$this->db->trans_start();
  		for ($i=0; $i < count($param); $i++) { 
  			try {
  				$this->db->delete($tb, array($col => $param[$i]));
  			} catch (\Throwable $th) {
  				//throw $th;
  			}	
  		}
  		$this->db->trans_complete();
  
  		if ($this->db->trans_status() === FALSE){
  			$result->msg = '문제가 발생하였습니다.';
  			$result->error = $this->db->error();
  			$result->qry = $this->db->last_query();
  			$this->db->trans_rollback();
  		}else{
  			$result->result = true;
  			$result->msg = '삭제되었습니다.';
  			$result->qry = $this->db->last_query();
  			$this->db->trans_commit();
  		}
  		echo json_encode($result);
    }
    
    function user(){
      $param = json_decode($this->input->post(null, true)['del_list']);
      $result = (object) [];
      $result->result = false;
      $tb = 'tbc_userinfo';
      $col = 'emp_id';
      
      $this->db->trans_start();
      for ($i=0; $i < count($param); $i++) {
        try {
          $this->db->delete($tb, array($col => $param[$i]));
        } catch (\Throwable $th) {
          //throw $th;
        }
      }
      $this->db->trans_complete();
      
      if ($this->db->trans_status() === FALSE){
        $result->msg = '문제가 발생하였습니다.';
        $result->error = $this->db->error();
        $result->qry = $this->db->last_query();
        $this->db->trans_rollback();
      }else{
        $result->result = true;
        $result->msg = '삭제되었습니다.';
        $result->qry = $this->db->last_query();
        $this->db->trans_commit();
      }

      echo json_encode($result);
    }
    
    function cmn_code(){
      $data = $this->input->post(null, true);
      $result = (object) [];
      $tb = 'tbc_codeinfo';
      $col = 'cd';
      
      $this->db->trans_start();
      try { $this->db->delete($tb, array($col => $data[$col])); } catch (\Throwable $th) {}
      $this->db->trans_complete();
      
      if ($this->db->trans_status() === FALSE){
        $result->msg = '문제가 발생하였습니다.';
        $result->error = $this->db->error();
        $result->qry = $this->db->last_query();
        $this->db->trans_rollback();
      }else{
        $result->result = true;
        $result->msg = '삭제되었습니다.';
        $result->qry = $this->db->last_query();
        $this->db->trans_commit();
      }
//       $result->data = $data;
      echo json_encode($result);
    }
}