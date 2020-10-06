var date = [
    { id: 1, text: '888' },
    { id: 2, text: '88' },
    { id: 3, text: '888' }
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
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'prt_nbr_nm', caption: '품번코드', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'text'}
            },
            { field: 'prt_nbr_nm', caption: '품번', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text'}
            },
            { field: 'trans_unit_cd', caption: '규격', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text'}
            },
            { field: 'nnn', caption: '1주', size: '100px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'nnn', caption: '2주', size: '100px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'nnn', caption: '3주', size: '100px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'nnn', caption: '4주', size: '100px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'nnn', caption: '5주', size: '100px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'base_unit_cd', caption: '합계', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text'}
            },
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true,
                editable: { type: 'text'}
            },
            { field: 'inst_id', caption: '입력자 ID', size: '100px', sortable: true, resizable: true },
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true,  style: 'text-align: center' },
            { field: 'updt_id', caption: '수정자 ID', size: '100px', sortable: true, resizable: true },
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true,  style: 'text-align: center'}
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
            { recid: 1,
                prt_nbr_cd: 'MS23333',
                prt_nbr_nm:'ddd',
                trans_unit_cd:'M001',
                trans_unit: 2,
                base_unit_cd:'M3333',
                pln_qty:'ddd',
                pln_unit: 1,
                pln_gbn: 1,
                nnn:'999',
                base_unit:1,
                trans_qty:'100',
                base_qty:'100',
                remark:'기타 비고사항',
                inst_id:'themomos',
                inst_dt:'2020-10-21 00:00:00',
                updt_id:'themomos',
                updt_dt:'2020-10-21 00:00:00',
            }
        ]
    });
});

function showChanged() {
    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}
