<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Purchase extends CI_Controller
{

    function __construct(){
        parent::__construct();
    }
    public function index(){
        redirect('/material/purchase/prchs_mon_pln_mgt');
    }
    public function prchs_mon_pln_mgt(){  // 월간발주계획(주차)
        $data = array();
//        $sp_test = $this->mes_m->GetMultipleQueryResult("CALL usp_pomonthpln_s1('winp01', '2020-06', '', '', 'admin', @result, @msg)");
//        echo '<xmp>';print_r($sp_test);echo '</xmp>';
//        exit;
        $view = array('material/purchase/prchs_mon_pln_mgt');
        $this->layout->view($view, $data);
    }
    public function prchs_mgt(){  // 발주등록
        $data = array();
        $view = array('material/purchase/prchs_mgt');
        $this->layout->view($view, $data);
    }

    public function prchs_mgt_ship(){  // 발주등록
        $data = array();
        $view = array('material/purchase/prchs_mgt_ship');
        $this->layout->view($view, $data);
    }
    public function prchs_rslt_staus(){  // 발주대비입고현황
        $data = array();
        $view = array('material/purchase/prchs_rslt_staus');
        $this->layout->view($view, $data);
    }
}
