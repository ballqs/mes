import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "../../class/PageManager.js";
import GridPageManager from "../../class/GridPageManager.js";
import Pop_prt_nbr_cd from "../../popups/pop_prt_nbr_cd.js";

// $('input[type=us-date]').w2field('date');

$(function () {

    let grid01 = {
        name: 'grid01',
        columns: [],
        records: [
            // { recid: 1, prt_nbr_cd: 'MS', prt_nbr_nm:'ddd', trans_unit_cd:'M001', trans_unit: 2, base_unit_cd:'M3333', pln_qty:'ddd', pln_unit: 1, pln_gbn: 1, nnn:'999', base_unit:1, trans_qty:'100', base_qty:'100', remark:'기타 비고사항', inst_id:'themomos', inst_dt:'2020-02-02', updt_id:'themomos', updt_dt:'2020-02-02', chk: true}
        ],
        columns_arr : [
            [
                { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
                { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: { type: 'checkbox' }, hidden: true},
                { field: 'prt_nbr_cd', caption: '품번코드', size: '250px', sortable: true, resizable: true},
                { field: 'prt_nbr_nm', caption: '품번명', size: '150px', sortable: true, resizable: true},
                { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true},
            ],
            [
                // 동적 칼럼
            ],
            [
                // { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true,editable: { type: 'text'}},
                // { field: 'updt_id', caption: '입력자 ID', size: '100px', sortable: true, resizable: true },
                // { field: 'updt_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center' },
            ]
        ],
        config:{

        },
        fncPostSearch : function(param){
            let active_col = param.data[1];
            let data_list = param.data[2];
            if(data_list === undefined){
                w2ui.grid01.clear();
                return 0;
            }
            delete active_col['recid'];
            delete data_list['recid'];

            this.columns_arr[1] = [];
            let fixed_column_form = this.fixed_column_form;
            for(let item of active_col){
                this.columns_arr[1].push(
                    { field: item.COLUMN_NAME, caption: item.COLUMN_NAME.substr(1)+"주", size: '100px', sortable: true, resizable: true, editable: { type: 'text'},style: 'text-align: right' }
                );
            }
            grid01.columns = common.merge_columns(grid01.columns_arr);
            w2ui.grid01.records = W2UiHelper.AddRecID(param.data[2]);
            w2ui.grid01.refresh();
        }
    }

    grid01.columns = common.merge_columns(grid01.columns_arr);

    let search_frm_id = "search_frm";
    let bnt_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, bnt_frm_id);
    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id,"pop_prt_nbr_cd",{cd: [11,12,13,41]});
    // pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    // pop_prt_nbr_cd.AddTargetColumnsOnPopupClose(["prt_nbr_cd","whs_cd", "whs_nm"], ["prt_nbr_cd","whs_cd", "whs_nm"]);

    //1번 그리드 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid01 = pageManager.gridManager.AddGrid(grid01);
    //팝업등록
    // pageManager.gridManager.AddPopUpOption(grid01.name,"whs_cd", pop_whs_cd.PopupName);

    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");

    //PK, 필수입력, Readonly 필드 등록
    pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "prt_nbr_cd", "prt_nbr_nm"]);
    // pageManager.gridManager.SetReadonlyFields(grid01.name,  ["prt_nbr_dsp_nm"]);
    // pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["whs_nm"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/material/purchase/get/prchs_mon_pln_mgt");

    // pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/base/standard/delete/wrhs_loc");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/material/purchase/save/prchs_mon_pln_mgt");
    //콤보박스 렌더 정보 등록
    // pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //체크박스 T/F 정보 등록..
    // pageManager.gridManager.AddCheckRenderOption(grid01.name,"use_yn", "Y", "N");
    //pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "whs_cd"]);

    //폼 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","account_type", common.code, {up_cd: "account_type",cd: [11,12,13,41]}, "cd", "cd_nm", "", "전체");

    //폼 팝업 등록
    let caller_name = "pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);


    //그리드 초기화..
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //버튼함수와 연결...
    // pageManager.BindButtonFunction([Const.MesButton.Search]);
    pageManager.BindButtonFunction(
//     [Const.MesButton.Save]
    );


    $("#hbtn_frm [name='hBtnB0005']").on("click", function(){
        let fact_cd = $("#search_frm [name='fact_cd']").val();
    });

    //그리드 초기화...
    pageManager.InitializeComponent();

    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});

    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;
});

