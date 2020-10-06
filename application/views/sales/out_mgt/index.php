<style media="screen">
    .scrollWrap.top {height: calc(100% - 550px);}
    .scrollWrap.bottom {height: 400px;}
    .grids {width: 100%; height:100%;}
    .contWrap.fl,
    .contWrap.fr {width: calc(50% - 5px); height: 100%;}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 select" style="display: none">
                <p>공장</p>
                <select name="cmpny_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="pop_prt_nbr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm" value="">
            </div>
        </div>
    </div>
</form>

<div class="scrollWrap top mb_10">
    <div class="contWrap fl">
        <div class="grids" id="grid01"></div>
    </div>

    <div class="contWrap fr">
        <div class="grids" id="grid02"></div>
    </div>
</div>

<div class="contWrap scrollWrap bottom cf">
    <div class="grids" id="grid03"></div>
</div>


<script type="module" src="/include/js/sales/out_mgt.js"></script>
