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
            { field: 'check', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox' }
            },
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
            { field: 'date', caption: '계획일자<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'time' }
            },
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
            { field: 'pop', caption: '공정<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'pop', caption: '작업장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '주/야구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'date', caption: '지시일자<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '지시품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'pop', caption: '품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '규격<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '지시단위<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '지시단위<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
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
            { field: 'combo', caption: '공정<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '라인코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '라인<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '지시상태코드_대기진행완료<i class="fa fa-sort" aria-hidden="true"></i>', size: '200px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '지시상태코드_대기진행완료<i class="fa fa-sort" aria-hidden="true"></i>', size: '200px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '지시유형_일반긴급재작업<i class="fa fa-sort" aria-hidden="true"></i>', size: '200px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '지시유형_일반긴급재작업<i class="fa fa-sort" aria-hidden="true"></i>', size: '200px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '조구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '조구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: 'CAVITY<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'check', caption: '지시확정여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox', style: 'text-align: center' }
            },
            { field: 'combo', caption: '계획지시번호<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '그룹작업지시<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: 'UPH<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'text', caption: '작업시간_분<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '비고<i class="fa fa-sort" aria-hidden="true"></i>', size: '300px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '입력자ID<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'sdate', caption: '입력일시<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'time' }
            },
            { field: 'combo', caption: '수정자ID<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'sdate', caption: '수정일시<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
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
            // { recid: 1, text:999, percent:20, int: 100, money: 100, date: '2020-03-23', sdate: '2020-04-29 00:00:00', combo: 'ddd', check: true, pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>' },
            { recid: 1, text:999, percent:20, int: 100, money: 100, date: '2020-03-23', sdate: '2020-04-29 00:00:00', combo: 'ddd', check: true,
                pop:`
                    <div style="float:left; line-height:40px;">
                        test
                    </div>
                    <a class="popBtInner" onclick="openPopup()">
                        <i class="far fa-window-restore" style="color: #363c4f;">
                        </i>
                    </a>` },
            { recid: 2 },
            { recid: 3 },
            { recid: 4 },
            { recid: 5 }
        ]
    });

    // initialization in memory
    $().w2layout(config.layout);
    $().w2grid(config.grid);
    $().w2form(config.form);

});

function showChanged() {
    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}

function open_pop_prt_nbr_cd() {
    let selected_fact_cd = $("#search_frm select[name='fact_cd']").val();
    let selected_fact_nm = $("#search_frm select[name='fact_cd'] option:checked").text();
    pop_prt_nbr_cd.pop_open(selected_fact_cd, selected_fact_nm);
    // pop_part_nbr(selected_fact_cd, selected_fact_nm, account_type);
}




// 복사버튼

$(function(){

    $("#hBtnB0008").on("click", function openPopupCopy(){
        w2popup.open({
            title   : '생산계획 복사',
            width   : 400,
            height  : 260,
            showMax : true,
            body    : '<div class="contWrap cf">' +
                        '<div class="SearchLine cf">' +
                            '<div class="select">' +
                                '<p>공장</p>' +
                                '<select class="" name=""><option value="">선택</option></select><i class="fa fa-caret-down" aria-hidden="true"></i>' +
                            '</div>' +
                        '</div>' +
                        '<div class="SearchLine cf">' +
                            '<div class="Search">' +
                                '<p>기준일자</p><input type="date" name="" value="">' +
                            '</div>' +
                        '</div>' +
                        '<div class="SearchLine cf">' +
                            '<div class="Search">' +
                                '<p>계획일자</p><input type="date" name="" value="">' +
                            '</div>' +
                        '</div>',
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
                        '        setTimeout(function () { w2popup.unlock(); }, 2000);" style="background: #ff9000;">복사</button>', //lock 이라고 되어있었음
        });

    });

});
