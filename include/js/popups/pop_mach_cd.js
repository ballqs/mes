import {Const, W2UiHelper} from "/include/js/class/PageManager.js";
import PopupGridPageManager from "/include/js/class/PopupGridPageManager.js";
//import pop_wrkctr_cd from "/include/js/popups/pop_wrkctr_cd.js";

//팝업 버튼은 조회, 선택 입니당!!
export default class Pop_mach_cd extends PopupGridPageManager{

    constructor(caller_instance, parent_search_frm, popup_name = "pop_mach_cd") {
        //let popup_name = "pop_mach_cd";
        let search_frm_id = "pop_search_frm";
        let btn_frm_id = "pop_btn_frm";

        const popup_db_id = "pop_mach_cd";
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
                //select
                { field: 'fact_cd', caption: '공장', size: '150px', sortable: true, editable: { type: 'select'}},
                { field: 'mach_cd', caption: '설비', size: '100px', sortable: true, editable: { type: 'text', maxLength: 20}},
                { field: 'mach_nm', caption: '설비 명', size: '150px', editable: { type: 'text', maxLength: 50}},
                //checkbox
                { field: 'use_yn', caption: '사용여부', size: '100px', editable: { type: 'checkbox'}},
                { field: 'remark', caption: '비고', size: '300px', editable: { type: 'text', maxLength: 1000}}
            ],
        };
        let content_html = {
            title: '설비 코드',
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
                                    <input type="hidden" name="fact_cd">
                                    <input type="text" name="fact_cd_nm" disabled>
<!--                                    <select class="" name="fact_cd">-->
<!--                                        <option value="">전체</option>-->
<!--                                        <option value="">선택1</option>-->
<!--                                    </select>-->
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
                                    <div class="boxW col-2 search">
                                        <p>설비</p>
                                        <input type="text" name="mach_cd" value="">
                                        <input type="text" name="mach_nm">
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
        //this.SetReturnField("mach_cd");
        this.AddLayout(layout_obj);

        this.frmManager.AddForm(search_frm_id);
        //this.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

        grid_obj = this.gridManager.AddGrid(grid_obj);

        this.gridManager.AddCheckRenderOption(grid_obj.name, "use_yn", "Y", "N");

        this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.Search, "/ajax/base/product/get/pop_mach_cd");
        //this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.DeleteRow, "/ajax/base/product/delete/pop_mach_cd");
        //this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.Save, "/ajax/base/product/save/pop_mach_cd");

        this.gridManager.AddSelectBoxInfo(grid_obj.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

        //this.gridManager.AddCheckRenderOption(grid_obj.name,"use_yn", "Y", "N");


        /*
        2020 - 06 - 17 - 11:45
        let pop_wrkctr_cd = new pop_wrkctr_cd(pageManager, "search_frm");
        pop_wrkctr_cd.AddParentReferFormTag("fact_cd","fact_cd");

        let caller_name = "pop_wrkctr_cd";
        let target_name = "wrkctr_nm";
        this.frmManager.AddPopupLink(search_frm_id, caller_name, pop_wrkctr_cd.ShowFormDialog, target_name);
        */

        grid_obj.onClick = () => {

            this.SetReturnValue(grid_obj.name);
        };

        PopupManager.RegisterPopup(popup_name, this);
    }



}
