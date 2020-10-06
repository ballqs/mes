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
    $('#grid').w2grid({
        name: 'grid',
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
            { field: 'select', caption: '공장', size: '150px', sortable: true, resizable: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'select', caption: '공정코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'select', caption: '공정', size: '150px', sortable: true, resizable: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'select', caption: '작업장코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'select', caption: '작업장', size: '150px', sortable: true, resizable: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            { field: 'text', caption: '주작업자코드', size: '150px', sortable: true, resizable: true},
            { field: 'text', caption: '주작업자', size: '150px', sortable: true, resizable: true},
            { field: 'num', caption: '작업자수', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'text', caption: '비고', size: '300px', sortable: true, resizable: true},
            { field: 'text', caption: '입력자ID', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'date', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'text', caption: '수정자ID', size: '100px', sortable: true, resizable: true,},
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
            { recid: 1, text: 'dddd', num: '9999', select: 2, date: '2020-02-02'}
        ]
    });
});

function showChanged() {
    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}
//twoGrid
$(function () {
    $('#grid1').w2grid({
        name: 'grid1',
        show: { header: false },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=right' },
            { field: 'text', caption: '공정코드', size: '100px', sortable: true},
            { field: 'text', caption: '공정', size: '150px', sortable: true },
            { field: 'text', caption: '작업자코드', size: '100px', sortable: true },
            { field: 'text', caption: '작업자', size: '150px', sortable: true },
            { field: 'check', caption: '주작업자', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox'}}
        ],
        records: [
            { recid: 1, text: 'dddddd', check: true  },
            { recid: 2, text: 'dddddd', check: true  },
            { recid: 3, text: 'dddddd', check: true  },
            { recid: 4, text: 'dddddd', check: true  }
        ],
        onClick: function (event) {
            var grid = this;
            // need timer for nicer visual effect that record was selected
            setTimeout(function () {
                w2ui['grid2'].add( $.extend({}, grid.get(event.recid), { selected : false }) );
                grid.selectNone();
                grid.remove(event.recid);
            }, 150);
        }
    });

    $('#grid2').w2grid({
        name: 'grid2',
        show: { header: false },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=center' },
            { field: 'combo', caption: '작업장코드', size: '100px', sortable: true },
            { field: 'combo', caption: '작업장', size: '150px', sortable: true },
            { field: 'combo', caption: '작업자코드', size: '100px%', sortable: true },
            { field: 'combo', caption: '작업자', size: '150px', sortable: true },
            { field: 'check', caption: '주작업자', size: '100px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox', style: 'text-align: center' }
            }
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
    });
});
