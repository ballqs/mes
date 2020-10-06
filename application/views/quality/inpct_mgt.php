<style media="screen">
    .half {width: calc(50% - 5px); height: calc(100% - 256px);}
    .heightHalf {height: 50%;}
    #grid01, #grid02{width: 100%; height: 100%;}
    .scrollWrap {height: calc((100% - 193px) / 2);}
</style>
<form id="search_frm" name="search_frm">
    <div class="searchWrap cf" style="height: 150px">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
                <div style="display: none">
                <input type="text"  name="inspct_unit">
                <input type="text"  name="inspct_cd">
                <input type="text"  name="inspct_nm">
                <input type="text"  name="inspct_seq">
                <input type="text"  name="inspct_stdrd_type">
                <input type="text"  name="low_limit_value">
                <input type="text"  name="mid_value">
                <input type="text"  name="up_limit_value">
                <input type="text"  name="prt_nbr_cd">
                <input type="text"  name="prt_nbr_nm">
                </div>
            </div>
            <div class="boxW col-3 search">
                <p>검사일자</p>
                <input type="date" id="date1" name="date1" value="" datetype="Ymd">
                <span>~</span>
                <input type="date" id="date2" name="date2" value="" datetype="Ymd">
            </div>
            <div class="boxW col-3 search">
                <p>검사항목</p>
                <div class="popW">
                    <input type="text" name="inspct_cd">
                    <a class="popBt" name="pop_inpct_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="inspct_nm">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd" style="width: 189px;">
                    <a class="popBt" name="pop_prt_nbr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm"  style="width: 187px;">
            </div>
            <div class="boxW col-3 select">
                <p>검사유형</p>
                <select id="day_night" name="day_night"></select>
                <select id="inspct_act_gbn" name="inspct_act_gbn"></select>
            </div>
            <div class="boxW col-3 select">
                <p>시료수</p>
                <input type="text" name="siryosu" id="siryosu" value=1>
            </div>
        </div>
        <div class="boxW col-3 search">
            <p>작업장</p>
            <div class="popW">
                <input type="text" style=" width 10px ; height: 30px" name="wrkctr_cd">
                <a class="popBt" name="pop_wrkctr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <input type="text" style="height: 30px" name="wrkctr_nm">
        </div>
    </div>
</form>


<div class="contWrap scrollWrap mb_10">
    <div class="grids" id="grid01"></div>
</div>
<div class="contWrap scrollWrap">
    <div class="grids" id="grid02"></div>
</div>

<script type="module" src="/include/js/quality/inpct_mgt.js"></script>
