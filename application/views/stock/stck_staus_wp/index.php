<style media="screen">
    .scrollWrap {height: calc(100% - 200px);}
    #grid1, #grid2, #grid3 {width: 100%; height:100%; }
    #w2ui-popup .w2ui-box {height: 790px !important;}
    #selected-tab {height: calc(100% - 32px);}
    .tab {width: 100%; height: 100%; position: relative;}
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
            <!--            <div class="Search">-->
            <!--                <input type="text" name="biz_nm" value="">-->
            <!--            </div>-->
            <div class="Search popW">
                <p>창고</p>
                <input type="text" name="whs_cd">
                <a class="popBt" name="pop_whs_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search" style="margin-right:138px;">
                <input type="text" name="whs_nm" value="">
            </div>
            <div class="Search popW">
                <p>위치</p>
                <input type="text" name="loc_cd">
                <a class="popBt" name="pop_loc_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search">
                <input type="text" name="loc_nm" value="">
            </div>
        </div>
        <div class="SearchLine cf">
            <div class="Search popW">
                <p>품번</p>
                <input type="text" name="prt_nbr_cd" maxlength="20">
                <a class="popBt" name="pop_prt_nbr_cd_wp"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search">
                <input type="text" name="prt_nbr_nm">
            </div>
            <div class="select">
                <p>품번그룹</p>
                <select class="" name="prt_nbr_grp_cd"></select>
                <i class="fa fa-caret-down"></i>
            </div>
            <div class="select">
                <p>계정유형</p>
                <select class="" name="account_type"></select>
                <i class="fa fa-caret-down"></i>
                <!--                <input type="text" name="biz_cd">-->
                <!--                <a class="popBt" id="pop_biz_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>-->
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
    </div>
</form>

<div class="contWrap scrollWrap">
    <div id="tabs" style="width: 100%;"></div>
    <div id="selected-tab" style="padding: 10px 0px">
        <div id="tab1" class="tab">
            <div id="grid1"></div>
        </div>
        <div id="tab2" class="tab">
            <div id="grid2"></div>
        </div>
    </div>

</div>

<!-- <script type="module" src="/include/js/popups/pop_prt_nbr_cd_test.js"></script> -->
<!-- <script type="text/javascript" src="/include/js/popups/pop_biz_cd.js"></script> -->
<script type="module" src="/include/js/stock/stck_staus_wp.js"></script>
