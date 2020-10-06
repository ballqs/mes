<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Product extends CI_Controller
{
    public function get($path = ''){

        $join = null;
        $tb = $this->_get_table($path)[0];
        $param = $this->input->get(null, true)['param'];
        $data_list = $this->_get_data_ref($param);

        if ($path == 'part_nbr_uph_mgt') {
            $this->_get_part_nbr_uph_mgt($tb,$data_list);
        }elseif($path == 'wrkctr_mgt'){
            $param['order_by'] = 'staus_brd_seq ASC';
        }elseif($path == 'bad_code_mgt') {
            $param['order_by'] = 'seq ASC';
        }elseif($path == 'op_wrkr_mgt'){
            $this->_get_op_wrkr_mgt($param,$data_list);
        }elseif($path == 'wrkr'){
            $this->_get_wrkr($param);
        }elseif($path == 'wrkr_list'){
            $this->_get_wrkr_list($param);
        }elseif($path == 'po_biz_mgt'){
            $this->_get_po_biz_mgt($data_list);
        }elseif($path == 'po_drct_biz_mgt'){
            $this->_get_po_drct_biz_mgt($data_list);
        }elseif($path == 'ship_biz_mgt'){
            $this->_get_ship_biz_mgt($tb ,$data_list);
        }elseif($path == 'pop_mach_cd'){
            $this->_get_pop_mach_cd($data_list);
        }elseif($path == 'pop_wrkctr_cd'){
            $this->_get_pop_wrkctr_cd($data_list);
        }elseif ($path == 'wrkctr_wrkr_mgt'){
            $this->_get_wrkctr_wrkr_mgt($data_list);
        }elseif ($path == 'wrkctr_wrkr'){
            $this->_get_wrkctr_wrkr($param);
        }elseif ($path == 'wrkctr_wrkr_list'){
            $this->_get_wrkctr_wrkr_list($param);
        }elseif($path == 'pop_op_cd'){
            $this->_get_pop_op_cd($data_list);
        }elseif($path == 'wrkctr_mach_mgt'){
            $this->_get_wrkctr_mach_mgt($data_list);
        }elseif($path == 'part_nbr_rtg_mgt'){
            $this->_get_part_nbr_rtg_mgt($tb,$data_list);
        }elseif($path == 'run_stop_mgt'){
            $param['order_by'] = 'seq ASC';
        }

        // tbp_opwrkrinfo
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

        if ($path == 'part_nbr_uph_mgt') {
            for($i=0; $i<count($param[0]); $i = $i + 1){
                unset($param[0][$i]['prt_nbr_nm']);
                unset($param[0][$i]['spec']);
            }
        }else if ($path == 'po_biz_mgt') {
            for($i=0; $i<count($param[0]); $i = $i + 1){
                unset($param[0][$i]['po_biz_nm']);
                unset($param[0][$i]['prt_nbr_nm']);
                unset($param[0][$i]['spec']);
                unset($param[0][$i]['combo']);
            }
        }else if ($path == 'po_drct_biz_mgt') {

            for($i=0; $i<count($param[0]); $i = $i + 1){
                unset($param[0][$i]['po_biz_nm']);
                unset($param[0][$i]['prt_nbr_nm']);
                unset($param[0][$i]['po_drct_biz_nm']);

            }
        }else if ($path == 'ship_biz_mgt') {
            for($i=0; $i<count($param[0]); $i = $i + 1){
                unset($param[0][$i]['ship_biz_nm']);
                unset($param[0][$i]['prt_nbr_nm']);
                if(empty($param[0][$i]['use_yn']) ){
                    $param[0][$i]['use_yn'] ='N';
                }
                if(empty($param[0][$i]['whs_use_yn']) ){
                    $param[0][$i]['whs_use_yn'] ='N';
                }
            }
        }
        elseif($path == 'op_wrkr_mgt'){
            exit(json_encode($this->_save_op_wrkr_mgt($param)));
        }elseif($path == 'wrkctr_wrkr_mgt'){
            exit(json_encode($this->_save_wrkctr_wrkr_mgt($param)));
        }elseif($path == 'wrkctr_mach_mgt'){
            for($i=0; $i<count($param[0]); $i = $i + 1){
                unset($param[0][$i]['wrkctr_nm']);
                unset($param[0][$i]['mach_nm']);
            }
        }elseif ($path == 'part_nbr_rtg_mgt'){
            for($i=0; $i<count($param[0]); $i = $i + 1){
                unset($param[0][$i]['input_prt_nbr_nm']);
                unset($param[0][$i]['input_spec']);
                unset($param[0][$i]['mprt_nbr_nm']);
                unset($param[0][$i]['op_nm']);
                unset($param[0][$i]['prd_prt_nbr_nm']);
                unset($param[0][$i]['prd_spec']);
                unset($param[0][$i]['outsorcng_cmpy_nm']);
                unset($param[0][$i]['maccount_type']);
                unset($param[0][$i]['input_account_type']);
                unset($param[0][$i]['prd_account_type']);
                unset($param[0][$i]['recid']);
                unset($param[0][$i]['finel_op_yn']);
            }
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

    private function _save_po_biz_mgt($param){
        $result = $this->mes_m->get_response_data_form();
        $result->qry = [];
        $this->db->trans_begin();
        $result->qry[] = $this->db->last_query();
        $result->param = $param[1];
        $insert_data = [];
        foreach ($param[1] as $key => $value) {
            $insert_data[] = array(
                'fact_cd' => $param[0]['fact_cd'],
                'po_biz_cd' => $param[0]['po_biz_cd'],
                'prt_nbr_cd' => $param[0]['prt_nbr_cd'],
                'po_price' => $param[0]['po_price'],
                'rewrk_price1' => $param[0]['rewrk_price1'],
                'rewrk_price2' => $param[0]['rewrk_price2'],
                'po_prt_nbr' => $param[0]['po_prt_nbr'],
                'po_unit' => $param[0]['po_unit'],
                'sagub_type' => $param[0]['sagub_type'],
                'use_yn' => $param[0]['use_yn'],
            );
        }
        $this->db->insert_batch('tbp_pobizprtnbr', $insert_data);
        $result->qry[] = $this->db->last_query();
        $result->result = true;
        $result->result = $this->db->trans_status();

        if ($result->result === FALSE) {
            $this->db->trans_rollback();
            $result->qry[] = $this->db->last_query();
            $result->error = $this->db->error();
            $result->msg = '적용되지 않았습니다.';
        }else{
            $this->db->trans_commit();
            $result->qry[] = $this->db->last_query();
            $result->error = $this->db->error();
            $result->msg = '적용되었습니다.';
        }
        return $result;
    }

    private function _save_op_wrkr_mgt($param){
        $result = $this->mes_m->get_response_data_form();
        $result->qry = [];
        $this->db->trans_begin();
        $result->qry[] = $this->db->last_query();
        $this->db->delete('tbp_opwrkrinfo', array('fact_cd' => $param[0]['fact_cd'], 'op_cd' => $param[0]['op_cd']));
        $result->qry[] = $this->db->last_query();
        $result->param = $param[1];
        $insert_data = [];
        foreach ($param[1] as $key => $value) {
            $insert_data[] = array(
                'fact_cd' => $param[0]['fact_cd'],
                'op_cd' => $param[0]['op_cd'],
                'wrkr' => $value['wrkr']
            );
        }
        $this->db->insert_batch('tbp_opwrkrinfo', $insert_data);
        $result->qry[] = $this->db->last_query();
        $result->result = true;
        $result->result = $this->db->trans_status();

        if ($result->result === FALSE) {
            $this->db->trans_rollback();
            $result->qry[] = $this->db->last_query();
            $result->error = $this->db->error();
            $result->msg = '적용되지 않았습니다.';
        }else{
            $this->db->trans_commit();
            $result->qry[] = $this->db->last_query();
            $result->error = $this->db->error();
            $result->msg = '적용되었습니다.';
        }
        return $result;
    }

    private function _save_wrkctr_wrkr_mgt($param){

        $this->db->trans_begin();
        $result = null;
        $result = (object) [];
        $result->data = [];
        $result->msg = "";
        $result->result = false;

        //fact_cd, wrkctr_cd
        //select 해서 해당 데이터가 있는지...
        $selectqry = "SELECT count(*) cnt FROM tbm_wrkctrwrkrinfo WHERE fact_cd = '{$param[0][0]['fact_cd']}' AND wrkctr_cd = '{$param[0][0]['wrkctr_cd']}';";
        $result->chk = $this->db->query($selectqry)->row()->cnt;

        if($result->chk){
            // exit(json_encode($param[0][0]['fact_cd']));
            // DELETE FROM tbm_wrkctrwrkrinfo WHERE fact_cd = '' AND wrkctr_cd = ''; 를 사용해서 처리
            $delectsql = "DELETE FROM tbm_wrkctrwrkrinfo WHERE fact_cd = '{$param[0][0]['fact_cd']}' AND wrkctr_cd = '{$param[0][0]['wrkctr_cd']}';";
            $this->mes_m->query($delectsql);
            // (WHERE fact_cd = '$param[0]['fact_cd']' and )
        }

        $insertqry = "INSERT INTO tbm_wrkctrwrkrinfo( fact_cd , wrkctr_cd , wrkr_cd , op_cd , main_wrkr_yn , remark , inst_id , updt_id ) values ";
        //foreach를 사용해서 문자열을 만든 후 query안에 담아서 insert

        $insert_data = [];
        foreach ($param[0] as $key => $value) {
            $insert_data[] = array(
                'fact_cd' => $value['fact_cd'],
                'wrkctr_cd' => $value['wrkctr_cd'],
                'wrkr_cd' => $value['wrkr_cd'],
                'op_cd' => $value['op_cd'],
                'main_wrkr_yn' => $value['main_wrkr_yn'],
                'remark' => $value['remark']
            );
        }

        $str = "";

        $insertnum = count($insert_data);
        for($i=0; $i<$insertnum; $i++){
            if($i == $insertnum-1){
                $str = $str."('{$insert_data[$i]['fact_cd']}','{$insert_data[$i]['wrkctr_cd']}','{$insert_data[$i]['wrkr_cd']}','{$insert_data[$i]['op_cd']}','{$insert_data[$i]['main_wrkr_yn']}','{$insert_data[$i]['remark']}','{$this->session->userdata('emp_id')}','{$this->session->userdata('emp_id')}');";
                break;
            }else{
                $str = $str."('{$insert_data[$i]['fact_cd']}','{$insert_data[$i]['wrkctr_cd']}','{$insert_data[$i]['wrkr_cd']}','{$insert_data[$i]['op_cd']}','{$insert_data[$i]['main_wrkr_yn']}','{$insert_data[$i]['remark']}','{$this->session->userdata('emp_id')}','{$this->session->userdata('emp_id')}'),";
            }
        }

        $insertqry = $insertqry . $str;
        //exit(json_encode($insertqry));

        if(true) {
            //$this->mes_m->query($insertqry);
            $this->db->query($insertqry);
            //exit(json_encode($this->db->last_query()));
        }
        $result->result = $this->db->trans_status();
        if ($result->result === FALSE) {
            $this->db->trans_rollback();
            $result->qry[] = $this->db->last_query();
            $result->error = $this->db->error();
            $result->msg = '적용되지 않았습니다.';
        }else{
            $this->db->trans_commit();
            $result->qry[] = $this->db->last_query();
            $result->error = $this->db->error();
            $result->msg = '적용되었습니다.';
        }
        return $result;
    }

    private  function _get_op_wrkr_mgt($param = [],$data_list = []){
        $this->load->library('dbinfo');
        $cond = $this->dbinfo->query_condition($param);
        $qry = "SELECT a.fact_cd, a.op_cd, fnc_op_nm(a.fact_cd, a.op_cd) op_nm, if(b.cnt IS NULL, 0, b.cnt) AS wrkr_num
                    FROM tbp_opinfo a
                    LEFT JOIN (
                       SELECT fact_cd fact_cd, op_cd, COUNT(wrkr) cnt
                       FROM tbp_opwrkrinfo".
            (isset($cond['where']) && trim($cond['where']) != '' ? " WHERE {$cond['where']} " : "").
            " GROUP BY fact_cd,op_cd) b
                    ON a.fact_cd = b.fact_cd
                    AND a.op_cd = b.op_cd
                    WHERE a.fact_cd LIKE CONCAT('%','{$data_list['fact_cd']}','%')
                    AND a.op_cd LIKE CONCAT('%','{$data_list['op_cd']}','%')
                    AND fnc_op_nm(a.fact_cd, a.op_cd) LIKE CONCAT('%','{$data_list['op_nm']}','%');";
        $result = $this->mes_m->query($qry);

        $result->cond = $cond;
        $result->param = $param;
        exit(json_encode($result));
    }

    private  function _get_wrkr($param = []){
        $qry = "SELECT a.emp_id, a.emp_nm 
                    FROM 	 tbc_userinfo a 
                             LEFT OUTER JOIN tbp_opwrkrinfo b ON(a.fact_cd = b.fact_cd AND a.emp_id = b.wrkr AND b.op_cd = '{$param['where']['op_cd']}') #해당 공정코드
                    WHERE  a.fact_cd = '{$param['where']['fact_cd']}' #해당 공장코드
                    AND    a.wrk_gbn = 'prdct'
                    AND    a.use_yn  = 'Y'
                    AND	 b.wrkr IS NULL
                    ORDER BY a.emp_id;";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private  function _get_wrkr_list($param = []){
        $qry = "SELECT wrkr,fnc_user_nm(fact_cd,wrkr)  wrkr_nm,remark
                            FROM   tbp_opwrkrinfo
                            WHERE  fact_cd = '{$param['where']['fact_cd']}'
                            AND    op_cd   = '{$param['where']['op_cd']}'
                            ORDER BY wrkr;";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private  function _get_po_drct_biz_mgt($data_list = []){
        $qry= "SELECT a.fact_cd
                    ,a.po_biz_cd
                    ,d.biz_nm po_biz_nm 
                    ,a.prt_nbr_cd
                    ,b.prt_nbr_nm 
                    ,a.po_drct_biz_cd
                    ,f.biz_nm po_drct_biz_nm
                    ,a.ship_price
                    ,a.use_yn
                    ,a.remark
                    ,a.inst_id
                    ,a.inst_dt
                    ,a.updt_id
                    ,a.updt_dt
            FROM   tbp_podrctbizprtnbr a
            left join tbm_prtnbrinfo b on(a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd)
            left join tbs_bizinfo d on(a.po_biz_cd = d.biz_cd)
            left join tbs_bizinfo f on(a.po_drct_biz_cd = f.biz_cd)
            WHERE  a.fact_cd    like CONCAT('%','{$data_list['fact_cd']}','%')  #공장코드 필터
            AND    a.po_biz_cd LIKE CONCAT('%','{$data_list['biz_cd']}','%')   #발주업체코드 필터
            AND    a.prt_nbr_cd LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')   #품번코드 필터
            AND    b.prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%')   #품번명 필터
            AND    d.biz_nm LIKE CONCAT('%','{$data_list['biz_nm']}','%')   #발주 업체 명 필터
            AND   a.use_yn LIKE CONCAT('%','{$data_list['fuse_yn']}','%')  #사용여부 필터;
            ORDER BY a.updt_dt;";

        exit(json_encode($this->mes_m->query($qry)));
    }


    private  function _get_po_biz_mgt($data_list = []){
         $qry= "SELECT a.fact_cd
                    ,a.po_biz_cd
                    ,d.biz_nm po_biz_nm 
                    ,a.prt_nbr_cd
                    ,b.prt_nbr_nm 
                    ,b.spec 
                    ,a.po_price
                    ,a.rewrk_price1
                    ,a.rewrk_price2
                    ,a.po_prt_nbr
                    ,a.po_unit
                    ,a.sagub_type
                    ,a.use_yn
                    ,a.remark
                    ,a.inst_id
                    ,a.inst_dt
                    ,a.updt_id
                    ,a.updt_dt
            FROM   tbp_pobizprtnbr a
            left join tbm_prtnbrinfo b on(a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd)
            left join tbs_bizinfo d on(a.po_biz_cd = d.biz_cd)
            WHERE  a.fact_cd    like CONCAT('%','{$data_list['fact_cd']}','%')  #공장코드 필터
            AND    a.po_biz_cd LIKE CONCAT('%','{$data_list['biz_cd']}','%')   #발주업체코드 필터
            AND    a.prt_nbr_cd LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')   #품번코드 필터
            AND    b.prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%')   #품번명 필터
            AND    d.biz_nm LIKE CONCAT('%','{$data_list['biz_nm']}','%')   #발주 업체 명 필터
            AND   a.use_yn LIKE CONCAT('%','{$data_list['fuse_yn']}','%')  #사용여부 필터;
            ORDER BY a.updt_dt;";

        exit(json_encode($this->mes_m->query($qry)));
    }

    private  function _get_ship_biz_mgt($tb, $data_list = []){

        $qry= "SELECT a.fact_cd
                    ,a.ship_biz_cd
                    ,d.biz_nm ship_biz_nm 
                    ,a.prt_nbr_cd
                    ,b.prt_nbr_nm 
                    ,a.ship_price
                    ,a.rewrk_price1
                    ,a.rewrk_price2
                    ,a.ship_prt_nbr
                    ,a.parking_unit
                    ,a.parking_qty
                    ,a.whs_use_yn
                    ,a.use_yn
                    ,a.remark
                    ,a.inst_id
                    ,a.inst_dt
                    ,a.updt_id
                    ,a.updt_dt
            FROM   tbp_shipbizprtnbr a
            left join tbm_prtnbrinfo b on(a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd)
            left join tbs_bizinfo d on(a.ship_biz_cd = d.biz_cd)
            WHERE  a.fact_cd    like CONCAT('%','{$data_list['fact_cd']}','%')  #공장코드 필터
            AND    a.ship_biz_cd LIKE CONCAT('%','{$data_list['biz_cd']}','%')   #발주업체코드 필터
            AND    a.prt_nbr_cd LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')   #품번코드 필터
            AND    b.prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%')   #품번명 필터
            AND    d.biz_nm LIKE CONCAT('%','{$data_list['biz_nm']}','%')   #발주 업체 명 필터
            AND   a.use_yn LIKE CONCAT('%','{$data_list['fuse_yn']}','%')  #사용여부 필터;
            ORDER BY a.updt_dt;";

        exit(json_encode($this->mes_m->query($qry)));

    }

   /* private  function _get_ship_biz_mgt($tb, $data_list = []){


        $result = $this->mes_m->get_response_data_form();
        $this->db->select($tb.'.*,d.biz_nm po_biz_nm ,a.prt_nbr_nm ');
        $this->db->from($tb);
        $this->db->join('tbm_prtnbrinfo a', $tb.'.fact_cd = a.fact_cd and '.$tb.'.prt_nbr_cd = a.prt_nbr_cd', 'left');
        $this->db->join('tbs_bizinfo d', $tb.'.ship_biz_cd = d.biz_cd and ', 'left');
        $this->db->where($tb.'.fact_cd', $data_list['fact_cd']);
        $this->db->like($tb.'.prt_nbr_cd', $data_list['prt_nbr_cd'], 'both');
        $this->db->like('a.prt_nbr_nm', $data_list['prt_nbr_nm'], 'both');

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

    }*/



    private  function _get_pop_mach_cd($data_list = []){
        $qry = "SELECT a.fact_cd 
                  ,fnc_cd_nm(a.fact_cd,'fact_cd') fact_nm
                  ,a.mach_cd
                  ,a.mach_nm
                  ,a.use_yn
                  ,a.remark
                  ,b.dsp_seq
            FROM  tbp_machinfo a LEFT OUTER JOIN  tbp_wrkctrmachinfo b ON (a.fact_cd = b.fact_cd AND a.mach_cd = b.mach_cd)
            WHERE a.fact_cd    like CONCAT('%','{$data_list['fact_cd']}','%')  #공장코드 필터
            AND   a.mach_cd like concat('%','{$data_list['mach_cd']}','%')  #작업장코드 필터
            AND   a.mach_nm like concat('%','{$data_list['mach_nm']}','%')  #작업장명 필터
            AND   a.use_yn like CONCAT('%','{$data_list['use_yn']}','%')  #사용여부 필터
            ORDER BY a.mach_cd;";



        exit(json_encode($this->mes_m->query($qry)));
    }

    private  function _get_pop_wrkctr_cd($data_list = []){
        $qry = "SELECT fact_cd 
                          ,fnc_cd_nm(fact_cd,'fact_cd') fact_nm 
                          ,op_cd
                          ,fnc_op_nm(fact_cd,op_cd) op_nm
                          ,wrkctr_cd
                          ,wrkctr_nm
                          ,use_yn
                          ,remark
                    FROM  tbp_wrkctrinfo 
                    WHERE fact_cd   like concat('%','{$data_list['fact_cd']}','%')  #공장코드 필터
                    AND   op_cd     like concat('%','{$data_list['op_cd']}','%')  #공정 코드 필터
                    AND   fnc_op_nm(fact_cd,op_cd) like concat('%','{$data_list['op_nm']}','%')  #공정명 필터
                    AND   wrkctr_cd like concat('%','{$data_list['wrkctr_cd']}','%')  #작업장코드 필터
                    AND   wrkctr_nm like concat('%','{$data_list['wrkctr_nm']}','%')  #장업장명 필터
                    AND   use_yn like concat('%','{$data_list['use_yn']}','%'); #사용여부 필터";
        exit(json_encode($this->mes_m->query($qry)));
    }


    private  function _get_wrkctr_wrkr_mgt($data_list = []){
        $qry = "SELECT a.fact_cd
                      ,MAX(fnc_cd_nm(a.fact_cd,'fact_cd')) fact_nm
                      ,a.op_cd
                      ,MAX(fnc_op_nm(a.fact_cd,a.op_cd)) op_nm
                      ,a.wrkctr_cd
                      ,MAX(fnc_wrkctr_nm(a.fact_cd,a.wrkctr_cd)) wrkctr_nm
                      ,GROUP_CONCAT(CASE WHEN b.main_wrkr_yn = 'Y' THEN b.wrkr_cd END) main_wrkr
                      ,GROUP_CONCAT(c.emp_nm) main_wrkr_nm
                      ,IFNULL(COUNT(b.wrkctr_cd),0) wrkctrwrkr_count 
                FROM   tbp_wrkctrinfo a
                      LEFT OUTER JOIN tbm_wrkctrwrkrinfo b ON (a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd)
                      LEFT OUTER JOIN tbc_userinfo c ON(c.fact_cd = b.fact_cd AND c.emp_id = b.wrkr_cd AND b.main_wrkr_yn = 'Y')
                WHERE  a.fact_cd = '{$data_list['fact_cd']}'   #공장코드 필터
                AND    a.op_cd LIKE CONCAT('%','{$data_list['op_cd']}','%')   #공정코드 필터
                AND    fnc_op_nm(a.fact_cd,a.op_cd) LIKE CONCAT('%','{$data_list['op_nm']}','%')   #공정명  필터
                AND    IFNULL(a.use_yn,'N')   = 'Y'  #작업장 사용하는것만 
                GROUP BY a.fact_cd
                          ,a.op_cd
                        ,a.wrkctr_cd  
                ORDER BY a.staus_brd_seq;";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private  function _get_wrkctr_wrkr($param = []){
        //$result = $this->mes_m->get_response_data_form();
        //$result->data = [];
        $qry = "SELECT a.fact_cd
                           ,a.op_cd 
                           ,fnc_op_nm(a.fact_cd,a.op_cd) op_nm
                           ,a.wrkr
                           ,fnc_user_nm(a.fact_cd,a.wrkr) wrkr_nm
                           ,'N' main_wrkr_yn
                           ,''  remark
                    FROM   tbp_opwrkrinfo a
                           left outer join tbm_wrkctrwrkrinfo b ON (a.fact_cd = b.fact_cd AND a.wrkr = b.wrkr_cd AND b.wrkctr_cd = '{$param['where']['wrkctr_cd']}')
                    WHERE  a.fact_cd LIKE CONCAT('{$param['where']['fact_cd']}','%')   #G1 선택 된  공장코드 필터
                    AND    a.op_cd LIKE CONCAT('%','{$param['where']['op_cd']}','%')  #G1 선택 된공정코드 필터 
                    AND    b.wrkr_cd IS NULL
                    ORDER BY a.fact_cd
                             ,a.op_cd      
                             ,a.wrkr;";
        //$result->data[0] = $this->db->query($wrkctr_wrkr_qry1)->result();
        //$result->data[1] = $this->db->query($wrkctr_wrkr_qry2)->result();
        //exit(json_encode($result));
        exit(json_encode($this->mes_m->query($qry)));
    }

    private  function _get_wrkctr_wrkr_list($param = []){
        $qry = "SELECT fact_cd
                           ,op_cd 
                           ,fnc_op_nm(fact_cd,op_cd) op_nm
                           ,wrkctr_cd 
                           ,fnc_wrkctr_nm(fact_cd,wrkctr_cd) wrkctr_nm
                           ,wrkr_cd
                           ,fnc_user_nm(fact_cd,wrkr_cd) wrkr_nm
                           ,main_wrkr_yn
                           ,remark
                    FROM   tbm_wrkctrwrkrinfo 
                    WHERE  fact_cd LIKE CONCAT('{$param['where']['fact_cd']}','%')   #G1 선택 된  공장코드 필터
                    AND    wrkctr_cd LIKE CONCAT('%','{$param['where']['wrkctr_cd']}','%')    #G1 선택 된공정코드 필터  
                    ORDER BY fact_cd
                             ,op_cd      
                             ,wrkctr_cd
                             ,wrkr_cd;";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private  function _get_pop_op_cd($data_list = []){
        $qry = "SELECT fact_cd 
                          ,fnc_cd_nm(fact_cd,'fact_cd') fact_nm 
                          ,op_cd
                          ,op_nm
                          ,use_yn
                          ,remark
                    FROM  tbp_opinfo 
                    WHERE fact_cd  like concat('%','{$data_list['fact_cd']}','%')  #공장코드 필터
                    AND   op_cd    like concat('%','{$data_list['op_cd']}','%')  #공정 코드 필터
                    AND   op_nm    like concat('%','{$data_list['op_nm']}','%')  #공정명 필터
                    AND   use_yn like concat('%','{$data_list['use_yn']}','%'); #사용여부 필터";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private  function _get_wrkctr_mach_mgt($data_list = []){
        $qry = "SELECT
                    fact_cd, 
                    wrkctr_cd,
                    fnc_wrkctr_nm(fact_cd,wrkctr_cd) wrkctr_nm,
                    mach_cd,
                    fnc_mach_nm(fact_cd,mach_cd) mach_nm,
                    dsp_seq,
                    colct_aply_yn,
                    in_crt_gbn,
                    use_yn,
                    remark,
                    inst_id,
                    inst_dt,
                    updt_id,
                    updt_dt
                FROM tbp_wrkctrmachinfo
                WHERE fact_cd  like concat('%','{$data_list['fact_cd']}','%')  #공장코드 필터
                AND wrkctr_cd like CONCAT('%','{$data_list['wrkctr_cd']}','%')
                AND fnc_wrkctr_nm(fact_cd,wrkctr_cd) like concat('%','{$data_list['wrkctr_nm']}','%');";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_part_nbr_rtg_mgt($tb,$data_list = []){
        $result = $this->mes_m->get_response_data_form();
        $this->db->select($tb.'.*, a.prt_nbr_nm as mprt_nbr_nm, a.account_type as maccount_type, b.prt_nbr_nm as input_prt_nbr_nm, b.spec as input_spec, b.account_type as input_account_type, c.prt_nbr_nm as prd_prt_nbr_nm, c.spec as prd_spec, c.account_type as prd_account_type, d.op_nm, e.biz_nm as outsorcng_cmpy_nm');
        $this->db->from($tb);
        $this->db->join('tbm_prtnbrinfo a', $tb.'.fact_cd = a.fact_cd and '.$tb.'.mprt_nbr_cd = a.prt_nbr_cd', 'left');
        $this->db->join('tbm_prtnbrinfo b', $tb.'.fact_cd = b.fact_cd and '.$tb.'.input_prt_nbr_cd = b.prt_nbr_cd', 'left');
        $this->db->join('tbm_prtnbrinfo c', $tb.'.fact_cd = c.fact_cd and '.$tb.'.prd_prt_nbr_cd = c.prt_nbr_cd', 'left');
        $this->db->join('tbp_opinfo d', $tb.'.fact_cd = d.fact_cd and '.$tb.'.op_cd = d.op_cd', 'left');
        $this->db->join('tbs_bizinfo e', $tb.'.outsorcng_cmpy = e.biz_cd', 'left');
        $this->db->where($tb.'.fact_cd', $data_list['fact_cd']);
        $this->db->like($tb.'.mprt_nbr_cd', $data_list['prt_nbr_cd'], 'both');
        $this->db->like('a.prt_nbr_nm', $data_list['prt_nbr_nm'], 'both');
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

    private function _get_part_nbr_uph_mgt($tb,$data_list = []){
        $result = $this->mes_m->get_response_data_form();
        $this->db->select($tb.'.*, a.prt_nbr_nm, a.spec');
        $this->db->from($tb);
        $this->db->join('tbm_prtnbrinfo a', $tb.'.fact_cd = a.fact_cd and '.$tb.'.prt_nbr_cd = a.prt_nbr_cd', 'left');
        $this->db->where($tb.'.fact_cd', $data_list['fact_cd']);
        $this->db->like($tb.'.prt_nbr_cd', $data_list['prt_nbr_cd'], 'both');
        $this->db->like('a.prt_nbr_nm', $data_list['prt_nbr_nm'], 'both');
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
        if(isset($param['like'])) {
            $mach_cd = isset($param['like']['mach_cd']) ? $param['like']['mach_cd'][0] : '';
            $mach_nm = isset($param['like']['mach_nm']) ? $param['like']['mach_nm'][0] : '';
            $op_cd = isset($param['like']['op_cd']) ? $param['like']['op_cd'][0] : '';
            $op_nm = isset($param['like']['op_nm']) ? $param['like']['op_nm'][0] : '';
            $wrkctr_cd = isset($param['like']['wrkctr_cd']) ? $param['like']['wrkctr_cd'][0] : '';
            $wrkctr_nm = isset($param['like']['wrkctr_nm']) ? $param['like']['wrkctr_nm'][0] : '';
            $prt_nbr_cd = isset($param['like']['prt_nbr_cd']) ? $param['like']['prt_nbr_cd'][0] : '';
            $prt_nbr_nm = isset($param['like']['prt_nbr_nm']) ? $param['like']['prt_nbr_nm'][0] : '';
            $biz_cd = isset($param['like']['biz_cd']) ? $param['like']['biz_cd'][0] : '';
            $biz_nm = isset($param['like']['biz_nm']) ? $param['like']['biz_nm'][0] : '';
            $fuse_yn = isset($param['like']['fuse_yn']) ? $param['like']['fuse_yn'][0] : '';

        }else {
            $mach_cd = '';
            $mach_nm = '';
            $op_cd = '';
            $op_nm = '';
            $wrkctr_cd = '';
            $wrkctr_nm = '';
            $prt_nbr_cd = '';
            $prt_nbr_nm = '';
            $biz_cd = '';
            $biz_nm = '';
            $fuse_yn = '';
        }
        if(isset($param['where'])){
            $fact_cd = isset($param['where']['fact_cd']) ? $param['where']['fact_cd'] : '';
            $use_yn = isset($param['where']['use_yn']) ? $param['where']['use_yn'] : '';
            $fuse_yn = isset($param['where']['fuse_yn']) ? $param['where']['fuse_yn'] : '';
        }else{
            $fact_cd = '';
            $use_yn = '';
            $fuse_yn = '';
        }

        $data_list = [
            "use_yn" => $use_yn,
            "mach_cd" => $mach_cd,
            "mach_nm" => $mach_nm,
            "op_cd" => $op_cd,
            "op_nm" => $op_nm,
            "wrkctr_cd" => $wrkctr_cd,
            "wrkctr_nm" => $wrkctr_nm,
            "fact_cd" => $fact_cd,
            "prt_nbr_cd" => $prt_nbr_cd,
            "prt_nbr_nm" => $prt_nbr_nm,
            "biz_cd" => $biz_cd,
            "biz_nm" => $biz_nm,
            "fuse_yn" => $fuse_yn,
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
            'po_drct_biz_mgt' => ['tbp_podrctbizprtnbr'],
            'po_biz_mgt' => ['tbp_pobizprtnbr'],
            'opinfo' => ['tbp_opinfo'],
            'op_wrkr_mgt' => ['tbp_opwrkrinfo'],
            'wrkr' => ['tbc_userinfo'],
            'wrkctr_mgt' => ['tbp_wrkctrinfo'],
            'wrkr_list' => [''],
            'eqpmt_mgt' => ['tbp_machinfo'],
            'eqpmt_fault_item_mgt' => ['tbp_machfaultitem'],
            'bad_code_mgt' => ['tbp_erriteminfo'],
            'run_stop_mgt' => ['tbp_stopiteminfo'],
            'part_nbr_uph_mgt' => ['tbp_prtnbruph'],
            'wrkctr_mach_mgt' => ['tbp_wrkctrmachinfo'],
            'pop_mach_cd' => [''],
            'pop_wrkctr_cd' => [''],
            'pop_op_cd' => [''],
            'wrkctr_wrkr_mgt' => [''],
            'wrkctr_wrkr' => [''],
            'wrkctr_wrkr_list' => [''],
            'part_nbr_rtg_mgt' => ['tbp_routinfo'],
            'ship_biz_mgt' => ['tbp_shipbizprtnbr'],
        ];
        return $tables[$path];
    }


}