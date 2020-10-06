<style media="screen">
    #grid01 {width: 100%; height: 100%;}
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
                <p>기준년월</p>
                <input type="month" name="base_ym" id="month1" datetype="Ymd">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>제품유형</p>
                <select name="account_type">
                </select>
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

<script type="module" src="/include/js/production/plan/prd_mon_mgt.js"></script>
