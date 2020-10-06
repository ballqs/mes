<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Common extends CI_Controller {

	function __construct(){
		parent::__construct();

		// $this->load->library('session');
		// $db_name = $this->session->userdata('db_name') ? $this->session->userdata('db_name') : 'default';
		// $this->load->database($db_name);
	}

	// public function menu()
	public function up_pgm_id()
	{
		$param = $this->input->get('pgm_id', true) ? $this->input->get('pgm_id', true) : '';
		$data = $this->mms_m->tbWhereObj(array('pgm_id' => $param), 'tbc_pgminfo')[0];
		$data->pgm_id_list = $this->mms_m->tbWhereObj(array('pgm_id !=' => $param), 'tbc_pgminfo', 'pgm_ordr ASC');
		echo json_encode($data);
    }

	public function get_up_pgm_id()
	{   
		$param = $this->input->get('pgm_id', true) ? $this->input->get('pgm_id', true) : '';
		$data = $this->mms_m->tbWhereObj(array('pgm_id' => $param), 'tbc_pgminfo');
		echo json_encode($data);
    }

	public function up_pgm_i()
	{
		$param = $this->input->get('pgm_id', true) ? $this->input->get('pgm_id', true) : '';
		$data = $this->mms_m->tbWhereObj(array('pgm_id' => $param), 'tbc_pgminfo');
		// $data->qry = $this->db->last_query();
		$data->pgm_id_list = $this->mms_m->tbWhereObj(array('pgm_id !=' => $param), 'tbc_pgminfo', 'pgm_ordr ASC');
		echo json_encode($param);
    }

}
