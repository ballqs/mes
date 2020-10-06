import GridPageManager from "/include/js/class/GridPageManager.js";

$(function () {
    $('#grid01').w2grid(
        {
            name: 'grid01',
            header: '창고정보',
            show: { header: true },
            columns: [
                { field: 'recid', caption: 'NO', size: '50px', sortable: true, style: 'text-align: right'},
                { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
                { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, editable: { type: 'select'}},
                { field: 'whs_cd', caption: '창고코드(popup)', size: '100px', sortable: true, editable: { type: 'text', maxLength: 20}},
                { field: 'whs_nm', caption: '창고', size: '150px', editable: { type: 'text', maxLength: 50}},
                { field: 'use_yn', caption: '사용여부', size: '100px', editable: { type: 'checkbox'}},
                { field: 'remark', caption: '비고', size: '300px', editable: { type: 'text', maxLength: 1000}},
                { field: 'inst_id', caption: '입력자 ID', size: '100px' },
                { field: 'inst_dt', caption: '입력일시', size: '100px', style: 'text-align: center'},
                { field: 'updt_id', caption: '수정자 ID', size: '100px' },
                { field: 'updt_dt', caption: '수정일시', size: '100px', style: 'text-align: center' }
            ],
            records: [
                //{ recid: 1, fact_cd: 'm01-01', fact_nm: 'M01', whs_cd:'m333', whs_nm:'창고1', use_yn: true, inst_id: 'themomos', remark:'기타 비고사항', inst_id:'themomos', inst_dt:'2020-10-21', updt_id:'themomos', updt_dt:'2020-10-21', chk: true },
                //{ recid: 2, fact_cd: 'm01-01', fact_nm: 'M02', whs_cd:'m333', whs_nm:'창고1', use_yn: false, inst_id: 'themomos', remark:'기타 비고사항', inst_id:'themomos', inst_dt:'2020-10-21', updt_id:'themomos', updt_dt:'2020-10-21'},
                //{ recid: 3, fact_cd: 'm01-01', fact_nm: 'M03', whs_cd:'m333', whs_nm:'창고1', use_yn: true, inst_id: 'themomos', remark:'기타 비고사항', inst_id:'themomos', inst_dt:'2020-10-21', updt_id:'themomos', updt_dt:'2020-10-21'},
                //{ recid: 4, fact_cd: 'm01-01', fact_nm: 'M04', whs_cd:'m333', whs_nm:'창고1', use_yn: true, inst_id: 'themomos', remark:'기타 비고사항', inst_id:'themomos', inst_dt:'2020-10-21', updt_id:'themomos', updt_dt:'2020-10-21'}
            ],
            onClick: function (event) {
                w2ui['grid02'].clear();
                var record = this.get(event.recid);
                w2ui['grid02'].add([
                    { recid: 1, fact_cd: record.fact_cd, fact_nm: record.fact_nm, whs_cd: record.whs_cd, whs_nm: record.whs_nm, use_yn: record.use_yn, remark: record.remark, inst_id: record.inst_id, inst_dt: record.inst_dt, updt_id: record.updt_id, updt_dt: record.updt_dt }
                ]);
            }
        }
    );

    $('#grid02').w2grid(
        {
            name: 'grid02',
            header: '창고위치',
            show: { header: true },
            columns: [
                { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=right' },
                { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
                { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, editable: { type: 'select'}},
                { field: 'whs_cd', caption: '창고코드', size: '100px', sortable: true, editable: { type: 'text'}},
                { field: 'whs_nm', caption: '창고', size: '150px',editable: { type: 'text'}},
                { field: 'loc_cd', caption: '위치코드', size: '100px', sortable: true, editable: { type: 'text'}},
                { field: 'loc_nm', caption: '위치', size: '150px', editable: { type: 'text', maxLength: 20} },
                { field: 'use_yn', caption: '사용여부', size: '100px', editable: { type: 'checkbox' }},
                { field: 'remark', caption: '비고', size: '300px', editable: { type: 'text'}},
                { field: 'inst_id', caption: '입력자 ID', size: '100px' },
                { field: 'inst_dt', caption: '입력일시', size: '100px', style: 'text-align: center'},
                { field: 'updt_id', caption: '수정자 ID', size: '100px' },
                { field: 'updt_dt', caption: '수정일시', size: '100px', style: 'text-align: center'}
            ]
        }
    );

});


// widget configuration
var config = {
    layout: {
        name: 'layout',
        padding: 4,
        panels: [
            { type: 'left', size: '100%', resizable: true}
        ]
    },
    grid: {
        name: 'grid',
        columns: [
            { field: 'fname', caption: 'First Name', size: '33%', sortable: true, searchable: true },
            { field: 'lname', caption: 'Last Name', size: '33%', sortable: true, searchable: true },
            { field: 'email', caption: 'Email', size: '33%' },
            { field: 'sdate', caption: 'Start Date', size: '120px', render: 'date' }
        ],
        records: [
            { recid: 1, fname: 'John', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012'},
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 9, fname: 'Sergei', lname: 'Rachmaninov', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
        ],
        onClick: function(event) {
            var grid = this;
            var form = w2ui.form;
            event.onComplete = function () {
                var sel = grid.getSelection();
                if (sel.length == 1) {
                    form.recid  = sel[0];
                    form.record = $.extend(true, {}, grid.get(sel[0]));
                    form.refresh();
                } else {
                    form.clear();
                }
            }
        }
    }
};

$(function () {
    // initialization in memory
    $().w2layout(config.layout);
    $().w2grid(config.grid);
});

function openPopup() {
    w2popup.open({
        title   : '창고리스트',
        width   : 900,
        height  : 1000,
        showMax : true,
        body    : '<div id="main" style="position: absolute; left: 5px; top: 5px; right: 5px; bottom: 5px;"></div>',
        onOpen  : function (event) {
            event.onComplete = function () {
                $('#w2ui-popup #main').w2render('layout');
                w2ui.layout.content('left', w2ui.grid);
            };
        },
        onToggle: function (event) {
            event.onComplete = function () {
                w2ui.layout.resize();
            }
        },
        buttons   : '<button class="w2ui-btn" onclick="w2popup.close();">닫기</button> '+
            '<button class="w2ui-btn" onclick="w2popup.lock(\'Loading\', true); '+
            '        setTimeout(function () { w2popup.unlock(); }, 2000);" style="background: #ff9000;">확인</button>', //lock 이라고 되어있었음
    });
}
