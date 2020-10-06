<?php
class Mms_m extends CI_Model {

	function __construct(){
			parent::__construct();
			$this->output->enable_profiler(false);
	}

  function save($param,$tb){
    $primary_column = $this->primary_column($tb);
    // return $primary_column;
    $where = array();
    foreach ($primary_column as $value) {
      if(!$param[$value]){ // 프라이머리키값 비어있을 경우 return false
        return false;
      }
      $where[$value] = $param[$value];
    }

    $this->db->select('COUNT(*) as count');
    $this->db->where($where);
    $user = $this->session->userdata('emp_id');
    $param['updt_id'] = $user;

    if($this->db->get($tb)->row()->count){  // update
      $this->whereUpdate($param,$tb,$where);
      return true;
    }else{  // insert
      $param['inst_id'] = $user;
      return $this->tbInsert($param,$tb);
    }
  }
  function primary_column($tb){
    $where = array(
      'TABLE_SCHEMA' => $this->db->database,
      'TABLE_NAME' => $tb,
      'CONSTRAINT_NAME' => 'PRIMARY'
    );
    $primary_column = $this->db->select('COLUMN_NAME')->where($where)->get('INFORMATION_SCHEMA.KEY_COLUMN_USAGE')->result();
    $result = array();
    foreach ($primary_column as $key => $value) {
      $result[] = $value->COLUMN_NAME;
    }
    return $result;
  }
	function tbInsert($param,$tb){
			$this->db->insert($tb,$param);
			// return $this->db->insert_id();
			return $this->db->select('COUNT(*) as count')->get_where($tb, $param)->row()->count;
	}
	function whereUpdate($param,$tb,$where){
			$this->db->where($where);
			$this->db->update($tb,$param);
	}
	function tbWhere($param,$tb,$order = ''){
			$this->db->where($param);
			if ($order != '') $this->db->order_by($order);
			$query = $this->db->get($tb);
			return $query->row_array();
	}
	function tbLike($param,$tb,$order = ''){
			$this->db->Like($param);
			if ($order != '') $this->db->order_by($order);
			$query = $this->db->get($tb);
			return $query->row_array();
	}
  function tbWhereObj($param,$tb,$order = ''){
			$this->db->where($param);
      if ($order != '') $this->db->order_by($order);
			$query = $this->db->get($tb);
			return $query->result();
	}
	function tbLikeObj($param,$tb){
			$this->db->like($param);
      // if ($order != '') $this->db->order_by($order);
			$query = $this->db->get($tb);
			return $query->result();
	}
	function tbWhereArr($param,$tb,$order='',$page=''){
			$this->db->where($param);
			if($order != '') $this->db->order_by($order);
			if(!empty($page['page'])){ $this->db->limit($page['p_size'], ($page['page'] - 1) * $page['p_size']); }
			$query = $this->db->get($tb);
			return $query->result_array();
	}
	function tbLikeArr($param,$tb,$order='',$page=''){
			$this->db->like($param);
			if($order != '') $this->db->order_by($order);
			if(!empty($page['page'])){ $this->db->limit($page['p_size'], ($page['page'] - 1) * $page['p_size']); }
			$query = $this->db->get($tb);
			return $query->result_array();
	}
	function tbDelte($param,$tb){
			$this->db->where($param);
			return $this->db->delete($tb);
	}
	function total($param,$tb){
			$this->db->where($param);
			return $this->db->count_all_results($tb);
	}
	function totalLike($param,$tb){
			$this->db->like($param);
			return $this->db->count_all_results($tb);
	}
}
?>
