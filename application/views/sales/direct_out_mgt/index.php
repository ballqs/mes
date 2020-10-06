<style media="screen">
    .grids {width: 100%; height: 100%;}
    .half {float: left; height: calc(50% - 5px); min-height: 281px; margin-bottom: 0;}
    .sideCont {width: 620px;}
    .sideGrid {width: calc(100% - 630px);}
</style>

<form id="search_frm" name="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="pop_prt_nbr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
            </div>
        </div>
    </div>
</form>


<div class="scrollWrap cf">
    <div class="contWrap half sideGrid">
        <div class="grids" id="grid01"></div>
    </div>
    <form id="detail_frm" name="detail_frm">
        <div class="contWrap half ml_10 sideCont">
            <div class="searchLine cf" style="display: none;">
                <div class="boxW col-2 search">
                    <p>사업자</p>
                    <select name="cmpny_cd"></select>
                </div>
            </div>
            <div class="searchLine cf">
                <div class="boxW col-2 search">
                    <p>출고처현장</p>
                    <div class="popW">
                        <input type="text" name="ship_cd">
                        <a class="popBt" name="pop_ship_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                    </div>
                </div>
                <div class="boxW col-2 search">
                    <p>출고처현장명</p>
                    <input type="text" name="ship_nm">
                </div>
            </div>
            <div class="searchLine cf">
                <div class="boxW col-1 search">
                    <p>비고</p>
                    <input type="text" name="remark" value="" style="width: 470px;">
                </div>
            </div>
        </div>
    </form>
    <div class="contWrap half mt_10">
        <div class="grids" id="grid02"></div>
    </div>
</div>

<script type="module" src="/include/js/sales/direct_out_mgt.js"></script>
