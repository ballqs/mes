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
            { field: 'check', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'select', caption: '공장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '공장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
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
            { field: 'pop', caption: '품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'text', caption: '공정순서<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,  style: 'text-align: right', editable: { type: 'text' }},
            { field: 'select', caption: '공정코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '공정<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'check', caption: '외주가공여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox' }
            },
            { field: 'pop', caption: '외주업체<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'check', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox' }
            },
            { field: 'combo', caption: '비고<i class="fa fa-sort" aria-hidden="true"></i>', size: '300px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'combo', caption: '입력자ID<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true},
            { field: 'time', caption: '입력일시<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'combo', caption: '수정자ID<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true},
            { field: 'time', caption: '수정일시<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
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
            { recid: 1, text:999, percent:20, int: 100, money: 100, date: '1/1/2014', combo: 'ddd', check: true,  select:'2', pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>', time:'2020-04-20' },
            { recid: 2, text:999, percent:20, int: 100, money: 100, date: '1/1/2014', combo: 'ddd', check: true,  select:'2', pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>', time:'2020-04-20' },
            { recid: 3, text:999, percent:20, int: 100, money: 100, date: '1/1/2014', combo: 'ddd', check: true,  select:'2', pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>', time:'2020-04-20' },
            { recid: 4, text:999, percent:20, int: 100, money: 100, date: '1/1/2014', combo: 'ddd', check: true,  select:'2', pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>', time:'2020-04-20' },
        ]
    });
});

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
        title   : '창고리스트',
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
