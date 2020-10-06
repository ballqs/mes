<style media="screen">
    .half {width: calc(50% - 5px); height: 100%; }
    .heightHalf {height: 50%;}
    #grid01, #grid02 {width: 100%; height: 100%;}
</style>
<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>창고</p>
                <div class="popW">
                    <input type="text" name="whs_cd" value="">
                    <a class="popBt"name="pop_whs_cd"><i class="far fa-window-restore"></i></a>
                </div>
                <input type="text" name="whs_nm" value="">
            </div>
        </div>
    </div>
</form>
<div class="scrollWrap cf">
    <div class="contWrap scrollWrap half fl">
        <div class="grids" id="grid01"></div>
    </div>
    <div class="contWrap scrollWrap half fl ml_10">
        <div class="grids" id="grid02"></div>
    </div>
</div>

<script type="module" src="/include/js/base/standard/wrhs_loc_mgt.js"></script>
<!---->
<!--<script>-->
<!---->
<!--    var te_val = {-->
<!--        param: [-->
<!--            [-->
<!--                {cu: "C", fact_cd: "winp01", whs_cd: "창고코드01", whs_nm: "창고명01", use_yn: "Y",},-->
<!--                {cu: "C", fact_cd: "winp01", whs_cd: "창고코드02", whs_nm: "창고명02", use_yn: "Y",}-->
<!--            ],-->
<!--            [-->
<!--                {cu: "C", fact_cd: "winp01", whs_cd: "창고코드01", loc_cd: "위치코드02", loc_nm: "위치명01", use_yn: "Y",},-->
<!--                {cu: "C", fact_cd: "winp01", whs_cd: "창고코드02", loc_cd: "위치코드02", loc_nm: "위치명02", use_yn: "Y",}-->
<!--            ]-->
<!--        ],-->
<!--        cnct_btn: "B0004",-->
<!--        cnct_url: "/base/product/eqpmt_fault_item_mgt"-->
<!--    }-->
<!---->
<!--    var te_func = function (param) {-->
<!--        console.log('param', param);-->
<!--        $.ajax({-->
<!--            url: "/ajax/base/standard/save/wrhs_loc_mgt",   // include/js/base/standard/wrhs_loc_mgt.js-->
<!--            type: "post",-->
<!--            data: param,-->
<!--            dataType: "json",-->
<!--            success: function (data) {-->
<!--                console.log(data);-->
<!--            },-->
<!--            error: function (a,b,c) {-->
<!--                console.log('a', a);-->
<!--                console.log('a', a);-->
<!--                console.log('b', b);-->
<!--                console.log('c', c);-->
<!--            }-->
<!--        });-->
<!--    }-->
<!---->
<!--</script>-->
