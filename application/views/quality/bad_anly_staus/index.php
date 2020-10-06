<style media="screen">
  #grid01 {width: 100%; height:100%;}
  .scrollWrap {height: calc(100% - 183px);}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd">
                    <option>ALL</option>
                </select>
            </div>
            <div class="boxW col-3 search">
                <p>작업일자</p>
                <input type="date" name="date1" id="date1" value="" datetype="Ymd">
                <span> ~ </span>
                <input type="date" name="date2" id="date2" value="" datetype="Ymd">
            </div>
            <div class="boxW col-3 search">
                <p>공정</p>
                <div class="popW">
                    <input type="text" name="op_cd">
                    <a class="popBt" name="pop_op_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="op_nm">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>제품구분</p>
                <select name="account_type">
                    <option>ALL</option>
                </select>
            </div>
            <div class="boxW col-3 search popW">
                <p>작업장</p>
                <div class="popW">
                    <input type="text" name="wrkctr_cd">
                    <a class="popBt" name="pop_wrkctr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="wrkctr_nm">
            </div>
            <div class="boxW col-3 select">
                <p>불량내역</p>
                <select name="err_gbn">
                    <option>ALL</option>
                </select>
            </div>
        </div>
    </div>
</form>
<div class="contWrap scrollWrap">
  <div id="grid01" style="width: 100%;"></div>
</div>


<script type="module" src="/include/js/quality/bad_anly_staus.js"></script>
