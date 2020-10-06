$(function(){ 
    $("#hBtnB0001").on("click", function(){ $("#search_frm").submit(); });
  
	$("#hBtnB0002, #hBtnB0003").on("click", function(){
		$("input[name='cu']").val("c");
		$("#frm")[0].reset();
		$("textarea[name='cd_fctn_dtl']").text("");
	});


});

function cd_dtl(obj){
	let row_num = obj.dataset.rowNum;
	$("input[name='cu']").val('u');
	$("input[name='row_num']").val(row_num);
	for ( var key in cmn_code.data[row_num]) {
		$("input[name='"+key+"']").val(cmn_code.data[row_num][key]);
	}
	$("input[name='use_yn']").prop("checked", cmn_code.data[row_num].use_yn == "Y" ? true : false );
	$("textarea[name='cd_fctn_dtl']").text(cmn_code.data[row_num].cd_fctn_dtl);
}

$("#hBtnB0005").on("click", function(){
	$(".loadingW").css("display", "");
	let cu = $("input[name='cu']").val();
	var row_num = $("input[name='row_num']").val();
	
	if ($("input[name='cd']").val().trim() == "" || $("input[name='cd_nm']").val().trim() == "" || $("input[name='up_cd']").val().trim() == "") {
		let err = new Object();
		err.msg = "필수항목을 기입해 주세요";
		mes_alert(err);
		return false;
	}

	if (cu == 'u') {	// update	- 코드는 변경 불가
		if(cmn_code.data[row_num]["cd"] != $("input[name='cd']").val()){
			let err = new Object();
			err.msg = "코드는 변경할 수 없습니다.";
			mes_alert(err);
			return false;
		}
	}else{	// insert
		
	}

	$("input[name='cnct_btn']").val("B0005");
	$.ajax({
    url:"/ajax/save/cmn_code",
    type:"post",
    data: $("#frm").serialize(),
    dataType:'json',
    success:function(data){
      if (!data.result) {
          mes_alert(data);
      }else{
      		location.href = "./cmn_code_mgt?load_type=save";
      }
    }
  });
	
});

$("#hBtnB0004").on("click", function(){
	$("input[name='cnct_btn']").val("B0004");
	$.ajax({
    url:"/ajax/delete/cmn_code",
    type:"post",
    data: $("#frm").serialize(),
    dataType:'json',
    success:function(data){
    	console.log(data);
      if (!data.result) {
          mes_alert(data);
      }else{
      	location.href = "./cmn_code_mgt?load_type=delete";
      }
    },
	error:function(request,status,error){
		console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	}
  });
	
});

$("#hBtnB0034").on("click", function(){
	window.open("about:blank").location.href = "/uploads/img/guide/cmn_code_mgt.pdf";
});

function m_over(obj){
// 	$("#"+obj.id).css("background", "#ccc");
}

function m_out(obj){
// 	$("#"+obj.id).css("background", "#fff");
}


/* w2ui의 w2popup을 momosmes 용으로 커스텀 하는 함수 */
function mes_alert(data){
		$(".loadingW").css("display", "none");
    let html = '<div class="errorWrap"><div class="text_r mr_10 mt_10"><a><i class="fa fa-exclamation-circle" aria-hidden="true"></i></a></div><div class="text_c"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i><div class="ib waningText mb_30"><h1>'+data.msg+'</h1><h1>잠시 후 시도해주세요.</h1></div></div><div class="errorCode"><ul>';
    for (const key in data.error) {
        if (data.error.hasOwnProperty(key)) {
        html += "<li>"+key+" : "+data.error[key]+"</li>"
        }
    }
    html += '</ul></div><div class="text_c"><a class="errorBt" onclick="mes_alert_off();">확인</a></div></div>';
    w2popup.open({
        body: '<div class="w2ui-centered">'+html+'</div>',
    });
}


/* mes_alert() 종료 함수 */
function mes_alert_off (){
    var header = document.getElementById("w2ui-popup");
    header.parentNode.removeChild(header);
    var header1 = document.getElementById("w2ui-lock");
    header1.parentNode.removeChild(header1);
}