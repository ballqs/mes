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
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'check', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox' }
            },
            { field: 'text', caption: '작업장코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '작업장', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '품번코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '품번', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '규격', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '지시번호', size: '100px', sortable: true, resizable: true },
            { field: 'date', caption: '지시일자', size: '150px', sortable: true, resizable: true, style: 'text-align: center' },
            { field: 'text', caption: '주야구분', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '조구분', size: '100px', sortable: true, resizable: true },
            { field: 'num', caption: '생산실적', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'num', caption: 'BOX수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '양품', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '불량', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'per', caption: '달성률(%)', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'text', caption: '창고', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '위치', size: '100px', sortable: true, resizable: true }
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
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', date:'2020-10-21', per: '50'}
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
