import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";


$(function () {

    let grid = {
        name: 'grid',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fault_cd', caption: '고장코드', size: '80px', sortable: true, resizable: true, editable: { type: 'text', maxLength: 20}},
            { field: 'fault_type', caption: '고장유형', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'fault_nm', caption: '고장', size: '150px', sortable: true, resizable: true, editable: { type: 'text', maxLength: 50}},
            { field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox'}},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text', maxLength: 1000 }},
            { field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true},
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true},
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "eqpmt_fault_item_mgt";

    let pageManager = new GridPageManager(search_frm_id, btn_frm_id, page_addr_name);
    //그리드 등록
    grid = pageManager.gridManager.AddGrid(grid);

    pageManager.gridManager.SetSelectionCheckField(grid.name,"chk");
    //필수키 입력 필드
    pageManager.gridManager.SetPkFields(grid.name, ["fault_cd"]);
    pageManager.gridManager.SetCompulsoryFields(grid.name, ["fault_type"]);

    //버튼에 대한 url 등록
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Search, "/ajax/base/product/get/eqpmt_fault_item_mgt");
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.DeleteRow, "/ajax/base/product/delete/eqpmt_fault_item_mgt");
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Save, "/ajax/base/product/save/eqpmt_fault_item_mgt");
    //콤보박스 렌더링
    pageManager.gridManager.AddSelectBoxInfo(grid.name,"fault_type", common.code, {up_cd: "fault_type"}, "cd", "cd_nm");

    //체크박스 렌더링
    pageManager.gridManager.AddCheckRenderOption(grid.name,"use_yn", "Y", "N");

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스(폼) 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fault_type", common.code, {up_cd: "fault_type"},"cd", "cd_nm", "","전체");

    //버튼함수와 연결
    pageManager.BindButtonFunction();

    //그리드 초기화
    pageManager.InitializeComponent();

    $("#grid").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid.name;

});
