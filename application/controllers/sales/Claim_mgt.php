<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Claim_mgt extends CI_Controller
{

	function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$data = array();
		$param = $this->input->get(null, true);

		if (count($param))
		{
			switch ($param['load_type'])
			{
				case 'save':
					$data['msg'] = '저장되었습니다.';
					break;
				case 'delete':
					$data['msg'] = '삭제되었습니다.';
					break;
				default:
					$data['msg'] = '조회되었습니다.';
					break;
			}
			unset($param['load_type']);
			$data['info'] = $this->mms_m->tbLikeObj($param, 'tbc_userinfo', 'role_id ASC');
		}
		else
		{  // 처음 페이지 진입 및 초기화시 데이터 노출 없음
			$data['info'] = array();
		}
		$data['param'] = $param;

		$view = array('sales/claim_mgt/index.php');
		$this->layout->view($view, $data);
	}
}
