import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "../../class/PageManager.js";
import GridPageManager from "../../class/GridPageManager.js";
import Pop_prt_nbr_cd_wp from "../../popups/pop_prt_nbr_cd_wp.js";
import Pop_loc_cd from "../../popups/pop_loc_cd.js";
import Pop_whs_cd from "../../popups/pop_whs_cd.js";

$(function () {
    $.ajax({ // 처음 웹페이지 로딩시 표시하기 위해
        type: 'POST',
        data: null,
        url: '/ajax/base/standard/get/codeinfo',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            let grid01 = {
                name: 'grid01',
                selectType : 'cell',
                columns: [
                    {field: 'recid', caption: 'NO', size: '50px', sortable: false, resizable: true, render: 'number', frozen: true},
                    { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center',
                        editable: { type: 'checkbox' , items:[{id:"Y", value:true},{id:"N", value:false}]}
                    },
                    // {field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: false, editable: {type: 'text'}},
                    {field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true, frozen: false,
                        editable: {type: 'select'}, //items: [{id: '', text: ''}].concat(fact_cd)},
                    },
                    {field: 'prt_nbr_cd', caption: '품번코드', size: '300px', sortable: true, resizable: true, hidden: false,
                        editable : false
                    },
                    {field: 'prt_nbr_nm', caption: '품번명', size: '150px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 20}},
                    {field: 'spec', caption: '규격', size: '70px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 50}},
                    {field: 'unit_length', caption: '길이', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}, style: 'text-align: right'},
                    {field: 'unit_color', caption: '컬러', size: '70px', sortable: true, resizable: true, editable: {type: 'text'}},
                    {field: 'prt_nbr_dsp_nm', caption: '모니터링 품번명', size: '150px', sortable: true, resizable: true, editable: {type: 'text', min: 0, max: 32756, maxLength: 50}},
                    //{field: 'prt_nbr_grp_cd', caption: '품번그룹 코드', size: '100px', sortable: true, resizable: true, hidden: false, editable: {type: 'text'}},
                    {field: 'prt_nbr_grp_cd', caption: '품번그룹', size: '70px', sortable: true, resizable: true, editable: {type: 'select'}//, items: [{id: '', text: ''}].concat(prt_nbr_grp_cd)},
                    },
                    //{field: 'base_unit', caption: '기준단위 코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text', min: 0, max: 32756}},
                    {field: 'base_unit', caption: '기준단위', size: '70px', sortable: true, resizable: true, editable: {type: 'select'}//, items: [{id: '', text: ''}].concat(units)},
                    },
                    // {field: 'unit_color', caption: '컬러', size: '100px', sortable: true, resizable: true, editable: {type: 'color', maxLength: 20}},
                    {field: 'unit_thick', caption: '두께', size: '70px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
                    {field: 'unit_width', caption: '폭', size: '70px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
                    {field: 'unit_weight', caption: '중량', size: '70px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
                    {field: 'lot_mgt_yn', caption: 'LOT관리여부', size: '100px', sortable: true, resizable: true, editable: {type: 'checkbox'}},
                    {field: 'lot_size', caption: 'LOT사이즈', size: '70px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
                    {field: 'instd_prt_nbr', caption: '대체품번', size: '100px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 20}},
                    //{field: 'account_type', caption: '계정유형코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text'}},
                    {field: 'account_type', caption: '계정유형', size: '70px', sortable: true, resizable: true, editable: {type: 'select'}//, items: [{id: '', text: ''}].concat(account_type)},
                    },
                    //{field: 'supply_type', caption: '조달유형코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text'}},
                    {field: 'supply_type', caption: '조달유형', size: '70px', sortable: true, resizable: true, editable: {type: 'select'}//, items: [{id: '', text: ''}].concat(supply_type)},
                    },
                    //{field: 'sagub_type', caption: '사급유형코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text'}},
                    {field: 'sagub_type', caption: '사급유형', size: '70px', sortable: true, resizable: true, editable: {type: 'select'}//, items: [{id: '', text: ''}].concat(sagub_type)},

                    },
                    {field: 'inspct_yn', caption: '검사여부', size: '70px', sortable: true, resizable: true, editable: {type: 'checkbox'}},
                    {field: 'cycle_tm', caption: '사이클타임', size: '70px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
                    {field: 'uph', caption: 'UPH', size: '70px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
                    {field: 'unit_price', caption: '단가', size: '70px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
                    {field: 'safe_stck', caption: '안전재고', size: '70px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
                    {field: 'unit_reprice', caption: '재작업단가', size: '70px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
                    {field: 'base_whs_cd', caption: '기준창고코드', size: '100px', sortable: true, resizable: true},
                    {field: 'base_whs_nm', caption: '기준창고명', size: '100px', sortable: true, resizable: true},
                    {field: 'base_loc_cd', caption: '기준위치코드', size: '100px', sortable: true, resizable: true},
                    {field: 'base_loc_nm', caption: '기준위치명', size: '100px', sortable: true, resizable: true},
                    {field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, editable: {type: 'checkbox'}},
                    {field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: {type: 'text'}},
                    {field: 'inst_id', caption: '입력자 ID', size: '100px', sortable: true, resizable: true},
                    {field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
                    {field: 'updt_id', caption: '수정자 ID', size: '100px', sortable: true, resizable: true},
                    {field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
                ],
                toolbar: {
                    items: [
                        {id: 'add', type: 'button', caption: 'Add Record', icon: 'w2ui-icon-plus'}
                    ],

                },
            };

            let search_frm_id = "search_frm";
            let bnt_frm_id = "hbtn_frm";
            let pageManager = new GridPageManager(search_frm_id, bnt_frm_id);
            let pop_prt_nbr_cd_wp = new Pop_prt_nbr_cd_wp(pageManager, search_frm_id);
            let pop_whs_cd = new Pop_whs_cd(pageManager, search_frm_id);
            let pop_loc_cd = new Pop_loc_cd(pageManager, search_frm_id);

            pop_prt_nbr_cd_wp.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
            pop_whs_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
            pop_loc_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);

            pop_whs_cd.AddTargetColumnsOnPopupClose(["whs_cd","whs_nm"], ["base_whs_cd","base_whs_nm"]);
            pop_loc_cd.AddTargetColumnsOnPopupClose(["fact_cd","loc_cd","loc_nm"],["fact_cd","base_loc_cd","base_loc_nm"]);

            //1번 그리드 등록
            grid01 = pageManager.gridManager.AddGrid(grid01);
            //팝업등록
            pageManager.gridManager.AddPopUpOption(grid01.name,"base_whs_cd", pop_whs_cd.PopupName);


            if(data.data[0]["cd_set1"] == 'Y'){
                pageManager.gridManager.SetReadonlyFields(grid01.name,  ["prt_nbr_cd","base_whs_nm"]);
                pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["prt_nbr_nm","spec","unit_length","unit_color","prt_nbr_grp_cd","base_unit","account_type","supply_type","base_whs_cd"]);
            }else{
                pageManager.gridManager.AddPopUpOption(grid01.name, "base_loc_cd", pop_loc_cd.PopupName);
                pageManager.gridManager.SetReadonlyFields(grid01.name,  ["prt_nbr_cd","base_whs_nm","base_loc_nm"]);
                pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["prt_nbr_nm","spec","unit_length","unit_color","prt_nbr_grp_cd","base_unit","account_type","supply_type","base_whs_cd","base_loc_cd"]);
            }

            //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
            pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");

            //PK, 필수입력, Readonly 필드 등록
            pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd","prt_nbr_cd"]);

            // TODO : 2차배열로 넘김... [조건부 필드,참조할 필드,참조할 필드값] => 참조할 필드값 어느 특정값일때 조건부 필드는 필수입력이 되어야 한다.
            pageManager.gridManager.SetConditionalRequiredFields(grid01.name,[["sagub_type","supply_type",["25"]]]);

            //버튼에 대한 Ajax 경로
            pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/base/standard/get/part_nbr_mgt_wp");
            pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/base/standard/delete/part_nbr_mgt_wp");
            pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/base/standard/save/part_nbr_mgt_wp");
            //콤보박스 렌더 정보 등록
            pageManager.gridManager.AddSelectBoxInfo(grid01.name,"base_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");
            pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
            pageManager.gridManager.AddSelectBoxInfo(grid01.name,"prt_nbr_grp_cd", common.code, {up_cd: "prt_nbr_grp_cd"}, "cd", "cd_nm");
            pageManager.gridManager.AddSelectBoxInfo(grid01.name,"account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm");
            pageManager.gridManager.AddSelectBoxInfo(grid01.name,"supply_type", common.code, {up_cd: "supply_type"}, "cd", "cd_nm");
            pageManager.gridManager.AddSelectBoxInfo(grid01.name,"sagub_type", common.code, {up_cd: "sagub_type"}, "cd", "cd_nm");


            //체크박스 T/F 정보 등록..
            pageManager.gridManager.AddCheckRenderOption(grid01.name,"use_yn", "Y", "N");
            pageManager.gridManager.AddCheckRenderOption(grid01.name,"lot_mgt_yn", "Y", "N");
            pageManager.gridManager.AddCheckRenderOption(grid01.name,"inspct_yn", "Y", "N");


            //폼 등록
            pageManager.frmManager.AddForm(search_frm_id);
            //콤보박스 등록
            pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
            pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","prt_nbr_grp_cd", common.code, {up_cd: 'prt_nbr_grp_cd'}, "cd", "cd_nm", "", "전체");
            pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm", "", "전체");

            // pageManager.SetGridSelectBox("prt_nbr_cd", common.exCode, {table: "tbm_prtnbrinfo"}, "prt_nbr_cd", "prt_nbr_nm");



            //폼 팝업 등록
            let caller_name = "pop_prt_nbr_cd_wp";
            let target_name = ["prt_nbr_cd","prt_nbr_nm"];
            pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd_wp.ShowFormDialog, target_name);
            // pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_prt_nbr_cd.ShowGridDialog, target_name);


            //그리드 초기화..
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //버튼함수와 연결...
            pageManager.BindButtonFunction();

            //그리드 초기화...
            pageManager.InitializeComponent();

            $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});

            //선택한 그리드 초기지정.
            Const.SelectedGridID = grid01.name;


        },
        error: function (a,b,c) {
            console.log(a);
            console.log(b);
            console.log(c);
        },
    })

});
