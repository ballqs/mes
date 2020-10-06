import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_biz_cd from "/include/js/popups/pop_biz_cd.js";
import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'rec_ymd', caption: '납품일자', size: '100px', sortable: true, resizable: true , style: 'text-align: center'},
            { field: 'po_in_gbn', caption: '입고구분', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            { field: 'in_biz_cd', caption: '발주처코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'in_biz_nm', caption: '발주처명', size: '150px', sortable: true, resizable: true},
            { field: 'dyn_biz_cd', caption: '직납업체', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'out_biz_cd', caption: '출고처코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'out_biz_nm', caption: '출고처명', size: '150px', sortable: true, resizable: true},
            { field: 'out_ship_cd', caption: '출고처현장코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'out_ship_nm', caption: '출고처현장명', size: '100px', sortable: true, resizable: true},
            { field: 'po_no', caption: '발주번호', size: '120px', sortable: true, resizable: true},
            { field: 'po_seq', caption: '발주순번', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'po_in_no', caption: '발주입고번호', size: '120px', sortable: true, resizable: true},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '300px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '150px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true},
            { field: 'po_qty', caption: '발주수량', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'in_qty', caption: '입고량', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'lotno', caption: 'lotno', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'all_in_qty', caption: '총입고량', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'pure_in_qty', caption: '총수량', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
        ],
    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);
    let pop_biz_cd = new Pop_biz_cd(pageManager, search_frm_id);
    pop_biz_cd.AddParentReferFormTag(["cmpny_cd"],["cmpny_cd"]);

    grid01 = pageManager.gridManager.AddGrid(grid01);
    // pageManager.gridManager.SetReadonlyFields(grid01.name,
    //     ["recid","rec_ymd","po_in_gbn","in_biz_cd",
    //                 "in_biz_nm","dyn_biz_cd","out_biz_cd",
    //                 "out_biz_nm","out_ship_cd","out_ship_nm",
    //                 "po_no","po_seq","po_in_no",
    //                 "prt_nbr_cd","prt_nbr_nm","spec",
    //                 "po_qty","in_qty","lotno","all_in_qty","pure_in_qty"]);
    pageManager.gridManager.SetReadonlyFields(grid01.name,["po_in_gbn"]);

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/material/input/get/term_input_staus");

    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"po_in_gbn", common.code, {up_cd: "po_in_gbn"}, "cd", "cd_nm");

    pageManager.frmManager.AddForm(search_frm_id);

    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","po_in_gbn", common.code, {up_cd: "po_in_gbn"}, "cd", "cd_nm", "", "전체");

    let caller_name = "pop_biz_cd";
    let target_name = ["biz_cd","biz_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_biz_cd.ShowFormDialog, target_name);

    pageManager.BindButtonFunction();

    pageManager.InitializeComponent();

    $("#grid01").on(Const.HtmlEvent.click, function () {    Const.SelectedGridID = grid01.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;
})