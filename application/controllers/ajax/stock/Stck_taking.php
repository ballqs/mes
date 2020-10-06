<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Stck_taking extends CI_Controller
{
    public function get($path = ''){
        $tb = $this->_get_table($path)[0];

        if ($path !== 'codeinfo') {
            $param = $this->input->get(null, true)['param'];
            $data_list = $this->_get_data_ref($param);
        }



        if($path == 'stck_taking'){
            $qry = "SELECT a.fact_cd,
                             fnc_cd_nm(a.fact_cd,'fact_cd') fact_nm,
                             a.taking_ymd,
                             a.prt_nbr_cd,
                             b.prt_nbr_nm,
                             b.spec,
                             a.lotno,
                             b.base_unit as stck_unit,
                             b.account_type,
                             fnc_cd_nm(b.account_type,'account_type') account_type_nm,
                             a.whs_cd,
                             fnc_whs_nm(a.fact_cd,a.whs_cd) whs_nm,
                             a.loc_cd,
                             fnc_loc_nm(a.fact_cd,a.whs_cd,a.loc_cd) loc_nm,
                             a.taking_qty,
                             a.taking_gbn_cd,
                             a.confrm_yn,
                             a.aply_yn,
                             a.remark,
                             a.inst_id,
                             a.inst_dt,
                             a.updt_id,
                             a.updt_dt
                    FROM	twm_stcktaking a LEFT OUTER JOIN tbm_prtnbrinfo b ON (a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd)
                    WHERE   a.fact_cd LIKE CONCAT('{$data_list['fact_cd']}')
                    AND	    a.prt_nbr_cd LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')
                    AND	    b.prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%')
                    AND	    a.whs_cd LIKE CONCAT('%','{$data_list['whs_cd']}','%')
                    AND	    fnc_whs_nm(a.fact_cd,a.whs_cd) LIKE CONCAT('%','{$data_list['whs_nm']}','%')
                    AND	    a.loc_cd LIKE CONCAT('%','{$data_list['loc_cd']}','%')
                    AND	    fnc_loc_nm(a.fact_cd,a.whs_cd,a.loc_cd) LIKE CONCAT('%','{$data_list['loc_nm']}','%')
                    AND	    IFNULL(b.account_type,'*') LIKE CONCAT('%','{$data_list['account_type']}','%')
                    AND	    a.confrm_yn LIKE CONCAT('%','{$data_list['confrm_yn']}','%');";
            $result = $this->mes_m->query($qry);

            exit(json_encode($result));

        }elseif ($path == 'codeinfo'){
            $qry = "SELECT cd_set1 
                    FROM tbc_codeinfo 
                    WHERE up_cd ='MES' 
                    AND cd = 'stock_loc_mgt';";
            exit(json_encode($this->mes_m->query($qry)));
        }elseif($path == 'stck_taking_wp'){
            $this->_get_stck_taking_wp($data_list);
        }

        $data = $this->mes_m->get($tb, $param);
        echo json_encode($data);
    }

    public function save($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];


        if($path == 'stck_taking'){

            for($i = 0; $i < count($param[0]); $i = 1 + $i){
                unset($param[0][$i]['prt_nbr_nm']);
                unset($param[0][$i]['spec']);
                unset($param[0][$i]['account_type']);
                unset($param[0][$i]['whs_nm']);
                unset($param[0][$i]['loc_nm']);
            }
//            exit(json_encode($param));
        }elseif($path == 'stck_taking_wp'){

            for($i = 0; $i < count($param[0]); $i = 1 + $i){
                unset($param[0][$i]['prt_nbr_nm']);
                unset($param[0][$i]['spec']);
                unset($param[0][$i]['account_type']);
                unset($param[0][$i]['whs_nm']);
                unset($param[0][$i]['loc_nm']);
                unset($param[0][$i]['biz_cd']);
                unset($param[0][$i]['biz_nm']);
                unset($param[0][$i]['ship_nm']);
                $param[0][$i]['lotno'] = $param[0][$i]['ship_cd'];
                unset($param[0][$i]['ship_cd']);
            }
        }
        $data = $this->mes_m->save($tb, $param);
        echo json_encode($data);
    }

    public function delete($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];
        if($path == 'stck_taking_wp'){
            for($i = 0; $i < count($param[0]); $i = 1 + $i){
                $param[0][$i]['lotno'] = $param[0][$i]['ship_cd'];
                unset($param[0][$i]['ship_cd']);
            }
        }
        $result = $this->mes_m->delete($tb, $param);
        echo json_encode($result);
    }

    public function confrm($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];

        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();

        for($i = 0; $i < count($param[0]); $i++){
            //param의 key값만 가져오기
            $keys = array_keys($param[0][$i]);
            //param의 value값만 가져오기
            $values = array_values($param[0][$i]);
            $data = [];
            $where = [];
            for($j = 0; $j < count($param[0][$i]); $j++){
                if($keys[$j] === 'fact_cd' || $keys[$j] === 'taking_ymd' || $keys[$j] === 'prt_nbr_cd' || $keys[$j] === 'lotno'){
                    $where[$keys[$j]] = $values[$j];
                }else{
                    $data[$keys[$j]] = $values[$j];
                }
            }
            $this->db->update($tb[0], $data, $where);

        }

        if ($this->db->trans_status() === FALSE){
            $result->msg = '확정되지 않았습니다.';
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else{
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = '확정되었습니다.';
            $this->db->trans_commit();
        }

        exit(json_encode($result));
    }

    private function _get_stck_taking_wp($data_list){
        $qry = "SELECT  a.fact_cd,
                        fnc_cd_nm(a.fact_cd,'fact_cd') fact_nm,
                        a.taking_ymd,
                        a.prt_nbr_cd,
                        b.prt_nbr_nm,
                        b.spec,
                        c.biz_cd,
                        fnc_biz_nm((SELECT MAX(cd) FROM tbc_codeinfo WHERE up_cd = 'cmpny_cd'), c.biz_cd) biz_nm,
                        a.lotno as ship_cd,
                        IFNULL(c.ship_nm,'*') as ship_nm,
                        b.base_unit  stck_unit,
                        b.account_type,
                        fnc_cd_nm(b.account_type,'account_type') account_type_nm,
                        a.whs_cd,
                        fnc_whs_nm(a.fact_cd,a.whs_cd) whs_nm,
                        a.loc_cd,
                        fnc_loc_nm(a.fact_cd,a.whs_cd,a.loc_cd) loc_nm,
                        a.taking_qty,
                        a.taking_gbn_cd,
                        a.confrm_yn,
                        a.aply_yn,
                        a.remark,
                        a.inst_id,
                        a.inst_dt,
                        a.updt_id,
                        a.updt_dt
                FROM	twm_stcktaking a 
                LEFT OUTER JOIN tbm_prtnbrinfo b ON (a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd)
                LEFT OUTER JOIN tbs_bizmrloc c ON (a.lotno = c.ship_cd)
                WHERE   a.fact_cd LIKE CONCAT('{$data_list['fact_cd']}')
                AND	    a.prt_nbr_cd LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')
                AND	    b.prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%')
                AND	    a.whs_cd LIKE CONCAT('%','{$data_list['whs_cd']}','%')
                AND	    fnc_whs_nm(a.fact_cd,a.whs_cd) LIKE CONCAT('%','{$data_list['whs_nm']}','%')
                AND	    a.loc_cd LIKE CONCAT('%','{$data_list['loc_cd']}','%')
                AND	    fnc_loc_nm(a.fact_cd,a.whs_cd,a.loc_cd) LIKE CONCAT('%','{$data_list['loc_nm']}','%')
                AND	    b.account_type LIKE CONCAT('%','{$data_list['account_type']}','%')
                AND	    a.confrm_yn LIKE CONCAT('%','{$data_list['confrm_yn']}','%')
                AND	    a.lotno LIKE CONCAT('%','{$data_list['ship_cd']}','%')
                AND	    IFNULL(c.ship_nm,'*') LIKE CONCAT('%','{$data_list['ship_nm']}','%')
                AND     a.taking_ymd between '{$data_list['date1']}' and '{$data_list['date2']}';";
        exit(json_encode($this->mes_m->query($qry)));
    }


    private function _get_data_ref($param){
        if(isset($param['like'])) {
            $prt_nbr_cd = isset($param['like']['prt_nbr_cd']) ? $param['like']['prt_nbr_cd'][0] : '';
            $prt_nbr_nm = isset($param['like']['prt_nbr_nm']) ? $param['like']['prt_nbr_nm'][0] : '';
            $whs_cd = isset($param['like']['whs_cd']) ? $param['like']['whs_cd'][0] : '';
            $whs_nm = isset($param['like']['whs_nm']) ? $param['like']['whs_nm'][0] : '';
            $loc_cd = isset($param['like']['loc_cd']) ? $param['like']['loc_cd'][0] : '';
            $loc_nm = isset($param['like']['loc_nm']) ? $param['like']['loc_nm'][0] : '';
            $ship_cd = isset($param['like']['ship_cd']) ? $param['like']['ship_cd'][0] : '';
            $ship_nm = isset($param['like']['ship_nm']) ? $param['like']['ship_nm'][0] : '';
        }else {
            $prt_nbr_cd = '';
            $prt_nbr_nm = '';
            $whs_cd = '';
            $whs_nm = '';
            $loc_cd = '';
            $loc_nm = '';
            $ship_cd = '';
            $ship_nm = '';
        }
        if(isset($param['where'])){
            $fact_cd = isset($param['where']['fact_cd']) ? $param['where']['fact_cd'] : '';
            $account_type = isset($param['where']['account_type']) ? $param['where']['account_type'] : '';
            $confrm_yn = isset($param['where']['confrm_yn']) ? $param['where']['confrm_yn'] : '';
            $date1 = isset($param['where']['date1']) ? $param['where']['date1'] : '';
            $date2 = isset($param['where']['date2']) ? $param['where']['date2'] : '';
        }else{
            $fact_cd = '';
            $account_type = '';
            $confrm_yn = '';
            $date1 = '';
            $date2 = '';
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
            "confrm_yn" => $confrm_yn,
            "ship_cd" => $ship_cd,
            "ship_nm" => $ship_nm,
            "date1" => $date1,
            "date2" => $date2,
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
            'stck_taking' => ['twm_stcktaking'],
            'stck_taking_wp' => ['twm_stcktaking'],
            'codeinfo' => [''],
        ];
        return $tables[$path];
    }
}