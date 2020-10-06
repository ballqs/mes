import {FormHelper, ScriptHelper} from "/include/js/class/PageManager.js";

$(function(){

    common.code({up_cd:"fact_cd"}).then((res)=>{
        common.draw_select("popup_sel_wrkctr_frm", "fact_cd", res.data, 'cd', 'cd_nm');
    });

    function getUrl(){
        let url = '';
        if ($("#popup_sel_wrkctr_frm input[name='search_type']").val() == 'sel') {url = '/ajax/production/status/get/wrkctrsel';}
        else if ($("#popup_sel_wrkctr_frm input[name='search_type']").val() == 'all') {url = '/ajax/production/status/get/wrkctr';}
        return url;
    }

    $("#popup_sel_wrkctr_frm .wrkctrBtn").on("click", function(){
        if(this.dataset.name == 'sel' || this.dataset.name == 'all') {
            $("#popup_sel_wrkctr_frm input[name='search_type']").val(this.dataset.name);
        }
        $("#popup_sel_wrkctr_frm input[name='arrow_type']").val("");    // 페이지 증감에 관여하지 않아야 하기때문에 초기화.

        let url = getUrl();
        // 작업장선택 -> 선택 및 전체 버튼
        if (this.dataset.name == "sel" || this.dataset.name == 'all') {
            $("#popup_sel_wrkctr_frm input[name='page']").val("1");
            popup_sel_wrkctr.searchPage(url);
        } else if (this.dataset.name == "cfm") { // 작업장선택 -> 확인 버튼
            popup_sel_wrkctr.cfmBtn();
        } else if (this.dataset.name == "cls") { // 작업장선택 -> 닫기 버튼
            $("#popup_sel_wrkctr").css("display", "none");
            $("#popup_sel_wrkctr .btnCont").html("");
        }
    });

    $("#popup_sel_wrkctr_frm .arrow").on("click", function(){
        $("#popup_sel_wrkctr_frm input[name='arrow_type']").val(this.dataset.arrow);
        let url = getUrl();
        // console.log('thisform', this.form);
        popup_sel_wrkctr.searchPage(url);
    });

    $("#popup_sel_wrkctr_frm .btnCont").on("click", "label", function(){
        if($(this).children("input").prop("checked")){
            $(this).addClass('on');
        }else{
            $(this).removeClass('on');
        }
        document.getElementById("clicked_wrkctr").value = $(this).children('p').text();
    });
});


class popup_sel_wrkctr{

    static searchPage(url, msg = true){
        let param = FormHelper.SerializeForm("popup_sel_wrkctr_frm");

        $.ajax({
            url: url,
            type: "get",
            // data: {param: param},
            data: {
                param: param,
                cnct_btn: "B0001",
                cnct_url: location.pathname,
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                popup_sel_wrkctr.drawCont(data, "#popup_sel_wrkctr .btnCont");
                $("#popup_sel_wrkctr_frm input[name='page']").val(data.page);
                if (msg) { popup_sel_wrkctr.success_msg(data.msg); }
            }
        });
    }

    static drawCont(data, jquery_selector){
        let html = ``;
        let class_name = 'on';
        let insert_class_name;
        let flag;
        let is_checked;
        for (let key in data.data){
            // console.log(data.data);
            if(data.data[key].wrkctr_cd == data.data[key].sel_wrkctr || data.data[key].sel_wrkctr === undefined){
                flag = true;
                insert_class_name = class_name;
                is_checked = 'checked'
            } else {
                flag = false;
                insert_class_name = '';
                is_checked = '';
            }
            html += `<label class="${insert_class_name}"><input type="checkbox" name="wrkctr_cd" value="${data.data[key].wrkctr_cd}" autocomplete="off" style="display:none;" ${is_checked}><p>${data.data[key].wrkctr_nm}</p></label>`;
        }
        $(jquery_selector).html(html);
    }

    static cfmBtn(){
        let param = FormHelper.SerializeForm("popup_sel_wrkctr_frm");
        let arr = this.checkboxStatus('wrkctr_cd','#popup_sel_wrkctr_frm');
        param.where.wrkctr_cd = arr;

        $.ajax({
            url: "/ajax/production/status/save/wrkctr",
            type: "post",
            data: {
                param: param,
                cnct_btn: "B0005",
                cnct_url: location.pathname,
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                if(data.result){
                    popup_sel_wrkctr.success_msg(data.msg);
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
