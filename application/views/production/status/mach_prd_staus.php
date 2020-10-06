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
                </select>
            </div>
            <div class="boxW col-3 search">
                <p>수불일자</p>
                <input type="date" id="date1" name="date1" value="" datetype="Ymd">
                <span>~</span>
                <input type="date" id="date2" name="date2" value="" datetype="Ymd">
            </div>
            <div class="boxW col-3 search popW">
                <p>공정</p>
                <div class="popW">
                    <input type="text" name="op_cd">
                    <a class="popBt" name="pop_op_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="op_nm">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="pop_prt_nbr_cd_wp"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
            </div>
            <div class="boxW col-3 search">
                <p>작업장</p>
                <div class="popW">
                    <input type="text" name="wrkctr_cd">
                    <a class="popBt" name="pop_wrkctr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="wrkctr_nm">
            </div>
            <div class="boxW col-3 select">
                <p>주/야</p>
                <select name="day_night">
                    <option value="">ALL</option>
                    <option value="D">주간</option>
                    <option value="N">야간</option>
                </select>
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
  <div id="grid01" style="width: 100%;"></div>
</div>

<script type="module" src="/include/js/production/status/mach_prd_staus.js"></script>
