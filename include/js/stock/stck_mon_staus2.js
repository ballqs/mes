$(function () {
    $('#selected-tab .tab').hide();
    $('#selected-tab #tab1').show();

    $('#tabs').w2tabs({
        name: 'tabs',
        active: 'tab1',
        tabs: [
            { id: 'tab1', caption: '종합 재고' },
            { id: 'tab2', caption: '품번 재고' }
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
        columnGroups: [
            { caption: 'NO', master: true },
            { caption: '제품구분코드', master: true },
            { caption: '제품구분', master: true },
            { caption: '품번코드', master: true },
            { caption: '품번명', master: true },
            { caption: '규격', master: true },
            { caption: '단가', master: true },
            { caption: '전월재고', span: 2 },
            { caption: '현재고', span: 2 },
            { caption: '증감현황', span: 3 },
            { caption: '비고', master: true }
        ],
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'text', caption: '제품구분코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '제품구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '규격<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'num', caption: '단가<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '금액<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '금액<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '금액<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '증감율(%)<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'text', caption: '비고<i class="fa fa-sort" aria-hidden="true"></i>', size: '300px', sortable: true, resizable: true },
        ],
        records: [
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50'},
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50'},
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50'},
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50'},
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50'},
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50'},
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50'},
        ]
    });


    $('#grid2').w2grid({
        name: 'grid2',
        columnGroups: [
            { caption: 'NO', master: true },
            { caption: '제품구분코드', master: true },
            { caption: '제품구분', master: true },
            { caption: '품번코드', master: true },
            { caption: '품번명', master: true },
            { caption: '규격', master: true },
            { caption: '단가', master: true },
            { caption: '전월재고', span: 2 },
            { caption: '현재고', span: 2 },
            { caption: '증감현황', span: 3 },
            { caption: '비고', master: true }
        ],
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'text', caption: '공장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '공장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '제품구분코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '제품구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '규격<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '재질<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'num', caption: '단가<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '금액<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '금액<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '금액<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '증감율(%)<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'text', caption: '비고<i class="fa fa-sort" aria-hidden="true"></i>', size: '300px', sortable: true, resizable: true },
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
