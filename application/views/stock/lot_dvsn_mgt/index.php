<style media="screen">
    .scrollWrap {height: calc((100% - 191px) / 2);}
    #grid1, #grid2 {width: 100%; height: 100%;}
    #w2ui-popup .w2ui-box {height: 790px !important;}
</style>


<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-2 select">
                <p>공장</p>
                <select name="fact_cd">
                    <option value="winp01">윈플러스01</option>
                    <option value="winp02">윈플러스02</option>
                </select>
            </div>
            <div class="boxW col-2 search">
                <p>창고</p>
                <div class="popW">
                    <input type="text">
                    <a class="popBt" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-2 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text">
                    <a class="popBt" onclick="open_pop_prt_nbr_cd()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text">
            </div>
            <div class="boxW col-2 search">
                <p>위치</p>
                <div class="popW">
                    <input type="text">
                    <a class="popBt" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap mb_10">
    <div id="grid1"></div>
</div>
<div class="contWrap scrollWrap">
    <div id="grid2"></div>
</div>

<script type="text/javascript" src="/include/js/popups/pop_prt_nbr_cd.js"></script>
<script type="text/javascript" src="/include/js/stock/lot_dvsn_mgt.js"></script>
