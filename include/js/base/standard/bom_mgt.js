import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'fact_cd', caption: '공장', size: '80px', sortable: true, resizable: true},
            { field: 'account_type', caption: '계정유형', size: '70px', sortable: true, resizable: true},
            { field: 'prt_nbr_cd', caption: '제품품번', size: '100px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '제품명', size: '190px', sortable: true, resizable: true},
            { field: 'spec', caption: '제품규격', size: '150px', sortable: true, resizable: true},
            { field: 'bom_yn', caption: 'BOM여부', size: '70px', sortable: true, resizable: true,editable: { type: 'checkbox' },attr:"align=center"},
        ],
        rowOnClickConfig : {
            [Const.config.rowOnClickConfig.funcType] : [Const.config.rowOnClickConfig.funcOption.detail_tree],
            [Const.config.rowOnClickConfig.clickTargetGrid] : ["grid02"],
            [Const.config.rowOnClickConfig.clickWhereFieldList] : ["fact_cd", "prt_nbr_cd"],
            [Const.config.rowOnClickConfig.url] : "/ajax/base/standard/get/bom",
            [Const.config.rowOnClickConfig.detailTreeRootColumnValue] : "mprt_nbr",
            [Const.config.rowOnClickConfig.detailTreeParentColumn] : "mprt_nbr",
            [Const.config.rowOnClickConfig.detailTreeChildrenColumn] : "sprt_nbr",
        },
        lastGetParam : {
            param : {},
        },
    }

    let grid02 = {
        name: 'grid02',
        columns: [
            { field: 'level', caption: 'level', size: '50px', sortable: true, resizable: true },
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, hidden:true},
            { field: 'mprt_nbr', caption: '모품번', size: '120px', sortable: true, resizable: true},
            { field: 'mprt_nbr_nm', caption: '모품번명', size: '120px', sortable: true, resizable: true},
            { field: 'mprt_nbr_spec', caption: '모품번규격', size: '100px', sortable: true, resizable: true},
            { field: 'base_qty', caption: '기준수량', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'base_unit', caption: '기준단위', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'sprt_nbr', caption: '자품번', size: '120px', sortable: true, resizable: true},
            { field: 'sprt_nbr_nm', caption: '자품번명', size: '120px', sortable: true, resizable: true},
            { field: 'sprt_nbr_spec', caption: '자품번규격', size: '100px', sortable: true, resizable: true},
            { field: 'cmpnt_qty', caption: '하위구성수량', size: '100px', sortable: true, resizable: true ,attr:"align=right"},
            { field: 'cmpnt_unit', caption: '하위구성단위', size: '100px', sortable: true, resizable: true},
            { field: 'leaf_yn', caption: '말단여부', size: '100px', sortable: true, resizable: true,editable: { type: 'checkbox' }},
        ],
        fncSeletedGridID : function () {
            Const.SelectedGridID = grid01.name;
        },
        //RowOnClickDetailTree
        fncPostROCDT : function () {
            let len = w2ui[this.name].records.length;
            if(len > 0){
                let str = 'grid_'+this.name+'_rec_1';
                $("#"+str).click();
            }
        }
    }
    W2UiHelper.CheckBoxInputRenderFunc(grid01,["bom_yn"]);

    let detail_frm_id = "detail_frm";

    let search_frm_id = "search_frm";
    let bnt_frm_id = "hbtn_frm";
    let page_addr_name = "bom_mgt";
    let pageManager = new GridPageManager(search_frm_id, bnt_frm_id, page_addr_name);

    //search_frm 에서의 popup
    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id, "pop_prt_nbr_cd",{cd : [31]});
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
    pop_prt_nbr_cd.AddTargetColumnsOnPopupClose(["prt_nbr_cd","prt_nbr_nm","account_type"], ["mprt_nbr_cd","mprt_nbr_nm","maccount_type"]);

    //detail_frm 에서의 popup
    let pop_prt_nbr_cd2 = new Pop_prt_nbr_cd(pageManager, detail_frm_id, "pop_prt_nbr_cd2",{cd : [11,12,21]});
    pop_prt_nbr_cd2.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);

    //1번 그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/base/standard/get/bom_mgt");

    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm");

    pageManager.gridManager.AddCheckRenderOption(grid01.name,"bom_yn", "Y", "N");

    //1번 그리드 등록
    grid02 = pageManager.gridManager.AddGrid(grid02);

    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"cmpnt_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddCheckRenderOption(grid02.name,"leaf_yn", "Y", "N");


    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    pageManager.frmManager.AddForm(detail_frm_id);

    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(detail_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(detail_frm_id,"name","cmpnt_unit", common.code, {up_cd: "unit_cd"},"cd", "cd_nm", "", "");

    //폼 팝업 등록
    let caller_name = "pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name,[]);

    //폼 팝업 등록
        caller_name = "detail_pop_prt_nbr_cd";
        target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(detail_frm_id, caller_name, pop_prt_nbr_cd2.ShowFormDialog, target_name,[]);


    //그리드 초기화..
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //버튼함수와 연결...
    pageManager.BindButtonFunction([Const.MesButton.AddRow, Const.MesButton.Save, Const.MesButton.DeleteRow]);

    //그리드 초기화...
    pageManager.InitializeComponent();

    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});

    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;

    grid01.onClick = W2UiHelper.RowOnClick;

    let grid02_click = function(){
        let recid = w2ui[grid02.name].last.click_recid;
        let records = w2ui[grid02.name].records;
        let number = 0;
        for(let i=0; i<records.length; i++){
            if(records[i]["recid"] == recid){
                number = i;
            }
        }

        $("#"+detail_frm_id+" [name = 'mprt_nbr_cd']").val(records[number]['mprt_nbr']);
        $("#"+detail_frm_id+" [name = 'mprt_nbr_nm']").val(records[number]['mprt_nbr_nm']);
        $("#"+detail_frm_id+" [name = 'base_qty']").val(records[number]['base_qty']);

        $("#"+detail_frm_id+" [name = 'sprt_nbr_cd']").val(records[number]['sprt_nbr']);
        $("#"+detail_frm_id+" [name = 'sprt_nbr_nm']").val(records[number]['sprt_nbr_nm']);
        $("#"+detail_frm_id+" [name = 'cmpnt_qty']").val(records[number]['cmpnt_qty']);
        $("#"+detail_frm_id+" [name = 'cmpnt_unit']").val(records[number]['cmpnt_unit']);
    }

    w2ui[grid02.name].on("collapse", function (event) {
        //console.log(event);
        $("#grid_"+grid02.name+"_rec_"+event.recid).click();
    });

    //add
    $("#hBtnB0003").on("click", function(){
        if(Const.SelectedGridID === 'grid02'){
            let recid = w2ui[grid02.name].last.click_recid;
            let records = w2ui[grid02.name].records;
            let number = 0;
            for(let i=0; i<records.length; i++){
                if(records[i]["recid"] == recid){
                    number = i;
                }
            }

            $("#"+detail_frm_id+" [name = 'mprt_nbr_cd']").val(records[number]['sprt_nbr']);
            $("#"+detail_frm_id+" [name = 'mprt_nbr_nm']").val(records[number]['sprt_nbr_nm']);
            $("#"+detail_frm_id+" [name = 'base_qty']").val(records[number]['cmpnt_qty']);

            $("#"+detail_frm_id+" [name = 'sprt_nbr_cd']").val('');
            $("#"+detail_frm_id+" [name = 'sprt_nbr_nm']").val('');
            $("#"+detail_frm_id+" [name = 'cmpnt_qty']").val('');
            $("#"+detail_frm_id+" [name = 'cmpnt_unit']").val('');

        }else{
            mes_alert({msg : '첫번째 테이블은 새로운 행 추가가 불가능합니다.'},{msg : ''});
            return false;
        }
    });
    //delete
    $("#hBtnB0004").on("click", function(){
        let message = '선택된 품목의 하위 품목까지 일괄삭제됩니다.<br/>그래도 진행하시겠습니까?';
        w2confirm(message)
            .yes(() => {
                $(".loadingW").css("display", "");
                let g2_recid = w2ui[grid02.name].last.click_recid;
                let g2_records = w2ui[grid02.name].records;
                let number = 0;
                for(let i=0; i<g2_records.length; i++){
                    if(g2_records[i]["recid"] == g2_recid){
                        number = i;
                    }
                }

                let data = w2ui[grid02.name].records[number];

                let btn_id = Const.MesButton.DeleteRow;
                let rest_url = '/ajax/base/standard/delete/bom_mgt';

                let param = {};
                param['fact_cd'] = data["fact_cd"];
                param['mprt_nbr'] = data["mprt_nbr"];
                param['sprt_nbr'] = data["sprt_nbr"];

                let param_arr = [param];

                let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);

                ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
                    .then((res)=>
                    {
                        $(".loadingW").css("display", "none");
                        console.log(res);
                        if(!res.result){
                            mes_alert({msg : res.msg},{msg : ''});
                        }else{
                            common.success_msg(res.msg);
                            //grid01 클릭효과주기
                            let g1_recid = w2ui[grid01.name].last.click_recid;
                            $("#grid_grid01_rec_"+g1_recid).click();
                        }
                    })
                    .fail(ScriptHelper.OnAjaxFail);
            })
            .no(function(){
                return false;
            });

    });

    //insert
    $("#hBtnB0005").on("click", function(){
        $(".loadingW").css("display", "");
        let number = w2ui[grid01.name].last.click_recid-1;
        let records = w2ui[grid01.name].records;

        let fact_cd = records[number]['fact_cd'];

        let mprt_nbr = $("#"+detail_frm_id+" [name = 'mprt_nbr_cd']").val();
        let base_qty = $("#"+detail_frm_id+" [name = 'base_qty']").val();
        let base_unit = $("#"+detail_frm_id+" [name = 'base_unit']").val();

        let sprt_nbr = $("#"+detail_frm_id+" [name = 'sprt_nbr_cd']").val();
        let cmpnt_qty = $("#"+detail_frm_id+" [name = 'cmpnt_qty']").val();
        let cmpnt_unit = $("#"+detail_frm_id+" [name = 'cmpnt_unit']").val();

        if(cmpnt_qty === ""){
            $(".loadingW").css("display", "none");
            mes_alert({msg : '자품목 소요량 수가 입력되어있지 않습니다.'},{msg : '입력 후 시도해주십시오.'});
            return false;
        }

        if(cmpnt_unit === ""){
            $(".loadingW").css("display", "none");
            mes_alert({msg : '자품목 소요량 단위가 입력되어있지 않습니다.'},{msg : '입력 후 시도해주십시오.'});
            return false;
        }

        let btn_id = Const.MesButton.Save;
        let rest_url = '/ajax/base/standard/save/bom_mgt';

        let param = {};
        param['fact_cd'] = fact_cd;
        param['mprt_nbr'] = mprt_nbr;
        param['base_qty'] = base_qty;
        param['base_unit'] = base_unit;
        param['sprt_nbr'] = sprt_nbr;
        param['cmpnt_qty'] = cmpnt_qty;
        param['cmpnt_unit'] = cmpnt_unit;

        let param_arr = [param];

        let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);

        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
            .then((res)=>
            {
                $(".loadingW").css("display", "none");
                console.log(res, 'after ajax');
                $(".loadingW").css("display", "none");
                if(res.data[0]['out_result'] === '-1'){
                    let str = res.data[0]['out_message'];
                    mes_alert({msg : str},{msg : ''});
                }else if(res.data[0]['out_result'] === '0'){
                    common.success_msg(res.msg);
                    //grid01 클릭효과주기
                    let g1_recid = w2ui[grid01.name].last.click_recid;
                    $("#grid_grid01_rec_"+g1_recid).click();
                }
            })
            .fail(ScriptHelper.OnAjaxFail);

    });

    grid02.onClick = grid02_click;
});
