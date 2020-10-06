<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mach_rslt_mntrg extends CI_Controller
{

	function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$data = array();
		$param = $this->input->get(null, true);

		$data['param'] = $param;

		// $view = array('monitoring/mach_rslt_mntrg/index.php');
		// $this->load->view('layouts/header');
		$this->load->view('monitoring/mach_rslt_mntrg/index.php', $data);
		// $this->layout->view($view, $data);
	}
}
