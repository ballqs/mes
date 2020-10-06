import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_wrkctr_cd from "/include/js/popups/pop_wrkctr_cd.js";
import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";

$(function () {
   let grid01 = {
       name : "grid01",
       columns : [
           { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
           { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, hidden: true},
           { field: 'fact_nm', caption: '공장', size: '100px', sortable: true, resizable: true},
           { field: 'wrkctr_cd', caption: '작업장', size: '100px', sortable: true, resizable: true, hidden: true},
           { field: 'wrkctr_nm', caption: '작업장', size: '100px', sortable: true, resizable: true},
           { field: 'wrk_ordr_no', caption: '지시번호', size: '100px', sortable: true, resizable: true},
           { field: 'wrk_ordr_dt', caption: '지시일자', size: '150px', sortable: true, resizable: true},
           { field: 'wrk_ordr_status', caption: '지시상태', size: '100px', sortable: true, resizable: true,attr:'align=center', editable: { type: 'select'}},
           { field: 'prt_nbr_cd', caption: '품번', size: '180px', sortable: true, resizable: true},
           { field: 'prt_nbr_nm', caption: '품번명', size: '180px', sortable: true, resizable: true},
           { field: 'spec', caption: '규격', size: '180px', sortable: true, resizable: true},
           { field: 'day_night', caption: '주/야', size: '100px', sortable: true, resizable: true,attr:'align=center',editable: { type: 'select'}},
           { field: 'wrkr_nm', caption: '메인작업자', size: '100px', sortable: true, resizable: true},
           { field: 'wrkr_qty', caption: '작업자수', size: '50px', sortable: true, resizable: true},
       ],
       rowOnClickConfig : {
           [Const.config.rowOnClickConfig.funcType] : [Const.config.rowOnClickConfig.funcOption.detail],
           [Const.config.rowOnClickConfig.clickTargetGrid] : ["grid02"],
           [Const.config.rowOnClickConfig.clickWhereFieldList] : ["fact_cd", "wrkctr_cd"],
           [Const.config.rowOnClickConfig.url] : "/ajax/production/status/get/mach_result_adjst_rowonclick"
       },
       fncPostSearch : function (res) {
           if(res.data.length > 0){
               let search_id = "#grid_"+this.name+"_rec_1";
               $(search_id).click();
           }
       },
   };

    let grid02 = {
        name : "grid02",
        columns : [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, editable: { type: 'checkbox'}},
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'fact_nm', caption: '공장', size: '100px', sortable: true, resizable: true},
            { field: 'wrkctr_cd', caption: '작업장', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'wrkctr_nm', caption: '작업장', size: '100px', sortable: true, resizable: true},
            { field: 'wrk_ordr_no', caption: '지시번호', size: '100px', sortable: true, resizable: true},
            { field: 'rslt_dt', caption: '실적시간', size: '150px', sortable: true, resizable: true},
            { field: 'prt_nbr_cd', caption: '품번', size: '50px', sortable: true, resizable: true},
            { field: 'mach_cnt', caption: '설비카운트', size: '100px', sortable: true, resizable: true},
            { field: 'cavity', caption: 'CAVITY', size: '100px', sortable: true, resizable: true}
        ],
        fncSeletedGridID : function () {
            Const.SelectedGridID = grid01.name;
        },
    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "mach_result_adjst";

    let pageManager = new GridPageManager(search_frm_id, btn_frm_id, page_addr_name);
    let pop_wrkctr_cd = new Pop_wrkctr_cd(pageManager, search_frm_id);
    pop_wrkctr_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);

    grid01 = pageManager.gridManager.AddGrid(grid01);

    pageManager.gridManager.SetReadonlyFields(grid01.name,['day_night']);

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/production/status/get/mach_result_adjst");

    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"wrk_ordr_status", common.code, {up_cd: "wrk_ordr_status"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"day_night", common.code, {up_cd: "day_night"}, "cd", "cd_nm");

    grid02 = pageManager.gridManager.AddGrid(grid02);

    pageManager.gridManager.SetSelectionCheckField(grid02.name,"chk");

    pageManager.frmManager.AddForm(search_frm_id);

    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: 'fact_cd'}, "cd", "cd_nm");

    let caller_name = "pop_wrkctr_cd";
    let target_name = ["wrkctr_cd","wrkctr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_wrkctr_cd.ShowFormDialog, target_name);

    pageManager.BindButtonFunction([Const.MesButton.Save]);

    pageManager.InitializeComponent();

    grid01.onClick = W2UiHelper.RowOnClick;

    $("#grid01").on(Const.HtmlEvent.click, function () {    Const.SelectedGridID = grid01.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;


    $("#hbtn_frm [name='hBtnB0005']").on("click", function(){

        let grid_id = 'grid02';
        let rest_url = "/ajax/production/status/save/mach_result_adjst";
        let btn_id = Const.MesButton.Save;

        let param = [];

        let lcr = ScriptHelper.CloneObject(common.get_last_clicked_row().grid01);

        param.push(lcr);

        let changes = w2ui[grid_id].getChanges();

        for (let item of changes) {
            if (item.chk) {
                param.push(w2ui[grid_id].records[item.recid - 1]);
            }
        }

        if(param.length > 1){
            let param_arr = [param];
            let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);

            ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
                .then((res)=>
                {
                    console.log(res, 'after ajax');
                    if(res.result){
                        pageManager.BtnFuncList.search(event, false);
                        common.success_msg(res.msg);

                    }else{
                        mes_alert({msg:res.msg},{msg:""});
                    }
                })
                .fail(ScriptHelper.OnAjaxFail);
        }

    });

});