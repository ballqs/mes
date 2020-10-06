var people = [
    { id: 1, text: 'cm' },
    { id: 2, text: 'm' },
    { id: 3, text: 'l' },
    { id: 4, text: 'ml' }
];

$(function () {

    //side form
    $('#grid01').w2grid({
        name: 'grid01',
        header: '모품번',
        show: {
            header: true
        },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
            // { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, editable: { type: 'checkbox' }},
            { field: 'text', caption: '계정유형', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '품번코드(popup)', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '품번', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '규격', size: '100px', sortable: true, resizable: true },
        ],
        records: [
            { recid: 1, text:'ddddddd', chk: false}
        ]
    });



});

function showChanged() {
    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}

