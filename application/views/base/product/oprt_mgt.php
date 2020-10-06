<?php
$attr = array("id"=>"search_frm");
$hidd = array();
?>
<style media="screen">
  #grid {width: 100%; height:100%;}
</style>
<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine">
            <div class="boxW col-3 select">
                <p>공장코드</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 select">
                <p>공정</p>
                <div class="popW">
                    <input type="text" name="op_cd" value="">
                    <a class="popBt" name="pop_op_cd"><i class="far fa-window-restore"></i></a>
                </div>
                <input type="text" name="op_nm" value="">
            </div>
        </div>
    </div>
</form>
<div class="contWrap scrollWrap">
  <div id="grid" style="width: 100%;"></div>
</div>

<!--<script type="text/javascript" src="/include/js/base/product/oprt_mgt.js"></script>-->
<!--<script type="text/javascript" src="/include/js/base/product/oprt_mgt3.js"></script>-->
<script type="module" src="/include/js/base/product/oprt_mgt.js"></script>
