import {FormHelper, ScriptHelper} from "/include/js/class/PageManager.js";
import {tableManager} from "/include/js/production/status/SiteTerminalManager.js";

$(function(){
    let popup_id = "popup_tmp_bad_status";
    let form_id = "popup_tmp_bad_status_frm";
    let form_name = "popup_tmp_bad_status_frm";
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

    let trOnClickTypeInputHiddenCallback = {
        post : function(obj) {
            document[form_name].lotno.value = obj.dataset.key;
            document[form_name].loc_cd.value = obj.children[7].textContent;
        }
    }

    let param = FormHelper.SerializeForm(form_id);
    let get_url = "/ajax/production/status/get/tmp_bad_status";
    let key_col = 'lotno';
    let table_arr_bad = ['inst_dt', 'err_cd', 'err_nm', 'err_qty', 'emp_nm', 'seq'];

    let table_bad = new tableManager("#table_tmp_bad_status");
    table_bad.add_checkbox('check_list', 0, 'seq', 'err_cd');
    table_bad.set_hidden_cols(['seq']);
    table_bad.set_class(['text_c','text_c','','text_r','','']);

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
            table_bad.draw_tbody(get_url, {param:param, cnct_url: location.pathname, cnct_btn: "B0001"}, table_arr_bad);
            let d = new Date();
            $(".noticeFooter .cont").text("조회되었습니다."+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");

        } else if (this.dataset.name == "cls") {
            let param = FormHelper.SerializeForm("popup_wrkctr_orderno_result_frm");
            $.ajax({
                url:"/ajax/production/status/get/curr_wrkctr_tmp_err_sum",
                type:"get",
                data:{param:param},
                dataType:"json",
                success: function (res) {
                    console.log('res', res);
                    // $(`#orderno_result_table input[name='err_qty']`).val(res.err_qty_sum);
                    $(`#popup_wrkctr_orderno_result input[name='hidden_sum_prct_qty']`).val(res.data.sum_mach_qty);
                    $(`#popup_wrkctr_orderno_result input[name='hidden_sum_res_qty']`).val(res.data.sum_mach_qty);
                    $(`#popup_wrkctr_orderno_result input[name='hidden_sum_in_qty']`).val(res.data.sum_mach_qty);
                    $(`#orderno_result_table input[name='orderno_result']`).val(res.data.sum_mach_qty);
                    $(`#orderno_result_table input[name='prd_good_qty']`).val(0);
                    $(`#orderno_result_table input[name='err_qty']`).val(res.data.err_qty);
                }
            });
            $(`#${popup_id}`).css("display", "none");
            $(`#${popup_id} #table_bad_status > tbody`).html("");
            document.tabletMain.set_interval_flag.value = 'T';
        } else if (this.dataset.name == "del") {    // 삭제 버튼
            // $(`#${popup_id}`).css("display", "none");
            // $(`#${popup_id} #table_bad_status > tbody`).html("");

            let param = FormHelper.SerializeForm(form_id);

            param.checked_rows = [];

            $(`#${form_id} #table_tmp_bad_status > tbody > tr`).each(function () {
                if ($(this).children().eq(0).children().eq(0).prop("checked")) {
                    param.checked_rows.push({
                        inst_dt: $(this).children().eq(1).text(),
                        err_cd: $(this).children().eq(2).text(),
                        err_qty: $(this).children().eq(4).text(),
                        seq: $(this).children().eq(6).text(),
                    });
                }
            });

            $.ajax({
                url:"/ajax/production/status/delete/sel_tmp_bad",
                type:"post",
                data:{param:param, cnct_url: location.pathname, cnct_btn: "B0004"},
                dataType: "json",
                success:function (res) {
                    console.log(res);
                    let fnc = {
                        post : function(res) {
                            let d = new Date();
                            $(".noticeFooter .cont").text("삭제되었습니다." + "(" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")");
                        }
                    }
                    if(res.result){
                        table_bad.draw_tbody(get_url, {param:param}, table_arr_bad, null, fnc);

                    }else{
                        common.mes_alert({msg:res.msg});
                    }
                }
            });

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
});