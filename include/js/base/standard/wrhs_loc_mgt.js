import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_whs_cd from "/include/js/popups/pop_whs_cd.js";
$(function () {
    let grid01 = {
        name: 'grid01',
        header: '창고정보',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, style: 'text-align: right'},
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장', size: '80px', sortable: true, editable: { type: 'select'}},
            { field: 'whs_cd', caption: '창고코드', size: '100px', sortable: true, editable: { type: 'text', maxLength: 20}},
            { field: 'whs_nm', caption: '창고', size: '100px', editable: { type: 'text', maxLength: 50}},
            { field: 'use_yn', caption: '사용여부', size: '100px', editable: { type: 'checkbox'}},
            { field: 'remark', caption: '비고', size: '300px', editable: { type: 'text', maxLength: 1000}},
            { field: 'inst_id', caption: '입력자 ID', size: '100px' },
            { field: 'inst_dt', caption: '입력일시', size: '100px', style: 'text-align: center'},
            { field: 'updt_id', caption: '수정자 ID', size: '100px' },
            { field: 'updt_dt', caption: '수정일시', size: '100px', style: 'text-align: center' }
        ],
        fncPostSearch : function (res) {
            let search_id = "#grid_"+this.name+"_rec_1";
            $(search_id).click();
        }
        // records: [
        //     { recid: 1, fact_cd: 'm01-01', fact_nm: 'M01', whs_cd:'m333', whs_nm:'창고1', use_yn: true, inst_id: 'themomos', remark:'기타 비고사항', inst_id:'themomos', inst_dt:'2020-10-21', updt_id:'themomos', updt_dt:'2020-10-21', chk: true },
        //     { recid: 2, fact_cd: 'm01-01', fact_nm: 'M02', whs_cd:'m333', whs_nm:'창고1', use_yn: false, inst_id: 'themomos', remark:'기타 비고사항', inst_id:'themomos', inst_dt:'2020-10-21', updt_id:'themomos', updt_dt:'2020-10-21'},
        //     { recid: 3, fact_cd: 'm01-01', fact_nm: 'M03', whs_cd:'m333', whs_nm:'창고1', use_yn: true, inst_id: 'themomos', remark:'기타 비고사항', inst_id:'themomos', inst_dt:'2020-10-21', updt_id:'themomos', updt_dt:'2020-10-21'},
        //     { recid: 4, fact_cd: 'm01-01', fact_nm: 'M04', whs_cd:'m333', whs_nm:'창고1', use_yn: true, inst_id: 'themomos', remark:'기타 비고사항', inst_id:'themomos', inst_dt:'2020-10-21', updt_id:'themomos', updt_dt:'2020-10-21'}
        // ],
    };
    let grid02 = {
        name: 'grid02',
        header: '창고위치',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, editable: { type: 'select'}},
            { field: 'whs_cd', caption: '창고코드', size: '100px', sortable: true, editable: { type: 'text'}},
            //{ field: 'whs_nm', caption: '창고', size: '150px',editable: { type: 'text'}},
            { field: 'loc_cd', caption: '위치코드', size: '100px', sortable: true, editable: { type: 'text'}},
            { field: 'loc_nm', caption: '위치', size: '100px', editable: { type: 'text', maxLength: 20} },
            { field: 'use_yn', caption: '사용여부', size: '100px', editable: { type: 'checkbox' }},
            { field: 'remark', caption: '비고', size: '300px', editable: { type: 'text'}},
            { field: 'inst_id', caption: '입력자 ID', size: '100px' },
            { field: 'inst_dt', caption: '입력일시', size: '100px', style: 'text-align: center'},
            { field: 'updt_id', caption: '수정자 ID', size: '100px' },
            { field: 'updt_dt', caption: '수정일시', size: '100px', style: 'text-align: center'}
        ]
    };


    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "wrhs_loc_mgt";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id,page_addr_name);

    let pop_whs_cd = new Pop_whs_cd(pageManager, search_frm_id);
    pop_whs_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
    pop_whs_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
    pop_whs_cd.AddTargetColumnsOnPopupClose(["fact_cd","whs_cd", "whs_nm"], ["fact_cd","whs_cd", "whs_nm"]);
    //팝업 매칭필드 등록

    //1번 그리드 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid01 = pageManager.gridManager.AddGrid(grid01);
    //팝업등록
    pageManager.gridManager.AddPopUpOption(grid01.name,"whs_cd", pop_whs_cd.PopupName);


    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");

    //PK, 필수입력, Readonly 필드 등록
    pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "whs_cd"]);
    // pageManager.gridManager.SetReadonlyFields(grid01.name,  ["prt_nbr_dsp_nm"]);
    pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["whs_nm"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/base/standard/get/wrhs_loc");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/base/standard/delete/wrhs_loc");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/base/standard/save/wrhs_loc");
    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //체크박스 T/F 정보 등록..
    pageManager.gridManager.AddCheckRenderOption(grid01.name,"use_yn", "Y", "N");
    //pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "whs_cd"]);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //2번 그리드....
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid02 = pageManager.gridManager.AddGrid(grid02);
    //팝업등록
    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid02.name, "chk");

    //PK, 필수입력, Readonly 필드 등록
    pageManager.gridManager.SetPkFields(grid02.name,  ["fact_cd", "whs_cd","loc_cd"]);
    pageManager.gridManager.SetReadonlyFields(grid02.name,  ["whs_nm"]);
    pageManager.gridManager.SetCompulsoryFields(grid02.name,  ["loc_nm"]);

    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.Search, "/ajax/base/standard/get/wrhs_loc_mgt");
    pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.DeleteRow, "/ajax/base/standard/delete/wrhs_loc_mgt");
    pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.Save, "/ajax/base/standard/save/wrhs_loc_mgt");

    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid02.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //체크박스 T/F 정보 등록..
    pageManager.gridManager.AddCheckRenderOption(grid02.name,"use_yn", "Y", "N");



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //폼 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //폼 팝업 등록
    let caller_name = "pop_whs_cd";
    let target_name = ["whs_cd","whs_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_whs_cd.ShowFormDialog, target_name);


    //그리드 초기화..
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //버튼함수와 연결...
//     pageManager.BindButtonFunction([Const.MesButton.Save]);
    pageManager.BindButtonFunction();

    //그리드 초기화...
    pageManager.InitializeComponent();

    //클릭펑션 지정
    let grid01_click =  function (event) {
        let record = this.records[event.recid - 1];
        if(record.fact_cd !== undefined && record.whs_cd !== undefined)
        {
            w2ui['grid02'].clear();
            // w2ui['grid02'].add([
            //     { recid: 1, fact_cd: record.fact_cd, fact_nm: record.fact_nm, whs_cd: record.whs_cd, whs_nm: record.whs_nm, use_yn: record.use_yn, remark: record.remark, inst_id: record.inst_id, inst_dt: record.inst_dt, updt_id: record.updt_id, updt_dt: record.updt_dt }
            // ]);
            Const.SelectedGridID = "grid02";
            let param = {
                where : {
                    fact_cd: record.fact_cd,
                    whs_cd: record.whs_cd,
                }
            };
            pageManager.gridManager.SetSearchParam("grid02", param);
            // pageManager.BtnFuncList.search(event, param,true);
            pageManager.BtnFuncList.search(event, true, {loading:false});
            Const.SelectedGridID = event.target;
        }
    };
    grid01.onClick= grid01_click;
    //div에 클릭펑션 먹인거...
    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});
    //선택한 그리드 초기지정.
    Const.SelectedGridID = grid01.name;

});
