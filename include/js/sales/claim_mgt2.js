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
    $('#grid1').w2grid({
        name: 'grid1',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: false
        },
        columns: [
            { field: 'recid', caption: '순번', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'check', caption: '선택', size: '50px', sortable: true, style: 'text-align: center',
                editable: { type: 'checkbox' }
            },
            { field: 'text', caption: '출하번호', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '거래처', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '출고처', size: '150px', sortable: true, resizable: true },
            { field: 'num', caption: '출하수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'text', caption: '출하단위', size: '100px', sortable: true, resizable: true },
            { field: 'pop', caption: '품번코드', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '품번', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '규격', size: '100px', sortable: true, resizable: true },
            { field: 'date', caption: '클레임일자', size: '150px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'date' } },
            { field: 'num', caption: '클레임수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right', editable: { type: 'text' }},
            { field: 'select', caption: '클레임사유', size: '100px', sortable: true, resizable: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'text', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text' } }
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
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50', date: '2020-04-28',  select:'2', pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="open_pop_prt_nbr_cd()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>' }
        ]
    });


});

function showChanged() {
    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}

function open_pop_biz_cd() {
    pop_biz_cd.pop_open();
}

function open_pop_prt_nbr_cd() {
    let selected_fact_cd = $("#search_frm select[name='fact_cd']").val();
    let selected_fact_nm = $("#search_frm select[name='fact_cd'] option:checked").text();
    pop_prt_nbr_cd.pop_open(selected_fact_cd, selected_fact_nm);
    // pop_part_nbr(selected_fact_cd, selected_fact_nm, account_type);
}
