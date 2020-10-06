<style media="screen">
    .scrollWrap {height: calc(100% - 183px);}
    #grid01 {width: 100%; height: 100%;}
</style>
<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-2 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
    <!--        <div class="select">-->
    <!--            <p>기준년월</p>-->
    <!--            <select name="base_ym">-->
    <!--                <option value="2020-04">2020-04</option>-->
    <!--                <option value="2020-05">2020-05</option>-->
    <!--                <option value="2020-06">2020-06</option>-->
    <!--            </select>-->
    <!--            <i class="fa fa-caret-down"></i>-->
    <!--        </div>-->
            <div class="boxW col-2 search mCalendar w2ui-field">
                <p>기준연월</p>
    <!--         연월만 -->
                <input type="month" name="base_ym" id="month1" datetype="Ymd">
<!--                <input type="text" name="base_ym" readonly="" autocomplete="off">-->
<!--                <input type="us-date" id="base_ym" placeholder="yyyy-mm-dd" class="w2field w2ui-input" autocomplete="off" style="box-sizing: border-box;">-->
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-2 select">
                <p>제품유형</p>
                <select name="account_type"></select>
            </div>
            <div class="boxW col-2 search cf popW">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd" maxlength="20">
                    <a class="popBt" name="pop_prt_nbr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
            </div>
        </div>
    </div>
</form>
<div class="contWrap scrollWrap">
    <div id="grid01"></div>
</div>

<script type="module" src="/include/js/material/purchase/prchs_mon_pln_mgt.js"></script>
