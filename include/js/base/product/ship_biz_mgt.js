
import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_mach_cd from "/include/js/popups/pop_mach_cd.js";
import Pop_prt_nbr_cd from "../../popups/pop_prt_nbr_cd.js";
import Pop_biz_cd from "../../popups/pop_biz_cd.js";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장', size: '80px', sortable: true, resizable: true, hidden: false, editable: { type: 'select' }},
            // { field: 'text', caption: '공장', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'ship_biz_cd', caption: '출하업체코드', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'ship_biz_nm', caption: '출하업체명', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'prt_nbr_nm', caption: '품번명', size: '150px', sortable: true, resizable: true,editable: { type: 'text' }  },
            { field: 'ship_price', caption: '출하단가', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'text' }},
            { field: 'rewrk_price1', caption: '재작업단가1', size: '150px', sortable: true, resizable: true,  style: 'text-align: right',editable: { type: 'text' }},
            { field: 'rewrk_price2', caption: '재작업단가2', size: '150px', sortable: true, resizable: true,  style: 'text-align: right', editable: { type: 'text' }},
            { field: 'ship_prt_nbr', caption: '출하업체품번코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: { type: 'text' }},
            { field: 'parking_unit', caption: '포장단위', size: '150px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'parking_qty', caption: '포장수량', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'whs_use_yn', caption: '창고사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox', style: 'text-align: center' }
            },
            { field: 'use_yn',     caption: '사용여부',     size: '100px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox', style: 'text-align: center' }
            },
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true},
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],

    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";

    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);

    let pop_biz_cd = new Pop_biz_cd(pageManager, search_frm_id);
    pop_biz_cd.AddParentReferFormTag(["cmpny_cd"], ["biz_cd"]);
    pop_biz_cd.AddParentReferGridTag(["cmpny_cd"], ["biz_cd"]);
    pop_biz_cd.AddTargetColumnsOnPopupClose(["biz_cd","biz_nm"], ["ship_biz_cd","ship_biz_nm"]);


    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddTargetColumnsOnPopupClose(["prt_nbr_cd","prt_nbr_nm"], ["prt_nbr_cd","prt_nbr_nm"]);




    grid01 = pageManager.gridManager.AddGrid(grid01);
    //팝업등록
    pageManager.gridManager.AddPopUpOption(grid01.name,"ship_biz_cd", pop_biz_cd.PopupName);
    pageManager.gridManager.AddPopUpOption(grid01.name,"prt_nbr_cd", pop_prt_nbr_cd.PopupName);

    pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");

    //PK, 필수입력, Readonly 필드 등록
    pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "ship_biz_cd","prt_nbr_cd"]);

    // pageManager.gridManager.SetReadonlyFields(grid01.name,  ["prt_nbr_dsp_nm"]);
    pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["prt_nbr_nm","parking_unit"]);

    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"parking_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");


    //체크박스 T/F 정보 등록..
    pageManager.gridManager.AddCheckRenderOption(grid01.name,"use_yn", "Y", "N");
    pageManager.gridManager.AddCheckRenderOption(grid01.name,"whs_use_yn", "Y", "N");



    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/base/product/get/ship_biz_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/base/product/delete/ship_biz_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/base/product/save/ship_biz_mgt");

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);

    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","prt_nbr_grp_cd", common.code, {up_cd: 'prt_nbr_grp_cd'}, "cd", "cd_nm", "", "전체");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","biz_cd", common.code, {up_cd: "cmpny_cd"},"cd", "cd_nm");


    //폼 팝업 등록

    let caller_name = "pop_biz_cd";
    let target_name = ["biz_cd", "biz_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_biz_cd.ShowFormDialog, target_name);
    caller_name = "btn_pop_prt_nbr_cd";
    target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);

    //버튼함수와 연결
    pageManager.BindButtonFunction();

    //그리드 초기화
    pageManager.InitializeComponent();

    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;




});