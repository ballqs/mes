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
            { field: 'select', caption: '공장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '20', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'text', caption: '공장', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'text', caption: '직납업체', size: '20', sortable: true, resizable: true, hidden: true, editable: { type: 'text' }},
            { field: 'text', caption: '직납업체명', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'text', caption: '품번코드(popup)', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'text', caption: '품번', size: '150px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'num', caption: '단가', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'text' }},
            { field: 'check', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox'}},
            { field: 'text', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text' } },
            { field: 'text', caption: '입력자ID', size: '100px', sortable: true, resizable: true},
            { field: 'date', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'text', caption: '수정자ID', size: '100px', sortable: true, resizable: true},
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
            { recid: 1, text: 'dddd', num: '999', date:'2020-02-02' }
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
