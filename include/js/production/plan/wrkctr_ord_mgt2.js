import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_wrkctr_cd from "/include/js/popups/pop_wrkctr_cd.js";

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
    $('#grid01').w2grid({
        name: 'grid01',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: false
        },
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'check', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox' }
            },
            { field: 'select', caption: '공장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select' }
            },
            { field: 'combo', caption: '공장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'date', caption: '계획일자<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'time' }
            },
            { field: 'select', caption: '공정코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select' }
            },
            { field: 'pop', caption: '공정<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'pop', caption: '작업장<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '주/야구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'select' }
            },
            { field: 'date', caption: '지시일자<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '지시품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'pop', caption: '품번코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '품번<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '규격<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '지시단위<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select' }
            },
            { field: 'combo', caption: '지시단위<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '공정코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select'}
            },
            { field: 'combo', caption: '공정<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '라인코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select' }
            },
            { field: 'combo', caption: '라인<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '지시상태코드_대기진행완료<i class="fa fa-sort" aria-hidden="true"></i>', size: '200px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select' }
            },
            { field: 'combo', caption: '지시상태코드_대기진행완료<i class="fa fa-sort" aria-hidden="true"></i>', size: '200px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '지시유형_일반긴급재작업<i class="fa fa-sort" aria-hidden="true"></i>', size: '200px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select' }
            },
            { field: 'combo', caption: '지시유형_일반긴급재작업<i class="fa fa-sort" aria-hidden="true"></i>', size: '200px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'select', caption: '조구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, hidden: true,
                editable: { type: 'select' }
            },
            { field: 'combo', caption: '조구분<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: 'CAVITY<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'check', caption: '지시확정여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox', style: 'text-align: center' }
            },
            { field: 'combo', caption: '계획지시번호<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '그룹작업지시<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'text', caption: 'UPH<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'text', caption: '작업시간_분<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true, style: 'text-align: right',
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '비고<i class="fa fa-sort" aria-hidden="true"></i>', size: '300px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'combo', caption: '입력자ID<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'sdate', caption: '입력일시<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'time' }
            },
            { field: 'combo', caption: '수정자ID<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'sdate', caption: '수정일시<i class="fa fa-sort" aria-hidden="true"></i>', size: '150px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'time', style: 'text-align: center' }
            }
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
            // { recid: 1, text:999, percent:20, int: 100, money: 100, date: '2020-03-23', sdate: '2020-04-29 00:00:00', combo: 'ddd', check: true, pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>' },
            { recid: 1, text:999, percent:20, int: 100, money: 100, date: '2020-03-23', sdate: '2020-04-29 00:00:00', combo: 'ddd', check: true,
                pop:`
                    <div style="float:left; line-height:40px;">
                        test
                    </div>
                    <a class="popBtInner" onclick="openPopup()">
                        <i class="far fa-window-restore" style="color: #363c4f;">
                        </i>
                    </a>` },
            { recid: 2 },
            { recid: 3 },
            { recid: 4 },
            { recid: 5 }
        ]
    });

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);
    let pop_wrkctr_cd = new Pop_wrkctr_cd(pageManager, search_frm_id);

    //폼 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //폼 팝업 등록
    let caller_name = "pop_wrkctr_cd";
    let target_name = "wrkctr_cd";
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_wrkctr_cd.ShowFormDialog, target_name);

    // initialization in memory
    //$().w2layout(config.layout);
    //$().w2grid(config.grid);
    //$().w2form(config.form);

});

// function showChanged() {
//     console.log(w2ui['grid'].getChanges());
//     w2alert('Changed records are displayed in the console');
// }
//
// function open_pop_prt_nbr_cd() {
//     let selected_fact_cd = $("#search_frm select[name='fact_cd']").val();
//     let selected_fact_nm = $("#search_frm select[name='fact_cd'] option:checked").text();
//     pop_prt_nbr_cd.pop_open(selected_fact_cd, selected_fact_nm);
//     // pop_part_nbr(selected_fact_cd, selected_fact_nm, account_type);
// }




// 복사버튼
$(function(){

    $("#hBtnB0008").on("click", (event)=>{
            console.log(event);
            $("#w2ui_popup").w2popup();
        },
    );


});
