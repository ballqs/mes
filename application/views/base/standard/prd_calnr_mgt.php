<style media="screen">
    #grid01 {width: 100%; height: 100%;}
</style>
<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 search mCalendar">
                <p>기준연월</p>
                <input type="month" name="base_ym" id="month1" datetype="Ymd">
            </div>
        </div>
    </div>
</form>
<div class="contWrap scrollWrap">
    <div class="grids" id="grid01"></div>
</div>

<script type="module" src="/include/js/base/standard/prd_calnr_mgt.js"></script>
