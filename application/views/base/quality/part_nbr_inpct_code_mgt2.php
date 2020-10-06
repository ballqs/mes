<style media="screen">
    .half {width: calc(50% - 5px); height: 100%;}
    .heightHalf {height: calc(50% - 21px);}
    #grid,#grid01,#grid02,#grid03 {width: 100%; height: 100%; position: relative;}

    /* tab */
    .tab {width: 100%; height: calc(100% - 32px);}
    #tabs {width: 100%;}
    #tab-example {width: 100%; height: 100%;}
    .tabInner {padding-top: 20px; font-size: 14px; height: 100%; width: 100%;}
    .tabCont {margin-bottom: 5px;}
    .tabCont p, .tabCont input {display: inline-block;}
    .tabCont p {width: 65px; text-align: right; margin-right: 10px;}
    .tabCont input[type="text"] {padding: 5px; width: 155px;}
    .tabInBt {padding: 7px 20px; background: #ff9000; color: #fff; font-size: 14px; font-weight: normal; margin-right: 5px; border-radius: 7px;}
    .tabInBt.cancel {background: #aaa;}
    .tabBtWrap {text-align: right; width: 450px; display: block; margin-top: 30px;}
    .tabCont.short input {width: 75px; margin-right: 5px;}
</style>


<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine">
            <div class="boxW col-4 select">
                <p>공장</p>
                <select name="fact_cd">
                    <option value="winp01">윈플러스01</option>
                    <option value="winp02">윈플러스02</option>
                </select>
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

<div class="scrollWrap cf">
    <div class="contWrap fl half" style="margin-bottom:0;">
        <div id="grid01"></div>
    </div>

    <div class="fl half ml_10">
        <div class="contWrap heightHalf mb_10">
            <div id="grid02"></div>
        </div>
        <div id="tabs"></div>
        <div class="contWrap heightHalf scrollWrap" style="margin-bottom:0;">
            <div id="tab-example">
                <div id="tab1" class="tab">
                    <div class="tabInner">
                        <div class="tabCont short">
                            <p>검사항목</p><input type="text" name="" value=""><input type="text" name="" value="">
                        </div>
                        <div class="tabCont">
                            <p>적용일자</p><input type="text" name="" value="">
                            <p>검사유형</p><input type="text" name="" value="">
                        </div>
                        <div class="tabCont">
                            <p>측정유형</p><input type="text" name="" value="">
                        </div>
                        <div class="tabCont">
                            <p>규격유형</p><input type="text" name="" value="">
                        </div>
                        <div class="tabCont">
                            <p>상한값</p><input type="text" name="" value="">
                        </div>
                        <div class="tabCont">
                            <p>중앙값</p><input type="text" name="" value="">
                        </div>
                        <div class="tabCont">
                            <p>하한값</p><input type="text" name="" value="">
                            <p>사용여부</p><input type="radio" name="" value="" id="obc"><label for="obc" class="ml_5">사용</label>
                        </div>
                        <div class="tabCont">
                            <p>비고</p><input type="text" name="" value="" style="width: 380px;">
                        </div>
                        <div class="tabBtWrap">
                            <a class="tabInBt">추가</a>
                            <a class="tabInBt cancel">삭제</a>
                        </div>
                    </div>
                </div>

                <div id="tab2" class="tab">
                    <div class="tabInner">
                        <div id="grid"></div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>



<script type="text/javascript" src="/include/js/popups/pop_prt_nbr_cd.js"></script>
<script type="text/javascript" src="/include/js/base/quality/part_nbr_inpct_code_mgt.js"></script>
