import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_op_cd from "/include/js/popups/pop_op_cd.js";

$(function () {

    let grid01 = {
        name: 'grid01',
        header: '공정별 작업장 현황',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'fact_cd', caption: '공장코드', size: '150px', sortable: true, resizable: true, hidden: true},
            { field: 'fact_nm', caption: '공장', size: '80px', sortable: true, resizable: true, hidden: true},
            { field: 'op_cd', caption: '공정코드', size: '100px', sortable: true, resizable: true},
            { field: 'op_nm', caption: '공정', size: '100px', sortable: true, resizable: true},
            { field: 'wrkctr_cd', caption: '작업장코드', size: '100px', sortable: true, resizable: true},
            { field: 'wrkctr_nm', caption: '작업장', size: '100px', sortable: true, resizable: true},
            { field: 'main_wrkr', caption: '주작업자코드', size: '150px', sortable: true, resizable: true},
            { field: 'main_wrkr_nm', caption: '주작업자', size: '150px', sortable: true, resizable: true},
            { field: 'wrkctrwrkr_count', caption: '작업자수', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
        ],

    };

    let grid02 = {
        name: 'grid02',
        header: '공정별 작업자',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'op_cd', caption: '공정', size: '100px', sortable: true, resizable: true},
            { field: 'op_nm', caption: '공정명', size: '100px', sortable: true, resizable: true},
            { field: 'wrkr', caption: '작업자코드', size: '100px', sortable: true, resizable: true},
            { field: 'wrkr_nm', caption: '작업자', size: '100px', sortable: true, resizable: true},
        ],

    };

    let grid03 = {
        name: 'grid03',
        header: '작업장 작업자',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'op_cd', caption: '공정코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'op_nm', caption: '공정', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'wrkctr_cd', caption: '작업장코드', size: '100px', sortable: true, resizable: true},
            { field: 'wrkctr_nm', caption: '작업장', size: '100px', sortable: true, resizable: true},
            { field: 'wrkr_cd', caption: '작업자코드', size: '100px', sortable: true, resizable: true},
            { field: 'wrkr_nm', caption: '작업자', size: '100px', sortable: true, resizable: true},
            { field: 'main_wrkr_yn', caption: '주작업자', size: '100px', sortable: true, resizable: true,editable: { type: 'checkbox' }},
        ],

    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "wrkctr_wrkr_mgt";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id,page_addr_name);
    let pop_op_cd = new Pop_op_cd(pageManager, search_frm_id);
    pop_op_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);

    grid01 = pageManager.gridManager.AddGrid(grid01);

    //pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "op_cd", "wrkctr_cd"]);
    //pageManager.gridManager.SetReadonlyFields(grid01.name, ["recid","fact_cd","fact_nm","op_cd","op_nm","wrkctr_cd","wrkctr_nm","main_wrkr","main_wrkr_nm","wrkctrwrkr_count"]);

    //버튼에 대한 url 등록
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/base/product/get/wrkctr_wrkr_mgt");
    //pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/base/product/delete/wrkctr_wrkr_mgt");
    //pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/base/product/save/wrkctr_wrkr_mgt");


    grid02 = pageManager.gridManager.AddGrid(grid02);

    //pageManager.gridManager.SetReadonlyFields(grid02.name, ["recid","fact_cd","op_cd","op_nm","wrkr","wrkr_nm"]);

    pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.Search, "/ajax/base/product/get/wrkctr_wrkr");

    grid03 = pageManager.gridManager.AddGrid(grid03);

    //pageManager.gridManager.SetReadonlyFields(grid03.name, ["recid","fact_cd","op_cd","op_nm","wrkctr_cd","wrkctr_nm","wrkr_cd","wrkr_nm"]);

    pageManager.gridManager.AddCheckRenderOption(grid03.name,"main_wrkr_yn", "Y", "N");

    pageManager.gridManager.SetAjaxUrl(grid03.name, Const.MesButton.Search, "/ajax/base/product/get/wrkctr_wrkr_list");
    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //폼 팝업 등록
    let caller_name = "pop_op_cd";
    let target_name = ["op_cd","op_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_op_cd.ShowFormDialog, target_name);

    //버튼함수와 연결
    pageManager.BindButtonFunction([Const.MesButton.Save]);
    //그리드 초기화
    pageManager.InitializeComponent();

    let grid01_click = function(event) {
        let record = this.get(event.recid);
        if(record.op_cd !== undefined && record.wrkctr_cd !== undefined){
            w2ui['grid02'].clear();
            w2ui['grid03'].clear();

            let param = {
                where : {
                    fact_cd: record.fact_cd,
                    op_cd: record.op_cd,
                    wrkctr_cd: record.wrkctr_cd,
                }
            };

            Const.SelectedGridID = "grid02";
            pageManager.gridManager.SetSearchParam("grid02",param);
            pageManager.BtnFuncList.search(event,true);


            Const.SelectedGridID = "grid03";
            pageManager.gridManager.SetSearchParam("grid03",param);
            pageManager.BtnFuncList.search(event,true);


            Const.SelectedGridID = event.target;

            //let rest_url = pageManager.gridManager.GetAjaxUrl("grid02", Const.MesButton.Search);


            // ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, param)
            //     .then((res)=>{
            //         let data1 = W2UiHelper.AddRecID(res.data[0]);
            //         let data2 = W2UiHelper.AddRecID(res.data[1]);
            //         // data2로 바로 들어가지는 경우를 대비해서 records에 담아둘것
            //         //data1.splice(0,1);
            //         //console.log(data1);
            //         console.log(data2);
            //         for(let i=0; i<data2.length; i++){
            //             if(data2[i]["main_wrkr_yn"] === "Y"){
            //                 data2[i]["main_wrkr_yn"] = true;
            //             }else if(data2[i]["main_wrkr_yn"] === "N"){
            //                 data2[i]["main_wrkr_yn"] = false;
            //             }
            //         }
            //         if(data1.length > 0 && data2.length > 0){
            //             for(let i=0; i<data1.length; i++){
            //                 for(let j=0; j<data2.length; j++){
            //                     if(data1[i]['wrkr'] == data2[j]['wrkr_cd']){
            //                         data1.splice(i,1);
            //                     }
            //                 }
            //             }
            //         }
            //         // res.data = W2UiHelper.AddRecID(res.data);
            //         w2ui['grid02'].records = data1;
            //         w2ui['grid03'].records = data2;
            //         // w2ui['grid02'].records = [];
            //         // for (let item of res.data){
            //         //     w2ui['grid02'].records.push(item);
            //         // }
            //         w2ui['grid02'].refresh();
            //         w2ui['grid03'].refresh();
            //     })
            //     .fail(ScriptHelper.OnAjaxFail);
        }
    };

    let grids_refresh = function(){
        w2ui.grid02.records = W2UiHelper.AddRecID(w2ui.grid02.records);
        w2ui.grid03.records = W2UiHelper.AddRecID(w2ui.grid03.records);
        w2ui['grid02'].refresh();
        w2ui['grid03'].refresh();
    };


    let grid02_dblclick =  function (event) {
        let record = this.get(event.recid);
        w2ui['grid02'].remove(record.recid);
        record.wrkr_cd = record.wrkr;
        record.wrkctr_cd = w2ui.grid01.records[w2ui.grid01.getSelection()-1]['wrkctr_cd'];
        record.wrkctr_nm = w2ui.grid01.records[w2ui.grid01.getSelection()-1]['wrkctr_nm'];
        record.main_wrkr_yn = false;
        w2ui['grid03'].records.push(record);
        grids_refresh();
    }
    let grid03_dblclick =  function (event) {
        let record = this.get(event.recid);
        w2ui['grid03'].remove(record.recid);
        record.wrkr = record.wrkr_cd;
        w2ui['grid02'].records.push(record);
        grids_refresh();
    }

    grid01.onClick= grid01_click;
    grid02.onDblClick= grid02_dblclick;
    grid03.onDblClick= grid03_dblclick;

    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});
    $("#grid03").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid03.name;});


    $(`#${btn_frm_id} [name='${Const.MesButton.Save}']`).off();
    $(`#${btn_frm_id} [name='${Const.MesButton.Save}']`).on(Const.HtmlEvent.click, ()=>{
        $(".loadingW").css("display", "");
        if(w2ui['grid03'].records.length === 0){
            $(".loadingW").css("display", "none");
            mes_alert({msg : '선택된 작업자가 아무도 없습니다.'});
            return false;
        }
        let param = {
            param: [w2ui['grid03'].records],
            cnct_btn: "B0005",
            cnct_url: location.pathname,
        };
        //★저장하기 전 grid03에서 주작업자가 선택된 수가 2명 이상일때 처리 로직
        let count = 0;
        console.log(w2ui['grid03'].records);

        for(let i=0; i<w2ui['grid03'].records.length; i++){
            if(w2ui.grid03.records[i]["w2ui"] !== undefined){
                if(w2ui.grid03.records[i]["w2ui"].changes["main_wrkr_yn"] === true){
                    count++;
                }
            }else if(w2ui.grid03.records[i]["main_wrkr_yn"] === true){
                count++;
            }
        }
        if(count > 3){
            $(".loadingW").css("display", "none");
            mes_alert({msg : '선택된 주 작업자 수가 3명 이하여야 합니다.'});
            return false;
        }
        if(count === 0){
            $(".loadingW").css("display", "none");
            mes_alert({msg : '선택된 주 작업자가 없습니다.'});
            return false;
        }
        //위의 if문을 통과시 문제 없는 것으로 판단
        for(let i=0; i<w2ui['grid03'].records.length; i++){
            if(w2ui.grid03.records[i]["w2ui"] !== undefined){
                if(w2ui.grid03.records[i]["w2ui"].changes["main_wrkr_yn"] === true){
                    w2ui.grid03.records[i]["main_wrkr_yn"] = 'Y';
                    w2ui.grid03.records[i]["w2ui"] = undefined;
                }else if(w2ui.grid03.records[i]["w2ui"].changes["main_wrkr_yn"] === false){
                    w2ui.grid03.records[i]["main_wrkr_yn"] = 'N';
                    w2ui.grid03.records[i]["w2ui"] = undefined;
                }
            }else{
                if(w2ui.grid03.records[i]["main_wrkr_yn"] === true){
                    w2ui.grid03.records[i]["main_wrkr_yn"] = 'Y';
                }else if(w2ui.grid03.records[i]["main_wrkr_yn"] === false){
                    w2ui.grid03.records[i]["main_wrkr_yn"] = 'N';
                }
            }
        }
        $.ajax({
            // application\controllers\ajax\base\Product.php
            url: "/ajax/base/product/save/wrkctr_wrkr_mgt",
            data: param,
            type:"post",
            dataType:"json",
            success: function (data) {
                console.log(data);
                console.log(param);
                for(let i=0; i<w2ui['grid03'].records.length; i++){
                    if(w2ui.grid03.records[i]["main_wrkr_yn"] === 'Y'){
                        w2ui.grid03.records[i]["main_wrkr_yn"] = true;
                    }else if(w2ui.grid03.records[i]["main_wrkr_yn"] === 'N'){
                        w2ui.grid03.records[i]["main_wrkr_yn"] = false;
                    }
                }
                w2ui.grid03.refresh();
                let parameter = FormHelper.SerializeForm(search_frm_id);
                let btn_id = Const.MesButton.Search;
                let ajax_args = ScriptHelper.AjaxArgumentBuild(parameter, btn_id, location.pathname);
                //공정에 입력칸을 넣고 검색 후 작업한 다음에 저장시 grid01에 나온 데이터에 이변없이 변화된것만 바꾸게 할 것
                let reload = pageManager.gridManager.GetAjaxUrl("grid01", Const.MesButton.Search);
                ScriptHelper.AjaxCall(reload, Const.AjaxMethod.GET, ajax_args)
                    .then((res)=>{
                        $(".loadingW").css("display", "none");
                        w2ui['grid01'].records = W2UiHelper.AddRecID(res.data);
                        w2ui['grid01'].refresh();
                    })
                    .fail(ScriptHelper.OnAjaxFail);
                Const.SelectedGridID = grid01.name;
            },
            error: function (a,b,c) {
                $(".loadingW").css("display", "none");
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });

    });


    //w2ui.grid01.onSelect = function (obj){$("#grid01").attr("selrow" , obj.recid);}

    Const.SelectedGridID = grid01.name;

});