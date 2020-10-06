<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sales extends CI_Controller
{
    public function get($path = ''){


        $param = isset($this->input->get(null, true)['param']) ? $this->input->get(null, true)['param'] : [];

        $data_list = $this->_get_data_ref($param);

        if($path == 'pop_biz_cd') {
            $this->_get_pop_biz_cd($data_list);
        }elseif($path == 'pop_ship_cd'){
            $this->_get_pop_ship_cd($data_list);
        }elseif($path == 'biz_mgt'){
            $this->_get_biz_mgt($data_list);
        }elseif ($path == 'biz_plce_mgt') {
            $this->_get_biz_plce_mgt($data_list);
        }

        $tb = $this->_get_table($path)[0];
        //echo json_encode($param);
        $data = $this->mes_m->get($tb, $param);
        echo json_encode($data);
    }

    public function save($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];
        if ($path == 'biz_mgt'){
            $this->_save_sales($tb,$param,4);
        }elseif ($path == 'biz_plce_mgt'){
            for($i = 0; $i < count($param[0]); $i = 1 + $i){
                unset($param[0][$i]['biz_nm']);
            }
            $this->_save_sales($tb,$param,5);
        }
        $data = $this->mes_m->save($tb, $param);
        echo json_encode($data);
    }

    private function _save_sales($tb,$param,$n){
        $result = $this->mes_m->get_response_data_form();
        $this->db->trans_begin();
        $sess = $this->session->userdata('emp_id');
        if($tb[0] === 'tbs_bizinfo'){
            //MAX(biz_cd) select문 처리
            $Temp_Value = $this->_get_max_biz_cd();
        }else if($tb[0] === 'tbs_bizmrloc'){
            //MAX(ship_cd) select문 처리
            $Temp_Value = $this->_get_max_ship_cd();
        }

        //subString으로 Query로 가져온 Max값의 문자부분 담기
        $first_str = substr($Temp_Value,0,1);
        //subString으로 Query로 가져온 Max값의 숫자부분 담기
        $second_number = substr($Temp_Value,1);
        //만약... 여러 row가 저장될때 필요한 숫자 변수
        $num = 0;
        //insert 및 update 해야 할 수 만큼 for문
        for($i = 0; $i < count($param[0]); $i++){
            if(strtoupper($param[0][$i]['cu']) == 'C'){   //  insert
                //cu 제거
                unset($param[0][$i]['cu']);
                //param의 key값만 가져오기
                $keys = array_keys($param[0][$i]);
                //param의 value값만 가져오기
                $values = array_values($param[0][$i]);

                //숫자 값 올리기 ////////////////////////////////////////////////////////////
                $number = (int)$second_number + $num;
                //메소드 인자값으로 받아온 $n만큼 자리수 채우기
                $str = str_pad($number,$n,'0',STR_PAD_LEFT);
                //저장할 값으로 합치기
                $column = $first_str.$str;
                //다음 저장을 대비해 num 증가
                $num++;
                /////////////////////////////////////////////////////////////////////////////
                $data = [];
                $data['inst_id'] = $sess;
                $data['updt_id'] = $sess;
                if($tb[0] === 'tbs_bizinfo') {
                    $data['biz_cd'] = $column;
                }else if($tb[0] === 'tbs_bizmrloc'){
                    $data['ship_cd'] = $column;
                }
                for($j = 0; $j < count($param[0][$i]); $j++){
                    $data[$keys[$j]] = $values[$j];
                }
                //insert(테이블명,저장할 데이터)
                $this->db->insert($tb[0], $data);
            }else { //  update
                //cu 제거
                unset($param[0][$i]['cu']);
                //param의 key값만 가져오기
                $keys = array_keys($param[0][$i]);
                //param의 value값만 가져오기
                $values = array_values($param[0][$i]);
                $data = [];
                $where = [];
                for($j = 0; $j < count($param[0][$i]); $j++){
                    if($keys[$j] === 'cmpny_cd' || $keys[$j] === 'biz_cd' || $keys[$j] === 'ship_cd'){
                        $where[$keys[$j]] = $values[$j];
                    }else{
                        $data[$keys[$j]] = $values[$j];
                    }
                }
                $data['updt_id'] = $sess;
                //update(테이블명,바꿀 데이터,어떤 행인지 찾는 where값)
                $this->db->update($tb[0], $data, $where);
            }
        }

        if ($this->db->trans_status() === FALSE){
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
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];
        $result = $this->mes_m->delete($tb, $param);
        echo json_encode($result);
    }

    private function _get_max_biz_cd(){
        $qry = "select fnc_get_bizcd() biz_cd;";
        return $this->mes_m->query($qry)->data[0]->biz_cd;
    }

    private function _get_max_ship_cd(){
        $qry = "select fnc_get_shipcd() ship_cd;";
        return $this->mes_m->query($qry)->data[0]->ship_cd;
    }

    private function _get_biz_plce_mgt($data_list){
        $qry = "SELECT a.cmpny_cd,
                    fnc_cd_nm(a.cmpny_cd,'cmpny_cd') cmpny_nm,
                    b.biz_cd,
                    fnc_biz_nm(a.cmpny_cd,b.biz_cd) biz_nm,
                    b.ship_cd,
                    fnc_ship_nm(a.cmpny_cd,b.biz_cd,b.ship_cd) ship_nm,
                    b.biz_loc_nm,
                    b.use_yn,
                    b.remark,
                    b.inst_id,
                    b.inst_dt,
                    b.updt_id,
                    b.updt_dt
                    FROM tbs_bizinfo a LEFT OUTER JOIN tbs_bizmrloc b ON (a.cmpny_cd = b.cmpny_cd AND a.biz_cd = b.biz_cd)
                    WHERE a.cmpny_cd like CONCAT('%','{$data_list['cmpny_cd']}','%')
                    AND b.biz_cd like CONCAT('%','{$data_list['biz_cd']}','%')
                    AND  fnc_biz_nm(a.cmpny_cd,b.biz_cd) like concat('%','{$data_list['biz_nm']}','%')
                    AND b.ship_cd like CONCAT('%','{$data_list['ship_cd']}','%')
                    AND fnc_ship_nm(a.cmpny_cd,b.biz_cd,b.ship_cd) like CONCAT('%','{$data_list['ship_nm']}','%')
                    AND b.use_yn like CONCAT('%','{$data_list['use_yn']}','%');";

        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_biz_mgt($data_list){
        $qry = "SELECT cmpny_cd,
                    fnc_cd_nm(cmpny_cd,'cmpny_cd') cmpny_nm,
                    biz_cd,
                    biz_nm,
                    biz_gbn,
                    biz_item,
                    biz_type,
                    adr,
                    reprst_nm,
                    biz_reg_no,
                    use_yn,
                    remark,
                    inst_id,
                    inst_dt,
                    updt_id,
                    updt_dt
                    FROM tbs_bizinfo
                    WHERE cmpny_cd like CONCAT('%','{$data_list['cmpny_cd']}','%')
                    AND biz_cd like CONCAT('%','{$data_list['biz_cd']}','%')
                    AND biz_nm like CONCAT('%','{$data_list['biz_nm']}','%')
                    AND use_yn like CONCAT('%','{$data_list['use_yn']}','%');";
        //exit(json_encode($param));
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_pop_ship_cd($data_list){
        $qry = "SELECT a.cmpny_cd
                    ,fnc_cd_nm(a.cmpny_cd,'cmpny_cd') cmpny_nm 
                    ,b.biz_cd
                    ,fnc_biz_nm(a.cmpny_cd,b.biz_cd)  biz_nm
                    ,b.ship_cd
                    ,fnc_ship_nm(a.cmpny_cd,b.biz_cd,b.ship_cd) ship_nm
                    ,b.biz_loc_nm
                    ,a.use_yn
                    ,a.remark
                    FROM  tbs_bizinfo a LEFT OUTER JOIN tbs_bizmrloc b ON (a.cmpny_cd = b.cmpny_cd AND a.biz_cd = b.biz_cd) 
                    WHERE a.cmpny_cd like concat('%','{$data_list['cmpny_cd']}','%')
                    AND   b.biz_cd like concat('%','{$data_list['biz_cd']}','%')  #거래선코드 필터
                    AND   fnc_biz_nm(a.cmpny_cd,b.biz_cd) like concat('%','{$data_list['biz_nm']}','%') #거래선명  필터
                    AND   b.ship_cd like concat('%','{$data_list['ship_cd']}','%') #출고처  필터
                    AND   fnc_ship_nm(a.cmpny_cd,b.biz_cd,IFNULL(b.ship_nm,'')) like concat('%','{$data_list['ship_nm']}','%') #출고처명 필터 
                    AND   IFNULL(a.use_yn,'') like CONCAT('%','{$data_list['use_yn']}','%') #사용여부 필터 
                    ORDER BY b.biz_loc_nm;";

        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_pop_biz_cd($data_list){
        $qry = "SELECT cmpny_cd
                    ,fnc_cd_nm(cmpny_cd,'cmpny_cd') cmpny_nm 
                    ,biz_cd
                    ,biz_nm
                    ,use_yn
                    ,biz_gbn
                    ,remark
                    FROM  tbs_bizinfo 
                    WHERE cmpny_cd like concat('%','{$data_list['cmpny_cd']}','%')
                    AND   biz_cd like concat('%','{$data_list['biz_cd']}','%')  #거래선코드 필터
                    AND   biz_nm like concat('%','{$data_list['biz_nm']}','%') #거래선명  필터
                    AND   use_yn like concat('%','{$data_list['use_yn']}','%') #사용여부 필터
                    AND   biz_gbn like concat('%','{$data_list['biz_gbn']}','%') #사용여부 필터
                    ORDER BY cmpny_cd,biz_cd;";

        exit(json_encode($this->mes_m->query($qry)));
    }


    private function _get_data_ref($param = ''){
        if(isset($param['like'])){
            $biz_cd = isset($param['like']['biz_cd']) ? $param['like']['biz_cd'][0] : '';
            $biz_nm = isset($param['like']['biz_nm']) ? $param['like']['biz_nm'][0] : '';
            $ship_cd = isset($param['like']['ship_cd']) ? $param['like']['ship_cd'][0] : '';
            $ship_nm = isset($param['like']['ship_nm']) ? $param['like']['ship_nm'][0] : '';
        }else{
            $biz_cd = '';
            $biz_nm = '';
            $ship_cd = '';
            $ship_nm = '';
        }
        if(isset($param['where'])){
            $cmpny_cd = isset($param['where']['cmpny_cd']) ? $param['where']['cmpny_cd'] : '';
            $use_yn = isset($param['where']['use_yn']) ? $param['where']['use_yn'] : '';
            $biz_gbn = isset($param['where']['biz_gbn']) ? $param['where']['biz_gbn'] : '';
        }else{
            $cmpny_cd = '';
            $use_yn = '';
            $biz_gbn = '';
        }

        $data_list = [
            "cmpny_cd"=> $cmpny_cd,
            "biz_cd" => $biz_cd,
            "biz_nm" => $biz_nm,
            "ship_cd" => $ship_cd,
            "ship_nm" => $ship_nm,
            "use_yn" => $use_yn,
            "biz_gbn" => $biz_gbn,
        ];

        return $data_list;
    }

    /**
     * 그리드별 테이블 등록
     * @param string $path
     * @return mixed
     */
    private function _get_table($path = ''){
        $tables = [
            'biz_mgt' => ['tbs_bizinfo'],
            'biz_plce_mgt' => ['tbs_bizmrloc'],
            'pop_ship_cd' => [''],
            'pop_biz_cd' => [''],
        ];
        return $tables[$path];
    }
}