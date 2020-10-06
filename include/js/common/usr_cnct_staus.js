$(function () {
    $('#grid').w2grid({
        name: 'grid',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: false
        },
        columns: [
            { field: 'recid', caption: 'NO', size: '100px', sortable: true, resizable: true, style: 'text-align: right;'},
            { field: 'emp_id', caption: '사용자ID', size: '10%', sortable: true, resizable: true, style: 'text-align: left;' },
            { field: 'emp_nm', caption: '사용자명', size: '10%', sortable: true, resizable: true, style: 'text-align: center;'},
            { field: 'cnct_dt', caption: '접속일시', size: '200px', sortable: true, resizable: true, style: 'text-align: center;'},
            { field: 'pgm_id', caption: '프로그램ID', size: '10%', sortable: true, resizable: true, style: 'text-align: left;'},
            { field: 'pgm_nm', caption: '프로그램명', size: '10%', sortable: true, resizable: true, style: 'text-align: left;'},
            { field: 'btn_id', caption: '버튼ID', size: '10%', sortable: true, resizable: true, style: 'text-align: left;'},
            { field: 'btn_nm', caption: '버튼명', size: '10%', sortable: true, resizable: true, style: 'text-align: left'}
        ],
        // records: [
        //     { recid: 1, int: 100, money: 100, percent: 55, date: '1/1/2014', combo: 'John Cook', check: true },
        //     { recid: 2, int: 200, money: 454.40, percent: 15, date: '1/1/2014', combo: 'John Cook', check: false, list: { id: 2, text: 'Steve Jobs' } },
        //     { recid: 3, int: 350, money: 1040, percent: 98, date: '3/14/2014', combo: 'John Cook', check: true },
        //     { recid: 4, int: 350, money: 140, percent: 58, date: '1/31/2014', combo: 'John Cook', check: true, list: { id: 4, text: 'Mark Newman' } },
        //     { recid: 5, int: 350, money: 500, percent: 78, date: '4/1/2014', check: false },
        //     { recid: 6, text: 'some text', int: 350, money: 440, percent: 59, date: '4/4/2014', check: false },
        //     { recid: 7, int: 350, money: 790, percent: 39, date: '6/8/2014', check: false },
        //     { recid: 8, int: 350, money: 4040, percent: 12, date: '11/3/2014', check: true },
        //     { recid: 9, int: 1000, money: 3400, percent: 100, date: '2/1/2014',
        //         style: 'background-color: #ffcccc', editable: false }
        // ]
        records: cnct,
    });


    $("#hBtnB0001").on("click", function(){ $(".loadingW").css("display", ""); $("#search_frm").submit(); });
    $("#hBtnB0002").on("click", function(){ $(".loadingW").css("display", ""); location.href = window.location.pathname; $(".loadingW").css("display", "none");});
    $("#hBtnB0003").on("click", function(){ $(".loadingW").css("display", ""); var el=w2ui['grid_toolbar']; if (el) el.click('add', event); $(".loadingW").css("display", "none"); });
    $("#hBtnB0006").on("click", function(){ $(".loadingW").css("display", ""); fnExcelReport('grid_grid_records > table', w2ui.grid.columns, 'excel_download'); $(".loadingW").css("display", "none"); });
    $("#hBtnB0034").on("click", function(){
        window.open("about:blank").location.href = "/uploads/img/guide/usr_cnct_staus.pdf";
    });
});

function showChanged() {
    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}
