<style media="screen">
    .scrollWrap{height:calc(100vh - 242px)}
    .contWrap{overflow-x:auto;}
    .Table thead th i{margin-left:5px;}
    .Table tbody td{white-space:nowrap; padding:10px 20px;}
    .rightCont{float:right; width:calc(100% - 670px);}
    .rightCont>div>p{width:120px;}
    .sideList{width:350px; float:left; margin-right:10px; overflow-x:auto;}
    .sideTree{width:300px; float:left; margin-right:10px;}
    .sideTree>ul{overflow-x:auto;}
    .sideTree ul li{font-weight:bold; font-size:15px; margin-bottom:15px;}
    .sideTree .subList li{font-weight:normal; font-size:14px; margin-left:30px; margin-bottom:5px; white-space:nowrap;}
    .Search{margin-bottom:10px;}
    .Search input{width:200px;}
    .Search p{width:150px;}
    .contWrap .select{float:left; margin-right:70px; margin-bottom:10px;}
    .contWrap .select .selectDiv{position:relative; display:inline-block; margin-left:-3px;}
    .contWrap .select i{position:absolute; top:8px; right:10px;}
    .contWrap .select p{display:inline-block; width:150px; margin-right:20px;}
    .contWrap .select select{display:inline-block; width:200px; padding:6px; border-radius:0; border:1px solid #d9d9d9; font-size:14px;}
    .contWrap .checkbox {}
    .contWrap .checkbox input{vertical-align:top; margin-top:8px; margin-right:10px;}
    .contWrapH2{height:calc(100vh - 481px);}
    .contWrapH1{height:calc(100vh - 316px);}
    .proPath input {width: 640px;}

    @media screen and (max-width: 1750px){
        .contWrapH2{height:calc(100vh - 614px);}
    }
    @media screen and (max-width: 1340px){
        .contWrapH2{height:calc(100vh - 759px);}
    }

    @media(max-width: 1800px) {
        .proPath input {width: calc(100% - 170px);}
    }
    @media(max-width: 1420px) {
        .proPath input {width: 200px;}
    }
    @media(max-width: 1410px) {
        .proPath input {display: block;}
    }

    #grid_grid3_records table tr td {border: none;}
    #grid_grid3_columns .w2ui-col-header {display: none ;}
    #grid_grid3_frecords table {display: none !important;}
    #grid_grid3_fcolumns {display: none;}

</style>

<div class="cf">
    <div class="sideList">
        <form id="search_frm" action="./role_pgm_btn_mgt" method="get">
            <input type="hidden" name="load_type" value="">
            <div class="contWrap">
                <div class="Search" style="margin:0"><p style="width:70px;">ROLE ID</p><input type="text" name="role_id" value=""></div>
            </div>
        </form>
        <div class="contWrap scrollWrap contWrapH1">
            <div id="grid" style="width: 100%; height: 100%; "></div>
        </div>
    </div>

    <div class="contWrap scrollWrap sideTree">
        <ul id="menu_tree"></ul>
    </div>

    <div class="rightCont">
        <form id="dtl_frm">
            <div class="contWrap cf">
                <input type="hidden" name="selected_role_id" value="">
                <h4 class="contTitle">PROGRAM DETAIL</h4>
                <div class="Search"><p>메뉴/프로그램 ID</p><input type="text" name="pgm_id" value="" disabled></div>
                <div class="Search"><p>메뉴/프로그램 명</p><input type="text" name="pgm_nm" value="" disabled></div>
                <div class="Search"><p>화면구분</p><input type="text" name="pgm_gbm" value="" disabled></div>
                <div class="Search"><p>순서</p><input type="text" name="pgm_ordr" value="" disabled></div>
                <div class="Search proPath" style="width: 100%;"><p>프로그램 경로</p><input type="text" name="url" value="" disabled></div>
                <div class="Search"><p>상위메뉴</p><input type="text" name="up_pgm_id" value="" disabled></div>
                <div class="search">
                    <div class="checkbox fl"><label for="YN"><input type="checkbox" name="use_yn" id="YN" disabled>USE YN</label></div>
                </div>

            </div>
        </form>
        <form id="grid_frm">
            <div class="contWrap scrollWrap contWrapH2">
                <div id="grid2" style="width: 100%; height: 100%; "></div>
            </div>
        </form>
    </div>
</div>

<!-- 스크립트 -->
<script type="text/javascript" src="/include/js/mesTree.js"></script>
<!--<script type="text/javascript" src="/include/js/treeTool.js"></script>-->
<script type="text/javascript" src="/include/js/jsh.js"></script>
<script type="text/javascript">
    var menu_data = new MesTree(<?php echo json_encode($pgm); ?>, "up_pgm_id", "pgm_id", "MES", "pgm_nm");

    console.log((menu_data.data));
    //menu_data.dmenu("menu_tree", "subList mt_5", "onclick='menu_dtl(this)' onmouseover='m_over(this)' onmouseout='m_out(this)'");

    var mTest =<?php echo json_encode($pgm); ?>;
    //var sorted_data  = jsh_tree_sort(mTest, "up_pgm_id", "pgm_id", "pgm_nm", "MES", "pgm_ordr", "asc");
    var records = role_data(<?php echo json_encode($info);?>);
    var btns = attach_imgtag(role_data(<?php echo json_encode($btns); ?>));
</script>




























