<style media="screen">
  .scrollWrap{height:calc(100vh - 625px)}
  .Table td:nth-child(4) i{color:#94a2b4;}
  .Table td i{font-size:25px;}
  .contWrap .Search a{padding:7px 15px; background-color:#ff9000; color:#fff; font-size:14px; font-weight:normal; margin-left:20px; border-radius:7px;}
  /* .contWrap .Search input[type=file]{padding:7px 15px; background-color:#ff9000; color:#fff; font-size:14px; font-weight:normal; margin-left:20px; border-radius:7px;} */
  .contWrap .textarea{float:left; width:100%; margin:20px 0;}
  .contWrap .textarea textarea{width:620px; height:80px; padding:10px; border:1px solid #d9d9d9;}
  .contWrap .checkbox input{vertical-align:top; margin-top:8px; margin-right:10px;}
</style>

<div class="contWrap cf">
  <div class="Search"><p>BUTTON ID</p><input type="text" name="" value="test"></div>
</div>

<div id="grid"></div>

<div class="contWrap scrollWrap">
  <table class="Table">
    <thead>
      <tr>
        <th>NO<i class="fa fa-sort" aria-hidden="true"></i></th>
        <th>BUTTON ID<i class="fa fa-sort" aria-hidden="true"></i></th>
        <th>BUTTON NAME<i class="fa fa-sort" aria-hidden="true"></i></th>
        <th>BUTTON IMAGE</th>
        <th>USE YN</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text_r">1</td>
        <td class="text_l">B0001</td>
        <td class="text_l">Inquiry</td>
        <td><i class="fa fa-search" aria-hidden="true"></i></td>
        <td><input type="checkbox" name="" value=""></td>
      </tr>
      <tr>
        <td class="text_r">2</td>
        <td class="text_l">B0002</td>
        <td class="text_l">Initial</td>
        <td><i class="fa fa-eraser" aria-hidden="true"></i></td>
        <td><input type="checkbox" name="" value=""></td>
      </tr>
      <tr>
        <td class="text_r">3</td>
        <td class="text_l">B0003</td>
        <td class="text_l">Insert</td>
        <td><i class="fa fa-plus" aria-hidden="true"></i></td>
        <td><input type="checkbox" name="" value=""></td>
      </tr>
      <tr>
        <td class="text_r">4</td>
        <td class="text_l">B0004</td>
        <td class="text_l">Save</td>
        <td><i class="fa fa-floppy-o" aria-hidden="true"></i></td>
        <td><input type="checkbox" name="" value=""></td>
      </tr>
    </tbody>
  </table>
</div>

<form id="frm" action="" method="post" enctype="multipart/form-data">
  <div class="contWrap cf">
    <div class="cf">
      <h4 class="contTitle">BUTTON DETAIL</h4>
      <div class="Search"><p>BUTTON ID</p><input type="text" name="btn_id" value=""></div>
      <div class="Search"><p>BUTTON NAME</p><input type="text" name="btn_name" value=""></div>
      <div class="textarea"><p class="mb_5">BUTTON DETAIL SCRIPT</p><textarea name="btn_detail" rows="8" cols="80"></textarea></div>
      <div class="Search"><p>BUTTON IMG</p><input type="text" name="imgUrlName" value="" style="width:380px;"><input type="file" name="button_img" value="" onchange="sync_text(this, 'input[name=imgUrlName]');" style="display:none;"><a id="search_img">Search Image</a></div>

      <div class="checkbox fl"><label for="YN"><input type="checkbox" name="YN" id="YN">USE YN</label></div>
    </div>
  </div>
</form>

<!-- <script type="text/javascript" src="/include/js/common/button_management.js"></script> -->
<script type="text/javascript" src="/include/js/common/btn_mgt.js"></script>
<script type="text/javascript">

</script>
