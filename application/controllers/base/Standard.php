<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Standard extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->_get = $this->input->get(null, true);
        if(isset($this->_get['cnct_url'])) unset($this->_get['cnct_url']);
        if(isset($this->_get['cnct_btn'])) unset($this->_get['cnct_btn']);
        $this->output->enable_profiler(false);
    }

    public function index()
    {
        redirect('/base/standard/part_nbr_mgt');
    }

    public function part_nbr_mgt()  // 품번정보
    {
        $data = array();
        $view = array('base/standard/part_nbr_mgt');
        $this->layout->view($view, $data);
    }

    public function part_nbr_mgt_wp()  // 품번정보(윈플러스)
    {
        $data = array();
        $view = array('base/standard/part_nbr_mgt_wp');
        $this->layout->view($view, $data);
    }

    public function bom_mgt()  // BOM정보
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

        $view = array('base/standard/bom_mgt');
        $this->layout->view($view, $data);
    }

    public function unit_exchg_mgt()  // 단위환산정보
    {
        $data = array();
        $param = $this->input->get(null, true);
        $data['param'] = $param;
        $view = array('base/standard/unit_exchg_mgt');
        $this->layout->view($view, $data);
    }

    public function wrhs_loc_mgt()  // 창고위치정보
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

        $view = array('base/standard/wrhs_loc_mgt');
        $this->layout->view($view, $data);
    }

    public function dpt_mgt()  // 부서정보
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

        $view = array('base/standard/dpt_mgt');
        $this->layout->view($view, $data);
    }

    public function prd_calnr_mgt()  // 생산카렌더
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

        $view = array('base/standard/prd_calnr_mgt');
        $this->layout->view($view, $data);
    }
}
