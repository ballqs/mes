<style media="screen">
  #grid1, #grid2 {width: 100%; height:100% !important;}
  .scrollWrap {height: calc(100% - 183px);}
  #w2ui-popup .w2ui-box {height: 790px !important;}
  #selected-tab {height: calc(100% - 32px);}
  #tabs{width: 100%;}
  .tab {width: 100%; height: 100%; position: relative;}
  #grid_grid1_columns tbody tr, #grid_grid1_fcolumns tbody tr, #grid_grid2_columns tbody tr, #grid_grid2_fcolumns tbody tr {height: 0 !important;}
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
                <p>입고일자</p>
                <input type="date">
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
            <div class="boxW col-3 select cf">
                <p>입고 구분</p>
                <select class="" name="">
                    <option value="">ALL</option>
                </select>
            </div>
            <div class="boxW col-3 search popW">
                <p>거래처</p>
                <div class="popW">
                    <input type="text">
                    <a class="popBt" onclick="open_pop_biz_cd()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text">
            </div>
            <div class="boxW col-3 search">
                <p>LOT NO</p>
                <input type="text" name="" value="">
            </div>
        </div>
    </div>
</form>

<div id="tabs"></div>
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
<script type="text/javascript" src="/include/js/sales/term_prct_input_staus.js"></script>
