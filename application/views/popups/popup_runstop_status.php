<div style="display:none;" id="popup_runstop_status" class="popPage">
    <form id="popup_runstop_status_frm" name="popup_runstop_status_frm" class="popForm">
        <input type="hidden" class="hidden_fact_cd" name="hidden_fact_cd" value="">
        <input type="hidden" class="hidden_wrkr_cd" name="hidden_wrkr_cd" value="">
        <input type="hidden" class="hidden_wrk_ordr_no" name="hidden_wrk_ordr_no" value="">
        <input type="hidden" name="page" value="1">
        <input type="hidden" name="per_page" value="10">
        <input type="hidden" name="search_type" value="all">
        <input type="hidden" name="arrow_type" value="">
        <div class="tablet">
            <div class="topWrap cf">
                <div class="arrow" data-arrow="left"><a><span></span></a></div>
                <div class="title">비가동현황</div>
                <div class="arrow arrowR" data-arrow="right"><a><span></span></a></div>
            </div>

            <div class="btnDiv cf">
                <div><a class="open_popup_btn opBtn" data-name="search">조회</a></div>
                <div><a class="open_popup_btn opBtn" data-name="cls">닫기</a></div>
            </div>

            <div class="mb_10">
                <div class="viewLine cf">
                    <div class="view cf">
                        <div>작업 라인</div><input class="fInput hidden_wrkctr_cd" name="wrkctr_cd" value="BC01" readOnly><input class="sInput hidden_wrkctr_nm" value="브로치 1호" readOnly>
                    </div>
                    <div class="view cf">
                        <div>작업일자</div>
                        <div class="viewDate">
                            <input type="date" class="date1" name="date1" value="2020-08-05" readOnly>
                            <div class="dateBtn" data-iname="date1"><span class="arrowU"></span><span class="arrowD"></span></div>
                            <p class="fl" style="margin-left:14px;">~ </p><input type="date" class="date2" name="date2" value="2020-08-10" readOnly>
                            <div class="dateBtn" data-iname="date2"><span class="arrowU"></span><span class="arrowD"></span></div>
                        </div>
                    </div>
                </div>
            </div>
<!--            <div class="tabTitle cf">-->
<!--                <div class="active"><a>전체</a></div>-->
<!--                <div><a>주간</a></div>-->
<!--                <div><a>야간</a></div>-->
<!--            </div>-->
            <div class="grid2 tabCont active" id="tab1">
                <table class="gridTable" id="table_runstop_status">
                    <thead>
                        <tr>
                            <th>설비</th>
                            <th>시작시간</th>
                            <th>종료시간</th>
                            <th>비가동 구분</th>
                            <th>비가동 사유</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
<!--            <div class="grid5 tabCont" id="tab2">-->
<!--                <table class="gridTable">-->
<!--                    <thead>-->
<!--                        <tr>-->
<!--                            <th>NO</th>-->
<!--                            <th>품번</th>-->
<!--                            <th>품명</th>-->
<!--                            <th>불량유형</th>-->
<!--                            <th>불량내역</th>-->
<!--                            <th>불량수량(EA)</th>-->
<!--                            <th>작업자</th>-->
<!--                            <th>등록일자</th>-->
<!--                        </tr>-->
<!--                    </thead>-->
<!--                    <tbody>-->
<!--                        <tr>-->
<!--                            <td>2</td>-->
<!--                            <td>45943-3B001-1-BC</td>-->
<!--                            <td>45943-3B001-1 SHAFT- MANUAL GEN1 브로치</td>-->
<!--                            <td>외관</td>-->
<!--                            <td>녹</td>-->
<!--                            <td>2</td>-->
<!--                            <td>이원근</td>-->
<!--                            <td>2020-08-05 14:09:23</td>-->
<!--                        </tr>-->
<!--                    </tbody>-->
<!--                </table>-->
<!--            </div>-->
<!--            <div class="grid5 tabCont" id="tab3">-->
<!--                <table class="gridTable">-->
<!--                    <thead>-->
<!--                        <tr>-->
<!--                            <th>NO</th>-->
<!--                            <th>품번</th>-->
<!--                            <th>품명</th>-->
<!--                            <th>불량유형</th>-->
<!--                            <th>불량내역</th>-->
<!--                            <th>불량수량(EA)</th>-->
<!--                            <th>작업자</th>-->
<!--                            <th>등록일자</th>-->
<!--                        </tr>-->
<!--                    </thead>-->
<!--                    <tbody>-->
<!--                        <tr>-->
<!--                            <td>3</td>-->
<!--                            <td>45943-3B001-1-BC</td>-->
<!--                            <td>45943-3B001-1 SHAFT- MANUAL GEN1 브로치</td>-->
<!--                            <td>외관</td>-->
<!--                            <td>녹</td>-->
<!--                            <td>2</td>-->
<!--                            <td>이원근</td>-->
<!--                            <td>2020-08-05 14:09:23</td>-->
<!--                        </tr>-->
<!--                    </tbody>-->
<!--                </table>-->
<!--            </div>-->
        </div>
    </form>
</div>

<script type="module" src="/include/js/popups/popup_runstop_status.js"></script>
