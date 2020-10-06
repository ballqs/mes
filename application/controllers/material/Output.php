<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Output extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        redirect('/material/output/mtrl_output_mgt');
    }

    public function mtrl_output_mgt()  // 자재출고
    {
        $this->output->enable_profiler(false);
        $data = array();
        $view = array('material/output/mtrl_output_mgt');

        // select * from tbm_whsinfo where whs_nm = '원자재창고';
        $data['data']['whs'] = $this->db->get_where("tbm_whsinfo", array('whs_nm' => '원자재창고'))->row();
        // select * from tbc_codeinfo where cd = 'stock_loc_mgt';
        $data['data']['loc_yn'] = $this->db->get_where('tbc_codeinfo', array('cd' => 'stock_loc_mgt'))->row();
        if($data['data']['loc_yn']->cd_set1 == 'Y'){
            // 출고 창고 위치 코드 관리 하는 곳은 아직 정의 되지 않았음
            // SELECT * FROM `tbm_whslocinfo` WHERE `tbm_whslocinfo`.`fact_cd` = 'winp01' AND `tbm_whslocinfo`.`whs_cd` = 'W0002'
            $data['data']['loc'] =
                $this->db->get_where('tbm_whslocinfo', array('fact_cd' => $data['data']['whs']->fact_cd, 'whs_cd' => $data['data']['whs']->whs_cd))->result();

            if(count($data['data']['loc']) == 0){
                $data['data']['loc'][] = (object) [];
                $data['data']['loc'][0]->loc_cd = '*';
                $data['data']['loc'][0]->loc_nm = '*';
            }

        }else{
            // 출고 창고 위치 코드 관리 하지 않는 곳은 '*'
            $data['data']['loc'] = [];
            $data['data']['loc'][] = (object) [];
            $data['data']['loc'][0]->loc_cd = '*';
            $data['data']['loc'][0]->loc_nm = '*';

        }

        $this->layout->view($view, $data);
    }

    public function mtrl_output_mgt_wp()  // 자재출고 winplus
    {
        $this->output->enable_profiler(false);
        $data = array();
        $view = array('material/output/mtrl_output_mgt_wp');

        // select * from tbm_whsinfo where whs_nm = '원자재창고';
        $data['data']['whs'] = $this->db->get_where("tbm_whsinfo", array('whs_nm' => '원자재창고'))->row();
        // select * from tbc_codeinfo where cd = 'stock_loc_mgt';
        $data['data']['loc_yn'] = $this->db->get_where('tbc_codeinfo', array('cd' => 'stock_loc_mgt'))->row();
        if($data['data']['loc_yn']->cd_set1 == 'Y'){
            // 출고 창고 위치 코드 관리 하는 곳은 아직 정의 되지 않았음
            // SELECT * FROM `tbm_whslocinfo` WHERE `tbm_whslocinfo`.`fact_cd` = 'winp01' AND `tbm_whslocinfo`.`whs_cd` = 'W0002'
            $data['data']['loc'] =
                $this->db->get_where('tbm_whslocinfo', array('fact_cd' => $data['data']['whs']->fact_cd, 'whs_cd' => $data['data']['whs']->whs_cd))->result();

            if(count($data['data']['loc']) == 0){
                $data['data']['loc'][] = (object) [];
                $data['data']['loc'][0]->loc_cd = '*';
                $data['data']['loc'][0]->loc_nm = '*';
            }

        }else{
            // 출고 창고 위치 코드 관리 하지 않는 곳은 '*'
            $data['data']['loc'] = [];
            $data['data']['loc'][] = (object) [];
            $data['data']['loc'][0]->loc_cd = '*';
            $data['data']['loc'][0]->loc_nm = '*';

        }

        $this->layout->view($view, $data);
    }

    public function mtrl_prdmove_mgt()
    {
        $data = array();
        $view = array('material/output/mtrl_prdmove_mgt');
        $this->layout->view($view, $data);
    }

    public function term_output_staus()  // 기간별 자재 출고 현황
    {
        $data = array();
        $view = array('material/output/term_output_staus');
        $this->layout->view($view, $data);
    }

    public function term_output_staus_wp()  // 기간별 자재 출고 현황(원플러스)
    {
        $data = array();
        $view = array('material/output/term_output_staus_wp');
        $this->layout->view($view, $data);
    }
}
