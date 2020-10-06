import {FormHelper, ScriptHelper} from "/include/js/class/PageManager.js";
import {tableManager} from "/include/js/production/status/SiteTerminalManager.js";

$(function(){
    let popup_id = "popup_stop_cd_list";
    let form_id = "popup_stop_cd_list_frm";
    let form_name = "popup_stop_cd_list_frm";

    // 비가동 사유 구분
    let stop_gbn_title_id = 'stop_gbn_title';
    let stop_gbn = $(`#${popup_id} input[name='stop_gbn']`);
    let stop_gbn_page = $(`#${popup_id} input[name='stop_gbn_page']`);
    let stop_gbn_per_page = $(`#${popup_id} input[name='stop_gbn_per_page']`);
    let stop_gbn_total = $(`#${popup_id} input[name='stop_gbn_total']`);
    let search_url = "/ajax/production/status/get/stop_codes";
    $.ajax({
        // url: "/ajax/production/status/get/stop_gbn",
        url: "/ajax/get/code",
        type: "get",
        data: { up_cd : "stop_gbn" },
        dataType: "json",
        success: function (res) {
            $(`#${popup_id} input[name='stop_gbn_total']`).val(res.data.length);
            let html = "";
            let no = 0;
            for (let item of res.data){
                html += `<div class="btn" data-stop-gbn="${item.cd}" data-no="${no++}">${item.cd_nm}</div>`;
            }
            $(`#${popup_id} #stop_gbn_title`).html(html);
            stop_gbn_paging(stop_gbn_page.val(), stop_gbn_per_page.val());
        }
    });
    function stop_gbn_paging(page, per_page){
        let start = (per_page * page) - per_page;
        let end = per_page * page;
        $(`#${popup_id} #stop_gbn_title > div`).each(function(){
            if(start <= this.dataset.no && this.dataset.no < end){
                $(this).css("display", "");
            }else{
                $(this).css("display", "none");
            }
        });
    }
    $(`#${popup_id} .arrowUD`).on('click', 'a', function(){
        if($(this).children().eq(0).hasClass("arrowD")){
            if( (Number(stop_gbn_per_page.val()) * Number(stop_gbn_page.val())) < Number(stop_gbn_total.val()) ) {
                stop_gbn_page.val(Number(stop_gbn_page.val()) + 1);
                stop_gbn_paging(stop_gbn_page.val(), stop_gbn_per_page.val());
            }
        }else{
            if(stop_gbn_page.val() > 1) {
                stop_gbn_page.val(Number(stop_gbn_page.val()) - 1);
                stop_gbn_paging(stop_gbn_page.val(), stop_gbn_per_page.val());
            }
        }
    });
    // 비가동사유 타이틀 페이징 기능 끝

    // 비가동사유 구분 클릭기능
    $(`#${popup_id} #${stop_gbn_title_id}`).on('click', 'div', function(){
        $(this).parent().children().each(function(){
            $(this).removeClass('on');
        });
        $(this).addClass('on');
        $(`#${popup_id} input[name='stop_gbn']`).val(this.dataset.stopGbn);

        if(document[form_name].page == '') document[form_name].page = 1;
        //리스트 뿌리기
        popup_stop_cd_list.searchPage(search_url);
    });

    let callbackFnc = {
        pre : function(){
            console.log("pre callbackFnc");
        },
        post : function(data){
            console.log("post callbackFnc res : ", data);
        }
    }

    let trOnClickTypeInputHiddenCallback = {
        post : function(obj) {
            document.popup_wrkctr_input_material_frm.lotno.value = obj.dataset.key;
            document.popup_wrkctr_input_material_frm.loc_cd.value = obj.children[7].textContent;

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



    $(`#${form_id} .opBtn`).on("click", function(){

        if (this.dataset.name == "init") {
            // console.log("this");
            // $(`#${form_id} input[name='page']`).val("1");
            // popup_sel_wrkctr_wrkr.searchPage(url, callbackFnc);
            let search_type = $(`#${form_id} input[name='search_type']`).val();
            if (search_type == '') {search_type = 'lot';}
            $(`#${form_id} input[name='arrow_type']`).val("");

            draw_tbl(search_type);

        } else if (this.dataset.name == "cfm") {
            let param = FormHelper.SerializeForm(form_id);
            param.stop_cd = $(`#${popup_id} input:radio[name='stop_cd']:checked`).val();
            if(param.stop_cd == ""){return false;}
            $.ajax({
                url: "/ajax/production/status/save/stop_reason_auto",
                type: "post",
                data: {param:param},
                dataType: "json",
                success: function(res){
                    // console.log('res : ', res);
                    if(res.result){
                        // 비가동 사유목록 refresh, 팝업 종료
                        $(`#stop_reason_auto_search_btn`).click();
                        $(`#${popup_id}`).css("display", "none");
                        wrkctr_common.set_action_btn();
                    }else{
                        // error
                        common.mes_alert({msg:res.msg});
                    }
                }
            })

            // console.log('stop_cd', stop_cd);

            // document.tabletMain.stop_cd.value = stop_cd;
            // $(`#${order_result_form_name} .stop_qty`).text(stop_qty).val(stop_qty);
            // todo : 완료 후 주석 풀어야 함.
            // $(`#${popup_id}`).css("display", "none");

        } else if (this.dataset.name == "cls") {
            $(`#${popup_id}`).css("display", "none");
            $(`#popup_stop_cd_list .btn`).each(function(){
                if($(this).hasClass("on")){
                    $(this).removeClass("on");
                }
            });
            $(`#${popup_id} .btnCont`).html("");
        }
    });



    $(`#${form_id} .arrow`).on("click", function(){
        $(`#${form_id} input[name='arrow_type']`).val(this.dataset.arrow);
        // let url = getUrl();
        // console.log('thisform', this.form);
        popup_stop_cd_list.searchPage(search_url);
    });

    $(`#${form_id} .btnCont`).on("click", "label", function(){
        $(this).parent().children().each(function(){
            $(this).removeClass('on');
        });
        $(this).addClass('on');
    });
});


// class popup_wrkctr_stop_reason{
class popup_stop_cd_list{

    static searchPage(url, callback = { pre: null, post: null}, msg = true){
        if(callback.pre != null) callback.pre();
        let param = FormHelper.SerializeForm("popup_stop_cd_list_frm");
        $.ajax({
            url: url,
            type: "get",
            data: {param: param},
            dataType: "json",
            success: function (data) {
                let frm_id = 'popup_stop_cd_list_frm';
                console.log('searchPage', data);
                popup_stop_cd_list.drawCont(data, `#${frm_id} .btnCont`);
                $(`#${frm_id} input[name='page']`).val(data.page);
                if (msg) { popup_stop_cd_list.success_msg(data.msg); }
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
            html += `<label class="${insert_class_name}"><input type="radio" name="stop_cd" value="${data.data[key].stop_cd}" autocomplete="off" style="display:none;"><p>${data.data[key].stop_nm}</p></label>`;
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
