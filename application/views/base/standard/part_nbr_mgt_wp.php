<style media="screen">
    .scrollWrap {height: calc(100% - 195px);}
    #grid01 {width: 100%; height: 100%;}
    #w2ui-popup .w2ui-box {height: 790px !important;}
    /* .gridLabel {font-weight: bold; letter-spacing: 0; color: #ff0000; padding: 5px 0 ;}
    .gridLabel span {color: #006eff;} */
    .gridLabel {display: block; padding-bottom: 5px; letter-spacing: 0;}
    .gridLabel span {display: inline-block; border: 1px solid #333; border-radius: 3px; padding: 1px 8px; margin: 0 3px;}
</style>
<form id="search_frm">
    <div class="contWrap cf">
        <div class="select">
            <p>공장</p>
            <select class="" name="fact_cd"></select>
            <i class="fa fa-caret-down"></i>
        </div>
        <div class="Search cf popW">
            <p>품번</p>
            <input type="text" name="prt_nbr_cd">
            <a class="popBt" name="pop_prt_nbr_cd_wp"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
        </div>
        <div class="Search">
            <input type="text" name="prt_nbr_nm">
        </div>
        <div class="select">
            <p>품번그룹</p>
            <select class="" name = "prt_nbr_grp_cd" >
                <!--             <option value="">전체</option>-->
                <!--             <option value="">선택1</option>-->
                <!--             <option value="">선택2</option>-->
            </select>
            <i class="fa fa-caret-down"></i>
        </div>
        <div class="select">
            <p>계정유형</p>
            <select class="" name="account_type"></select>
            <i class="fa fa-caret-down"></i>
        </div>
    </div>
</form>

<div class="gridLabel">
    <!-- <p>※ 품번코드 = 품번명 + <span>하이픈(-)</span> + 규격 + <span>하이픈(-)</span> + 길이 + <span>하이픈(-)</span> + 컬러</p> -->
    <p>※<span>품번코드</span> = <span>품번명</span> - <span>규격</span> - <span>길이</span> - <span>컬러</span></p>
</div>

<div class="contWrap scrollWrap">
    <!--    <div class="grids" id="grid01" style="width: 100%;"></div>-->
    <div class="grids" id="grid01" style="width: 100%;"></div>
</div>

<!--<script type="module" src="/include/js/base/standard/part_nbr_mgt2.js"></script>-->
<script type="module" src="/include/js/base/standard/part_nbr_mgt_wp.js"></script>
