<style media="screen">
    .scrollWrap {height: calc(100% - 182px);}
    #grid01 {width: 100%; height:100%;}
    label {display: inline-block; vertical-align: middle; margin-left: 3px;}
    .Search input[type="radio"] {width: 15px;}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd">
                </select>
            </div>
            <div class="boxW col-3 select">
                <p>반영여부</p>
                <select name="aply_yn">
                    <option value="">ALL</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd" value="">
                    <a class="popBt" name="btn_pop_prt_nbr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm" value="">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 search">
                <p>데이터 조회</p>
                <input type="radio" name="dsp_gbn" value="1" id="dataY" checked="checked">
                <label for="dataY">실사</label>
                <input type="radio" name="dsp_gbn" value="0" id="dataN" class="ml_20">
                <label for="dataN">미실사</label>
            </div>
            <div class="boxW col-3 search">
                <p>LOT NO</p>
                <input type="text" name="lotno" value="">
            </div>
            <div class="boxW col-3 search">
                <p>실사일자</p>
                <input type="date" name="taking_ymd" value="" id="date1" datetype="Ymd">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
  <div id="grid01"></div>
</div>




<!--<script type="text/javascript" src="/include/js/popups/pop_prt_nbr_cd.js"></script>-->
<script type="module" src="/include/js/stock/stck_ajst_mgt.js"></script>
