<style media="screen">
    .half {width: calc(42% - 5px); height: 100%;}
    .half2{width: calc(58% - 5px); height:100%;}
    .heightHalf {height: calc(100% - 280px);}
    #grid01,#grid02,#grid03 {width: 100%; height: 100%;}
    .contWrap .Hnav li a {color: #333;}
    .contWrap .Hnav li a i {color: #333;}
</style>
<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>제품</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd">
                    <a class="popBt" name="pop_prt_nbr_cd"><i class="far fa-window-restore"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm" value="">
            </div>
            <div class="boxW col-3 select">
                <p>사용여부</p>
                <select name="use_yn">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
        </div>
    </div>
</form>

<div class="scrollWrap" >
    <div class="contWrap fl half">
        <div class="grids" id="grid01"></div>
    </div>

    <div class="fl half2 ml_10">
        <div class="contWrap heightHalf mb_10">
            <div class="grids" id="grid02"></div>
        </div>

        <form id="detail_frm" name="detail_frm">
            <div class="select" style="display: none;">
                <p>공장</p>
                <select name="fact_cd"></select>
                <i class="fa fa-caret-down"></i>
            </div>
            <div class="contWrap heightHalf mb_10">
                <h4 class="contTitle">모 품목 정보</h4>
                    <div class="searchLine">
                        <div class="boxW col-1 search">
                            <p>모품번</p>
                            <input type="text" name="mprt_nbr_cd" value="" disabled>
                            <input type="text" name="mprt_nbr_nm" value="" disabled>
                        </div>
                    </div>
                    <div class="searchLine">
                        <div class="boxW col-1 select search">
                            <p>소요량</p>
                            <input type="text" name="base_qty" value="" disabled style="text-align: right">
                            <select class="" name="base_unit" disabled>
                                <option value="04">ea</option>
                            </select>
                        </div>
                    </div>
            </div>
            <div class="contWrap heightHalf mb_10">
                <h4 class="contTitle">자 품목 정보</h4>
                    <div class="searchLine">
                        <div class="boxW col-1 search">
                            <p>자품번</p>
                            <div class="popW">
                                <input type="text" name="sprt_nbr_cd" value="">
                                <a class="popBt" name="detail_pop_prt_nbr_cd"><i class="far fa-window-restore"></i></a>
                            </div>
                            <input type="text" name="sprt_nbr_nm" value="">
                            <input type="hidden" name="prt_nbr_cd">
                            <input type="hidden" name="prt_nbr_nm">
                        </div>
                    </div>
                    <div class="searchLine">
                        <div class="boxW col-1 select search">
                            <p>소요량</p>
                            <input type="text" name="cmpnt_qty" value="" style="text-align: right">
                            <select class="" name="cmpnt_unit">
                            </select>
                        </div>
                    </div>
            </div>
        </form>
    </div>
</div>

<script>
    $("#detail_frm [name='prt_nbr_cd']").on('input', function() {
        $("#detail_frm [name='sprt_nbr_cd']").val($("#detail_frm [name='prt_nbr_cd']").val());
    });

    $("#detail_frm [name='prt_nbr_nm']").on('input', function() {
        $("#detail_frm [name='sprt_nbr_nm']").val($("#detail_frm [name='prt_nbr_nm']").val());
    });
</script>

<script type="module" src="/include/js/base/standard/bom_mgt.js"></script>
