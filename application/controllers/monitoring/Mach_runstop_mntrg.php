<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mach_runstop_mntrg extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $data = array();
        // $view = array('monitoring/mach_rslt_mntrg/index.php');
        // $this->load->view('layouts/header');
        $this->load->view('monitoring/mach_runstop_mntrg/index.php', $data);
        // $this->layout->view($view, $data);
    }
}
