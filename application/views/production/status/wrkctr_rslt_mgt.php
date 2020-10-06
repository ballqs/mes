<link rel="stylesheet" href="/include/css/tablet.css">
<style>
    .blink_btn {background: #7ad14b !important;}
    .blink_msg {color: #fff !important;}
</style>

<?php
//            echo '<xmp>';
//print_r($header_btns);
//echo count($header_btns);
//            echo '</xmp>';

?>
<?php
//$i = 0;
//foreach ($header_btns as $key => $value) {
//    $remark = json_decode($value->remark);
//    echo '<br>'.$i++.' : ';print_r($remark);
//}
?>

<!--<div class="tabletMain" id="tableMain">-->
<!--    <form id="tabletMain" name="tabletMain">-->
<div class="tabletMain" id="tableMain">
    <form id="tabletMain" name="tabletMain">
        <input type="hidden" name="page" value="1">
        <input type="hidden" name="per_page" value="7">
        <input type="hidden" name="search_type" value="">
        <input type="hidden" name="arrow_type" value="">
        <input type="hidden" name="selected_wrkctr_cd" value="">
        <input type="hidden" name="selected_wrkr_cd" value="">
        <input type="hidden" name="set_interval_flag" value="T">
        <input type="hidden" name="stop_cd" value="">
        <input type="hidden" class="hidden_str_tm" name="str_tm" value="">
        <div class="topWrap cf">

            <div class="arrow" data-arrow="left"><a><span></span></a></div>
            <div class="title">현장단말</div>
            <div class="arrow arrowR" data-arrow="right"><a><span></span></a></div>
        </div>

        <div class="mb_10">
            <div class="viewLine cf" style="border-bottom:0;">
                <div class="view cf">
                    <div>공장 / 작업장</div>
                    <select class="fInput" name="fact_cd">
                        <?php foreach ($fact_cd as $key => $value) { ?>
                            <option value="<?php echo $value->cd; ?>"><?php echo $value->cd_nm; ?></option>
                        <?php } ?>
                    </select>
<!--                    <input class="fInput" value="ALT01" readOnly>-->
                    <input class="sInput hidden_wrkctr_nm" value="" readOnly>
                </div>
                <div class="view cf">
                    <div>선택 품번</div><input class="fInput hidden_prtnbr_cd" name="hidden_prtnbr_cd" readOnly><input class="sInput hidden_prtnbr_nm" name="hidden_prtnbr_nm" readOnly>
                </div>
            </div>
            <div class="viewLine cf">
                <div class="view cf">
                    <div>생산 작업자</div><input class="fInput hidden_main_wrkr_nm" readOnly><input class="fInput hidden_main_wrkr" type="hidden"><input class="sInput hidden_wrkr_qty" readOnly>
                </div>
                <div class="view cf">
                    <div>제품</div><input class="fInput" readOnly><input class="sInput" readOnly>
                </div>
            </div>
        </div>
    </form>
    <div class="grid1">
        <?php // print_r($this->db); ?>
    	<table class="gridTable" id="wrkctrlist_tbl">
    		<thead>
    			<tr>
    				<th>작업장코드</th>
    				<th>작업장명</th>
    				<th>상태</th>
    				<th>시간</th>
    				<th>품번</th>
    				<th>품명</th>
    				<th class="w10">생산목표</th>
    				<th class="w10">생산실적</th>
    				<th class="w10">양품</th>
    				<th class="w10">불량</th>
    				<th class="w10">구분</th>
                    <th style="display:none;">주작업자</th>
                    <th style="display:none;">인원</th>
    			</tr>
    		</thead>
    		<tbody>
<!--    			<tr>-->
<!--    				<td>ALT07</td>-->
<!--    				<td>자동선반7</td>-->
<!--    				<td>비가동</td>-->
<!--    				<td>2020-06-30<br>17:50:03</td>-->
<!--    				<td>48645-2H000-ALT</td>-->
<!--    				<td>GUIDE-INLET<br>	VALVE 자동선반</td>-->
<!--    				<td>1125</td>-->
<!--    				<td>1125</td>-->
<!--    				<td>0</td>-->
<!--    				<td>0</td>-->
<!--    				<td>일반</td>-->
<!--    			</tr>-->
    		</tbody>
    	</table>

    </div>
    <div class="btnDiv cf">

        <?php foreach ($header_btns as $key => $value) { ?>
            <?php $remark = json_decode($value->remark); ?>
            <div><a class="open_popup_btn" pop_name="<?php echo isset($remark->popup_id) ? $remark->popup_id : ''; ?>" id="<?php echo 'tBtn_'.$value->btn_id;?>"><?=$value->btn_nm?></a> </div>
        <?php } ?>
<!--    	<div><a class="open_popup_btn" pop_name="popup_sel_wrkctr">작업장 선택</a></div>-->
<!--    	<div><a class="open_popup_btn" pop_name="popup_sel_wrkctr_wrkr">작업자 선택</a></div>-->
<!--    	<div><a class="open_popup_btn" pop_name="popup_sel_wrkctr_orderno">작업지시 선택</a></div>-->
<!--    	<div><a class="open_popup_btn" pop_name="">가동/비가동</a></div>-->
<!--    	<div><a class="open_popup_btn" pop_name="popup_wrkctr_input_material">소재투입</a></div>-->
<!--    	<div><a class="open_popup_btn" pop_name="popup_wrkctr_orderno_result">실적등록</a></div>-->
<!--    	<div><a class="open_popup_btn" pop_name="popup_wrkctr_stop_reason">비가동사유</a></div>-->
<!--    	<div><a class="open_popup_btn" pop_name="popup_wrkctr_bad_reason">불량등록</a></div>-->
<!--    	<div><a class="open_popup_btn" pop_name="">지시완료</a></div>-->
<!--    	<div><a class="open_popup_btn" pop_name="">작업완료</a></div>-->
        <?php if($this->session->userdata('device') == 'tablet'){ ?>
    	<div><a class="open_popup_btn" pop_name="wrkctr_logout_btn" href="/login/logout">닫기</a></div>
        <?php } ?>
    </div>
    <div class="noticeFooter">
    	<div class="notice">알림</div>
    	<div class="cont"></div>
    	<div class="network"><small>네트워크 상태.</small>정상</div>
    </div>
</div>
<script>
    var action_btn = '';
</script>
<script src="/include/js/popups/popup_wrkctr_common.js"></script>
<script type="module" src="/include/js/popups/popup_wrkctr.js"></script>
<script type="module" src="/include/js/production/status/wrkctr_rslt_mgt.js"></script>
