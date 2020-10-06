<style media="screen">
  #grid {width: 100%; height:100%;}
  #grid_grid_frecords .w2ui-empty-record td{border: 0px !important;}
</style>

<form action="./role_mgt" method="get" id="search_frm">
    <input type="hidden" name="load_type" value="">
    <input type="hidden" name="cnct_url" value="/<?php echo uri_string(); ?>">
    <input type="hidden" name="cnct_btn" value="B0001">
  <div class="searchWrap cf">
      <div class="searchLine cf">
          <div class="boxW col-3 search">
              <p>역할 ID</p>
              <input type="text" name="role_id" value="<?php echo $this->input->get('role_id', true); ?>">
          </div>
          <div class="boxW col-3 search">
              <p>역할명</p>
              <input type="text" name="role_nm" value="<?php echo $this->input->get('role_nm', true); ?>">
          </div>
      </div>
  </div>
</form>
<div class="contWrap scrollWrap">
  <div id="grid"></div>
</div>
<!-- <div class="contWrap cf">
  <div class="cf">
    <h4 class="contTitle">ROLE DETAIL</h4>
    <div class="Search"><p>ROLE ID</p><input type="text" name="" value=""></div>
    <div class="Search"><p>ROLE NAME</p><input type="text" name="" value=""></div>
    <div class="textarea"><p class="mb_5">ROLE DETAIL SCRIPT</p><textarea name="name" rows="8" cols="80"></textarea></div>
    <div class="checkbox fl"><label for="YN"><input type="checkbox" name="YN" id="YN">USE YN</label></div>
  </div>
</div> -->


<script type="text/javascript">
$(function () {
    <?php if (isset($msg)) { // 성공 메세지가 있을 경우에만 footer에 메세지를 뿌려준다. ?>
        success_msg("<?php echo $msg; ?>");
    <?php } ?>

    var role_info = role_data(<?php echo json_encode($role_info); ?>);
    for(let i=0; i<role_info.length; i++){
        role_info[i].cu = '';
    }
    $('#grid').w2grid({
        name: 'grid',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'del', caption: '선택', size: '35px', style: 'text-align: center',
                editable: { type: 'checkbox', style: 'text-align: center' }
            },
            { field: 'role_id', caption: '역할 ID', size: '20', sortable: true, resizable: true, style: 'background-color: #e6f0ff;text-align:left;',
                editable: { type: 'text' } },
            { field: 'role_nm', caption: '역할명', size: '20', sortable: true, resizable: true, style: 'background-color: #ffe9e9;text-align:left;',
                editable: { type: 'text' } },
            { field: 'role_dtl', caption: '역할 상세', size: '20', sortable: true, resizable: true, style: 'text-align:left;',
                editable: { type: 'text' } },
            { field: 'use_yn', caption: '사용 여부', size: '7', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox', style: 'text-align: center' }
            },
        ],
        toolbar: {
            items: [
                { id: 'add', type: 'button', caption: 'Add Record', icon: 'w2ui-icon-plus' }
            ],
            onClick: function (event) {
                if (event.target == 'add') {
                    let add_id = w2ui.grid.records.length+1;
                    w2ui.grid.add({ recid: add_id});
                    w2ui.grid.records[add_id-1].cu = 'C';

                    // use yn 디폴트 값 true
                    // w2ui['grid'].get(add_id).use_yn = true;
                    // $("#grid_grid_rec_"+add_id+" td:nth-last-child(2) > div > input[type='checkbox']").prop("checked", true);

                    // 포커스 이동
                    $("#grid_grid_rec_"+add_id).focus();
                    let offset = $("#grid_grid_rec_" + add_id).position();
                    w2ui.grid.scrollIntoView(add_id);
                }
            },

        },
        records: role_info,
        onChange: function (event) {
          if (event.originalEvent.target.type == "text") {
          	let col = event.input_id.split('_')[4];
            let val = document.getElementById(event.input_id).value;
            let data = valid_chk(col, val)
            if(!data.result){
  						mes_alert(data);
            }
					}
				},
				onRestore: function(event) {
          console.log(event);
      	}
    });


    $("#hBtnB0001").on("click", function(){ $(".loadingW").css("display", ""); $("#search_frm").submit(); $(".loadingW").css("display", "none"); });
    $("#hBtnB0002").on("click", function(){ $(".loadingW").css("display", ""); location.href = window.location.pathname; $(".loadingW").css("display", "none"); });
    $("#hBtnB0003").on("click", function(){ $(".loadingW").css("display", ""); var el=w2ui['grid_toolbar']; if (el) el.click('add', event); $(".loadingW").css("display", "none"); });

    $("#hBtnB0006").on("click", function(){
        fnExcelReport('grid_grid_records > table', w2ui.grid.columns, 'excel_download');
    });

    $("#hBtnB0005").on("click", function(){
        $(".loadingW").css("display", "");
        let chg = w2ui['grid'].getChanges();

        let param = new Array();
        for (const key in chg) {
          	if ( !(w2ui['grid'].get(chg[key].recid).cu == "C" && w2ui['grid'].get(chg[key].recid).w2ui.changes.del) ) {
              param.push(w2ui['grid'].get(chg[key].recid));
            }
        }
        let chk_val = chk_reqired(param, ["role_id", "role_nm"]);
        if(!chk_val.result){ mes_alert(chk_val);return false; }

        $.ajax({
          url:"/ajax/save/role",
          type:"post",
          // data: { data : JSON.stringify(w2ui.grid.records)},
          data: {
              data : JSON.stringify(param),
              cnct_url : location.pathname,
              cnct_btn : "B0005",
          },
          dataType:'json',
          success:function(data){
              console.log(data);
              $(".loadingW").css("display", "none");
            if (!data.result) {
                mes_alert(data);
            }else{
                $("input[name=load_type]").val("save");
                $("#search_frm").submit();
                // success_msg(data);
            }
          },
            error:function(request,status,error){
                console.log("status:",status);
                console.log("request:",request);
                console.log("code:",request.status);
                console.log("message:",request.responseText);
                console.log("error:",error);
            }
        });
    });

    $("#hBtnB0004").on("click", function(){
        $(".loadingW").css("display", "");
        let data = w2ui.grid.records;
        let del_list = new Array();

        for (let i = 0; i < data.length; i++) {
            if (data[i].w2ui != undefined && data[i].w2ui.changes != undefined && data[i].w2ui.changes.del != undefined && data[i].w2ui.changes.del) {
                del_list.push(data[i].role_id);
            }
        }
        $.ajax({
            url:"/ajax/delete/role",
            type:"post",
            data: {
                del_list : JSON.stringify(del_list),
                cnct_url : location.pathname,
                cnct_btn : "B0004",
            },
            dataType:'json',
            success:function(data){
                $(".loadingW").css("display", "none");
                if (!data.result) {
                    mes_alert(data);
                }else{
                    $("input[name=load_type]").val("delete");
                    $("#search_frm").submit();
                    // console.log(del_list.length);
                    // for (let i = 0; i < del_list.length; i++) {
                    //     w2ui.grid.select(del_list[i]);
                    // }
                    // w2ui.grid.delete(true);
                    // success_msg(data);
                }
            },
            error:function(request,status,error){
                console.log("status:",status);
                console.log("request:",request);
                console.log("code:",request.status);
                console.log("message:",request.responseText);
                console.log("error:",error);
            }
        });
    });

    $("#hBtnB0034").on("click", function(){
        window.open("about:blank").location.href = "/uploads/img/guide/role_mgt.pdf";
    });
});

/* 저장버튼 클릭 했을 때 필수 입력 사항 입력 여부 체크 */
var chk_reqired = function (data, col){ // 필수입력 체크 (체크할 데이터, 체크할 칼럼명)
    let result = new Object();
    result.result = true;
    for (const key in data) {
        for (const col_key in col) {
            let chg_val = data[key]["w2ui"]['changes'][col[col_key]];
            if (data[key].cu == 'C') {  // insert
                if ($.trim(chg_val) == "" || chg_val == undefined) {
                    result.msg = "필수 입력 사항을 입력해주세요";
                    result.pos = {recid: data[key].recid, col : col_key};
                    result.result = false;
                    return result;
                }
            }else{  // update
                if ($.trim(chg_val) == "" && chg_val != undefined) {
                    result.msg = "필수 입력 사항을 입력해주세요";
                    result.pos = {recid: data[key].recid, col : col_key};
                    result.result = false;
                    return result;
                }
            }
        }
    }
    return result;
}

/* 받아온 정보를 grid에 뿌려줄 수 있게 형태 변환하는 함수 */
var role_data = function (data){
    for (let i = 0; i < data.length; i++) {
        data[i].recid = i + 1;
        data[i].use_yn = (data[i].use_yn == 'Y') ? true : false;
    }
    return data;
}

/* w2ui의 w2popup을 momosmes 용으로 커스텀 하는 함수 */
var mes_alert = function (data){
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
var mes_alert_off = function (){
    var header = document.getElementById("w2ui-popup");
    header.parentNode.removeChild(header);
    var header1 = document.getElementById("w2ui-lock");
    header1.parentNode.removeChild(header1);
}

/* 조회, 삭제, 저장 성공시 footer 에 메세지 뿌려주는 함수 */
var success_msg = function (data){
    let d = new Date();
    $(".footBar > p").text(data+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
    // $(".footBar > p").text(data.msg+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
}

/* w2grid 현 상태를 엑셀로 다운로드 하는 함수 */
var fnExcelReport = function (id, col_name, title) {
    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    tab_text = tab_text + '<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
    tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
    tab_text = tab_text + "<table border='1px'>";
    tab_text = tab_text + "<tr><td></td>";
    for (const key in col_name) {
        tab_text = tab_text + "<td>"+col_name[key].caption+"</td>";
    }
    var exportTable = $('#' + id).clone();
    exportTable.find('input[type=checkbox]').each(function (index, elem) {
        let elem_val = $(elem).is(":checked") ? 'Y' : 'N';
        $(elem).replaceWith(elem_val);
    });

    tab_text = tab_text + exportTable.html();
    tab_text = tab_text + '</table></body></html>';
    var data_type = 'data:application/vnd.ms-excel';
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var fileName = title + '.xls';
    //Explorer 환경에서 다운로드
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([tab_text], {
                type: "application/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, fileName);
        }
    } else {
    var blob2 = new Blob([tab_text], {
        type: "application/csv;charset=utf-8;"
    });
    var filename = fileName;
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob2);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
    }
}

/* grid에서 입력값이 변경되었을 때 validation 체크하는 함수 */
var valid_chk = function (col, val){	// 칼럼 순서, 변경된 값
		let result = new Object();

		switch (col) {
		case "1":	// ROLL ID
			result = valid_str_length(val, 5);
			break;
		case "2":	// ROLL NAME
			result = valid_str_length(val, 10);
			break;
		case "3":	// ROLL DETAIL
			result = valid_str_length(val, 255);
			break;
		default:
			result.result = true;
			result.msg = "";
			break;
		}

		return result;
}

/* 문자열 길이 체크 함수 */
var valid_str_length = function (str, max){	// 문자열, 최대길이
	let result = new Object();
	if (str.length > max) {
		result.result = false;
		result.msg = "해당 칸은 " + max + "글자 이상은 작성 할 수 없습니다.";
	}else{
		result.result = true;
		result.msg = "";
	}
	return result;
}
</script>
