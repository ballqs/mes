import PageManager from "/include/js/class/PageManager.js";
import SingleGridPageManager from "/include/js/class/SingleGridPageManager.js";

$(function () {

    //항상 젤 위에서 호출...
    init_grid();

    //기본 버튼 펑션 등록...
    let pageManager = new SingleGridPageManager("id", "grid", "id", "search_frm", "selected", ["fact_cd", "op_cd"]);

    //버튼에 대한 url 등록
    pageManager.SetAjaxUrl(PageManager.Buttons.Search, "/ajax/base/product/get/opinfo");
    pageManager.SetAjaxUrl(PageManager.Buttons.DeleteRow, "/ajax/base/product/delete/opinfo");
    pageManager.SetAjaxUrl(PageManager.Buttons.Save, "/ajax/base/product/save/opinfo");
    // 디비 인터페이스 없는 것들은 url 등록할 필요 없다.
    // pageManager.SetAjaxUrl(PageManager.evtButtons.AddRow, "");
    // pageManager.SetAjaxUrl(PageManager.evtButtons.Initialize, "");

    //폼에 있는 콤보박스 정보 등록
    pageManager.SetFormSelectBox("name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //default_value 가 없으면 콤보박스 기본값을 안 만든다.
    pageManager.SetFormSelectBox("name", "dept_cd", common.code, {up_cd: "dept_cd"}, "cd", "cd_nm", "", "ALL");
    //폼 콤보박스 전체 데이터 불러오기..
    pageManager.InitFormSelectBox();

    //콤보박스 다시 채워줄때 호출...부모 콤보박스가 변경될때 하위 콤보박스 데이터 변경이 생기면 사용
    //pageManager.FillFormSelectBox("name","fact_cd", {up_cd: "fact_cd"}, 1);

    //그리드 콤보박스 정보 등록
    pageManager.SetGridSelectBox("dept_cd", common.code, {up_cd: "dept_cd"}, "cd", "cd_nm");
    pageManager.SetGridSelectBox("fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //그리드 콤보박스 초기화
    pageManager.InitGridSelectBox();

    //그리드 체크박스 정보 등록
    pageManager.SetGridCheckRenderOption("use_yn", "Y", "N");

    //그리드 체크박스 초기화
    pageManager.InitGirdCheckBox();

});


function init_grid() {
    $('#grid').w2grid({
        name: 'grid',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: false
        },
        columns: [
            {
                field: 'recid',
                caption: 'NO',
                size: '50px',
                sortable: true,
                resizable: true,
                style: 'text-align: right'
            },
            {
                field: 'selected',
                caption: '선택',
                size: '100px',
                sortable: true,
                resizable: true,
                editable: {type: 'checkbox'}
            },
            {
                field: 'fact_cd',
                caption: '공장',
                size: '100px',
                sortable: true,
                resizable: true, //hidden:true,
                editable: {
                    type: 'select',
                },
            },
            {
                field: 'op_cd',
                caption: '공정코드',
                size: '100px',
                sortable: true,
                resizable: true,
                editable: {
                    type: 'text', maxLength: 20
                }//, hidden: true
            },
            {
                field: 'op_nm',
                caption: '공정',
                size: '150px',
                sortable: true,
                resizable: true,
                editable: {type: 'text', maxLength: 50},
            },
            {
                field: 'color_desc',
                caption: '색상',
                size: '150px',
                sortable: true,
                resizable: true,
                editable: {type: 'color'},
            },
            {
                field: 'dept_cd',
                caption: '관리부서',
                size: '100px',
                sortable: true,
                resizable: true, //hidden:true,
                editable: { type: 'select'},
            },
            {
                field: 'use_yn',
                caption: '사용여부',
                size: '100px',
                sortable: true,
                resizable: true,
                style: 'text-align: center',
                editable: {
                    type: 'checkbox',
                    style: 'text-align: center',
                }
            },
            {
                field: 'remark',
                caption: '비고',
                size: '200px',
                sortable: true,
                resizable: true,
                editable: {type: 'text', maxLength: 1000}
            },
            {
                field: 'inst_id',
                caption: '입력자ID',
                size: '100px',
                sortable: true,
                resizable: true,
                // editable: { type: 'text' }
            },
            {
                field: 'inst_dt',
                caption: '입력일시',
                size: '150px',
                sortable: true,
                resizable: true,
                style: 'text-align: center',
                // editable: { type: 'date' }
            },
            {
                field: 'updt_id',
                caption: '수정자ID',
                size: '100px',
                sortable: true,
                resizable: true,
                // editable: { type: 'text' }
            },
            {
                field: 'updt_dt',
                caption: '수정일시',
                size: '150px',
                sortable: true,
                resizable: true,
                style: 'text-align: center',
                // editable: { type: 'date' }
            }
        ],
        toolbar: {
            items: [
                {
                    id: 'add',
                    type: 'button',
                    caption: 'Add Record',
                    icon: 'w2ui-icon-plus'
                }
            ],
        },
        records: null
    });
}
