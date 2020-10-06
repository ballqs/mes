import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";
import Pop_op_cd from "/include/js/popups/pop_op_cd.js";
import Pop_wrkctr_cd from "/include/js/popups/pop_wrkctr_cd.js";


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
       }
   }

    let search_frm_id = "search_frm";
    let bnt_frm_id = "hbtn_frm";
    let page_addr_name = "wrkctr_ord_mgt";

    let pageManager = new GridPageManager(search_frm_id, bnt_frm_id, page_addr_name);
    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddTargetColumnsOnPopupClose(["prt_nbr_cd","prt_nbr_nm","spec"], ["ordr_prt_nbr_no","ordr_prt_nbr_no_nm","ordr_prt_nbr_no_spec"]);

    let pop_op_cd = new Pop_op_cd(pageManager, search_frm_id);
    pop_op_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);

    let pop_wrkctr_cd = new Pop_wrkctr_cd(pageManager, search_frm_id);
    pop_wrkctr_cd.AddParentReferFormTag(["fact_cd","op_cd","op_nm"], ["fact_cd","op_cd","op_nm"]);
    pop_wrkctr_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
    pop_wrkctr_cd.AddTargetColumnsOnPopupClose(["op_cd","op_nm","wrkctr_cd","wrkctr_nm"], ["op_cd","op_nm","wrkctr_cd","wrkctr_nm"]);

    //1번 그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);
    //팝업등록
    pageManager.gridManager.AddPopUpOption(grid01.name,"ordr_prt_nbr_no", pop_prt_nbr_cd.PopupName);
    pageManager.gridManager.AddPopUpOption(grid01.name,"wrkctr_cd", pop_wrkctr_cd.PopupName);

    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");


    //PK, 필수입력, Readonly 필드 등록
    pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd"]);
    pageManager.gridManager.SetReadonlyFields(grid01.name,  ["wrk_ordr_no"]);
    pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["wrkctr_cd","wrk_ordr_type","ordr_prt_nbr_no","ordr_qty"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/production/plan/get/wrkctr_ord_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/production/plan/delete/wrkctr_ord_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/production/plan/save/wrkctr_ord_mgt");

    //select 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"prd_ordr_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"wrk_ordr_type", common.code, {up_cd: "wrk_ordr_type"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"daynight_gbn", common.code, {up_cd: "day_night"}, "cd", "cd_nm");

    let pop_copy = 'pop_copy';

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    pageManager.frmManager.AddForm(pop_copy);

    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","daynight_gbn", common.code, {up_cd: "day_night"}, "cd", "cd_nm","","전체");

    pageManager.frmManager.AddSelectBoxInfo(pop_copy,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //폼 팝업 등록
    let caller_name = "pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name,[]);

    //폼 팝업 등록
        caller_name = "pop_op_cd";
        target_name = ["op_cd","op_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_op_cd.ShowFormDialog, target_name,[]);

    //폼 팝업 등록
        caller_name = "pop_wrkctr_cd";
        target_name = ["wrkctr_cd","wrkctr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_wrkctr_cd.ShowFormDialog, target_name,[]);

    //그리드 초기화..
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //버튼함수와 연결...
    pageManager.BindButtonFunction([Const.MesButton.Save,Const.MesButton.DeleteRow]);

    //그리드 초기화...
    pageManager.InitializeComponent();


    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});

    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;

    //delete 구현
    $("#hBtnB0004").on("click", function(){
        w2confirm(Const.MesMsg.confirm)
            .yes(() => {
                let grid_id = Const.SelectedGridID;
                let btn_id =  Const.MesButton.DeleteRow;
                let rest_url = pageManager.gridManager.GetAjaxUrl(grid_id, btn_id);

                // modify from here.
                let param = [];
                for(let key in w2ui[grid_id].records){
                    let obj = {};
                    if(w2ui[grid_id].records[key].w2ui !== undefined){
                        if(w2ui[grid_id].records[key].w2ui.changes.chk){
                            if(w2ui[grid_id].records[key]['wrk_ordr_status'] !== '대기' && w2ui[grid_id].records[key]['wrk_ordr_status'] !== undefined){
                                mes_alert({msg : w2ui[grid_id].records[key]['recid']+'번 행의 지시상태코드가 진행 및 완료 상태입니다.'},{msg : '삭제 불가능합니다.'});
                                return false;
                            }
                            if(w2ui[grid_id].records[key]['cu'] !== undefined){
                                continue;
                            }
                            //del_rows.push(w2ui[grid_id].records[key]);
                            obj['fact_cd'] = w2ui[grid_id].records[key]['fact_cd'];
                            obj['wrk_ordr_no'] = w2ui[grid_id].records[key]['wrk_ordr_no'];
                        }
                    }
                    param.push(obj);
                }
                console.log(param);

                //기존 열 디비에서 지우기
                if(param.length > 0){
                    param = W2UiHelper.CheckBoxDataConvertToDBFormat(param, pageManager.gridManager.GridList[grid_id].CheckBoxConfigList);
                    let param_arr = [param];
                    let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);
                    //삭제 Ajax 호출
                    ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
                        .then((res)=> {
                            $(".loadingW").css("display", "none");

                            let btn_id = Const.MesButton.Search;
                            let rest_url =  pageManager.gridManager.GetAjaxUrl(grid_id, btn_id);
                            let param = w2ui[grid_id].lastGetParam.param;
                            if(JSON.stringify(param) === "{}"){
                                param = FormHelper.SerializeForm(search_frm_id);
                            }
                            let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);
                            ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
                                .then((data)=>{
                                    let record_data = data.data;
                                    //CheckBox의 설정값을 가져옴 Y는 true / N은 false
                                    let check_info_obj = pageManager.gridManager.GridList[grid_id].CheckBoxConfigList;
                                    //받아온 데이터에 RecID를 붙힘
                                    W2UiHelper.AddRecID(record_data);
                                    W2UiHelper.CheckBoxDataConvertToGridFormat(record_data, check_info_obj);
                                    w2ui[grid_id].records = record_data;
                                    w2ui[grid_id].reload(true);

                                }).fail(ScriptHelper.OnAjaxFail);

                            common.success_msg(res.msg);
                        })
                        .fail(ScriptHelper.OnAjaxFail);
                }
                else
                {
                    reload(btn_id);
                    $(".loadingW").css("display", "none");
                }
            })
            .no(function(){
                return false;
            });
    });

    //save 구현
    $("#hBtnB0005").on("click", function(){
        $(".loadingW").css("display", "");
        let grid_id = Const.SelectedGridID;

        let btn_id = Const.MesButton.Save;
        let rest_url =  pageManager.gridManager.GetAjaxUrl(grid_id, btn_id);

        let ajaxArgs = {
            param : {
                where: {},
            },
        }

        let now_date = new Date();
        let y = now_date.getFullYear();
        let m = (now_date.getMonth() + 1) < 10 ? '0' + (now_date.getMonth() + 1) : (now_date.getMonth() + 1);
        let d = now_date.getDate() < 10 ? '0' + now_date.getDate() : now_date.getDate();
        let now = y+'-'+m+'-'+d;

        let num = 0;

        for(let i=0; i<w2ui[grid_id].records.length; i++){
            if(w2ui[grid_id].records[i]['w2ui'] !== undefined){
                if(w2ui[grid_id].records[i]['w2ui']['changes'] !== undefined){
                    if(w2ui[grid_id].records[i]['cu'] == 'C' || w2ui[grid_id].records[i]['cu'] == 'c'){
                        ajaxArgs.param.where[num] = w2ui[grid_id].records[i]['w2ui']['changes'];
                        ajaxArgs.param.where[num]['cu'] = 'c';
                        num++;
                    }else{
                        ajaxArgs.param.where[num] = w2ui[grid_id].records[i];
                        ajaxArgs.param.where[num]['cu'] = 'u';
                        num++;
                    }
                }
            }
        }
        let getchange = w2ui[grid_id].getChanges();

        //u 인 경우만 바뀐값 집어넣기
        for(let i = 0; i<num; i++){
            if(ajaxArgs.param.where[i]['cu'] === 'u'){
                for(let j=0; j<getchange.length; j++){
                    if(getchange[j]['recid'] === ajaxArgs.param.where[i]['recid']){
                        for(let key in getchange[j]){
                            if(key === "ordr_qty" && getchange[j][key] <= 0){
                                $(".loadingW").css("display", "none");
                                common.mes_alert({msg: "지시수량을 0 또는 0보다 작은 숫자로 저장이 불가능합니다."});
                                //포커스, 색깔강조
                                return;
                            }
                            ajaxArgs.param.where[i][key] = getchange[j][key];
                        }
                    }
                }
            }else if(ajaxArgs.param.where[i]['cu'] === 'c'){
                for(let changed_row of getchange) {
                    for (let comp of pageManager.gridManager.GridList[grid_id].CompulsoryFieldList) {
                        if (changed_row[comp] === undefined || changed_row[comp] === "") {
                            $(".loadingW").css("display", "none");
                            common.mes_alert({msg: "필수 입력항목이 입력되지 않았습니다."});
                            //포커스, 색깔강조
                            return;
                        }
                    }
                }
                for(let j=0; j<getchange.length; j++){
                    for(let key in getchange[j]){
                        if(key === "ordr_qty" && getchange[j][key] <= 0){
                            $(".loadingW").css("display", "none");
                            common.mes_alert({msg: "지시수량을 0 또는 0보다 작은 숫자로 저장이 불가능합니다."});
                            //포커스, 색깔강조
                            return;
                        }
                    }
                }
            }
            //wrk_ordr_dt : 지시일자 거르기
            if(ajaxArgs.param.where[i]['wrk_ordr_dt'] !== undefined){
                let date = ajaxArgs.param.where[i]['wrk_ordr_dt'];
                if(date < now){
                    $(".loadingW").css("display", "none");
                    mes_alert({msg : ajaxArgs.param.where[i]['recid']+'번 행의 지시일자가 현재날짜보다 크거나 같아야합니다.'},{msg : ''});
                    return false;
                }
            }
            //지시상태코드 대기일때만 수정 삭제 가능
            if(ajaxArgs.param.where[i]['wrk_ordr_status'] !== '대기' && ajaxArgs.param.where[i]['wrk_ordr_status'] !== undefined){
                $(".loadingW").css("display", "none");
                mes_alert({msg : ajaxArgs.param.where[i]['recid']+'번 행의 지시상태코드가 진행 및 완료 상태입니다.'},{msg : '저장 및 수정이 불가능합니다.'});
                return false;
            }
        }
        console.log(ajaxArgs);
        let ajax_args = ScriptHelper.AjaxArgumentBuild(ajaxArgs, btn_id, location.pathname);

        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
            .then((res)=>
            {
                $(".loadingW").css("display", "none");
                console.log(res, 'after ajax');
                if(res.data[0][0]['out_result'] === '0'){
                    common.success_msg(res.msg);
                    let btn_id = Const.MesButton.Search;
                    let rest_url =  pageManager.gridManager.GetAjaxUrl(grid_id, btn_id);
                    let param = w2ui[grid_id].lastGetParam.param;
                    if(JSON.stringify(param) === "{}"){
                        param = FormHelper.SerializeForm(search_frm_id);
                    }
                    let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);
                    ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
                        .then((data)=>{
                            let record_data = data.data;
                            //CheckBox의 설정값을 가져옴 Y는 true / N은 false
                            let check_info_obj = pageManager.gridManager.GridList[grid_id].CheckBoxConfigList;
                            //받아온 데이터에 RecID를 붙힘
                            W2UiHelper.AddRecID(record_data);
                            W2UiHelper.CheckBoxDataConvertToGridFormat(record_data, check_info_obj);
                            w2ui[grid_id].records = record_data;
                            w2ui[grid_id].reload(true);

                        }).fail(ScriptHelper.OnAjaxFail);
                }else if(res.data[0][0]['out_result'] === '-1'){
                    common.mes_alert(res.data[0][0]['out_message']);
                }
            })
            .fail(ScriptHelper.OnAjaxFail);

    });


    $("#hBtnB0008").on("click", (event)=>{
        console.log(event);
        $("#w2ui_popup").w2popup();
        $('.w2ui-popup-title').html('생산계획 복사');
    });

    // document.querySelector('#copy').addEventListener('click', function(){
    //     console.log('clicked');
    // });

    $("body").delegate("#copy", "click", function(){
        let form_id = $("#pop_copy");
        let param = FormHelper.SerializeForm(form_id[0].id);
        //console.log(param);
        if(param.where['date3'] === undefined || param.where['date4'] === undefined){
            alert("날짜를 입력해주세요!");
            return false;
        }
        let now_date = new Date();
        let y = now_date.getFullYear();
        let m = (now_date.getMonth() + 1) < 10 ? '0' + (now_date.getMonth() + 1) : (now_date.getMonth() + 1);
        let d = now_date.getDate() < 10 ? '0' + now_date.getDate() : now_date.getDate();
        let result = y+'-'+m+'-'+d;
        if(param.where['date3'] > result){
            alert("기준일자는 현재 및 과거날짜로 설정해야합니다!");
            return false;
        }
        if(param.where['date3'] >= param.where['date4']){
            alert("계획일자는 기준일자보다 미래날짜로 설정해야합니다!");
            return false;
        }

        let btn_id = 'hBtnB0008';
        let rest_url = '/ajax/production/plan/copy';

        let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);
        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
            .then((res)=>{
                console.log(res);
                if(res.result){
                    common.success_msg(res.msg);
                }else{
                    common.mes_alert(res.data[0]['out_message']);
                }
                w2popup.close();
            }).fail(ScriptHelper.OnAjaxFail);
    });



});

// function copy() {
//     console.log('test');
// }
