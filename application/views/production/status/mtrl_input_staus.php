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
                    <option value="winp01">윈플러스01</option>
                    <option value="winp02">윈플러스02</option>
                </select>
            </div>
            <div class="boxW col-3 search">
                <p>투입일자</p>
                <input type="date" name="" value="">
                <span>~</span>
                <input type="date" name="" value="">
            </div>
            <div class="boxW col-3 search popW">
                <p>공정</p>
                <div class="popW">
                    <input type="text">
                    <a class="popBt" onclick="openPopup1()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 search">
                <p>작업장</p>
                <div class="popW">
                    <input type="text">
                    <a class="popBt" onclick="openPopup2()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text">
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
    </div>
</form>

<div class="contWrap scrollWrap">
  <div id="grid01" style="width: 100%;"></div>
</div>

<script type="text/javascript" src="/include/js/popups/pop_prt_nbr_cd.js"></script>
<script type="text/javascript" src="/include/js/production/status/mtrl_input_staus.js"></script>
