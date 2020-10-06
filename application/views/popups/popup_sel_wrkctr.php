
<div style="display:none;" id="popup_sel_wrkctr" class="popPage">
    <form class="popForm" id="popup_sel_wrkctr_frm" name="popup_sel_wrkctr_frm">
        <input type="hidden" class="hidden_fact_cd" name="hidden_fact_cd" value="">
        <input type="hidden" name="page" value="1">
        <input type="hidden" name="per_page" value="10">
        <input type="hidden" name="search_type" value="">
        <input type="hidden" name="arrow_type" value="">
        <div class="tablet">
            <div class="topWrap cf">
                <div class="arrow" data-arrow="left"><a><span></span></a></div>
                <div class="title">작업장 선택</div>
                <div class="arrow arrowR" data-arrow="right"><a><span></span></a></div>
            </div>

            <div class="btnDiv cf">
                <div><a class="open_popup_btn wrkctrBtn opBtn" data-name="sel">선택</a></div>
                <div><a class="open_popup_btn wrkctrBtn opBtn" data-name="all">전체</a></div>
                <div><a class="open_popup_btn wrkctrBtn opBtn" data-name="cfm">확인</a></div>
                <div><a class="open_popup_btn wrkctrBtn opBtn" data-name="cls">닫기</a></div>
            </div>

            <div class="mb_10">
                <div class="viewLine threeLine cf">
                    <div class="view cf">
                        <div>단말기 IP</div><input class="fullInput" name="ip" value="<?=$_SERVER['REMOTE_ADDR']?>" readonly>
                    </div>
                    <div class="view cf">
                        <div>공장</div>
                        <select name="fact_cd"></select>
                    </div>
                    <div class="view cf">
                        <div>선택 작업장</div><input class="fullInput" id="clicked_wrkctr" value="" disabled>
                    </div>
                </div>
            </div>

            <div class="grid2">
                <div class="btnCont cf"></div>
            </div>

        </div>
    </form>
</div>

<script type="module" src="/include/js/popups/popup_sel_wrkctr.js"></script>
