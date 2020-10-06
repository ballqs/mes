import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_biz_cd from "/include/js/popups/pop_biz_cd.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";

$(function () {


    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'ordr_no', caption: '수주번호', size: '150px', sortable: true, resizable: true},
            { field: 'seq', caption: '수주순번', size: '50px', sortable: true, resizable: true, hidden: true, style: 'text-align: right'},
            { field: 'biz_cd', caption: '거래처코드', size: '100px', sortable: true, resizable: true},
            { field: 'biz_nm', caption: '거래처', size: '100px', sortable: true, resizable: true},
            { field: 'ship_cd', caption: '출고처코드', size: '100px', sortable: true, resizable: true},
            { field: 'ship_nm', caption: '출고처', size: '100px', sortable: true, resizable: true},
            { field: 'prt_nbr_cd', caption: '품번', size: '120px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '120px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true},
            { field: 'ship_pln_dt', caption: '납기예정일자', size: '100px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'ship_ordr_qty', caption: '수주수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'ordr_unit', caption: '수주단위', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'unit_nm', caption: '수주단위', size: '100px', sortable: true, resizable: true},
            { field: 'ship_qty', caption: '출하수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'residual_qty', caption: '잔량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
        ],
        rowOnClickConfig : {
            [Const.config.rowOnClickConfig.funcType] : [Const.config.rowOnClickConfig.funcOption.detail],
            [Const.config.rowOnClickConfig.clickTargetGrid] : ["grid02"],
            [Const.config.rowOnClickConfig.clickWhereFieldList] : ["fact_cd", "ordr_no", "seq", "prt_nbr_cd"],
            [Const.config.rowOnClickConfig.url] : "/ajax/sales/get/ship_mgt_rowOnclick"
        },
        lastGetParam : {
            param : {},
        },
        fncPostSearch : function (res) {
            if(res.data.length > 0){
                let search_id = "#grid_"+this.name+"_rec_1";
                $(search_id).click();
            }
        },
        fncPreAdd : function () {
            return {result : false};
        },
        fncPostRowOnClick : function () {
            Const.SelectedGridID = grid02.name;
        },
        fncPreSearch : function (param) {
            w2ui['grid02'].lastGetParam.param = param;
            return {result : true};
        }
    };

    let grid02 = {
        name: 'grid02',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center',editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'ship_no', caption: '출고번호', size: '100px', sortable: true, resizable: true },
            { field: 'biz_cd', caption: '거래처코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'biz_nm', caption: '거래처명', size: '100px', sortable: true, resizable: true },
            { field: 'ship_cd', caption: '출고처현장코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'ship_nm', caption: '출고처현장명', size: '100px', sortable: true, resizable: true },
            { field: 'prt_nbr_cd', caption: '품번', size: '120px', sortable: true, resizable: true },
            { field: 'prt_nbr_nm', caption: '품번명', size: '120px', sortable: true, resizable: true },
            { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true },
            { field: 'ship_ordr_qty', caption: '수주수량', size: '100px', sortable: true, resizable: true },
            { field: 'ship_qty', caption: '출하수량', size: '100px', sortable: true, resizable: true ,editable: { type: 'int'}},
            { field: 'ship_unit', caption: '단위코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'unit_nm', caption: '단위', size: '100px', sortable: true, resizable: true },
            { field: 'ordr_no', caption: '수주번호', size: '70px', sortable: true, resizable: true, hidden: true},
            { field: 'seq', caption: '수주순번', size: '70px', sortable: true, resizable: true, hidden: true},
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, hidden: true },
            { field: 'updt_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true },
            { field: 'updt_dt', caption: '입력일시', size: '100px', sortable: true, resizable: true },
        ],
        customConfig : {
            [Const.config.customConfig.maxAddRow] : 1,
        },
        lastGetParam : {
            param : {},
        },
        fncSeletedGridID : function () {
            Const.SelectedGridID = grid01.name;
        },
        fncPreAdd : function () {
            let grid1_last_click = w2ui[grid01.name].last.click_recid;
            if(grid1_last_click === undefined){
                mes_alert({msg:"첫번째 그리드에 어떠한 열도 선택되어 있지 않습니다."},{msg:"선택 후 시도해주세요!"});
                return {result : false};
            };
            return {result : true};
        },
        fncPostAdd : function (grid_id) {
            let last_click = w2ui["grid01"].last.click_recid-1;
            let lc_record = w2ui["grid01"].records[last_click];
            let len = w2ui[grid_id].records.length - 1;
            if(w2ui[grid_id].records[len]["w2ui"] === undefined){
                w2ui[grid_id].records[len]["w2ui"] = {};
                w2ui[grid_id].records[len]["w2ui"]["changes"] = {};
            }
            let g1_list = ["fact_cd","biz_cd","biz_nm","ship_cd","ship_nm","prt_nbr_cd","prt_nbr_nm","spec","seq","ordr_no","ordr_unit","unit_nm"];
            let g2_list = ["fact_cd","biz_cd","biz_nm","ship_cd","ship_nm","prt_nbr_cd","prt_nbr_nm","spec","seq","ordr_no","ship_unit","unit_nm"];
            for(let i = 0; i < g1_list.length; i++){
                w2ui[grid_id].records[len]["w2ui"]["changes"][g2_list[i]] = lc_record[g1_list[i]];
                //w2ui[grid_id].records[len][list[i]] = lc_record[list[i]];
            };
            w2ui[grid_id].records[len]["w2ui"]["changes"]["ship_ordr_qty"] = Number(lc_record['ship_ordr_qty']) - Number(lc_record['ship_qty']);
            w2ui[grid_id].records[len]["w2ui"]["changes"]["ship_qty"] = 0;
            w2ui[grid_id].records[len]["w2ui"]["changes"]["cu"] = 'c';
            w2ui[grid_id].refresh();
            return {result : true};
        },
    };

    let search_frm_id = "search_frm";
    let bnt_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, bnt_frm_id);

    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id, "pop_prt_nbr_cd", {cd : [31]});
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);

    let pop_biz_cd = new Pop_biz_cd(pageManager, search_frm_id);
    pop_biz_cd.AddParentReferFormTag(["cmpny_cd"], ["cmpny_cd"]);


    grid01 = pageManager.gridManager.AddGrid(grid01);

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/sales/get/ship_mgt");

    grid02 = pageManager.gridManager.AddGrid(grid02);

    pageManager.gridManager.SetSelectionCheckField(grid02.name, "chk");

    pageManager.gridManager.SetCompulsoryFields(grid02.name,  ["ship_qty"]);

    pageManager.frmManager.AddForm(search_frm_id);

    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","cmpny_cd", common.code, {up_cd: "cmpny_cd"}, "cd", "cd_nm");
    // pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","account_type", common.code, {up_cd: "account_type", cd_set1: ['PO', 'PX']}, "cd", "cd_nm", "", "전체");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","account_type", common.code, {up_cd: "account_type", cd: [31]}, "cd", "cd_nm", "", "전체");

    let caller_name = "pop_biz_cd";
    let target_name = ["biz_cd", "biz_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_biz_cd.ShowFormDialog, target_name);

    caller_name = "pop_prt_nbr_cd";
    target_name = ["prt_nbr_cd", "prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);

    pageManager.BindButtonFunction([Const.MesButton.Save,Const.MesButton.DeleteRow]);

    //그리드 초기화...
    pageManager.InitializeComponent();

    grid01.onClick = W2UiHelper.RowOnClick;


    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;

    $("#hbtn_frm [name='hBtnB0002']").on("click", function(){
        delete w2ui['grid01'].last.click_recid;
    });

    w2ui["grid02"].on("change:after", function (e) {
        let num = e.recid - 1;
        if(w2ui["grid02"].records[num]['cu'] !== 'C'){
            w2ui["grid02"].records[num]['cu'] = 'u';
        }
    });
    w2ui["grid02"].on("restore:after", function (e) {
        let num = e.recid - 1;
        if(w2ui["grid02"].records[num]['cu'] !== 'C') {
            delete w2ui["grid02"].records[num]['cu'];
        }
    });

    $("#hBtnB0005").on("click", function(){
        let grid_id = 'grid02';
        let btn_id = Const.MesButton.Save;
        let rest_url = '/ajax/sales/save/ship_mgt';

        let param = [];

        let records = w2ui[grid_id].records;

        let count = 0;

        let qty = 0;

        for(let i=0; i< records.length; i++){
            if(records[i]['cu'] === 'C'){
                if(records[i]['w2ui']['changes']['ship_qty'] < 1){
                    mes_alert({msg:"출하수량은 0이하로 저장할수 없습니다."},{msg:""});
                    return {result : false};
                }
                count++;
                param.push(records[i]);
                qty = records[i]['w2ui']['changes']['ship_qty'];
            }else if(records[i]['cu'] === 'u'){
                if(records[i]['w2ui']['changes']['ship_qty'] < 1){
                    mes_alert({msg:"출하수량은 0이하로 저장할수 없습니다."},{msg:""});
                    return {result : false};
                }
                count++;
                param.push(records[i]);
                qty = records[i]['w2ui']['changes']['ship_qty'];
            }
            if(count > 1){
                let data = [];
                for(let j = 0; j < records.length; j++){
                    if(records[j]['cu'] !== 'C'){
                        delete w2ui[grid_id].records[j]['w2ui'];
                        delete w2ui[grid_id].records[j]['cu'];
                        data.push(w2ui[grid_id].records[j]);
                    }
                }
                w2ui[grid_id].clear();
                w2ui[grid_id].records = data;
                w2ui[grid_id].refresh();
                mes_alert({msg:"데이터는 하나만 저장할 수 있습니다."},{msg:""});
                return {result : false};
            }
        }

        console.log(param);

        let lcr = ScriptHelper.CloneObject(common.get_last_clicked_row().grid01);

        if(qty > lcr.ship_ordr_qty){
            mes_alert({msg:"출하수량 값이 수주수량을 넘었습니다."},{msg:"수주수량 값 : "+lcr.ship_ordr_qty+" 출하수량 값 : "+qty});
            return {result : false};
        }

        if(param.length > 0){
            let param_arr = [param];
            let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);

            ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
                .then((res)=>
                {
                    console.log(res, 'after ajax');
                    if(res.result){
                        w2ui['grid02'].clear();
                        $("#search_frm [name='ordr_no']").val(lcr.ordr_no);
                        $("#search_frm [name='prt_nbr_cd']").val(lcr.prt_nbr_cd);
                        $("#search_frm [name='prt_nbr_nm']").val(lcr.prt_nbr_nm);
                        let btn_id = Const.MesButton.Search;
                        let grid_id = 'grid01';
                        let rest_url =  pageManager.gridManager.GetAjaxUrl(grid_id, btn_id);
                        let param = w2ui[grid_id].lastGetParam.param;
                        param['like']['ordr_no'] = [$("#search_frm [name='ordr_no']").val(),'both'];
                        param['like']['prt_nbr_cd'] = [$("#search_frm [name='prt_nbr_cd']").val(),'both'];
                        param['like']['prt_nbr_nm'] = [$("#search_frm [name='prt_nbr_nm']").val(),'both'];

                        let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);

                        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
                            .then((data)=>{
                                let record_data = data.data;
                                //CheckBox의 설정값을 가져옴 Y는 true / N은 false
                                let check_info_obj = pageManager.gridManager.GridList[grid_id].CheckBoxConfigList;
                                let type_casting_obj = pageManager.gridManager.GridList[grid_id].TypeCastingList;
                                //받아온 데이터에 RecID를 붙힘
                                W2UiHelper.AddRecID(record_data);
                                W2UiHelper.TypeCastingConvertToGridFormat(record_data, type_casting_obj);
                                W2UiHelper.CheckBoxDataConvertToGridFormat(record_data, check_info_obj);
                                w2ui[grid_id].records = record_data;
                                w2ui[grid_id].reload(true);
                                if(w2ui[grid_id].hasOwnProperty("fncPostSearch") && typeof w2ui.grid01.fncPostSearch == "function"){
                                    w2ui[grid_id].fncPostSearch(res);
                                }

                            }).fail(ScriptHelper.OnAjaxFail);

                        common.success_msg(res.msg);
                    }else{
                        mes_alert({msg:res.msg},{msg:""});
                    }
                })
                .fail(ScriptHelper.OnAjaxFail);
        }

    });

    $("#hbtn_frm [name='hBtnB0004']").on("click", function(){
        let message = '정말로 삭제하시겠습니까?';
        w2confirm(message)
            .yes(() => {

                let get_chks = function () {

                    let grid_id = 'grid02';
                    let changes;
                    let param = [];

                    // for돌려서 chk true 면
                    changes = w2ui[grid_id].getChanges();
                    for (let item of changes) {
                        if (item.chk && item.cu !== 'c') {
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
                        url: '/ajax/sales/delete/ship_mgt',
                        type: "post",
                        data: ajax_args,
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            if(data.result){
                                pageManager.BtnFuncList.search(event, false);
                                common.success_msg(data.msg);
                            }else{
                                mes_alert({msg: data.msg},{msg: ""});
                            }
                        },
                        error: function (a, b, c) {
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