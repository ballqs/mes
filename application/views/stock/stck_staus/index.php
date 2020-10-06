<style media="screen">
    .scrollWrap {height: calc(100% - 255px);}
    #grid1, #grid2, #grid3 {width: 100%; height:100%; }
    #w2ui-popup .w2ui-box {height: 790px !important;}
    #selected-tab {height:100%;}
    .tab {width: 100%; height: 100%; position: relative;}
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
            <div class="boxW col-3 search">
                <p>창고</p>
                <div class="popW">
                    <input type="text" name="whs_cd">
                    <a class="popBt" name="pop_whs_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="whs_nm" value="">
            </div>
            <div class="boxW col-3 search">
                <p>위치</p>
                <div class="popW">
                    <input type="text" name="loc_cd">
                    <a class="popBt" name="pop_loc_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="loc_nm" value="">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd" maxlength="20">
                    <a class="popBt" name="btn_pop_prt_nbr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
            </div>
            <div class="boxW col-3 select">
                <p>품번그룹</p>
                <select class="" name="prt_nbr_grp_cd"></select>
            </div>
            <div class="boxW col-3 select">
                <p>계정유형</p>
                <select class="" name="account_type"></select>
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-1 search">
                <p>LOT NO</p>
                <input type="text" name="lotno" value="">
            </div>
        </div>
    </div>
</form>
<div id="tabs" style="width: 100%;"></div>
<div class="contWrap scrollWrap">
    <div id="selected-tab">
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
<script type="module" src="/include/js/stock/stck_staus.js"></script>
