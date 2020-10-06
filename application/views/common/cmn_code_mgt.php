<?php
$attr = array('id' => 'frm');
$hidd = array('cu' => 'c', 'row_num' => '');
?>
<style media="screen">
  .scrollWrap{height:calc(100vh - 110px)}
  .rightCont{float:right; width:calc(100% - 360px);}
  .rightCont .search.wd100 input{width:calc(100% - 100px);}
  .sideList {width:350px; float:left; overflow-x:auto; padding: 10px;}
  .sideList ul li{font-weight:bold; font-size:15px; margin-bottom:15px;}
  .sideList .subList li{font-weight:normal; font-size:14px; margin-left:30px; margin-bottom:5px; white-space:nowrap;}
  .contWrap .textarea{float:left; width:100%; margin-bottom:20px;}
  .contWrap .textarea textarea{display:inline-block; vertical-align:middle; width:660px; height:80px; padding:10px; border:1px solid #d9d9d9;}
  .contWrap .checkbox input{vertical-align:top; margin-top:8px; margin-right:10px;}

  #grid_grid3_records table tr td {border: none;}
  #grid_grid1_columns  table tr:first-child{display: none ;}
  #grid_grid3_frecords table {display: none !important;}
  #grid_grid3_fcolumns {display: none;}


  .w2ui-grid .w2ui-grid-body table td.w2ui-grid-data{border-bottom:0;}
</style>


<?php if (false) {?>
<form action="./cmn_code_mgt" method="get" id="search_frm" >
  <div class="contWrap cf">
    <div class="Search"><p>코드</p><input type="text" name="" value=""></div>
    <div class="Search"><p>코드명</p><input type="text" name="" value=""></div>
  </div>
</form>
<?php }?>

<div class="cf">

  <div class="contWrap scrollWrap sideList">
  <h4 class="contTitle mb_10" style="padding:0;">코드 트리</h4>
  <ul id="class_tree"></ul>
    <div id="grid1" style="height:100%;display:none;"></div>
  </div>
  <?php echo form_open('', $attr, $hidd); ?>
    <div class="rightCont contWrap scrollWrap cf">
        <input type="hidden" name="cnct_url" value="/<?php echo uri_string(); ?>">
        <input type="hidden" name="cnct_btn" value="">
    <h4 class="contTitle">공통 코드 상세</h4>
    <div class="cf">
        <div class="searchLine">
            <div class="boxW col-2 search"><p>코드</p><input type="text" name="cd" value="" class="red"></div>
            <div class="boxW col-2 search"><p>코드명</p><input type="text" name="cd_nm" value="" autocomplete="off" class="blue"></div>
      <!--       <div class="select"><p>상위 코드</p><select><option>CODE1</option></select><i class="fa fa-caret-down" aria-hidden="true"></i></div> -->
      <!--       <div class="select"><p>상위 코드</p><input type="text" name="up_cd" value=""></div> -->
        </div>
        <div class="searchLine">
            <div class="boxW col-2 search"><p>코드 순서</p><input type="number" name="cd_ordr" value="" autocomplete="off"></div>
            <div class="boxW col-2 search"><p>상위 코드</p><input type="text" name="up_cd" value="" autocomplete="off" class="blue"></div>
        </div>
        <div class="searchLine">
            <div class="boxW col-1 textarea"><p>코드 상세</p><textarea name="cd_fctn_dtl" rows="8" cols="80" autocomplete="off"></textarea></div>
        </div>
        <div class="searchLine">
            <div class="boxW col-2 search wd100"><p>여유 필드 문자 1</p><input type="text" name="cd_set1" value="" autocomplete="off"></div>
            <div class="boxW col-2 search wd100"><p>여유 필드 문자 2</p><input type="text" name="cd_set2" value="" autocomplete="off"></div>
        </div>
        <div class="searchLine">
            <div class="boxW col-2 search wd100"><p>여유 필드 문자 3</p><input type="text" name="cd_set3" value="" autocomplete="off"></div>
            <div class="boxW col-2 search wd100"><p>여유 필드 숫자 1</p><input type="number" name="cd_nset1" value="" autocomplete="off"></div>
        </div>
        <div class="searchLine">
            <div class="boxW col-2 search wd100"><p>여유 필드 숫자 2</p><input type="number" name="cd_nset2" value="" autocomplete="off"></div>
            <div class="boxW col-2 search wd100"><p>여유 필드 숫자 3</p><input type="number" name="cd_nset3" value="" autocomplete="off"></div>
        </div>
        <div class="searchLine">
            <div class="boxW col-4 checkbox fr"><label for="use_yn"><input type="checkbox" name="use_yn" id="use_yn">사용여부</label></div>
        </div>
    </div>
  </div>
  <?php echo form_close();?>
</div>

<script type="text/javascript" src="/include/js/mesTree.js"></script>
<script type="text/javascript" src="/include/js/common/cmn_code_mgt.js"></script>
<script type="text/javascript">
var cmn_code = new MesTree(<?php echo json_encode($info); ?>, "up_cd", "cd", "MES", "cd_nm");
 cmn_code.draw_menu("class_tree", "subList mt_5", "onclick='cd_dtl(this)' onmouseover='m_over(this)' onmouseout='m_out(this)'");
//navTree.draw_tree(<?php //echo json_encode($info); ?>//, "up_cd", "cd", "cd_nm", "class_tree", "subList mt_5", "onclick='cd_dtl(this)'");
// $(function(){
//   $.ajax({
//       url: "/ajax/get/cmn_code",
//       type: "get",
//       dataType: "json",
//       success: function(data){
//           console.log(data, 'data1');
//           navTree.draw_tree(data.data, "up_cd", "cd", "cd_nm", "class_tree", "subList mt_5", "onclick='cd_dtl(this)' onmouseover='m_over(this)' onmouseout='m_out(this)'");
//       }
//   });
// });
</script>
