<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Insert extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	function role(){
        $result = (object)[];
        $result->result = false;

        $data = $this->input->post(null, true);
        // $result->data = $data;
        $result->changes = $data['w2ui']['changes'];
        $param = array(
            "role_id" => $data['w2ui']['changes']['role_id'],
            "role_nm" => $data['w2ui']['changes']['role_nm'],
            "role_dtl" => $data['w2ui']['changes']['role_dtl'],
            "use_yn" => isset($data['w2ui']['changes']['use_yn']) ? "Y" : "N",
        );
        $result->param = $param;
        try {
            $this->mms_m->tbInsert($param,"tbc_roleinfo");
            $result->qry = $this->db->last_query();
            $result->msg = "저장되었습니다.";
            $result->result = true;
        } catch (\Throwable $th) {
            //throw $th;
            $result->msg = "저장되지 않았습니다.";
            $result->th = $th;
            $result->error = $this->db->error();
            $result->qry = $this->db->last_query();
            $result->result = false;
        }

        // try {
		// 	$data['role_info'] = $this->mms_m->tbWhereObj(array(), 'tbc_roleinfo2', 'role_id ASC');
		// } catch (\Throwable $th) {
		// 	print_r($th);
		// 	echo '<br>';
		// 	print_r($this->db->error());
		// 	echo '<br>';
		// 	echo $this->db->last_query();
		// }
        
        // if($this->mms_m->tbInsert($param,"tbc_roleinfo")){
        //     $result->msg = "저장되었습니다.";
        // }else{
        //     $result->msg = "저장되지 않았습니다.";
        // }

		echo json_encode($result);
    }
}
