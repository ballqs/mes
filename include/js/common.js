$(function(){
    /**
     * 메인 메뉴 그리기
     */
    navTree.draw_menu();

    /**
     * 햄버거 버튼 클릭 기능
     */
	$("#ham_btn").on("click", function(){
		if($(".header").css("display") == "none"){
			$(".header").show();
			$(".mainBar, .Wrap, .footBar, #tab1_contents").css("width", "calc(100% - 220px)");
		}else{
			$(".header").hide();
			$(".mainBar, .Wrap, .footBar, #tab1_contents").css("width", "100%");
		}
	});

    $.ajax({
        url: "/ajax/get/name",
        type: "get",
        success: function (data) {
            $(".user > span").text(data);
        }
    });

    $('.sub_Hnav li a').click(function(){
        $(this).addClass('action');
    });

	$(".user").hover(function(){ $(".userPop").toggle(); });

    /**
     * grid 선택 기능
     */
    // $(".grids").on("click", function(){
    //     $("#selected_grid").val(this.id);
    // });

    /**
     * 엑셀 다운로드 기능
     */
    // $("#hBtnB0006").on("click", function(){
    //     let id = $("#selected_grid").val();
    //     common.excel_download(id);
    // });

    let setDate = function(){
        let now_date = new Date();
        let y = now_date.getFullYear();
        let m = (now_date.getMonth() + 1) < 10 ? '0' + (now_date.getMonth() + 1) : (now_date.getMonth() + 1);
        let d = now_date.getDate() < 10 ? '0' + now_date.getDate() : now_date.getDate();
        let result = y+'-'+m+'-'+d;
        if(document.getElementById('date1') !== null){
            document.getElementById('date1').value = result;
        }
        $(".date1").val(result);
        if(document.getElementById('date2') !== null){
            document.getElementById('date2').value = result;
        }
        $(".date2").val(result);
    }

    setDate();

    let setMonth = function(){
        let now_date = new Date();
        let y = now_date.getFullYear();
        let m = (now_date.getMonth() + 1) < 10 ? '0' + (now_date.getMonth() + 1) : (now_date.getMonth() + 1);
        let result = y+'-'+m;
        if(document.getElementById('month1') !== null){
            document.getElementById('month1').value = result;
        }
    }

    setMonth();



    //error popup Bt 클릭
    // $('.errDetailBt i').on('click', function(){
    //     $('.w2ui-popup').css('height', '400px !important');
    // });

    // $('.errDetailBt i').on('click', function(){
    //     $('.w2ui-popup').addClass('adddddddd');
    // });

    $('.errDetailBt i').on('click', function(){
        $('#w2ui-popup').css('display', 'none');
    });

// 엑셀 업로드
    $("#hBtnB0009").on("click", function(){
        $("#excel_upload_frm input[name='up_file']").trigger("click");
        // console.log($("#excel_upload_frm input[name=up_file]")[0].files[0]);

    });

    $("#excel_upload_frm input[name='up_file']").on("change", function () {
        if ($("#excel_upload_frm input[name='up_file']").val() != ''){
            var formData = new FormData($("#excel_upload_frm")[0]);
            // formData.append("up_file", $("#excel_upload_frm input[name=up_file]").val());
            // formData.append("test3", $("textarea[name=test3]").text());
            // formData.append("up_file", $("#excel_upload_frm input[name=up_file]")[0].files[0]);
            // $("#excel_upload_frm").

            formData.append("path", location.pathname);
            formData.append("grid", $("#selected_grid").val());

            jQuery.ajax({
                url : "/ajax/save/excel_upload"
                , type : "POST"
                , processData : false
                , contentType : false
                , data : formData
                , dataType : "json"
                , success:function(data) {
                    // var obj = JSON.parse(data);
                    console.log('data', data);
                    if (data.result){
                        common.success_msg(data.msg);
                    }else{
                        if ($("#excel_upload_frm input[name='up_file']").val() != ""){
                            $("#excel_upload_frm input[name='up_file']").val("");
                            if(data.msg !== ''){
                                mes_alert(data,{msg : ''});
                            }else{
                                mes_alert({msg : data.msg2},{msg : '해당 데이터 : '+data.error_data['prt_nbr_cd']});
                            }
                            console.log("break");
                        }
                    }
                },
                error: function (a,b,c) {
                    console.log("a", a);
                    console.log("b", b);
                    console.log("c", c);

                }
            });
        }
    });
});

/* input type = file 사용 편의를 위한 함수 */
function sync_text(obj, target){
	var fileValue = $(obj).val().split("\\");
	var fileName = fileValue[fileValue.length-1];
	$(target).val(fileName);
}

/* 조회, 삭제, 저장 성공시 footer 에 메세지 뿌려주는 함수 */
function success_msg(data){
	let d = new Date();
	$(".footBar > p").text(data+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
}

/* 버튼정보의 btn_img를 기본으로 img_tag에 이미지 태그를 생성하는 함수 */
function attach_imgtag(data){
	let path = "/uploads/img/buttons/";
	for ( var key in data) {
		data[key].img_tag = "<img src='" + path + data[key].btn_img + "'>";
	}
	return data;
}

/* w2ui 관련 커스텀 함수 */
/* 받아온 정보를 grid에 뿌려줄 수 있게 형태 변환하는 함수 */
function role_data(data){
	for (let i = 0; i < data.length; i++) {
	    data[i].recid = i + 1;
	    data[i].use_yn = (data[i].use_yn == 'Y') ? true : false;
	}
	return data;
}


/* w2ui의 w2popup을 momosmes 용으로 커스텀 하는 함수 */
function mes_alert(data,subdata = { msg : "잠시 후 시도해주세요."}){
    // let html = '<div class="errorWrap">' +
    //     '           <div class="text_r pr_10 pt_10">' +
    //     '               <a class="errDetailBt">' +
    //     '               <i class="fa fa-exclamation-circle" aria-hidden="true"></i>' +
    //     '               </a>' +
    //     '           </div>' +
    //     '       <div class="text_c">' +
    //     '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>' +
    //     '<div class="ib waningText mb_30">' +
    //     '<h1>'+data.msg+'</h1>' +
    //     '<h1>'+subdata.msg+'</h1>' +
    //     '</div></div>' +
    //     '<div class="errorCode"><ul>';
    let html =
        `<div class="errorWrap">
                <div class="text_r mr_10 mt_10">
                    <a class="errorDetailBt copy" onclick="common.clip_board('errorCode')"><i class="fas fa-pen"></i></a>
                    <a class="errorDetailBt"><i class="fa fa-exclamation-circle" aria-hidden="true"></i></a>
                </div>
                <div class="text_c">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    <div class="ib waningText mb_30">
                        <h1>${data.msg}</h1>
                        <h1>${subdata.msg}</h1>
                    </div>
                </div>
            </div>
            <div class="errorCode" id="errorCode"><ul>`;

    for (const key in data.error) {
        if (key !== "responseText")
        {
            html += `<li>${key} : ${data.error[key]}</li>`;
        }
        if (data.error.hasOwnProperty(key)) {
            html += "<li>"+key+" : " +data.error[key]+"</li>"
        }
    }
    html += '</ul></div></div>';
    // w2popup.open({
    //     body: '<div class="w2ui-centered">'+html+'</div>',
    // });
    w2popup.open({
        // title   : '품번 코드',
        width   : 500,
        // height  : 300,
        showMax : true,
        body    : '<div class="w2ui-centered">'+html+'</div>',
        onOpen  : function (event) {
            event.onComplete = function () {
                $('#w2ui-popup #main').w2render('layout');
                // w2ui.layout.content('left', w2ui.grid);
            };
        },
        onToggle: function (event) {
            event.onComplete = function () {
                w2ui.layout.resize();
            }
        },
        buttons   :
            '<a class="w2ui-btn errorBt" onclick="mes_alert_off();" style="background: #e40909;">확인</a>', //lock 이라고 되어있었음
    });
}

/* mes_alert() 종료 함수 */
function mes_alert_off(){
    let header = document.getElementById("w2ui-popup");
    header.parentNode.removeChild(header);
    let header1 = document.getElementById("w2ui-lock");
    header1.parentNode.removeChild(header1);
}

function test_alert(num){
    var a_test = {};
    a_test.msg = "test alert";
    a_test.error = [];
    for (let i=0; i<num; num++) {
        a_test.error.push("Error msg No."+num);
    }
    mes_alert(a_test);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//String 형식에 format 기능 추가...
if (!String.format) {
    String.format = function(format) {
        let args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class common{

	static search_param = {};

    static w2ui_copy_eq_columns(from_grid, to_grid, exception_arr = []){
    	let clicked_row = common.get_last_clicked_row();
        let grid01_info = clicked_row[from_grid];
//         let grid02_added = common.get_last_clicked_row()[to_grid];
        let grid02_added = w2ui[to_grid].records[w2ui[to_grid].records.length - 1];
        for(let key in grid01_info){
            for(let col_item of w2ui[to_grid].columns){
                if(col_item.field == key && key != 'recid' && (exception_arr.indexOf(key) == -1)) grid02_added[col_item.field] = grid01_info[key];
            }
        }
        w2ui[to_grid].refresh();
    }

	static get_last_clicked_row(class_name = "grids"){
        let rec = {};
        let clicked_rec;
        $("."+class_name).each(function(){
            clicked_rec = w2ui[this.id].last.click_recid - 1;
            rec[this.id] = w2ui[this.id].records[clicked_rec];
        });
        return rec;
    }

    /**
     * select 안의 옵션 그리는 함수
     * @param form_name
     * @param target_name
     * @param data
     * @param value_key
     * @param text_key
     * @param add_key
     * @param add_text
     */
	static draw_select(form_name, target_name, data, value_key, text_key, add_key = "", add_text = ""){
//             console.log('data',data);
//             console.log(document[form_name][target_name]);
//             for(let i=0; i<document[form_name][target_name].length; i++){
//                 document[form_name][target_name].remove(document[form_name][target_name]);
//             }
        if(document[form_name][target_name].tagName != 'SELECT') {
            console.log("The target tag is not 'SELECT'!");
            return false;
        }
		$(document[form_name][target_name]).empty();
        if(!(add_key == "" && add_text == "")){
            let option = document.createElement("option");
            option.value = add_key;
            option.text = add_text;
            document[form_name][target_name].options.add(option);
        }
		for(let i=0; i<data.length; i++){
			let option = document.createElement("option");
			option.value = data[i][value_key];
			option.text = data[i][text_key];
			document[form_name][target_name].options.add(option);
		}

	}

    /**
     * form 초기화 함수
     * @param form_name
     * @param exception_types_array
     * @param custom_functions
     * @returns {boolean}
     */
	static init_frm(form_name, exception_types_array = [], custom_functions = {}){
		let leadingZeros = function(n, digits) {
			let zero = '';
			n = n.toString();
			if (n.length < digits) {
				for (let i = 0; i < digits - n.length; i++) zero += '0';
			}
			return zero + n;
		}
	    let getTimeStamp = function() {
            let d = new Date()
                , s =
                leadingZeros(d.getFullYear(), 4) + '-' +
                leadingZeros(d.getMonth() + 1, 2) + '-' +
                leadingZeros(d.getDate(), 2);
            return s;
        }
        if(custom_functions.pre !== undefined && typeof custom_functions.pre === 'function'){
            if(!custom_functions.pre(form_name)) return false;
        }
        let tag_type = "input";
        if(exception_types_array.indexOf(tag_type) == -1) {
            for (let i = 0; i < document[form_name].getElementsByTagName(tag_type).length; i++) {
                let input_type = ["text", "checkbox", "date", "today"];
                if (exception_types_array.indexOf(input_type[0]) == -1 && document[form_name].getElementsByTagName(tag_type)[i].type === input_type[0]) document[form_name].getElementsByTagName(tag_type)[i].value = '';
                else if (exception_types_array.indexOf(input_type[1]) == -1 && document[form_name].getElementsByTagName(tag_type)[i].type === input_type[1]) document[form_name].getElementsByTagName(tag_type)[i].checked = false;
                else if (exception_types_array.indexOf(input_type[2]) == -1 && document[form_name].getElementsByTagName(tag_type)[i].type === input_type[2]) {  // date 일 경우 비우기 또는 오늘 날짜 넣기
                    if (exception_types_array.indexOf(input_type[3]) == -1) {
                        document[form_name].getElementsByTagName(tag_type)[i].value = '';
                    }else{
                        document[form_name].getElementsByTagName(tag_type)[i].value = getTimeStamp();
                    }
                };

            }
        }
        tag_type = "textarea";
        if(exception_types_array.indexOf(tag_type) == -1) {
            for (let i = 0; i < document[form_name].getElementsByTagName(tag_type).length; i++) {
                document[form_name].getElementsByTagName(tag_type)[i].value = '';
            }
        }
        tag_type = "select";
        if(exception_types_array.indexOf(tag_type) == -1) {
            let name = '';
            let first_value = '';
            for (let i = 0; i < document[form_name].getElementsByTagName(tag_type).length; i++) {
                name = document[form_name].getElementsByTagName(tag_type)[i].name;
                if(document[form_name][name].firstChild !== null && document[form_name][name].firstChild.value !== null){
					first_value = document[form_name][name].firstChild.value;
					document[form_name][name].value = first_value;
                }
            }
        }

        if(custom_functions.post !== undefined && typeof custom_functions.post === 'function'){
            custom_functions.pre(form_name);
        }
    }

    /**
     * 배열 안의 배열을 순서대로 합쳐서 리턴하는 함수
     * @param columns_arr
     * @returns {[]}
     */
    static merge_columns(columns_arr){
    	let tmp_arr = [];
		for (let item of columns_arr){
			tmp_arr = tmp_arr.concat(item);
		}
		return tmp_arr;
    }

    static getTimeStamp() {
        let d = new Date()
        , s =
            this.leadingZeros(d.getFullYear(), 4) + '-' +
            this.leadingZeros(d.getMonth() + 1, 2) + '-' +
            this.leadingZeros(d.getDate(), 2);
        return s;
    }

    static leadingZeros(n, digits) {

        let zero = '';
        n = n.toString();

        if (n.length < digits) {
            for (let i = 0; i < digits - n.length; i++)
                zero += '0';
        }
        return zero + n;
    }
    /**
     *
     * @param object param
     */
    static code(param){
        return $.ajax({
            url: "/ajax/get/code",
            type: "get",
            data: param,
            dataType: "json",
            success: function (data)
            {
                console.log('code',data);
            }
        });
    }

    static exCode(param){
        return $.ajax({
            url: "/ajax/get/ex_code",
            type: "get",
            data: param,
            dataType: "json",
            success: function (data)
            {
                //console.log(data);
            }
        });
    }

    /**
     * 엑셀 다운로드
     * @param grid_id
     */
    static excel_download(grid_id){

        console.log("excel_download's this:", this);
        /**
         *
         * @param grid_id
         * @returns {boolean}
         */


        let make_tbl = function(grid_id){
            if(grid_id === ""){ mes_alert({msg : "선택된 그리드가 없습니다."}); return false;}
            $("#excel_temp_table").remove();
            let column = w2ui[grid_id].columns;
            let rec = w2ui[grid_id].records;
            let tbl = [];
            let tmp = [];
            for (let key in column){
                tmp.push(column[key].caption.replace("<i class=\"fa fa-sort\" aria-hidden=\"true\"></i>",""));
            }
            tbl.push(tmp);
            let fld = "";
            let items_tmp = [];
            let chk = false;
            for (let key in rec){
                tmp = [];
                for (let key_c in column){
                    fld = column[key_c].field;
                    if(column[key_c].editable !== undefined && column[key_c].editable.type == "select"){    // select 일 때
                        items_tmp = column[key_c].editable.items;
                        for (let item in items_tmp){
                            if(rec[key][fld] == column[key_c].editable.items[item].id){
                                tmp.push(column[key_c].editable.items[item].text);
                                chk = true;
                            }
                        }
                        if(!chk) {
                            // tmp.push("ERROR(no value)");
                            tmp.push("");
                        }
                        chk = false;
                    }else if(column[key_c].editable !== undefined && column[key_c].editable.type == "checkbox"){
                        if(rec[key][fld] === undefined){
                            tmp.push("");
                        }else if(rec[key][fld]){
                            tmp.push("Y");
                        }else if(!rec[key][fld]){
                            tmp.push("N");
                        }
                    }else{  // select 가 아닐 때
                        if (rec[key][fld] == null){
                            tmp.push("");
                        }else{
                            tmp.push(rec[key][fld]);
                        }

                    }
                }
                tbl.push(tmp);
            }

            let html = "";
            html += "<table style='display:none;' id='excel_temp_table'>"
            for (let key in tbl) {
                html += "<tr>";
                for (let key_in in tbl[key]) {
                    html += "<td>";
                    html += tbl[key][key_in];
                    html += "</td>";
                }
                html += "</tr>";
            }
            html += "</table>";

            $('body').append(html);

            fnExcelReport("excel_temp_table", w2ui[grid_id].columns, "excel_download");

        };


        /**
         * w2grid 현 상태를 엑셀로 다운로드 하는 함수
         * @param id
         * @param col_name
         * @param title
         */
        let fnExcelReport = function(id, col_name, title){
            $.ajax({
                url: "/",
                type: "post",
                data: {
                    cnct_url : location.pathname,
                    cnct_btn : "B0006",
                },
                // dataType: "json",
                success:function(){
                    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
                    tab_text = tab_text + '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
                    tab_text = tab_text + '<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
                    tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
                    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
                    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
                    tab_text = tab_text + "<table border='1px'>";
                    // tab_text = tab_text + "<tr><td></td>";
                    // for (const key in col_name) {
                    //     tab_text = tab_text + "<td>"+col_name[key].caption+"</td>";
                    // }
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
            });
        }

        make_tbl(grid_id);
    }

    /* 조회, 삭제, 저장 성공시 footer 에 메세지 뿌려주는 함수 */
    static success_msg(str_msg){
        let d = new Date();
        $(".footBar > p").text(str_msg+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
    }

    /* w2ui의 w2popup을 momosmes 용으로 커스텀 하는 함수 */
    static mes_alert(alert_obj){
        let html =
           `<div class="errorWrap">
                <div class="text_r mr_10 mt_10">
                    <a class="errorDetailBt copy" onclick="common.clip_board('errorCode')"><i class="fas fa-pen"></i></a>
                    <a class="errorDetailBt"><i class="fa fa-exclamation-circle" aria-hidden="true"></i></a>
                </div>
                <div class="text_c">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    <div class="ib waningText mb_30">
                        <h1>${alert_obj.msg}</h1>
                    </div>
                </div>
            </div>
            <div class="errorCode" id="errorCode"><ul>`;
        for (const key in alert_obj.error)
        {
            if (key !== "responseText")
            {
                html += `<li>${key} : ${alert_obj.error[key]}</li>`;
            }
        }
        html += '</ul></div></div>';
        // w2popup.open({
        //     body: '<div class="w2ui-centered">'+html+'</div>',
        // });
        w2popup.open({
            // title   : '품번 코드',
            width   : 500,
            height  : 500,
            showMax : true,
            body    : '<div class="w2ui-centered">'+html+'</div>',
            onOpen  : function (event) {
                event.onComplete = function () {
                    $('#w2ui-popup #main').w2render('layout');
                    //w2ui.layout.content('left', w2ui.grid);
                };
            },
            onToggle: function (event) {
                event.onComplete = function () {
                    w2ui.layout.resize();
                }
            },
            buttons   :
                '<a class="w2ui-btn errorBt" onclick="mes_alert_off();" style="background: #e40909;">확인</a>', //lock 이라고 되어있었음
        });
    }

    static clip_board(el){
        // console.log($(el).html());
        const copyText = document.getElementById(el).textContent;
        const textArea = document.createElement('textarea');
        textArea.textContent = copyText;
        document.body.append(textArea);
        textArea.select();
        document.execCommand("copy");
        alert("복사되었습니다.");
    }

    /* mes_alert() 종료 함수 */
    static mes_alert_off(){
        let header = document.getElementById("w2ui-popup");
        header.parentNode.removeChild(header);
        let header1 = document.getElementById("w2ui-lock");
        header1.parentNode.removeChild(header1);
    }

    static get_date(){
        var date = new Date();
        var year = date.getFullYear();
        var month = new String(date.getMonth()+1);
        var day = new String(date.getDate());

        // 한자리수일 경우 0을 채워준다.
        if(month.length == 1){
            month = "0" + month;
        }
        if(day.length == 1){
            day = "0" + day;
        }

        return year + "-" + month + "-" + day;
    }

    static date_format(dt){
        console.log(typeof dt);
        let y = dt.getFullYear();
        let m = (dt.getMonth() + 1) < 10 ? '0' + (now_date.getMonth() + 1) : (now_date.getMonth() + 1);
        let d = dt.getDate() < 10 ? '0' + now_date.getDate() : now_date.getDate();
        return y+'-'+m+'-'+d;
    }

    static role_data(data){
        for (let i = 0; i < data.length; i++) {
            data[i].recid = i + 1;
            data[i].use_yn = (data[i].use_yn == 'Y') ? true : false;
        }
        return data;
    }

    /**
     * yyyy-mm 형태를 w2ui 캘린더로 연결.
     * @param from_id
     * @param to_name
     */
    static ym_setting(from_id, to_name){
        $('input[type=us-date]').w2field('date');
        /**
         * 입력받은 yyyymmdd 을 yyyymm 으로 변경
         * @param dt
         * @returns {string}
         */
        let date_to_ym = function(dt){
            let tmp = dt.split('-');
            tmp.splice(2, 1);
            dt = tmp.join('-');
            return dt;
        }

        $("#"+from_id).val(common.get_date());

        $("input[name='"+to_name+"']").val(date_to_ym(common.get_date()));

        $("#"+from_id).on("change", function(obj){
            let dt = $(this).val();
            $(this).val(dt);
            $("input[name='"+to_name+"']").val(date_to_ym(dt));
        });
    }

    static SerializeSelectForm(frm_attr, frm_attr_val){

    }
    static Automatic_addition(grid_id,columns = [],values = []){
        let target_row = w2ui[grid_id].records.length - 1;
        for(let i = 0; i<columns.length; i++) {
            for (let j = 0; j < w2ui[grid_id].columns.length; j++) {
                if (w2ui[grid_id].columns[j]["field"] === columns[i]) {
                    if (w2ui[grid_id].records[target_row]["w2ui"] === undefined) {
                        w2ui[grid_id].records[target_row]["w2ui"] = {changes: {}};
                    }
                    w2ui[grid_id].records[target_row]["w2ui"]["changes"][columns[i]] = values[i];
                    w2ui[grid_id].refresh();
                }
            }
        }
    }
    static w2uiRefresh(gridNameArr = []){
    	let grids = $(".grids");
    	$(".grids").each(function(){
			console.log(this);
		});
    }

    static getLotnoMgt(fact_cd, prt_nbr_cd){
        let param = {
            "fact_cd" : fact_cd,
            "prt_nbr_cd" : prt_nbr_cd,
        };
        return $.ajax({
            url: "/ajax/get/lotno_mgt",
            type: "get",
            data: param,
            dataType: "json",
            success: function (data)
            {
                //console.log(data);
            }
        });
    }
}
