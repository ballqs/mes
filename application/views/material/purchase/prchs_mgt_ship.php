<style media="screen">
    .half {width: calc(50% - 5px); height: calc(100% - 256px);}
    .heightHalf {height: 50%;}
    #grid01, #grid02{width: 100%; height: 100%;}
    .scrollWrap {height: calc((100% - 193px) / 2);}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd">
                    <option value="winp01">윈플러스01</option>
                    <option value="winp02">윈플러스02</option>
                </select>
                <select name="cmpny_cd" style="display: none;">
                    <option value="winp01">윈플러스01</option>
                    <option value="winp02">윈플러스02</option>
                </select>
            </div>
            <div class="boxW col-3 search">
                <p>발주일자</p>
                <input type="date" name="po_ymd_s" id="date1" value="" datetype="Ymd">
                <span>~</span>
                <input type="date" name="po_ymd_e" id="date2" value="" datetype="Ymd">
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
                <p>발주번호</p>
                <input type="text" name="po_no">
            </div>
        </div>

    </div>
</form>

<div class="contWrap scrollWrap mb_10">
    <div class="grids" id="grid01"></div>
</div>
<div class="contWrap scrollWrap">
    <div class="grids" id="grid02"></div>
</div>


<!--<script type="text/javascript" src="/include/js/popups/pop_biz_cd.js"></script>-->
<!--<script type="text/javascript" src="/include/js/popups/pop_prt_nbr_cd.js"></script>-->

<script type="module" src="/include/js/material/purchase/prchs_mgt_ship.js"></script>
