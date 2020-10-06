<style media="screen">
  .scrollWrap{height:calc(100vh - 236px)}
  .leftCont{width:49%; float:left; margin-right:10px}
  .rightCont{float:right; width:50%;}

  /* GRID */
  #grid1{height:100%;}
  #grid2{height:100%;}
</style>

<form action="./usr_role_mgt" method="get" id="search_frm">
    <input type="hidden" name="load_type" value="">
    <input type="hidden" name="cnct_url" value="/<?php echo uri_string(); ?>">
    <input type="hidden" name="cnct_btn" value="B0001">
    <div class="searchWrap">
        <div class="searchLine cf">
            <div class="boxW col-3 search">
                <p>사용자 ID</p>
                <input type="text" name="emp_id" value="<?php echo $this->input->get('emp_id', null);?>">
            </div>
            <div class="boxW col-3 search">
                <p>사용자명</p>
                <input type="text" name="emp_nm" value="<?php echo $this->input->get('emp_nm', null);?>">
            </div>
        </div>
    </div>

</form>
	<input type="hidden" name="selected_emp_id">
    <div class="cf">
      <div class="leftCont">
        <div class="contWrap scrollWrap">
            <div id="grid1"></div>
        </div>
      </div>
      <div class="rightCont">
        <div class="contWrap scrollWrap">
            <div id="grid2"></div>
        </div>
      </div>
    </div>
<script type="text/javascript" src="/include/js/common/usr_role_mgt.js"></script>
<script type="text/javascript">
var user = role_data(<?php echo json_encode($info['user']); ?>);
var role = role_data(<?php echo json_encode($info['role']); ?>);
</script>
