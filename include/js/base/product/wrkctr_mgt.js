import Pop_wrkctr_cd from "/include/js/popups/pop_wrkctr_cd.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";

$(function () {
    //항상 젤 위에서 호출...
    let grid = {
        name: 'grid',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            //checkbox
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            //select
            { field: 'fact_cd', caption: '공장', size: '80px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'wrkctr_cd', caption: '작업장코드', size: '100px', sortable: true, resizable: true, hidden: false, editable: { type: 'text' }},
            { field: 'wrkctr_nm', caption: '작업장', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            //select
            { field: 'op_cd', caption: '공정', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'moniter_nm', caption: '모니터링', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            //checkbox
            { field: 'use_yn', caption: '사용여부', size: '70px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox'}},
            //checkbox
            { field: 'staus_brd_yn', caption: '현황판 표시 여부', size: '120px', sortable: true, resizable: true, editable: { type: 'checkbox' }},
            { field: 'staus_brd_seq', caption: '현황판 표시 순서', size: '120px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'text' }},
            //checkbox
            { field: 'op_dsply_yn', caption: '가동현황 표시 여부', size: '120px', sortable: true, resizable: true, editable: { type: 'checkbox' }},
            { field: 'op_staus_ordr', caption: '가동현황 표시 순서', size: '120px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'text' }},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            //time
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'time' }},
            { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            //time
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'time'}}
        ],
    };
    //form id가 search_frm 이라서 같게 하기 위함
    let search_frm_id = "search_frm";
    //위와 같은 이유
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "wrkctr_mgt";

    let pageManager = new GridPageManager(search_frm_id,btn_frm_id,page_addr_name);
    //팝업 기능 동작을 하기 위해 객체 부르기
    let pop_wrkctr_cd = new Pop_wrkctr_cd(pageManager, search_frm_id);
    pop_wrkctr_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);


    //1번 그리드 등록
    grid = pageManager.gridManager.AddGrid(grid);
    //팝업 등록
    //pageManager.gridManager.AddPopUpOption(grid.name,"wrkctr_cd", pop_wrkctr_cd.PopupName);
    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid.name,"chk");


    //PK, 필수입력, ReadOnly 필드 등록  PK : 기본키 설정하면 색깔이 붉게 나옴
    pageManager.gridManager.SetPkFields(grid.name, ["fact_cd", "wrkctr_cd"]);
    pageManager.gridManager.SetCompulsoryFields(grid.name, ["wrkctr_nm","op_cd"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Search, "/ajax/base/product/get/wrkctr_mgt");
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.DeleteRow, "/ajax/base/product/delete/wrkctr_mgt");
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Save, "/ajax/base/product/save/wrkctr_mgt");

    //콤보박스 렌더 정보 등록
    //up_cd / cd : 복합키이며 up_cd는 부모가 누구인지 가르키는 것! 공장으로 치면 A공장/B공장 등 cd는 작업코드
    pageManager.gridManager.AddSelectBoxInfo(grid.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //pageManager.gridManager.AddSelectBoxInfo(grid.name,"op_cd", common.code, {up_cd: "op_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid.name,"op_cd", common.exCode, {table: "tbp_opinfo"}, "op_cd", "op_nm");

    //체크박스 T/F 정보 등록
    //php에서 CheckBox는 True / False 형태로 데이터를 주고 받으나 DB에는 Y/N으로 사용! 즉.. 호환을 위해
    pageManager.gridManager.AddCheckRenderOption(grid.name,"use_yn", "Y", "N");
    pageManager.gridManager.AddCheckRenderOption(grid.name,"staus_brd_yn", "Y", "N");
    pageManager.gridManager.AddCheckRenderOption(grid.name,"op_dsply_yn", "Y", "N");
    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스(폼) 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");
    // pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","op_cd", common.code, {up_cd: "op_cd"},"cd", "cd_nm");

    //폼 팝업 등록
    let caller_name = "pop_wrkctr_cd";
    let target_name = ["wrkctr_cd","wrkctr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_wrkctr_cd.ShowFormDialog, target_name);

    //버튼함수와 연결
    pageManager.BindButtonFunction();
    //그리드 초기화
    pageManager.InitializeComponent();

    $("#grid").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid.name;

});