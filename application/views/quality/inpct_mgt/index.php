<style media="screen">
  #grid01 {width: 100%; height:100%;}
  .scrollWrap {height: calc(100% - 183px);}
</style>

<div class="searchWrap cf">
    <div class="searchLine cf">
        <div class="boxW col-3 select"><p>공장</p><select><option>ALL</option></select></div>
        <div class="boxW col-3 search">
            <p>검사일자</p>
            <input type="date" name="" value=""><span> ~ </span><input type="date" name="" value="">
        </div>
    </div>
    <div class="searchLine cf">
        <div class="boxW col-3 search popW">
            <p>작업장</p>
            <div class="popW">
                <input type="text">
                <a class="popBt" onclick="openPopup1()"><i class="far fa-window-restore"></i></a>
            </div>
            <input type="text">
        </div>
        <div class="boxW col-3 search popW">
            <p>검사품번</p>
            <div class="popW">
                <input type="text">
                <a class="popBt" onclick="openPopup2()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <input type="text">
        </div>
        <div class="boxW col-3 select"><p>검사구분</p><select><option>ALL</option></select></div>
    </div>
</div>

<div class="contWrap scrollWrap">
  <div id="grid01" style="width: 100%;"></div>
</div>


<script type="text/javascript" src="/include/js/quality/inpct_mgt.js"></script>
