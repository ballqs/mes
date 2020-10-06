$(function () {
    $('#selected-tab .tab').hide();
    $('#selected-tab #tab1').show();

    $('#tabs').w2tabs({
        name: 'tabs',
        active: 'tab1',
        tabs: [
            { id: 'tab1', caption: '품목별 실적현황' },
            { id: 'tab2', caption: '품목별 LOT현황' },
            { id: 'tab3', caption: 'LOT별 실적현황' }
        ],
        onClick: function (event) {
            $('#selected-tab .tab').hide();
            $('#selected-tab #' + event.target).show();
            $('#grid2 table tbody').trigger("click");
            $('#grid3 table tbody').trigger("click");
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
            { field: 'text', caption: '공장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden:true },
            { field: 'text', caption: '공장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '주야구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '공정코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '공정<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '작업장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '작업장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '규격<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'num', caption: '목표<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'num', caption: '생산수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'num', caption: '차이수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'per', caption: '달성률(%)<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'time', caption: '계획시간<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center'  },
            { field: 'time', caption: '가동시간<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center'  },
            { field: 'time', caption: '비가동시간<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center'  },
            { field: 'text', caption: '주요비가동사유<i class="fa fa-sort" aria-hidden="true"></i>', size: '300px', sortable: true, resizable: true }
        ],
        records: [
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50', time: '00:00:00'}
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
            { field: 'text', caption: '공장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '공장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '주야구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '조구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '공정코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '공정<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '작업장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '작업장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '규격<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'num', caption: 'LOT수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'num', caption: '양품수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'num', caption: '불량수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'per', caption: '불량률(PPM)<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'per', caption: '합격율(%)<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  }
        ],
        records: [
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50'}
        ]
    });

    $('#grid3').w2grid({
        name: 'grid3',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: false
        },
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'text', caption: '공장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '공장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'date', caption: '일자<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: center' },
            { field: 'text', caption: '공정코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '공정<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '작업장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '작업장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '품번명<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '규격<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: 'LOT NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true},
            { field: 'num', caption: '설비카운트<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'num', caption: '양품수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'num', caption: '차이수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'num', caption: '불량수량<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'per', caption: '불량률(PPM)<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'per', caption: '합격율(%)<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  }
        ],
        records: [
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50', date:'2020-10-21'}
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
