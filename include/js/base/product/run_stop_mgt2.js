import SingleGridPageManager from "../../class/SingleGridPageManager.js";
import PageManager from "../../class/PageManager.js";

var people = [
    { id: 1, text: 'John Cook' },
    { id: 2, text: 'Steve Jobs' },
    { id: 3, text: 'Peter Sanders' },
    { id: 4, text: 'Mark Newman' },
    { id: 5, text: 'Addy Osmani' },
    { id: 6, text: 'Paul Irish' },
    { id: 7, text: 'Doug Crocford' },
    { id: 8, text: 'Nicolas Cage' }
];

$(function () {

    //항상 젤 위에서 호출...
    initGrid();

    //싱글 그리드 클래스 인스턴스화
    let pageManager = new SingleGridPageManager("id", "grid", "id", "search_frm", "chk", ["fact_cd", "stop_cd"]);

    //버튼에 대한 url 등록
    pageManager.SetAjaxUrl(PageManager.Buttons.Search, "/ajax/base/product/get/run_stop_mgt");
    pageManager.SetAjaxUrl(PageManager.Buttons.DeleteRow, "/ajax/base/product/delete/run_stop_mgt");
    pageManager.SetAjaxUrl(PageManager.Buttons.Save, "/ajax/base/product/save/run_stop_mgt");


    //폼에 있는 콤보박스 정보 등록
    pageManager.SetFormSelectBox("name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //폼 콤보박스 데이터 채우기..
    pageManager.InitFormSelectBox();

    //그리드 콤보박스 정보 등록
    pageManager.SetGridSelectBox("fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.SetGridSelectBox("stop_gbn", common.code, {up_cd: "stop_gbn"}, "cd", "cd_nm");

    //그리드 콤보박스 초기화
    pageManager.InitGridSelectBox();

    //그리드 체크박스 정보 등록
    pageManager.SetGridCheckRenderOption("use_yn", "Y", "N");

    //그리드 체크박스 초기화
    pageManager.InitGirdCheckBox();
});


function initGrid(){
    $('#grid').w2grid({
        name: 'grid',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' } },
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, hidden: false, editable: { type: 'select' } },
            { field: 'stop_cd', caption: '비가동코드', size: '100px', sortable: true, resizable: true, hidden: false, editable: { type: 'text', maxlength: 20 }},
            { field: 'stop_nm', caption: '비가동', size: '150px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 50 }},
            { field: 'stop_gbn', caption: '비가동구분', size: '100px', sortable: true, resizable: true, hidden: false, editable: { type: 'select' } },
            { field: 'seq', caption: '순서', size: '100px', sortable: true, resizable: true,  style: 'text-align: right', editable: { type: 'int' }},
            { field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 1000 }},
            { field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true},
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center' },
            { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
    });
}