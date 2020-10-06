<div style="display:none;" id="popup_wrkctr_input_material" class="popPage">
    <form id="popup_wrkctr_input_material_frm" name="popup_wrkctr_input_material_frm" class="popForm">
        <input type="hidden" class="hidden_fact_cd" name="hidden_fact_cd" value="">
        <input type="hidden" class="hidden_wrkr_cd" name="hidden_wrkr_cd" value="">
        <input type="hidden" class="hidden_wrk_ordr_no" name="hidden_wrk_ordr_no" value="">
        <input type="hidden" name="page_for_lot" value="1">
        <input type="hidden" name="page_for_prt" value="1">
        <input type="hidden" name="per_page" value="10">
        <input type="hidden" name="search_type" value="lot">
        <input type="hidden" name="arrow_type" value="">

        <div class="tablet">
            <div class="topWrap cf">
                <div class="arrow" data-arrow="left"><a><span></span></a></div>
                <div class="title">소재투입</div>
                <div class="arrow arrowR" data-arrow="right"><a><span></span></a></div>
            </div>

            <div class="btnDiv cf">
<!--                <div><a class="open_popup_btn opBtn" data-name="manual">수동 투입</a></div>-->
                <div><a class="open_popup_btn opBtn" data-name="init">조회</a></div>
                <div><a class="open_popup_btn opBtn" data-name="cfm">투입</a></div>
                <div><a class="open_popup_btn opBtn" data-name="cls">닫기</a></div>
            </div>

            <div class="mb_10">
                <div class="viewLine cf" style="border-bottom:0;">
                    <div class="view cf">
                        <div>작업 라인</div><input class="fInput hidden_wrkctr_cd" name="wrkctr_cd" readOnly><input class="sInput hidden_wrkctr_nm" readOnly>
                    </div>
                    <div class="view cf">
                        <div>작업 품번</div><input class="fInput hidden_prtnbr_cd" name="hidden_prtnbr_cd" readOnly><input class="sInput hidden_prtnbr_nm" name="hidden_prtnbr_nm" readOnly>
                    </div>
                </div>
                <div class="threeLine cf">
                    <div class="view cf">
                        <div>투입 LOT</div><input class="fullInput" name="lotno" value="" readOnly>
                    </div>
                    <div class="view cf">
                        <div>위치 정보</div><input class="fullInput" name="loc_cd" value="" readOnly>
                    </div>
                    <div class="view cf">
                        <div>중량/대차</div><input class="fInput" value="" readOnly><input class="sInput" value="" readOnly>
                    </div>
                </div>
            </div>
            <div class="tabTitle cf">
                <div class="active" data-search-type="lot"><a>LOT별</a></div>
                <div data-search-type="prt"><a>품번별</a></div>
            </div>
            <div class="grid3 tabCont active">
                <table class="gridTable" id="table_lot">
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>LOTNO</th>
<!--                            <th>LOT단위</th>-->
                            <th>투입품번</th>
<!--                            <th>수량</th>-->
<!--                            <th>단위</th>-->
<!--                            <th>창고정보</th>-->
<!--                            <th>위치정보</th>-->
                            <th>재고수량</th>
                            <th>단위</th>
                        </tr>
                    </thead>
                    <tbody>
<!--                        <tr>-->
<!--                            <td>ALT01</td>-->
<!--                            <td>자동선반1</td>-->
<!--                            <td>비가동</td>-->
<!--                            <td>2020-06-30<br>17:50:03</td>-->
<!--                            <td>48645-2H000-ALT</td>-->
<!--                            <td>GUIDE-INLET<br>	VALVE 자동선반</td>-->
<!--                            <td>1125</td>-->
<!--                            <td>1125</td>-->
<!--                            <td>0</td>-->
<!--                            <td>0</td>-->
<!--                            <td>일반</td>-->
<!--                        </tr>-->

                    </tbody>
                </table>
            </div>
            <div class="grid3 tabCont">
                <table class="gridTable" id="table_prt">
                    <thead>
                        <tr>
                            <th>투입품번</th>
<!--                            <th>LOTNO</th>-->
<!--                            <th>LOT단위</th>-->
                            <th>수량</th>
<!--                            <th>단위</th>-->
<!--                            <th>창고정보</th>-->
<!--                            <th>위치정보</th>-->
<!--                            <th>재고수량</th>-->
                            <th>재고단위</th>
                        </tr>
                    </thead>
                    <tbody>
<!--                        <tr>-->
<!--                            <td>ALT01</td>-->
<!--                            <td>자동선반1</td>-->
<!--                            <td>비가동</td>-->
<!--                            <td>2020-06-30<br>17:50:03</td>-->
<!--                            <td>48645-2H000-ALT</td>-->
<!--                            <td>GUIDE-INLET<br>	VALVE 자동선반</td>-->
<!--                            <td>1125</td>-->
<!--                            <td>1125</td>-->
<!--                            <td>0</td>-->
<!--                            <td>0</td>-->
<!--                            <td>일반</td>-->
<!--                        </tr>-->

                    </tbody>
                </table>
            </div>

        </div>
    </form>
</div>

<script type="module" src="/include/js/popups/popup_wrkctr_input_material.js"></script>
