var menu_list = [];
$(function () {

	draw_menu_tree();

	function draw_menu_tree(){
		$.ajax({
			url: "/ajax/get/menu_list/",
			type: "get",
			data: { test : "test" },
			dataType: "json",
			success: function(data){
				menu_list = data;
				navTree.draw_tree(data, 'up_pgm_id', 'pgm_id', 'pgm_nm', "menu_tree", "subList mt_5", "onclick='menu_dtl(this)' ondblclick='navTree.menu_tgl(this)' onmouseover='m_over(this)' onmouseout='m_out(this)'")
				// navTree.d_menu(data, "#tree_menu", "subList mt_5");
			},
		}); // end of ajax
	}

    $('#grid').w2grid({
        name: 'grid',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: false
        },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true },
            { field: 'role_id', caption: '역할 ID', size: '120px', sortable: true, resizable: true },
            { field: 'role_nm', caption: '역할명', size: '10%', sortable: true, resizable: true, style: 'text-align: left' }
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
        	$('#dtl_frm')[0].reset();
        	w2ui["grid2"].selectNone();
        	let role_id = records[e.recid - 1].role_id;
        	$("input[name='selected_role_id']").val(role_id);
        	bold_tree(role_id);
        },
    });

    $('#grid2').w2grid({
        name: 'grid2',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: false,
            selectColumn: true
        },
        columns: [
            { field: 'recid', caption: 'NO', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'btn_id', caption: '버튼 ID', size: '10%', sortable: true, resizable: true,  style: 'text-align: left' },
            { field: 'btn_nm', caption: '버튼명', size: '10%', sortable: true, resizable: true, style: 'text-align: left' },
            { field: 'img_tag', caption: '버튼 이미지', size: '200px', sortable: true, resizable: true, style: 'text-align: center' },
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
        records: btns,
    });

    function bold_tree(role_id){
    	$.ajax({
    		url:'/ajax/get/pgm_using',
    		type:'get',
    		data: {
    			role_id : role_id
    		},
    		dataType:'json',
    		success:function(data){
    			$(".subList>li>a").css("font-weight", "400");
    			for ( var key in data) {
					$("#"+data[key].pgm_id).css("font-weight", "800");
				}
    		}
    	});
    }

});

console.log("abdd");

$("#search_img").on("click", function(){ $("input[name='btn_img']").trigger("click"); });
$("#hBtnB0001").on("click", function(){ $("#search_frm").submit(); });
$("#hBtnB0002").on("click", function(){ location.href = window.location.pathname; });

$("#hBtnB0005").on("click", function(){
	let records = w2ui["grid2"].records;
	let selected = w2ui["grid2"].getSelection();	// type : array
	let s_btns = new Array();

	for (var i = 0; i < selected.length; i++) {
		for (var j = 0; j < records.length; j++) {
			if (selected[i] == records[j].recid) {
				s_btns.push(records[j].btn_id);
			}
		}
	}


	let selected_role_id = $("input[name='selected_role_id']").val();
	let pgm_id = $("input[name='pgm_id']").val();

	if (selected_role_id.trim() == "") { alert("선택된 롤이 없습니다.");return false; }
	if (pgm_id.trim() == "") { alert("선택된 프로그램이 없습니다.");return false; }

	$.ajax({
		url: "/ajax/save/role_pgm_btn",
		type: "post",
		data: {
			pgm_id : pgm_id,
			role_id : selected_role_id,
			btns : s_btns,
			cnct_url : location.pathname,
			cnct_btn : "B0005",
		},
		dataType: "json",
		success:function(data){
			if (!data.result) {
				mes_alert(data);
			}else{
//				$("input[name=load_type]").val("save");
//				$("#search_frm").submit();
				success_msg(data.msg);
			}
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
});

$("#hBtnB0034").on("click", function(){
	window.open("about:blank").location.href = "/uploads/img/guide/role_pgm_btn_mgt.pdf";
});


function menu_dtl(obj){
	let type = obj.id.substring(0,1);
	if (type.toUpperCase() == 'P') {	// 프로그램일 경우에만 동작
		// let pgm_id = obj.id.split("_")[0];
		let pgm_id = obj.id;
	$.ajax({
      url:"/ajax/get/pgm_info/"+pgm_id,
      type:"get",
      data: {},
      dataType:'json',
      success:function(data){
      	console.log(data, 'menu_dtl');
      	$("input[name='pgm_id'").val(data[0].pgm_id);
      	$("input[name='pgm_nm'").val(data[0].pgm_nm);
      	$("input[name='pgm_ordr'").val(data[0].pgm_ordr);
      	$("input[name='remark'").val(data[0].remark);
      	$("input[name='pgm_gbm'").val(data[0].pgm_gbm);
      	$("input[name='url'").val(data[0].url);
      	$("input[name='prc_gbm'").val(data[0].prc_gbm);
      	$("input[name='up_pgm_id'").val(data[0].up_pgm_id);
      	$("input:checkbox[name='use_yn']").prop("checked", data[0].use_yn == 'Y' ? true : false);

		  pgm_btn(pgm_id);
      },
      error:function(request,status,error){
        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
      }
    });	// end of ajax

	}
}

function pgm_btn(pgm_id){
	$.ajax({
		url:"/ajax/get/pgm_btn/",
		type:"get",
		data: {pgm_id : pgm_id},
		dataType:'json',
		success:function(data){
			console.log(data, 'pgm_btn');
			console.log(btns, 'btns');
			w2ui["grid2"].clear();

			// w2ui["grid2"].add(btns[1]);

			// for (let k=0; btns.length; k++){
			// 	console.log(btns[k], k);
			// }
			console.log(data.length, 'datalength');
			for(let i=0; i < data.length; i++){
				for (let j=0; j < btns.length; j++) {
					if (data[i].btn_id == btns[j].btn_id){
						w2ui["grid2"].add(btns[j]);
					}
				}
			}
			btn_dtl(pgm_id);
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});	// end of ajax
}

function btn_dtl(pgm_id){
	$.ajax({
      url:"/ajax/get/role_pgm_btn/",
      type:"get",
      data: {
    	  pgm_id : pgm_id,
    	  role_id : $("input[name='selected_role_id']").val(),
      },
      dataType:'json',
      success:function(data){
      	console.log(data, 'btn_dtl');
      	w2ui["grid2"].selectNone();
      	for (let i = 0; i < btns.length; i++) {
			for (let j = 0; j < data.length; j++) {
				if (btns[i].btn_id == data[j].btn_id) {
					w2ui["grid2"].select(i+1);
				}
			}
		}

      },
      error:function(request,status,error){
        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
      }
    });	// end of ajax
}

function m_over(obj){
	let type = obj.id.substring(0,1);
	if (type == 'P') {
		$("#"+obj.id).css("background", "#ccc");
	}
}

function m_out(obj){
	$("#"+obj.id).css("background", "#fff");
}
