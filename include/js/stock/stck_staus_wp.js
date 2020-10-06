// import PageManager from "/include/js/class/PageManager.js";
// import SingleGridPageManager from "/include/js/class/SingleGridPageManager.js";
// import PopupManager from "/include/js/class/PopupManager.js";

import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_loc_cd from "/include/js/popups/pop_loc_cd.js";
import Pop_prt_nbr_cd_wp from "/include/js/popups/pop_prt_nbr_cd_wp.js";
import Pop_whs_cd from "/include/js/popups/pop_whs_cd.js";
import Pop_ship_cd from "/include/js/popups/pop_ship_cd.js";


// $(function(){
//     initGrid();
// });
//
//
// function initGrid() {

$(function(){

    let grid1 = {
        name: 'grid1',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: false
        },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            //{ field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            // { field: 'text', caption: '거래처코드', size: '100px', sortable: true, resizable: true, hidden: true },
            // { field: 'text', caption: '거래처', size: '150px', sortable: true, resizable: true },
            { field: 'prt_nbr_cd', caption: '품번코드', size: '300px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '150px', sortable: true, resizable: true },
            { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true },
            { field: 'prt_nbr_grp_cd', caption: '품번그룹', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            //{ field: 'text', caption: '재질', size: '100px', sortable: true, resizable: true },
            { field: 'account_type', caption: '계정유형', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            { field: 'stck_whs_cd', caption: '창고', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'stck_whs_nm', caption: '창고명', size: '100px', sortable: true, resizable: true },
            { field: 'stck_loc_cd', caption: '위치', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'stck_loc_nm', caption: '위치명', size: '100px', sortable: true, resizable: true },
            { field: 'biz_cd', caption: '출고처코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'biz_nm', caption: '출고처명', size: '100px', sortable: true, resizable: true },
            { field: 'ship_cd', caption: '출고처현장코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'ship_nm', caption: '출고처현장명', size: '100px', sortable: true, resizable: true },
            { field: 'stck_wait_qty', caption: '검사대기수량', size: '100px', sortable: true, resizable: true, attr: 'align = right' },
            { field: 'stck_qty', caption: '재고수량', size: '100px', sortable: true, resizable: true, attr: 'align = right' },
            { field: 'stck_unit', caption: '재고단위', size: '100px', sortable: true, resizable: true, editable: {type: "select"}},
            // { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: {type: 'text'}},
            // { field: 'inst_id', caption: '입력자 ID', size: '100px', sortable: true, resizable: true},
            // { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            // { field: 'updt_id', caption: '수정자 ID', size: '100px', sortable: true, resizable: true},
            // { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
        // records: [
        //     { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50'}
        // ]
    };


    let grid2 = {
        name: 'grid2',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            //{ field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            //{ field: 'text', caption: '거래처코드', size: '100px', sortable: true, resizable: true, hidden: true },
            //{ field: 'text', caption: '거래처', size: '150px', sortable: true, resizable: true },
            { field: 'prt_nbr_cd', caption: '품번코드', size: '300px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '150px', sortable: true, resizable: true },
            { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true },
            { field: 'prt_nbr_grp_cd', caption: '품번그룹', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            //{ field: 'text', caption: '재질', size: '100px', sortable: true, resizable: true },
            { field: 'account_type', caption: '계정유형', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            { field: 'stck_whs_cd', caption: '창고코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'stck_whs_nm', caption: '창고명', size: '100px', sortable: true, resizable: true},
            //{ field: 'whs_nm', caption: '창고', size: '150px', sortable: true, resizable: true },
            { field: 'stck_loc_cd', caption: '위치코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'stck_loc_nm', caption: '위치명', size: '100px', sortable: true, resizable: true},
            //{ field: 'loc_nm', caption: '위치', size: '150px', sortable: true, resizable: true },
            { field: 'stck_wait_qty', caption: '검사대기수량', size: '100px', sortable: true, resizable: true, attr: 'align = right' },
            { field: 'stck_qty', caption: '재고수량', size: '100px', sortable: true, resizable: true, attr: 'align = right' },
            { field: 'stck_unit', caption: '재고단위', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            { field: 'safe_stck', caption: '안전재고', size: '100px', sortable: true, resizable: true, attr: 'align = right' },
            { field: 'num', caption: '차이수량', size: '100px', sortable: true, resizable: true, attr: 'align = right' },
            // { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: {type: 'text'}},
            // { field: 'inst_id', caption: '입력자 ID', size: '100px', sortable: true, resizable: true},
            // { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            // { field: 'updt_id', caption: '수정자 ID', size: '100px', sortable: true, resizable: true},
            // { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
        // records: [
        //     { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50'}
        // ]
    };


    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);
    let pop_loc_cd = new Pop_loc_cd(pageManager, search_frm_id);
    let pop_prt_nbr_cd_wp = new Pop_prt_nbr_cd_wp(pageManager, search_frm_id);
    let pop_whs_cd = new Pop_whs_cd(pageManager, search_frm_id);
    let pop_ship_cd = new Pop_ship_cd(pageManager, search_frm_id);

    pop_loc_cd.AddParentReferFormTag(["fact_cd","whs_cd","whs_nm"],["fact_cd","whs_cd","whs_nm"]);
    pop_prt_nbr_cd_wp.AddParentReferFormTag(["fact_cd"],["fact_cd"]);
    pop_whs_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);
    pop_ship_cd.AddParentReferFormTag(["cmpny_cd","biz_cd","biz_nm"],["cmpny_cd","biz_cd","biz_nm"]);

    //2번 그리드 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid1 = pageManager.gridManager.AddGrid(grid1);
    //팝업등록
    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    //pageManager.gridManager.SetSelectionCheckField(grid2.name, "chk");

    //PK, 필수입력, ReadOnly 필드등록
    pageManager.gridManager.SetReadonlyFields(grid1.name, ["recid" ,"fact_cd","prt_nbr_cd","prt_nbr_nm","spec","prt_nbr_grp_cd"
        ,"account_type","stck_whs_cd","stck_loc_cd","lotno","stck_wait_qty"
        ,"stck_qty","stck_unit"]);
    // pageManager.gridManager.SetCompulsoryFields(grid2.name, ["prt_nbr_nm"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid1.name, Const.MesButton.Search, "/ajax/stock/stck_staus/get/stck_staus_lot_wp");

    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid1.name, "fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid1.name, "prt_nbr_grp_cd", common.code, {up_cd: "prt_nbr_grp_cd"},"cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid1.name, "account_type", common.code, {up_cd: "account_type"},"cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid1.name, "stck_unit", common.code, {up_cd: "unit_cd"},"cd", "cd_nm");



    //1번 그리드 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid2 = pageManager.gridManager.AddGrid(grid2);
    //팝업등록
    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    //pageManager.gridManager.SetSelectionCheckField(grid1.name, "chk");

    //PK, 필수입력, ReadOnly 필드등록
    pageManager.gridManager.SetReadonlyFields(grid2.name, ["recid" ,"fact_cd", "prt_nbr_cd","prt_nbr_cd","prt_nbr_nm","spec","prt_nbr_grp_cd"
        ,"account_type","stck_whs_cd","stck_loc_cd","stck_wait_qty"
        ,"stck_qty","stck_unit","safe_stck","num"]);
    // pageManager.gridManager.SetCompulsoryFields(grid1.name, ["prt_nbr_nm"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid2.name, Const.MesButton.Search, "/ajax/stock/stck_staus/get/stck_staus_wp");

    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid2.name,"fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid2.name, "prt_nbr_grp_cd", common.code, {up_cd: "prt_nbr_grp_cd"},"cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid2.name, "account_type", common.code, {up_cd: "account_type"},"cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid2.name, "stck_unit", common.code, {up_cd: "unit_cd"},"cd", "cd_nm");

    //체크박스 T/F 정보 등록

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //폼 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    pageManager.frmManager.AddForm(search_frm_id);

    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "prt_nbr_grp_cd", common.code, {up_cd: "prt_nbr_grp_cd"},"cd", "cd_nm", "", "전체");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "account_type", common.code, {up_cd: "account_type"},"cd", "cd_nm", "", "전체");

    //폼 팝업 등록
    let caller_name1 = "pop_loc_cd";
    let target_name1 = ["loc_cd", "loc_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name1, pop_loc_cd.ShowFormDialog, target_name1);

    let caller_name2 = 'pop_prt_nbr_cd_wp';
    let target_name2 = ['prt_nbr_cd', "prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name2, pop_prt_nbr_cd_wp.ShowFormDialog, target_name2);

    let caller_name3 = 'pop_whs_cd';
    let target_name3 = ['whs_cd', "whs_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name3, pop_whs_cd.ShowFormDialog, target_name3);

    let caller_name4 = 'pop_ship_cd';
    let target_name4 = ['ship_cd', "ship_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name4, pop_ship_cd.ShowFormDialog, target_name4);



    //버튼함수와 연결
    pageManager.BindButtonFunction();

    //그리드 초기화
    pageManager.InitializeComponent();

    //탭
    $('#selected-tab .tab').hide();
    $('#selected-tab #tab1').show();

    $('#tabs').w2tabs({
        name: 'tabs',
        active: 'tab1',
        tabs: [
            { id: 'tab1', caption: '출고처현장별 재고' },
            { id: 'tab2', caption: '품번별 재고' }
        ],
        onClick: function (event) {
            $('#selected-tab .tab').hide(); //display : none;
            $('#selected-tab #' + event.target).show(); //display : block;
            $('#grid2 table tbody').trigger("click");
            if(event.target == 'tab1'){
                w2ui.grid1.refresh();
                Const.SelectedGridID = grid1.name;
            }
            else if(event.target == 'tab2'){
                w2ui.grid2.refresh();
                Const.SelectedGridID = grid2.name;
            }

        }
    });

    //div에 클릭펑션 먹인거...
    $("#grid1").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid1.name;});
    $("#grid2").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid2.name;});
    //선택한 그리드 초기화
    Const.SelectedGridID = grid1.name;


});