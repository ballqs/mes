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
            { field: 'select', caption: '생산품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '생산품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '규격<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '투입품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'combo', caption: '투입품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'sdate', caption: '투입일시<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'text' }
            },
            { field: 'sdate', caption: '생산일시<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '투입Lot No<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '투입자<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: '투입량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'text', caption: '사용량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'text', caption: '잔량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '단위<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'date', caption: '최종사용일자<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align:center',
                editable: { type: 'text' }
            },
            { field: 'date', caption: '잔량보관일자<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'text' }
            },
            { field: 'date', caption: '수불일자<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '지시번호<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
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
            { recid: 1, text:999, percent:20, int: 100, money: 100, date: '2020-04-23', sdate: '2020-04-26 00:00:00', combo: 'ddd', check: true, pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>' },
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
