import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_mach_cd from "/include/js/popups/pop_mach_cd.js";

$(function () {
    //항상 젤 위에서 호출...
    initGrid();

    //싱글 그리드 클래스 인스턴스화
    // let pageManager = new SingleGridPageManager("id", "grid01", "id", "search_frm", "chk", ["fact_cd", "prt_nbr_cd"],["prt_nbr_dsp_nm"]);
    let pageManager = new SingleGridPageManager("id", "grid01", "id", "search_frm", "chk", ["fact_cd", "mach_cd"]);

    //버튼에 대한 url 등록
    pageManager.SetAjaxUrl(PageManager.Buttons.Search, "/ajax/base/product/get/eqpmt_mgt");
    pageManager.SetAjaxUrl(PageManager.Buttons.DeleteRow, "/ajax/base/product/delete/eqpmt_mgt");
    pageManager.SetAjaxUrl(PageManager.Buttons.Save, "/ajax/base/product/save/eqpmt_mgt");


    //폼에 있는 콤보박스 정보 등록
    pageManager.SetFormSelectBox("name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    // pageManager.SetFormSelectBox("name", "account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm", "", "ALL");

    //폼 콤보박스 데이터 채우기..
    pageManager.InitFormSelectBox();


    //그리드 콤보박스 정보 등록
    // pageManager.SetGridSelectBox("base_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");

    pageManager.SetGridSelectBox("fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.SetGridSelectBox("mach_type", common.code, {up_cd: "mach_type"}, "cd", "cd_nm");
    pageManager.SetGridSelectBox("mach_staus_cd", common.code, {up_cd: "mach_staus_cd"}, "cd", "cd_nm");
    // pageManager.SetGridSelectBox("supply_type", common.code, {up_cd: "supply_type"}, "cd", "cd_nm");
    // pageManager.SetGridSelectBox("sagub_type", common.code, {up_cd: "sagub_type"}, "cd", "cd_nm");
    // pageManager.SetGridSelectBox("fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //그리드 콤보박스 초기화
    pageManager.InitGridSelectBox();

    //그리드 체크박스 정보 등록
    pageManager.SetGridCheckRenderOption("perfrm_colct_yn", "Y", "N");
    pageManager.SetGridCheckRenderOption("fail_inst_yn", "Y", "N");
    pageManager.SetGridCheckRenderOption("use_yn", "Y", "N");

    //그리드 체크박스 초기화
    pageManager.InitGirdCheckBox();

});

function initGrid(){
    $('#grid01').w2grid({
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장', size: '150px', sortable: true, resizable: true, editable: { type: 'select'}},
            { field: 'mach_cd', caption: '설비코드', size: '100px', sortable: true, resizable: true, hidden: false, editable: { type: 'text', maxLength: 20}},
            { field: 'mach_nm', caption: '설비', size: '150px', sortable: true, resizable: true, editable: { type: 'text', maxLength: 50}},
            { field: 'mach_type', caption: '설비타입', size: '150px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'mach_type1', caption: '설비분류1', size: '100px', sortable: true, resizable: true, editable: { type: 'text', maxLength: 20}},
            { field: 'mach_type2', caption: '설비분류2', size: '100px', sortable: true, resizable: true, editable: { type: 'text', maxLength: 20}},
            { field: 'perfrm_colct_yn', caption: '실적수집여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center',editable: { type: 'checkbox' }},
            { field: 'make_cmpny', caption: '제조사', size: '150px', sortable: true, resizable: true, editable: { type: 'text', maxLength: 100}},
            { field: 'model_nm', caption: '모델명', size: '150px', sortable: true, resizable: true, editable: { type: 'text', maxLength: 50}},
            { field: 'serial_no', caption: '시리얼번호', size: '100px', sortable: true, resizable: true, editable: { type: 'text', maxLength: 30}},
            { field: 'life_span', caption: '수명년수', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: {type: 'int'}},
            { field: 'cntct_nbr', caption: '연락처', size: '150px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 100 }},
            { field: 'instal_plc', caption: '설치장소', size: '150px', sortable: true, resizable: true,editable: { type: 'text', maxlength: 100 }},
            { field: 'pop', caption: '담당자_정코드', size: '100px', sortable: true, resizable: true,hidden: true},
            { field: 'ma_wrkr1', caption: '담당자_정', size: '150px', sortable: true, resizable: true,editable: { type: 'text', maxlength: 20 }},
            { field: 'pop', caption: '담당자_부코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'ma_wrkr2', caption: '담당자_부', size: '150px', sortable: true, resizable: true,editable: { type: 'text', maxlength: 20 }},
            { field: 'mach_tech_wrkr', caption: '장비기술담당자', size: '150px', sortable: true, resizable: true,editable: { type: 'text', maxlength: 20 }},
            { field: 'buy_ymd', caption: '도입일자', size: '150px', sortable: true, resizable: true, style:'text-align: center', editable: { type: 'date' }},
            { field: 'buy_price', caption: '도입가격', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'int' }},
            { field: 'mach_staus_cd', caption: '설비상태', size: '150px', sortable: true, resizable: true,editable: { type: 'select' }},
            { field: 'last_inspct_ymd', caption: '최종검사일자', size: '150px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'date' }},
            { field: 'limit_day', caption: '유효일수', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'text', maxlength: 10 }},
            { field: 'cavity', caption: 'CAVITY', size: '100px', sortable: true, resizable: true, editable: { type: 'int' }, style: 'text-align: right'},
            { field: 'dsgn_shot', caption: '디자인쇼트', size: '100px', sortable: true, resizable: true, editable: { type: 'int' }, style: 'text-align: right'},
            { field: 'wrk_shot', caption: '작업쇼트', size: '100px', sortable: true, resizable: true, editable: { type: 'int' }, style: 'text-align: right'},
            { field: 'tot_shot', caption: '전체사용수', size: '100px', sortable: true, resizable: true,editable: { type: 'int' }, style: 'text-align: right'},
            { field: 'mold_use_cnt', caption: '금형사용횟수', size: '100px', sortable: true, resizable: true, editable: { type: 'int' }, style: 'text-align: right'},
            { field: 'lst_use_ymd', caption: '최종사용일자', size: '150px', sortable: true, resizable: true, editable: { type: 'date' }, style: 'text-align: center'},
            { field: 'fail_inst_yn', caption: '고장실적등록여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'mach_inspt_cycle', caption: '설비점검주기', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'int' }},
            { field: 'inspct_alram_cycle', caption: '점검알람주기', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'int' }},
            { field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 1000} },
            { field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true },
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true },
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
    });

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);
    let pop_mach_cd = new Pop_mach_cd(pageManager, search_frm_id);

    //폼 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //폼 팝업 등록
    let caller_name = "pop_mach_cd";
    let target_name = "mach_cd";
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_mach_cd.ShowFormDialog, target_name);

}
