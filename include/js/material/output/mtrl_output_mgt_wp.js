import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "../../class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_whs_cd from "/include/js/popups/pop_whs_cd.js";
import Pop_loc_cd from "/include/js/popups/pop_loc_cd.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";
import Pop_ship_cd from "../../popups/pop_ship_cd.js";

// 재고가 0보다 큰 것만 보여줄 것!
// 현재재고
$(function () {

    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, style: 'text-align: right'},
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', hidden:true, editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, hidden:true},
            { field: 'fact_nm', caption: '공장명', size: '100px', sortable: true},
            { field: 'out_gbn', caption: '출고구분', size: '100px', sortable: true, hidden: true},
            { field: 'rec_ymd', caption: '수불일자', size: '100px', sortable: true, hidden: true},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '100px', sortable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '100px', sortable: true},
            { field: 'spec', caption: '규격', size: '150px', sortable: true},
            { field: 'lotno', caption: 'LOTNO', size: '100px', sortable: true, hidden: true},
            { field: 'biz_cd', caption: '출고처코드', size: '150px', sortable: true, resizable: true , hidden: true},
            { field: 'biz_nm', caption: '출고처', size: '150px', sortable: true, resizable: true, hidden: false },
            { field: 'ship_cd', caption: '출고처현장코드', size: '150px', sortable: true, resizable: true , hidden: true},
            { field: 'ship_nm', caption: '출고처현장', size: '150px', sortable: true, resizable: true, hidden: false },
            { field: 'stck_whs_cd', caption: '창고코드', size: '100px', sortable: true, hidden:true},
            { field: 'whs_nm', caption: '창고명', size: '100px', sortable: true},
            { field: 'stck_loc_cd', caption: '창고위치코드', size: '100px', sortable: true, hidden:true},
            { field: 'loc_nm', caption: '창고위치명', size: '100px', sortable: true},
            { field: 'stck_qty', caption: '현재재고', size: '100px', sortable: true},
            { field: 'stck_unit', caption: '재고단위코드', size: '100px', sortable: true, hidden:true},
            { field: 'unit_nm', caption: '재고단위', size: '100px', sortable: true},
        ],
//         rowOnClickConfig : {
//             [Const.config.rowOnClickConfig.funcType] : [Const.config.rowOnClickConfig.funcOption.detail],
//             [Const.config.rowOnClickConfig.clickTargetGrid] : ["grid02"],
//             [Const.config.rowOnClickConfig.clickWhereFieldList] : ["fact_cd", "po_no", "po_seq"],
//             [Const.config.rowOnClickConfig.url] : "/ajax/material/input/get/purchininfo"
//         },
        fncPreSavePage : function(){
            let result = {result : false};
            for(let key in w2ui.grid02.records){
                if(w2ui.grid02.records[key].stck_qty !== undefined){
                    if(w2ui.grid02.records[key].stck_qty < w2ui.grid02.records[key].w2ui.changes.out_qty){
                        $(".loadingW").css("display", "none");
                        common.mes_alert({msg : (Number(key)+1)+"열에 출고 수량이 현재 재고보다 많습니다."});
                        return result;
                    }else if(w2ui.grid02.records[key].w2ui.changes.out_qty <= 0 || String(w2ui.grid02.records[key].w2ui.changes.out_qty).trim() == ''){
                        $(".loadingW").css("display", "none");
                        common.mes_alert({msg : (Number(key)+1)+"열에 출고 수량을 0 보다 큰 수를 입력하여 주세요"});
                        return result;
                    }
                }
            }
            return {result:true};
        },
        fncPostSavePage : function(data){
            let param = w2ui.grid01.lastGetParam;
            let rest_url = "/ajax/material/output/get/mtrl_output_mgt";
            common.success_msg(data.msg);
            $.ajax({
                url : rest_url,
                type : "get",
                data : param,
                dataType : "json",
                success: function (data){
                    $(".loadingW").css("display", "none");
                    if (data.result){
                        let grid01_last_clicked_recid = w2ui.grid01.last.click_recid;
                        let grid01_last_clicked_row = w2ui.grid01.records[w2ui.grid01.last.click_recid - 1];
                        document.search_frm.prt_nbr_cd.value = grid01_last_clicked_row.prt_nbr_cd;
                        document.search_frm.prt_nbr_nm.value = grid01_last_clicked_row.prt_nbr_nm;
                        let grid01 = data.data.grid01;
                        W2UiHelper.AddRecID(data.data.grid01);
                        w2ui.grid01.records = grid01;
                        w2ui.grid01.refresh();
                        if(w2ui.grid01.records.length > 0){
                            $("#grid_grid01_rec_"+grid01_last_clicked_recid).click();
                            console.log("break");
                        }
//                         common.success_msg(data.msg);
                    }else{
                        common.mes_alert(data);
                    }
                }
            });
        },
        onClick:function(obj){
            $(".loadingW").css("display", "");
            let clicked_row = this.records[this.last.click_recid - 1];
            let date_s = document.search_frm.date_s.value;
            let date_e = document.search_frm.date_e.value;
            // fact_cd, prt_nbr_cd, lotno, stck_wsh_cd, stck_loc_cd
            let param = {
                param : {
                    fact_cd : clicked_row.fact_cd,
                    prt_nbr_cd : clicked_row.prt_nbr_cd,
                    lotno : clicked_row.lotno,
                    whs_cd : clicked_row.stck_whs_cd,
                    loc_cd : clicked_row.stck_loc_cd,
                    date_s : date_s,
                    date_e : date_e
                }
            }
            $.ajax({
                url: "/ajax/material/output/get/mtrl_output_detail",
                type: "get",
                data: param,
                dataType: "json",
                success: function(data){
                    $(".loadingW").css("display", "none");
                    console.log(data);
                    w2ui.grid02.records = W2UiHelper.AddRecID(data.data);
                    w2ui.grid02.refresh();
                    if(data.result){
//                         common.success_msg(data.msg);    
                    }else{
                        common.mes_alert(data);
                    }
                    
                },
                error: function (request,status,error) {
                    $(".loadingW").css("display", "none");
                    console.log(request);
                    console.log(status);
                    console.log(error);
                }
            });
        },
        lastGetParam : {
            param : {}
        }
    }

    let grid02 = {
        name: 'grid02',
        columns: [
            { field: 'cu', caption: 'NO', size: '50px', sortable: true, hidden: true, style: 'text-align: right'},
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, style: 'text-align: right'},
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, hidden:true},
            { field: 'fact_nm', caption: '공장명', size: '100px', sortable: true},
            { field: 'out_no', caption: '출고번호', size: '100px', sortable: true, hidden: false},
            { field: 'out_dt', caption: '출고일자', size: '100px', sortable: true},
            { field: 'out_gbn', caption: '출고구분', size: '100px', sortable: true, hidden: true},
            { field: 'rec_ymd', caption: '수불일자', size: '100px', sortable: true, hidden: true},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '100px', sortable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '100px', sortable: true},
            { field: 'spec', caption: '규격', size: '100px', sortable: true},
            { field: 'lotno', caption: 'LOTNO', size: '100px', sortable: true, hidden: true},
            { field: 'biz_cd', caption: '출고처코드', size: '150px', sortable: true, resizable: true , hidden: true},
            { field: 'biz_nm', caption: '출고처', size: '150px', sortable: true, resizable: true, hidden: false },
            { field: 'ship_cd', caption: '출고처현장코드', size: '150px', sortable: true, resizable: true , hidden: true},
            { field: 'ship_nm', caption: '출고처현장', size: '150px', sortable: true, resizable: true, hidden: false },
            { field: 'out_whs_cd', caption: '출고창고코드 - 원자재창고로 고정', size: '100px', sortable: true, hidden:true},
            { field: 'whs_nm', caption: '출고창고명', size: '100px', sortable: true},
            { field: 'out_loc_cd', caption: '출고창고위치코드', size: '100px', sortable: true, hidden:true},
            { field: 'loc_nm', caption: '출고창고위치명', size: '100px', sortable: true},
            { field: 'stck_qty', caption: '현재재고', size: '100px', sortable: true, style: 'text-align: right'},
            { field: 'out_qty', caption: '출고수량', size: '100px', sortable: true, style: 'text-align: right', editable: { type: 'text'}},
            { field: 'out_unit', caption: '출고단위코드', size: '100px', sortable: true, hidden:true},
            { field: 'unit_nm', caption: '출고단위', size: '100px', sortable: true},
            { field: 'updt_id', caption: '입력자', size: '100px', sortable: true},
            { field: 'updt_dt', caption: '입력일시', size: '100px', sortable: true}
        ],
        fncPostSavePage : function (data){
            console.log(data);
        }
    }

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);
    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);
    let pop_whs_cd = new Pop_whs_cd(pageManager, search_frm_id);
    let pop_loc_cd = new Pop_loc_cd(pageManager, search_frm_id);
    let pop_ship_cd = new Pop_ship_cd(pageManager, search_frm_id);

    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_whs_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_loc_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);
//     pop_ship_cd.AddParentReferFormTag(["cmpny_cd","biz_cd","biz_nm"], ["cmpny_cd","biz_cd","biz_nm"]);

    pop_prt_nbr_cd.AddTargetColumnsOnPopupClose(["prt_nbr_cd","prt_nbr_nm","spec"], ["prt_nbr_cd","prt_nbr_nm","spec"]);
    pop_whs_cd.AddTargetColumnsOnPopupClose(["whs_cd","whs_nm"], ["out_whs_cd","whs_nm"]);
    pop_loc_cd.AddTargetColumnsOnPopupClose(["loc_cd","loc_nm"],["out_loc_cd","loc_nm"]);


    grid01 = pageManager.gridManager.AddGrid(grid01);

    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");

    //PK, 필수입력, Readonly 필드 등록
    // pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "out_no"]);
    // pageManager.gridManager.SetReadonlyFields(grid01.name,  ["prt_nbr_dsp_nm"]);
    // pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["out_whs_cd","out_loc_cd"]);

    //버튼에 대한 Ajax 경로
    // pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/material/output/get/mtrl_output_mgt");
    // pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/material/output/delete/mtrl_output_mgt");
    // pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/material/output/save/mtrl_output_mgt");

    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");



    grid02 = pageManager.gridManager.AddGrid(grid02);

    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid02.name, "chk");

    //PK, 필수입력, Readonly 필드 등록
//     pageManager.gridManager.SetPkFields(grid02.name,  ["out_qty"]);
    // pageManager.gridManager.SetReadonlyFields(grid02.name,  ["prt_nbr_dsp_nm"]);
    pageManager.gridManager.SetCompulsoryFields(grid02.name,  ["out_qty"]);

    //버튼에 대한 Ajax 경로
    // pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.Search, "/ajax/material/output/get/mtrl_output_mgt");
    // pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.DeleteRow, "/ajax/material/output/delete/mtrl_output_mgt");
    pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.SavePage, "/ajax/material/output/save/mtrl_output_mgt");

    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //팝업등록
    // pageManager.gridManager.AddPopUpOption(grid02.name,"out_whs_cd", pop_whs_cd.PopupName);
    pageManager.gridManager.AddPopUpOption(grid02.name,"out_loc_cd", pop_loc_cd.PopupName);


    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //폼 팝업 등록
    let caller_name = "btn_pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);
    
    let caller_name4 = 'pop_ship_cd';
    let target_name4 = ['ship_cd', "ship_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name4, pop_ship_cd.ShowFormDialog, target_name4);

    //버튼함수와 연결...
    pageManager.BindButtonFunction([Const.MesButton.Search, Const.MesButton.AddRow, Const.MesButton.SavePage, Const.MesButton.DeleteRow]);


    //그리드 초기화...
    pageManager.InitializeComponent();

    //div에 클릭펑션 먹인거...
    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});

    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;

    $("#hBtnB0001").on("click", function (){
        $(".loadingW").css("display", "");
        let param = FormHelper.SerializeForm("search_frm");
        if(w2ui.grid01.lastGetParam !== undefined){
            w2ui.grid01.lastGetParam.param = param;
        }
        param = ScriptHelper.AjaxArgumentBuild(param, this.id, location.pathname);
        let rest_url = "/ajax/material/output/get/mtrl_output_mgt_wp";
        $.ajax({
            url : rest_url,
            type : "get",
            data : param,
            dataType : "json",
            success: function (data){
                $(".loadingW").css("display", "none");
                if (data.result){
                    let grid01 = data.data.grid01;
//                     let grid02 = data.data.grid02;
                    W2UiHelper.AddRecID(data.data.grid01);
//                     W2UiHelper.AddRecID(data.data.grid02);
                    w2ui.grid01.records = grid01;
//                     w2ui.grid02.records = grid02;
                    w2ui.grid01.refresh();
//                     w2ui.grid02.refresh();
                    if(w2ui.grid01.records.length > 0){
                        $("#grid_grid01_rec_1").click();
                        console.log("break");
                    }
                    common.success_msg(data.msg);
                }else{
                    common.mes_alert(data);
                }
            },
            error: function (request,status,error) {
                $(".loadingW").css("display", "none");
                console.log(request);
                console.log(status);
                console.log(error);
            }
        });
        

    });

    $("#hBtnB0003").on("click", function(){
        let lcr = {};
        lcr = ScriptHelper.CloneObject(common.get_last_clicked_row().grid01);
        if(Object.keys(lcr).length === 0) {
            mes_alert({msg: "첫번째 그리드에 클릭된 항목이 없습니다."});
            return false;
        }else{

//             lcr.out_qty = lcr.stck_qty;
            lcr.out_qty = 0;
            lcr.out_unit = lcr.stck_unit;
            lcr.unit_nm = lcr.unit_nm;
            lcr.updt_id = '';
            lcr.updt_dt = '';
            lcr.whs_nm = '';
            lcr.loc_nm = '';
            lcr.cu = 'c';
//             lcr.out_whs_cd = document.search_frm.whs_cd.value;
//             lcr.whs_nm = document.search_frm.whs_nm.value;
            lcr.out_dt = common.getTimeStamp();
            w2ui.grid02.add(ScriptHelper.CloneObject(lcr));
            w2ui.grid02.records[w2ui.grid02.records.length - 1].recid = w2ui.grid02.records.length;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].w2ui = {};
            w2ui.grid02.records[w2ui.grid02.records.length - 1].w2ui.changes = {};
            w2ui.grid02.records[w2ui.grid02.records.length - 1].w2ui.changes.out_qty = 0;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].out_whs_cd = w2ui.grid01.records[w2ui.grid01.last.click_recid-1].stck_whs_cd;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].whs_nm = w2ui.grid01.records[w2ui.grid01.last.click_recid-1].whs_nm;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].out_loc_cd = w2ui.grid01.records[w2ui.grid01.last.click_recid-1].stck_loc_cd;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].loc_nm = w2ui.grid01.records[w2ui.grid01.last.click_recid-1].loc_nm;
//             w2ui.grid02.records[w2ui.grid02.records.length - 1].w2ui.changes.out_qty = w2ui.grid01.records[w2ui.grid01.last.click_recid-1].stck_qty;
            w2ui.grid02.refresh();
//             w2ui.grid02.records[w2ui.grid02.records.length - 1].w2ui.changes.out_whs_cd = w2ui.grid01.records[w2ui.grid01.last.click_recid-1].stck_whs_cd;
//             w2ui.grid02.records[w2ui.grid02.records.length - 1].w2ui.changes.whs_nm = w2ui.grid01.records[w2ui.grid01.last.click_recid-1].whs_nm;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].w2ui.changes.out_whs_cd = document.search_frm.whs_cd.value;
            
//             w2ui.grid02.add({recid:w2ui.grid02.records.length, cu: "C"});
            
        }
    });
    $("#hBtnB0004").off("click");
    $("#hBtnB0004").on("click", function(){
        // chk = true 가 있는지 체크
        let rec = w2ui.grid02.records;
        let flag = false;
        let del_list = [];
        for(let item of rec){
            if(item.w2ui !== undefined){
                if(item.w2ui.changes.chk === true) {
                    del_list.push(item);
                    flag = true;
                }
            }
        }

        // chk = true 가 있으면 confirm
        if(flag){
            w2confirm(Const.MesMsg.confirm)
            .yes(() => {
                $(".loadingW").css("display", "");
                let ajax_url = "/ajax/material/output/delete/mtrl_output_mgt";
                let param = ScriptHelper.AjaxArgumentBuild(del_list, "hBtnB0004", ajax_url);
                $.ajax({
                    url: ajax_url,
                    type: "post",
                    data: param,
                    dataType: "json",
                    success: function(data){
                        let param = w2ui.grid01.lastGetParam;
                        let rest_url = "/ajax/material/output/get/mtrl_output_mgt";
                        common.success_msg(data.msg);
                        $.ajax({
                            url : rest_url,
                            type : "get",
                            data : param,
                            dataType : "json",
                            success: function (data){
                                $(".loadingW").css("display", "none");
                                if (data.result){
                                    let grid01_last_clicked_recid = w2ui.grid01.last.click_recid;
                                    let grid01_last_clicked_row = w2ui.grid01.records[w2ui.grid01.last.click_recid - 1];
                                    document.search_frm.prt_nbr_cd.value = grid01_last_clicked_row.prt_nbr_cd;
                                    document.search_frm.prt_nbr_nm.value = grid01_last_clicked_row.prt_nbr_nm;
                                    let grid01 = data.data.grid01;
                                    W2UiHelper.AddRecID(data.data.grid01);
                                    w2ui.grid01.records = grid01;
                                    w2ui.grid01.refresh();
                                    if(w2ui.grid01.records.length > 0){
                                        $("#grid_grid01_rec_"+grid01_last_clicked_recid).click();
                                    }
                                    return false;
                                }else{
                                    common.mes_alert(data);
                                }
                            },
                            error: function (request,status,error) {
                                $(".loadingW").css("display", "none");
                                console.log(request);
                                console.log(status);
                                console.log(error);
                            }
                        });
                    },
                    error: function (request,status,error) {
                        $(".loadingW").css("display", "none");
                        console.log(request);
                        console.log(status);
                        console.log(error);
                    }
                });
            })
            .no(() => {
                return false;
            });
        }
        
        // confirm = true 면 grid02 넘기기
    });
})
