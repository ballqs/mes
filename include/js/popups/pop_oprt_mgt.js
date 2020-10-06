import {Const, W2UiHelper} from "/include/js/class/PageManager.js";
import PopupGridPageManager from "/include/js/class/PopupGridPageManager.js";

export default class Pop_oprt_mgt extends PopupGridPageManager{

    constructor(caller_instance) {
        let popup_name = "pop_oprt_mgt";
        let search_frm_id = "pop_search_frm";
        let btn_frm_id = "pop_btn_frm";
        super(popup_name, search_frm_id, btn_frm_id, caller_instance);
        let layout_obj = {
            name: W2UiHelper.GetPopUpLayoutName(popup_name),
            padding: 4,
            panels: [
                {type: 'left', size: '0%', resizable: true},
                {type: 'main', size: '100%', resizable: true},
            ]
        };
        let grid_obj = {
            name: W2UiHelper.GetPopUpGridName("pop_wrhs_mgt"),
            columns: [
                {field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
                {field: 'selected', caption: '선택', size: '100px', sortable: true, resizable: true, editable: {type: 'checkbox'}},
                {field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, /*hidden:true,*/ editable: {type: 'select',},},
                {field: 'op_cd', caption: '공정코드', size: '100px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 20}/*, hidden: true*/},
                {field: 'op_nm', caption: '공정', size: '150px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 50},},
                {field: 'color_desc', caption: '색상', size: '150px', sortable: true, resizable: true, editable: {type: 'color'},},
                {field: 'dept_cd', caption: '관리부서', size: '100px', sortable: true, resizable: true, /*hidden:true,*/ editable: { type: 'select'},},
                {field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: {type: 'checkbox', style: 'text-align: center',}},
                {field: 'remark', caption: '비고', size: '200px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 1000}},
                {field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true,/* editable: { type: 'text' }*/},
                {field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center',/* editable: { type: 'date' }*/},
                {field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true,/* editable: { type: 'text' }*/},
                {field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center',/* editable: { type: 'date' }*/}
            ],
        };
        let content_html = {
            title: '창고 코드',
            width: 900,
            height: 900,
            showMax: true,
            body: `
                    <div class="popWrap">
                        <form id="${btn_frm_id}">
                            <div class="popBtWrap cf"> </div>
                        </form>
                        <form id="${search_frm_id}">
                            <div class="popSearch">
                            <div class="searchLine">
                                <div class="boxW col-2 search">
                                    <p>공장</p>
                                    <input type="hidden" name="fact_cd" value="">
                                    <input type="text" name="fact_cd_nm" value="" disabled>
                                </div>
                                <div class="boxW col-2 search">
                                    <p>공정</p>
                                    <input type="hidden" name="op_cd" value="">
                                    <input type="text" name="op_nm" value="" disabled>
                                </div>
                        </form>
                    </div>
                    <div id="${grid_obj.name}" style="position: absolute; left: 0; top: 148px; right: 0; bottom: 0;" class="b_b"></div>
                    `
            ,
            buttons:
                `<button class="w2ui-btn" onclick="w2popup.close();">닫기</button>`
        };


        this.SetContentHtml(content_html);
        //this.SetReturnField("op_nm");
        this.AddLayout(layout_obj);

        this.frmManager.AddForm(search_frm_id);
        this.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

        grid_obj = this.gridManager.AddGrid(grid_obj);
        this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.Search, "/ajax/base/standard/get/wrhs_loc");
        this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.DeleteRow, "/ajax/base/standard/delete/wrhs_loc");
        this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.Save, "/ajax/base/standard/save/wrhs_loc");
        grid_obj.onClick = () => {
            this.SetReturnValue(grid_obj.name);
            // // this.selected_row = w2ui[Const.SelectedGridID].records[event.recid - 1];
            // let recid;
            // for(const tag of event.path) {
            //     if("TR" === $(tag).prop("tagName")) {
            //         //form_id = tag.id;
            //         this.selected_row = w2ui[Const.SelectedGridID].records[$(tag).attr("recid") - 1];
            //         break;
            //     }
            // }
            // //this.selected_row = w2ui[Const.SelectedGridID].records[$(event.path[2]).attr("recid") - 1];

            // if (this.called_by_form) {
            //     // let target = this.frmManager.Forms[]
            //     let target = $(`#${this.FormTarget.frm_id} [name="${this.FormTarget.target_name}"]`);
            //     target.val(this.selected_row[this.return_field]);
            // } else {
            //     let grid_obj = w2ui[this.GridTarget.grid];
            //     let field_name = grid_obj.columns[this.GridTarget.col].field;
            //     W2UiHelper.SetCellValue(grid_obj, this.GridTarget.row, field_name, this.selected_row[this.return_field]);
            //     w2ui[this.GridTarget.grid].refresh();
            // }

            // // w2ui[this.grid_id].clear();
            // this.gridManager.ClearAll();
            // w2popup.close();
        };

        PopupManager.RegisterPopup(popup_name, this);
    }



}
