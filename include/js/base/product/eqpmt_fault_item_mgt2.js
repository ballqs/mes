import SingleGridPageManager from "../../class/SingleGridPageManager.js";
import PageManager from "../../class/PageManager.js";

$(function () {
    //항상 젤 위에서 호출...
    initGrid();

    //싱글 그리드 클래스 인스턴스화
    // let pageManager = new SingleGridPageManager("id", "grid01", "id", "search_frm", "chk", ["fact_cd", "prt_nbr_cd"],["prt_nbr_dsp_nm"]);
    let pageManager = new SingleGridPageManager("id", "grid", "id", "search_frm", "chk", ["fault_cd"]);

    //버튼에 대한 url 등록
    pageManager.SetAjaxUrl(PageManager.Buttons.Search, "/ajax/base/product/get/eqpmt_fault_item_mgt");
    pageManager.SetAjaxUrl(PageManager.Buttons.DeleteRow, "/ajax/base/product/delete/eqpmt_fault_item_mgt");
    pageManager.SetAjaxUrl(PageManager.Buttons.Save, "/ajax/base/product/save/eqpmt_fault_item_mgt");


    //폼에 있는 콤보박스 정보 등록
    // pageManager.SetFormSelectBox("name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    // pageManager.SetFormSelectBox("name", "account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm", "", "ALL");

    //폼 콤보박스 데이터 채우기..
    // pageManager.InitFormSelectBox();


    //그리드 콤보박스 정보 등록
    // pageManager.SetGridSelectBox("base_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");

    // pageManager.SetGridSelectBox("fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    // pageManager.SetGridSelectBox("mach_type", common.code, {up_cd: "mach_type"}, "cd", "cd_nm");
    pageManager.SetGridSelectBox("fault_type", common.code, {up_cd: "fault_type"}, "cd", "cd_nm");
    // pageManager.SetGridSelectBox("supply_type", common.code, {up_cd: "supply_type"}, "cd", "cd_nm");
    // pageManager.SetGridSelectBox("sagub_type", common.code, {up_cd: "sagub_type"}, "cd", "cd_nm");
    // pageManager.SetGridSelectBox("fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //그리드 콤보박스 초기화
    pageManager.InitGridSelectBox();

    //그리드 체크박스 정보 등록
    // pageManager.SetGridCheckRenderOption("perfrm_colct_yn", "Y", "N");
    // pageManager.SetGridCheckRenderOption("fail_inst_yn", "Y", "N");
    pageManager.SetGridCheckRenderOption("use_yn", "Y", "N");

    //그리드 체크박스 초기화
    pageManager.InitGirdCheckBox();

});


function initGrid(){
    $('#grid').w2grid({
        name: 'grid',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fault_cd', caption: '고장코드', size: '150px', sortable: true, resizable: true, editable: { type: 'text', maxLength: 20}},
            { field: 'fault_type', caption: '고장유형', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'fault_nm', caption: '고장', size: '150px', sortable: true, resizable: true, editable: { type: 'text', maxLength: 50}},
            { field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox'}},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text', maxLength: 1000 }},
            { field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true},
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true},
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
        // records: [
        //     { recid: 1, text:999, percent:20, int: 100, money: 100, date: '1/1/2014', combo: 'ddd', check: true }
        // ]
    });
}
