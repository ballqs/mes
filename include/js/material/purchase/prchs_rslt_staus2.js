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
            { field: 'prt_nbr_nm', caption: '공장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, hidden: true},
            { field: 'prt_nbr_nm', caption: '공장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true},
            { field: 'trans_unit_cd', caption: '협력사코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, hidden: true},
            { field: 'trans_unit_cd', caption: '협력사명<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true},
            { field: 'date', caption: '일자<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'nnn', caption: '발주번호<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'nnn', caption: '발주순번<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'nnn', caption: '품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, hidden: true },
            { field: 'nnn', caption: '품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'nnn', caption: '규격<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'base_unit_cd', caption: '단위<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true},
            { field: 'eee', caption: '발주량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'eee', caption: '입고량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'eee', caption: '미납수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'pcd', caption: '직납코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,hidden: true },
            { field: 'pcd', caption: '직납업체<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true  }
        ],
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
                date:'2020-10-21',
                base_unit:1,
                trans_qty:'100',
                base_qty:'100',
                eee:'3333',
                inst_id:'themomos',
                inst_dt:'2020-10-21',
                updt_id:'themomos',
                updt_dt:'2020-10-21',
                pcd: 'dddd',
                nnn: 'dddd'
            }
        ]
    });
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
