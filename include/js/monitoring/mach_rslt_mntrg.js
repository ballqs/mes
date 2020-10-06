$(function () {
    $('#grid').w2grid({
        name: 'grid',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: false
        },
        columns: [
            { field: 'title', caption: '작업장', size: '20%', sortable: true, resizable: true, style:'text-align: center' },
            { field: 'people', caption: '작업자', size: '30%', sortable: true, resizable: true, style:'text-align: center' },
            { field: 'int', caption: '규격', size: '30%', sortable: true, resizable: true, style:'text-align: center' },
            { field: 'money', caption: '생산실적', size: '30%', sortable: true, resizable: true, style:'text-align: center' },
            { field: 'date', caption: '최종일시', size: '30%', sortable: true, resizable: true, style:'text-align: center' },
            { field: 'time', caption: '가동시간(H)', size: '30%', sortable: true, resizable: true, style:'text-align: center' }
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
            { recid: 1, title: '절단 1', people: 'ddddd', int: '999', money: '999', date: '2020-04-23 <br> 10:00:00', time: '0' },
            { recid: 2, title: '절단 2', people: 'ddddd', int: '999', money: '999', date: '2020-04-23 <br> 10:00:00', time: '0' },
            { recid: 3, title: '융착 1', people: 'ddddd', int: '999', money: '999', date: '2020-04-23 <br> 10:00:00', time: '0' },
            { recid: 4, title: '융착 2', people: 'ddddd', int: '999', money: '999', date: '2020-04-23 <br> 10:00:00', time: '0' },
            { recid: 5, title: '융착 3', people: 'ddddd', int: '999', money: '999', date: '2020-04-23 <br> 10:00:00', time: '0' }
        ]
    });
});

function showChanged() {
    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}
