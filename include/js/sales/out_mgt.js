import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";

$(function () {

    let grid01 = {
        name: 'grid01',
        header: '출하',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'ship_no', caption: '출하번호', size: '150px', sortable: true, resizable: true},
            { field: 'prt_nbr_cd', caption: '품번', size: '180px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '180px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '180px', sortable: true, resizable: true},
            { field: 'ship_qty', caption: '출하수량', size: '100px', sortable: true, resizable: true,style: 'text-align: right'},
            { field: 'ship_unit', caption: '출하단위', size: '100px', sortable: true, resizable: true,hidden:true},
            { field: 'unit_nm', caption: '출하단위', size: '100px', sortable: true, resizable: true},
            { field: 'rls_qty', caption: '출고수량', size: '100px', sortable: true, resizable: true,style: 'text-align: right'},
            { field: 'whs_cd', caption: '창고', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'whs_nm', caption: '창고', size: '100px', sortable: true, resizable: true},
            { field: 'loc_cd', caption: '창고위치', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'loc_nm', caption: '창고위치', size: '100px', sortable: true, resizable: true},
            { field: 'biz_cd', caption: '거래처', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'biz_nm', caption: '거래처', size: '100px', sortable: true, resizable: true},
            { field: 'ship_cd', caption: '출고처현장', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'ship_nm', caption: '출고처현장', size: '100px', sortable: true, resizable: true},
        ],
        rowOnClickConfig : {
            [Const.config.rowOnClickConfig.funcType] : [Const.config.rowOnClickConfig.funcOption.detail],
            [Const.config.rowOnClickConfig.clickTargetGrid] : ["grid02"],
            [Const.config.rowOnClickConfig.clickWhereFieldList] : ["fact_cd", "prt_nbr_cd", "whs_cd", "loc_cd"],
            [Const.config.rowOnClickConfig.url] : "/ajax/sales/get/out_mgt_rowOnclick"
        },
        fncPostSearch : function (res) {
            if(res.data.length > 0){
                let search_id = "#grid_"+this.name+"_rec_1";
                $(search_id).click();
            }
        },
        fncPostRowOnClick : function () {
            let records_g2 = w2ui['grid02'].records;
            let records_g3 = w2ui['grid03'].records;
            let lotno_list = [];
            for(let i=0; i< records_g3.length; i++){
                lotno_list.push(records_g3[i]['lotno']);
            }
            let record_data = [];
            for(let i=0; i< records_g2.length; i++){
                if(lotno_list.indexOf(records_g2[i]['lotno']) === -1){
                    record_data.push(records_g2[i]);
                }
            }
            w2ui['grid02'].clear();
            w2ui['grid02'].records = W2UiHelper.AddRecID(record_data);
            w2ui['grid02'].refresh();
        },
    };

    let grid02 = {
        name: 'grid02',
        header: '재고',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center',editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'prt_nbr_cd', caption: '품번', size: '180px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '180px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '180px', sortable: true, resizable: true},
            { field: 'lotno', caption: 'lotno', size: '120px', sortable: true, resizable: true},
            { field: 'stck_qty', caption: '재고수량', size: '100px', sortable: true, resizable: true,style: 'text-align: right'},
            { field: 'stck_unit', caption: '재고단위', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'unit_nm', caption: '재고단위', size: '100px', sortable: true, resizable: true},
            { field: 'stck_whs_cd', caption: '창고', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'stck_whs_nm', caption: '창고', size: '100px', sortable: true, resizable: true},
            { field: 'stck_loc_cd', caption: '창고위치', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'stck_loc_nm', caption: '창고위치', size: '100px', sortable: true, resizable: true},
        ],
        fncRowOnClickSeletedGridID : function () {
            Const.SelectedGridID = 'grid01';
        }
    };

    let grid03 = {
        name: 'grid03',
        header: '출고등록',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center',editable: { type: 'checkbox' }},
            { field: 'prt_nbr_cd', caption: '품번', size: '180px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '180px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '180px', sortable: true, resizable: true},
            { field: 'lotno', caption: 'lotno', size: '120px', sortable: true, resizable: true},
            { field: 'ship_no', caption: '출하번호', size: '100px', sortable: true, resizable: true},
            { field: 'whs_cd', caption: '창고', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'whs_nm', caption: '창고', size: '100px', sortable: true, resizable: true},
            { field: 'loc_cd', caption: '창고위치', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'loc_nm', caption: '창고위치', size: '100px', sortable: true, resizable: true},
            //출고처현장???
            { field: 'ship_cd', caption: '출고처현장', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'ship_nm', caption: '출고처현장', size: '100px', sortable: true, resizable: true},
            { field: 'out_qty', caption: '출고수량', size: '100px', sortable: true, resizable: true,style: 'text-align: right'},
            { field: 'out_unit', caption: '출고단위', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'unit_nm', caption: '출고단위', size: '100px', sortable: true, resizable: true},
        ],
        fncRowOnClickSeletedGridID : function () {
            Const.SelectedGridID = 'grid01';
        }
    };

    let search_frm_id = "search_frm";
    let bnt_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, bnt_frm_id);

    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id, "pop_prt_nbr_cd", {cd : [31]});
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);

    grid01 = pageManager.gridManager.AddGrid(grid01);

    grid02 = pageManager.gridManager.AddGrid(grid02);

    pageManager.gridManager.SetSelectionCheckField(grid02.name, "chk");

    grid03 = pageManager.gridManager.AddGrid(grid03);

    pageManager.gridManager.SetSelectionCheckField(grid03.name, "chk");

    pageManager.frmManager.AddForm(search_frm_id);
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","cmpny_cd", common.code, {up_cd: "cmpny_cd"}, "cd", "cd_nm");

    let caller_name = "pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd", "prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);

    //버튼함수 연결
    pageManager.BindButtonFunction([Const.MesButton.Search,Const.MesButton.AddRow,Const.MesButton.DeleteRow,Const.MesButton.Save]);
    //그리드 초기화...
    pageManager.InitializeComponent();

    grid01.onClick = W2UiHelper.RowOnClick;

    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});
    $("#grid03").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid03.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;

    let movedata = [];

    $("#hbtn_frm [name='hBtnB0001']").on("click", function(){
        let btn_id = Const.MesButton.Search;
        let param = FormHelper.SerializeForm(search_frm_id);
        let rest_url = "/ajax/sales/get/out_mgt";

        let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);

        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
            .then((res)=>{
                console.log(res);
                if(res.result){
                    w2ui['grid01'].records = W2UiHelper.AddRecID(res.data);
                    w2ui['grid01'].reload(true);
                    common.success_msg(res.msg);
                    if(w2ui['grid01'].hasOwnProperty("fncPostSearch") && typeof w2ui['grid01'].fncPostSearch == "function"){
                        w2ui['grid01'].fncPostSearch(res);
                    }
                }else{
                    mes_alert({msg: data.msg},{msg: ""});
                }
            })
            .fail(ScriptHelper.OnAjaxFail);
    });

    $("#hbtn_frm [name='hBtnB0003']").on("click", function(){

        let changes_g2 = w2ui['grid02'].getChanges();
        let records_g2 = w2ui['grid02'].records;
        let hap = 0;

        for(let item of changes_g2){
            console.log(item);
            if(item['chk']){
                hap = hap + Number(records_g2[item['recid'] - 1]['stck_qty']);
            }
        }
        console.log(hap);

        let last_click_g1 = w2ui['grid01'].last.click_recid - 1;
        let records_g1 = w2ui['grid01'].records;

        //추가 눌렀을때 재고에서 체크된 값과 출하값이 같은 경우만 추가 가능
        if(hap === Number(records_g1[last_click_g1]['ship_qty'])){
            let data_g1 = [];
            for(let i = 0; i < records_g1.length; i++){
                if(last_click_g1 !== records_g1[i]['recid'] - 1){
                    data_g1.push(records_g1[i]);
                }else{
                    movedata.push(records_g1[i]);
                }
            }
            console.log(movedata);
            w2ui['grid01'].clear();
            w2ui['grid01'].records = W2UiHelper.AddRecID(data_g1);
            w2ui['grid01'].refresh();

            point : for(let item of changes_g2){
                if(item['chk']){
                    let rec_id = w2ui['grid03'].records.length + 1;
                    w2ui['grid03'].add({recid: rec_id});
                    w2ui['grid03'].records[rec_id - 1].cu = 'C';

                    w2ui['grid03'].records[rec_id - 1].fact_cd = records_g2[item['recid'] - 1]['fact_cd'];
                    w2ui['grid03'].records[rec_id - 1].prt_nbr_cd = records_g2[item['recid'] - 1]['prt_nbr_cd'];
                    w2ui['grid03'].records[rec_id - 1].prt_nbr_nm = records_g2[item['recid'] - 1]['prt_nbr_nm'];
                    w2ui['grid03'].records[rec_id - 1].spec = records_g2[item['recid'] - 1]['spec'];
                    w2ui['grid03'].records[rec_id - 1].lotno = records_g2[item['recid'] - 1]['lotno'];
                    w2ui['grid03'].records[rec_id - 1].whs_cd = records_g2[item['recid'] - 1]['stck_whs_cd'];
                    w2ui['grid03'].records[rec_id - 1].whs_nm = records_g2[item['recid'] - 1]['stck_whs_nm'];
                    w2ui['grid03'].records[rec_id - 1].loc_cd = records_g2[item['recid'] - 1]['stck_loc_cd'];
                    w2ui['grid03'].records[rec_id - 1].loc_nm = records_g2[item['recid'] - 1]['stck_loc_nm'];
                    w2ui['grid03'].records[rec_id - 1].out_qty = records_g2[item['recid'] - 1]['stck_qty'];
                    w2ui['grid03'].records[rec_id - 1].out_unit = records_g2[item['recid'] - 1]['stck_unit'];
                    w2ui['grid03'].records[rec_id - 1].unit_nm = records_g2[item['recid'] - 1]['unit_nm'];

                    w2ui['grid03'].records[rec_id - 1].ship_no = records_g1[last_click_g1]['ship_no'];
                    w2ui['grid03'].records[rec_id - 1].ship_cd = records_g1[last_click_g1]['ship_cd'];
                    w2ui['grid03'].records[rec_id - 1].ship_nm = records_g1[last_click_g1]['ship_nm'];

                    w2ui['grid03'].refresh();
                }
            }
            w2ui['grid02'].clear();
        }else if(hap > Number(records_g1[last_click_g1]['ship_qty'])){
            mes_alert({msg:"출하에 클릭된 행의 출하수량보다 더 큽니다."},{msg:""});
            return {result : false};
        }else if(hap < Number(records_g1[last_click_g1]['ship_qty'])){
            mes_alert({msg:"출하에 클릭된 행의 출하수량보다 더 작습니다."},{msg:""});
            return {result : false};
        }

    });

    $("#hbtn_frm [name='hBtnB0004']").on("click", function(){
        w2confirm(Const.MesMsg.confirm)
            .yes(() => {
                let changes_g3 = w2ui['grid03'].getChanges();
                let records_g3 = w2ui['grid03'].records;
                let ship_no_list = [];
                for(let item of changes_g3){
                    if(item['chk']){
                        ship_no_list.push(records_g3[item['recid'] - 1]['ship_no']);
                    }
                }
                let records_g1 = w2ui['grid01'].records;
                let temp_list = [];
                for(let i=0; i<movedata.length; i++){
                    if(ship_no_list.indexOf(movedata[i]['ship_no']) !== -1){
                        records_g1.push(movedata[i]);
                    }else{
                        temp_list.push(movedata[i]);
                    }
                }
                movedata = temp_list;
                w2ui['grid01'].clear();
                w2ui['grid01'].records = W2UiHelper.AddRecID(records_g1);
                w2ui['grid01'].refresh();

                w2ui['grid02'].clear();

                let data = [];
                for(let i = 0; i< records_g3.length; i++){
                    if(ship_no_list.indexOf(records_g3[i]['ship_no']) === -1){
                        data.push(records_g3[i]);
                    }
                }
                w2ui['grid03'].clear();
                w2ui['grid03'].records = W2UiHelper.AddRecID(data);
                w2ui['grid03'].refresh();
            })
            .no(function(){
                return false;
            });
    });

    $("#hbtn_frm [name='hBtnB0005']").on("click", function(){
        let btn_id = Const.MesButton.Save;
        let rest_url = "/ajax/sales/save/out_mgt";
        let param = [];
            param[0] = $("#search_frm [name='fact_cd']").val();
            param[1] = w2ui['grid03'].records;
        if(param.length > 0){
            let param_arr = [param];
            let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);
            ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
                .then((res)=>
                {
                    //console.log(res);
                    if(res.result){
                        let btn_id = Const.MesButton.Search;
                        let param = FormHelper.SerializeForm(search_frm_id);
                        let rest_url = "/ajax/sales/get/out_mgt";

                        let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);

                        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
                            .then((res)=>{
                                //console.log(res);
                                if(res.result){
                                    w2ui['grid01'].records = W2UiHelper.AddRecID(res.data);
                                    w2ui['grid01'].reload(true);
                                    if(w2ui['grid01'].hasOwnProperty("fncPostSearch") && typeof w2ui['grid01'].fncPostSearch == "function"){
                                        w2ui['grid01'].fncPostSearch(res);
                                    }
                                    w2ui['grid03'].clear();
                                }else{
                                    mes_alert({msg: data.msg},{msg: ""});
                                }
                            })
                            .fail(ScriptHelper.OnAjaxFail);
                        common.success_msg(res.msg);
                    }else{
                        mes_alert({msg:res.msg},{msg:""});
                    }
                })
                .fail(ScriptHelper.OnAjaxFail);
        }
    });

});
