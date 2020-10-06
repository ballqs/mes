<style media="screen">
  #grid1, #grid2, #grid3 {width: 100%; height:100%; }
  .scrollWrap {height: calc(100% - 256px);}
  #w2ui-popup .w2ui-box {height: 790px !important;}
  #selected-tab {height: calc(100% - 32px);}
  .tab {width: 100%; height: 100%; position: relative;}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd">
                    <option value="winp01">윈플러스01</option>
                    <option value="winp02">윈플러스02</option>
                </select>
            </div>
            <div class="boxW col-3 search">
                <p>출고일자</p>
                <input type="date" name="" value="">
                <span>~</span>
                <input type="date" name="" value="">
            </div>
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text">
                    <a class="popBt" onclick="open_pop_prt_nbr_cd()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>출고구분</p>
                <select><option>ALL</option></select>
            </div>
            <div class="boxW col-3 search">
                <p>거래처</p>
                <div class="popW">
                    <input type="text">
                    <a class="popBt" onclick="open_pop_biz_cd()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text">
            </div>
            <div class="boxW col-3 search">
                <p>출고 번호</p>
                <input type="text">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 search"></div>
            <div class="boxW col-3 search"></div>
            <div class="boxW col-3 search">
                <p>LOT NO</p>
                <input type="text">
            </div>
        </div>
    </div>
</form>
<div id="tabs" style="width: 100%;"></div>
<div class="contWrap scrollWrap">
    <div id="selected-tab">
        <div id="tab1" class="tab">
            <div id="grid1"></div>
        </div>
        <div id="tab2" class="tab">
            <div id="grid2"></div>
        </div>
    </div>

</div>

<script type="text/javascript" src="/include/js/popups/pop_biz_cd.js"></script>
<script type="text/javascript" src="/include/js/popups/pop_prt_nbr_cd.js"></script>
<script type="text/javascript" src="/include/js/sales/term_prct_output_staus.js"></script>
