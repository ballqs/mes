<style media="screen">
  .contWrap .checkbox input{vertical-align:top; margin-top:8px; margin-right:10px;}
  #grid {width: 100%; height:100%;}
  .w2ui-empty-record > td.w2ui-grid-data {border: 0px !important;}
  #grid_grid_frecords .w2ui-empty-record td{border: 0px !important;}
</style>
<?php // pwd 1111 => $2y$10$rkxZBqhkyCONMfaoMjVDxOrflbYIYuikRpFGjELJAttHbrvFRj0/6 ?>
<form action="./usr_mgt" method="get" id="search_frm">
    <input type="hidden" name="load_type" value="">
    <input type="hidden" name="cnct_url" value="/<?php echo uri_string(); ?>">
    <input type="hidden" name="cnct_btn" value="B0001">
  <div class="searchWrap cf">
      <div class="searchLine cf">
          <div class="boxW col-3 select">
              <p>공장 코드</p>
              <select name="fact_cd">
                  <?php foreach($fact_cd as $key => $value){ ?>
                      <option value="<?php echo $value->cd;?>"
                          <?php
                          if($this->input->get('fact_cd') == '' && $value->cd == 'winp01'){
                            echo 'selected';
                          }else if(($value->cd == $this->input->get('fact_cd') && $this->input->get('fact_cd') != '')) {
                            echo 'selected';
                          }
                          ?>
                      ><?php echo $value->cd_nm;?></option>
                  <?php } ?>
              </select>
          </div>
          <div class="boxW col-3 search">
              <p>직원 ID</p>
              <input type="text" name="emp_id" value="<?php echo $this->input->get('emp_id'); ?>">
              <input type="text" name="emp_nm" value="<?php echo $this->input->get('emp_nm'); ?>">
          </div>
      </div>
  </div>
</form>
<div class="contWrap scrollWrap">
  <div class="grids" id="grid"></div>
</div>
<script type="text/javascript">
$(function () {
    var fact_cd = [];
    var wrk_gbn = [];
    $.ajax({
        url: "/ajax/get/code/",
        type: "get",
        data: {
            up_cd: "fact_cd",
        },
        dataType: "json",
        success: function(data){
            for (let i=0; i < data.data.length; i++){
                fact_cd[i] = {};
                fact_cd[i].id = data.data[i].cd;
                fact_cd[i].text = data.data[i].cd_nm;
            }
            get_wrk_gbn();
        },
        error:function(request,status,error){
            console.log("status:",status);
            console.log("request:",request);
            console.log("code:",request.status);
            console.log("message:",request.responseText);
            console.log("error:",error);
        }
    });

    function get_wrk_gbn(){
        $.ajax({
            url: "/ajax/get/code/",
            type: "get",
            data: {
                up_cd: "wrk_gbn",
            },
            dataType: "json",
            success: function(data){
                for (let i=0; i < data.data.length; i++){
                    wrk_gbn[i] = {};
                    wrk_gbn[i].id = data.data[i].cd;
                    wrk_gbn[i].text = data.data[i].cd_nm;
                }
                draw_grids();
            },
            error:function(request,status,error){
                console.log("status:",status);
                console.log("request:",request);
                console.log("code:",request.status);
                console.log("message:",request.responseText);
                console.log("error:",error);
            }
        }); // end of ajax
    }

    var grid_data = role_data(<?php echo json_encode($info); ?>);
    for(let i=0; i<grid_data.length; i++){
        grid_data[i].cu = '';
    }
    function draw_grids(){
        $('#grid').w2grid({
            name: 'grid',
            hasFocus: true,
            reorderColumns: true,
            reorderRows: true,
            columns: [
                { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
                { field: 'del', caption: '선택', size: '50px', style: 'text-align: center',
                    editable: { type: 'checkbox', style: 'text-align: center' }
                },
                // { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true,  style: 'background-color: #e6f0ff;text-align:left;',
                //     editable: { type: 'select', items: [{ id: '', text: '' }].concat(fact_cd) },
                //     render: function (record, index, col_index) {
                //         var html = '';
                //         for (var p in fact_cd) {
                //             if (fact_cd[p].id == this.getCellValue(index, col_index)) {
                //                 html = fact_cd[p].text;
                //                 console.log(fact_cd[p], this.getCellValue(index, col_index));
                //             }
                //         }
                //         return html;
                //     }
                // },
                { field: 'emp_id', caption: '직원 ID', size: '20', sortable: true, resizable: true, style: 'background-color: #e6f0ff;text-align:left;',
                    editable: { type: 'text' } },
                { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true,  style: 'background-color: #ffe9e9;text-align:left;',
                    editable: { type: 'select', items: [{ id: '', text: '' }].concat(fact_cd) },
                    render: function (record, index, col_index) {
                        var html = '';
                        for (var p in fact_cd) {
                            if (fact_cd[p].id == this.getCellValue(index, col_index)) html = fact_cd[p].text;
                        }
                        return html;
                    }
                },

                { field: 'emp_nm', caption: '직원이름', size: '20', sortable: true, resizable: true, style: 'background-color: #ffe9e9;text-align:left;',
                    editable: { type: 'text' } },
                { field: 'pwd', caption: '비밀번호', size: '20', sortable: true, resizable: true, style: 'background-color: #ffe9e9;text-align:left;',
                    editable: { type: 'text' } },
//             { field: 'lang_gbn', caption: '언어구분 <i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true,
//                 editable: { type: 'text' } },
                { field: 'offc_phn_num', caption: '사내전화번호', size: '20', sortable: true, resizable: true, style: 'text-align:center;',
                    editable: { type: 'text' } },
                { field: 'hand_phn_num', caption: '이동전화번호', size: '20', sortable: true, resizable: true, style: 'text-align:center;',
                    editable: { type: 'text' } },
                { field: 'buss_rpst_dtl', caption: '담당업무상세', size: '20', sortable: true, resizable: true, style: 'text-align:left;',
                    editable: { type: 'text' } },
                { field: 'wrk_gbn', caption: '업무구분', size: '20', sortable: true, resizable: true, style: 'background-color: #ffe9e9;text-align:center;',
                    editable: { type: 'select', items: [{ id: '', text: '' }].concat(wrk_gbn) },
                    render: function (record, index, col_index) {
                        var html = '';
                        for (var p in wrk_gbn) {
                            if (wrk_gbn[p].id == this.getCellValue(index, col_index)) html = wrk_gbn[p].text;
                        }
                        return html;
                    }
                },
                { field: 'use_yn', caption: '사용 여부', size: '20', sortable: true, resizable: true, style: 'text-align: center',
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
                        let targetnum = w2ui.grid.records.length - 1;
                        if(w2ui.grid.records[targetnum]["w2ui"] == '' || w2ui.grid.records[targetnum]["w2ui"] == undefined){
                            w2ui.grid.records[targetnum]["w2ui"] = { changes : {}};
                        }
                        w2ui.grid.records[targetnum]["w2ui"]["changes"]["fact_cd"] = "winp01";
                        w2ui.grid.records[targetnum]["w2ui"]["changes"]["use_yn"] = true;
                        w2ui.grid.refresh();
                        console.log(w2ui.grid.records[targetnum]);
                        // 포커스 이동
                        $("#grid_grid_rec_"+add_id).focus();
                        let offset = $("#grid_grid_rec_" + add_id).position();
                        w2ui.grid.scrollIntoView(add_id);
                    }
                },

            },
            records: grid_data,
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

            }
        });
    }

    $("#hBtnB0001").on("click", function(){ $(".loadingW").css("display", ""); $("#search_frm").submit(); });
    $("#hBtnB0002").on("click", function(){ $(".loadingW").css("display", ""); location.href = window.location.pathname; $(".loadingW").css("display", "none");});
    $("#hBtnB0003").on("click", function(){
        $(".loadingW").css("display", "");
        var el=w2ui['grid_toolbar'];
        if (el) el.click('add', event);
        $(".loadingW").css("display", "none");
    });
    // $("#hBtnB0006").on("click", function(){ $(".loadingW").css("display", ""); fnExcelReport('grid_grid_records > table', w2ui.grid.columns, 'excel_download'); $(".loadingW").css("display", "none"); });

    $("#hBtnB0005").on("click", function(){
        $(".loadingW").css("display", "");
        let chg = w2ui['grid'].getChanges();

        let param = new Array();
        for (const key in chg) {
          	if ( !(w2ui['grid'].get(chg[key].recid).cu == "C" && w2ui['grid'].get(chg[key].recid).w2ui.changes.del) ) {
                param.push(w2ui['grid'].get(chg[key].recid));
          	}
        }
        let chk_val = chk_reqired(param, ["fact_cd", "emp_id", "wrk_gbn"]);
        if(!chk_val.result){
            $(".loadingW").css("display", "none");
            mes_alert(chk_val);
            return false;
        }

        $.ajax({
            url:"/ajax/save/user",
            type:"post",
            data: {
                data : JSON.stringify(param),
                cnct_url : location.pathname,
                cnct_btn : "B0005",
            },
            dataType:'json',
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
                console.log("status:",status);
                console.log("request:",request);
                console.log("code:",request.status);
                console.log("message:",request.responseText);
                console.log("error:",error);
            }
        });
    });



    $("#hBtnB0004").on("click", function(){
        let data = w2ui.grid.records;
        let del_list = new Array();
        for (let i = 0; i < data.length; i++) {
            if (data[i].w2ui != undefined && data[i].w2ui.changes != undefined && data[i].w2ui.changes.del != undefined && data[i].w2ui.changes.del) {
                del_list.push(data[i].emp_id);
            }
        }
        $.ajax({
        url:"/ajax/delete/user",
        type:"post",
        data: {
            del_list : JSON.stringify(del_list),
            cnct_url : location.pathname,
            cnct_btn : "B0004",
        },
        dataType:'json',
        success:function(data){
            console.log(data, 'data');
            if (!data.result) {
                mes_alert(data);
            }else{
                $("input[name=load_type]").val("delete");
                $("#search_frm").submit();
            }
        }
        });
    });

    $("#hBtnB0034").on("click", function(){
        window.open("about:blank").location.href = "/uploads/img/guide/usr_mgt.pdf";
    });

});

// function ow()
// {
//     var tw = window.open( "", "test", "width=400,height=400" );
//     var v1 = $('#v1').val();
//     $(tw.document.body).html("<input type=text value='"+v1+"'>");
//
//     //새창으로 post방식으로 값 넘길때 사용
//     $('#frm').target = "test";
//     $('#frm').submit();
//
// }

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


/* grid에서 입력값이 변경되었을 때 validation 체크하는 함수 */
var valid_chk = function (col, val){	// 칼럼 순서, 변경된 값
		let result = new Object();

		switch (col) {
		case "1":	// EMP ID
			result = valid_str_length(val, 10);
			break;
		case "2":	// 언어구분
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

function showChanged() {
    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}
</script>
