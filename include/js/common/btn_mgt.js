$(function(){
	$("#grid").w2grid({
    name: 'grid',
    show: {
	    toolbar: false,
	    footer: false,
	    toolbarSave: false
	  },
    columns: [
        { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=right' },
        { field: 'btn_id', caption: '버튼 ID', size: '30%', sortable: true },
        { field: 'btn_nm', caption: '버튼명', size: '30%', sortable: true },
        { field: 'img_tag', caption: '버튼 이미지', size: '40%', attr: 'align=center' },
        { field: 'use_yn', caption: '사용여부', size: '120px',
        	editable: { type: 'checkbox', style: 'text-align: center' }
        }
    ],
    records: records,
    onClick: function(e){
    	$('#frm')[0].reset();
    	$("textarea[name=btn_detail]").text("");
    	var record = this.get(e.recid);

    	$("input[name=cu]").val("u");
    	$("#frm input[name=btn_id]").attr("readonly", true);
    	$("#frm input[name=btn_id]").val(record.btn_id);
    	$("input[name=btn_nm]").val(record.btn_nm);
    	$("textarea[name=btn_fctn_dtl]").text(record.btn_fctn_dtl);
    	$("input:checkbox[name=use_yn]").prop("checked", record.use_yn);
    	$("input[name='imgUrlName']").removeClass("blue");
    }
	});
});

$("#search_img").on("click", function(){ $("input[name='btn_img']").trigger("click"); });
$("#hBtnB0001").on("click", function(){ $("#search_frm").submit(); });
$("#hBtnB0002").on("click", function(){ location.href = window.location.pathname; });

$("#hBtnB0003").on("click", function(){
	$('#frm')[0].reset();
	$("textarea[name=btn_detail]").text("");
	$("input[name=cu]").val("c");
	$("input[name=btn_id]").attr("readonly", false);
	$("input[name='imgUrlName']").addClass("blue");
});

$("#hBtnB0005").on("click", function(){

	// insert, update 시 버튼 아이디, 버튼이름은 공백이 될 수 없다.
	let btn_id = $("#frm input[name=btn_id]").val();
	let btn_nm = $("input[name=btn_nm]").val();

	// insert 시 버튼 이미지는 공백이 될 수 없다.
	let cu = $("input[name='cu']").val();
	let btn_img = $("input[name='imgUrlName']").val();

	// 필수 입력사항 체크
	if (btn_id.trim() == "" || btn_nm.trim() == "" || (cu == "c" && btn_img.trim() == "")) {
		var valid = new Object();
		valid.result = false;
		valid.msg = "필수 입력 사항을 모두 입력해주세요.";
		mes_alert(valid);
	}

	var formData = new FormData($("#frm")[0]);

	$.ajax({
		url:"/ajax/save/button",
		type:"post",
		data: formData,
		dataType:'json',
		processData: false,
		contentType: false,
		success:function(data){
		  if (!data.result) {
			  mes_alert(data);
		  }else{
			  $("input[name=load_type]").val("save");
			  $("#search_frm").submit();
			  success_msg(data);
		  }
		},
		error:function(request,status,error){
		  console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});

});
$("#hBtnB0034").on("click", function(){
	window.open("about:blank").location.href = "/uploads/img/guide/btn_mgt.pdf";
});