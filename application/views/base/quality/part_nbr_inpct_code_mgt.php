<style media="screen">
    .half {width: calc(50% - 5px); height: 100%;}
    .heightHalf {height: calc(50% - 21px);}
  #grid01,#grid02{width: 100%; height: 100%; position: relative;}


    .tabCont p, .tabCont input {display: inline-block;}
    .tabCont p {width: 65px; text-align: right; margin-right: 10px;}
    .tabCont input[type="text"] {padding: 5px; width: 155px;}

    .tabCont.short input {width: 75px; margin-right: 5px;}
</style>


<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>품번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="btn_pop_prt_nbr_cd"><i class="far fa-window-restore"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm">
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

        <form id="detail_frm" name="detail_frm">

            <div class="contWrap heightHalf mb_10">
                <h4 class="contTitle">품질검사 입력사항</h4>
                <div class="searchLine">
                    <div class="boxW col-1 search">
                        <p>검사 항목</p>
                        <div class="popW">
                            <input type="text" name="inspct_cd" value="" style=" width: 200px;" readonly="readonly" >
                            <a class="popBt" name="detail_pop_inpct_cd"><i class="far fa-window-restore"></i></a>
                        </div>
                        <input type="text" name="inspct_nm" value="" style="width: 210px; margin-right: 25px;" readonly="readonly">

                        규격유형
                        <select name="inspct_stdrd_type" style="margin-left: 10px"></select>
                        <select name="fact_cd" style="display: none" ></select>
                        <input type="text" name="prt_nbr_cd"  style="display: none">
                        <input type="text" name="prt_nbr_nm" style="display: none">
                        <input type="text" name="cu" style="display: none">
                    </div>
                </div>
                <div class="searchLine">
                    <div class="boxW col-1 select search">
                        <p>상한값</p>
                        <input type="text" name="up_limit_value" value="" style="text-align: right"  disabled ="false">
                  </div>
                </div>
                <div class="searchLine">
                    <div class="boxW col-1 select search">
                        <p>중간값</p>
                        <input type="text" name="mid_value" value="" style=" text-align: right" disabled = "ture" >
                    </div>
                </div>
                <div class="searchLine">
                    <div class="boxW col-1 select search">
                        <p>하한값</p>
                        <input type="text" name="low_limit_value" value="" style="text-align:right " disabled ="false">
                    </div>
                    <div class="boxW col-1 select search">
                        <p>측정 단위</p>
                        <select name="inspct_unit" style="margin-left: 10px"></select>
                        사용
                        <input type="checkbox" name="use_yn" value="false" style="margin-left: 10px" checked>
                    </div>

                    <div class="boxW col-1 select search">

                    </div>
                    <div
                </div>
                <div class="searchLine">
                    <div class="boxW col-1 select search">
                        <p>비고</p>
                        <input type="text" name="remark" value="" style="width: 50% ;  text-align: left">
                    </div>
                </div>
                <div class="searchLine" style="display: none">
                    <div class="boxW col-1 select search">
                        <p>소요량</p>
                        <input type="text" name="inspct_seq" value="" style="text-align: right">
                        </select>
                    </div>
                </div>

            </div>
        </form>
    </div>
</div>



<script type="module" src="/include/js/base/quality/part_nbr_inpct_code_mgt.js"></script>
