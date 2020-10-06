<style media="screen">
    .scrollWrap {height: calc(50% - 77px);}
    #grid01, #grid02 {width: 100%; height: 100%;}
    #w2ui-popup .w2ui-box {height: 790px !important;}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select class="" name="fact_cd">
                </select>
                <select name="cmpny_cd" style="display: none;">
                </select>
            </div>
            <div class="boxW col-3 search">
                <p>수주일자</p>
                <input type="date" name="date1" id="date1" value="" datetype="Ymd">
                <span>~</span>
                <input type="date" name="date2" id="date2" value="" datetype="Ymd">
            </div>
            <div class="boxW col-3 search">
                <p>거래처</p>
                <div class="popW">
                    <input type="text" name="biz_cd">
                    <a class="popBt" name="pop_biz_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="biz_nm">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>제품유형</p>
                <select name="account_type"></select>
            </div>
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="pop_prt_nbr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
            </div>
            <div class="boxW col-3 search">
                <p>수주번호</p>
                <input type="text" name="ordr_no">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap mb_10">
    <div id="grid01" class="grids"></div>
</div>
<div class="contWrap scrollWrap">
    <div id="grid02" class="grids"></div>
</div>

<script type="module" src="/include/js/sales/ord_mgt.js"></script>
