<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Status extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->output->enable_profiler(false);
    }

    public function index()
    {
        redirect('/production/status/mtrl_input_mgt');
    }

    public function wrkctr_rslt_mgt()  // 지시실적관리(현장 단말)
    {

        $data = array();
        /*
        권한에 따라 배열에서 추가/제거 해주어야 함.
        현장 단말기(메인)	P4120
        작업장 선택	        popup_sel_wrkctr
        작업자 선택	        popup_sel_wrkctr_wrkr
        작업지시 선택	    popup_sel_wrkctr_orderno
        가동/비가동(버튼)
        소재투입	        popup_wrkctr_input_material
        실적등록	        popup_wrkctr_orderno_result
        비가동사유	        popup_wrkctr_stop_reason
        불량등록	        popup_wrkctr_bad_reason
        지시완료(버튼)
        작업완료(버튼)
         */
        $view = array(
            'production/status/wrkctr_rslt_mgt',
        );

//        $data['menu_list'] = $this->mes_m->get_menu_nav($this->session->userdata('emp_id'));
//
//        // 버튼 권한이 하나라도 있는 팝업만 추가
//        foreach ($data['menu_list']->data as $key => $value) {
//            if(explode('_', $value->pgm_id)[0] == 'popup') {
//                $view[] = 'popups/'.$value->pgm_id;
//            }
//        }
        $data['fact_cd'] = $this->db->query("SELECT tbc_codeinfo.* FROM tbc_codeinfo WHERE up_cd = 'fact_cd'")->result();
        $data['menu_list'] = $this->mes_m->btn_list('production/status/wrkctr_rslt_mgt');
        // 버튼 권한이 하나라도 있는 팝업만 추가
        foreach ($data['menu_list']->data as $key => $value) {
            $remark = json_decode($value->remark);
            if(isset($remark->type) && isset($remark->page)) {
                if ($remark->type == 'popup' && $remark->page == 'wrkctr_rslt_mgt') {
//                echo $remark->popup_id." ";
                    $view[] = 'popups/' . $remark->popup_id;
                }
            }
        }

//        foreach ($data['menu_list']->data as $key => $value) {
//            if(explode('_', $value->remark)[0] == 'popup') {
//                $view[] = 'popups/'.$value->remark;
//            }
//        }
//        echo '<xmp>';print_r($view);echo '</xmp>';exit;
        $this->layout->view($view, $data);
    }

    public function prd_day_staus()  // 생산일보
    {

        $data = array();
        $view = array('production/status/prd_day_staus');
        $this->layout->view($view, $data);
    }

    public function prd_mon_staus()  // 월일자별 생산 현황
    {

        $data = array();
        $view = array('production/status/prd_mon_staus');
        $this->layout->view($view, $data);
    }

    public function wrker_input_staus()  // 작업자 투입 현황
    {

        $data = array();
        $view = array('production/status/wrker_input_staus');
        $this->layout->view($view, $data);
    }

    public function mach_prd_staus()  // 설비별 생산 실적
    {

        $data = array();
        $view = array('production/status/mach_prd_staus');
        $this->layout->view($view, $data);
    }

    public function mtrl_input_staus()  // 자재 투입 현황
    {

        $data = array();
        $view = array('production/status/mtrl_input_staus');
        $this->layout->view($view, $data);
    }

    public function stop_anly_staus()  // 비가동 현황
    {

        $data = array();
        $view = array('production/status/stop_anly_staus');
        $this->layout->view($view, $data);
    }

    public function mtrl_prdctmove_mgt()
    {
        $data = array();
        $view = array('production/status/mtrl_prdctmove_mgt');
        $this->layout->view($view, $data);
    }

    public function mach_result_adjst()
    {
        $data = array();
        $view = array('production/status/mach_result_adjst');
        $this->layout->view($view, $data);
    }
}
