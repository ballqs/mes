import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "../../class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";

// 재고가 0보다 큰 것만 보여줄 것!
// 현재재고
$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, style: 'text-align: right'},
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', hidden:true, editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, hidden:true},
            { field: 'fact_nm', caption: '공장명', size: '80px', sortable: true},
            { field: 'out_gbn', caption: '출고구분', size: '100px', sortable: true, hidden: true},
            { field: 'rec_ymd', caption: '수불일자', size: '100px', sortable: true, hidden: true},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '120px', sortable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '120px', sortable: true},
            { field: 'spec', caption: '규격', size: '100px', sortable: true},
            { field: 'lotno', caption: 'LOTNO', size: '100px', sortable: true, hidden: false},
            { field: 'stck_whs_cd', caption: '창고코드', size: '100px', sortable: true, hidden:true},
            { field: 'stck_whs_nm', caption: '창고명', size: '100px', sortable: true},
            { field: 'stck_loc_cd', caption: '창고위치코드', size: '100px', sortable: true, hidden:true},
            { field: 'stck_loc_nm', caption: '창고위치명', size: '100px', sortable: true},
            { field: 'stck_qty', caption: '현재재고', size: '100px', sortable: true, style: 'text-align: right'},
            { field: 'stck_unit', caption: '재고단위코드', size: '100px', sortable: true, hidden:true},
            { field: 'unit_nm', caption: '재고단위', size: '100px', sortable: true},
        ],
        rowOnClickConfig : {
            [Const.config.rowOnClickConfig.funcType] : [Const.config.rowOnClickConfig.funcOption.detail],
            [Const.config.rowOnClickConfig.clickTargetGrid] : ["grid02"],
            [Const.config.rowOnClickConfig.clickWhereFieldList] : ["fact_cd", "prt_nbr_cd", "prt_nbr_nm", "lotno"],
            [Const.config.rowOnClickConfig.url] : "/ajax/material/output/get/mtrl_prdmove_mgt_mpn"
        },
        lastGetParam : {
            param : {}
        },
        fncPostSearch : function (res) {
            w2ui["grid02"].clear();
            if(res.data.length > 0){
                console.log(res);
                let search_id = "#grid_"+this.name+"_rec_1";
                $(search_id).click();
            }
        },
        fncPreSearch : function (param) {
            w2ui['grid02'].lastGetParam.param = param;
            return {result : true};
        },
        fncPostRowOnClick : function () {
            addnum = 0;
            Const.SelectedGridID = grid02.name;
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
            { field: 'move_no', caption: '이동번호', size: '100px', sortable: true, hidden: false},
            { field: 'move_dt', caption: '이동일자', size: '100px', sortable: true, style: 'text-align: center'},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '120px', sortable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '120px', sortable: true},
            { field: 'spec', caption: '규격', size: '100px', sortable: true},
            { field: 'lotno', caption: 'LOTNO', size: '100px', sortable: true},
            { field: 'from_fact_cd', caption: 'FROM공장코드', size: '100px', sortable: true, hidden:true},
            { field: 'from_fact_nm', caption: 'FROM공장', size: '100px', sortable: true, hidden:true},
            { field: 'from_whs_cd', caption: 'FROM창고코드', size: '100px', sortable: true, hidden:true},
            { field: 'from_whs_nm', caption: 'FROM창고', size: '100px', sortable: true, hidden:true},
            { field: 'from_loc_cd', caption: 'FROM위치코드', size: '100px', sortable: true, hidden:true},
            { field: 'from_loc_nm', caption: 'FROM위치', size: '100px', sortable: true, hidden:true},
            { field: 'to_fact_cd', caption: 'TO공장코드', size: '100px', sortable: true, hidden:true},
            { field: 'to_fact_nm', caption: 'TO공장', size: '100px', sortable: true, hidden:true},
            { field: 'to_whs_cd', caption: 'TO창고코드', size: '100px', sortable: true, hidden:true},
            { field: 'to_whs_nm', caption: 'TO창고', size: '100px', sortable: true, hidden:true},
            { field: 'to_loc_cd', caption: 'TO위치코드', size: '100px', sortable: true, hidden:true},
            { field: 'to_loc_nm', caption: 'TO위치', size: '100px', sortable: true, hidden:true},
            { field: 'stck_qty', caption: '현재재고', size: '100px', sortable: true, style: 'text-align: right'},
            { field: 'move_qty', caption: '이동수량', size: '100px', sortable: true, style: 'text-align: right', editable: { type: 'int'}},
            { field: 'move_unit', caption: '이동단위코드', size: '100px', sortable: true, hidden:true},
            { field: 'unit_nm', caption: '이동단위', size: '100px', sortable: true},
            { field: 'updt_id', caption: '입력자', size: '100px', sortable: true},
            { field: 'updt_dt', caption: '입력일시', size: '100px', sortable: true}
        ],
        lastGetParam : {
            param : {}
        },
        fncSeletedGridID : function () {
            Const.SelectedGridID = grid01.name;
        }
    }

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);
    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);

    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);

    pop_prt_nbr_cd.AddTargetColumnsOnPopupClose(["prt_nbr_cd","prt_nbr_nm","spec"], ["prt_nbr_cd","prt_nbr_nm","spec"]);

    grid01 = pageManager.gridManager.AddGrid(grid01);

    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");

    //PK, 필수입력, Readonly 필드 등록
    // pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "out_no"]);
    // pageManager.gridManager.SetReadonlyFields(grid01.name,  ["prt_nbr_dsp_nm"]);
    // pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["out_whs_cd","out_loc_cd"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/material/output/get/mtrl_prdmove_mgt");
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
    // pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.SavePage, "/ajax/material/output/save/mtrl_prdmove_mgt");

    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //팝업등록
    // pageManager.gridManager.AddPopUpOption(grid02.name,"out_whs_cd", pop_whs_cd.PopupName);
    // pageManager.gridManager.AddPopUpOption(grid02.name,"out_loc_cd", pop_loc_cd.PopupName);


    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //폼 팝업 등록
    let caller_name = "btn_pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);

    //버튼함수와 연결...
    pageManager.BindButtonFunction([Const.MesButton.AddRow, Const.MesButton.Save, Const.MesButton.DeleteRow]);


    //그리드 초기화...
    pageManager.InitializeComponent();

    grid01.onClick = W2UiHelper.RowOnClick;

    //div에 클릭펑션 먹인거...
    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});

    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;

    w2ui["grid02"].on("change:after", function (e) {
       let num = e.recid - 1;
       if(w2ui["grid02"].records[num]['cu'] !== 'c'){
           w2ui["grid02"].records[num]['cu'] = 'u';
       }
    });
    w2ui["grid02"].on("restore:after", function (e) {
        let num = e.recid - 1;
        if(w2ui["grid02"].records[num]['cu'] !== 'c') {
            delete w2ui["grid02"].records[num]['cu'];
        }
    });
    var addnum = 0;

    $("#hBtnB0002").on("click", function(){
        addnum = 0;
    });

    $("#hBtnB0003").on("click", function(){
        let lcr = {};
        lcr = ScriptHelper.CloneObject(common.get_last_clicked_row().grid01);
        if(Object.keys(lcr).length === 0) {
            mes_alert({msg: "첫번째 그리드에 클릭된 항목이 없습니다."});
            return false;
        }else{
            addnum++;
            if(addnum === 2){
                addnum = 1;
                mes_alert({msg: "그리드 행 추가는 최대 1개입니다."});
                return false;
            }

//             lcr.out_qty = lcr.stck_qty;
            let grid01_records = w2ui.grid01.records[w2ui.grid01.last.click_recid-1];

            lcr.move_qty = 0;
            lcr.move_unit = lcr.stck_unit;
            lcr.unit_nm = lcr.unit_nm;
            lcr.updt_id = '';
            lcr.updt_dt = '';
            lcr.cu = 'c';
//             lcr.out_whs_cd = document.search_frm.whs_cd.value;
//             lcr.whs_nm = document.search_frm.whs_nm.value;
            lcr.move_dt = common.getTimeStamp();
            w2ui.grid02.add(ScriptHelper.CloneObject(lcr));
            w2ui.grid02.records[w2ui.grid02.records.length - 1].recid = w2ui.grid02.records.length;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].w2ui = {};
            w2ui.grid02.records[w2ui.grid02.records.length - 1].w2ui.changes = {};
            w2ui.grid02.records[w2ui.grid02.records.length - 1].w2ui.changes.move_qty = 0;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].from_fact_cd = $('[name="fact_cd"] option:checked')[0].value;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].from_fact_nm = $('[name="fact_cd"] option:checked')[0].text;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].from_whs_cd = $('[name="out_whs_cd"]')[0].value;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].from_whs_nm = $('[name="out_whs_nm"]')[0].value;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].from_loc_cd = $('[name="out_loc_cd"]')[0].value;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].from_loc_nm = $('[name="out_loc_nm"]')[0].value;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].to_fact_cd = $('[name="fact_cd"] option:checked')[0].value;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].to_fact_nm = $('[name="fact_cd"] option:checked')[0].text;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].to_whs_cd = $('[name="in_whs_cd"]')[0].value;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].to_whs_nm = $('[name="in_whs_nm"]')[0].value;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].to_loc_cd = $('[name="in_loc_cd"]')[0].value;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].to_loc_nm = $('[name="in_loc_nm"]')[0].value;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].prt_nbr_cd = grid01_records.prt_nbr_cd;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].prt_nbr_nm = grid01_records.prt_nbr_nm;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].spec = grid01_records.spec;
            w2ui.grid02.records[w2ui.grid02.records.length - 1].lotno = grid01_records.lotno;
            w2ui.grid02.refresh();
            //w2ui.grid02.records[w2ui.grid02.records.length - 1].w2ui.changes.out_whs_cd = document.search_frm.whs_cd.value;
        }
    });
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
        let prt_nbr_cd = del_list[0]["prt_nbr_cd"];
        let prt_nbr_nm = del_list[0]["prt_nbr_nm"];
        let lotno = del_list[0]["lotno"];
        // chk = true 가 있으면 confirm
        if(flag){
            w2confirm(Const.MesMsg.confirm)
                .yes(() => {
                    $(".loadingW").css("display", "");
                    let ajax_url = "/ajax/material/output/delete/mtrl_prdmove_mgt";
                    let param = ScriptHelper.AjaxArgumentBuild(del_list, "hBtnB0004", ajax_url);
                    $.ajax({
                        url: ajax_url,
                        type: "post",
                        data: param,
                        dataType: "json",
                        success: function(data){
                            console.log(data);
                            let grid_id = 'grid01';
                            $("#search_frm [name='prt_nbr_cd']").val(prt_nbr_cd);
                            $("#search_frm [name='prt_nbr_nm']").val(prt_nbr_nm);
                            $("#search_frm [name='lotno']").val(lotno);
                            w2ui[grid_id].lastGetParam.param["like"]["prt_nbr_cd"] = [prt_nbr_cd,"both"];
                            w2ui[grid_id].lastGetParam.param["like"]["prt_nbr_cd"] = [prt_nbr_nm,"both"];
                            w2ui[grid_id].lastGetParam.param["like"]["lotno"] = [lotno,"both"];
                            let btn_id = Const.MesButton.Search;
                            let param = w2ui[grid_id].lastGetParam.param;
                            let rest_url = pageManager.gridManager.GetAjaxUrl(grid_id, btn_id);
                            let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);

                            ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
                                .then((res)=>{
                                    let record_data = res.data;
                                    //받아온 데이터에 RecID를 붙힘
                                    W2UiHelper.AddRecID(record_data);
                                    w2ui[grid_id].records = record_data;
                                    w2ui[grid_id].reload(true);
                                    if(w2ui[grid_id].hasOwnProperty("fncPostSearch") && typeof w2ui[grid_id].fncPostSearch == "function"){
                                        w2ui[grid_id].fncPostSearch(res);
                                    }
                                })
                                .fail(ScriptHelper.OnAjaxFail);
                            common.success_msg(data.msg);
                        },
                        error: function (a,b,c) {
                            $(".loadingW").css("display", "none");
                            console.log(a);
                            console.log(b);
                            console.log(c);
                        }
                    });
                })
                .no(() => {
                    return false;
                });
        }

        // confirm = true 면 grid02 넘기기
    });

    $("#hBtnB0005").on("click", function(){
        let grid_id = 'grid02';
        let btn_id = Const.MesButton.Save;
        let rest_url = "/ajax/material/output/save/mtrl_prdmove_mgt";

        let hap = 0;

        let param = {};

        let records = w2ui[grid_id].records;

        let count = 0;

        for(let i=0; i<records.length; i++){
            if(addnum === 1){
                if(records[i]['cu'] === 'c'){
                    if(records[i].w2ui.changes.move_qty < 1){
                        mes_alert({msg:"이동수량 값을 제대로 입력해주시길 바랍니다."},{msg:""});
                        return {result : false};
                    }
                    param['move_qty'] = records[i].w2ui.changes.move_qty;
                    param['records'] = records[i];

                    hap = records[i].w2ui.changes.move_qty;
                }
            }else if(addnum === 0 ){
                if(records[i]['cu'] === 'u'){
                    count++;
                    if(count > 1){
                        mes_alert({msg:"데이터는 하나만 저장할 수 있습니다."},{msg:""});
                        return {result : false};
                    }
                    if(records[i].w2ui.changes.move_qty < 1){
                        mes_alert({msg:"이동수량 값을 제대로 입력해주시길 바랍니다."},{msg:""});
                        return {result : false};
                    }
                    param['move_qty'] = records[i].w2ui.changes.move_qty;
                    param['records'] = records[i];

                    let value = records[i].w2ui.changes.move_qty - records[i].move_qty;
                    hap = value;
                }
            }
        }

        let lcr = ScriptHelper.CloneObject(common.get_last_clicked_row().grid01);
        if(hap > lcr.stck_qty){
            mes_alert({msg:"이동수량 값이 현재재고값을 넘어갑니다."},{msg:"이동수량 값 : "+hap});
            return {result : false};
        }
        console.log(hap);
        console.log(param);
        let prt_nbr_cd;
        let prt_nbr_nm;
        let lotno;
        if(hap == lcr.stck_qty){
            prt_nbr_cd = '';
            prt_nbr_nm = '';
            lotno = '';
        }else{
            prt_nbr_cd = param["records"]["prt_nbr_cd"];
            prt_nbr_nm = param["records"]["prt_nbr_nm"];
            lotno = param["records"]["lotno"];
        }

        if(param !== undefined){
            let param_arr = [param];
            let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);

            ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
                .then((res)=>
                {
                    console.log(res, 'after ajax');
                    let grid_id = 'grid01';
                    $("#search_frm [name='prt_nbr_cd']").val(prt_nbr_cd);
                    $("#search_frm [name='prt_nbr_nm']").val(prt_nbr_nm);
                    $("#search_frm [name='lotno']").val(lotno);
                    w2ui[grid_id].lastGetParam.param["like"]["prt_nbr_cd"] = [prt_nbr_cd,"both"];
                    w2ui[grid_id].lastGetParam.param["like"]["prt_nbr_cd"] = [prt_nbr_nm,"both"];
                    w2ui[grid_id].lastGetParam.param["like"]["lotno"] = [lotno,"both"];
                    let btn_id = Const.MesButton.Search;
                    let param = w2ui[grid_id].lastGetParam.param;
                    let rest_url = pageManager.gridManager.GetAjaxUrl(grid_id, btn_id);
                    let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);

                    ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
                        .then((res)=>{
                            console.log(res, 'after ajax');
                            let record_data = res.data;
                            //받아온 데이터에 RecID를 붙힘
                            W2UiHelper.AddRecID(record_data);
                            w2ui[grid_id].records = record_data;
                            w2ui[grid_id].reload(true);
                            if(w2ui[grid_id].hasOwnProperty("fncPostSearch") && typeof w2ui[grid_id].fncPostSearch == "function"){
                                w2ui[grid_id].fncPostSearch(res);
                            }
                        })
                        .fail(ScriptHelper.OnAjaxFail);

                    common.success_msg(res.msg);
                    addnum = 0; //add 변수
                })
                .fail(ScriptHelper.OnAjaxFail);
        }
    });
})
