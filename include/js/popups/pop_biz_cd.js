
import {Const, W2UiHelper} from "/include/js/class/PageManager.js";
import PopupGridPageManager from "/include/js/class/PopupGridPageManager.js";

//팝업 버튼은 조회, 선택 입니당!!
export default class Pop_biz_cd extends PopupGridPageManager{

    constructor(caller_instance, parent_search_frm, popup_name = "pop_biz_cd") {
        //let popup_name = "pop_biz_cd";
        let search_frm_id = "pop_search_frm";
        let btn_frm_id = "pop_btn_frm";

        const popup_db_id = "pop_biz_cd";
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
                { field: 'cmpny_cd', caption: '회사', size: '100px', sortable: true, editable: { type: 'select'}},
                { field: 'biz_cd', caption: '출고처코드', size: '100px', sortable: true, editable: {type: 'text', maxlength: 20}},
                { field: 'biz_nm', caption: '출고처명', size: '150px', editable: { type: 'text', maxlength: 50 } },
                { field: 'biz_gbn', caption: '출고처구분', size: '20', sortable: true, resizable: true, editable: {type: 'select'}},
                { field: 'use_yn', caption: '사용여부', size: '100px', style: 'text-align: center', editable: { type: 'checkbox' }},
                { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 1000 }},
            ],
        };
        let content_html = {
            title: '거래처 코드',
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
                                        <!--<select class="" name="cmpny_cd">-->
                                        <!--<option value="">전체</option>-->
                                        <!--<option value="">선택1</option>-->
                                        <!--</select>-->
                                        <!--<i class="fa fa-caret-down" aria-hidden="true"></i>-->
                                </div>
                                <div class="boxW col-2 search">
                                    <p>거래처</p>
                                    <input type="text" name="biz_cd" value="">
                                    <input type="text" name="biz_nm">
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
                                    <div class="boxW col-2 select">
                                        <p>거래구분</p>
                                        <select class="" name="biz_gbn">
                                            <option value="">전체</option>
                                            <option value="">매입처</option>
                                            <option value="">매출처</option>
                                            <option value="">매입매출</option>
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
        //this.SetReturnField("biz_cd");
        this.AddLayout(layout_obj);

        this.frmManager.AddForm(search_frm_id);
        //this.frmManager.AddSelectBoxInfo(search_frm_id,"name","cmpny_cd", common.code, {up_cd: "cmpny_cd"}, "cd", "cd_nm");
        this.frmManager.AddSelectBoxInfo(search_frm_id,"name","biz_gbn", common.code, {up_cd: "biz_gbn"},"cd", "cd_nm", "", "전체");

        grid_obj = this.gridManager.AddGrid(grid_obj);
        this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.Search, "/ajax/base/sales/get/pop_biz_cd");
        //this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.DeleteRow, "/ajax/base/sales/delete/biz_mgt");
        //this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.Save, "/ajax/base/sales/save/biz_mgt");

        this.gridManager.AddSelectBoxInfo(grid_obj.name,"cmpny_cd", common.code, {up_cd: "cmpny_cd"},"cd", "cd_nm");
        this.gridManager.AddSelectBoxInfo(grid_obj.name, "biz_gbn", common.code, {up_cd: "biz_gbn"},"cd", "cd_nm");
        this.gridManager.AddCheckRenderOption(grid_obj.name, "use_yn", "Y", "N");

        grid_obj.onClick = () => {
            this.SetReturnValue(grid_obj.name);
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
        };

        PopupManager.RegisterPopup(popup_name, this);
    }



}
