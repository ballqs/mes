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
    let pageManager = new SingleGridPageManager("id", "grid", "id", "search_frm", "chk", ["fact_cd", "po_biz_cd", "prt_nbr_cd"]);

    //버튼에 대한 url 등록
    pageManager.SetAjaxUrl(PageManager.Buttons.Search, "/ajax/base/product/get/po_biz_mgt");
    pageManager.SetAjaxUrl(PageManager.Buttons.DeleteRow, "/ajax/base/product/delete/po_biz_mgt");
    pageManager.SetAjaxUrl(PageManager.Buttons.Save, "/ajax/base/product/save/po_biz_mgt");

    //폼에 있는 콤보박스 정보 등록
    pageManager.SetFormSelectBox("name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //폼 콤보박스 데이터 채우기..
    pageManager.InitFormSelectBox();

    //그리드 콤보박스 정보 등록
    pageManager.SetGridSelectBox("fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.SetGridSelectBox("po_biz_cd", common.code, {up_cd: "po_biz_cd"}, "cd", "cd_nm");
    pageManager.SetGridSelectBox("prt_nbr_cd", common.exCode, {table: "tbm_prtnbrinfo"}, "prt_nbr_cd", "prt_nbr_nm");
    pageManager.SetGridSelectBox("prt_nbr_nm", common.exCode, {table: "tbm_prtnbrinfo"}, "prt_nbr_nm", "prt_nbr_cd");

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
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, hidden: true, editable: { type: 'select' }},
            // { field: 'text', caption: '공장', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            // { field: 'po_biz_nm', caption: '발주업체코드', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'po_biz_cd', caption: '발주업체(popup)', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'text', caption: '품번코드(popup)', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'text', caption: '품번', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'text', caption: '규격', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'num', caption: '단가', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'text' }},
            { field: 'num', caption: '재작업단가1', size: '150px', sortable: true, resizable: true,  style: 'text-align: right',editable: { type: 'text' }},
            { field: 'num', caption: '재작업단가2', size: '150px', sortable: true, resizable: true,  style: 'text-align: right', editable: { type: 'text' }},
            { field: 'combo', caption: '업체품번코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: { type: 'text' }},
            { field: 'text', caption: '업체품번', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'text', caption: '발주단위코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'select', caption: '발주단위명', size: '100px', sortable: true, resizable: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'select', caption: '사급유형', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'text', caption: '사급유형', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'check', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox', style: 'text-align: center' }
            },
            { field: 'text', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'text', caption: '입력자ID', size: '100px', sortable: true, resizable: true},
            { field: 'date', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'text', caption: '수정자ID', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'date', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
        toolbar: {
            items: [
                { id: 'add', type: 'button', caption: 'Add Record', icon: 'w2ui-icon-plus' }
            ],
            onClick: function (event) {
                if (event.target == 'add') {
                    w2ui.grid.add({ recid: w2ui.grid.records.length + 1 });
                }
            }
        },
        records: [
            { recid: 1, text: 'dddd', num: '999', date: '2020-02-02', select: 2}
        ]
    });
}


function showChanged() {
    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}

// widget configuration
var config = {
    layout: {
        name: 'layout',
        padding: 4,
        panels: [
            { type: 'left', size: '100%', resizable: true}
            // { type: 'main', minSize: 600 }
        ]
    },
    grid: {
        name: 'grid',
        columns: [
            { field: 'fname', caption: 'First Name', size: '33%', sortable: true, searchable: true },
            { field: 'lname', caption: 'Last Name', size: '33%', sortable: true, searchable: true },
            { field: 'email', caption: 'Email', size: '33%' },
            { field: 'sdate', caption: 'Start Date', size: '120px', render: 'date' }
        ],
        records: [
            { recid: 1, fname: 'John', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 9, fname: 'Sergei', lname: 'Rachmaninov', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
        ],
        onClick: function(event) {
            var grid = this;
            var form = w2ui.form;
            event.onComplete = function () {
                var sel = grid.getSelection();
                if (sel.length == 1) {
                    form.recid  = sel[0];
                    form.record = $.extend(true, {}, grid.get(sel[0]));
                    form.refresh();
                } else {
                    form.clear();
                }
            }
        }
    }
};

$(function () {
    // initialization in memory
    $().w2layout(config.layout);
    $().w2grid(config.grid);
    $().w2form(config.form);
});

function openPopup() {
    w2popup.open({
        title   : '공정',
        width   : 900,
        height  : 1000,
        showMax : true,
        body    : '<div id="main" style="position: absolute; left: 5px; top: 5px; right: 5px; bottom: 5px;"></div>',
        onOpen  : function (event) {
            event.onComplete = function () {
                $('#w2ui-popup #main').w2render('layout');
                w2ui.layout.content('left', w2ui.grid);
            };
        },
        onToggle: function (event) {
            event.onComplete = function () {
                w2ui.layout.resize();
            }
        },
        buttons   : '<button class="w2ui-btn" onclick="w2popup.close();">닫기</button> '+
                    '<button class="w2ui-btn" onclick="w2popup.lock(\'Loading\', true); '+
                    '        setTimeout(function () { w2popup.unlock(); }, 2000);" style="background: #ff9000;">확인</button>', //lock 이라고 되어있었음
    });
}

function open_pop_prt_nbr_cd() {
    let selected_fact_cd = $("#search_frm select[name='fact_cd']").val();
    let selected_fact_nm = $("#search_frm select[name='fact_cd'] option:checked").text();
    pop_prt_nbr_cd.pop_open(selected_fact_cd, selected_fact_nm);
    // pop_part_nbr(selected_fact_cd, selected_fact_nm, account_type);
}
