<style media="screen">
    .scrollWrap {height: calc(100% - 183px);}
    #grid01 {width: 100%; height:100%; }
    #w2ui-popup .w2ui-box {height: 790px !important;}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-2 select">
                <p>공장</p>
                <select class="" name="cmpny_cd" style="display: none;">
                    <option value="">ALL</option>
                </select>
                <select class="" name="fact_cd">
                    <option value="">ALL</option>
                </select>
            </div>
            <div class="boxW col-2 search">
                <p>클레임 일자</p>
                <input type="date" name="date1" id="date1" datetype="Ymd">
                <span>~</span>
                <input type="date" name="date2" id="date2" datetype="Ymd">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-2  search popW">
                <p>출고처</p>
                <div class="popW">
                    <input type="text" name="biz_cd">
                    <a class="popBt" name="pop_biz_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="biz_nm">
            </div>
            <div class="boxW col-2 search popW">
                <p>출고처현장</p>
                <div class="popW">
                    <input type="text" name="ship_cd">
                    <a class="popBt" name="pop_ship_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="ship_nm">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
    <div id="grid01"></div>
</div>


<script type="module" src="/include/js/sales/claim_mgt.js"></script>
