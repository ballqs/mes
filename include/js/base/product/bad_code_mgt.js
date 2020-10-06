import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";

$(function () {
    let grid = {
        name: 'grid',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장', size: '80px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'err_cd', caption: '불량코드', size: '100px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 20}},
            { field: 'err_nm', caption: '불량명', size: '150px', sortable: true, resizable: true, editable: { type: 'text', maxLength: 50 }},
            { field: 'err_gbn', caption: '불량유형', size: '100px', sortable: true, resizable: true, editable: { type: 'select' } },
            { field: 'seq', caption: '순서', size: '100px', sortable: true, resizable: true,  attr:"align=right" , editable: { type: 'int' }},
            { field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, editable: { type: 'checkbox' }},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 1000} },
            { field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true},
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true},
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
    }

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "bad_code_mgt";

    let pageManager = new GridPageManager(search_frm_id, btn_frm_id, page_addr_name);
    //그리드 등록
    grid = pageManager.gridManager.AddGrid(grid);

    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid.name, "chk");


    pageManager.gridManager.SetPkFields(grid.name,["fact_cd","err_cd"]);
    pageManager.gridManager.SetCompulsoryFields(grid.name, ["err_nm","err_gbn","seq"]);

    //버튼에 대한 url 등록
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Search, "/ajax/base/product/get/bad_code_mgt");
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.DeleteRow, "/ajax/base/product/delete/bad_code_mgt");
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Save, "/ajax/base/product/save/bad_code_mgt");

    pageManager.gridManager.AddSelectBoxInfo(grid.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid.name,"err_gbn", common.code, {up_cd: "err_gbn"}, "cd", "cd_nm");


    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);

    //콤보박스(폼) 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");


    //버튼함수와 연결
    pageManager.BindButtonFunction();

    //그리드 초기화
    pageManager.InitializeComponent();

    $("#grid").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid.name;

});