<style media="screen">
    .scrollWrap {height: calc(100% - 220px);}
    #grid01 {width: 100%; height:100%;}
    #grid1, #grid2, #grid3, #grid4 {width: 49.5%; height:100%; position: absolute;}
    #grid1, #grid3 {left:0; border: 1px solid #f6f6f6;}
    #grid2, #grid4 {right:0; border: 1px solid #f6f6f6;}
    #w2ui-popup .w2ui-box {height: 790px !important;}
    #selected-tab {height: calc(100% - 32px);}
    .tab {width: 100%; height: 100%; position: relative;}
    #grid_grid4_column_4 .w2ui-col-group,
    #grid_grid4_column_6 .w2ui-col-group {border-bottom: 1px solid #eee;}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd">
                    <option value="winp01">윈플러스01</option>
                    <option value="winp02">윈플러스02</option>
                </select>
            </div>
            <div class="boxW col-3 select">
                <p>제품구분</p>
                <select class="" name="account_type">
                    <option value="">ALL</option>
                </select>
            </div>
            <div class="boxW col-3 select">
                <p>확정완료여부</p>
                <select class="" name="confrm_yn">
                    <option value="">전체</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="btn_pop_prt_nbr_cd"><i class="far fa-window-restore"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
            </div>
            <div class="boxW col-3 search">
                <p>창고</p>
                <div class="popW">
                    <input type="text" name="whs_cd">
                    <a class="popBt" name="pop_whs_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="whs_nm">

            </div>
            <div class="boxW col-3 search">
                <p>위치</p>
                <div class="popW">
                    <input type="text" name="loc_cd">
                    <a class="popBt" name="pop_loc_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="loc_nm">
            </div>

        </div>
        <div class="searchLine cf">
            <div class="boxW col-4 search">
                <p>LOT NO</p>
                <input type="text">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
  <div id="grid01"></div>
</div>

<!-- <div class="contWrap scrollWrap">
    <div id="tabs" style="width: 100%;"></div>
    <div id="selected-tab" style="padding: 10px 0px">
        <div id="tab1" class="tab">
            <div id="grid1"></div>
            <div id="grid2"></div>
        </div>
        <div id="tab2" class="tab">
            <div id="grid3"></div>
            <div id="grid4"></div>
        </div>
    </div>
</div> -->


<script type="module" src="/include/js/stock/stck_taking.js"></script>
