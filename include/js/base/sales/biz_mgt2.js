import SingleGridPageManager from "../../class/SingleGridPageManager.js";
import PageManager from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager";

$(function () {
    //항상 젤 위에서 호출...
    initGrid();

    //싱글 그리드 클래스 인스턴스화
    //let pageManager = new SingleGridPageManager("id", "grid01", "id", "search_frm", "chk", ["cmpny_cd", "biz_cd"]);
    let search_frm_id = "search_frm";

    //버튼에 대한 url 등록
    pageManager.SetAjaxUrl(PageManager.Buttons.Search, "/ajax/base/sales/get/biz_mgt");
    pageManager.SetAjaxUrl(PageManager.Buttons.DeleteRow, "/ajax/base/sales/delete/biz_mgt");
    pageManager.SetAjaxUrl(PageManager.Buttons.Save, "/ajax/base/sales/save/biz_mgt");

    //폼에 있는 콤보박스 정보 등록
    // pageManager.SetFormSelectBox("name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.SetFormSelectBox("name", "cmpny_cd", common.code, {up_cd: "cmpny_cd"}, "cd", "cd_nm");

    //폼 콤보박스 데이터 채우기..
    pageManager.InitFormSelectBox();

    //그리드 콤보박스 정보 등록
    pageManager.SetGridSelectBox("biz_gbn", common.code, {up_cd: "biz_gbn"}, "cd", "cd_nm");
    pageManager.SetGridSelectBox("cmpny_cd", common.code, {up_cd: "cmpny_cd"}, "cd", "cd_nm");
    // pageManager.SetGridSelectBox("prt_nbr_cd", common.exCode, {table: "tbm_prtnbrinfo"}, "prt_nbr_cd", "prt_nbr_nm");
    // pageManager.SetGridSelectBox("prt_nbr_nm", common.exCode, {table: "tbm_prtnbrinfo"}, "prt_nbr_nm", "prt_nbr_cd");

    //그리드 콤보박스 초기화
    pageManager.InitGridSelectBox();

    //그리드 체크박스 정보 등록
    pageManager.SetGridCheckRenderOption("use_yn", "Y", "N");

    //그리드 체크박스 초기화
    pageManager.InitGirdCheckBox();



});

function initGrid(){
    $('#grid01').w2grid({
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'cmpny_cd', caption: '사업장코드', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'biz_cd', caption: '거래처코드(popup)', size: '100px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 20 }},
            /*
            * popup btn
            * <div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="open_pop_biz_cd()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            */
            { field: 'biz_nm', caption: '거래처명', size: '150px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 50 }},  // popup btn
            { field: 'biz_gbn', caption: '거래처구분', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'biz_item', caption: '종목', size: '100px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 50 }},
            { field: 'biz_type', caption: '업태', size: '100px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 50 }},
            { field: 'adr', caption: '주소', size: '200px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 100 }},
            { field: 'reprst_nm', caption: '대표자', size: '100px', sortable: true, resizable: true,  style: 'text-align: center', editable: { type: 'text', maxlength: 10 }},
            { field: 'biz_reg_no', caption: '사업자번호', size: '150px', sortable: true, resizable: true,  style: 'text-align: right', editable: { type: 'text', maxlength: 10 }},
            { field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 1000 }},
            { field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true },
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true },
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
    });
}


function open_pop_biz_cd() {
    // let selected_fact_cd = $("#search_frm select[name='fact_cd']").val();
    // let selected_fact_nm = $("#search_frm select[name='fact_cd'] option:checked").text();
    pop_biz_cd.pop_open();
    // pop_part_nbr(selected_fact_cd, selected_fact_nm, account_type);
}
