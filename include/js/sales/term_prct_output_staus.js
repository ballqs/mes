$(function () {
    $('#selected-tab .tab').hide();
    $('#selected-tab #tab1').show();

    $('#tabs').w2tabs({
        name: 'tabs',
        active: 'tab1',
        tabs: [
            { id: 'tab1', caption: '제품 출고 공통' },
            { id: 'tab2', caption: '제품 출고 상세' }
        ],
        onClick: function (event) {
            $('#selected-tab .tab').hide();
            $('#selected-tab #' + event.target).show();
            $('#grid2 table tbody').trigger("click");
        }
    });

});


$(function () {
    $('#grid1').w2grid({
        name: 'grid1',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: false
        },
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'text', caption: '공장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '공장명<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '거래처코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '거래처<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'date', caption: '출고일자<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center' },
            { field: 'text', caption: '품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '규격<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '출고유형코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '출고유형<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'num', caption: '출고수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'text', caption: '단위<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'num', caption: '출고번호<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  }
        ],
        records: [
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50', date: '2020-04-23'}
        ]
    });


    $('#grid2').w2grid({
        name: 'grid2',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: false
        },
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'text', caption: '공장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden:true },
            { field: 'text', caption: '공장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '거래처코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '거래처<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'date', caption: '출고일자<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center' },
            { field: 'text', caption: '품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '규격<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '출고유형코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '출고유형<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: 'LOT NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'num', caption: '출고수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'text', caption: '단위<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '출고자<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'num', caption: '출고번호<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  }
        ],
        records: [
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50', date: '2020-04-29'}
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
function open_pop_biz_cd() {
    pop_biz_cd.pop_open();
}
