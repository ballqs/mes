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
                <input type="date" id="date1" name="date1" value="" datetype="Ymd">
                <span>~</span>
                <input type="date" id="date2" name="date2" value="" datetype="Ymd">
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
                <p>출고창고/위치</p>
                <input type="text" name="out_whs_nm" value="원자재창고" readonly style="background-color: #F5F5F5">
                <input type="hidden" name="out_whs_cd" value="W1100" readonly>
                <input type="text" name="out_loc_nm" value="*" readonly style="background-color: #F5F5F5">
                <input type="hidden" name="out_loc_cd" value="*" readonly>
            </div>
            <div class="boxW col-3 search">
                <p>입고창고/위치</p>
                <input type="text" name="in_whs_nm" value="생산창고" readonly style="background-color: #F5F5F5">
                <input type="hidden" name="in_whs_cd" value="W2100" readonly>
                <input type="text" name="in_loc_nm" value="*" readonly style="background-color: #F5F5F5">
                <input type="hidden" name="in_loc_cd" value="*" readonly>
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
<script type="module" src="/include/js/material/output/mtrl_prdmove_mgt.js"></script>
