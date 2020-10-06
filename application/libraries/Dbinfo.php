<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Dbinfo DB 정보를 관리하는 class.
 */
class Dbinfo extends CI_Controller {

    function __construct()
    {

    }

    public static function primary_key($tbl){
        $pk = [
            'ci_sessions' => ['id'],
            'sp_errlog' => ['err_log_id'],
            'tableseq' => ['fact_cd', 'header', 'y2md'],
            'tbc_batchlog' => ['seq'],
            'tbc_btninfo' => ['btn_id'],
            'tbc_codeinfo' => ['cd', 'up_cd'],
            'tbc_deptinfo' => ['dept_cd'],
            'tbc_pgmbtninfo' => ['pgm_id', 'btn_id'],
            'tbc_pgmerrlog' => ['seq'],
            'tbc_pgminfo' => ['pgm_id', 'up_pgm_id'],
            'tbc_roleinfo' => ['role_id'],
            'tbc_rolepgmbtn' => ['role_id', 'pgm_id', 'btn_id'],
            'tbc_usercnctinfo' => ['cnct_dt', 'emp_id'],
            'tbc_userinfo' => ['emp_id'],
            'tbc_userole' => ['fact_cd', 'emp_id', 'role_id'],
            'tbm_bom' => ['fact_cd', 'mprt_nbr', 'spart_nbr'],
            'tbm_deptinfo' => ['cmpny_cd', 'dept_cd'],
            'tbm_prdcalndrinfo' => ['fact_cd', 'ymd'],
            'tbm_prtnbrinfo' => ['fact_cd', 'prt_nbr_cd'],
            'tbm_prtnbrtransinfo' => ['fact_cd', 'prt_nbr_cd', 'trans_unit'],
            'tbm_whsinfo' => ['fact_cd', 'whs_cd'],
            'tbm_whslocinfo' => ['fact_cd', 'whs_cd', 'loc_cd'],
            'tbm_wrkctrwrkrinfo' => ['fact_cd', 'wrkctr_cd', 'wrkr_cd'],
            'tbp_erriteminfo' => ['fact_cd', 'err_cd'],
            'tbp_machfaultitem' => ['fault_cd'],
            'tbp_machinfo' => ['fact_cd', 'mach_cd'],
            'tbp_opinfo' => ['fact_cd', 'op_cd'],
            'tbp_opwrkrinfo' => ['fact_cd', 'op_cd', 'wrkr_cd'],
            'tbp_pobizprtnbr' => ['fact_cd', 'po_biz_cd', 'prt_nbr_cd'],
            'tbp_podrctbizprtnbr' => ['fact_cd', 'po_biz_cd', 'prt_nbr_cd', 'po_drct_biz_cd'],
            'tbp_prtnbruph' => ['fact_cd', 'prt_nbr_cd'],
            'tbp_routinfo' => ['fact_cd', 'mprt_nbr_cd', 'op_seq'],
            'tbp_shipbizprtnbr' => ['fact_cd', 'ship_biz_cd', 'prt_nbr_cd'],
            'tbp_stopiteminfo' => ['fact_cd', 'stop_cd'],
            'tbp_wrkctrinfo' => ['fact_cd', 'wrkctr_cd'],
            'tbp_wrkctrmachinfo' => ['fact_cd', 'wrkctr_cd', 'mach_cd'],
            'tbq_inspctiteminfo' => ['fact_cd', 'inspct_cd'],
            'tbq_prtnbrinspct' => ['fact_cd', 'prt_nbr_cd', 'inspct_cd'],
            'tbq_prtnbrinspcthstry' => ['fact_cd', 'prt_nbr_cd', 'inspct_cd', 'apy_ymd'],
            'tbs_bizinfo' => ['cmpny_cd', 'biz_cd'],
            'tbs_bizmrloc' => ['cmpny_cd', 'biz_cd', 'ship_cd'],
            'tpa_monpln' => ['fact_cd', 'base_ym', 'week_ordr', 'prt_nbr_cd'],
            'tpa_purchinfo' => ['fact_cd', 'po_no', 'po_seq'],
            'tpa_purchininfo' => ['fact_cd', 'po_in_no'],
            'tpb_curwrkctrstaus' => ['fact_cd', 'wrkctr_cd'],
            'tpb_dalywrkordrpln' => ['fact_cd', 'wrk_ordr_no'],
            'tpb_machrslthstry' => ['fact_cd', 'wrkctr_cd', 'wrk_ordr_no', 'mach_cd', 'rslt_dt'],
            'tpb_ordrerrrst' => ['fact_cd', 'wrkctr_cd', 'wrk_ordr_no', 'prt_nbr_no', 'lotno', 'err_cd'],
            'tpb_ordrwrkrst' => ['fact_cd', 'wrkctr_cd', 'wrk_ordr_no', 'prt_nbr_no', 'lotno'],
            'tpb_runstophstry' => ['fact_cd', 'wrkctr_cd', 'wrk_ordr_no', 'mach_cd', 'str_dt', 'staus'],
            'tpb_wrkordrwrkr' => ['fact_cd', 'wrk_ordr_no', 'wrkr_cd'],
            'tpp_lotlnk' => ['fact_cd', 'out_prt_nbr_cd', 'out_lotno', 'in_prt_nbr_cd', 'in_lotno', 'in_seq'],
            'tpp_wrkctrselct' => ['fact_cd', 'wrkr_id', 'wrkctr_cd'],
            'tqa_inspctinfo' => ['fact_cd', 'inspct_no'],
            'tsa_claim' => ['seqno'],
            'tsa_ordrinfo' => ['fact_cd', 'ordr_no', 'seq'],
            'tsa_shipinfo' => ['fact_cd', 'ship_no'],
            'twm_inputhstry' => ['fact_cd', 'input_hstry_no'],
            'twm_instdprtnbr' => ['fact_cd', 'instd_no'],
            'twm_lotstaus' => ['fact_cd', 'prt_nbr_cd', 'lotno'],
            'twm_monthstckfnsh' => ['fact_cd', 'ym', 'lotno', 'prt_nbr_cd'],
            'twm_moveprtnbr' => ['fact_cd', 'move_no'],
            'twm_outputhstry' => ['fact_cd', 'output_hstry_no'],
            'twm_outputinfo' => ['fact_cd', 'out_no'],
            'twm_outputinfo' => ['fact_cd', 'out_no'],
            'twm_realstck' => ['fact_cd', 'prt_nbr_cd', 'lotno'],
            'twm_stckadjsthstry' => ['fact_cd', 'adjst_no'],
            'twm_stcktaking' => ['fact_cd', 'taking_ymd', 'prt_nbr_cd', 'lotno'],
        ];
        return $pk[$tbl];
    }

    public function query_condition($param = array()){
        $cond = [];
        if (isset($param['where']) && !empty($param['where'])) {
            $cond['where'] = '';
            foreach ($param['where'] as $key => $value){
                $cond['where'] .= " {$key} = '{$value}' AND";
            }
            $cond['where'] = substr($cond['where'], 0, -3);
        }

        if (isset($param['like']) && !empty($param['like'])) {
            $cond['like'] = '';
            foreach ($param['like'] as $key => $value){
                $cond['like'] .= " {$key} like '".($value[1] == 'right' ? '' : '%')."{$value[0]}".($value[1] == 'left' ? '' : '%')."' AND";
            }
            $cond['like'] = substr($cond['like'], 0, -3);
        }

        return $cond;
    }

    public function  join_table($main_tbl, $join_tbl_arr = []){
        $sel_qry = "$main_tbl.* ";

        // 조인 테이블별 조인 되는 칼럼 등록해서 조인시에 쿼리 추가하고, update, insert시에는 칼럼 제거

    }

    public function join_prtnbrinfo($tbl){
        return array(
                    'select' => "tbm_prtnbrinfo.fact_cd, tbm_prtnbrinfo.prt_nbr_nm, tbm_prtnbrinfo.prt_nbr_cd, tbm_prtnbrinfo.spec, {$tbl}.*",
                    'tables' => array(
                            'tbm_prtnbrinfo' => "{$tbl}.prt_nbr_cd = tbm_prtnbrinfo.prt_nbr_cd"
                        )
                    );
    }

//    public function join_whs($tbl){
//        return array(
//            'select' => " {$tbl}.*",
//            'tables' => array(
//                'tbm_whslocinfo' => "{$tbl}.prt_nbr_cd = tbm_whslocinfo.prt_nbr_cd"
//            )
//        );
//    }

    public function rm_prtnbrinfo($param){
        foreach ($param as $key => $value) {
            unset($param[$key]['prt_nbr_nm']);
            unset($param[$key]['spec']);
        }
        return $param;
    }

    public function convert_boolean($param){
        if($param == 'Y') return true;
        else if($param == 'N') return false;
        else if($param) return 'Y';
        else if(!$param) return 'N';
    }
}
