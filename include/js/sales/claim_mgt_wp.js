import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_biz_cd from "/include/js/popups/pop_biz_cd.js";
import Pop_ship_cd from "/include/js/popups/pop_ship_cd.js";

$(function () {

    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: {type: 'checkbox'}},
            { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'seqno', caption: '일련번호', size: '100px', sortable: true, resizable: true, attr:'align=right'},
            { field: 'claim_dt', caption: '클레임일자', size: '100px', sortable: true, resizable: true, editable: { type: 'date' },style: 'text-align: center'},
            { field: 'biz_cd', caption: '출고처코드', size: '100px', sortable: true, resizable: true},
            { field: 'biz_nm', caption: '출고처명', size: '150px', sortable: true, resizable: true},
            { field: 'ship_cd', caption: '출고처현장코드(popup)', size: '150px', sortable: true, resizable: true},
            { field: 'ship_nm', caption: '출고처현장명', size: '100px', sortable: true, resizable: true},
            { field: 'claim_qty', caption: '클레임수량', size: '100px', sortable: true, resizable: true, editable: { type: 'text' },style: 'text-align: right'},
            //select
            { field: 'claim_unit', caption: '클레임단위', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'claim_reasn_cd', caption: '클레임사유코드', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'claim_reasn_remark', caption: '클레임상세내용', size: '300px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'updt_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true},
            { field: 'updt_dt', caption: '입력일시', size: '100px', sortable: true, resizable: true},
        ],
    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);
    let pop_biz_cd = new Pop_biz_cd(pageManager, search_frm_id);
    let pop_ship_cd = new Pop_ship_cd(pageManager, search_frm_id);
    pop_biz_cd.AddParentReferFormTag(["cmpny_cd"],["cmpny_cd"]);
    pop_ship_cd.AddParentReferFormTag(["cmpny_cd","biz_cd","biz_nm"],["cmpny_cd","biz_cd","biz_nm"]);
    pop_ship_cd.AddTargetColumnsOnPopupClose(["biz_cd","biz_nm", "ship_cd","ship_nm"], ["biz_cd","biz_nm", "ship_cd","ship_nm"]);
    //그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);
    //팝업 등록
    pageManager.gridManager.AddPopUpOption(grid01.name,"ship_cd", pop_ship_cd.PopupName);
    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");
    //필수입력
    pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["claim_reasn_cd"]);
    pageManager.gridManager.SetAIField(grid01.name,  ["seqno"]);
    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/sales/get/claim_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/sales/delete/claim_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/sales/save/claim_mgt");
    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"claim_reasn_cd", common.code, {up_cd: "claim_reasn_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"claim_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");
    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","cmpny_cd", common.code, {up_cd: "cmpny_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //폼 팝업 등록
    let caller_name1 = "pop_biz_cd";
    let target_name1 = ["biz_cd","biz_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name1, pop_biz_cd.ShowFormDialog, target_name1);
    //폼 팝업 등록
    let caller_name2 = "pop_ship_cd";
    let target_name2 = ["ship_cd","ship_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name2, pop_ship_cd.ShowFormDialog, target_name2);

    //버튼함수와 연결...
    pageManager.BindButtonFunction();
    //그리드 초기화
    pageManager.InitializeComponent();

    $("#grid01").on(Const.HtmlEvent.click, function(){ Const.SelectedGridID = grid01.name;});

    Const.SelectedGridID = grid01.name;
});