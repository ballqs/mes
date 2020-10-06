<style media="screen">
  #grid01 {width: 100%; height:100%;}
  .w2ui-popup .w2ui-popup-buttons {padding-top:20px; background: #fff;}
  .w2ui-popup-body #main {height: calc(100% - 266px);}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine">
            <div class="boxW col-3 select">
                <p>사업장</p>
                <select class="" name="cmpny_cd"></select>
            </div>
            <div class="boxW col-3 search cf popW">
                <p>거래처</p>
                <div class="popW">
                    <input type="text" name="biz_cd">
                    <a class="popBt" name="pop_biz_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="biz_nm">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
  <div class="grids" id="grid01" style="width: 100%;"></div>
</div>

<!--<script type="module" src="/include/js/popups/pop_biz_cd.js"></script>-->
<script type="module" src="/include/js/base/sales/biz_mgt.js"></script>
