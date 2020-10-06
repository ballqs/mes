
<div style="display:none;" id="popup_wrkctr_stop_reason_auto" class="popPage">
    <form id="popup_wrkctr_stop_reason_auto_frm" name="popup_wrkctr_stop_reason_auto_frm" class="popForm">
        <input type="hidden" class="hidden_fact_cd" name="hidden_fact_cd" value="">
        <input type="hidden" class="hidden_wrkr_cd" name="hidden_wrkr_cd" value="">
        <input type="hidden" name="page" value="1">
        <input type="hidden" name="per_page" value="10">
        <input type="hidden" name="search_type" value="all">
        <input type="hidden" name="arrow_type" value="">
        <div class="tablet">
            <div class="topWrap cf">
                <div class="arrow" data-arrow="left"><a><span></span></a></div>
                <div class="title">비가동사유</div>
                <div class="arrow arrowR" data-arrow="right"><a><span></span></a></div>
            </div>

            <div class="btnDiv cf">
                <div style="display:none;"><a class="open_popup_btn opBtn" id="stop_reason_auto_search_btn" data-name="search">조회</a></div>
                <div><a class="open_popup_btn opBtn" data-name="cls">닫기</a></div>
            </div>

            <div class="mb_10">
                <div class="viewLine cf">
                    <div class="view cf">
                        <div>작업 라인</div><input class="fInput hidden_wrkctr_cd" name="wrkctr_cd" value="" readOnly><input class="sInput hidden_wrkctr_nm" value="" readOnly>
                    </div>
                    <div class="view cf">
                        <div>생산 품번</div><input class="fInput hidden_prtnbr_cd" name="hidden_prtnbr_cd" value="" readOnly><input class="sInput hidden_prtnbr_nm" value="" readOnly>
                    </div>
                </div>
                <div class="viewLine cf">
                    <div class="view cf">
                        <div>지시 번호</div><input class="fInput hidden_wrk_ordr_no" name="hidden_wrk_ordr_no" value="" readOnly><input class="sInput" value="" readOnly>
                    </div>
                    <div class="view cf">

                    </div>
                </div>
            </div>
            <div class="grid5 tabCont active" id="tab1">
                <table class="gridTable" id="table_runstop_status_auto">
                    <thead>
                    <tr>
                        <th>시작시간</th>
                        <th>종료시간</th>
                        <th>비가동 시간(분)</th>
                        <th>비가동 내역</th>
                        <th>구분</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </form>
</div>

<script type="module" src="/include/js/popups/popup_wrkctr_stop_reason_auto.js"></script>


<div id="popup_stop_cd_list" class="popPage" style="display:none;">
    <form class="popForm" name="popup_stop_cd_list_frm" id="popup_stop_cd_list_frm">
        <input type="hidden" class="hidden_fact_cd" name="hidden_fact_cd" value="">
        <input type="hidden" class="hidden_wrkr_cd" name="hidden_wrkr_cd" value="">
        <input type="hidden" class="hidden_wrk_ordr_no" name="hidden_wrk_ordr_no" value="">
        <input type="hidden" name="stop_gbn" value="">
        <input type="hidden" name="stop_gbn_page" value="1">
        <input type="hidden" name="stop_gbn_per_page" value="10">
        <input type="hidden" name="stop_gbn_total" value="">
<!--        <input type="hidden" name="stop_cd" value="">-->
        <input type="hidden" name="page" value="1">
        <input type="hidden" name="per_page" value="24">
        <input type="hidden" name="arrow_type" value="">
        <input type="hidden" name="str_dt" value="">

        <div class="tablet">
            <div class="topWrap cf">
                <div class="arrow" data-arrow="left"><a><span></span></a></div>
                <div class="title">비가동사유</div>
                <div class="arrow arrowR" data-arrow="right"><a><span></span></a></div>
            </div>

            <div class="btnDiv cf">
                <div><a class="open_popup_btn opBtn" data-name="cfm">등록</a></div>
                <div><a class="open_popup_btn opBtn" data-name="cls">닫기</a></div>
            </div>

            <div class="mb_10">
                <div class="viewLine cf">
                    <div class="view cf">
                        <div>작업라인</div>
                        <input class="fInput hidden_wrkctr_cd" name="wrkctr_cd" value="BC01" readOnly>
                        <input class="sInput hidden_wrkctr_nm" readOnly>
                    </div>
                    <div class="view cf">
                        <div>비가동</div><input class="fullInput" value="" readOnly>
                    </div>
                </div>
            </div>
            <div class="btnSelect bc4-1 cf">
                <h3>비가동<br />유형</h3>
                <div id="stop_gbn_title" class="stop_gbn_ttl">
                </div>
                <div class="arrowUD">
                    <a><span></span></a><a><span class="arrowD"></span></a>
                </div>
            </div>
            <div class="grid6">
                <div class="btnCont bc4-2 cf">
                </div>
            </div>

        </div>
    </form>

</div>


<!--<div id="popup_stop_cd_list" style="display:none;">-->
<!--    <div id="popup_wrkctr_stop_gbn" class="popPage">-->
<!--        <form class="popForm" name="popup_wrkctr_stop_gbn_frm" id="popup_wrkctr_stop_gbn_frm">-->
<!--            <input type="hidden" class="hidden_fact_cd" name="hidden_fact_cd" value="">-->
<!--            <input type="hidden" class="hidden_wrkr_cd" name="hidden_wrkr_cd" value="">-->
<!--            <input type="hidden" class="hidden_wrk_ordr_no" name="hidden_wrk_ordr_no" value="">-->
<!--            <input type="hidden" name="stop_gbn" value="">-->
<!--            <input type="hidden" name="stop_gbn_page" value="1">-->
<!--            <input type="hidden" name="stop_gbn_per_page" value="10">-->
<!--            <input type="hidden" name="stop_gbn_total" value="">-->
<!--            <input type="hidden" name="page" value="1">-->
<!--            <input type="hidden" name="per_page" value="10">-->
<!--            <input type="hidden" name="arrow_type" value="">-->
<!---->
<!--            <div class="tablet">-->
<!--                <div class="topWrap cf">-->
<!--                    <div class="arrow"><a><span></span></a></div>-->
<!--                    <div class="title">비가동사유</div>-->
<!--                    <div class="arrow arrowR"><a><span></span></a></div>-->
<!--                </div>-->
<!---->
<!--                <div class="btnDiv cf">-->
<!--                    <div><a class="open_popup_btn opBtn" data-name="cfm">등록</a></div>-->
<!--                    <div><a class="open_popup_btn opBtn" data-name="cls">닫기</a></div>-->
<!--                </div>-->
<!---->
<!--                <div class="mb_10">-->
<!--                    <div class="viewLine cf">-->
<!--                        <div class="view cf">-->
<!--                            <div>작업라인</div>-->
<!--                            <input class="fInput hidden_wrkctr_cd" name="wrkctr_cd" value="BC01" readOnly>-->
<!--                            <input class="sInput hidden_wrkctr_nm" readOnly>-->
<!--                        </div>-->
<!--                        <div class="view cf">-->
<!--                            <div>비가동</div><input class="fullInput" value="" readOnly>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="btnSelect bc4-1 cf">-->
<!--                    <h3>비가동<br />유형</h3>-->
<!--                    <div id="stop_gbn_title" class="stop_gbn_ttl">-->
<!--                    </div>-->
<!--                    <div class="arrowUD">-->
<!--                        <a><span></span></a><a><span class="arrowD"></span></a>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="grid6">-->
<!--                    <div class="btnCont bc4-2 cf">-->
<!--                    </div>-->
<!--                </div>-->
<!---->
<!--            </div>-->
<!--        </form>-->
<!--    </div>-->
<!--</div>-->

<script type="module" src="/include/js/popups/popup_stop_cd_list.js"></script>
