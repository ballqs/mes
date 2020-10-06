import {Const, W2UiHelper} from "/include/js/class/PageManager.js";
import PopupGridPageManager from "/include/js/class/PopupGridPageManager.js";

//팝업 버튼은 조회, 선택 입니당!!
export default class Pop_wrker_cd extends PopupGridPageManager{



    constructor(caller_instance, parent_search_frm,popup_name = "pop_wrker_cd") {
        let search_frm_id = "pop_search_frm";
        let btn_frm_id = "pop_btn_frm";

        const popup_db_id = "pop_wrker_cd";
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
                { field: 'emp_id', caption: '작업자코드', size: '100px', sortable: true},
                { field: 'emp_nm', caption: '작업자명', size: '150px', sortable: true},
                { field: 'wrk_gbn', caption: '업무구분', size: '100px', sortable: true, editable: { type: 'select'}},
                { field: 'remark', caption: '비고', size: '300px'},
            ],
        };
        let content_html = {
            title: '작업자 코드',
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
                                        <p>작업자</p>
                                        <input type="text" name="emp_id" value="">
                                        <input type="text" name="emp_nm">
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

        this.gridManager.SetAjaxUrl(grid_obj.name, Const.MesButton.Search, "/ajax/get/pop_wrker_cd");

        this.gridManager.AddSelectBoxInfo(grid_obj.name, "fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");
        this.gridManager.AddSelectBoxInfo(grid_obj.name, "wrk_gbn", common.code, {up_cd: "wrk_gbn"},"cd", "cd_nm");

        grid_obj.onClick = () => {

            this.SetReturnValue(grid_obj.name);
        };

        PopupManager.RegisterPopup(popup_name, this);
    }



}
