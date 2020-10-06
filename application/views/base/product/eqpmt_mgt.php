<style media="screen">
    #grid01 {width: 100%; height:100%;}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>설비</p>
                <div class="popW">
                    <input type="text" name="mach_cd">
                    <a class="popBt" name="pop_mach_cd"><i class="far fa-window-restore"></i></a>
                </div>
                <input type="text" name="mach_nm">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
    <div class="grids" id="grid01" style="width: 100%;"></div>
</div>


<script type="module" src="/include/js/base/product/eqpmt_mgt.js"></script>
