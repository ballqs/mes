<style media="screen">
    .scrollWrap {height: calc(100% - 255px);}
    .top {height: 300px;}
    .bottom {width: 100%; height: calc(100% - 300px); margin-top: 10px;}
    .bottomInner {width: calc(50% - 5px); height: 100%; float: left;}
    #grid01, #grid02 {width: 100%; height: 100%; border: 1px solid #efefef;}
    #grid03, #grid04, #grid05, #grid06 {width: 100%; height: 100%; border: 1px solid #efefef;}
    #grid03, #grid05 {margin-right: 10px;}
    #w2ui-popup .w2ui-box {height: 790px !important;}
    #selected-tab {height: 100%;}
    .tab {width: 100%; height: 100%; position: relative;}
    #grid_grid1_columns tbody tr, #grid_grid1_fcolumns tbody tr, #grid_grid2_columns tbody tr, #grid_grid2_fcolumns tbody tr {height: 0 !important;}
</style>


<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
            <div class="select" style="display: none;">
                <p>사업자명</p>
                <select name="cmpny_cd"></select>
            </div>
            <div class="boxW col-3 search mCalendar w2ui-field">
                <p>년월</p>
                <input type="month" name="base_ym" id="month1" datetype="Ymd">
            </div>
            <div class="boxW col-3 search cf">
                <p>마감년월</p>
                <input type="text" name="fish_mon" readonly style="background-color: #BDBDBD;">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 select cf">
                <p>품번그룹</p>
                <select class="" name="prt_nbr_grp_cd"></select>
            </div>
            <div class="boxW col-3 select cf">
                <p>계정유형</p>
                <select class="" name="account_type"></select>
            </div>
            <div class="boxW col-3 search">
                <p>LOT NO</p>
                <input type="text" name="lotno">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="btn_pop_prt_nbr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
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
    </div>

</form>
<div id="tabs" style="width: 100%;"></div>
<div class="scrollWrap">
    <div id="selected-tab">
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

<script type="module" src="/include/js/stock/stck_mon_staus.js"></script>
