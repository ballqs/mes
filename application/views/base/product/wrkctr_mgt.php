<style media="screen">
    #grid {width: 100%; height:100%;}
</style>
<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine">
            <div class="boxW col-3 select">
                <p>공장1</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>작업장</p>
                <div class="popW">
                    <input type="text" name="wrkctr_cd" value="">
                    <a class="popBt" name="pop_wrkctr_cd"><i class="far fa-window-restore"></i></a>
                </div>
                <input type="text" name="wrkctr_nm" value="">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
    <div id="grid" style="width: 100%;"></div>
</div>

<script type="module" src="/include/js/base/product/wrkctr_mgt.js"></script>
