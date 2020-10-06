import {Const, W2UiHelper} from "/include/js/class/PageManager.js";
import PopupGridPageManager from "/include/js/class/PopupGridPageManager.js";
//import pop_op_cd from "./pop_op_cd";

export default class Pop_prt_nbr_cd extends PopupGridPageManager{


    //jsh 20200803
    constructor(caller_instance, parent_search_frm, popup_name = "pop_prt_nbr_cd", add_condition = undefined) {
    //constructor(caller_instance, parent_search_frm) {
        //let popup_name = "pop_prt_nbr_cd";
        let search_frm_id = "pop_search_frm";
        let btn_frm_id = "pop_btn_frm";

        //jsh 20200803
        const popup_db_id = "pop_prt_nbr_cd";
        super(popup_name, search_frm_id, btn_frm_id, caller_instance, parent_search_frm, popup_db_id);

        let layout_obj = {
            name: W2UiHelper.GetPopUpLayoutName(popup_name),
            padding: 4,
            panels: [
                {type: 'left', size: '0%', resizable: true},
                {type: 'main', size: '100%', resizable: true},
            ]
        };
        let grid_obj = {
            name: W2UiHelper.GetPopUpGridName(popup_name),
            columns: [
                {field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number',},
                {field: 'fact_cd', caption: '공장코드', size: '150px', sortable: true, resizable: true, hidden: false, editable: {type: 'select'}},
                {field: 'fact_nm', caption: '공장명', size: '200px', sortable: true, resizable: true, hidden: true},
                {field: 'prt_nbr_cd', caption: '품번코드', size: '150px', sortable: true, resizable: true},
                {field: 'prt_nbr_nm', caption: '품번명', size: '200px', sortable: true, resizable: true},
                {field: 'spec', caption: '규격', size: '150px', sortable: true, resizable: true},
                {field: 'account_type', caption: '계정유형', size: '150px', sortable: true, resizable: true, editable: {type: 'select'}},
                {field: 'account_type_nm', caption: '계정유형명', size: '150px', sortable: true, resizable: true, hidden: true},
                {field: 'base_unit', caption: '기준단위', size: '150px', sortable: true, resizable: true, hidden: true},
                {field: 'base_unit_nm', caption: '기준단위', size: '150px', sortable: true, resizable: true, hidden: true},
            ],
        };
        let content_html = {
            title: '품번 코드',
            width: 900,
            height: 900,
            showMax: true,
            body: `
                    <div class="popWrap mb_10">
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
                                    <div class="boxW col-2 select">
                                        <p>계정유형</p>
                                        <select class="" name="account_type">
                                            <option value="">전체</option>
                                            <option value="">선택1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="searchLine">
                                    <div class="boxW col-2 search">
                                        <p>품번코드</p>
                                        <input type="text" name="prt_nbr_cd" value="">
                                    </div>
                                    <div class="boxW col-2 search">
                                        <p>품명</p>
                                        <input type="text" name="prt_nbr_nm" value="">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div id="${grid_obj.name}" style="position: absolute; height: 620px; left: 0; top: 148px; right: 0; bottom: 0;" class="b_b"></div>
                    `
            ,
            buttons:
                `<button class="w2ui-btn" onclick="w2popup.close();">닫기</button>`
        };


        this.SetContentHtml(content_html);
        //this.SetReturnField("prt_nbr_cd");
        this.AddLayout(layout_obj);

        this.frmManager.AddForm(search_frm_id);
        // this.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
        //콤보박스 등록
        if(add_condition !== undefined){
            this.frmManager.AddSelectBoxInfo(search_frm_id,"name","account_type", common.code, {up_cd: "account_type",cd : add_condition["cd"]}, "cd", "cd_nm");
        }else{
            this.frmManager.AddSelectBoxInfo(search_frm_id,"name","account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm", "", "전체");
        }
        // this.gridManager.AddSelectBoxInfo(grid01.name,"account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm");

        grid_obj = this.gridManager.AddGrid(grid_obj);
        this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.Search, "/ajax/base/standard/get/part_nbr_mgt");
        //콤보박스 렌더 정보 등록
        this.gridManager.AddSelectBoxInfo(grid_obj.name,"account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm");
        // this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.DeleteRow, "/ajax/base/standard/delete/wrhs_loc");
        // this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.Save, "/ajax/base/standard/save/wrhs_loc");
        this.gridManager.AddSelectBoxInfo(grid_obj.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
        grid_obj.onClick = () => {
            this.SetReturnValue(grid_obj.name);
            // // this.selected_row = w2ui[Const.SelectedGridID].records[event.recid - 1];
            // console.log('search_frm_id', search_frm_id);
            // this.selected_row = W2UiHelper.GetSelectedRowOnClick(event, grid_obj.name);
            // // let recid;
            //
            // if (this.called_by_form) {
            //     // let target = this.frmManager.Forms[]
            //     let target = $(`#${this.FormTarget.frm_id} [name="${this.FormTarget.target_name}"]`);
            //     target.val(this.selected_row[this.return_field]);
            // } else {
            //     //let grid_obj = w2ui[this.GridTarget.grid];
            //     let field_name = grid_obj.columns[this.GridTarget.col].field;
            //     W2UiHelper.SetCellValue(grid_obj, this.GridTarget.row, field_name, this.selected_row[this.return_field]);
            //     w2ui[this.GridTarget.grid].refresh();
            // }
            //
            // // w2ui[this.grid_id].clear();
            // this.gridManager.ClearAll();
            // w2popup.close();
        };

        PopupManager.RegisterPopup(popup_name, this);
    }



}
