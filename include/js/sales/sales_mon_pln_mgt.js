import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [],
        columns_arr : [
            [
                { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
                { field: 'check', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }, hidden: true},
                { field: 'prt_nbr_cd', caption: '품번코드', size: '150px', sortable: true, resizable: true},
                { field: 'prt_nbr_nm', caption: '품번', size: '150px', sortable: true, resizable: true},
                { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true},
            ],
            [
                // 동적 칼럼
            ],
            [
                // { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text'}},
                // { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true },
                // { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align:center'}
            ]
        ],
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
                    { field: item.COLUMN_NAME, caption: item.COLUMN_NAME.substr(1)+"주", size: '100px', sortable: true, resizable: true, editable: { type: 'int'},style: 'text-align: right' }
                );
            }
            let records;
            for(let i=0; i<param.data[2].length; i++){
                let sum = 0;
                for(let j=0; j<active_col.length; j++){
                    if(param.data[2][i][active_col[j]['COLUMN_NAME']] == null){
                        param.data[2][i][active_col[j]['COLUMN_NAME']] = 0;
                    }
                    sum += Number(param.data[2][i][active_col[j]['COLUMN_NAME']]);
                }
                param.data[2][i]['sum'] = sum;
            }
            records = param.data[2];
            this.columns_arr[1].push(
                { field: 'sum', caption: "합계", size: '100px', sortable: true, resizable: true,style: 'text-align: right' }
            );
            grid01.columns = common.merge_columns(grid01.columns_arr);
            w2ui.grid01.records = W2UiHelper.AddRecID(records);
            w2ui.grid01.refresh();
        }
    };

    grid01.columns = common.merge_columns(grid01.columns_arr);

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);
    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id,"pop_prt_nbr_cd",{cd: [31,41]});
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);

    //1번 그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);
    //PK
    pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "prt_nbr_cd", "prt_nbr_nm"]);

    //버튼에 대한 AJAX 경로
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/sales/get/sales_mon_pln_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/sales/save/sales_mon_pln_mgt");

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "account_type", common.code, {up_cd: "account_type",cd: [31,41]}, "cd", "cd_nm", "", "전체");

    //폼 팝업 등록
    let caller_name = "pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);

    //버튼함수와 연결
    pageManager.BindButtonFunction();

    //그리드 초기화
    pageManager.InitializeComponent();


    //div에 클릭펑션 먹인거...
    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;

});