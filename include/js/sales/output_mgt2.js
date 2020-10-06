$(function () {
    $('#grid1').w2grid({
        name: 'grid1',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'text', caption: '수주번호', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: '행번호', size: '100px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'text', caption: '거래처코드', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: '거래처', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: '출고처코드', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: '출고처', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: '품번코드', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: '품번', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: '규격', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'date', caption: '납기예정일자', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'date' }
            },
            { field: 'num', caption: '수주수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'num', caption: '출하수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'num', caption: '잔량', size: '100px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            }
        ],
        records: [
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50', date: '2020-04-24' },
            { recid: 2, text: 'ddddd', num:'9999', cm: 'EA', per:'50', date: '2020-04-24' },
            { recid: 3, text: 'ddddd', num:'9999', cm: 'EA', per:'50', date: '2020-04-24' },
            { recid: 4, text: 'ddddd', num:'9999', cm: 'EA', per:'50', date: '2020-04-24' },
            { recid: 5, text: 'ddddd', num:'9999', cm: 'EA', per:'50', date: '2020-04-24' },
        ],
        onClick: function (event) {
            w2ui['grid2'].clear();
            var record = this.get(event.recid);
            w2ui['grid2'].add([
                { recid: 0, value: record.recid }
            ]);
        }
    });


    $('#grid2').w2grid({
        name: 'grid2',
        columns: [
            { field: 'recid', caption: '행번호', size: '100px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'text', caption: '출고번호', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '품번코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '품번', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '규격', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: 'LOT NO', size: '100px', sortable: true, resizable: true },
            { field: 'num', caption: '재고수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'text', caption: '단위', size: '100px', sortable: true, resizable: true },
            { field: 'num', caption: '출고수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'text', caption: '비고', size: '300px', sortable: true, resizable: true }
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
