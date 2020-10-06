<style media="screen">
    /*.scrollWrap {height: calc(100% - 262px);}*/
    /*#grid01 {width: 100%; height:100%;}*/
    /*#w2ui-popup .w2ui-box {height: 790px !important;}*/

    .half {width: calc(50% - 5px); height: calc(100% - 256px);}
    .heightHalf {height: 50%;}
    #grid01, #grid02{width: 100%; height: 100%;}
    .scrollWrap {height: calc((100% - 247px) / 2);}
    w2ui-popup .w2ui-box {height: 790px !important;}
</style>

<form id="search_frm" name="search_frm">
    <div class="contWrap cf">
        <div class="SearchLine cf">
            <div class="select" style="margin-right: 229px;">
                <p>공장</p>
                <select name="fact_cd"></select>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </div>
            <div class="Search">
                <p>출고일자</p>
                <input type="date" id="date1" name="date_s" value="">
                <span>~</span>
                <input type="date" id="date2" name="date_e" value="">
            </div>
        </div>
        <div class="SearchLine cf">
            <div class="Search popW cf">
                <p>품번</p>
                <input type="text" name="prt_nbr_cd">
                <a class="popBt" name="btn_pop_prt_nbr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search" style="margin-right: 49px;"><input type="text" name="prt_nbr_nm"></div>
<!--            <div class="Search">-->
<!--                <p>LOT NO.</p>-->
<!--                <input type="text" name="lotno" value="">-->
<!--            </div>-->
            <div class="Search cf popW">
                <p>출고처현장</p>
                <input type="text" name="ship_cd" autocomplete="off">
                <a class="popBt" name="pop_ship_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search">
                <input type="text" name="ship_nm" autocomplete="off">
            </div>
        </div>
    </div>
    <div class="contWrap cf">
        <div class="SearchLine cf">
            <div class="Search" style="margin-right: 50px;">
                <p>원자재창고</p>
                <input type="text" value="원자재창고" name="whs_nm" disabled>
                <input type="hidden" name="whs_cd" value="<?php echo $data['whs']->whs_cd; ?>" readonly>
            </div>
            <div class="Search">
                <p>원자재창고위치 </p>
                <input type="text" value="<?php echo $data['loc'][0]->loc_nm; ?>" disabled>
                <input type="hidden" name="out_loc_cd" value="<?php echo $data['loc'][0]->loc_cd; ?>" readonly>
            </div>
        </div>
    </div>

</form>

<div class="contWrap scrollWrap">
  <div class="grids" id="grid01" style="width: 100%;"></div>
</div>
<div class="contWrap scrollWrap">
    <div class="grids" id="grid02"></div>
</div>
<script>
    document.getElementById('date1').valueAsDate = new Date();
    document.getElementById('date2').valueAsDate = new Date();
</script>
<!--<script type="text/javascript" src="/include/js/popups/pop_prt_nbr_cd.js"></script>-->
<script type="module" src="/include/js/material/output/mtrl_output_mgt_wp.js"></script>
