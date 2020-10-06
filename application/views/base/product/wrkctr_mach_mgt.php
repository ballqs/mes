<style media="screen">
    #grid01 {width: 100%; height:100%; }
    #w2ui-popup .w2ui-box {height: 790px !important;}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select class="" name="fact_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>작업장</p>
                <div class="popW">
                    <input type="text" name="wrkctr_cd" value="">
                    <a class="popBt" name="pop_wrkctr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="wrkctr_nm" value="">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
    <div class="grids" id="grid01"></div>
</div>

<script type="module" src="/include/js/base/product/wrkctr_mach_mgt.js"></script>
