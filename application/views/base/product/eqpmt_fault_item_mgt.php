<style media="screen">
  #grid {width: 100%; height:100%;}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine">
            <div class="boxW col-3 search">
                <h1>고장</h1>
                <input type="text" name="fault_cd">
                <input type="text" name="fault_nm" value="">
            </div>
            <div class="boxW col-3 select">
                <!-- <p>고장sss유형</p>  -->
                <p>고장유형</p>
                <select name="fault_type"></select>
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
  <div class="grids" id="grid" style="width: 100%;"></div>
</div>


<script type="module" src="/include/js/base/product/eqpmt_fault_item_mgt.js"></script>
