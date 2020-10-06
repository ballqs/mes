import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_op_cd from "/include/js/popups/pop_op_cd.js";
import Pop_wrkctr_cd from "/include/js/popups/pop_wrkctr_cd.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true ,editable: { type: 'select' }},
            { field: 'wrkctr_cd', caption: '작업장코드', size: '100px', sortable: true, resizable: true},
            { field: 'wrkctr_nm', caption: '작업장', size: '100px', sortable: true, resizable: true },
            { field: 'ordr_prt_nbr_no', caption: '품번코드', size: '150px', sortable: true, resizable: true, hidden: true },
            { field: 'prt_nbr_nm', caption: '품번', size: '150px', sortable: true, resizable: true },
            { field: 'spec', caption: '규격', size: '150px', sortable: true, resizable: true },
            { field: 'wrk_ordr_no', caption: '지시번호', size: '100px', sortable: true, resizable: true },
            { field: 'wrk_ordr_dt', caption: '지시일자', size: '100px', sortable: true, resizable: true, style: 'text-align: center' },
            { field: 'daynight_gbn', caption: '주야구분', size: '70px', sortable: true, resizable: true, style: 'text-align: center' },
            { field: 'shift_gbn', caption: '조구분', size: '70px', sortable: true, resizable: true },
            { field: 'prd_qty_meas', caption: '생산실적', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'box_qty', caption: 'BOX수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right' , hidden: true},
            { field: 'prd_good_qty', caption: '양품', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'err_qty', caption: '불량', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'achievement_rate', caption: '달성률(%)', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'base_whs_cd', caption: '창고', size: '100px', sortable: true, resizable: true , hidden: true},
            { field: 'base_loc_cd', caption: '위치', size: '100px', sortable: true, resizable: true , hidden: true}
        ],
    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "pln_rslt_staus";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id,page_addr_name);

    let pop_op_cd = new Pop_op_cd(pageManager, search_frm_id);
    pop_op_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);

    let pop_wrkctr_cd = new Pop_wrkctr_cd(pageManager, search_frm_id);
    pop_wrkctr_cd.AddParentReferFormTag(["fact_cd","op_cd","op_nm"],["fact_cd","op_cd","op_nm"]);

    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);

    //1번 그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);

    pageManager.gridManager.SetReadonlyFields(grid01.name,["fact_cd"]);

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/production/plan/get/pln_rslt_staus");

    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"daynight_gbn", common.code, {up_cd: "day_night"}, "cd", "cd_nm");

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "daynight_gbn", common.code, {up_cd: "day_night"}, "cd", "cd_nm", "", "전체");

    //폼 팝업 등록
    let caller_name = "pop_op_cd";
    let target_name = ["op_cd","op_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_op_cd.ShowFormDialog, target_name);

        caller_name = "pop_wrkctr_cd";
        target_name = ["wrkctr_cd","wrkctr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_wrkctr_cd.ShowFormDialog, target_name);

        caller_name = "pop_prt_nbr_cd";
        target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);


    //버튼함수와 연결
    pageManager.BindButtonFunction();

    //그리드 초기화
    pageManager.InitializeComponent();

    //div에 클릭펑션 먹인거...
    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;
});