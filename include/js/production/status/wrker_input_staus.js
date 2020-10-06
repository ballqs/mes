import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_wrker_cd from "/include/js/popups/pop_wrker_cd.js";
import Pop_op_cd from "/include/js/popups/pop_op_cd.js";
import Pop_wrkctr_cd from "/include/js/popups/pop_wrkctr_cd.js";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'fact_nm', caption: '공장', size: '100px', sortable: true, resizable: true},
            { field: 'rec_ymd', caption: '일자', size: '100px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'wrk_ordr_no', caption: '지시번호', size: '120px', sortable: true, resizable: true},
            { field: 'wrkr_cd', caption: '작업자코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'wrkr_nm', caption: '작업자', size: '100px', sortable: true, resizable: true},
            { field: 'op_cd', caption: '공정코드', size: '70px', sortable: true, resizable: true, hidden: true},
            { field: 'op_nm', caption: '공정', size: '70px', sortable: true, resizable: true},
            { field: 'wrkctr_cd', caption: '작업장코드', size: '70px', sortable: true, resizable: true, hidden: true},
            { field: 'wrkctr_nm', caption: '작업장', size: '70px', sortable: true, resizable: true},
            { field: 'staus', caption: '상태', size: '100px', sortable: true, resizable: true},
            { field: 'str_dt', caption: '시작시간', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'end_dt', caption: '종료시간', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'wrk_tm_min', caption: '작업시간(분)', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'text', caption: '투입라인수', size: '100px', sortable: true, resizable: true, style: 'text-align: right', hidden: true},
            //{ field: 'time', caption: '실공수(분)', size: '100px', sortable: true, resizable: true, style: 'text-align: center'},
            //{ field: 'date', caption: '등록일자', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'prt_nbr_no', caption: '품번코드', size: '150px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번', size: '150px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '150px', sortable: true, resizable: true},
        ],
    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "wrker_input_staus";

    let pageManager = new GridPageManager(search_frm_id, btn_frm_id, page_addr_name);
    let pop_wrker_cd = new Pop_wrker_cd(pageManager, search_frm_id);
    pop_wrker_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);

    let pop_op_cd = new Pop_op_cd(pageManager, search_frm_id);
    pop_op_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);

    let pop_wrkctr_cd = new Pop_wrkctr_cd(pageManager, search_frm_id);
    pop_wrkctr_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);

    //1번 그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/production/status/get/wrker_input_staus");

    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"staus", common.code, {up_cd: "staus"}, "cd", "cd_nm");

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //폼 팝업 등록
    let caller_name = "pop_wrker_cd";
    let target_name = ["emp_id","emp_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_wrker_cd.ShowFormDialog, target_name);


    //폼 팝업 등록
    let caller_name2 = "pop_op_cd";
    let target_name2 = ["op_cd","op_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name2, pop_op_cd.ShowFormDialog, target_name2);

    //폼 팝업 등록
    let caller_name3 = "pop_wrkctr_cd";
    let target_name3 = ["wrkctr_cd","wrkctr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name3, pop_wrkctr_cd.ShowFormDialog, target_name3);


    //버튼함수와 연결
    pageManager.BindButtonFunction();

    //그리드 초기화
    pageManager.InitializeComponent();

    //div에 클릭펑션 먹인거...
    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;


});