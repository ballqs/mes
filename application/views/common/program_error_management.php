
<style media="screen">
  .scrollWrap{height:calc(100vh - 705px)}
  .Table td:nth-child(4) i{color:#94a2b4;}
  .Table td i{font-size:25px;}
  .contWrap .Search a{padding:7px 15px; background-color:#ff9000; color:#fff; font-size:14px; font-weight:normal; margin-left:20px;}
  .contWrap .select{float:left; margin-right:70px; position:relative;}
  .contWrap .select i{position:absolute; top:8px; right:10px;}
  .contWrap .select p{display:inline-block; margin-right:20px;}
  .contWrap .select select{display:inline-block; width:200px; padding:6px; border-radius:0; border:1px solid #d9d9d9; font-size:14px;}
  .contWrap .textarea{float:left; width:100%; margin-top:20px;}
  .contWrap .textarea textarea{width:620px; height:80px; padding:10px; border:1px solid #d9d9d9;}
  .contWrap .checkbox input{vertical-align:top; margin-top:8px; margin-right:10px;}
</style>

<div class="contWrap cf">
  <div class="select"><p>FROM DATE</p><select><option>2020.02.26</option></select><i class="fa fa-caret-down" aria-hidden="true"></i></div>
  <div class="select"><p>TO DATE</p><select><option>2020.02.26</option></select><i class="fa fa-caret-down" aria-hidden="true"></i></div>
  <div class="Search"><p>MENU ID</p><input type="text" name="" value="test"></div>
</div>
<div class="contWrap scrollWrap">
  <table class="Table">
    <thead>
      <tr>
        <th>NO<i class="fa fa-sort" aria-hidden="true"></i></th>
        <th>PROGRAM ID<i class="fa fa-sort" aria-hidden="true"></i></th>
        <th>PROGRAM NAME<i class="fa fa-sort" aria-hidden="true"></i></th>
        <th>BUTTON ID<i class="fa fa-sort" aria-hidden="true"></i></th>
        <th>BUTTON NAME<i class="fa fa-sort" aria-hidden="true"></i></th>
        <th>ERROR MESSAGE<i class="fa fa-sort" aria-hidden="true"></i></th>
        <th>DATE TIME<i class="fa fa-sort" aria-hidden="true"></i></th>
      </tr>
    </thead>
  </table>
</div>
<div class="contWrap cf">
  <div class="cf">
    <h4 class="contTitle">ERROR MESSAGE DETAIL</h4>
    <div class="Search"><p>DATE TIME</p><input type="text" name="" value=""></div>
    <div class="Search"><p>EMP ID</p><input type="text" name="" value=""></div>
    <div class="textarea"><p class="mb_5">ERROR EXCEPTION MESSAGE</p><textarea name="name" rows="8" cols="80"></textarea></div>
    <div class="textarea"><p class="mb_5">ERROR EXCEPTION LOG</p><textarea name="name" rows="8" cols="80"></textarea></div>
  </div>
</div>
