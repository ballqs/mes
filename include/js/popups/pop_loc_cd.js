import {Const, W2UiHelper} from "/include/js/class/PageManager.js";
import PopupGridPageManager from "/include/js/class/PopupGridPageManager.js";

//팝업 버튼은 조회, 선택 입니당!!
export default class Pop_loc_cd extends PopupGridPageManager{



    constructor(caller_instance, parent_search_frm, popup_name = "pop_loc_cd") {
        //let popup_name = "pop_loc_cd";
        let search_frm_id = "pop_search_frm";
        let btn_frm_id = "pop_btn_frm";

        const popup_db_id = "pop_loc_cd";
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
                { field: 'loc_cd', caption: '위치코드', size: '100px', sortable: true, editable: { type: 'text', maxLength: 20}},
                { field: 'loc_nm', caption: '위치명', size: '150px', editable: { type: 'text', maxLength: 50}},
                { field: 'use_yn', caption: '사용여부', size: '100px', editable: { type: 'checkbox'}},
                { field: 'remark', caption: '비고', size: '300px', editable: { type: 'text', maxLength: 1000}}
            ],
        };
        let content_html = {
            title: '위치 코드',
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
<!--                                    <select class="" name="account_type">-->
<!--                                        <option value="">전체</option>-->
<!--                                        <option value="">1공장</option>-->
<!--                                    </select>-->
                                </div>
                                <div class="boxW col-2 search">
                                    <p>창고</p>
                                    <input type="text" name="whs_cd" value="" readonly>
                                    <input type="text" name="whs_nm" readonly>
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
                                    <p>위치</p>
                                    <input type="text" name="loc_cd" value="">
                                    <input type="text" name="loc_nm" value="">
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
        //this.SetRetrnField("loc_cd");
        this.AddLayout(layout_obj);

        this.frmManager.AddForm(search_frm_id);
        //this.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

        grid_obj = this.gridManager.AddGrid(grid_obj);
        this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.Search, "/ajax/stock/stck_staus/get/pop_loc_cd");
        // this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.DeleteRow, "/ajax/stock/delete/pop_loc_cd");
        // this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.Save, "/ajax/stock/save/pop_loc_cd");

        this.gridManager.AddSelectBoxInfo(grid_obj.name,"fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");
        this.gridManager.AddCheckRenderOption(grid_obj.name,"use_yn", "Y", "N");


        grid_obj.onClick = () => {
            this.SetReturnValue(grid_obj.name);
        };

        PopupManager.RegisterPopup(popup_name, this);
    }



}
