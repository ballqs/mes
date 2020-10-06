<style media="screen">
    .scrollWrap {height: calc(100% - 180px);}
    #grid01 {width: 100%; height: 100%;}
    #w2ui-popup .w2ui-box {height: 790px !important;}
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
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="btn_pop_prt_nbr_cd"><i class="far fa-window-restore"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>품번그룹</p>
                <select class="" name = "prt_nbr_grp_cd"></select>
            </div>
            <div class="boxW col-3 select">
                <p>계정유형</p>
                <select class="" name="account_type"></select>
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
<!--    <div class="grids" id="grid01" style="width: 100%;"></div>-->
    <div class="grids" id="grid01" style="width: 100%;"></div>
</div>

<!--<script type="module" src="/include/js/base/standard/part_nbr_mgt2.js"></script>-->
<script type="module" src="/include/js/base/standard/part_nbr_mgt.js"></script>
