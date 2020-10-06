import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd_wp from "/include/js/popups/pop_prt_nbr_cd_wp.js";
import Pop_biz_cd from "/include/js/popups/pop_biz_cd.js";
import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
            //select
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }, style: 'text-align: center'},
            { field: 'biz_cd', caption: '발주처', size: '100px', sortable: true, resizable: true, style: 'text-align: center', hidden: true},
            { field: 'biz_nm', caption: '발주명', size: '100px', sortable: true, resizable: true, style: 'text-align: left'},
            { field: 'po_ymd', caption: '발주일자', size: '100px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'po_no', caption: '발주번호', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'po_seq', caption: '발주순번', size: '80px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '150px', sortable: true, resizable: true, style: 'text-align: left'},
            { field: 'prt_nbr_nm', caption: '품번명', size: '150px', sortable: true, resizable: true, style: 'text-align: left'},
            { field: 'spec', caption: '규격', size: '150px', sortable: true, resizable: true, style: 'text-align: left'},
            { field: 'po_unit', caption: '단위', size: '100px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'pln_in_ymd', caption: '입고예정일', size: '100px', sortable: true, resizable: true, style: 'text-align: center'},
            //select
            { field: 'po_staus_cd', caption: '발주상태', size: '75px', sortable: true, resizable: true, attr:"align=center", editable: { type: 'select' }},
            { field: 'po_qty', caption: '발주량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'po_in_qty', caption: '입고량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'unpo_pty', caption: '미납수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'dyn_biz_cd', caption: '직납업체', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
        ],
    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);
    let pop_prt_nbr_cd_wp = new Pop_prt_nbr_cd_wp(pageManager, search_frm_id);
    let pop_biz_cd = new Pop_biz_cd(pageManager, search_frm_id);
    pop_prt_nbr_cd_wp.AddParentReferFormTag(["fact_cd"],["fact_cd"]);
    pop_biz_cd.AddParentReferFormTag(["cmpny_cd"],["cmpny_cd"]);

    grid01 = pageManager.gridManager.AddGrid(grid01);
    pageManager.gridManager.SetReadonlyFields(grid01.name, ["po_staus_cd"]);

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/material/purchase/get/prchs_rslt_staus");

    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"po_staus_cd", common.code, {up_cd: "po_staus_cd"}, "cd", "cd_nm");

    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","po_staus_cd", common.code, {up_cd: "po_staus_cd"}, "cd", "cd_nm", "" ,"전체");
    let caller_name1 = "pop_biz_cd";
    let target_name1 = ["biz_cd","biz_nm"];2
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name1, pop_biz_cd.ShowFormDialog, target_name1);

    let caller_name2 = "pop_prt_nbr_cd_wp";
    let target_name2 = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name2, pop_prt_nbr_cd_wp.ShowFormDialog, target_name2);

    pageManager.BindButtonFunction();

    pageManager.InitializeComponent();

    $("#grid01").on(Const.HtmlEvent.click, function () {    Const.SelectedGridID = grid01.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;
})