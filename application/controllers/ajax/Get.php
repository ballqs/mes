<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Get extends CI_Controller
{
    private $_get;
    private $_w2ui_select_str = "@recid:=@recid+1 as recid, @recid:=@recid+1 as id, t.cd as text, t.*, if(t.use_yn = 'Y', TRUE, FALSE) use_yn";
    private function _w2ui_select_str($tbl){
        return "@recid:=@recid+1 as recid, cd as id, $tbl.cd_nm as text, $tbl.*, if($tbl.use_yn = 'Y', TRUE, FALSE) use_yn";
    }

    private function _w2ui_tbl_nm($tbl){
        return $tbl.', (SELECT @recid:=0) r';
    }

	function __construct()
	{
		parent::__construct();

		$this->_get = $this->input->get(null, true);
		unset($this->_get['cnct_url']);
		unset($this->_get['cnct_btn']);
	}

    public function name(){
        $id = $this->session->userdata('emp_id');
        $name = $this->mes_m->get('tbc_userinfo', array('where' => array('emp_id' => $id)));
        echo $name->data[0]->emp_nm;
    }

    public function btns(){
        $path = $this->input->get('path');
        echo json_encode($this->mes_m->btn_list($path));
    }

    public function popup_btns(){
        $popup_id = $this->input->get('popup_id');
        echo json_encode($this->mes_m->popup_btn_list($popup_id));
    }

	public function menu_nav()
	{
		$emp_id = $this->session->userdata('emp_id');
		exit(json_encode($this->mes_m->get_menu_nav($emp_id)));
	}

	public function menu_list(){
		$data = $this->mes_m->get_menu_list();
		echo json_encode($data);
	}

	public function menu_test(){
        echo json_encode($this->db->select('*')->get("tbc_pgminfo")->result());
    }

	public function pgm_info($id = '')
	{
		$data = $this->mms_m->tbWhereObj(array('pgm_id' => $id), 'tbc_pgminfo', 'pgm_ordr ASC');
		echo json_encode($data);
	}

	public function up_pgm_id_list($pgm_id = '')
	{
		if($pgm_id != '') $where = array('pgm_id !=' => $pgm_id);
		else $where = array();
		$data = $this->mms_m->tbWhereObj($where, 'tbc_pgminfo', 'pgm_ordr ASC');
		echo json_encode($data);
	}

	public function role_pgm_btn()
	{
		$param = $this->_get;
//         SELECT * FROM tbc_rolepgmbtn WHERE pgm_id = 'P1050' AND role_id = 'R0001';
		$data = $this->db->get_where('tbc_rolepgmbtn', $param)->result();
		echo json_encode($data);
	}

	public function button($id = '')
	{
		$data = (object)[];

		$param = $this->_get;
		if($id != 'undefined' && $id) $param['btn_id'] = $id;
		$data->ddd = $id;
		$data->param = $param;
		$data->data = $this->db->get_where('tbc_btninfo', $param)->result();
		$data->qry = $this->db->last_query();
		echo json_encode($data);
	}

	public function user($fact_id = '', $emp_id = '')
	{
		$tb = 'tbc_userinfo';
		$data = $this->input->post(null, true);
		echo json_encode($data);
// 	  print_r($data);
		exit;
		if($data->cmd == 'get-records')
		{
			$result->status = 'error';
		}
		else
		{
			$result->status = 'success';
		}
// 	  print_r($data);
// 	  $result = (object)[];
// 	  $result->result = true;
// 	  $result->status = 'success';
		$param = array();
// 	  $data = (object) [];
// 	  $param = array();
// 	  if($fact_id != 'undefined' && $fact_id) $param[] = array('fact_id' => $fact_id);
// 	  if($emp_id != 'undefined' && $emp_id) $param[] = array('fact_id' => $emp_id);
// 	  $data = $this->mms_m->tbWhereObj(array(), 'tbc_userinfo', 'emp_id ASC');
// 	  $result->total = $this->mms_m->total($param,$tb);
		$result->records = $this->mms_m->tbWhereObj($param, $tb, 'emp_id ASC');
// 	  $data = $this->mms_m->tbWhereObj($param, 'tbc_userinfo', 'pgm_ordr ASC');
// 	  echo json_encode($data);

		/* 성공시 */
// 	  {
// 	    "status"  : "success",
// 	    "total"   : 36,
// 	    "records" : [
// 	    { "recid": 1, "field-1": "value-1", ... "field-N": "value-N" },
// 	    ...
// 	    { "recid": N, "field-1": "value-1", ... "field-N": "value-N" }
// 	    ]
// 	  }
		/* 실패시 */
// 	  {
// 	    "status"  : "error",
// 	    "message" : "Error Message"
// 	  }
		echo json_encode($data);
	}

	public function code(){
    $tb = 'tbc_codeinfo';
		$result = (object)[];
		$result->result = true;
		$result->data = array();

		$param = $this->_get;
//        $data = $this->db->select($this->_w2ui_select_str($tb), false)->like($param)->get($this->_w2ui_tbl_nm($tb))->result();
        if ($param['up_cd'] == 'account_type' && count($param) > 1) {
            $arr = [];
            foreach ($param as $param_key => $param_value) {
                if ($param_key == 'cd_set1') {
                    $arr[] = 'cd_set1';
                    foreach ($param[$param_key] as $value) {
                        $this->db->or_where($param_key, $value);
                    }
                }
            }
//            exit(json_encode($arr));
        }
        $where['up_cd'] = $param['up_cd'];

        // TODO : 추후 구성할 것.
        // code에 추가적인 조건을 추가하기위한 for문
        foreach ($param as $key => $value) {
            if ($key != 'up_cd') {
                $where[$key] = $value;
            }
        }// code에 추가적인 조건을 추가하기위한 for문 끝


//		$result->data = $this->db->select($this->_w2ui_select_str($tb), false)->order_by('cd_ordr ASC')->get_where($this->_w2ui_tbl_nm($tb), $param)->result();
        //$result->data = $this->db->select($this->_w2ui_select_str($tb), false)->order_by('cd_ordr ASC')->get_where($this->_w2ui_tbl_nm($tb), $where)->result();
        $this->db->select($tb.".*");
        $this->db->from($tb);
        $this->db->where("up_cd",$where['up_cd']);
        $this->db->where("use_yn", 'Y');
        if(isset($where['cd'])) {
            $this->db->where_in("cd",$where['cd']);
        }
        $result->data = $this->db->get()->result();
        $result->error = $this->db->error();
        $result->qry = $this->db->last_query();
		echo json_encode($result);
	}

    public function ex_code(){
        $result = (object)[];
        $result->result = true;
        $result->data = array();

        $tb = $this->_get['table'];

        $where = [];
        if(isset($this->_get['where'])) $where = $this->_get['where'];
//        $data = $this->db->select($this->_w2ui_select_str($tb), false)->like($param)->get($this->_w2ui_tbl_nm($tb))->result();
//        $result->data = $this->db->select($this->_w2ui_select_str($tb), false)->order_by('cd_ordr ASC')->get_where($this->_w2ui_tbl_nm($tb), $param)->result();
        $result->data = $this->db->where($where)->get($tb)->result();
        $result->qry = $this->db->last_query();
        echo json_encode($result);
    }

	public function cmn_code()
	{
		$result = (object)[];
		$result->result = true;
		$result->data = array();

		$qry = "SELECT ani.*, fnc.level as depth
				  FROM
					 (SELECT fnc_cmn_code() AS cd, @level AS LEVEL, tbc_codeinfo.cd_ordr ,@ROWNUM:=@ROWNUM+1 AS SEQ
						FROM (SELECT @start_with:='MES', @cd:=@start_with, @level:=0) vars
						  JOIN tbc_codeinfo 
						  JOIN (SELECT @ROWNUM:=0) T2
						 WHERE @cd IS NOT NULL) fnc
				  JOIN  tbc_codeinfo ani ON fnc.cd = ani.cd
				  ORDER BY fnc.SEQ";

		try
		{
//			$result->data = $this->db->get($tb)->result();
			$result->data = $this->db->query($qry)->result();
		}
		catch(Exception $e)
		{
			$result->result = false;
			$result->qry = $this->db->last_query();
			$result->err = $e;
		}

		echo json_encode($result);
	}

	public function pgm_btn()
	{
		$tb = 'tbc_pgmbtninfo';
		$param = $this->_get;

		$data = $this->db->order_by('btn_ordr ASC')->get_where($tb, $param)->result();
		echo json_encode($data);
// 	  echo json_encode($param);
	}

	public function pgm_using()
	{
		$param = $this->_get;
		$data = $this->db->select('pgm_id')->group_by('pgm_id')->get_where('tbc_rolepgmbtn', $param)->result();
		echo json_encode($data);
	}

	public function user_role()
	{
		$param = $this->_get;
		$data = $this->db->get_where('tbc_userole', $param)->result();
		echo json_encode($data);
	}

	public function opinfo(){
        $tb = 'tbp_opinfo';
		$param = $this->_get;
//		$data = $this->db->like($param)->get('tbp_opinfo')->result();
        $data = $this->db->select($this->_w2ui_select_str($tb), false)->like($param)->get($this->_w2ui_tbl_nm($tb))->result();
		echo json_encode($data);
	}

	public function part_nbr(){
        $tb = 'tbm_prtnbrinfo';
		$param = $this->_get;
//        $data = $this->db->select($this->_w2ui_select_str, false)->like($param)->get($this->_w2ui_tbl_nm($tb))->result();

        $data = $this->db->select($this->_w2ui_select_str($tb), false)->like($param)->get($this->_w2ui_tbl_nm($tb))->result();
//		$data = $this->db->like($param)->get('tbm_prtnbrinfo')->result();
		echo json_encode($data);
	}

    public function pop_wrker_cd(){
        $result = $this->mes_m->get_response_data_form();
        $tb = 'tbc_userinfo';
        $param = $this->_get['param'];
        $emp_id = isset($param['like']['emp_id']) ? $param['like']['emp_id'][0] : '';
        $emp_nm = isset($param['like']['emp_nm']) ? $param['like']['emp_nm'][0] : '';
        $this->db->select($tb.'.*');
        $this->db->from($tb);
        $this->db->where($tb.'.fact_cd', $param['where']['fact_cd']);
        $this->db->like($tb.'.emp_id',$emp_id, 'both');
        $this->db->like($tb.'.emp_nm',$emp_nm, 'both');
        $this->db->where($tb.'.emp_id != ', 'admin');
        $this->db->where($tb.'.use_yn = ', 'Y');
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

    public function lotno_mgt(){
        $param = $this->_get;
        $qry = "SELECT b.cd_set1, b.cd_set2, b.cd_fctn_dtl
                FROM tbm_prtnbrinfo a
                JOIN tbc_codeinfo b ON a.account_type = b.cd AND b.up_cd = 'lot_mgt_yn'
                WHERE a.fact_cd = '{$param['fact_cd']}'
                AND a.prt_nbr_cd = '{$param['prt_nbr_cd']}'
                ;";
        exit(json_encode($this->mes_m->query($qry)));
    }
}
