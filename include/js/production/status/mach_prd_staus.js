import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_wrkctr_cd from "/include/js/popups/pop_wrkctr_cd.js";
import Pop_op_cd from "/include/js/popups/pop_op_cd.js";
import Pop_prt_nbr_cd_wp from "/include/js/popups/pop_prt_nbr_cd_wp.js";
import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'fact_nm', caption: '공장명', size: '100px', sortable: true, resizable: true},
            { field: 'wrkctr_cd', caption: '작업장코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'wrkctr_nm', caption: '작업장명', size: '100px', sortable: true, resizable: true},
            { field: 'rec_ymd', caption: '수불일자', size: '100px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'rslt_dt', caption: '생산일시', size: '150px', sortable: true, resizable: true},
            { field: 'op_cd', caption: '공정코드', size: '70px', sortable: true, resizable: true, hidden: true},
            { field: 'op_nm', caption: '공정명', size: '70px', sortable: true, resizable: true, hidden: true},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '150px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '150px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '150px', sortable: true, resizable: true},
            { field: 'mach_cd', caption: '설비코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'mach_nm', caption: '설비명', size: '100px', sortable: true, resizable: true},
            { field: 'prct_qty', caption: '생산량', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'wrk_ordr_no', caption: '지시번호', size: '100px', sortable: true, resizable: true},
            { field: 'cavity', caption: 'CAVITY', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'day_night', caption: '주야구분', size: '100px', sortable: true, resizable: true},
            { field: 'shift_gbn', caption: '조구분', size: '100px', sortable: true, resizable: true},
            { field: 'wrkr_nm', caption: '주작업자', size: '100px', sortable: true, resizable: true},
            //checkbox
            { field: 'rst_aply_yn', caption: '집계여부', size: '100px', sortable: true, resizable: true,style: 'text-align: center', editable: { type: 'checkbox' }}
        ],
    };

    W2UiHelper.CheckBoxInputRenderFunc(grid01,["rst_aply_yn"]);

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "mach_prd_staus";

    let pageManager = new GridPageManager(search_frm_id, btn_frm_id, page_addr_name);
    let pop_op_cd = new Pop_op_cd(pageManager, search_frm_id);
    let pop_wrkctr_cd = new Pop_wrkctr_cd(pageManager, search_frm_id);
    let pop_prt_nbr_cd_wp = new Pop_prt_nbr_cd_wp(pageManager, search_frm_id);
    pop_op_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);
    pop_wrkctr_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);
    pop_prt_nbr_cd_wp.AddParentReferFormTag(["fact_cd"],["fact_cd"]);

    grid01 = pageManager.gridManager.AddGrid(grid01);
    // pageManager.gridManager.SetReadonlyFields(grid01.name,  ["recid","fact_nm","wrkctr_nm","rec_ymd",
    //                                                         "rslt_dt","prt_nbr_cd","prt_nbr_nm",
    //                                                         "spec","mach_nm","prct_qty",
    //                                                         "wrk_ordr_no","cavity","day_night",
    //                                                         "shift_gbn","wrkr_nm","rst_aply_yn"]);

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/production/status/get/mach_prd_staus");

    pageManager.gridManager.AddCheckRenderOption(grid01.name,"rst_aply_yn", "Y", "N");


    pageManager.frmManager.AddForm(search_frm_id);
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: 'fact_cd'}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","day_night", common.code, {up_cd: 'day_night'}, "cd", "cd_nm", "", "전체");

    let caller_name1 = "pop_op_cd";
    let target_name1 = ["op_cd","op_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name1, pop_op_cd.ShowFormDialog, target_name1);

    let caller_name2 = "pop_wrkctr_cd";
    let target_name2 = ["wrkctr_cd","wrkctr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name2, pop_wrkctr_cd.ShowFormDialog, target_name2);

    let caller_name3 = "pop_prt_nbr_cd_wp";
    let target_name3 = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name3, pop_prt_nbr_cd_wp.ShowFormDialog, target_name3);

    pageManager.BindButtonFunction();

    pageManager.InitializeComponent();

    $("#grid01").on(Const.HtmlEvent.click, function () {    Const.SelectedGridID = grid01.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;


})