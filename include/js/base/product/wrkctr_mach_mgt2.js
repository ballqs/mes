import PageManager from "/include/js/class/PageManager.js";
import SingleGridPageManager from "/include/js/class/SingleGridPageManager.js";

$(function () {

    //항상 젤 위에서 호출...
    initGrid();

    //기본 버튼 펑션 등록...
    let pageManager = new SingleGridPageManager("id", "grid01", "id", "search_frm", "chk", ["fact_cd", "wrkctr_cd", "mach_cd"]);

    //버튼에 대한 url 등록
    pageManager.SetAjaxUrl(PageManager.Buttons.Search, "/ajax/base/product/get/wrkctr_mach_mgt");
    pageManager.SetAjaxUrl(PageManager.Buttons.DeleteRow, "/ajax/base/product/delete/wrkctr_mach_mgt");
    pageManager.SetAjaxUrl(PageManager.Buttons.Save, "/ajax/base/product/save/wrkctr_mach_mgt");
    // 디비 인터페이스 없는 것들은 url 등록할 필요 없다.
    // pageManager.SetAjaxUrl(PageManager.evtButtons.AddRow, "");
    // pageManager.SetAjaxUrl(PageManager.evtButtons.Initialize, "");

    //폼에 있는 콤보박스 정보 등록
    pageManager.SetFormSelectBox("name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //default_value 가 없으면 콤보박스 기본값을 안 만든다.
    // pageManager.SetFormSelectBox("name", "dept_cd", common.code, {up_cd: "dept_cd"}, "cd", "cd_nm", "", "ALL");
    //폼 콤보박스 전체 데이터 불러오기..
    pageManager.InitFormSelectBox();

    //콤보박스 다시 채워줄때 호출...부모 콤보박스가 변경될때 하위 콤보박스 데이터 변경이 생기면 사용
    //pageManager.FillFormSelectBox("name","fact_cd", {up_cd: "fact_cd"}, 1);

    //그리드 콤보박스 정보 등록
    // pageManager.SetGridSelectBox("dept_cd", common.code, {up_cd: "dept_cd"}, "cd", "cd_nm");
    pageManager.SetGridSelectBox("fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.SetGridSelectBox("wrkctr_cd", common.exCode, {table: "tbp_wrkctrinfo"}, "wrkctr_cd", "wrkctr_nm");
    pageManager.SetGridSelectBox("mach_cd", common.exCode, {table: "tbp_machinfo"}, "mach_cd", "mach_nm");


    // tbp_wrkctrinfo
    //그리드 콤보박스 초기화
    pageManager.InitGridSelectBox();

    //그리드 체크박스 정보 등록
    pageManager.SetGridCheckRenderOption("colct_aply_yn", "Y", "N");
    pageManager.SetGridCheckRenderOption("use_yn", "Y", "N");

    //그리드 체크박스 초기화
    pageManager.InitGirdCheckBox();


});


function initGrid(){
    $('#grid01').w2grid({
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, editable: { type: 'checkbox'}, style: 'text-align: right'},
            { field: 'fact_cd', caption: '공장', size: '150px', sortable: true, resizable: true, editable: { type: 'select'}},
            { field: 'wrkctr_cd', caption: '작업장(popup)', size: '150px', sortable: true, resizable: true, editable: { type: 'select'}},
            { field: 'mach_cd', caption: '설비명(popup)', size: '150px', sortable: true, resizable: true, editable: { type: 'select'}},
            { field: 'dsp_seq', caption: '표시순서', size: '100px', sortable: true, resizable: true, editable: { type: 'float'}, style: 'text-align: right'},
            { field: 'colct_aply_yn', caption: '실적수집여부', size: '100px', sortable: true, resizable: true, editable: { type: 'checkbox'}, style: 'text-align: right'},
            { field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, editable: { type: 'checkbox'}, style: 'text-align: right'},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text'}},
            { field: 'inst_id', caption: '입력자 ID', size: '100px', sortable: true, resizable: true },
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true,  style: 'text-align: center'},
            { field: 'updt_id', caption: '수정자 ID', size: '100px', sortable: true, resizable: true },
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true,  style: 'text-align: center'}
        ],
        // records: [
        //     { recid: 1,
        //         prt_nbr_cd: 'MS23333',
        //         prt_nbr_nm:'ddd',
        //         trans_unit_cd:'M001',
        //         trans_unit: 2,
        //         base_unit_cd:'M3333',
        //         pln_qty:'ddd',
        //         pln_unit: 1,
        //         pln_gbn: 1,
        //         num:'999',
        //         base_unit:1,
        //         trans_qty:'100',
        //         base_qty:'100',
        //         remark:'기타 비고사항',
        //         inst_id:'themomos',
        //         inst_dt:'2020-10-21 00:00:00',
        //         updt_id:'themomos',
        //         updt_dt:'2020-10-21 00:00:00',
        //         pop: '<div style="float:left; line-height:40px;">내용</div><a class="popBtInner" onclick="open_pop_prt_nbr_cd()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>'
        //     }
        // ]
    });
}