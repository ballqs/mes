import {FormHelper, ScriptHelper} from "/include/js/class/PageManager.js";
import {tableManager} from "/include/js/production/status/SiteTerminalManager.js";

$(function(){
    let popup_id = "popup_bom_status";
    let form_id = "popup_bom_status_frm";
    let form_name = "popup_bom_status_frm";
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
            document[form_name].lotno.value = obj.dataset.key;
            document[form_name].loc_cd.value = obj.children[7].textContent;
        }
    }

    let param = FormHelper.SerializeForm(form_id);
    let get_url = "/ajax/production/status/get/bom_status";
    let table_arr_bom = ['sprt_nbr', 'prt_nbr_nm'];

    let table_bom = new tableManager("#table_bom_status");

    let draw_tbl = function(){
        $(`#${form_id} input[name='page']`).val("1");
        param = FormHelper.SerializeForm(form_id);
        table_bom.draw_tbody(get_url, {param : param}, table_arr_bom);
    }

    $(`#${form_id} .opBtn`).on("click", function(){
        if (this.dataset.name == "search") {
            let param = FormHelper.SerializeForm(form_id);
            table_bom.draw_tbody(get_url, {param:param, cnct_url: location.pathname, cnct_btn: "B0001"}, table_arr_bom);
        } else if (this.dataset.name == "cls") {
            $(`#${popup_id}`).css("display", "none");
            $(`#${popup_id} #table_bom_status > tbody`).html("");
            document.tabletMain.set_interval_flag.value = 'T';
        }
    });

    $(`#${form_id} .arrow`).on("click", function(){
        $(`#${form_id} input[name='arrow_type']`).val(this.dataset.arrow);
        let param = FormHelper.SerializeForm(form_id);
        table_bom.draw_tbody(get_url, {param:param}, table_arr_bom);
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