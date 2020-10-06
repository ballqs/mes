import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd from "../../popups/pop_prt_nbr_cd.js";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            {field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number'},
            {field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: {type: 'checkbox'}},
            {field: 'fact_cd', caption: '공장코드', size: '80px', sortable: true, resizable: true, hidden: false, editable: {type: 'select'}},

            {field: 'prt_nbr_cd', caption: '품번코드', size: '200px', sortable: true, resizable: true},
            {field: 'prt_nbr_nm', caption: '품번명', size: '200px', sortable: true, resizable: true},
            {field: 'spec', caption: '규격', size: '200px', sortable: true, resizable: true},
            //{field: 'trans_unit_cd', caption: '환산단위코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text'}},
            //select
            {field: 'trans_unit', caption: '환산단위', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            //{field: 'base_unit_cd', caption: '기준단위코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text'}},
            //select
            {field: 'base_unit', caption: '기준단위', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            {field: 'trans_qty', caption: '환산수량', size: '100px', sortable: true, resizable: true, render: 'int', editable: {type: 'int'}},
            {field: 'base_qty', caption: '기준수량', size: '100px', sortable: true, resizable: true, render: 'int', editable: {type: 'int'}},
            {field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: {type: 'text'}},
            {field: 'inst_id', caption: '입력자 ID', size: '100px', sortable: true, resizable: true},
            {field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            {field: 'updt_id', caption: '수정자 ID', size: '100px', sortable: true, resizable: true},
            {field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
        ],
    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "unit_exchg_mgt";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id, page_addr_name);
    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddTargetColumnsOnPopupClose(["prt_nbr_cd","prt_nbr_nm","spec"], ["prt_nbr_cd","prt_nbr_nm","spec"]);

    //그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);
    //팝업 등록
    pageManager.gridManager.AddPopUpOption(grid01.name,"prt_nbr_cd", pop_prt_nbr_cd.PopupName);

    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");

    pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "prt_nbr_cd", "trans_unit"]);
    pageManager.gridManager.SetReadonlyFields(grid01.name,  ["prt_nbr_nm","spec"]);
    pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["base_unit","trans_qty","base_qty"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/base/standard/get/unit_exchg_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/base/standard/delete/unit_exchg_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/base/standard/save/unit_exchg_mgt");

    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"trans_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"base_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);

    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","trans_unit", common.code, {up_cd: 'unit_cd'}, "cd", "cd_nm", "", "전체");

    //폼 팝업 등록
    let caller_name = "btn_pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);

    //버튼함수와 연결...
    pageManager.BindButtonFunction();
    //그리드 초기화
    pageManager.InitializeComponent();

    $("#grid01").on(Const.HtmlEvent.click, function(){ Const.SelectedGridID = grid01.name;});

    Const.SelectedGridID = grid01.name;
});

