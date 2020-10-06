<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Bad_anly_staus extends CI_Controller
{
    public function get($path = ''){

        $tb = $this->_get_table($path)[0];
        $param = $this->input->get(null, true)['param'];
        $data_list = $this->_get_data_ref($param);

        if($path == 'bad_anly_staus'){
            $this->_get_bad_anly_staus($data_list);
        }

    }

    private function _get_bad_anly_staus($data_list){
        $qry = "SELECT 
                    a.fact_cd, b.op_cd, fnc_op_nm(b.fact_cd, b.op_cd) AS op_nm, a.wrkctr_cd, fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) AS wrkctr_nm,
                    a.rec_ymd, fnc_cd_nm(c.daynight_gbn, 'day_night') AS daynight_gbn, a.prt_nbr_no, d.prt_nbr_nm, d.spec, a.err_cd, e.err_nm, e.err_gbn, c.err_qty, a.lotno, c.prd_unit,
                    a.remark, IF(a.updt_dt IS NULL,a.inst_dt,a.updt_dt) AS inst_dt
                FROM tpb_ordrerrrst a
                LEFT JOIN tbp_wrkctrinfo b ON(a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd)
                LEFT JOIN tpb_ordrwrkrst c ON(a.fact_cd = c.fact_cd AND a.wrkctr_cd = c.wrkctr_cd AND a.wrk_ordr_no = c.wrk_ordr_no AND a.prt_nbr_no = c.prt_nbr_no AND a.lotno = c.lotno)
                LEFT JOIN tbm_prtnbrinfo d ON(a.fact_cd = d.fact_cd AND a.prt_nbr_no = d.prt_nbr_cd)
                LEFT JOIN tbp_erriteminfo e ON(a.fact_cd = e.fact_cd AND a.err_cd = e.err_cd)
                WHERE a.fact_cd = '{$data_list['fact_cd']}'
                AND a.rec_ymd BETWEEN '{$data_list['date1']}' AND '{$data_list['date2']}'
                AND b.op_cd LIKE CONCAT('{$data_list['op_cd']}','%')
                AND fnc_op_nm(b.fact_cd, b.op_cd) LIKE CONCAT('{$data_list['op_nm']}','%')
                AND d.account_type LIKE CONCAT('{$data_list['account_type']}','%')
                AND a.wrkctr_cd LIKE CONCAT('{$data_list['wrkctr_cd']}','%')
                AND fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) LIKE CONCAT('{$data_list['wrkctr_nm']}','%')
                AND e.err_gbn LIKE CONCAT('{$data_list['err_gbn']}','%')
                AND IFNULL(a.del_yn,'N') = 'N'
                ORDER BY a.rec_ymd;";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_data_ref($param){
        $op_cd = isset($param['like']['op_cd']) ? $param['like']['op_cd'][0] : '';
        $op_nm = isset($param['like']['op_nm']) ? $param['like']['op_nm'][0] : '';
        $wrkctr_cd = isset($param['like']['wrkctr_cd']) ? $param['like']['wrkctr_cd'][0] : '';
        $wrkctr_nm = isset($param['like']['wrkctr_nm']) ? $param['like']['wrkctr_nm'][0] : '';

        $fact_cd = isset($param['where']['fact_cd']) ? $param['where']['fact_cd'] : '';
        $account_type = isset($param['where']['account_type']) ? $param['where']['account_type'] : '';
        $date1 = isset($param['where']['date1']) ? $param['where']['date1'] : '';
        $date2 = isset($param['where']['date2']) ? $param['where']['date2'] : '';
        $err_gbn = isset($param['where']['err_gbn']) ? $param['where']['err_gbn'] : '';

        $data_list = [
            "fact_cd" => $fact_cd,
            "op_cd" => $op_cd,
            "op_nm" => $op_nm,
            "wrkctr_cd" => $wrkctr_cd,
            "wrkctr_nm" => $wrkctr_nm,
            "account_type" => $account_type,
            "date1" => $date1,
            "date2" => $date2,
            "err_gbn" => $err_gbn,
        ];

        return $data_list;
    }

    private function _get_table($path = ''){
        $tables = [
            'bad_anly_staus' => [''],
        ];
        return $tables[$path];
    }
}