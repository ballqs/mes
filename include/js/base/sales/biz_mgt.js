import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_biz_cd from "/include/js/popups/pop_biz_cd.js";

$(function () {
    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'cmpny_cd', caption: '사업장코드', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'biz_cd', caption: '거래처코드', size: '100px', sortable: true, resizable: true},
            /*
            * popup btn
            * <div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="open_pop_biz_cd()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            */
            { field: 'biz_nm', caption: '거래처명', size: '150px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 50 }},  // popup btn
            { field: 'biz_gbn', caption: '거래구분', size: '100px', sortable: true, resizable: true, editable: { type: 'select' }},
            { field: 'biz_item', caption: '종목', size: '150px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 50 }},
            { field: 'biz_type', caption: '업태', size: '100px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 50 }},
            { field: 'adr', caption: '주소', size: '350px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 100 }},
            { field: 'reprst_nm', caption: '대표자', size: '70px', sortable: true, resizable: true,  style: 'text-align: center', editable: { type: 'text', maxlength: 10 }},
            { field: 'biz_reg_no', caption: '사업자번호', size: '150px', sortable: true, resizable: true,  style: 'text-align: center', editable: { type: 'text', maxlength: 20 }},
            { field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
            { field: 'remark', caption: '비고', size: '350px', sortable: true, resizable: true, editable: { type: 'text', maxlength: 1000 }},
            { field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true },
            { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true },
            { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
    };

    let search_frm_id = "search_frm";
    let bnt_frm_id = "hbtn_frm";
    let page_addr_name = "biz_mgt";
    let pageManager = new GridPageManager(search_frm_id, bnt_frm_id, page_addr_name);
    let pop_biz_cd = new Pop_biz_cd(pageManager, search_frm_id);
    pop_biz_cd.AddParentReferFormTag(["cmpny_cd"], ["cmpny_cd"]);

    //1번 그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);

    //팝업 등록(그리드 안에 팝업을 등록)
    //pageManager.gridManager.AddPopUpOption(grid01.name,"biz_cd", pop_biz_cd.PopupName);

    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");

    //PK 필수입력, ReadOnly 필드등록 PK : 기본기 설정하면 색깔이 붉게 나옴
    pageManager.gridManager.SetPkFields(grid01.name, ["cmpny_cd"]);
    pageManager.gridManager.SetCompulsoryFields(grid01.name, ["biz_nm","biz_gbn"]);
    pageManager.gridManager.SetBCFields(grid01.name, ["biz_cd"]);


    //버튼에 대한 Ajax 경로
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/base/sales/get/biz_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/base/sales/delete/biz_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/base/sales/save/biz_mgt");

    //콤보박스 랜더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"cmpny_cd", common.code, {up_cd: "cmpny_cd"},"cd", "cd_nm");
    pageManager.gridManager.AddSelectBoxInfo(grid01.name, "biz_gbn", common.code, {up_cd: "biz_gbn"},"cd", "cd_nm");

    //체크박스 T/F 정보등록
    pageManager.gridManager.AddCheckRenderOption(grid01.name,"use_yn", "Y", "N");

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);

    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","cmpny_cd", common.code, {up_cd: "cmpny_cd"},"cd", "cd_nm");

    //폼 팝업 등록
    let caller_name = "pop_biz_cd";
    let target_name = ["biz_cd", "biz_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_biz_cd.ShowFormDialog, target_name);

    //버튼함수와 연결
    pageManager.BindButtonFunction();

    //그리드 초기화
    pageManager.InitializeComponent();

    $("#grid01").on(Const.HtmlEvent.click, function(){ Const.SelectedGridID = grid01.name;});

    //선택한 그리드 초기지정
    Const.SelectedGridID = grid01.name;


});

