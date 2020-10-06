<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Quality extends CI_Controller
{
    public function get($path = ''){

        $join = null;
        $tb = $this->_get_table($path)[0];

        $param = $this->input->get(null, true)['param'];

        $data_list = $this->_get_data_ref($param);
        // $data = $this->mes_m->get($tb, $param);

        if ($path == 'inpct_cod_mgt') {
            $this->_get_inpct_cod_mgt($data_list);
        }else if($path == 'part_nbr_inpct_code_mgt'){
            $this->_get_part_nbr_inpct_code_mgt($data_list);
        }else if($path == 'pnic_mgt2'){
            $this->_get_pnic_mgt2($param);
        }
        else if($path == 'pop_inpct_cd'){
            $this->_get_pop_inpct_cd($data_list);
        }


        if ($join == null) $data = $this->mes_m->get($tb, $param);
        else $data = $this->mes_m->get($tb, $param, $join);

        $data->getparam = $this->input->get();
//        $data->path = preg_replace("'\/[^/]*\.php$'i", "/", $_SERVER['PHP_SELF']);
        $data->path = 'path : '.$this->mes_m->get_p();

        echo json_encode($data);
    }

    private  function _get_part_nbr_inpct_code_mgt($data_list = []){
        $qry = "SELECT  * , (SELECT COUNT(b.prt_nbr_cd) FROM tbq_prtnbrinspct b WHERE a.prt_nbr_cd = b.prt_nbr_cd) AS inspct_count
                FROM   tbm_prtnbrinfo a
                WHERE a.fact_cd  like concat('%','{$data_list['fact_cd']}','%')  #공장코드 필터
                AND a.prt_nbr_cd LIKE CONCAT('%','{$data_list['prt_nbr_cd']}','%')
                AND a.prt_nbr_nm LIKE CONCAT('%','{$data_list['prt_nbr_nm']}','%');
                ";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_pnic_mgt2($param){



        $result = $this->mes_m->get_response_data_form();
        $qry = "SELECT a.* 
                ,'{$param['where']['prt_nbr_nm']}' AS prt_nbr_nm
                ,b.inspct_nm AS inspct_nm
                ,b.inspct_stdrd_type AS inspct_stdrd_type
                FROM tbq_prtnbrinspct a
                LEFT JOIN tbq_inspctiteminfo b ON a.inspct_cd = b.inspct_cd
                WHERE a.fact_cd = '{$param['where']['fact_cd']}'
                AND a.prt_nbr_cd = '{$param['where']['prt_nbr_cd']}'
                ORDER BY inspct_seq;
                ";
        $result->data = $this->db->query($qry)->result();
        try {
            $result->qry = $this->db->last_query();
            $result->result = true;
            $result->msg = "조회되었습니다.";
        } catch (Exception $e) {
            $result->result = false;
            $result->msg = "조회에 실패했습니다.";
        }
        exit(json_encode($result));
    }


    private  function _get_inpct_cod_mgt($data_list = []){
        $qry = "SELECT  *
                    FROM   tbq_inspctiteminfo
                    WHERE fact_cd  like concat('%','{$data_list['fact_cd']}','%')  #공장코드 필터
                    AND   inspct_cd    like concat('%','{$data_list['inspct_cd']}','%')  #공정 코드 필터
                    AND   inspct_nm    like concat('%','{$data_list['inspct_nm']}','%')  #공정명 필터
                ";
        exit(json_encode($this->mes_m->query($qry)));
    }
    private  function _get_pop_inpct_cd($data_list = []){
        $qry = "SELECT  *
                          ,fnc_cd_nm(fact_cd,'fact_cd') fact_nm
                    FROM  tbq_inspctiteminfo 
                    WHERE fact_cd  like concat('%','{$data_list['fact_cd']}','%')  #공장코드 필터
                    AND   inspct_cd    like concat('%','{$data_list['inspct_cd']}','%')  #공정 코드 필터
                    AND   inspct_nm    like concat('%','{$data_list['inspct_nm']}','%')  #공정명 필터
                    AND   use_yn like concat('%','{$data_list['use_yn']}','%'); #사용여부 필터";
        exit(json_encode($this->mes_m->query($qry)));
    }





    public function save($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];



        if ($tb[0] == 'tbq_inspctiteminfo' && $path ='inpct_cod_mgt') {
            $Temp_Value = $this->_get_max_inspct_cd();
            for($i=0; $i<count($param[0]) ; $i++){

                if($param[0][$i]['use_yn'] == false) {
                    $param[0][$i]['use_yn'] = 'N';
                }

                if($param[0][$i]["inspct_cd"]== null | $param[0][$i]["inspct_cd"] == "") {
                    $param[0][$i]["inspct_cd"] = "INQ-" . str_pad(
                            $Temp_Value, 4, "0", STR_PAD_LEFT);

                    $Temp_Value++;
                }
            }
        }else if( $path == "part_nbr_inpct_code_mgt"){
                $count = 1;
            for($i= 0 ; $i< sizeof($param[0]); $i++){


                if(array_key_exists('inspct_seq', $param[0][$i])){
                    $param[0][$i]['inspct_seq'] = $count++;
                    unset($param[0][$i]['prt_nbr_nm']);
                    unset($param[0][$i]['inspct_nm']);
                    unset($param[0][$i]['inspct_stdrd_type']);
                    unset($param[0][$i]['recid']);
                    if($param[0][$i]['use_yn'] == false){
                        $param[0][$i]['use_yn'] = 'N';
                    }else{
                        $param[0][$i]['use_yn'] = 'Y';
                    }

                }else{
                    unset($param[0][$i]);
                }

            }
        }



        $data = $this->mes_m->save($tb, $param);
        echo json_encode($data);
    }





    private function _get_max_inspct_cd(){
        $qry = "select fnc_get_inspctcd() inspct_cd;";
        return $this->mes_m->query($qry)->data[0]->inspct_cd;
    }

    public function delete($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];



        $result = $this->mes_m->delete($tb, $param);
        echo json_encode($result);

    }


    private function del_part_nbr_inpct_code_mgt($param){

        $result = $this->mes_m->get_response_data_form();
        $data= [];

        for($i =0; $i <sizeof($param); $i++) {
            $qry = "DELETE FROM tbq_prtnbrinspct 
                    WHERE prt_nbr_cd = '{$param[$i]['prt_nbr_cd']}'
                    AND inspct_seq = '{$param[$i]['inspct_seq']}';
                    ";

            $this->mes_m->query($qry);

            $data.array_push($qry);

        }


        exit((json_encode($data)));
      //   exit((json_encode(sizeof($param))));
    }

    private function _get_data_ref($param = ''){
        if(isset($param['like'])) {
            $fact_cd = isset($param['like']['fact_cd']) ? $param['like']['fact_cd'][0] : '';
            $inspct_cd = isset($param['like']['inspct_cd']) ? $param['like']['inspct_cd'][0] : '';
            $inspct_nm = isset($param['like']['inspct_nm']) ? $param['like']['inspct_nm'][0] : '';
            $prt_nbr_cd = isset($param['like']['prt_nbr_cd']) ? $param['like']['prt_nbr_cd'][0] : '';
            $prt_nbr_nm = isset($param['like']['prt_nbr_nm']) ? $param['like']['prt_nbr_nm'][0] : '';

        }else {
            $fact_cd = '';
            $inspct_cd ='';
            $inspct_nm ='';
            $prt_nbr_cd = '';
            $prt_nbr_nm = '';
        }
        if(isset($param['where'])){
            $fact_cd = isset($param['where']['fact_cd']) ? $param['where']['fact_cd'] : '';
            $prt_nbr_grp_cd = isset($param['where']['prt_nbr_grp_cd']) ? $param['where']['prt_nbr_grp_cd'] : '';
            $use_yn = isset($param['where']['use_yn']) ? $param['where']['use_yn'] : '';
            $inspct_cd = isset($param['where']['inspct_cd']) ? $param['where']['inspct_cd'] : '';
            $inspct_nm = isset($param['where']['inspct_nm']) ? $param['where']['inspct_nm'] : '';

        }else{
            $fact_cd = '';
            $use_yn = '';
            $inspct_cd = '';
            $inspct_nm = '';
            $prt_nbr_grp_cd = '';
        }

        $data_list = [
            "use_yn" => $use_yn,
            "inspct_cd" => $inspct_cd,
            "inspct_nm" => $inspct_nm,
            "fact_cd" => $fact_cd,
            "prt_nbr_cd" => $prt_nbr_cd,
            "prt_nbr_nm" => $prt_nbr_nm,

        ];

        return $data_list;
    }


    private function _get_table($path = ''){
        $tables = [
            'inpct_code_mgt' => ['tbq_inspctiteminfo'],
            'part_nbr_inpct_code_mgt' => ['tbq_prtnbrinspct'],
            'pnic_mgt2' => ['tbq_prtnbrinspct']
        ];
        return $tables[$path];
    }


}