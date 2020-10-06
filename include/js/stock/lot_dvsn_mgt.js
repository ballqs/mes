$(function () {
    $('#grid1').w2grid({

        name: 'grid1',
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'text', caption: '창고코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden:true },
            { field: 'text', caption: '창고<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '위치코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '위치<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '규격<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: 'LOT NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'num', caption: '재고수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' }
        ],
        records: [
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50'},
            { recid: 2, text: 'ddddd', num:'9999', cm: 'EA', per:'50'},
            { recid: 3, text: 'ddddd', num:'9999', cm: 'EA', per:'50'},
            { recid: 4, text: 'ddddd', num:'9999', cm: 'EA', per:'50'},
            { recid: 5, text: 'ddddd', num:'9999', cm: 'EA', per:'50'},
            { recid: 6, text: 'ddddd', num:'9999', cm: 'EA', per:'50'},
            { recid: 7, text: 'ddddd', num:'9999', cm: 'EA', per:'50'},
        ],
        onClick: function (event) {
            w2ui['grid2'].clear();
            var record = this.get(event.recid);
            w2ui['grid2'].add([
                { recid: 0, name: 'NO', value: record.recid },
                { recid: 1, name: 'First Name:', value: record.fname },
                { recid: 2, name: 'Last Name:', value: record.lname },
                { recid: 3, name: 'Email:', value: record.email },
                { recid: 4, name: 'Date:', value: record.sdate }
            ]);
        }
    });


    $('#grid2').w2grid({
        name: 'grid2',
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'text', caption: 'LOT NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '200px', sortable: true, resizable: true },
            { field: 'num', caption: '분할수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '200px', sortable: true, resizable: true, style: 'text-align: right' }
        ],
        records: [
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50'}
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
