<style media="screen">
    .scrollWrap {height: calc(100% - 239px);}
    .top {height: 300px; border-radius: 5px;}
    .bottom {width: 100%; height: calc(100% - 300px); margin-top: 10px;}
    .bottomInner {width: calc(50% - 5px); height: 100%; float: left; border-radius: 5px; }
    #grid01, #grid02 {width: 100%; height: 100%; border-radius: 10px; border: 1px solid #efefef;}
    #grid03, #grid04, #grid05, #grid06 {width: 100%; height: 100%; border: 1px solid #efefef;}
    #grid03, #grid05 {margin-right: 10px;}
    #w2ui-popup .w2ui-box {height: 790px !important;}
    #selected-tab {height: calc(100% - 32px);}
    .tab {width: 100%; height: 100%; position: relative;}
    #grid_grid1_columns tbody tr, #grid_grid1_fcolumns tbody tr, #grid_grid2_columns tbody tr, #grid_grid2_fcolumns tbody tr {height: 0 !important;}
</style>


<form id="search_frm">
    <div class="contWrap cf">
        <div class="SearchLine cf">
            <div class="select" style="margin-right:200px;">
                <p>공장</p>
                <select name="fact_cd">
                </select>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </div>
            <div class="select" style="display: none;">
                <p>사업자명</p>
                <select name="cmpny_cd">
                </select>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </div>
            <div class="Search mCalendar w2ui-field" style="margin-right:200px;">
                <p>년월</p>
                <input type="text" name="base_ym" readonly="" autocomplete="off">
                <input type="us-date" id="base_ym" placeholder="yyyy-mm-dd" class="w2field w2ui-input" autocomplete="off" style="box-sizing: border-box;">
            </div>
            <div class="Search cf">
                <p>마감년월</p>
                <input type="text" name="fish_mon" readonly style="background-color: #BDBDBD;">
            </div>
        </div>
        <div class="SearchLine cf">
            <div class="select cf" style="margin-right:200px;">
                <p>품번그룹</p>
                <select class="" name="prt_nbr_grp_cd">
                </select>
                <i class="fa fa-caret-down"></i>
            </div>
            <div class="select cf"  style="margin-right: 200px;">
                <p>계정유형</p>
                <select class="" name="account_type">
                </select>
                <i class="fa fa-caret-down"></i>
            </div>
            <div class="Search cf popW">
                <p>출고처현장</p>
                <input type="text" name="ship_cd">
                <a class="popBt" name="pop_ship_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search">
                <input type="text" name="ship_nm">
            </div>
            <input type="hidden" name="biz_cd" value="">
            <input type="hidden" name="biz_nm" value="">
        </div>
        <div class="SearchLine cf">
            <div class="Search popW">
                <p>품번</p>
                <input type="text" name="prt_nbr_cd">
                <a class="popBt" name="pop_prt_nbr_cd_wp"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search">
                <input type="text" name="prt_nbr_nm">
            </div>
            <div class="Search popW">
                <p>창고</p>
                <input type="text" name="whs_cd">
                <a class="popBt" name="pop_whs_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search">
                <input type="text" name="whs_nm">
            </div>
            <div class="Search popW">
                <p>위치</p>
                <input type="text" name="loc_cd">
                <a class="popBt" name="pop_loc_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search">
                <input type="text" name="loc_nm">
            </div>
        </div>
    </div>

</form>

<div class="contWrap scrollWrap">
    <div id="tabs" style="width: 100%;"></div>
    <div id="selected-tab" style="padding: 10px 0px">
        <div id="tab1" class="tab">
            <div class="top">
                <div class="grids" id="grid01"></div>
            </div>
            <div class="bottom cf">
                <div class="bottomInner mr_10">
                    <div class="grids" id="grid03"></div>
                </div>
                <div class="bottomInner">
                    <div class="grids" id="grid04"></div>
                </div>
            </div>
        </div>
        <div id="tab2" class="tab">
            <div class="top">
                <div class="grids" id="grid02"></div>
            </div>
            <div class="bottom cf">
                <div class="bottomInner mr_10">
                    <div class="grids" id="grid05"></div>
                </div>
                <div class="bottomInner">
                    <div class="grids" id="grid06"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="module" src="/include/js/stock/stck_mon_staus_wp.js"></script>
