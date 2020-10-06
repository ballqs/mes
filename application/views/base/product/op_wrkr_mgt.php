<style media="screen">
    .scrollWrap {height: calc(100% - 453px);}
    #grid01 {width: 100%; height:100%;}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>공정</p>
                <div class="popW">
                    <input type="text" name="op_cd" value="">
                    <a class="popBt" name="pop_op_cd"><i class="far fa-window-restore"></i></a>
                </div>
                <input type="text" name="op_nm" value="">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap mb_10">
    <div class="grids" id="grid01" selrow="" style="width: 100%;"></div>
</div>

<div class="cf">
    <div class="contWrap fl" style="width: calc(50% - 5px);">
        <div style="position: relative; height: 300px;">
            <div class="grids" id="grid02" style="left: 0px; width: 100%; height: 300px;"></div>
        </div>
    </div>

    <div class="contWrap fr" style="width: calc(50% - 5px);">
        <div style="position: relative; height: 300px;">
            <div class="grids" id="grid03" style="right: 0px; width: 100%; height: 300px;"></div>
        </div>
    </div>
</div>


<script type="module" src="/include/js/base/product/op_wrkr_mgt.js"></script>
