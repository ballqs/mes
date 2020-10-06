<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Status extends CI_Controller
{
    public function get($path = ''){
//        exit(json_encode($this->input->get(null, true)));
        $join = null;
//        exit(json_encode($this->input->get(null, true)));
        $param = $this->input->get(null, true)['param'];
//        exit(json_encode($param));
        $data_list = $this->_get_data_ref($param);

        if($path == 'mach_prd_staus'){
            $this->_get_mach_prd_staus($data_list);
        }else if($path == 'wrkctr'){
            $this->_get_wrkctr($param);
        }else if($path == 'wrkctrsel'){
            $this->_get_wrkctrsel($param);
        }else if($path == 'wrkctrinfo'){
            $this->_get_wrkctrinfo($param); // 작업장상태가져오기
        }else if($path == "wrkctrlist"){
            $this->_get_wrkctrlist($param); // 작업장리스트 가져오기
        }else if($path == "wrkctr_wrkr"){
            $this->_get_wrkctr_wrkr($param); // 작업자 리스트 가져오기
        }else if($path == "pds_tab1"){
            $this->_get_pds_tab1($data_list);
        }else if($path == "pds_tab2"){
            $this->_get_pds_tab2($data_list);
        }else if($path == "pds_tab3"){
            $this->_get_pds_tab3($data_list);
        }else if($path == 'wrkctr_orderno'){
            $this->_get_wrkctr_orderno($param);
        }else if($path == 'chkcurwrkctr'){
            $this->_get_chkcurwrkctr($param);
        }else if($path == 'curr_material_list_in_man_whs'){
            $this->_get_curr_material_list_in_man_whs($param);
        }else if($path == 'curr_material_list_in_man_whs_prtnbr'){
            $this->_get_curr_material_list_in_man_whs_prtnbr($param);
        }else if($path == 'curr_material_list_in_man_whs_loc'){
            $this->_get_curr_material_list_in_man_whs_loc($param);
        }else if($path == 'curr_material_list_in_man_whs_loc_prtnbr'){
            $this->_get_curr_material_list_in_man_whs_loc_prtnbr($param);
        }else if($path == 'orderno_result'){
            $this->_get_orderno_result($param);
        }else if($path == 'prd_mon_staus'){
            $this->_get_prd_mon_staus($data_list);
        }else if($path == 'wrker_input_staus'){
            $this->_get_wrker_input_staus($data_list);
        }else if($path == 'stop_anly_staus'){
            $this->_get_stop_anly_staus($data_list);
        }else if($path == 'err_codes'){
            $this->_get_err_codes($param);
        }else if($path == 'stop_codes'){
            $this->_get_stop_codes($param);
        }else if($path == 'bad_status'){
            $this->_get_bad_status($param);
        }else if($path == 'tmp_bad_status'){
          $this->_get_tmp_bad_status($param);
        }else if($path == 'runstop_status'){
            $this->_get_runstop_status($param);
        }else if($path == 'runstop_status_auto'){
            $this->_get_runstop_status_auto($param);
        }else if($path == 'result_status'){
            $this->_get_result_status($param);
        }else if($path == 'bom_status'){
            $this->_get_bom_status($param);
        }else if($path == 'mtrl_prdctmove_mgt'){
            $this->_get_mtrl_prdctmove_mgt($data_list);
        }else if($path == 'mtrl_prdctmove_mgt_mpn'){
            $this->_get_mtrl_prdctmove_mgt_mpn();
        }else if($path == 'chk_run_hstry'){
            $this->_get_chk_run_hstry($param);
        }else if($path == 'curr_result_status'){
            $this->_get_curr_result_status($param);
        }else if($path == 'chk_wrkr'){
            $this->_get_chk_wrkr($param);
        }else if($path == 'action_btn'){
            $this->_get_action_btn($param);
        }else if($path == 'mach_result_adjst'){
            $this->_get_mach_result_adjst($data_list);
        }else if($path == 'mach_result_adjst_rowonclick'){
            $this->_get_mach_result_adjst_rowonclick();
        }else if($path == 'curr_wrkctr_tmp_err_sum'){
          $this->_get_curr_wrkctr_tmp_err_sum($param);
        }

        $tb = $this->_get_table($path)[0];

        if ($join == null) $data = $this->mes_m->get($tb, $param);
        else $data = $this->mes_m->get($tb, $param, $join);

        $data->getparam = $this->input->get();
        $data->path = 'path : '.$this->mes_m->get_p();

        echo json_encode($data);
    }

    public function save($path = ''){

        $param =
            $this->input->post(null, true)['param'];

        if($path == 'wrkctr'){
            $this->_save_wrkctr($param);
        }elseif ($path == 'wrkctr_wrkr'){
            $this->_save_wrkctr_wrkr($param);
        }elseif ($path == 'wrkctr_orderno'){
            $this->_save_wrkctr_orderno($param);
        }elseif ($path == 'insert_material'){
//          $this->_save_insert_material($this->input->post(null, true));
            $this->_save_insert_material($param);
        }
//        elseif ($path == 'insert_material_cancel'){
//            $this->_save_insert_material_cancel($this->input->post(null, true));
//        }
        elseif($path == 'orderno_result'){
            $this->_save_orderno_result($param);
        }elseif($path == 'runstop'){
            $this->_save_runstop($param);
        }elseif($path == 'stop_reason'){
            $this->_save_stop_reason($param);
        }elseif($path == 'stop_reason_auto'){
            $this->_save_stop_reason_auto($param);
        }elseif($path == 'order_complete'){
            $this->_save_order_complete($param);
        }elseif($path == 'work_complete'){
            $this->_save_work_complete($param);
        }elseif($path == 'cancel_result'){
            $this->_save_cancel_result($param);
        }elseif ($path == 'mtrl_prdctmove_mgt'){
            $this->_save_mtrl_prdctmove_mgt($param[0]);
        }elseif ($path == 'tmp_err'){
            $this->_save_tmp_err($param);
        }elseif($path == 'mach_result_adjst'){
            $this->_save_mach_result_adjst($param);
        }

        $tb = $this->_get_table($path);

        $data = $this->mes_m->save($tb, $param);

        echo json_encode($data);
    }

    public function delete($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];
        if($path == 'insert_material'){
            $this->_delete_insert_material($param);
        }elseif($path == 'mtrl_prdctmove_mgt'){
            $this->_delete_mtrl_prdctmove_mgt($param);
        }elseif($path == 'tmp_bad'){
            $this->_delete_tmp_bad($param);
        }elseif($path == 'sel_tmp_bad'){
          $this->_delete_sel_tmp_bad($param);
        }


        $result = $this->mes_m->delete($tb, $param);
        echo json_encode($result);
    }

  private function _delete_sel_tmp_bad($param){
//        exit(json_encode($param));

    $result = $this->mes_m->get_response_data_form();

    $fact_cd = $param['where']['hidden_fact_cd'];
    $wrkctr_cd = $param['like']['wrkctr_cd'][0];
    $ordr_no = $param['where']['hidden_wrk_ordr_no'];

    $checked_rows = $param['checked_rows'];
    /*
    fact_cd
    wrkctr_cd
    prt_nbr_cd
    err_cd
    wrk_ordr_no
    seq
    err_qty
    remark
    inst_id
    inst_dt
    updt_id
    updt_dt
    */

    $this->db->trans_begin();
    $result->param = $param;
//        $result->qry_list = [];
//        $result->item_list = [];

    foreach ($checked_rows as $item) {
      $qry = "DELETE FROM tpb_wrkctrerrrst 
                    WHERE fact_cd = '{$fact_cd}'
                    AND wrkctr_cd = '{$wrkctr_cd}'
                    AND wrk_ordr_no = '{$ordr_no}'
                    AND err_cd = '{$item['err_cd']}'
                    AND seq = {$item['seq']}";
      $this->db->query($qry);
//            $result->qry_list[] = $qry;
//            $result->item_list[] = $item['err_cd'];
    }
    if (!$this->db->trans_status()){
      $result->result = false;
      $result->msg="삭제되지 않았습니다";
      $this->db->trans_rollback();
    }else{
      $result->qry = $this->db->last_query();
      $result->result = true;
      $result->msg = '불량 목록이 삭제 되었습니다.';
      $this->db->trans_commit();
    }
    exit(json_encode($result));
  }

    private function _get_action_btn($param){
        exit(json_encode($param));

    }

    private function _get_chk_wrkr($param){
        exit(json_encode($param));
        $qry = "";
    }

    private function _delete_tmp_bad($param){
//        exit(json_encode($param));
        /*
        PK :
        fact_cd
        wrkctr_cd
        prt_nbr_cd
        err_cd
        wrk_ordr_no

        수량 : err_qty
        */
        $result = $this->mes_m->get_response_data_form();

        $fact_cd = $param['where']['hidden_fact_cd'];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $prt_nbr_cd = $param['like']['hidden_prtnbr_cd'][0];
        $wrk_ordr_no = $param['where']['hidden_wrk_ordr_no'];

        $this->db->trans_begin();

        $qry = "DELETE FROM tpb_wrkctrerrrst
                WHERE fact_cd = '{$fact_cd}'
                AND wrkctr_cd = '{$wrkctr_cd}'
                AND prt_nbr_cd = '{$prt_nbr_cd}'
                AND wrk_ordr_no = '{$wrk_ordr_no}'";

        $this->db->query($qry);
        $result->qry = $qry;

        if (!$this->db->trans_status()){
            $result->result = false;
            $result->msg="임시저장된 불량 리스트가 초기화 되지 않았습니다";
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '임시저장된 불량리스트가 초기화 되었습니다.';
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }

    private function _save_mach_result_adjst($param){
        $param = $param[0];
        $grid01 = $param[0];
        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        for($i = 1; $i < count($param); $i++){
            $qry = "CALL usp_machrsltadjst_u1(
                '{$grid01['fact_cd']}',
                '{$grid01['wrkctr_cd']}',
                '{$grid01['wrk_ordr_no']}',
                '{$param[$i]['rslt_dt']}',
                '{$sess}',
                @result,
                @msg
            )";
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this->db->trans_status() === FALSE || $result->result == false){
                $result->error = $this->db->error();
                $result->qry = $this->db->last_query();
                $result->row = $i+1;
                $this->db->trans_rollback();
            }
        }

        if ($this->db->trans_status() === FALSE || $result->result == false){
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '저장완료했습니다.';
            $this->db->trans_commit();
        }

        exit(json_encode($result));
    }

    private function _save_tmp_err($param){
//        exit(json_encode($param));
        /*
        PK :
        fact_cd
        wrkctr_cd
        prt_nbr_cd
        err_cd
        wrk_ordr_no

        수량 : err_qty
        */

        $result = $this->mes_m->get_response_data_form();

        $fact_cd = $param['where']['hidden_fact_cd'];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $prt_nbr_cd = $param['like']['hidden_prtnbr_cd'][0];
        $err_cd = $param['where']['err_cd'];
        $wrk_ordr_no = $param['where']['hidden_wrk_ordr_no'];
        $err_qty = $param['like']['err_qty'][0];
        $emp_id = $this->session->userdata('emp_id');

        $this->db->trans_begin();

        $qry = "CALL usp_tmperr_i1('{$fact_cd}','{$wrkctr_cd}','{$prt_nbr_cd}','{$err_cd}','{$wrk_ordr_no}',{$err_qty},'{$emp_id}',@res,@msg)";

        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result = $this->mes_m->trans_sp_result($result->data, $result);
        $result->param = $param;
        $result->qry = $qry;

        if (!$this->db->trans_status() || !$result->result){
            $result->result = false;
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
//            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '불량이 저장 되었습니다.';
            $this->db->trans_commit();
        }

        exit(json_encode($result));
    }

    private function _get_curr_result_status($param){
//        exit(json_encode($param));

        $result = $this->mes_m->get_response_data_form();

        $fact_cd = $param['where']['hidden_fact_cd'];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $wrk_ordr_no = $param['where']['hidden_wrk_ordr_no'];

        // 생산총수량
        $qry = "SELECT SUM(a.prct_qty) as sum_prct_qty, MAX(b.base_unit) as base_unit, MAX(b.lot_size) as lot_size, MAX(c.cd_nm) AS base_unit_nm
                FROM tpb_machrslthstry a
                JOIN tbm_prtnbrinfo b ON b.prt_nbr_cd = a.prt_nbr_cd AND a.fact_cd = b.fact_cd AND b.use_yn = 'Y'
                JOIN tbc_codeinfo c ON b.base_unit = c.cd AND c.up_cd = 'unit_cd'
                WHERE a.fact_cd = '{$fact_cd}'
                AND a.wrkctr_cd = '{$wrkctr_cd}'
                AND a.wrk_ordr_no = '{$wrk_ordr_no}'
                AND a.del_yn = 'N'
                AND a.mach_cd = (SELECT mach_cd FROM tbp_wrkctrmachinfo WHERE fact_cd = '{$fact_cd}' AND wrkctr_cd = '{$wrkctr_cd}')";

        $result->total_prd = $this->db->query($qry)->row();
        $result->query_list[] = $qry;

        // 실적수량 = 총입고수량.
        $qry = "SELECT SUM(a.prct_qty) as sum_res_qty, MAX(b.base_unit) as base_unit, MAX(b.lot_size) as lot_size, MAX(c.cd_nm) AS base_unit_nm
                FROM tpb_machrslthstry a
                JOIN tbm_prtnbrinfo b ON b.prt_nbr_cd = a.prt_nbr_cd AND a.fact_cd = b.fact_cd AND b.use_yn = 'Y'
                JOIN tbc_codeinfo c ON b.base_unit = c.cd AND c.up_cd = 'unit_cd'
                WHERE a.fact_cd = '{$fact_cd}'
                AND a.wrkctr_cd = '{$wrkctr_cd}'
                AND a.wrk_ordr_no = '{$wrk_ordr_no}'
                AND a.del_yn = 'N'
                AND rst_aply_yn = 'Y' 
                AND a.mach_cd = (SELECT mach_cd FROM tbp_wrkctrmachinfo WHERE fact_cd = '{$fact_cd}' AND wrkctr_cd = '{$wrkctr_cd}')";

        $result->total_res = $this->db->query($qry)->row();
        $result->query_list[] = $qry;

        exit(json_encode($result));
    }

    private function _get_chk_run_hstry($param){
//        exit(json_encode($param));

        $result = $this->mes_m->get_response_data_form();

        $fact_cd = $param['where']['fact_cd'];
        $wrkctr_cd = $param['where']['selected_wrkctr_cd'];

        $qry = "SELECT COUNT(*) as cnt
                FROM tpb_runstophstry a
                JOIN tpb_curwrkctrstaus b ON a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd AND a.wrk_ordr_no = b.wrk_ordr_no 
                WHERE b.fact_cd = '{$fact_cd}'
                AND b.wrkctr_cd = '{$wrkctr_cd}'
                AND a.staus = 'R'
                AND a.del_yn = 'N'";
        $result->cnt = $this->db->query($qry)->row()->cnt;
        if (!$result->cnt){
            $result->msg = '가동된 적이 없어 실적등록을 할 수 없습니다.';
        }
        exit(json_encode($result));
    }

    private function _delete_mtrl_prdctmove_mgt($param){
        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        for($i=0; $i < count($param); $i++){
            $qry = "CALL usp_prdctmove_d1(
                    '{$param[$i]['fact_cd']}',
                    '{$param[$i]['move_no']}',
                    '{$param[$i]['move_dt']}',
                    '{$param[$i]['prt_nbr_cd']}',
                    '{$param[$i]['lotno']}',
                    '{$param[$i]['move_qty']}',
                    '{$param[$i]['move_unit']}',
                    '{$param[$i]['from_fact_cd']}',
                    '{$param[$i]['from_whs_cd']}',
                    '{$param[$i]['from_loc_cd']}',
                    '{$param[$i]['to_fact_cd']}',
                    '{$param[$i]['to_whs_cd']}',
                    '{$param[$i]['to_loc_cd']}',
                    '{$sess}',
                    @out_result,
                    @out_message
                    );";
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this->db->trans_status() === FALSE || !$result->result) {
                $this->db->trans_rollback();
                exit(json_encode($result));
            }
        }
        if ($this->db->trans_status()){
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '삭제되었습니다.';
            $this->db->trans_commit();
        }else{
            $result->msg = '삭제되지 않았습니다.';
            $this->db->trans_rollback();
        }
        exit(json_encode($result));
    }

    private function _save_mtrl_prdctmove_mgt($param){
        $records = $param['records'];
        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        if($records['cu'] === 'c'){
            $qry = "CALL usp_prdctmove_i1(
                    '{$records['fact_cd']}',
                    '{$records['move_dt']}',
                    '{$records['prt_nbr_cd']}',
                    '{$records['lotno']}',
                    '{$param['move_qty']}',
                    '{$records['move_unit']}',
                    '{$records['from_fact_cd']}',
                    '{$records['from_whs_cd']}',
                    '{$records['from_loc_cd']}',
                    '{$records['to_fact_cd']}',
                    '{$records['to_whs_cd']}',
                    '{$records['to_loc_cd']}',
                    '{$sess}',
                    @out_result,
                    @out_message
                    );";
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        }else if($records['cu'] === 'u'){
            $qry = "CALL usp_prdctmove_u1(
                    '{$records['fact_cd']}',
                    '{$records['move_no']}',
                    '{$records['move_dt']}',
                    '{$records['prt_nbr_cd']}',
                    '{$records['lotno']}',
                    '{$param['move_qty']}',
                    '{$records['move_unit']}',
                    '{$records['from_fact_cd']}',
                    '{$records['from_whs_cd']}',
                    '{$records['from_loc_cd']}',
                    '{$records['to_fact_cd']}',
                    '{$records['to_whs_cd']}',
                    '{$records['to_loc_cd']}',
                    '{$sess}',
                    @out_result,
                    @out_message
                    );";
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        }

        $result = $this->mes_m->trans_sp_result($result->data, $result);
        if ($this->db->trans_status() === FALSE || $result->result == false){
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

    private function _save_insert_material_cancel($param){
        exit(json_encode($param));
    }

    private function _get_runstop_status_auto($param){
//        exit(json_encode($param));
        $fact_cd = $param['where']['hidden_fact_cd'];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $wrk_ordr_no = $param['like']['hidden_wrk_ordr_no'][0];
        $qry = "SELECT count(*) as cnt 
                FROM tpb_runstophstry a
                JOIN tbp_stopiteminfo b ON a.fact_cd = b.fact_cd AND a.stop_cd = b.stop_cd 
                JOIN tbc_codeinfo c ON b.stop_gbn = c.cd AND c.up_cd = 'stop_gbn'
                WHERE a.fact_cd = '{$fact_cd}'
                AND a.wrkctr_cd = '{$wrkctr_cd}'
                AND wrk_ordr_no = '{$wrk_ordr_no}'
                #AND a.staus = 'S'
                AND a.stop_cd is null";

        $qry = "
        SELECT COUNT(*) as cnt
        FROM tpb_runstophstry a  
        LEFT JOIN tbp_stopiteminfo b ON a.stop_cd = b.stop_cd AND a.fact_cd = b.fact_cd 
        JOIN tbc_codeinfo c ON a.crt_gbn = c.cd AND c.up_cd = 'crt_gbn' 
        WHERE a.fact_cd = '{$fact_cd}'
        AND a.wrkctr_cd = '{$wrkctr_cd}'
        AND a.wrk_ordr_no = '{$wrk_ordr_no}'
        AND a.staus = 'S'";

        $cnt = $this->db->query($qry)->row()->cnt;

//        $page = $param['where']['page'];
        $page = $this->_get_page($param, $cnt);
        $per_page = $param['where']['per_page'];
        $offset = $this->_page_offset($page, $per_page);

        $result = $this->mes_m->get_response_data_form();
        $result->qry_list[] = $qry;
        $result->param = $param;
        /*
        $qry = "SELECT IFNULL(b.stop_nm,'') as stop_nm, IFNULL(c.cd_nm,'') as crt_gbn_nm, IFNULL(a.wrk_tm_min, '') as wrk_tm_min, a.str_dt as str_dt, IFNULL(a.end_dt,'') as end_dt
                FROM tpb_runstophstry a
                LEFT JOIN tbp_stopiteminfo b ON a.stop_cd = b.stop_cd AND a.fact_cd = b.fact_cd
                JOIN tbc_codeinfo c ON a.crt_gbn = c.cd AND c.up_cd = 'crt_gbn'
                WHERE a.fact_cd = 'hs01'
                AND a.wrkctr_cd = 'CNC-10'
                #AND a.wrk_ordr_no = 'AI2009100010'
                AND a.staus = 'S'
                ORDER BY a.str_dt DESC
                LIMIT 0, 7;";
        */

        $qry = "
        SELECT IFNULL(b.stop_nm,'') as stop_nm
                , IFNULL(b.stop_cd,'') as stop_cd
                , IFNULL(c.cd_nm,'') as crt_gbn_nm
                , IFNULL(a.wrk_tm_min, '') as wrk_tm_min
                , a.str_dt as str_dt
                , IFNULL(a.end_dt,'') as end_dt 
        FROM tpb_runstophstry a  
        LEFT JOIN tbp_stopiteminfo b ON a.stop_cd = b.stop_cd AND a.fact_cd = b.fact_cd 
        JOIN tbc_codeinfo c ON a.crt_gbn = c.cd AND c.up_cd = 'crt_gbn' 
        WHERE a.fact_cd = '{$fact_cd}'
        AND a.wrkctr_cd = '{$wrkctr_cd}'
        AND a.wrk_ordr_no = '{$wrk_ordr_no}'
        AND a.staus = 'S'
        ORDER BY a.str_dt DESC 
        LIMIT 0, 7";

        $result->qry_list[] = $qry;
        $result->data = $this->db->query($qry)->result();
        exit(json_encode($result));
    }

    private function _get_bom_status($param){
        $fact_cd = $param['where']['hidden_fact_cd'];
        $prtnbr_cd = $param['like']['hidden_prtnbr_cd'][0];

        $qry = "SELECT COUNT(*) as cnt
                FROM tbm_bom a
                JOIN tbm_prtnbrinfo b ON a.sprt_nbr = b.prt_nbr_cd
                WHERE a.mprt_nbr = '{$prtnbr_cd}'
                AND a.fact_cd = '{$fact_cd}';";
        $cnt = $this->db->query($qry)->row()->cnt;

        $page = $this->_get_page($param, $cnt);
        $per_page = $param['where']['per_page'];
        $offset = $this->_page_offset($page, $per_page);

        $result = $this->mes_m->get_response_data_form();
        $result->qry_list[] = $qry;
        $result->param = $param;
        $qry = "SELECT b.prt_nbr_nm, a.*
                FROM tbm_bom a
                JOIN tbm_prtnbrinfo b ON a.sprt_nbr = b.prt_nbr_cd
                WHERE a.mprt_nbr = '{$prtnbr_cd}'
                AND a.fact_cd = '{$fact_cd}'
                ORDER BY a.sprt_nbr ASC
                LIMIT {$offset}, {$per_page};";
        $result->qry_list[] = $qry;
        $result->data = $this->db->query($qry)->result();
        exit(json_encode($result));
    }

    private function _save_cancel_result($param){
//        exit(json_encode($param));

        $fact_cd = $param['where']['hidden_fact_cd'];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];

        $in_emp_id = $this->session->userdata('emp_id');

        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        $result->query_list = [];

        foreach ($param['checked_rows'] as $key => $value) {
            $wrk_ordr_no = $value['ordr_no'];
            $in_mach_cd = $value['mach_cd'];
            $in_rslt_dt = $value['rslt_dt'];
            $in_prd_prt_nbr_cd = $value['prt_nbr_cd'];
            $in_prd_lotno = $value['lot_no'];

            $qry = "CALL usp_ordrnorst_d1( '{$fact_cd}', '{$wrkctr_cd}', '{$wrk_ordr_no}', '{$in_prd_prt_nbr_cd}', '{$in_prd_lotno}', '{$in_mach_cd}', '{$in_rslt_dt}', '{$in_emp_id}', @result, @msg )";

            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            $result->query_list[] = $qry;
        }


        $result->param = $param;

        if ($this->db->trans_status() === FALSE || $result->result === FALSE){
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
            $result->msg = '실적 취소되었습니다.';
        }
        exit(json_encode($result));
    }

    private function _get_result_status($param){
//        exit(json_encode($param));
        $fact_cd = $param['where']['hidden_fact_cd'];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $date1 = $param['where']['date1'];
        $date2 = $param['where']['date2'];

        /*

SELECT COUNT(*) as cnt
FROM tpb_ordrwrkrst a
JOIN tbp_wrkctrmachinfo b ON a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd
WHERE a.fact_cd = 'hs01'
AND a.wrkctr_cd = 'CNC-10'
AND a.rec_ymd BETWEEN '2020-09-14' AND '2020-09-14'
AND a.del_yn = 'N';


SELECT b.mach_cd, fnc_mach_nm(a.fact_cd,b.mach_cd) as mach_nm, a.*
FROM tpb_ordrwrkrst a
JOIN tbp_wrkctrmachinfo b ON a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd
WHERE a.fact_cd = 'hs01'
AND a.wrkctr_cd = 'CNC-10'
AND a.rec_ymd BETWEEN '2020-09-14' AND '2020-09-14'
AND a.del_yn = 'N'
ORDER BY a.inst_dt DESC
LIMIT 0, 10;

         */

        $qry = "SELECT COUNT(*) as cnt 
                FROM tpb_ordrwrkrst a
                JOIN tbp_wrkctrmachinfo b ON a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd 
                WHERE a.fact_cd = '{$fact_cd}'
                AND a.wrkctr_cd = '{$wrkctr_cd}'
                AND a.del_yn = 'N'
                AND rec_ymd BETWEEN '{$date1}' AND '{$date2}'";
        $cnt = $this->db->query($qry)->row()->cnt;

//        $page = $param['where']['page'];
        $page = $this->_get_page($param, $cnt);
        $per_page = $param['where']['per_page'];
        $offset = $this->_page_offset($page, $per_page);

        $result = $this->mes_m->get_response_data_form();
        $result->qry_list[] = $qry;
        $result->param = $param;
        $qry = "SELECT b.mach_cd, fnc_mach_nm(a.fact_cd,b.mach_cd) as mach_nm, a.* 
                FROM tpb_ordrwrkrst a
                JOIN tbp_wrkctrmachinfo b ON a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd 
                WHERE a.fact_cd = '{$fact_cd}'
                AND a.wrkctr_cd = '{$wrkctr_cd}'
                AND a.rec_ymd BETWEEN '{$date1}' AND '{$date2}'
                AND a.del_yn = 'N'
                ORDER BY a.inst_dt DESC 
                LIMIT {$offset}, {$per_page}";
        $result->qry_list[] = $qry;
        $result->msg = '조회되었습니다.';
        $result->data = $this->db->query($qry)->result();
        exit(json_encode($result));
    }

    private function _get_runstop_status($param){
//        exit(json_encode($param));
        $fact_cd = $param['where']['hidden_fact_cd'];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $date1 = $param['where']['date1'];
        $date2 = $param['where']['date2'];

        $qry = "SELECT count(*) as cnt 
                FROM tpb_runstophstry a
                JOIN tbp_stopiteminfo b ON a.fact_cd = b.fact_cd AND a.stop_cd = b.stop_cd 
                JOIN tbc_codeinfo c ON b.stop_gbn = c.cd AND c.up_cd = 'stop_gbn'
                WHERE a.fact_cd = '{$fact_cd}'
                AND a.wrkctr_cd = '{$wrkctr_cd}'
                AND rec_ymd BETWEEN '{$date1}' AND '{$date2}'";
        $cnt = $this->db->query($qry)->row()->cnt;

//        $page = $param['where']['page'];
        $page = $this->_get_page($param, $cnt);
        $per_page = $param['where']['per_page'];
        $offset = $this->_page_offset($page, $per_page);

        $result = $this->mes_m->get_response_data_form();
        $result->qry_list[] = $qry;
        $result->param = $param;
        $qry = "SELECT b.stop_cd as b_stop_cd, b.stop_nm, b.stop_gbn, c.cd, c.up_cd, c.cd_nm, a.*, IFNULL(a.end_dt, '') AS end_dt
                FROM tpb_runstophstry a
                JOIN tbp_stopiteminfo b ON a.fact_cd = b.fact_cd AND a.stop_cd = b.stop_cd 
                JOIN tbc_codeinfo c ON b.stop_gbn = c.cd AND c.up_cd = 'stop_gbn'
                WHERE a.fact_cd = '{$fact_cd}'
                AND a.wrkctr_cd = '{$wrkctr_cd}'
                AND a.rec_ymd BETWEEN '{$date1}' AND '{$date2}'
                ORDER BY a.updt_dt DESC 
                LIMIT {$offset}, {$per_page}";
        $result->qry_list[] = $qry;
        $result->data = $this->db->query($qry)->result();
        exit(json_encode($result));
    }

    private function _get_bad_status($param){
        /*
        SELECT a.*, b.err_nm, c.cd_nm, d.prt_nbr_nm
        FROM tpb_ordrerrrst a
        JOIN tbp_erriteminfo b ON a.fact_cd = b.fact_cd AND a.err_cd = b.err_cd
        JOIN tbc_codeinfo c ON b.err_gbn = c.cd AND c.up_cd = 'err_gbn'
        JOIN tbm_prtnbrinfo d ON a.fact_cd = d.fact_cd AND a.prt_nbr_no = d.prt_nbr_cd
        WHERE a.fact_cd = 'hs01'
        AND a.wrkctr_cd = 'CNC-30'
        AND a.prt_nbr_no = '14537401T-CN1'
        ORDER BY a.updt_dt DESC
        LIMIT 7
        */
        $fact_cd = $param['where']['hidden_fact_cd'];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $date1 = $param['where']['date1'];
        $date2 = $param['where']['date2'];

        $qry = "SELECT count(*) as cnt 
                FROM tpb_ordrerrrst a
                JOIN tbp_erriteminfo b ON a.fact_cd = b.fact_cd AND a.err_cd = b.err_cd 
                JOIN tbc_codeinfo c ON b.err_gbn = c.cd AND c.up_cd = 'err_gbn'
                JOIN tbm_prtnbrinfo d ON a.fact_cd = d.fact_cd AND a.prt_nbr_no = d.prt_nbr_cd 
                WHERE a.fact_cd = '{$fact_cd}'
                AND a.wrkctr_cd = '{$wrkctr_cd}'
                AND rec_ymd BETWEEN '{$date1}' AND '{$date2}'";
        $cnt = $this->db->query($qry)->row()->cnt;

//        $page = $param['where']['page'];
        $page = $this->_get_page($param, $cnt);
        $per_page = $param['where']['per_page'];
        $offset = $this->_page_offset($page, $per_page);

        $result = $this->mes_m->get_response_data_form();
        $result->qry_list[] = $qry;
        $result->param = $param;
        $qry = "SELECT a.*, b.err_nm, c.cd_nm, d.prt_nbr_nm 
                FROM tpb_ordrerrrst a
                JOIN tbp_erriteminfo b ON a.fact_cd = b.fact_cd AND a.err_cd = b.err_cd 
                JOIN tbc_codeinfo c ON b.err_gbn = c.cd AND c.up_cd = 'err_gbn'
                JOIN tbm_prtnbrinfo d ON a.fact_cd = d.fact_cd AND a.prt_nbr_no = d.prt_nbr_cd 
                WHERE a.fact_cd = '{$fact_cd}'
                AND a.wrkctr_cd = '{$wrkctr_cd}'
                AND rec_ymd BETWEEN '{$date1}' AND '{$date2}'
                ORDER BY a.updt_dt DESC 
                LIMIT {$offset}, {$per_page}";
        $result->qry_list[] = $qry;
        $result->data = $this->db->query($qry)->result();
        exit(json_encode($result));
    }

  private function _get_tmp_bad_status($param){
//        exit(json_encode($param));

    $fact_cd = $param['where']['hidden_fact_cd'];
    $wrkctr_cd = $param['like']['wrkctr_cd'][0];
//        $date1 = $param['where']['date1'];
//        $date2 = $param['where']['date2'];
    $wrk_ordr_no = $param['where']['hidden_wrk_ordr_no'];

    $qry = "SELECT COUNT(*) as cnt
                FROM tpb_wrkctrerrrst a
                JOIN tbc_userinfo b ON a.inst_id = b.emp_id
                JOIN tbp_erriteminfo c ON a.fact_cd = c.fact_cd AND a.err_cd = c.err_cd
                WHERE a.fact_cd = '{$fact_cd}'
                AND a.wrkctr_cd = '{$wrkctr_cd}'
                AND a.wrk_ordr_no = '{$wrk_ordr_no}'";
    $cnt = $this->db->query($qry)->row()->cnt;

//        $page = $param['where']['page'];
    $page = $this->_get_page($param, $cnt);
    $per_page = $param['where']['per_page'];
    $offset = $this->_page_offset($page, $per_page);

    $result = $this->mes_m->get_response_data_form();
    $result->qry_list[] = $qry;
    $result->param = $param;

    $qry = "SELECT b.emp_nm, c.err_nm, a.* 
                FROM tpb_wrkctrerrrst a
                JOIN tbc_userinfo b ON a.inst_id = b.emp_id
                JOIN tbp_erriteminfo c ON a.fact_cd = c.fact_cd AND a.err_cd = c.err_cd
                WHERE a.fact_cd = '{$fact_cd}'
                AND a.wrkctr_cd = '{$wrkctr_cd}'
                AND a.wrk_ordr_no = '{$wrk_ordr_no}'
                ORDER BY a.inst_dt DESC
                LIMIT {$offset},{$per_page}";
    $result->qry_list[] = $qry;
    $result->data = $this->db->query($qry)->result();
    exit(json_encode($result));
  }

    private function _delete_insert_material($param){
//        exit(json_encode($param));

        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        $result->param = $param;
        $fact_cd = $param['where']['hidden_fact_cd'];
        foreach ($param['checked_rows'] as $value) {
            $result->valuee[] = $value;
            /*
                IN `in_fact_cd` VARCHAR(20),
                IN `in_prt_nbr_cd` VARCHAR(20),
                IN `in_lotno` VARCHAR(20),
                IN `in_from_loc_cd` VARCHAR(20),
                IN `in_to_loc_cd` VARCHAR(20),
                IN `in_inst_id` VARCHAR(20),
                OUT `out_result` INT,
                OUT `out_message` VARCHAR(100)
            */

            $lotno = $value['lotno'];
            $prt_nbr_cd = $value['prt_nbr_cd'];
            $whs_cd = $value['whs_cd']; //
            $from_loc_cd = $value['loc_cd'];

            $sess = $this->session->userdata('emp_id');
            $qry = "CALL usp_wrkctrinputmaterial_i1('{$fact_cd}', '{$prt_nbr_cd}', '{$lotno}', '{$from_loc_cd}', '*', '{$sess}', @result, @msg)";
            $result->qry_list[] = $qry;
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this->db->trans_status() === FALSE  || $result->result == false){
                $result->msg = '적용되지 않았습니다.';
                $this->db->trans_rollback();
                exit(json_encode($result));
            }

        }

        if ($this->db->trans_status()){
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '적용되었습니다.';
            $this->db->trans_commit();
        }else{
            $result->msg = '적용되지 않았습니다.';
            $this->db->trans_rollback();
        }
        $this->db->trans_rollback();

        exit(json_encode($result));
    }

    private function _save_work_complete($param){
        exit(json_encode($param));
    }

    private function _save_order_complete($param){
        $in_fact_cd = $param['where']['fact_cd'];
        $in_wrkctr_cd = $param['where']['selected_wrkctr_cd'];
        $in_wrkord_no = $param['row_info']['wrk_ordr_no'];
        $in_ordrprtnbr_no = $param['row_info']['prt_nbr_cd'];
//        $in_runstop_cd = $param['row_info']['staus_cd'];
        $in_runstop_cd = $param['row_info']['staus_cd'] == 'R' ? '' : $param['where']['stop_cd'];
        $in_inst_id = $this->session->userdata('emp_id');
//        $qry = "CALL usp_wrkordcplt_b1('{$in_fact_cd}', '{$in_wrkctr_cd}', '{$in_wrkord_no}', '{$in_ordrprtnbr_no}', '{$in_runstop_cd}', '{$in_inst_id}', @result, @msg)";
        $qry = "CALL usp_wrkordcplt_b1('{$in_fact_cd}', '{$in_wrkctr_cd}', '{$in_wrkord_no}', '{$in_ordrprtnbr_no}', '{$in_inst_id}', @result, @msg)";

        $result = $this->mes_m->get_response_data_form();
        $result->sp_qry = $qry;
        $result->param = $param;
        $this->db->trans_begin();
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result = $this->mes_m->trans_sp_result($result->data, $result);
        if ($this->db->trans_status() === FALSE || $result->result ==false){
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
            $result->msg = '지시가 완료되었습니다.';
        }
        exit(json_encode($result));
    }

    private function _save_runstop($param){

        $in_fact_cd = $param['where']['fact_cd'];
        $in_wrkctr_cd = $param['where']['selected_wrkctr_cd'];
        $in_wrkord_no = $param['row_info']['wrk_ordr_no'];
        $in_ordrprtnbr_no = $param['row_info']['prt_nbr_cd'];
        $in_staus_cd = $param['row_info']['staus_cd'] == 'R' ? 'S' : 'R';   // 현재 상태가 R이면 비가동시키고, S이면 가동시키기 때문.
//        $in_runstop_cd = $param['row_info']['staus_cd'] == 'R' ? '' : $param['where']['stop_cd'];
        $in_runstop_cd = $in_staus_cd == 'S' ? $param['row_info']['stop_cd'] : 'NULL';
        $in_inst_id = $this->session->userdata('emp_id');
        $in_mach_cd = $param['row_info']['mach_cd'];

        $qry = "CALL usp_machrunstophstry_b1( '{$in_fact_cd}' ,'{$in_wrkctr_cd}' ,'{$in_mach_cd}' ,'{$in_staus_cd}' ,NULL ,'20' ,'{$in_inst_id}' , @result , @msg);";

        $result = $this->mes_m->get_response_data_form();
        $result->sp_qry1 = $qry;
        $result->param = $param;
        $this->db->trans_begin();
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);

        $result = $this->mes_m->trans_sp_result($result->data, $result);
        $result->spresult = $result->data;

        if ($this->db->trans_status() === FALSE || $result->result === FALSE){
//        if ($this->db->trans_status() === FALSE ){
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
            if ($in_staus_cd == 'R'){
                $result->msg = '가동되었습니다.';
            }else{
                $result->msg = '비가동되었습니다.';
            }
        }
        exit(json_encode($result));

    }

    private function _save_stop_reason($param){
//        exit(json_encode($param));
        $result = $this->mes_m->get_response_data_form();
        $fact_cd = $param['where']['hidden_fact_cd'];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $stop_cd = $param['where']['stop_cd'];
        $wrk_ordr_no = $param['where']['hidden_wrk_ordr_no'];
        $emp_id = $this->session->userdata('emp_id');
        $this->db->trans_begin();
        $qry = "UPDATE tpb_curwrkctrstaus SET stop_cd = '{$stop_cd}' WHERE fact_cd = '{$fact_cd}' AND wrkctr_cd = '{$wrkctr_cd}'";
        $this->db->query($qry);

        /*
        CREATE DEFINER=`momos`@`%` PROCEDURE `mes`.`usp_machstopcdset_i1`(
            IN `in_fact_cd`        VARCHAR(20),
            IN `in_wrkctr_cd`      VARCHAR(20),
            IN `in_wrk_ord_no`     VARCHAR(20),
          IN `in_stop_cd`        VARCHAR(20),
          IN `in_inst_id`        VARCHAR(20),

          ##설비(10),사람(20)
            OUT `out_result` INT,
            OUT `out_message` VARCHAR(100)
        )
        */
        $qry = "CALL usp_machstopcdset_i1( '{$fact_cd}' ,'{$wrkctr_cd}' ,'{$wrk_ordr_no}' ,'{$stop_cd}' ,'{$emp_id}' ,@res,@msg )";

        $result->qry_list[] = $qry;
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result = $this->mes_m->trans_sp_result($result->data, $result);

        if (!$this->db->trans_status() || !$result->result){
            $result->result = false;
            //$result->msg = '저장되지 않았습니다.';
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
            $result->qry = $this->db->last_query();
        $result->result = true;
        $result->msg = '비가동 사유가 저장되었습니다.';
        $this->db->trans_commit();
    }

exit(json_encode($result));
//        return $this->mes_m->trans_result($result, "저장되었습니다.", "저장되지 않았습니다.");
}

private function _save_stop_reason_auto($param){
//        exit(json_encode($param));
        /*
        like:
        wrkctr_cd: (2) ["CNC-10", "both"]
        __proto__: Object
        order_by: ""
        stop_cd: "A0802"
        where:
        hidden_fact_cd: "hs01"
        hidden_wrk_ordr_no: "AI2009100010"
        page: "1"
        per_page: "10"
        stop_cd: "A0802"
        stop_gbn: "A08"
        stop_gbn_page: "1"
        stop_gbn_per_page: "10"
        stop_gbn_total: "17"
        str_dt: "2020-09-16 10:18:36"

        UPDATE tpb_runstophstry
        SET stop_cd = 'stop_cd'
        WHERE fact_cd = 'hs01'
        AND wrkctr_cd = 'CNC-10'
        AND wrk_ordr_no = 'AI2009100010'
        AND str_dt = '2020-09-15 14:19:30'
        AND staus = 'S';

         */

        $result = $this->mes_m->get_response_data_form();
        $stop_cd = $param['where']['stop_cd'];
        $fact_cd = $param['where']['hidden_fact_cd'];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $wrk_ordr_no = $param['where']['hidden_wrk_ordr_no'];
        $str_dt = $param['where']['str_dt'];

        $qry = "
        UPDATE tpb_runstophstry
        SET stop_cd = '{$stop_cd}'
        WHERE fact_cd = '{$fact_cd}'
        AND wrkctr_cd = '{$wrkctr_cd}'
        AND wrk_ordr_no = '{$wrk_ordr_no}'
        AND str_dt = '{$str_dt}'
        AND staus = 'S';
        ";

        $this->db->trans_begin();

        $this->db->query($qry);

        if ($this->db->trans_status()){
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '적용되었습니다.';
            $this->db->trans_commit();
        }else{
            $result->msg = '적용되지 않았습니다.';
            $this->db->trans_rollback();
        }

        exit(json_encode($result));
    }

    private function _save_orderno_result($param){
//        exit(json_encode($param));
        $fact_cd = $param['where']['hidden_fact_cd'];           // 공장코드
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];            // 작업장 코드
        $wrk_ordr_no = $param['where']['hidden_wrk_ordr_no'];   // 작업지시번호
        $mprt_nbr_cd = $param['like']['hidden_prtnbr_cd'][0];   // 모품번(생산품번) 번호
        $order_qry = $param['like']['order_qty'][0];            // 생산 목표량
        $orderno_result = $param['like']['orderno_result'][0];  // 생산 실적
        $prd_good_qty = $param['like']['prd_good_qty'][0];      // 양품 수량
        $err_cd = $param['where']['err_cd'];                    // 불량 코드
        $err_qty = $param['like']['err_qty'][0];                  // 불량 수량
        $ip = $_SERVER['REMOTE_ADDR'];                          // IP
        $sess = $this->session->userdata('emp_id');        // 입력자 아이디

        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        $result->param = $param;
//        $qry = "CALL usp_ordrnorst_i1('{$fact_cd}','{$wrkctr_cd}','{$wrk_ordr_no}','{$mprt_nbr_cd}',{$orderno_result},{$prd_good_qty},'{$err_cd}',{$err_qty},'{$ip}','{$sess}',@res,@msg)";
        $qry = "CALL usp_ordrnorst_i1('{$fact_cd}','{$wrkctr_cd}','{$wrk_ordr_no}','{$mprt_nbr_cd}',{$orderno_result},{$prd_good_qty},{$err_qty},'{$ip}','{$sess}',@res,@msg)";
        $result->qry_list[] = $qry;
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result = $this->mes_m->trans_sp_result($result->data, $result);


        if (!$this->db->trans_status() || !$result->result){
            $result->result = false;
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '실적이 등록 되었습니다.';
            $this->db->trans_commit();
        }

        exit(json_encode($result));
    }

    private function _get_stop_codes($param){
        $result = $this->mes_m->get_response_data_form();
        $result->param = $param;
        $fact_cd = $param['where']['hidden_fact_cd'];
        $stop_gbn = $param['where']['stop_gbn'];

        $cnt = $this->db->query("
        SELECT COUNT(*) as cnt
        FROM tbp_stopiteminfo a
        JOIN tbc_codeinfo b ON a.stop_gbn = b.cd AND b.up_cd = 'stop_gbn' AND b.use_yn = 'Y'
        WHERE a.fact_cd = '{$fact_cd}'
        AND a.use_yn = 'Y'
        AND a.stop_gbn = '{$stop_gbn}'
        ")->row()->cnt;

        $page = $this->_get_page($param, $cnt);
        $per_page = $param['where']['per_page'];
        $offset = $this->_page_offset($page, $per_page);
        $qry = "SELECT * 
                FROM tbp_stopiteminfo a
                JOIN tbc_codeinfo b ON a.stop_gbn = b.cd AND b.up_cd = 'stop_gbn' AND b.use_yn = 'Y'
                WHERE a.fact_cd = '{$fact_cd}'
                AND a.use_yn = 'Y'
                AND a.stop_gbn = '{$stop_gbn}'
                ORDER BY a.seq ASC 
                LIMIT {$offset}, {$per_page}";
        $result->data = $this->db->query($qry)->result();
        $result->qry = $this->db->last_query();
        $result->page = $page;
        exit(json_encode($result));
    }

    private function _get_err_codes($param){
        $result = $this->mes_m->get_response_data_form();
        $result->param = $param;
        $fact_cd = $param['where']['hidden_fact_cd'];
        $err_gbn = $param['where']['err_gbn'];

        $cnt = $this->db->query("
        SELECT COUNT(*) as cnt
        FROM tbp_erriteminfo a
        JOIN tbc_codeinfo b ON a.err_gbn = b.cd AND b.up_cd = 'err_gbn' AND b.use_yn = 'Y'
        WHERE a.fact_cd = '{$fact_cd}'
        AND a.use_yn = 'Y'
        AND a.err_gbn = '{$err_gbn}'
        ")->row()->cnt;



//        $page = $param['where']['page'];
        $page = $this->_get_page($param, $cnt);
        $per_page = $param['where']['per_page'];
        $offset = $this->_page_offset($page, $per_page);

        $qry = "SELECT * 
                FROM tbp_erriteminfo a
                JOIN tbc_codeinfo b ON a.err_gbn = b.cd AND b.up_cd = 'err_gbn' AND b.use_yn = 'Y'
                WHERE a.fact_cd = '{$fact_cd}'
                AND a.use_yn = 'Y'
                AND a.err_gbn = '{$err_gbn}'
                ORDER BY a.seq ASC 
                LIMIT {$offset}, {$per_page}";
        $result->data = $this->db->query($qry)->result();
        $result->qry = $this->db->last_query();
        $result->page = $page;
        exit(json_encode($result));
    }

    private function _get_orderno_result($param){
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $prtnbr_cd = $param['like']['hidden_prtnbr_cd'][0];
        $ip = $_SERVER['REMOTE_ADDR'];
        $fact_cd = $param['where']['hidden_fact_cd'];
        // 생산창고
        $whs_cd = $this->db->where('whs_nm', '생산창고')->get('tbm_whsinfo')->row()->whs_cd;
        $result = $this->mes_m->get_response_data_form();

        $result->data = $this->db
            ->select("a.fact_cd, a.wrkctr_cd, b.wrkctr_nm, 
                CASE WHEN IFNULL(c.staus, 'S') = 'S'
                    THEN '비가동'
                    ELSE '가동'
                END AS staus,
                IFNULL(c.str_tm, '') as str_tm, IFNULL(e.prt_nbr_cd,'') as prt_nbr_cd, IFNULL(e.prt_nbr_nm,'') as prt_nbr_nm,
                IFNULL(c.main_wrkr,'') as main_wrkr, IFNULL(c.wrkr_qty,0) as wrkr_qty,
                c.wrk_ordr_no as wrk_ordr_no,
                IFNULL(g.ordr_qty,0) as ordr_qty,	# 생산 목표
                IFNULL(d.prd_qty_meas,0) as prd_qty_meas,	# 생산 목표
                IFNULL(d.prd_good_qty, 0) as prd_good_qty, IFNULL(d.err_qty, 0) as err_qty, c.daynight_gbn, IFNULL(f.cd_nm,'') as daynight_gbn_nm,
                h.emp_nm, e.lot_size")
            ->join('tbp_wrkctrinfo b', "a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd AND b.use_yn = 'Y'")
            ->join('tpb_curwrkctrstaus c', 'a.fact_cd = c.fact_cd AND a.wrkctr_cd = c.wrkctr_cd', 'left')
            ->join('tpb_ordrwrkrst d', "a.fact_cd = d.fact_cd AND a.wrkctr_cd = d.wrkctr_cd AND d.del_yn = 'N' AND c.wrk_ordr_no = d.wrk_ordr_no", 'left')
            ->join('tbm_prtnbrinfo e', 'c.prt_nbr_cd = e.prt_nbr_cd', 'left')
            ->join('tbc_codeinfo f', "f.up_cd = 'day_night' AND f.cd = c.daynight_gbn", 'left')
            ->join('tpb_dalywrkordrpln g', 'g.fact_cd = c.fact_cd AND c.wrkctr_cd = g.wrkctr_cd AND g.wrk_ordr_no = c.wrk_ordr_no', 'left')
            // LEFT JOIN tbc_userinfo h ON c.main_wrkr = h.emp_id
            ->join('tbc_userinfo h', 'c.main_wrkr = h.emp_id', 'left')
            ->where('a.ip', $ip)
            ->where('a.fact_cd', $fact_cd)
            ->where('a.wrkctr_cd', $wrkctr_cd)
            ->where('b.use_yn', 'Y')
            ->get('tpp_wrkctrselct a')->result();
        $result->qry[] = $this->db->last_query();
//        $qry = "SELECT MAX(a.prt_nbr_cd) AS prt_nbr_cd, SUM(a.stck_qty) AS sum, MAX(c.prt_nbr_nm) AS prt_nbr_nm, MAX(b.base_qty) AS base_qty, MAX(b.base_unit) AS base_unit
//                    , MAX(d.cd_nm) AS base_unit_nm, MAX(b.cmpnt_qty) AS cmpnt_qty, MAX(b.cmpnt_unit) AS cmpnt_unit, MAX(e.cd_nm) AS cmpnt_unit_nm
//                FROM twm_realstck a
//                JOIN tbm_bom b ON a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.sprt_nbr AND b.mprt_nbr = '14537401T-CN1'
//                JOIN tbm_prtnbrinfo c ON a.prt_nbr_cd = c.prt_nbr_cd
//                JOIN tbc_codeinfo d ON b.base_unit = d.cd AND d.up_cd = 'unit_cd'
//                JOIN tbc_codeinfo e ON b.cmpnt_unit = e.cd AND e.up_cd = 'unit_cd'
//                WHERE a.stck_whs_cd = 'W2100' AND a.stck_loc_cd = 'CNC-30'
//                GROUP BY a.prt_nbr_cd
//        ";

        $qry = "SELECT COUNT(DISTINCT( a.prt_nbr_cd )) as cnt
                FROM twm_realstck a
                JOIN tbm_bom b ON a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.sprt_nbr AND b.mprt_nbr = '{$prtnbr_cd}'
                JOIN tbm_prtnbrinfo c ON a.prt_nbr_cd = c.prt_nbr_cd 
                JOIN tbc_codeinfo d ON b.base_unit = d.cd AND d.up_cd = 'unit_cd'
                JOIN tbc_codeinfo e ON b.cmpnt_unit = e.cd AND e.up_cd = 'unit_cd'
                WHERE a.fact_cd = '{$fact_cd}' 
                AND a.stck_whs_cd = '{$whs_cd}' 
                AND a.stck_loc_cd = '{$wrkctr_cd}'";
        $cnt = $this->db->query($qry)->row()->cnt;

        $page = $this->_get_page($param, $cnt);
        $per_page = $param['where']['per_page'];
        $offset = $this->_page_offset($page, $per_page);
        $qry = "SELECT MAX(a.prt_nbr_cd) AS prt_nbr_cd, SUM(a.stck_qty) AS sum, MAX(c.prt_nbr_nm) AS prt_nbr_nm, MAX(b.base_qty) AS base_qty, MAX(b.base_unit) AS base_unit
                    , MAX(d.cd_nm) AS base_unit_nm, MAX(b.cmpnt_qty) AS cmpnt_qty, MAX(b.cmpnt_unit) AS cmpnt_unit, MAX(e.cd_nm) AS cmpnt_unit_nm
                FROM twm_realstck a
                JOIN tbm_bom b ON a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.sprt_nbr AND b.mprt_nbr = '{$prtnbr_cd}'
                JOIN tbm_prtnbrinfo c ON a.prt_nbr_cd = c.prt_nbr_cd 
                JOIN tbc_codeinfo d ON b.base_unit = d.cd AND d.up_cd = 'unit_cd'
                JOIN tbc_codeinfo e ON b.cmpnt_unit = e.cd AND e.up_cd = 'unit_cd'
                WHERE a.fact_cd = '{$fact_cd}' 
                AND a.stck_whs_cd = '{$whs_cd}' 
                AND a.stck_loc_cd = '{$wrkctr_cd}'
                GROUP BY a.prt_nbr_cd
                LIMIT {$offset}, {$per_page}";
        $result->inserted_materials = $this->db->query($qry)->result();

        $result->result = true;
        $result->param = $param;
        $result->msg = '조회되었습니다';
        $result->qry[] = $this->db->last_query();
        exit(json_encode($result));
    }

    private function _save_insert_material($param){
//        exit(json_encode($param));

        /*
         CALL usp_wrkctrinputmaterial_i1('hs01', '14537401S', 'lotno1', '*', 'CNC-30', 'yohan', @result, @msg);
         */

        /*
        $param
        like: {wrkctr_cd: ["CNC-30", "both"], hidden_prtnbr_cd: ["14537401T-CN1", "both"],…}
        hidden_prtnbr_cd: ["14537401T-CN1", "both"]
        0: "14537401T-CN1"
        1: "both"
        hidden_prtnbr_nm: ["14537401T-CN1", "both"]
        0: "14537401T-CN1"
        1: "both"
        wrkctr_cd: ["CNC-30", "both"]
        0: "CNC-30"
        1: "both"
        order_by: ""
        checked_rows: [
            0: {lotno: "lotno1", prt_nbr_cd: "14537401S", whs_cd: "W2100", loc_cd: "CNC-30"}
            1: {lotno: "lotno2", prt_nbr_cd: "14537401S", whs_cd: "W2100", loc_cd: "*"}
        ]
        where: {0: "14537401S", hidden_fact_cd: "hs01", page_for_lot: "1", page_for_prt: "1", per_page: "10",…}
        0: "14537401S"
        hidden_fact_cd: "hs01"
        page_for_lot: "1"
        page_for_prt: "1"
        per_page: "10"
        search_type: "lot"

        */
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        $result->param = $param;
        $fact_cd = $param['where']['hidden_fact_cd'];
        $to_loc_cd = $param['like']['wrkctr_cd'][0];
        foreach ($param['checked_rows'] as $value) {
            $result->valuee[] = $value;
            /*
                IN `in_fact_cd` VARCHAR(20),
                IN `in_prt_nbr_cd` VARCHAR(20),
                IN `in_lotno` VARCHAR(20),
                IN `in_from_loc_cd` VARCHAR(20),
                IN `in_to_loc_cd` VARCHAR(20),
                IN `in_inst_id` VARCHAR(20),
                OUT `out_result` INT,
                OUT `out_message` VARCHAR(100)
            */

            $lotno = $value['lotno'];
            $prt_nbr_cd = $value['prt_nbr_cd'];
            $whs_cd = $value['whs_cd'];
            $from_loc_cd = $value['loc_cd'];

            $sess = $this->session->userdata('emp_id');
            $qry = "CALL usp_wrkctrinputmaterial_i1('{$fact_cd}', '{$prt_nbr_cd}', '{$lotno}', '{$from_loc_cd}', '{$to_loc_cd}', '{$sess}', @result, @msg)";
            $result->qry_list[] = $qry;
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this -> db -> trans_status() === FALSE || !$result->result) {
                $this->db->trans_rollback();
                exit(json_encode($result));
            }

        }

        if ($this->db->trans_status()){
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '적용되었습니다.';
            $this->db->trans_commit();
        }else{
            $result->msg = '적용되지 않았습니다.';
            $this->db->trans_rollback();
        }


        exit(json_encode($result));
    }

    private function _get_curr_material_list_in_man_whs($param){
        // 생산창고 코드 : W2100
        $man_whd_cd = 'W2100';

        $result = $this->mes_m->get_response_data_form();
        $fact_cd = $param['where']['hidden_fact_cd'];
        $prt_nbr_cd = $param['like']['hidden_prtnbr_cd'][0];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $search_type = '';
        if($param['where']['search_type'] == 'lot'){ $search_type = 'b.lotno'; }
        else if($param['where']['search_type'] == 'prt'){ $search_type = 'b.prt_nbr_cd'; }
        // lot상태가 설정되있지 않아서 일단 보류 20200911
        $qry = "SELECT COUNT(*) as cnt
                FROM tbm_bom a
                JOIN twm_realstck b ON a.fact_cd = b.fact_cd AND a.sprt_nbr = b.prt_nbr_cd AND b.stck_whs_cd = '{$man_whd_cd}' AND b.stck_qty > 0
                #JOIN twm_lotstaus c ON a.fact_cd = c.fact_cd AND a.sprt_nbr = c.prt_nbr_cd AND b.lotno = c.lotno AND c.lot_staus_cd != 90
                WHERE a.fact_cd = '{$fact_cd}'
                AND b.stck_whs_cd = '{$man_whd_cd}'
                AND b.stck_loc_cd != '{$wrkctr_cd}'
                AND a.mprt_nbr = '{$prt_nbr_cd}'
                AND a.use_yn = 'Y'
                ";

        $cnt = $this->db->query($qry)->row()->cnt;

        $per_page = $param['where']['per_page'];
        $page = 1;
        if($param['where']['search_type'] == 'lot'){ $page = $param['where']['page_for_lot']; }
        else if($param['where']['search_type'] == 'prt'){ $page = $param['where']['page_for_prt']; }
        $offset = $this->_page_offset($page, $per_page);
        // lot상태가 설정되있지 않아서 일단 보류 20200911
        $qry = "SELECT a.fact_cd, a.mprt_nbr, a.sprt_nbr, a.base_qty, a.base_unit, a.cmpnt_qty, a.cmpnt_unit, a.alt_prt_nbr_yn
                    , b.stck_whs_cd, b.stck_loc_cd, b.stck_qty, b.stck_unit, b.lotno
                    #, c.crt_ymd, c.lot_unit, c.lot_staus_cd, c.cur_stck_qty
                    , d.cd_nm
                    #, CASE
                    #    WHEN (b.stck_qty = c.cur_stck_qty)
                    #    THEN '정상'
                    #    ELSE '비정상. 체크 필요 : realstck.stck_qty 와 lotstaus.cur_stck_qty 가 불일치'
                    #END AS chk
                FROM tbm_bom a
                JOIN twm_realstck b ON a.fact_cd = b.fact_cd AND a.sprt_nbr = b.prt_nbr_cd AND b.stck_whs_cd = '{$man_whd_cd}' AND b.stck_qty > 0
                #JOIN twm_lotstaus c ON a.fact_cd = c.fact_cd AND a.sprt_nbr = c.prt_nbr_cd AND b.lotno = c.lotno AND c.lot_staus_cd != 90
                JOIN tbc_codeinfo d ON b.stck_unit = d.cd AND d.up_cd = 'unit_cd'
                WHERE a.fact_cd = '{$fact_cd}'
                AND b.stck_whs_cd = '{$man_whd_cd}'
                AND b.stck_loc_cd != '{$wrkctr_cd}'
                AND a.mprt_nbr = '{$prt_nbr_cd}'
                AND a.use_yn = 'Y'
                ORDER BY {$search_type} ASC
                LIMIT {$offset}, {$per_page}";

        $result->cnt = $cnt;
        $result->data = $this->db->query($qry)->result();
        $result->qry = $this->db->last_query();
        $result->param = $param;
        exit(json_encode($result));

        // ########################################################################################################
        $qry = "SELECT COUNT(*) as cnt
                    FROM tbm_bom a
                    JOIN twm_realstck b ON a.fact_cd = b.fact_cd AND a.sprt_nbr = b.prt_nbr_cd AND b.stck_whs_cd = '{$man_whd_cd}' AND b.stck_loc_cd = '*'
                    JOIN twm_lotstaus c ON a.fact_cd = c.fact_cd AND a.sprt_nbr = c.prt_nbr_cd AND b.lotno = c.lotno 
                    WHERE a.fact_cd = '{$fact_cd}' 
                    AND a.mprt_nbr = '{$prt_nbr_cd}'
                    AND a.use_yn = 'Y';
                    ";
        $cnt = $this->db->query($qry)->row()->cnt;

        $qry = "SELECT 
                        a.fact_cd, a.mprt_nbr, a.sprt_nbr, a.base_qty, a.base_unit, a.cmpnt_qty, a.cmpnt_unit, a.alt_prt_nbr_yn
                        , b.stck_whs_cd, b.stck_loc_cd, b.stck_qty, b.stck_unit, b.lotno
                        , c.crt_ymd, c.lot_unit, c.lot_staus_cd
                    FROM tbm_bom a
                    JOIN twm_realstck b ON a.fact_cd = b.fact_cd AND a.sprt_nbr = b.prt_nbr_cd AND b.stck_whs_cd = '{$man_whd_cd}' AND b.stck_loc_cd = '*'
                    JOIN twm_lotstaus c ON a.fact_cd = c.fact_cd AND a.sprt_nbr = c.prt_nbr_cd AND b.lotno = c.lotno 
                    WHERE a.fact_cd = '{$fact_cd}' 
                    AND a.mprt_nbr = '{$prt_nbr_cd}'
                    AND a.use_yn = 'Y'
                    ORDER BY {$search_type} ASC
                    LIMIT 0, 10";

        $result->cnt = $cnt;
        $result->data = $this->db->query($qry)->result;
        $result->qry = $this->db->last_query();
        $result->param = $param;
        exit(json_encode($result));
    }

    private function _get_curr_material_list_in_man_whs_prtnbr($param){
        // 생산창고 코드 : W2100
        $man_whd_cd = 'W2100';

        $result = $this->mes_m->get_response_data_form();
        $fact_cd = $param['where']['hidden_fact_cd'];
        $prt_nbr_cd = $param['like']['hidden_prtnbr_cd'][0];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $search_type = '';
        if($param['where']['search_type'] == 'lot'){ $search_type = 'b.lotno'; }
        else if($param['where']['search_type'] == 'prt'){ $search_type = 'b.prt_nbr_cd'; }
        // lot상태가 설정되있지 않아서 일단 보류 20200911
        $qry = "SELECT COUNT(*) as cnt
                FROM tbm_bom a
                JOIN twm_realstck b ON a.fact_cd = b.fact_cd AND a.sprt_nbr = b.prt_nbr_cd AND b.stck_whs_cd = '{$man_whd_cd}' AND b.stck_qty > 0
                #JOIN twm_lotstaus c ON a.fact_cd = c.fact_cd AND a.sprt_nbr = c.prt_nbr_cd AND b.lotno = c.lotno AND c.lot_staus_cd != 90
                WHERE a.fact_cd = '{$fact_cd}'
                AND b.stck_whs_cd = '{$man_whd_cd}'
                AND b.stck_loc_cd != '{$wrkctr_cd}'
                AND a.mprt_nbr = '{$prt_nbr_cd}'
                AND a.use_yn = 'Y'
                GROUP BY a.sprt_nbr 
                ";

        $cnt = $this->db->query($qry)->row()->cnt;

        $per_page = $param['where']['per_page'];
        $page = 1;
        if($param['where']['search_type'] == 'lot'){ $page = $param['where']['page_for_lot']; }
        else if($param['where']['search_type'] == 'prt'){ $page = $param['where']['page_for_prt']; }
        $offset = $this->_page_offset($page, $per_page);
        // lot상태가 설정되있지 않아서 일단 보류 20200911
        $qry = "SELECT MAX(a.mprt_nbr) as mprt_nbr
                    , MAX(a.sprt_nbr) as sprt_nbr
                    , SUM(a.base_qty) as base_qty
                    , MAX(a.base_unit) as base_unit
                    , MAX(a.cmpnt_qty) as cmpnt_qty
                    , MAX(a.cmpnt_unit) as cmpnt_unit
                    , SUM(b.stck_qty) as stck_qty
                    , MAX(b.stck_unit) as stck_unit
                    , MAX(d.cd_nm) as cd_nm
                FROM tbm_bom a
                JOIN twm_realstck b ON a.fact_cd = b.fact_cd AND a.sprt_nbr = b.prt_nbr_cd AND b.stck_whs_cd = '{$man_whd_cd}' AND b.stck_qty > 0
                #JOIN twm_lotstaus c ON a.fact_cd = c.fact_cd AND a.sprt_nbr = c.prt_nbr_cd AND b.lotno = c.lotno AND c.lot_staus_cd != 90
                JOIN tbc_codeinfo d ON b.stck_unit = d.cd AND d.up_cd = 'unit_cd'
                WHERE a.fact_cd = '{$fact_cd}'
                AND b.stck_whs_cd = '{$man_whd_cd}'
                AND b.stck_loc_cd != '{$wrkctr_cd}'
                AND a.mprt_nbr = '{$prt_nbr_cd}'
                AND a.use_yn = 'Y'
                GROUP BY a.sprt_nbr 
                ORDER BY {$search_type} ASC
                LIMIT {$offset}, {$per_page}";

        $result->cnt = $cnt;
        $result->data = $this->db->query($qry)->result();
        $result->qry = $this->db->last_query();
        $result->param = $param;
        exit(json_encode($result));
    }

    private function _get_curr_material_list_in_man_whs_loc($param){
//        exit(json_encode($param));
        // 생산창고 코드 : W2100
        $man_whd_cd = 'W2100';

        $result = $this->mes_m->get_response_data_form();
        $fact_cd = $param['where']['hidden_fact_cd'];
        $prt_nbr_cd = $param['like']['hidden_prtnbr_cd'][0];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $search_type = '';
        if($param['where']['search_type'] == 'lot'){ $search_type = 'b.lotno'; }
        else if($param['where']['search_type'] == 'prt'){ $search_type = 'b.prt_nbr_cd'; }
        // lot상태가 설정되있지 않아서 일단 보류 20200911
        $qry = "SELECT COUNT(*) as cnt
                FROM tbm_bom a
                JOIN twm_realstck b ON a.fact_cd = b.fact_cd AND a.sprt_nbr = b.prt_nbr_cd AND b.stck_whs_cd = '{$man_whd_cd}' AND b.stck_qty > 0
                #JOIN twm_lotstaus c ON a.fact_cd = c.fact_cd AND a.sprt_nbr = c.prt_nbr_cd AND b.lotno = c.lotno AND c.lot_staus_cd != 90
                WHERE a.fact_cd = '{$fact_cd}'
                AND b.stck_whs_cd = '{$man_whd_cd}'
                AND b.stck_loc_cd = '{$wrkctr_cd}'
                AND a.mprt_nbr = '{$prt_nbr_cd}'
                AND a.use_yn = 'Y'
                ";

        $cnt = $this->db->query($qry)->row()->cnt;

        $per_page = $param['where']['per_page'];
        $page = 1;
        if($param['where']['search_type'] == 'lot'){ $page = $param['where']['page_for_lot']; }
        else if($param['where']['search_type'] == 'prt'){ $page = $param['where']['page_for_prt']; }
        $offset = $this->_page_offset($page, $per_page);
        // lot상태가 설정되있지 않아서 일단 보류 20200911
        $qry = "SELECT a.fact_cd, a.mprt_nbr, a.sprt_nbr, a.base_qty, a.base_unit, a.cmpnt_qty, a.cmpnt_unit, a.alt_prt_nbr_yn
                    , b.stck_whs_cd, b.stck_loc_cd, b.stck_qty, b.stck_unit, b.lotno
                    #, c.crt_ymd, c.lot_unit, c.lot_staus_cd, c.cur_stck_qty
                    , d.cd_nm
                    #, CASE
                    #    WHEN (b.stck_qty = c.cur_stck_qty)
                    #    THEN '정상'
                    #    ELSE '비정상. 체크 필요 : realstck.stck_qty 와 lotstaus.cur_stck_qty 가 불일치'
                    #END AS chk
                FROM tbm_bom a
                JOIN twm_realstck b ON a.fact_cd = b.fact_cd AND a.sprt_nbr = b.prt_nbr_cd AND b.stck_whs_cd = '{$man_whd_cd}' AND b.stck_qty > 0
                #JOIN twm_lotstaus c ON a.fact_cd = c.fact_cd AND a.sprt_nbr = c.prt_nbr_cd AND b.lotno = c.lotno AND c.lot_staus_cd != 90
                JOIN tbc_codeinfo d ON b.stck_unit = d.cd AND d.up_cd = 'unit_cd'
                WHERE a.fact_cd = '{$fact_cd}'
                AND b.stck_whs_cd = '{$man_whd_cd}'
                AND b.stck_loc_cd = '{$wrkctr_cd}'
                AND a.mprt_nbr = '{$prt_nbr_cd}'
                AND a.use_yn = 'Y'
                ORDER BY {$search_type} ASC
                LIMIT {$offset}, {$per_page}";

        $result->cnt = $cnt;
        $result->data = $this->db->query($qry)->result();
        $result->qry = $this->db->last_query();
        $result->param = $param;
        exit(json_encode($result));
    }

    private function _get_curr_material_list_in_man_whs_loc_prtnbr($param){
//        exit(json_encode($param));
        // 생산창고 코드 : W2100
        $man_whd_cd = 'W2100';

        $result = $this->mes_m->get_response_data_form();
        $fact_cd = $param['where']['hidden_fact_cd'];
        $prt_nbr_cd = $param['like']['hidden_prtnbr_cd'][0];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $search_type = '';
        if($param['where']['search_type'] == 'lot'){ $search_type = 'b.lotno'; }
        else if($param['where']['search_type'] == 'prt'){ $search_type = 'b.prt_nbr_cd'; }
        // lot상태가 설정되있지 않아서 일단 보류 20200911
        $qry = "SELECT COUNT(*) as cnt
                FROM tbm_bom a
                JOIN twm_realstck b ON a.fact_cd = b.fact_cd AND a.sprt_nbr = b.prt_nbr_cd AND b.stck_whs_cd = '{$man_whd_cd}' AND b.stck_qty > 0
                #JOIN twm_lotstaus c ON a.fact_cd = c.fact_cd AND a.sprt_nbr = c.prt_nbr_cd AND b.lotno = c.lotno AND c.lot_staus_cd != 90
                WHERE a.fact_cd = '{$fact_cd}'
                AND b.stck_whs_cd = '{$man_whd_cd}'
                AND b.stck_loc_cd = '{$wrkctr_cd}'
                AND a.mprt_nbr = '{$prt_nbr_cd}'
                AND a.use_yn = 'Y'
                GROUP BY a.sprt_nbr 
                ";

        $cnt = $this->db->query($qry)->row()->cnt;

        $per_page = $param['where']['per_page'];
        $page = 1;
        if($param['where']['search_type'] == 'lot'){ $page = $param['where']['page_for_lot']; }
        else if($param['where']['search_type'] == 'prt'){ $page = $param['where']['page_for_prt']; }
        $offset = $this->_page_offset($page, $per_page);
        // lot상태가 설정되있지 않아서 일단 보류 20200911
        $qry = "SELECT MAX(a.mprt_nbr) as mprt_nbr
                    , MAX(a.sprt_nbr) as sprt_nbr
                    , SUM(a.base_qty) as base_qty
                    , MAX(a.base_unit) as base_unit
                    , MAX(a.cmpnt_qty) as cmpnt_qty
                    , MAX(a.cmpnt_unit) as cmpnt_unit
                    , SUM(b.stck_qty) as stck_qty
                    , MAX(b.stck_unit) as stck_unit
                    , MAX(d.cd_nm) as cd_nm
                FROM tbm_bom a
                JOIN twm_realstck b ON a.fact_cd = b.fact_cd AND a.sprt_nbr = b.prt_nbr_cd AND b.stck_whs_cd = '{$man_whd_cd}' AND b.stck_qty > 0
                #JOIN twm_lotstaus c ON a.fact_cd = c.fact_cd AND a.sprt_nbr = c.prt_nbr_cd AND b.lotno = c.lotno AND c.lot_staus_cd != 90
                JOIN tbc_codeinfo d ON b.stck_unit = d.cd AND d.up_cd = 'unit_cd'
                WHERE a.fact_cd = '{$fact_cd}'
                AND b.stck_whs_cd = '{$man_whd_cd}'
                AND b.stck_loc_cd = '{$wrkctr_cd}'
                AND a.mprt_nbr = '{$prt_nbr_cd}'
                AND a.use_yn = 'Y'
                GROUP BY a.sprt_nbr 
                ORDER BY {$search_type} ASC
                LIMIT {$offset}, {$per_page}";

        $result->cnt = $cnt;
        $result->data = $this->db->query($qry)->result();
        $result->qry = $this->db->last_query();
        $result->param = $param;
        exit(json_encode($result));
    }

    private function _get_chkcurwrkctr($param){
        $fact_cd = $param['where']['fact_cd'];
        $wrkctr_cd = $param['where']['selected_wrkctr_cd'];

        $result = $this->mes_m->get_response_data_form();
        $cnt = $this->db->select('COUNT(*) as cnt')->where('fact_cd', $fact_cd)->where('wrkctr_cd', $wrkctr_cd)->get('tpb_curwrkctrstaus')->row()->cnt;
        if(!$cnt){
            $result->result = true;

        }else{
            $result->result = false;
            $result->msg = '이미 작업지시가 되어있습니다.';
        }

        $result->cnt = $cnt;

        exit(json_encode($result));
    }

    private function _save_wrkctr_orderno($param){
//        exit(json_encode($param));

        $fact_cd = $param['where']['hidden_fact_cd'];
        $wrk_ordr_no = $param['where']['hidden_wrk_ordr_no_for_save'];
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $ip = $_SERVER['REMOTE_ADDR'];

        // tpb_dalywrkordrpln 에서 항목 가져와서 tpb_curwrkctrstaus에 항목적용
        $daly = $this->db->where('fact_cd', $fact_cd)->where('wrk_ordr_no', $wrk_ordr_no)->get('tpb_dalywrkordrpln')->row();

        // 해당 칼럼 존재여부 확인 -> 있으면 update, 없으면 insert
        $cnt = $this->db->select('COUNT(*) as cnt')->where('fact_cd', $fact_cd)->where('wrkctr_cd', $wrkctr_cd)->get('tpb_curwrkctrstaus')->row()->cnt;

        $result = $this->mes_m->get_response_data_form();
//        $this->db->where('fact_cd', $fact_cd)->where('wrk_ordr_no', $wrk_ordr_no)->where('wrkctr_cd', $wrkctr_cd)->delete('tpb_curwrkctrstaus');
        $result->cnt = $cnt;

        $main_wrkr = $this->db->where('fact_cd', $fact_cd)->where('wrkctr_cd', $wrkctr_cd)
            ->where('main_wrkr_yn', 'Y')->get('tbm_wrkctrwrkrinfo')->row();
        $result->q[] = $this->db->last_query();

        $wrkr_qty = $this->db->select('COUNT(*) as cnt')->where('fact_cd', $fact_cd)
            ->where('wrkctr_cd', $wrkctr_cd)->get('tbm_wrkctrwrkrinfo')->row()->cnt;
        $result->q[] = $this->db->last_query();

        $data = array(
//            'fact_cd' => $fact_cd,
//            'wrkctr_cd' => $wrkctr_cd,
            'wrk_ordr_no' => $wrk_ordr_no,
            'prt_nbr_cd' => $daly->ordr_prt_nbr_no, // 품번
//            'lotno' => ,
//            'prd_qty_meas' => ,
//            'prd_qty_calc' => ,
//            'prd_qty_man' => ,
//            'prd_good_qty' => ,
//            'err_qty' => ,
//            'prd_unit' => ,
            'daynight_gbn' => $daly->daynight_gbn,  // 주야 구분
            'main_wrkr' => $main_wrkr->wrkr_cd,     // 주작업자
            'wrkr_qty' => $wrkr_qty,                // 작업자수
            'shift_gbn' => $daly->shift_gbn,        // 조구분
//            'staus' => ,
//            'stop_cd' => ,
//            'use_mold_cd' => ,
//            'label_count' => ,
//            'remark' => ,
//            'rewrk_yn' => 'N',
        );

        $this->db->trans_begin();

        if($cnt){   // update
            // 현재상태가 R이면 이미 작동중으로 에러 띄우고 종료. S면 update
            $curr = $this->db->where('fact_cd', $fact_cd)->where('wrkctr_cd', $wrkctr_cd)->get('tpb_curwrkctrstaus')->row();
            if ($curr->staus == 'R'){   // 이미 동작중.
                exit(json_encode($result));
            }else{  // update
                $this->db->where('fact_cd', $fact_cd);
                $this->db->where('wrkctr_cd', $wrkctr_cd);
                $result->result = $this->db->update('tpb_curwrkctrstaus', $data);
            }
        }else{  // insert
            $data['fact_cd'] = $fact_cd;
            $data['wrkctr_cd'] = $wrkctr_cd;
            $this->db->insert('tpb_curwrkctrstaus', $data);
        }

        $qry = "UPDATE tpb_dalywrkordrpln 
                SET wrk_ordr_status = '20'
                WHERE fact_cd = '{$fact_cd}'
                AND wrk_ordr_no = '{$wrk_ordr_no}'";
        $this->db->query($qry);

        $result = $this->mes_m->trans_result($result, '저장되었습니다.', '저장되지 않았습니다.');

        exit(json_encode($result));
    }

    private function _get_wrkctr_orderno($param){
        $page = 1;
        $search_type = '';
        if (!isset($param['where']['search_type'])) {
            $page = $param['where']['page_for_all'];

        } else if ($param['where']['search_type'] == 'D') {
            $page = $param['where']['page_for_day'];
            $search_type = 'D';
        } else if ($param['where']['search_type'] == 'N') {
            $page = $param['where']['page_for_night'];
            $search_type = 'N';
        }
        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $qry = "SELECT COUNT(*) as cnt
                FROM tpb_dalywrkordrpln a
                LEFT OUTER JOIN tpb_curwrkctrstaus b 
                ON a.fact_cd = b.fact_cd 
                AND a.wrkctr_cd = b.wrkctr_cd
                AND (b.wrk_ordr_no IS NULL OR b.wrk_ordr_no = '')
                AND a.ordr_prt_nbr_no = b.prt_nbr_cd
                AND a.daynight_gbn = b.daynight_gbn
                AND a.shift_gbn = b.shift_gbn
                JOIN tbm_prtnbrinfo c ON a.ordr_prt_nbr_no = c.prt_nbr_cd AND a.fact_cd = c.fact_cd
                JOIN tbc_codeinfo d ON a.daynight_gbn = d.cd AND d.up_cd = 'day_night'
                WHERE a.fact_cd = '{$param['where']['hidden_fact_cd']}'
                AND a.wrkctr_cd = '{$wrkctr_cd}'
                AND a.wrk_ordr_dt = '{$param['where']['plan_date']}'
                AND a.daynight_gbn LIKE '%{$search_type}%'
                AND a.wrk_ordr_status = '10'";

        $cnt = $this->db->query($qry)->row()->cnt;

        if (isset($param['where']['arrow_type'])){
            if ($page > 1 && $param['where']['arrow_type'] == 'left') {
                $page--;
            }elseif($param['where']['arrow_type'] == 'right' && ($param['where']['page'] * $param['where']['per_page']) < $cnt ){
                $page++;
            }
        }

        $per_page = $param['where']['per_page'];
        $offset = $this->_page_offset($page, $per_page);

//        $qry = "SELECT *
//                FROM tpb_dalywrkordrpln a
//                LEFT OUTER JOIN tpb_curwrkctrstaus b
//                ON a.fact_cd = b.fact_cd
//                AND a.wrkctr_cd = b.wrkctr_cd
//                AND a.wrk_ordr_no = b.wrk_ordr_no
//                AND a.ordr_prt_nbr_no = b.prt_nbr_cd
//                AND a.daynight_gbn = b.daynight_gbn
//                AND a.shift_gbn = b.shift_gbn
//                JOIN tbm_prtnbrinfo c ON a.ordr_prt_nbr_no = c.prt_nbr_cd AND a.fact_cd = c.fact_cd
//                WHERE a.fact_cd = '{$param['where']['hidden_fact_cd']}'
//                AND a.wrk_ordr_dt = '{$param['where']['plan_date']}'
//                AND a.daynight_gbn LIKE '%{$param['where']['search_type']}%'";
        $qry = "SELECT a.*, c.prt_nbr_nm, IFNULL(b.prd_good_qty, '0') as prd_good_qty, IFNULL(b.err_qty,0) as err_qty, 
                        ((IFNULL(b.prd_good_qty, '0') / a.ordr_qty) * 100) as percent, d.cd_nm as daynight,
                        CASE 
                            WHEN (IFNULL(b.err_qty,0) + IFNULL(b.prd_good_qty, '0')) = 0 
                            THEN 0 
                            ELSE (100000 * IFNULL(b.err_qty,0) / (( IFNULL(b.err_qty,0) + IFNULL(b.prd_good_qty, '0')))) 
                        END AS ppm
                FROM tpb_dalywrkordrpln a
                LEFT OUTER JOIN tpb_curwrkctrstaus b 
                ON a.fact_cd = b.fact_cd 
                AND a.wrkctr_cd = b.wrkctr_cd
                AND (b.wrk_ordr_no IS NULL OR b.wrk_ordr_no = '') 
                AND a.ordr_prt_nbr_no = b.prt_nbr_cd
                AND a.daynight_gbn = b.daynight_gbn
                AND a.shift_gbn = b.shift_gbn
                JOIN tbm_prtnbrinfo c ON a.ordr_prt_nbr_no = c.prt_nbr_cd AND a.fact_cd = c.fact_cd
                JOIN tbc_codeinfo d ON a.daynight_gbn = d.cd AND d.up_cd = 'day_night'
                WHERE a.fact_cd = '{$param['where']['hidden_fact_cd']}'
                AND a.wrkctr_cd = '{$wrkctr_cd}'
                AND a.wrk_ordr_dt = '{$param['where']['plan_date']}'
                AND a.daynight_gbn LIKE '%{$search_type}%'
                AND a.wrk_ordr_status = '10'
                LIMIT {$offset}, {$per_page}";

        $result = $this->mes_m->get_response_data_form();
        $result->data = $this->db->query($qry)->result();
        $result->result = true;
        $result->msg = '조회되었습니다.';
        $result->param = $param;
        $result->qry = $this->db->last_query();

        exit(json_encode($result));
    }

    private function _save_wrkctr_wrkr($param){
//        exit(json_encode($param));
        // 받아온 파라미터를 tpp_wrkctrwrkrinfo 에 저장하는 함수
        $tb = 'tpp_wrkctrwrkrinfo';
        $fact_cd = $param['where']['hidden_fact_cd'];

        $wrkctr_cd = $param['like']['wrkctr_cd'][0];
        $wrkr_cd = $param['where']['wrkr_cd'];
        $main_wrkr = $param['where']['sel_main_wrkr'];

        $result = $this->mes_m->get_response_data_form();
        $result->param = $param;
        $this->db->trans_begin();
        $result->qry_list = [];
        // fact_cd, wrkctr_cd, wrkr_cd
        // delete
        foreach ($wrkr_cd as $item) {
            foreach ($item as $key => $value) {
                $this->db->where('fact_cd', $fact_cd)->where('wrkctr_cd', $wrkctr_cd)->where('wrkr_cd', $key)->delete($tb);
            }
        }
        $result->qry1 = $this->db->last_query();
        $op_cd = $this->db->select('op_cd')->where('fact_cd', $fact_cd)->where('wrkctr_cd', $wrkctr_cd)->get('tbp_wrkctrinfo')->row()->op_cd;
        $result->qry_list[] = $this->db->last_query();
        $sess = $this->session->userdata('emp_id');

        // update
        foreach ($wrkr_cd as $item) {
            foreach ($item as $key => $value) {
                if ($value == 'true'){
//                    $data = [
//                        'fact_cd' => $fact_cd,
//                        'wrkctr_cd' => $wrkctr_cd,
//                        'wrkr_cd' => $key,
//                        'main_wrkr_yn' => $key == $main_wrkr ? 'Y' : 'N',
//                        'op_cd' => $op_cd,
//                        'inst_id' => $sess,
//                        'updt_id' => $sess
//                    ];
//                    $this->db->insert($tb, $data);

                    $qry = "INSERT INTO `tpp_wrkctrwrkrinfo` (
                                `fact_cd`, `wrkctr_cd`, `wrkr_cd`, `main_wrkr_yn`, `op_cd`, `inst_id`, `updt_id`
                            ) VALUES (
                                '{$fact_cd}', '{$wrkctr_cd}', '{$key}'
                                , (SELECT main_wrkr_yn
                                    FROM tbm_wrkctrwrkrinfo
                                    WHERE fact_cd = '{$fact_cd}'
                                    AND wrkctr_cd = '{$wrkctr_cd}'
                                    AND wrkr_cd = '{$key}')
                                , '{$op_cd}', '{$sess}', '{$sess}'
                            )";
                    $this->db->query($qry);

                    $result->qry_list[] = $this->db->last_query();

                }
            }
        }
        $result->qry2 = $this->db->last_query();

        // tpb_curwrkctrstaus 에 작업지시가 되어있는 상태라면 tpb_curwrkctrstaus 업데이트.
        $cnt = $this->db->query("SELECT COUNT(*) as cnt 
                                        FROM tpb_curwrkctrstaus
                                        WHERE fact_cd = '{$fact_cd}'
                                        AND wrkctr_cd = '{$wrkctr_cd}'")->row()->cnt;
        if ($cnt) {
            $qry = "UPDATE tpb_curwrkctrstaus 
                    SET main_wrkr = '{$main_wrkr}'
                    , wrkr_qty = (SELECT COUNT(*) 
                                    FROM tpp_wrkctrwrkrinfo
                                    WHERE fact_cd = '{$fact_cd}'
                                    AND wrkctr_cd = '{$wrkctr_cd}'
                                    GROUP BY fact_cd, wrkctr_cd)
                    WHERE fact_cd = '{$fact_cd}'
                    AND wrkctr_cd = '{$wrkctr_cd}';";
            $this->db->query($qry);
        }

        if ($this->db->trans_status()){
            $this->db->trans_commit();
            $result->result = true;
            $result->msg = "작업자가 선택되었습니다.";
        }else{
            $this->db->trans_rollback();
            $result->result = false;
            if($result->msg != '') {
                $result->msg = "작업자가 선택되지 않았습니다";
            }
            $result->error = $this->db->error();
        }
        exit(json_encode($result));

        exit(json_encode($param));


        // 받아온 파라미터를 tpp_wrkctrselct 에 저장하는 함수
        $tb = 'tpp_wrkctrselct';
//        exit(json_encode($param));
        $ip = $param['like']['ip'][0];
        $fact_cd = $param['where']['fact_cd'];
        $wrkctr_cd = $param['where']['wrkctr_cd'];
//        exit(json_encode([$wrkctr_cd, $ip, $fact_cd]));
        $this->db->trans_begin();
        // delete
        foreach ($wrkctr_cd as $item) {
            foreach ($item as $key => $value) {
                $this->db->where('fact_cd', $fact_cd)->where('ip', $ip)->where('wrkctr_cd', $key)->delete($tb);
            }
        }
        // insert
        foreach ($wrkctr_cd as $item) {
            foreach ($item as $key => $value) {
                if ($value == 'true'){
                    $data = ['fact_cd' => $fact_cd, 'ip' => $ip, 'wrkctr_cd' => $key];
                    $this->db->insert($tb, $data);
                }
            }
        }
        $result = $this->mes_m->get_response_data_form();
        if ($this->db->trans_status()){
            $this->db->trans_commit();
            $result->result = true;
            $result->msg = "저장되었습니다.";
        }else{
            $this->db->trans_rollback();
            $result->result = false;
            $result->msg = "저장되지 않았습니다";
            $result->error = $this->db->error();
        }
        exit(json_encode($result));


    }

    private function _get_wrkctr_wrkr($param){
      /*
             # 작업자 명단 총 수 - sel_wrkr_cd 에 값이 있으면 선택된 작업자
            SELECT COUNT(*)
            FROM tbm_wrkctrwrkrinfo a
            LEFT JOIN tpp_wrkctrwrkrinfo b ON a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd AND a.wrkr_cd = b.wrkr_cd
            LEFT JOIN tbc_userinfo c ON a.wrkr_cd = c.emp_id
            WHERE a.fact_cd = 'hs01'
            AND a.wrkctr_cd = 'CNC-10';

            # 작업자 명단 - sel_wrkr_cd 에 값이 있으면 선택된 작업자
            SELECT a.*, b.wrkr_cd as sel_wrkr_cd, c.emp_nm FROM tbm_wrkctrwrkrinfo a
            LEFT JOIN tpp_wrkctrwrkrinfo b ON a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd AND a.wrkr_cd = b.wrkr_cd
            LEFT JOIN tbc_userinfo c ON a.wrkr_cd = c.emp_id
            WHERE a.fact_cd = 'hs01'
            AND a.wrkctr_cd = 'CNC-10'
            LIMIT 10;

            # 투입 인원
            SELECT COUNT(*) FROM tpp_wrkctrwrkrinfo
            WHERE fact_cd = 'hs01'
            AND wrkctr_cd = 'CNC-10';

            # 투입 명단
            SELECT a.*, b.emp_nm FROM tpp_wrkctrwrkrinfo a
            LEFT JOIN tbc_userinfo b ON a.wrkr_cd = b.emp_id
            WHERE a.fact_cd = 'hs01'
            AND a.wrkctr_cd = 'CNC-10';

            # 주작업자 투입 여부확인을 위한 조회
            SELECT a.*, b.wrkr_cd as sel_wrkr_cd, c.emp_nm FROM tbm_wrkctrwrkrinfo a
            LEFT JOIN tpp_wrkctrwrkrinfo b ON a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd AND a.wrkr_cd = b.wrkr_cd
            LEFT JOIN tbc_userinfo c ON a.wrkr_cd = c.emp_id
            WHERE a.fact_cd = 'hs01'
            AND a.wrkctr_cd = 'CNC-10'
            AND a.main_wrkr_yn = 'Y';
         */
      $fact_cd = $param['where']['hidden_fact_cd'];
      $wrkctr_cd = $param["like"]['wrkctr_cd'][0];

      $result = $this->mes_m->get_response_data_form();
      $cnt = $this->db->select('COUNT(*) as cnt')
          ->join("tpp_wrkctrwrkrinfo b", "a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd AND a.wrkr_cd = b.wrkr_cd", "left")
          ->join("tbc_userinfo c", "a.wrkr_cd = c.emp_id")->where("a.fact_cd", $fact_cd)
          ->where("a.wrkctr_cd", $wrkctr_cd)->get("tbm_wrkctrwrkrinfo a")->row()->cnt;
      $result->cnt = $cnt;

      $result->qry_list = [];
      $result->qry_list[] = $this->db->last_query();
//      $page = 1;
      $page = $this->_get_page($param, $cnt);
      $per_page = $param['where']['per_page'];
      $offset = $this->_page_offset($page, $per_page);

      $result->data = $this->db->select("a.*, b.wrkr_cd as sel_wrkr_cd, c.emp_nm")
          ->join("tpp_wrkctrwrkrinfo b", "a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd AND a.wrkr_cd = b.wrkr_cd", "left")
          ->join("tbc_userinfo c", "a.wrkr_cd = c.emp_id", "left")
          ->where("a.fact_cd", $fact_cd)->where("a.wrkctr_cd", $wrkctr_cd)->limit($per_page, $offset)
          ->get("tbm_wrkctrwrkrinfo a")->result();
      $result->qry_list[] = $this->db->last_query();

      $result->wrkctr_wrkr_cnt = $this->db->select("COUNT(*) as cnt")
          ->where("fact_cd", $fact_cd)->where("wrkctr_cd", $wrkctr_cd)->get("tpp_wrkctrwrkrinfo")->row()->cnt;
      $result->qry_list[] = $this->db->last_query();

      $result->main_wrkr_info = $this->db->select("a.*, b.wrkr_cd as sel_wrkr_cd, c.emp_nm")
          ->join("tpp_wrkctrwrkrinfo b", "a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd AND a.wrkr_cd = b.wrkr_cd", "left")
          ->join("tbc_userinfo c", "a.wrkr_cd = c.emp_id", "left")->where("a.main_wrkr_yn", "Y")
          ->where("a.fact_cd", $fact_cd)->where("a.wrkctr_cd", $wrkctr_cd)->limit($per_page, $offset)
          ->get("tbm_wrkctrwrkrinfo a")->row();

      $result->qry = $this->db->last_query();
      $result->qry_list[] = $this->db->last_query();
      $result->result = true;
      $result->msg = '조회되었습니다';
      $result->param = $param;
      $result->page = $page;

      exit(json_encode($result));
    }

    private function _get_wrkctrlist($param){

        $ip = $_SERVER['REMOTE_ADDR'];
        $fact_cd = $param['where']['fact_cd'];
        $result = $this->mes_m->get_response_data_form();

        $cnt = $this->db
            ->select('COUNT(*) as cnt')
            ->join('tbp_wrkctrinfo b', "a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd AND b.use_yn = 'Y'")
            ->join('tpb_curwrkctrstaus c', 'a.fact_cd = c.fact_cd AND a.wrkctr_cd = c.wrkctr_cd', 'left')
            ->join('tpb_ordrwrkrst d', "a.fact_cd = d.fact_cd AND a.wrkctr_cd = d.wrkctr_cd AND d.del_yn = 'N' AND c.wrk_ordr_no = d.wrk_ordr_no", 'left')
            ->join('tbm_prtnbrinfo e', 'c.prt_nbr_cd = e.prt_nbr_cd', 'left')
            ->join('tbc_codeinfo f', "f.up_cd = 'day_night' AND f.cd = c.daynight_gbn", 'left')
            ->join('tpb_dalywrkordrpln g', 'g.fact_cd = c.fact_cd AND c.wrkctr_cd = g.wrkctr_cd AND g.wrk_ordr_no = c.wrk_ordr_no', 'left')
            ->where('a.ip', $ip)
            ->where('a.fact_cd', $fact_cd)
            ->where('b.use_yn', 'Y')
            ->get('tpp_wrkctrselct a')->row()->cnt;
        $result->cnt = $cnt;
        $page = $this->_get_page($param, $cnt);
//        $per_page = $param['where']['per_page'];
        $per_page = $param['where']['per_page'];
        $offset = $this->_page_offset($page, $per_page);

        /*
        SELECT `a`.`fact_cd`, `a`.`wrkctr_cd`, `b`.`wrkctr_nm`
            , IFNULL(c.staus, '') AS staus_cd
            , CASE WHEN IFNULL(c.staus, '') = 'S'
                    THEN '비가동'
                    WHEN IFNULL(c.staus, '') = ''
                    THEN ''
                    WHEN IFNULL(c.staus, '') = 'R'
                    THEN '가동'
                END AS staus
            , IFNULL(c.str_tm, '') as str_tm		# 시간
            , IFNULL(e.prt_nbr_cd, '') as prt_nbr_cd
            , IFNULL(e.prt_nbr_nm, '') as prt_nbr_nm
            , IFNULL(j.wrkr_cd, '') as main_wrkr
            , IFNULL(c.stop_cd, '') as stop_cd
            , IFNULL(c.wrkr_qty, 0) as wrkr_qty
            , IFNULL(c.wrk_ordr_no, '') as wrk_ordr_no
            , IFNULL(g.ordr_qty, 0) as ordr_qty # 생산 목표1
            , IFNULL(d.prd_qty_meas, 0) as prd_qty_meas # 생산 목표2
            , IFNULL(d.prd_good_qty, 0) as prd_good_qty
            , IFNULL(d.err_qty, 0) as err_qty
            , `c`.`daynight_gbn`
            , IFNULL(f.cd_nm, '') as daynight_gbn_nm
            , IFNULL(h.emp_nm, '') as emp_nm
            , i.mach_cd as mach_cd
        FROM `tpp_wrkctrselct` `a`
        LEFT JOIN `tbp_wrkctrinfo` `b` ON `a`.`fact_cd` = `b`.`fact_cd` AND `a`.`wrkctr_cd` = `b`.`wrkctr_cd` AND `b`.`use_yn` = 'Y'
        LEFT JOIN tpp_wrkctrwrkrinfo j ON a.fact_cd = j.fact_cd AND a.wrkctr_cd = j.wrkctr_cd AND j.main_wrkr_yn = 'Y'
        LEFT JOIN `tpb_curwrkctrstaus` `c` ON `a`.`fact_cd` = `c`.`fact_cd` AND `a`.`wrkctr_cd` = `c`.`wrkctr_cd`
        LEFT JOIN
            (SELECT fact_cd, wrkctr_cd, MAX(wrk_ordr_no) AS wrk_ordr_no, IFNULL(MAX(prd_qty_meas),0) AS prd_qty_meas, IFNULL(MAX(prd_qty_man),0) AS prd_qty_man, IFNULL(SUM(prd_good_qty),0) AS prd_good_qty, IFNULL(SUM(err_qty),0) AS err_qty
            FROM tpb_ordrwrkrst
            WHERE del_yn ='N'
            GROUP BY fact_cd, wrkctr_cd) d ON a.fact_cd = d.fact_cd AND a.wrkctr_cd = d.wrkctr_cd AND c.wrk_ordr_no = d.wrk_ordr_no
        LEFT JOIN `tbm_prtnbrinfo` `e` ON `c`.`prt_nbr_cd` = `e`.`prt_nbr_cd`
        LEFT JOIN `tbc_codeinfo` `f` ON `f`.`up_cd` = 'day_night' AND `f`.`cd` = `c`.`daynight_gbn`
        LEFT JOIN `tpb_dalywrkordrpln` `g` ON `g`.`fact_cd` = `c`.`fact_cd` AND `c`.`wrkctr_cd` = `g`.`wrkctr_cd` AND `g`.`wrk_ordr_no` = `c`.`wrk_ordr_no`
        LEFT JOIN `tbc_userinfo` `h` ON j.wrkr_cd = `h`.`emp_id`
        LEFT JOIN tbp_wrkctrmachinfo i ON a.fact_cd = i.fact_cd AND a.wrkctr_cd = i.wrkctr_cd
        WHERE `a`.`ip` = '::1'
        AND `a`.`fact_cd` = 'hs01'
        AND `b`.`use_yn` = 'Y'
        ORDER BY `b`.`staus_brd_seq` ASC
        LIMIT 0, 7;
         */

        $qry = "
        SELECT `a`.`fact_cd`, `a`.`wrkctr_cd`, `b`.`wrkctr_nm`
            , IFNULL(c.staus, '') AS staus_cd
            , CASE WHEN IFNULL(c.staus, '') = 'S'
                    THEN '비가동'
                    WHEN IFNULL(c.staus, '') = ''
                    THEN ''
                    WHEN IFNULL(c.staus, '') = 'R'
                    THEN '가동'
                END AS staus
            , IFNULL(c.str_tm, '') as str_tm		# 시간
            , IFNULL(e.prt_nbr_cd, '') as prt_nbr_cd
            , IFNULL(e.prt_nbr_nm, '') as prt_nbr_nm
            , IFNULL(j.wrkr_cd, '') as main_wrkr
            , IFNULL(c.stop_cd, '') as stop_cd
            #, IFNULL(c.wrkr_qty, 0) as wrkr_qty
            , (SELECT COUNT(*) 
                FROM tpp_wrkctrwrkrinfo
                WHERE fact_cd = a.fact_cd
                AND wrkctr_cd = a.wrkctr_cd) as wrkr_qty
            , IFNULL(c.wrk_ordr_no, '') as wrk_ordr_no
            , IFNULL(g.ordr_qty, 0) as ordr_qty # 생산 목표1
            #, IFNULL(d.prd_qty_meas, 0) as prd_qty_meas # 생산 목표2
            , IFNULL(c.prd_qty_meas,0) as prd_qty_meas
            , IFNULL(d.prd_good_qty, 0) as prd_good_qty
            , IFNULL(d.err_qty, 0) as err_qty
            , `c`.`daynight_gbn`
            , IFNULL(f.cd_nm, '') as daynight_gbn_nm
            , IFNULL(h.emp_nm, '') as emp_nm
            , i.mach_cd as mach_cd
            , i.in_crt_gbn 
        FROM `tpp_wrkctrselct` `a`
        JOIN `tbp_wrkctrinfo` `b` ON `a`.`fact_cd` = `b`.`fact_cd` AND `a`.`wrkctr_cd` = `b`.`wrkctr_cd` AND `b`.`use_yn` = 'Y'
        LEFT JOIN tpp_wrkctrwrkrinfo j ON a.fact_cd = j.fact_cd AND a.wrkctr_cd = j.wrkctr_cd AND j.main_wrkr_yn = 'Y'
        LEFT JOIN `tpb_curwrkctrstaus` `c` ON `a`.`fact_cd` = `c`.`fact_cd` AND `a`.`wrkctr_cd` = `c`.`wrkctr_cd`
        LEFT JOIN 
            (SELECT fact_cd, wrkctr_cd, MAX(wrk_ordr_no) AS wrk_ordr_no, IFNULL(MAX(prd_qty_meas),0) AS prd_qty_meas, IFNULL(MAX(prd_qty_man),0) AS prd_qty_man, IFNULL(SUM(prd_good_qty),0) AS prd_good_qty, IFNULL(SUM(err_qty),0) AS err_qty 
            FROM tpb_ordrwrkrst
            WHERE del_yn ='N'
            GROUP BY fact_cd, wrkctr_cd) d ON a.fact_cd = d.fact_cd AND a.wrkctr_cd = d.wrkctr_cd AND c.wrk_ordr_no = d.wrk_ordr_no
        LEFT JOIN `tbm_prtnbrinfo` `e` ON `c`.`prt_nbr_cd` = `e`.`prt_nbr_cd`
        LEFT JOIN `tbc_codeinfo` `f` ON `f`.`up_cd` = 'day_night' AND `f`.`cd` = `c`.`daynight_gbn`
        LEFT JOIN `tpb_dalywrkordrpln` `g` ON `g`.`fact_cd` = `c`.`fact_cd` AND `c`.`wrkctr_cd` = `g`.`wrkctr_cd` AND `g`.`wrk_ordr_no` = `c`.`wrk_ordr_no`
        LEFT JOIN `tbc_userinfo` `h` ON `j`.`wrkr_cd` = `h`.`emp_id`
        LEFT JOIN tbp_wrkctrmachinfo i ON a.fact_cd = i.fact_cd AND a.wrkctr_cd = i.wrkctr_cd
        WHERE `a`.`ip` = '{$ip}'
        AND `a`.`fact_cd` = '{$fact_cd}'
        AND `b`.`use_yn` = 'Y'
        ORDER BY `b`.`staus_brd_seq` ASC
        LIMIT {$offset}, {$per_page};
        ";
        $result->data = $this->db->query($qry)->result();
        $result->cnt = $cnt;
        $result->qry = $this->db->last_query();
        $result->result = true;
        $result->msg = '조회되었습니다';
        $result->param = $param;
        $result->page = $page;
        exit(json_encode($result));
    }

    private function _get_wrkctrinfo($param){
        $sess = $this->session->userdata('emp_id');
        $fact_cd = $this->session->userdata('fact_cd');

        $ip = $_SERVER['REMOTE_ADDR'];
        $wrkctr_cd = $param['where']['wrkctr_cd'];
        $sess = $this->session->userdata('emp_id');
//        $qry = "CALL usp_wrkctrmain_s1('{$fact_cd}', '{$wrkctr_cd}', '{$ip}', @result, @msg, @btn)";

        $result = $this->mes_m->get_response_data_form();
//        $result->sp_qry = $qry;

//        $result->data = $this->mes_m->GetMultipleQueryResult($qry);

        $qry = "CALL usp_dasbtnchk_b1('{$fact_cd}', '{$wrkctr_cd}', '{$sess}', @result, @btn, @msg)";
        $result->btninfo = $this->mes_m->GetMultipleQueryResult($qry);
        $result = $this->mes_m->trans_sp_result($result->data, $result);
        $result->qry = $qry;
        $result->param = $param;
        exit(json_encode($result));
//        exit(json_encode($param));
    }

    private function _save_wrkctr($param){
        // 받아온 파라미터를 tpp_wrkctrselct 에 저장하는 함수
        $tb = 'tpp_wrkctrselct';
//        exit(json_encode($param));
        $ip = $param['like']['ip'][0];
        $fact_cd = $param['where']['fact_cd'];
        $wrkctr_cd = $param['where']['wrkctr_cd'];
//        exit(json_encode([$wrkctr_cd, $ip, $fact_cd]));
        $this->db->trans_begin();
        // delete
        foreach ($wrkctr_cd as $item) {
            foreach ($item as $key => $value) {
                $this->db->where('fact_cd', $fact_cd)->where('ip', $ip)->where('wrkctr_cd', $key)->delete($tb);
            }
        }
        // insert
        foreach ($wrkctr_cd as $item) {
            foreach ($item as $key => $value) {
                if ($value == 'true'){
                    $data = ['fact_cd' => $fact_cd, 'ip' => $ip, 'wrkctr_cd' => $key];
                    $this->db->insert($tb, $data);
                }
            }
        }
        $result = $this->mes_m->get_response_data_form();
        if ($this->db->trans_status()){
            $this->db->trans_commit();
            $result->result = true;
            $result->msg = "저장되었습니다.";
        }else{
            $this->db->trans_rollback();
            $result->result = false;
            $result->msg = "저장되지 않았습니다";
            $result->error = $this->db->error();
        }
        exit(json_encode($result));
    }

    private function _get_wrkctr($param){
        // 작업장 선택 - 전체
        $ip = $_SERVER['REMOTE_ADDR'];
        $result = $this->mes_m->get_response_data_form();

        $cnt = $this->db->select('COUNT(*) as cnt')
            ->join('tpp_wrkctrselct b', "a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd AND b.ip = '{$ip}'", 'left')
            ->where('a.fact_cd', $param['where']['fact_cd'])
            ->where('a.use_yn', 'Y')
            ->get('tbp_wrkctrinfo a')->row()->cnt;
        $result->cnt = $cnt;
        $page = $this->_get_page($param, $cnt);
        $per_page = $param['where']['per_page'];
        $offset = $this->_page_offset($page, $per_page);

        $result->data = $this->db->select('b.wrkctr_cd AS sel_wrkctr, b.ip AS ip, a.*')
            ->join('tpp_wrkctrselct b', "a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd AND b.ip = '{$ip}'", 'left')
            ->where('a.fact_cd', $param['where']['fact_cd'])
            ->where('a.use_yn', 'Y')->limit($per_page, $offset)

            ->order_by('a.staus_brd_seq', 'ASC')->get('tbp_wrkctrinfo a')->result();
        $result->qry = $this->db->last_query();
        $result->msg = '조회되었습니다';
        $result->param = $param;
        $result->page = $page;
        exit(json_encode($result));
    }

    private function _get_wrkctrsel($param){
        // 작업장 선택 - 선택

        $result = $this->mes_m->get_response_data_form();

        $cnt = $this->db->select('COUNT(*) as cnt')
            ->join('tbp_wrkctrinfo b', 'a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd', 'left')
            ->where('a.ip', $param['like']['ip'][0])->where('a.fact_cd', $param['where']['fact_cd'])
            ->where('b.use_yn', 'Y')->get('tpp_wrkctrselct a')->row()->cnt;
        $result->cnt = $cnt;
        $page = $this->_get_page($param, $cnt);
        $per_page = $param['where']['per_page'];
        $offset = $this->_page_offset($page, $per_page);

        $result->data = $this->db->select('b.*, a.*')
            ->join('tbp_wrkctrinfo b', 'a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd', 'left')
            ->where('a.ip', $param['like']['ip'][0])->where('a.fact_cd', $param['where']['fact_cd'])
            ->where('b.use_yn', 'Y')->limit($per_page, $offset)
            ->order_by('b.staus_brd_seq', 'ASC')->get('tpp_wrkctrselct a')->result();
        $result->qry = $this->db->last_query();
        $result->msg = '조회되었습니다';
        $result->param = $param;
        $result->page = $page;
        exit(json_encode($result));
    }

    private function _get_mach_prd_staus($data_list = []){
        $qry = "SELECT
                     a.fact_cd,											#공장코드
                     fnc_cd_nm(a.fact_cd,'fact_cd') fact_nm,	        #공장명
                     d.wrkctr_cd,										#작업장코드
                     d.wrkctr_nm,										#작업장명
                     a.rec_ymd,											#일자(수불일자)
                     a.rslt_dt,											#생산일시
                     d.op_cd,											#공정코드
                     fnc_op_nm(a.fact_cd, d.op_cd) op_nm,		        #공정명
                     IFNULL(c.prt_nbr_cd,'*') as prt_nbr_cd,			#품번코드
                     IFNULL(c.prt_nbr_nm,'*') as prt_nbr_nm,			#품번명
                     c.spec,											#규격
                     b.mach_cd,											#설비코드
                     b.mach_nm,											#설비명
                     a.prct_qty,										#설비어카운트(생산량)
                     a.wrk_ordr_no,										#지시번호
                     IFNULL(b.cavity,1) cavity,						    #CAVITY
                     fnc_cd_nm(a.day_night,'day_night') day_night,      #주야구분
                     a.shift_gbn,										#조구분
                     fnc_user_nm(a.fact_cd,a.wrkr) wrkr_nm,	        	#주작업자	
                     IFNULL(a.rst_aply_yn,'Y') rst_aply_yn		        #집계여부
                FROM tpb_machrslthstry a
                LEFT JOIN tbp_machinfo b ON(a.fact_cd = b.fact_cd AND a.mach_cd = b.mach_cd)
                LEFT JOIN tbm_prtnbrinfo c ON(a.fact_cd = c.fact_cd AND a.prt_nbr_cd = c.prt_nbr_cd)
                LEFT JOIN tbp_wrkctrinfo d ON(a.fact_cd = d.fact_cd AND a.wrkctr_cd = d.wrkctr_cd)
                WHERE a.fact_cd = '{$data_list['fact_cd']}'
                AND d.op_cd LIKE CONCAT('{$data_list['op_cd']}','%')
                AND fnc_op_nm(a.fact_cd, d.op_cd) LIKE CONCAT('{$data_list['op_nm']}','%')
                AND d.wrkctr_cd LIKE CONCAT('{$data_list['wrkctr_cd']}','%')
                AND d.wrkctr_nm LIKE CONCAT('{$data_list['wrkctr_nm']}','%')
                AND IFNULL(c.prt_nbr_cd,'') LIKE CONCAT('{$data_list['prt_nbr_cd']}','%')
                AND IFNULL(c.prt_nbr_nm,'') LIKE CONCAT('{$data_list['prt_nbr_nm']}','%')
                AND a.day_night LIKE CONCAT('%','{$data_list['day_night']}','%')
                AND a.rec_ymd BETWEEN '{$data_list['date1']}' AND '{$data_list['date2']}'
                ORDER BY a.rslt_dt DESC;";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_pds_tab1($data_list){
        $result = $this->mes_m->get_response_data_form();
        $qry = "CALL usp_prddaystaus_s1('{$data_list['fact_cd']}','{$data_list['date1']}','{$data_list['date2']}','{$data_list['account_type']}','{$data_list['prt_nbr_cd']}','{$data_list['prt_nbr_nm']}','{$data_list['daynight_gbn']}',1,@out_result,@out_message);";
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result->ori_qry = $qry;
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

    private function _get_pds_tab2($data_list){
        $result = $this->mes_m->get_response_data_form();
        $qry = "CALL usp_prddaystaus_s1('{$data_list['fact_cd']}','{$data_list['date1']}','{$data_list['date2']}','{$data_list['account_type']}','{$data_list['prt_nbr_cd']}','{$data_list['prt_nbr_nm']}','{$data_list['daynight_gbn']}',2,@out_result,@out_message);";
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result->ori_qry = $qry;
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

    private function _get_pds_tab3($data_list){
        $result = $this->mes_m->get_response_data_form();
        $qry = "CALL usp_prddaystaus_s1('{$data_list['fact_cd']}','{$data_list['date1']}','{$data_list['date2']}','{$data_list['account_type']}','{$data_list['prt_nbr_cd']}','{$data_list['prt_nbr_nm']}','{$data_list['daynight_gbn']}',3,@out_result,@out_message);";
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result->ori_qry = $qry;
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

    private function _get_prd_mon_staus($data_list){
        $result = $this->mes_m->get_response_data_form();
        $qry = "CALL usp_prdmonstaus_s1('{$data_list['fact_cd']}','{$data_list['base_ym']}','{$data_list['op_cd']}','{$data_list['op_nm']}','{$data_list['prt_nbr_cd']}','{$data_list['prt_nbr_nm']}','{$data_list['wrkctr_cd']}','{$data_list['wrkctr_nm']}',@out_result,@out_message);";
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result->ori_qry = $qry;
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

    private function _get_wrker_input_staus($data_list){
        $qry = "SELECT
                    a.fact_cd,
                    fnc_cd_nm(a.fact_cd, 'fact_cd') as fact_nm,
                    a.rec_ymd,
                    a.wrk_ordr_no,
                    d.wrkr_cd,
                    fnc_user_nm(d.fact_cd, d.wrkr_cd) AS wrkr_nm,
                    b.op_cd,
                    fnc_op_nm(b.fact_cd, b.op_cd) AS op_nm,
                    a.wrkctr_cd,
                    fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) AS wrkctr_nm,
                    a.staus,
                    a.str_dt,
                    a.end_dt,
                    a.wrk_tm_min,
                    a.prt_nbr_no,
                    c.prt_nbr_nm,
                    c.spec
                FROM tpb_runstophstry a
                LEFT JOIN tbp_wrkctrinfo b ON(a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd)
                LEFT JOIN tbm_prtnbrinfo c ON(a.fact_cd = c.fact_cd AND a.prt_nbr_no = c.prt_nbr_cd)
                LEFT JOIN tpb_wrkordrwrkr d ON(a.fact_cd = d.fact_cd AND a.wrk_ordr_no = d.wrk_ordr_no)
                WHERE a.fact_cd = '{$data_list['fact_cd']}'
                AND a.rec_ymd BETWEEN '{$data_list['date1']}' AND '{$data_list['date2']}'
                AND b.op_cd LIKE CONCAT('{$data_list['op_cd']}','%')
                AND fnc_op_nm(b.fact_cd, b.op_cd) LIKE CONCAT('{$data_list['op_nm']}','%')
                AND d.wrkr_cd LIKE CONCAT('{$data_list['emp_id']}','%')
                AND fnc_user_nm(d.fact_cd, d.wrkr_cd) LIKE CONCAT('{$data_list['emp_nm']}','%')
                AND a.wrkctr_cd LIKE CONCAT('{$data_list['wrkctr_cd']}','%')
                AND fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) LIKE CONCAT('{$data_list['wrkctr_nm']}','%')
                ORDER BY d.wrkr_cd,a.staus;";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_stop_anly_staus($data_list){
        $qry = "SELECT a.rec_ymd,a.wrkctr_cd,fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) AS wrkctr_nm,
                    a.stop_cd,b.stop_nm,b.stop_gbn,a.str_dt,a.end_dt,a.wrk_tm_min,a.wrkr_qty,
                    a.prt_nbr_no,c.prt_nbr_nm,IF(a.updt_id IS NULL,a.inst_id,a.updt_id) AS inst_id
                FROM tpb_runstophstry a
                LEFT JOIN tbp_stopiteminfo b ON(a.fact_cd = b.fact_cd AND a.stop_cd = b.stop_cd)
                LEFT JOIN tbm_prtnbrinfo c ON(a.fact_cd = c.fact_cd AND a.prt_nbr_no = c.prt_nbr_cd)
                LEFT JOIN tbp_wrkctrinfo d ON(a.fact_cd = d.fact_cd AND a.wrkctr_cd = d.wrkctr_cd)
                WHERE a.fact_cd = '{$data_list['fact_cd']}'
                AND a.rec_ymd BETWEEN '{$data_list['date1']}' AND '{$data_list['date2']}'
                AND d.op_cd LIKE CONCAT('{$data_list['op_cd']}','%')
                AND fnc_op_nm(d.fact_cd, d.op_cd) LIKE CONCAT('{$data_list['op_nm']}','%')
                AND a.wrkctr_cd LIKE CONCAT('{$data_list['wrkctr_cd']}','%')
                AND fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) LIKE CONCAT('{$data_list['wrkctr_nm']}','%')
                AND a.staus = 'S'
                AND a.stop_cd IS NOT NULL
                AND a.stop_cd != ''
                ORDER BY a.rec_ymd;";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_mtrl_prdctmove_mgt($data_list){
        $result = $this->mes_m->get_response_data_form();
        $this->db->select('a.fact_cd, (select cd_nm from tbc_codeinfo where up_cd = "fact_cd" and cd = a.fact_cd) as fact_nm,
                            a.prt_nbr_cd,b.prt_nbr_nm,b.spec,a.lotno,
                            a.stck_whs_cd,fnc_whs_nm(a.fact_cd, a.stck_whs_cd) AS stck_whs_nm,
                            a.stck_loc_cd,fnc_loc_nm(a.fact_cd, a.stck_whs_cd, a.stck_loc_cd) AS stck_loc_nm,
                            a.stck_qty,a.stck_unit,a.stck_wait_qty,
                            (select cd_nm from tbc_codeinfo where up_cd = "unit_cd" and cd = a.stck_unit) as unit_nm');
        $this->db->from('twm_realstck a');
        $this->db->join('tbm_prtnbrinfo b','a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd','left');
        $this->db->where('a.fact_cd', $data_list['fact_cd']);
        $this->db->where('a.stck_qty > 0');
        $this->db->like('a.prt_nbr_cd', $data_list['prt_nbr_cd'], 'after');
        $this->db->like('b.prt_nbr_nm', $data_list['prt_nbr_nm'], 'after');
        $this->db->like('a.lotno', $data_list['lotno'], 'after');
        $this->db->like('a.stck_whs_cd', $data_list['out_whs_cd'], 'after');
        try {
            $result->data = $this->db->get()->result();
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = "조회되었습니다.";
        } catch (Exception $e) {
            $result->result = false;
            $result->msg = "조회에 실패했습니다.";
        }
        exit(json_encode($result));
    }

    private function _get_mtrl_prdctmove_mgt_mpn(){
        $param = $this->input->get(null, true);
        $form = $param['form']['lastGetParam']['param'];
        $param = $param['param'];
        $result = $this->mes_m->get_response_data_form();
        $this->db->select('a.fact_cd,(SELECT cd_nm FROM tbc_codeinfo WHERE up_cd = "fact_cd" AND cd = a.fact_cd) AS fact_nm,
                            a.move_no,a.move_dt,a.prt_nbr_cd,b.prt_nbr_nm,b.spec,a.lotno,a.move_qty,a.move_unit,
                            (SELECT cd_nm FROM tbc_codeinfo WHERE up_cd = "unit_cd" AND cd = a.move_unit) AS unit_nm,
                            IF(a.updt_id IS NULL,a.inst_id,a.updt_id) AS updt_id,IF(a.updt_dt IS NULL,a.inst_dt,a.updt_dt) AS updt_dt,
                            a.from_fact_cd,a.from_whs_cd,a.from_loc_cd,a.to_fact_cd,a.to_whs_cd,a.to_loc_cd,
                            (SELECT cd_nm FROM tbc_codeinfo WHERE up_cd = "fact_cd" AND cd = a.from_fact_cd) as from_fact_nm,
                            (SELECT cd_nm FROM tbc_codeinfo WHERE up_cd = "fact_cd" AND cd = a.to_fact_cd) as to_fact_nm,
                            fnc_whs_nm(a.from_fact_cd, a.from_whs_cd) as from_whs_nm,
                            fnc_whs_nm(a.from_fact_cd, a.to_whs_cd) as to_whs_nm,
                            fnc_loc_nm(a.from_fact_cd, a.from_whs_cd, a.from_loc_cd) as from_loc_nm,
                            fnc_loc_nm(a.from_fact_cd, a.to_whs_cd, a.to_loc_cd) as to_loc_nm');
        $this->db->from('twm_moveprtnbr a');
        $this->db->join('tbm_prtnbrinfo b','a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd','left');
        $this->db->where('a.fact_cd', $param['where']['fact_cd']);
        $this->db->where('a.move_dt >=', $form['where']['date1']);
        $this->db->where('a.move_dt <=', $form['where']['date2']);
        $this->db->like('a.prt_nbr_cd', $param['where']['prt_nbr_cd'], 'after');
        $this->db->like('b.prt_nbr_nm', $param['where']['prt_nbr_nm'], 'after');
        $this->db->like('a.lotno', $param['where']['lotno'], 'after');
        $this->db->where('a.from_whs_cd', $param['where']['stck_whs_cd']);
        $this->db->where('a.from_loc_cd', $param['where']['stck_loc_cd']);
        $this->db->where('a.to_whs_cd', $form['where']['in_whs_cd']);
        $this->db->where('a.to_loc_cd', $form['where']['in_loc_cd']);
        try {
            $result->data = $this->db->get()->result();
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = "조회되었습니다.";
        } catch (Exception $e) {
            $result->result = false;
            $result->msg = "조회에 실패했습니다.";
        }
        exit(json_encode($result));
    }

    private function _get_mach_result_adjst($data_list){
        $qry = "SELECT a.*,a.daynight_gbn AS day_night,a.ordr_prt_nbr_no AS prt_nbr_cd, b.prt_nbr_nm, b.spec, fnc_cd_nm(a.fact_cd, 'fact_cd') AS fact_nm, fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) AS wrkctr_nm,
                    @fact_cd := a.fact_cd, @wrk_ordr_no := a.wrk_ordr_no,
                    (SELECT fnc_user_nm(fact_cd,wrkr_cd) AS wrkr_nm FROM tpb_wrkordrwrkr WHERE main_wrkr_yn = 'Y' AND fact_cd = @fact_cd AND wrk_ordr_no = @wrk_ordr_no) AS wrkr_nm,
                    (select count(*) from tpb_wrkordrwrkr where fact_cd = @fact_cd AND wrk_ordr_no = @wrk_ordr_no) AS wrkr_qty
                FROM tpb_dalywrkordrpln a
                LEFT JOIN tbm_prtnbrinfo b ON(a.fact_cd = b.fact_cd AND a.ordr_prt_nbr_no = b.prt_nbr_cd)
                WHERE a.fact_cd = '{$data_list['fact_cd']}'
                AND a.wrk_ordr_dt BETWEEN '{$data_list['date1']}' AND '{$data_list['date2']}'
                AND	a.wrkctr_cd LIKE CONCAT('{$data_list['wrkctr_cd']}','%')
                AND	fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) LIKE CONCAT('{$data_list['wrkctr_nm']}','%')
                AND a.wrk_ordr_status != 10
                ORDER BY a.wrk_ordr_dt DESC;";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_mach_result_adjst_rowonclick(){
        $param = $this->input->get(null, true)['param'];
        $qry = "SELECT a.*, fnc_cd_nm(a.fact_cd, 'fact_cd') AS fact_nm,fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) AS wrkctr_nm
                FROM tpb_machrslthstry a
                WHERE a.fact_cd = '{$param['where']['fact_cd']}'
                AND a.wrkctr_cd = '{$param['where']['wrkctr_cd']}'
                AND a.wrk_ordr_no = '*'
                ORDER BY a.rslt_dt DESC;";
        exit(json_encode($this->mes_m->query($qry)));
    }

  private function _get_curr_wrkctr_tmp_err_sum($param){
//        exit(json_encode($param));
    $fact_cd = $param['where']['hidden_fact_cd'];
    $wrkctr_cd = $param['like']['wrkctr_cd'][0];
    $ordr_no = $param['where']['hidden_wrk_ordr_no'];
    $lot_no = $param['where'];
//    $qry = "SELECT sum(err_qty) AS err_qty_sum
//                FROM tpb_wrkctrerrrst
//                WHERE fact_cd = '{$fact_cd}'
//                AND wrkctr_cd = '{$wrkctr_cd}'
//                AND wrk_ordr_no = '{$ordr_no}'";
    $qry = "SELECT (SELECT IFNULL((sum(mach_cnt)),0)  
                FROM tpb_machrslthstry
                WHERE fact_cd = '{$fact_cd}'
                AND wrkctr_cd = '{$wrkctr_cd}'
                AND wrk_ordr_no = '{$ordr_no}'
                AND (crt_gbn = '10'
                OR crt_gbn = '20')
                AND rst_aply_yn = 'Y'
                AND del_yn = 'N') AS sum_mach_qty
                , IFNULL((SELECT sum(err_qty)
                FROM tpb_wrkctrerrrst
                WHERE fact_cd = '{$fact_cd}'
                AND wrkctr_cd = '{$wrkctr_cd}'
                AND wrk_ordr_no = '{$ordr_no}'),0) AS err_qty
                ,((SELECT IFNULL((sum(mach_cnt)),0)
                FROM tpb_machrslthstry
                WHERE fact_cd = '{$fact_cd}'
                AND wrkctr_cd = '{$wrkctr_cd}'
                AND wrk_ordr_no = '{$ordr_no}'
                AND (crt_gbn = '10'
                OR  crt_gbn = '20')
                AND rst_aply_yn = 'Y'
                AND del_yn = 'N')
                - IFNULL((SELECT sum(err_qty) AS err_qty
                FROM tpb_wrkctrerrrst
                WHERE fact_cd = '{$fact_cd}'
                AND wrkctr_cd = '{$wrkctr_cd}'
                AND wrk_ordr_no = '{$ordr_no}'),0)
                ) AS prd_good_qty;";
    $result = $this->mes_m->get_response_data_form();

    $result->data = $this->db->query($qry)->row();

    $result->qry = $qry;

    exit(json_encode($result));
  }

    private function _get_data_ref($param = ''){
//        if(isset($param['like'])) {
            $prt_nbr_cd = isset($param['like']['prt_nbr_cd']) ? $param['like']['prt_nbr_cd'][0] : '';
            $prt_nbr_nm = isset($param['like']['prt_nbr_nm']) ? $param['like']['prt_nbr_nm'][0] : '';
            $op_cd = isset($param['like']['op_cd']) ? $param['like']['op_cd'][0] : '';
            $op_nm = isset($param['like']['op_nm']) ? $param['like']['op_nm'][0] : '';
            $wrkctr_cd = isset($param['like']['wrkctr_cd']) ? $param['like']['wrkctr_cd'][0] : '';
            $wrkctr_nm = isset($param['like']['wrkctr_nm']) ? $param['like']['wrkctr_nm'][0] : '';
            $emp_id = isset($param['like']['emp_id']) ? $param['like']['emp_id'][0] : '';
            $emp_nm = isset($param['like']['emp_nm']) ? $param['like']['emp_nm'][0] : '';
//        }else {
//            $prt_nbr_cd = '';
//            $prt_nbr_nm = '';
//            $op_cd = '';
//            $op_nm = '';
//            $wrkctr_cd = '';
//            $wrkctr_nm = '';
//        }
//        if(isset($param['where'])){
            $fact_cd = isset($param['where']['fact_cd']) ? $param['where']['fact_cd'] : '';
            $date1 = isset($param['where']['date1']) ? $param['where']['date1'] : '';
            $date2 = isset($param['where']['date2']) ? $param['where']['date2'] : '';
            $day_night = isset($param['where']['day_night']) ? $param['where']['day_night'] : '';
            $daynight_gbn = isset($param['where']['daynight_gbn']) ? $param['where']['daynight_gbn'] : '';
            $account_type = isset($param['where']['account_type']) ? $param['where']['account_type'] : '';
            $base_ym = isset($param['where']['base_ym']) ? $param['where']['base_ym'] : '';
//        }else{
//            $fact_cd = '';
//            $date1 = '';
//            $date2 = '';
//            $day_night = '';
//        }

        //mtrl_prdctmove_mgt
        $lotno = isset($param['like']['lotno']) ? $param['like']['lotno'][0] : '';
        $out_whs_nm = isset($param['like']['out_whs_nm']) ? $param['like']['out_whs_nm'][0] : '';
        //$out_loc_nm = isset($param['like']['out_loc_nm']) ? $param['like']['out_loc_nm'][0] : '';
        $in_whs_nm = isset($param['like']['in_whs_nm']) ? $param['like']['in_whs_nm'][0] : '';
        $in_loc_nm = isset($param['like']['in_loc_nm']) ? $param['like']['in_loc_nm'][0] : '';

        $out_whs_cd = isset($param['where']['out_whs_cd']) ? $param['where']['out_whs_cd'] : '';
        //$out_loc_cd = isset($param['where']['out_loc_cd']) ? $param['where']['out_loc_cd'] : '';
        $in_whs_cd = isset($param['where']['in_whs_cd']) ? $param['where']['in_whs_cd'] : '';
        $in_loc_cd = isset($param['where']['in_loc_cd']) ? $param['where']['in_loc_cd'] : '';

        $data_list = [
            "prt_nbr_cd" => $prt_nbr_cd,
            "prt_nbr_nm" => $prt_nbr_nm,
            "op_cd" => $op_cd,
            "op_nm" => $op_nm,
            "wrkctr_cd" => $wrkctr_cd,
            "wrkctr_nm" => $wrkctr_nm,
            "date1" => $date1,
            "date2" => $date2,
            "day_night" => $day_night,
            "fact_cd" => $fact_cd,
            "daynight_gbn" => $daynight_gbn,
            "account_type" => $account_type,
            "base_ym" => $base_ym,
            "emp_id" => $emp_id,
            "emp_nm" => $emp_nm,
            "lotno" => $lotno,
            "out_whs_nm" => $out_whs_nm,
            "in_whs_nm" => $in_whs_nm,
            "in_loc_nm" => $in_loc_nm,
            "out_whs_cd" => $out_whs_cd,
            "in_whs_cd" => $in_whs_cd,
            "in_loc_cd" => $in_loc_cd,
        ];

        return $data_list;
    }

    private function _get_table($path = ''){
        $tables = [
            'mach_prd_staus' => [''],
            'pds_tab1' => [''],
            'pds_tab2' => [''],
            'pds_tab3' => [''],
        ];
        return $tables[$path];
    }

    private function _page_offset($page, $per_page){
        return ($page - 1) * $per_page;
    }

    private function _get_page($param, $cnt){
//        $page = $param['where']['page'];
        $page = isset($param['where']['page']) ? $param['where']['page'] : 1;
        return $this->_cal_page_with_arrow($param, $cnt, $page);
    }

    private function _cal_page_with_arrow($param, $cnt, $page){
        if (isset($param['where']['arrow_type'])){
            if ($page > 1 && $param['where']['arrow_type'] == 'left') {
                $page--;
            }elseif($param['where']['arrow_type'] == 'right' && ($param['where']['page'] * $param['where']['per_page']) < $cnt ){
                $page++;
            }
        }
        return $page;
    }
}