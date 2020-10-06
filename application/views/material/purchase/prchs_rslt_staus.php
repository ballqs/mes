<style media="screen">
    #grid01 {width: 100%; height: 100%;}
    .scrollWrap {height: calc(100% - 183px);}
</style>


<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd">
                </select>
            </div>
            <div class="boxW col-3 search">
                <p>일자</p>
                <input type="date" id="date1" name="date1" value="" datetype="Ymd">
                <span>~</span>
                <input type="date" id="date2" name="date2" value="" datetype="Ymd">
            </div>
            <div class="boxW col-3 search">
                <p>거래처</p>
                <div class="popW">
                    <input type="text" name="biz_cd">
                    <a class="popBt" name="pop_biz_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="biz_nm">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>발주상태</p>
                <select name="po_staus_cd">
                    <option value="">ALL</option>
                    <option value="10">대기</option>
                    <option value="20">승인</option>
                    <option value="30">완료</option>
                </select>
            </div>
            <div class="boxW col-3 search popW">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="pop_prt_nbr_cd_wp"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
    <div id="grid01"></div>
</div>

<script type="module" src="/include/js/material/purchase/prchs_rslt_staus.js"></script>
