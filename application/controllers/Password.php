<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Password extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	public function change(){
        $data = array();


        if(isset($_POST) && count($_POST) > 0){
            $param = $this->input->post(null, true);
            if(trim($param['pwd']) != '' && trim($param['new_pwd']) != '') {
                $data['result'] = false;
                $data['msg'] = '비밀번호 변경에 실패하였습니다.';


                /*
                비밀번호를 변경하기 위한 조건 확인
                현재 비밀번호, 새로운 비밀번호, 비밀번호 재확인
                pwd,           new_pwd        , re_pwd
                1. 새로운 비밀번호, 비밀번호 재확인 입력이 일치 하는지 여부 확인.
                2. 현재 비밀번호가 DB에 있는 비밀번호가 맞는지 확인
                */
                // 1. 새로운 비밀번호, 비밀번호 재확인 입력이 일치 하는지 여부 확인.
                if ($param['new_pwd'] == $param['re_pwd']) {
                    $this->db->trans_begin();

                    $user = $this->mms_m->tbWhere(array('emp_id' => $this->session->userdata('emp_id')), 'tbc_userinfo');

                    // 2. 현재 비밀번호가 DB에 있는 비밀번호가 맞는지 확인
                    if (password_verify($param['pwd'], $user['pwd'])) {
                        // 비밀번호를 변경하기 위한 조건 통과.
                        // 비밀번호 변경
                        $pwd = password_hash($param['new_pwd'], PASSWORD_BCRYPT);
                        $data['result'] = $this->db->where('emp_id', $this->session->userdata('emp_id'))->update('tbc_userinfo', array('pwd' => $pwd));
//                    $data['qry'] = $this->db->last_query();

                        $data['msg'] = "비밀번호가 변경되었습니다.";
                    } else {
                        // 비밀번호 틀림.
                        $data['msg'] = "비밀번호가 틀렸습니다.";
                    }

                } else {
                    // 새 비밀번호, 비밀번호 재확인 틀림
                    $data['msg'] = "새 비밀번호와 비밀번호 재확인 란이 일치하지 않습니다.";
                }
                if ($this->db->trans_status()) {
                    $this->db->trans_commit();
                } else {
                    $this->db->trans_rollback();
                }
            }
        }
        $data['data'] = $data;
        $view = array('password/change');
        $this->layout->view($view, $data);
	}
}
