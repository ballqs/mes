$(function () {
    $('#grid01').w2grid({
        name: 'grid01',
        header: '품번리스트',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=center' },
            { field: 'check', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox' }
            },
            { field: 'aaa', caption: '공장코드', size: '100px', sortable: true, hidden: true},
            { field: 'bbb', caption: '공장', size: '150px', sortable: true },
            { field: 'ccc', caption: '항목수', size: '100px', sortable: true,  style: 'text-align: right'},
            { field: 'pop', caption: '품번(popup)', size: '150px', sortable: true},
            { field: 'fff', caption: '규격', size: '100px', sortable: true,
                editable: { type: 'text' }
            }
        ],
        records: [
            { recid: 1, aaa: 'M0001', bbb: 'text', ccc: '323', ddd: 'texttexttexttexttexttext', eee: 'texttexttexttexttexttexttext', fff: '200*200', chk: true, pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>'}
        ],
        onClick: function (event) {
            w2ui['grid02'].clear();
            var record = this.get(event.recid);
            w2ui['grid02'].add([
                { recid: 1, lname: record.aaa, fname: record.bbb }
            ]);
        }
    });

    $('#grid02').w2grid({
        name: 'grid02',
        header: '품번검사항목리스트',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=right' },
            { field: 'check', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox' }
            },
            { field: 'lname', caption: '검사항목코드', size: '200px', sortable: true, hidden: true},
            { field: 'fname', caption: '검사항목명', size: '150px', sortable: true }
        ],
        records: [
            { recid: 1, aaa: 'M0001', bbb: 'text', ccc: '323', ddd: 'texttexttexttexttexttext', eee: 'texttexttexttexttexttexttext', fff: '200*200', pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>'}
        ]
    });

    $('#grid').w2grid({
        name: 'grid',
        header: '품번검사항목리스트',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=right' },
            { field: 'check', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox' }
            },
            { field: 'lname', caption: '검사항목코드', size: '200px', sortable: true, hidden: true },
            { field: 'fname', caption: '검사항목명', size: '150px', sortable: true }
        ],
        records: [
            { recid: 1, aaa: 'M0001', bbb: 'text', ccc: '323', ddd: 'texttexttexttexttexttext', eee: 'texttexttexttexttexttexttext', fff: '200*200', pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>'}
        ]
    });

    $('#tabs').w2tabs(config.tabs);
    $('#tab1').show();
    $('#tab2').hide();

});


//tab
var config = {
    tabs: {
        name: 'tabs',
        active: 'tab1',
        tabs: [
            { id: 'tab1', caption: '검사항목 상세' },
            { id: 'tab2', caption: '검사항목 이력' }
        ],
        onClick: function (event) {
            $('#tab-example .tab').hide();
            $('#tab-example #' + event.target).show();
            $('#grid table tbody').trigger("click");
        }
    }
}


function open_pop_prt_nbr_cd() {
    let selected_fact_cd = $("#search_frm select[name='fact_cd']").val();
    let selected_fact_nm = $("#search_frm select[name='fact_cd'] option:checked").text();
    pop_prt_nbr_cd.pop_open(selected_fact_cd, selected_fact_nm);
    // pop_part_nbr(selected_fact_cd, selected_fact_nm, account_type);
}
