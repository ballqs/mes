import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd_wp from "/include/js/popups/pop_prt_nbr_cd_wp.js";
import Pop_loc_cd from "/include/js/popups/pop_loc_cd.js";
import Pop_whs_cd from "/include/js/popups/pop_whs_cd.js";
import Pop_ship_cd from "/include/js/popups/pop_ship_cd.js";

$(function () {
    let fish_mon;
    $.ajax({
        type: 'GET',
        data: null,
        url: '/ajax/stock/stck_mon_staus/get/sms_mon_fnsh',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $("#search_frm [name = 'fish_mon']").val(data.data[0]["cd_set1"]);
            fish_mon = data.data[0]["cd_set1"];
        },
        error: function (request,status,error) {
            console.log(request);
            console.log(status);
            console.log(error);
        },
    });

    let grid01 = {
        name: 'grid01',
        columnGroups: [
            { caption: 'NO', master: true },
            { caption: '공장', master: true },
            { caption: '년월', master: true },
            { caption: '품번그룹', master: true },
            { caption: '계정유형', master: true },
            { caption: '품번코드', master: true },
            { caption: '품번명', master: true },
            { caption: '규격', master: true },
            { caption: '출고처', span: 2 },
            { caption: '출고처현장', span: 2 },
            { caption: '창고코드', master: true },
            { caption: '창고명', master: true },
            { caption: '위치코드', master: true },
            { caption: '위치명', master: true },
            { caption: '기초재고', master: true },
            { caption: '당월 입출고', span: 2 },
            { caption: '현재고', master: true }
        ],
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            { field: 'ym', caption: '마감년월', size: '100px', sortable: true, resizable: true,style: 'text-align: center',hidden:true},
            { field: 'prt_nbr_grp_cd', caption: '품번그룹', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            { field: 'account_type', caption: '계정유형', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '300px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '100px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true},
            { field: 'biz_cd', caption: '출고처코드', size: '100px', sortable: true, resizable: true},
            { field: 'biz_nm', caption: '출고처명', size: '100px', sortable: true, resizable: true},
            { field: 'ship_cd', caption: '출고처현장코드', size: '100px', sortable: true, resizable: true},
            { field: 'ship_nm', caption: '출고처현장명', size: '100px', sortable: true, resizable: true},
            { field: 'stck_whs_cd', caption: '창고코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'stck_whs_nm', caption: '창고', size: '100px', sortable: true, resizable: true},
            { field: 'stck_loc_cd', caption: '위치코드', size: '100px', sortable: true, resizable: true, hidden: true},
            { field: 'stck_loc_nm', caption: '위치', size: '100px', sortable: true, resizable: true},
            { field: 'base_qty', caption: '기초수량', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'in_qty', caption: '입고수량', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'out_qty', caption: '출고수량', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'fnsh_qty', caption: '현재재고', size: '100px', sortable: true, resizable: true, style: 'text-align: right'}
        ],
        rowOnClickConfig : {
            [Const.config.rowOnClickConfig.funcType] : [Const.config.rowOnClickConfig.funcOption.multiple],
            [Const.config.rowOnClickConfig.clickTargetGrid] : ["grid03","grid04"],
            [Const.config.rowOnClickConfig.clickWhereFieldList] : ["fact_cd","prt_nbr_cd","ship_cd"],
            [Const.config.rowOnClickConfig.url] : "/ajax/stock/stck_mon_staus/get/lotno_in_out"
        },
        lastGetParam : {
            param : {},
        },
    };



    let grid02 = {
        name: 'grid02',
        columnGroups: [
            { caption: 'NO', master: true },
            { caption: '공장', master: true },
            { caption: '년월', master: true },
            { caption: '품번그룹', master: true },
            { caption: '계정유형', master: true },
            { caption: '품번코드', master: true },
            { caption: '품번명', master: true },
            { caption: '규격', master: true },
            { caption: '기초재고', master: true },
            { caption: '당월 입출고', span: 2 },
            { caption: '현재고', master: true }
        ],
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            { field: 'ym', caption: '마감년월', size: '100px', sortable: true, resizable: true,style: 'text-align: center', hidden:true},
            { field: 'prt_nbr_grp_cd', caption: '품번그룹', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            { field: 'account_type', caption: '계정유형', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '300px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번명', size: '100px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true},
            { field: 'base_qty', caption: '기초수량', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'in_qty', caption: '입고수량', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'out_qty', caption: '출고수량', size: '70px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'fnsh_qty', caption: '현재재고', size: '100px', sortable: true, resizable: true, style: 'text-align: right'}
        ],
        rowOnClickConfig : {
            [Const.config.rowOnClickConfig.funcType] : [Const.config.rowOnClickConfig.funcOption.multiple],
            [Const.config.rowOnClickConfig.clickTargetGrid] : ["grid05","grid06"],
            [Const.config.rowOnClickConfig.clickWhereFieldList] : ["fact_cd","prt_nbr_cd"],
            [Const.config.rowOnClickConfig.url] : "/ajax/stock/stck_mon_staus/get/prtnbr_in_out"
        },
        lastGetParam : {
            param : {},
        },
    };
    let grid03 = {
        name: 'grid03',
        header: '출고처현장별 입고 내역',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true},
            { field: 'in_hstry_gbn_nm', caption: '입고구분', size: '100px', sortable: true, resizable: true},
            { field: 'rec_ymd', caption: '입고일자', size: '100px', sortable: true, resizable: true,style: 'text-align: center'},
            { field: 'in_qty', caption: '입고량', size: '50px', sortable: true, resizable: true ,style: 'text-align: right'},
            { field: 'updt_id', caption: '담당자', size: '100px', sortable: true, resizable: true},
            { field: 'in_hstry_gbn', caption: '증감율', size: '50px', sortable: true, resizable: true ,style: 'text-align: center'},
        ],
    };

    let grid04 = {
        name: 'grid04',
        header: '출고처현장별 출고 내역',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true},
            { field: 'out_hstry_gbn_nm', caption: '출고구분', size: '100px', sortable: true, resizable: true},
            { field: 'rec_ymd', caption: '출고일자', size: '100px', sortable: true, resizable: true,style: 'text-align: center'},
            { field: 'out_qty', caption: '출고량', size: '50px', sortable: true, resizable: true ,style: 'text-align: right'},
            { field: 'updt_id', caption: '담당자', size: '100px', sortable: true, resizable: true},
            { field: 'out_hstry_gbn', caption: '증감율', size: '50px', sortable: true, resizable: true ,style: 'text-align: center'},
        ],
    };

    let grid05 = {
        name: 'grid05',
        header: '품번별 입고 내역',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true},
            { field: 'in_hstry_gbn_nm', caption: '입고구분', size: '100px', sortable: true, resizable: true},
            { field: 'rec_ymd', caption: '입고일자', size: '100px', sortable: true, resizable: true,style: 'text-align: center'},
            { field: 'in_qty', caption: '입고량', size: '50px', sortable: true, resizable: true ,style: 'text-align: right'},
            { field: 'updt_id', caption: '담당자', size: '100px', sortable: true, resizable: true},
            { field: 'in_hstry_gbn', caption: '증감율', size: '50px', sortable: true, resizable: true ,style: 'text-align: center'},
        ],
    };

    let grid06 = {
        name: 'grid06',
        header: '품번별 출고 내역',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true},
            { field: 'out_hstry_gbn_nm', caption: '출고구분', size: '100px', sortable: true, resizable: true},
            { field: 'rec_ymd', caption: '출고일자', size: '100px', sortable: true, resizable: true,style: 'text-align: center'},
            { field: 'out_qty', caption: '출고량', size: '50px', sortable: true, resizable: true ,style: 'text-align: right'},
            { field: 'updt_id', caption: '담당자', size: '100px', sortable: true, resizable: true},
            { field: 'out_hstry_gbn', caption: '증감율', size: '50px', sortable: true, resizable: true ,style: 'text-align: center'},
        ],
    };




    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);
    let pop_prt_nbr_cd_wp = new Pop_prt_nbr_cd_wp(pageManager, search_frm_id);
    let pop_whs_cd = new Pop_whs_cd(pageManager, search_frm_id);
    let pop_loc_cd = new Pop_loc_cd(pageManager, search_frm_id);
    let pop_ship_cd = new Pop_ship_cd(pageManager, search_frm_id);

    pop_prt_nbr_cd_wp.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_whs_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_loc_cd.AddParentReferFormTag(["fact_cd","whs_cd","whs_nm"],["fact_cd","whs_cd","whs_nm"]);
    pop_ship_cd.AddParentReferFormTag(["cmpny_cd","biz_cd","biz_nm"], ["cmpny_cd","biz_cd","biz_nm"]);

    //1번 그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);

    //ReadOnly 필드 등록
    pageManager.gridManager.SetReadonlyFields(grid01.name,  ["fact_cd","prt_nbr_grp_cd","account_type"]);

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/stock/stck_mon_staus/get/sms_lot_wp");

    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"prt_nbr_grp_cd", common.code, {up_cd: "prt_nbr_grp_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm");

    //2번 그리드 등록
    grid02 = pageManager.gridManager.AddGrid(grid02);

    //ReadOnly 필드 등록
    pageManager.gridManager.SetReadonlyFields(grid02.name,  ["fact_cd","prt_nbr_grp_cd","account_type"]);

    pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.Search, "/ajax/stock/stck_mon_staus/get/sms_prt_wp");

    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"prt_nbr_grp_cd", common.code, {up_cd: "prt_nbr_grp_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm");

    //3번 그리드 등록
    grid03 = pageManager.gridManager.AddGrid(grid03);
    pageManager.gridManager.AddSelectBoxInfo(grid03.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid03.name,"in_hstry_gbn", common.code, {up_cd: "in_hstry_gbn"}, "cd", "cd_set1");
    pageManager.gridManager.AddSelectBoxInfo(grid03.name,"in_hstry_gbn_nm", common.code, {up_cd: "in_hstry_gbn"}, "cd", "cd_nm");

    //4번 그리드 등록
    grid04 = pageManager.gridManager.AddGrid(grid04);
    pageManager.gridManager.AddSelectBoxInfo(grid04.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid04.name,"out_hstry_gbn", common.code, {up_cd: "out_hstry_gbn"}, "cd", "cd_set1");
    pageManager.gridManager.AddSelectBoxInfo(grid04.name,"out_hstry_gbn_nm", common.code, {up_cd: "out_hstry_gbn"}, "cd", "cd_nm");

    //5번 그리드 등록
    grid05 = pageManager.gridManager.AddGrid(grid05);
    pageManager.gridManager.AddSelectBoxInfo(grid05.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid05.name,"in_hstry_gbn", common.code, {up_cd: "in_hstry_gbn"}, "cd", "cd_set1");
    pageManager.gridManager.AddSelectBoxInfo(grid05.name,"in_hstry_gbn_nm", common.code, {up_cd: "in_hstry_gbn"}, "cd", "cd_nm");

    //6번 그리드 등록
    grid06 = pageManager.gridManager.AddGrid(grid06);
    pageManager.gridManager.AddSelectBoxInfo(grid06.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid06.name,"out_hstry_gbn", common.code, {up_cd: "out_hstry_gbn"}, "cd", "cd_set1");
    pageManager.gridManager.AddSelectBoxInfo(grid06.name,"out_hstry_gbn_nm", common.code, {up_cd: "out_hstry_gbn"}, "cd", "cd_nm");


    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);

    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","prt_nbr_grp_cd", common.code, {up_cd: 'prt_nbr_grp_cd'}, "cd", "cd_nm", "", "전체");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm", "", "전체");


    //폼 팝업 등록
    let caller_name1 = "pop_prt_nbr_cd_wp";
    let target_name1 = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name1, pop_prt_nbr_cd_wp.ShowFormDialog, target_name1);

    let caller_name2 = "pop_whs_cd";
    let target_name2 = ["whs_cd","whs_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name2, pop_whs_cd.ShowFormDialog, target_name2);

    let caller_name3 = "pop_loc_cd";
    let target_name3 = ["loc_cd","loc_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name3, pop_loc_cd.ShowFormDialog, target_name3);

    let caller_name4 = "pop_ship_cd";
    let target_name4 = ["ship_cd","ship_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name4, pop_ship_cd.ShowFormDialog, target_name4);


    //버튼함수와 연결...
    pageManager.BindButtonFunction();

    //그리드 초기화
    pageManager.InitializeComponent();

    //row click 이벤트
    grid01.onClick = W2UiHelper.RowOnClick;
    grid02.onClick = W2UiHelper.RowOnClick;

    //탭
    $('#selected-tab .tab').hide();
    $('#selected-tab #tab1').show();

    $('#tabs').w2tabs({
        name: 'tabs',
        active: 'tab1',
        tabs: [
            { id: 'tab1', caption: '출고처현장별 재고' },
            { id: 'tab2', caption: '품번별 재고' }
        ],
        onClick: function (event) {
            $('#selected-tab .tab').hide(); //display : none;
            $('#selected-tab #' + event.target).show(); //display : block;
            $('#grid05 table tbody, #grid06 table tbody, #grid02 table tbody').trigger("click");
            if(event.target == 'tab1'){
                w2ui["grid01"].refresh();
                Const.SelectedGridID = grid01.name;
            }
            else if(event.target == 'tab2'){
                w2ui["grid02"].refresh();
                Const.SelectedGridID = grid02.name;
            }

        }
    });


    //div에 클릭펑션 먹인거...
    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});
    $("#grid03").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid03.name;});
    $("#grid04").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid04.name;});
    $("#grid05").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid05.name;});
    $("#grid06").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid06.name;});
    //선택한 그리드 초기화
    Const.SelectedGridID = grid01.name;

    common.ym_setting("base_ym","base_ym");

    $("#hBtnB0001").on("click", function(){
       let grid_id = Const.SelectedGridID;
        if(grid_id === 'grid01'){
            w2ui['grid03'].clear();
            w2ui['grid04'].clear();
        }else if(grid_id === 'grid02'){
            w2ui['grid05'].clear();
            w2ui['grid06'].clear();
        }
    });

    $("#hBtnB0002").on("click", function(){
        $("#search_frm [name = 'fish_mon']").val(fish_mon);
    });

});

