<style media="screen">
    #grid01, #grid02 {width: 100%; height: 100%;}
    .scrollWrap {height: calc((100% - 250px) / 2);}
    .half {float: left; height: 100%; margin-bottom: 0;}
    .sideCont {width: 615px; height: calc(50vh - 160px);}
    .sideGrid {width: calc(100% - 625px);}
</style>


<form id="search_frm" name="search_frm">
    <div class="contWrap cf">
        <div class="SearchLine cf">
            <div class="select" style="margin-right: 200px;">
                <p>공장</p>
                <select name="fact_cd"></select>
                <i class="fa fa-caret-down"></i>
            </div>
            <div class="select" style="display: none;">
                <p>사업자명</p>
                <select name="cmpny_cd"></select>
                <i class="fa fa-caret-down"></i>
            </div>
            <div class="Search">
                <p>발주일자</p>
                <input type="date" id="date1" name="po_ymd_s" value="" datetype="Ymd">
                <span>~</span>
                <input type="date" id="date2" name="po_ymd_e" value="" datetype="Ymd">
            </div>
        </div>
        <div class="SearchLine cf">
            <div class="Search popW">
                <p>발주처</p>
                <input type="text" name="biz_cd">
                <a class="popBt" name="pop_biz_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search">
                <input type="text" name="biz_nm">
            </div>
            <div class="select">
                <p>제품유형</p>
                <select name="account_type"></select>
                <i class="fa fa-caret-down"></i>
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
            <div class="Search">
                <p>발주번호</p>
                <input type="text" name="po_no">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
    <div class="grids" id="grid01"></div>
</div>
<div class="scrollWrap cf">
    <div class="contWrap half sideGrid">
        <div class="grids" id="grid02"></div>
    </div>
    <form id="detail_frm" name="detail_frm">
        <div class="contWrap half ml_10 sideCont">
            <div class="SearchLine cf">
                <div class="Search">
                    <p>발주입고번호</p>
                    <input type="text" name="po_in_no" value="" disabled>
                </div>
                <div class="Search">
                    <p>입고일자</p>
                    <input type="date" name="in_dt" value="" style="background-color: #f5f5f5;" readonly>
                </div>
            </div>
            <div class="SearchLine cf">

                <div class="Search" style="display: none;">
                    <p>LOT_NO</p>
                    <input type="text" name="lotno" value="">
                </div>
            </div>
            <div class="SearchLine cf">
                <div class="Search">
                    <p>출고처코드</p>
                    <input type="text" name="biz_cd" value="" disabled>
                </div>
                <div class="Search">
                    <p>출고처명</p>
                    <input type="text" name="biz_nm" value="" disabled>
                </div>
            </div>
            <div class="SearchLine cf" style="display: none;">
                <div class="Search">
                    <p>출고처현장코드</p>
                    <input type="text" name="ship_cd" value="" disabled>
                </div>
                <div class="Search">
                    <p>출고처현장명</p>
                    <input type="text" name="ship_nm" value="" disabled>
                </div>
            </div>
            <div class="SearchLine cf popW">
                <div class="Search">
                    <p>출고처현장코드</p>
                    <input type="text" name="out_ship_cd" value="" style="background: #f5f5f5;" readonly>
<!--                    <a class="popBt" name="pop_ship_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>-->
                </div>
                <div class="Search">
                    <p>출고처현장명</p>
                    <input type="text" name="out_ship_nm" value="" disabled>
                </div>
            </div>

            <div class="SearchLine cf">
                <div class="Search">
                    <p>품번 코드</p>
                    <input type="text" name="prt_nbr_cd" value="" disabled>
                </div>
                <div class="Search">
                    <p>품번명</p>
                    <input type="text" name="prt_nbr_nm" value="" disabled>
                </div>
            </div><div class="SearchLine cf">
                <div class="Search">
                    <p>규격</p>
                    <input type="text" name="spec" value="" disabled>
                </div>

            </div>
            <div class="SearchLine cf">
                <div class="Search">
                    <p>입고수량</p>
                    <input type="text" name="in_qty" value="" class="blue" style="text-align:right;">
                </div>
                <div class="select">
                    <p>입고단위</p>
                    <select name="po_in_unit"></select>
                    <i class="fa fa-caret-down"></i>
                </div>
            </div>
            <div class="SearchLine cf">
                <div class="Search">
                    <p>입고창고<!-- : 원자재창고 고정 --></p>
<!--                    <select name="in_whs_cd"></select>-->
<!--                    <i class="fa fa-caret-down"></i>-->
                    <input type="hidden" name="in_whs_cd" value="W1100">
                    <input type="text" name="in_whs_nm" value="원자재창고" disabled>
                </div>
                <div class="Search">
                    <p>입고위치<!-- : 원자재창고의 위치정보 고정--></p>
<!--                    <select name="in_loc_cd"></select>-->
<!--                    <i class="fa fa-caret-down"></i>-->
                    <input type="hidden" name="in_loc_cd" value="*">
                    <input type="text" name="in_loc_nm" value="*" disabled>
                </div>
            </div>
            <div class="SearchLine cf">
                <div class="Search">
                    <p>비고</p>
                    <input type="text" name="remark" value="" style="width: 471px;">
                </div>
            </div>
        </div>
    </form>
</div>

<!-- 입고내역 그리드 하나 추가 해당 발주에 대한 입고내역. -->

<script>
    let now_date = new Date();
    let y = now_date.getFullYear();
    let m = (now_date.getMonth() + 1) < 10 ? '0' + (now_date.getMonth() + 1) : (now_date.getMonth() + 1);
    let d = now_date.getDate() < 10 ? '0' + now_date.getDate() : now_date.getDate();
    let result = y+'-'+m+'-'+d;
    document.getElementById('date1').value = result;
    document.getElementById('date2').value = result;

    $("#detail_frm [name='ship_cd']").on('input', function() {
        console.log('안녕');
        $("#detail_frm [name='out_ship_cd']").val($("#detail_frm [name='ship_cd']").val());
    });

    $("#detail_frm [name='ship_nm']").on('input', function() {
        console.log('안녕');
        $("#detail_frm [name='out_ship_nm']").val($("#detail_frm [name='ship_nm']").val());
    });
</script>

<!--<script type="text/javascript" src="/include/js/popups/pop_biz_cd.js"></script>-->
<!--<script type="text/javascript" src="/include/js/popups/pop_prt_nbr_cd.js"></script>-->

<script type="module" src="/include/js/material/input/mtrl_input_mgt_wp.js"></script>
