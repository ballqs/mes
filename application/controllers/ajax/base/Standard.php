<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Standard extends CI_Controller
{
    public function get($path = ''){
        //exit(json_encode($this->input->get()));
        $join = null;
        $tb = $this->_get_table($path)[0];
        if ($path !== 'codeinfo') {
            $param = $this->input->get(null, true)['param'];
            $data_list = $this->_get_data_ref($param);
        }

//        if ($path == 'unit_exchg_mgt') {
//            $this->load->library('dbinfo');
//            $join = $this->dbinfo->join_prtnbrinfo($tb);
//        }else
        if ($path == 'codeinfo'){
            $this->_get_codeinfo();
        }elseif ($path == 'part_nbr_mgt_wp'){
            $this->_get_part_nbr_mgt_wp($data_list);
        }elseif ($path == 'part_nbr_mgt'){
            $this->_get_part_nbr_mgt($data_list);
        }elseif ($path == 'unit_exchg_mgt'){
            $this->_get_unit_exchg_mgt($tb,$data_list);
        }elseif ($path == 'bom_mgt'){
            $this->_get_bom_mgt($data_list);
        }elseif( $path == 'bom'){
            $this->_get_bom($param);
        }

        if ($join == null) $data = $this->mes_m->get($tb, $param);
        else $data = $this->mes_m->get($tb, $param, $join);

        $data->getparam = $this->input->get();
//        $data->path = preg_replace("'\/[^/]*\.php$'i", "/", $_SERVER['PHP_SELF']);
        $data->path = 'path : '.$this->mes_m->get_p();


        echo json_encode($data);
    }

    public function save($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];

        if ($path == 'unit_exchg_mgt') {
            for($i=0; $i<count($param[0]); $i = $i + 1){
                unset($param[0][$i]['prt_nbr_nm']);
                unset($param[0][$i]['spec']);
            }
        }else if ($path == 'prd_calnr_batch') {
            $sess = $this->session->userdata('emp_id');
            $query = "CALL usp_crtcalendar_b1('{$param['fact_cd']}', '{$param['base_ym']}', '{$sess}', @result, @msg)";
            $data = $this->mes_m->exec_sp($query);
            $data->msg = '일괄 생성 되었습니다.';
            exit(json_encode($data));
        }else if($path == 'part_nbr_mgt_wp'){
            for($i=0; $i<count($param[0]); $i = $i + 1){
                if($param[0][$i]['cu'] === 'c'){
                    $param[0][$i]['prt_nbr_cd'] = $param[0][$i]['prt_nbr_nm'].'-'.$param[0][$i]['spec'].'-'.$param[0][$i]['unit_length'].'-'.$param[0][$i]['unit_color'];
                }
                unset($param[0][$i]['base_whs_nm']);
                unset($param[0][$i]['base_loc_nm']);
            }
        }else if($path == 'bom_mgt'){
            $this->_save_bom_mgt($param);
        }

        $data = $this->mes_m->save($tb, $param);

        echo json_encode($data);
    }

    public function delete($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];
        if($path == 'bom_mgt'){
            $this->_delete_bom_mgt($param);
        }
        $result = $this->mes_m->delete($tb, $param);
        echo json_encode($result);
    }

    private function _delete_bom_mgt($param){
        //exit(json_encode($param));
        $result = $this->mes_m->get_response_data_form();
        $qry = "WITH recursive cte as (
                    SELECT tb.mprt_nbr , tb.sprt_nbr,1 as level, IF((SELECT COUNT(*) FROM tbm_bom WHERE mprt_nbr = tb.sprt_nbr) = 0, 'Y','N') AS leaf_yn
                    from tbm_bom tb
                    WHERE fact_cd = '{$param[0]['fact_cd']}'
                    and mprt_nbr = '{$param[0]['mprt_nbr']}'
                    AND sprt_nbr = '{$param[0]['sprt_nbr']}'
                    union all 
                    select cte.sprt_nbr,tb.sprt_nbr, level + 1,IF((SELECT COUNT(*) FROM tbm_bom WHERE mprt_nbr = tb.sprt_nbr) = 0, 'Y','N') AS leaf_yn
                    from tbm_bom tb
                    inner join cte on tb.mprt_nbr = cte.sprt_nbr
                )
                SELECT d.fact_cd ,a.mprt_nbr, b.prt_nbr_nm AS mprt_nbr_nm, b.spec AS mprt_nbr_spec, d.base_qty , d.base_unit, a.sprt_nbr, c.prt_nbr_nm AS sprt_nbr_nm, c.spec AS sprt_nbr_spec,d.cmpnt_qty , d.cmpnt_unit, a.level, a.leaf_yn
                from cte a
                LEFT JOIN tbm_prtnbrinfo b ON(a.mprt_nbr = b.prt_nbr_cd)
                LEFT JOIN tbm_prtnbrinfo c ON(a.sprt_nbr = c.prt_nbr_cd)
                LEFT JOIN tbm_bom d ON(a.mprt_nbr = d.mprt_nbr AND a.sprt_nbr = d.sprt_nbr)
                ORDER BY a.level;";
        $deletelist = $this->db->query($qry)->result();
        $this->db->trans_begin();
        for($i=0;$i<count($deletelist); $i++){
            $data = array(
                'fact_cd' => $deletelist[$i]->fact_cd,
                'mprt_nbr' => $deletelist[$i]->mprt_nbr,
                'sprt_nbr' => $deletelist[$i]->sprt_nbr
            );
            $this->db->delete('tbm_bom', $data);
        }
        if ($this->db->trans_status() === FALSE){
            $result->msg = '삭제되지 않았습니다.';
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $result->result = false;
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '삭제되었습니다.';
            //$this->db->trans_rollback();
            $this->db->trans_commit();
        }

        exit(json_encode($result));
    }

    private function _save_bom_mgt($param){
        $result = $this->mes_m->get_response_data_form();
        //select 하는 곳
        $qry = "select * from tbm_bom WHERE sprt_nbr = '{$param[0]['mprt_nbr']}';";
        $data = $this->db->query($qry)->result();
        $row = count($this->db->query($qry)->row());
        $mprt_nbr = $data[0]->mprt_nbr;
        if($row == 1){
            $flag = true;
        }else{
            $flag = false;
        }
        while ($flag){
            if($mprt_nbr === $param[0]['sprt_nbr']){
                $result->qry = $this->db->last_query();
                $result->data[0]->out_message = '부모품목이랑 겹칩니다.';
                $result->data[0]->out_result = "-1";
                exit(json_encode($result));
            }
            $qry = "select * from tbm_bom WHERE sprt_nbr = '{$mprt_nbr}';";
            $data = $this->db->query($qry)->result();
            $row = count($this->db->query($qry)->row());
            if($row == 0){
                $flag = false;
            }else{
                $mprt_nbr = $data[0]->mprt_nbr;
            }
        }
        //insert 하는 곳
        $sess = $this->session->userdata('emp_id');
        $this->db->trans_begin();
        $qry = "CALL usp_bommgt_i1('{$param[0]['fact_cd']}','{$param[0]['mprt_nbr']}','{$param[0]['sprt_nbr']}','{$param[0]['base_qty']}','{$param[0]['base_unit']}','{$param[0]['cmpnt_qty']}','{$param[0]['cmpnt_unit']}','{$sess}',@result, @msg);";
        $result->data = $this->mes_m->GetMultipleQueryResult($qry)[0];
        $result = $this->mes_m->trans_sp_result($result->data, $result);

        if ($this->db->trans_status() === FALSE || $result->result == false ) {
            $result->msg = '저장되지 않았습니다.';
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '저장되었습니다.';
            //$this->db->trans_rollback();
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }

    private function _get_part_nbr_mgt($data_list){
        $qry = "SELECT 
                    a.fact_cd,
                    a.prt_nbr_cd,
                    a.prt_nbr_nm,
                    a.spec,
                    a.prt_nbr_dsp_nm,
                    a.prt_nbr_grp_cd,
                    a.base_unit,
                    a.unit_length,
                    a.unit_color,
                    a.unit_thick,
                    a.unit_width,
                    a.unit_weight,
                    a.lot_mgt_yn,
                    a.lot_size,
                    a.instd_prt_nbr,
                    a.account_type,
                    a.supply_type,
                    a.sagub_type,
                    a.inspct_yn,
                    a.cycle_tm,
                    a.uph,
                    a.unit_price,
                    a.safe_stck,
                    a.unit_reprice,
                    a.base_whs_cd,
                    fnc_whs_nm(a.fact_cd,b.whs_cd) base_whs_nm,
                    a.base_loc_cd,
                    fnc_loc_nm(a.fact_cd,b.whs_cd,c.loc_cd) base_loc_nm,
                    a.use_yn,
                    a.remark,
                    a.inst_id,
                    a.inst_dt,
                    a.updt_id,
                    a.updt_dt
                FROM tbm_prtnbrinfo a
                LEFT JOIN tbm_whsinfo b ON a.fact_cd = b.fact_cd AND a.base_whs_cd = b.whs_cd
                LEFT JOIN tbm_whslocinfo c ON a.fact_cd = c.fact_cd AND a.base_whs_cd = c.whs_cd AND a.base_loc_cd = c.loc_cd
                WHERE a.fact_cd = '{$data_list['fact_cd']}'
                AND a.prt_nbr_cd LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')
                AND a.prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%')
                AND IFNULL(a.prt_nbr_grp_cd,'') LIKE CONCAT('%','{$data_list['prt_nbr_grp_cd']}','%')
                AND IFNULL(a.account_type,'') LIKE CONCAT('%','{$data_list['account_type']}','%');";

        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_unit_exchg_mgt($tb,$data_list = []){
        $result = $this->mes_m->get_response_data_form();

        $this->db->select($tb.'.*, tbm_prtnbrinfo.prt_nbr_nm, tbm_prtnbrinfo.spec');
        $this->db->from($tb);
        $this->db->join('tbm_prtnbrinfo', $tb.'.fact_cd = tbm_prtnbrinfo.fact_cd and '.$tb.'.prt_nbr_cd = tbm_prtnbrinfo.prt_nbr_cd', 'left');
        $this->db->where($tb.'.fact_cd', $data_list['fact_cd']);
        $this->db->like($tb.'.prt_nbr_cd', $data_list['prt_nbr_cd'], 'both');
        $this->db->like('tbm_prtnbrinfo.prt_nbr_nm', $data_list['prt_nbr_nm'], 'both');
        $this->db->like($tb.'.trans_unit', $data_list['trans_unit'], 'both');
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

    private function _get_codeinfo(){
        $qry = "SELECT cd_set1 
                    FROM tbc_codeinfo 
                    WHERE up_cd ='MES' 
                    AND cd = 'stock_loc_mgt';";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private  function _get_part_nbr_mgt_wp($data_list = []){
        $qry = "SELECT 
                    a.fact_cd,
                    a.prt_nbr_cd,
                    a.prt_nbr_nm,
                    a.spec,
                    a.prt_nbr_dsp_nm,
                    a.prt_nbr_grp_cd,
                    a.base_unit,
                    a.unit_length,
                    a.unit_color,
                    a.unit_thick,
                    a.unit_width,
                    a.unit_weight,
                    a.lot_mgt_yn,
                    a.lot_size,
                    a.instd_prt_nbr,
                    a.account_type,
                    a.supply_type,
                    a.sagub_type,
                    a.inspct_yn,
                    a.cycle_tm,
                    a.uph,
                    a.unit_price,
                    a.safe_stck,
                    a.unit_reprice,
                    a.base_whs_cd,
                    fnc_whs_nm(a.fact_cd,b.whs_cd) base_whs_nm,
                    a.base_loc_cd,
                    fnc_loc_nm(a.fact_cd,b.whs_cd,c.loc_cd) base_loc_nm,
                    a.use_yn,
                    a.remark,
                    a.inst_id,
                    a.inst_dt,
                    a.updt_id,
                    a.updt_dt
                FROM tbm_prtnbrinfo a
                LEFT JOIN tbm_whsinfo b ON a.fact_cd = b.fact_cd AND a.base_whs_cd = b.whs_cd
                LEFT JOIN tbm_whslocinfo c ON a.fact_cd = c.fact_cd AND a.base_whs_cd = c.whs_cd AND a.base_loc_cd = c.loc_cd
                WHERE a.fact_cd = 'winp01'
                AND a.prt_nbr_cd LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')
                AND a.prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%')
                AND IFNULL(a.prt_nbr_grp_cd,'') LIKE CONCAT('%','{$data_list['prt_nbr_grp_cd']}','%')
                AND IFNULL(a.account_type,'') LIKE CONCAT('%','{$data_list['account_type']}','%');";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_bom_mgt($data_list = []){
        $qry = "SELECT * , IF((SELECT COUNT(*) FROM tbm_bom WHERE tbm_bom.mprt_nbr = tbm_prtnbrinfo.prt_nbr_cd) > 0,'Y','N') AS bom_yn
                FROM tbm_prtnbrinfo
                WHERE account_type = (SELECT cd FROM tbc_codeinfo WHERE up_cd = 'account_type' AND cd_nm = '제품')
                AND prt_nbr_cd LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')
                AND prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%')
                AND use_yn = '{$data_list['use_yn']}';";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_bom($param){
//        $qry = "SELECT
//                    a.fact_cd,
//                    a.mprt_nbr,
//                    b.prt_nbr_nm AS mprt_nbr_nm,
//                    b.spec AS mprt_nbr_spec,
//                    a.base_qty,
//                    a.base_unit,
//                    a.sprt_nbr,
//                    c.prt_nbr_nm AS sprt_nbr_nm,
//                    c.spec AS sprt_nbr_spec,
//                    a.cmpnt_qty,
//                    a.cmpnt_unit,
//                    a.seq,
//                    a.level
//                FROM
//                    (SELECT '{$param['where']['fact_cd']}' AS fact_cd ,@sprt_nbr mprt_nbr, tbm_bom.cmpnt_qty,tbm_bom.cmpnt_unit, tbm_bom.base_qty, tbm_bom.base_unit,
//                           fnc_bomtree() AS sprt_nbr,@level AS LEVEL, tbm_bom.seq bom_seq,@ROWNUM:=@ROWNUM+1 AS SEQ
//                    FROM   (SELECT @fact_cd := '{$param['where']['fact_cd']}', @seq:=-1, @start_with:='{$param['where']['prt_nbr_cd']}', @sprt_nbr:=@start_with, @LEVEL:=0 ) vars
//                    JOIN   tbm_bom
//                    JOIN   (SELECT @ROWNUM:=0) T2
//                    WHERE  @sprt_nbr IS NOT NULL) a
//                left JOIN tbm_prtnbrinfo b ON (a.fact_cd = b.fact_cd AND a.mprt_nbr = b.prt_nbr_cd)
//                left JOIN tbm_prtnbrinfo c ON (a.fact_cd = c.fact_cd AND a.sprt_nbr = c.prt_nbr_cd)
//                ORDER BY a.seq;";
        $result = $this->mes_m->get_response_data_form();
        $qry = "WITH recursive cte as (
                    SELECT tb.mprt_nbr , tb.sprt_nbr,1 as level, IF((SELECT COUNT(*) FROM tbm_bom WHERE mprt_nbr = tb.sprt_nbr) = 0, 'Y','N') AS leaf_yn
                    from tbm_bom tb
                    WHERE fact_cd = '{$param['where']['fact_cd']}'
                    and mprt_nbr = '{$param['where']['prt_nbr_cd']}'
                    union all 
                    select cte.sprt_nbr,tb.sprt_nbr, level + 1,IF((SELECT COUNT(*) FROM tbm_bom WHERE mprt_nbr = tb.sprt_nbr) = 0, 'Y','N') AS leaf_yn
                    from tbm_bom tb
                    inner join cte on tb.mprt_nbr = cte.sprt_nbr
                )
                SELECT d.fact_cd ,a.mprt_nbr, b.prt_nbr_nm AS mprt_nbr_nm, b.spec AS mprt_nbr_spec, d.base_qty , d.base_unit, a.sprt_nbr, c.prt_nbr_nm AS sprt_nbr_nm, c.spec AS sprt_nbr_spec,d.cmpnt_qty , d.cmpnt_unit, a.level, a.leaf_yn
                from cte a
                LEFT JOIN tbm_prtnbrinfo b ON(a.mprt_nbr = b.prt_nbr_cd)
                LEFT JOIN tbm_prtnbrinfo c ON(a.sprt_nbr = c.prt_nbr_cd)
                LEFT JOIN tbm_bom d ON(a.mprt_nbr = d.mprt_nbr AND a.sprt_nbr = d.sprt_nbr)
                ORDER BY a.level;";
        $result->data = $this->db->query($qry)->result();
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

    private function _get_data_ref($param){
        if(isset($param['like'])) {
            $prt_nbr_cd = isset($param['like']['prt_nbr_cd']) ? $param['like']['prt_nbr_cd'][0] : '';
            $prt_nbr_nm = isset($param['like']['prt_nbr_nm']) ? $param['like']['prt_nbr_nm'][0] : '';
        }else {
            $prt_nbr_cd = '';
            $prt_nbr_nm = '';
        }
        if(isset($param['where'])){
            $fact_cd = isset($param['where']['fact_cd']) ? $param['where']['fact_cd'] : '';
            $account_type = isset($param['where']['account_type']) ? $param['where']['account_type'] : '';
            $prt_nbr_grp_cd = isset($param['where']['prt_nbr_grp_cd']) ? $param['where']['prt_nbr_grp_cd'] : '';
            $trans_unit = isset($param['where']['trans_unit']) ? $param['where']['trans_unit'] : '';
            $use_yn = isset($param['where']['use_yn']) ? $param['where']['use_yn'] : '';
        }else{
            $fact_cd = '';
            $account_type = '';
            $prt_nbr_grp_cd = '';
            $trans_unit = '';
            $use_yn = '';
        }

        $data_list = [
            "prt_nbr_cd" => $prt_nbr_cd,
            "prt_nbr_nm" => $prt_nbr_nm,
            "fact_cd" => $fact_cd,
            "account_type" => $account_type,
            "prt_nbr_grp_cd" => $prt_nbr_grp_cd,
            "trans_unit" => $trans_unit,
            "use_yn" => $use_yn,
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
            'part_nbr_mgt' => ['tbm_prtnbrinfo'],
            'unit_exchg_mgt' => ['tbm_prtnbrtransinfo'],
            'prd_calnr_mgt' => ['tbm_prdcalndrinfo'],
            'prd_calnr_batch' => [],
            'wrhs_loc' => ['tbm_whsinfo'],
            'wrhs_loc_mgt' => ['tbm_whslocinfo'],
            'part_nbr_mgt_wp' => ['tbm_prtnbrinfo'],
            'codeinfo' => [''],
            'unit_exchg_mgt' => ['tbm_prtnbrtransinfo'],
            'bom_mgt' => ['tbm_prtnbrinfo'],
            'bom' => [''],
        ];
        return $tables[$path];
    }
}