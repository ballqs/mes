<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Save extends CI_Controller {

	private $_btn_path = '/home/www/mes/uploads/img/buttons/';

	function __construct(){
		parent::__construct();

//		$cnct = $this->input->post(null, true)['cnct'];
//		$this->_cnct($cnct['url'], $cnct['btn_id']);


		// $this->load->library('session');
		// $db_name = $this->session->userdata('db_name') ? $this->session->userdata('db_name') : 'default';
		// $this->load->database($db_name);
	}
	
	private function _inst_id($arr = array()){
	  $arr['inst_id'] = $this->session->userdata('emp_id');
	  $arr['updt_id'] = $this->session->userdata('emp_id');
	  return $arr;
	}
	
	private function _updt_id($arr = array()){
	  $arr['updt_id'] = $this->session->userdata('emp_id');
	  return $arr;
	}

//	private function _cnct($url, $btn_id){
//		$pgm_id = $this->db->select('pgm_id')->get_where('tbc_pgminfo', array('url' => substr($url, 1)))->row()->pgm_id;
//		$this->db->query("CALL usp_usercnct_i1('{$this->session->userdata('emp_id')}', '$pgm_id', '$btn_id')");
//	}
	
	public function pgm_info()
	{
    $param = $this->input->post(null, true);
		$result = (object) array();
		if (substr($param['up_pgm_id'], 0, 1) == 'P') {
			$result->result = false;
			$result->msg = '프로그램을 상위로 둘 수 없습니다.';
		}

    $use_yn = (isset($param['use_yn']) ? 'Y' : 'N');
    $parameter = array(
      "pgm_id" => $param['pgm_id'],
      "pgm_nm" => $param['pgm_nm'],
      "pgm_gbm" => $param['pgm_gbm'],
      "pgm_ordr" => $param['pgm_ordr'],
      "remark" => $param['remark'],
      "prc_gbm" => $param['prc_gbm'],
      "up_pgm_id" => $param['up_pgm_id'],
      "url" => $param['url'],
      'service_area' => $param['service_area'],
      "use_yn" => $use_yn
    );
    $result->result = $this->mms_m->save($parameter, 'tbc_pgminfo');
		if ($result->result) $result->msg = '저장되었습니다.';
		else $result->msg = '저장되지 않았습니다.';

		echo json_encode($result);
  }

	public function button(){

	  $tb = 'tbc_btninfo';
		$data = $this->input->post(null, true);
		$result = (object)[];
		$result->result = false;

    $this->db->trans_begin();
    
    $param = array(
      'btn_nm' => $data['btn_nm'],
      'btn_img' => $data['btn_id'].'.png',
      'btn_fctn_dtl' => $data['btn_fctn_dtl'],
      'use_yn' => ((isset($data['use_yn']) && $data['use_yn'] == 'on') ? 'Y' : 'N'),
    );
    
    // DB insert or update
    if ($data['cu'] == 'c') { // insert
      $param['btn_id'] = $data['btn_id'];
      $param = $this->_inst_id($param);
      $this->db->insert($tb, $param);
    }else if ($data['cu'] == 'u') { // update
      $where = array('btn_id' => $data['btn_id']);
      $param = $this->_updt_id($param);
      $this->db->where($where)->update($tb, $param);
    }
    
    if ($this->db->trans_status() === FALSE){ // db error 일 경우
      $result->msg = '문제가 발생하였습니다.';
      $result->error = $this->db->error();
      $result->qry = $this->db->last_query();
      $this->db->trans_rollback();
    }else if(($data['cu'] == 'u' && $_FILES['btn_img']['name'] != '') || $data['cu'] == 'c'){  // db ok && ((cu=='u' file 있는 경우) || cu=='c')-> 파일 업로드
      
      // 확장자 제한
      $allowed_ext = array('JPG','JPEG','PNG','GIF');
      $ext = strtoupper(explode('.', $_FILES['btn_img']['name'])[1]);
      
      if( !in_array($ext, $allowed_ext) ) {	// 확장자 체크
        $result->msg = "허용되지 않는 확장자입니다.";
      }else{	// 확장자 통과시
        $name = $data['btn_id'].'.png';
        $result->point = $this->_btn_path.$name;
        
        if(file_exists($this->_btn_path.$name)) { // 업데이트시 기존 파일 삭제
          chmod($this->_btn_path.$name,0755);
          unlink($this->_btn_path.$name);
        }
        
        if (move_uploaded_file( $_FILES['btn_img']['tmp_name'], $this->_btn_path.$name)) {	// 업로드 성공시
          $result->result = true;
          $result->msg = '저장되었습니다.';
        }else{	// 업로드 실패시
		  $result->msg = '업로드 실패하였습니다.';
		  $result->file = $_FILES;
		  $result->pathname = $this->_btn_path.$name;

		  
        }
      }
      
      if($result->result){ // 파일 업로드 성공시 commit
        $result->msg = '저장되었습니다.';
        $this->db->trans_commit();
      }else{ // 파일 업로드 실패시 rollback
        $result->msg = '업로드 실패하였습니다.';
        $this->db->trans_rollback();
      }
    }else{
      $result->result = true;
      $result->msg = '저장되었습니다.';
      $this->db->trans_commit();
    }
		
		$data['btn_path'] = $this->_btn_path;
		$data['data'] = $data;
		$data['result_use_yn'] = ((isset($data['use_yn']) && $data['use_yn'] == 'on') ? 'Y' : 'N');
		echo json_encode($result);
	}

	public function role(){
		$data = json_decode($this->input->post(null, true)['data']);
//		$logs = $this->input->post(null, true)['logs'];
//		$this->_cnct($logs['url'], $logs['btn_id']);
		$result = (object) [];
		$result->result = false;
		$result->msg = '저장되지 않았습니다.';
		$result->param = array();
		$tb = 'tbc_roleinfo';

		$this->db->trans_begin();
		$element = (object)[];
		$comm = '';
		$chk_pk = '';
		foreach ($data as $key => $value) {
			if(isset($value->w2ui->changes)){
				$param = array();
				if (isset($value->w2ui->changes->role_nm)) { $param['role_nm'] = $value->w2ui->changes->role_nm; }
				if (isset($value->w2ui->changes->role_dtl)) { $param['role_dtl'] = $value->w2ui->changes->role_dtl; }
				$param['use_yn'] = isset($value->w2ui->changes->use_yn) ? "Y" : "N";
					
				if ($value->cu == 'C') {	// insert
					if (trim($value->w2ui->changes->role_id) == '') {	// 아이디가 비어있을 때 모두 비어있으면 continue, 하나라도 값이 있으면 break.
						if( ( trim($param['role_nm']) != '' || isset($value->w2ui->changes->role_nm) ) 
							&& ( trim($param['role_dtl']) != '' || isset($value->w2ui->changes->role_dtl) )
							&& !isset($value->w2ui->changes->use_yn) ){
							continue;
						}else{
							$chk_pk = 'ROLE ID 는 공백을 넣을 수 없습니다.';
							break;
						}
					}
					$param['role_id'] = $value->w2ui->changes->role_id;
					$result->param = $param;
					try { $this->db->insert($tb,$param); } catch (\Throwable $th) {}
				}else{	// update
					$result->sset = isset($value->w2ui->changes->role_id);
					if (isset($value->w2ui->changes->role_id)) {
						$chk_pk = 'ROLE ID('.$value->recid.'번줄)은  변경 하실 수 없습니다';
						break;
					}
					$where = array("role_id" => $value->role_id);
					try {
						$this->mms_m->whereUpdate($param,$tb,$where);
						$result->qry = $this->db->last_query();
					} catch (\Throwable $th) {}
				}
			}
		}
		if ($this->db->trans_status() === FALSE){
			$result->msg = '문제가 발생하였습니다.';
			$result->error = $this->db->error();
			$result->qry = $this->db->last_query();
			$this->db->trans_rollback();
		}else if($chk_pk != '') {
			$result->msg = $chk_pk;
			$this->db->trans_rollback();
		}else{
			$result->result = true;
			$result->msg = '저장되었습니다.';
			$this->db->trans_commit();
		}
		$result->data = $data;
		echo json_encode($result);
	}
	
	public function user(){
	  $tb = 'tbc_userinfo';
	  $data = json_decode($this->input->post(null, true)['data']);
	  $result = (object) [];


	  
	  $this->db->trans_begin();
	  $element = (object)[];
	  $comm = '';
	  $chk_pk = '';



	  foreach ($data as $key => $value) {
	    if(isset($value->w2ui->changes)){
	      $param = array();
	      // 공백으로 업데이트 되는걸 방지하기 위한 조건문들
	      if (isset($value->w2ui->changes->lang_gbn)) { $param['lang_gbn'] = $value->w2ui->changes->lang_gbn; }
	      if (isset($value->w2ui->changes->emp_nm)) { $param['emp_nm'] = $value->w2ui->changes->emp_nm; }
	      if (isset($value->w2ui->changes->fact_cd)) { $param['fact_cd'] = $value->w2ui->changes->fact_cd; }
	      if (isset($value->w2ui->changes->pwd)) { $param['pwd'] = password_hash($value->w2ui->changes->pwd, PASSWORD_BCRYPT); }
	      if (isset($value->w2ui->changes->offc_phn_num)) { $param['offc_phn_num'] = $value->w2ui->changes->offc_phn_num; }
	      if (isset($value->w2ui->changes->hand_phn_num)) { $param['hand_phn_num'] = $value->w2ui->changes->hand_phn_num; }
	      if (isset($value->w2ui->changes->buss_rpst_dtl)) { $param['buss_rpst_dtl'] = $value->w2ui->changes->buss_rpst_dtl; }
	      if (isset($value->w2ui->changes->wrk_gbn)) { $param['wrk_gbn'] = $value->w2ui->changes->wrk_gbn; }
	      $param['use_yn'] = isset($value->w2ui->changes->use_yn) ? "Y" : "N";

	      if ($value->cu == 'C') {	// insert
//	        $param['fact_cd'] = $value->w2ui->changes->fact_cd;
	        $param['emp_id'] = $value->w2ui->changes->emp_id;
	        $result->param = $param;
	        try { $this->db->insert($tb,$param); } catch (\Throwable $th) {}
	      }else{	// update
//	        if (isset($value->w2ui->changes->fact_cd)) {
//	          $chk_pk = '공장코드('.$value->recid.'번줄)은  변경 하실 수 없습니다';
//	          break;
//	        }
	        if (isset($value->w2ui->changes->emp_id)) {
	          $chk_pk = '직원ID('.$value->recid.'번줄)은  변경 하실 수 없습니다';
	          break;
	        }
	        $where = array();
//	        $where['fact_cd'] = $value->fact_cd;
	        $where['emp_id'] = $value->emp_id;
	        try {
	          $this->mms_m->whereUpdate($param,$tb,$where);
	          $result->qry = $this->db->last_query();
	        } catch (\Throwable $th) {}
	      }
	    }
	  }

		$result->result = false;
		$result->msg = '저장되지 않았습니다.';
		$result->param = array();

	  if ($this->db->trans_status() === FALSE){
	    $result->msg = '문제가 발생하였습니다.';
	    $result->error = $this->db->error();
	    $result->qry = $this->db->last_query();
	    $this->db->trans_rollback();
	  }else if($chk_pk != '') {
	    $result->msg = $chk_pk;
	    $this->db->trans_rollback();
	  }else{
	    $result->result = true;
	    $result->msg = '저장되었습니다.';
	    $this->db->trans_commit();
	  }
	  $result->data = $data;
	  
	  echo json_encode($result);
	}
	
	public function cmn_code(){
	  $tb = 'tbc_codeinfo';
	  $data = $this->input->post(null, true);
	  $data['use_yn'] = isset($data['use_yn']) ? 'Y' : 'N';
      unset($data['cnct_url']);
      unset($data['cnct_btn']);
	  $result = (object) [];
	  $result->result = false;
	  $result->msg = '저장되지 않았습니다.';
	  $result->param = array();
	  
	  $this->db->trans_begin();
	  
	  if ($data['cu'] == 'c') {  // insert
	    unset($data['cu']);
	    unset($data['row_num']);
	    $this->db->insert($tb,$data);
	  }else if($data['cu'] == 'u'){  // update

	    unset($data['cu']);
	    unset($data['row_num']);
	    $where = array('cd' => $data['cd'], 'up_cd' => $data['up_cd']);
	    unset($data['cd']);
	    unset($data['up_cd']);
	    $this->db->where($where)->update($tb,$data);
	  }
	  
	  if ($this->db->trans_status() === FALSE){
	    $result->msg = '문제가 발생하였습니다.';
	    $result->error = $this->db->error();
	    $result->qry = $this->db->last_query();
	    $this->db->trans_rollback();
	  }else{
	    $result->result = true;
	    $result->msg = '저장되었습니다.';
	    $this->db->trans_commit();
	  }
// 	  $result->data = $data;

	  echo json_encode($result);
	}
	
	public function pgm_btn(){
	  $tb = 'tbc_pgmbtninfo';
	  $data = $this->input->post(null, true);
	  $result = (object) [];
	  $result->result = false;
	  $result->msg = '저장되지 않았습니다.';
	  
	  $this->db->trans_begin();
	  $this->db->where(array('pgm_id' => $data['pgm_id']))->delete($tb);
	  $param = array('pgm_id' => $data['pgm_id']);
// 	  $param['data'] = $data['data'];
	  
// 	  foreach ($data['data'] as $key => $value) {
// 	    $param[$key] = $value['btn_id'];
// 	  }
	  foreach ($data['data'] as $key => $value) {
	    $param['btn_id'] = $value['btn_id'];
	    $param['btn_ordr'] = $key+1;
	    $param = $this->_inst_id($param);
// 	    $result->param = $param;
	    $this->db->insert($tb, $param);
	  }
	  
	  if ($this->db->trans_status() === FALSE){
	    $result->msg = '문제가 발생하였습니다.';
	    $result->error = $this->db->error();
	    $result->qry = $this->db->last_query();
	    $this->db->trans_rollback();
	  }else{
	    $result->result = true;
	    $result->msg = '저장되었습니다.';
	    $this->db->trans_commit();
	  }
	  
	  
	  echo json_encode($result);
	}
	
	public function role_pgm_btn(){
	    $tb = 'tbc_rolepgmbtn';
	    $data = $this->input->post(null, true);
	    $result = (object) [];
	    $result->result = false;
	    $result->msg = '저장되지 않았습니다.';
	    
	    $this->db->trans_begin();
	    $param = array(
	        'role_id' => $data['role_id'],
	        'pgm_id' => $data['pgm_id'],
	        
	    );
	    $this->db->delete($tb, $param);
	    $user = $this->session->userdata('emp_id');
	    foreach ($data['btns'] as $key => $value) {
	        $param['btn_id'] = $value;
// 	        $param = array(
// 	            'role_id' => $data['role_id'],
// 	            'pgm_id' => $data['pgm_id'],
// 	            'btn_id' => $value
// 	        );
//            $param['btn_ordr'] = '(SELECT btn_ordr FROM tbc_pgmbtninfo WHERE btn_id = "'.$value.'")';
            //
//             INSERT INTO `tbc_rolepgmbtn`
//             (`role_id`, `pgm_id`, `btn_id`, `btn_ordr`, `inst_id`, `updt_id`)
//             VALUES
//             ('R0001', 'P1050', 'B0001', (SELECT btn_ordr FROM tbc_pgmbtninfo WHERE btn_id = "B0001"), 'admin', 'admin')

            $query = "INSERT INTO `tbc_rolepgmbtn`
             (`role_id`, `pgm_id`, `btn_id`, `btn_ordr`, `inst_id`, `updt_id`)
             VALUES
             ('{$param['role_id']}', '{$param['pgm_id']}', '{$param['btn_id']}', (SELECT btn_ordr FROM tbc_pgmbtninfo WHERE btn_id = \"{$param['btn_id']}\" AND pgm_id = \"{$param['pgm_id']}\"), '{$user}', '{$user}')";
            $this->db->query($query);

//	        $param = $this->_inst_id($param);
//	        $this->db->insert($tb, $param);

//	        $qry = $this->db->last_query();
//	        $this->db->insert('qry_test', array('qry' => $qry));
            $this->db->insert('qry_test', array('qry' => $query));
	    }
	    
	    if ($this->db->trans_status() === FALSE){
	        $result->msg = '문제가 발생하였습니다.';
	        $result->error = $this->db->error();
	        $result->qry = $this->db->last_query();
	        $this->db->trans_rollback();
	    }else{
	        $result->result = true;
	        $result->msg = '저장되었습니다.';
	        $this->db->trans_commit();
	    }

	    echo json_encode($result);
	}
	
	public function usr_role(){
	    $tb = 'tbc_userole';
	    $data = $this->input->post(null, true);
	    $result = (object) [];
	    $result->result = false;
	    $result->msg = '저장되지 않았습니다.';
	    
	    $this->db->trans_begin();
	    
	    $this->db->delete($tb, array('emp_id' => $data['emp_id']));
	    $param = array();
	    foreach ($data['role_id'] as $key => $value) {
	        $param = array(
	            'emp_id' => $data['emp_id'], 
	            'role_id' => $value,
	            'use_yn' => 'Y'
	        );
	        $param = $this->_inst_id($param);
	        $this->db->insert($tb, $param);
	    }
	    
	    if ($this->db->trans_status() === FALSE){
	        $result->msg = '문제가 발생하였습니다.';
	        $result->error = $this->db->error();
	        $result->qry = $this->db->last_query();
	        $this->db->trans_rollback();
	    }else{
	        $result->result = true;
	        $result->msg = '저장되었습니다.';
	        $this->db->trans_commit();
	    }
	    
	    echo json_encode($result);
	}

	public function excel_upload(){
        $result = (object)[];
        $result->result = false;
        /**
         * Excel upload 시에
         * $path_to_table[경로][그리드번호] = DB 테이블명
         * @var string[][]
         */
        $path_to_table = [
            'part_nbr_mgt' => ['tbm_prtnbrinfo'],
            'part_nbr_mgt_wp' => ['tbm_prtnbrinfo'],
        ];

        $param = $this->input->post();
        $param['path'] = explode('/', $param['path']);

        $path = $param['path'][count($param['path'])-1];

//        $this->load->library("dbinfo");
//        $pk = $this->dbinfo->primary_key($path_to_table[$path][0]);
        $schema = $this->db->database;
        $table = $path_to_table[$path][0];
        // SELECT * FROM information_schema.COLUMNS
        //WHERE TABLE_SCHEMA = 'winmes' AND TABLE_NAME = 'tbm_prtnbrinfo' AND IS_NULLABLE = 'NO';
//        $qry = "SELECT * FROM information_schema.COLUMNS
//                WHERE TABLE_SCHEMA = '{$schema}' AND TABLE_NAME = '{$path_to_table[$path][0]}' AND IS_NULLABLE = 'NO';";
//        $pk = $this->db->query($qry)->result();
        $not_null = $this->db->get_where('information_schema.COLUMNS', array('TABLE_SCHEMA' => $schema, 'TABLE_NAME' => $table, 'IS_NULLABLE' => 'NO'))->result();
        $pk = [];
        foreach ($not_null as $item) {
            $pk[] = $item->COLUMN_NAME;
        }

        $this->load->library('PHPExcel');

        $objPHPExcel = PHPExcel_IOFactory::load($_FILES['up_file']['tmp_name']);

        $objPHPExcel->setActiveSheetIndex(0);
        $sheet = $objPHPExcel->getActiveSheet();
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();

        // 엑셀 파일 첫번째 줄은 테이블 칼럼명이다.
        $row = 1;
        $columns = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE)[0];
        // 엑셀 파일 첫번째 줄은 테이블 칼럼의 의미이다.
        $row = 2;
        $column_name = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE)[0];

        $row = 3;
        $column_type = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE)[0];

        // 엑셀 파일 네번째 줄부터 입력할 데이터다.
        $row = 4;
        $data = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $highestRow, NULL, TRUE, FALSE);

        // 엑셀 파일에 필수입력 항목 위치 찾기.
        $pkNo = [];
        foreach ($columns as $key => $value) {
            if (in_array($value, $pk)) { $pkNo[] = $key; }
        }

        $result->msg = '';
        //$insert_data = [];
        $cnt = 3;

        $column_arr = [];

        $this->db->trans_begin();
        foreach ($data as $row_num => $row_data) {  // 한 줄 씩 체크 후 입력할 쿼리 만들기


            // 한 행이 모두 비어있으면 넘어감
            if ($this->_is_arr_empty($row_data)) continue;
            $insert_data = [];

            foreach ($row_data as $key => $value){  // 필수 입력 사항 체크
                // $key : index, $value : 입력값.
//                $insert_data[$row_num][] = (is_null($value) || trim($value) == '') ? '비었음': $value;

                if (in_array($key, $pkNo)){   // 해당 항목이 pk 일 경우
                    if (trim($value) == "" || is_null($value)) {   // 비어있으면 에러 메세지 띄우고 위치 알려주기
                        $result->msg = ($row_num + 1).'번째 항목에 필수 입력 사항, '.$column_name[$key].'('.$columns[$key].')이/가 입력되지 않았습니다.(엑셀 파일 '.($row_num + 3).'번 줄)';
                        break 2;
                    }
                }

                $insert_data[$columns[$key]] = $row_data[$key];

            }
            $cnt++;
            $this->db->insert($table, $insert_data);

            if ($this->db->trans_status() === FALSE) {
                $result->error_data = $insert_data;
                $result->result = false;
                $result->msg2 = $cnt.'번째 데이터 저장 도중 문제가 생겼습니다.';
                $result->cnt = $cnt;
                $result->error = $this->db->error();
                $this->db->trans_rollback();
                break;
            }
        }

        if(!$result->cnt){
            $result->msg = '업로드 되었습니다.';
            $result->result = true;
            $this->db->trans_commit();
        }


//        exit(json_encode($cnt));

//        if ($result->msg === '') {
//            $result->qry_result = $this->db->insert_batch($table, $insert_data);
//            $result->qry = $this->db->last_query();
//            if (!$result->qry_result) {
//                $result->error = $this->db->error();
//                $result->msg = '오류가 발생하였습니다.';
//            }
//            else {
//                $result->result = true;
//                $result->msg = '업로드 되었습니다.';
//            }
//        }


//        $result->insert_data = $insert_data;
//        $result->columns = $columns;
//        $result->data = $data;
//        $result->param = $param;
//        $result->pk = $pk;
//        $result->pkNo = $pkNo;
//        $result->dbname = $this->db->database;

//	    echo json_encode($up_file);
//        echo json_encode($data);
        echo json_encode($result);
    }

    private function _is_arr_empty($arr = array()){
        $is_end = true;
        foreach ($arr as $key => $value) {
            if (!is_null($value) && trim($value) != '') $is_end = false;
        }
        return $is_end;
    }

}































