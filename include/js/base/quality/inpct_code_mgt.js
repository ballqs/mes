import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_inpct_cd from "/include/js/popups/pop_inpct_cd.js";
// import Pop_whs_cd from "../../popups/pop_whs_cd";

$(function () {
    let grid = {
        name: 'grid',
        columns: [
            {field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
            {field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, editable: {type: 'checkbox'}},
            {field: 'fact_cd', caption: '공장', size: '80px', sortable: true,w2ui: { colspan: { recid: 1} },resizable: true, /*hidden:true,*/ editable: {type: 'select',}, },
            {field: 'inspct_cd', caption: '검사항목코드', size: '100px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 20}/*, hidden: true*/},
            {field: 'inspct_nm', caption: '검사항목명', size: '200px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 50},},
            {field: 'measure_type', caption: '측정유형명', size: '100px', sortable: true, resizable: true, editable: {type: 'select'},},
            {field: 'data_range', caption: '데이타범주', size: '100px', sortable: true, resizable: true, /*hidden:true,*/ editable: { type: 'text', maxlength: 50},},
            {field: 'inspct_stdrd_type', caption: '규격유형명', size: '100px', sortable: true, resizable: true, editable: { type: 'select' } },
            {field: 'inspct_type', caption: '검사유형명', size: '100px', sortable: true, resizable: true, editable: { type: 'select' } },
            {field: 'spc_yn', caption: 'spc여부', size: '100px', sortable: true, resizable: true,hidden:true, editable: { type: 'checkbox' }},
            {field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, editable: { type: 'checkbox' }},
            {field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 1000 }},
            {field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true,/* editable: { type: 'text' }*/},
            {field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center',/* editable: { type: 'date' }*/},
            {field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true,/* editable: { type: 'text' }*/},
            {field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center',/* editable: { type: 'date' }*/}
        ],
    };

    let search_frm_id = "search_frm";
    let bnt_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, bnt_frm_id);
    let pop_inpct_cd = new Pop_inpct_cd(pageManager, search_frm_id);

    // let pop_whs_cd = new Pop_whs_cd(pageManager, search_frm_id);
    pop_inpct_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);

    //1번 그리드 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid = pageManager.gridManager.AddGrid(grid);
    //팝업등록
    // pageManager.gridManager.AddPopUpOption(grid.name,"whs_cd", pop_whs_cd.PopupName);

    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid.name, "chk");

    //PK, 필수입력, Readonly 필드 등록
    pageManager.gridManager.SetPkFields(grid.name,  ["fact_cd", "inspct_cd"]);
    // pageManager.gridManager.SetReadonlyFields(grid01.name,  ["prt_nbr_dsp_nm"]);
    pageManager.gridManager.SetCompulsoryFields(grid.name,  ["inspct_nm"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Search, "/ajax/base/quality/get/inpct_code_mgt");
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.DeleteRow, "/ajax/base/quality/delete/inpct_code_mgt");
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Save, "/ajax/base/quality/save/inpct_code_mgt");

    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid.name,"measure_type", common.code, {up_cd: "measure_type"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid.name,"inspct_stdrd_type", common.code, {up_cd: "inspct_stdrd_type"}, "cd", "cd_nm","","s","","n");
    pageManager.gridManager.AddSelectBoxInfo(grid.name,"inspct_type", common.code, {up_cd: "inspct_type"}, "cd", "cd_nm");

    //체크박스 T/F 정보 등록..
    pageManager.gridManager.AddCheckRenderOption(grid.name,"use_yn", "Y", "N");
    pageManager.gridManager.AddCheckRenderOption(grid.name,"spc_yn", "Y", "N");
    // pageManager.gridManager.SetPkFields(grid.name,  ["fact_cd", "whs_cd"]);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //폼 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","dept_cd", common.code, {up_cd: "dept_cd"}, "cd", "cd_nm", "", "전체");
    //폼 팝업 등록
    let caller_name = "pop_inpct_cd";
    let target_name = ["inspct_cd","inspct_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_inpct_cd.ShowFormDialog, target_name);

    //그리드 초기화..
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //버튼함수와 연결...
    pageManager.BindButtonFunction();

    //그리드 초기화...
    pageManager.InitializeComponent();


    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid.name;});

    Const.SelectedGridID = grid.name;

});
