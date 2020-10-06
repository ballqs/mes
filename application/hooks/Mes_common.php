<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Mes_common {
	
	// 선택한 데이터베이스로 연결
	function change_database(){
		$CI =& get_instance();
		
		$CI->load->library('session');
		$db_name = $CI->session->userdata('db_name') ? $CI->session->userdata('db_name') : 'default';
		$CI->db = $CI->load->database($db_name);
		$CI->load->database($db_name);
	}

    // 로그인 체크 후 로그인 되어있지 않으면 로그인 화면으로 이동함
    function session_check(){
        $CI =& get_instance();
        $CI->load->library('session');
        if($CI->uri->segment(1) != 'login' && $CI->uri->segment(1) != 'monitoring' && ($CI->uri->segment(1) != 'ajax' && $CI->uri->segment(2) != 'monitoring')){
            if(count($CI->session->userdata()) == 1){
                redirect(base_url('login'));
            }
        }
    }

	// 파라미터로 cnct 가 넘어오면 실행. 사용자 접속 조회용
	function usercnct(){
		$CI =& get_instance();
		$CI->load->library('session');
		if(isset($_REQUEST['cnct_url']) && isset($_REQUEST['cnct_btn'])){
//			$pgm_id = $CI->db->select('pgm_id')->get_where('tbc_pgminfo', array('url' => substr($_REQUEST['cnct_url'], 1)))->row()->pgm_id;
//			$CI->db->query("CALL usp_usercnct_i1('{$CI->session->userdata('emp_id')}', '{$pgm_id}', '{$_REQUEST['cnct_btn']}')");
			$url = substr($_REQUEST['cnct_url'], 1);
			$CI->db->query("CALL usp_usercnct_i1('{$CI->session->userdata('emp_id')}', (SELECT pgm_id FROM tbc_pgminfo WHERE url = '{$url}'), '{$_REQUEST['cnct_btn']}')");
//			unset($_REQUEST['cnct_url']);
//			unset($_REQUEST['cnct_btn']);
		}
	}
	
}
?>