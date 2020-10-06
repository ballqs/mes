<style media="screen">
    .scrollWrap {height: calc(100% - 215px);}
    #grid01, #grid02, #grid03 {width: 100%; height:100%; }
    #w2ui-popup .w2ui-box {height: 790px !important;}
    #selected-tab {height: 100%;}
    .tab {width: 100%; height: 100%; position: relative;}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd">
                    <option value="winp01">윈플러스01</option>
                </select>
            </div>
            <div class="boxW col-3 search">
                <p>생산일자</p>
                <input type="date" name="date1" id="date1" value="" datetype="Ymd">
                <span>~</span>
                <input type="date" name="date2" id="date2" value="" datetype="Ymd">
            </div>
            <div class="boxW col-3 select">
                <p>제품구분</p>
                <select name="account_type">
                    <option>ALL</option>
                </select>
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="pop_prt_nbr_cd"><i class="far fa-window-restore"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
            </div>
            <div class="boxW col-3 select">
                <p>주/야구분</p>
                <select name="daynight_gbn">
                    <option>ALL</option>
                </select>
            </div>
        </div>
    </div>
</form>

<div id="tabs" style="width: 100%;"></div>
<div class="contWrap scrollWrap">
    <div id="selected-tab">
        <div id="tab1" class="tab">
            <div id="grid01"></div>
        </div>
        <div id="tab2" class="tab">
            <div id="grid02"></div>
        </div>
        <div id="tab3" class="tab">
            <div id="grid03"></div>
        </div>
    </div>

</div>

<script type="module" src="/include/js/production/status/prd_day_staus.js"></script>
