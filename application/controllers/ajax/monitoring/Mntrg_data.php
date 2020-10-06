<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mntrg_data extends CI_Controller
{
    public function get($path = ''){

        if($path == 'mach_rslt_mntrg'){
            $this->_get_mach_rslt_mntrg();
        }elseif($path == 'get_fact_cd'){
            $this->_get_get_fact_cd();
        }elseif($path == 'state_check'){
            $this->_get_state_check();
        }

    }

    private function _get_get_fact_cd(){
        $qry = "select * from tbc_codeinfo where up_cd = 'fact_cd';";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_mach_rslt_mntrg(){
        $param = $this->input->post(null, true);
        $pageNum1 = $param['pageNum'];
        $pageNum2 = number_format($param['pageNum']) + 6;

//        $qry = "SELECT
//                    fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) AS wrkctr_nm,
//                    MAX(fnc_user_nm(a.fact_cd, a.main_wrkr)) AS main_wrkr,
//                    MAX(a.wrkr_qty) AS wrkr_qty,
//                    MAX(b.ordr_qty) AS ordr_qty,
//                    MAX(a.prd_qty_meas) AS prd_qty_meas,
//                    MAX(a.prd_qty_meas / b.ordr_qty * 100) AS achievement_rate,
//                    MAX(a.last_dt) AS last_dt,
//                    @wrk_ordr_no := a.wrk_ordr_no,
//                    a.wrk_ordr_no,
//                    MAX(e.prt_nbr_dsp_nm) AS prt_nbr_dsp_nm,
//                    IFNULL((SELECT SUM(TRUNCATE(TIMESTAMPDIFF(SECOND ,str_dt,IFNULL(end_dt,NOW())),1)) FROM tpb_runstophstry WHERE wrk_ordr_no = @wrk_ordr_no AND staus = 'R' GROUP BY wrk_ordr_no),0) AS op_time,
//                    (SELECT cd_nm FROM tbc_codeinfo WHERE up_cd = 'staus' AND cd = MAX(a.staus)) AS staus,
//                    IFNULL(MAX(a.stop_cd),0) AS stop_cd,
//                    MAX(d.pln_yn) AS pln_yn
//                FROM tpb_curwrkctrstaus a
//                    LEFT JOIN tpb_dalywrkordrpln b ON(a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd AND a.wrk_ordr_no = b.wrk_ordr_no AND a.prt_nbr_cd = b.ordr_prt_nbr_no)
//                    LEFT JOIN tpb_runstophstry c ON(a.fact_cd = c.fact_cd AND a.wrkctr_cd = c.wrkctr_cd AND a.wrk_ordr_no = c.wrk_ordr_no AND a.prt_nbr_cd = c.prt_nbr_no)
//                    LEFT JOIN tbp_stopiteminfo d ON(a.fact_cd = d.fact_cd AND a.stop_cd = d.stop_cd)
//                    LEFT JOIN tbm_prtnbrinfo e ON(a.fact_cd = e.fact_cd AND a.prt_nbr_cd = e.prt_nbr_cd)
//                WHERE a.fact_cd = '{$param['fact_cd']}'
//                AND c.rec_ymd = DATE_FORMAT(NOW(),'%Y-%m-%d')
//                GROUP BY a.wrk_ordr_no , wrkctr_nm
//                LIMIT {$pageNum1}, {$pageNum2};";
        $qry = "SELECT 
                   fnc_wrkctr_nm(a.fact_cd,a.wrkctr_cd) AS wrkctr_nm,
                   fnc_user_nm(b.fact_cd, b.main_wrkr) AS main_wrkr,
                   b.wrkr_qty AS wrkr_qty,
                   c.ordr_qty AS ordr_qty,
                   b.prd_qty_meas AS prd_qty_meas,
                   (b.prd_qty_meas / c.ordr_qty * 100) AS achievement_rate,
                   b.last_dt AS last_dt,
                   b.wrk_ordr_no,
                   @wrk_ordr_no := b.wrk_ordr_no,
                   @fact_cd := b.fact_cd,
                   @wrkctr_cd := a.wrkctr_cd,
                   @prt_nbr_cd := b.prt_nbr_cd,
                   f.prt_nbr_dsp_nm AS prt_nbr_dsp_nm,
                   IFNULL(SUM(h.err_qty),0) AS err_qty,
                   -- IFNULL(SUM(g.mach_cnt * g.cavity),0) AS mach_cnt,
                   IFNULL((SELECT SUM(mach_cnt * cavity) FROM tpb_machrslthstry WHERE fact_cd = @fact_cd AND wrk_ordr_no = @wrk_ordr_no AND crt_gbn = '10'),0) AS mach_cnt,
                   IFNULL((SELECT TRUNCATE(TIMESTAMPDIFF(SECOND ,MIN(str_dt),NOW()),1) FROM tpb_runstophstry WHERE fact_cd = @fact_cd AND wrk_ordr_no = @wrk_ordr_no),0) AS op_time,
                   (SELECT cd_nm FROM tbc_codeinfo WHERE up_cd = 'staus' AND cd = b.staus) AS staus,
                   IFNULL(b.stop_cd,'') AS stop_cd,
                   IFNULL(e.pln_yn,'N') AS pln_yn,
                   b.staus
                FROM tbp_wrkctrmachinfo a
                   LEFT JOIN tpb_curwrkctrstaus b ON(a.fact_cd = b.fact_cd AND a.wrkctr_cd = b.wrkctr_cd)
                   LEFT JOIN tpb_dalywrkordrpln c ON(b.fact_cd = c.fact_cd AND b.wrkctr_cd = c.wrkctr_cd AND b.wrk_ordr_no = c.wrk_ordr_no AND b.prt_nbr_cd = c.ordr_prt_nbr_no)
                   LEFT JOIN tpb_runstophstry d ON(b.fact_cd = d.fact_cd AND b.wrkctr_cd = d.wrkctr_cd AND b.wrk_ordr_no = d.wrk_ordr_no AND b.prt_nbr_cd = d.prt_nbr_no AND d.rec_ymd = fnc_get_recymd('{$param['fact_cd']}',NOW()))
                   LEFT JOIN tbp_stopiteminfo e ON(b.fact_cd = e.fact_cd AND b.stop_cd = e.stop_cd)
                   LEFT JOIN tbm_prtnbrinfo f ON(b.fact_cd = f.fact_cd AND b.prt_nbr_cd = f.prt_nbr_cd)
                  -- LEFT JOIN tpb_machrslthstry g ON(b.fact_cd = g.fact_cd AND b.wrk_ordr_no = g.wrk_ordr_no AND g.crt_gbn = '10')
                   LEFT JOIN tpb_wrkctrerrrst h ON(b.fact_cd = h.fact_cd AND b.wrk_ordr_no = h.wrk_ordr_no AND b.wrkctr_cd = h.wrkctr_cd AND b.prt_nbr_cd = h.prt_nbr_cd)
                WHERE a.fact_cd = '{$param['fact_cd']}'
                #AND fnc_get_recymd('{$param['fact_cd']}', IFNULL(b.str_tm,now())) = fnc_get_recymd('{$param['fact_cd']}', now())
                GROUP BY a.wrkctr_cd,b.wrk_ordr_no
                LIMIT {$pageNum1}, {$pageNum2};";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_state_check(){
        $param = $this->input->post(null, true);
        $qry = "SELECT TIMESTAMPDIFF(SECOND,rslt_dt,NOW()) AS cnt FROM tpb_machrslthstry WHERE fact_cd = '{$param['fact_cd']}' ORDER BY rslt_dt DESC LIMIT 1;";
        exit(json_encode($this->mes_m->query($qry)));
    }
}