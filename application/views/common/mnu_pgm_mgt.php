<style media="screen">
    .scrollWrap{height:calc(100vh - 110px)}
    .sideList, .rightCont {float: left; height: 100%;}
    .sideList {width: 350px; overflow-x: auto; margin-right: 10px;}
    .rightCont {width: calc(100% - 360px);}
    label {vertical-align: middle;}
    .boxW input[type="text"], .boxW select {width: 300px;}
    .sideList ul li{font-weight:bold; font-size:15px; margin-bottom:15px;}
    .sideList .subList li {font-weight:normal; font-size:14px; margin-left: 20px; margin-bottom:5px; white-space:nowrap;}
    .sideList .subList li.onLi{color:#b7b7b7;}
    .sideList .subList li.onLi a{color:#b7b7b7;}
    #tree_menu {padding: 10px;}
</style>



<div class="scrollWrap cf">
    <div class="contWrap sideList">
        <h4 class="contTitle">메뉴 트리</h4>
        <ul id="tree_menu"></ul>
    </div>
    <?php
    $attr = array('id' => 'pgm_info_form', 'name' => 'pgm_info_form');
    echo form_open(base_url(uri_string()), $attr);
    ?>
    <input type="hidden" name="cnct_url" value="/<?php echo uri_string(); ?>">
    <input type="hidden" name="cnct_btn" value="B0005">
    <div class="contWrap rightCont cf">
        <h4 class="contTitle">메뉴 상세</h4>
        <div class="searchLine cf">
            <div class="boxW col-3 search">
                <p>메뉴 ID</p>
                <input type="text" name="pgm_id" value="" class="blue">
            </div>
            <div class="boxW col-3 search">
                <p>메뉴명</p>
                <input type="text" name="pgm_nm" value="" class="red">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>메뉴구분</p>
                <select name="pgm_gbm" class="blue">
                    <option value=""></option>
                    <option value="P">P</option>
                    <option value="M">M</option>
                </select>
            </div>
            <div class="boxW col-3 search">
                <p>순서</p>
                <input type="text" name="pgm_ordr" value="">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 search">
            </div>
            <div class="boxW col-3 search">
                <p>비고</p>
                <input type="text" name="remark" value="">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>팝업여부</p>
                <select name="prc_gbm" class="red">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
            <div class="boxW col-3 search">
                <p>상위메뉴 ID</p>
                <input type="text" name="up_pgm_id" value="">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 search">
            </div>
            <div class="boxW col-3 search">
                <p>URL</p>
                <input type="text" name="url" value="">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>서비스영역</p>
                <select name="service_area" class="red">
                </select>
            </div>
            <div class="boxW col-3 search">
                <input type="checkbox" name="use_yn" id="YN">
                <label for="YN">사용여부</label>
            </div>
        </div>
    </div>
    <?php echo form_close(); ?>
</div>

<script type="text/javascript" src="/include/js/common/mnu_pgm_mgt.js"></script>
