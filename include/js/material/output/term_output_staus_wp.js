import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_whs_cd from "/include/js/popups/pop_whs_cd.js";
import Pop_loc_cd from "/include/js/popups/pop_loc_cd.js";
import Pop_prt_nbr_cd_wp from "/include/js/popups/pop_prt_nbr_cd_wp.js";
import Pop_ship_cd from "/include/js/popups/pop_ship_cd.js";
import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'out_dt', caption: '출고일시', size: '150px', sortable: true, resizable: true},
            { field: 'out_gbn', caption: '출고구분', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            { field: 'out_no', caption: '출고번호', size: '150px', sortable: true, resizable: true},
            { field: 'prt_nbr_cd', caption: '품번', size: '250px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '150px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true},
            { field: 'biz_cd', caption: '출고처코드', size: '100px', sortable: true, resizable: true, hidden:true},
            { field: 'biz_nm', caption: '출고처명', size: '100px', sortable: true, resizable: true},
            { field: 'ship_cd', caption: '출고처현장코드', size: '100px', sortable: true, resizable: true, hidden:true},
            { field: 'ship_nm', caption: '출고처현장명', size: '100px', sortable: true, resizable: true},
            { field: 'out_qty', caption: '출고수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'out_unit', caption: '출고단위', size: '100px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'whs_nm', caption: '창고명', size: '100px', sortable: true, resizable: true},
            { field: 'loc_nm', caption: '창고위치명', size: '100px', sortable: true, resizable: true},
            { field: 'out_id_nm', caption: '출고자', size: '100px', sortable: true, resizable: true},
        ],
    };


    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);
    let pop_loc_cd = new Pop_loc_cd(pageManager, search_frm_id);
    let pop_whs_cd = new Pop_whs_cd(pageManager, search_frm_id);
    let pop_prt_nbr_cd_wp = new Pop_prt_nbr_cd_wp(pageManager, search_frm_id);
    let pop_ship_cd = new Pop_ship_cd(pageManager, search_frm_id);

    pop_loc_cd.AddParentReferFormTag(["fact_cd","whs_cd","whs_nm"],["fact_cd","whs_cd","whs_nm"]);
    pop_whs_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);
    pop_prt_nbr_cd_wp.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_ship_cd.AddParentReferFormTag(["cmpny_cd","biz_cd","biz_nm"], ["cmpny_cd","biz_cd","biz_nm"]);

    grid01 = pageManager.gridManager.AddGrid(grid01);

    pageManager.gridManager.SetReadonlyFields(grid01.name, ["out_gbn"]);

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/material/output/get/term_output_staus_wp");

    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"out_gbn", common.code, {up_cd: "out_gbn"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"out_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");

    pageManager.frmManager.AddForm(search_frm_id);

    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","out_gbn", common.code, {up_cd: 'out_gbn'}, "cd", "cd_nm", "", "전체");

    //폼 팝업 등록
    let caller_name2 = "pop_loc_cd";
    let target_name2 = ["loc_cd", "loc_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name2, pop_loc_cd.ShowFormDialog, target_name2);

    let caller_name1 = 'pop_whs_cd';
    let target_name1 = ['whs_cd', "whs_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name1, pop_whs_cd.ShowFormDialog, target_name1);

    let caller_name3 = "pop_prt_nbr_cd_wp";
    let target_name3 = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name3, pop_prt_nbr_cd_wp.ShowFormDialog, target_name3);

    let caller_name4 = 'pop_ship_cd';
    let target_name4 = ['ship_cd', "ship_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name4, pop_ship_cd.ShowFormDialog, target_name4);

    pageManager.BindButtonFunction();

    pageManager.InitializeComponent();

    $("#grid01").on(Const.HtmlEvent.click, function () {    Const.SelectedGridID = grid01.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;

})