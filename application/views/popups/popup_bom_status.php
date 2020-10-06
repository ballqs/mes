<div style="display:none;" id="popup_bom_status" class="popPage">
    <form id="popup_bom_status_frm" name="popup_bom_status_frm" class="popForm">
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
                <div class="title">투입가능 품번</div>
                <div class="arrow arrowR" data-arrow="right"><a><span></span></a></div>
            </div>

            <div class="btnDiv cf">
                <div style="display:none;"><a class="open_popup_btn opBtn" data-name="search">조회</a></div>
                <div><a class="open_popup_btn opBtn" data-name="cls">닫기</a></div>
            </div>

            <div class="mb_10">
                <div class="viewLine cf">
                    <div class="view cf">
                        <div>작업 라인</div><input class="fInput hidden_prtnbr_cd" name="hidden_prtnbr_cd" value="" readOnly><input class="sInput hidden_prtnbr_nm" value="브로치 1호" readOnly>
                    </div>
                </div>
            </div>
            <div class="grid5 tabCont active" id="tab1">
                <table class="gridTable" id="table_bom_status">
                    <thead>
                    <tr>
                        <th>품번</th>
                        <th>품명</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </form>
</div>

<script type="module" src="/include/js/popups/popup_bom_status.js"></script>
