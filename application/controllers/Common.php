<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Common extends CI_Controller {

    function __construct(){
        parent::__construct();
        $this->_get = $this->input->get(null, true);
        if(isset($this->_get['cnct_url'])) unset($this->_get['cnct_url']);
        if(isset($this->_get['cnct_btn'])) unset($this->_get['cnct_btn']);
        $this->output->enable_profiler(false);
    }

    public function index()
    {
        $data = [];
        $this->load->library('user_agent');
        // if ($this->agent->is_mobile()) {
        //     header("Location:/monitoring/mach_rslt_mntrg_wp");
        // }else{
//            $view = array('/common/index');
//            $this->layout->view($view, $data);
        // }
        if (strtolower($this->session->userdata('device')) == 'pc') {
            $view = array('/common/index');
            $this->layout->view($view, $data);
        }else if (strtolower($this->session->userdata('device')) == 'tablet') {
            header("Location:/production/status/wrkctr_rslt_mgt");
        }else if (strtolower($this->session->userdata('device')) == 'phone') {
            header("Location:/monitoring/mach_rslt_mntrg");
        }
    }

    public function usr_mgt()  // 사용자 관리
    {
        $data = array();
        $param = $this->_get;

        if (count($param)) {
            switch ($param['load_type']) {
                case 'save': $data['msg'] = '저장되었습니다.'; break;
                case 'delete': $data['msg'] = '삭제되었습니다.'; break;
                default: $data['msg'] = '조회되었습니다.'; break;
            }
            unset($param['load_type']);
            $data['info'] = $this->db->select('*, "********" as pwd')->like($param)->get('tbc_userinfo')->result();

        }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        // SELECT * FROM tbc_codeinfo WHERE up_cd = 'fact_cd' ORDER BY cd_ordr ASC;
        $data['fact_cd'] = $this->db->order_by('cd_ordr ASC')->get_where('tbc_codeinfo', array('up_cd' => 'fact_cd'))->result();
        $data['qry'] = $this->db->last_query();
        $data['param'] = $param;

        $view = array('common/usr_mgt');
        $this->layout->view($view, $data);
    }

    public function role_mgt() // 역할관리
    {
        $data = array();
        $param = $this->_get;

        if (count($param)) {
            switch ($param['load_type']) {
                case 'save': $data['msg'] = '저장되었습니다.'; break;
                case 'delete': $data['msg'] = '삭제되었습니다.'; break;
                default: $data['msg'] = '조회되었습니다.'; break;
            }
            unset($param['load_type']);
            $data['role_info'] = $this->mms_m->tbLikeObj($param, 'tbc_roleinfo', 'role_id ASC');
        }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['role_info'] = array();
        }
        $data['param'] = $param;

        $view = array('common/role_mgt');
        $this->layout->view($view, $data);
    }

    public function mnu_pgm_mgt()  // 메뉴프로그램관리
    {
        $this->output->enable_profiler(true);
        $data = array();
//		$data = $this->db->order_by('')->get('tbc_pgminfo');

        $view = array('common/mnu_pgm_mgt');

        $this->layout->view($view, $data);
    }

    public function pgm_btn_mgt()  // 프로그램 버튼 관리
    {
        $tb = 'tbc_pgminfo';
        $data = array();
        $param = $this->_get;

        if (count($param)) {
            switch ($param['load_type']) {
                case 'save': $data['msg'] = '저장되었습니다.'; break;
                case 'delete': $data['msg'] = '삭제되었습니다.'; break;
                default: $data['msg'] = '조회되었습니다.'; break;
            }
            unset($param['load_type']);

            $data['info'] = $this->db->select('a.*, b.pgm_nm as menu_nm')->join('tbc_pgminfo b', 'a.up_pgm_id = b.pgm_id')
                ->where(array('a.pgm_gbm' => 'P'))->like(array('a.pgm_nm' => $param['pgm_nm'], 'a.pgm_id' => $param['pgm_id']))
                ->order_by('pgm_ordr ASC')->get('tbc_pgminfo a')->result();

            $data['btns'] = $this->db->get_where('tbc_btninfo', array('use_yn' => 'Y'))->result();
        }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;
        $data['qry'] = $this->db->last_query();
        $data['err'] = $this->db->error();

        $view = array('common/pgm_btn_mgt');
        $this->layout->view($view, $data);
    }

    public function role_pgm_btn_mgt() // 역할 프로그램 버튼 관리
    {
        $data = array();
        $param = $this->_get;

        if (count($param)) {
            switch ($param['load_type']) {
                case 'save': $data['msg'] = '저장되었습니다.'; break;
                case 'delete': $data['msg'] = '삭제되었습니다.'; break;
                default: $data['msg'] = '조회되었습니다.'; break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_roleinfo', 'role_id ASC');
        }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;
        $data['pgm'] = $this->db->order_by('pgm_ordr ASC')->get_where('tbc_pgminfo')->result();
        $data['btns'] = $this->db->order_by('btn_id ASC')->get('tbc_btninfo')->result();

        $view = array('common/role_pgm_btn_mgt');
        $this->layout->view($view, $data);
    }

    public function usr_role_mgt() // 사용자 역할 관리
    {
        $data = array();
        $param = $this->_get;

        if (count($param)) {
            switch ($param['load_type']) {
                case 'save': $data['msg'] = '저장되었습니다.'; break;
                case 'delete': $data['msg'] = '삭제되었습니다.'; break;
                default: $data['msg'] = '조회되었습니다.'; break;
            }
            unset($param['load_type']);
            $emp_id = $this->session->userdata('emp_id');

            $data['info']['user'] = $this->mms_m->tbLikeObj(array('emp_id' => $param['emp_id'], 'emp_nm' => $param['emp_nm']), 'tbc_userinfo', 'role_id ASC');
            if($emp_id === 'admin'){
                $data['info']['role'] = $this->mms_m->tbWhereObj(array(), 'tbc_roleinfo', 'role_id ASC');
            }else{
                $data['info']['role'] = $this->mms_m->tbWhereObj(array('role_id !=' => 'R0001'), 'tbc_roleinfo', 'role_id ASC');
            }
        }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
            $data['info']['user'] = array();
            $data['info']['role'] = array();
        }
        $data['param'] = $param;

        $view = array('common/usr_role_mgt');
        $this->layout->view($view, $data);
    }

    public function cmn_code_mgt() // 공통 코드
    {
        $data = array();
        $param = $this->_get;

        if (count($param)) {

            switch ($param['load_type']) {
                case 'save': $data['msg'] = '저장되었습니다.'; break;
                case 'delete': $data['msg'] = '삭제되었습니다.'; break;
// 	      default: $data['msg'] = '조회되었습니다.'; break;
            }
            unset($param['load_type']);
// 	    $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_codeinfo', 'cd_ordr ASC');
        }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
// 	    $data['info'] = array();
        }
// 	  alert($data['msg']);
        $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_codeinfo', 'cd_ordr ASC');
        $data['param'] = $param;

        $view = array('common/cmn_code_mgt');
        $this->layout->view($view, $data);
    }

    public function usr_cnct_staus() // 사용자 접속 조회
    {
        $data = array();
        $param = $this->_get;

        if (count($param)) {
            switch ($param['load_type']) {
                case 'save': $data['msg'] = '저장되었습니다.'; break;
                case 'delete': $data['msg'] = '삭제되었습니다.'; break;
                default: $data['msg'] = '조회되었습니다.'; break;
            }
            unset($param['load_type']);
//	    $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_usercnctinfo', 'cnct_dt DESC');
            $this->db->like('b.emp_id', $param['emp_id']);
            $this->db->like('b.emp_nm', $param['emp_nm']);
            $this->db->where("DATE(a.cnct_dt) >= ", $param['cnct_dt_start']);
            $this->db->where("DATE(a.cnct_dt) <= ", $param['cnct_dt_end']);
            $data['info'] = $this->db->select('a.*, b.emp_id, b.emp_nm, c.pgm_nm, d.btn_nm')
                ->join('tbc_userinfo b', 'a.emp_id = b.emp_id')
                ->join('tbc_pgminfo c', 'a.pgm_id = c.pgm_id')
                ->join('tbc_btninfo d', 'a.btn_id = d.btn_id')
                ->order_by('cnct_dt DESC')->get('tbc_usercnctinfo a')->result();
        }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;
        $data['qry'] = $this->db->last_query();
        $view = array('common/usr_cnct_staus');
        $this->layout->view($view, $data);
    }

    public function btn_mgt()
    {
        $data = array();
        $param = $this->_get;

        if (count($param)) {
            switch ($param['load_type']) {
                case 'save': $data['msg'] = '저장되었습니다.'; $data['delete_browser_cache'] = true; break;
                case 'delete': $data['msg'] = '삭제되었습니다.'; break;
                default: $data['msg'] = '조회되었습니다.'; break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_btninfo', 'btn_id ASC');
        }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('common/btn_mgt');
        $this->layout->view($view, $data);
    }

    public function jsh(){
        $data = array();
        $param = $this->_get;

        if (count($param)) {
            switch ($param['load_type']) {
                case 'save': $data['msg'] = '저장되었습니다.'; break;
                case 'delete': $data['msg'] = '삭제되었습니다.'; break;
                default: $data['msg'] = '조회되었습니다.'; break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_roleinfo', 'role_id ASC');
        }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;
        $data['pgm'] = $this->db->order_by('pgm_ordr ASC')->get_where('tbc_pgminfo')->result();
        $data['btns'] = $this->db->order_by('btn_id ASC')->get('tbc_btninfo')->result();

        $view = array('common/jsh');
        $this->layout->view($view, $data);
    }


    ////////////////////////////////////////////////////////////////////////////////////////////



    public function batch_log_management()
    {
        $data = array();
        $param = $this->_get;

        if (count($param)) {
            switch ($param['load_type']) {
                case 'save': $data['msg'] = '저장되었습니다.'; break;
                case 'delete': $data['msg'] = '삭제되었습니다.'; break;
                default: $data['msg'] = '조회되었습니다.'; break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('common/batch_log_management');
        $this->layout->view($view, $data);
    }

    public function pc_ip_management()
    {
        $data = array();
        $param = $this->_get;

        if (count($param)) {
            switch ($param['load_type']) {
                case 'save': $data['msg'] = '저장되었습니다.'; break;
                case 'delete': $data['msg'] = '삭제되었습니다.'; break;
                default: $data['msg'] = '조회되었습니다.'; break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('common/pc_ip_management');
        $this->layout->view($view, $data);
    }

    public function program_version_management()
    {
        $data = array();
        $param = $this->_get;

        if (count($param)) {
            switch ($param['load_type']) {
                case 'save': $data['msg'] = '저장되었습니다.'; break;
                case 'delete': $data['msg'] = '삭제되었습니다.'; break;
                default: $data['msg'] = '조회되었습니다.'; break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('common/program_version_management');
        $this->layout->view($view, $data);
    }

    public function program_error_management()
    {
        $data = array();
        $param = $this->_get;

        if (count($param)) {
            switch ($param['load_type']) {
                case 'save': $data['msg'] = '저장되었습니다.'; break;
                case 'delete': $data['msg'] = '삭제되었습니다.'; break;
                default: $data['msg'] = '조회되었습니다.'; break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }else{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('common/program_error_management');
        $this->layout->view($view, $data);
    }

    public function phpinfo(){
        echo $abc;

    }

}
