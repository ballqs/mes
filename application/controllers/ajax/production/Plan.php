<?php
    defined('BASEPATH') OR exit('No direct script access allowed');

class Plan extends CI_Controller
{
    public function get($path = ''){

        $join = null;
        $tb = $this->_get_table($path)[0];
        $param = $this->input->get(null, true)['param'];
        $data_list = $this->_get_data_ref($param);

        if($path == 'wrkctr_ord_mgt'){
            $this->_get_wrkctr_ord_mgt($data_list);
        }elseif ($path == 'prd_mon_mgt'){
            $this->_get_prd_mon_mgt($data_list);
        }elseif ($path == 'pln_rslt_staus'){
            $this->_get_pln_rslt_staus($data_list);
        }

        if ($join == null) $data = $this->mes_m->get($tb, $param);
        else $data = $this->mes_m->get($tb, $param, $join);

        $data->getparam = $this->input->get();
        $data->path = 'path : '.$this->mes_m->get_p();

        echo json_encode($data);
    }

    public function save($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];
        if($path == 'wrkctr_ord_mgt'){
            $this->_save_wrkctr_ord_mgt($param);
        }elseif ($path == 'prd_mon_mgt'){
            $this->_save_prd_mon_mgt($param);
        }

        $data = $this->mes_m->save($tb, $param);

        echo json_encode($data);
    }

    public function delete($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];
        $result = $this->mes_m->delete($tb, $param);
        echo json_encode($result);
    }

    private function _save_prd_mon_mgt($param){
        $this->db->trans_begin();
        $result = $this->mes_m->get_response_data_form();
        $sess = $this->session->userdata('emp_id');
        $result->qry_arr = [];
        $result->test_arr = [];
        $result->cnt = 0;
        $result->param = $param;
        foreach ($param as $grid_idx) {
            foreach ($grid_idx as $arr_idx => $obj) {
                foreach ($obj as $key => $value) {
                    $result->cnt++;
                    $result->test_arr[] = $obj;
                    if(substr($key, 0, 1) == 'W'){
//                        $week_ordr = explode('W', $key)[1];
                        $qry = "CALL usp_prdmonmgt_save1('{$obj['fact_cd']}', '{$key}', '{$obj['prt_nbr_cd']}', '{$value}', '{$obj['remark']}', '{$sess}', @result, @msg)";
                        $this->db->query($qry);
                        $result->qry_arr[] = $qry;
                        $result->data = $this->db->query("SELECT @result as result, @msg as msg")->result();
                        if($result->data->result < 0){  // 실패
                            $result->msg = '저장되지 않았습니다.';
                            $result->error = $this->db->error();
                            $result->result = false;
                            $result->qry = $this->db->last_query();
                            $this->db->trans_rollback();
                            exit(json_encode($result));
                        }
                    }
                }
            }
        }

        if ($this->db->trans_status() === FALSE){
            $result->msg = '저장되지 않았습니다.';
            $result->error = $this->db->error();
            $result->result = false;
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

    private function _save_wrkctr_ord_mgt($param){
        $param = $param['param'];
        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();

        for($i=0; $i < count($param['where']); $i++){
            $remark = isset($param['where'][$i]['remark']) ? $param['where'][$i]['remark'] : '';
            if($param['where'][$i]['cu'] === 'c'){
                $qry = "CALL usp_wrkctrordmgt_i1('{$param['where'][$i]['fact_cd']}',
                '{$param['where'][$i]['op_cd']}','{$param['where'][$i]['wrkctr_cd']}',
                '{$param['where'][$i]['daynight_gbn']}','{$param['where'][$i]['wrk_ordr_dt']}',
                '{$param['where'][$i]['ordr_prt_nbr_no']}','{$param['where'][$i]['ordr_qty']}',
                '{$param['where'][$i]['prd_ordr_unit']}','{$param['where'][$i]['wrk_ordr_type']}',
                '0',
                '{$remark}','{$sess}',@result, @msg);";
                $result->data[$i] = $this->mes_m->GetMultipleQueryResult($qry)[0];
            }elseif ($param['where'][$i]['cu'] === 'u'){
                $qry = "CALL usp_wrkctrordmgt_u1('{$param['where'][$i]['fact_cd']}',
                '{$param['where'][$i]['wrk_ordr_no']}','{$param['where'][$i]['op_cd']}',
                '{$param['where'][$i]['wrkctr_cd']}','{$param['where'][$i]['daynight_gbn']}',
                '{$param['where'][$i]['wrk_ordr_dt']}','{$param['where'][$i]['ordr_prt_nbr_no']}',
                '{$param['where'][$i]['ordr_qty']}','{$param['where'][$i]['prd_ordr_unit']}',
                '{$param['where'][$i]['wrk_ordr_type']}','{$param['where'][$i]['wrk_tm_min']}',
                '{$remark}','{$sess}',@result, @msg);";
                $result->data[$i] = $this->mes_m->GetMultipleQueryResult($qry)[0];
            }

            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this->db->trans_status() === FALSE || $result->result == false){
                $result->msg = '저장되지 않았습니다.';
                $result->error = $this->db->error();
                $result->qry = $this->db->last_query();
                $this->db->trans_rollback();
            }
        }
        if ($this->db->trans_status() === FALSE ){
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

    private function _get_pln_rslt_staus($data_list){
        $qry = "SELECT a.*,
                    fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) AS wrkctr_nm,
                    b.prd_qty_meas,
                    b.prd_good_qty,
                    b.err_qty,
                    c.prt_nbr_nm,
                    c.spec,
                    c.base_whs_cd,
                    c.base_loc_cd,
                    ROUND((IFNULL(b.prd_qty_meas,0) / IFNULL(a.ordr_qty,0) * 100),2) AS achievement_rate
                FROM tpb_dalywrkordrpln a
                LEFT JOIN tpb_ordrwrkrst b ON(a.fact_cd = b.fact_cd AND a.wrk_ordr_no = b.wrk_ordr_no)
                LEFT JOIN tbm_prtnbrinfo c ON(a.fact_cd = c.fact_cd AND a.ordr_prt_nbr_no = c.prt_nbr_cd)
                WHERE a.fact_cd = '{$data_list['fact_cd']}'
                AND a.wrk_ordr_dt BETWEEN '{$data_list['date1']}' AND '{$data_list['date2']}'
                AND a.op_cd LIKE CONCAT('{$data_list['op_cd']}','%')
                AND fnc_op_nm(a.fact_cd, a.op_cd) LIKE CONCAT('{$data_list['op_nm']}','%')
                AND a.ordr_prt_nbr_no LIKE CONCAT('{$data_list['prt_nbr_cd']}','%')
                AND c.prt_nbr_nm LIKE CONCAT('{$data_list['prt_nbr_nm']}','%')
                AND a.wrkctr_cd LIKE CONCAT('{$data_list['wrkctr_cd']}','%')
                AND fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) LIKE CONCAT('{$data_list['wrkctr_nm']}','%')
                AND a.daynight_gbn LIKE CONCAT('{$data_list['daynight_gbn']}','%');";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_prd_mon_mgt($data_list){
        $sess = $this->session->userdata('emp_id');
        $dbname = $this->db->database;
        $result = $this->mes_m->get_response_data_form();
        $qry = "CALL usp_prdmonmgt_s1('{$dbname}','{$data_list['fact_cd']}', '{$data_list['base_ym']}', '{$data_list['prt_nbr_cd']}', '{$data_list['prt_nbr_nm']}','{$data_list['account_type']}', '{$sess}', @result, @msg)";
        $result->ori_qry = $qry;
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        try {
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = "조회되었습니다.";
        } catch (Exception $e) {
            $result->result = false;
            $result->msg = "조회에 실패했습니다.";
        }
        exit(json_encode($result));
    }

    private function _get_wrkctr_ord_mgt($data_list){


        $qry = "SELECT
                    a.fact_cd,
                    a.wrk_ordr_no,
                    a.op_cd,
                    fnc_op_nm(a.fact_cd, a.op_cd) AS op_nm,
                    a.wrkctr_cd,
                    fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) AS wrkctr_nm,
                    a.daynight_gbn,
                    a.wrk_ordr_dt,
                    a.ordr_prt_nbr_no,
                    b.prt_nbr_nm as ordr_prt_nbr_no_nm,
                    b.spec as ordr_prt_nbr_no_spec,
                    a.ordr_qty,
                    IFNULL(a.prd_ordr_unit,b.base_unit) as prd_ordr_unit,
                    (SELECT cd_nm FROM tbc_codeinfo WHERE up_cd = 'wrk_ordr_status' AND cd = a.wrk_ordr_status) as wrk_ordr_status,
                    a.wrk_ordr_type,
                    @var_fact_cd := a.fact_cd,
                    @var_wrk_ordr_no := a.wrk_ordr_no,
                    IF(a.wrk_ordr_status = '10', 0 ,(
                        SELECT
                            TIMESTAMPDIFF(
                                MINUTE,
                                MIN(str_dt),
                                IFNULL(
                                    MAX(end_dt),
                                    NOW()
                                )
                            )
                        FROM tpb_runstophstry
                        WHERE wrk_ordr_no = @var_wrk_ordr_no
                        AND fact_cd = @var_fact_cd
                    )) AS wrk_tm_min,
                    a.remark,
                    IF(a.updt_id IS NULL, a.inst_id, a.updt_id) AS updt_id,
                    IF(a.updt_dt IS NULL, a.inst_dt, a.updt_dt) AS updt_dt
                FROM tpb_dalywrkordrpln a
                    LEFT JOIN tbm_prtnbrinfo b ON(a.fact_cd = b.fact_cd AND a.ordr_prt_nbr_no = b.prt_nbr_cd)
                WHERE a.fact_cd = '{$data_list['fact_cd']}'
                AND a.op_cd LIKE CONCAT('%','{$data_list['op_cd']}','%')
                AND fnc_op_nm(a.fact_cd, a.op_cd) LIKE CONCAT('%','{$data_list['op_nm']}','%')
                AND a.wrkctr_cd LIKE CONCAT('%','{$data_list['wrkctr_cd']}','%')
                AND fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) LIKE CONCAT('%','{$data_list['wrkctr_nm']}','%')
                AND a.ordr_prt_nbr_no LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')
                AND b.prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%')
                AND a.daynight_gbn LIKE CONCAT('%','{$data_list['daynight_gbn']}','%')
                AND a.wrk_ordr_dt BETWEEN '{$data_list['date1']}' AND '{$data_list['date2']}'
                ORDER BY a.wrk_ordr_no;";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_data_ref($param = ''){
        $prt_nbr_cd = isset($param['like']['prt_nbr_cd']) ? $param['like']['prt_nbr_cd'][0] : '';
        $prt_nbr_nm = isset($param['like']['prt_nbr_nm']) ? $param['like']['prt_nbr_nm'][0] : '';
        $op_cd = isset($param['like']['op_cd']) ? $param['like']['op_cd'][0] : '';
        $op_nm = isset($param['like']['op_nm']) ? $param['like']['op_nm'][0] : '';
        $wrkctr_cd = isset($param['like']['wrkctr_cd']) ? $param['like']['wrkctr_cd'][0] : '';
        $wrkctr_nm = isset($param['like']['wrkctr_nm']) ? $param['like']['wrkctr_nm'][0] : '';

        $fact_cd = isset($param['where']['fact_cd']) ? $param['where']['fact_cd'] : '';
        $date1 = isset($param['where']['date1']) ? $param['where']['date1'] : '';
        $date2 = isset($param['where']['date2']) ? $param['where']['date2'] : '';
        $daynight_gbn = isset($param['where']['daynight_gbn']) ? $param['where']['daynight_gbn'] : '';
        $account_type = isset($param['where']['account_type']) ? $param['where']['account_type'] : '';
        $base_ym = isset($param['where']['base_ym']) ? $param['where']['base_ym'] : '';

        $data_list = [
            "prt_nbr_cd" => $prt_nbr_cd,
            "prt_nbr_nm" => $prt_nbr_nm,
            "op_cd" => $op_cd,
            "op_nm" => $op_nm,
            "wrkctr_cd" => $wrkctr_cd,
            "wrkctr_nm" => $wrkctr_nm,
            "date1" => $date1,
            "date2" => $date2,
            "daynight_gbn" => $daynight_gbn,
            "fact_cd" => $fact_cd,
            "account_type" => $account_type,
            "base_ym" => $base_ym,
        ];

        return $data_list;
    }

    private function _get_table($path = ''){
        $tables = [
            'wrkctr_ord_mgt' => ['tpb_dalywrkordrpln'],
            'prd_mon_mgt' => [''],
            'pln_rslt_staus' => [''],
        ];
    return $tables[$path];
    }

    public function copy(){
        $param = $this->input->post(null, true)['param'];
        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        $qry = "CALL usp_wrkctrordmgt_copy1('{$param['where']['fact_cd']}','{$param['where']['date3']}','{$param['where']['date4']}','{$sess}',@result, @msg);";
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result = $this->mes_m->trans_sp_result($result->data, $result);

        if ($this->db->trans_status() === FALSE || $result->result == false){
            $result->msg = '복사 실패했습니다.';
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '복사 완료했습니다.';
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }
}