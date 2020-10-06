<style media="screen">
    #grid01 {width: 100%; height: 100%;}
    .scrollWrap {height: calc(100% - 183px);}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-2 select">
                <p>공장</p>
                <select name="fact_cd">
                    <option value="winp01">윈플러스</option>
                </select>
            </div>
            <div class="boxW col-2 search">
                <p>입고일자</p>
                <input type="date" id="date1" name="date1" value="" datetype="Ymd">
                <span>~</span>
                <input type="date" id="date2" name="date2" value="" datetype="Ymd">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-2 search">
                <p>거래처</p>
                <div class="popW">
                    <input type="text" name="biz_cd">
                    <a class="popBt" name="pop_biz_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="biz_nm">
            </div>
            <div class="boxW col-2 select">
                <p>입고구분</p>
                <select name="po_in_gbn"></select>
            </div>
        </div>

    </div>
</form>


<div class="contWrap scrollWrap">
    <div id="grid01"></div>
</div>


<script type="module" src="/include/js/material/input/term_input_staus.js"></script>
