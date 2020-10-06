<style media="screen">
    .scrollWrap {height: calc(100% - 453px);}
    #grid01 {width: 100%; height:100%;}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>공정</p>
                <!--            <select>-->
                <!--                <option>ALL</option>-->
                <!--            </select>-->
                <!--            <i class="fa fa-caret-down" aria-hidden="true"></i>-->
                <div class="popW">
                    <a class="popBt" name="pop_op_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                    <input type="text" name="op_cd" value="">
                </div>
                <input type="text" name="op_nm" value="">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap mb_10">
    <div id="grid01" style="width: 100%;"></div>
</div>

<div class="cf">
    <div class="contWrap fl" style="width: calc(50% - 5px);">
        <div style="position: relative; height: 300px;">
            <div id="grid02" style="left: 0px; width: 100%; height: 300px;"></div>
        </div>
    </div>

    <div class="contWrap fr" style="width: calc(50% - 5px);">
        <div style="position: relative; height: 300px;">
            <div id="grid03" style="right: 0px; width: 100%; height: 300px;"></div>
        </div>
    </div>
</div>


<script type="module" src="/include/js/base/product/wrkctr_wrkr_mgt.js"></script>
