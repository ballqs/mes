<style media="screen">
  #grid01 {width: 100%; height:100%;}
</style>
<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine">
            <div class="boxW col-3 select">
                <p>공11111장</p>
                <p>장111111공</p>
                <select name="fact_cd"></select>
            </div>
            <div class="boxW col-3 select" style="display: none;">
                <p>사222업3333자</p>
                <select name="cmpny_cd"></select>
            </div>
            <div class="boxW col-3 search">
                <p>품444444번</p>
                <div class="popW">
                    <input type="text" name="prt_nbr_cd" value="">
                    <a class="popBt" name="btn_pop_prt_nbr_cd"><i class="far fa-window-restore"></i></a>
                </div>
                <input type="text" name="prt_nbr_nm" value="">
            </div>

        </div>
    </div>
</form>

<div class="contWrap scrollWrap">
  <div id="grid01" style="width: 100%;"></div>
</div>


<script type="module" src="/include/js/base/product/part_nbr_rtg_mgt.js"></script>
