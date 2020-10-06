
<div style="display:none;" id="popup_sel_wrkctr_orderno" class="popPage">
    <form id="popup_sel_wrkctr_orderno_frm" name="popup_sel_wrkctr_orderno_frm" class="popForm">
        <input type="hidden" class="hidden_fact_cd" name="hidden_fact_cd" value="">
        <input type="hidden" class="hidden_wrkr_cd" name="hidden_wrkr_cd" value="">
        <input type="hidden" class="hidden_wrk_ordr_no" name="hidden_wrk_ordr_no" value="">
        <input type="hidden" class="hidden_wrk_ordr_no_for_save" name="hidden_wrk_ordr_no_for_save" value="">
        <input type="hidden" name="page_for_all" value="1">
        <input type="hidden" name="page_for_day" value="1">
        <input type="hidden" name="page_for_night" value="1">
        <input type="hidden" name="per_page" value="10">
        <input type="hidden" name="search_type" value="">
        <input type="hidden" name="arrow_type" value="">

        <div class="tablet">
            <div class="topWrap cf">
                <div class="arrow" data-arrow="left"><a><span></span></a></div>
                <div class="title">작업지시선택</div>
                <div class="arrow arrowR" data-arrow="right"><a><span></span></a></div>
            </div>

            <div class="btnDiv cf">
                <div><a class="open_popup_btn opBtn" data-name="init">선택초기화</a></div>
                <div><a class="open_popup_btn opBtn" data-name="cfm">등록</a></div>
                <div><a class="open_popup_btn opBtn" data-name="cls">닫기</a></div>
            </div>

            <div class="mb_10">
                <div class="viewLine cf">
                    <div class="view cf">
                        <div>작업장</div><input class="fInput hidden_wrkctr_cd" name="wrkctr_cd" readOnly><input class="sInput hidden_wrkctr_nm" readOnly>
                    </div>
                    <div class="view cf">
                        <div>계획일자</div>
                        <div class="viewDate">
                            <input type="date" name="plan_date" class="fInput text_c" value="<?php echo date("Y-m-d"); ?>" readOnly><div class="dateBtn"><span class="arrowU"></span><span class="arrowD"></span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tabTitle cf">
                <div class="active" id="sel_wrkctr_orderno_search_all" data-daynight=""><a>전체</a></div>
                <div data-daynight="D"><a>주간</a></div>
                <div data-daynight="N"><a>야간</a></div>
            </div>
            <div class="grid5 tabCont active" id="tab1">
                <table class="gridTable" id="daynight_all">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>주야</th>
                            <th>품번</th>
                            <th>품명</th>
                            <th class="w10">생산목표</th>
                            <th class="w10">양품</th>
                            <th class="w10">불량</th>
                            <th class="w10">진도율(%)</th>
                            <th class="w10">PPM</th>
                        </tr>
                    </thead>
                    <tbody>
<!--                        <tr>-->
<!--                            <td>1</td>-->
<!--                            <td>45943-3B001-1-BC</td>-->
<!--                            <td>45943-3B001-1 SHAFT- MANUAL GEN1 브로치</td>-->
<!--                            <td>외관</td>-->
<!--                            <td>녹</td>-->
<!--                            <td>2</td>-->
<!--                            <td>이원근</td>-->
<!--                            <td>2020-08-05 14:09:23</td>-->
<!--                            <td>2020-08-05 14:09:23</td>-->
<!--                            <td>2020-08-05 14:09:23</td>-->
<!--                        </tr>-->
                    </tbody>
                </table>
            </div>
            <div class="grid5 tabCont" id="tab2">
                <table class="gridTable" id="daynight_day">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>주야</th>
                            <th>품번</th>
                            <th>품명</th>
                            <th>생산목표</th>
                            <th>양품</th>
                            <th>불량</th>
                            <th>진도율(%)</th>
                            <th>PPM</th>
                        </tr>
                    </thead>
                    <tbody>
<!--                        <tr>-->
<!--                            <td>2</td>-->
<!--                            <td>45943-3B001-1-BC</td>-->
<!--                            <td>45943-3B001-1 SHAFT- MANUAL GEN1 브로치</td>-->
<!--                            <td>외관</td>-->
<!--                            <td>녹</td>-->
<!--                            <td>2</td>-->
<!--                            <td>이원근</td>-->
<!--                            <td>2020-08-05 14:09:23</td>-->
<!--                            <td>2020-08-05 14:09:23</td>-->
<!--                            <td>2020-08-05 14:09:23</td>-->
<!--                        </tr>-->
                    </tbody>
                </table>
            </div>
            <div class="grid5 tabCont" id="tab3">
                <table class="gridTable" id="daynight_night">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>주야</th>
                            <th>품번</th>
                            <th>품명</th>
                            <th>생산목표</th>
                            <th>양품</th>
                            <th>불량</th>
                            <th>진도율(%)</th>
                            <th>PPM</th>
                        </tr>
                    </thead>
                    <tbody>
<!--                        <tr>-->
<!--                            <td>3</td>-->
<!--                            <td>45943-3B001-1-BC</td>-->
<!--                            <td>45943-3B001-1 SHAFT- MANUAL GEN1 브로치</td>-->
<!--                            <td>외관</td>-->
<!--                            <td>녹</td>-->
<!--                            <td>2</td>-->
<!--                            <td>이원근</td>-->
<!--                            <td>2020-08-05 14:09:23</td>-->
<!--                            <td>2020-08-05 14:09:23</td>-->
<!--                            <td>2020-08-05 14:09:23</td>-->
<!--                        </tr>-->
                    </tbody>
                </table>
            </div>
<!--            <div class="total cf" style="position: relative;">-->
<!--                <h4>합계</h4>-->
<!--                <div>0</div>-->
<!--                <div>0</div>-->
<!--                <div>0</div>-->
<!--                <div>0</div>-->
<!--                <div>0</div>-->
<!--                <div>0</div>-->
<!--            </div>-->
        </div>
    </form>
</div>

<script type="module" src="/include/js/popups/popup_sel_wrkctr_orderno.js"></script>
