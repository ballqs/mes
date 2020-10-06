import {FormHelper, ScriptHelper} from "/include/js/class/PageManager.js";
import {tableManager} from "/include/js/production/status/SiteTerminalManager.js";

$(function(){
    let popup_id = "popup_sel_wrkctr_orderno";
    let form_id = "popup_sel_wrkctr_orderno_frm";
    let form_name = "popup_sel_wrkctr_orderno_frm";

    let callbackFnc = {
        pre : function(){
            console.log("pre");
        },
        post : function(data){
            console.log(data);
            // data.wrkctr_wrkr_cnt
            $("#popup_sel_wrkctr_wrkr_frm input[name='wrkctr_wrkr_cnt']").val(data.wrkctr_wrkr_cnt);
            $("#popup_sel_wrkctr_wrkr_frm input[name='sel_main_wrkr']").val(data.main_wrkr_info.sel_wrkr_cd);
            $("#popup_sel_wrkctr_wrkr_frm input[name='main_wrkr']").val(data.main_wrkr_info.wrkr_cd);
        }
    }

    // 날짜 업다운버튼 시작
    let calDate = function(ori_date, date_number_to_add){
        let dt = new Date(Number(ori_date[0]), Number(ori_date[1]) - 1, Number(ori_date[2]) + date_number_to_add);
        let y = dt.getFullYear();
        let m = (dt.getMonth() + 1) < 10 ? '0' + (dt.getMonth() + 1) : (dt.getMonth() + 1);
        let d = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        return y+'-'+m+'-'+d;
    }

    $(`#${form_id} .arrowU`).on("click", function(){
        let plan_date = document[form_name].plan_date.value.split("-");
        let result = calDate(plan_date, 1);
        document[form_name].plan_date.value = result;
    });

    $(`#${form_id} .arrowD`).on("click", function(){
        let plan_date = document[form_name].plan_date.value.split("-");
        let result = calDate(plan_date, -1);
        document[form_name].plan_date.value = result;
    });
    // 날짜 업다운버튼 끝

    let trOnClickTypeInputHiddenCallback = {
        post : function(obj) {
            // console.log(obj);
            // document[form_name].hidden_wrk_ordr_no.value = obj.dataset.key;
            // $.ajax({
            //     url: "/ajax/production/status/get/wrkctrinfo",
            //     type: "get",
            //     data: {
            //         param: {
            //             where: {
            //                 wrkctr_cd: document.tabletMain.selected_wrkctr_cd.value
            //             }
            //         }
            //     },
            //     dataType: "json",
            //     success: function (res) {
            //         if (!res.result) {
            //             common.mes_alert({msg: res.msg});
            //             let btn_id = res.data[0][0].out_button;
            //             wrkctrManager.btnAlert(btn_id);
            //         } else {
            //             let cd = obj.dataset.key;
            //             let nm = obj.children[1].textContent;
            //             $(".hidden_wrkctr_cd").val(obj.dataset.key);
            //             $(".hidden_wrkctr_nm").val(obj.children[1].textContent);
            //         }
            //     },
            //     error: function (a, b, c) {
            //         console.log(a.responseText);
            //     }
            // });
        }
    }

    let param = FormHelper.SerializeForm(form_id);
    let get_url = "/ajax/production/status/get/wrkctr_orderno";
    let daynight_key_col = 'wrk_ordr_no';
    let daynight_tbl_arr = ['wrk_ordr_no', 'daynight', 'ordr_prt_nbr_no', 'prt_nbr_nm', 'ordr_qty', 'prd_good_qty', 'err_qty', 'percent', 'ppm'];
    let target_input_selector = `form[name='popup_sel_wrkctr_orderno_frm'] input[name='hidden_wrk_ordr_no_for_save']`;

    let daynight_all_tbl = new tableManager("#daynight_all");
    daynight_all_tbl.trOnClickTypeInputHidden(target_input_selector, 'Ton', trOnClickTypeInputHiddenCallback);
    daynight_all_tbl.draw_tbody(get_url, {param : param}, daynight_tbl_arr, daynight_key_col);
    daynight_all_tbl.set_class(['','','','','text_r','text_r','text_r','text_r','text_r']);

    let daynight_day_tbl = new tableManager("#daynight_day");
    daynight_day_tbl.trOnClickTypeInputHidden(target_input_selector, 'Ton', trOnClickTypeInputHiddenCallback);
    // daynight_day_tbl.draw_tbody(get_url, {param : param}, daynight_tbl_arr, daynight_key_col);
    daynight_day_tbl.set_class(['','','','','text_r','text_r','text_r','text_r','text_r']);

    let daynight_night_tbl = new tableManager("#daynight_night");
    daynight_night_tbl.trOnClickTypeInputHidden(target_input_selector, 'Ton', trOnClickTypeInputHiddenCallback);
    // daynight_night_tbl.draw_tbody(get_url, {param : param}, daynight_tbl_arr, daynight_key_col);
    daynight_night_tbl.set_class(['','','','','text_r','text_r','text_r','text_r','text_r']);

    let draw_tbl = function(daynight){
        if (daynight == '') {
            $(`#${form_id} input[name='page_for_all']`).val("1");
            param = FormHelper.SerializeForm(form_id);
            daynight_all_tbl.draw_tbody(get_url, {param : param}, daynight_tbl_arr, daynight_key_col);
        } else if (daynight == 'D') {
            $(`#${form_id} input[name='page_for_day']`).val("1");
            param = FormHelper.SerializeForm(form_id);
            daynight_day_tbl.draw_tbody(get_url, {param : param}, daynight_tbl_arr, daynight_key_col);
        } else if (daynight == 'N') {
            $(`#${form_id} input[name='page_for_night']`).val("1");
            param = FormHelper.SerializeForm(form_id);
            daynight_night_tbl.draw_tbody(get_url, {param : param}, daynight_tbl_arr, daynight_key_col);
        }
    }

    $(`#${form_id} .tabTitle > div`).on("click", function(){
        // console.log(this);
        let daynight = this.dataset.daynight;
        // document[form_name].search_type = this.dataset.daynight;
        $(`#${form_id} input[name='search_type']`).val(daynight);
        $(`#${form_id} input[name='arrow_type']`).val("");    // 페이지 증감에 관여하지 않아야 하기때문에 초기화.
        // $(`#${form_id} .tabCont > table > tbody`).html("");
        draw_tbl(daynight);

        // if (daynight == '') {
        //     $(`#${form_id} input[name='page_for_all']`).val("1");
        //     param = FormHelper.SerializeForm(form_id);
        //     daynight_all_tbl.draw_tbody(get_url, {param : param}, daynight_tbl_arr, daynight_key_col);
        // } else if (daynight == 'D') {
        //     $(`#${form_id} input[name='page_for_day']`).val("1");
        //     param = FormHelper.SerializeForm(form_id);
        //     daynight_day_tbl.draw_tbody(get_url, {param : param}, daynight_tbl_arr, daynight_key_col);
        // } else if (daynight == 'N') {
        //     $(`#${form_id} input[name='page_for_night']`).val("1");
        //     param = FormHelper.SerializeForm(form_id);
        //     daynight_night_tbl.draw_tbody(get_url, {param : param}, daynight_tbl_arr, daynight_key_col);
        // }

    });


    $(`#${form_id} .opBtn`).on("click", function(){

        if (this.dataset.name == "init") {
            console.log("this");
            $(`#${form_id} input[name='page']`).val("1");
            daynight_all_tbl.draw_tbody(get_url, {param : param, cnct_url: location.pathname, cnct_btn: "B0002",}, daynight_tbl_arr, daynight_key_col);
            // popup_sel_wrkctr_wrkr.searchPage(get_url, callbackFnc);
        } else if (this.dataset.name == "cfm") {
            if($(`#popup_sel_wrkctr_orderno_frm input[name='hidden_wrk_ordr_no_for_save']`).val() == ''){
                common.mes_alert({msg:'지시할 작업을 선택해주세요.'});
                return false;
            };
            param = FormHelper.SerializeForm(form_id);
            $.ajax({
                url:"/ajax/production/status/save/wrkctr_orderno",
                type:"post",
                data:{
                    param: param,
                    cnct_url: location.pathname,
                    cnct_btn: "B0003",
                },
                dataType:"json",
                success:function (res) {
                    console.log(res);
                    $(`#${popup_id}`).css("display", "none");
                    $(`#wrkctrlist_tbl > tbody > tr`).each(function(){
                        if($(this).hasClass("Ton")){
                            $(this).click();
                        }
                    });
                    // 버튼 깜빡이..
                    wrkctr_common.set_action_btn();

                    $(`#${popup_id} input[name='hidden_wrk_ordr_no_for_save']`).val("");
                },
                error: function (a, b, c) {
                    console.log('a', a);
                    console.log('c', c);
                    console.log('b', b);
                }
            });

        } else if (this.dataset.name == "cls") {
            $(`#${popup_id} input[name='hidden_wrk_ordr_no_for_save']`).val("");
            $(`#${popup_id}`).css("display", "none");
            $(`#${popup_id} #daynight_all > tbody`).html("");
            $(`#${popup_id} #daynight_day > tbody`).html("");
            $(`#${popup_id} #daynight_night > tbody`).html("");
            document.tabletMain.set_interval_flag.value = 'T';
        }

    });

    $(`#${form_id} .arrow`).on("click", function(){
        $(`#${form_id} input[name='arrow_type']`).val(this.dataset.arrow);
        // let url = getUrl();
        // console.log('thisform', this.form);
        let daynight = $(`#${form_id} input[name='search_type']`).val();
        draw_tbl(daynight);
        // popup_sel_wrkctr_wrkr.searchPage(url);
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


class popup_sel_wrkctr_wrkr{

    static searchPage(url, callback = { pre: null, post: null}, msg = true){
        if(callback.pre != null) callback.pre();
        let param = FormHelper.SerializeForm("popup_sel_wrkctr_wrkr_frm");
        $.ajax({
            url: url,
            type: "get",
            data: {param: param},
            dataType: "json",
            success: function (data) {
                console.log(data);
                popup_sel_wrkctr_wrkr.drawCont(data, "#popup_sel_wrkctr_wrkr_frm .btnCont");
                $("#popup_sel_wrkctr_wrkr_frm input[name='page']").val(data.page);
                if (msg) { popup_sel_wrkctr_wrkr.success_msg(data.msg); }
                if(callback.post != null) callback.post(data);
            }
        });
    }

    static drawCont(data, jquery_selector){
        let html = ``;
        let class_name = 'on';
        let insert_class_name;
        let flag;
        let is_checked;
        let is_main_wrkr;
        for (let key in data.data){
            // console.log(data.data);
            console.log("data.data[key].wrkr_cd", data.data[key].wrkr_cd);
            if(data.data[key].sel_wrkr_cd != null){
                flag = true;
                insert_class_name = class_name;
                is_checked = 'checked';
            } else {
                flag = false;
                insert_class_name = '';
                is_checked = '';
            }
            if(data.data[key].main_wrkr_yn == 'Y'){is_main_wrkr = '*';}
            else {is_main_wrkr = '';}
            html += `<label class="${insert_class_name}"><input type="checkbox" name="wrkr_cd" value="${data.data[key].wrkr_cd}" autocomplete="off" style="display:none;" ${is_checked}><p>${is_main_wrkr}${data.data[key].emp_nm}${is_main_wrkr}</p></label>`;
        }
        $(jquery_selector).html(html);

    }

    static cfmBtn(form_id = '', checkboxName = '', url = ''){
        // let param = FormHelper.SerializeForm("popup_sel_wrkctr_wrkr_frm");
        let param = FormHelper.SerializeForm(form_id);
        // let arr = this.checkboxStatus('wrkr_cd');
        let arr = this.checkboxStatus(checkboxName);
        param.where.wrkr_cd = arr;

        $.ajax({
            url: url,
            type: "post",
            data: { param : param },
            dataType: "json",
            success: function (data) {
                console.log(data);
                if(data.result){
                    popup_sel_wrkctr_wrkr.success_msg(data.msg);
                }else{
                    common.mes_alert(data);
                }
            }
        });
    }

    static checkboxStatus(checkboxName, formSelector = ''){
        let result = [];
        $(`${formSelector} input[name=${checkboxName}]`).each(function(i){
            // console.log({ [$(this).val()] : $(this).prop("checked")});
            result.push({ [$(this).val()] : $(this).prop("checked")});
        });
        return result;
    }

    static success_msg(data){
        let d = new Date();
        $(".noticeFooter .cont").text(data+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
    }

}
