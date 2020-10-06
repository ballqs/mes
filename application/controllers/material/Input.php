<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Input extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        redirect('/material/input/mtrl_input_mgt');
    }

    public function mtrl_input_mgt_biz_ver()  // 발주자재입고
    {
        $data = array();
        $view = array('material/input/mtrl_input_mgt_biz_ver');
        $this->layout->view($view, $data);
    }

    public function mtrl_input_mgt()  // 발주자재입고
    {
        $data = array();
        $view = array('material/input/mtrl_input_mgt');
        $this->layout->view($view, $data);
    }

    public function mtrl_input_mgt_wp()  // 발주자재입고
    {
        $data = array();
        $view = array('material/input/mtrl_input_mgt_wp');
        $this->layout->view($view, $data);
    }

    public function mtrl_direct_input_mgt_biz_ver()  // 예외입고
    {
        $data = array();
        $view = array('material/input/mtrl_direct_input_mgt_biz_ver');
        $this->layout->view($view, $data);
    }

    public function mtrl_direct_input_mgt()  // 예외입고
    {
        $data = array();
        $view = array('material/input/mtrl_direct_input_mgt');
        $this->layout->view($view, $data);
    }

    public function mtrl_direct_input_mgt_wp()  // 예외입고
    {
        $data = array();
        $view = array('material/input/mtrl_direct_input_mgt_wp');
        $this->layout->view($view, $data);
    }

    public function term_input_staus()  // 기간별 자재 입고 현황
    {
        $data = array();
        $view = array('material/input/term_input_staus');
        $this->layout->view($view, $data);
    }
}
