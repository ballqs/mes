import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";
import Pop_op_cd from "/include/js/popups/pop_op_cd.js";
import Pop_wrkctr_cd from "/include/js/popups/pop_wrkctr_cd.js";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
        ],
        columns_arr : [
            [
                {field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
                {field: 'wrkctr_cd', caption: '작업장코드', size: '100px', sortable: true, resizable: true, hidden: true},
                {field: 'wrkctr_nm', caption: '작업장', size: '100px', sortable: true, resizable: true},
                {field: 'prt_nbr_cd', caption: '품번코드', size: '150px', sortable: true, resizable: true},
                {field: 'prt_nbr_nm', caption: '품번', size: '150px', sortable: true, resizable: true,},
                {field: 'spec', caption: '규격', size: '150px', sortable: true, resizable: true,},
                {field: 'op_cd', caption: '공정코드', size: '100px', sortable: true, resizable: true},
                {field: 'op_nm', caption: '공정', size: '100px', sortable: true, resizable: true,},
            ],
            [
                // 동적 칼럼
            ],
            [
                {field: 'sum', caption: '합계', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            ]
        ],
        fncPreSearch : function (param) {
            w2ui.grid01.clear();
            this.columns_arr[1] = [];
            let search_ym = param['where']['base_ym'];
            let search_y = search_ym.substr(0,4);
            let search_m = search_ym.substr(5,2);

            let now = new Date();
            let now_y = now.getFullYear();
            let now_m = now.getMonth() + 1;

            let first = new Date(Number(search_y),Number(search_m)-1,1);
            let last = new Date(Number(search_y),Number(search_m),0);
            let firstDate = first.getDate();
            let lastDate = last.getDate();

            if(now_y < search_y){
                $(".loadingW").css("display", "none");
                mes_alert({msg:"년월을 현재년월보다 같거나 낮게 설정해주십시오."});
                return {result : false};
            }else if(now_y > search_y){
                for(let i=firstDate; i<=lastDate; i++){
                    this.columns_arr[1].push(
                        { field: i+"day", caption: i+"일", size: '70px', sortable: true, resizable: true,style: 'text-align: right' }
                    );
                }
            }else if(now_y == search_y){
                if(now_m < search_m){
                    $(".loadingW").css("display", "none");
                    mes_alert({msg:"년월을 현재년월보다 같거나 낮게 설정해주십시오."});
                    return {result : false};
                }else if(now_m > search_m){
                    for(let i=firstDate; i<=lastDate; i++){
                        this.columns_arr[1].push(
                            { field: i+"day", caption: i+"일", size: '70px', sortable: true, resizable: true,style: 'text-align: right' }
                        );
                    }
                }else if(now_m == search_m){
                    let now_d = now.getDate();
                    for(let i=firstDate; i<=now_d; i++){
                        this.columns_arr[1].push(
                            { field: i+"day", caption: i+"일", size: '70px', sortable: true, resizable: true,style: 'text-align: right' }
                        );
                    }
                }
            }
            grid01.columns = common.merge_columns(grid01.columns_arr);
            w2ui.grid01.refresh();

            return {result : true};
        },
        fncPostSearch : function (param) {
            console.log(param);
            let data_list = param.data[0];
            if(data_list !== undefined){
                delete data_list['recid'];
                w2ui.grid01.records = W2UiHelper.AddRecID(data_list);
                w2ui.grid01.refresh();
            }
        }
        //합계 다음부분부터 1 ~ 31일 있었음! 참고바람
    }

    grid01.columns = common.merge_columns(grid01.columns_arr);

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "prd_mon_staus";

    let pageManager = new GridPageManager(search_frm_id, btn_frm_id, page_addr_name);
    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);
    let pop_op_cd = new Pop_op_cd(pageManager, search_frm_id);
    let pop_wrkctr_cd = new Pop_wrkctr_cd(pageManager, search_frm_id);

    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);
    pop_op_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);
    pop_wrkctr_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);

    //1번 그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);

    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/production/status/get/prd_mon_staus");

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //폼 팝업 등록
    let caller_name = "pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd", "prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);

    //폼 팝업 등록
        caller_name = "pop_op_cd";
        target_name = ["op_cd", "op_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_op_cd.ShowFormDialog, target_name);

    //폼 팝업 등록
        caller_name = "pop_wrkctr_cd";
        target_name = ["wrkctr_cd", "wrkctr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_wrkctr_cd.ShowFormDialog, target_name);


    //버튼함수와 연결
    pageManager.BindButtonFunction([Const.MesButton.Search]);

    //그리드 초기화
    pageManager.InitializeComponent();

    //div에 클릭펑션 먹인거...
    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    //선택한 그리드 초기화
    Const.SelectedGridID = grid01.name;

    $("#hBtnB0002").on("click", function(){
        w2ui.grid01.clear();
        grid01.columns_arr[1] = [];
        grid01.columns = common.merge_columns(grid01.columns_arr);
        w2ui.grid01.refresh();
    });

    $("#hBtnB0001").on("click", function (){
        let grid_id = Const.SelectedGridID;
        let btn_id = Const.MesButton.Search;
        let param = FormHelper.SerializeForm(search_frm_id);

        if(w2ui[grid_id].hasOwnProperty("fncPreSearch") && typeof w2ui[grid_id].fncPreSearch == "function"){
            if(!w2ui[grid_id].fncPreSearch(param).result){
                return false;
            };
        };

        let rest_url = pageManager.gridManager.GetAjaxUrl(grid_id, btn_id);
        let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);

        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
            .then((res)=>{
                $(".loadingW").css("display", "none");
                common.success_msg(res.msg);
                if(w2ui[grid_id].hasOwnProperty("fncPostSearch") && typeof w2ui.grid01.fncPostSearch == "function"){
                    w2ui[grid_id].fncPostSearch(res);
                }
            })
            .fail(ScriptHelper.OnAjaxFail);
    });

});