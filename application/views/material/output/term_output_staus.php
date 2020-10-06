<style media="screen">
    #grid01 {width: 100%; height: 100%;}
    .scrollWrap {height: calc(100% - 183px);}
</style>
<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"><option value="winp01">윈플러스</option></select>
            </div>
            <div class="boxW col-3 search">
                <p>출고일자</p>
                <input type="date" id="date1" name="date1" value="" datetype="Ymd">
                <span>~</span>
                <input type="date" id="date2" name="date2" value="" datetype="Ymd">
            </div>
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="pop_prt_nbr_cd_wp"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 search">
                <p>창고</p>
                <div class="popW">
                    <a class="popBt"  name = "pop_whs_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                    <input type="text" name="whs_cd" value="">
                </div>
                <input type="text" name="whs_nm" value="">
            </div>
            <div class="boxW col-3 search">
                <p>위치</p>
                <div class="popW">
                    <a class="popBt"  name = "pop_loc_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                    <input type="text" name="loc_cd" value="">
                </div>
                <input type="text" name="loc_nm" value="">
            </div>
            <div class="boxW col-3 select">
                <p>출고구분</p>
                <select name="out_gbn"></select>
            </div>
        </div>
    </div>
</form>
<div class="contWrap scrollWrap">
    <div id="grid01"></div>
</div>


<script type="module" src="/include/js/material/output/term_output_staus.js"></script>
