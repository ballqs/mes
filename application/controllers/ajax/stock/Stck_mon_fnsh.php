<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Stck_mon_fnsh extends CI_Controller
{
    public function get($path = ''){

        if($path !== 'stck_mon_fnsh_mgt'){
            $param = $this->input->post(null, true)['param'];
        }
        $sess = $this->session->userdata('emp_id');


        if($path == 'stck_mon_fnsh_mgt'){
            $this->_get_smfmFormData();
        }elseif($path =='B0020'){
            $this->_get_b0020($param,$sess);
        }elseif($path =='B0021'){
            $this->_get_b0021($param);
        }

    }
    private function _get_smfmFormData(){
        $data = [];
        $qry1 = "SELECT cd,cd_nm FROM tbc_codeinfo WHERE up_cd = 'fact_cd';";
        $data[0] = $this->mes_m->query($qry1)->data[0];
        $qry2 = "SELECT cd_set1 FROM tbc_codeinfo WHERE up_cd = 'MES' AND cd = 'monthstckfnsh';";
        $data[1] = $this->mes_m->query($qry2)->data[0];
        exit(json_encode($data));
    }

    private function _get_b0020($param,$sess){
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        $qry = "CALL usp_monthstckfnsh_i1('{$param['fact_cd']}','{$param['stockdeadline']}','{$sess}',@result,@msg);";
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result = $this->mes_m->trans_sp_result($result->data, $result);
        if ($this->db->trans_status() === FALSE || $result->result == false){
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
        }
        //exit(json_encode($qry));
        exit(json_encode($result));
    }

    private function _get_b0021($param){
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        $qry = "CALL usp_monthstckfnsh_d1('{$param['fact_cd']}',@result,@msg);";
        $result->data = $this->mes_m->GetMultipleQueryResult($qry);
        $result = $this->mes_m->trans_sp_result($result->data, $result);
        if ($this->db->trans_status() === FALSE || $result->result == false){
            $this->db->trans_rollback();
        }else{
            $this->db->trans_commit();
        }
        exit(json_encode($result));
    }
}