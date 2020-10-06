<?php
class Mes_m extends CI_Model
{
    private $_result;

    function __construct()
    {
        parent::__construct();
        $this->output->enable_profiler(false);
        $this->_result = (object) [];
        $this->_result->data = [];
        $this->_result->msg = "";

        $this->_result->result = false;
}

    /**
     * get(select) table
     * @param string $tb
     * @param array $param
     * @param array $join
     * @return object
     */
    public function get($tb, $param = array(), $join = array()){
//        $param = $param[0];
        if (isset($param['where']) && count($param['where'])) {
            foreach ($param['where'] as $key => $value) {
                if(stristr($key, 'date(')){ // date 함수를 사용한다면
                    $this->db->where($key, "'".$value."'", false);
                }else{  // date 함수를 사용하지 않는다면
                    $this->db->where($tb.'.'.$key, $value);
                }

            }
        }
        if (isset($param['like']) && count($param['like'])) {
            foreach ($param['like'] as $key => $value) {
                $this->db->like($tb.'.'.$key, $value[0], $value[1]);
            }
        }
        if (isset($param['order_by']) && $param['order_by'] != '') $this->db->order_by($param['order_by']);
        if (isset($param['limit']) && count($param['limit'])) {
            (count($param['limit']) - 1)
                ? $this->db->limit($param['limit'][1], $param['limit'][0])
                : $this->db->limit($param['limit']);
        }
        if (isset($join) && count($join)) {
            $this->db->select($join['select']);
            foreach ($join['tables'] as $key => $value) {
                $this->db->join($key, $value);
            }
        }
        try {
            $this->_result->data = $this->db->get($tb)->result();
            $this->_result->result = true;
            $this->_result->msg = "조회되었습니다.";
            $this->_result->qry = $this->db->last_query();
        } catch (Exception $e) {
        }

        return $this->_result;
    }




    public function query($qry = ''){
        $qry_type = substr( trim($qry), 0 , 6  );
        if(strtoupper($qry_type) == 'SELECT') {
            $this->_result->data = $this->db->query($qry)->result();
        }else{
            $this->db->query($qry);
        }
        $this->_result->result = true;
        
        $this->_result->qry = $this->db->last_query();
        $this->_result->error = $this->db->error();
        if ($this->_result->error['code'] == 0){
            $this->_result->msg = "조회되었습니다.";
        }else{
            $this->_result->msg = "조회되지 않았습니다.";
        }

        return $this->_result;
    }




    /**
     * save(insert, update) 1 table
     * @param $tb_arr
     * @param array $param
     * @return object
     */
    public function save($tb_arr, $param = array())
    {

        $this->db->trans_begin();
        $sess = $this->session->userdata('emp_id');
        $this->load->library('dbinfo');
        
        foreach ($tb_arr as $tb_idx => $tb) {   // grid별 for문(테이블이 달라짐)
            $pk = $this->dbinfo->primary_key($tb);


            $insert_data = [];
            if(!empty($param[$tb_idx])) {   // 비어있는지 확인 후 진행
                foreach ($param[$tb_idx] as $value) {
                    $value = (array)$value;

                    if (strtoupper($value['cu']) == 'C') {   // insert
                        unset($value['cu']);
                        $value['inst_id'] = $sess;
                        $value['updt_id'] = $sess;
                        $insert_data[] = $value;
                    } else {  // update
                        // 2그리드 이상일 경우 하위 요소 함께 연동 필요.
                        // 하위 그리드
                        // 1. $tb_arr[$tb_idx + 1] 로 판별한다.
                        // 2. 해당 테이블에 요소들을 select 한다. -> 필요한가?
                        // 3. 해당 테이블 요소들에 변경해야 할 부분들을 변경해준다.

                        unset($value['cu']);
                        $where = [];

                        foreach ($pk as $value_p) {    // primary key 는 where 절로 만들고 수정 불가.
                            $where[$value_p] = $value[$value_p];
                            unset($value[$value_p]);
                        }

                        $value['updt_id'] = $sess;



                        $this->db->where($where)->update($tb, $value);
                    }
                }
            }

            if (count($insert_data)) $this->db->insert_batch($tb, $insert_data);
        }

        if ($this->db->trans_status() === FALSE){
            $this->_result->msg = '저장되지 않았습니다.';
            $this->_result->error = $this->db->error();
            $this->_result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else{
            $this->_result->qry = $this->db->last_query();
            $this->_result->result = true;
            $this->_result->msg = '저장되었습니다.';
            $this->db->trans_commit();
        }
        $this->_result->param = $param;

        return $this->_result;
    }

    /**
     * delete 1 table
     * @param string $tb
     * @param array $param
     * @return object
     */
    public function delete($tb_arr, $param = array()){
        $this->load->library('dbinfo');
        $this->db->trans_begin();
        $sess = $this->session->userdata('emp_id');



        foreach ($tb_arr as $tb_idx => $tb) {


            $pk = $this->dbinfo->primary_key($tb);



            foreach ($param[$tb_idx] as $key => $value) {
                $where = [];


                foreach ($pk as $value_p) {    // primary key 는 where 절로 만들고 수정 불가.
                    $where[$value_p] = $value[$value_p];
                }




                if (isset($tb_arr[$tb_idx + 1]) && trim($tb_arr[$tb_idx + 1]) != '') $this->db->delete($tb_arr[$tb_idx + 1], $where);    // 하위 그리드 테이블에 해당내용 삭제



               $this->db->delete($tb, $where);


            }

            if ($this->db->trans_status() === FALSE) {
                $this->_result->msg = '삭제되지 않았습니다.';
                $this->_result->error = $this->db->error();
                $this->_result->qry = $this->db->last_query();
                $this->db->trans_rollback();
            } else {
                $this->_result->result = true;
                $this->_result->msg = '삭제되었습니다.';
                $this->db->trans_commit();
            }
        }
        $this->_result->param = $param;

        return $this->_result;
    }

    /**
     * stored procedure 실행
     * @param $query
     * @param $result_columns
     * @return object
     */
    public function exec_sp($query, $result_columns = array()){
        $this->db->trans_begin();

        $result = $this->db->query($query);
        $this->_result->callqry = $this->db->last_query();
        mysqli_next_result( $this->db->conn_id );
        if (count($result_columns)){
            $result_qry = 'SELECT ';
            foreach ($result_columns as $column) {
                $result_qry .= " @{$column} as {$column},";
            }
            $result_qry = substr($result_qry, 0, -1);
            $this->_result->data = $this->db->query($result_qry)->row();
        }else{

            $this->_result->data = $this->db->query("SELECT @result as result, @msg as msg")->row();

        }

        // SP result 값이 true=0 false=-1 로 리턴된다.
        // 이를 php 에서 사용하는 형태로 바꾸기 위해 +1을 해준다.
        // 결국, 리턴해주는 값은 true=1, false=0 이 된다.
        $this->_result->data->result++;

        if ($this->db->trans_status() === FALSE){
            $this->_result->msg = '저장되지 않았습니다.';
            $this->_result->error = $this->db->error();
            $this->_result->qry = $this->db->last_query();
            $this->db->trans_rollback();
        }else{
            if($this->_result->data->result < 0){   // 프로시저 실패
                $this->_result->qry = $this->db->last_query();
                $this->_result->result = false;
                $this->_result->msg = '저장되지 않았습니다.';
                $this->db->trans_rollback();
            }else{  // 프로시저 성공
                $this->_result->qry = $this->db->last_query();
                $this->_result->result = true;
                $this->_result->msg = '저장되었습니다.';
                $this->db->trans_commit();
            }
        }
        return $this->_result;
    }

    public function btn_list($path){
        if (preg_match('/^\//', $path)) $path = substr($path, 1);

        $qry = "SELECT DISTINCT  b.btn_id,b.btn_ordr, c.*
                    FROM   tbc_userole a
                    JOIN   tbc_rolepgmbtn b ON ( a.role_id = b.role_id )
                    JOIN   tbc_btninfo c ON (b.btn_id = c.btn_id)
                    WHERE  a.emp_id  = '".$this->session->userdata('emp_id')."' #사용자  인수
                    AND    c.use_yn = 'Y'
                    AND    b.pgm_id  IN ( SELECT pgm_id FROM tbc_pgminfo WHERE url = '".$path."' )
                    ORDER BY b.btn_ordr,b.btn_id;";
        try {
            $this->_result->data = $this->db->query($qry)->result();
            $this->_result->result = true;
            $this->_result->msg = "조회되었습니다.";
            $this->_result->qry = $this->db->last_query();
        } catch (Exception $e) {
        }

        return $this->_result;
    }

    public function popup_btn_list($popup_id){
//        if (preg_match('/^\//', $path)) $path = substr($path, 1);

        $qry = "SELECT DISTINCT  b.btn_id,b.btn_ordr, c.*
                    FROM   tbc_userole a
                    JOIN   tbc_rolepgmbtn b ON ( a.role_id = b.role_id )
                    JOIN   tbc_btninfo c ON (b.btn_id = c.btn_id)
                    WHERE  a.emp_id  = '".$this->session->userdata('emp_id')."' #사용자  인수
                    AND    c.use_yn = 'Y'
                    AND    b.pgm_id  IN ( SELECT pgm_id FROM tbc_pgminfo WHERE pgm_id = '{$popup_id}' AND prc_gbm = 'Y' )
                    ORDER BY b.btn_ordr,b.btn_id;";
        try {
            $this->_result->data = $this->db->query($qry)->result();
            $this->_result->result = true;
            $this->_result->msg = "조회되었습니다.";
            $this->_result->qry = $this->db->last_query();
        } catch (Exception $e) {
        }

        return $this->_result;
    }

    /**
     * 입력된 회사에서 해당 품번 lotno관리 규정에 따라 lotno를 자동 채번, '*'(관리 안할때), ''(직접입력 받을때)로 반환한다.
     * @param $fact_cd
     * @param $prt_nbr_cd
     * @param string $header
     * @param string $ymd
     * @return object{result: boolean, lotno: string, msg: string}
     */
    public function get_lotno_mgt($fact_cd, $prt_nbr_cd, $header = '', $ymd = ''){
        $result = (object)[];
        $result->msg = '';
        $result->result = false;
        $result->lotno = '';
        $chk_lot = $this->check_lotno_mgt($fact_cd, $prt_nbr_cd);
        if ($chk_lot->cd_set1 == 'Y') { // 자동 채번
            if ($header == ''){
                $result->msg = '채번시 필요한 구분자를 넘겨주세요.';
            }else {
                if ($ymd == '') {
                    $ymd = date("Y-m-d");
                }
                $sess = $this->session->userdata('emp_id');
                $query = "CALL usp_crtseq('{$fact_cd}', '{$header}', '{$ymd}','{$sess}', @crtseq, @result, @msg)";
                $sp_result = $this->mes_m->exec_sp($query, ['crtseq', 'result', 'msg']);
                $result->result = true;
                $result->lotno = $sp_result->data->crtseq;
            }
        }elseif($chk_lot->cd_set1 == 'N'){   // 수동 채번
            if($chk_lot->cd_set2 == 'Y'){   // 직접 입력
                $result->result = true;
                $result->msg = 'LOTNO를 직접입력하게 되어있습니다. LOTNO가 입력되었는지 확인해주세요.';
            }else if($chk_lot->cd_set2 == 'N'){ // * 입력
                $result->result = true;
                $result->msg = 'LOTNO를 관리하지 않으므로 *을 입력합니다.';
                $result->lotno = '*';
            }
        }
        return $result;
    }

    public function check_lotno_mgt($fact_cd, $prt_nbr_cd){
        $qry = "SELECT b.cd_set1, b.cd_set2, b.cd_fctn_dtl
                FROM tbm_prtnbrinfo a
                JOIN tbc_codeinfo b ON a.account_type = b.cd AND b.up_cd = 'lot_mgt_yn'
                WHERE a.fact_cd = '{$fact_cd}'
                AND a.prt_nbr_cd = '{$prt_nbr_cd}'
                ;";
        return $this->db->query($qry)->row();
    }

    /**
     * To get result(s) of queries that returns multiple result sets...
     *
     * @author Pankaj Garg <garg.pankaj15@gmail.com>
     *
     * @param string $queryString
     *
     * @return bool|array List of result arrays
     */
    public function GetMultipleQueryResult($queryString)
    {
        if (empty($queryString)) {
            return false;
        }

        $index     = 0;
        $ResultSet = array();

        /* execute multi query */
        if (mysqli_multi_query($this->db->conn_id, $queryString)) {
            do {
                if (false != $result = mysqli_store_result($this->db->conn_id)) {
                    $rowID = 0;
                    while ($row = $result->fetch_assoc()) {
                        $ResultSet[$index][$rowID] = $row;
                        $rowID++;
                    }
                }
                $index++;
            } while (mysqli_next_result($this->db->conn_id));
        }

        return $ResultSet;
    }

    public function trans_sp_result($sp_result_data, $result){
        $sp_result = $sp_result_data[count($sp_result_data) - 1][0];
        if ($sp_result['out_result'] == -1){
            $result->result = false;
            $result->msg = $sp_result['out_message'];
        }else{
            $result->result = true;
            $result->msg = isset($sp_result['out_message']) ? $sp_result['out_message'] : '실행되었습니다.';
        }
        return $result;
    }

    public function get_menu_nav($emp_id){
        $qry = "SELECT ani.*, fnc.level as depth
				FROM
				     (SELECT fnc_menu() AS pgm_id, @level AS LEVEL, tbc_pgminfo.pgm_ordr ,@ROWNUM:=@ROWNUM+1 AS SEQ
				        FROM (SELECT @pgm_ordr:=-1,  @start_with:='MES', @pgm_id:=@start_with, @level:=0) vars
				          JOIN tbc_pgminfo 
				          JOIN (SELECT @ROWNUM:=0) T2
				         WHERE @pgm_id IS NOT NULL) fnc
				JOIN  tbc_pgminfo ani ON fnc.pgm_id = ani.pgm_id
				JOIN  (
				         ##메뉴1단계 
				         SELECT a.up_pgm_id  pgm_id
				         FROM   tbc_pgminfo a
				         WHERE  a.pgm_id IN
				                (
				                  SELECT a.up_pgm_id  pgm_id
				                  FROM   tbc_pgminfo a
				                  where  pgm_id IN 
				                        (
				                           SELECT a.up_pgm_id  pgm_id
				                           FROM   tbc_pgminfo a
				                           where  pgm_id IN 
				                                 (
				                                    SELECT DISTINCT b.pgm_id 
				                                    FROM     tbc_userole a
				                                    JOIN   tbc_rolepgmbtn b ON (a.role_id = b.role_id)
				                                    WHERE  emp_id = '{$emp_id}'
				                                 )
				                        )
				                  )
				         ##메뉴2단계
				         UNION  
				         SELECT a.up_pgm_id  pgm_id
				         FROM   tbc_pgminfo a
				         where  pgm_id IN 
				               (
				                  SELECT a.up_pgm_id  pgm_id
				                  FROM   tbc_pgminfo a
				                  where  pgm_id IN 
				                        (
				                           SELECT DISTINCT b.pgm_id 
				                           FROM     tbc_userole a
				                           JOIN   tbc_rolepgmbtn b ON (a.role_id = b.role_id)
				                           WHERE  emp_id = '{$emp_id}'
				                        )
				               )
				         
				         ##메뉴3단계
				         UNION 
				         SELECT a.up_pgm_id  pgm_id
				         FROM   tbc_pgminfo a
				         where  pgm_id in
				               (
				                  SELECT DISTINCT b.pgm_id 
				                  FROM     tbc_userole a
				                  JOIN   tbc_rolepgmbtn b ON (a.role_id = b.role_id)
				                  WHERE  emp_id = '{$emp_id}'
				               )
				         UNION 
				         ##프로그램 4단계SELECT DISTINCT b.pgm_id
				         SELECT DISTINCT b.pgm_id  
				         FROM     tbc_userole a
				         JOIN   tbc_rolepgmbtn b ON (a.role_id = b.role_id)
				         WHERE  emp_id = '{$emp_id}'
				
				      ) b ON (ani.pgm_id = b.pgm_id)
				WHERE ani.use_yn = 'Y'
				ORDER BY fnc.SEQ;";

        /*
         ### admin을 제외한 나머지 계정에 팝업 관리 보이지 않게 하려면 마지막 두줄을 아래와 같이 변경. ###
         WHERE ani.use_yn = 'Y'
         AND ( ifnull(ani.prc_gbm, 'N') = 'N' OR '{$emp_id}' = 'admin' )
         ORDER BY fnc.SEQ;";
         */
        $data = (object)array();
        $data->data = $this->db->query($qry)->result();
        $data->qry = $this->db->last_query();
        return $data;
    }

    public function get_menu_list(){
        $qry = "SELECT ani.*, fnc.level as depth
				  FROM
				     (SELECT fnc_menu() AS pgm_id, @level AS LEVEL, tbc_pgminfo.pgm_ordr ,@ROWNUM:=@ROWNUM+1 AS SEQ
				        FROM (SELECT @start_with:='MES', @pgm_id:=@start_with, @level:=0) vars
				          JOIN tbc_pgminfo 
				          JOIN (SELECT @ROWNUM:=0) T2
				         WHERE @pgm_id IS NOT NULL) fnc
				  JOIN  tbc_pgminfo ani ON fnc.pgm_id = ani.pgm_id
				  ORDER BY fnc.SEQ";
        $data = $this->db->query($qry)->result();
        return $data;
    }

    public function get_response_data_form(){
        return $this->_result;
    }

    public function trans_result($result, $success_msg, $fail_msg){
        $result->result = $this->db->trans_status();
        if ($result->result === FALSE) {
            $this->db->trans_rollback();
            $result->qry = $this->db->last_query();
            $result->error = $this->db->error();
            $result->msg = $fail_msg;
        }else{
            $this->db->trans_commit();
            $result->qry = $this->db->last_query();
            $result->error = $this->db->error();
            $result->msg = $success_msg;
        }
        return $result;
    }

    public function get_p(){
        return $this->_get_p();
    }

    private function _get_p(){
        return preg_replace("'\/[^/]*\.php$'i", "/", $_SERVER['PHP_SELF']);;
    }


}