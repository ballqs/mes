<style media="screen">
  .scrollWrap{height:calc(100vh - 797px)}
  .eTable{float:left; width:calc((100% - 10px) / 2); height:470px; overflow-y:auto; overflow-x:auto;}
  .eTable thead th{font-size:13px;}
  .eTable thead th i{margin-left:5px;}
  .eTable .Table td{padding:10px 20px;}
  .eTable .Table td:nth-child(5) i{color:#94a2b4;}
  .Table td i{font-size:25px;}
  .contWrap .Search a{padding:7px 15px; background-color:#ff9000; color:#fff; font-size:14px; font-weight:normal; margin-left:20px;}
  .contWrap .select{float:left; margin-right:70px; position:relative;}
  .contWrap .select i{position:absolute; top:8px; right:10px;}
  .contWrap .select p{display:inline-block; margin-right:20px;}
  .contWrap .select select{display:inline-block; width:200px; padding:6px; border-radius:0; border:1px solid #d9d9d9; font-size:14px;}
  .contWrap .checkbox input{vertical-align:top; margin-top:8px; margin-right:10px;}

  #grid {height: 100% !important;}
  #grid_grid_body {height: 100% !important;}
</style>

<div class="contWrap cf">
  <div class="select"><p>FACT CODE</p><select><option>VS</option></select><i class="fa fa-caret-down" aria-hidden="true"></i></div>
  <div class="Search"><p>PC IP</p><input type="text" name="" value=""></div>
</div>

<div class="contWrap" style="height: calc(100vh - 660px);">
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

<!-- 스크립트 -->
<script type="text/javascript">
var people = [
    { id: 1, text: 'John Cook' },
    { id: 2, text: 'Steve Jobs' },
    { id: 3, text: 'Peter Sanders' },
    { id: 4, text: 'Mark Newman' },
    { id: 5, text: 'Addy Osmani' },
    { id: 6, text: 'Paul Irish' },
    { id: 7, text: 'Doug Crocford' },
    { id: 8, text: 'Nicolas Cage' }
];

$(function () {
    $('#grid').w2grid({
        name: 'grid',
        header: 'PC IP INFO',
        show: {
            header: true,
            toolbar: false,
            footer: false,
            toolbarSave: true
        },
        columns: [
            { field: 'recid', caption: 'NO <i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'text', caption: 'PC ID <i class="fa fa-sort" aria-hidden="true"></i>', size: '10%', sortable: true, resizable: true, style: 'text-align: left',
                editable: { type: 'text' }
            },
            { field: 'int', caption: 'PC MGT <i class="fa fa-sort" aria-hidden="true"></i>', size: '10%', sortable: true, resizable: true, render: 'int', style: 'text-align: left',
                editable: { type: 'int', min: 0, max: 32756 }
            },
            { field: 'money', caption: 'WRK GBN <i class="fa fa-sort" aria-hidden="true"></i>', size: '10%', sortable: true, resizable: true, render: 'money', style: 'text-align: left',
                editable: { type: 'money' }
            },
            { field: 'percent', caption: 'USE Y/N <i class="fa fa-sort" aria-hidden="true"></i>', size: '10%', sortable: true, resizable: true, render: 'percent:1', style: 'text-align: left',
                editable: { type: 'percent', precision: 1 }
            },
            { field: 'percent', caption: 'USE Y/N <i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, render: 'percent:1', style: 'text-align: left',
                editable: { type: 'percent', precision: 1 }
            },
            { field: 'time', caption: 'REMARK <i class="fa fa-sort" aria-hidden="true"></i>', size: '120px', sortable: true, resizable: true, style: 'text-align: left',
                editable: { type: 'time' }
            },
        ],
        toolbar: {
            items: [
                { id: 'add', type: 'button', caption: 'Add Record', icon: 'w2ui-icon-plus' }
            ],
            onClick: function (event) {
                if (event.target == 'add') {
                    w2ui.grid.add({ recid: w2ui.grid.records.length + 1 });
                }
            }
        },
        records: [
            { recid: 1, int: 100, money: 100, percent: 55, date: '1/1/2014', combo: 'John Cook', check: true },
            { recid: 2, int: 200, money: 454.40, percent: 15, date: '1/1/2014', combo: 'John Cook', check: false, list: { id: 2, text: 'Steve Jobs' } },
            { recid: 3, int: 350, money: 1040, percent: 98, date: '3/14/2014', combo: 'John Cook', check: true },
            { recid: 4, int: 350, money: 140, percent: 58, date: '1/31/2014', combo: 'John Cook', check: true, list: { id: 4, text: 'Mark Newman' } },
            { recid: 5, int: 350, money: 500, percent: 78, date: '4/1/2014', check: false },
            { recid: 6, text: 'some text', int: 350, money: 440, percent: 59, date: '4/4/2014', check: false },
            { recid: 7, int: 350, money: 790, percent: 39, date: '6/8/2014', check: false },
            { recid: 8, int: 350, money: 4040, percent: 12, date: '11/3/2014', check: true },
            { recid: 9, int: 1000, money: 3400, percent: 100, date: '2/1/2014',
                style: 'background-color: #ffcccc', editable: false }
        ]
    });
});

function showChanged() {
    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}

$(function () {
    $('#grid1').w2grid({
        name: 'grid1',
        header: 'LINE INFO',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO <i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, attr: 'align=center', style: 'text-align: right',},
            { field: 'lname', caption: 'LINE CD <i class="fa fa-sort" aria-hidden="true"></i>', size: '30%', sortable: true },
            { field: 'fname', caption: 'LINE NAME <i class="fa fa-sort" aria-hidden="true"></i>', size: '30%', sortable: true },
            { field: 'email', caption: 'GRANT_YN', size: '120px', style: 'text-align: center' }
        ],
        records: [
            { recid: 1, fname: 'Jane', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
        ],
        onClick: function (event) {
            var grid = this;
            // need timer for nicer visual effect that record was selected
            setTimeout(function () {
                w2ui['grid2'].add( $.extend({}, grid.get(event.recid), { selected : false }) );
                grid.selectNone();
                grid.remove(event.recid);
            }, 150);
        }
    });

    $('#grid2').w2grid({
        name: 'grid2',
        header: 'ROUTING INFO',
        show: { header: true },
        columns: [
          { field: 'recid', caption: 'NO <i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, attr: 'align=center', style: 'text-align: right',},
          { field: 'lname', caption: 'LINE CD <i class="fa fa-sort" aria-hidden="true"></i>', size: '30%', sortable: true },
          { field: 'fname', caption: 'LINE NAME <i class="fa fa-sort" aria-hidden="true"></i>', size: '30%', sortable: true },
          { field: 'email', caption: 'GRANT_YN', size: '120px', style: 'text-align: center' }
        ],
        onClick: function (event) {
            var grid = this;
            // need timer for nicer visual effect that record was selected
            setTimeout(function () {
                w2ui['grid1'].add( $.extend({}, grid.get(event.recid), { selected : false }) );
                grid.selectNone();
                grid.remove(event.recid);
            }, 150);
        }
    });
});

</script>
