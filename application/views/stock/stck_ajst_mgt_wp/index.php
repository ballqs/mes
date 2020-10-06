<style media="screen">
    .scrollWrap {height: calc(100% - 239px);}
    #grid01 {width: 100%; height:100%;}
    label {display: inline-block; vertical-align: middle; margin-left: 3px;}
    .Search input[type="radio"] {width: 15px;}
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
            <div class="select">
                <p>반영여부</p>
                <select name="aply_yn">
                    <option value="">ALL</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </div>
        </div>
        <div class="SearchLine cf">
            <div class="Search popW">
                <p>품번</p>
                <input type="text" name="prt_nbr_cd" value="">
                <a class="popBt" name="pop_prt_nbr_cd_wp"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search">
                <input type="text" name="prt_nbr_nm" value="">
            </div>
            <div class="Search">
                <p>데이터 조회</p>
                <input type="radio" name="dsp_gbn" value="1" id="dataY" checked="checked">
                <label for="dataY">실사</label>
                <input type="radio" name="dsp_gbn" value="0" id="dataN" class="ml_20">
                <label for="dataN">미실사</label>
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
                <input type="date" name="taking_ymd" value="" id="date0" datetype="Ymd">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
    <div id="grid01"></div>
</div>


<script>
    document.getElementById('date0').valueAsDate = new Date();
</script>

<!--<script type="text/javascript" src="/include/js/popups/pop_prt_nbr_cd.js"></script>-->
<script type="module" src="/include/js/stock/stck_ajst_mgt_wp.js"></script>
