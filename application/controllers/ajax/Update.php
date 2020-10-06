<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Update extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	function role(){
		$result = (object)[];
		$result->result = false;
		
		$result->data = $this->input->post(null, true);

		echo json_encode($result);
    }
}
