<style media="screen">
    #grid01, #grid02 {width: 100%; height: 100%;}
    .scrollWrap {height: calc(100% - 183px);}
    .half {width: calc(50% - 5px); height: 100%; }
</style>


<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd">
                </select>
            </div>
            <div class="boxW col-3 search">
                <p>지시일자</p>
                <input type="date" name="date1" id="date1" value="" datetype="Ymd">
                <span>~</span>
                <input type="date" name="date2" id="date2" value="" datetype="Ymd">
            </div>
            <div class="boxW col-3 search popW">
                <p>작업장</p>
                <div class="popW">
                    <input type="text" name="wrkctr_cd">
                    <a class="popBt" name="pop_wrkctr_cd"><i class="far fa-window-restore"></i></a>
                </div>
                <input type="text" name="wrkctr_nm">
            </div>
        </div>
    </div>
</form>

<div class="scrollWrap cf">
    <div class="contWrap scrollWrap half fl">
        <div class="grids" id="grid01"></div>
    </div>
    <div class="contWrap scrollWrap half fl ml_10">
        <div class="grids" id="grid02"></div>
    </div>
</div>

<script type="module" src="/include/js/production/status/mach_result_adjst.js"></script>
