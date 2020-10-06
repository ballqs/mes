<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Stck_staus extends CI_Controller
{
    public function get($path = ''){
        $tb = $this->_get_table($path)[0];
        $param = $this->input->get(null, true)['param'];

        $data_list = $this->_get_data_ref($param);

        if($path == 'pop_loc_cd'){
            $this->_get_pop_loc_cd($data_list);
        }elseif ($path == 'stck_staus'){
            $this->_get_stck_staus($data_list);
        }elseif ($path == 'stck_staus_wp'){
            $this->_get_stck_staus_wp($data_list);
        }elseif ($path == 'stck_staus_lot'){
            $this->_get_stck_staus_lot($data_list);
        }elseif($path == 'stck_staus_lot_wp'){
            $this->_get_stck_staus_lot_wp($data_list);
        }

        $data = $this->mes_m->get($tb, $param);
        echo json_encode($data);
    }

    public function save($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];
        $data = $this->mes_m->save($tb, $param);
        echo json_encode($data);
    }

    public function delete($path = ''){
        $tb = $this->_get_table($path);
        $param = $this->input->post(null, true)['param'];
        $result = $this->mes_m->delete($tb, $param);
        echo json_encode($result);
    }

    private function _get_pop_loc_cd($data_list){
        $qry = "SELECT fact_cd
                   ,fnc_cd_nm(fact_cd,'fact_cd') fact_nm
                   ,whs_cd
                   ,fnc_whs_nm(fact_cd,whs_cd) whs_nm
                   ,loc_cd
                   ,loc_nm
                   ,use_yn
                   ,remark
                   FROM  tbm_whslocinfo
                   WHERE fact_cd   like CONCAT('{$data_list['fact_cd']}','%')  #공장코드 필터
                   AND   whs_cd    like CONCAT('%','{$data_list['whs_cd']}','%')  #창고코드 필터
                   AND   fnc_whs_nm(fact_cd,whs_cd)  like CONCAT('%','{$data_list['whs_nm']}','%')  #창고 명 필터
                   AND   loc_cd    like CONCAT('%','{$data_list['loc_cd']}','%')  #공장코드 필터
                   AND   loc_nm    like CONCAT('%','{$data_list['loc_nm']}','%')  #창고코드 필터
                   AND   use_yn    like CONCAT('%','{$data_list['use_yn']}','%'); #사용여부 필터";

        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_stck_staus_wp($data_list){
        $qry = "SELECT a.fact_cd,
                   MAX(fnc_cd_nm(a.fact_cd,'fact_cd')) fact_nm,
                   a.prt_nbr_cd,
                   MAX(b.prt_nbr_nm) prt_nbr_nm,
                   MAX(b.spec) spec,
                   MAX(b.prt_nbr_grp_cd) prt_nbr_grp_cd,
                   fnc_cd_nm(b.prt_nbr_grp_cd,'prt_nbr_grp_cd') prt_nbr_grp_nm,
                   b.account_type,
                   fnc_cd_nm(b.account_type,'account_type') account_type_nm,
                   MAX(a.lotno),
                   MAX(c.ship_nm),
                   a.stck_whs_cd,
                   MAX(fnc_whs_nm(a.fact_cd,a.stck_whs_cd)) stck_whs_nm,
                   a.stck_loc_cd,
                   MAX(fnc_loc_nm(a.fact_cd,a.stck_whs_cd,a.stck_loc_cd)) stck_loc_nm,
                   SUM(a.stck_wait_qty) stck_wait_qty, #검사대기수
                   SUM(a.stck_qty) stck_qty,
                   MAX(a.stck_unit) stck_unit,
                   MAX(fnc_cd_nm(a.stck_unit,'unit_cd')) unit_nm,
                   MAX(IFNULL(b.safe_stck,0)) safe_stck,
                   SUM(a.stck_qty)  - MAX(IFNULL(b.safe_stck,0)) diff
                   FROM   twm_realstck a
                   LEFT OUTER JOIN tbm_prtnbrinfo b on (a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd  )
                   LEFT OUTER JOIN tbs_bizmrloc c ON(a.lotno = c.ship_cd)
                   WHERE  a.fact_cd  like CONCAT('{$data_list['fact_cd']}','%') #공장코드 필터
                   AND    a.prt_nbr_cd like CONCAT('%','{$data_list['prt_nbr_cd']}','%') #품번코드 필터
                   AND    a.stck_whs_cd like CONCAT('%','{$data_list['whs_cd']}','%') #창고코드 필터
                   AND    fnc_whs_nm(a.fact_cd,a.stck_whs_cd) like concat('%','{$data_list['whs_nm']}','%') #창고명 필터
                   AND    a.stck_loc_cd like concat('%','{$data_list['loc_cd']}','%') #위치코드 필터
                   AND    fnc_loc_nm(a.fact_cd,a.stck_whs_cd,a.stck_loc_cd) like concat('%','{$data_list['loc_nm']}','%') #위치명 필터
                   AND    a.lotno like concat('%','{$data_list['ship_cd']}','%')
                   AND    c.ship_nm like concat('%','{$data_list['ship_nm']}','%')
                   AND    b.prt_nbr_grp_cd like concat('%','{$data_list['prt_nbr_grp_cd']}','%')
                   AND    b.account_type like concat('%','{$data_list['account_type']}','%')
                   GROUP BY a.fact_cd, a.prt_nbr_cd, a.stck_whs_cd, a.stck_loc_cd;";

        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_stck_staus($data_list){
        $qry = "SELECT a.fact_cd,
                   MAX(fnc_cd_nm(a.fact_cd,'fact_cd')) fact_nm,
                   a.prt_nbr_cd,
                   MAX(b.prt_nbr_nm) prt_nbr_nm,
                   MAX(b.spec) spec,
                   MAX(b.prt_nbr_grp_cd) prt_nbr_grp_cd,
                   fnc_cd_nm(b.prt_nbr_grp_cd,'prt_nbr_grp_cd') prt_nbr_grp_nm,
                   b.account_type,
                   fnc_cd_nm(b.account_type,'account_type') account_type_nm,
                   MAX(a.lotno),
                   a.stck_whs_cd,
                   MAX(fnc_whs_nm(a.fact_cd,a.stck_whs_cd)) stck_whs_nm,
                   a.stck_loc_cd,
                   MAX(fnc_loc_nm(a.fact_cd,a.stck_whs_cd,a.stck_loc_cd)) stck_loc_nm,
                   SUM(a.stck_wait_qty) stck_wait_qty, #검사대기수
                   SUM(a.stck_qty) stck_qty,
                   MAX(a.stck_unit) stck_unit,
                   MAX(fnc_cd_nm(a.stck_unit,'unit_cd')) unit_nm,
                   MAX(IFNULL(b.safe_stck,0)) safe_stck,
                   SUM(a.stck_qty)  - MAX(IFNULL(b.safe_stck,0)) diff
                   FROM   twm_realstck a
                   left outer join tbm_prtnbrinfo b on (a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd  )
                   WHERE  a.fact_cd  like CONCAT('{$data_list['fact_cd']}','%') #공장코드 필터
                   AND    a.prt_nbr_cd like CONCAT('%','{$data_list['prt_nbr_cd']}','%') #품번코드 필터
                   AND    a.stck_whs_cd like CONCAT('%','{$data_list['whs_cd']}','%') #창고코드 필터
                   AND    fnc_whs_nm(a.fact_cd,a.stck_whs_cd) like concat('%','{$data_list['whs_nm']}','%') #창고명 필터
                   AND    a.stck_loc_cd like concat('%','{$data_list['loc_cd']}','%') #위치코드 필터
                   AND    fnc_loc_nm(a.fact_cd,a.stck_whs_cd,a.stck_loc_cd) like concat('%','{$data_list['loc_nm']}','%') #위치명 필터
                   AND    a.lotno like concat('%','{$data_list['lotno']}','%')
                   AND    b.prt_nbr_grp_cd like concat('%','{$data_list['prt_nbr_grp_cd']}','%')
                   AND    b.account_type like concat('%','{$data_list['account_type']}','%')
                   GROUP BY a.fact_cd, a.prt_nbr_cd, a.stck_whs_cd, a.stck_loc_cd
                   HAVING SUM(a.stck_qty) > 0;";

        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_stck_staus_lot($data_list){
        $qry = "SELECT a.fact_cd,
                     fnc_cd_nm(a.fact_cd,'fact_cd') fact_nm,
                     a.prt_nbr_cd,
                     b.prt_nbr_nm,
                     b.spec,
                     b.prt_nbr_grp_cd,
                     fnc_cd_nm(b.prt_nbr_grp_cd,'prt_nbr_grp_cd') prt_nbr_grp_nm,
                     b.account_type,
                     fnc_cd_nm(b.account_type,'account_type') account_type_nm,
                     a.lotno,
                     a.stck_whs_cd,
                     fnc_whs_nm(a.fact_cd,a.stck_whs_cd) stck_whs_nm,
                     a.stck_loc_cd,
                     fnc_loc_nm(a.fact_cd,a.stck_whs_cd,a.stck_loc_cd) stck_loc_nm,
                     a.stck_wait_qty, #검사대기수
                     a.stck_qty,
                     a.stck_unit,
                     fnc_cd_nm(a.stck_unit,'unit_cd') unit_nm
                     FROM   twm_realstck a
                     left outer join tbm_prtnbrinfo b on (a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd  )
                     WHERE  a.fact_cd  like CONCAT('{$data_list['fact_cd']}','%') #공장코드 필터
                     AND    a.prt_nbr_cd like CONCAT('%','{$data_list['prt_nbr_cd']}','%') #품번코드 필터
                     AND    a.stck_whs_cd like CONCAT('%','{$data_list['whs_cd']}','%') #창고코드 필터
                     AND    fnc_whs_nm(a.fact_cd,a.stck_whs_cd) like concat('%','{$data_list['whs_nm']}','%') #창고명 필터
                     AND    a.stck_loc_cd like concat('%','{$data_list['loc_cd']}','%') #위치코드 필터
                     AND    fnc_loc_nm(a.fact_cd,a.stck_whs_cd,a.stck_loc_cd) like concat('%','{$data_list['loc_nm']}','%') #위치명 필터
                     AND    a.lotno like CONCAT('%','{$data_list['lotno']}','%')
                     AND    b.prt_nbr_grp_cd like concat('%','{$data_list['prt_nbr_grp_cd']}','%')
                     AND    b.account_type like concat('%','{$data_list['account_type']}','%')
                     AND    a.stck_qty > 0;";

        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_stck_staus_lot_wp($data_list){
        $qry = "SELECT a.fact_cd,
                fnc_cd_nm(a.fact_cd,'fact_cd') fact_nm,
                a.prt_nbr_cd,
                b.prt_nbr_nm,
                b.spec,
                b.prt_nbr_grp_cd,
                fnc_cd_nm(b.prt_nbr_grp_cd,'prt_nbr_grp_cd') prt_nbr_grp_nm,
                b.account_type,
                fnc_cd_nm(b.account_type,'account_type') account_type_nm,
                #a.lotno,
                c.biz_cd,
                fnc_biz_nm((SELECT MAX(cd) FROM tbc_codeinfo WHERE up_cd = 'cmpny_cd'), c.biz_cd) biz_nm,
                a.lotno as ship_cd,
                IFNULL(c.ship_nm,'*') as ship_nm,
                a.stck_whs_cd,
                fnc_whs_nm(a.fact_cd,a.stck_whs_cd) stck_whs_nm,
                a.stck_loc_cd,
                fnc_loc_nm(a.fact_cd,a.stck_whs_cd,a.stck_loc_cd) stck_loc_nm,
                a.stck_wait_qty, #검사대기수
                a.stck_qty,
                a.stck_unit,
                fnc_cd_nm(a.stck_unit,'unit_cd') unit_nm
                FROM   twm_realstck a
                left outer join tbm_prtnbrinfo b on (a.fact_cd = b.fact_cd AND a.prt_nbr_cd = b.prt_nbr_cd  )
                LEFT OUTER JOIN tbs_bizmrloc c ON(a.lotno = c.ship_cd)
                WHERE  a.fact_cd  like CONCAT('{$data_list['fact_cd']}','%') #공장코드 필터
                AND    a.prt_nbr_cd like CONCAT('%','{$data_list['prt_nbr_cd']}','%') #품번코드 필터
                AND    b.prt_nbr_nm like CONCAT('%','{$data_list['prt_nbr_nm']}','%') #품번명 필터
                AND    a.stck_whs_cd like CONCAT('%','{$data_list['whs_cd']}','%') #창고코드 필터
                AND    fnc_whs_nm(a.fact_cd,a.stck_whs_cd) like concat('%','{$data_list['whs_nm']}','%') #창고명 필터
                AND    a.stck_loc_cd like concat('%','{$data_list['loc_cd']}','%') #위치코드 필터
                AND    fnc_loc_nm(a.fact_cd,a.stck_whs_cd,a.stck_loc_cd) like concat('%','{$data_list['stck_loc_nm']}','%') #위치명 필터
                AND    a.lotno like CONCAT('%','{$data_list['ship_cd']}','%') #출고처현장코드 필터
                AND    IFNULL(c.ship_nm,'*') like CONCAT('%','{$data_list['ship_nm']}','%') #출고처현장명 필터
                AND    b.prt_nbr_grp_cd like concat('%','{$data_list['prt_nbr_grp_cd']}','%')
                AND    b.account_type like concat('%','{$data_list['account_type']}','%');";
        exit(json_encode($this->mes_m->query($qry)));
    }

    private function _get_data_ref($param = ''){
//        if(isset($param['like'])){
        $prt_nbr_cd = isset($param['like']['prt_nbr_cd']) ? $param['like']['prt_nbr_cd'][0] : '';
        $whs_cd = isset($param['like']['whs_cd']) ? $param['like']['whs_cd'][0] : '';
        $whs_nm = isset($param['like']['whs_nm']) ? $param['like']['whs_nm'][0] : '';
        $loc_cd = isset($param['like']['loc_cd']) ? $param['like']['loc_cd'][0] : '';
        $loc_nm = isset($param['like']['loc_nm']) ? $param['like']['loc_nm'][0] : '';
        $ship_cd = isset($param['like']['ship_cd']) ? $param['like']['ship_cd'][0] : '';
        $ship_nm = isset($param['like']['ship_nm']) ? $param['like']['ship_nm'][0] : '';
        $lotno = isset($param['like']['lotno']) ? $param['like']['lotno'][0] : '';
//        }else{
//            $prt_nbr_cd = '';
//            $whs_cd = '';
//            $whs_nm = '';
//            $loc_cd = '';
//            $loc_nm = '';
//            $ship_cd = '';
//            $ship_nm = '';
//        }
//        if(isset($param['where'])){
        $use_yn = isset($param['where']['use_yn']) ? $param['where']['use_yn'] : '';
        $fact_cd = isset($param['where']['fact_cd']) ? $param['where']['fact_cd'] : '';
        $prt_nbr_grp_cd = isset($param['where']['prt_nbr_grp_cd']) ? $param['where']['prt_nbr_grp_cd'] : '';
        $account_type = isset($param['where']['account_type']) ? $param['where']['account_type'] : '';
//        }else{
//            $use_yn = '';
//        }

        $data_list = [
            "prt_nbr_cd"  => $prt_nbr_cd,
            "whs_cd" => $whs_cd,
            "whs_nm" => $whs_nm,
            "loc_cd" => $loc_cd,
            "loc_nm" => $loc_nm,
            "use_yn" => $use_yn,
            "ship_cd" => $ship_cd,
            "ship_nm" => $ship_nm,
            "fact_cd" => $fact_cd,
            "lotno" => $lotno,
            "prt_nbr_grp_cd" => $prt_nbr_grp_cd,
            "account_type" => $account_type,
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
            'stck_staus' => ['twm_realstck'],
            'stck_staus_lot' => ['twm_realstck'],
            'stck_staus_lot_wp' => [''],
            'pop_loc_cd' => [''],
        ];
        return $tables[$path];
    }
}
