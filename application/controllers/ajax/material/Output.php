<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Output extends CI_Controller
{
    public function get($path = ''){

        $join = null;

        $param = $this->input->get(null, true)['param'];

        $data_list = $this->_get_data_ref($param);

        if($path == 'term_output_staus'){
            $this->_get_term_output_staus($data_list);
        }else if($path == 'mtrl_output_mgt'){
            $this->_get_mtrl_output_mgt($param);
        }else if($path == 'mtrl_output_mgt_wp'){
            $this->_get_mtrl_output_mgt_wp($param);
        }else if($path == 'mtrl_output_detail'){
            $this->_get_mtrl_output_detail($param);
        }else if($path == 'term_output_staus_wp'){
            $this->_get_term_output_staus_wp($data_list);
        }else if($path == 'mtrl_prdmove_mgt'){
            $this->_get_mtrl_prdmove_mgt($data_list);
        }else if($path == 'mtrl_prdmove_mgt_mpn'){
            $this->_get_mtrl_prdmove_mgt_mpn();
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

        if($path == 'mtrl_output_mgt'){
            $this->_save_mtrl_output_mgt($this->input->post(null, true));
        }else if($path == 'mtrl_prdmove_mgt'){
            $this->_save_mtrl_prdmove_mgt($param[0]);
        }

        $tb = $this->_get_table($path);
        $data = $this->mes_m->save($tb, $param);

        echo json_encode($data);
    }

    public function delete($path = ''){

        $param = $this->input->post(null, true)['param'];

        if($path == 'mtrl_output_mgt'){
            $this->_delete_mtrl_output_mgt($param);
        }else if($path == 'mtrl_prdmove_mgt'){
            $this->_delete_mtrl_prdmove_mgt($param);
        }

        $tb = $this->_get_table($path);
        $result = $this->mes_m->delete($tb, $param);
        echo json_encode($result);
    }

    private function _delete_mtrl_output_mgt($param){
//        exit(json_encode($param));
        $inst_id = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        //    IN `in_fact_cd`     VARCHAR(20),
        //    IN `in_output_no`   VARCHAR(20),
        //    IN `in_out_gbn`     VARCHAR(20),
        //    IN `in_out_dt`      VARCHAR(20),
        //    IN `‌in_rec_ymd`     VARCHAR(20),
        //    IN `in_prt_nbr_cd`  VARCHAR(20),
        //    IN `in_lotno`       VARCHAR(20),
        //    IN `in_out_qty`     FLOAT,
        //    IN `in_out_unit`    VARCHAR(20),
        //    IN `in_out_whs_cd`  VARCHAR(20),
        //    IN `in_out_loc_cd`  VARCHAR(20),
        //    IN `in_remark`      VARCHAR(1000),
        //    IN `in_del_yn`      CHAR(01),
        //    IN `in_inst_id` VARCHAR(20),
        //    OUT `out_result` INT,
        //    OUT `out_message` VARCHAR(100)
        foreach ($param as $key => $value) {
            if(!$value['w2ui']['changes']['chk']){continue;}
            $qry = "CALL usp_outputinfo_d1(
                '{$value['fact_cd']}',
                '{$value['out_no']}',
                '221',
                '{$value['out_dt']}',
                '{$value['rec_ymd']}',
                '{$value['prt_nbr_cd']}',
                '{$value['lotno']}',
                '{$value['out_qty']}',
                '{$value['out_unit']}',
                '{$value['out_whs_cd']}',
                '{$value['out_loc_cd']}',
                '{$value['remark']}',
                'Y',
                '{$inst_id}',
                @result,
                @msg
            )";
            $result->qry_list[] = $qry;
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if (!$result->result ) {   //체크!@# !$result->result
                $this->db->trans_rollback();
                exit(json_encode($result));
            }
        }


        if ($this->db->trans_status() === FALSE  || $result->result == false){
            $result->msg = '삭제되지 않았습니다.';
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '삭제되었습니다.';
            $this->db->trans_commit();
        }

        exit(json_encode($result));

    }

    private function _delete_mtrl_prdmove_mgt($param){
        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        for($i=0; $i < count($param); $i++){
            $qry = "CALL usp_prdmove_d1(
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
            if ($this->db->trans_status() === FALSE  || $result->result == false) {   //체크!@# !$result->result
                $this->db->trans_rollback();
                exit(json_encode($result));
            }
        }
        if ($this->db->trans_status() === FALSE  || $result->result == false){
            $result->msg = '삭제되지 않았습니다.';
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '삭제되었습니다.';
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }

    private function _save_mtrl_prdmove_mgt($param){
        $records = $param['records'];
        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        if($records['cu'] === 'c'){
            $qry = "CALL usp_prdmove_i1(
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
            $qry = "CALL usp_prdmove_u1(
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
        if ($this->db->trans_status() === FALSE ||  $result->result == false ){
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

    private function _get_mtrl_output_detail($param){
        //    SELECT * FROM `mtrl_output_mgt_v2`
        //    WHERE `mtrl_output_mgt_v2`.`out_loc_cd` = '*'
        //    AND `mtrl_output_mgt_v2`.`lotno` = '*'
        //    AND `mtrl_output_mgt_v2`.`fact_cd` = 'winp01'
        //    AND `mtrl_output_mgt_v2`.`out_whs_cd` = 'W0002'
        //    AND `mtrl_output_mgt_v2`.`prt_nbr_cd` = 'CT-PBF-252'
        //    AND DATE(out_dt) >= '2020-07-20'
        //    AND DATE(out_dt) <= '2020-07-20';
//        exit(json_encode($param));
        $where = [
            'where'=> [
                'out_loc_cd' => $param['loc_cd'],
                'lotno' => $param['lotno'],
                'fact_cd' => $param['fact_cd'],
                'out_whs_cd' => $param['whs_cd'],
                'prt_nbr_cd' => $param['prt_nbr_cd'],
                'DATE(out_dt) BETWEEN ' => $param['date_s']."' AND '".$param['date_e']
//                'DATE(out_dt) BETWEEN "'.$param['date_s'].'" AND "'.$param['date_e'].'"'
            ]
        ];
        $result = $this->mes_m->get('mtrl_output_mgt_v2', $where);
        $result->last_qry = $this->db->last_query();
        exit(json_encode($result));
    }

    private function _save_mtrl_output_mgt($param){
//        exit(json_encode($param));
        /*
         * 기본 정보 : selected_row -> grid01
         * 추가되는 정보 : param[1] 안의 배열
         * param[1][i]['cu'] 값에 따라 insert/update
         */

        $grid01 = $param['selected_row']['grid01'];
        $grid02 = $param['selected_row']['grid02'];

        $in_fact_cd = $grid01['fact_cd'];
//        $in_output_no = $grid01[''];
//        $in_out_gbn = $grid01[''];    // ???
//        $in_out_dt = $grid01[''];       // NOW()??
//        $‌in_rec_ymd = $grid01[''];
        $in_prt_nbr_cd = $grid01['prt_nbr_cd'];
        $in_lotno = $grid01['lotno'];

//        $in_out_qty = $grid02['out_qty'];

        $in_out_unit = $grid01['stck_unit'];
        $in_out_whs_cd = $grid01['stck_whs_cd'];
        $in_out_loc_cd = $grid01['stck_loc_cd'] == '' ? '*' : $grid01['stck_loc_cd'];
        $in_remark = $grid01['remark'];
        $in_del_yn = 'N';


        $in_inst_id = $this->session->userdata('emp_id');
        $out_result = '@result';
        $out_message = '@msg';


        $result = $this->mes_m->get_response_data_form();
        $result->qry_list = [];
        $result->param = $param;
        $this->db->trans_begin();

        foreach ($param['records']['grid02'] as $key => $value) {
            if (isset($value['cu']) && strtoupper($value['cu']) == 'C'){ // insert

//                IN  `in_fact_cd`     VARCHAR(20),
//            #	IN  `in_output_no`   VARCHAR(20),
//                IN  `in_out_gbn`     VARCHAR(20),   // 생산 출고 : 221
//            #	IN  `in_out_dt`      VARCHAR(20),
//            #	IN  `‌in_rec_ymd`     VARCHAR(20),
//                IN  `in_prt_nbr_cd`  VARCHAR(20),
//                IN  `in_lotno`       VARCHAR(20),
//                IN  `in_out_qty`     FLOAT,
//                IN  `in_out_unit`    VARCHAR(20),
//                IN  `in_out_whs_cd`  VARCHAR(20),
//                IN  `in_out_loc_cd`  VARCHAR(20),
//                IN  `in_remark`      VARCHAR(1000),
//                IN  `in_del_yn`      CHAR(01),
//                IN  `in_inst_id`     VARCHAR(20),
//                OUT `out_result`    INT,
//                OUT `out_message`   VARCHAR(100)

                $qry = "CALL usp_outputinfo_i1(
                    '{$value['fact_cd']}',
                    '221',
                    '{$value['prt_nbr_cd']}',
                    '{$value['lotno']}',
                    '{$value['w2ui']['changes']['out_qty']}',
                    '{$value['out_unit']}',
                    '{$value['out_whs_cd']}',
                    '{$value['out_loc_cd']}',
                    '{$value['remark']}',
                    'N',
                    '{$in_inst_id}',
                    {$out_result},
                    {$out_message}
                )";
                $result->qry_list[] = $qry;
                $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            }else if(isset($value['w2ui'])){  // update

//                IN `in_fact_cd`     VARCHAR(20),
//                IN `in_output_no`   VARCHAR(20),
//                IN `in_out_gbn`     VARCHAR(20),
//                IN `in_out_dt`      VARCHAR(20),
//                IN `‌in_rec_ymd`     VARCHAR(20),
//                IN `in_prt_nbr_cd`  VARCHAR(20),
//                IN `in_lotno`       VARCHAR(20),
//                IN `in_out_qty`     FLOAT,
//                IN `in_out_unit`    VARCHAR(20),
//                IN `in_out_whs_cd`  VARCHAR(20),
//                IN `in_out_loc_cd`  VARCHAR(20),
//                IN `in_remark`      VARCHAR(1000),
//                IN `in_del_yn`      CHAR(01),
//                IN `in_inst_id` VARCHAR(20),
//                OUT `out_result` INT,
//                OUT `out_message` VARCHAR(100)

                // CALL usp_outputinfo_u1( 'winp01', '', '221', '', '', 'CT-PBF-252', '*', '10', '04', '', '*', '', 'N', 'yohan', @result, @msg)
                $qry = "CALL usp_outputinfo_u1(
                    '{$value['fact_cd']}',
                    '{$value['out_no']}',
                    '221',
                    '{$value['out_dt']}',
                    '{$value['rec_ymd']}',
                    '{$value['prt_nbr_cd']}',
                    '{$value['lotno']}',
                    '{$value['w2ui']['changes']['out_qty']}',
                    '{$value['out_unit']}',
                    '{$value['out_whs_cd']}',
                    '{$value['out_loc_cd']}',
                    '{$value['remark']}',
                    'N',
                    '{$value['inst_id']}',
                    {$out_result},
                    {$out_message}
                )";
                $result->qry_list[] = $qry;
                $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            }

            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if ($this-> db ->trans_status() === FALSE || $result->result = false) {     //체크!@#
                $this->db->trans_rollback();
                exit(json_encode($result));
            }
        }

        /*
        foreach ($param['param'][1] as $key => $value) {
            if (strtoupper($value['cu']) == 'C'){ // insert

//                IN  `in_fact_cd`     VARCHAR(20),
//            #	IN  `in_output_no`   VARCHAR(20),
//                IN  `in_out_gbn`     VARCHAR(20),   // 생산 출고 : 221
//            #	IN  `in_out_dt`      VARCHAR(20),
//            #	IN  `‌in_rec_ymd`     VARCHAR(20),
//                IN  `in_prt_nbr_cd`  VARCHAR(20),
//                IN  `in_lotno`       VARCHAR(20),
//                IN  `in_out_qty`     FLOAT,
//                IN  `in_out_unit`    VARCHAR(20),
//                IN  `in_out_whs_cd`  VARCHAR(20),
//                IN  `in_out_loc_cd`  VARCHAR(20),
//                IN  `in_remark`      VARCHAR(1000),
//                IN  `in_del_yn`      CHAR(01),
//                IN  `in_inst_id`     VARCHAR(20),
//                OUT `out_result`    INT,
//                OUT `out_message`   VARCHAR(100)

                $qry = "CALL usp_outputinfo_i1(
                    '{$in_fact_cd}',
                    '221',
                    '{$in_prt_nbr_cd}',
                    '{$in_lotno}',
                    '{$value['out_qty']}',
                    '{$in_out_unit}',
                    '{$value['out_whs_cd']}',
                    '{$in_out_loc_cd}',
                    '{$in_remark}',
                    'N',
                    '{$in_inst_id}',
                    {$out_result},
                    {$out_message}
                )";
                $result->qry_list[] = $qry;
//                $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            }else{  // update

//                IN `in_fact_cd`     VARCHAR(20),
//                IN `in_output_no`   VARCHAR(20),
//                IN `in_out_gbn`     VARCHAR(20),
//                IN `in_out_dt`      VARCHAR(20),
//                IN `‌in_rec_ymd`     VARCHAR(20),
//                IN `in_prt_nbr_cd`  VARCHAR(20),
//                IN `in_lotno`       VARCHAR(20),
//                IN `in_out_qty`     FLOAT,
//                IN `in_out_unit`    VARCHAR(20),
//                IN `in_out_whs_cd`  VARCHAR(20),
//                IN `in_out_loc_cd`  VARCHAR(20),
//                IN `in_remark`      VARCHAR(1000),
//                IN `in_del_yn`      CHAR(01),
//                IN `in_inst_id` VARCHAR(20),
//                OUT `out_result` INT,
//                OUT `out_message` VARCHAR(100)

                // CALL usp_outputinfo_u1( 'winp01', '', '221', '', '', 'CT-PBF-252', '*', '10', '04', '', '*', '', 'N', 'yohan', @result, @msg)
                $qry = "CALL usp_outputinfo_u1(
                    '{$in_fact_cd}',
                    '{$value['out_no']}',
                    '221',
                    '{$value['out_dt']}',
                    '{$value['rec_ymd']}',
                    '{$in_prt_nbr_cd}',
                    '{$in_lotno}',
                    '{$value['out_qty']}',
                    '{$in_out_unit}',
                    '{$value['out_whs_cd']}',
                    '{$in_out_loc_cd}',
                    '{$in_remark}',
                    'N',
                    '{$in_inst_id}',
                    {$out_result},
                    {$out_message}
                )";
                $result->qry_list[] = $qry;
//                $result->data = $this->mes_m->GetMultipleQueryResult($qry);
            }

            $result = $this->mes_m->trans_sp_result($result->data, $result);
            if (!$result->result) {
                $this->db->trans_rollback();
                exit(json_encode($result));
            }
        }
        */
//        $this->db->trans_rollback();
//        exit(json_encode($result));


        if ($this-> db ->trans_status() === FALSE || $result->result = false){
            $result->msg = '저장되지 않았습니다.';
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '저장되었습니다.';
            $this->db->trans_commit();
        }
//        $result = $this->mes_m->exec_sp($qry);

        exit(json_encode($result));
    }

    private function _get_mtrl_output_mgt($param){
        $result = (object) [];

        // v2 에 맞게 칼럼명 수정
        $param['where']['out_whs_cd'] = $param['where']['whs_cd'];
        /*
        SELECT *
        FROM `mtrl_output_mgt_v2`
        WHERE `mtrl_output_mgt_v2`.`date_s` = '2020-07-17'
        AND `mtrl_output_mgt_v2`.`date_e` = '2020-07-17'
        AND `mtrl_output_mgt_v2`.`out_loc_cd` = '*'
        AND `mtrl_output_mgt_v2`.`fact_cd` = 'winp01'
        AND `mtrl_output_mgt_v2`.`out_whs_cd` = 'W0002'
         */
        // 출고 일자 : mtrl_output_mgt_v2 - out_dt

        $param['where']['DATE(out_dt) >='] = $param['where']['date_s'];
        $param['where']['DATE(out_dt) <='] = $param['where']['date_e'];
        unset($param['where']['date_s']);
        unset($param['where']['date_e']);
        unset($param['where']['whs_cd']);
        $data = $this->mes_m->get("mtrl_output_mgt_v2", $param);

        unset($param['where']['DATE(out_dt) >=']);
        unset($param['where']['DATE(out_dt) <=']);
        $result->data['grid02'] = [];
        $result->data['grid02'] = array_merge($result->data['grid02'], $data->data);
        $result->data['grid02_qry'] = $this->db->last_query();
        // v1 에 맞게 칼럼명 수정
        $param['where']['stck_whs_cd'] = $param['where']['out_whs_cd'];
        $param['where']['stck_loc_cd'] = $param['where']['out_loc_cd'];
        unset($param['where']['out_whs_cd']);
        unset($param['where']['out_loc_cd']);

        $result->data['grid01'] = $this->mes_m->get("mtrl_output_mgt_v1", $param)->data;
        $result->data['grid01_qry'] = $this->db->last_query();

        $result->result = true;
        $result->msg = '조회되었습니다';

        exit(json_encode($result));
    }

    private function _get_mtrl_output_mgt_wp($param){
        $result = (object) [];

        // v2 에 맞게 칼럼명 수정
        $param['where']['out_whs_cd'] = $param['where']['whs_cd'];
        /*
        SELECT *
        FROM `mtrl_output_mgt_v2`
        WHERE `mtrl_output_mgt_v2`.`date_s` = '2020-07-17'
        AND `mtrl_output_mgt_v2`.`date_e` = '2020-07-17'
        AND `mtrl_output_mgt_v2`.`out_loc_cd` = '*'
        AND `mtrl_output_mgt_v2`.`fact_cd` = 'winp01'
        AND `mtrl_output_mgt_v2`.`out_whs_cd` = 'W0002'
         */
        // 출고 일자 : mtrl_output_mgt_v2 - out_dt

        $param['where']['DATE(out_dt) >='] = $param['where']['date_s'];
        $param['where']['DATE(out_dt) <='] = $param['where']['date_e'];
        unset($param['where']['date_s']);
        unset($param['where']['date_e']);
        unset($param['where']['whs_cd']);
        $data = $this->mes_m->get("mtrl_output_mgt_v2", $param);

        unset($param['where']['DATE(out_dt) >=']);
        unset($param['where']['DATE(out_dt) <=']);
        $result->data['grid02'] = [];
        $result->data['grid02'] = array_merge($result->data['grid02'], $data->data);
        $result->data['grid02_qry'] = $this->db->last_query();
        // v1 에 맞게 칼럼명 수정
        $param['where']['stck_whs_cd'] = $param['where']['out_whs_cd'];
        $param['where']['stck_loc_cd'] = $param['where']['out_loc_cd'];
        unset($param['where']['out_whs_cd']);
        unset($param['where']['out_loc_cd']);

        $result->data['grid01'] = $this->mes_m->get("mtrl_output_mgt_v1", $param)->data;
        $result->data['grid01_qry'] = $this->db->last_query();

        $result->result = true;
        $result->msg = '조회되었습니다';

        exit(json_encode($result));
    }

    private function _get_term_output_staus_wp($data_list = []){
        $qry = "SELECT 
                    a.out_dt,
                    a.out_gbn,
                    a.out_no,
                    a.prt_nbr_cd,
                    b.prt_nbr_nm,
                    b.spec,
                    c.biz_cd,
                    fnc_biz_nm((SELECT MAX(cd) FROM tbc_codeinfo WHERE up_cd = 'cmpny_cd'), c.biz_cd) biz_nm,
                    a.lotno AS ship_cd,
                    c.ship_nm,
                    a.out_qty,
                    a.out_unit,
                    a.out_whs_cd,
                    FNC_WHS_NM(a.fact_cd,a.out_whs_cd) whs_nm,
                    a.out_loc_cd,
                    FNC_LOC_NM(a.fact_cd,a.out_whs_cd,a.out_loc_cd) loc_nm,
                    fnc_user_nm(a.fact_cd,a.inst_id) out_id_nm
                FROM twm_outputinfo a
                LEFT JOIN tbm_prtnbrinfo b ON(a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd)
                LEFT JOIN tbs_bizmrloc c ON(a.lotno = c.ship_cd)
                WHERE a.fact_cd LIKE CONCAT ('%','{$data_list['fact_cd']}','%')
                AND a.prt_nbr_cd LIKE CONCAT ('%','{$data_list['prt_nbr_cd']}','%')
                AND b.prt_nbr_nm LIKE CONCAT ('%','{$data_list['prt_nbr_nm']}','%')
                AND a.lotno LIKE CONCAT ('%','{$data_list['ship_cd']}','%')
                AND c.ship_nm LIKE CONCAT ('%','{$data_list['ship_nm']}','%')
                AND a.out_whs_cd LIKE CONCAT ('%','{$data_list['whs_cd']}','%')
                AND FNC_WHS_NM(a.fact_cd,a.out_whs_cd) LIKE CONCAT ('%','{$data_list['whs_nm']}','%')
                AND a.out_loc_cd LIKE CONCAT ('%','{$data_list['loc_cd']}','%')
                AND FNC_LOC_NM(a.fact_cd,a.out_whs_cd,a.out_loc_cd) LIKE CONCAT ('%','{$data_list['loc_nm']}','%')
                AND a.out_gbn LIKE CONCAT ('%','{$data_list['out_gbn']}','%')
                AND a.out_dt BETWEEN '{$data_list['date1']}' AND '{$data_list['date2']}';";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_term_output_staus($data_list = []){
        $qry = "SELECT 
                    a.out_dt,
                    a.out_gbn,
                    a.out_no,
                    a.prt_nbr_cd,
                    b.prt_nbr_nm,
                    b.spec,
                    a.lotno,
                    a.out_qty,
                    a.out_unit,
                    a.out_whs_cd,
                    FNC_WHS_NM(a.fact_cd,a.out_whs_cd) whs_nm,
                    a.out_loc_cd,
                    FNC_LOC_NM(a.fact_cd,a.out_whs_cd,a.out_loc_cd) loc_nm,
                    fnc_user_nm(a.fact_cd,a.inst_id) out_id_nm
                FROM twm_outputinfo a
                LEFT JOIN tbm_prtnbrinfo b ON(a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd)
                WHERE a.fact_cd LIKE CONCAT ('%','{$data_list['fact_cd']}','%')
                AND a.prt_nbr_cd LIKE CONCAT ('%','{$data_list['prt_nbr_cd']}','%')
                AND b.prt_nbr_nm LIKE CONCAT ('%','{$data_list['prt_nbr_nm']}','%')
                AND a.out_whs_cd LIKE CONCAT ('%','{$data_list['whs_cd']}','%')
                AND FNC_WHS_NM(a.fact_cd,a.out_whs_cd) LIKE CONCAT ('%','{$data_list['whs_nm']}','%')
                AND a.out_loc_cd LIKE CONCAT ('%','{$data_list['loc_cd']}','%')
                AND FNC_LOC_NM(a.fact_cd,a.out_whs_cd,a.out_loc_cd) LIKE CONCAT ('%','{$data_list['loc_nm']}','%')
                AND a.out_gbn LIKE CONCAT ('%','{$data_list['out_gbn']}','%')
                AND a.out_dt BETWEEN '{$data_list['date1']}' AND '{$data_list['date2']}'
                AND a.del_yn = 'N';";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_mtrl_prdmove_mgt($data_list){
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
        $this->db->like('a.prt_nbr_cd', $data_list['prt_nbr_cd'], 'before');
        $this->db->like('b.prt_nbr_nm', $data_list['prt_nbr_nm'], 'before');
        $this->db->like('a.lotno', $data_list['lotno'], 'before');
        $this->db->like('a.stck_whs_cd', $data_list['out_whs_cd'], 'before');
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

    private function _get_mtrl_prdmove_mgt_mpn(){
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
        $this->db->like('a.prt_nbr_cd', $param['where']['prt_nbr_cd'], 'before');
        $this->db->like('b.prt_nbr_nm', $param['where']['prt_nbr_nm'], 'before');
        $this->db->like('a.lotno', $param['where']['lotno'], 'before');
        $this->db->where('a.from_whs_cd', $form['where']['out_whs_cd']);
        $this->db->where('a.from_loc_cd', $form['where']['out_loc_cd']);
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

    private function _get_data_ref($param = ''){
        $prt_nbr_cd = isset($param['like']['prt_nbr_cd']) ? $param['like']['prt_nbr_cd'][0] : '';
        $prt_nbr_nm = isset($param['like']['prt_nbr_nm']) ? $param['like']['prt_nbr_nm'][0] : '';
        $whs_cd = isset($param['like']['whs_cd']) ? $param['like']['whs_cd'][0] : '';
        $whs_nm = isset($param['like']['whs_nm']) ? $param['like']['whs_nm'][0] : '';
        $loc_cd = isset($param['like']['loc_cd']) ? $param['like']['loc_cd'][0] : '';
        $loc_nm = isset($param['like']['loc_nm']) ? $param['like']['loc_nm'][0] : '';
        $ship_cd = isset($param['like']['ship_cd']) ? $param['like']['ship_cd'][0] : '';
        $ship_nm = isset($param['like']['ship_nm']) ? $param['like']['ship_nm'][0] : '';

        $fact_cd = isset($param['where']['fact_cd']) ? $param['where']['fact_cd'] : '';
        $date1 = isset($param['where']['date1']) ? $param['where']['date1'] : '';
        $date2 = isset($param['where']['date2']) ? $param['where']['date2'] : '';
        $out_gbn = isset($param['where']['out_gbn']) ? $param['where']['out_gbn'] : '';

        //mtrl_prdmove_mgt
        $lotno = isset($param['like']['lotno']) ? $param['like']['lotno'][0] : '';
        $out_whs_nm = isset($param['like']['out_whs_nm']) ? $param['like']['out_whs_nm'][0] : '';
        $out_loc_nm = isset($param['like']['out_loc_nm']) ? $param['like']['out_loc_nm'][0] : '';
        $in_whs_nm = isset($param['like']['in_whs_nm']) ? $param['like']['in_whs_nm'][0] : '';
        $in_loc_nm = isset($param['like']['in_loc_nm']) ? $param['like']['in_loc_nm'][0] : '';

        $out_whs_cd = isset($param['where']['out_whs_cd']) ? $param['where']['out_whs_cd'] : '';
        $out_loc_cd = isset($param['where']['out_loc_cd']) ? $param['where']['out_loc_cd'] : '';
        $in_whs_cd = isset($param['where']['in_whs_cd']) ? $param['where']['in_whs_cd'] : '';
        $in_loc_cd = isset($param['where']['in_loc_cd']) ? $param['where']['in_loc_cd'] : '';

        $data_list = [
            "ship_cd" => $ship_cd,
            "ship_nm" => $ship_nm,
            "prt_nbr_cd" => $prt_nbr_cd,
            "prt_nbr_nm" => $prt_nbr_nm,
            "whs_cd" => $whs_cd,
            "whs_nm" => $whs_nm,
            "loc_cd" => $loc_cd,
            "loc_nm" => $loc_nm,
            "fact_cd" => $fact_cd,
            "date1" => $date1,
            "date2" => $date2,
            "out_gbn" => $out_gbn,
            "out_whs_nm" => $out_whs_nm,
            "out_loc_nm" => $out_loc_nm,
            "in_whs_nm" => $in_whs_nm,
            "in_loc_nm" => $in_loc_nm,
            "out_whs_cd" => $out_whs_cd,
            "out_loc_cd" => $out_loc_cd,
            "in_whs_cd" => $in_whs_cd,
            "in_loc_cd" => $in_loc_cd,
            "lotno" => $lotno,
        ];

        return $data_list;
    }

    private function _get_table($path = ''){
        $tables = [
            'term_input_staus' => [''],
            'term_output_staus' => [''],
        ];
        return $tables[$path];
    }
}