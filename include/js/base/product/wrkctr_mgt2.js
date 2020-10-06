import PageManager from "/include/js/class/PageManager.js";
import SingleGridPageManager from "/include/js/class/SingleGridPageManager.js";

$(function () {
    //항상 젤 위에서 호출...
    initGrid();

    //싱글 그리드 클래스 인스턴스화
    // let pageManager = new SingleGridPageManager("id", "grid01", "id", "search_frm", "chk", ["fact_cd", "prt_nbr_cd"],["prt_nbr_dsp_nm"]);
    let pageManager = new SingleGridPageManager("id", "grid", "id", "search_frm", "chk", ["fact_cd", "wrkctr_cd"]);

    //버튼에 대한 url 등록
    pageManager.SetAjaxUrl(PageManager.Buttons.Search, "/ajax/base/product/get/wrkctr_mgt");

    pageManager.SetAjaxUrl(PageManager.Buttons.DeleteRow, "/ajax/base/product/delete/wrkctr_mgt");
    pageManager.SetAjaxUrl(PageManager.Buttons.Save, "/ajax/base/product/save/wrkctr_mgt");


    //폼에 있는 콤보박스 정보 등록
    pageManager.SetFormSelectBox("name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    // pageManager.SetFormSelectBox("name", "account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm", "", "ALL");

    //폼 콤보박스 데이터 채우기..
    pageManager.InitFormSelectBox();


    //그리드 콤보박스 정보 등록
    // pageManager.SetGridSelectBox("base_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");

    pageManager.SetGridSelectBox("fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.SetGridSelectBox("op_cd", common.exCode, {table: "tbp_opinfo"}, "op_cd", "op_nm");
    // pageManager.SetGridSelectBox("account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm");
    // pageManager.SetGridSelectBox("supply_type", common.code, {up_cd: "supply_type"}, "cd", "cd_nm");
    // pageManager.SetGridSelectBox("sagub_type", common.code, {up_cd: "sagub_type"}, "cd", "cd_nm");
    //pageManager.SetGridSelectBox("fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //그리드 콤보박스 초기화
    pageManager.InitGridSelectBox();

    //그리드 체크박스 정보 등록
    pageManager.SetGridCheckRenderOption("staus_brd_yn", "Y", "N");
    pageManager.SetGridCheckRenderOption("op_dsply_yn", "Y", "N");
    pageManager.SetGridCheckRenderOption("use_yn", "Y", "N");

    //그리드 체크박스 초기화
    pageManager.InitGirdCheckBox();

    function popup()
    {
        openPopup("winplus01", onPopupCloseCallback);
    }
    $("#btn_pop_prt_nbr_cd").on("click", (event)=>{
            openPopup2("winplus01", onPopupCloseCallback);
        },
    );
});

function initGrid(){
    $('#grid').w2grid({
        name: 'grid',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장', size: '150px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'wrkctr_cd', caption: '작업장코드', size: '100px', sortable: true, resizable: true, hidden: false, editable: { type: 'text' }},
            { field: 'wrkctr_nm', caption: '작업장', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'op_cd', caption: '공정', size: '150px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'moniter_nm', caption: '모니터링', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox'}},
            { field: 'staus_brd_yn', caption: '현황판 표시 여부', size: '150px', sortable: true, resizable: true, editable: { type: 'checkbox' }},
            { field: 'staus_brd_seq', caption: '현황판 표시 순서', size: '150px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'text' }},
            { field: 'op_dsply_yn', caption: '가동현황 표시 여부', size: '150px', sortable: true, resizable: true, editable: { type: 'checkbox' }},
            { field: 'op_staus_ordr', caption: '가동현황 표시 순서', size: '150px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'text' }},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'time' }},
            { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'time'}}
        ],
    });
}