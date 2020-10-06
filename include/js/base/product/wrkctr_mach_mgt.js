import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_wrkctr_cd from "/include/js/popups/pop_wrkctr_cd.js";
import Pop_mach_cd from "/include/js/popups/pop_mach_cd.js";
import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";

$(function () {

    //항상 젤 위에서 호출...
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
            //checkbox
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, editable: { type: 'checkbox'}, style: 'text-align: right'},
            //select
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, editable: { type: 'select'}},
            { field: 'wrkctr_cd', caption: '작업장코드', size: '150px', sortable: true, resizable: true, editable: { type: 'text'}},
            { field: 'wrkctr_nm', caption: '작업장명', size: '100px', sortable: true, resizable: true, editable: { type: 'text'}},
            { field: 'mach_cd', caption: '설비코드', size: '150px', sortable: true, resizable: true, editable: { type: 'text'}},
            { field: 'mach_nm', caption: '설비명', size: '100px', sortable: true, resizable: true, editable: { type: 'text'}},
            { field: 'dsp_seq', caption: '표시순서', size: '100px', sortable: true, resizable: true, editable: { type: 'float'}, style: 'text-align: right'},
            //checkbox
            { field: 'colct_aply_yn', caption: '실적수집여부', size: '100px', sortable: true, resizable: true, editable: { type: 'checkbox'}, style: 'text-align: right'},
            { field: 'in_crt_gbn', caption: '생성구분', size: '100px', sortable: true, resizable: true, editable: { type: 'select'}, attr:"align=center"},
            //checkbox
            { field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, editable: { type: 'checkbox'}, style: 'text-align: right'},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text'}},
            { field: 'inst_id', caption: '입력자 ID', size: '100px', sortable: true, resizable: true },
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true,  style: 'text-align: center'},
            { field: 'updt_id', caption: '수정자 ID', size: '100px', sortable: true, resizable: true },
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true,  style: 'text-align: center'}
        ],
    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "wrkctr_mach_mgt";

    let pageManager = new GridPageManager(search_frm_id,btn_frm_id, page_addr_name);
    let pop_wrkctr_cd = new Pop_wrkctr_cd(pageManager,search_frm_id);
    let pop_mach_cd = new Pop_mach_cd(pageManager,search_frm_id);

    pop_wrkctr_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);
    pop_mach_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);

    pop_wrkctr_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
    pop_mach_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);

    pop_wrkctr_cd.AddTargetColumnsOnPopupClose(["wrkctr_cd","wrkctr_nm"], ["wrkctr_cd","wrkctr_nm"]);
    pop_mach_cd.AddTargetColumnsOnPopupClose(["mach_cd","mach_nm"], ["mach_cd","mach_nm"]);

    grid01 = pageManager.gridManager.AddGrid(grid01);

    pageManager.gridManager.AddPopUpOption(grid01.name,"wrkctr_cd", pop_wrkctr_cd.PopupName);
    pageManager.gridManager.AddPopUpOption(grid01.name,"mach_cd", pop_mach_cd.PopupName);

    pageManager.gridManager.SetSelectionCheckField(grid01.name,"chk");

    pageManager.gridManager.SetPkFields(grid01.name,["fact_cd","wrkctr_cd","mach_cd"]);
    pageManager.gridManager.SetReadonlyFields(grid01.name,  ["wrkctr_nm","mach_nm"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/base/product/get/wrkctr_mach_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/base/product/delete/wrkctr_mach_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/base/product/save/wrkctr_mach_mgt");

    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"in_crt_gbn", common.code, {up_cd: "in_crt_gbn"}, "cd", "cd_nm");
    // pageManager.gridManager.AddSelectBoxInfo(grid01.name,"wrkctr_cd", common.exCode, {table: "tbp_wrkctrinfo"}, "wrkctr_cd", "wrkctr_nm");
    // pageManager.gridManager.AddSelectBoxInfo(grid01.name,"mach_cd", common.exCode, {table: "tbp_machinfo"}, "mach_cd", "mach_nm");

    pageManager.gridManager.AddCheckRenderOption(grid01.name,"colct_aply_yn", "Y", "N");
    pageManager.gridManager.AddCheckRenderOption(grid01.name,"use_yn", "Y", "N");

    pageManager.frmManager.AddForm(search_frm_id);

    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    let caller_name = "pop_wrkctr_cd";
    let target_name = ["wrkctr_cd","wrkctr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_wrkctr_cd.ShowFormDialog, target_name);

    pageManager.BindButtonFunction();

    pageManager.InitializeComponent();

    $("#grid01").on(Const.HtmlEvent.click, function () {    Const.SelectedGridID = grid01.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;

});