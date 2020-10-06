<style media="screen">
    #grid01 {width: 100%; height: 100%;}
</style>
<form id="search_frm" >
    <div class="searchWrap cf">
        <div class="searchLine">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" id="btn_pop_prt_nbr_cd"><i class="far fa-window-restore"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
            </div>
            <div class="boxW col-3 select">
                <p>환산단위</p>
                <select name="trans_unit"></select>
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
    <div class="grids" id="grid01"></div>
</div>

<script type="module" src="/include/js/base/standard/unit_exchg_mgt.js"></script>
