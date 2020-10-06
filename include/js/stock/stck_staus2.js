// import PageManager from "/include/js/class/PageManager.js";
// import SingleGridPageManager from "/include/js/class/SingleGridPageManager.js";
// import PopupManager from "/include/js/class/PopupManager.js";

import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManger from "/include/js/class/GridPageManger.js";
import Pop_loc_cd from "/include/js/popups/pop_loc_cd.js";

$(function(){
    initGrid();
});


function initGrid() {

    //탭
    $('#selected-tab .tab').hide();
    $('#selected-tab #tab1').show();

    $('#tabs').w2tabs({
        name: 'tabs',
        active: 'tab1',
        tabs: [
            { id: 'tab1', caption: '품번별 재고' },
            { id: 'tab2', caption: 'LOT별 재고' }
        ],
        onClick: function (event) {
            $('#selected-tab .tab').hide();
            $('#selected-tab #' + event.target).show();
            $('#grid2 table tbody').trigger("click");
        }
    });

    $('#grid1').w2grid({
        name: 'grid1',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'text', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '공장', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '거래처코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '거래처', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '품번코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '품번', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '규격', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '재질', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '창고코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '창고', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '위치코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '위치', size: '150px', sortable: true, resizable: true },
            { field: 'num', caption: '재고량', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'cm', caption: '단위', size: '100px', sortable: true, resizable: true },
            { field: 'num', caption: '안전재고', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'num', caption: '차이수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right' }
        ],
        records: [
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50'}
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
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'text', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '공장', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '거래처코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '거래처', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '품번코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '품번', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '규격', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '재질', size: '100px', sortable: true, resizable: true },
            { field: 'text', caption: '창고코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '창고', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: '위치코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'text', caption: '위치', size: '150px', sortable: true, resizable: true },
            { field: 'text', caption: 'LOT번호', size: '100px', sortable: true, resizable: true },
            { field: 'num', caption: '재고량', size: '100px', sortable: true, resizable: true, style: 'text-align: right' },
            { field: 'cm', caption: '단위', size: '100px', sortable: true, resizable: true }
        ],
        records: [
            { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50'}
        ]
    });

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManger(search_frm_id, btn_frm_id);
    let pop_loc_cd = new Pop_loc_cd(pageManager, search_frm_id);

    //폼 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //폼 팝업 등록
    let caller_name = "pop_loc_cd";
    let target_name = "loc_cd";
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_loc_cd.ShowFormDialog, target_name);
}
