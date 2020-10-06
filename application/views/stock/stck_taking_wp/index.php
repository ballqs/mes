<style media="screen">
    .scrollWrap {height: calc(100% - 239px);}
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
            <div class="select" style="margin-right:200px;">
                <p>제품구분</p>
                <select class="" name="account_type">
                    <option value="">ALL</option>
                </select>
                <i class="fa fa-caret-down"></i>
            </div>
            <div class="select">
                <p>확정완료여부</p>
                <select class="" name="confrm_yn">
                    <option value="">전체</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </div>
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
        <div class="SearchLine cf">
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
            <div class="Search">
                <p>실사일자</p>
                <input type="date" name="date1" id="date1" value="" datetype="Ymd">
                <span>~</span>
                <input type="date" name="date2" id="date2" value="" datetype="Ymd">
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


<script type="module" src="/include/js/stock/stck_taking_wp.js"></script>
