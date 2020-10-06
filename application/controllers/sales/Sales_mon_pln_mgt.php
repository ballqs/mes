<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sales_mon_pln_mgt extends CI_Controller
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

		$view = array('sales/sales_mon_pln_mgt/index.php');
		$this->layout->view($view, $data);
	}
}
