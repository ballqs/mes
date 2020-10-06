//기본그리드

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
    $('#grid01').w2grid({
        name: 'grid01',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: false
        },
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'date', caption: '일자<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'text' }
            },
            { field: 'select', caption: '작업장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '작업장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '비가동코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '비가동<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '비가동사유<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '비가동유형<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'select', caption: '비가동구분코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '비가동구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'time', caption: '시작시간<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'text' }
            },
            { field: 'time', caption: '종료시간<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'text' }
            },
            { field: 'time', caption: '소요시간(분)<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'text' }
            },
            { field: 'text', caption: '작업자수<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'select', caption: '품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: '설비카운트<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'text', caption: '입고량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '작성자<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            }
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
            { recid: 1, text:999, percent:20, int: 100, money: 100, date: '2020-04-23', time: '00:00:00', combo: 'ddd', check: true, pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>' },
            { recid: 2 },
            { recid: 3 },
            { recid: 4 },
            { recid: 5 }
        ]
    });

});

function showChanged() {
    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}

// search part popup
// widget configuration
var config = {
    layout: {
        name: 'layout',
        padding: 4,
        panels: [
            { type: 'left', size: '100%', resizable: true}
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

function openPopup1() {
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

function openPopup2() {
    w2popup.open({
        title   : '작업장',
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

function openPopup3() {
    w2popup.open({
        title   : '작업장',
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
