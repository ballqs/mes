<style media="screen">
  #grid01 {width: 100%; height:100%;}
</style>
<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine">
            <div class="boxW col-3 select">
                <p>사업장</p>
                <select class="" name="cmpny_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>출고처</p>
                <div class="popW">
                    <input type="text" name="biz_cd">
                    <a class="popBt" name="pop_biz_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="biz_nm">
            </div>
            <div class="boxW col-3 search">
                <p>출고처현장</p>
                <div class="popW">
                    <input type="text" name="ship_cd">
                    <a class="popBt" name="pop_ship_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="ship_nm">
            </div>
        </div>
    </div>
</form>
<div class="contWrap scrollWrap">
  <div class="grids" id="grid01" style="width: 100%;"></div>
</div>

<!--<script type="module" src="/include/js/popups/pop_ship_cd.js"></script>-->
<script type="module" src="/include/js/base/sales/biz_plce_mgt.js"></script>
