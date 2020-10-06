import {FormHelper, ScriptHelper} from "/include/js/class/PageManager.js";
import {tableManager} from "/include/js/production/status/SiteTerminalManager.js";

$(function(){
    let popup_id = "popup_wrkctr_stop_reason_auto";
    let form_id = "popup_wrkctr_stop_reason_auto_frm";
    let form_name = "popup_wrkctr_stop_reason_auto_frm";
    let callbackFnc = {
        pre : function(){
            console.log("pre callbackFnc");
        },
        post : function(data){
            console.log("post callbackFnc res : ", data);
            // data.wrkctr_wrkr_cnt
            // $("#popup_sel_wrkctr_wrkr_frm input[name='wrkctr_wrkr_cnt']").val(data.wrkctr_wrkr_cnt);
            // $("#popup_sel_wrkctr_wrkr_frm input[name='sel_main_wrkr']").val(data.main_wrkr_info.sel_wrkr_cd);
            // $("#popup_sel_wrkctr_wrkr_frm input[name='main_wrkr']").val(data.main_wrkr_info.wrkr_cd);
        }
    }

    let param = FormHelper.SerializeForm(form_id);
    let get_url = "/ajax/production/status/get/runstop_status_auto";
    let key_col = 'lotno';
    let table_arr_bad = ['str_dt', 'end_dt', 'wrk_tm_min','stop_nm', 'crt_gbn_nm'];

    let table_bad = new tableManager("#table_runstop_status_auto");
    table_bad.set_class(['text_c','text_c','text_r','stop_nm',''])
    // table_bad.add_checkbox("chk_list", 0, 'sprt_nbr', 'lotno');
    // table_bad.set_hidden_cols(['stck_whs_cd', 'stck_loc_cd', 'stck_unit']);

    let draw_tbl = function(){
        $(`#${form_id} input[name='page']`).val("1");
        param = FormHelper.SerializeForm(form_id);
        table_bad.draw_tbody(get_url, {param : param}, table_arr_bad, key_col);
    }

    $(`#${form_id} .tabTitle > div`).on("click", function(){
        let search_type = this.dataset.searchType;
        $(`#${form_id} input[name='search_type']`).val(search_type);
        $(`#${form_id} input[name='arrow_type']`).val("");    // 페이지 증감에 관여하지 않아야 하기때문에 초기화.
        draw_tbl(search_type);
    });

    // 날짜 버튼 기능
    $(`#${form_id} .viewDate`).on("click", ".arrowU", function(){on_click_date_btn(this);});
    $(`#${form_id} .viewDate`).on("click", ".arrowD", function(){on_click_date_btn(this);});

    function on_click_date_btn(obj){
        let target_name = $(obj).parent()[0].dataset.iname;
        let arrow_type = $(obj).hasClass("arrowU") ? 1 : -1;

        // 타겟의 값을 가져와서 1일 타입별 더하기빼기 하고 다시 뿌리기.
        let curr_date = new Date(document[form_name][target_name].value);
        curr_date.setDate(curr_date.getDate() + arrow_type);

        let y = curr_date.getFullYear();
        let m = (curr_date.getMonth() + 1) < 10 ? '0' + (curr_date.getMonth() + 1) : (curr_date.getMonth() + 1);
        let d = curr_date.getDate() < 10 ? '0' + curr_date.getDate() : curr_date.getDate();

        document[form_name][target_name].value = y+'-'+m+'-'+d;
    }
    // 날짜 버튼 기능 끝

    $(`#${form_id} .opBtn`).on("click", function(){
        if (this.dataset.name == "search") {
            let param = FormHelper.SerializeForm(form_id);
            table_bad.draw_tbody(get_url, {param:param,cnct_url: location.pathname, cnct_btn: "B0001"}, table_arr_bad);
        } else if (this.dataset.name == "cls") {
            $(`#${popup_id}`).css("display", "none");

            $(`#${popup_id} #table_runstop_status_auto > tbody`).html("");

            document.tabletMain.set_interval_flag.value = 'T';
        }
    });

    $(`#${form_id} .arrow`).on("click", function(){
        $(`#${form_id} input[name='arrow_type']`).val(this.dataset.arrow);
        let param = FormHelper.SerializeForm(form_id);
        table_bad.draw_tbody(get_url, {param:param}, table_arr_bad);
    });

    $(`#${form_id} .btnCont`).on("click", "label", function(){
        if($(this).children("input").prop("checked")){
            $(this).addClass('on');
        }else{
            $(this).removeClass('on');
        }
        document.getElementById("clicked_wrkctr").value = $(this).children('p').text();
    });

    $(`#table_runstop_status_auto`).on("click", "tr", function(){
        document.popup_stop_cd_list_frm.str_dt.value = this.dataset.key;
        $(this).children('td').each(function(){
            if(this.dataset.key == 'stop_nm' && this.dataset.value == ''){
                console.log(this);
                $("#popup_stop_cd_list").css("display", "");
            }
        });
    })

    // $('#table_runstop_status_auto .stop_nm').delegate("click", function(){
    //     console.log(this);
    // });
    //비가동 코드 팝업 내용 그리기.
    // $.ajax({
    //     url:"/ajax/get/code",
    //     type:"get",
    //     data:{up_cd:'stop_gbn'},
    //     dataType:"json",
    //     success:function (res) {
    //         console.log('stop_gbn', res);
    //         let html = "";
    //         for (let key in res.data){
    //             html += `<tr data-stopgbncd="${res.data[key].cd}">`;
    //             html +=     `<td>${res.data[key].cd_nm}</td>`;
    //             html +=     `<td>${res.data[key].cd}</td>`;
    //             html += `</tr>`;
    //         }
    //         $(`#popup_stop_cd_list table > tbody`).html(html);
    //     }
    // });


});