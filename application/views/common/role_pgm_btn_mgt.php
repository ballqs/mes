<style media="screen">
    .scrollWrap {height: calc(100% - 90px);}
    .contWrapH1{height: calc(100% - 40px);}
    .contWrapH2{height:calc(100vh - 325px);}
    .rightCont{float:right; width:calc(100% - 720px); height: 100%;}
    .sideList{width:350px; float:left; margin-right:10px; overflow-x:auto; height: 100%;}
    .sideTree {width:350px; float:left; margin-right:10px; height: 100%; padding: 10px;}
    .sideTree>ul{overflow-x:auto;}
    .sideTree ul li{font-weight:bold; font-size:15px; margin-bottom:15px;}
    .sideTree .subList li{font-weight:normal; font-size:14px; margin-left:30px; margin-bottom:5px; white-space:nowrap;}
    .proPath input {width: 640px;}

</style>

<div class="scrollWrap">
    <div class="sideList">
        <form id="search_frm" action="./role_pgm_btn_mgt" method="get">
  		<input type="hidden" name="load_type" value="">
	    <input type="hidden" name="cnct_url" value="/<?php echo uri_string(); ?>">
	    <input type="hidden" name="cnct_btn" value="B0001">
        <div class="searchLine cf">
            <div class="boxW col-1 search">
                <p>역할 ID</p>
                <input type="text" name="role_id" value="<?php echo $this->input->get('role_id');?>">
            </div>
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
            <div class="contWrap cf mb_10">
    		    <input type="hidden" name="selected_role_id" value="">
                <h4 class="contTitle">프로그램 상세</h4>
                <div class="searchLine cf">
                    <div class="boxW col-3 search">
                        <p>메뉴/프로그램 ID</p>
                        <input type="text" name="pgm_id" value="" disabled>
                    </div>
                    <div class="boxW col-3 search">
                        <p>메뉴/프로그램 명</p>
                        <input type="text" name="pgm_nm" value="" disabled>
                    </div>
                </div>
                <div class="searchLine cf">
                    <div class="boxW col-3 search">
                        <p>화면구분</p>
                        <input type="text" name="pgm_gbm" value="" disabled>
                    </div>
                    <div class="boxW col-3 search">
                        <p>순서</p>
                        <input type="text" name="pgm_ordr" value="" disabled>
                    </div>
                </div>
                <div class="searchLine cf">
                    <div class="boxW col-1 search">
                        <p>프로그램 경로</p>
                        <input type="text" name="url" value="" style="width: 570px;" disabled>
                    </div>
                </div>
                <div class="searchLine cf">
                    <div class="boxW col-3 search">
                        <p>상위메뉴</p>
                        <input type="text" name="up_pgm_id" value="" disabled>
                    </div>
                    <div class="boxW col-3 search">
                        <input type="checkbox" name="use_yn" id="YN" disabled>
                        <label for="YN">사용여부</label>
                    </div>
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
<script type="text/javascript" src="/include/js/treeTool.js"></script>
<script type="text/javascript" src="/include/js/common/role_pgm_btn_mgt.js"></script>
<script type="text/javascript">
var records = role_data(<?php echo json_encode($info);?>);
var btns = attach_imgtag(role_data(<?php echo json_encode($btns); ?>));
</script>
