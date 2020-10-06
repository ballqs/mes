<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Product extends CI_Controller
{


    function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        redirect('/base/product/oprt_mgt');
    }

    public function oprt_mgt()  // 공정관리
    {
        $data = array();
        $view = array('base/product/oprt_mgt');
        $this->layout->view($view, $data);

    }

    public function wrkctr_mgt()  // 작업장관리
    {
        $data = array();
        $view = array('base/product/wrkctr_mgt');
        $this->layout->view($view, $data);
    }

    public function part_nbr_rtg_mgt()  // 라우트정보
    {

        $data = array();
        $param = $this->input->get(null, true);

        if (count($param))
        {
            switch ($param['load_type'])
            {
                case 'save':
                    $data['msg'] = '저장되었습니다.';
                    break;
                case 'delete':
                    $data['msg'] = '삭제되었습니다.';
                    break;
                default:
                    $data['msg'] = '조회되었습니다.';
                    break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }
        else
        {  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('base/product/part_nbr_rtg_mgt');
        $this->layout->view($view, $data);
    }

    public function eqpmt_mgt()  // 설비관리
    {

        $data = array();
        $param = $this->input->get(null, true);
        $this->output->enable_profiler(true);
        if (count($param))
        {
            switch ($param['load_type'])
            {
                case 'save':
                    $data['msg'] = '저장되었습니다.';
                    break;
                case 'delete':
                    $data['msg'] = '삭제되었습니다.';
                    break;
                default:
                    $data['msg'] = '조회되었습니다.';
                    break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }
        else
        {  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('base/product/eqpmt_mgt');
        $this->layout->view($view, $data);
    }

    public function eqpmt_fault_item_mgt()  // 설비고장항목
    {

        $data = array();
        $param = $this->input->get(null, true);

        if (count($param))
        {
            switch ($param['load_type'])
            {
                case 'save':
                    $data['msg'] = '저장되었습니다.';
                    break;
                case 'delete':
                    $data['msg'] = '삭제되었습니다.';
                    break;
                default:
                    $data['msg'] = '조회되었습니다.';
                    break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }
        else
        {  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('base/product/eqpmt_fault_item_mgt');
        $this->layout->view($view, $data);
    }

    public function bad_code_mgt()  // 불량코드관리
    {

        $data = array();
        $param = $this->input->get(null, true);

        if (count($param))
        {
            switch ($param['load_type'])
            {
                case 'save':
                    $data['msg'] = '저장되었습니다.';
                    break;
                case 'delete':
                    $data['msg'] = '삭제되었습니다.';
                    break;
                default:
                    $data['msg'] = '조회되었습니다.';
                    break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }
        else
        {  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('base/product/bad_code_mgt');
        $this->layout->view($view, $data);
    }

    public function run_stop_mgt()  // 비가동코드관리
    {

        $data = array();
        $param = $this->input->get(null, true);

        if (count($param))
        {
            switch ($param['load_type'])
            {
                case 'save':
                    $data['msg'] = '저장되었습니다.';
                    break;
                case 'delete':
                    $data['msg'] = '삭제되었습니다.';
                    break;
                default:
                    $data['msg'] = '조회되었습니다.';
                    break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }
        else
        {  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('base/product/run_stop_mgt');
        $this->layout->view($view, $data);
    }

    public function part_nbr_uph_mgt()  // 품번UPH관리
    {

        $data = array();
        $param = $this->input->get(null, true);

        if (count($param))
        {
            switch ($param['load_type'])
            {
                case 'save':
                    $data['msg'] = '저장되었습니다.';
                    break;
                case 'delete':
                    $data['msg'] = '삭제되었습니다.';
                    break;
                default:
                    $data['msg'] = '조회되었습니다.';
                    break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }
        else
        {  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('base/product/part_nbr_uph_mgt');
        $this->layout->view($view, $data);
    }

    public function po_biz_mgt()  // 발주업체관리
    {

        $data = array();
        $param = $this->input->get(null, true);

        if (count($param))
        {
            switch ($param['load_type'])
            {
                case 'save':
                    $data['msg'] = '저장되었습니다.';
                    break;
                case 'delete':
                    $data['msg'] = '삭제되었습니다.';
                    break;
                default:
                    $data['msg'] = '조회되었습니다.';
                    break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }
        else
        {  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('base/product/po_biz_mgt');
        $this->layout->view($view, $data);
    }

    public function po_drct_biz_mgt()  // 직납업체관리
    {

        $data = array();
        $param = $this->input->get(null, true);

        if (count($param))
        {
            switch ($param['load_type'])
            {
                case 'save':
                    $data['msg'] = '저장되었습니다.';
                    break;
                case 'delete':
                    $data['msg'] = '삭제되었습니다.';
                    break;
                default:
                    $data['msg'] = '조회되었습니다.';
                    break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }
        else
        {  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('base/product/po_drct_biz_mgt');
        $this->layout->view($view, $data);
    }

    public function ship_biz_mgt()  // 출하업체관리
    {

        $data = array();
        $param = $this->input->get(null, true);

        if (count($param))
        {
            switch ($param['load_type'])
            {
                case 'save':
                    $data['msg'] = '저장되었습니다.';
                    break;
                case 'delete':
                    $data['msg'] = '삭제되었습니다.';
                    break;
                default:
                    $data['msg'] = '조회되었습니다.';
                    break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }
        else
        {  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('base/product/ship_biz_mgt');
        $this->layout->view($view, $data);
    }

    public function op_wrkr_mgt()  // 공정작업자관리
    {

        $data = array();
        $param = $this->input->get(null, true);

        if (count($param))
        {
            switch ($param['load_type'])
            {
                case 'save':
                    $data['msg'] = '저장되었습니다.';
                    break;
                case 'delete':
                    $data['msg'] = '삭제되었습니다.';
                    break;
                default:
                    $data['msg'] = '조회되었습니다.';
                    break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }
        else
        {  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('base/product/op_wrkr_mgt');
        $this->layout->view($view, $data);
    }

    public function wrkctr_wrkr_mgt()  // 작업장작업자관리
    {

        $data = array();
        $param = $this->input->get(null, true);

        if (count($param))
        {
            switch ($param['load_type'])
            {
                case 'save':
                    $data['msg'] = '저장되었습니다.';
                    break;
                case 'delete':
                    $data['msg'] = '삭제되었습니다.';
                    break;
                default:
                    $data['msg'] = '조회되었습니다.';
                    break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }
        else
        {  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('base/product/wrkctr_wrkr_mgt');
        $this->layout->view($view, $data);
    }

    public function wrkctr_mach_mgt()  // 작업장설비관리
    {

        $data = array();
        $param = $this->input->get(null, true);

        if (count($param))
        {
            switch ($param['load_type'])
            {
                case 'save':
                    $data['msg'] = '저장되었습니다.';
                    break;
                case 'delete':
                    $data['msg'] = '삭제되었습니다.';
                    break;
                default:
                    $data['msg'] = '조회되었습니다.';
                    break;
            }
            unset($param['load_type']);
            $data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
        }
        else
        {  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
            $data['info'] = array();
        }
        $data['param'] = $param;

        $view = array('base/product/wrkctr_mach_mgt');
        $this->layout->view($view, $data);
    }
}
