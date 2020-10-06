<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Input extends CI_Controller
{
    public function get($path = ''){

        $join = null;

        $param = $this->input->get(null, true)['param'];

        $data_list = $this->_get_data_ref($param);

        if($path == 'term_input_staus'){
            $this->_get_term_input_staus($data_list);
        }else if($path == 'purchinfo_biz_ver'){
            $this->_get_purchinfo_biz_ver($param);
        }else if($path == 'purchininfo_biz_ver'){
            $this->_get_purchininfo_biz_ver($param);
        }else if($path == 'directpurchininfo_wp'){
            $this->_get_directpurchininfo_wp($param);
        }else if($path == 'directpurchininfo_biz_ver'){
            $this->_get_directpurchininfo_biz_ver($param);
        }else if($path == 'directpurchininfo'){
            $this->_get_directpurchininfo($param);
        }else if($path == 'purchininfo') {
            $this->_get_purchininfo($param);
        }else if($path == 'purchinfo'){
            $this->_get_purchinfo($param);
        }
        $tb = $this->_get_table($path)[0];
        if ($join == null) $data = $this->mes_m->get($tb, $param);
        else $data = $this->mes_m->get($tb, $param, $join);

        $data->getparam = $this->input->get();
        $data->path = 'path : '.$this->mes_m->get_p();

        echo json_encode($data);
    }

    public function save($path = ''){

        $param = $this->input->post(null, true)['param'];
//        exit(json_encode(["path" => $path]));
        if($path == 'mtrl_input_mgt_biz_ver') { $this->_save_mtrl_input_mgt_biz_ver($param); }
        elseif($path == 'mtrl_input_mgt') { $this->_save_mtrl_input_mgt($param); }
        elseif($path == 'mtrl_direct_input_mgt_wp') { $this->_save_mtrl_direct_input_mgt_wp($param); }
        elseif($path == 'mtrl_direct_input_mgt_biz_ver') { $this->_save_mtrl_direct_input_mgt_biz_ver($param); }
        elseif($path == 'mtrl_direct_input_mgt') { $this->_save_mtrl_direct_input_mgt($param); }

        $tb = $this->_get_table($path);
        $data = $this->mes_m->save($tb, $param);

        echo json_encode($data);
    }

    public function delete($path = ''){

        $param = $this->input->post(null, true)['param'];

        if($path == 'mtrl_input_mgt_biz_ver') { $this->_delete_mtrl_input_mgt_biz_ver($param); }
        elseif($path == 'mtrl_input_mgt') { $this->_delete_mtrl_input_mgt($param); }
        elseif($path == 'mtrl_direct_input_mgt_wp') { $this->_delete_mtrl_direct_input_mgt_wp($param); }
        elseif($path == 'mtrl_direct_input_mgt_biz_ver') { $this->_delete_mtrl_direct_input_mgt_biz_ver($param); }
        elseif($path == 'mtrl_direct_input_mgt') { $this->_delete_mtrl_direct_input_mgt($param); }
        $tb = $this->_get_table($path);
        $result = $this->mes_m->delete($tb, $param);
        echo json_encode($result);
    }

    private function _delete_mtrl_direct_input_mgt_biz_ver($param){
//        exit(json_encode($param));
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        $sess = $this->session->userdata('emp_id');
        foreach ($param['data'] as $key => $value) {
            //        usp_purchininfo_d1
            //        IN `in_fact_cd` VARCHAR(20),
            //        IN `in_po_in_no` VARCHAR(20),
            //        IN `in_po_in_gbn` VARCHAR(20),
            //        IN `in_prt_nbr_cd` VARCHAR(20),
            //        IN `in_lotno` VARCHAR(20),
            //        IN `‌in_po_in_unit` VARCHAR(20),
            //        IN `in_in_biz_cd` VARCHAR(20),
            //        IN `in_out_biz_cd` VARCHAR(20),
            //        IN `in_out_ship_cd` VARCHAR(20),
            //        IN `in_in_qty` FLOAT,
            //        IN `in_whs_cd` VARCHAR(20),
            //        IN `in_loc_cd` VARCHAR(20),
            //        IN `in_po_no` VARCHAR(20),
            //        IN `in_po_seq` INT,
            //        IN `in_remark` VARCHAR(1000),
            //        IN `in_del_yn` CHAR(01),
            //        IN `in_inst_id` VARCHAR(20),
            //        OUT `out_result` INT,
            //        OUT `out_message` VARCHAR(100)
            // $param['grid02']['del_yn'] true -> 'Y', false -> 'N'
            $del_yn = 'N';
            $in_loc_cd = $param['grid02']['in_loc_cd'] == '' ? '*' : $param['grid02']['in_loc_cd'];
            $qry = "CALL usp_purchininfo_d1(
            '{$value['fact_cd']}',
            '{$value['po_in_no']}',
            '{$value['po_in_gbn']}',
            '{$value['prt_nbr_cd']}',
            '{$value['lotno']}',
            '{$value['po_in_unit']}',
            '{$value['in_biz_cd']}',
            '{$value['out_biz_cd']}',
            '{$value['out_ship_cd']}',
            '{$value['in_qty']}',
            '{$value['in_whs_cd']}',
            '{$in_loc_cd}',
            '{$value['po_no']}',
            '{$value['po_seq']}',
            '{$value['remark']}',
            '{$del_yn}',
            '{$sess}',
            @result,
            @msg
            )";
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            $result->sp_qry = $qry;
        }
        if ($this->db->trans_status() === FALSE || $result->result == false ) {
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
        }
        exit(json_encode($result));

    }
    private function _delete_mtrl_direct_input_mgt($param){
//        exit(json_encode($param));
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        $sess = $this->session->userdata('emp_id');
        foreach ($param['data'] as $key => $value) {
            //        usp_purchininfo_d1
            //        IN `in_fact_cd` VARCHAR(20),
            //        IN `in_po_in_no` VARCHAR(20),
            //        IN `in_po_in_gbn` VARCHAR(20),
            //        IN `in_prt_nbr_cd` VARCHAR(20),
            //        IN `in_lotno` VARCHAR(20),
            //        IN `‌in_po_in_unit` VARCHAR(20),
            //        IN `in_in_biz_cd` VARCHAR(20),
            //        IN `in_out_biz_cd` VARCHAR(20),
            //        IN `in_out_ship_cd` VARCHAR(20),
            //        IN `in_in_qty` FLOAT,
            //        IN `in_whs_cd` VARCHAR(20),
            //        IN `in_loc_cd` VARCHAR(20),
            //        IN `in_po_no` VARCHAR(20),
            //        IN `in_po_seq` INT,
            //        IN `in_remark` VARCHAR(1000),
            //        IN `in_del_yn` CHAR(01),
            //        IN `in_inst_id` VARCHAR(20),
            //        OUT `out_result` INT,
            //        OUT `out_message` VARCHAR(100)
            // $param['grid02']['del_yn'] true -> 'Y', false -> 'N'
            $del_yn = 'N';
            $in_loc_cd = $param['grid02']['in_loc_cd'] == '' ? '*' : $param['grid02']['in_loc_cd'];
            $qry = "CALL usp_purchininfo_d1(
            '{$value['fact_cd']}',
            '{$value['po_in_no']}',
            '{$value['po_in_gbn']}',
            '{$value['prt_nbr_cd']}',
            '{$value['lotno']}',
            '{$value['po_in_unit']}',
            '{$value['in_biz_cd']}',
            '{$value['out_biz_cd']}',
            '{$value['out_ship_cd']}',
            '{$value['in_qty']}',
            '{$value['in_whs_cd']}',
            '{$in_loc_cd}',
            '{$value['po_no']}',
            '{$value['po_seq']}',
            '{$value['remark']}',
            '{$del_yn}',
            '{$sess}',
            @result,
            @msg
            )";
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            $result->sp_qry = $qry;
        }
        if ($this->db->trans_status() === FALSE || $result->result == false){
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
        }
        exit(json_encode($result));

    }

    private function _delete_mtrl_direct_input_mgt_wp($param){
//        exit(json_encode($param));
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        $sess = $this->session->userdata('emp_id');
        foreach ($param['data'] as $key => $value) {
    //        usp_purchininfo_d1
    //        IN `in_fact_cd` VARCHAR(20),
    //        IN `in_po_in_no` VARCHAR(20),
    //        IN `in_po_in_gbn` VARCHAR(20),
    //        IN `in_prt_nbr_cd` VARCHAR(20),
    //        IN `in_lotno` VARCHAR(20),
    //        IN `‌in_po_in_unit` VARCHAR(20),
    //        IN `in_in_biz_cd` VARCHAR(20),
    //        IN `in_out_biz_cd` VARCHAR(20),
    //        IN `in_out_ship_cd` VARCHAR(20),
    //        IN `in_in_qty` FLOAT,
    //        IN `in_whs_cd` VARCHAR(20),
    //        IN `in_loc_cd` VARCHAR(20),
    //        IN `in_po_no` VARCHAR(20),
    //        IN `in_po_seq` INT,
    //        IN `in_remark` VARCHAR(1000),
    //        IN `in_del_yn` CHAR(01),
    //        IN `in_inst_id` VARCHAR(20),
    //        OUT `out_result` INT,
    //        OUT `out_message` VARCHAR(100)
                // $param['grid02']['del_yn'] true -> 'Y', false -> 'N'
            $del_yn = 'N';
            $in_loc_cd = $param['grid02']['in_loc_cd'] == '' ? '*' : $param['grid02']['in_loc_cd'];
            $qry = "CALL usp_purchininfo_d1(
            '{$value['fact_cd']}',
            '{$value['po_in_no']}',
            '{$value['po_in_gbn']}',
            '{$value['prt_nbr_cd']}',
            '{$value['lotno']}',
            '{$value['po_in_unit']}',
            '{$value['in_biz_cd']}',
            '{$value['out_biz_cd']}',
            '{$value['out_ship_cd']}',
            '{$value['in_qty']}',
            '{$value['in_whs_cd']}',
            '{$in_loc_cd}',
            '{$value['po_no']}',
            '{$value['po_seq']}',
            '{$value['remark']}',
            '{$del_yn}',
            '{$sess}',
            @result,
            @msg
            )";
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            $result->sp_qry = $qry;
        }
        if ($this->db->trans_status() === FALSE || $result->result == false ){
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
        }
        exit(json_encode($result));

    }

    private function _save_mtrl_direct_input_mgt_biz_ver($param){
//        exit(json_encode($param));
        $sess = $this->session->userdata('emp_id');
        if(isset($param['grid02']['cu']) && strtoupper($param['grid02']['cu']) == "C"){ // insert
//            IN `in_fact_cd` VARCHAR(20),
//            IN `in_prt_nbr_cd` VARCHAR(20),
//            IN `in_lotno` VARCHAR(20),
//            IN `‌in_po_in_unit` VARCHAR(20),
//            IN `in_in_biz_cd` VARCHAR(20),
//            IN `in_out_biz_cd` VARCHAR(20),
//            IN `in_out_ship_cd` VARCHAR(20),
//            IN `in_in_qty` FLOAT,
//            IN `in_whs_cd` VARCHAR(20),
//            IN `in_loc_cd` VARCHAR(20),	## 창고위치정보를 안쓰면 '*'
//            IN `in_po_no` VARCHAR(20),
//            IN `in_po_seq` INT,
//            IN `in_remark` VARCHAR(1000),
//            IN `in_del_yn` CHAR(01),
//            IN `in_inst_id` VARCHAR(20),
//            OUT `out_result` INT,
//            OUT `out_message` VARCHAR(100)
            $lotno = isset($param['data']['like']['lotno'][0]) ? $param['data']['like']['lotno'][0] : '*';
            $in_loc_cd = isset($param['data']['where']['in_loc_cd']) ? $param['data']['where']['in_loc_cd'] : '*';
            $remark = isset($param['data']['like']['remark']) ? $param['data']['like']['remark'][0] : '';
            $qry = "CALL usp_purchininfo_i1(
            '{$param['grid02']['w2ui']['changes']['fact_cd']}',
            '{$param['data']['like']['prt_nbr_cd'][0]}',
            '{$param['data']['like']['out_ship_cd'][0]}',
            '{$param['data']['where']['po_in_unit']}',
            '{$param['data']['like']['biz_cd'][0]}',
            '{$param['data']['like']['biz_cd'][0]}',
            '{$param['data']['like']['out_ship_cd'][0]}',
            '{$param['data']['like']['in_qty'][0]}',
            '{$param['data']['where']['in_whs_cd']}',
            '{$in_loc_cd}',
            '*',
            '0',
            '{$remark}',
            'N',
            '{$sess}',
            @result,
            @msg
            )";

            $result = $this->mes_m->get_response_data_form();
            $result->sp_qry = $qry;
            $this->db->trans_begin();
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this->db->trans_status() === FALSE || $result->result == false){
                $this->db->trans_rollback();
            }else{
                $this->db->trans_commit();
            }
            exit(json_encode($result));


//            $result = $this->mes_m->exec_sp($qry);
//            exit(json_encode($result));
        }else{ // update
//           1 IN `in_fact_cd` VARCHAR(20),
//           2 IN `in_po_in_no` VARCHAR(20),
//           3 IN `in_po_in_gbn` VARCHAR(20),
//           4 IN `in_prt_nbr_cd` VARCHAR(20),
//           5 IN `in_lotno` VARCHAR(20),
//           6 IN `‌in_po_in_unit` VARCHAR(20),
//           7 IN `in_in_biz_cd` VARCHAR(20),
//           8 IN `in_out_biz_cd` VARCHAR(20),
//           9 IN `in_out_ship_cd` VARCHAR(20),
//           0 IN `in_in_qty` FLOAT,               #수정 가능
//           1 IN `in_whs_cd` VARCHAR(20),
//           2 IN `in_loc_cd` VARCHAR(20),
//           3 IN `in_po_no` VARCHAR(20),
//           4 IN `in_po_seq` INT,
//           5 IN `in_remark` VARCHAR(1000),       #수정 가능
//           6 IN `in_del_yn` CHAR(01),
//           7 IN `in_inst_id` VARCHAR(20),        #수정 가능
//           8 OUT `out_result` INT,
//           9 OUT `out_message` VARCHAR(100)
//            exit(json_encode($param['grid02']['del_yn']));
//            $del_yn = $param['grid02']['del_yn'] ? "N" : "Y";
//            exit(json_encode($param));

            $del_yn = 'N';
            $in_loc_cd = $param['grid02']['in_loc_cd'] == '' ? '*' : $param['grid02']['in_loc_cd'];
            $remark = isset($param['data']['like']['remark'][0]) ? $param['data']['like']['remark'][0] : '';
            $qry = "CALL usp_purchininfo_u1(
            '{$param['grid02']['fact_cd']}',
            '{$param['grid02']['po_in_no']}',
            '{$param['grid02']['po_in_gbn']}',
            '{$param['grid02']['prt_nbr_cd']}',
            '{$param['grid02']['lotno']}',        
            '{$param['grid02']['po_in_unit']}',   
            '{$param['grid02']['in_biz_cd']}',    
            '{$param['grid02']['out_biz_cd']}',  
            '{$param['grid02']['out_ship_cd']}',  
            '{$param['data']['like']['in_qty'][0]}',                 
            '{$param['grid02']['in_whs_cd']}',
            '{$in_loc_cd}',
            '{$param['grid02']['po_no']}',
            '{$param['grid02']['po_seq']}',
            '{$remark}',
            '{$del_yn}',
            '{$sess}',
            @result,
            @msg
            )";
        }

//        $result = $this->mes_m->exec_sp($qry);
        $result = $this->mes_m->get_response_data_form();
        $result->sp_qry = $qry;
        $this->db->trans_begin();
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result = $this->mes_m->trans_sp_result($result->data, $result);
        if ($this->db->trans_status() === FALSE || $result->result == false ){
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }

    private function _save_mtrl_direct_input_mgt($param){
        //exit(json_encode($param));
        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        if(isset($param['grid02']['cu']) && strtoupper($param['grid02']['cu']) == "C"){ // insert
//            IN `in_fact_cd` VARCHAR(20),
//            IN `in_prt_nbr_cd` VARCHAR(20),
//            IN `in_lotno` VARCHAR(20),
//            IN `‌in_po_in_unit` VARCHAR(20),
//            IN `in_in_biz_cd` VARCHAR(20),
//            IN `in_out_biz_cd` VARCHAR(20),
//            IN `in_out_ship_cd` VARCHAR(20),
//            IN `in_in_qty` FLOAT,
//            IN `in_whs_cd` VARCHAR(20),
//            IN `in_loc_cd` VARCHAR(20),	## 창고위치정보를 안쓰면 '*'
//            IN `in_po_no` VARCHAR(20),
//            IN `in_po_seq` INT,
//            IN `in_remark` VARCHAR(1000),
//            IN `in_del_yn` CHAR(01),
//            IN `in_inst_id` VARCHAR(20),
//            OUT `out_result` INT,
//            OUT `out_message` VARCHAR(100)
            $fact_cd = $param['grid02']['w2ui']['changes']['fact_cd'];
            $prt_nbr_cd = $param['data']['like']['prt_nbr_cd'][0];
            $lotno_res = $this->mes_m->get_lotno_mgt($fact_cd, $prt_nbr_cd, 'PI');
            $lotno = '';
            if ($lotno_res->result){
                $lotno = $lotno_res->lotno;
                if ($lotno == ''){  // 입력받은 lotno 가 있어야만 한다. 없으면 에러.
                    if ($param['data']['like']['lotno'][0] == ''){  // 에러
                        $result->result = $lotno_res->result;
                        $result->msg = $lotno_res->msg;
                        exit(json_encode($result));
                    }else{
                        $lotno = $param['data']['like']['lotno'][0];
                    }
                }
            }else{
                // 채번 실패 에러
                $result->result = false;
                $result->msg = '채번에 실패하였습니다.';
                exit(json_encode($result));
            }

            $in_loc_cd = isset($param['data']['where']['in_loc_cd']) ? $param['data']['where']['in_loc_cd'] : '*';
            $remark = isset($param['data']['like']['remark']) ? $param['data']['like']['remark'][0] : '';
            $qry = "CALL usp_purchininfo_i2(
            '{$fact_cd}',
            '{$prt_nbr_cd}',
            '{$lotno}',
            '{$param['data']['where']['po_in_unit']}',
            '{$param['data']['like']['biz_cd'][0]}',
            '{$param['data']['like']['in_qty'][0]}',
            '{$param['data']['where']['in_whs_cd']}',
            '{$in_loc_cd}',
            '*',
            '0',
            '{$remark}',
            'N',
            '{$sess}',
            @result,
            @msg
            )";


            $result->sp_qry = $qry;
            $this->db->trans_begin();
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this->db->trans_status() === FALSE || $result->result == false ){
                $this->db->trans_rollback();
            }else{
                $this->db->trans_commit();
            }
            exit(json_encode($result));


//            $result = $this->mes_m->exec_sp($qry);
//            exit(json_encode($result));
        }else{ // update
//           1 IN `in_fact_cd` VARCHAR(20),
//           2 IN `in_po_in_no` VARCHAR(20),
//           3 IN `in_po_in_gbn` VARCHAR(20),
//           4 IN `in_prt_nbr_cd` VARCHAR(20),
//           5 IN `in_lotno` VARCHAR(20),
//           6 IN `‌in_po_in_unit` VARCHAR(20),
//           7 IN `in_in_biz_cd` VARCHAR(20),
//           8 IN `in_out_biz_cd` VARCHAR(20),
//           9 IN `in_out_ship_cd` VARCHAR(20),
//           0 IN `in_in_qty` FLOAT,               #수정 가능
//           1 IN `in_whs_cd` VARCHAR(20),
//           2 IN `in_loc_cd` VARCHAR(20),
//           3 IN `in_po_no` VARCHAR(20),
//           4 IN `in_po_seq` INT,
//           5 IN `in_remark` VARCHAR(1000),       #수정 가능
//           6 IN `in_del_yn` CHAR(01),
//           7 IN `in_inst_id` VARCHAR(20),        #수정 가능
//           8 OUT `out_result` INT,
//           9 OUT `out_message` VARCHAR(100)
//            exit(json_encode($param['grid02']['del_yn']));
//            $del_yn = $param['grid02']['del_yn'] ? "N" : "Y";
//            exit(json_encode($param));

            $del_yn = 'N';
            $in_loc_cd = $param['grid02']['in_loc_cd'] == '' ? '*' : $param['grid02']['in_loc_cd'];
            $remark = isset($param['data']['like']['remark'][0]) ? $param['data']['like']['remark'][0] : '';
            $qry = "CALL usp_purchininfo_u2(
            '{$param['grid02']['fact_cd']}',
            '{$param['grid02']['po_in_no']}',
            '{$param['grid02']['po_in_gbn']}',
            '{$param['grid02']['prt_nbr_cd']}',
            '{$param['grid02']['lotno']}',        
            '{$param['grid02']['po_in_unit']}',
            '{$param['grid02']['in_biz_cd']}',
            '{$param['data']['like']['in_qty'][0]}',                 
            '{$param['grid02']['in_whs_cd']}',
            '{$in_loc_cd}',
            '{$param['grid02']['po_no']}',
            '{$param['grid02']['po_seq']}',
            '{$remark}',
            '{$del_yn}',
            '{$sess}',
            @result,
            @msg
            )";
        }

//        $result = $this->mes_m->exec_sp($qry);

        $result->sp_qry = $qry;
        $this->db->trans_begin();
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result = $this->mes_m->trans_sp_result($result->data, $result);
        if ($this->db->trans_status() === FALSE || $result->result == false ){
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }

    private function _save_mtrl_direct_input_mgt_wp($param){
//        exit(json_encode($param));
        $sess = $this->session->userdata('emp_id');
        if(isset($param['grid02']['cu']) && strtoupper($param['grid02']['cu']) == "C"){ // insert
//            IN `in_fact_cd` VARCHAR(20),
//            IN `in_prt_nbr_cd` VARCHAR(20),
//            IN `in_lotno` VARCHAR(20),
//            IN `‌in_po_in_unit` VARCHAR(20),
//            IN `in_in_biz_cd` VARCHAR(20),
//            IN `in_out_biz_cd` VARCHAR(20),
//            IN `in_out_ship_cd` VARCHAR(20),
//            IN `in_in_qty` FLOAT,
//            IN `in_whs_cd` VARCHAR(20),
//            IN `in_loc_cd` VARCHAR(20),	## 창고위치정보를 안쓰면 '*'
//            IN `in_po_no` VARCHAR(20),
//            IN `in_po_seq` INT,
//            IN `in_remark` VARCHAR(1000),
//            IN `in_del_yn` CHAR(01),
//            IN `in_inst_id` VARCHAR(20),
//            OUT `out_result` INT,
//            OUT `out_message` VARCHAR(100)
            $lotno = isset($param['data']['like']['lotno'][0]) ? $param['data']['like']['lotno'][0] : '*';
            $in_loc_cd = isset($param['data']['where']['in_loc_cd']) ? $param['data']['where']['in_loc_cd'] : '*';
            $remark = isset($param['data']['like']['remark']) ? $param['data']['like']['remark'][0] : '';
            $qry = "CALL usp_purchininfo_i1(
            '{$param['grid02']['w2ui']['changes']['fact_cd']}',
            '{$param['data']['like']['prt_nbr_cd'][0]}',
            '{$param['data']['like']['out_ship_cd'][0]}',
            '{$param['data']['where']['po_in_unit']}',
            '*',
            '{$param['data']['like']['biz_cd'][0]}',
            '{$param['data']['like']['out_ship_cd'][0]}',
            '{$param['data']['like']['in_qty'][0]}',
            '{$param['data']['where']['in_whs_cd']}',
            '{$in_loc_cd}',
            '*',
            '0',
            '{$remark}',
            'N',
            '{$sess}',
            @result,
            @msg
            )";

            $result = $this->mes_m->get_response_data_form();
            $result->sp_qry = $qry;
            $this->db->trans_begin();
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this->db->trans_status() === FALSE || $result->result == false ){
                $this->db->trans_rollback();
            }else{
                $this->db->trans_commit();
            }
            exit(json_encode($result));


//            $result = $this->mes_m->exec_sp($qry);
//            exit(json_encode($result));
        }else{ // update
//           1 IN `in_fact_cd` VARCHAR(20),
//           2 IN `in_po_in_no` VARCHAR(20),
//           3 IN `in_po_in_gbn` VARCHAR(20),
//           4 IN `in_prt_nbr_cd` VARCHAR(20),
//           5 IN `in_lotno` VARCHAR(20),
//           6 IN `‌in_po_in_unit` VARCHAR(20),
//           7 IN `in_in_biz_cd` VARCHAR(20),
//           8 IN `in_out_biz_cd` VARCHAR(20),
//           9 IN `in_out_ship_cd` VARCHAR(20),
//           0 IN `in_in_qty` FLOAT,               #수정 가능
//           1 IN `in_whs_cd` VARCHAR(20),
//           2 IN `in_loc_cd` VARCHAR(20),
//           3 IN `in_po_no` VARCHAR(20),
//           4 IN `in_po_seq` INT,
//           5 IN `in_remark` VARCHAR(1000),       #수정 가능
//           6 IN `in_del_yn` CHAR(01),
//           7 IN `in_inst_id` VARCHAR(20),        #수정 가능
//           8 OUT `out_result` INT,
//           9 OUT `out_message` VARCHAR(100)
//            exit(json_encode($param['grid02']['del_yn']));
//            $del_yn = $param['grid02']['del_yn'] ? "N" : "Y";
//            exit(json_encode($param));
            // TODO : del_yn이 그리드에 없기 때문에 N으로 넣어놨음. 추후 보완 필요.
            $del_yn = 'N';
            $in_loc_cd = $param['grid02']['in_loc_cd'] == '' ? '*' : $param['grid02']['in_loc_cd'];
            $remark = isset($param['data']['like']['remark'][0]) ? $param['data']['like']['remark'][0] : '';
            $qry = "CALL usp_purchininfo_u1(
            '{$param['grid02']['fact_cd']}',
            '{$param['grid02']['po_in_no']}',
            '{$param['grid02']['po_in_gbn']}',
            '{$param['grid02']['prt_nbr_cd']}',
            '{$param['grid02']['lotno']}',        
            '{$param['grid02']['po_in_unit']}',   
            '{$param['grid02']['in_biz_cd']}',    
            '{$param['grid02']['out_biz_cd']}',  
            '{$param['grid02']['out_ship_cd']}',  
            '{$param['data']['like']['in_qty'][0]}',                 
            '{$param['grid02']['in_whs_cd']}',
            '{$in_loc_cd}',
            '{$param['grid02']['po_no']}',
            '{$param['grid02']['po_seq']}',
            '{$remark}',
            '{$del_yn}',
            '{$sess}',
            @result,
            @msg
            )";
        }

//        $result = $this->mes_m->exec_sp($qry);
        $result = $this->mes_m->get_response_data_form();
        $result->sp_qry = $qry;
        $this->db->trans_begin();
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result = $this->mes_m->trans_sp_result($result->data, $result);
        if ($this->db->trans_status() === FALSE || $result->result == false ){
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }

    private function _delete_mtrl_input_mgt_biz_ver($param){
//        exit(json_encode($param));
        $sess = $this->session->userdata('emp_id');
////        exit(json_encode($param));
////        usp_purchininfo_d1
////        IN `in_fact_cd` VARCHAR(20),
////        IN `in_po_in_no` VARCHAR(20),
////        IN `in_po_in_gbn` VARCHAR(20),
////        IN `in_prt_nbr_cd` VARCHAR(20),
////        IN `in_lotno` VARCHAR(20),
////        IN `‌in_po_in_unit` VARCHAR(20),
////        IN `in_in_biz_cd` VARCHAR(20),
////        IN `in_out_biz_cd` VARCHAR(20),
////        IN `in_out_ship_cd` VARCHAR(20),
////        IN `in_in_qty` FLOAT,
////        IN `in_whs_cd` VARCHAR(20),
////        IN `in_loc_cd` VARCHAR(20),
////        IN `in_po_no` VARCHAR(20),
////        IN `in_po_seq` INT,
////        IN `in_remark` VARCHAR(1000),
////        IN `in_del_yn` CHAR(01),
////        IN `in_inst_id` VARCHAR(20),
////        OUT `out_result` INT,
////        OUT `out_message` VARCHAR(100)
//        // $param['grid02']['del_yn'] true -> 'Y', false -> 'N'
//        $del_yn = 'N';
//        $in_loc_cd = $param['grid02']['in_loc_cd'] == '' ? '*' : $param['grid02']['in_loc_cd'];
//        $qry = "CALL usp_purchininfo_d1(
//        '{$param['grid02']['fact_cd']}',
//        '{$param['grid02']['po_in_no']}',
//        '{$param['grid02']['po_in_gbn']}',
//        '{$param['grid02']['prt_nbr_cd']}',
//        '{$param['grid02']['lotno']}',
//        '{$param['grid02']['po_in_unit']}',
//        '{$param['grid02']['in_biz_cd']}',
//        '{$param['grid02']['out_biz_cd']}',
//        '{$param['grid02']['out_ship_cd']}',
//        '{$param['grid02']['in_qty']}',
//        '{$param['grid02']['in_whs_cd']}',
//        '{$in_loc_cd}',
//        '{$param['grid02']['po_no']}',
//        '{$param['grid02']['po_seq']}',
//        '{$param['grid02']['remark']}',
//        '{$del_yn}',
//        '{$sess}',
//        @result,
//        @msg
//        )";
//        $result = $this->mes_m->get_response_data_form();
//        $result->sp_qry = $qry;
//        $this->db->trans_begin();
//        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
//        $result = $this->mes_m->trans_sp_result($result->data, $result);
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();

        foreach ($param['data'] as $key => $value) {
            //        usp_purchininfo_d1
            //        IN `in_fact_cd` VARCHAR(20),
            //        IN `in_po_in_no` VARCHAR(20),
            //        IN `in_po_in_gbn` VARCHAR(20),
            //        IN `in_prt_nbr_cd` VARCHAR(20),
            //        IN `in_lotno` VARCHAR(20),
            //        IN `‌in_po_in_unit` VARCHAR(20),
            //        IN `in_in_biz_cd` VARCHAR(20),
            //        IN `in_out_biz_cd` VARCHAR(20),
            //        IN `in_out_ship_cd` VARCHAR(20),
            //        IN `in_in_qty` FLOAT,
            //        IN `in_whs_cd` VARCHAR(20),
            //        IN `in_loc_cd` VARCHAR(20),
            //        IN `in_po_no` VARCHAR(20),
            //        IN `in_po_seq` INT,
            //        IN `in_remark` VARCHAR(1000),
            //        IN `in_del_yn` CHAR(01),
            //        IN `in_inst_id` VARCHAR(20),
            //        OUT `out_result` INT,
            //        OUT `out_message` VARCHAR(100)
            // $param['grid02']['del_yn'] true -> 'Y', false -> 'N'
            $del_yn = 'N';
            $in_loc_cd = $param['grid02']['in_loc_cd'] == '' ? '*' : $param['grid02']['in_loc_cd'];
            $qry = "CALL usp_purchininfo_d1(
            '{$value['fact_cd']}',
            '{$value['po_in_no']}',
            '{$value['po_in_gbn']}',
            '{$value['prt_nbr_cd']}',
            '{$value['lotno']}',
            '{$value['po_in_unit']}',
            '{$value['in_biz_cd']}',
            '{$value['out_biz_cd']}',
            '{$value['out_ship_cd']}',
            '{$value['in_qty']}',
            '{$value['in_whs_cd']}',
            '{$in_loc_cd}',
            '{$value['po_no']}',
            '{$value['po_seq']}',
            '{$value['remark']}',
            '{$del_yn}',
            '{$sess}',
            @result,
            @msg
            )";
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            $result->sp_qry = $qry;
        }
        if ($this->db->trans_status() === FALSE || $result->result == false ){
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
            $result->msg = "삭제되었습니다.";
        }
        exit(json_encode($result));
//        $result = $this->mes_m->exec_sp($qry);
//        exit(json_encode($result));
    }


    private function _delete_mtrl_input_mgt($param){
//        exit(json_encode($param));
        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();

        foreach ($param['data'] as $key => $value) {
            $del_yn = 'N';
            $in_loc_cd = $param['grid02']['in_loc_cd'] == '' ? '*' : $param['grid02']['in_loc_cd'];
            $qry = "CALL usp_purchininfo_d2(
            '{$value['fact_cd']}',
            '{$value['po_in_no']}',
            '{$value['po_in_gbn']}',
            '{$value['prt_nbr_cd']}',
            '{$value['lotno']}',
            '{$value['po_in_unit']}',
            '{$value['in_biz_cd']}',
            '{$value['in_qty']}',
            '{$value['in_whs_cd']}',
            '{$in_loc_cd}',
            '{$value['po_no']}',
            '{$value['po_seq']}',
            '{$value['remark']}',
            '{$del_yn}',
            '{$sess}',
            @result,
            @msg
            )";
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            $result->sp_qry = $qry;
        }
        if ($this->db->trans_status() === FALSE || $result->result == false ){
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
            //$result->msg = "삭제되었습니다.";
        }
        exit(json_encode($result));
//        $result = $this->mes_m->exec_sp($qry);
//        exit(json_encode($result));
    }


    private function _save_mtrl_input_mgt_biz_ver($param){

        //exit(json_encode($param));
        $sess = $this->session->userdata('emp_id');
        if(isset($param['grid02']['cu']) && strtoupper($param['grid02']['cu']) == "C"){ // insert
//            IN `in_fact_cd` VARCHAR(20),
//            IN `in_prt_nbr_cd` VARCHAR(20),
//            IN `in_lotno` VARCHAR(20),
//            IN `‌in_po_in_unit` VARCHAR(20),
//            IN `in_in_biz_cd` VARCHAR(20),
//            IN `in_out_biz_cd` VARCHAR(20),
//            IN `in_out_ship_cd` VARCHAR(20),
//            IN `in_in_qty` FLOAT,
//            IN `in_whs_cd` VARCHAR(20),
//            IN `in_loc_cd` VARCHAR(20),	## 창고위치정보를 안쓰면 '*'
//            IN `in_po_no` VARCHAR(20),
//            IN `in_po_seq` INT,
//            IN `in_remark` VARCHAR(1000),
//            IN `in_del_yn` CHAR(01),
//            IN `in_inst_id` VARCHAR(20),
//            OUT `out_result` INT,
//            OUT `out_message` VARCHAR(100)

            $lotno = isset($param['data']['like']['lotno'][0]) ? $param['data']['like']['lotno'][0] : '*';
            $in_loc_cd = isset($param['data']['where']['in_loc_cd']) ? $param['data']['where']['in_loc_cd'] : '*';
            $remark = isset($param['data']['like']['remark']) ? $param['data']['like']['remark'][0] : '';
            $qry = "CALL usp_purchininfo_i1(
                '{$param['grid01']['fact_cd']}',
                '{$param['grid01']['prt_nbr_cd']}',
                '{$lotno}',
                '{$param['data']['where']['po_in_unit']}',
                '{$param['grid01']['in_biz_cd']}',
                '{$param['grid01']['out_biz_cd']}',
                '{$param['grid01']['out_ship_cd']}',
                '{$param['data']['like']['in_qty'][0]}',
                '{$param['data']['where']['in_whs_cd']}',
                '{$in_loc_cd}',
                '{$param['grid01']['po_no']}',
                '{$param['grid01']['po_seq']}',
                '{$param['grid01']['remark']}',
                '{$param['grid01']['del_yn']}',
                '{$sess}',
                @result,
                @msg
            )";
//            $qry = "CALL usp_purchininfo_i1(
//            '{$param['grid02']['w2ui']['changes']['fact_cd']}',
//            '{$param['data']['like']['prt_nbr_cd'][0]}',
//            '{$param['data']['like']['out_ship_cd'][0]}',
//            '{$param['data']['where']['po_in_unit']}',
//            '*',
//            '{$param['data']['like']['biz_cd'][0]}',
//            '{$param['data']['like']['out_ship_cd'][0]}',
//            '{$param['data']['like']['in_qty'][0]}',
//            '{$param['data']['where']['in_whs_cd']}',
//            '{$in_loc_cd}',
//            '*',
//            '0',
//            '{$remark}',
//            'N',
//            '{$sess}',
//            @result,
//            @msg
//            )";

            $result = $this->mes_m->get_response_data_form();
            $result->sp_qry = $qry;
            $this->db->trans_begin();
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this->db->trans_status() === FALSE || $result->result == false ){
                $this->db->trans_rollback();
            }else{
                $this->db->trans_commit();
            }
            exit(json_encode($result));


//            $result = $this->mes_m->exec_sp($qry);
//            exit(json_encode($result));
        }else{ // update
//           1 IN `in_fact_cd` VARCHAR(20),
//           2 IN `in_po_in_no` VARCHAR(20),
//           3 IN `in_po_in_gbn` VARCHAR(20),
//           4 IN `in_prt_nbr_cd` VARCHAR(20),
//           5 IN `in_lotno` VARCHAR(20),
//           6 IN `‌in_po_in_unit` VARCHAR(20),
//           7 IN `in_in_biz_cd` VARCHAR(20),
//           8 IN `in_out_biz_cd` VARCHAR(20),
//           9 IN `in_out_ship_cd` VARCHAR(20),
//           0 IN `in_in_qty` FLOAT,               #수정 가능
//           1 IN `in_whs_cd` VARCHAR(20),
//           2 IN `in_loc_cd` VARCHAR(20),
//           3 IN `in_po_no` VARCHAR(20),
//           4 IN `in_po_seq` INT,
//           5 IN `in_remark` VARCHAR(1000),       #수정 가능
//           6 IN `in_del_yn` CHAR(01),
//           7 IN `in_inst_id` VARCHAR(20),        #수정 가능
//           8 OUT `out_result` INT,
//           9 OUT `out_message` VARCHAR(100)
//            exit(json_encode($param['grid02']['del_yn']));
//            $del_yn = $param['grid02']['del_yn'] ? "N" : "Y";
//            exit(json_encode($param));
            // TODO : del_yn이 그리드에 없기 때문에 N으로 넣어놨음. 추후 보완 필요.
            $del_yn = 'N';
            $in_loc_cd = $param['grid02']['in_loc_cd'] == '' ? '*' : $param['grid02']['in_loc_cd'];
            $remark = isset($param['data']['like']['remark'][0]) ? $param['data']['like']['remark'][0] : '';
            $qry = "CALL usp_purchininfo_u1(
            '{$param['grid02']['fact_cd']}',
            '{$param['grid02']['po_in_no']}',
            '{$param['grid02']['po_in_gbn']}',
            '{$param['grid02']['prt_nbr_cd']}',
            '{$param['grid02']['lotno']}',        
            '{$param['grid02']['po_in_unit']}',   
            '{$param['grid02']['in_biz_cd']}',    
            '{$param['grid02']['out_biz_cd']}',  
            '{$param['grid02']['out_ship_cd']}',  
            '{$param['data']['like']['in_qty'][0]}',                 
            '{$param['grid02']['in_whs_cd']}',
            '{$in_loc_cd}',
            '{$param['grid02']['po_no']}',
            '{$param['grid02']['po_seq']}',
            '{$remark}',
            '{$del_yn}',
            '{$sess}',
            @result,
            @msg
            )";
        }

//        $result = $this->mes_m->exec_sp($qry);
        $result = $this->mes_m->get_response_data_form();
        $result->sp_qry = $qry;
        $this->db->trans_begin();
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result = $this->mes_m->trans_sp_result($result->data, $result);
        if ($this->db->trans_status() === FALSE || $result->result == false  ){
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
        }
        exit(json_encode($result));

        // ################################## 이하 구버전 ####################################

//        exit(json_encode($param));
        $sess = $this->session->userdata('emp_id');
        if(isset($param['grid02']['cu']) && strtoupper($param['grid02']['cu']) == "C"){ // insert
//            IN `in_fact_cd` VARCHAR(20),
//            IN `in_prt_nbr_cd` VARCHAR(20),
//            IN `in_lotno` VARCHAR(20),
//            IN `‌in_po_in_unit` VARCHAR(20),
//            IN `in_in_biz_cd` VARCHAR(20),
//            IN `in_out_biz_cd` VARCHAR(20),
//            IN `in_out_ship_cd` VARCHAR(20),
//            IN `in_in_qty` FLOAT,
//            IN `in_whs_cd` VARCHAR(20),
//            IN `in_loc_cd` VARCHAR(20),	## 창고위치정보를 안쓰면 '*'
//            IN `in_po_no` VARCHAR(20),
//            IN `in_po_seq` INT,
//            IN `in_remark` VARCHAR(1000),
//            IN `in_del_yn` CHAR(01),
//            IN `in_inst_id` VARCHAR(20),
//            OUT `out_result` INT,
//            OUT `out_message` VARCHAR(100)
            $lotno = isset($param['data']['like']['lotno'][0]) ? $param['data']['like']['lotno'][0] : '*';
            $in_loc_cd = isset($param['data']['where']['in_loc_cd']) ? $param['data']['where']['in_loc_cd'] : '*';
            $qry = "CALL usp_purchininfo_i1(
            '{$param['grid01']['fact_cd']}',
            '{$param['grid01']['prt_nbr_cd']}',
            '{$lotno}',
            '{$param['data']['where']['po_in_unit']}',
            '{$param['grid01']['in_biz_cd']}',
            '{$param['grid01']['out_biz_cd']}',
            '{$param['grid01']['out_ship_cd']}',
            '{$param['data']['like']['in_qty'][0]}',
            '{$param['data']['where']['in_whs_cd']}',
            '{$in_loc_cd}',
            '{$param['grid01']['po_no']}',
            '{$param['grid01']['po_seq']}',
            '{$param['grid01']['remark']}',
            '{$param['grid01']['del_yn']}',
            '{$sess}',
            @result,
            @msg
            )";

            $result = $this->mes_m->get_response_data_form();
            $result->sp_qry = $qry;
            $this->db->trans_begin();
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this->db->trans_status() === FALSE || $result->result == false ){
                $this->db->trans_rollback();
            }else{
                $this->db->trans_commit();
            }
            exit(json_encode($result));


//            $result = $this->mes_m->exec_sp($qry);
//            exit(json_encode($result));
        }else{ // update
//           1 IN `in_fact_cd` VARCHAR(20),
//           2 IN `in_po_in_no` VARCHAR(20),
//           3 IN `in_po_in_gbn` VARCHAR(20),
//           4 IN `in_prt_nbr_cd` VARCHAR(20),
//           5 IN `in_lotno` VARCHAR(20),
//           6 IN `‌in_po_in_unit` VARCHAR(20),
//           7 IN `in_in_biz_cd` VARCHAR(20),
//           8 IN `in_out_biz_cd` VARCHAR(20),
//           9 IN `in_out_ship_cd` VARCHAR(20),
//           0 IN `in_in_qty` FLOAT,               #수정 가능
//           1 IN `in_whs_cd` VARCHAR(20),
//           2 IN `in_loc_cd` VARCHAR(20),
//           3 IN `in_po_no` VARCHAR(20),
//           4 IN `in_po_seq` INT,
//           5 IN `in_remark` VARCHAR(1000),       #수정 가능
//           6 IN `in_del_yn` CHAR(01),
//           7 IN `in_inst_id` VARCHAR(20),        #수정 가능
//           8 OUT `out_result` INT,
//           9 OUT `out_message` VARCHAR(100)
//            exit(json_encode($param['grid02']['del_yn']));
//            $del_yn = $param['grid02']['del_yn'] ? "N" : "Y";
//            exit(json_encode($param));
            // TODO : del_yn이 그리드에 없기 때문에 N으로 넣어놨음. 추후 보완 필요.
            $del_yn = 'N';
            $in_loc_cd = $param['grid02']['in_loc_cd'] == '' ? '*' : $param['grid02']['in_loc_cd'];
            $remark = isset($param['data']['like']['remark'][0]) ? $param['data']['like']['remark'][0] : '';
            $qry = "CALL usp_purchininfo_u1(
            '{$param['grid02']['fact_cd']}',
            '{$param['grid02']['po_in_no']}',
            '{$param['grid02']['po_in_gbn']}',
            '{$param['grid02']['prt_nbr_cd']}',
            '{$param['grid02']['lotno']}',        
            '{$param['grid02']['po_in_unit']}',   
            '{$param['grid02']['in_biz_cd']}',    
            '{$param['grid02']['out_biz_cd']}',  
            '{$param['grid02']['out_ship_cd']}',  
            '{$param['data']['like']['in_qty'][0]}',                 
            '{$param['grid02']['in_whs_cd']}',
            '{$in_loc_cd}',
            '{$param['grid02']['po_no']}',
            '{$param['grid02']['po_seq']}',
            '{$remark}',
            '{$del_yn}',
            '{$sess}',
            @result,
            @msg
            )";
        }

//        $result = $this->mes_m->exec_sp($qry);
        $result = $this->mes_m->get_response_data_form();
        $result->sp_qry = $qry;
        $this->db->trans_begin();
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result = $this->mes_m->trans_sp_result($result->data, $result);
        if ($this->db->trans_status() === FALSE || $result->result == false ){
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }

    private function _save_mtrl_input_mgt($param){

        //exit(json_encode($param));
        $result = $this->mes_m->get_response_data_form();
        $sess = $this->session->userdata('emp_id');
        if(isset($param['grid02']['cu']) && strtoupper($param['grid02']['cu']) == "C"){ // insert

            $fact_cd = $param['grid01']['fact_cd'];
            $prt_nbr_cd = $param['grid01']['prt_nbr_cd'];
            $lotno_res = $this->mes_m->get_lotno_mgt($fact_cd, $prt_nbr_cd, 'PI');
            $lotno = '';
            if ($lotno_res->result){
                $lotno = $lotno_res->lotno;
                if ($lotno == ''){  // 입력받은 lotno 가 있어야만 한다. 없으면 에러.
                    if ($param['data']['like']['lotno'][0] == ''){  // 에러
                        $result->result = $lotno_res->result;
                        $result->msg = $lotno_res->msg;
                        exit(json_encode($result));
                    }else{
                        $lotno = $param['data']['like']['lotno'][0];
                    }
                }
            }else{
                // 채번 실패 에러
                $result->result = false;
                $result->msg = '채번에 실패하였습니다.';
                exit(json_encode($result));
            }
            $in_loc_cd = isset($param['data']['where']['in_loc_cd']) ? $param['data']['where']['in_loc_cd'] : '*';
            $remark = isset($param['data']['like']['remark']) ? $param['data']['like']['remark'][0] : '';
            $qry = "CALL usp_purchininfo_i2(
                '{$fact_cd}',
                '{$prt_nbr_cd}',
                '{$lotno}',
                '{$param['data']['where']['po_in_unit']}',
                '{$param['grid01']['in_biz_cd']}',
                '{$param['data']['like']['in_qty'][0]}',
                '{$param['data']['where']['in_whs_cd']}',
                '{$in_loc_cd}',
                '{$param['grid01']['po_no']}',
                '{$param['grid01']['po_seq']}',
                '{$param['grid01']['remark']}',
                '{$param['grid01']['del_yn']}',
                '{$sess}',
                @result,
                @msg
            );";
        }else{ // update
            // TODO : del_yn이 그리드에 없기 때문에 N으로 넣어놨음. 추후 보완 필요.
            $del_yn = 'N';
            $in_loc_cd = $param['grid02']['in_loc_cd'] == '' ? '*' : $param['grid02']['in_loc_cd'];
            $remark = isset($param['data']['like']['remark'][0]) ? $param['data']['like']['remark'][0] : '';
            $qry = "CALL usp_purchininfo_u2(
            '{$param['grid02']['fact_cd']}',
            '{$param['grid02']['po_in_no']}',
            '{$param['grid02']['po_in_gbn']}',
            '{$param['grid02']['prt_nbr_cd']}',
            '{$param['grid02']['lotno']}',        
            '{$param['grid02']['po_in_unit']}',   
            '{$param['grid02']['in_biz_cd']}',
            '{$param['data']['like']['in_qty'][0]}',                 
            '{$param['grid02']['in_whs_cd']}',
            '{$in_loc_cd}',
            '{$param['grid02']['po_no']}',
            '{$param['grid02']['po_seq']}',
            '{$remark}',
            '{$del_yn}',
            '{$sess}',
            @result,
            @msg
            );";
        }

//        $result = $this->mes_m->exec_sp($qry);
        $result->sp_qry = $qry;
        $this->db->trans_begin();
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result = $this->mes_m->trans_sp_result($result->data, $result);
        if ($this->db->trans_status() === FALSE || $result->result == false ){
            $result->path='false';
            $this->db->trans_rollback();
        }else{
            $result->path='true';
            $this->db->trans_commit();
        }

//        $this->db->trans_begin();
//        $result = $this->mes_m->exec_sp($qry);
//        if ($this->db->trans_status() === FALSE){
//            $result->path='false';
//            $this->db->trans_rollback();
//        }else{
//            $result->path='true';
//            $this->db->trans_commit();
//        }

        exit(json_encode($result));
    }

    private function _get_directpurchininfo_biz_ver($param){
        $result = $this->mes_m->get_response_data_form();

        $cmpny_cd = $this->db->select('cd')->where('up_cd', 'cmpny_cd')->get('tbc_codeinfo')->row()->cd;

        $this->db->where('tpa_purchininfo.po_no', '*');
        $this->db->where('tpa_purchininfo.po_seq', '0');
        $this->db->where('tpa_purchininfo.del_yn', 'N');
        $this->db->where('tpa_purchininfo.fact_cd', $param['where']['fact_cd']);
        if(isset($param['where'])){
            // join 테이블에 맞춰 파라미터 변경
            //if(isset($param['where']['po_ymd_s'])) $this->db->where("tpa_purchininfo.in_dt >= ", $param['where']['po_ymd_s']);
            //if(isset($param['where']['po_ymd_e'])) $this->db->where("tpa_purchininfo.in_dt <= ", "DATE_ADD('{$param['where']['po_ymd_e']}', INTERVAL 1 DAY)");
            $this->db->where("tpa_purchininfo.rec_ymd BETWEEN '{$param['where']['po_ymd_s']}' AND '{$param['where']['po_ymd_e']}' ");
            if(isset($param['where']['account_type'])) $this->db->where('tbm_prtnbrinfo.account_type', $param['where']['account_type']);
        }
        if(isset($param['like'])){
            // join 테이블에 맞춰 파라미터 변경
            if(isset($param['like']['biz_cd'])) $this->db->like('tpa_purchininfo.in_ship_cd', $param['like']['biz_cd'][0], $param['like']['biz_cd'][1]);
            if(isset($param['like']['biz_nm'])) $this->db->like('tbs_bizinfo.biz_nm', $param['like']['biz_nm'][0], $param['like']['biz_nm'][1]);
            if(isset($param['like']['prt_nbr_cd'])) $this->db->like('tpa_purchininfo.prt_nbr_cd', $param['like']['prt_nbr_cd'][0], $param['like']['prt_nbr_cd'][1]);
            if(isset($param['like']['prt_nbr_nm'])) $this->db->like('tbm_prtnbrinfo.prt_nbr_nm', $param['like']['prt_nbr_nm'][0], $param['like']['prt_nbr_nm'][1]);
        }

        $result->data = $this->db->select("tbm_whsinfo.whs_nm, tbm_prtnbrinfo.spec, tbm_prtnbrinfo.prt_nbr_nm, tbm_whslocinfo.loc_nm,fnc_biz_nm('{$cmpny_cd}',tpa_purchininfo.in_biz_cd) as in_biz_nm, fnc_biz_nm('{$cmpny_cd}',tpa_purchininfo.out_biz_cd) as out_biz_nm ,fnc_ship_nm('{$cmpny_cd}',tpa_purchininfo.out_biz_cd,tpa_purchininfo.out_ship_cd) as out_ship_nm ,fnc_cd_nm(tpa_purchininfo.po_in_unit, 'unit_cd') as po_in_unit_nm, tpa_purchininfo.*")
            ->join('tbm_whsinfo', 'tpa_purchininfo.in_whs_cd = tbm_whsinfo.whs_cd', 'left')
            ->join('tbm_whslocinfo', 'tpa_purchininfo.in_whs_cd = tbm_whslocinfo.whs_cd AND tpa_purchininfo.in_loc_cd = tbm_whslocinfo.loc_cd', 'left')
            ->join("tbm_prtnbrinfo", "tpa_purchininfo.prt_nbr_cd = tbm_prtnbrinfo.prt_nbr_cd", "left")
            ->get("tpa_purchininfo")->result();
        $result->qry = $this->db->last_query();
        $result->msg = "조회되었습니다.";
        exit(json_encode($result));
    }

    private function _get_directpurchininfo($param){
        $result = $this->mes_m->get_response_data_form();

        $cmpny_cd = $this->db->select('cd')->where('up_cd', 'cmpny_cd')->get('tbc_codeinfo')->row()->cd;

        $this->db->where('tpa_purchininfo.po_no', '*');
        $this->db->where('tpa_purchininfo.po_seq', '0');
        $this->db->where('tpa_purchininfo.del_yn', 'N');
        $this->db->where('tpa_purchininfo.fact_cd', $param['where']['fact_cd']);
        if(isset($param['where'])){
            // join 테이블에 맞춰 파라미터 변경
            //if(isset($param['where']['po_ymd_s'])) $this->db->where("tpa_purchininfo.in_dt >= ", $param['where']['po_ymd_s']);
            //if(isset($param['where']['po_ymd_e'])) $this->db->where("tpa_purchininfo.in_dt <= ", "DATE_ADD('{$param['where']['po_ymd_e']}', INTERVAL 1 DAY)");
            $this->db->where("tpa_purchininfo.rec_ymd BETWEEN '{$param['where']['po_ymd_s']}' AND '{$param['where']['po_ymd_e']}' ");
            if(isset($param['where']['account_type'])) $this->db->where('tbm_prtnbrinfo.account_type', $param['where']['account_type']);
        }
        if(isset($param['like'])){
            // join 테이블에 맞춰 파라미터 변경
            if(isset($param['like']['biz_cd'])) $this->db->like('tpa_purchininfo.in_ship_cd', $param['like']['biz_cd'][0], $param['like']['biz_cd'][1]);
            if(isset($param['like']['biz_nm'])) $this->db->like('tbs_bizinfo.biz_nm', $param['like']['biz_nm'][0], $param['like']['biz_nm'][1]);
            if(isset($param['like']['prt_nbr_cd'])) $this->db->like('tpa_purchininfo.prt_nbr_cd', $param['like']['prt_nbr_cd'][0], $param['like']['prt_nbr_cd'][1]);
            if(isset($param['like']['prt_nbr_nm'])) $this->db->like('tbm_prtnbrinfo.prt_nbr_nm', $param['like']['prt_nbr_nm'][0], $param['like']['prt_nbr_nm'][1]);
        }

        $result->data = $this->db->select("tbm_whsinfo.whs_nm, tbm_prtnbrinfo.spec, tbm_prtnbrinfo.prt_nbr_nm, tbm_whslocinfo.loc_nm,fnc_biz_nm('{$cmpny_cd}',tpa_purchininfo.in_biz_cd) as in_biz_nm, fnc_biz_nm('{$cmpny_cd}',tpa_purchininfo.out_biz_cd) as out_biz_nm ,fnc_ship_nm('{$cmpny_cd}',tpa_purchininfo.out_biz_cd,tpa_purchininfo.out_ship_cd) as out_ship_nm ,fnc_cd_nm(tpa_purchininfo.po_in_unit, 'unit_cd') as po_in_unit_nm, tpa_purchininfo.*")
            ->join('tbm_whsinfo', 'tpa_purchininfo.in_whs_cd = tbm_whsinfo.whs_cd', 'left')
            ->join('tbm_whslocinfo', 'tpa_purchininfo.in_whs_cd = tbm_whslocinfo.whs_cd AND tpa_purchininfo.in_loc_cd = tbm_whslocinfo.loc_cd', 'left')
            ->join("tbm_prtnbrinfo", "tpa_purchininfo.prt_nbr_cd = tbm_prtnbrinfo.prt_nbr_cd", "left")
            ->get("tpa_purchininfo")->result();
        $result->qry = $this->db->last_query();
        $result->msg = "조회되었습니다.";
        exit(json_encode($result));
    }

    private function _get_directpurchininfo_wp($param){
//        exit(json_encode($param));
        $result = $this->mes_m->get_response_data_form();
        /**
        param[where][po_ymd_s]: 2020-06-30
        param[where][po_ymd_e]: 2020-07-23
        param[where][fact_cd]: winp01
        param[where][account_type]: 12
        param[like][biz_cd][]: G0002
        param[like][biz_cd][]: both
        param[like][biz_nm][]: ㈜건안산업
        param[like][biz_nm][]: both
        param[like][prt_nbr_cd][]: PBF116S 보강재-1.0T-1700-*
        param[like][prt_nbr_cd][]: both
        param[like][prt_nbr_nm][]: PBF116S 보강재
        param[like][prt_nbr_nm][]: both
        param[order_by]:
        cnct_btn: B0001
        cnct_url: /material/input/mtrl_direct_input_mgt_wp
         */

        // TODO : 주석 풀어야 함. 데이터가 없어서 테스트를 위해 잠시 주석.
        $this->db->where('tpa_purchininfo.po_no', '*');
        $this->db->where('tpa_purchininfo.po_seq', '0');
        $this->db->where('tpa_purchininfo.del_yn', 'N');
        $this->db->where('tpa_purchininfo.fact_cd', $param['where']['fact_cd']);
        if(isset($param['where'])){
            // join 테이블에 맞춰 파라미터 변경
            if(isset($param['where']['po_ymd_s'])) $this->db->where("tpa_purchininfo.in_dt >= ", $param['where']['po_ymd_s']);
            if(isset($param['where']['po_ymd_e'])) $this->db->where("tpa_purchininfo.in_dt <= ", "DATE_ADD('{$param['where']['po_ymd_e']}', INTERVAL 1 DAY)");
            if(isset($param['where']['account_type'])) $this->db->where('tbm_prtnbrinfo.account_type', $param['where']['account_type']);
        }
        if(isset($param['like'])){
            // join 테이블에 맞춰 파라미터 변경
            if(isset($param['like']['biz_cd'])) $this->db->like('tpa_purchininfo.in_ship_cd', $param['like']['biz_cd'][0], $param['like']['biz_cd'][1]);
            if(isset($param['like']['biz_nm'])) $this->db->like('tbs_bizinfo.biz_nm', $param['like']['biz_nm'][0], $param['like']['biz_nm'][1]);
            if(isset($param['like']['prt_nbr_cd'])) $this->db->like('tpa_purchininfo.prt_nbr_cd', $param['like']['prt_nbr_cd'][0], $param['like']['prt_nbr_cd'][1]);
            if(isset($param['like']['prt_nbr_nm'])) $this->db->like('tbm_prtnbrinfo.prt_nbr_nm', $param['like']['prt_nbr_nm'][0], $param['like']['prt_nbr_nm'][1]);
        }

        $result->data = $this->db->select("tbm_whsinfo.whs_nm, tbm_prtnbrinfo.spec, tbm_prtnbrinfo.prt_nbr_nm, tbm_whslocinfo.loc_nm,fnc_biz_nm('winplus',tpa_purchininfo.in_biz_cd) as in_biz_nm, fnc_biz_nm('winplus',tpa_purchininfo.out_biz_cd) as out_biz_nm ,fnc_ship_nm('winplus',tpa_purchininfo.out_biz_cd,tpa_purchininfo.out_ship_cd) as out_ship_nm ,fnc_cd_nm(tpa_purchininfo.po_in_unit, 'unit_cd') as po_in_unit_nm, tpa_purchininfo.*")
            ->join('tbm_whsinfo', 'tpa_purchininfo.in_whs_cd = tbm_whsinfo.whs_cd', 'left')
            ->join('tbm_whslocinfo', 'tpa_purchininfo.in_whs_cd = tbm_whslocinfo.whs_cd AND tpa_purchininfo.in_loc_cd = tbm_whslocinfo.loc_cd', 'left')
            ->join("tbm_prtnbrinfo", "tpa_purchininfo.prt_nbr_cd = tbm_prtnbrinfo.prt_nbr_cd", "left")
            ->get("tpa_purchininfo")->result();
        $result->qry = $this->db->last_query();
        $result->msg = "조회되었습니다.";
        exit(json_encode($result));
    }

    private function _get_purchininfo_biz_ver($param){
//        exit(json_encode($param));
        $result = $this->mes_m->get_response_data_form();
        /**
        SELECT tbm_whsinfo.whs_nm, tbm_whslocinfo.loc_nm, tpa_purchininfo.*
        FROM tpa_purchininfo
        LEFT JOIN tbm_whsinfo ON tpa_purchininfo.in_whs_cd = tbm_whsinfo.whs_cd
        LEFT JOIN tbm_whslocinfo ON tpa_purchininfo.in_whs_cd = tbm_whslocinfo.whs_cd AND tpa_purchininfo.in_loc_cd = tbm_whslocinfo.loc_cd;
         */
        $this->db->where('tpa_purchininfo.fact_cd', $param['where']['fact_cd']);
        $this->db->where('tpa_purchininfo.po_no', $param['where']['po_no']);
        $this->db->where('tpa_purchininfo.po_seq', $param['where']['po_seq']);
        $this->db->where('tpa_purchininfo.del_yn', 'N');
//        $this->db->where('tpa_purchininfo.fact_cd', $param['where']['fact_cd']);
//        $this->db->where('tpa_purchininfo.fact_cd', $param['where']['fact_cd']);
//        $this->db->where('tpa_purchininfo.fact_cd', $param['where']['fact_cd']);
        $result->data = $this->db->select("tbm_whsinfo.whs_nm, tbm_whslocinfo.loc_nm,
        fnc_biz_nm(tbs_bizinfo.cmpny_cd,tpa_purchininfo.in_biz_cd) as in_biz_nm, 
        fnc_biz_nm(tbs_bizinfo.cmpny_cd,tpa_purchininfo.out_biz_cd) as out_biz_nm ,
        fnc_ship_nm(tbs_bizinfo.cmpny_cd,tpa_purchininfo.out_biz_cd,tpa_purchininfo.out_ship_cd) as out_ship_nm ,
        fnc_cd_nm(tpa_purchininfo.po_in_unit, 'unit_cd') as po_in_unit_nm, tpa_purchininfo.*")
            ->join('tbm_whsinfo', 'tpa_purchininfo.in_whs_cd = tbm_whsinfo.whs_cd', 'left')
            ->join('tbm_whslocinfo', 'tpa_purchininfo.in_whs_cd = tbm_whslocinfo.whs_cd AND tpa_purchininfo.in_loc_cd = tbm_whslocinfo.loc_cd', 'left')
            ->join("tbs_bizinfo", "tbs_bizinfo.biz_cd = tpa_purchininfo.in_biz_cd", "left")
            ->get("tpa_purchininfo")->result();
        $result->qry = $this->db->last_query();
        exit(json_encode($result));
    }

    private function _get_purchininfo($param){
//        exit(json_encode($param));
        $result = $this->mes_m->get_response_data_form();
        /**
        SELECT tbm_whsinfo.whs_nm, tbm_whslocinfo.loc_nm, tpa_purchininfo.*
        FROM tpa_purchininfo
        LEFT JOIN tbm_whsinfo ON tpa_purchininfo.in_whs_cd = tbm_whsinfo.whs_cd
        LEFT JOIN tbm_whslocinfo ON tpa_purchininfo.in_whs_cd = tbm_whslocinfo.whs_cd AND tpa_purchininfo.in_loc_cd = tbm_whslocinfo.loc_cd;
         */
        $this->db->where('tpa_purchininfo.fact_cd', $param['where']['fact_cd']);
        $this->db->where('tpa_purchininfo.po_no', $param['where']['po_no']);
        $this->db->where('tpa_purchininfo.po_seq', $param['where']['po_seq']);
        $this->db->where('tpa_purchininfo.del_yn', 'N');
//        $this->db->where('tpa_purchininfo.fact_cd', $param['where']['fact_cd']);
//        $this->db->where('tpa_purchininfo.fact_cd', $param['where']['fact_cd']);
//        $this->db->where('tpa_purchininfo.fact_cd', $param['where']['fact_cd']);
        $result->data = $this->db->select("tbm_whsinfo.whs_nm, tbm_whslocinfo.loc_nm,
        fnc_biz_nm(tbs_bizinfo.cmpny_cd,tpa_purchininfo.in_biz_cd) as in_biz_nm, 
        fnc_biz_nm(tbs_bizinfo.cmpny_cd,tpa_purchininfo.out_biz_cd) as out_biz_nm ,
        fnc_ship_nm(tbs_bizinfo.cmpny_cd,tpa_purchininfo.out_biz_cd,tpa_purchininfo.out_ship_cd) as out_ship_nm ,
        fnc_cd_nm(tpa_purchininfo.po_in_unit, 'unit_cd') as po_in_unit_nm, tpa_purchininfo.*")
            ->join('tbm_whsinfo', 'tpa_purchininfo.in_whs_cd = tbm_whsinfo.whs_cd', 'left')
            ->join('tbm_whslocinfo', 'tpa_purchininfo.in_whs_cd = tbm_whslocinfo.whs_cd AND tpa_purchininfo.in_loc_cd = tbm_whslocinfo.loc_cd', 'left')
            ->join("tbs_bizinfo", "tbs_bizinfo.biz_cd = tpa_purchininfo.in_biz_cd", "left")
            ->get("tpa_purchininfo")->result();
        $result->qry = $this->db->last_query();
        exit(json_encode($result));
    }

    private function _get_purchinfo_biz_ver($param){
        $result = $this->mes_m->get_response_data_form();

//        $this->db->select("(tpa_purchinfo.po_qty - ifnull(tpa_purchininfo.in_qty, 0)) as remain, tbs_bizinfo.biz_nm, tbm_prtnbrinfo.spec, tbm_prtnbrinfo.prt_nbr_nm, tbm_prtnbrinfo.account_type, tbm_prtnbrinfo.inspct_yn, tpa_purchinfo.*, tpa_purchininfo.in_qty");
//        $this->db->select("(tpa_purchinfo.po_qty - ifnull(tpa_purchinfo.in_qty, 0)) as remain, tbs_bizinfo.biz_nm, tbm_prtnbrinfo.spec, tbm_prtnbrinfo.prt_nbr_nm, tbm_prtnbrinfo.account_type, tbm_prtnbrinfo.inspct_yn, tpa_purchinfo.*, tpa_purchininfo.in_qty, tbc_codeinfo.cd_nm");
        $this->db->select("(tpa_purchinfo.po_qty - ifnull(tpa_purchinfo.in_qty, 0)) as remain, tbs_bizinfo.biz_nm, tbm_prtnbrinfo.spec, tbm_prtnbrinfo.prt_nbr_nm, tbm_prtnbrinfo.account_type, tbm_prtnbrinfo.inspct_yn, fnc_ship_nm('winplus', `tpa_purchinfo`.`out_biz_cd`, tpa_purchinfo.out_ship_cd) as out_ship_nm, 
    fnc_biz_nm('winplus', tpa_purchinfo.out_biz_cd) as out_biz_nm, tpa_purchinfo.*, tbc_codeinfo.cd_nm");
        $this->db->where('tpa_purchinfo.apval_yn', 'Y');
        $this->db->where('tpa_purchinfo.del_yn', 'N');
        if(isset($param['where'])){
            // join 테이블에 맞춰 파라미터 변경
            if(isset($param['where']['fact_cd'])) $this->db->where('tpa_purchinfo.fact_cd', $param['where']['fact_cd']);
            if(isset($param['where']['account_type'])) $this->db->where('tbm_prtnbrinfo.account_type', $param['where']['account_type']);
            if(isset($param['where']['po_ymd_s'])) $this->db->where("tpa_purchinfo.po_ymd >= ", $param['where']['po_ymd_s']);
            if(isset($param['where']['po_ymd_e'])) $this->db->where("tpa_purchinfo.po_ymd <= ", $param['where']['po_ymd_e']);
        }
        if(isset($param['like'])){
            // join 테이블에 맞춰 파라미터 변경
            if(isset($param['like']['biz_cd'])) $this->db->like('tpa_purchinfo.in_biz_cd', $param['like']['biz_cd'][0], $param['like']['biz_cd'][1]);
            if(isset($param['like']['biz_nm'])) $this->db->like('tbs_bizinfo.biz_nm', $param['like']['biz_nm'][0], $param['like']['biz_nm'][1]);
            if(isset($param['like']['prt_nbr_cd'])) $this->db->like('tpa_purchinfo.prt_nbr_cd', $param['like']['prt_nbr_cd'][0], $param['like']['prt_nbr_cd'][1]);
            if(isset($param['like']['prt_nbr_nm'])) $this->db->like('tbm_prtnbrinfo.prt_nbr_nm', $param['like']['prt_nbr_nm'][0], $param['like']['prt_nbr_nm'][1]);
            if(isset($param['like']['po_no'])) $this->db->like('tpa_purchinfo.po_no', $param['like']['po_no'][0], $param['like']['po_no'][1]);
        }

        $this->db->join("tbc_codeinfo", "tbc_codeinfo.cd = tpa_purchinfo.po_unit AND tbc_codeinfo.up_cd = 'unit_cd'","left");
        $this->db->join("tbm_prtnbrinfo", "tpa_purchinfo.prt_nbr_cd = tbm_prtnbrinfo.prt_nbr_cd", "left");
        $this->db->join("tbs_bizinfo", "tbs_bizinfo.biz_cd = tpa_purchinfo.in_biz_cd", "left");
//        $this->db->join("tpa_purchininfo", "tpa_purchininfo.fact_cd = tpa_purchinfo.fact_cd AND tpa_purchininfo.po_no = tpa_purchinfo.po_no AND tpa_purchininfo.po_seq = tpa_purchinfo.po_seq", "left");
        $result->data = $this->db->get("tpa_purchinfo")->result();
        $result->qry = $this->db->last_query();
        exit(json_encode($result));
    }

    private function _get_purchinfo($param){
        $result = $this->mes_m->get_response_data_form();

//        $this->db->select("(tpa_purchinfo.po_qty - ifnull(tpa_purchininfo.in_qty, 0)) as remain, tbs_bizinfo.biz_nm, tbm_prtnbrinfo.spec, tbm_prtnbrinfo.prt_nbr_nm, tbm_prtnbrinfo.account_type, tbm_prtnbrinfo.inspct_yn, tpa_purchinfo.*, tpa_purchininfo.in_qty");
//        $this->db->select("(tpa_purchinfo.po_qty - ifnull(tpa_purchinfo.in_qty, 0)) as remain, tbs_bizinfo.biz_nm, tbm_prtnbrinfo.spec, tbm_prtnbrinfo.prt_nbr_nm, tbm_prtnbrinfo.account_type, tbm_prtnbrinfo.inspct_yn, tpa_purchinfo.*, tpa_purchininfo.in_qty, tbc_codeinfo.cd_nm");
        $this->db->select("(tpa_purchinfo.po_qty - ifnull(tpa_purchinfo.in_qty, 0)) as remain, tbs_bizinfo.biz_nm, tbm_prtnbrinfo.spec, tbm_prtnbrinfo.prt_nbr_nm, tbm_prtnbrinfo.account_type, tbm_prtnbrinfo.inspct_yn, fnc_ship_nm('winplus', `tpa_purchinfo`.`out_biz_cd`, tpa_purchinfo.out_ship_cd) as out_ship_nm, 
    fnc_biz_nm('winplus', tpa_purchinfo.out_biz_cd) as out_biz_nm, tpa_purchinfo.*, tbc_codeinfo.cd_nm");
        $this->db->where('tpa_purchinfo.apval_yn', 'Y');
        $this->db->where('tpa_purchinfo.del_yn', 'N');
        if(isset($param['where'])){
            // join 테이블에 맞춰 파라미터 변경
            if(isset($param['where']['fact_cd'])) $this->db->where('tpa_purchinfo.fact_cd', $param['where']['fact_cd']);
            if(isset($param['where']['account_type'])) $this->db->where('tbm_prtnbrinfo.account_type', $param['where']['account_type']);
            if(isset($param['where']['po_ymd_s'])) $this->db->where("tpa_purchinfo.po_ymd >= ", $param['where']['po_ymd_s']);
            if(isset($param['where']['po_ymd_e'])) $this->db->where("tpa_purchinfo.po_ymd <= ", $param['where']['po_ymd_e']);
        }
        if(isset($param['like'])){
            // join 테이블에 맞춰 파라미터 변경
            if(isset($param['like']['biz_cd'])) $this->db->like('tpa_purchinfo.in_biz_cd', $param['like']['biz_cd'][0], $param['like']['biz_cd'][1]);
            if(isset($param['like']['biz_nm'])) $this->db->like('tbs_bizinfo.biz_nm', $param['like']['biz_nm'][0], $param['like']['biz_nm'][1]);
            if(isset($param['like']['prt_nbr_cd'])) $this->db->like('tpa_purchinfo.prt_nbr_cd', $param['like']['prt_nbr_cd'][0], $param['like']['prt_nbr_cd'][1]);
            if(isset($param['like']['prt_nbr_nm'])) $this->db->like('tbm_prtnbrinfo.prt_nbr_nm', $param['like']['prt_nbr_nm'][0], $param['like']['prt_nbr_nm'][1]);
            if(isset($param['like']['po_no'])) $this->db->like('tpa_purchinfo.po_no', $param['like']['po_no'][0], $param['like']['po_no'][1]);
        }

        $this->db->join("tbc_codeinfo", "tbc_codeinfo.cd = tpa_purchinfo.po_unit AND tbc_codeinfo.up_cd = 'unit_cd'","left");
        $this->db->join("tbm_prtnbrinfo", "tpa_purchinfo.prt_nbr_cd = tbm_prtnbrinfo.prt_nbr_cd", "left");
        $this->db->join("tbs_bizinfo", "tbs_bizinfo.biz_cd = tpa_purchinfo.in_biz_cd", "left");
//        $this->db->join("tpa_purchininfo", "tpa_purchininfo.fact_cd = tpa_purchinfo.fact_cd AND tpa_purchininfo.po_no = tpa_purchinfo.po_no AND tpa_purchininfo.po_seq = tpa_purchinfo.po_seq", "left");
        $result->data = $this->db->get("tpa_purchinfo")->result();
        $result->qry = $this->db->last_query();
        exit(json_encode($result));
    }

    private function _get_term_input_staus($data_list = []){
        $qry = "SELECT 
                    a.rec_ymd,
                    a.po_in_gbn,
                    a.in_biz_cd,
                    fnc_biz_nm('winplus',a.in_biz_cd) in_biz_nm,
                    a.dyn_biz_cd,
                    a.out_biz_cd,		#출고처
                    fnc_biz_nm('winplus',a.out_biz_cd) out_biz_nm,
                    a.out_ship_cd,
                    fnc_ship_nm('winplus',a.out_biz_cd,a.out_ship_cd) out_ship_nm,
                    b.po_no,
                    b.po_seq,
                    a.po_in_no,
                    c.prt_nbr_cd,
                    c.prt_nbr_nm,
                    c.spec,
                    b.po_qty,			#발주수량
                    a.in_qty,
                    a.lotno,
                    (SELECT SUM(s1.in_qty) FROM tpa_purchininfo s1 WHERE s1.fact_cd = a.fact_cd AND a.po_no = b.po_no AND a.po_seq = s1.po_seq AND s1.del_yn = 'N') all_in_qty,	#총입고량
                    (SELECT SUM(CASE WHEN s2.po_in_gbn IN ('115','117') THEN s2.in_qty ELSE 0 END) FROM tpa_purchininfo s2 WHERE s2.fact_cd = a.fact_cd AND a.po_no = b.po_no AND a.po_seq = s2.po_seq AND s2.del_yn = 'N') pure_in_qty#총수량
                FROM tpa_purchininfo a
                     LEFT OUTER join tpa_purchinfo b ON (a.po_no = b.po_no AND a.po_seq = b.po_seq)
                      LEFT OUTER JOIN tbm_prtnbrinfo c ON (a.prt_nbr_cd = c.prt_nbr_cd)
                WHERE  a.del_yn = 'N'
                AND a.in_biz_cd LIKE CONCAT('%','{$data_list['biz_cd']}','%')
                AND fnc_biz_nm('winplus',a.in_biz_cd) LIKE CONCAT('%','{$data_list['biz_nm']}','%')
                AND a.po_in_gbn LIKE CONCAT('%','{$data_list['po_in_gbn']}','%')
                AND a.rec_ymd BETWEEN '{$data_list['date1']}' AND '{$data_list['date2']}';";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_data_ref($param = ''){
        if(isset($param['like'])) {
            $biz_cd = isset($param['like']['biz_cd']) ? $param['like']['biz_cd'][0] : '';
            $biz_nm = isset($param['like']['biz_nm']) ? $param['like']['biz_nm'][0] : '';
        }else {
            $biz_cd = '';
            $biz_nm = '';
        }
        if(isset($param['where'])){
            $date1 = isset($param['where']['date1']) ? $param['where']['date1'] : '';
            $date2 = isset($param['where']['date2']) ? $param['where']['date2'] : '';
            $po_in_gbn = isset($param['where']['po_in_gbn']) ? $param['where']['po_in_gbn'] : '';
        }else{
            $date1 = '';
            $date2 = '';
            $po_in_gbn = '';
        }

        $data_list = [
            "biz_cd" => $biz_cd,
            "biz_nm" => $biz_nm,
            "date1" => $date1,
            "date2" => $date2,
            "po_in_gbn" => $po_in_gbn,
        ];

        return $data_list;
    }

    private function _get_table($path = ''){
        $tables = [
            'term_input_staus' => [''],
        ];
        return $tables[$path];
    }
}