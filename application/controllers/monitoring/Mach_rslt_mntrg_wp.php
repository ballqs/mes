<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mach_rslt_mntrg_wp extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->load->view('monitoring/mach_rslt_mntrg_wp/index.php');
    }
}
