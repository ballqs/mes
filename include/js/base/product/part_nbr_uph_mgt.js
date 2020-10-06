import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";

$(function () {
    let grid = {
        name: 'grid',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장', size: '80px', sortable: true, resizable: true, editable: { type: 'select' } },
            // { field: 'text', caption: '공장', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '100px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번', size: '150px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true},
            { field: 'stndrd_uph', caption: '표준UPH', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'int' }},
            { field: 'efcncy_prcnt', caption: '효율(%)', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'int' }},
            { field: 'op_uph', caption: '운영UPH', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'int' }},
            { field: 'cavity', caption: 'CAVITY', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'int' }},
            { field: 'stndrd_tm_min', caption: '표준시간', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'int' }},
            { field: 'cyletime', caption: 'CYLE TIME', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'int' }},
            { field: 'setup_tm_min', caption: 'SETUP TIME', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'int' }},
            { field: 'str_ymd', caption: '시작일자', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'date' }},
            { field: 'end_ymd', caption: '종료일자', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'date' }},
            { field: 'stop_tm_min', caption: '정지시간', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'int' }},
            { field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox'}},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 1000}},
            { field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true},
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true},
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
    }

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "part_nbr_uph_mgt";

    let pageManager = new GridPageManager(search_frm_id, btn_frm_id, page_addr_name);
    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);

    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddTargetColumnsOnPopupClose(["prt_nbr_cd","prt_nbr_nm","spec"], ["prt_nbr_cd","prt_nbr_nm","spec"]);

    //Grid 등록
    grid = pageManager.gridManager.AddGrid(grid);

    pageManager.gridManager.AddPopUpOption(grid.name,"prt_nbr_cd", pop_prt_nbr_cd.PopupName);

    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid.name, "chk");

    //PK키/필수키
    pageManager.gridManager.SetPkFields(grid.name,["fact_cd","prt_nbr_cd"]);
    //pageManager.gridManager.SetCompulsoryFields(grid.name, ["stop_nm","stop_gbn",""]);

    //버튼에 대한 url 등록
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Search, "/ajax/base/product/get/part_nbr_uph_mgt");
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.DeleteRow, "/ajax/base/product/delete/part_nbr_uph_mgt");
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Save, "/ajax/base/product/save/part_nbr_uph_mgt");

    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    //폼 ComboBox 렌더링
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");

    //폼 팝업 등록
    let caller_name = "pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);

    //버튼함수와 연결
    pageManager.BindButtonFunction();

    //그리드 초기화
    pageManager.InitializeComponent();

    $("#grid").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid.name;

});
