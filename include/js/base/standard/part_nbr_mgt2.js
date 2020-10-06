import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";
import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/_PageManager4.js";
import SingleGridPageManager from "/include/js/class/SingleGridPageManager3.js";
// import SingleGridPopupManager from "/include/js/class/SingleGridPopupManager2.js";

// ScriptHelper.LoadScript('body',"/include/js/class/PopupManager.js");
$(function () {


    let popup_name = "pop_ptr_nbr_cd";
    let pop_ptr_nbr_cd = new Pop_prt_nbr_cd(popup_name);
    pop_ptr_nbr_cd.FormTarget =  $("#search_frm [name = 'prt_nbr_cd']");

    //
     //PopupManager[popup_name].ShowDialog();
    //싱글 그리드 클래스 인스턴스화

    let grid_id = "grid01";
    let grid_config = {
        name: grid_id,
        columns: [
            {field: 'recid', caption: 'NO', size: '50px', sortable: false, resizable: true, render: 'number', frozen: true},
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center',
                editable: { type: 'checkbox' , items:[{id:"Y", value:true},{id:"N", value:false}]}
            },
            // {field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: false, editable: {type: 'text'}},
            {field: 'fact_cd', caption: '공장', size: '150px', sortable: true, resizable: true, frozen: false,
                editable: {type: 'select'}, //items: [{id: '', text: ''}].concat(fact_cd)},
            },
            {field: 'prt_nbr_cd', caption: '품번코드(popup)', size: '200px', sortable: true, resizable: true, hidden: false, editable: {type: 'text', maxLength: 20, popup: true}},
            {field: 'prt_nbr_nm', caption: '품번', size: '150px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 20}},
            {field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 50}},
            {field: 'prt_nbr_dsp_nm', caption: '모니터링 품번명', size: '150px', sortable: true, resizable: true, editable: {type: 'text', min: 0, max: 32756, maxLength: 50}},
            //{field: 'prt_nbr_grp_cd', caption: '품번그룹 코드', size: '100px', sortable: true, resizable: true, hidden: false, editable: {type: 'text'}},
            {field: 'prt_nbr_grp_cd', caption: '품번그룹', size: '150px', sortable: true, resizable: true, editable: {type: 'select'}//, items: [{id: '', text: ''}].concat(prt_nbr_grp_cd)},
            },
            //{field: 'base_unit', caption: '기준단위 코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text', min: 0, max: 32756}},
            {field: 'base_unit', caption: '기준단위', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}//, items: [{id: '', text: ''}].concat(units)},
            },
            {field: 'unit_length', caption: '길이', size: '100px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
            {field: 'unit_color', caption: '컬러', size: '100px', sortable: true, resizable: true, editable: {type: 'color', maxLength: 20}},
            {field: 'unit_thick', caption: '두께', size: '100px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
            {field: 'unit_width', caption: '폭', size: '100px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
            {field: 'unit_weight', caption: '중량', size: '100px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
            {field: 'lot_mgt_yn', caption: 'LOT관리여부', size: '100px', sortable: true, resizable: true, editable: {type: 'checkbox'}},
            {field: 'lot_size', caption: 'LOT사이즈', size: '100px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
            {field: 'instd_prt_nbr', caption: '대체품번', size: '100px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 20}},
            //{field: 'account_type', caption: '계정유형코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text'}},
            {field: 'account_type', caption: '계정유형', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}//, items: [{id: '', text: ''}].concat(account_type)},
            },
            //{field: 'supply_type', caption: '조달유형코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text'}},
            {field: 'supply_type', caption: '조달유형', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}//, items: [{id: '', text: ''}].concat(supply_type)},
            },
            //{field: 'sagub_type', caption: '사급유형코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text'}},
            {field: 'sagub_type', caption: '사급유형', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}//, items: [{id: '', text: ''}].concat(sagub_type)},

            },
            {field: 'inspct_yn', caption: '검사여부', size: '100px', sortable: true, resizable: true, editable: {type: 'checkbox'}},
            {field: 'cycle_tm', caption: '사이클타임', size: '100px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
            {field: 'uph', caption: 'UPH', size: '100px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
            {field: 'unit_price', caption: '단가', size: '100px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
            {field: 'safe_stck', caption: '안전재고', size: '100px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
            {field: 'unit_reprice', caption: '재작업단가', size: '100px', sortable: true, resizable: true, editable: {type: 'float'}, style: 'text-align: right'},
            {field: 'base_whs_cd', caption: '기준창고코드', size: '100px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 20}},
            {field: 'base_whs_nm', caption: '기준창고명', size: '100px', sortable: true, resizable: true, editable: {type: 'text', maxLength: 20}},
            {field: 'base_loc_cd', caption: '기준위치코드', size: '100px', sortable: true, resizable: true, editable: {type: 'select', maxLength: 20}},
            {field: 'base_loc_nm', caption: '기준위치명', size: '100px', sortable: true, resizable: true, editable: {type: 'select', maxLength: 20}},
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
    $('#'+ grid_id).w2grid(grid_config);

    let grid_object = w2ui[grid_id];
    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new SingleGridPageManager(grid_object, search_frm_id, btn_frm_id,"chk");
    //팝업 필드 지정
    pageManager.gridManager.AddPopUpOption(grid_id,"prt_nbr_nm", pop_ptr_nbr_cd.PopupName);
    $(`#btn_pop_prt_nbr_cd`).on(Const.HtmlEvent.click, pop_ptr_nbr_cd.ShowFormDialog);

    //PK, 필수입력, Readonly 필드 등록
    pageManager.gridManager.SetPkFields(grid_id,  ["fact_cd", "prt_nbr_cd"]);
    pageManager.gridManager.SetReadonlyFields(grid_id,  ["prt_nbr_dsp_nm"]);
    pageManager.gridManager.SetCompulsoryFields(grid_id,  ["prt_nbr_nm", "spec"]);

    //이것도 그리드 매니져가 관리하게 변경...
    pageManager.gridManager.SetAjaxUrl(grid_id, Const.MesButton.Search, "/ajax/base/standard/get/part_nbr_mgt");
    pageManager.gridManager.SetAjaxUrl(grid_id, Const.MesButton.DeleteRow, "/ajax/base/standard/delete/part_nbr_mgt");
    pageManager.gridManager.SetAjaxUrl(grid_id, Const.MesButton.Save, "/ajax/base/standard/save/part_nbr_mgt");

    //폼에 있는 콤보박스 정보 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm", "", "ALL");
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name", "prt_nbr_grp_cd", common.code, {up_cd: "prt_nbr_grp_cd"}, "cd", "cd_nm", "", "ALL");
    //폼 콤보박스 데이터 채우기..
    // pageManager.frmManager.InitAll();

    //그리드 콤보박스 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid_id,"base_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid_id,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid_id,"prt_nbr_grp_cd", common.code, {up_cd: "prt_nbr_grp_cd"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid_id,"account_type", common.code, {up_cd: "account_type"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid_id,"supply_type", common.code, {up_cd: "supply_type"}, "cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid_id,"sagub_type", common.code, {up_cd: "sagub_type"}, "cd", "cd_nm");
    //그리드 체크박스 정보 등록
    pageManager.gridManager.AddCheckRenderOption(grid_id, "lot_mgt_yn", "Y", "N");
    pageManager.gridManager.AddCheckRenderOption(grid_id,"inspct_yn", "Y", "N");
    pageManager.gridManager.AddCheckRenderOption(grid_id,"use_yn", "Y", "N");

    //그리드 체크박스 초기화
    // pageManager.gridManager.InitAll();
    pageManager.BindButtonFunction();
    pageManager.InitializeComponent();
    //


    //script part
    //
    //PopupManager.RegisterPopup(popupManager.PopupName, popupManager);
    // function onPopupCloseCallback(selected_item)
    // {
    //     console.log(selected_item);
    // }
    //
    // $("#btn_pop_prt_nbr_cd").on("click", (event)=>{
    //         //console.log(event);
    //         let selector = "[name='fact_cd'] option:selected";
    //         let obj = {
    //             fact_cd: $(selector).val(),
    //             fact_cd_nm: $(selector).text(),
    //         };
    //
    //         PopupManager.ptr_nbr_cd.ShowDialog(obj,onPopupCloseCallback);
    //         // $("#div_pop_prt_nbr_cd").w2popup("open", {height:900, width:900});
    //     },
    // );

    // $(".popBtInner").

    //pmgr = PopupManager;

    //init_grid_p_grid_prt_nbr_cd();


});
