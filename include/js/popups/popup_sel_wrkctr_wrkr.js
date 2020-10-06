import {FormHelper, ScriptHelper} from "/include/js/class/PageManager.js";

$(function(){

    let form_id = "popup_sel_wrkctr_wrkr_frm";
    let form_name = "popup_sel_wrkctr_wrkr_frm";
    let checkboxName = "wrkr_cd";
    let callbackFnc = {
        pre : function(){
            console.log("pre");
        },
        post : function(data){
            console.log(data);
            $("#popup_sel_wrkctr_wrkr_frm input[name='wrkctr_wrkr_cnt']").val(data.wrkctr_wrkr_cnt);
            $("#popup_sel_wrkctr_wrkr_frm input[name='sel_main_wrkr']").val(data.main_wrkr_info.sel_wrkr_cd);
            $("#popup_sel_wrkctr_wrkr_frm input[name='main_wrkr']").val(data.main_wrkr_info.wrkr_cd);

            $("#popup_sel_wrkctr_wrkr_frm .tabCont").css("display", "")
        }
    }

    $("#popup_sel_wrkctr_wrkr_frm .opBtn").on("click", function(){
        $("#popup_sel_wrkctr_wrkr_frm input[name='search_type']").val(this.dataset.name);
        $("#popup_sel_wrkctr_wrkr_frm input[name='arrow_type']").val("");    // 페이지 증감에 관여하지 않아야 하기때문에 초기화.

        let url = '/ajax/production/status/get/wrkctr_wrkr';

        if (this.dataset.name == "sel" || this.dataset.name == 'all') {
            $("#popup_sel_wrkctr_wrkr_frm input[name='page']").val("1");
            popup_sel_wrkctr_wrkr.searchPage(url, callbackFnc);
        } else if (this.dataset.name == "cfm") {
            // 2020-09-25 주작업자를 복수 설정할 수 있지만 현장단말에서는 한명만 선택할 수 있게 해야한다.
            // 주작업자가 몇명이 선택되었는지 카운트 하여 1명만 선택했을 경우 저장한다.
            let cnt = 0;
            $(`#popup_sel_wrkctr_wrkr input:checkbox[name='wrkr_cd']:checked`).each(function(){
                console.log(this.dataset.main);
                if (this.dataset.main == '*'){
                    cnt++;
                }
            });

            if (cnt != 1) {
                common.mes_alert({msg : '주작업자는 한명을 선택하여야 합니다.'});
            }else{
                popup_sel_wrkctr_wrkr.cfmBtn(form_id, 'wrkr_cd', "/ajax/production/status/save/wrkctr_wrkr");
            }
            /*
            // 1. 주작업자가 포함되어있는지 여부 확인
            //      현재 DB에 주작업자가 포함되어있다면
            //      $("#popup_sel_wrkctr_wrkr_frm input[name='sel_main_wrkr']").val() 에 주작업자 아이디가 들어있다.
            // 1-1. 주작업자의 아이디가 들어있지 않을 경우 현재 체크박스 중 주작업자의 아이디가 없으면 경고
            // 1-2. 주작업자의 아이디가 체크해제되어있다면 경고
            // 2. 주작업자가 포함되어있으면 실행

            let flag = false;
            // 1-1 주작업자 아이디가 들어있지 않을 경우 현재 체크박스 중 주작업자의 아이디가 없으면 경고
            let main_wrkr = $("#popup_sel_wrkctr_wrkr_frm input[name='main_wrkr']").val();
            if($(`#popup_sel_wrkctr_wrkr_frm input[name='sel_main_wrkr']`).val() == ''){
                $(`#popup_sel_wrkctr_wrkr_frm input[name=${checkboxName}]`).each(function(i){
                    if(this.value == main_wrkr) flag = true;
                });
            }
            // 1-2. 주작업자의 아이디가 체크해제되어있다면 경고
            $(`#popup_sel_wrkctr_wrkr_frm input[name=${checkboxName}]`).each(function(i){
                if(this.value == main_wrkr) flag = this.checked;
            });

            // 2. 실행
            if(flag){
                popup_sel_wrkctr_wrkr.cfmBtn(form_id, 'wrkr_cd', "/ajax/production/status/save/wrkctr_wrkr");

            }else{
                common.mes_alert({msg : '주작업자가 선택되어있지 않습니다.'});
            }
            */
        } else if (this.dataset.name == "cls") {
            $("#popup_sel_wrkctr_wrkr").css("display", "none");
            document.tabletMain.set_interval_flag.value = 'T';
            $(`#wrkctrlist_tbl > tbody > tr`).each(function(){
                if($(this).hasClass("Ton")){
                    $(this).click();
                }
            });
        }
    });

    $("#popup_sel_wrkctr_wrkr_frm .arrow").on("click", function(){
        $("#popup_sel_wrkctr_wrkr_frm input[name='arrow_type']").val(this.dataset.arrow);
        let url = '/ajax/production/status/get/wrkctr_wrkr';
        popup_sel_wrkctr_wrkr.searchPage(url);
    });

    $("#popup_sel_wrkctr_wrkr_frm .btnCont").on("click", "label", function(){
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

    static drawCont(data, jquery_selector, callbackFnc = {}){
        if (callbackFnc != {}) {
            if(callbackFnc.pre != undefined){
                callbackFnc.pre();
            }
        }
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
            html += `<label class="${insert_class_name}"><input type="checkbox" name="wrkr_cd" value="${data.data[key].wrkr_cd}" data-main="${is_main_wrkr}" autocomplete="off" style="display:none;" ${is_checked}><p>${is_main_wrkr}${data.data[key].emp_nm}${is_main_wrkr}</p></label>`;
            if (callbackFnc != {}) {
                if(callbackFnc.post != undefined){
                    callbackFnc.post(data);
                }
            }
        }
        $(jquery_selector).html(html);
    }

    static cfmBtn(form_id = '', checkboxName = '', url = ''){
        let param = FormHelper.SerializeForm(form_id);
        let arr = this.checkboxStatus(checkboxName,'#popup_sel_wrkctr_wrkr_frm');
        param.where.wrkr_cd = arr;

        $.ajax({
            url: url,
            type: "post",
            data: {
                param: param,
                cnct_btn: "B0011",
                cnct_url: location.pathname,
            },
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
        // $(`${formSelector} input[name=${checkboxName}]`).each(function(i){
        $(`${formSelector} input:checkbox[name=${checkboxName}]`).each(function(i){
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
