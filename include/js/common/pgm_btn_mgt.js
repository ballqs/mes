var click_flag = true;
$(function () {
    $('#grid').w2grid({
        name: 'grid',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: true
        },
        columns: [
            { field: 'recid', caption: 'NO', size: '100px', sortable: true, resizable: true, style: 'text-align: right;' },
            { field: 'pgm_id', caption: '프로그램 ID', size: '10%', sortable: true, resizable: true },
            { field: 'pgm_nm', caption: '프로그램명', size: '10%', sortable: true, resizable: true, style: 'text-align: left;' },
            { field: 'up_pgm_id', caption: '메뉴 ID', size: '200px', sortable: true, resizable: true, style: 'text-align: left;' },
            { field: 'menu_nm', caption: '메뉴명', size: '10%', sortable: true, resizable: true, style: 'text-align: left;' },
            { field: 'remark', caption: '비고', size: '10%', sortable: true, resizable: true, style: 'text-align: left;' }
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
        records: records,
        onClick: function(e){
            if (!click_flag) return false;
            click_flag = false;
        	var record = this.get(e.recid);
        	console.log(record, 'record');
        	$("#pgm_id").val(record.pgm_id);
        	// 양쪽 그리드 모두 삭제
        	for ( var key in btns) {
						w2ui["grid1"].remove(btns[key].recid);
						w2ui["grid2"].remove(btns[key].recid);
					}

        	// 왼쪽 그리드 그리기
        	for ( var key in btns) {
						w2ui["grid1"].add(btns[key]);
					}

        	// 순서대로 오른쪽으로 옮기기
        	$.ajax({
            url:"/ajax/get/pgm_btn",
            type:"get",
            data: { pgm_id : record.pgm_id },
            dataType:'json',
            success:function(data){

	            for ( let i in data) {
            		for ( let j in btns) {
									if (btns[j]["btn_id"] == data[i]["btn_id"]) {
										w2ui["grid1"].remove(btns[j].recid);
										w2ui["grid2"].add(btns[j]);
									}
								}
							}
                click_flag = true;
            },
            error:function(request,status,error){
              console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
          });	// end of ajax

        }
    });

    $('#grid1').w2grid({
      name: 'grid1',
      header: '버튼마스터',
      show: { header: true },
      columns: [
          { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=center', style: 'text-align: right',},
          { field: 'btn_id', caption: '버튼 ID', size: '30%', sortable: true },
          { field: 'btn_nm', caption: '버튼명', size: '30%', sortable: true },
          { field: 'img_tag', caption: '버튼 이미지', size: '40%', style: 'text-align: center' }
      ],
      records: btns,
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
    header: '사용버튼',
    show: { header: true, lineNumbers: true },
    reorderRows: true,
    columns: [
      { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=center', style: 'text-align: right'},
      { field: 'btn_id', caption: '버튼 ID', size: '30%', sortable: true },
      { field: 'btn_nm', caption: '버튼명', size: '30%', sortable: true },
      { field: 'img_tag', caption: '버튼 이미지', size: '40%' },
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

function showChanged() {
//    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}

$("#search_img").on("click", function(){ $("input[name='btn_img']").trigger("click"); });
$("#hBtnB0001").on("click", function(){ $("#search_frm").submit(); });
$("#hBtnB0002").on("click", function(){ location.href = window.location.pathname; });

$("#hBtnB0005").on("click", function(){
	let rec = w2ui["grid2"].records;
	let param = new Object();
	param.data = rec;
	param.pgm_id = $("#pgm_id").val();
	param.cnct_url = location.pathname;
    param.cnct_btn = "B0005";

	$.ajax({
    url:"/ajax/save/pgm_btn",
    type:"post",
    data: param,
    dataType:'json',
    success:function(data){
      if (!data.result) {
          mes_alert(data);
      }else{
//          $("input[name=load_type]").val("save");
//          $("#search_frm").submit();
          success_msg(data.msg);
      }
    },
    error:function(request,status,error){
      console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    }
  });

});

$("#hBtnB0034").on("click", function(){
    window.open("about:blank").location.href = "/uploads/img/guide/pgm_btn_mgt.pdf";
});
