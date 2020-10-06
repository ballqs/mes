import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_biz_cd from "/include/js/popups/pop_biz_cd.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";
import Pop_ship_cd from "/include/js/popups/pop_ship_cd.js";

/**
 * TODO : 승인 나면 삭제 저장 추가 안됨, 출고처 팝업은 거래처가 선택되어야만 팝업이 뜬다(거래처를 가지고 출고처에 넣어준다)
  ship_mgt 에서 관리 하는 항목이 아니면 출고처 현장, 현장명은 관리여부가 아니다. 공통코드 참조

 */
$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center',editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'fact_nm', caption: '공장명', size: '100px', sortable: true, resizable: true, hidden: false },
            { field: 'po_no', caption: '발주번호', size: '150px', sortable: true, resizable: true},
            { field: 'in_biz_cd', caption: '발주처코드', size: '100px', sortable: true, resizable: true, hidden: false, editable: {type: 'text'}},
            { field: 'biz_nm', caption: '발주처명', size: '150px', sortable: true, resizable: true,editable: {type: 'text'}},
            { field: 'out_biz_cd', caption: '출고처코드', size: '100px', sortable: true, resizable: true, hidden: false, editable: {type: 'text'}},
            { field: 'out_biz_nm', caption: '출고처명', size: '150px', sortable: true, resizable: true, editable: {type: 'text'}},
            { field: 'out_ship_cd', caption: '출고처현장(popup)', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}},
            { field: 'out_ship_nm', caption: '출고처현장명', size: '150px', sortable: true, resizable: true, editable: {type: 'text'}},
            { field: 'po_ymd', caption: '발주일자', size: '100px', sortable: true, resizable: true },
            { field: 'po_sum', caption: '발주수량합계', size: '100px', sortable: true, resizable: true, render: 'number'},
        ],
        rowOnClickConfig : {
            [Const.config.rowOnClickConfig.funcType] : [Const.config.rowOnClickConfig.funcOption.detail],
            [Const.config.rowOnClickConfig.clickTargetGrid] : ["grid02"],
            [Const.config.rowOnClickConfig.clickWhereFieldList] : ["fact_cd", "po_no"],
            [Const.config.rowOnClickConfig.url] : "/ajax/material/purchase/get/prchs_mgt"
        },
        lastGetParam : {
            param : {},
        },
        customConfig : {
            [Const.config.customConfig.maxAddRow] : 1,
        },
        addFunction : {

        },
        fncPrePopupOff : function(grid_id,row,col){
            // console.log(this);
            //console.log(grid_id);
            //console.log(row);
            //console.log(col);
            let data = w2ui[this.name].records[row];
            if(w2ui[grid_id].columns[col]["field"] == "out_biz_cd"){
                if(data.in_biz_cd == '' || data.in_biz_cd == undefined || data.biz_nm == '' || data.biz_nm == undefined){
                    if(data.w2ui === undefined || data.w2ui.changes.in_biz_cd == '' || data.w2ui.changes.in_biz_cd == undefined || data.w2ui.changes.biz_nm == '' || data.w2ui.changes.biz_nm == undefined ){   // changes 체크
                        $(".loadingW").css("display", "none");
                        mes_alert({msg:"발주처코드 또는 발주처명이 입력되어 있지 않습니다."},{msg:"입력 후 시도해주세요!"});
                        return {result : false};
                    }
                }
            }
            return {result : true};
        },
        fncPostSearch : function(obj){
            // console.log(obj);
        },
        fncPostSavePage : function(data){
            //$("#search_frm input[name='po_no']").val(data.data.crtseq);
            console.log("data", data);
            let btn_id = Const.MesButton.Search;
            let param = this.lastGetParam.param;

            let rest_url = pageManager.gridManager.GetAjaxUrl(this.name,btn_id);
            let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);
            ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
                .then((res)=>{
                    $(".loadingW").css("display", "none");
                    console.log(res);
                    let record_data = res.data;
                    //CheckBox의 설정값을 가져옴 Y는 true / N은 false
                    let check_info_obj = pageManager.gridManager.GridList[this.name].CheckBoxConfigList;
                    //받아온 데이터에 RecID를 붙힘
                    W2UiHelper.AddRecID(record_data);
                    W2UiHelper.CheckBoxDataConvertToGridFormat(record_data, check_info_obj);
                    w2ui[this.name].records = undefined;
                    w2ui[this.name].records = record_data;
                    w2ui[this.name].reload(true);
                    let n = w2ui[this.name].last.click_recid;
                    let search_id = "#grid_"+this.name+"_rec_"+n;
                    $(search_id).click();
                    //w2ui[this.name].records[0].click();
                })
                .fail(ScriptHelper.OnAjaxFail);

            //w2ui[this.name].records[0].click();
        }
    }

    /*
    * TODO : 품번명 POPUP 조건 물어보고 붙히기
    * 품번 입력시 발주 단위 코드를 readonly 자동으로 가져오기
    */
    let grid02 = {
        name: 'grid02',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장코드', size: '150px', sortable: true, resizable: true, hidden: true },
            { field: 'po_no', caption: '발주번호', size: '70px', sortable: true, resizable: true, hidden: true },
            { field: 'po_seq', caption: '발주순번', size: '100px', sortable: true, resizable: true, style: 'text-align: right;'},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '100px', sortable: true, resizable: true, editable: { type: 'text'}},
            { field: 'prt_nbr_nm', caption: '품번명', size: '150px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true, editable: { type: 'text'}},
            { field: 'po_qty', caption: '발주수량', size: '100px', sortable: true, resizable: true, editable: { type: 'text'}},
            { field: 'po_unit', caption: '발주단위', size: '100px', sortable: true, resizable: true, hidden:true},
            { field: 'base_unit_nm', caption: '발주단위', size: '100px', sortable: true, resizable: true},
            { field: 'po_no', caption: '발주번호', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'pln_in_ymd', caption: '입고예정일', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'date' }},
            { field: 'po_staus_cd', caption: '발주상태', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'apval_yn', caption: '승인여부', size: '100px', sortable: true, resizable: true},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text'}},
            { field: 'updt_id', caption: '입력자 ID', size: '100px', sortable: true, resizable: true },
            { field: 'updt_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
        fncPreSavePage : function(){
            for(let item of w2ui[this.name].records){
                if(item.apval_yn == 'Y' || item.apval_yn == 'true'){
                    $(".loadingW").css("display", "none");
                    mes_alert({msg:"이미 승인된 발주입니다."});
                    return {result : false};
                }
            }
            return {result : true};
        },
        fncPreDelete : function(){
            for(let item of w2ui[this.name].records){
                if(item.apval_yn == 'Y' || item.apval_yn == 'true'){
                    $(".loadingW").css("display", "none");
                    mes_alert({msg:"이미 승인된 발주입니다."});
                    return {result : false};
                }
            }
            return {result : true};
        },
        fncPreAdd : function(){
            for(let item of w2ui[this.name].records){
                if(item.apval_yn == 'Y' || item.apval_yn == 'true'){
                    $(".loadingW").css("display", "none");
                    mes_alert({msg:"이미 승인된 발주입니다."});
                    return {result : false};
                }
            }
            return {result : true};
        },
        
    }

    W2UiHelper.CheckBoxInputRenderFunc(grid02,["apval_yn"]);

    let search_frm_id = "search_frm";
    let bnt_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, bnt_frm_id);

    let pop_biz_cd = new Pop_biz_cd(pageManager, search_frm_id);
    pop_biz_cd.AddParentReferFormTag(["cmpny_cd"], ["cmpny_cd"]);
    pop_biz_cd.AddParentReferGridTag(["cmpny_cd"], ["cmpny_cd"]);
    pop_biz_cd.AddTargetColumnsOnPopupClose(["biz_cd", "biz_nm"], ["in_biz_cd", "biz_nm"]);
    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddTargetColumnsOnPopupClose(["prt_nbr_cd","prt_nbr_nm","spec", "base_unit_nm", "base_unit"], ["prt_nbr_cd","prt_nbr_nm","spec", "base_unit_nm", "po_unit"]);
    let pop_ship_cd = new Pop_ship_cd(pageManager, search_frm_id);
    pop_ship_cd.AddParentReferFormTag(["cmpny_cd"], ["cmpny_cd"]);
    pop_ship_cd.AddParentReferGridTag(["cmpny_cd","biz_cd","biz_nm"], ["cmpny_cd","in_biz_cd","biz_nm"]);
    pop_ship_cd.AddTargetColumnsOnPopupClose(["biz_cd", "biz_nm", "ship_cd", "ship_nm"], ["out_biz_cd", "out_biz_nm", "out_ship_cd", "out_ship_nm"]);

    // pop_biz_cd.SetReturnField("biz_cd");
    //1번 그리드 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid01 = pageManager.gridManager.AddGrid(grid01);
    //팝업등록
    pageManager.gridManager.AddPopUpOption(grid01.name,"in_biz_cd", pop_biz_cd.PopupName);
    pageManager.gridManager.AddPopUpOption(grid01.name,"out_biz_cd", pop_ship_cd.PopupName);


    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");

    //PK, 필수입력, Readonly 필드 등록
    // pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd"]);
    pageManager.gridManager.SetReadonlyFields(grid01.name,  ["fact_nm", "prt_nbr_dsp_nm", "po_no","biz_nm"]);
    pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["in_biz_cd"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/material/purchase/get/prchs_group");
    // pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/material/purchase/delete/prchs_group");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.SavePage, "/ajax/material/purchase/save/prchs_group");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Approve, "/ajax/material/purchase/save/approve");
    
    //콤보박스 렌더 정보 등록
    // pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //체크박스 T/F 정보 등록..
//     pageManager.gridManager.AddCheckRenderOption(grid01.name,"use_yn", "Y", "N");
    // pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "whs_cd"]);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //2번 그리드 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid02 = pageManager.gridManager.AddGrid(grid02);

    //팝업등록
    pageManager.gridManager.AddPopUpOption(grid02.name,"prt_nbr_cd", pop_prt_nbr_cd.PopupName);


    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid02.name, "chk");

    //PK, 필수입력, Readonly 필드 등록
    pageManager.gridManager.SetPkFields(grid02.name,  ["po_seq"]);
    // pageManager.gridManager.SetPkFields(grid02.name,  ["po_seq"]);
    pageManager.gridManager.SetReadonlyFields(grid02.name,  ["po_seq","po_staus_cd", "apval_yn"]);
    // pageManager.gridManager.SetCompulsoryFields(grid02.name,  ["po_ymd", "po_in_qty"]);

    //버튼에 대한 Ajax 경로
    // pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.Search, "/ajax/material/purchase/get/prchs_mgt");
    // pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.DeleteRow, "/ajax/material/purchase/delete/prchs_mgt");
    // pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.Save, "/ajax/material/purchase/save/prchs_mgt");
    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"po_staus_cd", common.code, {up_cd: "po_staus_cd"}, "cd", "cd_nm");
    //po_unit
    // pageManager.gridManager.AddSelectBoxInfo(grid02.name,"po_unit", common.code, {up_cd: "po_unit"}, "cd", "cd_nm");

    //체크박스 T/F 정보 등록..
    pageManager.gridManager.AddCheckRenderOption(grid02.name,"apval_yn", "Y", "N");

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //폼 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","cmpny_cd", common.code, {up_cd: "cmpny_cd"}, "cd", "cd_nm");
    // pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","account_type", common.code, {up_cd: "account_type", cd_set1: ['PO', 'PX']}, "cd", "cd_nm", "", "전체");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","account_type", common.code, {up_cd: "account_type", cd_set1: ['PO', 'PX']}, "cd", "cd_nm", "", "전체");
    //폼 팝업 등록
    let caller_name = "pop_biz_cd";
    let target_name = ["biz_cd", "biz_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_biz_cd.ShowFormDialog, target_name);

    caller_name = "pop_prt_nbr_cd";
    target_name = ["prt_nbr_cd", "prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);

    //그리드 초기화..
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //버튼함수와 연결...
    pageManager.BindButtonFunction([Const.MesButton.SavePage, Const.MesButton.DeleteRow]);

    //그리드 초기화...
    pageManager.InitializeComponent();

    // $("#hbtn_frm [name='hBtnB0004']").off("click");
    $("#hbtn_frm [name='hBtnB0004']").on("click", function(){
        $(".loadingW").css("display", "");

        if(w2ui["grid02"].hasOwnProperty("fncPreDelete") && typeof w2ui["grid02"].fncPreDelete == "function"){
            if(!w2ui["grid02"].fncPreDelete("grid02").result){
                return false;
            };
        }

        let get_chks = function(){

            let grids   = document.getElementsByClassName('grids'),
                grid_id = '',
                param   = {},
                r_data = {},
                changes;

            for(let i=0; i<grids.length; i++){
                grid_id = grids[i].id;

                if(w2ui[grid_id].getChanges().length){
                    param[grid_id] = [];
                    r_data[grid_id] = [];
                    // for돌려서 chk true 면
                    changes = w2ui[grid_id].getChanges();
                    for(let item of changes){
                        if(item.chk){
                            param[grid_id].push(w2ui[grid_id].records[item.recid - 1]);
                        }
                    }

                    for(let j=0; j<w2ui[grid_id].records.length; j++){
                        if(w2ui[grid_id].records[j].w2ui !== undefined){
                            if(w2ui[grid_id].records[j].w2ui.changes.chk === false){
                                r_data[grid_id].push(w2ui[grid_id].records[j]);
                            }
                        }else{
                            r_data[grid_id].push(w2ui[grid_id].records[j]);
                        }
                    }
                }
            }

            console.log(r_data);

            let last_click = w2ui['grid01'].last.click_recid - 1;
            let lc_records = w2ui['grid01'].records[last_click];
            let grid02_change_length = w2ui['grid02'].getChanges().length;
            let grid02_length = w2ui['grid02'].records.length;

            if(grid02_change_length === grid02_length){
                r_data['grid01'].splice(r_data['grid01'].indexOf(lc_records),1);
            }

            console.log(r_data);

            console.log(param);

            let ajax_args = {
                param: param, 
                cnct_btn: Const.MesButton.DeleteRow, 
                cnct_url: location.pathname
                };
            // ajax 던지기
            $.ajax({
                url: "/ajax/material/purchase/delete/prchs",
                type: "post",
                data: ajax_args,
                dataType: "json",
                success: function(data){
                    console.log(data);

                    //grid1 refresh();
                    //grid2 refresh();
                    for(let i=0; i<grids.length; i++) {
                        grid_id = grids[i].id;
                        w2ui[grid_id].clear();
                        if(r_data[grid_id] !== undefined){
                            W2UiHelper.AddRecID(r_data[grid_id]);
                            w2ui[grid_id].records = r_data[grid_id];
                        }
                    }
                    //조건부 grid2 refresh();
                    if(lc_records.w2ui !== undefined) {
                        if (lc_records.w2ui.changes.chk == true && lc_records.w2ui.changes.recid == last_click) {
                            //비워버리기
                            w2ui['grid02'].records = undefined;
                        }
                    }
                    for(let i=0; i<grids.length; i++) {
                        grid_id = grids[i].id;
                        w2ui[grid_id].reload(true);
                    }
                    $(".loadingW").css("display", "none");
                    common.success_msg(data.msg);
                },
                error: function(a,b,c){
                    $(".loadingW").css("display", "none");
                    console.log("a", a);
                    console.log("b", b);
                    console.log("c", c);
                }
            });
        }
        get_chks();
    });

    pageManager.gridManager.SetClickTargetGrid("grid01", "grid02");
    pageManager.gridManager.SetClickWhereFieldList("grid01", ["fact_cd", "po_no"]);
    grid01.onClick = W2UiHelper.RowOnClick;

    $("#grid01").on(Const.HtmlEvent.click, function(){
        Const.SelectedGridID = grid01.name;
    });
    $("#grid02").on(Const.HtmlEvent.click, function(){
        Const.SelectedGridID = grid02.name;
    });
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;

    $("#hBtnB0003").on("click", function(){
        if($("#selected_grid").val() == "grid01"){
            let fact_cd = $("#search_frm select[name='fact_cd']").val();
            let fact_nm = $("#search_frm select[name='fact_cd'] option:selected").text();
            for (let item in w2ui.grid01.records){
                if (w2ui.grid01.records[item].hasOwnProperty("cu") && w2ui.grid01.records[item].cu.toUpperCase() == "C"){
                    w2ui.grid01.records[item].w2ui = {};
                    w2ui.grid01.records[item].w2ui.changes = {};
                    w2ui.grid01.records[item].w2ui.changes.fact_cd = fact_cd;
                    w2ui.grid01.records[item].w2ui.changes.fact_nm = fact_nm;
                    w2ui.grid01.records[item].w2ui.changes.po_ymd = common.getTimeStamp();
                    w2ui.grid01.refresh();
                    break;
                }
            }
        }
    });

    $("#hBtnB0001").on("click", function(){
        w2ui.grid02.records = [];
        w2ui.grid02.refresh();
    });
});
