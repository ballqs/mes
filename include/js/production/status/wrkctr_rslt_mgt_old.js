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
            { field: 'combo', caption: '공장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
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
            { field: 'pop', caption: '작업장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '상태<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'time', caption: '시간<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '규격<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: '생산목표<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: '생산실적<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: '양품<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: '불량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '비고<i class="fa fa-sort" aria-hidden="true"></i>', size: '300px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '입력자ID<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'date', caption: '입력일시<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'time' }
            },
            { field: 'combo', caption: '수정자ID<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'date', caption: '수정일시<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'time', style: 'text-align: center' }
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
            { recid: 1, text:999, percent:20, int: 100, money: 100, date: '2020-04-26 00:00:00', time: '00:00:00', combo: 'ddd', check: true, pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>' },
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

// 작업자선택 버튼
var btInner = {
    layout: {
        name: 'btPopIn',
        padding: 4,
        panels: [
            { type: 'top', size: '50%', resizable: true, minSize: 300 },
            { type: 'main', size: '50%', minSize: 300 }
        ]
    },
    grid1: {
        name: 'grid1',
        columns: [
            { field: 'recid', caption: 'NO', size: '33%', sortable: true, searchable: true },
            { field: 'combo', caption: '공정코드', size: '33%', sortable: true, searchable: true },
            { field: 'combo', caption: '공정명', size: '33%' },
            { field: 'combo', caption: '작업장코드', size: '33%' },
            { field: 'combo', caption: '작업장명', size: '33%' },
            { field: 'combo', caption: '작업자코드', size: '33%' },
            { field: 'combo', caption: '작업자명', size: '33%' },
            { field: 'combo', caption: '주작업자', size: '20%' }
        ],
        records: [
            { recid: 1, combo: 'ddd', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        ],
        onClick: function (event) {
            var grid = this;
            // need timer for nicer visual effect that record was selected
            setTimeout(function () {
                w2ui['form'].add( $.extend({}, grid.get(event.recid), { selected : false }) );
                grid.selectNone();
                grid.remove(event.recid);
            }, 150);
        }
    },
    form: {
        name: 'form',
        columns: [
            { field: 'recid', caption: 'NO', size: '33%', sortable: true, searchable: true },
            { field: 'combo', caption: '공정코드', size: '33%', sortable: true, searchable: true },
            { field: 'combo', caption: '공정명', size: '33%' },
            { field: 'combo', caption: '작업장코드', size: '33%' },
            { field: 'combo', caption: '작업장명', size: '33%' },
            { field: 'combo', caption: '작업자코드', size: '120px' },
            { field: 'combo', caption: '작업자명', size: '120px' },
            { field: 'combo', caption: '주작업자', size: '20%' }
        ],
        onClick: function (event) {
            var grid = this;
            // need timer for nicer visual effect that record was selected
            setTimeout(function () {
                w2ui['grid1'].add( $.extend({}, grid.get(event.recid), { selected : false }) );
                grid.selectNone();
                grid.remove(event.recid);
            }, 150);
        }
    }
};

$(function(){
    $("#hBtnB0011").on("click", function btPopup(){
        w2popup.open({
            title   : '작업자선택',
            width   : 900,
            height  : 1000,
            showMax : true,
            body    : '<div id="main" style="position: absolute; left: 5px; top: 5px; right: 5px; bottom: 5px;"></div>',
            onOpen  : function (event) {
                event.onComplete = function () {
                    $('#w2ui-popup #main').w2render('btPopIn');
                    w2ui.btPopIn.content('top', w2ui.grid1);
                    w2ui.btPopIn.content('main', w2ui.form);
                };
            },
            onToggle: function (event) {
                event.onComplete = function () {
                    w2ui.layout.resize();
                }
            },
            buttons   : '<button class="w2ui-btn" onclick="w2popup.close();">닫기</button> '+
                '<button class="w2ui-btn" onclick="w2popup.lock(\'Loading\', true); '+
                '        setTimeout(function () { w2popup.unlock(); }, 2000);" style="background: #ff9000;">확인</button>'+ //lock 이라고 되어있었음
                '<div class="popMsg">test</div>',
        });
    });


    // initialization in memory
    $().w2layout(btInner.layout);
    $().w2grid(btInner.grid1);
    $().w2grid(btInner.form);

});

//지시선택 버튼
var indication = {
    layout: {
        name: 'layout',
        padding: 4,
        panels: [
            { type: 'left', size: '100%', resizable: true}
        ]
    },
    grid2: {
        name: 'grid2',
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true, render: 'number',},
            { field: 'check', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox', style: 'text-align: center' }
            },
            { field: 'combo', caption: '지시번호<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true },
            { field: 'select', caption: '주야<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true },
            { field: 'combo', caption: '품번명<i class="fa fa-sort" aria-hidden="true"></i>', size: '30', sortable: true, resizable: true },
            { field: 'combo', caption: '생산목표<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true},
            { field: 'combo', caption: '양품<i class="fa fa-sort" aria-hidden="true"></i>', size: '30', sortable: true, resizable: true },
            { field: 'combo', caption: '불량<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true },
            { field: 'combo', caption: '진도율(%)<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true },
            { field: 'combo', caption: 'PPM<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true }
        ],
        records: [
            { recid: 1, combo: 'ddd', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012', check: true },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        ],
        onClick: function(event) {
            let clicked_record = w2ui.grid.records[event.recid - 1];
            $("#search_frm input[name='prt_nbr_cd']").val(clicked_record.prt_nbr_cd);
            $("#search_frm input[name='prt_nbr_nm']").val(clicked_record.prt_nbr_nm);
            $("#search_frm select[name='account_type']").val(clicked_record.account_type);
            w2ui.grid.records = [];
            w2ui.grid.reload();
            w2popup.close();
        }
    }
};



$(function(){
    $("#hBtnB0012").on("click", function btPopup(){
        w2popup.open({
            title   : '지시선택',
            width   : 900,
            height  : 900,
            showMax : true,
            body    : '<div class="popSearchW">'
                            + '<div class="popSearch">'
                                + '<p>작업장</p><input type="text" name="" value="" style="margin-right: 5px;"><input type="text" name="" value="" style="width:191px">'
                            + '</div>'
                            + '<div class="popSearch">'
                                + '<p>계획일자</p><input type="date" style="width:142px">'
                                + '<a class="subBt">전체</a><a class="subBt">주간</a><a class="subBt">야간</a>'
                            + '</div>'
                            + '<div class="popSearch">'
                                + '<p>연장</p><input type="text" name="" value="">'
                                + '<a class="subBt">연장없음</a><a class="subBt">2시간 연장</a>'
                            + '</div>'
                            + '<div class="popSearch text_r">'
                                + '<a class="bt">선택초기화</a>'
                            + '</div>'
                        + '</div>'
                        + '<div id="main" style="position: absolute; left: 0; top: 190px; right: 0; bottom: 0;"></div>',
            onOpen  : function (event) {
                event.onComplete = function () {
                    $('#w2ui-popup #main').w2render('layout');
                    w2ui.layout.content('left', w2ui.grid2);
                };
            },
            onToggle: function (event) {
                event.onComplete = function () {
                    w2ui.layout.resize();
                }
            },
            buttons   : '<button class="w2ui-btn" onclick="w2popup.close();">닫기</button> '+
                '<button class="w2ui-btn" onclick="w2popup.lock(\'Loading\', true); '+
                '        setTimeout(function () { w2popup.unlock(); }, 2000);" style="background: #ff9000; ">등록</button>'+ //lock 이라고 되어있었음
                '<div class="popMsg">test</div>'
        });
    });

    // initialization in memory
    $().w2layout(indication.layout);
    $().w2grid(indication.grid2);
    $().w2form(indication.form);
});

//비가동사유 버튼
var nonbehavior = {
    layout: {
        name: 'layout',
        padding: 4,
        panels: [
            { type: 'left', size: '100%', resizable: true}
        ]
    },
    grid3: {
        name: 'grid3',
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'combo', caption: '시작시간<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true, },
            { field: 'combo', caption: '종료시간<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true, },
            { field: 'select', caption: '비가동코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '비가동명<i class="fa fa-sort" aria-hidden="true"></i>', size: '30', sortable: true, resizable: true },
            { field: 'combo', caption: '비고<i class="fa fa-sort" aria-hidden="true"></i>', size: '30', sortable: true, resizable: true }
        ],
        records: [
            { recid: 1, combo: 'ddd', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012', check: true },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        ],
        onClick: function(event) {
            let clicked_record = w2ui.grid.records[event.recid - 1];
            $("#search_frm input[name='prt_nbr_cd']").val(clicked_record.prt_nbr_cd);
            $("#search_frm input[name='prt_nbr_nm']").val(clicked_record.prt_nbr_nm);
            $("#search_frm select[name='account_type']").val(clicked_record.account_type);
            w2ui.grid.records = [];
            w2ui.grid.reload();
            w2popup.close();
        }
    }
};


$(function () {
    // initialization in memory
    $().w2layout(nonbehavior.layout);
    $().w2grid(nonbehavior.grid3);
    $().w2form(nonbehavior.form);
});

$(function(){
    $("#hBtnB0014").on("click", function btPopup(){
        w2popup.open({
            title   : '비가동 사유',
            width   : 900,
            height  : 900,
            showMax : true,
            body    : '<div id="main" style="position: absolute; left: 5px; top: 5px; right: 5px; bottom: 5px;"></div>',
            onOpen  : function (event) {
                event.onComplete = function () {
                    $('#w2ui-popup #main').w2render('layout');
                    w2ui.layout.content('left', w2ui.grid3);
                };
            },
            onToggle: function (event) {
                event.onComplete = function () {
                    w2ui.layout.resize();
                }
            },
            buttons   : '<button class="w2ui-btn" onclick="w2popup.close();">닫기</button> '+
                '<button class="w2ui-btn" onclick="w2popup.lock(\'Loading\', true); '+
                '        setTimeout(function () { w2popup.unlock(); }, 2000);" style="background: #ff9000; ">확인</button>'+ //lock 이라고 되어있었음
                '<div class="popMsg">test</div>'
        });
    });
});

//소재투입 버튼

var meterial = {
    layout: {
        name: 'layout',
        padding: 4,
        panels: [
            { type: 'left', size: '100%', resizable: true, minSize: 300 }
        ]
    },
    grid4: {
        name: 'grid4',
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'sdate', caption: '투입일시<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true },
            { field: 'combo', caption: '선택품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '30', sortable: true, resizable: true },
            { field: 'combo', caption: '투입품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true},
            { field: 'combo', caption: '품번명<i class="fa fa-sort" aria-hidden="true"></i>', size: '30', sortable: true, resizable: true },
            { field: 'combo', caption: '투입LOT<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true },
            { field: 'number', caption: '투입량<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true },
            { field: 'number', caption: '잔량<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true }
        ],
        records: [
            { recid: 1, combo: 'ddd', number: '999', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012', check: true },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        ],
        onClick: function(event) {
            var grid4 = this;
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
    },
    grid5: {
        name: 'grid5',
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true, render: 'number'},
            { field: 'combo', caption: '선택품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true },
            { field: 'sdate', caption: '투입일시<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true },
            { field: 'combo', caption: '품번명<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true },
            { field: 'number', caption: '박스수<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true },
            { field: 'number', caption: '투입량<i class="fa fa-sort" aria-hidden="true"></i>', size: '30', sortable: true, resizable: true },
            { field: 'number', caption: '잔량<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true}
        ],
        records: [
            { recid: 1, combo: 'ddd', number: '999', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012', check: true },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        ],
        onClick: function(event) {
            var grid5 = this;
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
    console.log(meterial, 'meterial');
    $().w2layout(meterial.layout);
    $().w2grid(meterial.grid4);
    $().w2grid(meterial.grid5);
    $().w2form(meterial.form);
    console.log(meterial, 'meterial');
});

$(function(){
    $("#hBtnB0015").on("click", function btPopup(){
        w2popup.open({
            title   : '소재투입',
            width   : 900,
            height  : 900,
            showMax : true,
            body    : '<div class="popSearchW">'
                            + '<div class="popSearch">'
                                + '<p>작업장</p><input type="text" name="" value="" style="margin-right: 5px;"><input type="text" name="" value="" style="width:199px">'
                            + '</div>'
                            + '<div class="popSearch">'
                                + '<p>작업 품번</p><input type="text" style="margin-right: 5px;"><input type="text" name="" value="" style="margin-right: 5px;">'
                                + '<a class="subBt">BOM</a>'
                            + '</div>'
                            + '<div class="popSearch">'
                                + '<p>투입 LOT</p><input type="text" name="" value="" disabled style="width:348px">'
                            + '</div>'
                            + '<div class="popSearch text_r">'
                                + '<a class="bt cancel mr_10">초기화</a><a class="bt">재고삭제</a>'
                            + '</div>'
                        + '</div>'
                        + '<div class="w2ui-tabs"><button id="eachLOT" onclick="tab01(this);" class="w2ui-tab active">LOT별</button><button id="each_prt_nbr" onclick="tab02(this);" class="w2ui-tab">품번별</button></div>'
                        + '<div id="main" style="position: absolute; left: 0; top: 229px; right: 0; bottom: 0;"></div>',
            onOpen  : function (event) {
                event.onComplete = function () {
                    $('#w2ui-popup #main').w2render('layout');
                    w2ui.layout.content('left', w2ui.grid4);
                };
            },
            onToggle: function (event) {
                event.onComplete = function () {
                    w2ui.layout.resize();
                }
            },
            buttons   : '<button class="w2ui-btn" onclick="w2popup.close();">닫기</button> '+
                '<button class="w2ui-btn" onclick="w2popup.lock(\'Loading\', true); '+
                '        setTimeout(function () { w2popup.unlock(); }, 2000);" style="background: #ff9000; ">투입</button>'+ //lock 이라고 되어있었음
                '<div class="popMsg">test</div>'
        });
    });
});
function tab01(obj){
   w2ui.layout.content('left', w2ui.grid4);
   $(".w2ui-tab").removeClass("active");
   $("#"+obj.id).addClass("active");
}

function tab02(obj){
   w2ui.layout.content('left', w2ui.grid5);
   $(".w2ui-tab").removeClass("active");
   $("#"+obj.id).addClass("active");
}

//작업장선택 버튼
var workplace = {
    layout: {
        name: 'layout',
        padding: 4,
        panels: [
            { type: 'left', size: '100%', resizable: true}
        ]
    },
    grid6: {
        name: 'grid6',
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true, render: 'number',},
            { field: 'select', caption: '작업장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '작업장명<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true, hidden: true },
            { field: 'check', caption: '조회여부', size: '10', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox', style: 'text-align: center' }
            }
        ],
        records: [
            { recid: 1, combo: 'ddd', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012', check: true },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        ],
        onClick: function(event) {
            let clicked_record = w2ui.grid.records[event.recid - 1];
            $("#search_frm input[name='prt_nbr_cd']").val(clicked_record.prt_nbr_cd);
            $("#search_frm input[name='prt_nbr_nm']").val(clicked_record.prt_nbr_nm);
            $("#search_frm select[name='account_type']").val(clicked_record.account_type);
            w2ui.grid.records = [];
            w2ui.grid.reload();
            w2popup.close();
        }
    }
};

$(function(){
    $("#hBtnB0019").on("click", function btPopup(){
        w2popup.open({
            title   : '작업장선택',
            width   : 900,
            height  : 900,
            showMax : true,
            body    : '<div class="popSearchW">'
                            + '<div class="popSearch">'
                                + '<p>공장</p>'
                                + '<select class="mr_20" name="">'
                                    + '<option value="">전체</option>'
                                    + '<option value="">선택1</option>'
                                + '</select>'
                                + '<p>공정</p>'
                                + '<select class="" name="">'
                                    + '<option value="">전체</option>'
                                    + '<option value="">선택1</option>'
                                + '</select>'
                            + '</div>'
                            + '<div class="popSearch text_r">'
                                + '<a class="bt">조회</a>'
                            + '</div>'
                        + '</div>'
                        + '<div id="main" style="position: absolute; left: 0; top: 110px; right: 0; bottom: 0;"></div>',
            onOpen  : function (event) {
                event.onComplete = function () {
                    $('#w2ui-popup #main').w2render('layout');
                    w2ui.layout.content('left', w2ui.grid6);
                };
            },
            onToggle: function (event) {
                event.onComplete = function () {
                    w2ui.layout.resize();
                }
            },
            buttons   : '<button class="w2ui-btn" onclick="w2popup.close();">닫기</button> '+
                '<button class="w2ui-btn" onclick="w2popup.lock(\'Loading\', true); '+
                '        setTimeout(function () { w2popup.unlock(); }, 2000);" style="background: #ff9000; ">등록</button>'+ //lock 이라고 되어있었음
                '<div class="popMsg">test</div>'
        });
    });

    // initialization in memory
    $().w2layout(workplace.layout);
    $().w2grid(workplace.grid6);
    $().w2form(workplace.form);
});

//LOT등록 버튼
var lotadd = {
    layout: {
        name: 'layout',
        padding: 4,
        panels: [
            { type: 'top', size: '50%', resizable: true, minSize: 300 },
            { type: 'main', size: '50%', minSize: 300 }
        ]
    },
    grid7: {
        name: 'grid7',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, searchable: true,  style: 'text-align: right' },
            { field: 'combo', caption: '투입품번', size: '33%', sortable: true, searchable: true },
            { field: 'combo', caption: '투입품명', size: '33%' },
            { field: 'combo', caption: '투입LOT', size: '33%' },
            { field: 'number', caption: '투입수량', size: '33%',  style: 'text-align: right' },
            { field: 'number', caption: '생산가능수량', size: '20%',  style: 'text-align: right' },
            { field: 'combo', caption: '단위', size: '20%' }
        ],
        records: [
            { recid: 1, combo: 'ddd', number: '999', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        ],
        onClick: function (event) {
            var grid7 = this;
            // need timer for nicer visual effect that record was selected
            setTimeout(function () {
                w2ui['form2'].add( $.extend({}, grid7.get(event.recid), { selected : false }) );
                grid7.selectNone();
                grid7.remove(event.recid);
            }, 150);
        }
    },
    form2: {
        name: 'form2',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, searchable: true },
            { field: 'combo', caption: '수량', size: '33%', sortable: true, searchable: true },
            { field: 'combo', caption: '양품', size: '33%' },
            { field: 'combo', caption: '불량', size: '33%' },
            { field: 'combo', caption: '재공', size: '33%' }
        ],
        onClick: function (event) {
            var grid7 = this;
            // need timer for nicer visual effect that record was selected
            setTimeout(function () {
                w2ui['grid7'].add( $.extend({}, grid7.get(event.recid), { selected : false }) );
                grid7.selectNone();
                grid7.remove(event.recid);
            }, 150);
        }
    }
};

$(function(){
    $("#hBtnB0016").on("click", function btPopup(){
        w2popup.open({
            title   : 'LOT등록',
            width   : 900,
            height  : 1000,
            showMax : true,
            body    : '<div class="popSearchW">'
                            + '<div class="popSearch">'
                                + '<p>작업장</p><input type="text" name="" value="" style="margin-right: 5px;"><input type="text" name="" value="" style="width:279px">'
                            + '</div>'
                            + '<div class="popSearch">'
                                + '<p>생산품번</p><input type="text" name="" value="" style="margin-right: 5px;"><input type="text" name="" value="" style="width:279px">'
                            + '</div>'
                            + '<div class="popSearch">'
                                + '<p>총생산량</p><input type="text" name="" value="" style="margin-right: 5px;">'
                                + '<p style="min-width:57px; margin-right:10px;">적입수량</p><input type="text" name="" value="" style="margin-right: 5px; background-color:yellow; width:70px;">'
                                + '<p style="min-width:57px; margin-right:10px;">박스수량</p><input type="text" name="" value="" style="margin-right: 5px; background-color:yellow; width:70px;">'
                            + '</div>'
                            + '<div class="popSearch">'
                                + '<p>투입 LOT</p><input type="text" name="" value="" style="width:427px">'
                            + '</div>'
                            + '<div class="popSearch text_r">'
                                + '<a class="bt cancel mr_5">불량 초기화</a><a class="bt mr_5">LOT생성</a><a class="bt">재발행</a>'
                            + '</div>'
                        + '</div>'
                        + '<div id="main" style="position: absolute; left: 0; top: 243px; right: 0; bottom: 0;"></div>',
            onOpen  : function (event) {
                event.onComplete = function () {
                    $('#w2ui-popup #main').w2render('btPopIn');
                    w2ui.btPopIn.content('top', w2ui.grid7);
                    w2ui.btPopIn.content('main', w2ui.form2);
                };
            },
            onToggle: function (event) {
                event.onComplete = function () {
                    w2ui.layout.resize();
                }
            },
            buttons   : '<button class="w2ui-btn" onclick="w2popup.close();">닫기</button> '+
                '<button class="w2ui-btn" onclick="w2popup.lock(\'Loading\', true); '+
                '        setTimeout(function () { w2popup.unlock(); }, 2000);" style="background: #ff9000;">등록</button>'+ //lock 이라고 되어있었음
                '<div class="popMsg">test</div>',
        });
    });

    // initialization in memory
    $().w2layout(lotadd.layout);
    $().w2grid(lotadd.grid7);
    $().w2grid(lotadd.form2);
});

//검사등록 버튼
var inspection = {
    layout: {
        name: 'layout',
        padding: 4,
        panels: [
            { type: 'left', size: '100%', resizable: true}
        ]
    },
    grid8: {
        name: 'grid8',
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true, render: 'number',},
            { field: 'combo', caption: '검사코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true,},
            { field: 'combo', caption: '검사명<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true,},
            { field: 'combo', caption: '구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true,},
            { field: 'combo', caption: '측정구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '30', sortable: true, resizable: true },
            { field: 'number', caption: '상한값<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true},
            { field: 'number', caption: '중간값<i class="fa fa-sort" aria-hidden="true"></i>', size: '30', sortable: true, resizable: true },
            { field: 'number', caption: '하한값<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true },
            { field: 'combo', caption: '판정값<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true }
        ],
        records: [
            { recid: 1, combo: 'ddd', number: '999', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012', check: true },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
        ],
        onClick: function(event) {
            let clicked_record = w2ui.grid.records[event.recid - 1];
            $("#search_frm input[name='prt_nbr_cd']").val(clicked_record.prt_nbr_cd);
            $("#search_frm input[name='prt_nbr_nm']").val(clicked_record.prt_nbr_nm);
            $("#search_frm select[name='account_type']").val(clicked_record.account_type);
            w2ui.grid.records = [];
            w2ui.grid.reload();
            w2popup.close();
        }
    }
};

$(function(){
    $("#hBtnB0017").on("click", function btPopup(){
        w2popup.open({
            title   : '공정검사',
            width   : 900,
            height  : 900,
            showMax : true,
            body    : '<div class="popSearchW">'
                            + '<div class="popSearch">'
                                + '<p>작업장</p><input type="text" name="" value="" style="margin-right: 5px;"><input type="text" name="" value="" style="width:242px">'
                            + '</div>'
                            + '<div class="popSearch">'
                                + '<p>검사 품번</p><input type="text" name="" value="" style="margin-right: 5px;"><input type="text" name="" value="" style="width:242px">'
                            + '</div>'
                            + '<div class="popSearch">'
                                + '<p>검사 일자</p><input type="date" style="width:142px; margin-right:10px;">'
                                + '<p>검사 항목</p><input type="text" name="" value="" style="margin-right: 5px;">'
                            + '</div>'
                            + '<div class="popSearch">'
                                + '<p>선택작업자</p><input type="text" name="" value="" style="margin-right: 5px;"><input type="text" name="" value="합 격" disabled style="background-color:#ff9000; color:#fff; text-align:center; border:0; font-size:14px; width:242px;">'
                            + '</div>'
                            + '<div class="popSearch text_r">'
                                + '<a class="bt">조회</a>'
                            + '</div>'
                        + '</div>'
                        + '<div id="main" style="position: absolute; left: 0; top: 243px; right: 0; bottom: 0;"></div>',
            onOpen  : function (event) {
                event.onComplete = function () {
                    $('#w2ui-popup #main').w2render('layout');
                    w2ui.layout.content('left', w2ui.grid8);
                };
            },
            onToggle: function (event) {
                event.onComplete = function () {
                    w2ui.layout.resize();
                }
            },
            buttons   : '<button class="w2ui-btn" onclick="w2popup.close();">닫기</button> '+
                '<button class="w2ui-btn" onclick="w2popup.lock(\'Loading\', true); '+
                '        setTimeout(function () { w2popup.unlock(); }, 2000);" style="background: #ff9000; ">등록</button>'+ //lock 이라고 되어있었음
                '<div class="popMsg">test</div>'
        });
    });
    // initialization in memory
    $().w2layout(inspection.layout);
    $().w2grid(inspection.grid8);
    $().w2form(inspection.form);
});
