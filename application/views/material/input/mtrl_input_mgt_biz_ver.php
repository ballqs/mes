<style media="screen">
    #grid01, #grid02 {width: 100%; height: 100%;}
    .scrollWrap {height: calc((100% - 193px) / 2);}
    .half {float: left; height: 100%; margin-bottom: 0;}
    .sideCont {width: 605px; height: calc(50vh - 107px);}
    .sideGrid {width: calc(100% - 615px);}
    .Search input {width: 170px;}
    .SearchLine .select select {width: 170px;}
</style>


<form id="search_frm" name="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>발주일자</p>
                <input type="date" id="date1" name="po_ymd_s" value="" datetype="Ymd">
                <span>~</span>
                <input type="date" id="date2" name="po_ymd_e" value="" datetype="Ymd">
            </div>
            <div class="boxW col-3 search">
                <p>발주처</p>
                <div class="popW">
                    <input type="text" name="biz_cd">
                    <a class="popBt" name="pop_biz_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="biz_nm">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>제품유형</p>
                <select name="account_type"></select>
            </div>
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="pop_prt_nbr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
            </div>
            <div class="boxW col-3 search">
                <p>발주번호</p>
                <input type="text" name="po_no">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap mb_10">
    <div class="grids" id="grid01"></div>
</div>
<div class="scrollWrap cf">
    <div class="contWrap half sideGrid">
        <div class="grids" id="grid02"></div>
    </div>
    <form id="detail_frm" name="detail_frm">
        <div class="contWrap half ml_10 sideCont">
            <div class="searchLine cf">
                <div class="boxW col-1 search">
                    <p>발주입고번호</p>
                    <input type="text" name="po_in_no" value="" disabled>
                </div>
            </div>
            <div class="searchLine cf">
                <div class="boxW col-2 search">
                    <p>입고일자</p>
                    <input type="date" name="in_dt" value="" style="background-color: #f5f5f5;">
                </div>
                <div class="boxW col-2 search">
                    <p>LOT_NO</p>
                    <input type="text" name="lotno" value="" disabled>
                </div>
            </div>
            <div class="searchLine cf">
                <div class="boxW col-2 search">
                    <p>품번 코드</p>
                    <input type="text" name="prt_nbr_cd" value="" disabled>
                </div>
                <div class="boxW col-2 search">
                    <p>품번명</p>
                    <input type="text" name="prt_nbr_nm" value="" disabled>
                </div>
            </div><div class="searchLine cf">
                <div class="boxW col-1 search">
                    <p>규격</p>
                    <input type="text" name="spec" value="" disabled>
                </div>
            </div>
            <div class="searchLine cf">
                <div class="boxW col-2 search">
                    <p>입고수량</p>
                    <input type="text" name="in_qty" value="">
                </div>
                <div class="boxW col-2 select">
                    <p>입고단위</p>
                    <select name="po_in_unit"></select>
                </div>
            </div>
            <div class="searchLine cf">
                <div class="boxW col-2 select">
                    <p>입고창고<!-- : 원자재창고 고정 --></p>
                    <select name="in_whs_cd">
                        <option value="W1100">원자재창고</option>
                    </select>
                </div>
                <div class="boxW col-2 select">
                    <p>입고위치<!-- : 원자재창고의 위치정보 고정--></p>
                    <select name="in_loc_cd"></select>
                </div>
            </div>
            <div class="searchLine cf">
                <div class="boxW col-1 search">
                    <p>비고</p>
                    <input type="text" name="remark" value="" style="width: 462px;">
                </div>
            </div>
        </div>
    </form>
</div>
<!-- 입고내역 그리드 하나 추가 해당 발주에 대한 입고내역. -->

<!--<script type="text/javascript" src="/include/js/popups/pop_biz_cd.js"></script>-->
<!--<script type="text/javascript" src="/include/js/popups/pop_prt_nbr_cd.js"></script>-->

<script type="module" src="/include/js/material/input/mtrl_input_mgt_biz_ver.js"></script>
