import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_op_cd from "/include/js/popups/pop_op_cd.js";
import Pop_wrkctr_cd from "/include/js/popups/pop_wrkctr_cd.js";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'rec_ymd', caption: '일자', size: '100px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'wrkctr_cd', caption: '작업장코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'wrkctr_nm', caption: '작업장', size: '100px', sortable: true, resizable: true},
            { field: 'stop_cd', caption: '비가동코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'stop_nm', caption: '비가동명', size: '100px', sortable: true, resizable: true},
            { field: 'stop_gbn', caption: '비가동유형', size: '100px', sortable: true, resizable: true,editable: { type: 'select' }},
            { field: 'str_dt', caption: '시작시간', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'end_dt', caption: '종료시간', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'wrk_tm_min', caption: '소요시간(분)', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'wrkr_qty', caption: '작업자수', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'prt_nbr_no', caption: '품번코드', size: '150px', sortable: true, resizable: true, hidden: true},
            { field: 'prt_nbr_nm', caption: '품번', size: '150px', sortable: true, resizable: true},
            { field: 'inst_id', caption: '작성자', size: '100px', sortable: true, resizable: true}
        ],
    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "stop_anly_staus";

    let pageManager = new GridPageManager(search_frm_id, btn_frm_id, page_addr_name);

    let pop_op_cd = new Pop_op_cd(pageManager, search_frm_id);
    pop_op_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);

    let pop_wrkctr_cd = new Pop_wrkctr_cd(pageManager, search_frm_id);
    pop_wrkctr_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);


    //1번 그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);

    pageManager.gridManager.SetReadonlyFields(grid01.name,["stop_gbn"]);

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/production/status/get/stop_anly_staus");

    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"stop_gbn", common.code, {up_cd: "stop_gbn"}, "cd", "cd_nm");

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //폼 팝업 등록
    let caller_name = "pop_op_cd";
    let target_name = ["op_cd","op_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_op_cd.ShowFormDialog, target_name);

    //폼 팝업 등록
        caller_name = "pop_wrkctr_cd";
        target_name = ["wrkctr_cd","wrkctr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_wrkctr_cd.ShowFormDialog, target_name);



    //버튼함수와 연결
    pageManager.BindButtonFunction();

    //그리드 초기화
    pageManager.InitializeComponent();


    //div에 클릭펑션 먹인거...
    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;
});