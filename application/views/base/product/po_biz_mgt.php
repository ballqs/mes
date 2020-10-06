<style media="screen">
  #grid01 {width: 100%; height:100%;}
  .scrollWrap{height:calc(100% - 183px);}
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
                <p>사용여부</p>
                <select name="fuse_yn">
                    <option value="">전체</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>

                </select>
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 search">
                <p>발주업체</p>
                <div class="popW">
                    <input type="text" name="biz_cd" value="">
                    <a class="popBt" name="pop_biz_cd"><i class="far fa-window-restore"></i></a>
                </div>
                <input type="text" name="biz_nm" value="">
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

<div class="contWrap scrollWrap">
  <div class="grids" id="grid01" style="width: 100%;"></div>
</div>

<script type="module" src="/include/js/base/product/po_biz_mgt.js"></script>
