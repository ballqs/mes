<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inpct_mgt extends CI_Controller
{
    public function get($path = ''){

        $tb = $this->_get_table($path)[0];
        $param = $this->input->get(null, true)['param'];
        $data_list = $this->_get_data_ref($param);

        if($path == 'inpct_mgt'){
            $this->_get_inpct_mgt($data_list);
        }else if($path == 'inpct_mgt_grid2'){
            $this->_get_inpct_mgt_grid2($param);
        }
        else if($path =='inspct_head'){
            $this->_get_inspct_head($param);
        }

    }

    private function _get_inspct_head($param){




    }
    private function _get_inpct_mgt_grid2($param){
        $param = $this->input->get(null, true);

        $form = $param['form']['lastGetParam']['param']['where'];

        $data_list = $param['param']['where'];

        $qry ="SELECT a.fact_cd,
                a.prt_nbr_cd,
                a.inspct_cd,
                a.daynight_gbn,
                a.inspct_act_gbn,
                a.inspct_head_no,
                a.inspct_no,
                a.inspct_seq,
                a.inspct_ymd,
                a.up_limit_value,
                a.mid_value,
                a.low_limit_value,
                a.measur_value,
                a.judg_value,
                a.tot_juge_value,
                a.wrk_order_no,
                a.inspct_ymd,
                a.remark,
                a.inst_id,
                a.inst_dt,
                a.updt_id,
                a.updt_dt,
                d.inspct_stdrd_type,
		        fnc_prt_nbr_nm(a.fact_cd,a.prt_nbr_cd) AS prt_nbr_nm, 
		        fnc_inspct_nm(a.fact_cd, a.inspct_cd) AS inspct_nm,
		        (SELECT COUNT(*) FROM tbq_prtnbrinspct b WHERE b.prt_nbr_cd = a.prt_nbr_cd) AS count_inspct
                FROM tqa_inspctinfo a
                LEFT JOIN tbq_inspctiteminfo d ON a.inspct_cd = d.inspct_cd
                WHERE a.fact_cd LIKE CONCAT('%','{$data_list['fact_cd']}','%')
                AND a.prt_nbr_cd LIKE CONCAT('%','{$data_list['ordr_prt_nbr_no']}','%')
                AND a.daynight_gbn LIKE CONCAT('%','{$data_list['daynight_gbn']}','%')
                AND a.wrk_order_no LIKE CONCAT('%','{$data_list['wrk_order_no']}','%')
                AND a.inspct_ymd BETWEEN '{$form['date1']}' AND '{$form['date2']}'
                ORDER BY a.inspct_no;
               ";


        exit(json_encode($this->mes_m->query($qry)));
    }
    private function _get_inpct_mgt($data_list){
        exit(json_encode($data_list));

        $qry = "SELECT
                    a.fact_cd,
                    a.wrk_ordr_no AS wrk_order_no,
                    a.op_cd,
                    fnc_op_nm(a.fact_cd, a.op_cd) AS op_nm,
                    a.wrkctr_cd,
                    fnc_wrkctr_nm(a.fact_cd, a.wrkctr_cd) AS wrkctr_nm,
                    a.daynight_gbn,
                    a.wrk_ordr_dt AS wrk_order_dt,
                    a.ordr_prt_nbr_no,
                    b.prt_nbr_nm as ordr_prt_nbr_no_nm,
                    b.spec as ordr_prt_nbr_no_spec,
                    a.ordr_qty,
                    IFNULL(a.prd_ordr_unit,b.base_unit) as prd_ordr_unit,
                    (SELECT cd_nm FROM tbc_codeinfo WHERE up_cd = 'wrk_ordr_status' AND cd = a.wrk_ordr_status) as wrk_ordr_status,
                    a.wrk_ordr_type,
                    @var_fact_cd := a.fact_cd,
                    @var_wrk_ordr_no := a.wrk_ordr_no,
                    IF(a.wrk_ordr_status = '10', 0 ,(
                        SELECT
                            TIMESTAMPDIFF(
                                MINUTE,
                                MIN(str_dt),
                                IFNULL(
                                    MAX(end_dt),
                                    NOW()
                                )
                            )
                        FROM tpb_runstophstry
                        WHERE wrk_ordr_no = @var_wrk_ordr_no
                        AND fact_cd = @var_fact_cd
                    )) AS wrk_tm_min,
                    a.remark,
                    IF(a.updt_id IS NULL, a.inst_id, a.updt_id) AS updt_id,
                    IF(a.updt_dt IS NULL, a.inst_dt, a.updt_dt) AS updt_dt
                FROM tpb_dalywrkordrpln a
                    LEFT JOIN tbm_prtnbrinfo b ON(a.fact_cd = b.fact_cd AND a.ordr_prt_nbr_no = b.prt_nbr_cd)
                WHERE a.fact_cd = '{$data_list['fact_cd']}'
                AND a.wrkctr_cd LIKE CONCAT('%','{$data_list['wrkctr_cd']}','%')
                AND a.ordr_prt_nbr_no LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')
                AND b.prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%')
                AND a.daynight_gbn LIKE CONCAT('%','{$data_list['daynight_gbn']}','%')
                ORDER BY a.wrk_ordr_no;";
        exit(json_encode($this->mes_m->query($qry)));

        exit(json_encode($this->mes_m->query($qry)));
    }



    public function save($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];

        if ($path == 'inpct_mgt') {
                $this -> _save_inpct_mgt($param);
        }


        $data = $this->mes_m->save($tb, $param);

        echo json_encode($data);
    }

    private function _save_inpct_mgt($param){


        $sess = $this->session->userdata('emp_id');
        $result = $this->mes_m->get_response_data_form();


        $this->db->trans_begin();
        $j= 0;


        for($i=0; $i < count($param); $i++){


            $count = $param[$i]['max_count_inspct'];

            if($param[$i]['cu'] === 'c'){
                $inscpt_head_check = $j%$count;
            }

            $remark = isset($param[$i]['remark']) ? $param[$i]['remark'] : '';

            if($param[$i]['cu'] === 'c'){
                $qry = "CALL usp_inspctdmgt_i1('{$param[$i]['fact_cd']}',{$param[$i]['inspct_seq']},'{$param[$i]['prt_nbr_cd']}','{$param[$i]['inspct_cd']}','{$param[$i]['inspct_ymd']}','{$param[$i]['daynight_gbn']}','{$param[$i]['inspct_act_gbn']}',{$param[$i]['up_limit_value']},{$param[$i]['mid_value']},{$param[$i]['low_limit_value']},{$param[$i]['measur_value']},'{$param[$i]['judg_value']}','{$param[$i]['tot_juge_value']}','{$param[$i]['wrk_order_no']}','{$remark}','{$sess}',{$inscpt_head_check},@result, @msg);";

                $result->data[$i] = $this->mes_m->GetMultipleQueryResult($qry)[0];
            }elseif ($param[$i]['cu'] === 'u'){
                $qry = "CALL usp_inspctdmgt_u1('{$param[$i]['fact_cd']}','{$param[$i]['inspct_no']}',{$param[$i]['inspct_seq']},'{$param[$i]['prt_nbr_cd']}','{$param[$i]['inspct_cd']}','{$param[$i]['inspct_ymd']}','{$param[$i]['daynight_gbn']}','{$param[$i]['inspct_act_gbn']}',{$param[$i]['up_limit_value']},{$param[$i]['mid_value']},{$param[$i]['low_limit_value']},{$param[$i]['measur_value']},'{$param[$i]['judg_value']}','{$param[$i]['tot_juge_value']}','{$param[$i]['wrk_order_no']}','{$remark}','{$sess}',@result, @msg);";


                $result->data[$i] = $this->mes_m->GetMultipleQueryResult($qry)[0];
            }

            $result = $this->mes_m->trans_sp_result($result->data, $result);

            if ($this->db->trans_status() === FALSE || $result->result == false){
                $result->msg = '저장되지 않았습니다.';
                $result->error = $this->db->error();
                $result->qry = $this->db->last_query();
                $this->db->trans_rollback();
            }
            $j++;
            if($j==$count){
                $j = 0;
            }
        }
        if ($this->db->trans_status() === FALSE ){
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


    public function delete($path = ''){

        $param = $this->input->post(null, true)['param'];
        $tb = $this->_get_table($path);
        $result = $this->mes_m->delete($tb, $param);
        echo json_encode($result);
    }

    private function _get_data_ref($param){

        $inspct_act_gbn = isset($param['where']['inspct_act_gbn']) ? $param['where']['inspct_act_gbn'] : '';
        $inspct_cd = isset($param['like']['inspct_cd']) ? $param['like']['inspct_cd'][0] : '';
        $prt_nbr_cd = isset($param['like']['prt_nbr_cd']) ? $param['like']['prt_nbr_cd'][0] : '';
        $fact_cd = isset($param['where']['fact_cd']) ? $param['where']['fact_cd'] : '';
        $date1 = isset($param['where']['date1']) ? $param['where']['date1'] : '';
        $date2 = isset($param['where']['date2']) ? $param['where']['date2'] : '';
        $day_night = isset($param['where']['day_night']) ? $param['where']['day_night'] : '';

        $data_list = [
            "fact_cd" => $fact_cd,
            "inspct_cd" => $inspct_cd,
            "prt_nbr_cd" => $prt_nbr_cd,
            "day_night" => $day_night,
            "inspct_act_gbn" => $inspct_act_gbn,

            "date1" => $date1,
            "date2" => $date2,

        ];

        return $data_list;
    }

    private function _get_table($path = ''){
        $tables = [
            'inpct_mgt' => ['tqa_inspctinfo'],
        ];
        return $tables[$path];
    }
}