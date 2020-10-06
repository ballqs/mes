<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Purchase extends CI_Controller
{
    public function like_str($arr){
        if ($arr[1] === 'both') return "%{$arr[0]}%";
        else if ($arr[1] === 'left') return "%{$arr[0]}";
        else if ($arr[1] === 'right') return "{$arr[0]}%";
    }

    public function get($path = ''){

        $param = $this->input->get(null, true)['param'];
//        exit($param);
        $data_list = $this->_get_data_ref($param);

        if ($path == 'prchs_mon_pln_mgt') {
            $sess = $this->session->userdata('emp_id');
            $dbname = $this->db->database;
            $prt_nbr_cd = isset($param['like']['prt_nbr_cd'][0]) ? $param['like']['prt_nbr_cd'][0] : '';
            $prt_nbr_nm = isset($param['like']['prt_nbr_nm'][0]) ? $param['like']['prt_nbr_nm'][0] : '';
            $account_type = isset($param['where']['account_type']) ? $param['where']['account_type'] : '';
            $result = $this->mes_m->get_response_data_form();
            // 현재 admin만 가능하다.
            $qry = "CALL usp_pomonthpln_s1('{$dbname}','{$param['where']['fact_cd']}', '{$param['where']['base_ym']}', '{$prt_nbr_cd}', '{$prt_nbr_nm}','{$account_type}', '{$sess}', @result, @msg)";
//            $qry = "CALL usp_pomonthpln_s1('{$param['where']['fact_cd']}', '{$param['where']['base_ym']}', '{$prt_nbr_cd}', '{$prt_nbr_nm}', 'admin', @result, @msg)";
            $result->ori_qry = $qry;
            $result->data = $this->mes_m->GetMultipleQueryResult($qry);

            $result->qry = $this->db->last_query();
            exit(json_encode($result));
        }else if ($path == 'prchs_group') {
            $this->_prchs_group($param);
        }else if ($path == 'prchs_mgt') {
            exit(json_encode($this->_prchs_mgt($param)));
//            exit(json_encode($this->_prchs_mgt($param['param'])));
        }elseif($path == 'prchs_rslt_staus'){
            $this->_get_prchs_rslt_staus($data_list);
        }else if ($path == 'prchs_mgt2') {
        exit(json_encode($this->_get_prchs_mgt2($param)));
//            exit(json_encode($this->_prchs_mgt($param['param'])));
        }

        $join = null;
        $tb = $this->_get_table($path)[0];

        // tbp_opwrkrinfo
        if ($join == null) $data = $this->mes_m->get($tb, $param);
        else $data = $this->mes_m->get($tb, $param, $join);

        $data->getparam = $this->input->get();
        $data->path = 'path : '.$this->mes_m->get_p();

        echo json_encode($data);
    }

    public function save($path = ''){
        $param = $this->input->post(null, true)['param'];
        if ($path == 'prchs_group') {
            $param = $this->_save_prchs_group($param);
        }elseif($path == 'approve'){
            $this->_approve($param);
        }elseif($path == 'prchs_mon_pln_mgt'){
            $this->_save_prchs_mon_pln_mgt($param);
        }

        $tb = $this->_get_table($path);
        $data = $this->mes_m->save($tb, $param);
        if ($path == 'prchs_group') {
//            $data->selected_row = [];
//            $data->selected_row['grid01'] = $this->input->post(null, true)['selected_row']['grid01'];

        }

        echo json_encode($data);
    }

    public function delete($path = ''){
        $param = $this->input->post(null, true)['param'];
        if ($path == 'prchs') {
            $this->_del_prchs($param);
        }
        $tb = $this->_get_table($path);
        $result = $this->mes_m->delete($tb, $param);
        echo json_encode($result);
    }

    private function _save_prchs_mon_pln_mgt($param){
        $this->db->trans_begin();
        $result = $this->mes_m->get_response_data_form();
//        W23: "23"
//        W24: "4"
//        W25: "5"
//        W26: "6"
//        W27: "7"
//        cu: "u"
//        fact_cd: "winp01"
//        prt_nbr_cd: "PBF-252"
//        prt_nbr_nm: "PBF-252"
//        remark: "re"
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
                        $qry = "CALL usp_pomonthpln_save1('{$obj['fact_cd']}', '{$key}', '{$obj['prt_nbr_cd']}', '{$value}', '{$obj['remark']}', '{$sess}', @result, @msg)";
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

    private function _del_prchs($param){
        //fact_cd, po_no, po_seq
        // w2ui, changes, chk : true
        // del_yn : N

        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        for($i = 0; $i < count($param); $i++){
            //param의 key값만 가져오기
            $keys = array_keys($param[$i]);
            //param의 value값만 가져오기
            $values = array_values($param[$i]);

            $where = [];
            for($j = 0; $j < count($param[$i]); $j++){
                if($keys[$j] === 'fact_cd' || $keys[$j] === 'po_no' || $keys[$j] === 'po_seq'){
                    $where[$keys[$j]] = $values[$j];
                }
            }

            $this->db->where($where)->update('tpa_purchinfo', ['del_yn' => 'Y']);

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

    private function _approve($param){
        // apval_yn 를 Y로 where fact_cd, po_no
        $this->db->trans_begin();

        $query = "UPDATE tpa_purchinfo SET apval_yn = 'Y', po_staus_cd = '20' WHERE fact_cd = '{$param[0]['fact_cd']}' AND po_no = '{$param[0]['po_no']}'";
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
        exit(json_encode($result));
    }

    private function _prchs_group($param){
        $qry = "SELECT tpa_purchinfo.fact_cd, fnc_cd_nm('{$param['where']['fact_cd']}', 'fact_cd') AS fact_nm, tpa_purchinfo.po_no, max(tpa_purchinfo.in_biz_cd) AS in_biz_cd, SUM(tpa_purchinfo.po_qty) AS po_sum, max(tbs_bizinfo.biz_nm) AS biz_nm, max(tpa_purchinfo.po_ymd) AS po_ymd, max(tbs_bizmrloc.biz_cd) AS out_biz_cd, fnc_biz_nm(max(tbs_bizmrloc.cmpny_cd), max(tbs_bizmrloc.biz_cd)) AS out_biz_nm, MAX(tbs_bizmrloc.ship_cd) AS out_ship_cd , MAX(tbs_bizmrloc.ship_nm) AS out_ship_nm
                FROM tpa_purchinfo
                LEFT JOIN tbs_bizinfo ON tpa_purchinfo.in_biz_cd = tbs_bizinfo.biz_cd
                LEFT JOIN tbm_prtnbrinfo ON tpa_purchinfo.prt_nbr_cd = tbm_prtnbrinfo.prt_nbr_cd
                LEFT JOIN tbs_bizmrloc ON tpa_purchinfo.out_ship_cd = tbs_bizmrloc.ship_cd
                WHERE tpa_purchinfo.fact_cd = '{$param['where']['fact_cd']}' AND del_yn = 'N' ";

        if(isset($param['like'])) {
            $like_arr = [
                'biz_cd' => 'tbs_bizinfo.biz_cd',
                'biz_nm' => 'tbs_bizinfo.biz_nm',
                'prt_nbr_nm' => 'tbm_prtnbrinfo.prt_nbr_nm',
                'prt_nbr_cd' => 'tbm_prtnbrinfo.prt_nbr_cd',
                'po_no' => 'tpa_purchinfo.po_no',
            ];
            foreach ($like_arr as $key => $value) {
                if (isset($param['like'][$key])) {
                    $like_str = $this->like_str($param['like'][$key]);
                    $qry .= " AND {$value} LIKE '{$like_str}' ";
                }
            }
        }

        if(isset($param['where']['po_ymd_s'])) $qry .= " AND DATE(po_ymd) >= '{$param['where']['po_ymd_s']}' ";
        if(isset($param['where']['po_ymd_e'])) $qry .= " AND DATE(po_ymd) <= '{$param['where']['po_ymd_e']}' ";
        if(isset($param['where']['account_type'])) $qry .= " AND account_type = '{$param['where']['account_type']}' ";
        $qry .= " GROUP BY fact_cd, po_no; ";

        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _prchs_mgt($param){
        $qry = "SELECT fnc_cd_nm(tpa_purchinfo.po_unit, 'unit_cd') as base_unit_nm, tbm_prtnbrinfo.*, tbc_codeinfo.*, tpa_purchinfo.* 
                FROM tpa_purchinfo
                LEFT JOIN tbc_codeinfo ON tpa_purchinfo.po_staus_cd = tbc_codeinfo.cd AND tbc_codeinfo.up_cd = 'po_staus_cd'
                LEFT JOIN tbm_prtnbrinfo ON tbm_prtnbrinfo.fact_cd = tpa_purchinfo.fact_cd AND tbm_prtnbrinfo.prt_nbr_cd = tpa_purchinfo.prt_nbr_cd
                WHERE tpa_purchinfo.fact_cd = '{$param['where']['fact_cd']}' AND  tpa_purchinfo.po_no = '{$param['where']['po_no']}' AND del_yn = 'N' 
                ";
        return $this->mes_m->query($qry);
    }

    private function _get_prchs_mgt2($param){
        $qry = "SELECT fnc_cd_nm(tpa_purchinfo.po_unit, 'unit_cd') as base_unit_nm, tbm_prtnbrinfo.*, tbc_codeinfo.*, tpa_purchinfo.* 
                FROM tpa_purchinfo
                LEFT JOIN tbc_codeinfo ON tpa_purchinfo.po_staus_cd = tbc_codeinfo.cd AND tbc_codeinfo.up_cd = 'po_staus_cd'
                LEFT JOIN tbm_prtnbrinfo ON tbm_prtnbrinfo.fact_cd = tpa_purchinfo.fact_cd AND tbm_prtnbrinfo.prt_nbr_cd = tpa_purchinfo.prt_nbr_cd
                WHERE tpa_purchinfo.fact_cd = '{$param['where']['fact_cd']}' AND  tpa_purchinfo.po_no = '{$param['where']['po_no']}' AND del_yn = 'N' 
                ";
        return $this->mes_m->query($qry);
    }

    private  function _get_prchs_rslt_staus($data_list){
        $qry = "SELECT
                  a.fact_cd,
                  c.biz_cd,
                  c.biz_nm,
                  a.po_ymd,
                  a.po_no,
                  a.po_seq,
                  b.prt_nbr_cd,
                  b.prt_nbr_nm,
                  b.spec,
                  fnc_cd_nm(a.po_unit,'unit_cd') po_unit,
                  a.pln_in_ymd,
                  a.po_staus_cd,
                  a.po_qty,
                  a.in_qty,
                  a.po_qty - a.in_qty AS unpo_pty,
                  a.dyn_biz_cd
                FROM tpa_purchinfo a 
                LEFT JOIN tbm_prtnbrinfo b ON(a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd)
                LEFT JOIN tbs_bizinfo c ON(a.in_biz_cd = c.biz_cd)
                WHERE a.fact_cd LIKE CONCAT('%','{$data_list['fact_cd']}','%')
                AND c.biz_cd LIKE CONCAT('%','{$data_list['biz_cd']}','%')
                AND c.biz_nm LIKE CONCAT('%','{$data_list['biz_nm']}','%')
                AND b.prt_nbr_cd LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')
                AND b.prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%')
                AND a.po_staus_cd LIKE CONCAT('%','{$data_list['po_staus_cd']}','%')
                AND a.po_ymd BETWEEN '{$data_list['date1']}' AND '{$data_list['date2']}'
                AND a.del_yn = 'N'
                ORDER BY a.po_ymd DESC;";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_data_ref($param = ''){
        if(isset($param['like'])) {
            $prt_nbr_cd = isset($param['like']['prt_nbr_cd']) ? $param['like']['prt_nbr_cd'][0] : '';
            $prt_nbr_nm = isset($param['like']['prt_nbr_nm']) ? $param['like']['prt_nbr_nm'][0] : '';
            $biz_cd = isset($param['like']['biz_cd']) ? $param['like']['biz_cd'][0] : '';
            $biz_nm = isset($param['like']['biz_nm']) ? $param['like']['biz_nm'][0] : '';
        }else {
            $prt_nbr_cd = '';
            $prt_nbr_nm = '';
            $biz_cd = '';
            $biz_nm = '';
        }
        if(isset($param['where'])){
            $fact_cd = isset($param['where']['fact_cd']) ? $param['where']['fact_cd'] : '';
            $date1 = isset($param['where']['date1']) ? $param['where']['date1'] : '';
            $date2 = isset($param['where']['date2']) ? $param['where']['date2'] : '';
            $po_staus_cd = isset($param['where']['po_staus_cd']) ? $param['where']['po_staus_cd'] : '';
        }else{
            $fact_cd = '';
            $date1 = '';
            $date2 = '';
            $po_staus_cd = '';
        }

        $data_list = [
            "fact_cd" => $fact_cd,
            "prt_nbr_cd" => $prt_nbr_cd,
            "prt_nbr_nm" => $prt_nbr_nm,
            "biz_cd" => $biz_cd,
            "biz_nm" => $biz_nm,
            "date1" => $date1,
            "date2" => $date2,
            "po_staus_cd" => $po_staus_cd,
        ];

        return $data_list;
    }

    private function _save_prchs_group($param){
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
        $po_ymd = $common['po_ymd'];
        unset($common['fact_nm']);
        unset($common['w2ui']);
        unset($common['recid']);
        unset($common['biz_nm']);
        unset($common['out_biz_nm']);
        unset($common['po_sum']);
        unset($common['base_unit_nm']);
        unset($common['out_ship_nm']);

        // param에 발주번호가 없다면 채번 프로시저 돌려서 발주번호를 가져와야 한다.
        // 있으면 param의 발주번호 그대로 사용. 채번파라미터 in_fact_cd : 공장 코드, in_header : "PO",  in_ymd : "yymmdd", in_maker : 아이디

        // 발주번호 프로시저 시작(채번 시작)
        // 기존의 발주번호가 있으면 발주번호를 발급하지 않는다.
        $po_no = '';
        if (isset($common['po_no']) && trim($common['po_no']) != '') {
            $po_no = $common['po_no'];
        } else {
            $query = "CALL usp_crtseq('{$fact_cd}', 'PO', '{$po_ymd}','{$sess}', @crtseq, @result, @msg)";
            $sp_result = $this->mes_m->exec_sp($query, ['crtseq', 'result', 'msg']);
            $po_no = $sp_result->data->crtseq;
            // 채번 프로시저 끝
            $common['po_no'] = $sp_result->data->crtseq;
        }// 발주번호 끝

        // 발주 순번을 입력하기 위한 부분 시작
        $query = "SELECT MAX(po_seq) as cnt FROM tpa_purchinfo WHERE fact_cd = '{$fact_cd}' AND po_no = '{$po_no}'";
        $current_po_seq = $this->db->query($query)->row()->cnt;

//        exit(json_encode($param));
//        cu: "u"
//        out_biz_cd: "S00007"
//        out_biz_nm: "출고처7"
        // TODO : grid01 수정시 적용안되는 부분 체크 필요
        $modified_param = [];
        foreach ($param[1] as $item) {
            if(isset($item['cu']) && strtoupper($item['cu']) == 'C'){
                $item['po_seq'] = ++$current_po_seq;
            }

            unset($item['prt_nbr_nm']);
            unset($item['spec']);
            unset($item['base_unit_nm']);
            unset($item['out_ship_nm']);
            $modified_param[0][] = array_merge($common, $item);
        }
//        exit(json_encode($modified_param));
        return $modified_param;
    }

    /**
     * 그리드별 테이블 등록
     * @param string $path
     * @return mixed
     */
    private function _get_table($path = ''){
        $tables = [
            'prchs_mgt' => ['tpa_purchinfo'],
            'prchs_rslt_staus' => [''],
            'prchs_group' => ['tpa_purchinfo'],
        ];
        return $tables[$path];
    }


}