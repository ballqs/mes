<div style="display:none;" id="popup_wrkctr_bad_reason" class="popPage">
    <form class="popForm" id="popup_wrkctr_bad_reason_frm" name="popup_wrkctr_bad_reason_frm">
        <input type="hidden" class="hidden_fact_cd" name="hidden_fact_cd" value="">
        <input type="hidden" class="hidden_wrkr_cd" name="hidden_wrkr_cd" value="">
        <input type="hidden" class="hidden_wrk_ordr_no" name="hidden_wrk_ordr_no" value="">
        <input type="hidden" name="err_gbn" value="">
        <input type="hidden" name="err_gbn_page" value="1">
        <input type="hidden" name="err_gbn_per_page" value="5">
        <input type="hidden" name="err_gbn_total" value="">
        <input type="hidden" name="page" value="1">
        <input type="hidden" name="per_page" value="10">
        <input type="hidden" name="arrow_type" value="">

        <div class="tablet">
            <div class="topWrap cf">
                <div class="arrow" data-arrow="left"><a><span></span></a></div>
                <div class="title">불량등록</div>
                <div class="arrow arrowR" data-arrow="right"><a><span></span></a></div>
            </div>

            <div class="btnDiv cf">
<!--                <div><a class="open_popup_btn opBtn" data-name="">불량현황</a></div>-->
                <div><a class="open_popup_btn opBtn" data-name="cfm">확인</a></div>
                <div><a class="open_popup_btn opBtn" data-name="cls">닫기</a></div>
            </div>

            <div class="mb_10">
                <div class="viewLine cf">
                    <div class="view cf">
                        <div>작업장</div>
                        <input class="fInput hidden_wrkctr_cd" name="wrkctr_cd" readonly>
                        <input class="sInput hidden_wrkctr_nm" readonly>
                    </div>
                    <div class="view cf">
                        <div>작업품번</div>
                        <input class="fInput hidden_prtnbr_cd" name="hidden_prtnbr_cd" readonly="" autocomplete="off">
                        <input class="sInput hidden_prtnbr_nm" name="hidden_prtnbr_nm" readonly="" autocomplete="off">
                    </div>
                </div>
                <div class="viewLine cf" style="width:50%; border-top:0;">
                    <div class="view cf" style="width:100%;">
                        <div>불량수량</div><input class="fullInput text_r" name="err_qty" value="0">
                    </div><span></span>
                </div>
            </div>
            <div class="btnSelect cf">
                <h3>불량유형</h3>
                <div id="err_gbn_title" class="err_gbn_ttl"></div>
                <div class="arrowUD">
                    <a><span></span></a><a><span class="arrowD"></span></a>
                </div>
            </div>
            <div class="grid1">
                <div class="btnCont bc3 cf"></div>
            </div>

        </div>
    </form>
</div>

<script type="module" src="/include/js/popups/popup_wrkctr_bad_reason.js"></script>
