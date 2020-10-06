import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";
import Pop_ship_cd from "/include/js/popups/pop_ship_cd.js";

$(function () {

    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center',editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'prt_nbr_cd', caption: '품번', size: '180px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '180px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '180px', sortable: true, resizable: true},
            { field: 'lotno', caption: 'lotno', size: '120px', sortable: true, resizable: true},
            { field: 'stck_qty', caption: '재고수량', size: '100px', sortable: true, resizable: true,style: 'text-align: right'},
            { field: 'stck_unit', caption: '재고단위', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'unit_nm', caption: '재고단위', size: '100px', sortable: true, resizable: true},
            { field: 'stck_whs_cd', caption: '창고', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'stck_whs_nm', caption: '창고', size: '100px', sortable: true, resizable: true},
            { field: 'stck_loc_cd', caption: '창고위치', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'stck_loc_nm', caption: '창고위치', size: '100px', sortable: true, resizable: true},
        ],
        fncPostSearch : function (res) {
            if(res.data.length > 0){
                let search_id = "#grid_"+this.name+"_rec_1";
                $(search_id).click();
            }
        }
    };

    let grid02 = {
        name: 'grid02',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center',editable: { type: 'checkbox' }},
            { field: 'prt_nbr_cd', caption: '품번', size: '180px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '180px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '180px', sortable: true, resizable: true},
            { field: 'lotno', caption: 'lotno', size: '120px', sortable: true, resizable: true},
            { field: 'whs_cd', caption: '창고', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'whs_nm', caption: '창고', size: '100px', sortable: true, resizable: true},
            { field: 'loc_cd', caption: '창고위치', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'loc_nm', caption: '창고위치', size: '100px', sortable: true, resizable: true},
            //출고처현장???
            { field: 'ship_cd', caption: '출고처현장', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'ship_nm', caption: '출고처현장', size: '100px', sortable: true, resizable: true},
            { field: 'out_qty', caption: '출고수량', size: '100px', sortable: true, resizable: true,style: 'text-align: right'},
            { field: 'out_unit', caption: '출고단위', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'unit_nm', caption: '출고단위', size: '100px', sortable: true, resizable: true},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true }
        ],
        fncSeletedGridID : function () {
            Const.SelectedGridID = grid01.name;
        },
    };


    let search_frm_id = "search_frm";
    let detail_frm_id = "detail_frm";
    let btn_frm_id = "hbtn_frm";

    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);

    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    let pop_ship_cd = new Pop_ship_cd(pageManager, detail_frm_id, "detail_pop_ship_cd");
    pop_ship_cd.AddParentReferFormTag(["cmpny_cd"], ["cmpny_cd"]);

    grid01 = pageManager.gridManager.AddGrid(grid01);

    pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/sales/get/direct_out_mgt");

    grid02 = pageManager.gridManager.AddGrid(grid02);

    pageManager.gridManager.SetSelectionCheckField(grid02.name, "chk");

    pageManager.frmManager.AddForm(search_frm_id);
    pageManager.frmManager.AddForm(detail_frm_id);
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(detail_frm_id,"name","cmpny_cd", common.code, {up_cd: "cmpny_cd"}, "cd", "cd_nm");

    let caller_name = "pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);

        caller_name = "pop_ship_cd";
        target_name = ["ship_cd","ship_nm"];
    pageManager.frmManager.AddPopupLink(detail_frm_id, caller_name, pop_ship_cd.ShowFormDialog, target_name);

    pageManager.BindButtonFunction([Const.MesButton.AddRow,Const.MesButton.DeleteRow,Const.MesButton.Save]);
    pageManager.InitializeComponent();

    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});

    Const.SelectedGridID = grid01.name;

    let movedata = [];

    $("#hbtn_frm [name='hBtnB0003']").on("click", function(){
        let ship_cd = $("#detail_frm [name='ship_cd']").val();
        let ship_nm = $("#detail_frm [name='ship_nm']").val();
        if((ship_cd === '') || (ship_nm === '')){
            mes_alert({msg:"출고처현장코드 및 출고처현장명이 빈칸입니다."},{msg:"작성 후 다시 시도해주십시오!"});
            return {result : false};
        }

        let changes_g1 = w2ui['grid01'].getChanges();
        let records_g1 = w2ui['grid01'].records;
        let data_g1 = [];
        for(let i = 0; i < records_g1.length; i++){
            if(records_g1[i]['w2ui'] !== undefined){
                if(records_g1[i]['w2ui']['changes']['chk']){
                    delete records_g1[i]['w2ui'];
                    movedata.push(records_g1[i]);
                }else{
                    data_g1.push(records_g1[i]);
                }
            }else{
                data_g1.push(records_g1[i]);
            }
        }
        w2ui['grid01'].clear();
        w2ui['grid01'].records = W2UiHelper.AddRecID(data_g1);
        w2ui['grid01'].refresh();

        let rec_id = w2ui['grid02'].records.length + 1;
        for(let item of changes_g1){
            w2ui['grid02'].add({recid: rec_id});
            w2ui['grid02'].records[rec_id - 1].cu = 'C';
            w2ui['grid02'].records[rec_id - 1].fact_cd = records_g1[item['recid'] - 1]['fact_cd'];
            w2ui['grid02'].records[rec_id - 1].prt_nbr_cd = records_g1[item['recid'] - 1]['prt_nbr_cd'];
            w2ui['grid02'].records[rec_id - 1].prt_nbr_nm = records_g1[item['recid'] - 1]['prt_nbr_nm'];
            w2ui['grid02'].records[rec_id - 1].spec = records_g1[item['recid'] - 1]['spec'];
            w2ui['grid02'].records[rec_id - 1].lotno = records_g1[item['recid'] - 1]['lotno'];
            w2ui['grid02'].records[rec_id - 1].whs_cd = records_g1[item['recid'] - 1]['stck_whs_cd'];
            w2ui['grid02'].records[rec_id - 1].whs_nm = records_g1[item['recid'] - 1]['stck_whs_nm'];
            w2ui['grid02'].records[rec_id - 1].loc_cd = records_g1[item['recid'] - 1]['stck_loc_cd'];
            w2ui['grid02'].records[rec_id - 1].loc_nm = records_g1[item['recid'] - 1]['stck_loc_nm'];
            w2ui['grid02'].records[rec_id - 1].out_qty = records_g1[item['recid'] - 1]['stck_qty'];
            w2ui['grid02'].records[rec_id - 1].out_unit = records_g1[item['recid'] - 1]['stck_unit'];
            w2ui['grid02'].records[rec_id - 1].unit_nm = records_g1[item['recid'] - 1]['unit_nm'];
            w2ui['grid02'].records[rec_id - 1].ship_cd = ship_cd;
            w2ui['grid02'].records[rec_id - 1].ship_nm = ship_nm;
            w2ui['grid02'].records[rec_id - 1].remark = $("#detail_frm [name='remark']").val();
            rec_id++;
        }
        w2ui['grid02'].refresh();
    });

    $("#hbtn_frm [name='hBtnB0004']").on("click", function(){
        w2confirm(Const.MesMsg.confirm)
            .yes(() => {
                let changes_g2 = w2ui['grid02'].getChanges();
                let records_g2 = w2ui['grid02'].records;
                let lotno_list = [];
                for(let item of changes_g2){
                    if(item['chk']){
                        lotno_list.push(records_g2[item['recid'] - 1]['lotno']);
                    }
                }
                let records_g1 = w2ui['grid01'].records;
                let temp_list = [];
                for(let i = 0; i < movedata.length; i++){
                    if(lotno_list.indexOf(movedata[i]['lotno']) !== -1){
                        records_g1.push(movedata[i]);
                    }else{
                        temp_list.push(movedata[i]);
                    }
                }
                movedata = temp_list;
                w2ui['grid01'].clear();
                w2ui['grid01'].records = W2UiHelper.AddRecID(records_g1);
                w2ui['grid01'].refresh();

                let data = [];
                for(let i = 0; i< records_g2.length; i++){
                    if(lotno_list.indexOf(records_g2[i]['lotno']) === -1){
                        data.push(records_g2[i]);
                    }
                }
                w2ui['grid02'].clear();
                w2ui['grid02'].records = W2UiHelper.AddRecID(data);
                w2ui['grid02'].refresh();
            })
            .no(function(){
                return false;
            });
    });

    $("#hbtn_frm [name='hBtnB0005']").on("click", function(){
        let btn_id = Const.MesButton.Save;
        let rest_url = "/ajax/sales/save/direct_out_mgt";
        let param = [];
            param[0] = $("#search_frm [name='fact_cd']").val();
            param[1] = w2ui['grid02'].records;
        if(param.length > 0){
            let param_arr = [param];
            let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);
            ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
                .then((res)=>
                {
                    console.log(res);
                    if(res.result){
                        let btn_id = Const.MesButton.Search;
                        let param = FormHelper.SerializeForm(search_frm_id);
                        let rest_url = "/ajax/sales/get/direct_out_mgt";

                        let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);

                        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
                            .then((res)=>{
                                //console.log(res);
                                if(res.result){
                                    w2ui['grid01'].records = W2UiHelper.AddRecID(res.data);
                                    w2ui['grid01'].reload(true);
                                    if(w2ui['grid01'].hasOwnProperty("fncPostSearch") && typeof w2ui['grid01'].fncPostSearch == "function"){
                                        w2ui['grid01'].fncPostSearch(res);
                                    }
                                    w2ui['grid02'].clear();
                                }else{
                                    mes_alert({msg: data.msg},{msg: ""});
                                }
                            })
                            .fail(ScriptHelper.OnAjaxFail);
                        common.success_msg(res.msg);
                    }else{
                        mes_alert({msg:res.msg},{msg:""});
                    }
                })
                .fail(ScriptHelper.OnAjaxFail);
        }
    });


});
