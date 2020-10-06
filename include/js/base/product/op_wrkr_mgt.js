import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_op_cd from "/include/js/popups/pop_op_cd.js";

$(function () {

    let grid01 = {
        name: 'grid01',
        header: '공정',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            { field: 'fact_cd', caption: '공장', size: '80px', sortable: true, resizable: true, editable: { type: 'select'},},
            { field: 'op_cd', caption: '공정코드', size: '100px', sortable: true, resizable: true},
            { field: 'op_nm', caption: '공정명', size: '100px', sortable: true, resizable: true},
            { field: 'wrkr_num', caption: '작업자수', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
        ],
    }
    let grid02 = {
        name: 'grid02',
        header: '모든 작업자',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=right' },
            { field: 'emp_id', caption: '작업자아이디', size: '150px', sortable: true },
            { field: 'emp_nm', caption: '작업자명', size: '150px', sortable: true },
        ],
    };

    let grid03 = {
        name: 'grid03',
        header: '공정별 작업자 현황',
        show: { header: true },
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=right' },
            { field: 'wrkr', caption: '작업자아이디', size: '150px', sortable: true },
            { field: 'wrkr_nm', caption: '작업자명', size: '150px', sortable: true },
        ],
    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let page_addr_name = "op_wrkr_mgt";
    let pageManager = new GridPageManager(search_frm_id, btn_frm_id, page_addr_name);
    let pop_op_cd = new Pop_op_cd(pageManager, search_frm_id);
    pop_op_cd.AddParentReferFormTag(["fact_cd"],["fact_cd"]);
    //1번 그리드 등록
    grid01 = pageManager.gridManager.AddGrid(grid01);
    //팝업등록
    //pageManager.gridManager.AddPopUpOption(grid01.name,"op_nm", pop_op_cd.PopupName);
    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    // pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");

    //PK, 필수입력, Readonly 필드 등록
    //pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "op_cd"]);
    //pageManager.gridManager.SetReadonlyFields(grid01.name,  ["recid","fact_cd","op_cd","op_nm","wrkr_num"]);
    // pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["whs_nm"]);

    //버튼에 대한 Ajax 경로
    // application\controllers\ajax\base\Product.php
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/base/product/get/op_wrkr_mgt");
    //pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/base/product/save/op_wrkr_mgt");
    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //2번 그리드 등록
    grid02 = pageManager.gridManager.AddGrid(grid02);

    //pageManager.gridManager.SetReadonlyFields(grid02.name,  ["recid","emp_id","emp_nm"]);

    //버튼에 대한 Ajax 경로
    // application\controllers\ajax\base\Product.php
    pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.Search, "/ajax/base/product/get/wrkr");


    //3번 그리드 등록
    grid03 = pageManager.gridManager.AddGrid(grid03);

    //pageManager.gridManager.SetReadonlyFields(grid03.name,  ["recid","wrkr","wrkr_nm"]);

    pageManager.gridManager.SetAjaxUrl(grid03.name, Const.MesButton.Search, "/ajax/base/product/get/wrkr_list");

    //폼 등록
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //폼 팝업 등록
    let caller_name = "pop_op_cd";
    let target_name = ["op_cd","op_nm"];
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_op_cd.ShowFormDialog, target_name);

    //그리드 초기화..
    //버튼함수와 연결...
    pageManager.BindButtonFunction([Const.MesButton.Save]);
    //그리드 초기화...
    pageManager.InitializeComponent();

    //클릭펑션 지정
    let grid01_click =  function (event) {
        let record = this.get(event.recid);
        //if문에는 grid03에서 DB에 필요한 값들로 설정
        if(record.fact_cd !== undefined && record.op_cd !== undefined)
        {
            w2ui['grid02'].clear();
            w2ui['grid03'].clear();

            let param = {
                where: {
                    fact_cd: record.fact_cd,
                    op_cd: record.op_cd,
                }
            };

            Const.SelectedGridID = "grid02";
            pageManager.gridManager.SetSearchParam("grid02",param);
            pageManager.BtnFuncList.search(event,true);


            Const.SelectedGridID = "grid03";
            pageManager.gridManager.SetSearchParam("grid03",param);
            pageManager.BtnFuncList.search(event,true);


            Const.SelectedGridID = event.target;
        }
    };

    let grids_refresh = function(){
        w2ui.grid02.records = W2UiHelper.AddRecID(w2ui.grid02.records);
        w2ui.grid03.records = W2UiHelper.AddRecID(w2ui.grid03.records);
        w2ui['grid02'].refresh();
        w2ui['grid03'].refresh();
    };

    let grid02_dblclick =  function (event) {
        let record = this.get(event.recid);
        record.wrkr = record.emp_id;
        record.wrkr_nm = record.emp_nm;
        w2ui['grid03'].records.push(record);
        w2ui['grid02'].remove(record.recid);
        grids_refresh();
    }
    let grid03_dblclick =  function (event) {
        let record = this.get(event.recid);
        record.emp_id = record.wrkr;
        record.emp_nm = record.wrkr_nm;
        w2ui['grid02'].records.push(record);
        w2ui['grid03'].remove(record.recid);
        grids_refresh();
    }

    grid01.onClick= grid01_click;
    grid02.onDblClick= grid02_dblclick;
    grid03.onDblClick= grid03_dblclick;
    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});
    $("#grid03").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid03.name;});

    $(`#${btn_frm_id} [name='${Const.MesButton.Save}']`).off();
    $(`#${btn_frm_id} [name='${Const.MesButton.Save}']`).on(Const.HtmlEvent.click, ()=>{
        $(".loadingW").css("display", "");
        if(w2ui['grid03'].records.length === 0){
            $(".loadingW").css("display", "none");
            mes_alert({msg : '선택된 작업자가 아무도 없습니다.'});
            return false;
        }
        let param = {
            param: [w2ui['grid01'].records[$("#grid01").attr("selrow")-1], w2ui['grid03'].records],
            cnct_btn: "B0005",
            cnct_url: location.pathname,
        };
        console.log(param);
        $.ajax({
            // application\controllers\ajax\base\Product.php
            url: "/ajax/base/product/save/op_wrkr_mgt",
            data: param,
            type:"post",
            dataType:"json",
            success: function (data) {
                console.log(data);
                let parameter = {
                    param: [w2ui['grid01'].records],
                };
                //성공시 grid01를 조회시키는 방법 구현
                let reload = pageManager.gridManager.GetAjaxUrl("grid01", Const.MesButton.Search);
                ScriptHelper.AjaxCall(reload, Const.AjaxMethod.GET, parameter)
                    .then((res)=>{
                        $(".loadingW").css("display", "none");
                        w2ui['grid01'].records = W2UiHelper.AddRecID(res.data);
                        w2ui['grid01'].refresh();
                    })
                    .fail(ScriptHelper.OnAjaxFail);
                Const.SelectedGridID = grid01.name;
            },
            error: function (a,b,c) {
                $(".loadingW").css("display", "none");
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });

    });
    w2ui.grid01.onSelect = function (obj){$("#grid01").attr("selrow" , obj.recid);}

    Const.SelectedGridID = grid01.name;
});