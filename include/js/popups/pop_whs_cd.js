import {Const, W2UiHelper} from "/include/js/class/PageManager.js";
import PopupGridPageManager from "/include/js/class/PopupGridPageManager.js";

//팝업 버튼은 조회, 선택 입니당!!
export default class Pop_whs_cd extends PopupGridPageManager{



    constructor(caller_instance, parent_search_frm,popup_name = "pop_whs_cd") {
        //let popup_name = "pop_whs_cd";
        let search_frm_id = "pop_search_frm";
        let btn_frm_id = "pop_btn_frm";

        const popup_db_id = "pop_whs_cd";
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
                { field: 'recid', caption: 'NO', size: '50px', sortable: true, style: 'text-align: right'},
                // { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
                { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, editable: { type: 'select'}},
                { field: 'whs_cd', caption: '창고코드', size: '100px', sortable: true, editable: { type: 'text', maxLength: 20}},
                { field: 'whs_nm', caption: '창고명', size: '150px', editable: { type: 'text', maxLength: 50}},
                { field: 'use_yn', caption: '사용여부', size: '100px', editable: { type: 'checkbox'}},
                { field: 'remark', caption: '비고', size: '300px', editable: { type: 'text', maxLength: 1000}}
            ],
        };
        let content_html = {
            title: '창고 코드',
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
                                    <div class="boxW col-2 search">
                                        <p>창고</p>
                                        <input type="text" name="whs_cd" value="">
                                        <input type="text" name="whs_nm">
                                    </div>
                                </div>
                                <div class="searchLine">
                                    <div class="boxW col-2 select">
                                        <p>사용여부</p>
                                        <select class="" name="use_yn">
                                            <option value="">전체</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>
                                        </select>
                                    </div>
                                </div>
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
        // this.SetReturnField("whs_cd");
        this.AddLayout(layout_obj);

        this.frmManager.AddForm(search_frm_id);
        //this.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

        grid_obj = this.gridManager.AddGrid(grid_obj);
        this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.Search, "/ajax/base/standard/get/wrhs_loc");
        this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.DeleteRow, "/ajax/base/standard/delete/wrhs_loc");
        this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.Save, "/ajax/base/standard/save/wrhs_loc");

        this.gridManager.AddSelectBoxInfo(grid_obj.name, "fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");
        this.gridManager.AddCheckRenderOption(grid_obj.name,"use_yn", "Y", "N");

        grid_obj.onClick = () => {
            // this.selected_row = w2ui[Const.SelectedGridID].records[event.recid - 1];

            //this.selected_row = W2UiHelper.GetSelectedRowOnClick(event, grid_obj.name);
            // let recid;

            this.SetReturnValue(grid_obj.name);

            // w2ui[this.grid_id].clear();
            // this.gridManager.ClearAll();
            // w2popup.close();
        };

        PopupManager.RegisterPopup(popup_name, this);
    }



}
