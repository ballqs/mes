<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Stck_ajst extends CI_Controller
{
    public function get($path = ''){

        $param = $this->input->get(null, true)['param'];
        $sess = $this->session->userdata('emp_id');

        $data_list = $this->_get_data_ref($param,$sess);

        if($path == 'stck_ajst_mgt'){
            $this->_get_stck_ajst_mgt($data_list);
        }else if($path == 'stck_ajst_mgt_mes'){
            $this->_get_stck_ajst_mgt_mes($data_list);
        }
        $tb = $this->_get_table($path)[0];

        $data = $this->mes_m->get($tb, $param);
        echo json_encode($data);
    }

    public function save($path = ''){
        $param = $this->input->post(null, true)['param'];
        if($path == 'stck_ajst_mgt'){
            $this->_save_stck_ajst_mgt($param);
        }else if($path == 'stck_ajst_mgt_mes'){
            $this->_save_stck_ajst_mgt_mes($param);
        }
    }

    private function _save_stck_ajst_mgt_mes($param){

        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        $parameter = $param[0];
        $dsp_gbn = $parameter[count($parameter)-1]['dsp_gbn'];
        for($i = 0; $i < count($parameter)-1; $i++){
            //mysqli_next_result($this->db->conn_id);
            $qry = "CALL usp_stckadjsthstry_i1('{$parameter[$i]['fact_cd']}','{$dsp_gbn}','{$parameter[$i]['taking_gbn_cd']}','{$parameter[$i]['taking_ymd']}','{$parameter[$i]['prt_nbr_cd']}','{$parameter[$i]['lotno']}','{$parameter[$i]['cur_stck_qty']}','{$parameter[$i]['taking_qty']}','{$parameter[$i]['adjst_qty']}','{$parameter[$i]['stck_unit']}','{$parameter[$i]['whs_cd']}','{$parameter[$i]['loc_cd']}','{$sess}',@result, @msg);";
            //$result->data = $this->db->query($qry)->result();
            $result->data[$i] = $this->mes_m->GetMultipleQueryResult($qry)[0];
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this->db->trans_status() === FALSE || !$result->result) {
                $this->db->trans_rollback();
                exit(json_encode($result));
            }
        }

        if ($this->db->trans_status() === FALSE){
            $result->msg = '저장되지 않았습니다.';
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '저장되었습니다.';
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }

    private function _save_stck_ajst_mgt($param){

        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        $parameter = $param[0];
        $dsp_gbn = $parameter[count($parameter)-1]['dsp_gbn'];
        for($i = 0; $i < count($parameter)-1; $i++){
            //mysqli_next_result($this->db->conn_id);
            $qry = "CALL usp_stckadjsthstry_i1('{$parameter[$i]['fact_cd']}','{$dsp_gbn}','{$parameter[$i]['taking_gbn_cd']}','{$parameter[$i]['taking_ymd']}','{$parameter[$i]['prt_nbr_cd']}','{$parameter[$i]['ship_cd']}','{$parameter[$i]['cur_stck_qty']}','{$parameter[$i]['taking_qty']}','{$parameter[$i]['adjst_qty']}','{$parameter[$i]['stck_unit']}','{$parameter[$i]['whs_cd']}','{$parameter[$i]['loc_cd']}','{$sess}',@result, @msg);";
            //$result->data = $this->db->query($qry)->result();
            $result->data[$i] = $this->mes_m->GetMultipleQueryResult($qry)[0];
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this->db->trans_status() === FALSE || !$result->result) {
                $this->db->trans_rollback();
                exit(json_encode($result));
            }
        }

        if ($this->db->trans_status() === FALSE){
            $result->msg = '저장되지 않았습니다.';
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '저장되었습니다.';
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }

    private function _get_stck_ajst_mgt($data_list){
        $result = $this->mes_m->get_response_data_form();
        $qry = "CALL usp_stckadjsthstry_s1('{$data_list['fact_cd']}', '{$data_list['prt_nbr_cd']}', '{$data_list['prt_nbr_nm']}', '{$data_list['ship_cd']}', '{$data_list['ship_nm']}', '{$data_list['aply_yn']}', '{$data_list['dsp_gbn']}', '{$data_list['taking_ymd']}', '{$data_list['emp_id']}', @result, @msg);";
        //$result->data = $this->mes_m->GetMultipleQueryResult($qry)[0];
        $result->data = $this->db->query($qry)->result();
        $result->row = count($result->data);
        $result->qry = $qry;
        if($result->row > 0){
            $result->result = true;
            $result->msg = "조회되었습니다.";
        }else{
            $result->result = false;
            $result->msg = "조회될 목록이 없습니다.";
        }
        exit(json_encode($result));
    }

    private function _get_stck_ajst_mgt_mes($data_list){
        $result = $this->mes_m->get_response_data_form();
        $qry = "CALL usp_stckadjsthstry_s1('{$data_list['fact_cd']}', '{$data_list['prt_nbr_cd']}', '{$data_list['prt_nbr_nm']}', '{$data_list['lotno']}', '{$data_list['aply_yn']}', '{$data_list['dsp_gbn']}', '{$data_list['taking_ymd']}', '{$data_list['emp_id']}', @result, @msg);";
        //$result->data = $this->mes_m->GetMultipleQueryResult($qry)[0];
        $result->data = $this->db->query($qry)->result();
        $result->row = count($result->data);
        $result->qry = $qry;
        if($result->row > 0){
            $result->result = true;
            $result->msg = "조회되었습니다.";
        }else{
            $result->result = false;
            $result->msg = "조회될 목록이 없습니다.";
        }
        exit(json_encode($result));
    }

    private function _get_data_ref($param,$sess){
        if(isset($param['like'])) {
            $prt_nbr_cd = isset($param['like']['prt_nbr_cd']) ? $param['like']['prt_nbr_cd'][0] : '';
            $prt_nbr_nm = isset($param['like']['prt_nbr_nm']) ? $param['like']['prt_nbr_nm'][0] : '';
            $ship_cd = isset($param['like']['ship_cd']) ? $param['like']['ship_cd'][0] : '';
            $ship_nm = isset($param['like']['ship_nm']) ? $param['like']['ship_nm'][0] : '';
            $lotno = isset($param['like']['lotno']) ? $param['like']['lotno'][0] : '';
        }else {
            $prt_nbr_cd = '';
            $prt_nbr_nm = '';
            $ship_cd = '';
            $ship_nm = '';
            $lotno = '';
        }
        if(isset($param['where'])){
            $fact_cd = isset($param['where']['fact_cd']) ? $param['where']['fact_cd'] : '';
            $dsp_gbn = isset($param['where']['dsp_gbn']) ? $param['where']['dsp_gbn'] : '';
            $taking_ymd = isset($param['where']['taking_ymd']) ? $param['where']['taking_ymd'] : '';
            $aply_yn = isset($param['where']['aply_yn']) ? $param['where']['aply_yn'] : '';
        }else{
            $fact_cd = '';
            $dsp_gbn = '';
            $taking_ymd = '';
            $aply_yn = '';
        }

        $data_list = [
            "prt_nbr_cd" => $prt_nbr_cd,
            "prt_nbr_nm" => $prt_nbr_nm,
            "ship_cd" => $ship_cd,
            "ship_nm" => $ship_nm,
            "fact_cd" => $fact_cd,
            "dsp_gbn" => $dsp_gbn,
            "taking_ymd" => $taking_ymd,
            "aply_yn" => $aply_yn,
            "emp_id" => $sess,
            "lotno" => $lotno,
        ];

        return $data_list;
    }

    /**
     * 그리드별 테이블 등록
     * @param string $path
     * @return mixed
     */
    private function _get_table($path = ''){
        $tables = [
            'stck_ajst_mgt' => [''],
        ];
        return $tables[$path];
    }
}