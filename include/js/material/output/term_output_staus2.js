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
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'date', caption: '출고일자<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center' },
            { field: 'text', caption: '출고구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '출고번호<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: 'LOT NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '200px', sortable: true, resizable: true },
            { field: 'number', caption: '수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'cm', caption: '단위<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'text', caption: '창고<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '위치<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '출고자<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true }
        ],
        records: [
            { recid: 1,
                text: 'dddddd',
                number: '999',
                cm: 'EA',
                date: '2020-10-21'
            }
        ]
    });
});

function showChanged() {
    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}
