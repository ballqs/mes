import GridPageManager from "/include/js/class/GridPageManager.js";
import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";
import Pop_op_cd from "/include/js/popups/pop_op_cd.js";
import Pop_biz_cd from "/include/js/popups/pop_biz_cd.js";

$(function () {
    //항상 젤 위에서 호출...
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' } },
            { field: 'fact_cd', caption: '공장', size: '80px', sortable: true, resizable: true, editable: { type: 'select'}},
            { field: 'mprt_nbr_cd', caption: '제품코드', size: '100px', sortable: true, resizable: true},
            { field: 'mprt_nbr_nm', caption: '제품명', size: '150px', sortable: true, resizable: true},
            { field: 'maccount_type', caption: '제품계정유형', size: '150px', sortable: true, resizable: true, hidden: true},
            { field: 'op_seq', caption: '공정순서', size: '100px', sortable: true, resizable: true,  style: 'text-align: right', editable: { type: 'text' }},
            { field: 'input_prt_nbr_cd', caption: '투입품번코드', size: '150px', sortable: true, resizable: true},
            { field: 'input_prt_nbr_nm', caption: '투입품번명', size: '150px', sortable: true, resizable: true},
            { field: 'input_spec', caption: '투입품번규격', size: '150px', sortable: true, resizable: true},
            { field: 'input_account_type', caption: '투입품번계정유형', size: '150px', sortable: true, resizable: true, hidden: true},
            { field: 'prd_prt_nbr_cd', caption: '생산품번코드', size: '150px', sortable: true, resizable: true},
            { field: 'prd_prt_nbr_nm', caption: '생산품번명', size: '150px', sortable: true, resizable: true},
            { field: 'prd_spec', caption: '생산품번규격', size: '150px', sortable: true, resizable: true},
            { field: 'prd_account_type', caption: '생산품번계정유형', size: '150px', sortable: true, resizable: true, hidden: true},
            { field: 'op_cd', caption: '공정코드', size: '100px', sortable: true, resizable: true},
            { field: 'op_nm', caption: '공정명', size: '100px', sortable: true, resizable: true},
            { field: 'outsorcng_yn', caption: '외주가공여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox' }
            },
            //거래처 biz_cd
            { field: 'outsorcng_cmpy', caption: '외주업체코드', size: '150px', sortable: true, resizable: true },
            { field: 'outsorcng_cmpy_nm', caption: '외주업체명', size: '150px', sortable: true, resizable: true },
            { field: 'final_op_yn', caption: '말공정 여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox' }
            },
            { field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox' }
            },
            { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text' }},
            { field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true},
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true},
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
        fncPrePopupOff : function(grid_id,row,col){
            // console.log(this);
            // console.log(grid_id);
            // console.log(row);
            // console.log(col);
            // let data = w2ui[this.name].records[row];
            if(col === 18){
                if(JSON.stringify(w2ui[grid_id].records[row]['w2ui']) == JSON.stringify({})){
                    if(w2ui[grid_id].records[row]['outsorcng_yn'] === false){
                        mes_alert({msg:"외주가공여부가 체크되어 있지 않습니다."},{msg:"체크 후 시도해주세요!"});
                        return {result : false};
                    }else if(w2ui[grid_id].records[row]['outsorcng_yn'] === true){
                        return {result : true};
                    }
                }

                if(w2ui[grid_id].records[row]['w2ui'] !== undefined){
                    if(w2ui[grid_id].records[row]['w2ui']['changes']['outsorcng_yn'] === false){
                        mes_alert({msg:"외주가공여부가 체크되어 있지 않습니다."},{msg:"체크 후 시도해주세요!"});
                        return {result : false};
                    }
                    if(w2ui[grid_id].records[row]['w2ui']['changes']['outsorcng_yn'] === true){
                        return {result : true};
                    }
                }
                if(w2ui[grid_id].records[row]['outsorcng_yn'] === true){
                    return {result : true};
                }
                if(w2ui[grid_id].records[row]['outsorcng_yn'] === false){
                    mes_alert({msg:"외주가공여부가 체크되어 있지 않습니다."},{msg:"체크 후 시도해주세요!"});
                    return {result : false};
                }
            }

            // if(w2ui[grid_id].columns[col]["field"] == "out_biz_cd"){
            //     mes_alert({msg:"발주처코드 또는 발주처명이 입력되어 있지 않습니다."},{msg:"입력 후 시도해주세요!"});
            //     return {result : false};
            // }
            return {result : true};
        },
    };

    let search_frm_id = "search_frm";
    let bnt_frm_id = "hbtn_frm";
    let page_addr_name = "part_nbr_rtg_mgt";
    let pageManager = new GridPageManager(search_frm_id, bnt_frm_id, page_addr_name);
    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id, "pop_prt_nbr_cd1",{cd : [31]});
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddTargetColumnsOnPopupClose(["prt_nbr_cd","prt_nbr_nm","account_type"], ["mprt_nbr_cd","mprt_nbr_nm","maccount_type"]);

    let pop_prt_nbr_cd2 = new Pop_prt_nbr_cd(pageManager, search_frm_id, "pop_prt_nbr_cd2",{cd : [11,12,21]});
    pop_prt_nbr_cd2.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd2.AddTargetColumnsOnPopupClose(["prt_nbr_cd","prt_nbr_nm","spec","account_type"], ["input_prt_nbr_cd","input_prt_nbr_nm","input_spec","input_account_type"]);

    let pop_prt_nbr_cd3 = new Pop_prt_nbr_cd(pageManager, search_frm_id, "pop_prt_nbr_cd3",{cd : [21,31]});
    pop_prt_nbr_cd3.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd3.AddTargetColumnsOnPopupClose(["prt_nbr_cd","prt_nbr_nm","spec","account_type"], ["prd_prt_nbr_cd","prd_prt_nbr_nm","prd_spec","prd_account_type"]);

    let pop_op_cd = new Pop_op_cd(pageManager, search_frm_id);
    pop_op_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
    pop_op_cd.AddTargetColumnsOnPopupClose(["op_cd","op_nm"], ["op_cd","op_nm"]);

    let pop_biz_cd = new Pop_biz_cd(pageManager, search_frm_id);
    pop_biz_cd.AddParentReferGridTag(["cmpny_cd"], ["cmpny_cd"]);
    pop_biz_cd.AddTargetColumnsOnPopupClose(["biz_cd","biz_nm"], ["outsorcng_cmpy","outsorcng_cmpy_nm"]);

    //1번 그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);
    //팝업등록
    pageManager.gridManager.AddPopUpOption(grid01.name,"mprt_nbr_cd", pop_prt_nbr_cd.PopupName);
    pageManager.gridManager.AddPopUpOption(grid01.name,"input_prt_nbr_cd", pop_prt_nbr_cd2.PopupName);
    pageManager.gridManager.AddPopUpOption(grid01.name,"prd_prt_nbr_cd", pop_prt_nbr_cd3.PopupName);
    pageManager.gridManager.AddPopUpOption(grid01.name,"op_cd", pop_op_cd.PopupName);
    pageManager.gridManager.AddPopUpOption(grid01.name,"outsorcng_cmpy", pop_biz_cd.PopupName);
    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");

    //PK
    pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "mprt_nbr_cd", "op_seq"]);
    //readOnly
    pageManager.gridManager.SetReadonlyFields(grid01.name, ["mprt_nbr_nm","input_prt_nbr_nm","input_spec","prd_prt_nbr_nm","prd_spec","op_nm"]);
    //필수입력
    pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["input_prt_nbr_cd","prd_prt_nbr_cd","op_cd"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/base/product/get/part_nbr_rtg_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/base/product/delete/part_nbr_rtg_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/base/product/save/part_nbr_rtg_mgt");
    //up_cd / cd : 복합키이며 up_cd는 부모가 누구인지 가르키는 것! 공장으로 치면 A공장/B공장 등 cd는 작업코드
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    pageManager.gridManager.AddCheckRenderOption(grid01.name,"outsorcng_yn", "Y", "N");
    pageManager.gridManager.AddCheckRenderOption(grid01.name,"use_yn", "Y", "N");
    pageManager.gridManager.AddCheckRenderOption(grid01.name,"final_op_yn", "Y", "N");

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스(폼) 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","cmpny_cd", common.code, {up_cd: "cmpny_cd"},"cd", "cd_nm");

    //폼 팝업 등록
    let caller_name = "btn_pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name,[]);

    //버튼함수와 연결...
    pageManager.BindButtonFunction([Const.MesButton.Save]);

    //그리드 초기화...
    pageManager.InitializeComponent();

    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});

    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;

    //save
    $("#hbtn_frm [name='hBtnB0005']").on("click", function(){
        $(".loadingW").css("display", "");
        let grid_id = Const.SelectedGridID;

        let btn_id = Const.MesButton.Save;
        let rest_url =  pageManager.gridManager.GetAjaxUrl(grid_id, btn_id);
        let param = pageManager.gridManager.GetSaveParam(grid_id);
        let getChangeData = w2ui[grid_id].getChanges();
        if(param.length > 0)
        {
            param = W2UiHelper.CheckBoxDataConvertToDBFormat(param, pageManager.gridManager.GridList[grid_id].CheckBoxConfigList);
            for(let row in param){
                if(param[row]['cu'] === 'c' || param[row]['cu'] === 'C'){

                    for(let j=0; j< getChangeData.length; j++){
                        if(param[row]['fact_cd'] == getChangeData[j]['fact_cd'] &&
                            param[row]['mprt_nbr_cd'] == getChangeData[j]['mprt_nbr_cd'] &&
                            param[row]['op_seq'] == getChangeData[j]['op_seq']){
                            param[row]['recid'] = getChangeData[j]['recid'];
                        }
                    }

                    if(param[row]['maccount_type'] !== '31'){
                        //에러
                        $(".loadingW").css("display", "none");
                        mes_alert({msg : param[row]['recid']+'번 제품명코드에 적혀있는 품번은 계정유형이 제품이여야 합니다.'},{msg : '제품 품번을 입력 후 다시 시도해주세요!'});
                        return false;
                    }
                    if(param[row]['input_account_type'] == '13' || param[row]['input_account_type'] == '31' || param[row]['input_account_type'] == '41'){
                        //에러
                        $(".loadingW").css("display", "none");
                        mes_alert({msg : param[row]['recid']+'번 투입품번코드에 적혀있는 품번은 계정유형이 원소재,부자재,반제품이여야 합니다.'},{msg : ''});
                        return false;
                    }
                    if(param[row]['prd_account_type'] == '11' || param[row]['prd_account_type'] == '12' || param[row]['prd_account_type'] == '13' || param[row]['prd_account_type'] == '41'){
                        //에러
                        $(".loadingW").css("display", "none");
                        mes_alert({msg : param[row]['recid']+'번 생산품번코드에 적혀있는 품번은 계정유형이 반제품,제품이여야 합니다.'},{msg : ''});
                        return false;
                    }
                }else if(param[row]['cu'] === 'u' || param[row]['cu'] === 'U'){

                    for(let j=0; j< w2ui[grid_id].records.length; j++){
                        if(param[row]['fact_cd'] == w2ui[grid_id].records[j]['fact_cd'] &&
                            param[row]['mprt_nbr_cd'] == w2ui[grid_id].records[j]['mprt_nbr_cd'] &&
                            param[row]['op_seq'] == w2ui[grid_id].records[j]['op_seq']){
                            param[row]['recid'] = w2ui[grid_id].records[j]['recid'];
                        }
                    }

                    if(param[row]['outsorcng_yn'] == 'N'){
                        param[row]["outsorcng_cmpy"] = '';
                    }

                    if(param[row]['maccount_type'] !== undefined){
                        if(param[row]['maccount_type'] !== '31'){
                            $(".loadingW").css("display", "none");
                            mes_alert({msg : param[row]['recid']+'번 제품명코드에 적혀있는 품번은 계정유형이 제품이여야 합니다.'},{msg : '제품 품번을 입력 후 다시 시도해주세요!'});
                            return false;
                        }
                    }
                    if(param[row]['input_account_type'] !== undefined){
                        if(param[row]['input_account_type'] == '13' || param[row]['input_account_type'] == '31' || param[row]['input_account_type'] == '41'){
                            $(".loadingW").css("display", "none");
                            mes_alert({msg : param[row]['recid']+'번 투입품번코드에 적혀있는 품번은 계정유형이 원소재,부자재,반제품이여야 합니다.'},{msg : ''});
                            return false;
                        }
                    }
                    if(param[row]['prd_account_type'] !== undefined){
                        if(param[row]['prd_account_type'] == '11' || param[row]['prd_account_type'] == '12' || param[row]['prd_account_type'] == '13' || param[row]['prd_account_type'] == '41'){
                            $(".loadingW").css("display", "none");
                            mes_alert({msg : param[row]['recid']+'번 생산품번코드에 적혀있는 품번은 계정유형이 반제품,제품이여야 합니다.'},{msg : ''});
                            return false;
                        }
                    }
                }
            }
            let param_arr = [param];
            let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);
            ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
                .then((res)=>
                {
                    console.log(res, 'after ajax');
                    pageManager.BtnFuncList.search(event, false);
                    $(".loadingW").css("display", "none");
                    common.success_msg(res.msg);
                })
                .fail(ScriptHelper.OnAjaxFail);
            // .fail(this.#on_ajax_error);
        }
    });

});