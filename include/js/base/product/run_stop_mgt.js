import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";

$(function () {
    let grid = {
        name: 'grid',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' } },
            { field: 'fact_cd', caption: '공장', size: '80px', sortable: true, resizable: true, hidden: false, editable: { type: 'select' } },
            { field: 'stop_cd', caption: '비가동코드', size: '100px', sortable: true, resizable: true, hidden: false, editable: { type: 'text', maxlength: 20 }},
            { field: 'stop_nm', caption: '비가동명', size: '150px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 50 }},
            { field: 'stop_gbn', caption: '비가동유형', size: '100px', sortable: true, resizable: true, hidden: false, editable: { type: 'select' } },
            { field: 'seq', caption: '순서', size: '100px', sortable: true, resizable: true,  attr:'align=right', editable: { type: 'int' }},
            { field: 'pln_yn', caption: '계획여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 1000 }},
            { field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true},
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center' },
            { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "run_stop_mgt";

    let pageManager = new GridPageManager(search_frm_id, btn_frm_id, page_addr_name);

    //그리드 등록
    grid = pageManager.gridManager.AddGrid(grid);

    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid.name, "chk");


    pageManager.gridManager.SetPkFields(grid.name,["fact_cd","stop_cd"]);
    pageManager.gridManager.SetCompulsoryFields(grid.name, ["stop_nm","stop_gbn","seq"]);

    //버튼에 대한 url 등록
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Search, "/ajax/base/product/get/run_stop_mgt");
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.DeleteRow, "/ajax/base/product/delete/run_stop_mgt");
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Save, "/ajax/base/product/save/run_stop_mgt");

    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid.name,"stop_gbn", common.code, {up_cd: "stop_gbn"}, "cd", "cd_nm");

    pageManager.gridManager.AddCheckRenderOption(grid.name,"pln_yn", "Y", "N");
    pageManager.gridManager.AddCheckRenderOption(grid.name,"use_yn", "Y", "N");

    pageManager.gridManager.AddTypeCasting(grid.name, "int", "seq");

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);

    //콤보박스(폼) 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","stop_gbn", common.code, {up_cd: "stop_gbn"},"cd", "cd_nm", "","전체");

    //버튼함수와 연결
    pageManager.BindButtonFunction();

    //그리드 초기화
    pageManager.InitializeComponent();

    $("#grid").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid.name;
});
