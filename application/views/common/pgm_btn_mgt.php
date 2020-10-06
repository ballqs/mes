<style media="screen">
  #grid {height: 100% !important;}
  #grid_grid_body {height: 100% !important;}
  .contWrap img {width: 25px; height: auto; vertical-align: middle;}
</style>

<form action="./pgm_btn_mgt" method="get" id="search_frm">
	<input type="hidden" name="load_type" value="">
    <input type="hidden" name="cnct_url" value="/<?php echo uri_string(); ?>">
    <input type="hidden" name="cnct_btn" value="B0001">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 search">
                <p>프로그램 ID</p>
                <input type="text" name="pgm_id" value="<?php echo $this->input->get('pgm_id'); ?>">
            </div>
            <div class="boxW col-3 search">
                <p>프로그램명</p>
                <input type="text" name="pgm_nm" value="<?php echo $this->input->get('pgm_nm'); ?>">
            </div>
      </div>
  </div>
</form>
<input type="hidden" id="pgm_id">
<div class="contWrap mb_10" style="height: calc(100% - 453px);">
  <div id="grid" style="width: 100%;"></div>
</div>

<div class="cf">
  <div class="contWrap fl" style="width: calc(50% - 5px);">
    <div style="position: relative; height: 300px;">
      <div id="grid1" style="left: 0px; width: 100%; height: 300px;"></div>
    </div>
  </div>

  <div class="contWrap fr" style="width: calc(50% - 5px);">
    <div style="position: relative; height: 300px;">
      <div id="grid2" style="right: 0px; width: 100%; height: 300px;"></div>
    </div>
  </div>

</div>
<script type="text/javascript" src="/include/js/common/pgm_btn_mgt.js"></script>
<!-- 스트립트 -->
<script type="text/javascript">
var records = role_data(<?php echo json_encode($info); ?>);
var btns = attach_imgtag(role_data(<?php echo json_encode($btns); ?>));
</script>
