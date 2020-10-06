<style media="screen">
  .scrollWrap{height:calc(100% - 377px);}
  textarea {display: inline-block; width: 604px; height:80px; margin-top: 5px;padding:10px; border:1px solid #d9d9d9; font-size:15px;}
  .w2ui-grid-data img{height:25px; margin-top:7px;}
  input[type="checkbox"] {bottom: 10px; margin-left: 10px;}
  input[name="use_yn"] {position: relative;}
  label {display: inline-block; position: relative; bottom: 8px;}
  .boxW p {width: 150px;}
  a#search_img {background: #ff9000; color: #fff; padding: 5px 12px; vertical-align: middle;}
</style>
<form id="search_frm" action="./btn_mgt" method="get">
	<input type="hidden" name="load_type" value="">
    <input type="hidden" name="cnct_url" value="/<?php echo uri_string(); ?>">
    <input type="hidden" name="cnct_btn" value="B0001">
  <div class="searchWrap cf">
      <div class="searchLine cf">
          <div class="boxW col-1 search">
              <p>버튼 ID</p>
              <input type="text" name="btn_id" value="<?php echo isset($param['btn_id']) ? $param['btn_id'] : ''; ?>">
          </div>
      </div>
  </div>
</form>

<div class="contWrap scrollWrap mb_10">
  <div style="position: relative; height: 100%;">
      <div id="grid" style="position: absolute; left: 0px; width: 100%; height:100%; "></div>
  </div>
</div>

<form id="frm" action="" method="post" enctype="multipart/form-data" >
    <input type="hidden" name="cu" value="c">
    <input type="hidden" name="cnct_url" value="/<?php echo uri_string(); ?>">
    <input type="hidden" name="cnct_btn" value="B0005">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <h4 class="contTitle">버튼 상세</h4>
            <div class="boxW col-3 search">
                <p>버튼 ID</p>
                <input type="text" name="btn_id" value="" class="red">
            </div>
            <div class="boxW col-3 search">
                <p>버튼명</p>
                <input type="text" name="btn_nm" value="" class="blue">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-1 search">
                <p>버튼 이미지</p>
                <input type="text" class="blue" name="imgUrlName" value="" disabled>
                <input type="file" name="btn_img" value="" onchange="sync_text(this, 'input[name=imgUrlName]');" style="display:none;">
                <a id="search_img">이미지찾기</a>
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-1 search">
                <p class="mt_5" style="vertical-align: top;">버튼 상세 스크립트</p>
                <textarea name="btn_fctn_dtl" rows="8" cols="80"></textarea>
                <input type="checkbox" name="use_yn" id="YN">
                <label for="YN">사용여부</label>
            </div>
        </div>

  </div>
</form>

<script type="text/javascript" src="/include/js/common/btn_mgt.js"></script>
<script type="text/javascript">
var records = attach_imgtag(role_data(<?php echo json_encode($info); ?>));

</script>
