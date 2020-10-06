
<style media="screen">
  .scrollWrap{height:calc(100vh - 700px); overflow-x:auto;}
  .contWrap .textarea{float:left; width:100%; margin-bottom:10px;}
  .contWrap .textarea textarea{width:570px; height:80px; padding:10px; border:1px solid #d9d9d9;}
  .contWrap .Search p{width:85px;}
  .contWrap .Search input{width:170px;}
  .contWrap .Search_{margin-bottom:10px;}
  .contWrap .Search_ p{width:121px;}
  .contWrap .select{float:left; position:relative; margin-right:70px;}
  .contWrap .select i{position:absolute; top:8px; right:10px;}
  .contWrap .select p{display:inline-block; width:85px; margin-right:20px;}
  .contWrap .select select{display:inline-block; width:170px; padding:6px; border-radius:0; border:1px solid #d9d9d9; font-size:14px;}
  .Table tbody td{white-space:nowrap;}

  @media screen and (max-width: 1824px){
    .fl{margin-bottom:10px}
    .scrollWrap{height:calc(100vh - 780px);}
  }
  @media screen and (max-width: 1680px){
    .scrollWrap{height:calc(100vh - 820px);}
  }
</style>

<div class="contWrap cf">
  <div class="fl">
    <div class="select"><p>FROM DATE</p><select><option>2020.02.26</option></select><i class="fa fa-caret-down" aria-hidden="true"></i></div>
    <div class="select"><p>TO DATE</p><select><option>2020.02.26</option></select><i class="fa fa-caret-down" aria-hidden="true"></i></div>
  </div>
  <div class="fl">
    <div class="Search"><p>BATH ID</p><input type="text" name="" value="test"></div>
    <div class="select"><p>RESULT</p><select><option>ALL</option></select><i class="fa fa-caret-down" aria-hidden="true"></i></div>
  </div>
</div>
<div class="contWrap scrollWrap">
  <div id="grid1" style="height:100%;"></div>
</div>
<div class="contWrap cf">
  <div id="grid2" style="height: 300px;"></div>
</div>



<script type="text/javascript">
$(function () {
    $('#grid1').w2grid({
        name: 'grid1',
        header: 'BATCH LOG TOTAL',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'ID<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, attr: 'align=center' },
            { field: 'lname', caption: 'Last Name<i class="fa fa-sort" aria-hidden="true"></i>', size: '30%', sortable: true },
            { field: 'fname', caption: 'First Name<i class="fa fa-sort" aria-hidden="true"></i>', size: '30%', sortable: true },
            { field: 'email', caption: 'Email<i class="fa fa-sort" aria-hidden="true"></i>', size: '40%' },
            { field: 'sdate', caption: 'Start Date<i class="fa fa-sort" aria-hidden="true"></i>', size: '120px' }
        ],
        records: [
            { recid: 1, fname: 'John', lname: 'doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'motzart@hotmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jin@yahoo.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'sottie@yahoo.com', sdate: '4/3/2012' },
            { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'kelly@gmail.com', sdate: '4/3/2012' },
            { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'frank@apple.com', sdate: '4/3/2012' }
        ],
        onClick: function (event) {
            w2ui['grid2'].clear();
            var record = this.get(event.recid);
            w2ui['grid2'].add([
                { recid: 0, name: 'ID:', value: record.recid },
                { recid: 1, name: 'First Name:', value: record.fname },
                { recid: 2, name: 'Last Name:', value: record.lname },
                { recid: 3, name: 'Email:', value: record.email },
                { recid: 4, name: 'Date:', value: record.sdate }
            ]);
        }
    });

    $('#grid2').w2grid({
        header: 'BATCH LOG DETAIL',
        show: { header: true, columnHeaders: false },
        name: 'grid2',
        columns: [
            { field: 'name', caption: 'Name', size: '100px', style: 'background-color: #efefef; border-bottom: 1px solid white; padding-right: 5px;', attr: "align=right" },
            { field: 'value', caption: 'Value', size: '100%' }
        ]
    });
});
</script>
