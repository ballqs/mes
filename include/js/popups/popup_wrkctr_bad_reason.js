import {FormHelper, ScriptHelper} from "/include/js/class/PageManager.js";
import {tableManager} from "/include/js/production/status/SiteTerminalManager.js";

$(function(){
    let popup_id = "popup_wrkctr_bad_reason";
    let form_id = "popup_wrkctr_bad_reason_frm";
    let form_name = "popup_wrkctr_bad_reason_frm";

    // 불량 구분
    let err_gbn_title_id = 'err_gbn_title';
    let err_gbn = $(`#${popup_id} input[name='err_gbn']`);
    //"#popup_wrkctr_bad_reason input[name='err_gbn']"
    let err_gbn_page = $(`#${popup_id} input[name='err_gbn_page']`);
    //"#popup_wrkctr_bad_reason input[name='err_gbn_page']"
    let err_gbn_per_page = $(`#${popup_id} input[name='err_gbn_per_page']`);
    //"#popup_wrkctr_bad_reason input[name='err_gbn_per_page']"
    let err_gbn_total = $(`#${popup_id} input[name='err_gbn_total']`);
    //"#popup_wrkctr_bad_reason input[name='err_gbn_total']"
    let search_url = "/ajax/production/status/get/err_codes";
    $.ajax({
        url: "/ajax/get/code",
        type: "get",
        data: { up_cd : "err_gbn" },
        dataType: "json",
        success: function (res) {
            $(`#${popup_id} input[name='err_gbn_total']`).val(res.data.length);
            let html = "";
            let no = 0;
            for (let item of res.data){
                html += `<div class="btn" data-err-gbn="${item.cd}" data-no="${no++}">${item.cd_nm}</div>`;
            }
            $(`#err_gbn_title`).html(html);
            err_gbn_paging(err_gbn_page.val(), err_gbn_per_page.val());
        }
    });
    function err_gbn_paging(page, per_page){
        let start = (per_page * page) - per_page;
        let end = per_page * page;
        $(`#err_gbn_title > div`).each(function(){
            if(start <= this.dataset.no && this.dataset.no < end){
                $(this).css("display", "");
            }else{
                $(this).css("display", "none");
            }
        });
    }
    $(`#${popup_id} .arrowUD`).on('click', 'a', function(){
        if($(this).children().eq(0).hasClass("arrowD")){
            if( (Number(err_gbn_per_page.val()) * Number(err_gbn_page.val())) < Number(err_gbn_total.val()) ) {
                err_gbn_page.val(Number(err_gbn_page.val()) + 1);
                err_gbn_paging(err_gbn_page.val(), err_gbn_per_page.val());
            }
        }else{

            if(err_gbn_page.val() > 1) {
                err_gbn_page.val(Number(err_gbn_page.val()) - 1);
                err_gbn_paging(err_gbn_page.val(), err_gbn_per_page.val());
            }
        }
    });
    // 불량 구분 타이틀 페이징 기능 끝

    // 불량 구분 클릭기능
    $(`#${err_gbn_title_id}`).on('click', 'div', function(){
        $(this).parent().children().each(function(){
            $(this).removeClass('on');
        });
        $(this).addClass('on');
        $(`#${popup_id} input[name='err_gbn']`).val(this.dataset.errGbn);

        if(document.popup_wrkctr_bad_reason_frm.page == '') document.popup_wrkctr_bad_reason_frm.page = 1;
        //리스트 뿌리기
        popup_wrkctr_bad_reason.searchPage(search_url);

    });

    $(`#${form_id} .opBtn`).on("click", function(){

        if (this.dataset.name == "init") {
            // console.log("this");
            // $(`#${form_id} input[name='page']`).val("1");
            // popup_sel_wrkctr_wrkr.searchPage(url, callbackFnc);
            let search_type = $(`#${form_id} input[name='search_type']`).val();
            if (search_type == '') {search_type = 'lot';}
            $(`#${form_id} input[name='arrow_type']`).val("");

            draw_tbl(search_type);

        } else if (this.dataset.name == "cfm") {    // 확인 버튼
            let err_qty = Number(document[form_name].err_qty.value);
            let order_result_form_name = 'popup_wrkctr_orderno_result_frm';
            let order_result_qty = Number(document[order_result_form_name].orderno_result.value);
            let prd_good_qty = Number(document[order_result_form_name].prd_good_qty.value);

            let err_msg = '';
            if(err_qty <= 0 ){
                err_msg = '수량에 0보다 작은 수는 입력 할 수 없습니다.';
            }
            if(document[form_name].err_cd === undefined){
                err_msg = '불량유형을 선택해주세요';
            }else if(document[form_name].err_cd.value === ''){
                err_msg = '불량유형을 선택해주세요';
            }

            if(err_msg != ''){
                common.mes_alert({msg:err_msg});
                return false;
            }
            // 기존 버전.
            // document[order_result_form_name].err_cd.value = document[form_name].err_cd.value;
            //
            // if(err_qty > 0) {
            //     $(`#${order_result_form_name} .err_qty`).text(err_qty).val(err_qty);
            // }else if(err_qty == 0) {
            //     $(`#${order_result_form_name} .err_qty`).text(err_qty).val('');
            // }
            // let target_total = document.popup_wrkctr_orderno_result_frm.orderno_result;
            // let target_bad = document.popup_wrkctr_orderno_result_frm.err_qty;
            // let target_good = document.popup_wrkctr_orderno_result_frm.prd_good_qty;
            // target_total.value = Number(target_good.value) + Number(target_bad.value);
            // 불량 수량, 불량 코드를 넘긴다.
            /*
            PK :
            fact_cd
            wrkctr_cd
            prt_nbr_cd
            err_cd
            wrk_ordr_no
            */
            let param = FormHelper.SerializeForm(form_id);
            $.ajax({
                url: "/ajax/production/status/save/tmp_err",
                type:"post",
                data:{param:param},
                dataType:"json",
                success: function (res) {
                    console.log(res);
                    if(res.result){
                        $(`#${popup_id}`).css("display", "none");
                        init_bad_list();

                        let prod_total = document.popup_wrkctr_orderno_result_frm.orderno_result;
                        let prod_bad_target = document.popup_wrkctr_orderno_result_frm.err_qty;
                        let prod_bad = res.data[0][0].err_sum;
                        let prod_good = document.popup_wrkctr_orderno_result_frm.prd_good_qty;
                        prod_total.value = Number(prod_good.value) + Number(prod_bad);
                        prod_bad_target.value = prod_bad;
                        let d = new Date();
                        $(".noticeFooter .cont").text(res.msg+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
                    }else{
                        common.mes_alert({msg:res.msg});
                    }
                }
            })
        } else if (this.dataset.name == "cls") {    // 닫기 버튼
            $(`#${popup_id}`).css("display", "none");
            init_bad_list();
        }
    });

    $(`#${form_id} .arrow`).on("click", function(){
        $(`#${form_id} input[name='arrow_type']`).val(this.dataset.arrow);
        // let url = getUrl();
        // console.log('thisform', this.form);
        popup_wrkctr_bad_reason.searchPage(search_url);
    });

    $(`#${form_id} .btnCont`).on("click", "label", function(){
        $(this).parent().children().each(function(){
            $(this).removeClass('on');
        });
        $(this).addClass('on');
    });

    function init_bad_list(){
        // 불량 유형 초기화
        $(`#err_gbn_title > div`).each(function(){
            if($(this).hasClass("on")){ $(this).removeClass('on');}
        });
        // 불량 초기화
        $(`#popup_wrkctr_bad_reason_frm .btnCont > label`).each(function(){
            $(this).removeClass("on");
        });
        // radio 초기화.
        $(`#popup_wrkctr_bad_reason_frm input[name='err_cd']`).removeAttr("checked");

        $(`#popup_wrkctr_bad_reason_frm input[name='err_qty']`).val("0");
    }
});


class popup_wrkctr_bad_reason{

    static searchPage(url, callback = { pre: null, post: null}, msg = true){
        if(callback.pre != null) callback.pre();
        let param = FormHelper.SerializeForm("popup_wrkctr_bad_reason_frm");
        $.ajax({
            url: url,
            type: "get",
            data: {param: param},
            dataType: "json",
            success: function (data) {
                let frm_id = 'popup_wrkctr_bad_reason_frm';
                console.log(data);
                popup_wrkctr_bad_reason.drawCont(data, `#${frm_id} .btnCont`);
                $(`#${frm_id} input[name='page']`).val(data.page);
                if (msg) { popup_wrkctr_bad_reason.success_msg(data.msg); }
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
            html += `<label class="${insert_class_name}"><input type="radio" name="err_cd" value="${data.data[key].err_cd}" autocomplete="off" style="display:none;"><p>${data.data[key].err_nm}</p></label>`;
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
        // $(".noticeFooter .cont").text(data+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
    }
}
