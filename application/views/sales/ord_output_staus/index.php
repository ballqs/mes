<style media="screen">
    #grid1 {width: 100%; height:100%; }
    #w2ui-popup .w2ui-box {height: 790px !important;}
</style>

<div class="searchWrap cf">
    <div class="searchLine cf">
        <div class="boxW col-3 select">
            <p>공장</p>
            <select class="" name="">
                <option value="">ALL</option>
            </select>
        </div>
        <div class="boxW col-3 search">
            <p>수주일자</p>
            <input type="date">
            <span>~</span>
            <input type="date" name="" value="">
        </div>
        <div class="boxW col-3 search popW">
            <p>거래처</p>
            <div class="popW">
                <input type="text">
                <a class="popBt" onclick="open_pop_biz_cd()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <input type="text">
        </div>
    </div>
</div>

<div class="contWrap scrollWrap">
    <div id="grid1"></div>
</div>

<script type="text/javascript" src="/include/js/popups/pop_biz_cd.js"></script>
<script type="text/javascript" src="/include/js/sales/ord_output_staus.js"></script>
