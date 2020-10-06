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
    style = [];
    classes_arr = [];
    per_page = 7;
    active_class = "Ton";
    set_hidden_cols(hidden_col_names_arr){
        if(hidden_col_names_arr){
            this.hidden_cols = hidden_col_names_arr;
        }
    }
    set_active_class(active_class){
        this.active_class = active_class;
    }
    set_no_data_msg(msg){
        this.no_data_msg = msg;
    }
    set_checkbox(checkbox_name, checkbox_column_no){
        this.checkbox_name = checkbox_name;
        this.checkbox_column_no = checkbox_column_no;
    }
    set_style(style_arr){
        this.style = style_arr;
    }
    set_class(classes_arr){
        this.classes_arr = classes_arr;
    }
    set_per_page(per_page){
        this.per_page = per_page;
    }
    add_checkbox(checkbox_name, checkbox_column_no, checkbox_value = '', checkbox_key = ''){

        // this.checkbox_info[checkbox_column_no] = checkbox_name;
        this.checkbox_info[checkbox_column_no] = {}
        this.checkbox_info[checkbox_column_no].name = checkbox_name;
        this.checkbox_info[checkbox_column_no].value = checkbox_value;
        this.checkbox_info[checkbox_column_no].key = checkbox_key;
    }
    draw_tbody(url, param, column_arr, key_column = column_arr[0], callbackFnc = {}){
        this.column_arr = column_arr;
        let table_selector = this.table_selector;
        let hidden_cols = this.hidden_cols;
        let no_data_msg = this.no_data_msg;
        let checkbox_info = this.checkbox_info;
        let records = this.records;
        let per_page = this.per_page;
        let classes_arr = this.classes_arr;
        let classes = '';
        $.ajax({
            url: url,
            type: "get",
            data: param,
            dataType: "json",
            success: function(res){
                // console.log(res);
                let html = '';
                let hidden = '';
                let cnt = 0;
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
                                // console.log('classes', classes_arr);
                                classes = classes_arr[i] === undefined ? '' : classes_arr[i];
                                html += `<td class="${classes}" data-key="${column_arr[i]}" data-value="${item[column_arr[i]]}" ${hidden}>${item[column_arr[i]]}</td>`;
                            } else html += `<td></td>`;
                        }
                        html += `</tr>`;
                        cnt++;
                    }
                    while(cnt <= per_page){
                        html += `<tr colspan="${column_arr.length}"></tr>`;
                        cnt++;
                    }
                }else{
                    let col_span_length = column_arr.length - hidden_cols.length;
                    html += `<tr><td colspan="${col_span_length}" style="text-align: center;">${no_data_msg}</td></tr>`
                }
                $(`${table_selector} > tbody`).html(html);
                $(`${table_selector}`).parent().css('display', '');
                $(`${table_selector}`).parent().addClass('active');
                if (callbackFnc.post !== undefined) {
                    callbackFnc.post(res);
                }
            },
            error : function(a,b,c){
                // console.log(a.responseText);
            }
        });
    }
    draw_tbody_with_data(data, column_arr, key_column = column_arr[0], callbackFnc = {}){
        let table_selector = this.table_selector;
        let hidden_cols = this.hidden_cols;
        let no_data_msg = this.no_data_msg;
        let checkbox_info = this.checkbox_info;

        let html = '';
        let hidden = '';
        if (data.cnt != 0) {
            for (let item of data.data) {
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
            callbackFnc.post(data);
        }
    }
    trOnClickTypeInputHidden(target_input_selector, class_name = this.active_class, callback){
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
    trOnClickTypeCheckbox(class_name = this.active_class, callback){
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
    getSelectedRow(){
        let data = {};
        let active_class = this.active_class;
        $(`${this.table_selector} > tbody > tr`).each(function(){
            if($(this).hasClass(active_class)){
                $(this).children().each(function(){
                    data[this.dataset.key] = this.dataset.value;
                });
            }
        });
        return data;
    }
}