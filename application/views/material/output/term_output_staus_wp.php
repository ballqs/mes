<style media="screen">
    #grid01 {width: 100%; height: 100%;}
    .scrollWrap {height: calc(100% - 226px);}
</style>
<form id="search_frm">
    <div class="contWrap cf">
        <div class="SearchLine cf">
            <div class="select" style="margin-right: 50px;">
                <p>공장</p>
                <select name="fact_cd">
                    <option value="winp01">윈플러스</option>
                </select>
                <i class="fa fa-caret-down"></i>
            </div>
            <div class="select" style="display: none;">
                <p>사업장</p>
                <select class="" name="cmpny_cd"></select>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </div>
            <div class="Search" style="margin-left: 150px;">
                <p>출고일자</p>
                <input type="date" id="date1" name="date1" value="" datetype="Ymd">
                <span>~</span>
                <input type="date" id="date2" name="date2" value="" datetype="Ymd">
            </div>
        </div>
        <div class="SearchLine cf">
            <div class="Search cf popW">
                <p>품번</p>
                <input type="text" name="prt_nbr_cd">
                <a class="popBt" name="pop_prt_nbr_cd_wp"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search">
                <input type="text" name="prt_nbr_nm">
            </div>
            <div class="Search cf popW">
                <p>창고</p>
                <a class="popBt"  name = "pop_whs_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                <input type="text" name="whs_cd" value="">
            </div>
            <div class="Search">
                <input type="text" name="whs_nm" value="">
            </div>
            <div class="Search cf popW">
                <p>위치</p>
                <a class="popBt"  name = "pop_loc_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                <input type="text" name="loc_cd" value="">
            </div>
            <div class="Search">
                <input type="text" name="loc_nm" value="">
            </div>
        </div>
        <div class="SearchLine cf">
            <div class="select" style="margin-right:200px;">
                <p>출고구분</p>
                <select name="out_gbn">
                </select>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
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
    <div id="grid01"></div>
</div>

<script>
    let now_date = new Date();
    let y = now_date.getFullYear();
    let m = (now_date.getMonth() + 1) < 10 ? '0' + (now_date.getMonth() + 1) : (now_date.getMonth() + 1);
    let d = now_date.getDate() < 10 ? '0' + now_date.getDate() : now_date.getDate();
    let result = y+'-'+m+'-'+d;
    document.getElementById('date1').value = result;
    document.getElementById('date2').value = result;
</script>

<script type="module" src="/include/js/material/output/term_output_staus_wp.js"></script>
