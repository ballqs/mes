import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden:true },
            { field: 'fact_nm', caption: '공장', size: '100px', sortable: true, resizable: true },
            { field: 'daynight_gbn', caption: '주야구분', size: '70px', sortable: true, resizable: true , style: 'text-align: center'},
            { field: 'op_cd', caption: '공정코드', size: '70px', sortable: true, resizable: true, hidden: true },
            { field: 'op_nm', caption: '공정', size: '70px', sortable: true, resizable: true },
            { field: 'wrkctr_cd', caption: '작업장코드', size: '70px', sortable: true, resizable: true, hidden: true },
            { field: 'wrkctr_nm', caption: '작업장', size: '70px', sortable: true, resizable: true },
            { field: 'prt_nbr_no', caption: '품번코드', size: '180px', sortable: true, resizable: true},
            { field: 'prt_nbr_nm', caption: '품번', size: '180px', sortable: true, resizable: true },
            { field: 'spec', caption: '규격', size: '180px', sortable: true, resizable: true },
            { field: 'ordr_qty', caption: '목표', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'production_quantity', caption: '생산수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'difference_quantity', caption: '차이수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'achievement_rate', caption: '달성률(%)', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'operation_time', caption: '가동시간(분)', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'non_operation_time', caption: '비가동시간(분)', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            { field: 'rf_non_operation_time', caption: '주요비가동사유', size: '300px', sortable: true, resizable: true, hidden: true }
        ],
    };

    let grid02 = {
        name: 'grid02',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'fact_nm', caption: '공장', size: '100px', sortable: true, resizable: true },
            { field: 'daynight_gbn', caption: '주야구분', size: '70px', sortable: true, resizable: true },
            { field: 'shift_gbn', caption: '조구분', size: '70px', sortable: true, resizable: true },
            { field: 'op_cd', caption: '공정코드', size: '70px', sortable: true, resizable: true, hidden: true },
            { field: 'op_nm', caption: '공정', size: '70px', sortable: true, resizable: true },
            { field: 'wrkctr_cd', caption: '작업장코드', size: '70px', sortable: true, resizable: true, hidden: true },
            { field: 'wrkctr_nm', caption: '작업장', size: '70px', sortable: true, resizable: true },
            { field: 'prt_nbr_no', caption: '품번코드', size: '180px', sortable: true, resizable: true, hidden: true },
            { field: 'prt_nbr_nm', caption: '품번', size: '180px', sortable: true, resizable: true },
            { field: 'spec', caption: '규격', size: '180px', sortable: true, resizable: true },
            { field: 'lotno', caption: 'LOTNO', size: '150px', sortable: true, resizable: true},
            { field: 'prd_good_qty', caption: '양품수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'err_qty', caption: '불량수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'defect_rate', caption: '불량률(PPM)', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'acceptance_rate', caption: '합격율(%)', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  }
        ],

    };

    let grid03 = {
        name: 'grid03',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true },
            { field: 'fact_nm', caption: '공장', size: '100px', sortable: true, resizable: true },
            { field: 'rec_ymd', caption: '일자', size: '100px', sortable: true, resizable: true, style: 'text-align: center' },
            { field: 'op_cd', caption: '공정코드', size: '70px', sortable: true, resizable: true, hidden: true },
            { field: 'op_nm', caption: '공정', size: '70px', sortable: true, resizable: true },
            { field: 'wrkctr_cd', caption: '작업장코드', size: '70px', sortable: true, resizable: true, hidden: true },
            { field: 'wrkctr_nm', caption: '작업장', size: '70px', sortable: true, resizable: true },
            { field: 'prt_nbr_no', caption: '품번코드', size: '180px', sortable: true, resizable: true, hidden: true },
            { field: 'prt_nbr_nm', caption: '품번명', size: '180px', sortable: true, resizable: true },
            { field: 'spec', caption: '규격', size: '180px', sortable: true, resizable: true },
            { field: 'lotno', caption: 'LOT NO', size: '150px', sortable: true, resizable: true},
            { field: 'mach_cnt', caption: '설비카운트', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'prd_good_qty', caption: '양품수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'err_qty', caption: '불량수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'difference_quantity', caption: '차이수량', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'defect_rate', caption: '불량률(PPM)', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  },
            { field: 'acceptance_rate', caption: '합격율(%)', size: '100px', sortable: true, resizable: true, style: 'text-align: right'  }
        ],
    };


    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "prd_day_staus";

    let pageManager = new GridPageManager(search_frm_id, btn_frm_id, page_addr_name);
    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);

    //1번 그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);

    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"daynight_gbn", common.code, {up_cd: "day_night"}, "cd", "cd_nm");

    //2번 그리드 등록
    grid02 = pageManager.gridManager.AddGrid(grid02);

    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"daynight_gbn", common.code, {up_cd: "day_night"}, "cd", "cd_nm");

    //3번 그리드 등록
    grid03 = pageManager.gridManager.AddGrid(grid03);

    pageManager.gridManager.SetAjaxUrl(grid03.name, Const.MesButton.Search, "/ajax/production/status/get/pds_tab3");

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);

    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "daynight_gbn", common.code, {up_cd: "day_night"}, "cd", "cd_nm", "", "전체");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm", "", "전체");

    let caller_name = 'pop_prt_nbr_cd';
    let target_name = ['prt_nbr_cd', "prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);

    //버튼함수와 연결
    pageManager.BindButtonFunction([Const.MesButton.Search]);

    //그리드 초기화
    pageManager.InitializeComponent();


    $('#selected-tab .tab').hide();
    $('#selected-tab #tab1').show();

    $('#tabs').w2tabs({
        name: 'tabs',
        active: 'tab1',
        tabs: [
            { id: 'tab1', caption: '품목별 실적현황' },
            { id: 'tab2', caption: '품목별 LOT현황' },
            { id: 'tab3', caption: 'LOT별 실적현황' }
        ],
        onClick: function (event) {
            $('#selected-tab .tab').hide();
            $('#selected-tab #' + event.target).show();
            $('#grid2 table tbody').trigger("click");
            $('#grid3 table tbody').trigger("click");
            if(event.target == 'tab1'){
                w2ui['grid01'].refresh();
                Const.SelectedGridID = grid01.name;
            }
            else if(event.target == 'tab2'){
                w2ui['grid02'].refresh();
                Const.SelectedGridID = grid02.name;
            }
            else if(event.target == 'tab3'){
                w2ui['grid03'].refresh();
                Const.SelectedGridID = grid03.name;
            }
        }
    });

    //div에 클릭펑션 먹인거...
    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});
    $("#grid03").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid03.name;});

    //선택한 그리드 초기화
    Const.SelectedGridID = grid01.name;

    $("#hBtnB0001").on("click", function(){
        $(".loadingW").css("display", "");
        let grid_id = Const.SelectedGridID;
        let btn_id = Const.MesButton.Search;
        let param = pageManager.gridManager.GetSearchParam(grid_id);
        if(param === undefined) {
            param = FormHelper.SerializeForm(search_frm_id);
        }
        let rest_url = "";
        if(grid_id === "grid01"){
            rest_url = "/ajax/production/status/get/pds_tab1";
        }else if(grid_id === 'grid02'){
            rest_url = "/ajax/production/status/get/pds_tab2";
        }else if(grid_id === 'grid03'){
            rest_url = "/ajax/production/status/get/pds_tab3";
        }
        let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);

        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
            .then((res)=>{
                $(".loadingW").css("display", "none");
                let record_data = res.data[0];
                //받아온 데이터에 RecID를 붙힘
                if(record_data !== undefined){
                    W2UiHelper.AddRecID(record_data);
                    // w2ui[grid_id].records = record_data;
                    w2ui[grid_id].records = record_data;
                    w2ui[grid_id].reload(true);
                }
            })
            .fail(ScriptHelper.OnAjaxFail);

    });

});