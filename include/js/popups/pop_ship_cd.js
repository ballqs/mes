import {Const, W2UiHelper} from "/include/js/class/PageManager.js";
import PopupGridPageManager from "/include/js/class/PopupGridPageManager.js";

//팝업 버튼은 조회, 선택 입니당!!
export default class Pop_ship_cd extends PopupGridPageManager{

    constructor(caller_instance, parent_search_frm, popup_name = "pop_ship_cd") {
//         let popup_name = "pop_ship_cd";
        let search_frm_id = "pop_search_frm";
        let btn_frm_id = "pop_btn_frm";

        const popup_db_id = "pop_ship_cd";
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
                { field: 'cmpny_cd', caption: '회사', size: '100px', sortable: true, editable: { type: 'select'}},
                { field: 'biz_cd', caption: '출고처', size: '100px', sortable: true, editable: { type: 'text', maxLength: 20}},
                { field: 'biz_nm', caption: '출고처명', size: '150px', editable: { type: 'text', maxLength: 50}},
                { field: 'ship_cd', caption: '출고처현장코드', size: '100px', sortable: true, editable: { type: 'text', maxLength: 20}},
                { field: 'ship_nm', caption: '출고처현장명', size: '150px', editable: { type: 'text', maxLength: 50}},
                { field: 'biz_loc_nm', caption: '출고처위치', size: '200px', editable: { type: 'text', maxLength: 1000}},
                { field: 'use_yn', caption: '사용여부', size: '100px', style: 'text-align: center', editable: { type: 'checkbox'}},
                { field: 'remark', caption: '비고', size: '300px', editable: { type: 'text', maxLength: 1000}}
            ],
        };
        let content_html = {
            title: '출고처현장 코드',
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
                                    <p>회사</p>
                                        <input type="hidden" name="cmpny_cd">
                                        <input type="text" name="cmpny_cd_nm" disabled>
<!--                                    <select class="" name="cmpny_cd">-->
<!--                                        <option value="">전체</option>-->
<!--                                        <option value="">선택1</option>-->
<!--                                    </select>-->
                                </div>
                                <div class="boxW col-2 search">
                                    <p>출고처</p>
                                    <input type="text" name="biz_cd" value="" readonly>
                                    <input type="text" name="biz_nm" readonly>
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
                        </form>
                    </div>
                    <div id="${grid_obj.name}" style="position: absolute; left: 0; top: 148px; right: 0; bottom: 0;" class="b_b"></div>
                    `
            ,
            buttons:
                `<button class="w2ui-btn" onclick="w2popup.close();">닫기</button>`
        };


        this.SetContentHtml(content_html);
        //this.SetReturnField("ship_cd");
        this.AddLayout(layout_obj);

        this.frmManager.AddForm(search_frm_id);
        //this.frmManager.AddSelectBoxInfo(search_frm_id,"name","cmpny_cd", common.code, {up_cd: "cmpny_cd"}, "cd", "cd_nm");

        grid_obj = this.gridManager.AddGrid(grid_obj);
        this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.Search, "/ajax/base/sales/get/pop_ship_cd");

        this.gridManager.AddSelectBoxInfo(grid_obj.name,"cmpny_cd", common.code, {up_cd: "cmpny_cd"},"cd", "cd_nm");
        this.gridManager.AddCheckRenderOption(grid_obj.name, "use_yn", "Y", "N");

        grid_obj.onClick = () => {
            // // this.selected_row = w2ui[Const.SelectedGridID].records[event.recid - 1];

            // this.selected_row = W2UiHelper.GetSelectedRowOnClick(event, grid_obj.name);
            // // let recid;

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

            // // w2ui[this.grid_id].clear();
            // this.gridManager.ClearAll();
            // w2popup.close();

            this.SetReturnValue(grid_obj.name);
        };

        PopupManager.RegisterPopup(popup_name, this);
    }



}
