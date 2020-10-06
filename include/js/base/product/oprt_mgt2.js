/**
 * parameter 형태
 */
    // let param = {
    //     where : {
    //         cd_nm : '02',
    //         cd : '02'
    //     },
    //     // like 옵션 : before, after, both
    //     like : {
    //         up_cd : ['week', 'before'],
    //         cd : ['0', 'both'],
    //     },
    //     order_by : 'cd_ordr ASC',
    //     limit : [1,2]
    // }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // "B0001"	"조회"	        "B0001.png"	\N	"조회 버튼"	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0002"	"초기화"	    "B0002.png"	\N	"초기화 버튼"	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0003"	"추가"	        "B0003.png"	\N	"추가 버튼"	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0004"	"삭제"	        "B0004.png"	\N	"삭제 버튼"	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0005"	"저장"	        "B0005.png"	\N	"저장 버튼"	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0006"	"엑셀 다운"	    "B0006.png"	\N	"조회된 화면을 엑셀로 저장"	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0007"	"승인"	        "B0007.png"	\N	"승인 버튼"	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0008"	"복사"	        "B0008.png"	\N	""	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0009"	"엑셀 업로드"	"B0009.png"	\N	"엑셀 업로드"	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0010"	"일괄 생성"	    "B0010.png"	\N	"일괄 생성"	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0011"	"작업자선택"	"B0011.png"	\N	""	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0012"	"지시선택"	    "B0012.png"	\N	""	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0013"	"가동/비가동"	"B0013.png"	\N	""	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0014"	"비가동사유"	"B0014.png"	\N	""	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0015"	"소재투입"	    "B0015.png"	\N	""	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0016"	"LOT등록"	    "B0016.png"	\N	""	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0017"	"검사등록"	    "B0017.png"	\N	""	\N	"Y"	"admin"	\N	"admin"	\N
    // "B0018"	"지시완료"	    "B0018.png"	\N	""	\N	"Y"	"admin"	\N	"admin"	\N

class PageManager extends Object
{
    static #pageButtons = {
        Search: "#hBtnB0001",
        Initialize: "#hBtnB0002",
        AddRow: "#hBtnB0003",
        DeleteRow: "#hBtnB0004",
        Save: "#hBtnB0005",
        ExcelDownload: "#hBtnB0006",
        ExcelUpload: "#hBtnB0009"
    };
    
    static get PageButtons() {return PageManager.#pageButtons;};
    
    static #htmlEventType = {
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
    
    static get EventType() {return PageManager.#htmlEventType;};
    
    constructor()
    {
        super();
        this.EventInfoList = {};
    }
    
    ConvertToGridData(data)
    {
        for (let i = 0; i < data.length; i++)
        {
            data[i].recid = i + 1;
            //data[i].use_yn = (data[i].use_yn === 'Y');
        }
        return data;
    };
    
    SerializeSelectForm(frm_attr, frm_attr_val)
    {
        //input type = text, check, radio
        let arr_input = $(`form[${frm_attr}='${frm_attr_val}'] input`);
        //select
        let arr_select = $(`form[${frm_attr}='${frm_attr_val}'] select`);
        
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
        
        for (let idx = 0; idx < arr_input.length; idx++)
        {
            if (arr_input[idx].type === 'text')
            {
                if (arr_input[idx].value !== "")
                {
                    param.like[arr_input[idx].name] = [];
                    param.like[arr_input[idx].name].push(arr_input[idx].value);
                    param.like[arr_input[idx].name].push('both');
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
    
    CloneObject(obj)
    {
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
}

class SinglePageManager extends PageManager
{
    constructor(grid_attr, gird_attr_val, frm_attr, frm_attr_val, selection_check_field, pk_fields)
    {
        super();
        //각 이벤트에 대해서 미리 정해진 함수들은 다 로드한다.
        this.#setEventFunc(this.Buttons.Search, this.EvtType.click, this.EventFuncList.search);
        this.#setEventFunc(this.Buttons.AddRow, this.EvtType.click, this.EventFuncList.add);
        this.#setEventFunc(this.Buttons.DeleteRow, this.EvtType.click, this.EventFuncList.delete);
        this.#setEventFunc(this.Buttons.Initialize, this.EvtType.click, this.EventFuncList.init);
        this.#setEventFunc(this.Buttons.Save, this.EvtType.click, this.EventFuncList.save);
        this.#gridAttr = grid_attr;
        this.#gridAttrVal = gird_attr_val;
        this.#frmAttrVal = frm_attr_val;
        this.#frmAttr = frm_attr;
        this.#selectionCheckField = selection_check_field;
        this.#pkFields = pk_fields;
    };
    
    #gridCheckBoxDataInfoList = [];
    #frmSelectBoxDataInfoList = [];
    #gridSelectBoxDataInfoList = [];
    #evtFuncList = {
        //하위 펑션 동작들은 요한씨에게 물어보고 구현...
        search: () =>
        {
            let param = this.SerializeSelectForm(this.FormAttr, this.FormAttrValue);
            let func_url = this.EventInfoList[this.Buttons.Search][this.EvtType.click].restUrl;
            $.ajax({
                url: func_url,
                type: "get",
                data: param,
                // data: {
                //     param: param,
                //     cnct_btn: this.#getDBButtonID(this.Buttons.Search),
                //     cnct_url: location.pathname
                // },
                dataType: "json",
                success: (res) =>
                {
                    console.log(res);
                    // w2ui["grid"].records = this.ConvertToGridData(data);
                    // w2ui["grid"].reload(true);
                    w2ui[this.GridAttrVal].records = this.ConvertToGridData(res.data);
                    //w2ui[this.GridAttrVal].records = res.data;
                    w2ui[this.GridAttrVal].reload(true);
                    // console.log("ajax search success:",this);
                },
                error: (a, b, c) =>
                {
                    console.log(a, 'a');
                    console.log(a.responseText, 'a');
                    console.log(b, 'b');
                    console.log(c, 'c');
                }
            });
        },
        init: () =>
        {
            $(`form[${this.FormAttr}=${this.FormAttrValue}`)[0].reset();
            w2ui[this.GridAttrVal].clear();
        },
        add: () =>
        {
            let rec_id = w2ui[this.GridAttrVal].records.length + 1;
            w2ui[this.GridAttrVal].add({recid: rec_id});
            w2ui[this.GridAttrVal].records[rec_id - 1].cu = 'C';
            // 포커스 이동
            $("#grid_grid_rec_" + rec_id).focus();
            //let offset = $("#grid_grid_rec_" + rec_id).position();
            w2ui[this.GridAttrVal].scrollIntoView(rec_id);
        },
        delete: () =>
        {
            let changed = w2ui[this.GridAttrVal].getChanges();
            if (changed.length <= 0)
            {
                alert("삭제할 항목을 선택하지 않았습니다.");
                return;
            }
            let func_url = this.EventInfoList[this.Buttons.DeleteRow][this.EvtType.click].restUrl;
            let param = [];
            let records = w2ui[this.GridAttrVal].records;
            for (let changed_idx = 0; changed_idx < changed.length; changed_idx++)
            {
                if(records.cu === undefined)
                {
                    if (changed[changed_idx][this.SelectionCheckField] === true)
                    {
                        let rec_idx = changed[changed_idx].recid - 1;
                        let obj = {};
                        for (let pk_idx = 0; pk_idx < this.PkFields.length; pk_idx++)
                        {
                            obj[this.PkFields[pk_idx]] = records[rec_idx][this.PkFields[pk_idx]];
                        }
                        param.push(obj);
                    }
                }
            }
            $.ajax({
                url: func_url,
                type: "post",
                data: {
                    param: param,
                    cnct_btn: this.#getDBButtonID(this.Buttons.DeleteRow),
                    cnct_url: location.pathname
                },
                dataType: "json",
                success: (res) =>
                {
                    console.log(res, 'response');
                    console.log(this);
                    this.EventFuncList.search();
                },
                error: (a, b, c) =>
                {
                    console.log(a, 'a');
                    console.log(a.responseText, 'a');
                    console.log(b, 'b');
                    console.log(c, 'c');
                }
            })
        },
        save: () =>
        {
            let changed = w2ui[this.GridAttrVal].getChanges();
            if (changed.length <= 0)
            {
                alert("변경된 항목이 없습니다.");
                return;
            }
    
            function add_data_to_param_obj(obj, changed_item)
            {
                for(let field in changed_item)
                {
                    if(field !== selection_checkbox_field_name)
                    {
                        obj[field] = changed_item[field];
                    }
                }
            }
            let func_url = this.EventInfoList[this.Buttons.Save][this.EvtType.click].restUrl;
            let param = [];
            let records = w2ui[this.GridAttrVal].records;
            let selection_checkbox_field_name = this.SelectionCheckField;
            let data_ok = true;
            for (let changed_idx = 0; changed_idx < changed.length; changed_idx++)
            {
                let rec_idx = changed[changed_idx].recid - 1;
                let changed_item = records[rec_idx].w2ui.changes;

                //cu가 c인 경우
                if (records[rec_idx].cu === "C" || records[rec_idx].cu === "c")
                {
                    //selected checkbox체크는 의미 없음.
                    //pk가 없는 경우는 alert 띄워 줌.
                    for (let i = 0; i < this.PkFields.length; i++)
                    {
                        if (changed_item[this.PkFields[i]] === undefined)
                        {
                            data_ok = false;
                            //포커스, 색깔강조
                            alert(`필수 항목이 입력되지 않았습니다.`);
                            break;
                        }
                    }
                    if (data_ok === true)
                    {
                        let obj = {};
                        //obj.cu = records[rec_idx].cu;
                        obj.cu = "c";
                        add_data_to_param_obj(obj,changed_item);
                        //console.log(obj);
                        param.push(obj);
                    }
                    
                }
                //cu가 없는 경우
                else
                {
                    //pk가 없는 경우는 alert 띄워 줌.
                    for (let i = 0; i < this.PkFields.length; i++)
                    {
                        if (changed_item[this.PkFields[i]] !== undefined)
                        {
                            data_ok = false;
                            //포커스, 색깔강조
                            alert(`필수 항목은 변경될 수 없습니다..`);
                            break;
                        }
                    }
                    if (data_ok === true)
                    {
                        let obj = {};
                        obj.cu = "u";
                        for (let pk_idx = 0; pk_idx < this.PkFields.length; pk_idx++)
                        {
                            obj[this.PkFields[pk_idx]] = records[rec_idx][this.PkFields[pk_idx]];
                        }
                        add_data_to_param_obj(obj,changed_item);
                        param.push(obj);
    
                    }
                }
                console.log(changed_item);
                //selected가 선택되어 있으면?? 걍 그대로 추가.
                if (data_ok === false)
                {
                    break;
                }
                
            }
            
            if (data_ok === true)
            {
                $.ajax({
                    url: func_url,
                    type: "post",
                    data: {
                        // param: [
                        //     // cu의 c는 insert, u는 update 구분을 위한 인자
                        //     {cu: "c", fact_cd: "winp01", op_cd: "A0005", op_nm: "op4", color_desc: "ffffff", dept_cd: "dept04", use_yn: "Y", remark: "r4"},
                        //     {cu: "u", fact_cd: "winp01", op_cd: "A0002", op_nm: "op22", color_desc: "ffffff", dept_cd: "dept0222", use_yn: "Y", remark: "r222"}
                        // ],
                        param: param,
                        cnct_btn: this.#getDBButtonID(this.Buttons.Save),
                        cnct_url: location.pathname
                    },
                    dataType: "json",
                    success: (data) =>
                    {
                        console.log(data, 'data');
                        this.EventFuncList.search();
                    },
                    error: (a, b, c) =>
                    {
                        console.log(a, 'a');
                        console.log(a.responseText, 'a');
                        console.log(b, 'b');
                        console.log(c, 'c');
                    }
                })
            }
        }
        // excel: ()=>{},
        // copy: ()=>{}
    };
    
    #gridAttr = "";
    
    get GridAttr() {return this.#gridAttr;};
    
    #gridAttrVal = "";
    
    get GridAttrVal() {return this.#gridAttrVal;};
    
    #frmAttrVal = "";
    
    get FormAttrValue() {return this.#frmAttrVal;}
    
    #frmAttr = "";
    
    get FormAttr() {return this.#frmAttr;}
    
    #selectionCheckField = "";
    
    get SelectionCheckField() {return this.#selectionCheckField;}
    
    #pkFields = "";
    
    get PkFields() {return this.#pkFields;}
    
    SetAjaxUrl(evt_html_id, ajax_rul)
    {
        //이벤트 등록되면 등록된 이벤트 추가하고, 참조 url처리..
        //여기서 등록 안하면 아예 초기화도 안한다.
        this.#setEventUrl(evt_html_id, PageManager.EventType.click, ajax_rul);
    }
    // //check
    #getGricCheckBoxInfoObject = (field_name)=>
    {
        let obj = undefined;
        for(let info_obj of this.#gridCheckBoxDataInfoList)
        {
            if(info_obj.fieldName === field_name)
            {
                obj = info_obj;
                break;
            }
        }
        return obj;
    };

    #gridCheckBoxRenderFunc = (record, index, col_index) =>
    {
        let html = "";
        let code = w2ui[this.GridAttrVal].getCellValue(index, col_index);
        let field_name = w2ui[this.GridAttrVal].columns[col_index].field;
        let info_obj = this.#getGricCheckBoxInfoObject(field_name);
        //
        html =  `<input type="checkbox" ${(code === info_obj.trueField) ? "checked" : ""}  \
        onclick = "\
        w2ui['${this.GridAttrVal}'].get('${record.recid}')['${field_name}'] = (this.checked) ? '${info_obj.trueField}' : '${info_obj.falseField}'; \
        w2ui['${this.GridAttrVal}'].records[${index}].w2ui =  w2ui['${this.GridAttrVal}'].records[${index}].w2ui || {}; \
        w2ui['${this.GridAttrVal}'].records[${index}].w2ui.changes =  w2ui['${this.GridAttrVal}'].records[${index}].w2ui.changes || {}; \
        w2ui['${this.GridAttrVal}'].records[${index}].w2ui.changes.${field_name} = (this.checked) ? '${info_obj.trueField}' : '${info_obj.falseField}';\
        ">`;
        // w2ui[this.GridAttrVal].get(record.recid).status = true
        return html;
        // return '<input type="checkbox" ' + (code === info_obj.trueField ? 'checked' : '') +
        // ' onclick = "var obj = w2ui[\\'\'+ this.name + \'\\']; obj.get(\'+ record.recid +\').status = this.checked;" +'>';
        // // function (record) {
        // //     return '<input type="checkbox" ' + (record.use_yn ? 'checked' : '') + ' disabled>';
        // // }
        
        //w2ui['grid'].mark
    };

    SetGridCheckRenderOption(field_name, true_field, false_field)
    {
        let obj = {};
        obj.fieldName = field_name;
        obj.trueField = true_field;
        obj.falseField = false_field;
        obj.renderFunc = this.#gridCheckBoxRenderFunc;
        this.#gridCheckBoxDataInfoList.push(obj);
    }

    InitGirdCheckBox()
    {
        for (let info_obj of this.#gridCheckBoxDataInfoList)
        {
            let col_idx = this.#getGridColumnIndexByName(info_obj.fieldName);
            w2ui[this.GridAttrVal].columns[col_idx].render = info_obj.renderFunc;
        }
    }
    
    //SelectBox 공통으로 사용하는 데이터 빌터
    #buildSelectBoxData = (arr_obj, value_field, text_field) =>
    {
        for (let item of arr_obj)
        {
            item.value = item[value_field];
            item.text = item[text_field];
        }
        return arr_obj;
    };
    
    //Form SelectBox 전용
    #fillFormSelectBox = (info_obj, selected_index = 0) =>
    {
        let itemTag = "select";
        info_obj.ajaxFunc(info_obj.ajaxArgs).then((res) =>
        {
            let arr_obj = res.data;
            let cmb = $(`${itemTag}[${info_obj.attr}="${info_obj.attrVal}"]`);
            cmb.empty();
            if (info_obj.defaultId !== undefined)
            {
                cmb.append($('<option>', {
                    value: info_obj.defaultId,
                    text: info_obj.defaultText
                }));
            }
            
            arr_obj = this.#buildSelectBoxData(arr_obj, info_obj.valueField, info_obj.textField);
            for (let item of arr_obj)
            {
                cmb.append($('<option>', item));
            }
            if (selected_index < cmb[0].length)
            {
                cmb.prop('selectedIndex', selected_index);
            }
        });
    };
    
    SetFormSelectBox(attr, attr_val, ajax_func, ajax_args, value_field, text_field, default_value = undefined, default_text = undefined)
    {
        let obj = {};
        obj.attr = attr;
        obj.attrVal = attr_val;
        obj.ajaxFunc = ajax_func;
        obj.ajaxArgs = ajax_args;
        obj.valueField = value_field;
        obj.textField = text_field;
        // obj.defaultSelectedIndex = default_selected_index;
        obj.defaultId = default_value;
        obj.defaultText = default_text;
        
        this.#frmSelectBoxDataInfoList.push(obj);
    }
    
    InitFormSelectBox()
    {
        for (let obj of this.#frmSelectBoxDataInfoList)
        {
            this.#fillFormSelectBox(obj);
        }
    };
    
    FillFormSelectBox(html_attr, html_attr_value, arg_obj, selected_index = 0)
    {
        for (let obj of this.#frmSelectBoxDataInfoList)
        {
            if (obj.attr === html_attr && obj.attrVal === html_attr_value)
            {
                let param = this.CloneObject(obj);
                param.ajaxArgs = arg_obj;
                this.#fillFormSelectBox(param, selected_index);
                break;
            }
        }
    }
    
    //Gird SelectBox 전용..
    #gridSelectBoxRenderFunc = (record, index, col_index) =>
    {
        let html = "";
        let code = w2ui[this.GridAttrVal].getCellValue(index, col_index);
        let cmb_data = w2ui[this.GridAttrVal].columns[col_index].editable.items;
        for (let item of cmb_data)
        {
            if (item.value === code)
            {
                html = item.text;
                break;
            }
        }
        return html;
    };
    #fillGridSelectBox = (info_obj) =>
    {
        info_obj.ajaxFunc(info_obj.ajaxArgs).then((res) =>
        {
            let arr_obj = res.data;
            arr_obj = this.#buildSelectBoxData(arr_obj, info_obj.valueField, info_obj.textField);
            let col_idx = this.#getGridColumnIndexByName(info_obj.fieldName);
            w2ui[this.GridAttrVal].columns[col_idx].editable.items = arr_obj;
            w2ui[this.GridAttrVal].columns[col_idx].render = info_obj.renderFunc;
        });
    };
    #getGridColumnIndexByName = (field_name) =>
    {
        let idx = 0;
        let col_idx = -1;
        for (let col of w2ui[this.GridAttrVal].columns)
        {
            if (col.field === field_name)
            {
                col_idx = idx;
                break;
            }
            idx++;
        }
        return col_idx;
    };
    
    SetGridSelectBox(field_name, ajax_func, ajax_args, value_field, text_field)
    {
        let obj = {};
        obj.fieldName = field_name;
        obj.ajaxFunc = ajax_func;
        obj.ajaxArgs = ajax_args;
        obj.valueField = value_field;
        obj.textField = text_field;
        obj.renderFunc = this.#gridSelectBoxRenderFunc;
        this.#gridSelectBoxDataInfoList.push(obj);
    }
    
    InitGridSelectBox()
    {
        for (let obj of this.#gridSelectBoxDataInfoList)
        {
            this.#fillGridSelectBox(obj);
        }
    }
    
    //이벤트 함수와 처리 php Url 을 가지고 있는 객체를 리턴한다.
    #getEventInfo = (evt_html_id, event_type) =>
    {
        //해당 객체가 없으면 초기화 해서 만든다..
        //console.log("SinglePageManager.#getEventInfo's this:",this);
        this.EventInfoList[evt_html_id] = this.EventInfoList[evt_html_id] || {};
        this.EventInfoList[evt_html_id][event_type] = this.EventInfoList[evt_html_id][event_type] || {};
        return this.EventInfoList[evt_html_id][event_type];
    };
    #setEventFunc = (evt_html_id, event_type, rest_url) =>
    {
        let evtObj = this.#getEventInfo(evt_html_id, event_type);
        evtObj.restUrl = rest_url;
        
        $(evt_html_id).on(event_type, rest_url);
        $(evt_html_id).off(event_type);
        $(evt_html_id).on(event_type, rest_url);
    };
    #setEventUrl = (evt_html_id, event_type, rest_url) =>
    {
        let evtObj = this.#getEventInfo(evt_html_id, event_type);
        evtObj.restUrl = rest_url;
    };
    #getLogParamString = (buttonID) =>
    {
        let log_param_string = "";
        //#hBtnB0001
        log_param_string += `&cnct_url="${location.pathname}"`;
        log_param_string += `&cnct_btn=${buttonID.substring(5)}`;
        return log_param_string;
    };
    #getDBButtonID = (buttonID) => {return buttonID.substring(5);}
    
    get EvtType() { return PageManager.EventType;}
    
    get Buttons() { return PageManager.PageButtons;}
    
    get EventFuncList() {return this.#evtFuncList;}
    
    
    //이하는 지금 의미 없고...
    SetHtmlEvent(evt_html_id, event_type, rest_url)
    {
        this.#setEventFunc(evt_html_id, event_type, rest_url);
    }
    
    SetHtmlEventFull(html_tag, html_attribute, html_attribute_value, event_type, rest_url)
    {
        $(`${html_tag}[${html_attribute}="${html_attribute_value}"]`).on(event_type, rest_url);
    }
    
    
}

$(function ()
{
    
    //항상 젤 위에서 호출...
    init_grid();
    
    //기본 버튼 펑션 등록...
    var pageManager = new SinglePageManager("id", "grid", "id", "search_frm",
        "selected", ["fact_cd", "op_cd"]);
    
    //버튼을 등록해야만 동작하게 변경필요
    //버튼에 대한 url 등록
    pageManager.SetAjaxUrl(PageManager.PageButtons.Search, "/ajax/base/product/get/opinfo");
    pageManager.SetAjaxUrl(PageManager.PageButtons.DeleteRow, "/ajax/base/product/delete/opinfo");
    pageManager.SetAjaxUrl(PageManager.PageButtons.Save, "/ajax/base/product/save/opinfo");
    // 디비 인터페이스 없는 것들은 url 등록할 필요 없다.
    // pageManager.SetAjaxUrl(PageManager.evtButtons.AddRow, "");
    // pageManager.SetAjaxUrl(PageManager.evtButtons.Initialize, "");
    
    //폼에 있는 콤보박스 정보 등록
    pageManager.SetFormSelectBox("name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm", "", "ALL");
    //default_value 가 없으면 콤보박스 기본값을 안 만든다.
    pageManager.SetFormSelectBox("name", "dept_cd", common.code, {up_cd: "dept_cd"}, "cd", "cd_nm", "", "ALL");
    //폼 콤보박스 전체 데이터 불러오기..
    pageManager.InitFormSelectBox();
    
    //콤보박스 다시 채워줄때 호출...부모 콤보박스가 변경될때 하위 콤보박스 데이터 변경이 생기면 사용
    //pageManager.FillFormSelectBox("name","fact_cd", {up_cd: "fact_cd"}, 1);
    
    //그리드 콤보박스 정보 등록
    pageManager.SetGridSelectBox("dept_cd", common.code, {up_cd: "dept_cd"}, "cd", "cd_nm");
    pageManager.SetGridSelectBox("fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //그리드 콤보박스 초기화
    pageManager.InitGridSelectBox();
    
    
    //그리드 체크박스 정보 등록
    pageManager.SetGridCheckRenderOption("use_yn","Y","N");

    //그리드 체크박스 초기화
    pageManager.InitGirdCheckBox();
});


function init_grid()
{
    $('#grid').w2grid({
        name: 'grid',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: false
        },
        // onClick:  function(args) {
        //     console.log(this);
        //     console.log(args);
        //
        //     },
        columns: [
            {
                field: 'recid',
                caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>',
                size: '50px',
                sortable: true,
                resizable: true,
                style: 'text-align: right'
            },
            {
                field: 'selected',
                caption: '선택',
                size: '100px',
                sortable: true,
                resizable: true,
                editable: {type: 'checkbox'}
            },
            {
                field: 'fact_cd',
                caption: '공장<i class="fa fa-sort" aria-hidden="true"></i>',
                size: '100px',
                sortable: true,
                resizable: true, //hidden:true,
                editable: {
                    type: 'select',
                    item: null
                },
                render: undefined
                //items: [{ value: '', text: '', cd: '', cd_nm: '' }].concat(dt_cmb_dept_cd)
                //},
                
                // onChange: function (event)
                // {
                //     console.log(event);
                // }
            },
            {
                field: 'op_cd',
                caption: '공정코드<i class="fa fa-sort" aria-hidden="true"></i>',
                size: '100px',
                sortable: true,
                resizable: true,
                editable: {
                    type: 'text',
                    maxLength: 5
                }//, hidden: true
            },
            {
                field: 'op_nm',
                caption: '공정명<i class="fa fa-sort" aria-hidden="true"></i>',
                size: '150px',
                sortable: true,
                resizable: true,
                editable: {type: 'text'}
            },
            {
                field: 'color_desc',
                caption: '색상<i class="fa fa-sort" aria-hidden="true"></i>',
                size: '150px',
                sortable: true,
                resizable: true,
                editable: {type: 'color'},
            },
            {
                field: 'dept_cd',
                caption: '관리부서<i class="fa fa-sort" aria-hidden="true"></i>',
                size: '100px',
                sortable: true,
                resizable: true, //hidden:true,
                editable: {
                    type: 'select',
                    item: null
                },
                render: undefined
                //items: [{ value: '', text: '', cd: '', cd_nm: '' }].concat(dt_cmb_dept_cd)
                //},
                
                // onChange: function (event)
                // {
                //     console.log(event);
                // }
            },
            {
                field: 'dept_nm',
                caption: '부서<i class="fa fa-sort" aria-hidden="true"></i>',
                size: '150px',
                sortable: true,
                resizable: true,
                hidden: true,
                editable: {type: 'text'}
            },
            {
                field: 'use_yn',
                caption: '사용여부',
                size: '100px',
                sortable: true,
                resizable: true,
                style: 'text-align: center',
                editable: {
                    type: 'checkbox',
                    style: 'text-align: center',
                },
                //render: undefined

                
                
            },
            {
                field: 'remark',
                caption: '비고<i class="fa fa-sort" aria-hidden="true"></i>',
                size: '200px',
                sortable: true,
                resizable: true,
                editable: {type: 'text'}
            },
            {
                field: 'inst_id',
                caption: '입력자ID<i class="fa fa-sort" aria-hidden="true"></i>',
                size: '100px',
                sortable: true,
                resizable: true,
                // editable: { type: 'text' }
            },
            {
                field: 'inst_dt',
                caption: '입력일시<i class="fa fa-sort" aria-hidden="true"></i>',
                size: '150px',
                sortable: true,
                resizable: true,
                style: 'text-align: center',
                // editable: { type: 'date' }
            },
            {
                field: 'updt_id',
                caption: '수정자ID<i class="fa fa-sort" aria-hidden="true"></i>',
                size: '100px',
                sortable: true,
                resizable: true,
                // editable: { type: 'text' }
            },
            {
                field: 'updt_dt',
                caption: '수정일시<i class="fa fa-sort" aria-hidden="true"></i>',
                size: '150px',
                sortable: true,
                resizable: true,
                style: 'text-align: center',
                // editable: { type: 'date' }
            }
        ],
        toolbar: {
            items: [
                {
                    id: 'add',
                    type: 'button',
                    caption: 'Add Record',
                    icon: 'w2ui-icon-plus'
                }
            ],
            // onClick: function (event) {
            //     if (event.target === 'add') {
            //         w2ui.grid.add({ recid: w2ui.grid.records.length + 1 });
            //     }
            // }
        },
        records: null
    });
}


