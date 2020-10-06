import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd from "../../popups/pop_prt_nbr_cd.js";
// import Pop_biz_cd from "../../popups/pop_biz_cd.js";
import Pop_ship_cd from "../../popups/pop_ship_cd.js";
// 윈플러스는 lotno를 출고현장코드로 입력.
// 검사여부가 Y 이면 검사대기창고(W0001) N 이면 원자재창고(W0002) 넣기
$(function () {

    let grid02 = {  // tpa_purchininfo 그대로 보여주면됨. del_yn 제외
        name: 'grid02',
        columns: [
            { field: 'recid', caption: 'NO.', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장코드', size: '150px', sortable: true, resizable: true, hidden: true},
            { field: 'po_in_no', caption: '발주입고번호', size: '100px', sortable: true, resizable: true},
            { field: 'po_in_gbn', caption: '구매입고구분', size: '150px', sortable: true, resizable: true, hidden: true},
            { field: 'prt_nbr_cd', caption: '품번코드', size: '100px', sortable: true, resizable: true, hidden: false},
            { field: 'prt_nbr_nm', caption: '품번명', size: '150px', sortable: true, resizable: true },
            { field: 'spec', caption: '규격', size: '150px', sortable: true, resizable: true },
            { field: 'lotno', caption: 'lotno', size: '150px', sortable: true, resizable: true},
            { field: 'po_in_unit_nm', caption: '발주입고단위', size: '150px', sortable: true, resizable: true},
            { field: 'po_in_unit', caption: '발주입고단위코드', size: '150px', sortable: true, resizable: true, hidden: true},
            { field: 'in_biz_cd', caption: '발주처코드', size: '150px', sortable: true, resizable: true , hidden: true },
            { field: 'in_biz_nm', caption: '발주처', size: '150px', sortable: true, resizable: true },
            { field: 'dyn_biz_cd', caption: '직납업체', size: '150px', sortable: true, resizable: true, hidden: true },
            { field: 'out_biz_cd', caption: '출고처코드', size: '150px', sortable: true, resizable: true , hidden: true},
            { field: 'out_biz_nm', caption: '출고처', size: '150px', sortable: true, resizable: true },
            { field: 'out_ship_cd', caption: '출고장소코드', size: '150px', sortable: true, resizable: true , hidden: true},
            { field: 'out_ship_nm', caption: '출고처현장', size: '150px', sortable: true, resizable: true },
            { field: 'in_dt', caption: '입고일시', size: '150px', sortable: true, resizable: true },
            { field: 'po_unit', caption: '단위', size: '150px', sortable: true, resizable: true, hidden:true },
            { field: 'cd_nm', caption: '단위', size: '150px', sortable: true, resizable: true, hidden:true },
            { field: 'rec_ymd', caption: '수불일자', size: '150px', sortable: true, resizable: true },
            { field: 'in_qty', caption: '입고수량', size: '150px', sortable: true, resizable: true },
            { field: 'in_whs_cd', caption: '입고창고코드', size: '150px', sortable: true, resizable: true },
            { field: 'whs_nm', caption: '입고창고명', size: '150px', sortable: true, resizable: true },
            { field: 'in_loc_cd', caption: '입고위치코드', size: '150px', sortable: true, resizable: true },
            { field: 'loc_nm', caption: '입고위치명', size: '150px', sortable: true, resizable: true },
            { field: 'po_no', caption: '발주번호', size: '150px', sortable: true, resizable: true },
            { field: 'po_seq', caption: '발주순번', size: '150px', sortable: true, resizable: true },
            { field: 'input_hstry_no', caption: 'input_hstry_no', size: '150px', sortable: true, resizable: true },
            { field: 'remark', caption: '비고', size: '150px', sortable: true, resizable: true },
            { field: 'inst_id', caption: '입력자ID', size: '150px', sortable: true, resizable: true },
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true },
            { field: 'updt_id', caption: '수정자ID', size: '150px', sortable: true, resizable: true },
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true },
            { field: 'inspct_yn', caption: '검사여부', size: '50px', sortable: true, resizable: true, hidden:true, editable: {type: 'checkbox'} },
        ],
        customConfig : {
            [Const.config.customConfig.maxAddRow] : 1,
        },
        lastGetParam : {
            param : {},
        },
    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id);

    let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);
    // let pop_biz_cd = new Pop_biz_cd(pageManager, search_frm_id);
    let pop_ship_cd = new Pop_ship_cd(pageManager, search_frm_id);
    // pop_whs_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    // pop_prt_nbr_cd.AddTargetColumnsOnPopupClose(["prt_nbr_cd","prt_nbr_nm"], ["prt_nbr_cd","prt_nbr_nm"]);
    pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    // pop_biz_cd.AddParentReferFormTag(["cmpny_cd"], ["cmpny_cd"]);
    // pop_ship_cd.AddParentReferFormTag(["ship_cd"], ["ship_cd"]);
    let detail_frm_id = "detail_frm";
    let detail_pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, detail_frm_id, "detail_pop_prt_nbr_cd");
//     pop_prt_nbr_cd.AddParentReferFormTag(["prt_nbr_cd", "prt_nbr_nm"], ["prt_nbr_cd", "prt_nbr_nm"]);
    let detail_pop_ship_cd = new Pop_ship_cd(pageManager, detail_frm_id, "detail_pop_ship_cd");
//     pop_prt_nbr_cd.AddParentReferFormTag(["prt_nbr_cd", "prt_nbr_nm"], ["prt_nbr_cd", "prt_nbr_nm"]);
    
    //2번 그리드....
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid02 = pageManager.gridManager.AddGrid(grid02);
    //팝업등록
    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    // pageManager.gridManager.SetSelectionCheckField(grid02.name, "chk");

    //PK, 필수입력, Readonly 필드 등록
    // pageManager.gridManager.SetPkFields(grid02.name,  ["fact_cd", "whs_cd","loc_cd"]);
    // pageManager.gridManager.SetReadonlyFields(grid02.name,  ["whs_nm"]);
    // pageManager.gridManager.SetCompulsoryFields(grid02.name,  ["loc_nm"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.Search, "/ajax/material/input/get/directpurchininfo_wp");
//     pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.DeleteRow, "/ajax/material/input/delete/mtrl_input_mgt");
    // pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.Save, "/ajax/base/standard/save/wrhs_loc_mgt");

    //콤보박스 렌더 정보 등록
    // pageManager.gridManager.AddSelectBoxInfo(grid02.name,"po_in_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");

    //체크박스 T/F 정보 등록..
    // pageManager.gridManager.AddCheckRenderOption(grid02.name,"use_yn", "Y", "N");



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //폼 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    pageManager.frmManager.AddForm(search_frm_id);
    pageManager.frmManager.AddForm(detail_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm", "", "전체");
    //폼 팝업 등록
    // let caller_name = "pop_whs_cd";
    // let target_name = ["whs_cd","whs_nm"];
    // pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_whs_cd.ShowFormDialog, target_name);

    //폼 팝업 등록
    let caller_name = "pop_prt_nbr_cd";
    let target_name = ["prt_nbr_cd","prt_nbr_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowFormDialog, target_name);
    
    // caller_name = "pop_biz_cd";
    // target_name = ["biz_cd","biz_nm"];
    // pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_biz_cd.ShowFormDialog, target_name);
    caller_name = "pop_ship_cd";
    target_name = ["ship_cd","ship_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_ship_cd.ShowFormDialog, target_name);
    
    
    // detail_frm 팝업 등록
    caller_name = "pop_prt_nbr_cd";
    target_name = ["prt_nbr_cd","prt_nbr_nm", "spec", "po_in_unit", "po_in_unit_nm"];
    let from_name = ["prt_nbr_cd","prt_nbr_nm", "spec", "base_unit", "base_unit_nm"];
    pageManager.frmManager.AddPopupLink(detail_frm_id, caller_name, detail_pop_prt_nbr_cd.ShowFormDialog, target_name, from_name);
    
    caller_name = "pop_ship_cd";
    target_name = ["biz_cd", "biz_nm", "out_ship_cd","out_ship_nm"];
    from_name = ["biz_cd", "biz_nm", "ship_cd","ship_nm"];
    pageManager.frmManager.AddPopupLink(detail_frm_id, caller_name, detail_pop_ship_cd.ShowFormDialog, target_name, from_name);

    //그리드 초기화..
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //버튼함수와 연결...
    pageManager.BindButtonFunction([Const.MesButton.Save, Const.MesButton.DeleteRow]);
    // pageManager.BindButtonFunction();

    //그리드 초기화...
    pageManager.InitializeComponent();

    grid02.onClick = function(obj){
        let clicked_row = w2ui[this.name].last.click_recid-1;
        let clicked_rec = w2ui[this.name].records[clicked_row];


        // let grid01_clicked_row = w2ui['grid01'].last.click_recid-1;
        // let grid01_clicked_rec = w2ui['grid01'].records[grid01_clicked_row];

        if(clicked_rec.cu !== undefined && clicked_rec.cu.toUpperCase() == "C") {
            // let frm_name = "detail_frm";
            // set_selects(["unit_cd", "in_whs_cd"]);
            // common.init_frm(frm_name);

            $(".activeInput").addClass("popW");
            $("#detail_frm .popBt").css("display", "");



        }else{
            $(".activeInput").removeClass("popW");
            $("#detail_frm .popBt").css("display", "none");
        }

        document.detail_frm.po_in_no.value = (clicked_rec.po_in_no == null) ? '' : clicked_rec.po_in_no;

        document.detail_frm.in_dt.value = (clicked_rec.in_dt == null) ? common.getTimeStamp() : clicked_rec.in_dt.substr(0, 10);

        document.detail_frm.in_qty.value = (clicked_rec.in_qty == null) ? '' : clicked_rec.in_qty;
        document.detail_frm.lotno.value = (clicked_rec.out_ship_cd == null) ? '*' : clicked_rec.out_ship_cd;
        document.detail_frm.out_ship_cd.value = (clicked_rec.out_ship_cd == null) ? '*' : clicked_rec.out_ship_cd;
        document.detail_frm.out_ship_nm.value = (clicked_rec.out_ship_nm == null) ? '*' : clicked_rec.out_ship_nm;
        document.detail_frm.remark.value = (clicked_rec.remark == null) ? '' : clicked_rec.remark;
        document.detail_frm.prt_nbr_cd.value = clicked_rec.prt_nbr_cd == null ? '' : clicked_rec.prt_nbr_cd;
        document.detail_frm.prt_nbr_nm.value = clicked_rec.prt_nbr_nm == null ? '' : clicked_rec.prt_nbr_nm;
        document.detail_frm.spec.value = clicked_rec.spec == null ? '' : clicked_rec.spec;
        document.detail_frm.biz_cd.value = clicked_rec.out_biz_cd == null ? '' : clicked_rec.out_biz_cd;
        document.detail_frm.biz_nm.value = clicked_rec.out_biz_nm == null ? '' : clicked_rec.out_biz_nm;
        document.detail_frm.po_in_unit.value = clicked_rec.po_in_unit == null ? '' : clicked_rec.po_in_unit;
        document.detail_frm.po_in_unit_nm.value = clicked_rec.po_in_unit_nm == null ? '' : clicked_rec.po_in_unit_nm;

//         $(document.detail_frm.po_in_unit).html("<option value="+(clicked_rec.po_in_unit ? clicked_rec.po_in_unit : '')+">"+(clicked_rec.po_in_unit_nm ? clicked_rec.po_in_unit_nm : '')+"</option>");

        // 검사여부가 Y 이면 검사대기창고(W0001) N 이면 원자재창고(W0002) 넣기
//         let in_whs_cd = (clicked_rec.in_whs_cd ? clicked_rec.in_whs_cd : (clicked_rec.inspct_yn ? "W0001" : "W0002"));
//         let in_whs_nm = (clicked_rec.whs_nm ? clicked_rec.whs_nm : (clicked_rec.inspct_yn ? "검사대기창고" : "원자재창고"));
//         $(document.detail_frm.in_whs_cd).html("<option value="+in_whs_cd+">"+in_whs_nm+"</option>");
//         common.exCode({table:"tbm_whsinfo", where:{whs_nm: "원자재창고"}}).then((res)=>{
//             common.draw_select(frm_name, "in_whs_cd", res.data, 'whs_cd', 'whs_nm');
//         });

        // 입고 위치가 없으면 SELECT base_loc_cd FROM tbm_prtnbrinfo WHERE fact_cd = 'fact_cd' AND prt_nbr_cd = 'prt_nbr_cd' 가져와 뿌려준다.
        let in_loc_cd = (clicked_rec.in_loc_cd ? clicked_rec.in_loc_cd : '');
        let loc_nm = (clicked_rec.loc_nm ? clicked_rec.loc_nm : '');
        if(in_loc_cd == ''){
            let frm_name = "detail_frm";
//             common.exCode({table:"tbm_prtnbrinfo", where : {fact_cd : 'winp01', prt_nbr_cd: 'CT-PBF-252'}}).then((res)=>{
//                 common.draw_select(frm_name, "in_loc_cd", res.data, 'base_loc_cd', 'base_loc_cd');
//             });
        }else{
            $(document.detail_frm.in_loc_cd).html("<option value="+in_loc_cd+">"+loc_nm+"</option>");
        }


//         console.log('obj', obj);
//         console.log('this', this);
    }

    let set_selects = function(except_col = []){
        let frm_name = "detail_frm";
        // 입고단위: po_in_unit
        if(except_col.indexOf("unit_cd") == -1){
            common.code({up_cd:"unit_cd"}).then((res)=>{
                common.draw_select(frm_name, "po_in_unit", res.data, 'cd', 'cd_nm');
            });
        }
        // 입고창고: in_whs_cd
        if(except_col.indexOf("in_whs_cd") == -1){
            common.exCode({table:"tbm_whsinfo"}).then((res)=>{
                common.draw_select(frm_name, "in_whs_cd", res.data, 'whs_cd', 'whs_nm');
            });
        }
        // 입고위치: in_loc_cd
        if(except_col.indexOf("tbm_whslocinfo") == -1){
            common.exCode({table:"tbm_whslocinfo"}).then((res)=>{
                common.draw_select(frm_name, "in_loc_cd", res.data, 'loc_cd', 'loc_nm');
            });
        }
    }

    // 입고 창고 변경하면 입고위치 리스트 연동
    $(document.detail_frm.in_whs_cd).on("change", function(){
        let frm_name = "detail_frm";
        let row = w2ui.grid02.records[w2ui.grid02.last.click_recid - 1];
        if(row.cu !== undefined && row.cu.toUpperCase() == "C") {   // 입고 창고가 바뀔때 입고위치 리스트도 바뀌어야 한다.
            let fact_cd = w2ui.grid02.records[w2ui.grid01.last.click_recid - 1].fact_cd;
            common.exCode({table:"tbm_whslocinfo", where:{fact_cd: fact_cd, whs_cd: document.detail_frm.in_whs_cd.value}}).then((res)=>{
                common.draw_select(frm_name, "in_loc_cd", res.data, 'loc_cd', 'loc_nm');
            });
        }
        console.log('in_whs_cd');
    });

    // 초기화, 추가 버튼
    $("#hBtnB0002, #hBtnB0003").on("click", function(){
        let frm_name = "detail_frm";
        common.init_frm(frm_name, ["today"]);
        document.detail_frm.in_whs_cd.value = "W1100";
        document.detail_frm.in_whs_nm.value = "원자재창고";
        document.detail_frm.in_loc_cd.value = "*";
        document.detail_frm.in_loc_nm.value = "*";
        if(this.id == "hBtnB0003"){
            w2ui.grid02.last.click_recid = w2ui.grid02.records.length;
            w2ui.grid02.selectNone();
            w2ui.grid02.select(w2ui.grid02.records.length);
            let added_row = common.get_last_clicked_row()['grid02'];
            added_row.po_in_unit_nm = added_row.cd_nm;
            added_row.po_in_unit = added_row.po_unit;
            w2ui.grid02.refresh();
            $("#grid_grid02_rec_"+added_row.recid).click();
        }
    });

    function refresh(){
        $.ajax({
            url: "/ajax/material/input/get/directpurchininfo_wp",
            type: "get",
            data: w2ui.grid02.lastGetParam,
            dataType: "json",
            success: function(data){
                console.log(data);
                w2ui.grid02.records = W2UiHelper.AddRecID(data.data);
                w2ui.grid02.refresh();
            }
        })
    }

    // 저장 버튼
    $("#hBtnB0005").on("click", function(obj){
        $(".loadingW").css("display", "");
        let param = common.get_last_clicked_row();
        let ajax_url = "/ajax/material/input/save/mtrl_direct_input_mgt_wp";
        param['data'] = FormHelper.SerializeForm("detail_frm");
        param = ScriptHelper.AjaxArgumentBuild(param, "hBtnB0005", ajax_url);
        $.ajax({
            url: ajax_url,
            type: "post",
            data: param,
            dataType: "json",
            success: function(data){
                document.search_frm.prt_nbr_cd.value = document.detail_frm.prt_nbr_cd.value;
                document.search_frm.prt_nbr_nm.value = document.detail_frm.prt_nbr_nm.value;
                if(data.result){
                    refresh();
                    $(".loadingW").css("display", "none");
                    common.success_msg(data.msg);
                }else{
                    $(".loadingW").css("display", "none");
                    common.mes_alert(data);
                }
            },
        });
    });

    $("#hBtnB0004").on("click", function(obj){
        w2confirm(Const.MesMsg.confirm)
            .yes(() => {
                $(".loadingW").css("display", "");
                let param = common.get_last_clicked_row();
                let ajax_url = "/ajax/material/input/delete/mtrl_direct_input_mgt_wp";
//                 param['data'] = FormHelper.SerializeForm("detail_frm");
                

                // modify from here.
                let del_rows = [];
                for(let key in w2ui.grid02.records){
                    if(w2ui.grid02.records[key].w2ui !== undefined){
                        if(w2ui.grid02.records[key].w2ui.changes.chk){
                            del_rows.push(w2ui.grid02.records[key]);    
                        }
                    }
                }
                param['data'] = del_rows;
                console.log(del_rows);
                param = ScriptHelper.AjaxArgumentBuild(param, "hBtnB0004", ajax_url);
                $.ajax({
                    url: ajax_url,
                    type: "post",
                    data: param,
                    dataType: "json",
                    success: function(data){
                        console.log("data", data);
                        $(".loadingW").css("display", "none");
                        if(data.result){
                            refresh();
                            common.success_msg(data.msg);
                        }else{
                            common.mes_alert(data);
                        }
                    },
                });
            })
            .no(() => {
                return false;
            });

    });

    //div에 클릭펑션 먹인거...
    $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid02.name;
    // set_selects();
});
