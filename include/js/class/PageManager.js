//import PageManager from "./PageManager";

export class Const {
    static HtmlEvent = {
        blur: "blur",
        focus: "focus",
        load: "load",
        resize: "resize",
        scroll: "scroll",
        unload: "unload",
        beforeunload: "beforeunload",
        click: "click",
        dblclick: "dblclick",
        mousedown: "mousedown",
        mouseup: "mouseup",
        mousemove: "mousemove",
        mouseover: "mouseover",
        mouseout: "mouseout",
        mouseenter: "mouseenter",
        mouseleave: "mouseleave",
        change: "change",
        select: "select",
        submit: "submit",
        keydown: "keydown",
        keypress: "keypress",
        keyup: "keyup"
    };
    static AjaxMethod = {
        GET: "get",
        POST: "post"
    };
    static MesMsg = {
        confirm: "진행하시겠습니까?",
    }
    // static MesBtnId = {
    //     Search          : "B0001",
    //     Initialize      : "B0002",
    //     AddRow          : "B0003",
    //     DeleteRow       : "B0004",
    //     Save            : "B0005",
    //     ExcelDownload   : "B0006",
    //     Approval        : "B0007",
    //     Copy            : "B0008",
    //     ExcelUpload     : "B0009"
    // };
    static MesButton = {
        Search          : "hBtnB0001",
        Initialize      : "hBtnB0002",
        AddRow          : "hBtnB0003",
        DeleteRow       : "hBtnB0004",
        Save            : "hBtnB0005",
        ExcelDownload   : "hBtnB0006",
        Approve         : "hBtnB0007",
        ExcelUpload     : "hBtnB0009",
        SavePage        : "SavePage",
        Confirm         : "hBtnB0022",
        Guide           : "hBtnB0034",
    };

    static MaxLenCfg = {
        account_type: 20,
        adjst_gbn: 20,
        adjst_loc_cd: 20,
        adjst_no: 20,
        adjst_unit: 20,
        adjst_whs_cd: 20,
        adr: 100,
        alt_prt_nbr_yn: 1,
        apval_yn: 1,
        apy_ymd: 18,
        base_loc_cd: 20,
        base_unit: 20,
        base_whs_cd: 20,
        base_ym: 7,
        biz_cd: 20,
        biz_gbn: 20,
        biz_item: 50,
        biz_loc_nm: 100,
        biz_nm: 50,
        biz_reg_no: 20,
        biz_type: 50,
        btn_fctn_dtl: 1000,
        btn_id: 20,
        btn_img_path: 1000,
        btn_nm: 50,
        buss_rpst_dtl: 18,
        buy_price: 18,
        cd: 20,
        cd_fctn_dtl: 1000,
        cd_nm: 50,
        cd_set1: 50,
        cd_set2: 50,
        cd_set3: 50,
        claim_reasn_cd: 20,
        claim_unit: 20,
        cmpnt_unit: 20,
        cmpny_cd: 20,
        cntct_nbr: 100,
        colct_aply_yn: 1,
        color_desc: 100,
        crt_gbn: 20,
        data_range: 50,
        day_week: 20,
        daynight_gbn: 1,
        dept_cd: 20,
        dept_nm: 50,
        emp_id: 20,
        err_cd: 20,
        err_gbn: 20,
        err_nm: 50,
        fact_cd: 20,
        fail_inst_yn: 1,
        fault_cd: 20,
        fault_nm: 50,
        fault_type: 20,
        from_fact_cd: 20,
        from_loc_cd: 20,
        from_whs_cd: 20,
        grp_ordr_no: 20,
        hand_phn_num: 50,
        header: 10,
        holiday_yn: 1,
        in_biz_cd: 20,
        in_fact_cd: 20,
        in_hstry_gbn: 20,
        in_loc_cd: 20,
        in_lotno: 20,
        in_prt_nbr_cd: 20,
        in_unit: 20,
        in_whs_cd: 20,
        input_hstry_no: 20,
        inspct_act_gbn: 20,
        inspct_cd: 20,
        inspct_gbn: 20,
        inspct_head_no: 18,
        inspct_nm: 50,
        inspct_no: 20,
        inspct_stdrd_type: 20,
        inspct_type: 20,
        inspct_yn: 1,
        inst_id: 20,
        instal_plc: 100,
        instd_no: 20,
        instd_prt_nbr: 20,
        instd_prt_nbr_cd: 20,
        instd_unit: 20,
        judg_value: 10,
        lang_gbn: 20,
        limit_day: 10,
        line_cd: 20,
        lnk_gbn: 20,
        lnk_no: 20,
        lnk_wrk_ctr_cd: 20,
        loc_cd: 20,
        loc_in: 20,
        loc_nm: 20,
        loc_out: 20,
        lot_mgt_yn: 1,
        lot_staus_cd: 20,
        lot_unit: 20,
        lotno: 20,
        ma_wrkr1: 20,
        ma_wrkr2: 20,
        mach_cd: 20,
        mach_nm: 50,
        mach_staus_cd: 20,
        mach_tech_wrkr: 20,
        mach_type: 20,
        mach_type1: 20,
        mach_type2: 20,
        mail_addrs: 100,
        main_wrkr:20,
        main_wrkr_yn: 1,
        make_cmpny: 100,
        ym : 7,
        y2md : 8,
        wrkr_cd : 20,
        wrkr : 20,
        wrkctr_nm : 50,
        wrkctr_cd : 20,
        wrk_ordr_type : 20,
        wrk_ordr_status : 20,
        wrk_ordr_no : 20,
        wrk_lotno : 20,
        wrk_gbn : 20,
        whs_nm : 50,
        whs_cd : 20,
        week_ordr : 20,
        use_mold_cd : 20,
        updt_id : 20,
        up_pgm_id : 20,
        up_dept_cd : 20,
        up_cd : 20,
        unit_width : 20,
        unit_weight : 20,
        unit_thick : 20,
        unit_length : 20,
        unit_color : 20,
        trans_unit : 20,
        tot_juge_value : 10,
        to_whs_cd : 20,
        to_loc_cd : 20,
        supply_type : 20,
        stop_nm : 50,
        stop_gbn : 20,
        stop_cd : 20,
        stck_whs_cd : 20,
        stck_unit : 2,
        stck_loc_cd : 20,
        staus : 1,
        src_unit : 50,
        src_prt_nbr_cd : 20,
        sql_state : 5,
        spec : 50,
        spart_nbr : 20,
        ship_prt_nbr : 30,
        ship_no : 20,
        ship_nm : 50,
        ship_detail_no : 18,
        ship_cd : 20,
        ship_biz_cd : 20,
        shift_gbn : 20,
        serial_no : 30,
        sagub_type : 20,
        role_nm : 50,
        role_id : 20,
        role_dtl : 1000,
        reprst_nm : 10,
        remark : 1000,
        ref_no : 20,
        pwd : 20,
        prt_nbr_nm : 20,
        prt_nbr_grp_cd : 20,
        prt_nbr_dsp_nm : 50,
        prt_nbr_cd : 50,
        proc_name : 100,
        pre_staus : 1,
        prd_unit : 20,
        prc_gbn : 20,
        po_unit : 20,
        po_staus_cd : 20,
        po_prt_nbr : 30,
        po_no : 20,
        po_in_unit : 20,
        po_in_no : 20,
        po_in_gbn : 20,
        po_drct_biz_cd : 20,
        po_biz_cd : 20,
        pln_unit : 20,
        pln_ordr_no : 20,
        pln_gbn : 20,
        pgm_nm : 50,
        pgm_img_path : 1000,
        pgm_id : 20,
        pgm_gbn : 1,
        parking_unit : 20,
        outsorcng_cmpy : 20,
        output_no : 20,
        output_hstry_no : 20,
        out_whs_cd : 20,
        out_unit : 20,
        out_prt_nbr_cd: 20,
        out_lotno : 20,
        out_loc_cd : 20,
        out_hstry_gbn : 20,
        out_gbn : 20,
        prd_ordr_unit : 20,
        ordr_unit : 20,
        ordr_staus_cd : 20,
        ordr_prt_nbr_no : 20,
        ordr_no : 20,
        op_nm : 50,
        op_cd : 20,
        offc_phn_num : 50,
        mprt_nbr_cd : 20,
        mprt_nbr : 20,
        move_unit : 20,
        move_no : 20,
        moniter_nm : 50,
        model_nm : 50,
        measure_type : 20
    };
    static MaxTextLen = 1000;
    // static SelectedGridID = "selected_grid";
    static get SelectedGridID() {
        return $("#selected_grid").val();
    }
    static set SelectedGridID(value) {
        $("#selected_grid").val(value);
        if(value.substr(0,3) != "pop"){
            $(".grids").parent().removeClass("gridSelect");
            $("#"+value).parent().addClass("gridSelect");
        }
    }
    static FieldColor = {
        PK : "#ffe9e9",
        Compulsory : "#e6f0ff",
        ReadOnly : "#f5f5f5"
    };
    static config = {
        gridsClass : "grids",
        cmpny_cd : "hs",
        cmpny_cd_nm : "HS정밀01",
        rowOnClickConfig: {
            funcType : "funcType",
            clickTargetGrid : "clickTargetGrid",
            clickWhereFieldList : "clickWhereFieldList",
            url : "url",
            funcOption : {
                detail : "detail",
                throw : "throw",
                multiple : "multiple",
                detail_tree : "detail_tree",
            },
            detailTreeRootColumnValue : "root",
            detailTreeParentColumn : "parent",
            detailTreeChildrenColumn : "children",
        },
        customConfig:{
            maxAddRow : "maxAddRow",
            maxAddRowWarningMsg1 : "현재 선택된 그리드에는 ",
            maxAddRowWarningMsg2 : "줄 까지 추가할 수 있습니다.",
            maxAddRowWarningMsg3 : "열을 추가할 수 없습니다.",
        },
        addFunc:{
            pre: "pre",
            post: "post",
        }
    }
}

export class ScriptHelper{
    static CloneObject(obj) {
        let clone = {};
        for (let i in obj)
        {
            if (typeof (obj[i]) == "object" && obj[i] != null)
            {
                clone[i] = this.CloneObject(obj[i]);
            }
            else
            {
                clone[i] = obj[i];
            }
        }
        return clone;
    }
    static AjaxCall(rest_url, ajax_method, ajax_args, return_data_type = "json"){
        return $.ajax({
            url: rest_url,
            type: ajax_method,
            data: ajax_args,
            dataType: return_data_type
        });
    }
    static OnAjaxFail = (result, status, status_msg)=>{
        $(".loadingW").css("display", "none");
        let err_obj = {
            msg: status_msg,
            error: result.error()
        };
        common.mes_alert(err_obj);
    };
    static AjaxArgumentBuild(param_arr, btn_id, exec_url) {
        let btn_id_db =  ScriptHelper.GetDBButtonID(btn_id);
        let obj = {
            param: param_arr,
            cnct_btn: btn_id_db,
            cnct_url: exec_url,
        };
        return obj;
    }
    static BuildSelectBoxData (arr_obj, value_field, text_field) {
        for (let item of arr_obj) {
            item.id = item[value_field];
            item.value = item[value_field];
            item.text = item[text_field];
        }
        return arr_obj;
    };
    static GetDBButtonID(button_id){
        let start_idx = 4;
        return button_id.substring(start_idx);
    }
    static LoadScript(html_location, script_path) {
        let th = document.getElementsByTagName(html_location)[0];
        let s = document.createElement('script');
        s.setAttribute('type','text/javascript');
        s.setAttribute('src',script_path, html_location);
        th.appendChild(s);
    }
}

export class FormHelper {
    static SerializeForm( frm_id, boolean_convert_obj){
        //input type = text, check, radio
        let arr_input = $(`#${frm_id} input`);
        //select
        let arr_select = $(`form[id='${frm_id}'] select`);

        let param = {
            where: {
                // //cd_nm : '02',
                // dept_cd : 'dept03'
            },
            //like 옵션 : before, after, both
            like: {
                // //up_cd : ['dept_cd', 'before'],
                // dept_cd : ['dept01', 'both'],
            },
            order_by: "",//'dept_cd asc', //검색조건은 사용안한다.
            limit: [] //[1,2]  //콤보박스에 특정값을 정해줘야 하는뎅...
        };

        //for input text radio, check, date
        for (let idx = 0; idx < arr_input.length; idx++)
        {
            if (arr_input[idx].type === 'text')
            {
                if (arr_input[idx].value !== "" && arr_input[idx].name != "" && !$(arr_input[idx]).prop("disabled"))
                {
                    param.like[arr_input[idx].name] = [];
                    param.like[arr_input[idx].name].push(arr_input[idx].value);
                    param.like[arr_input[idx].name].push('both');
                }
            }if (arr_input[idx].type === 'hidden')
            {
                if (arr_input[idx].value !== "" && arr_input[idx].name != "" && !$(arr_input[idx]).prop("disabled"))
                {
                    // param.like[arr_input[idx].name] = [];
                    // param.like[arr_input[idx].name].push(arr_input[idx].value);
                    // param.like[arr_input[idx].name].push('both');

                    param.where[arr_input[idx].name] = arr_input[idx].value;

                }
            }else if(arr_input[idx].type === 'date'){
                if (arr_input[idx].value !== "" && arr_input[idx].name != "" && !$(arr_input[idx]).prop("disabled"))
                {
                    param.where[arr_input[idx].name] = arr_input[idx].value;
                    // param.where[arr_input[idx].name].push(arr_input[idx].value);
                }
            }else if(arr_input[idx].type === 'radio'){
                if (arr_input[idx].value !== "" && arr_input[idx].name != "" && !$(arr_input[idx]).prop("disabled") && $(arr_input[idx]).prop("checked") === true)
                {
                    param.where[arr_input[idx].name] = arr_input[idx].value;
                    // param.where[arr_input[idx].name].push(arr_input[idx].value);
                }
            }else if(arr_input[idx].type === 'checkbox'){
                if (arr_input[idx].value !== "" && arr_input[idx].name != "" && !$(arr_input[idx]).prop("disabled") && $(arr_input[idx]).prop("checked") === true)
                {
                    if (param.where[arr_input[idx].name] === undefined) { param.where[arr_input[idx].name] = []; }
                    param.where[arr_input[idx].name].push(arr_input[idx].value);
                }
            }else if(arr_input[idx].type === 'month'){
            if (arr_input[idx].value !== "" && arr_input[idx].name != "" && !$(arr_input[idx]).prop("disabled"))
            {
                param.where[arr_input[idx].name] = arr_input[idx].value;
            }
        }
        }
        for (let idx = 0; idx < arr_select.length; idx++)
        {
            if (arr_select[idx].value !== "")
            {
                param.where[arr_select[idx].name] = arr_select[idx].value;
            }
        }
        return param;
    }
    static FillFormSelectBoxWithData(frm_id, html_attr, html_attr_val, arr_obj, value_field, text_field,
                                     default_id, default_text, selected_index = 0) {
        let cmb = $(`#${frm_id} select[${html_attr}="${html_attr_val}"]`);
        cmb.empty();
        if(default_id !== undefined) {
            cmb.append($('<option>', {
                value: default_id,
                text: default_text
            }));
        }

        arr_obj = ScriptHelper.BuildSelectBoxData(arr_obj, value_field, text_field);
        for (let item of arr_obj) {
            cmb.append($('<option>', item));
        }
        if (selected_index < cmb[0].length) {
            cmb.prop('selectedIndex', selected_index);
        }

    }
    static FillFormSelectBoxWithInfoObj(frm_id, info_obj, sel_idx = 0) {
        let itemTag = "select";
        info_obj.ajaxFunc(info_obj.ajaxArgs).then((res) => {
            let arr_obj = res.data;
            let cmb = $(`#${frm_id} ${itemTag}[${info_obj.attr}="${info_obj.attrVal}"]`);
            cmb.empty();
            if (info_obj.defaultId !== undefined) {
                cmb.append($('<option>', {
                    value: info_obj.defaultId,
                    text: info_obj.defaultText
                }));
            }

            arr_obj = ScriptHelper.BuildSelectBoxData(arr_obj, info_obj.valueField, info_obj.textField);
            for (let item of arr_obj) {
                cmb.append($('<option>', item));
            }
//             console.log(cmb[0].length);
            if (sel_idx < cmb[0].length) {
                cmb.prop('selectedIndex', sel_idx);
            }
        });

    }
}

class FormConfig{
    constructor(frm_id) {
        if(frm_id === undefined || frm_id ==="") {
            throw `frm_id can not be undefined or ""!`;
        }
        this.#frm_id = frm_id;
    }
    #frm_id = "";
    SelectInfoList = [];
    PopupInfoList = [];
    // get FormID(){return this.#frm_id;}
    // get SelectInfoList(){return this.#select_list;}
}

export class FormManager{
    FrmList = {};
    AddForm(frm_id) {
        if(this.FrmList[frm_id] === undefined)
        {
            this.FrmList[frm_id] = new FormConfig(frm_id);
        }
    }
    AddSelectBoxInfo(frm_id, select_attr, select_attr_val, ajax_func, ajax_args, value_field, text_field,
                     default_value = undefined, default_text = undefined) {
        if(this.FrmList[frm_id] === undefined) {
            throw `Add form using "AddFrom(frm_id) before call this function!"`;
        }
        let obj = {
            attr: select_attr,
            attrVal: select_attr_val,
            ajaxFunc: ajax_func,
            ajaxArgs: ajax_args,
            valueField: value_field,
            textField: text_field,
            defaultId: default_value,
            defaultText: default_text
        };
        this.FrmList[frm_id].SelectInfoList.push(obj);
    }

    AddPopupLink(frm_id, html_name, popup_func, target_name, from_name = []){

        this.FrmList[frm_id].PopupInfoList.push({
            html_name : html_name,
            target_name: target_name,
            from_name: from_name,
            frm_id: frm_id,
            popup_func : popup_func
        });
        //$(`#${frm_id} [name="${html_name}"]`).on(Const.HtmlEvent.click, popup_func);
    }

    InitSingleForm(frm_id) {
        for(const info_obj of this.FrmList[frm_id].SelectInfoList)
        {
            FormHelper.FillFormSelectBoxWithInfoObj(frm_id, info_obj);
        }
        for(const pop_info of this.FrmList[frm_id].PopupInfoList)
        {
            $(`#${frm_id} [name="${pop_info.html_name}"]`).on(Const.HtmlEvent.click, pop_info.popup_func);
        }
    }
    InitAll() {
        for(let frm_id in this.FrmList)
        {
            this.InitSingleForm(frm_id);
        }
    }
    ClearSingleForm(frm_id)    {
        $("#"+ frm_id)[0].reset();
        let now_date = new Date();
        let y = now_date.getFullYear();
        let m = (now_date.getMonth() + 1) < 10 ? '0' + (now_date.getMonth() + 1) : (now_date.getMonth() + 1);
        let d = now_date.getDate() < 10 ? '0' + now_date.getDate() : now_date.getDate();
        $("input[type='date']").each(function(){
            if($(this).attr("datetype") == "Ymd"){
                let result = y+'-'+m+'-'+d;
                this.value = result;
            }
        })
        $("input[type='text']").each(function(){
            if($(this).attr("datetype") == "Ymd"){
                //현재 날짜 가져오기
                let a = new Date();
                //format해서 value에 담을수 있게 만들기
                let b = a.getFullYear() + "-" + (String((a.getMonth()+1)).length == 1 ? "0"+String((a.getMonth()+1)) : (a.getMonth()+1));
                this.value = b;
            }
        })
        $("input[type='month']").each(function(){
            if($(this).attr("datetype") == "Ymd"){
                let result = y+'-'+m;
                this.value = result;
            }
        })
    }
    ClearAll() {
        for(let frm_id in this.FrmList)
        {
            this.ClearSingleForm(frm_id);
        }
    }
}

export class W2UiHelper{
    static AddRecID(data_arr) {
        let recid = 0;
        for (let dataRow of data_arr)
        {
            dataRow.recid = ++recid;
        }
        return data_arr;
    };
    static SelectBoxRenderFunc = function (record, index, col_index) {
        let html = "";
        let code = this.getCellValue(index, col_index);
        let cmb_data = this.columns[col_index].editable.items;
        for (let item of cmb_data) {
            if (item.value === code) {
                html = item.text;
                break;
            }
        }
        return html;
    };
    static ColorInputRenderFunc =  function(record, index, col_index){
        let height =  parseInt(this.recordHeight) -6;
        let color_code = this.getCellValue(index, col_index);

        let html = `
            <div class="cf" style="line-height: ;">
                <div style="max-height:${height}px" class="ib">${color_code}</div>
                <div class="ib fr" style="width:${height}px; height:${height}px; background-color:#${color_code}; transform: translate(0px, 9px); border: 1px solid #f0f0f0;"></div>
            </div>`;
        return html;
    };
    static PopUpInputRenderFunc =  function (record, selected_row_index, selected_col_index) {
        let cell_value = this.getCellValue(selected_row_index, selected_col_index);
        // <a class="popBtInner" onclick="PopupManager.${field.class_name}.ShowDialog(${grid_id}, ${frm_id}, ${selected_row_index},${selected_col_index});">
        let html =
            `<div class="cf">
                            <div style="float:left; line-height:35px;">${cell_value}</div>
                            <a class="popBtInner">
                                <i class="far fa-window-restore" style="color: #363c4f;"></i>
                            </a>
                        </div>`;
        console.log(html);
        return html;
    };
    static CheckBoxInputRenderFunc = (grid_obj,columns_list)=>{
        for(let col of grid_obj.columns) {
            //col.render = W2UiHelper.PopUpInputRenderFunc;
            for(let i=0; i<columns_list.length; i++){
                if(col.field === columns_list[i]) {
                    col.render = function (record, selected_row_index, selected_col_index) {
                        let cell_value = this.getCellValue(selected_row_index, selected_col_index);
                        let html;
                        let is_checked = cell_value ? ' checked="checked"' : '';
                        html =
                            `<div class="cf">
                                <input type="checkbox" value="${cell_value}"${is_checked} disabled="disabled"/>
                            </div>`;
                        return html;
                    }
                }
            }
        }
    };

    static AttachPopUpInputRenderFunc = (grid_obj, popup_config_list, pk_field_list)=>{

        for(let col of grid_obj.columns) {
            let field = popup_config_list.find(element => element.field === col.field );
            if(field !== undefined) {
                //col.render = W2UiHelper.PopUpInputRenderFunc;
                let grid_name = field.grid.toString();
                if(pk_field_list.indexOf(field.field) > 0){
                    col.render = function (record, selected_row_index, selected_col_index) {
                        let cell_value = this.getCellValue(selected_row_index, selected_col_index);
                        let html;
                        if(cell_value == "" || w2ui[grid_name].records[selected_row_index]['cu'] == "C"){
                            html =
                                `<div class="cf">
                                    <div style="float:left; line-height:35px;">${cell_value}</div>
                                        <a class="popBtInner" onclick="PopupManager.${field.class_name}.ShowGridDialog('${grid_name}', ${selected_row_index},${selected_col_index});">
                                            <i class="far fa-window-restore" style="color: #363c4f;"></i>
                                        </a>
                                </div>`;
                            return html;
                        }else{
                            html =
                                `<div class="cf">
                                    <div style="float:left; line-height:35px;">${cell_value}</div>
                                </div>`;
                            return html;
                        }
                    };
                }else{
                    col.render = function (record, selected_row_index, selected_col_index) {
                        let cell_value = this.getCellValue(selected_row_index, selected_col_index);
                        let html =
                                `<div class="cf">
                            <div style="float:left; line-height:35px;">${cell_value}</div>
                                <a class="popBtInner" onclick="PopupManager.${field.class_name}.ShowGridDialog('${grid_name}', ${selected_row_index},${selected_col_index});">
                                    <i class="far fa-window-restore" style="color: #363c4f;"></i>
                                </a>
                        </div>`;
                            return html;
                    };

                }

            }
        }
    };
    static SelectBoxFillData(grid_obj, field_name, arr_obj, value_field, text_field) {
        arr_obj = ScriptHelper.BuildSelectBoxData(arr_obj, value_field, text_field);
        let col_idx = W2UiHelper.GetColIdxByName(grid_obj, field_name);
        grid_obj.columns[col_idx].editable.items = arr_obj;
        grid_obj.columns[col_idx].render = W2UiHelper.SelectBoxRenderFunc;
    }
    static GetColIdxByName(grid_obj, field_name) {
        let idx = 0;
        let col_idx = -1;
        for (let col of grid_obj.columns) {
            if (col.field === field_name) {
                col_idx = idx;
                break;
            }
            idx++;
        }
        return col_idx;
    }
    static AttachColorInputRenderFunc = (grid_obj)=>{
        for(let col of grid_obj.columns) {
            if(col.editable && col.editable.type === "color") {
                col.render = W2UiHelper.ColorInputRenderFunc;
            }
        }
    };
    static TypeCastingConvertToGridFormat(data, type_casting_obj){
        for (let dataRow of data)
        {
            for(let type_casting of type_casting_obj)
            {
                //지정 타입으로 변환
                if(type_casting.fieldType === 'int'){
                    dataRow[type_casting.fieldName] = Number(dataRow[type_casting.fieldName]);
                }
            }
        }
        return data;
    };
    static CheckBoxDataConvertToGridFormat(data, check_info_obj) {
        let recid = 0;
        for (let dataRow of data)
        {
            for(let chk_info of check_info_obj)
            {
                //같으면 true 다르면 false를 반환
                dataRow[chk_info.fieldName] = dataRow[chk_info.fieldName] === chk_info.trueField;
            }
        }
        return data;
    };
    static CheckBoxDataConvertToDBFormat(data, check_info_obj) {
        for (let dataRow of data)
        {
            for(let chk_info of check_info_obj)
            {
                if(dataRow[chk_info.fieldName] !== undefined)
                {
                    dataRow[chk_info.fieldName] = dataRow[chk_info.fieldName] ? chk_info.trueField : chk_info.falseField;
                }
            }
        }
        return data;
    }
    // static get SelectedGrid() {return $("#"+ Const.SelectedGridID).val();}
    static SetCellValue(grid_obj, row_index, field_name, value) {
        // if(value !== grid_obj.records[row_index][field_name]) {
        //     return;
        // }
        if(grid_obj.records[row_index].w2ui === undefined) {
            grid_obj.records[row_index].w2ui = {changes: {}};
        }
        if(grid_obj.records[row_index].w2ui.changes === undefined) {
            grid_obj.records[row_index].w2ui.changes = {};
        }

        grid_obj.records[row_index].w2ui.changes[field_name] = value;
        //w2ui[grid_obj.name].update();
        grid_obj.update();
    }
    static GetPopUpLayoutName(popup_name){return popup_name + "_layout";}
    static GetPopUpGridName(popup_name){return popup_name + "_grid";}
    static GetSelectedRowOnClick(mouse_event, grid_name){
        let selected_row;
        for(const tag of mouse_event.path) {
            if("TR" === $(tag).prop("tagName")) {
                //form_id = tag.id;
                selected_row = w2ui[grid_name].records[$(tag).attr("recid") - 1];
                break;
            }
        }
        return selected_row;
    }
    static RowOnClick(){
        $(".loadingW").css("display", "");
        // 클릭한 row에 cu 항목이 있으면 새로 생성한 row이므로 target grid 비워주고 return false;
        let targetGrid = this.rowOnClickConfig.clickTargetGrid;
        
        targetGrid.forEach(function(el){
            w2ui[el].clear();
        });
        let funcType = this.rowOnClickConfig.funcType;
        let clickedRecid = this.last.click_recid;
        let clickedRec = this.records[clickedRecid-1];
        if(clickedRec.hasOwnProperty("cu") && clickedRec.cu.toUpperCase() == 'C'){
            $(".loadingW").css("display", "none");
            return false;
        }

        let whereFieldList = this.rowOnClickConfig.clickWhereFieldList;
        let restUrl = this.rowOnClickConfig.url;
        let ajaxArgs = {
            param : {
                where: {},
            },
            form : {

            },
        }
        for(let key of whereFieldList){
            ajaxArgs.param.where[key] = clickedRec[key];
        }

        let grid_id = Const.SelectedGridID;

        if(w2ui[grid_id].hasOwnProperty("fncRowOnClickSeletedGridID") && typeof w2ui[grid_id].fncRowOnClickSeletedGridID == "function"){
            w2ui[grid_id].fncRowOnClickSeletedGridID();
        }

        grid_id = Const.SelectedGridID;

        // TODO : form 값 param에 담아서 보낼 것
        if(w2ui[grid_id].lastGetParam !== undefined){
            ajaxArgs.form['lastGetParam'] = w2ui[grid_id].lastGetParam;
        }else{
            let form_info = $('form');
            for(let i=0; i<form_info.length; i++){
                ajaxArgs.form[form_info[i].id] = FormHelper.SerializeForm(form_info[i].id);
            }
        }

        // TODO : girds 값 param에 담아서 보낼 것

        if(funcType == "detail"){
            ScriptHelper.AjaxCall(restUrl, Const.AjaxMethod.GET, ajaxArgs)
                .then((res)=>{
                    $(".loadingW").css("display", "none");
                    for(let i=0; i<res.data.length; i++){
                        for (let key in res.data[i]) {
                            //console.log("key : "+key);
                            let check_yn = key.substr(key.length-2,2);
                            //console.log("check_yn : "+check_yn);
                            if(check_yn === "yn"){
                                //console.log(res.data[i][key]);
                                if(res.data[i][key] === "Y"){
                                    res.data[i][key] = true;
                                }else if(res.data[i][key] === "N" || res.data[i][key] === null){
                                    res.data[i][key] = false;
                                }
                            }
                        }
                    }
                    let record_data = res.data;
                    W2UiHelper.AddRecID(record_data);
                    w2ui[targetGrid].records = record_data;
                    w2ui[targetGrid].reload(true);
                    $("#grid_"+targetGrid+"_rec_1").click();
                    if(w2ui[grid_id].hasOwnProperty("fncPostRowOnClick") && typeof w2ui[grid_id].fncPostRowOnClick == "function"){
                        w2ui[grid_id].fncPostRowOnClick();
                    }
                })
                .fail(ScriptHelper.OnAjaxFail);
        }else if(funcType == "multiple"){
            console.log(targetGrid);
            ScriptHelper.AjaxCall(restUrl, Const.AjaxMethod.GET, ajaxArgs)
                .then((res)=>{
                    $(".loadingW").css("display", "none");
                    console.log(res);
                    for(let i = 0; i<res.length; i++){
                        let record_data = res[i];
                        W2UiHelper.AddRecID(record_data);
                        w2ui[targetGrid[i]].records = record_data;
                        w2ui[targetGrid[i]].reload(true);
                    }
                })
                .fail(ScriptHelper.OnAjaxFail);
        }else if(funcType == "detail_tree"){
            let root = this.rowOnClickConfig.root;
            let parent = this.rowOnClickConfig.parent;
            let children = this.rowOnClickConfig.children;
            ScriptHelper.AjaxCall(restUrl, Const.AjaxMethod.GET, ajaxArgs)
                .then((res)=>{
                    $(".loadingW").css("display", "none");
                    let data = res.data;
                    if(data !== undefined){
                        for(let i=0; i<data.length; i++){
                            for (let key in data[i]) {
                                //console.log("key : "+key);
                                let check_yn = key.substr(key.length-2,2);
                                //console.log("check_yn : "+check_yn);
                                if(check_yn === "yn"){
                                    //console.log(res.data[i][key]);
                                    if(data[i][key] === "Y"){
                                        data[i][key] = true;
                                    }else if(data[i][key] === "N" || data[i][key] === null){
                                        data[i][key] = false;
                                    }
                                }
                            }
                        }
                        //let record_num = data.length;
                        //W2UiHelper.AddRecID(record);
                        data = common.role_data(data);
                        //let tree_record = navTree.make_w2ui_tree_dataset(data,data[0][root],parent,children);

                        //console.log(tree_record);

                        w2ui[targetGrid].records = data;
                        w2ui[targetGrid].reload(true);
                        // for(let i=0; i<record_num; i++){
                        //     if(tree_record[i].w2ui.children.length > 0){
                        //         w2ui[targetGrid].toggle(tree_record[i]["recid"]);
                        //     }
                        // }
                    }
                    // let record_data = res.data;
                    // W2UiHelper.AddRecID(record_data);
                    // w2ui[targetGrid].records = record_data;
                    // w2ui[targetGrid].reload(true);
                    // $("#grid_"+targetGrid+"_rec_1").click();

                    //RowOnClickDetailTree
                    if(w2ui[targetGrid].hasOwnProperty("fncPostROCDT") && typeof w2ui[targetGrid].fncPostROCDT == "function"){
                        w2ui[targetGrid].fncPostROCDT();
                    }
                })
                .fail(ScriptHelper.OnAjaxFail);
        }
    };
}

class GridConfig {
    constructor(grid_obj) {
        if(grid_obj === undefined) {
            throw `grid_id can not be undefined or ""!`;
        }
        this.GridObject = grid_obj;
    }
    //버튼에 대한 Ajax 경로
    AjaxUrl = {};
    //w2grid()로 초기화 완료된 그리드 정보...
    GridObject = {};
    // LayoutObject = {};
    //선택필드, 디비에는 없는 거라소 따로 관리해 줘야 함...
    SelectionCheckField = "";

    //입력조건 체크용
    PKFieldList = [];
    CompulsoryFieldList = [];
    ReadonlyFieldList = [];

    AIField = [];
    ConditionalRequiredFieldList = [];
    BCFieldsList = [];

    //디스플레이 할 때 사용
    PopUpConfigList = [];
    SelectConfigList = [];
    CheckBoxConfigList = [];
    TypeCastingList = [];

    SearchParam = undefined;

    ClickTargetGrid;
    ClickWhereFieldList = [];
}

export class GridManager {
    constructor() {
    }
    GridList = {};
    #event_func = {
        edit_field:  function(event){
            event.done((event)=>{
                let type = event.input[0].type;
                let field = this.columns[event.column].field;
                if ( type === "text") {
                    let max_len = this.columns[event.column].editable.maxLength || Const.MaxLenCfg[field] || Const.MaxTextLen;
                    event.input[0].setAttribute("maxLength", `${max_len}`);
                }
            });
        },
        click: function(event) {
            //클릭하면 footer에 있는 hidden에 현재 그리드 값 박아준다.
            Const.SelectedGridID = this.name;
        },
        // hover: function(event){
        //
        // },
        // select: function(event){},
        // unselect: function(event){},
        // keydown: function(event){
        //     //$("#selected_grid").val(this.GridName);
        // },
        double_click: (event)=> {
            let grid_id = event.target;
            let grid_info = this.GridList[grid_id];
            let grid = w2ui[grid_id];
            if (grid.records[event.recid - 1].cu === undefined) {
                if(grid_info.PKFieldList !== undefined)
                {
                    if (grid_info.PKFieldList.find(element => element === grid.columns[event.column].field) !== undefined) {
                        event.isCancelled = true;
                    }
                }
                if(grid_info.ReadonlyFieldList !== undefined)
                {
                    if (grid_info.ReadonlyFieldList.find(element => element === grid.columns[event.column].field) !== undefined) {
                        event.isCancelled = true;
                    }
                }
            }
        },
    };
    AddGrid(grid_obj){
        grid_obj = $().w2grid(grid_obj);
        this.GridList[grid_obj.name] = new GridConfig(grid_obj);
        //
        // if(layout_obj !== undefined) {
        //     layout_obj = $().w2layout(layout_obj);
        //     this.GridList[grid_obj.name].LayoutObject = layout_obj;
        // }
        return grid_obj;
    }

    AddSelectBoxInfo(grid_id, field_name, ajax_func, ajax_args, value_field, text_field) {
        if(this.GridList[grid_id] === undefined) {
            throw `Add form using "AddFrom(frm_id) before call this function!"`;
        }
        let select_info_obj = {
            fieldName: field_name,
            ajaxFunc: ajax_func,
            ajaxArgs: ajax_args,
            valueField: value_field,
            textField: text_field,
            // renderFunc: W2UiHelper.SelectBoxRenderFunc,
        };
        this.GridList[grid_id].SelectConfigList.push(select_info_obj);

        // let grid_obj = this.GridList[grid_id].GridObject;
        // ajax_func(ajax_args).then((res) =>{
        //     let col_idx = W2UiHelper.GetColIdxByName(grid_obj,field_name);
        //     res.data = ScriptHelper.BuildSelectBoxData(res.data, value_field, text_field);
        //     grid_obj.columns[col_idx].editable.items = res.data;
        //     grid_obj.columns[col_idx].render = W2UiHelper.SelectBoxRenderFunc;
        //     w2ui[grid_obj.name].update();
        // });
    }
    AddTypeCasting(grid_id, field_type, field_name){
        if(this.GridList[grid_id] === undefined) {
            throw `Add form using "AddFrom(frm_id) before call this function!"`;
        }
        let obj = {
            fieldType: field_type,
            fieldName: field_name,
        };
        this.GridList[grid_id].TypeCastingList.push(obj);
    }
    AddCheckRenderOption(grid_id, field_name, true_field, false_field) {
        if(this.GridList[grid_id] === undefined) {
            throw `Add form using "AddFrom(frm_id) before call this function!"`;
        }
        let obj = {
            fieldName: field_name,
            trueField: true_field,
            falseField: false_field,
        };
        this.GridList[grid_id] .CheckBoxConfigList.push(obj);
    }
    //팝업에 대한 콜백을 어케처리하나?? 하나의 인자값을 추가해서 반환값을 처리할수 있게??
    AddPopUpOption(grid_id, field_name, popup_name) {
        this.GridList[grid_id].PopUpConfigList.push({grid: grid_id, field: field_name, class_name: popup_name});
    }

    SetSelectionCheckField(grid_id, selection_field_name) {
        this.GridList[grid_id].SelectionCheckField = selection_field_name;
    }
    SetPkFields(grid_id, arr_field_name) {    // 빨갛게 만듬 PK 필드
        this.GridList[grid_id].PKFieldList = arr_field_name;
        this.#setGridBackColor(grid_id, this.GridList[grid_id].PKFieldList, Const.FieldColor.PK);
    }
    //BackendConditionalField
    SetBCFields(grid_id, arr_field_name) {
        this.GridList[grid_id].BCFieldsList = arr_field_name;
        this.#setGridBackColor(grid_id, this.GridList[grid_id].BCFieldsList, Const.FieldColor.PK);
    }
    SetAIField(grid_id, field_name) {
        if (field_name.length < 2) {
            this.GridList[grid_id].AIField = field_name;
            this.#setGridBackColor(grid_id, this.GridList[grid_id].AIField, Const.FieldColor.ReadOnly);
        }
    }


    // TODO : 2차배열로 넘김... [조건부 필드,참조할 필드] => 참조할 필드값이 "Y" 일때 조건부 필드는 필수입력이 되어야 한다.
    SetConditionalRequiredFields(grid_id, arr_field_name) {
        this.GridList[grid_id].ConditionalRequiredFieldList = arr_field_name;
    }
    SetCompulsoryFields(grid_id, arr_field_name) {    // 퍼렇게 만듬
        this.GridList[grid_id].CompulsoryFieldList = arr_field_name;
        this.#setGridBackColor(grid_id, this.GridList[grid_id].CompulsoryFieldList, Const.FieldColor.Compulsory);

    }
    SetReadonlyFields(grid_id, arr_field_name) {
        this.GridList[grid_id].ReadonlyFieldList = arr_field_name;
        this.#setGridBackColor(grid_id, this.GridList[grid_id].ReadonlyFieldList, Const.FieldColor.ReadOnly);
    }
    #setGridBackColor = (grid_id, field_arr, back_color)=>{
        if(field_arr === undefined) return;
        let grid_obj = this.GridList[grid_id].GridObject;
        for(let col of grid_obj.columns)
        {
            if (field_arr.find(element => element === col.field) !== undefined) {
                if(col.style === undefined) {
                    col.style = "";
                }
                //백칼라 두번 들어감. 나중에 리플레이스로 수정.
                //
                col.style = col.style.concat(`background-color: ${back_color};`);
                //col.style = col.css(`background-color: ${back_color};`);
            }
        }
    };


    //그리드 html이 로딩되는 시점을 확인해서 되는지 확인.
    InitSingleGrid(grid_id) {
        let grid_obj = this.GridList[grid_id].GridObject;
        //add event functions
        grid_obj.onDblClick || (grid_obj.onDblClick = this.#event_func.double_click );
        grid_obj.onClick || (grid_obj.onClick =  this.#event_func.click );
        grid_obj.onKeydown || (grid_obj.onKeydown =  this.#event_func.keydown );
        grid_obj.onEditField || (grid_obj.onEditField = this.#event_func.edit_field );

        //let grid_obj = this.GridList[grid_id].GridObject;
        for(let select_info_obj of this.GridList[grid_id].SelectConfigList){
            select_info_obj.ajaxFunc(select_info_obj.ajaxArgs).then((res) =>{
                let col_idx = W2UiHelper.GetColIdxByName(grid_obj,select_info_obj.fieldName);
                res.data = ScriptHelper.BuildSelectBoxData(res.data,select_info_obj.valueField,select_info_obj.textField);
                if(grid_obj.columns[col_idx].editable === undefined) grid_obj.columns[col_idx].editable = {};
                grid_obj.columns[col_idx].editable.items = res.data;
                grid_obj.columns[col_idx].render = W2UiHelper.SelectBoxRenderFunc;
                w2ui[grid_obj.name].update();
            });
        }
        //set color
        this.#setGridBackColor(grid_id, this.GridList[grid_id].PKFieldList, Const.FieldColor.PK);
        this.#setGridBackColor(grid_id, this.GridList[grid_id].CompulsoryFieldList, Const.FieldColor.Compulsory);
        this.#setGridBackColor(grid_id, this.GridList[grid_id].ReadonlyFieldList, Const.FieldColor.ReadOnly);
        this.#setGridBackColor(grid_id, this.GridList[grid_id].BCFieldsList, Const.FieldColor.PK);

        //color type render
        W2UiHelper.AttachColorInputRenderFunc(grid_obj);

        //set popup
        W2UiHelper.AttachPopUpInputRenderFunc(grid_obj, this.GridList[grid_id].PopUpConfigList,this.GridList[grid_id].PKFieldList);


        //그리드 그려주기...
        $(`#${grid_obj.name}`).w2render(grid_obj);
        // $("#" + grid_obj.name).w2grid(grid_obj);

    }
    InitAll() {
        for(let grid_id in this.GridList)
        {
            this.InitSingleGrid(grid_id);
        }
    }

    ClearSingleGrid(grid_id) {
        w2ui[grid_id].clear();
    }
    ClearAll() {
        for(let grid_id in this.GridList)
        {
            this.ClearSingleGrid(grid_id);
        }
    }
    
    OnAddRow(grid_id,search_frm_id){
        if(w2ui[grid_id].customConfig !== undefined && w2ui[grid_id].customConfig.maxAddRow !== undefined){
            
            // add 된 row가 몇개 인지 카운트
            let cnt = 0;
            for(let item of w2ui[grid_id].records){

                if(item.hasOwnProperty("cu") && item.cu.toUpperCase() == "C") cnt++;

                // 설정해둔 maxAddRow 가 0이면 추가할 수 없다고 띄운다.
                if(w2ui[grid_id].customConfig.maxAddRow == 0){
                    mes_alert({msg:Const.config.customConfig.maxAddRowWarningMsg1 + Const.config.customConfig.maxAddRowWarningMsg3});
                    return false;
                }
                // 설정해둔 maxAddRow 보다 카운트한 row의 수가 같거나 크면 return false;
                if(w2ui[grid_id].customConfig.maxAddRow <= cnt){
                    let msg = Const.config.customConfig.maxAddRowWarningMsg1 + w2ui[grid_id].customConfig.maxAddRow + Const.config.customConfig.maxAddRowWarningMsg2;
                    mes_alert({msg:msg});
                    return false;
                } 
            }
        }
        let rec_id = w2ui[grid_id].records.length + 1;
        w2ui[grid_id].add({recid: rec_id});
        w2ui[grid_id].records[rec_id - 1].cu = 'C';
        for(let i = 0; i<w2ui[grid_id].columns.length; i++){
            //모든 Date타입을 다?
            if(w2ui[grid_id].columns[i].editable !== undefined){
                if(w2ui[grid_id].columns[i].editable["type"] == "date"){
                    let date = new Date();
                    let year = date.getFullYear();
                    let month = (1+date.getMonth());
                    month = month >= 10 ? month : '0' + month;
                    let day = date.getDate();
                    day = day >=10 ? day : '0' + day;
                    if(w2ui[grid_id].records[rec_id - 1]["w2ui"] === undefined){
                        w2ui[grid_id].records[rec_id - 1]["w2ui"] = {changes : {}};
                    }
                    w2ui[grid_id].records[rec_id - 1]["w2ui"]["changes"][w2ui[grid_id].columns[i]["field"]] = year + '-' + month + '-' + day;
                    w2ui[grid_id].refresh();
                }
            }
            //공장은 Add시 Default 값으로 winp01일 것
            if(w2ui[grid_id].columns[i]["field"] === "fact_cd"){
                if(w2ui[grid_id].records[rec_id - 1]["w2ui"] === undefined){
                    w2ui[grid_id].records[rec_id - 1]["w2ui"] = {changes : {}};
                }
                let fact_cd = $("#"+search_frm_id+" select[name='fact_cd']").val();
                w2ui[grid_id].records[rec_id - 1]["w2ui"]["changes"][w2ui[grid_id].columns[i]["field"]] = fact_cd;
                w2ui[grid_id].refresh();
            }
            //사업자는 Add시 Default 값으로 winplus일 것
            if(w2ui[grid_id].columns[i]["field"] === "cmpny_cd"){
                if(w2ui[grid_id].records[rec_id - 1]["w2ui"] === undefined){
                    w2ui[grid_id].records[rec_id - 1]["w2ui"] = {changes : {}};
                }
                w2ui[grid_id].records[rec_id - 1]["w2ui"]["changes"][w2ui[grid_id].columns[i]["field"]] = Const.config.cmpny_cd;
                w2ui[grid_id].refresh();
            }
            //사용여부는 Add시 true일 것
            if(w2ui[grid_id].columns[i]["field"] === "use_yn"){
                if(w2ui[grid_id].records[rec_id - 1]["w2ui"] === undefined){
                    w2ui[grid_id].records[rec_id - 1]["w2ui"] = {changes : {}};
                }
                w2ui[grid_id].records[rec_id - 1]["w2ui"]["changes"][w2ui[grid_id].columns[i]["field"]] = true;
                w2ui[grid_id].refresh();
            }
        }
        // 포커스 이동
        $(`#grid_${grid_id}_rec_` + rec_id).focus();
        //let offset = $("#grid_grid_rec_" + rec_id).position();
        w2ui[grid_id].scrollIntoView(rec_id);        
    }
    OnExcelDownload(grid_id){
        common.excel_download(grid_id);
    }
    OnExcelUpload(grid_id){
        console.log(`ExcelUpload: ${grid_id}`);
    }
    GetDeleteParam(grid_id)    {
        let param = [];

        let changed = w2ui[grid_id].getChanges();
        let records = w2ui[grid_id].records;
        for(let changed_row of changed){
            if(changed_row[this.GridList[grid_id].SelectionCheckField] === true && records[changed_row.recid-1].cu === undefined)
            {
                let obj = {};
                for(let pk of this.GridList[grid_id].PKFieldList) {
                    obj[pk] = records[changed_row.recid-1][pk];
                }
                param.push(obj);
            }
        }
        return param;
    }
    GetSaveParam(grid_id)    {
        let add_data_to_param_obj = (cu_type, obj, changed_row, records) =>{
            let item_cnt = Object.getOwnPropertyNames(obj).length;
            let selection_checkbox_field_name = this.GridList[grid_id].SelectionCheckField;
            for (let changed_row_key in changed_row) {
                if (changed_row_key !== selection_checkbox_field_name && changed_row_key !== "recid") {
                    obj[changed_row_key] = changed_row[changed_row_key];
                }
            }
            if(Object.getOwnPropertyNames(obj).length > item_cnt) {
                //pk 더하고
                for(let pk of this.GridList[grid_id].PKFieldList) {
                    let row_idx = changed_row.recid -1;
                    //업데이트 할때는 records 에 있고
                    //신규추가 할때는 changes에 있고..
                    if(cu_type === "u" || cu_type === "U"){
                        obj[pk] = records[row_idx][pk];
                    }
                    else
                    {
                        obj[pk] = changed_row[pk];
                    }
                }
                //업데이트 할때만 BCFieldList 값이 필요
                for(let bc of this.GridList[grid_id].BCFieldsList) {
                    let row_idx = changed_row.recid -1;
                    if(cu_type === "u" || cu_type === "U"){
                        obj[bc] = records[row_idx][bc];
                    }
                }
                if(this.GridList[grid_id].AIField.length == 1){
                    let row_idx = changed_row.recid -1;
                    obj[this.GridList[grid_id].AIField] = records[row_idx][this.GridList[grid_id].AIField];
                }
                obj.cu = cu_type;
            }
        };

        let param = [];
        let changed = w2ui[grid_id].getChanges();
        let records = w2ui[grid_id].records;
        for(let changed_row of changed) {
            let row_idx = changed_row.recid - 1;

            //cu, create
            let obj = {};
            if(records[row_idx].cu === "C" || records[row_idx].cu === "c") {
                //pk 입력체크
                for(let pk of this.GridList[grid_id].PKFieldList) {
                    if(this.GridList[grid_id].ReadonlyFieldList.indexOf(pk) < 0) {
                        if (changed_row[pk] === undefined || changed_row[pk] === "") {
                            $(".loadingW").css("display", "none");
                            common.mes_alert({msg: "필수 키항목이 입력되지 않았습니다."});
                            //포커스, 색깔강조
                            return;
                        }
                    }
                }
                //compulsory 입력체크
                for(let comp of this.GridList[grid_id].CompulsoryFieldList) {
                    if(changed_row[comp] === undefined || changed_row[comp] === ""){
                        $(".loadingW").css("display", "none");
                        common.mes_alert({msg:"필수 입력항목이 입력되지 않았습니다."});
                        //포커스, 색깔강조
                        return;
                    }
                }

                for(let condi of this.GridList[grid_id].ConditionalRequiredFieldList) {
                    console.log(changed_row[condi[0]]);
                    console.log(changed_row[condi[1]]);
                    for(let value of condi[2]) {
                        if(changed_row[condi[1]] === value){
                            if(changed_row[condi[0]] === undefined || changed_row[condi[0]] === ""){
                                for(let i=0; i<w2ui[grid_id].columns.length; i++){
                                    if(w2ui[grid_id].columns[i]["field"] === condi[0]){
                                        let str = w2ui[grid_id].columns[i]["caption"];
                                        $(".loadingW").css("display", "none");
                                        common.mes_alert({msg:str+" 입력항목이 입력되지 않았습니다."});
                                        //포커스, 색깔강조
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }


                add_data_to_param_obj("c",obj, changed_row, records);
            }
            //no cu, update
            else{
                for(let condi of this.GridList[grid_id].ConditionalRequiredFieldList) {
                    console.log(changed_row[condi[0]]);
                    console.log(changed_row[condi[1]]);
                    for(let value of condi[2]) {
                        if(changed_row[condi[1]] === value){
                            if(changed_row[condi[0]] === undefined || changed_row[condi[0]] === ""){
                                for(let i=0; i<w2ui[grid_id].columns.length; i++){
                                    if(w2ui[grid_id].columns[i]["field"] === condi[0]){
                                        let str = w2ui[grid_id].columns[i]["caption"];
                                        $(".loadingW").css("display", "none");
                                        common.mes_alert({msg:str+" 입력항목이 입력되지 않았습니다."});
                                        //포커스, 색깔강조
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
                add_data_to_param_obj("u",obj, changed_row, records);
            }
            if(Object.getOwnPropertyNames(obj).length > 0)
            {
                param.push(obj);
            }
        }
        return param;
    }
    // GetSearchParamFromForm(frm_id){
    //
    // }
    SetAjaxUrl(grid_id, btn_id, ajax_url) {
        this.GridList[grid_id].AjaxUrl[btn_id] = ajax_url;
    }
    GetAjaxUrl(grid_id, btn_id) {
        return this.GridList[grid_id].AjaxUrl[btn_id];
    }
    SetClickTargetGrid(grid_id, target_grid_id){
        this.GridList[grid_id].ClickTargetGrid = target_grid_id;
    }
    GetClickTargetGrid(grid_id){
        return this.GridList[grid_id].ClickTargetGrid;
    }
    SetClickWhereFieldList(grid_id, where_field_list = []){
        this.GridList[grid_id].ClickWhereFieldList = where_field_list;
    }
    GetClickWhereFieldList(grid_id){
        return this.GridList[grid_id].ClickWhereFieldList;
    }
    GetSearchParam(grid_id){
        return this.GridList[grid_id].SearchParam;
    }
    SetSearchParam(grid_id, param){
        this.GridList[grid_id].SearchParam = param;
    }
    LoadGridData(grid_id, btn_id, param, show_msg){
        //let grid_id = Const.SelectedGridID;
        //let btn_id = Const.MesButton.Search;
        let rest_url = this.GetAjaxUrl(grid_id, btn_id);
        // let param = this.GetSearchParam(grid_id);
        // if(param === undefined) {
        //     param = FormHelper.SerializeForm(search_frm_id);
        // }
        let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);
        common.search_param = param;
        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
            .then((res)=>{
                $(".loadingW").css("display", "none");
                let record_data = res.data;
                //CheckBox의 설정값을 가져옴 Y는 true / N은 false
                let check_info_obj = this.GridList[grid_id].CheckBoxConfigList;

                let type_casting_obj = this.GridList[grid_id].TypeCastingList;
                //받아온 데이터에 RecID를 붙힘
                W2UiHelper.AddRecID(record_data);
                W2UiHelper.TypeCastingConvertToGridFormat(record_data, type_casting_obj);
                W2UiHelper.CheckBoxDataConvertToGridFormat(record_data, check_info_obj);
                // w2ui[grid_id].records = record_data;
                w2ui[grid_id].records = record_data;
                w2ui[grid_id].reload(true);
                //console.log(show_msg);
                if(show_msg) common.success_msg(res.msg);
                if(w2ui[grid_id].hasOwnProperty("fncPostSearch") && typeof w2ui.grid01.fncPostSearch == "function"){
                    w2ui[grid_id].fncPostSearch(res);
                }
            })
            .fail(ScriptHelper.OnAjaxFail);
        // this.gridManager.OnBtnSearch(grid_id, this.search_frm_id, btn_id, location.pathname)
        //     .then((res)=>{
        //         if(show_msg) {
        //             common.success_msg(res.msg);
        //         }
        //     })
        //     .fail(this.#on_ajax_error);
    }

}


