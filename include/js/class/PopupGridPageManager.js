import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";

export default class PopupGridPageManager extends GridPageManager{

    PopupName;  //멤버변수 #를 붙이면 pravite 안붙이면 public
    #popup_db_id;
    constructor(popup_name, search_frm_id, btn_frm_id, caller_class_instance, parent_search_frm, popup_db_id) {
        super(search_frm_id, btn_frm_id);
        this.PopupName = popup_name;
        this.CallerInstance = caller_class_instance;
        this.parent_search_frm = parent_search_frm;
        this.#popup_db_id = popup_db_id;
        // this.callbackFnc = {};
    }
    parent_search_frm;
    // return_field;
    #content_html;
    #previous_grid;
    called_by_form = false;
    selected_row;
    Layout;
    GridTarget;
    FormTarget;
    CallerInstance;
    FormTags={};
    GridTags={};
    GridTags2={};
    preFnc = function(){ return true; };
    callbackFnc={};

    AddParentReferFormTag( popup_tag_name = [], parent_tag_name = [])    {
        for(let i=0; i < popup_tag_name.length; i++){
            this.FormTags[popup_tag_name[i]] = parent_tag_name[i];
        }
    }

    AddParentReferGridTag( popup_tag_name = [], parent_tag_name = [])    {
        for(let i=0; i < popup_tag_name.length; i++){
            this.GridTags2[popup_tag_name[i]] = parent_tag_name[i];
        }
    }

    //jsh 20200702 AddTargetColumnsOnPopupClose
    AddTargetColumnsOnPopupClose(popup_tag_name = [], parent_tag_name = []){
        for(let i=0; i < popup_tag_name.length; i++){
            this.GridTags[popup_tag_name[i]] = parent_tag_name[i];

        }
    }

    RegisterCallbackFunction(callbackFnc){
        /*
        callbackFnc 형태 :
        { pre : function(){}, post : function(){} }
        */
        this.callbackFnc = callbackFnc;
    }

    RegisterPreFunction(preFnc){
        /*
        불린 값을 리턴해야만 한다.
        */
        this.preFnc = preFnc;
    }

    SetContentHtml(content_html){
        this.#content_html = content_html;
        this.#content_html.onOpen = (event)=>{
            event.onComplete = (event)=>{
                // $(`#w2ui-popup #${this.grid_id}`).w2render(this.#layout_config.name);
                // w2ui[this.#layout_config.name].content('left', w2ui[this.#grid_config.name]);
                this.#previous_grid = Const.SelectedGridID;
                for(let grid_name in this.gridManager.GridList) {
                    w2ui[this.Layout.name].content('main', w2ui[grid_name]);
                }
                this.InitializePopup();
                // w2ui[this.grid_id].clear();
            };
        };
        this.#content_html.onClose = (event) =>{
            event.onComplete = (event)=>{
                Const.SelectedGridID = this.#previous_grid;
                this.gridManager.ClearAll();
            }
        }
    }
    AddLayout(layout_obj) {
        this.Layout = $().w2layout(layout_obj);
    }
    // SetReturnField(return_field) {
    //     this.return_field = return_field;
    // }
    InitializePopup = ()=> {
        //버튼 불러오기..
//         ScriptHelper.AjaxCall("/ajax/get/btns", Const.AjaxMethod.GET, {path:location.pathname})

        ScriptHelper.AjaxCall("/ajax/get/popup_btns", Const.AjaxMethod.GET, {popup_id:this.#popup_db_id})
            .then((res)=>{
                if (this.callbackFnc.pre !== undefined) {
                    this.callbackFnc.pre(res);
                }

                let html = "";
                for (let btn_info of res.data) {
                    html += `<a class='bt' name="hBtn${btn_info.btn_id}">${btn_info.btn_nm}</a>`;
                }
                $(`#${this.btn_frm_id} > div`).html(html);

                this.BindButtonFunction();
                this.InitializeComponent();

                if (this.GridTarget === undefined) {
                    //Parent 폼에서 태그값 받아와서 팝업폼에 넣기.
                    for (const popup_tag_name in this.FormTags) {
                        let popup_frm_id = this.search_frm_id;
                        let parent_tag_name = this.FormTags[popup_tag_name];
                        let parent_frm_id = this.parent_search_frm;

                        // if (popup_tag_name === "cmpny_cd") {  // 회사명은 하나뿐이라 Const.config에서 관리
                        //     $("#" + popup_frm_id + " [name='" + popup_tag_name + "']")[0].value = Const.config.cmpny_cd;
                        //     $("#" + popup_frm_id + " [name='" + popup_tag_name + "_nm']")[0].value = Const.config.cmpny_cd_nm;
                        //     continue;
                        // }

                        let parent_tag = $("#" + this.parent_search_frm + " [name='" + parent_tag_name + "']")[0];
                        let parent_tag_type = parent_tag.tagName;

                        $("#" + popup_frm_id + " [name='" + popup_tag_name + "']")[0].value = parent_tag.value;

                        if (parent_tag.value === '') {
                            $("#" + popup_frm_id + " [name='" + popup_tag_name + "']").prop("disabled", false);
                        }

                        if (parent_tag_type === "SELECT") {
                            $("#" + popup_frm_id + " [name='" + popup_tag_name + "_nm']")[0].value = $(`#${parent_frm_id} [name="${parent_tag_name}"] option:selected`).text();
                        }

                        if (popup_tag_name === "cmpny_cd") {
                            let param = {up_cd: "cmpny_cd"};
                            common.code(param).then((res) => {
                                console.log(res);
                                $("#" + popup_frm_id + " [name='" + popup_tag_name + "']")[0].value = res.data[0].cd;
                                $("#" + popup_frm_id + " [name='" + popup_tag_name + "_nm']")[0].value = res.data[0].cd_nm;
                            });
                        }
                    }
                } else {
                    for (const popup_tag_name in this.GridTags2) {
                        let popup_frm_id = this.search_frm_id;
                        let parent_tag_name = this.GridTags2[popup_tag_name];

                        // if (popup_tag_name === "cmpny_cd") {  // 회사명은 하나뿐이라 Const.config에서 관리
                        //     $("#" + popup_frm_id + " [name='" + popup_tag_name + "']")[0].value = Const.config.cmpny_cd;
                        //     $("#" + popup_frm_id + " [name='" + popup_tag_name + "_nm']")[0].value = Const.config.cmpny_cd_nm;
                        //     continue;
                        // }

                        let grid_id = this.GridTarget.grid;
                        let row = this.GridTarget.row;
                        let col = this.GridTarget.col;

                        let field_data;

                        if (w2ui[grid_id].records[row]["w2ui"] !== undefined) {
                            if (w2ui[grid_id].records[row]["w2ui"]["changes"][parent_tag_name] !== undefined) {
                                field_data = w2ui[grid_id].records[row]["w2ui"]["changes"][parent_tag_name];
                            } else {
                                field_data = w2ui[grid_id].records[row][parent_tag_name];
                            }
                        } else {
                            field_data = w2ui[grid_id].records[row][parent_tag_name];
                        }

                        $("#" + popup_frm_id + " [name='" + popup_tag_name + "']")[0].value = field_data;

                        if (field_data === '' || field_data === undefined) {
                            $("#" + popup_frm_id + " [name='" + popup_tag_name + "']")[0].value = null;
                            $("#" + popup_frm_id + " [name='" + popup_tag_name + "']").prop("readonly", false);
                        }

                        // let obj = {
                        //     attr: "name",
                        //     attrVal: "fact_cd",
                        //     ajaxFunc: common.code,
                        //     ajaxArgs: {up_cd: "fact_cd"},
                        //     valueField: "cd",
                        //     textField: "cd_nm",
                        //     defaultId: undefined,
                        //     defaultText: undefined
                        // };

                        if (popup_tag_name === "fact_cd") {
                            let param = {up_cd: "fact_cd", cd: field_data};
                            common.code(param).then((res) => {
                                console.log(res);
                                $("#" + popup_frm_id + " [name='" + popup_tag_name + "_nm']")[0].value = res.data[0].cd_nm;
                            });
                        }

                        if (popup_tag_name === "cmpny_cd") {
                            let param = {up_cd: "cmpny_cd"};
                            common.code(param).then((res) => {
                                console.log(res);
                                $("#" + popup_frm_id + " [name='" + popup_tag_name + "']")[0].value = res.data[0].cd;
                                $("#" + popup_frm_id + " [name='" + popup_tag_name + "_nm']")[0].value = res.data[0].cd_nm;
                            });
                        }


                    }
                }

                if (this.callbackFnc.post !== undefined) {
                    this.callbackFnc.post(res);
                }
                Const.SelectedGridID = Object.getOwnPropertyNames(this.gridManager.GridList)[0];

            });
    };



    // get LayoutName() {return this.PopupName + "_layout"};


    Set
    #showPopUp = ()=>{
        if (this.preFnc()) {
            w2popup.open(this.#content_html);
        }
    };

    // Show(grid_id, frm_id, selected_row_index, selected_col_idx){
    ShowFormDialog = ()=>{
        this.called_by_form = true;

        // let form_id = undefined;
        // for(const tag of event.path) {
        //     if("FORM" === $(tag).prop("tagName")) {
        //         form_id = tag.id;
        //         break;
        //     }
        // }

        let form_id = this.parent_search_frm;
        let caller_html_name;
        for(const tag of event.path) {
            if(tag.name !== undefined) {
                caller_html_name = tag.name;
                break;
            }
        }
        this.FormTarget = this.CallerInstance.frmManager.FrmList[form_id].PopupInfoList.find(element => element.html_name === caller_html_name);
        //disable modal
        this.#content_html && (this.#content_html.modal = true);
        // this.#showPopUp(grid_id, frm_id, selected_row_index, selected_col_idx);
        this.#showPopUp();
    };
    ShowGridDialog=(grid_id, selected_row_index, selected_col_idx) =>{
        //ShowDialog(){
        //enable modal

        if(w2ui[grid_id].hasOwnProperty("fncPrePopupOff") && typeof w2ui[grid_id].fncPrePopupOff == "function"){
            if(!w2ui[grid_id].fncPrePopupOff(grid_id,selected_row_index,selected_col_idx).result){
                return false;
            };
        }

        this.called_by_form = false;
        this.GridTarget = {
            grid: grid_id,
            row: selected_row_index,
            col: selected_col_idx
        };
        this.#content_html && (this.#content_html.modal = true);
        let target = event.path[2].innerText;
        this.#showPopUp(event, target);
    };

    SetReturnValue(grid_id) {
        this.selected_row = W2UiHelper.GetSelectedRowOnClick(event, grid_id);
        if (this.called_by_form) {
            let target;
            let target_name = this.FormTarget.target_name;
            if(this.FormTarget.from_name !== undefined && this.FormTarget.from_name.length > 0 && this.FormTarget.from_name.length == target_name.length){
                for(let key in target_name){
                    target = $(`#${this.FormTarget.frm_id} [name="${target_name[key]}"]`);
                    target.val(this.selected_row[this.FormTarget.from_name[key]]).trigger('input');
                }
            }else{
                for(let key in target_name){
                    target = $(`#${this.FormTarget.frm_id} [name="${target_name[key]}"]`);
                    target.val(this.selected_row[target_name[key]]).trigger('input');
                }
            }

        } else {
            let parent_grid_obj = w2ui[this.GridTarget.grid];
            let parent_row_index = this.GridTarget.row;
            // let field_name = parent_grid_obj.columns[this.GridTarget.col].field;
            for(const popup_tag in this.GridTags){
                // console.log(popup_tag);
                W2UiHelper.SetCellValue(parent_grid_obj, parent_row_index, this.GridTags[popup_tag], this.selected_row[popup_tag]);
            }


            // W2UiHelper.SetCellValue(parent_grid_obj, this.GridTarget.row, field_name, this.selected_row[this.return_field]);
            w2ui[this.GridTarget.grid].refresh();
        }


        w2popup.close();
    }
}