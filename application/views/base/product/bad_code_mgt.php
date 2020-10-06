<style media="screen">
  #grid {width: 100%; height:100%;}
</style>
<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>불량</p>
                <p>량불</p>
                <input type="text" name="err_cd">
                <input type="text" name="err_nm">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
  <div class="grids" id="grid" style="width: 100%;"></div>
</div>


<script type="module" src="/include/js/base/product/bad_code_mgt.js"></script>
