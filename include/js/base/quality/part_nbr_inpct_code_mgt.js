import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_inpct_cd from "/include/js/popups/pop_inpct_cd.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";


$(function () {
    let grid01 = {
        name: "grid01",
        header: '품번리스트',
        show: {header: true},
        reorderRows: true,
        columns: [
            {field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
            {
                field: 'fact_cd',
                caption: '공장',
                size: '80px',
                sortable: true,
                resizable: true, /*hidden:true,*/
                editable: {type: 'select',},
            },
            {
                field: 'inspct_count',
                caption: '항목수',
                size: '100px',
                sortable: true,
                resizable: true, /*, hidden: true*/
                style: "text-align: right"
            },
            {
                field: 'prt_nbr_cd',
                caption: '품번코드',
                size: '200px',
                sortable: true,
                resizable: true,
                editable: {type: 'text', maxLength: 50},
            },
            {
                field: 'prt_nbr_nm',
                caption: '품번명',
                size: '100px',
                sortable: true,
                resizable: true,
                editable: {type: 'select'},
            },
            {
                field: 'spec',
                caption: '규격',
                size: '100px',
                sortable: true,
                resizable: true, /*hidden:true,*/
                editable: {type: 'text', maxlength: 50},
            },
        ],
        rowOnClickConfig: {
            [Const.config.rowOnClickConfig.funcType]: [Const.config.rowOnClickConfig.funcOption.detail],
            [Const.config.rowOnClickConfig.clickTargetGrid]: ["grid02"],
            [Const.config.rowOnClickConfig.clickWhereFieldList]: ["fact_cd", "prt_nbr_cd", "prt_nbr_nm"],
            [Const.config.rowOnClickConfig.url]: "/ajax/base/quality/get/pnic_mgt2",


        },
        lastGetParam: {
            param: {},
        },
        fncPostSearch: function (obj) {
            let search_id = "#grid_" + this.name + "_rec_1";
            $(search_id).click();

        },
    };

    let grid02 = {
        name: "grid02",
        header: '품번검사항목리스트',
        show: {header: true, lineNumbers: true},
        reorderRows: true,
        columns: [
            {
                field: 'recid',
                caption: '검사순서',
                size: '50px',
                sortable: true,
                resizable: true,
                style: 'text-align: right',
            },
            {
                field: 'chk',
                caption: '선택',
                size: '50px',
                sortable: true,
                style: 'text-align: center',
                editable: {type: 'checkbox'}
            },
            {
                field: 'fact_cd',
                caption: '공장',
                size: '80px',
                sortable: true,
                resizable: true,
                hidden: true,
                style: 'text-align: right'
            },
            {
                field: 'inspct_seq',
                caption: '검사순서',
                size: '50px',
                sortable: true,
                resizable: true,
                hidden: true,
                style: 'text-align: right'
            },
            {
                field: 'prt_nbr_cd',
                caption: '품번코드',
                size: '50px',
                sortable: true,
                resizable: true,
                hidden: true,
                style: 'text-align: right'
            },
            {
                field: 'prt_nbr_nm',
                caption: '품번명',
                size: '50px',
                sortable: true,
                resizable: true,
                hidden: true,
                style: 'text-align: right'
            },

            {
                field: 'inspct_cd',
                caption: '검사항목코드',
                size: '100px',
                sortable: true,
                resizable: true,
                readonly: true/*, hidden: true*/
            },
            {
                field: 'inspct_nm',
                caption: '검사항목명',
                size: '200px',
                sortable: true,
                resizable: true,
                readonly: true/*editable: {type: 'text', maxLength: 50},*/
            },
            {
                field: 'inspct_unit',
                caption: '측정단위',
                size: '100px',
                sortable: true,
                resizable: true,
                editable: {type: 'select'}/*, hidden: true*/,
                hidden: true
            },

            {
                field: 'inspct_stdrd_type',
                caption: '규격유형명',
                size: '100px',
                sortable: true,
                resizable: true,
                hidden: true
            },
            {
                field: 'up_limit_value',
                caption: '상한값',
                size: '50px',
                sortable: true,
                resizable: true,
                style: 'text-align: right',
                readonly: true
            },
            {
                field: 'mid_value',
                caption: '중간값',
                size: '50px',
                sortable: true,
                resizable: true,
                style: 'text-align: right',
                readonly: true
            },
            {
                field: 'low_limit_value',
                caption: '하한값',
                size: '50px',
                sortable: true,
                resizable: true,
                style: 'text-align: right',
                readonly: true
            },


            {
                field: 'use_yn',
                caption: '사용여부',
                size: '100px',
                sortable: true,
                resizable: true,
                editable: {type: 'checkbox'}
            },
            {
                field: 'remark',
                caption: '비고',
                size: '300px',
                sortable: true,
                resizable: true,
                editable: {type: 'text', maxlength: 1000},
                readonly: true
            },
            {
                field: 'inst_id',
                caption: '입력자ID',
                size: '100px',
                sortable: true,
                resizable: true,/* editable: { type: 'text' }*/
            },
            {
                field: 'inst_dt',
                caption: '입력일시',
                size: '150px',
                sortable: true,
                resizable: true,
                style: 'text-align: center',
                readonly: true/* editable: { type: 'date' }*/
            },
            {
                field: 'updt_id',
                caption: '수정자ID',
                size: '100px',
                sortable: true,
                resizable: true,/* editable: { type: 'text' }*/
            },
            {
                field: 'updt_dt',
                caption: '수정일시',
                size: '150px',
                sortable: true,
                resizable: true,
                style: 'text-align: center',
                readonly: true/* editable: { type: 'date' }*/
            }
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
        }

    }
    W2UiHelper.CheckBoxInputRenderFunc(grid02, ["use_yn"]);
    let detail_frm_id = "detail_frm";
    let search_frm_id = "search_frm";
    let bnt_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, bnt_frm_id);


    let detail_pop_inpct_cd = new Pop_inpct_cd(pageManager, detail_frm_id);
    detail_pop_inpct_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);


    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);


    //1번 그리드 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid01 = pageManager.gridManager.AddGrid(grid01);
    pageManager.gridManager.AddSelectBoxInfo(grid01.name, "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");


    //2번 그리드 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid02 = pageManager.gridManager.AddGrid(grid02);

    pageManager.gridManager.SetSelectionCheckField(grid02.name, "chk");
    //pageManager.gridManager.AddSelectBoxInfo(grid02.name, "inspct_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/base/quality/get/part_nbr_inpct_code_mgt");

    /*
        pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.DeleteRow, "/ajax/base/quality/delete/part_nbr_inpct_code_mgt");
        pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Save, "/ajax/base/quality/save/part_nbr_inpct_code_mgt");
    */


    //폼 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    pageManager.frmManager.AddForm(search_frm_id);
    pageManager.frmManager.AddForm(detail_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id, "name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(detail_frm_id, "name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(detail_frm_id, "name", "inspct_stdrd_type", common.code, {up_cd: "inspct_stdrd_type"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(detail_frm_id, "name", "inspct_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");


    //폼 팝업 등록
    let caller_name = "btn_pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd", "prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);

    caller_name = "detail_pop_inpct_cd";
    target_name = ["inspct_cd", "inspct_nm", "inspct_stdrd_type",""];
    let from_name = ["inspct_cd", "inspct_nm", "inspct_stdrd_type"];
    pageManager.frmManager.AddPopupLink(detail_frm_id, caller_name, detail_pop_inpct_cd.ShowFormDialog, target_name, from_name);

    //그리드 초기화..
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //버튼함수와 연결...
    pageManager.BindButtonFunction([Const.MesButton.AddRow, Const.MesButton.Save, Const.MesButton.DeleteRow]);

    //그리드 초기화...
    pageManager.InitializeComponent();
    Const.SelectedGridID = grid01.name;


    pageManager.gridManager.SetClickTargetGrid("grid01", "grid02");
    pageManager.gridManager.SetClickWhereFieldList("grid01", ["fact_cd", "prt_nbr_cd"]);
    grid01.onClick = W2UiHelper.RowOnClick;


    let grid02_click = function () {
        let recid = w2ui[grid02.name].last.click_recid;
        let records = w2ui[grid02.name].records;
        let number = 0;
        for (let i = 0; i < records.length; i++) {
            if (records[i]["recid"] == recid) {
                number = i;
            }
        }

        $("#" + detail_frm_id + " [name = 'cu']").val("U");
        $("#" + detail_frm_id + " [name = 'fact_cd']").val(records[number]['fact_cd']);
        $("#" + detail_frm_id + " [name = 'prt_nbr_cd']").val(records[number]['prt_nbr_cd']);
        $("#" + detail_frm_id + " [name = 'prt_nbr_nm']").val(records[number]['prt_nbr_nm']);
        $("#" + detail_frm_id + " [name = 'inspct_cd']").val(records[number]['inspct_cd']);
        $("#" + detail_frm_id + " [name = 'inspct_nm']").val(records[number]['inspct_nm']);
        $("#" + detail_frm_id + " [name = 'inspct_stdrd_type']").val(records[number]['inspct_stdrd_type']);


        if (records[number]['inspct_stdrd_type'] == '10') {
            $("#" + detail_frm_id + " [name = 'inspct_unit']").attr('disabled', false);
            $("#" + detail_frm_id + " [name = 'up_limit_value']").attr('disabled', false);
            $("#" + detail_frm_id + " [name = 'low_limit_value']").attr('disabled', true);
        } else if (records[number]['inspct_stdrd_type'] == '20') {
            $("#" + detail_frm_id + " [name = 'inspct_unit']").attr('disabled', false);
            $("#" + detail_frm_id + " [name = 'up_limit_value']").attr('disabled', false);
            $("#" + detail_frm_id + " [name = 'low_limit_value']").attr('disabled', false);
        } else if (records[number]['inspct_stdrd_type'] == '30') {
            $("#" + detail_frm_id + " [name = 'inspct_unit']").attr('disabled', false);
            $("#" + detail_frm_id + " [name = 'up_limit_value']").attr('disabled', true);
            $("#" + detail_frm_id + " [name = 'low_limit_value']").attr('disabled', false);
        } else {
            $("#" + detail_frm_id + " [name = 'inspct_unit']").val("");
            $("#" + detail_frm_id + " [name = 'inspct_unit']").attr('disabled', true);
            $("#" + detail_frm_id + " [name = 'up_limit_value']").attr('disabled', true);
            $("#" + detail_frm_id + " [name = 'low_limit_value']").attr('disabled', true);
        }


        $("#" + detail_frm_id + " [name = 'up_limit_value']").val(records[number]['up_limit_value']);
        $("#" + detail_frm_id + " [name = 'mid_value']").val(records[number]['mid_value']);
        $("#" + detail_frm_id + " [name = 'low_limit_value']").val(records[number]['low_limit_value']);


        $("#" + detail_frm_id + " [name = 'inspct_unit']").val(records[number]['inspct_unit']);


        /*        $("#"+detail_frm_id+" [name = 'mid_value']").val(records[number]['mid_value']);
                $("#"+detail_frm_id+" [name = 'low_limit_value']").val(records[number]['low_limit_value']);*/


        $("#" + detail_frm_id + " [name = 'use_yn']").val(records[number]['use_yn']);
        $("#" + detail_frm_id + " [name = 'remark']").val(records[number]['remark']);
        $("#" + detail_frm_id + " [name = 'inspct_seq']").val(records[number]['inspct_seq']);
    }


    w2ui[grid02.name].on("collapse", function (event) {
        //console.log(event);


        $("#grid_" + grid02.name + "_rec_" + event.recid).click();
    });


    $("#hBtnB0003").on("click", function () {

        Const.SelectedGridID = grid02.name;
        $("#" + detail_frm_id + " [name = 'cu']").val("C");
        let recid = w2ui[grid01.name].last.click_recid - 1;

        let records_gird01 = w2ui[grid01.name].records;


        if (Const.SelectedGridID === 'grid02') {
            let records = w2ui[grid02.name].records;


            $("#" + detail_frm_id + " [name = 'prt_nbr_cd']").val(records_gird01[recid]['prt_nbr_cd']);
            $("#" + detail_frm_id + " [name = 'prt_nbr_nm']").val(records_gird01[recid]['prt_nbr_nm']);
            $("#" + detail_frm_id + " [name = 'fact_cd']").val(records_gird01[recid]['fact_cd']);

            $("#" + detail_frm_id + " [name = 'inspct_cd']").val('');
            $("#" + detail_frm_id + " [name = 'inspct_nm']").val('');
            $("#" + detail_frm_id + " [name = 'up_limit_value']").val('');
            $("#" + detail_frm_id + " [name = 'low_limit_value']").val('');
            $("#" + detail_frm_id + " [name = 'mid_value']").val('');
            $("#" + detail_frm_id + " [name = 'use_yn']").val(true);
            $("#" + detail_frm_id + " [name = 'inspct_unit']").val('');
            $("#" + detail_frm_id + " [name = 'remark']").val('');
            $("#" + detail_frm_id + " [name = 'inspct_seq']").val(records.length);

        } else {
            mes_alert({msg: '첫번째 테이블은 새로운 행 추가가 불가능합니다.'}, {msg: ''});
            return false;
        }


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
                    param['inspct_cd'] = temp[i]['inspct_cd'];
                    param['prt_nbr_cd'] = temp[i]['prt_nbr_cd'];
                    param_arr.push(param);
                    count++;
                }
            }
        }

        let ajax_url = "/ajax/base/quality/delete/part_nbr_inpct_code_mgt";

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
                    w2ui[grid01.name]["records"][g1_recid - 1]["inspct_count"] -= count;
                    pageManager.InitializeComponent();
                    $("#grid_grid01_rec_" + g1_recid).click();
                }
            })
            .fail(ScriptHelper.OnAjaxFail);

    });


    $("#hBtnB0005").on("click", function () {

        $(".loadingW").css("display", "");
        let g2_recid = w2ui[grid02.name].last.click_recid;
        let g2_recodes = w2ui[grid02.name].records;
        let count = 0;

        let param = {};

        let param_arr = [];


        if ($("#" + detail_frm_id + " [name = 'cu']").val() == "C") {
            if (param['inspct_cd'] === "") {
                $(".loadingW").css("display", "none");
                mes_alert({msg: '검사항목은 필수 입니다.'}, {msg: '입력 후 시도해주십시오.'});
                return false;
            }
            param['fact_cd'] = $("#" + detail_frm_id + " [name = 'fact_cd']").val();
            param['prt_nbr_cd'] = $("#" + detail_frm_id + " [name = 'prt_nbr_cd']").val();
            param['inspct_seq'] = w2ui[grid02.name].records.length + 1;
            param['inspct_cd'] = $("#" + detail_frm_id + " [name = 'inspct_cd']").val();
            param['up_limit_value'] = $("#" + detail_frm_id + " [name = 'up_limit_value']").val();
            param['low_limit_value'] = $("#" + detail_frm_id + " [name = 'low_limit_value']").val();
            param['mid_value'] = $("#" + detail_frm_id + " [name = 'mid_value']").val();
            param['use_yn'] = $("#" + detail_frm_id + " [name = 'use_yn']").val() == true ? 'Y' : 'N';
            param['remark'] = $("#" + detail_frm_id + " [name = 'remark']").val();
            param['inspct_unit'] = $("#" + detail_frm_id + " [name = 'inspct_unit']").val();

            let today = new Date();

            let year = today.getFullYear(); // 년도
            let month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
            let date = today.getDate();  // 날짜

            param['apy_ymd'] = year + '-' + month + '-' + date;
            param['cu'] = 'C';
            count = 1;

        } else if ($("#" + detail_frm_id + " [name = 'cu']").val("U")) {
            for (let i = 0; i < g2_recodes.length; i++) {
                if ($("#" + detail_frm_id + " [name = 'inspct_seq']").val() == g2_recodes[g2_recid - 1]['inspct_seq']) {
                    g2_recodes[i]['fact_cd'] = $("#" + detail_frm_id + " [name = 'fact_cd']").val();
                    g2_recodes[i]['prt_nbr_cd'] = $("#" + detail_frm_id + " [name = 'prt_nbr_cd']").val();
                    g2_recodes[i]['inspct_cd'] = $("#" + detail_frm_id + " [name = 'inspct_cd']").val();
                    g2_recodes[i]['up_limit_value'] = $("#" + detail_frm_id + " [name = 'up_limit_value']").val();
                    g2_recodes[i]['low_limit_value'] = $("#" + detail_frm_id + " [name = 'low_limit_value']").val();
                    g2_recodes[i]['mid_value'] = $("#" + detail_frm_id + " [name = 'mid_value']").val();
                    g2_recodes[i]['use_yn'] = $("#" + detail_frm_id + " [name = 'use_yn']").val() == true ? 'Y' : 'N';
                    g2_recodes[i]['remark'] = $("#" + detail_frm_id + " [name = 'remark']").val();
                    g2_recodes[i]['inspct_unit'] = $("#" + detail_frm_id + " [name = 'inspct_unit']").val();
                    g2_recodes[i]['cu'] = 'U';
                }
                break;
            }
        }


        g2_recodes.push(param);

        let ajax_url = "/ajax/base/quality/save/part_nbr_inpct_code_mgt";
        param_arr.push(g2_recodes);

        let btn_id = Const.MesButton.Save;

        let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);

        ScriptHelper.AjaxCall(ajax_url, Const.AjaxMethod.POST, ajax_args)
            .then((res) => {
                $(".loadingW").css("display", "none");
                console.log(res, 'after ajax');
                $(".loadingW").css("display", "none");
                if (res['result'] == false) {
                    //mes_alert({msg : "ssssss",{msg : ''});
                } else if (res['result'] == true) {
                    common.success_msg(res.msg);
                    let g1_recid = w2ui[grid01.name].last.click_recid;
                    if (count == 1) {
                        w2ui[grid01.name]["records"][g1_recid - 1]["inspct_count"]++;
                    }
                    pageManager.InitializeComponent();

                    $("#grid_grid01_rec_" + g1_recid).click();
                }
            })
            .fail(ScriptHelper.OnAjaxFail);

        grid02.onClick = grid02_click;

    });


    {  //detail_frm 변화처리


        $("#" + detail_frm_id + " [name = 'inspct_stdrd_type']").on("input", function (event) {
            let type = $("#" + detail_frm_id + " [name = 'inspct_stdrd_type']").val();
            if (type == '10') {
                $("#" + detail_frm_id + " [name = 'inspct_unit']").attr('disabled', false);
                $("#" + detail_frm_id + " [name = 'up_limit_value']").attr('disabled', false);
                $("#" + detail_frm_id + " [name = 'low_limit_value']").attr('disabled', true);
                $("#" + detail_frm_id + " [name = 'low_limit_value']").val("");
                $("#" + detail_frm_id + " [name = 'mid_value']").val("");
            } else if (type == '20') {
                $("#" + detail_frm_id + " [name = 'inspct_unit']").attr('disabled', false);
                $("#" + detail_frm_id + " [name = 'up_limit_value']").attr('disabled', false);
                $("#" + detail_frm_id + " [name = 'low_limit_value']").attr('disabled', false);
            } else if (type == '30') {
                $("#" + detail_frm_id + " [name = 'inspct_unit']").attr('disabled', false);
                $("#" + detail_frm_id + " [name = 'up_limit_value']").attr('disabled', true);
                $("#" + detail_frm_id + " [name = 'low_limit_value']").attr('disabled', false);
                $("#" + detail_frm_id + " [name = 'mid_value']").val("");
                $("#" + detail_frm_id + " [name = 'up_limit_value']").val("");
            } else {
                $("#" + detail_frm_id + " [name = 'up_limit_value']").val("");
                $("#" + detail_frm_id + " [name = 'low_limit_value']").val("");
                $("#" + detail_frm_id + " [name = 'mid_value']").val("");
                $("#" + detail_frm_id + " [name = 'inspct_unit']").val("");
                $("#" + detail_frm_id + " [name = 'inspct_unit']").attr('disabled', true);
                $("#" + detail_frm_id + " [name = 'up_limit_value']").attr('disabled', true);
                $("#" + detail_frm_id + " [name = 'low_limit_value']").attr('disabled', true);
            }


        });


        $("#" + grid01.name).on('click', function (event) {
            let recid = w2ui[grid01.name].last.click_recid - 1;
            let records_gird01 = w2ui[grid01.name].records;

            $("#" + detail_frm_id + " [name = 'cu']").val("C");
            $("#" + detail_frm_id + " [name = 'prt_nbr_cd']").val(records_gird01[recid]['prt_nbr_cd']);
            $("#" + detail_frm_id + " [name = 'prt_nbr_nm']").val(records_gird01[recid]['prt_nbr_nm']);
            $("#" + detail_frm_id + " [name = 'fact_cd']").val(records_gird01[recid]['fact_cd']);

            $("#" + detail_frm_id + " [name = 'inspct_cd']").val('');
            $("#" + detail_frm_id + " [name = 'inspct_nm']").val('');
            $("#" + detail_frm_id + " [name = 'up_limit_value']").val('');
            $("#" + detail_frm_id + " [name = 'low_limit_value']").val('');
            $("#" + detail_frm_id + " [name = 'mid_value']").val('');
            $("#" + detail_frm_id + " [name = 'use_yn']").val(true);
            $("#" + detail_frm_id + " [name = 'inspct_unit']").val('');
            $("#" + detail_frm_id + " [name = 'remark']").val('');
            $("#" + detail_frm_id + " [name = 'inspct_seq']").val(0);
        });

        $("#" + detail_frm_id + " [name = 'up_limit_value']").on("input", function (event) {
            let a = $("#" + detail_frm_id + " [name = 'up_limit_value']").val() == "" ? 0 : $("#" + detail_frm_id + " [name = 'up_limit_value']").val();
            let b = $("#" + detail_frm_id + " [name = 'low_limit_value']").val() == "" ? 0 : $("#" + detail_frm_id + " [name = 'low_limit_value']").val();
            $("#" + detail_frm_id + " [name = 'mid_value']").val((parseFloat(a) + parseFloat(b)) / 2);

        });


        $("#" + detail_frm_id + " [name = 'low_limit_value']").on("input", function (event) {
            let a = $("#" + detail_frm_id + " [name = 'up_limit_value']").val() == "" ? 0 : $("#" + detail_frm_id + " [name = 'up_limit_value']").val();
            let b = $("#" + detail_frm_id + " [name = 'low_limit_value']").val() == "" ? 0 : $("#" + detail_frm_id + " [name = 'low_limit_value']").val();
            $("#" + detail_frm_id + " [name = 'mid_value']").val((parseFloat(a) + parseFloat(b)) / 2);
        });
    }


    $("#grid02").on(Const.HtmlEvent.click, function () {
        Const.SelectedGridID = grid02.name;
    });

    $("#grid01").on(Const.HtmlEvent.click, function () {
        Const.SelectedGridID = grid01.name;
    });


    grid02.onClick = grid02_click;


});

