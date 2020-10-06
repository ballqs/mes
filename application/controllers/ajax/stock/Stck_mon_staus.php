<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Stck_mon_staus extends CI_Controller
{
    public function get($path = ''){

        if($path !== 'sms_mon_fnsh'){
            $tb = $this->_get_table($path)[0];
            $param = $this->input->get(null, true)['param'];
            $data_list = $this->_get_data_ref($param);
        }

        if($path == 'sms_prt'){//mes
            $this->_get_sms_prt($data_list);
        }else if($path == 'sms_lot'){//mes
            $this->_get_sms_lot($data_list);
        }else if($path == 'sms_lot_wp'){//winplus
            $this->_get_sms_lot_wp($data_list);
        }else if($path == 'sms_mon_fnsh'){//공용
            $this->_get_sms_mon_fnsh();
        }else if($path == 'lotno_in_out'){//winplus
            $this->_get_lotno_in_out();
        }else if($path == 'sms_prt_wp'){//winplus
            $this->_get_sms_prt_wp($data_list);
        }else if($path == 'prtnbr_in_out'){//winplus
            $this->_get_prtnbr_in_out();
        }else if($path == 'prtnbr_inout'){//mes
            $this->_get_prtnbr_inout();
        }else if($path == 'lotno_inout'){//mes
            $this->_get_lotno_inout();
        }

        $data = $this->mes_m->get($tb, $param);
        echo json_encode($data);
    }

    private function _get_sms_mon_fnsh(){
        $qry = "SELECT cd_set1 FROM tbc_codeinfo WHERE up_cd = 'MES' AND cd = 'monthstckfnsh';";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_sms_prt($data_list){
        $result = $this->mes_m->get_response_data_form();
        $qry = "CALL usp_monthstock_s1('{$data_list['fact_cd']}','{$data_list['base_ym']}','{$data_list['fish_mon']}','{$data_list['prt_nbr_grp_cd']}','{$data_list['account_type']}','{$data_list['lotno']}','{$data_list['prt_nbr_cd']}','{$data_list['prt_nbr_nm']}','{$data_list['whs_cd']}','{$data_list['whs_nm']}','{$data_list['loc_cd']}','{$data_list['loc_nm']}',2,@result,@msg)";
        $data = $this->mes_m->GetMultipleQueryResult($qry);
        if (isset($data[count($data) - 1][0]['out_result'])) {
            $result->data = [];
            $result->out_result = 0;
        } else {
            $result->data = $data[count($data) - 1];
            $result->out_result = $data[count($data) - 2][0]['out_result'];
        }
        if ($result->out_result != 0) {
            $result->msg = '조회에 실패했습니다.';
            $result->result = false;
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        } else if ($result->out_result == 0) {
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '조회되었습니다.';
            $this->db->trans_commit();
        }
        exit(json_encode($result));
//        $qry = "SELECT
//                    a.fact_cd,
//                    a.ym,
//                    MAX(b.prt_nbr_grp_cd) prt_nbr_grp_cd,
//                    MAX(b.account_type) account_type,
//                    a.prt_nbr_cd,
//                    MAX(b.prt_nbr_nm) prt_nbr_nm,
//                    MAX(b.spec) spec,
//                    SUM(a.base_qty) base_qty,
//                    SUM(a.in_qty) in_qty,
//                    SUM(a.out_qty) out_qty,
//                    SUM(a.fnsh_qty) fnsh_qty
//                FROM twm_monthstckfnsh a
//                    LEFT OUTER JOIN tbm_prtnbrinfo b ON(a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd)
//                WHERE a.fact_cd LIKE CONCAT('%','{$data_list['fact_cd']}','%')
//                AND b.prt_nbr_grp_cd LIKE CONCAT('%','{$data_list['prt_nbr_grp_cd']}','%')
//                AND b.account_type LIKE CONCAT('%','{$data_list['account_type']}','%')
//                AND a.prt_nbr_cd LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')
//                AND b.prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%')
//                AND a.ym = '{$data_list['base_ym']}'
//                GROUP BY a.fact_cd, a.prt_nbr_cd
//                ORDER BY b.account_type,a.prt_nbr_cd;";
//        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_sms_lot($data_list){
        $result = $this->mes_m->get_response_data_form();
        $qry = "CALL usp_monthstock_s1('{$data_list['fact_cd']}','{$data_list['base_ym']}','{$data_list['fish_mon']}','{$data_list['prt_nbr_grp_cd']}','{$data_list['account_type']}','{$data_list['lotno']}','{$data_list['prt_nbr_cd']}','{$data_list['prt_nbr_nm']}','{$data_list['whs_cd']}','{$data_list['whs_nm']}','{$data_list['loc_cd']}','{$data_list['loc_nm']}',1,@result,@msg)";
        $data = $this->mes_m->GetMultipleQueryResult($qry);
        if(isset($data[count($data)-1][0]['out_result'])){
            $result->data = [];
            $result->out_result = 0;
        }else{
            $result->data = $data[count($data)-1];
            $result->out_result = $data[count($data)-2][0]['out_result'];
        }
        if ($result->out_result != 0){
            $result->msg = '조회에 실패했습니다.';
            $result->result = false;
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else if($result->out_result == 0){
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '조회되었습니다.';
            $this->db->trans_commit();
        }
        exit(json_encode($result));
//        $qry = "SELECT
//                    a.fact_cd,
//                    a.ym,
//                    b.prt_nbr_grp_cd,
//                    b.account_type,
//                    a.prt_nbr_cd,
//                    b.prt_nbr_nm,
//                    b.spec,
//                    a.lotno,
//                    a.stck_whs_cd,
//                    fnc_whs_nm(a.fact_cd, a.stck_whs_cd) stck_whs_nm,
//                    a.stck_loc_cd,
//                    fnc_loc_nm(a.fact_cd, a.stck_whs_cd, a.stck_loc_cd) stck_loc_nm,
//                    a.base_qty,
//                    a.in_qty,
//                    a.out_qty,
//                    a.fnsh_qty
//                FROM twm_monthstckfnsh a
//                    LEFT OUTER JOIN tbm_prtnbrinfo b ON(a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd)
//                WHERE a.fact_cd LIKE CONCAT('%','{$data_list['fact_cd']}','%')
//                AND b.prt_nbr_grp_cd LIKE CONCAT('%','{$data_list['prt_nbr_grp_cd']}','%')
//                AND b.account_type LIKE CONCAT('%','{$data_list['account_type']}','%')
//                AND a.prt_nbr_cd LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')
//                AND b.prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%')
//                AND a.stck_whs_cd LIKE CONCAT('%','{$data_list['whs_cd']}','%')
//                AND fnc_whs_nm(a.fact_cd, a.stck_whs_cd) LIKE CONCAT('%','{$data_list['whs_nm']}','%')
//                AND a.stck_loc_cd LIKE CONCAT('%','{$data_list['loc_cd']}','%')
//                AND fnc_loc_nm(a.fact_cd, a.stck_whs_cd, a.stck_loc_cd) LIKE CONCAT('%','{$data_list['loc_nm']}','%')
//                AND a.ym = '{$data_list['base_ym']}'
//                ORDER BY b.account_type,a.prt_nbr_cd,a.lotno;";
//        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_sms_prt_wp($data_list)
    {
        $result = $this->mes_m->get_response_data_form();
        $qry = "CALL usp_monthstock_s1('{$data_list['fact_cd']}','{$data_list['base_ym']}','{$data_list['fish_mon']}','{$data_list['prt_nbr_grp_cd']}','{$data_list['account_type']}','{$data_list['ship_cd']}','{$data_list['ship_nm']}','{$data_list['prt_nbr_cd']}','{$data_list['prt_nbr_nm']}','{$data_list['whs_cd']}','{$data_list['whs_nm']}','{$data_list['loc_cd']}','{$data_list['loc_nm']}',2,@result,@msg)";
        $data = $this->mes_m->GetMultipleQueryResult($qry);
        if (isset($data[count($data) - 1][0]['out_result'])) {
            $result->data = [];
            $result->out_result = 0;
        } else {
            $result->data = $data[count($data) - 1];
            $result->out_result = $data[count($data) - 2][0]['out_result'];
        }
        if ($result->out_result != 0) {
            $result->msg = '조회에 실패했습니다.';
            $result->result = false;
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        } else if ($result->out_result == 0) {
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '조회되었습니다.';
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }

    private function _get_sms_lot_wp($data_list){
        $result = $this->mes_m->get_response_data_form();
        $qry = "CALL usp_monthstock_s1('{$data_list['fact_cd']}','{$data_list['base_ym']}','{$data_list['fish_mon']}','{$data_list['prt_nbr_grp_cd']}','{$data_list['account_type']}','{$data_list['ship_cd']}','{$data_list['ship_nm']}','{$data_list['prt_nbr_cd']}','{$data_list['prt_nbr_nm']}','{$data_list['whs_cd']}','{$data_list['whs_nm']}','{$data_list['loc_cd']}','{$data_list['loc_nm']}',1,@result,@msg)";
        $data = $this->mes_m->GetMultipleQueryResult($qry);
        if(isset($data[count($data)-1][0]['out_result'])){
            $result->data = [];
            $result->out_result = 0;
        }else{
            $result->data = $data[count($data)-1];
            $result->out_result = $data[count($data)-2][0]['out_result'];
        }
        if ($result->out_result != 0){
            $result->msg = '조회에 실패했습니다.';
            $result->result = false;
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else if($result->out_result == 0){
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '조회되었습니다.';
            $this->db->trans_commit();
        }
        exit(json_encode($result));
//        $qry = "SELECT
//                    a.fact_cd,
//                    a.ym,
//                    b.prt_nbr_grp_cd,
//                    b.account_type,
//                    a.prt_nbr_cd,
//                    b.prt_nbr_nm,
//                    b.spec,
//                    c.biz_cd,
//                    fnc_biz_nm((SELECT MAX(cd) FROM tbc_codeinfo WHERE up_cd = 'cmpny_cd'), c.biz_cd) biz_nm,
//                    a.lotno as ship_cd,
//                    IFNULL(c.ship_nm,'*') as ship_nm,
//                    a.stck_whs_cd,
//                    fnc_whs_nm(a.fact_cd, a.stck_whs_cd) stck_whs_nm,
//                    a.stck_loc_cd,
//                    fnc_loc_nm(a.fact_cd, a.stck_whs_cd, a.stck_loc_cd) stck_loc_nm,
//                    a.base_qty,
//                    a.in_qty,
//                    a.out_qty,
//                    a.fnsh_qty
//                FROM twm_monthstckfnsh a
//                    LEFT OUTER JOIN tbm_prtnbrinfo b ON(a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd)
//                    LEFT OUTER JOIN tbs_bizmrloc c ON(a.lotno = c.ship_cd)
//                WHERE a.fact_cd LIKE CONCAT('%','{$data_list['fact_cd']}','%')
//                AND b.prt_nbr_grp_cd LIKE CONCAT('%','{$data_list['prt_nbr_grp_cd']}','%')
//                AND b.account_type LIKE CONCAT('%','{$data_list['account_type']}','%')
//                AND a.prt_nbr_cd LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')
//                AND b.prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%')
//                AND a.stck_whs_cd LIKE CONCAT('%','{$data_list['whs_cd']}','%')
//                AND fnc_whs_nm(a.fact_cd, a.stck_whs_cd) LIKE CONCAT('%','{$data_list['whs_nm']}','%')
//                AND a.stck_loc_cd LIKE CONCAT('%','{$data_list['loc_cd']}','%')
//                AND fnc_loc_nm(a.fact_cd, a.stck_whs_cd, a.stck_loc_cd) LIKE CONCAT('%','{$data_list['loc_nm']}','%')
//                AND a.lotno LIKE CONCAT('%','{$data_list['ship_cd']}','%')
//                AND IFNULL(c.ship_nm,'*') LIKE CONCAT('%','{$data_list['ship_nm']}','%')
//                AND a.ym = '{$data_list['base_ym']}'
//                ORDER BY b.account_type,a.prt_nbr_cd,a.lotno;";
    }

    private function _get_prtnbr_in_out(){
        $param = $this->input->get(null, true);
        $form_data = $this->_get_form_data_ref($param);
        $data = [];
        if($form_data['base_ym'] > $form_data['fish_mon']){
            $qry = "SELECT fact_cd, in_hstry_gbn as in_hstry_gbn_nm, rec_ymd, in_qty, IFNULL(updt_id,inst_id) AS updt_id, in_hstry_gbn
                FROM twm_inputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno Like CONCAT('%','{$form_data['ship_cd']}','%')
                AND del_yn = 'N'
                AND in_whs_cd Like CONCAT('%','{$form_data['whs_cd']}','%')
                AND in_loc_cd Like CONCAT('%','{$form_data['loc_cd']}','%')
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['fish_mon']}' and '{$form_data['base_ym']}'
                ORDER BY input_hstry_no;";
            $data[0] = $this->mes_m->query($qry)->data;
            $qry = "SELECT fact_cd, out_hstry_gbn as out_hstry_gbn_nm, rec_ymd, out_qty, IFNULL(updt_id,inst_id) AS updt_id, out_hstry_gbn
                FROM twm_outputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno Like CONCAT('%','{$form_data['ship_cd']}','%')
                AND del_yn = 'N'
                AND out_whs_cd Like CONCAT('%','{$form_data['whs_cd']}','%')
                AND out_loc_cd Like CONCAT('%','{$form_data['loc_cd']}','%')
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['fish_mon']}' and '{$form_data['base_ym']}'
                ORDER BY output_hstry_no;";
            $data[1] = $this->mes_m->query($qry)->data;
        }else if($form_data['base_ym'] <= $form_data['fish_mon']){
            $qry = "SELECT fact_cd, in_hstry_gbn as in_hstry_gbn_nm, rec_ymd, in_qty, IFNULL(updt_id,inst_id) AS updt_id, in_hstry_gbn
                FROM twm_inputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno Like CONCAT('%','{$form_data['ship_cd']}','%')
                AND del_yn = 'N'
                AND in_whs_cd Like CONCAT('%','{$form_data['whs_cd']}','%')
                AND in_loc_cd Like CONCAT('%','{$form_data['loc_cd']}','%')
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['base_ym']}' and '{$form_data['fish_mon']}'
                ORDER BY input_hstry_no;";
            $data[0] = $this->mes_m->query($qry)->data;
            $qry = "SELECT fact_cd, out_hstry_gbn as out_hstry_gbn_nm, rec_ymd, out_qty, IFNULL(updt_id,inst_id) AS updt_id, out_hstry_gbn
                FROM twm_outputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno Like CONCAT('%','{$form_data['ship_cd']}','%')
                AND del_yn = 'N'
                AND out_whs_cd Like CONCAT('%','{$form_data['whs_cd']}','%')
                AND out_loc_cd Like CONCAT('%','{$form_data['loc_cd']}','%')
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['base_ym']}' and '{$form_data['fish_mon']}'
                ORDER BY output_hstry_no;";
            $data[1] = $this->mes_m->query($qry)->data;
        }
        exit(json_encode($data));
    }

    private function _get_lotno_in_out(){
        $param = $this->input->get(null, true);
        $form_data = $this->_get_form_data_ref($param);
        $data = [];
        if($form_data['base_ym'] > $form_data['fish_mon']){
            $qry = "SELECT fact_cd, in_hstry_gbn as in_hstry_gbn_nm, rec_ymd, in_qty, IFNULL(updt_id,inst_id) AS updt_id, in_hstry_gbn
                FROM twm_inputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno = '{$param['param']['where']['ship_cd']}'
                AND del_yn = 'N'
                AND in_whs_cd Like CONCAT('%','{$form_data['whs_cd']}','%')
                AND in_loc_cd Like CONCAT('%','{$form_data['loc_cd']}','%')
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['fish_mon']}' and '{$form_data['base_ym']}'
                ORDER BY input_hstry_no;";
            $data[0] = $this->mes_m->query($qry)->data;
            $qry = "SELECT fact_cd, out_hstry_gbn as out_hstry_gbn_nm, rec_ymd, out_qty, IFNULL(updt_id,inst_id) AS updt_id, out_hstry_gbn
                FROM twm_outputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno = '{$param['param']['where']['ship_cd']}'
                AND del_yn = 'N'
                AND out_whs_cd Like CONCAT('%','{$form_data['whs_cd']}','%')
                AND out_loc_cd Like CONCAT('%','{$form_data['loc_cd']}','%')
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['fish_mon']}' and '{$form_data['base_ym']}'
                ORDER BY output_hstry_no;";
            $data[1] = $this->mes_m->query($qry)->data;
        }else if($form_data['base_ym'] <= $form_data['fish_mon']){
            $qry = "SELECT fact_cd, in_hstry_gbn as in_hstry_gbn_nm, rec_ymd, in_qty, IFNULL(updt_id,inst_id) AS updt_id, in_hstry_gbn
                FROM twm_inputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno = '{$param['param']['where']['ship_cd']}'
                AND del_yn = 'N'
                AND in_whs_cd Like CONCAT('%','{$form_data['whs_cd']}','%')
                AND in_loc_cd Like CONCAT('%','{$form_data['loc_cd']}','%')
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['base_ym']}' and '{$form_data['fish_mon']}'
                ORDER BY input_hstry_no;";
            $data[0] = $this->mes_m->query($qry)->data;
            $qry = "SELECT fact_cd, out_hstry_gbn as out_hstry_gbn_nm, rec_ymd, out_qty, IFNULL(updt_id,inst_id) AS updt_id, out_hstry_gbn
                FROM twm_outputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno = '{$param['param']['where']['ship_cd']}'
                AND del_yn = 'N'
                AND out_whs_cd Like CONCAT('%','{$form_data['whs_cd']}','%')
                AND out_loc_cd Like CONCAT('%','{$form_data['loc_cd']}','%')
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['base_ym']}' and '{$form_data['fish_mon']}'
                ORDER BY output_hstry_no;";
            $data[1] = $this->mes_m->query($qry)->data;
        }
        exit(json_encode($data));
    }

    private function _get_prtnbr_inout(){
        $param = $this->input->get(null, true);
        $form_data = $this->_get_form_data_ref($param);
        $data = [];
        if($form_data['base_ym'] > $form_data['fish_mon']){
            $qry = "SELECT fact_cd, in_hstry_gbn as in_hstry_gbn_nm, rec_ymd, in_qty, IFNULL(updt_id,inst_id) AS updt_id, in_hstry_gbn, in_whs_cd, fnc_whs_nm(fact_cd, in_whs_cd) AS in_whs_nm, in_loc_cd, fnc_loc_nm(fact_cd, in_whs_cd, in_loc_cd) AS in_loc_nm  
                FROM twm_inputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno Like CONCAT('%','{$form_data['lotno']}','%')
                AND del_yn = 'N'
                AND in_whs_cd = '{$param['param']['where']['stck_whs_cd']}'
                AND in_loc_cd = '{$param['param']['where']['stck_loc_cd']}'
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['fish_mon']}' and '{$form_data['base_ym']}'
                ORDER BY input_hstry_no;";
            $data[0] = $this->mes_m->query($qry)->data;
            $qry = "SELECT fact_cd, out_hstry_gbn as out_hstry_gbn_nm, rec_ymd, out_qty, IFNULL(updt_id,inst_id) AS updt_id, out_hstry_gbn, out_whs_cd, fnc_whs_nm(fact_cd, out_whs_cd) AS out_whs_nm, out_loc_cd, fnc_loc_nm(fact_cd, out_whs_cd, out_loc_cd) AS out_loc_nm
                FROM twm_outputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno Like CONCAT('%','{$form_data['lotno']}','%')
                AND del_yn = 'N'
                AND out_whs_cd = '{$param['param']['where']['stck_whs_cd']}'
                AND out_loc_cd = '{$param['param']['where']['stck_loc_cd']}'
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['fish_mon']}' and '{$form_data['base_ym']}'
                ORDER BY output_hstry_no;";
            $data[1] = $this->mes_m->query($qry)->data;
        }else if($form_data['base_ym'] <= $form_data['fish_mon']){
            $qry = "SELECT fact_cd, in_hstry_gbn as in_hstry_gbn_nm, rec_ymd, in_qty, IFNULL(updt_id,inst_id) AS updt_id, in_hstry_gbn, in_whs_cd, fnc_whs_nm(fact_cd, in_whs_cd) AS in_whs_nm, in_loc_cd, fnc_loc_nm(fact_cd, in_whs_cd, in_loc_cd) AS in_loc_nm
                FROM twm_inputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno Like CONCAT('%','{$form_data['lotno']}','%')
                AND del_yn = 'N'
                AND in_whs_cd = '{$param['param']['where']['stck_whs_cd']}'
                AND in_loc_cd = '{$param['param']['where']['stck_loc_cd']}'
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['base_ym']}' and '{$form_data['fish_mon']}'
                ORDER BY input_hstry_no;";
            $data[0] = $this->mes_m->query($qry)->data;
            $qry = "SELECT fact_cd, out_hstry_gbn as out_hstry_gbn_nm, rec_ymd, out_qty, IFNULL(updt_id,inst_id) AS updt_id, out_hstry_gbn, out_whs_cd, fnc_whs_nm(fact_cd, out_whs_cd) AS out_whs_nm, out_loc_cd, fnc_loc_nm(fact_cd, out_whs_cd, out_loc_cd) AS out_loc_nm
                FROM twm_outputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno Like CONCAT('%','{$form_data['lotno']}','%')
                AND del_yn = 'N'
                AND out_whs_cd = '{$param['param']['where']['stck_whs_cd']}'
                AND out_loc_cd = '{$param['param']['where']['stck_loc_cd']}'
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['base_ym']}' and '{$form_data['fish_mon']}'
                ORDER BY output_hstry_no;";
            $data[1] = $this->mes_m->query($qry)->data;
        }
        exit(json_encode($data));
    }

    private function _get_lotno_inout(){
        $param = $this->input->get(null, true);
        $form_data = $this->_get_form_data_ref($param);
        $data = [];
        if($form_data['base_ym'] > $form_data['fish_mon']){
            $qry = "SELECT fact_cd, in_hstry_gbn as in_hstry_gbn_nm, rec_ymd, in_qty, IFNULL(updt_id,inst_id) AS updt_id, in_hstry_gbn, in_whs_cd, fnc_whs_nm(fact_cd, in_whs_cd) AS in_whs_nm, in_loc_cd, fnc_loc_nm(fact_cd, in_whs_cd, in_loc_cd) AS in_loc_nm
                FROM twm_inputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno = '{$param['param']['where']['lotno']}'
                AND in_whs_cd = '{$param['param']['where']['stck_whs_cd']}'
                AND in_loc_cd = '{$param['param']['where']['stck_loc_cd']}'
                AND del_yn = 'N'
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['fish_mon']}' and '{$form_data['base_ym']}'
                ORDER BY input_hstry_no;";
            $data[0] = $this->mes_m->query($qry)->data;
            $qry = "SELECT fact_cd, out_hstry_gbn as out_hstry_gbn_nm, rec_ymd, out_qty, IFNULL(updt_id,inst_id) AS updt_id, out_hstry_gbn, out_whs_cd, fnc_whs_nm(fact_cd, out_whs_cd) AS out_whs_nm, out_loc_cd, fnc_loc_nm(fact_cd, out_whs_cd, out_loc_cd) AS out_loc_nm
                FROM twm_outputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno = '{$param['param']['where']['lotno']}'
                AND out_whs_cd = '{$param['param']['where']['stck_whs_cd']}'
                AND out_loc_cd = '{$param['param']['where']['stck_loc_cd']}'
                AND del_yn = 'N'
                AND out_loc_cd Like CONCAT('%','{$form_data['loc_cd']}','%')
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['fish_mon']}' and '{$form_data['base_ym']}'
                ORDER BY output_hstry_no;";
            $data[1] = $this->mes_m->query($qry)->data;
        }else if($form_data['base_ym'] <= $form_data['fish_mon']){
            $qry = "SELECT fact_cd, in_hstry_gbn as in_hstry_gbn_nm, rec_ymd, in_qty, IFNULL(updt_id,inst_id) AS updt_id, in_hstry_gbn, in_whs_cd, fnc_whs_nm(fact_cd, in_whs_cd) AS in_whs_nm, in_loc_cd, fnc_loc_nm(fact_cd, in_whs_cd, in_loc_cd) AS in_loc_nm
                FROM twm_inputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno = '{$param['param']['where']['lotno']}'
                AND in_whs_cd = '{$param['param']['where']['stck_whs_cd']}'
                AND in_loc_cd = '{$param['param']['where']['stck_loc_cd']}'
                AND del_yn = 'N'
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['base_ym']}' and '{$form_data['fish_mon']}'
                ORDER BY input_hstry_no;";
            $data[0] = $this->mes_m->query($qry)->data;
            $qry = "SELECT fact_cd, out_hstry_gbn as out_hstry_gbn_nm, rec_ymd, out_qty, IFNULL(updt_id,inst_id) AS updt_id, out_hstry_gbn, out_whs_cd, fnc_whs_nm(fact_cd, out_whs_cd) AS out_whs_nm, out_loc_cd, fnc_loc_nm(fact_cd, out_whs_cd, out_loc_cd) AS out_loc_nm
                FROM twm_outputhstry
                WHERE fact_cd = '{$param['param']['where']['fact_cd']}'
                AND prt_nbr_cd = '{$param['param']['where']['prt_nbr_cd']}'
                AND lotno = '{$param['param']['where']['lotno']}'
                AND out_whs_cd = '{$param['param']['where']['stck_whs_cd']}'
                AND out_loc_cd = '{$param['param']['where']['stck_loc_cd']}'
                AND del_yn = 'N'
                AND DATE_FORMAT(rec_ymd,'%Y-%m') between '{$form_data['base_ym']}' and '{$form_data['fish_mon']}'
                ORDER BY output_hstry_no;";
            $data[1] = $this->mes_m->query($qry)->data;
        }
        exit(json_encode($data));
    }

    private function _get_form_data_ref($param){
        if(isset($param['form']['lastGetParam'])){
            $lastGetParam = $param['form']['lastGetParam']['param'];
            if(isset($lastGetParam['like'])) {
                $like_param = $lastGetParam['like'];
                $whs_cd = isset($like_param['whs_cd']) ? $like_param['whs_cd'][0] : '';
                $loc_cd = isset($like_param['loc_cd']) ? $like_param['loc_cd'][0] : '';
                $base_ym = isset($like_param['base_ym']) ? $like_param['base_ym'][0] : '';
                $fish_mon = isset($like_param['fish_mon']) ? v['fish_mon'][0] : '';
                $ship_cd = isset($like_param['ship_cd']) ? $like_param['ship_cd'][0] : '';
            }
            $form_data = [
                "whs_cd" => $whs_cd,
                "loc_cd" => $loc_cd,
                "base_ym" => $base_ym,
                "fish_mon" => $fish_mon,
                "ship_cd" => $ship_cd,
            ];
            return $form_data;
        }
    }

    private function _get_data_ref($param){
        if(isset($param['like'])) {
            $prt_nbr_cd = isset($param['like']['prt_nbr_cd']) ? $param['like']['prt_nbr_cd'][0] : '';
            $prt_nbr_nm = isset($param['like']['prt_nbr_nm']) ? $param['like']['prt_nbr_nm'][0] : '';
            $whs_cd = isset($param['like']['whs_cd']) ? $param['like']['whs_cd'][0] : '';
            $whs_nm = isset($param['like']['whs_nm']) ? $param['like']['whs_nm'][0] : '';
            $loc_cd = isset($param['like']['loc_cd']) ? $param['like']['loc_cd'][0] : '';
            $loc_nm = isset($param['like']['loc_nm']) ? $param['like']['loc_nm'][0] : '';
            $fish_mon = isset($param['like']['fish_mon']) ? $param['like']['fish_mon'][0] : '';
            $ship_cd = isset($param['like']['ship_cd']) ? $param['like']['ship_cd'][0] : '';
            $ship_nm = isset($param['like']['ship_nm']) ? $param['like']['ship_nm'][0] : '';
            $lotno = isset($param['like']['lotno']) ? $param['like']['lotno'][0] : '';
        }else {
            $prt_nbr_cd = '';
            $prt_nbr_nm = '';
            $whs_cd = '';
            $whs_nm = '';
            $loc_cd = '';
            $loc_nm = '';
            $fish_mon = '';
            $ship_cd = '';
            $ship_nm = '';
            $lotno = '';
        }
        if(isset($param['where'])){
            $fact_cd = isset($param['where']['fact_cd']) ? $param['where']['fact_cd'] : '';
            $account_type = isset($param['where']['account_type']) ? $param['where']['account_type'] : '';
            $prt_nbr_grp_cd = isset($param['where']['prt_nbr_grp_cd']) ? $param['where']['prt_nbr_grp_cd'] : '';
            $base_ym = isset($param['where']['base_ym']) ? $param['where']['base_ym'] : '';
        }else{
            $fact_cd = '';
            $account_type = '';
            $prt_nbr_grp_cd = '';
            $base_ym = '';
        }

        $data_list = [
            "prt_nbr_cd" => $prt_nbr_cd,
            "prt_nbr_nm" => $prt_nbr_nm,
            "whs_cd" => $whs_cd,
            "whs_nm" => $whs_nm,
            "loc_cd" => $loc_cd,
            "loc_nm" => $loc_nm,
            "fact_cd" => $fact_cd,
            "account_type" => $account_type,
            "prt_nbr_grp_cd" => $prt_nbr_grp_cd,
            "base_ym" => $base_ym,
            "fish_mon" => $fish_mon,
            "ship_cd" => $ship_cd,
            "ship_nm" => $ship_nm,
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
            'sms_prt' => [''],
            'sms_lot' => [''],
            'sms_lot_wp' => [''],
            'lotno_in_out' => [''],
            'sms_prt_wp' => [''],
            'prtnbr_in_out' => [''],
            'lotno_inout' => [''],
            'prtnbr_inout' => [''],
        ];
        return $tables[$path];
    }
}