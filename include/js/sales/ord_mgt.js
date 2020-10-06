import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_biz_cd from "/include/js/popups/pop_biz_cd.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";
import Pop_ship_cd from "/include/js/popups/pop_ship_cd.js";

$(function () {

    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true},
            //{ field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center',editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true},
            { field: 'ordr_no', caption: '수주번호', size: '150px', sortable: true, resizable: true},
            { field: 'biz_cd', caption: '거래처코드', size: '100px', sortable: true, resizable: true},
            { field: 'biz_nm', caption: '거래처명', size: '150px', sortable: true, resizable: true},
            { field: 'ship_cd', caption: '출고처현장코드', size: '100px', sortable: true, resizable: true},
            { field: 'ship_nm', caption: '출고처현장명', size: '150px', sortable: true, resizable: true},
            { field: 'ord_dt', caption: '수주일자', size: '100px', sortable: true, resizable: true ,style: 'text-align: center', editable: { type: 'date' }},
            { field: 'ship_ordr_qty_sum', caption: '수주수량합계', size: '100px', sortable: true, resizable: true, render: 'number'},
        ],
        rowOnClickConfig : {
            [Const.config.rowOnClickConfig.funcType] : [Const.config.rowOnClickConfig.funcOption.detail],
            [Const.config.rowOnClickConfig.clickTargetGrid] : ["grid02"],
            [Const.config.rowOnClickConfig.clickWhereFieldList] : ["fact_cd", "ordr_no"],
            [Const.config.rowOnClickConfig.url] : "/ajax/sales/get/ord_mgt_rowOnclick"
        },
        lastGetParam : {
            param : {},
        },
        customConfig : {
            [Const.config.customConfig.maxAddRow] : 1,
        },
        fncPostSearch : function(obj){
            let search_id = "#grid_"+this.name+"_rec_1";
            $(search_id).click();
        },
        fncPostSavePage : function (data) {
            console.log("grid01 : ",data);
            $("#search_frm [name='ordr_no']").val(data.param[0][0]['ordr_no']);

            let btn_id = Const.MesButton.Search;
            let param = this.lastGetParam.param;
            param['like']['ordr_no'] = [$("#search_frm [name='ordr_no']").val(),'both'];

            let rest_url = pageManager.gridManager.GetAjaxUrl(this.name,btn_id);
            let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);
            ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
                .then((res)=>{
                    console.log(res);
                    let record_data = res.data;
                    //CheckBox의 설정값을 가져옴 Y는 true / N은 false
                    let check_info_obj = pageManager.gridManager.GridList[this.name].CheckBoxConfigList;
                    //받아온 데이터에 RecID를 붙힘
                    W2UiHelper.AddRecID(record_data);
                    W2UiHelper.CheckBoxDataConvertToGridFormat(record_data, check_info_obj);
                    w2ui[this.name].clear();
                    w2ui[this.name].records = record_data;
                    w2ui[this.name].reload(true);
                    let search_id = "#grid_"+this.name+"_rec_1";
                    $(search_id).click();
                    //w2ui[this.name].records[0].click();
                })
                .fail(ScriptHelper.OnAjaxFail);
        }
    };

    let grid02 = {
        name: 'grid02',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true},
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'ordr_no', caption: '수주번호', size: '70px', sortable: true, resizable: true, hidden: true},
            { field: 'seq', caption: '수주순번', size: '100px', sortable: true, resizable: true, style: 'text-align: right;'},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '120px', sortable: true, resizable: true, editable: { type: 'text'}},
            { field: 'prt_nbr_nm', caption: '품번명', size: '120px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true},
            { field: 'ship_ordr_qty', caption: '수주수량', size: '100px', sortable: true, resizable: true, editable: { type: 'int'}, style: 'text-align: right;'},
            { field: 'ordr_unit', caption: '수주단위', size: '100px', sortable: true, resizable: true, hidden:true},
            { field: 'unit_nm', caption: '수주단위', size: '100px', sortable: true, resizable: true},
            { field: 'ship_pln_dt', caption: '납기예정일자', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'date' }},
            { field: 'ordr_staus_cd', caption: '수주상태코드', size: '100px', sortable: true, resizable: true, editable: { type: 'select'},style: 'text-align: center;'},
            { field: 'ship_qty', caption: '출하수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right;'},
            { field: 'rls_qty', caption: '출고수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right;'},
            { field: 'apval_yn', caption: '승인여부', size: '100px', sortable: true, resizable: true , style: 'text-align: center;' , editable: { type: 'checkbox' }},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text'}},
            { field: 'updt_id', caption: '입력자 ID', size: '100px', sortable: true, resizable: true },
            { field: 'updt_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
        fncSeletedGridID : function () {
            Const.SelectedGridID = grid01.name;
        },
        fncPreAdd : function () {
            let grid1_last_click = w2ui[grid01.name].last.click_recid;
            if(grid1_last_click === undefined){
                mes_alert({msg:"첫번째 그리드에 어떠한 열도 선택되어 있지 않습니다."},{msg:"선택 후 시도해주세요!"});
                return {result : false};
            };
            for(let item of w2ui[this.name].records){
                if(item.apval_yn == 'Y' || item.apval_yn == true){
                    $(".loadingW").css("display", "none");
                    mes_alert({msg:"이미 승인된 수주입니다."},{msg: ""});
                    return {result : false};
                };
            };
            return {result : true};
        },
        fncPreSavePage : function () {
            for(let item of w2ui[this.name].records){
                if(item.apval_yn == 'Y' || item.apval_yn == true){
                    $(".loadingW").css("display", "none");
                    mes_alert({msg:"이미 승인된 수주입니다."},{msg: ""});
                    return {result : false};
                }
            }

            let getChange = w2ui[this.name].getChanges();

            let now = new Date();
            let y = now.getFullYear();
            let m = now.getMonth()+1 < 10 ? '0'+(now.getMonth()+1) : now.getMonth()+1;
            let d = now.getDate() < 10 ? '0'+now.getDate() : now.getDate();

            let nowYMD = y+'-'+m+'-'+d;

            for(let item of getChange){
                if(item['ship_ordr_qty'] <= 0){
                    $(".loadingW").css("display", "none");
                    mes_alert({msg:"수주수량은 0 또는 0 이하로 저장할수없습니다."},{msg : ''});
                    return {result : false};
                }
                if(item['ship_pln_dt'] < nowYMD){
                    $(".loadingW").css("display", "none");
                    mes_alert({msg:"납기예정일자는 현재보다 같거나 미래여야 합니다."},{msg : ''});
                    return {result : false};
                }
            }
            return {result : true};
        },
        fncPreDelete : function(){
            for(let item of w2ui[this.name].records){
                if(item.apval_yn == 'Y' || item.apval_yn == true){
                    $(".loadingW").css("display", "none");
                    mes_alert({msg:"이미 승인된 수주입니다."},{msg: ""});
                    return {result : false};
                }
            }
            return {result : true};
        },
        fncPreApprove : function (param) {
            console.log(param);
            $("#search_frm [name='ordr_no']").val(param[0]['ordr_no']);
            return {result : true};
        }
    };


    W2UiHelper.CheckBoxInputRenderFunc(grid02,["apval_yn"]);

    let search_frm_id = "search_frm";
    let bnt_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, bnt_frm_id);

    let pop_biz_cd = new Pop_biz_cd(pageManager, search_frm_id);
    pop_biz_cd.AddParentReferFormTag(["cmpny_cd"], ["cmpny_cd"]);
    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id, "pop_prt_nbr_cd" , {cd : [31]});
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddTargetColumnsOnPopupClose(["prt_nbr_cd","prt_nbr_nm","spec", "base_unit_nm", "base_unit"], ["prt_nbr_cd","prt_nbr_nm","spec", "unit_nm", "ordr_unit"]);
    let pop_ship_cd = new Pop_ship_cd(pageManager, search_frm_id);
    pop_ship_cd.AddParentReferFormTag(["cmpny_cd"], ["cmpny_cd"]);
    pop_ship_cd.AddParentReferGridTag(["cmpny_cd"], ["cmpny_cd"]);
    pop_ship_cd.AddTargetColumnsOnPopupClose(["biz_cd", "biz_nm", "ship_cd", "ship_nm"], ["biz_cd", "biz_nm", "ship_cd", "ship_nm"]);

    grid01 = pageManager.gridManager.AddGrid(grid01);

    pageManager.gridManager.AddPopUpOption(grid01.name,"ship_cd", pop_ship_cd.PopupName);

    pageManager.gridManager.SetPkFields(grid01.name,["fact_cd","ordr_no"]);
    pageManager.gridManager.SetReadonlyFields(grid01.name,  ["ordr_no","biz_nm", "ship_nm"]);
    pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["ord_dt", "biz_cd", "ship_cd"]);

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/sales/get/ord_mgt");
    // pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/material/purchase/delete/prchs_group");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.SavePage, "/ajax/sales/save/ord_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Approve, "/ajax/sales/approve/ord_mgt");

    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    grid02 = pageManager.gridManager.AddGrid(grid02);

    pageManager.gridManager.AddPopUpOption(grid02.name,"prt_nbr_cd", pop_prt_nbr_cd.PopupName);

    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid02.name, "chk");

    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"ordr_staus_cd", common.code, {up_cd: "ordr_staus_cd"}, "cd", "cd_nm");


    pageManager.gridManager.SetPkFields(grid02.name,["seq"]);
    pageManager.gridManager.SetReadonlyFields(grid02.name,  ["seq", "prt_nbr_nm", "spec"]);
    pageManager.gridManager.SetCompulsoryFields(grid02.name,  ["prt_nbr_cd","ship_ordr_qty","ship_pln_dt"]);

    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","cmpny_cd", common.code, {up_cd: "cmpny_cd"}, "cd", "cd_nm");
    // pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","account_type", common.code, {up_cd: "account_type", cd_set1: ['PO', 'PX']}, "cd", "cd_nm", "", "전체");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","account_type", common.code, {up_cd: "account_type", cd: [31]}, "cd", "cd_nm");

    let caller_name = "pop_biz_cd";
    let target_name = ["biz_cd", "biz_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_biz_cd.ShowFormDialog, target_name);

        caller_name = "pop_prt_nbr_cd";
        target_name = ["prt_nbr_cd", "prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);


    pageManager.BindButtonFunction([Const.MesButton.SavePage, Const.MesButton.DeleteRow]);

    //그리드 초기화...
    pageManager.InitializeComponent();

    grid01.onClick = W2UiHelper.RowOnClick;

    $("#grid01").on(Const.HtmlEvent.click, function(){
        Const.SelectedGridID = grid01.name;
    });
    $("#grid02").on(Const.HtmlEvent.click, function(){
        Const.SelectedGridID = grid02.name;
    });
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;

    $("#hbtn_frm [name='hBtnB0004']").on("click", function(){
        let message = '정말로 삭제하시겠습니까?';
        w2confirm(message)
            .yes(() => {
                //$(".loadingW").css("display", "");

                if (w2ui["grid02"].hasOwnProperty("fncPreDelete") && typeof w2ui["grid02"].fncPreDelete == "function") {
                    if (!w2ui["grid02"].fncPreDelete("grid02").result) {
                        return false;
                    }
                    ;
                }

                let get_chks = function () {

                    let grid_id = 'grid02';
                    let changes;
                    let param = [];

                    // for돌려서 chk true 면
                    changes = w2ui[grid_id].getChanges();
                    for (let item of changes) {
                        if (item.chk) {
                            param.push(w2ui[grid_id].records[item.recid - 1]);
                        }
                    }

                    console.log(param);

                    let ajax_args = {
                        param: param,
                        cnct_btn: Const.MesButton.DeleteRow,
                        cnct_url: location.pathname
                    };
                    // ajax 던지기
                    $.ajax({
                        url: "/ajax/sales/delete/ord_mgt",
                        type: "post",
                        data: ajax_args,
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            $(".loadingW").css("display", "none");
                            if(data.result){
                                pageManager.BtnFuncList.search(event, false);
                                common.success_msg(data.msg);
                            }else{
                                mes_alert({msg: data.msg},{msg: ""});
                            }
                        },
                        error: function (a, b, c) {
                            $(".loadingW").css("display", "none");
                            console.log("a", a);
                            console.log("b", b);
                            console.log("c", c);
                        }
                    });
                };
                get_chks();
            })
            .no(function(){
                return false;
            });
    });

});