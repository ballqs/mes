<div style="display:none;" id="popup_wrkctr_orderno_result" class="popPage">
    <form id="popup_wrkctr_orderno_result_frm" name="popup_wrkctr_orderno_result_frm" class="popForm">
        <input type="hidden" class="hidden_fact_cd" name="hidden_fact_cd" value="">
        <input type="hidden" class="hidden_wrkr_cd" name="hidden_wrkr_cd" value="">
        <input type="hidden" class="hidden_wrk_ordr_no" name="hidden_wrk_ordr_no" value="">
        <input type="hidden" name="per_page" value="6">
        <input type="hidden" name="page" value="1">
        <input type="hidden" name="arrow_type" value="">
        <input type="hidden" name="err_cd" value="">
        <div class="tablet">
            <div class="topWrap cf">
                <div class="arrow" data-arrow="left"><a><span></span></a></div>
                <div class="title">실적등록</div>
                <div class="arrow arrowR" data-arrow="right"><a><span></span></a></div>
            </div>

            <div class="btnDiv cf">
<!--                <div style="display:;"><a class="open_popup_btn opBtn" id="popup_wrkctr_orderno_result_sch_btn" data-name="sch">실적현황조회</a></div>-->
<!--                <div><a class="open_popup_btn opBtn" data-name="">재발행</a></div>-->
                <div><a class="open_popup_btn opBtn" data-name="cfm">등록</a></div>
                <div><a class="open_popup_btn opBtn" data-name="cls">닫기</a></div>
                <div><a class="open_popup_btn opBtn" data-name="tmp_bad_status">불량내역조회</a></div>
                <div><a class="open_popup_btn opBtn" data-name="init_bad">불량초기화</a></div>
            </div>

            <div class="mb_10">
                <div class="viewLine cf" style="border-bottom:0;">
                    <div class="view cf">
                        <div>작업장</div><input class="fInput hidden_wrkctr_cd" name="wrkctr_cd" value="" readOnly><input class="sInput hidden_wrkctr_nm" value="" readOnly>
                    </div>
                    <div class="view cf">
                        <div>생산품번</div><input class="fInput hidden_prtnbr_cd" name="hidden_prtnbr_cd" value="" readOnly><input class="sInput hidden_prtnbr_nm" value="" readOnly>
                    </div>
                </div>
                <div class="fourLine cf" style="border-bottom:0;">
                    <div class="view cf">
                        <div id="tetete">생산총수량</div><input class="fullInput hidden_sum_prct_qty text_r" name="hidden_sum_prct_qty" value="" readOnly>
                    </div>
                    <div class="view cf">
                        <div>실적수량</div><input class="fullInput hidden_sum_res_qty text_r" name="hidden_sum_res_qty" value="" readOnly>
                    </div>
                    <div class="view cf">
                        <div>미입고수량</div><input class="fullInput text_r" value="" readOnly>
                    </div>
                    <div class="view cf">
                        <div>계획수량</div><input class="fullInput hidden_ordr_qty text_r" value="" readOnly>
                    </div>
                </div>
                <div class="threeLine cf">
                    <div class="view cf">
                        <div>총입고수량</div><input class="fullInput hidden_sum_in_qty text_r" name="hidden_sum_in_qty" value="" readOnly>
                    </div>
                    <div class="view cf">
                        <div>LOT 사이즈</div><input class="fullInput hidden_lot_size text_r" value="" readOnly>
                    </div>
                    <div class="view cf">
                        <div>박스수량</div><input class="fullInput text_r" value="" readOnly>
                    </div>
                </div>
            </div>
            <div class="grid3 active" id="tab1">
                <table class="gridTable" id="orderno_result_table" style="margin-bottom:10px; height:100px;">
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <div class="text_r">0</div>
                            </td>
                            <td><input class="text_r" type="text" name="orderno_result" value="0" readonly></td>
                            <td><input class="text_r" type="text" name="prd_good_qty" value="0"></td>
                            <td>
<!--                                <span class="err_qty text_r">0</span>-->
<!--                                <input type="hidden" class="err_qty text_r" name="err_qty" value="0">-->
                                <input type="text" class="err_qty text_r" name="err_qty" value="0" readonly>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p style="font-size:0.9em;">*소재투입정보</p>
                <table class="gridTable" id="inserted_materials_table" style="height:calc(100% - 120px);">
                    <thead>
                    <tr>
                        <th>품번코드</th>
                        <th>품번명</th>
                        <th>투입량</th>
                        <th>기준수량</th>
                        <th>기준단위</th>
                        <th>하위구성수량</th>
                        <th>하위구성단위</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>

    </form>
</div>
<?php
// 불량 코드 팝업
$this->load->view("popups/popup_wrkctr_bad_reason.php");
// 불량 내역 조회 팝업
$this->load->view("popups/popup_tmp_bad_status.php");
?>
<script>
    var orderno_result_data = {};
</script>
<script type="module" src="/include/js/popups/popup_wrkctr_orderno_result.js"></script>
