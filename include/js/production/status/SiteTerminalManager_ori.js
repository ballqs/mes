export class tableManager{
    constructor(table_selector){
        this.table_selector = table_selector;
        this.hidden_cols = [];
        this.no_data_msg = "NO DATA";
    }
    checkbox_name = '';
    checkbox_column_no = 0;
    checkbox_info = {};
    selected_rows = [];
    records = [];
    set_hidden_cols(hidden_col_names_arr){
        if(hidden_col_names_arr){
            this.hidden_cols = hidden_col_names_arr;
        }
    }
    set_no_data_msg(msg){
        this.no_data_msg = msg;
    }
    set_checkbox(checkbox_name, checkbox_column_no){
        this.checkbox_name = checkbox_name;
        this.checkbox_column_no = checkbox_column_no;
    }
    add_checkbox(checkbox_name, checkbox_column_no, checkbox_value = '', checkbox_key = ''){

        // this.checkbox_info[checkbox_column_no] = checkbox_name;
        this.checkbox_info[checkbox_column_no] = {}
        this.checkbox_info[checkbox_column_no].name = checkbox_name;
        this.checkbox_info[checkbox_column_no].value = checkbox_value;
        this.checkbox_info[checkbox_column_no].key = checkbox_key;
    }
    draw_tbody(url, param, column_arr, key_column = column_arr[0], callbackFnc = {}){
        let table_selector = this.table_selector;
        let hidden_cols = this.hidden_cols;
        let no_data_msg = this.no_data_msg;
        let checkbox_info = this.checkbox_info;
        let records = this.records;

        $.ajax({
            url: url,
            type: "get",
            data: param,
            dataType: "json",
            success: function(res){
                // console.log(res);
                let html = '';
                let hidden = '';
                records = res.data;
                if (res.cnt != 0) {
                    for (let item of res.data) {
                        html += `<tr data-key="${item[key_column]}">`;
                        for (let i = 0; i < column_arr.length; i++) {
                            // if (this.checkbox_name != '') { html += `<td><input type="checkbox" name="${this.checkbox_name}[]"></td>`; }
                            // for(let key in checkbox_info){
                            //     if(checkbox_info[key] == i){
                            //         html += `<td><input type="checkbox" name="${this.checkbox_name}[]"></td>`;
                            //     }
                            // }
                            if (checkbox_info.hasOwnProperty(i)) {
                                let chkbox_val = checkbox_info[i].value == '' ? item[key_column] : item[checkbox_info[i].value];
                                let chkbox_key = checkbox_info[i].key == '' ? '' : item[checkbox_info[i].key];

                                html += `<td><input type="checkbox" name="${checkbox_info[i].name}[${chkbox_key}]" value="${chkbox_val}"></td>`;
                                // html += `<td><input type="checkbox" name="${checkbox_info[i].name}[${item[key_column]}]" value="${item[key_column]}"></td>`;
                            }
                            if (column_arr[i] != '') {
                                if (hidden_cols.indexOf(column_arr[i]) != -1) hidden = ` style="display:none;" `;
                                else hidden = "";
                                html += `<td ${hidden}>${item[column_arr[i]]}</td>`;
                            } else html += `<td></td>`;
                        }
                        html += `</tr>`;
                    }
                }else{
                    let col_span_length = column_arr.length - hidden_cols.length;
                    html += `<tr><td colspan="${col_span_length}" style="text-align: center;">${no_data_msg}</td></tr>`
                }
                $(`${table_selector} > tbody`).html(html);
                if (callbackFnc.post !== undefined) {
                    callbackFnc.post(res);
                }
            },
            error : function(a,b,c){
                // console.log(a.responseText);
            }
        });
    }
    trOnClickTypeInputHidden(target_input_selector, class_name = 'Ton', callback){
        $(`${this.table_selector} > tbody`).on("click", "tr", function(){
            if(callback.pre !== undefined) callback.pre();
            if(this.dataset.key !== undefined) {
                $(`${target_input_selector}`).val(this.dataset.key);
                $(this).siblings().removeClass(class_name);
                $(this).addClass(class_name);
            }
            if(callback.post !== undefined) callback.post(this);
        });
    }
    trOnClickTypeCheckbox(class_name = 'on', callback){
        $(`${this.table_selector} > tbody`).on("click", "tr", function(){
            console.log(this);
            // if(callback.pre !== undefined) callback.pre();
            // if(this.dataset.key !== undefined) {
            //     $(`${target_input_selector}`).val(this.dataset.key);
            //     $(this).siblings().removeClass(class_name);
            //     $(this).addClass(class_name);
            // }
            // if(callback.post !== undefined) callback.post(this);
        });
    }
    registerSelectTypeCheckbox(checkbox_name){

    }
    onChangeSelectTypeCheckbox(){
        $(`${this.table_selector} > tbody`).on("change", "tr", function(){

        });
    }
}