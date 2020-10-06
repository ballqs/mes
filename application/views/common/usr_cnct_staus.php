<style media="screen">
  .contWrap .textarea{float:left; width:100%; margin:20px 0;}
  .contWrap .textarea textarea{width:570px; height:80px; padding:10px; border:1px solid #d9d9d9;}
  .contWrap .checkbox input{vertical-align:top; margin-top:8px; margin-right:10px;}
  .contWrap .Search{margin-right:30px;}
  .contWrap .select{float:left; margin-right:20px; position:relative;}
  .contWrap .select i{position:absolute;  top:8px; right:10px;}
  .contWrap .select p{display:inline-block; margin-right:20px;}
  .contWrap .select select{display:inline-block; width:160px; padding:6px; border-radius:0; border:1px solid #d9d9d9; font-size:14px;}
  #grid {width: 100%; height:100%;}
  #grid_grid_frecords .w2ui-empty-record td{border: 0px !important;}
</style>

<form action="./usr_cnct_staus" method="get" id="search_frm">
    <input type="hidden" name="load_type" value="">
    <input type="hidden" name="cnct_url" value="/<?php echo uri_string(); ?>">
    <input type="hidden" name="cnct_btn" value="B0001">
  <div class="searchWrap cf">
      <div class="searchLine">
          <div class="boxW col-4 search">
              <p>사용자 ID</p>
              <input type="text" name="emp_id" value="<?php echo $this->input->get('emp_id'); ?>">
          </div>
          <div class="boxW col-4 search">
              <p>사용자명</p>
              <input type="text" name="emp_nm" value="<?php echo $this->input->get('emp_nm'); ?>">
          </div>
          <div class="boxW col-2 search">
              <p>일자</p>
              <input type="date" name="cnct_dt_start" value="<?php echo !empty($_GET['cnct_dt_start']) ? $_GET['cnct_dt_start'] : date("Y-m-d", time())?>"> ~
              <input type="date" name="cnct_dt_end" value="<?php echo !empty($_GET['cnct_dt_end']) ? $_GET['cnct_dt_end'] : date("Y-m-d", time())?>">
          </div>
      </div>
  </div>
</form>
<div class="contWrap scrollWrap">
  <div id="grid"></div>
</div>
<script>var cnct = role_data(<?php echo json_encode($info); ?>);</script>
<script type="text/javascript" src="/include/js/common/usr_cnct_staus.js"></script>
