import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_inpct_cd from "/include/js/popups/pop_inpct_cd.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";
import Pop_wrkctr_cd from "/include/js/popups/pop_wrkctr_cd.js";
// import Pop_whs_cd from "../../popups/pop_whs_cd";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center',editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'wrk_ordr_no', caption: '지시번호', size: '100px', sortable: true, resizable: true},
            { field: 'op_cd', caption: '공정코드', size: '100px', sortable: true, resizable: true,hidden: true},
            { field: 'op_nm', caption: '공정', size: '100px', sortable: true, resizable: true},
            { field: 'wrkctr_cd', caption: '작업장코드', size: '100px', sortable: true, resizable: true,editable: { type: 'text' }},
            { field: 'wrkctr_nm', caption: '작업장명', size: '100px', sortable: true, resizable: true},
            { field: 'daynight_gbn', caption: '주/야구분', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }, attr:"align=center"},
            { field: 'wrk_ordr_dt', caption: '지시일자', size: '100px', sortable: true, resizable: true, editable: { type: 'date' },attr:"align=center"},
            { field: 'ordr_prt_nbr_no', caption: '지시품번코드', size: '150px', sortable: true, resizable: true,editable: { type: 'text' }},
            { field: 'ordr_prt_nbr_no_nm', caption: '지시품번명', size: '180px', sortable: true, resizable: true},
            { field: 'ordr_prt_nbr_no_spec', caption: '지시품번규격', size: '180px', sortable: true, resizable: true},
            { field: 'ordr_qty', caption: '지시수량', size: '100px', sortable: true, resizable: true, editable: { type: 'float' },attr:"align=right"},
            { field: 'prd_ordr_unit', caption: '지시단위', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'wrk_ordr_status', caption: '지시상태', size: '100px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'wrk_ordr_type', caption: '지시유형', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }, attr:"align=center"},
            { field: 'wrk_tm_min', caption: '작업시간_분', size: '100px', sortable: true, resizable: true ,attr:"align=right"},
            { field: 'remark', caption: '비고', size: '100px', sortable: true, resizable: true},
            { field: 'updt_id', caption: '작성자ID', size: '100px', sortable: true, resizable: true},
            { field: 'updt_dt', caption: '작성일시', size: '100px', sortable: true, resizable: true},
        ],
        rowOnClickConfig: {
            [Const.config.rowOnClickConfig.funcType]: [Const.config.rowOnClickConfig.funcOption.detail],
            [Const.config.rowOnClickConfig.clickTargetGrid]: ["grid02"],
            [Const.config.rowOnClickConfig.clickWhereFieldList]: ["fact_cd","wrk_ordr_no", "ordr_prt_nbr_no", "ordr_prt_nbr_no_nm","daynight_gbn"],
            [Const.config.rowOnClickConfig.url]: "/ajax/quality/inpct_mgt/get/inpct_mgt_grid2",


        },
        lastGetParam : {
            param : {},
        },
        fncPostAdd : function(grid_id){
            console.log(grid_id);
            let len = w2ui[this.name].records.length;
            common.Automatic_addition(grid_id,['recid','daynight_gbn'],[len,'D']);
            return {result : true};
        },
        fncPreSearch : function(param){
            if(param['where']['date1'] > param['where']['date2']){
                $(".loadingW").css("display", "none");
                mes_alert({msg:param['where']['date1']+" ~ "+param['where']['date2']},{msg:"라는 조회 조건으로 조회는 불가능합니다."});
                return {result : false};
            }

            return {result : true};
        },
        fncPostSearch: function (obj) {
            let g1_recid = w2ui[this.name].last.click_recid;
            let search_id;
            if(g1_recid ===undefined){
                search_id = "#grid_" + this.name + "_rec_1";
            }
            else
            {
                search_id = "#grid_" + this.name + "_rec_"+g1_recid;
            }

            $(search_id).click();

        },
    }


    let grid02 = {
        name: 'grid02',
        columns: [
            {field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right', readOnly: true},
            {field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, editable: {type: 'checkbox'}},
            { field: 'fact_cd', caption: '공장', size: '80px', sortable: true, resizable: true, editable: { type: 'select' }},
            {field: 'inspct_no', caption: '검사번호', size: '100px', sortable: true, resizable: true,readOnly: true, editable: {type: 'text', maxLength: 20}/*, hidden: true*/},
            {field: 'prt_nbr_cd', caption: '품번코드', size: '100px', sortable: true, resizable: true,readOnly: true, editable: {type: 'text', maxLength: 20}/*, hidden: true*/},
            {field: 'prt_nbr_nm', caption: '품번명', size: '100px', sortable: true, resizable: true,readOnly: true, editable: {type: 'text', maxLength: 50},},
            {field: 'inspct_cd', caption: '검사항목코드', size: '100px', sortable: true, resizable: true,readOnly: true, editable: {type: 'text', maxLength: 20}/*, hidden: true*/},
            {field: 'inspct_nm', caption: '검사항목명', size: '100px', sortable: true, resizable: true,readOnly: true, editable: {type: 'text', maxLength: 50},},
            {field: 'daynight_gbn', caption: '주야구분', size: '100px', sortable: true, resizable: true, /*hidden:true,*/readOnly: true, editable: {type: 'select',},},
            {field: 'inspct_act_gbn', caption: '검사실시유형', size: '100px', sortable: true, resizable: true, /*hidden:true,*/readOnly: true, editable: {type: 'select',},},
            {field: 'inspct_seq', caption: '검사순서', size: '100px', sortable: true, resizable: true,readOnly: true, editable: {type: 'text', maxLength: 50},},
            {field: 'inspct_stdrd_type', caption: '규격유형', size: '80px', sortable: true, resizable: true,readOnly: true, editable: {type: 'select'},},
            {field: 'up_limit_value', caption: '상한값', size: '100px', sortable: true, resizable: true,readOnly: true, editable: {type: 'text', maxLength: 50},},
            {field: 'mid_value', caption: '중간값', size: '100px', sortable: true, resizable: true,readOnly: true, editable: {type: 'text', maxLength: 50},},
            {field: 'low_limit_value', caption: '하한값', size: '100px', sortable: true, resizable: true, readOnly: true,editable: {type: 'text', maxLength: 50},},
            {field: 'measur_value', caption: '측정값', size: '100px', sortable: true, resizable: true,editable: {type: 'text', maxLength: 50},},
            {field: 'judg_value', caption: '판정', size: '80px', sortable: true, resizable: true, editable: { type: 'select' } },
            {field: 'tot_juge_value', caption: '전체판정값', size: '80px', sortable: true, resizable: true, editable: { type: 'select' } },
            {field: 'wrk_order_no', caption: '지시번호', size: '100px', sortable: true, resizable: true},
            {field: 'inspct_head_no', caption: '검사명세번호', size: '100px', sortable: true, resizable: true},
            {field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 1000 }},
            {field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, readOnly: true,resizable: true,/* editable: { type: 'text' }*/},
            {field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, readOnly: true,resizable: true, style: 'text-align: center',/* editable: { type: 'date' }*/},
            {field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, readOnly: true,resizable: true,/* editable: { type: 'text' }*/},
            {field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, readOnly: true,resizable: true, style: 'text-align: center',/* editable: { type: 'date' }*/},
            {field: 'count_inspct', caption: '검사항목수', size: '100px', sortable: true, resizable: true,hidden:true,editable: {type: 'text', maxLength: 50},},
            {field: 'max_count_inspct', caption: '검사항목수', size: '100px', sortable: true, resizable: true,hidden:true,editable: {type: 'text', maxLength: 50},},
        ],
        fncSeletedGridID: function () {
            Const.SelectedGridID = grid01.name;
        },
        fncPostROCDT: function () {
            let len = w2ui[this.name].records.length;
            if (len > 0) {

                let str = 'grid_' + this.name + '_rec_1';
                $("#" + str).click();
            }
        },

    };
    let search_frm_id = "search_frm";
    let bnt_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, bnt_frm_id);

    let pop_inpct_cd = new Pop_inpct_cd(pageManager, search_frm_id);
    pop_inpct_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);

    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);


    let pop_wrkctr_cd = new Pop_wrkctr_cd(pageManager, search_frm_id);
    pop_wrkctr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);







    grid01 = pageManager.gridManager.AddGrid(grid01);

    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"prd_ordr_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"wrk_ordr_type", common.code, {up_cd: "wrk_ordr_type"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"daynight_gbn", common.code, {up_cd: "day_night"}, "cd", "cd_nm");



    //1번 그리드 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    grid02 = pageManager.gridManager.AddGrid(grid02);
    //팝업등록

    // pageManager.gridManager.AddPopUpOption(grid.name,"whs_cd", pop_whs_cd.PopupName);

    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid02.name, "chk");



    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/production/plan/get/wrkctr_ord_mgt");
    //pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.Search, "/ajax/quality/inpct_mgt/get/inpct_mgt");
    pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.DeleteRow, "/ajax/quality/inpct_mgt/delete/inpct_mgt");


    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"inspct_stdrd_type",common.code, {up_cd: "inspct_stdrd_type"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"daynight_gbn",common.code, {up_cd: "day_night"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"inspct_act_gbn",common.code, {up_cd: "inspct_act_gbn"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"judg_value",common.code, {up_cd: "judg_value"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"tot_juge_value", common.code, {up_cd: "judg_value"}, "cd", "cd_nm" );


    //폼 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","inspct_act_gbn", common.code, {up_cd: "inspct_act_gbn"}, "cd", "cd_nm","","전체");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","day_night", common.code, {up_cd: "day_night"}, "cd", "cd_nm","","전체");


    let caller_name = "pop_inpct_cd";
    let target_name = ["inspct_cd","inspct_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_inpct_cd.ShowFormDialog, target_name);

    caller_name = "pop_prt_nbr_cd";
    target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);

    //폼 팝업 등록
    caller_name = "pop_wrkctr_cd";
    target_name = ["wrkctr_cd","wrkctr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_wrkctr_cd.ShowFormDialog, target_name,[]);

    //버튼함수와 연결...
    pageManager.BindButtonFunction([Const.MesButton.AddRow,Const.MesButton.Save,Const.MesButton.DeleteRow]);

    //그리드 초기화...
    pageManager.InitializeComponent();

    pageManager.gridManager.SetClickTargetGrid("grid01", "grid02");
    pageManager.gridManager.SetClickWhereFieldList("grid01", ["fact_cd","wrk_order_no", "ordr_prt_nbr_no", "ordr_prt_nbr_no_nm","daynight_gbn","wrk_ordr_dt"]);
    grid01.onClick = W2UiHelper.RowOnClick;

    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});

    $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});

    Const.SelectedGridID = grid01.name;

    $("#hBtnB0003").on("click", function () {    //rowadd


        $(".loadingW").css("display", "");

        let recid = w2ui[grid01.name].last.click_recid;

        w2ui[grid01.name].records[recid-1]['prt_nbr_cd'];
        let param ={};
        param['fact_cd'] =  w2ui[grid01.name].records[recid-1]['fact_cd'];
        param['prt_nbr_cd'] =  w2ui[grid01.name].records[recid-1]['ordr_prt_nbr_no'];
        param['prt_nbr_nm'] = w2ui[grid01.name].records[recid-1]['ordr_prt_nbr_no_nm'];
        param['wrk_order_no'] = w2ui[grid01.name].records[recid-1]['wrk_ordr_no'];
        param['date1'] = $("#" + search_frm_id + " [name = 'date1']").val();
        param['date2'] = $("#" + search_frm_id + " [name = 'date2']").val();

        //"/base/quality/part_nbr_inpct_code_mgt"

        if(param['prt_nbr_cd'] ==""){
            $(".loadingW").css("display", "none");
            mes_alert({msg : "품번코드가 비어있습니다."},{msg : ''});
            return;
        }


        let param_arr = {};
        param_arr['where'] = param;

        let ajax_url = "/ajax/base/quality/get/pnic_mgt2";
        let btn_id = Const.MesButton.AddRow;
        let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);

        ScriptHelper.AjaxCall(ajax_url, Const.AjaxMethod.GET, ajax_args)
            .then((res) => {
                console.log(res, 'after ajax');
                if (res['result'] == false) {
                    $(".loadingW").css("display", "none");

                } else if (res['result'] == true) {
                    common.success_msg(res);
                    w2ui.grid02.clear();
                    let siryosu = parseInt($("#" + search_frm_id + " [name = 'siryosu']").val());
                    for(let j = 0; j<siryosu; j++) {
                        let count_inspct = res.data.length;
                        let cloor;

                        if (j % 2 == 0)
                            cloor = "background-color: #EFEFEF";
                        else
                            cloor = "background-color: #FFFFFF";

                        for (let i = 0; i < res.data.length; i++) {
                            res.data[i]["cu"] = 'c';
                            let inspct_Arc_gbn = $("#" + search_frm_id + " [name = 'inspct_act_gbn']").val();
                            inspct_Arc_gbn == "" || inspct_Arc_gbn == null ? inspct_Arc_gbn = "10" : 0;
                            let daynight_gbn = $("#" + search_frm_id + " [name = 'day_night']").val();
                            daynight_gbn == "" || daynight_gbn == null ? daynight_gbn = "D" : 0;
                            let up = null;
                            let mid = null;
                            let low = null;
                            let measur = null;

                            if (res.data[i]["inspct_stdrd_type"] == 10) {
                                up = res.data[i]["up_limit_value"];
                            } else if (res.data[i]["inspct_stdrd_type"] == 20) {
                                up = res.data[i]["up_limit_value"];
                                mid = res.data[i]["mid_value"];
                                low = res.data[i]["low_limit_value"];
                            } else if (res.data[i]["inspct_stdrd_type"] == 30) {
                                low = res.data[i]["low_limit_value"];
                            }

                            w2ui.grid02.add({
                                recid: w2ui.grid02.records.length + 1,
                                cu: 'c',
                                chk: false,
                                fact_cd: res.data[i]["fact_cd"],
                                prt_nbr_cd: res.data[i]["prt_nbr_cd"],
                                prt_nbr_nm: res.data[i]["prt_nbr_nm"],
                                inspct_cd: res.data[i]["inspct_cd"],
                                inspct_nm: res.data[i]["inspct_nm"],
                                inspct_seq: res.data[i]["inspct_seq"],
                                inspct_stdrd_type: res.data[i]["inspct_stdrd_type"],
                                inspct_act_gbn: inspct_Arc_gbn,
                                daynight_gbn: daynight_gbn,
                                up_limit_value: up,
                                mid_value: mid,
                                low_limit_value: low,
                                measur_value: measur,
                                judg_value: res.data[i]["judg_value"],
                                tot_juge_value: res.data[i]["tot_juge_value"],
                                wrk_order_no:  param['wrk_order_no'],
                                remark: "" ,
                                inst_id: "",
                                inst_dt: "",
                                updt_id: "",
                                updt_dt: "",
                                count_inspct: count_inspct,
                                max_count_inspct: count_inspct*siryosu,
                                w2ui: {"style": cloor}
                            });

                        }
                    }


                    $(".loadingW").css("display", "none");
                }
            })
            .fail(ScriptHelper.OnAjaxFail);



        $(".loadingW").css("display", "none");
    });

    $("#hBtnB0005").on("click", function() {
        $(".loadingW").css("display", "");

        let recodes = w2ui[grid02.name].records;
        let param_arr= [];
        let now_date = new Date();
        let y = now_date.getFullYear();
        let m = (now_date.getMonth() + 1) < 10 ? '0' + (now_date.getMonth() + 1) : (now_date.getMonth() + 1);
        let d = now_date.getDate() < 10 ? '0' + now_date.getDate() : now_date.getDate();
        let now = y + '-' + m + '-' + d;
        let count =0;
        let count_inspct_seq;


        let change = w2ui[grid02.name].getChanges();

        for(let i = 0 ; i< change.length; i++){

            for(let key in change[i]){

                recodes[change[i]["recid"]-1][key] =change[i][key];

                //param_arr[change[i]["recid"]-1][key] =change[i][key];
                console.log(key, change[i][key])
            }
        }

        let j=0;

        for (let i = 0; i < recodes.length ;i++) {

            count_inspct_seq = recodes[i]["count_inspct"];
            let param ={};
            if(recodes[i]["cu"] == "c"){
                param["cu"] = 'c';
            }else{
                param["cu"] = 'u';
            }
            param["wrk_order_no"] =recodes[i]["wrk_order_no"];
            param["inspct_seq"] =recodes[i]["inspct_seq"];
            param["fact_cd"] =recodes[i]["fact_cd"];
            param["inspct_no"]= recodes[i]["inspct_no"];
            param["prt_nbr_cd"] =recodes[i]["prt_nbr_cd"] ;
            param["inspct_cd"] =recodes[i]["inspct_cd"] ;
            param["inspct_ymd"] =         now;                  //recodes[i]["inspct_ymd"] ;
            param["inspct_act_gbn"] =recodes[i]["inspct_act_gbn"] ;
            param["daynight_gbn"] =recodes[i]["daynight_gbn"] ;
            param["remark"] =recodes[i]["remark"];
            param["count_inspct"] = count_inspct_seq;
            param["max_count_inspct"] =recodes[i]["max_count_inspct"];

           let up = ( recodes[i]["up_limit_value"] == null || recodes[i]["up_limit_value"] =='')? 'NULL' :  parseFloat((recodes[i]["up_limit_value"]));
           let mid = ( recodes[i]["mid_value"] == null || recodes[i]["mid_value"] =='')? 'NULL' :  parseFloat((recodes[i]["mid_value"]));
           let low = ( recodes[i]["low_limit_value"] == null || recodes[i]["low_limit_value"] =='')? 'NULL' :  parseFloat((recodes[i]["low_limit_value"]));
           let measur = ( recodes[i]["measur_value"] == null || recodes[i]["measur_value"] =='')? 'NULL' :  parseFloat((recodes[i]["measur_value"]));

            if(recodes[i]["inspct_stdrd_type"] !='40'){
                if( measur =='NULL'){
                    $(".loadingW").css("display", "none");
                    mes_alert({msg: "측정값이 비어있습니다."});
                    return;
                }
                if(up =='NULL'){
                    if( low<measur){
                        param["judg_value"] = "OK";
                    }else{
                        param["judg_value"] = "NG";
                    }
                }else if(low =='NULL'){
                    if (up > measur) {
                        param["judg_value"] = "OK";
                    } else {
                        param["judg_value"] = "NG";
                    }
                }else{
                    if(up > measur && low<measur ){
                        param["judg_value"] = "OK";
                     } else {
                        param["judg_value"] = "NG";
                      }
                }
            }else{
                if(recodes[i]["judg_value"] =="" ||recodes[i]["judg_value"] ==null){
                    $(".loadingW").css("display", "none");
                    mes_alert({msg:"규격유형: 판정일땐 판정값을 직접 기입해야합니다."});
                    return;
                }else{
                    param["judg_value"] = recodes[i]["judg_value"];
                }

            }
            param["up_limit_value"] = up;
            param["mid_value"] = mid;
            param["low_limit_value"] = low;
            param["measur_value"] = measur;
            param["tot_juge_value"] ="NULL";
            if(param["judg_value"]=="OK"){
                count++;
            }

            param_arr.push(param);
            if((j+1)-count_inspct_seq== 0){
                if(count == count_inspct_seq){
                    param_arr[i-count_inspct_seq+1]["tot_juge_value"] ="OK";
                }else{
                    param_arr[i-count_inspct_seq+1]["tot_juge_value"] ="NG";
                }
                count = 0;
                j = -1;
            }

            j++;

        }

        let ajax_url = "/ajax/quality/inpct_mgt/save/inpct_mgt";
        let btn_id = Const.MesButton.Save;

        let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);


        ScriptHelper.AjaxCall(ajax_url, Const.AjaxMethod.POST, ajax_args)
            .then((res) => {
                $(".loadingW").css("display", "none");
                console.log(res, 'after ajax');
                if (res['result'] == false) {
                    //mes_alert({msg : "ssssss",{msg : ''});
                } else if (res['result'] == true) {

                    Const.SelectedGridID = grid01.name;


                    pageManager.BtnFuncList.search(event,false);

                }
            })
            .fail(ScriptHelper.OnAjaxFail);

        $(".loadingW").css("display", "none");

    });

    $("#hBtnB0004").on("click", function () {

        $(".loadingW").css("display", "");


        let temp = w2ui[grid02.name].records;
        let param_arr = [];
        let count = 0;

        for (let i = 0; i < temp.length; i++) {
            if (temp[i].w2ui !== undefined) {

                if (temp[i].w2ui.changes['chk'] == true) {

                    let param = {};
                    param['fact_cd'] = temp[i]['fact_cd'];
                    param['inspct_no'] = temp[i]['inspct_no'];
                    param_arr.push(param);
                    count++;
                }
            }
        }

        let ajax_url = "/ajax/quality/inpct_mgt/delete/inpct_mgt";

        let btn_id = Const.MesButton.DeleteRow;
        param_arr = [param_arr];
        let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);


        ScriptHelper.AjaxCall(ajax_url, Const.AjaxMethod.POST, ajax_args)
            .then((res) => {
                $(".loadingW").css("display", "none");
                console.log(res, 'after ajax');
                $(".loadingW").css("display", "none");
                if (res['result'] == false) {
                    mes_alert({msg: str}, {msg: ''});
                } else if (res['result'] == true) {
                    common.success_msg(res.msg);
                    let g1_recid = w2ui[grid01.name].last.click_recid;
                    pageManager.InitializeComponent();
                    $("#grid_grid01_rec_" + g1_recid).click();
                }
            })
            .fail(ScriptHelper.OnAjaxFail);

    });

    $("#" + search_frm_id + " [name = 'inspct_act_gbn']").on("change", function (event) {
        $("#" + search_frm_id + " [name = 'siryosu']").val($("#inspct_act_gbn option:selected").attr("cd_nset1"));

    });


    w2ui[grid02.name].on("change", function(event){
        Const.SelectedGridID = grid01.name;
    });


});