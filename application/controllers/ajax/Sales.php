<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sales extends CI_Controller
{
    public function get($path = ''){

        $join = null;
        $param = $this->input->get(null, true)['param'];

        $data_list = $this->_get_data_ref($param);

        if($path == 'claim_mgt'){
            $this->_get_claim_mgt($data_list);
        }elseif($path == 'sales_mon_pln_mgt'){
            $this->_get_sales_mon_pln_mgt($data_list);
        }elseif($path == 'ord_mgt'){
            $this->_get_ord_mgt($data_list);
        }elseif($path == 'ord_mgt_rowOnclick'){
            $this->_get_ord_mgt_rowOnclick();
        }elseif($path == 'ship_mgt'){
            $this->_get_ship_mgt($data_list);
        }elseif($path == 'ship_mgt_rowOnclick'){
            $this->_get_ship_mgt_rowOnclick();
        }elseif($path == 'out_mgt'){
            $this->_get_out_mgt($data_list);
        }elseif($path == 'out_mgt_rowOnclick'){
            $this->_get_out_mgt_rowOnclick();
        }elseif($path == 'direct_out_mgt'){
            $this->_get_direct_out_mgt($data_list);
        }


        $tb = $this->_get_table($path)[0];

        if ($join == null) $data = $this->mes_m->get($tb, $param);
        else $data = $this->mes_m->get($tb, $param, $join);

        $data->getparam = $this->input->get();
        $data->path = 'path : '.$this->mes_m->get_p();

        echo json_encode($data);
    }

    public function save($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];

        if($path == 'claim_mgt'){
            for($i = 0; $i < count($param[0]); $i++){
                unset($param[0][$i]['biz_nm']);
                unset($param[0][$i]['ship_nm']);
            }
        }elseif($path == 'sales_mon_pln_mgt'){
            $this->_save_sales_mon_pln_mgt($param);
        }elseif($path == 'ord_mgt'){
            $param = $this->_save_ord_mgt($param);
        }elseif($path == 'ship_mgt'){
            $this->_save_ship_mgt($param);
        }elseif($path == 'out_mgt'){
            $this->_save_out_mgt($param);
        }elseif($path == 'direct_out_mgt'){
            $this->_save_direct_out_mgt($param);
        }

        $data = $this->mes_m->save($tb, $param);

        echo json_encode($data);
    }

    public function delete($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];
        if($path == 'ord_mgt'){
            $this->_delete_ord_mgt($param);
        }else if($path == 'ship_mgt'){
            $this->_delete_ship_mgt($param);
        }
        $result = $this->mes_m->delete($tb, $param);
        echo json_encode($result);
    }

    public function approve($path = ''){
        $param = $this->input->post(null, true)['param'];
        $tb = $this->_get_table($path)[0];
        if($path == 'ord_mgt'){
            $result = $this->_approve_ord_mgt($tb,$param);
        }

        echo json_encode($result);
    }

    private function _approve_ord_mgt($tb,$param){
        $this->db->trans_begin();

        $query = "UPDATE ".$tb." SET apval_yn = 'Y', ordr_staus_cd = '20' WHERE fact_cd = '{$param[0]['fact_cd']}' AND ordr_no = '{$param[0]['ordr_no']}'";
        $result = $this->mes_m->get_response_data_form();
        $result->result = $this->db->query($query);
        if ($this->db->trans_status() === FALSE){
            $result->msg = '승인되지 않았습니다.';
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '승인되었습니다.';
            $this->db->trans_commit();
        }
        return $result;
    }

    private function _delete_ord_mgt($param){
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        for($i = 0; $i < count($param); $i++){
            //param의 key값만 가져오기
            $keys = array_keys($param[$i]);
            //param의 value값만 가져오기
            $values = array_values($param[$i]);

            $where = [];
            for($j = 0; $j < count($param[$i]); $j++){
                if($keys[$j] === 'fact_cd' || $keys[$j] === 'ordr_no' || $keys[$j] === 'seq'){
                    $where[$keys[$j]] = $values[$j];
                }
            }

            $this->db->where($where)->update('tsa_ordrinfo', ['del_yn' => 'Y']);

            if ($this->db->trans_status() === FALSE){
                $result->msg = '삭제되지 않았습니다.';
                $result->error = $this->db->error();
                $result->result = false;
                $result->qry = $this->db->last_query();
                $this->db->trans_rollback();
            };
        };
        if ($this->db->trans_status() === FALSE){
            $result->msg = '삭제되지 않았습니다.';
            $result->error = $this->db->error();
            $result->result = false;
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '삭제되었습니다.';
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }

    private function _delete_ship_mgt($param){
        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        for($i = 0; $i < count($param); $i++){
            $qry = "CALL usp_shipmgt_d1(
                    '{$param[$i]['fact_cd']}',
                    '{$param[$i]['ship_no']}',
                    '{$param[$i]['ship_qty']}',
                    '{$param[$i]['ordr_no']}',
                    '{$param[$i]['seq']}',
                    '{$sess}',
                    @out_result,
                    @out_message
                    );";
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this->db->trans_status() === FALSE ||  $result->result == false ){
                $result->error = $this->db->error();
                $result->qry = $this->db->last_query();
                $this->db->trans_rollback();
                break;
            }
        }
        if ($this->db->trans_status() === FALSE ||  $result->result == false ){
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->msg = '삭제되었습니다.';
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }

    private function _save_sales_mon_pln_mgt($param){
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
                        $qry = "CALL usp_somonthpln_save1('{$obj['fact_cd']}', '{$key}', '{$obj['prt_nbr_cd']}', '{$value}', '{$obj['remark']}', '{$sess}', @result, @msg)";
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

    private function _save_ord_mgt($param){
        $selected_row = $this->input->post(null, true)['selected_row'];
        $sess = $this->session->userdata('emp_id');

        // insert를 위한 param setting
        $common = $selected_row['grid01'];

        if(isset($common['w2ui'])) {
            foreach ($common['w2ui']['changes'] as $key => $value) {
                $common[$key] = $value;
            }
        }

        $fact_cd = $common['fact_cd'];
        $ord_dt = $common['ord_dt'];
        unset($common['w2ui']);
        unset($common['recid']);
        unset($common['biz_nm']);
        unset($common['ship_nm']);
        unset($common['ship_ordr_qty_sum']);

        $ordr_no = '';
        if (isset($common['ordr_no']) && trim($common['ordr_no']) != '') {
            $ordr_no = $common['ordr_no'];
        } else {
            $query = "CALL usp_crtseq('{$fact_cd}', 'OR', '{$ord_dt}','{$sess}', @crtseq, @result, @msg)";
            $sp_result = $this->mes_m->exec_sp($query, ['crtseq', 'result', 'msg']);
            $ordr_no = $sp_result->data->crtseq;
            // 채번 프로시저 끝
            $common['ordr_no'] = $sp_result->data->crtseq;
        }// 수주번호 끝

        $common['ordr_staus_cd'] = "10";

        // 수주 순번을 입력하기 위한 부분 시작
        $query = "SELECT MAX(seq) as cnt FROM tsa_ordrinfo WHERE fact_cd = '{$fact_cd}' AND ordr_no = '{$ordr_no}'";
        $current_seq = $this->db->query($query)->row()->cnt;

        $modified_param = [];
        foreach ($param[1] as $item) {
            if(isset($item['cu']) && strtoupper($item['cu']) == 'C'){
                $item['seq'] = ++$current_seq;
            }

            unset($item['prt_nbr_nm']);
            unset($item['spec']);
            unset($item['unit_nm']);
            $modified_param[0][] = array_merge($common, $item);
        }

        //exit(json_encode($modified_param));
        return $modified_param;
    }

    private function _save_ship_mgt($param){
        $param = $param[0][0];
        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        if(strtolower($param['cu']) === 'c'){
            $data = $param['w2ui']['changes'];
            $qry = "CALL usp_shipmgt_i1(
                    '{$data['fact_cd']}',
                    '{$data['biz_cd']}',
                    '{$data['ship_cd']}',
                    '{$data['prt_nbr_cd']}',
                    '{$data['ship_qty']}',
                    '{$data['ship_unit']}',
                    '{$data['ordr_no']}',
                    '{$data['seq']}',
                    '{$sess}',
                    @out_result,
                    @out_message
                    );";
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        }else if(strtolower($param['cu']) === 'u'){
            $ship_qty = $param['w2ui']['changes']['ship_qty'];
            $qry = "CALL usp_shipmgt_u1(
                    '{$param['fact_cd']}',
                    '{$param['ship_no']}',
                    '{$ship_qty}',
                    '{$param['ordr_no']}',
                    '{$param['seq']}',
                    '{$sess}',
                    @out_result,
                    @out_message
                    );";
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        }
        $result = $this->mes_m->trans_sp_result($result->data, $result);
        if ($this->db->trans_status() === FALSE ||  $result->result == false ){
            //$result->msg = '저장되지 않았습니다.';
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            //$result->result = true;
            $result->msg = '저장되었습니다.';
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }

    private function _save_out_mgt($param){
        $param = $param[0];
        $fact_cd = $param[0];
        $ymd = date("Y-m-d");
        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        //출고명세번호 채번
        $query = "CALL usp_crtseq('{$fact_cd}', 'OD', '{$ymd}','{$sess}', @crtseq, @result, @msg)";
        $sp_result = $this->mes_m->exec_sp($query, ['crtseq', 'result', 'msg']);
        $out_detail_no = $sp_result->data->crtseq;
        $data = $param[1];
        for($i = 0; $i < count($data); $i++){
            $qry = "CALL usp_outmgt_i1(
                    '{$data[$i]['fact_cd']}',
                    '{$data[$i]['prt_nbr_cd']}',
                    '{$data[$i]['lotno']}',
                    '{$data[$i]['ship_no']}',
                    '{$data[$i]['whs_cd']}',
                    '{$data[$i]['loc_cd']}',
                    '{$data[$i]['out_qty']}',
                    '{$data[$i]['out_unit']}',
                    '{$out_detail_no}',
                    '{$data[$i]['ship_cd']}',
                    '{$sess}',
                    @out_result,
                    @out_message
                    );";
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this->db->trans_status() === FALSE ||  $result->result == false ){
                $result->error = $this->db->error();
                $result->qry = $this->db->last_query();
                $this->db->trans_rollback();
            }
        }
        if ($this->db->trans_status() === FALSE ||  $result->result == false ){
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->msg = '저장되었습니다.';
            $this->db->trans_commit();
            //$this->db->trans_rollback();
        }
        exit(json_encode($result));
    }

    private function _save_direct_out_mgt($param){
        $param = $param[0];
        $fact_cd = $param[0];
        $ymd = date("Y-m-d");
        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        //출고명세번호 채번
        $query = "CALL usp_crtseq('{$fact_cd}', 'OD', '{$ymd}','{$sess}', @crtseq, @result, @msg)";
        $sp_result = $this->mes_m->exec_sp($query, ['crtseq', 'result', 'msg']);
        $out_detail_no = $sp_result->data->crtseq;
        $data = $param[1];
        for($i = 0; $i < count($data); $i++){
            $qry = "CALL usp_directoutmgt_i1(
                    '{$data[$i]['fact_cd']}',
                    '{$data[$i]['prt_nbr_cd']}',
                    '{$data[$i]['lotno']}',
                    '{$data[$i]['whs_cd']}',
                    '{$data[$i]['loc_cd']}',
                    '{$data[$i]['out_qty']}',
                    '{$data[$i]['out_unit']}',
                    '{$out_detail_no}',
                    '{$data[$i]['ship_cd']}',
                    '{$sess}',
                    @out_result,
                    @out_message
                    );";
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this->db->trans_status() === FALSE ||  $result->result == false ){
                $result->error = $this->db->error();
                $result->qry = $this->db->last_query();
                $this->db->trans_rollback();
            }
        }
        if ($this->db->trans_status() === FALSE ||  $result->result == false ){
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->msg = '저장되었습니다.';
            //$this->db->trans_commit();
            $this->db->trans_rollback();
        }
        exit(json_encode($result));
    }

    private function _get_claim_mgt($data_list = []){
        $qry = "SELECT 
                    fact_cd,
                    seqno,
                    claim_dt,
                    biz_cd,
                    fnc_biz_nm('winplus', biz_cd) biz_nm,
                    ship_cd,
                    fnc_ship_nm('winplus', biz_cd, ship_cd) ship_nm,
                    claim_qty,
                    claim_unit,
                    claim_reasn_cd,
                    claim_reasn_remark,
                    remark,
                    updt_id,
                    updt_dt
                FROM tsa_claim
                WHERE fact_cd like CONCAT('%','{$data_list['fact_cd']}','%')
                AND   biz_cd  like CONCAT('%','{$data_list['biz_cd']}','%')
                AND   fnc_biz_nm('winplus', biz_cd)  like CONCAT('%','{$data_list['biz_nm']}','%')
                AND   ship_cd  like CONCAT('%','{$data_list['ship_cd']}','%')
                AND   fnc_ship_nm('winplus', biz_cd, ship_cd)  like CONCAT('%','{$data_list['ship_nm']}','%')
                AND   claim_dt  BETWEEN '{$data_list['date1']}' AND '{$data_list['date2']}'
                ORDER BY seqno;";

        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_sales_mon_pln_mgt($data_list){
        $sess = $this->session->userdata('emp_id');
        $dbname = $this->db->database;
        $result = $this->mes_m->get_response_data_form();
        $qry = "CALL usp_somonthpln_s1('{$dbname}','{$data_list['fact_cd']}', '{$data_list['base_ym']}', '{$data_list['prt_nbr_cd']}', '{$data_list['prt_nbr_nm']}','{$data_list['account_type']}', '{$sess}', @result, @msg)";
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

    private function _get_ord_mgt($data_list){
        $qry = "SELECT 
                    a.fact_cd, a.ordr_no, MAX(a.biz_cd) as biz_cd, 
                    MAX(fnc_biz_nm('{$data_list['cmpny_cd']}', a.biz_cd)) AS biz_nm, MAX(ship_cd) as ship_cd, 
                    MAX(fnc_ship_nm('{$data_list['cmpny_cd']}', a.biz_cd, a.ship_cd)) AS ship_nm, 
                    MAX(a.ord_dt) as ord_dt, SUM(a.ship_ordr_qty) as ship_ordr_qty_sum
                FROM tsa_ordrinfo a
                LEFT JOIN tbm_prtnbrinfo b ON(a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd)
                WHERE a.fact_cd = '{$data_list['fact_cd']}'
                AND a.ord_dt BETWEEN '{$data_list['date1']}' AND '{$data_list['date2']}'
                AND a.biz_cd LIKE CONCAT('{$data_list['biz_cd']}','%')
                AND fnc_biz_nm(fnc_cd_nm(a.fact_cd, 'cmpny_cd'), a.biz_cd) LIKE CONCAT('{$data_list['biz_nm']}','%')
                AND a.ship_cd LIKE CONCAT('{$data_list['ship_cd']}','%')
                AND fnc_ship_nm(fnc_cd_nm(a.fact_cd, 'cmpny_cd'), a.biz_cd, a.ship_cd) LIKE CONCAT('{$data_list['ship_nm']}','%')
                AND b.account_type LIKE CONCAT('{$data_list['account_type']}','%')
                AND b.account_type NOT IN('11','12','13','21','41')
                AND a.prt_nbr_cd LIKE CONCAT('{$data_list['prt_nbr_cd']}','%')
                AND b.prt_nbr_nm LIKE CONCAT('{$data_list['prt_nbr_nm']}','%')
                AND a.ordr_no LIKE CONCAT('{$data_list['ordr_no']}','%')
                AND a.del_yn = 'N'
                GROUP BY a.fact_cd, a.ordr_no;";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_ord_mgt_rowOnclick(){
        $param = $this->input->get(null, true)['param'];
        $form = $this->input->get(null, true)['form']['lastGetParam']['param'];
        $qry = "SELECT a.* , b.prt_nbr_nm , b.spec , fnc_cd_nm(a.ordr_unit, 'unit_cd') AS unit_nm
                FROM tsa_ordrinfo a
                LEFT JOIN tbm_prtnbrinfo b ON(a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd)
                WHERE a.fact_cd = '{$param['where']['fact_cd']}'
                AND a.ordr_no = '{$param['where']['ordr_no']}'
                AND b.account_type LIKE CONCAT('{$form['where']['account_type']}','%')
                AND a.prt_nbr_cd LIKE CONCAT('{$form['where']['prt_nbr_cd']}','%')
                AND b.prt_nbr_nm LIKE CONCAT('{$form['where']['prt_nbr_nm']}','%')
                AND a.del_yn = 'N'
                order by a.seq;";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_ship_mgt($data_list){
        $result = $this->mes_m->get_response_data_form();
        $this->db->select("a.* , fnc_biz_nm('{$data_list['cmpny_cd']}', a.biz_cd) AS biz_nm, fnc_ship_nm('{$data_list['cmpny_cd']}', a.biz_cd, a.ship_cd) AS ship_nm, b.prt_nbr_nm, b.spec, (a.ship_ordr_qty - a.ship_qty) AS residual_qty, fnc_cd_nm(a.ordr_unit, 'unit_cd') AS unit_nm");
        $this->db->from("tsa_ordrinfo a");
        $this->db->join("tbm_prtnbrinfo b","a.fact_cd = b.fact_cd and a.prt_nbr_cd = b.prt_nbr_cd","left");
        $this->db->where("a.fact_cd",$data_list['fact_cd']);
        $this->db->where("a.ship_pln_dt BETWEEN '{$data_list['date1']}' and '{$data_list['date2']}'","");
        $this->db->where("a.apval_yn","Y");
        $this->db->where("b.account_type",31);
        $this->db->where("(a.ship_ordr_qty - a.ship_qty) >",0);
        $this->db->like("a.biz_cd",$data_list['biz_cd'],"after");
        $this->db->like("fnc_biz_nm('{$data_list['cmpny_cd']}', a.biz_cd)",$data_list['biz_nm'],"after");
        $this->db->like("b.account_type",$data_list['account_type'],"after");
        $this->db->like("a.prt_nbr_cd",$data_list['prt_nbr_cd'],"after");
        $this->db->like("b.prt_nbr_nm",$data_list['prt_nbr_nm'],"after");
        $this->db->like("a.ordr_no",$data_list['ordr_no'],"after");
        $this->db->order_by("a.seq");
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

    private function _get_ship_mgt_rowOnclick(){
        $param = $this->input->get(null, true)['param'];
        $result = $this->mes_m->get_response_data_form();
        $this->db->select("a.* ,b.prt_nbr_nm ,b.spec, fnc_cd_nm(a.ship_unit, 'unit_cd') AS unit_nm, fnc_biz_nm(c.cmpny_cd, a.biz_cd) as biz_nm, fnc_ship_nm(c.cmpny_cd, a.biz_cd , a.ship_cd) as ship_nm");
        $this->db->from("tsa_shipinfo a");
        $this->db->join("tbm_prtnbrinfo b","a.fact_cd = b.fact_cd and a.prt_nbr_cd = b.prt_nbr_cd","left");
        $this->db->join("tbs_bizmrloc c","a.biz_cd = c.biz_cd and a.ship_cd = c.ship_cd","left");
        $this->db->where("a.fact_cd",$param['where']['fact_cd']);
        $this->db->where("a.ordr_no",$param['where']['ordr_no']);
        $this->db->where("a.seq",$param['where']['seq']);
        $this->db->where("a.prt_nbr_cd",$param['where']['prt_nbr_cd']);
        $this->db->order_by("a.ship_no");
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

    private function _get_out_mgt($data_list){
        $result = $this->mes_m->get_response_data_form();
        $this->db->select("
                a.*,b.prt_nbr_nm,b.spec,
                a.out_whs_cd AS whs_cd,
                fnc_whs_nm(a.fact_cd, a.out_whs_cd) AS whs_nm,
                a.out_loc_cd AS loc_cd,
                fnc_loc_nm(a.fact_cd, a.out_whs_cd, a.out_loc_cd) AS loc_nm,
                fnc_biz_nm('{$data_list['cmpny_cd']}', a.biz_cd) AS biz_nm,
                fnc_ship_nm('{$data_list['cmpny_cd']}', a.biz_cd, a.ship_cd) AS ship_nm,
                fnc_cd_nm(a.ship_unit, 'unit_cd') AS unit_nm
            ");
        $this->db->from("tsa_shipinfo a");
        $this->db->join("tbm_prtnbrinfo b","a.fact_cd = b.fact_cd and a.prt_nbr_cd = b.prt_nbr_cd","left");
        $this->db->where("a.fact_cd",$data_list['fact_cd']);
        $this->db->where("(a.ship_qty - a.rls_qty) != ",'0');
        $this->db->like("a.prt_nbr_cd",$data_list['prt_nbr_cd'],"after");
        $this->db->like("b.prt_nbr_nm",$data_list['prt_nbr_nm'],"after");
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

    private function _get_out_mgt_rowOnclick(){
        $param = $this->input->get(null, true)['param'];
        $result = $this->mes_m->get_response_data_form();
        $this->db->select("
            a.*,b.prt_nbr_nm,b.spec,
            fnc_whs_nm(a.fact_cd, a.stck_whs_cd) AS stck_whs_nm,
            fnc_loc_nm(a.fact_cd, a.stck_whs_cd, a.stck_loc_cd) AS stck_loc_nm,
            fnc_cd_nm(a.stck_unit, 'unit_cd') AS unit_nm
        ");
        $this->db->from("twm_realstck a");
        $this->db->join("tbm_prtnbrinfo b","a.fact_cd = b.fact_cd and a.prt_nbr_cd = b.prt_nbr_cd","left");
        $this->db->where("a.fact_cd",$param['where']['fact_cd']);
        $this->db->where("a.prt_nbr_cd",$param['where']['prt_nbr_cd']);
        $this->db->where("a.stck_whs_cd",$param['where']['whs_cd']);
        $this->db->where("a.stck_loc_cd",$param['where']['loc_cd']);
        $this->db->where("a.stck_qty >",'0');
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

    private function _get_direct_out_mgt($data_list){
        $result = $this->mes_m->get_response_data_form();
        $this->db->select("
            a.*,b.prt_nbr_nm,b.spec,
            fnc_whs_nm(a.fact_cd, a.stck_whs_cd) AS stck_whs_nm,
            fnc_loc_nm(a.fact_cd, a.stck_whs_cd, a.stck_loc_cd) AS stck_loc_nm,
            fnc_cd_nm(a.stck_unit, 'unit_cd') AS unit_nm
        ");
        $this->db->from("twm_realstck a");
        $this->db->join("tbm_prtnbrinfo b","a.fact_cd = b.fact_cd and a.prt_nbr_cd = b.prt_nbr_cd","left");
        $this->db->where("a.fact_cd",$data_list['fact_cd']);
        $this->db->like("a.prt_nbr_cd",$data_list['prt_nbr_cd'],"after");
        $this->db->like("b.prt_nbr_nm",$data_list['prt_nbr_nm'],"after");
        $this->db->where("a.stck_whs_cd","W3100");
        $this->db->where("a.stck_loc_cd","*");
        $this->db->where("a.stck_qty >",'0');
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

    private function _get_data_ref($param = ''){
        $biz_cd = isset($param['like']['biz_cd']) ? $param['like']['biz_cd'][0] : '';
        $biz_nm = isset($param['like']['biz_nm']) ? $param['like']['biz_nm'][0] : '';
        $ship_cd = isset($param['like']['ship_cd']) ? $param['like']['ship_cd'][0] : '';
        $ship_nm = isset($param['like']['ship_nm']) ? $param['like']['ship_nm'][0] : '';
        $prt_nbr_cd = isset($param['like']['prt_nbr_cd']) ? $param['like']['prt_nbr_cd'][0] : '';
        $prt_nbr_nm = isset($param['like']['prt_nbr_nm']) ? $param['like']['prt_nbr_nm'][0] : '';
        $ordr_no = isset($param['like']['ordr_no']) ? $param['like']['ordr_no'][0] : '';


        $fact_cd = isset($param['where']['fact_cd']) ? $param['where']['fact_cd'] : '';
        $cmpny_cd = isset($param['where']['cmpny_cd']) ? $param['where']['cmpny_cd'] : '';
        $date1 = isset($param['where']['date1']) ? $param['where']['date1'] : '';
        $date2 = isset($param['where']['date2']) ? $param['where']['date2'] : '';
        $account_type = isset($param['where']['account_type']) ? $param['where']['account_type'] : '';
        $base_ym = isset($param['where']['base_ym']) ? $param['where']['base_ym'] : '';

        $data_list = [
            "biz_cd" => $biz_cd,
            "biz_nm" => $biz_nm,
            "ship_cd" => $ship_cd,
            "ship_nm" => $ship_nm,
            "date1" => $date1,
            "date2" => $date2,
            "fact_cd" => $fact_cd,
            "prt_nbr_cd" => $prt_nbr_cd,
            "prt_nbr_nm" => $prt_nbr_nm,
            "account_type" => $account_type,
            "base_ym" => $base_ym,
            "ordr_no" => $ordr_no,
            "cmpny_cd" => $cmpny_cd,
        ];

        return $data_list;
    }

    private function _get_table($path = ''){
        $tables = [
            'claim_mgt' => ['tsa_claim'],
            'ord_mgt' => ['tsa_ordrinfo'],
            'output_mgt' => ['tsa_shipinfo'],
        ];
        return $tables[$path];
    }
}