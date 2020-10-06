<style media="screen">
  #grid01 {width: 100%; height:100%;}
  .scrollWrap {height: calc(100% - 239px);}
</style>

<form id="search_frm">
    <div class="contWrap cf">
        <div class="SearchLine cf">
            <div class="select" style="margin-right:200px;">
                <p>공장</p>
                <select class="" name="fact_cd">
                    <option value="winp01">윈플러스01</option>
                    <option value="winp02">윈플러스02</option>
                </select>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </div>
            <div class="Search">
                <p>계획일자</p>
                <input type="date" name="" value="">
                <span>~</span>
                <input type="date" name="" value="">
            </div>
        </div>
        <div class="SearchLine cf">
            <div class="Search popW">
                <p>공정</p>
                <input type="text">
                <a class="popBt" onclick="openPopup1()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search"><input type="text"></div>
            <div class="Search popW">
                <p>품번</p>
                <input type="text">
                <a class="popBt" onclick="open_pop_prt_nbr_cd()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search"><input type="text"></div>
        </div>
        <div class="SearchLine cf">
            <div class="Search popW">
                <p>작업장</p>
                <input type="text">
                <a class="popBt" onclick="openPopup3()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <div class="Search"><input type="text"></div>
            <div class="select">
                <p>주/야구분</p>
                <select><option>ALL</option></select><i class="fa fa-caret-down" aria-hidden="true"></i>
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
  <div id="grid01" style="width: 100%;"></div>
</div>


<script type="text/javascript" src="/include/js/popups/pop_prt_nbr_cd.js"></script>
<script type="text/javascript" src="/include/js/production/plan/wrkctr_ord_mgt_backup.js"></script>
