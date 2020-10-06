import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_op_cd from "/include/js/popups/pop_op_cd.js";
// import Pop_whs_cd from "../../popups/pop_whs_cd";

$(function () {
    let grid = {
        name: 'grid',
        columns: [
            {field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
            {field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, editable: {type: 'checkbox'}},
            {field: 'fact_cd', caption: '공장', size: '80px', sortable: true, resizable: true, /*hidden:true,*/ editable: {type: 'select',},},
            {field: 'op_cd', caption: '공정코드', size: '100px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 20}/*, hidden: true*/},
            {field: 'op_nm', caption: '공정', size: '100px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 50},},
            {field: 'color_desc', caption: '색상', size: '100px', sortable: true, resizable: true, editable: {type: 'color'},},
            {field: 'dept_cd', caption: '관리부서', size: '70px', sortable: true, resizable: true, /*hidden:true,*/ editable: { type: 'select'},},
            {field: 'use_yn', caption: '사용여부', size: '70px', sortable: true, resizable: true, style: 'text-align: center', editable: {type: 'checkbox', style: 'text-align: center',}},
            {field: 'remark', caption: '비고', size: '200px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 1000}},
            {field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true,/* editable: { type: 'text' }*/},
            {field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center',/* editable: { type: 'date' }*/},
            {field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true,/* editable: { type: 'text' }*/},
            {field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center',/* editable: { type: 'date' }*/}
        ],
    };

    let search_frm_id = "search_frm";
    let bnt_frm_id = "hbtn_frm";
    let page_addr_name = "oprt_mgt";
    let pageManager = new GridPageManager(search_frm_id, bnt_frm_id, page_addr_name);
    let pop_op_cd = new Pop_op_cd(pageManager, search_frm_id);

    // let pop_whs_cd = new Pop_whs_cd(pageManager, search_frm_id);
    pop_op_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);

    //1번 그리드 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid = pageManager.gridManager.AddGrid(grid);
    //팝업등록
    // pageManager.gridManager.AddPopUpOption(grid.name,"whs_cd", pop_whs_cd.PopupName);

    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid.name, "chk");

    //PK, 필수입력, Readonly 필드 등록
    pageManager.gridManager.SetPkFields(grid.name,  ["fact_cd", "op_cd"]);
    // pageManager.gridManager.SetReadonlyFields(grid01.name,  ["prt_nbr_dsp_nm"]);
    pageManager.gridManager.SetCompulsoryFields(grid.name,  ["op_nm"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Search, "/ajax/base/product/get/opinfo");
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.DeleteRow, "/ajax/base/product/delete/opinfo");
    pageManager.gridManager.SetAjaxUrl(grid.name, Const.MesButton.Save, "/ajax/base/product/save/opinfo");
    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid.name,"dept_cd", common.code, {up_cd: "dept_cd"}, "cd", "cd_nm");

    //체크박스 T/F 정보 등록..
    pageManager.gridManager.AddCheckRenderOption(grid.name,"use_yn", "Y", "N");
    // pageManager.gridManager.SetPkFields(grid.name,  ["fact_cd", "whs_cd"]);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //폼 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","dept_cd", common.code, {up_cd: "dept_cd"}, "cd", "cd_nm", "", "전체");
    //폼 팝업 등록
    let caller_name = "pop_op_cd";
    let target_name = ["op_cd","op_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_op_cd.ShowFormDialog, target_name);


    //그리드 초기화..
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //버튼함수와 연결...
    pageManager.BindButtonFunction();

    //그리드 초기화...
    pageManager.InitializeComponent();

    //클릭펑션 지정
    // let grid01_click =  function (event) {
    //     let record = this.records[event.recid - 1];
    //     if(record.fact_cd !== undefined && record.whs_cd !== undefined)
    //     {
    //         w2ui['grid02'].clear();
    //         // w2ui['grid02'].add([
    //         //     { recid: 1, fact_cd: record.fact_cd, fact_nm: record.fact_nm, whs_cd: record.whs_cd, whs_nm: record.whs_nm, use_yn: record.use_yn, remark: record.remark, inst_id: record.inst_id, inst_dt: record.inst_dt, updt_id: record.updt_id, updt_dt: record.updt_dt }
    //         // ]);
    //         Const.SelectedGridID = "grid02";
    //         let param = {
    //             where : {
    //                 fact_cd: record.fact_cd,
    //                 whs_cd: record.whs_cd,
    //             }
    //         };
    //         pageManager.gridManager.SetSearchParam("grid02", param);
    //         pageManager.BtnFuncList.search(event, param,true);
    //         Const.SelectedGridID = event.target;
    //     }
    // };
    // grid.onClick= grid01_click;
    //div에 클릭펑션 먹인거...
    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid.name;});
    // $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid.name;

});


// import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
// import GridPageManger from "/include/js/class/GridPageManger.js";
//
// $(function () {
//     let grid01 = {
//         name: 'grid',
//         columns: [
//             {field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
//             {field: 'selected', caption: '선택', size: '100px', sortable: true, resizable: true, editable: {type: 'checkbox'}},
//             {field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, /*hidden:true,*/ editable: {type: 'select',},},
//             {field: 'op_cd', caption: '공정코드', size: '100px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 20}/*, hidden: true*/},
//             {field: 'op_nm', caption: '공정', size: '150px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 50},},
//             {field: 'color_desc', caption: '색상', size: '150px', sortable: true, resizable: true, editable: {type: 'color'},},
//             {field: 'dept_cd', caption: '관리부서', size: '100px', sortable: true, resizable: true, /*hidden:true,*/ editable: { type: 'select'},},
//             {field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: {type: 'checkbox', style: 'text-align: center',}},
//             {field: 'remark', caption: '비고', size: '200px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 1000}},
//             {field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true,/* editable: { type: 'text' }*/},
//             {field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center',/* editable: { type: 'date' }*/},
//             {field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true,/* editable: { type: 'text' }*/},
//             {field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center',/* editable: { type: 'date' }*/}
//         ],
//     };
//
//     let search_frm_id = "search_frm";
//     let bnt_frm_id = "hbtn_frm";
//     let pageManager = new GridPageManger(search_frm_id, bnt_frm_id);
//
//
//     //1번 그리드 등록
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     grid01 = pageManager.gridManager.AddGrid(grid01);
//     //팝업등록
//     // pageManager.gridManager.AddPopUpOption(grid01.name,"whs_cd", pop_wrhs_mgt.PopupName);
//     //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
//     pageManager.gridManager.SetSelectionCheckField(grid01.name, "selected");
//
//     //PK, 필수입력, Readonly 필드 등록
//     pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "op_cd"]);
//     // pageManager.gridManager.SetReadonlyFields(grid01.name,  ["prt_nbr_dsp_nm"]);
//     // pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["whs_nm"]);
//
//     //버튼에 대한 Ajax 경로
//     pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/base/product/get/opinfo");
//     pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/base/product/delete/opinfo");
//     pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/base/product/save/opinfo");
//     //콤보박스 렌더 정보 등록
//     pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
//     pageManager.gridManager.AddSelectBoxInfo(grid01.name,"dept_cd", common.code, {up_cd: "dept_cd"}, "cd", "cd_nm");
//     //체크박스 T/F 정보 등록..
//     pageManager.gridManager.AddCheckRenderOption(grid01.name,"use_yn", "Y", "N");
//     // pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "whs_cd"]);
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//     //폼 등록
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     pageManager.frmManager.AddForm(search_frm_id);
//     //콤보박스 등록
//     pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
//     pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","dept_cd", common.code, {up_cd: "dept_cd"}, "cd", "cd_nm", "", "전체");
//
//     //폼 팝업 등록
//     let caller_name = "btn_pop_prt_nbr_cd";
//     let target_name = "prt_nbr_cd";
//     pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_wrhs_mgt.ShowFormDialog, target_name);
//
//     //그리드 초기화..
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     //버튼함수와 연결...
//     pageManager.BindButtonFunction();
//
//     //그리드 초기화...
//     pageManager.InitializeComponent();
//
//     //클릭펑션 지정
//     let grid01_click =  function (event) {
//         let record = this.records[event.recid - 1];
//         if(record.fact_cd !== undefined && record.whs_cd !== undefined)
//         {
//             w2ui['grid02'].clear();
//             // w2ui['grid02'].add([
//             //     { recid: 1, fact_cd: record.fact_cd, fact_nm: record.fact_nm, whs_cd: record.whs_cd, whs_nm: record.whs_nm, use_yn: record.use_yn, remark: record.remark, inst_id: record.inst_id, inst_dt: record.inst_dt, updt_id: record.updt_id, updt_dt: record.updt_dt }
//             // ]);
//             Const.SelectedGridID = "grid02";
//             let param = {
//                 where : {
//                     fact_cd: record.fact_cd,
//                     whs_cd: record.whs_cd,
//                 }
//             };
//             pageManager.gridManager.SetSearchParam("grid02", param);
//             pageManager.BtnFuncList.search(event, param,true);
//             Const.SelectedGridID = event.target;
//         }
//     };
//     grid01.onClick= grid01_click;
//     $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
//     // $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});
//     //선택한 그리드 초기지정.
//     Const.SelectedGridID = grid01.name;
//
//     // //항상 젤 위에서 호출...
//     // init_grid();
//     //
//     // //기본 버튼 펑션 등록...
//     // let pageManager = new SingleGridPageManager("id", "grid", "id", "search_frm", "selected", ["fact_cd", "op_cd"]);
//     //
//     // //버튼에 대한 url 등록
//     // pageManager.SetAjaxUrl(PageManager.Buttons.Search, "/ajax/base/product/get/opinfo");
//     // pageManager.SetAjaxUrl(PageManager.Buttons.DeleteRow, "/ajax/base/product/delete/opinfo");
//     // pageManager.SetAjaxUrl(PageManager.Buttons.Save, "/ajax/base/product/save/opinfo");
//     // // 디비 인터페이스 없는 것들은 url 등록할 필요 없다.
//     // // pageManager.SetAjaxUrl(PageManager.evtButtons.AddRow, "");
//     // // pageManager.SetAjaxUrl(PageManager.evtButtons.Initialize, "");
//     //
//     // //폼에 있는 콤보박스 정보 등록
//     // pageManager.SetFormSelectBox("name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
//     // //default_value 가 없으면 콤보박스 기본값을 안 만든다.
//     // pageManager.SetFormSelectBox("name", "dept_cd", common.code, {up_cd: "dept_cd"}, "cd", "cd_nm", "", "ALL");
//     // //폼 콤보박스 전체 데이터 불러오기..
//     // pageManager.InitFormSelectBox();
//     //
//     // //콤보박스 다시 채워줄때 호출...부모 콤보박스가 변경될때 하위 콤보박스 데이터 변경이 생기면 사용
//     // //pageManager.FillFormSelectBox("name","fact_cd", {up_cd: "fact_cd"}, 1);
//     //
//     // //그리드 콤보박스 정보 등록
//     // pageManager.SetGridSelectBox("dept_cd", common.code, {up_cd: "dept_cd"}, "cd", "cd_nm");
//     // pageManager.SetGridSelectBox("fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
//     // //그리드 콤보박스 초기화
//     // pageManager.InitGridSelectBox();
//     //
//     // //그리드 체크박스 정보 등록
//     // pageManager.SetGridCheckRenderOption("use_yn", "Y", "N");
//     //
//     // //그리드 체크박스 초기화
//     // pageManager.InitGirdCheckBox();
//
// });
//
//
// function init_grid() {
//     $('#grid').w2grid({
//         name: 'grid',
//         show: {
//             toolbar: false,
//             footer: false,
//             toolbarSave: false
//         },
//         columns: [
//             {field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true, style: 'text-align: right'},
//             {field: 'selected', caption: '선택', size: '100px', sortable: true, resizable: true, editable: {type: 'checkbox'}},
//             {field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, /*hidden:true,*/ editable: {type: 'select',},},
//             {field: 'op_cd', caption: '공정코드', size: '100px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 20}/*, hidden: true*/},
//             {field: 'op_nm', caption: '공정', size: '150px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 50},},
//             {field: 'color_desc', caption: '색상', size: '150px', sortable: true, resizable: true, editable: {type: 'color'},},
//             {field: 'dept_cd', caption: '관리부서', size: '100px', sortable: true, resizable: true, /*hidden:true,*/ editable: { type: 'select'},},
//             {field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: {type: 'checkbox', style: 'text-align: center',}},
//             {field: 'remark', caption: '비고', size: '200px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 1000}},
//             {field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true,/* editable: { type: 'text' }*/},
//             {field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center',/* editable: { type: 'date' }*/},
//             {field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true,/* editable: { type: 'text' }*/},
//             {field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center',/* editable: { type: 'date' }*/}
//         ],
//         toolbar: {
//             items: [
//                 {
//                     id: 'add',
//                     type: 'button',
//                     caption: 'Add Record',
//                     icon: 'w2ui-icon-plus'
//                 }
//             ],
//         },
//         records: null
//     });
// }
