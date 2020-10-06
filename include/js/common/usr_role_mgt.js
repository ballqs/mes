$(function () {
    $('#grid1').w2grid({
        name: 'grid1',
        header: '사용자 정보',
        show: {
        	header: true,
        },
        columns: [
        	{ field: 'recid', caption: 'No', size: '50px', sortable: true, attr: 'align=right' },
            { field: 'emp_id', caption: '사용자 ID', size: '40%', sortable: true, attr: 'align=center' },
			{ field: 'emp_nm', caption: '사용자명', size: '40%', sortable: true, attr: 'align=center' },
            { field: 'fact_cd', caption: '공장코드', size: '40%', sortable: true },
            { field: 'use_yn', caption: '사용여부', size: '120px', attr: 'align=center',
            	render: function (record) {
            		return '<input type="checkbox" ' + (record.use_yn ? 'checked' : '') + ' disabled>';
            	}
            }
        ],
        records: user,
        onClick: function (event) {
        	w2ui["grid2"].selectNone();
        	$("input[name='selected_emp_id']").val(user[event.recid - 1].emp_id);
            $.ajax({
            	url: "/ajax/get/user_role/",
            	type: "get",
            	data: {
            		emp_id: user[event.recid - 1].emp_id,
            	},
            	dataType: "json",
            	success: function(data){
            		for (let i = 0; i < role.length; i++) {
						for (var j = 0; j < data.length; j++) {
							if (data[j].role_id == role[i].role_id) {
								w2ui["grid2"].select(i+1);
							}
						}
					}
            	}
            });	// end of ajax
        },
        onRender: function(){
        	$("#grid1 input").attr("disabled", true);
        }
    });


    $('#grid2').w2grid({
        name: 'grid2',
        header: '역할 정보',
        show: {
        	header: true,
        	selectColumn: true
        },
        columns: [
        	{ field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=right' },
            { field: 'role_id', caption: '역할 ID', size: '40%', sortable: true, attr: 'align=center' },
            { field: 'role_nm', caption: '역할명', size: '40%', sortable: true },
        ],
        records: role,
        onClick: function (event) {
            var grid = this;
        }
    });

    $("#hBtnB0001").on("click", function(){ $("#search_frm").submit(); });
    $("#hBtnB0002").on("click", function(){ location.href = window.location.pathname; });
    $("#hBtnB0003").on("click", function(){ var el=w2ui['grid_toolbar']; if (el) el.click('add', event); });

    $("#hBtnB0005").on("click", function(){
    	let emp_id = $("input[name='selected_emp_id']").val();
    	if(emp_id.trim() == ""){
    		alert("선택된 EMP ID 가 없습니다.");
    		return false;
    	}

    	let sel = w2ui["grid2"].getSelection();
    	let checked_role = new Array();
    	for (let i = 0; i < sel.length; i++) {
    		checked_role.push(role[sel[i]-1].role_id);
		}
    	$.ajax({
    		url: "/ajax/save/usr_role",
    		type: "post",
    		data: {
    			emp_id: emp_id,
    			role_id:checked_role,
				cnct_url : location.pathname,
				cnct_btn : "B0005",
    		},
    		dataType: "json",
    		success: function(data){
    			if (!data.result) {
    				mes_alert(data);
    			}else{
//    				$("input[name=load_type]").val("save");
//    				$("#search_frm").submit();
    				success_msg(data.msg);
    			}

    		}
    	});
    });

	$("#hBtnB0034").on("click", function(){
		window.open("about:blank").location.href = "/uploads/img/guide/usr_role_mgt.pdf";
	});

});
