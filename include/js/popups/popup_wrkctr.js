import {FormHelper} from "/include/js/class/PageManager.js";

export class popup_wrkctr{

    constructor(form_id, contentTag){
        this.form_id = form_id;
        this.contentTag = contentTag;
        this.btns = {};
    }

    searchPage(url = "", target = "", msg = true){
        if(url = "") { console.log(`url is empty`); return false; }
        if(target = "") { console.log(`target is empty`); return false; }
        let param = FormHelper.SerializeForm(this.form_id);
        $.ajax({
            url: url,
            type: "get",
            data: {param: param},
            dataType: "json",
            success: function (data) {
                console.log(data);
                if(this.contentTag == 'label') {
                    this.drawCont(data, `#${this.form_id} ${target}`);
                }else if(this.contentTag == 'table'){
                    this.drawTable(data, `#${this.form_id} ${target}`);
                }
                $(`#${this.form_id} input[name='page']`).val(data.page);
                if (msg) { this.success_msg(data.msg); }
            }
        });
    }

    drawTable(data, target, column_arr = []){
        let html = ``;
        html += '<tr>';
        for (let key in data.data){
            for (let i=0; i<column_arr.length; i++){
                html += `<td>${data.data[key][column_arr[i]]}</td>`;
            }
        }
        html += '</tr>';
        $(`#${this.form_id} ${target}`).html(html);
    }

    // TODO : 정리 필요.
    drawCont(data, target){
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
        $(target).html(html);
    }

    // 확인 버튼 기능
    cfmBtn(url){
        let param = FormHelper.SerializeForm(this.form_id);
        let arr = this.checkboxStatus('wrkctr_cd');
        param.where.wrkctr_cd = arr;

        $.ajax({
            url: url,
            type: "post",
            data: { param : param },
            dataType: "json",
            success: function (data) {
                console.log(data);
                if(data.result){
                    this.success_msg(data.msg);
                }else{
                    common.mes_alert(data);
                }
            }
        });
    }

    checkboxStatus(checkboxName, formSelector = ''){
        let result = [];
        $(`#${this.form_id} input[name=${checkboxName}]`).each(function(i){
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
