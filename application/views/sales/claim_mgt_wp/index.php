<style media="screen">
    .scrollWrap {height: calc(100% - 203px);}
    #grid01 {width: 100%; height:100%; }
    #w2ui-popup .w2ui-box {height: 790px !important;}
</style>

<form id="search_frm">
    <div class="contWrap cf">
        <div class="SearchLine cf">
            <div class="select" style="margin-right:200px">
                <p>공장</p>
                <select class="" name="cmpny_cd" style="display: none;">
                    <option value="">ALL</option>
                </select>
                <select class="" name="fact_cd">
                    <option value="">ALL</option>
                </select>
                <i class="fa fa fa-caret-down"></i>
            </div>
            <div class="Search">
                <p>클레임 일자</p>
                <input type="date" name="date1" id="date1" datetype="Ymd">
                <span>~</span>
                <input type="date" name="date2" id="date2" datetype="Ymd">
            </div>
        </div>
        <div class="SearchLine cf">
            <div class="Search popW">
                <p>출고처</p>
                <input type="text" name="biz_cd">
                <a class="popBt" name="pop_biz_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search">
                <input type="text" name="biz_nm">
            </div>
            <div class="Search popW">
                <p>출고처현장</p>
                <input type="text" name="ship_cd">
                <a class="popBt" name="pop_ship_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search">
                <input type="text" name="ship_nm">
            </div>
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

<script type="module" src="/include/js/sales/claim_mgt_wp.js"></script>
