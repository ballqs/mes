import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_biz_cd from "/include/js/popups/pop_biz_cd.js";

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

    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'select', caption: '사업장코드', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select' }},
            { field: 'combo', caption: '사업장', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'biz_cd', caption: '거래처코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: { type: 'text' }},
            { field: 'pop', caption: '거래처(popup)', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},  // popup btn
            { field: 'pop', caption: '출고처코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: { type: 'text' }},
            { field: 'pop', caption: '출고처(popup)', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},  // popup btn
            { field: 'combo', caption: '출고처위치', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'check', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'combo', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'combo', caption: '입력자ID', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'time', caption: '입력일시', size: '150px', sortable: true, resizable: true, editable: { type: 'time' }},
            { field: 'combo', caption: '수정자ID', size: '100px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'time', caption: '수정일시', size: '150px', sortable: true, resizable: true, editable: { type: 'time' }}
        ]
    };

    let search_frm_id = "search_frm";
    let bnt_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, bnt_frm_id);
    let pop_biz_cd = new Pop_biz_cd(pageManager, search_frm_id);

    //폼 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //폼 팝업 등록
    let caller_name = "pop_biz_cd";
    let target_name = "whs_nm";
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_biz_cd.ShowFormDialog, target_name);






    // //항상 젤 위에서 호출...
    // initGrid();
    //
    // //싱글 그리드 클래스 인스턴스화
    // let pageManager = new SingleGridPageManager("id", "grid01", "id", "search_frm", "chk", ["cmpny_cd", "biz_cd", "ship_cd"]);
    //
    // //버튼에 대한 url 등록
    // pageManager.SetAjaxUrl(PageManager.Buttons.Search, "/ajax/base/sales/get/biz_plce_mgt");
    // pageManager.SetAjaxUrl(PageManager.Buttons.DeleteRow, "/ajax/base/sales/delete/bizbiz_plce_mgt_mgt");
    // pageManager.SetAjaxUrl(PageManager.Buttons.Save, "/ajax/base/sales/save/biz_plce_mgt");
    //
    // //폼에 있는 콤보박스 정보 등록
    // // pageManager.SetFormSelectBox("name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    // pageManager.SetFormSelectBox("name", "cmpny_cd", common.code, {up_cd: "cmpny_cd"}, "cd", "cd_nm");
    //
    // //폼 콤보박스 데이터 채우기..
    // pageManager.InitFormSelectBox();
    //
    // //그리드 콤보박스 정보 등록
    // pageManager.SetGridSelectBox("biz_gbn", common.code, {up_cd: "biz_gbn"}, "cd", "cd_nm");
    // pageManager.SetGridSelectBox("cmpny_cd", common.code, {up_cd: "cmpny_cd"}, "cd", "cd_nm");
    // // pageManager.SetGridSelectBox("prt_nbr_cd", common.exCode, {table: "tbm_prtnbrinfo"}, "prt_nbr_cd", "prt_nbr_nm");
    // // pageManager.SetGridSelectBox("prt_nbr_nm", common.exCode, {table: "tbm_prtnbrinfo"}, "prt_nbr_nm", "prt_nbr_cd");
    //
    // //그리드 콤보박스 초기화
    // pageManager.InitGridSelectBox();
    //
    // //그리드 체크박스 정보 등록
    // pageManager.SetGridCheckRenderOption("use_yn", "Y", "N");
    //
    // //그리드 체크박스 초기화
    // pageManager.InitGirdCheckBox();


});

// function initGrid(){
//     $('#grid01').w2grid({
//         name: 'grid01',
//         columns: [
//             { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
//             { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center',
//                 editable: { type: 'checkbox' }
//             },
//             { field: 'select', caption: '사업장코드', size: '100px', sortable: true, resizable: true, hidden: true,
//                 editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
//                 render: function (record, index, col_index) {
//                     var html = '';
//                     for (var p in people) {
//                         if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
//                     }
//                     return html;
//                 }
//             },
//             { field: 'combo', caption: '사업장', size: '150px', sortable: true, resizable: true,
//                 editable: { type: 'text' }
//             },
//             { field: 'biz_cd', caption: '거래처코드', size: '100px', sortable: true, resizable: true, hidden: true,
//                 editable: { type: 'text' }
//             },
//             { field: 'pop', caption: '거래처(popup)', size: '150px', sortable: true, resizable: true,
//                 editable: { type: 'text' }
//             },  // popup btn
//             { field: 'pop', caption: '출고처코드', size: '100px', sortable: true, resizable: true, hidden: true,
//                 editable: { type: 'text' }
//             },
//
//             { field: 'pop', caption: '출고처(popup)', size: '150px', sortable: true, resizable: true,
//                 editable: { type: 'text' }
//             },  // popup btn
//             { field: 'combo', caption: '출고처위치', size: '150px', sortable: true, resizable: true,
//                 editable: { type: 'text' }
//             },
//             { field: 'check', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center',
//                 editable: { type: 'checkbox' }
//             },
//             { field: 'combo', caption: '비고', size: '300px', sortable: true, resizable: true,
//                 editable: { type: 'text' }
//             },
//             { field: 'combo', caption: '입력자ID', size: '100px', sortable: true, resizable: true,
//                 editable: { type: 'text' }
//             },
//             { field: 'time', caption: '입력일시', size: '150px', sortable: true, resizable: true,
//                 editable: { type: 'time' }
//             },
//             { field: 'combo', caption: '수정자ID', size: '100px', sortable: true, resizable: true,
//                 editable: { type: 'text' }
//             },
//             { field: 'time', caption: '수정일시', size: '150px', sortable: true, resizable: true,
//                 editable: { type: 'time' }
//             }
//         ],
//         records: [
//             { recid: 1, text:999, percent:20, int: 100, money: 100, date: '1/1/2014', combo: 'ddd', check: true,  select:'2', biz_cd:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="open_pop_biz_cd()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>', pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>', chk: true},
//             { recid: 2, int: 200, money: 454.40, percent: 15, date: '1/1/2014', check: false, list: { id: 2, text: 'Steve Jobs' } },
//             { recid: 3, int: 350, money: 1040, percent: 98, date: '3/14/2014', check: true },
//             { recid: 4, int: 350, money: 140, percent: 58, date: '1/31/2014', check: true, list: { id: 4, text: 'Mark Newman' } },
//             { recid: 5, int: 350, money: 500, percent: 78, date: '4/1/2014', check: false }
//         ]
//     });
// }
//
// // widget configuration
// var config = {
//     layout: {
//         name: 'layout',
//         padding: 4,
//         panels: [
//             { type: 'left', size: '100%', resizable: true}
//         ]
//     },
//     grid: {
//         name: 'grid',
//         columns: [
//             { field: 'fname', caption: 'First Name', size: '33%', sortable: true, searchable: true },
//             { field: 'lname', caption: 'Last Name', size: '33%', sortable: true, searchable: true },
//             { field: 'email', caption: 'Email', size: '33%' },
//             { field: 'sdate', caption: 'Start Date', size: '120px', render: 'date' }
//         ],
//         records: [
//             { recid: 1, fname: 'John', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
//             { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
//             { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
//             { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
//             { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
//             { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
//             { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
//             { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
//             { recid: 9, fname: 'Sergei', lname: 'Rachmaninov', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
//         ],
//         onClick: function(event) {
//             var grid = this;
//             var form = w2ui.form;
//             event.onComplete = function () {
//                 var sel = grid.getSelection();
//                 if (sel.length == 1) {
//                     form.recid  = sel[0];
//                     form.record = $.extend(true, {}, grid.get(sel[0]));
//                     form.refresh();
//                 } else {
//                     form.clear();
//                 }
//             }
//         }
//     }
// };

// $(function () {
//     // initialization in memory
//     $().w2layout(config.layout);
//     $().w2grid(config.grid);
// });

// function openPopup() {
//     w2popup.open({
//         title   : '창고리스트',
//         width   : 900,
//         height  : 1000,
//         showMax : true,
//         body    : '<div id="main" style="position: absolute; left: 5px; top: 5px; right: 5px; bottom: 5px;"></div>',
//         onOpen  : function (event) {
//             event.onComplete = function () {
//                 $('#w2ui-popup #main').w2render('layout');
//                 w2ui.layout.content('left', w2ui.grid);
//             };
//         },
//         onToggle: function (event) {
//             event.onComplete = function () {
//                 w2ui.layout.resize();
//             }
//         },
//         buttons   : '<button class="w2ui-btn" onclick="w2popup.close();">닫기</button> '+
//                     '<button class="w2ui-btn" onclick="w2popup.lock(\'Loading\', true); '+
//                     '        setTimeout(function () { w2popup.unlock(); }, 2000);" style="background: #ff9000;">확인</button>', //lock 이라고 되어있었음
//     });
// }


// function open_pop_biz_cd() {
//     // let selected_fact_cd = $("#search_frm select[name='fact_cd']").val();
//     // let selected_fact_nm = $("#search_frm select[name='fact_cd'] option:checked").text();
//     pop_biz_cd.pop_open();
//     // pop_part_nbr(selected_fact_cd, selected_fact_nm, account_type);
// }
