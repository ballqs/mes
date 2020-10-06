<style media="screen">
    #grid01 {width: 100%; height:100%;}
    .scrollWrap {height: calc(100% - 183px);}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select class="" name="fact_cd">
                </select>
            </div>
            <div class="boxW col-3 search">
                <p>지시일자</p>
                <input type="date" name="date1" id="date1" datetype="Ymd">
                <span>~</span>
                <input type="date" name="date2" id="date2" datetype="Ymd">
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
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="pop_prt_nbr_cd"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
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
                <p>주/야구분</p>
                <select name="daynight_gbn"><option>ALL</option></select>
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
    <div id="grid01" style="width: 100%;"></div>
</div>
<!--팝업 시작-->
<div id="w2ui_popup"
     style="display:none; left: 549px; top: 180px; width: 400px; height: 260px; overflow: hidden"
     class="w2ui-popup">
    <!-- <div class="w2ui-popup-title" style="">
        <div class="w2ui-popup-button w2ui-popup-close" onmousedown="event.stopPropagation()" onclick="w2popup.close()">
            Close</div>
        <div class="w2ui-popup-button w2ui-popup-max" onmousedown="event.stopPropagation()" onclick="w2popup.toggle()">
            Max</div>생산계획
    </div> -->
    <div class="w2ui-box" style="">
        <div class="w2ui-popup-body w2ui-popup-no-title" style="">
            <form id="pop_copy">
                <div class="contWrap cf">
                    <div class="searchLine cf">
                        <div class="boxW col-1 select">
                            <p>공장</p><select class="" name="fact_cd">
                                <option value="">선택</option>
                            </select>
                        </div>
                    </div>
                    <div class="searchLine cf">
                        <div class="boxW col-1 search">
                            <p>기준일자</p><input type="date" name="date3" id="date3">
                        </div>
                    </div>
                    <div class="searchLine cf">
                        <div class="boxW col-1 search">
                            <p>계획일자</p><input type="date" name="date4" id="date4">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="w2ui-popup-buttons" style="margin-bottom: 20px;">
        <button class="w2ui-btn" onclick="w2popup.close();">닫기</button>
        <button class="w2ui-btn" id = 'copy' style="background: #ff9000;">복사</button>
    </div>
    <input class="w2ui-popup-hidden" style="position: absolute; top: -100px">
</div>
<!--팝업 종료-->

<!--<script type="text/javascript" src="/include/js/popups/pop_prt_nbr_cd.js"></script>-->
<script type="module" src="/include/js/production/plan/wrkctr_ord_mgt.js"></script>
