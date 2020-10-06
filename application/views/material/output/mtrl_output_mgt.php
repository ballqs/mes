<style media="screen">
    /*.scrollWrap {height: calc(100% - 262px);}*/
    /*#grid01 {width: 100%; height:100%;}*/
    /*#w2ui-popup .w2ui-box {height: 790px !important;}*/

    .half {width: calc(50% - 5px); height: calc(100% - 256px);}
    .heightHalf {height: 50%;}
    #grid01, #grid02{width: 100%; height: 100%;}
    .scrollWrap {height: calc((100% - 204px) / 2);}
    w2ui-popup .w2ui-box {height: 790px !important;}
</style>

<form id="search_frm" name="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>출고일자</p>
                <input type="date" id="date1" name="date_s" value="">
                <span>~</span>
                <input type="date" id="date2" name="date_e" value="">
            </div>
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="btn_pop_prt_nbr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 search">
                <p>LOT NO.</p>
                <input type="text" name="lotno" value="">
            </div>
            <div class="boxW col-3 search">
                <p>원자재창고</p>
                <input type="text" value="원자재창고" name="whs_nm" disabled>
                <p>원자재창고코드 히든</p>
                <input type="hidden" name="whs_cd" value="<?php echo $data['whs']->whs_cd; ?>" readonly>
            </div>
            <div class="boxW col-3 search">
                <p>원자재창고위치 </p>
                <input type="text" value="<?php echo $data['loc'][0]->loc_nm; ?>" disabled>
                <p>원자재창고위치코드 히든</p>
                <input type="hidden" name="out_loc_cd" value="<?php echo $data['loc'][0]->loc_cd; ?>" readonly>
            </div>
        </div>
    </div>

</form>

<div class="contWrap scrollWrap mb_10">
  <div class="grids" id="grid01" style="width: 100%;"></div>
</div>
<div class="contWrap scrollWrap">
    <div class="grids" id="grid02"></div>
</div>

<!--<script type="text/javascript" src="/include/js/popups/pop_prt_nbr_cd.js"></script>-->
<script type="module" src="/include/js/material/output/mtrl_output_mgt.js"></script>
