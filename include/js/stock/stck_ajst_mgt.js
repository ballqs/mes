import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";


$(function () {

    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            { field: 'taking_gbn_cd', caption: '재고조사구분', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            { field: 'taking_ymd', caption: '재고조사일자', size: '100px', sortable: true, resizable: true, attr:"align=center", editable: {type: 'date'}},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '100px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '150px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true},
            { field: 'lotno', caption: 'LOT NO', size: '70px', sortable: true, resizable: true},
            { field: 'whs_cd', caption: '창고', size: '100px', sortable: true, resizable: true},
            { field: 'whs_nm', caption: '창고명', size: '100px', sortable: true, resizable: true},
            { field: 'loc_cd', caption: '위치', size: '100px', sortable: true, resizable: true},
            { field: 'loc_nm', caption: '위치명', size: '100px', sortable: true, resizable: true},
            { field: 'stck_unit', caption: '재고단위', size: '70px', sortable: true, resizable: true, attr:"align=center", editable: {type: 'select'}},
            { field: 'cur_stck_qty', caption: '재고수량', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'taking_qty', caption: '실사수량', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'adjst_qty', caption: '조정수량', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'aply_yn', caption: '실사반영여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center' ,editable: {type: 'checkbox'}},
            { field: 'updt_id', caption: '입력자 ID', size: '100px', sortable: true, resizable: true},
            { field: 'updt_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center' },

        ],
    };

    W2UiHelper.CheckBoxInputRenderFunc(grid01,["aply_yn"]);

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);

    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);

    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);


    //1번 그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);

    //PK, 필수입력, ReadOnly 필드등록
    pageManager.gridManager.SetPkFields(grid01.name, ["fact_cd"]);
    pageManager.gridManager.SetReadonlyFields(grid01.name, ["taking_gbn_cd","taking_ymd","stck_unit"]);

    pageManager.gridManager.SetSelectionCheckField(grid01.name,"chk");

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/stock/stck_ajst/get/stck_ajst_mgt_mes");
    //pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/stock/stck_ajst/save/stck_ajst_mgt");

    //콤보박스 헨더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name, "taking_gbn_cd", common.code, {up_cd: "taking_gbn_cd"},"cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name, "stck_unit", common.code, {up_cd: "unit_cd"},"cd", "cd_nm");


    pageManager.gridManager.AddCheckRenderOption(grid01.name,"aply_yn", "Y", "N");

    //체크박스 T/F 정보 등록
    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);

    //콤보박스(폼) 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");

    //폼 팝업 등록
    let caller_name = "btn_pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);

    //버튼함수와 연결
    pageManager.BindButtonFunction([Const.MesButton.Save]);

    //그리드 초기화
    pageManager.InitializeComponent();

    //div에 클릭펑션 먹인거...
    $("#grid01").on(Const.HtmlEvent.click, function () { Const.SelectedGridID = grid01.name; });

    //선택한 그리드 초기화
    Const.SelectedGridID = grid01.name;


    $(`#${btn_frm_id} [name='${Const.MesButton.Save}']`).on(Const.HtmlEvent.click, ()=>{

        let records = w2ui["grid01"].records;
        let data = [];
        for(let i=0; i<records.length; i++){
            if(records[i]["w2ui"] !== undefined){
                if(records[i]["w2ui"]["changes"]["chk"] === true){
                    if(records[i]["adjst_qty"] === 0){
                        w2ui["grid01"].records = temp_records;
                        w2ui["grid01"].refresh();
                        $(".loadingW").css("display", "none");
                        mes_alert({msg : '조정할 수량이 없습니다.'},{msg : ''});
                        return false;
                    }else{
                        if(records[i]["w2ui"]["changes"]["taking_qty"] !== undefined){
                            records[i]["taking_qty"] = records[i]["w2ui"]["changes"]["taking_qty"];
                        }
                        data.push(records[i]);
                    }
                }
            }
        }
        let check_value = $("#search_frm input:radio[name=dsp_gbn]:checked").val();

        let form_data = {
            "dsp_gbn" : check_value,
        }
        data.push(form_data);
        console.log(data);

        let param = {
            param: [data],
            cnct_btn: "B0005",
            cnct_url: location.pathname,
        };

        console.log(param);

        let rest_url = "/ajax/stock/stck_ajst/save/stck_ajst_mgt_mes";

        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, param)
            .then((res)=>{
                console.log(res);
                pageManager.BtnFuncList.search(event, false);
                common.success_msg(res.msg);
            })
            .fail(ScriptHelper.OnAjaxFail);
    });

});