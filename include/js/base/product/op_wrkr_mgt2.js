import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManger from "/include/js/class/GridPageManger.js";
import Pop_op_cd from "/include/js/popups/pop_op_cd.js";

$(function () {

    let grid01 = {
        name: 'grid01',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
            // { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center',
            //     editable: { type: 'checkbox' }
            // },
            // { field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true,
            //     editable: { type: 'text'}
            // },
            { field: 'fact_cd', caption: '공장', size: '150px', sortable: true, resizable: true, editable: { type: 'select'},},
            { field: 'op_cd', caption: '공정코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: { type: 'text'}},
            { field: 'op_nm', caption: '공정명', size: '150px', sortable: true, resizable: true},
            // { field: 'text', caption: '주작업자', size: '150px', sortable: true, resizable: true,
            //     editable: { type: 'text' }
            // },
            { field: 'wrkr_num', caption: '작업자수', size: '100px', sortable: true, resizable: true, style: 'text-align: right'},
            // { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text' }},
            // { field: 'inst_id', caption: '입력자ID', size: '100px', sortable: true, resizable: true},
            // { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'},
            // { field: 'updt_id', caption: '수정자ID', size: '100px', sortable: true, resizable: true,},
            // { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
        ],
        // records: [
        //     { recid: 1, fact_cd: 'm01-01', fact_nm: 'M01', whs_cd:'m333', whs_nm:'창고1', use_yn: true, inst_id: 'themomos', remark:'기타 비고사항', inst_id:'themomos', inst_dt:'2020-10-21', updt_id:'themomos', updt_dt:'2020-10-21', chk: true },
        //     { recid: 2, fact_cd: 'm01-01', fact_nm: 'M02', whs_cd:'m333', whs_nm:'창고1', use_yn: false, inst_id: 'themomos', remark:'기타 비고사항', inst_id:'themomos', inst_dt:'2020-10-21', updt_id:'themomos', updt_dt:'2020-10-21'},
        //     { recid: 3, fact_cd: 'm01-01', fact_nm: 'M03', whs_cd:'m333', whs_nm:'창고1', use_yn: true, inst_id: 'themomos', remark:'기타 비고사항', inst_id:'themomos', inst_dt:'2020-10-21', updt_id:'themomos', updt_dt:'2020-10-21'},
        //     { recid: 4, fact_cd: 'm01-01', fact_nm: 'M04', whs_cd:'m333', whs_nm:'창고1', use_yn: true, inst_id: 'themomos', remark:'기타 비고사항', inst_id:'themomos', inst_dt:'2020-10-21', updt_id:'themomos', updt_dt:'2020-10-21'}
        // ],
    };

    let grid02 = {
        name: 'grid02',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=right' },
            // { field: 'combo', caption: '작업자코드', size: '100px', sortable: true, hidden: true },
            { field: 'emp_id', caption: '작업자아이디', size: '150px', sortable: true },
            { field: 'emp_nm', caption: '작업자명', size: '150px', sortable: true }
        ],
    };

    let grid03 = {
        name: 'grid03',
        columns: [
            { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=right' },
            // { field: 'combo', caption: '작업자코드', size: '100px', sortable: true, hidden: true },
            { field: 'emp_id', caption: '작업자아이디', size: '150px', sortable: true },
            { field: 'emp_nm', caption: '작업자명', size: '150px', sortable: true },
            // { field: 'check', caption: '주작업자', size: '100px', sortable: true, resizable: true, style: 'text-align: center',
            //     editable: { type: 'checkbox', style: 'text-align: center' }
            // }
        ],
    };

    let search_frm_id = "search_frm";
    let btn_frm_id = "hbtn_frm";
    let pageManager = new GridPageManger(search_frm_id, btn_frm_id);
    let pop_op_cd = new Pop_op_cd(pageManager, search_frm_id);

    //1번 그리드 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid01 = pageManager.gridManager.AddGrid(grid01);
    //팝업등록
    pageManager.gridManager.AddPopUpOption(grid01.name,"op_nm", pop_op_cd.PopupName);
    //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
    // pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");

    //PK, 필수입력, Readonly 필드 등록
    pageManager.gridManager.SetPkFields(grid01.name,  ["fact_cd", "op_cd", "wrkr_cd"]);
    // pageManager.gridManager.SetReadonlyFields(grid01.name,  ["prt_nbr_dsp_nm"]);
    // pageManager.gridManager.SetCompulsoryFields(grid01.name,  ["whs_nm"]);
    //버튼에 대한 Ajax 경로
    // application\controllers\ajax\base\Product.php
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/base/product/get/op_wrkr_mgt");
    pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/base/product/delete/op_wrkr_mgt");
    //pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/base/product/save/op_wrkr_mgt");
    //콤보박스 렌더 정보 등록
    pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");

    //2번 그리드 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid02 = pageManager.gridManager.AddGrid(grid02);

    //버튼에 대한 Ajax 경로
    // application\controllers\ajax\base\Product.php
    pageManager.gridManager.SetAjaxUrl(grid02.name, Const.MesButton.Search, "/ajax/base/product/get/wrkr");


    //3번 그리드 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    grid03 = pageManager.gridManager.AddGrid(grid03);



    pageManager.gridManager.SetAjaxUrl(grid03.name, Const.MesButton.Search, "/ajax/base/product/get/wrkr_list");


    //폼 등록
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    pageManager.frmManager.AddForm(search_frm_id);
    //콤보박스 등록
    pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //폼 팝업 등록
    let caller_name = "pop_op_cd";
    let target_name = "op_cd";
    pageManager.frmManager.AddPopupLink(search_frm_id, caller_name, pop_op_cd.ShowFormDialog, target_name);

    //그리드 초기화..
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //버튼함수와 연결...
    pageManager.BindButtonFunction();
    //그리드 초기화...
    pageManager.InitializeComponent();


    //클릭펑션 지정
    let grid01_click =  function (event) {
        let record = this.get(event.recid);
        if(record.fact_cd !== undefined && record.op_cd !== undefined)
        {
            w2ui['grid02'].clear();
            w2ui['grid03'].clear();
            // w2ui['grid02'].add([
            //     { recid: 1, fact_cd: record.fact_cd, fact_nm: record.fact_nm, whs_cd: record.whs_cd, whs_nm: record.whs_nm, use_yn: record.use_yn, remark: record.remark, inst_id: record.inst_id, inst_dt: record.inst_dt, updt_id: record.updt_id, updt_dt: record.updt_dt }
            // ]);
            // Const.SelectedGridID = "grid02";

            let param = {
                param : {
                    where: {
                        fact_cd: record.fact_cd,
                        op_cd: record.op_cd,
                    }
                }
            };

            pageManager.gridManager.SetSearchParam("grid02", param);
            //pageManager.BtnFuncList.search(event, param,true);
            // pageManager.gridManager.LoadGridData("grid02",Const.MesButton.Search, param);
            // let param2 = {
            //     where : {
            //         fact_cd: record.fact_cd,
            //         op_cd: record.op_cd,
            //     }
            // };

            let rest_url = pageManager.gridManager.GetAjaxUrl("grid02", Const.MesButton.Search);



            // ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, param)
            //     .then((res)=>{
            //         ScriptHelper.AjaxCall(rest_url2, Const.AjaxMethod.GET, param)
            //             .then((res1)=>{
            //                 console.log('res', res);
            //                 console.log('res1', res1);
            //                 res.data = W2UiHelper.AddRecID(res.data);
            //                 res1.data = W2UiHelper.AddRecID(res1.data);
            //                 w2ui['grid02'].records = res.data;
            //                 w2ui['grid03'].records = res1.data;
            //
            //                 w2ui['grid02'].refresh();
            //                 w2ui['grid03'].refresh();
            //             })
            //             .fail(ScriptHelper.OnAjaxFail);
            //     })
            //     .fail(ScriptHelper.OnAjaxFail);

            ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, param)
                .then((res)=>{
                    res.data = W2UiHelper.AddRecID(res.data);
                    w2ui['grid02'].records = [];
                    w2ui['grid03'].records = [];
                    for (let item of res.data){
                        if (item.op_cd === record.op_cd){
                            w2ui['grid03'].records.push(item);
                        }else{
                            w2ui['grid02'].records.push(item);
                        }
                    }
                    w2ui['grid02'].refresh();
                    w2ui['grid03'].refresh();
                })
                .fail(ScriptHelper.OnAjaxFail);
            Const.SelectedGridID = event.target;
        }
    };

    let grid02_click =  function (event) {
        let record = this.get(event.recid);
        w2ui['grid03'].records.push(record);
        w2ui['grid02'].remove(record.recid);
        w2ui['grid03'].refresh();
    }
    let grid03_click =  function (event) {
        let record = this.get(event.recid);
        w2ui['grid02'].records.push(record);
        w2ui['grid03'].remove(record.recid);
        w2ui['grid02'].refresh();
    }

    grid01.onClick= grid01_click;
    grid02.onClick= grid02_click;
    grid03.onClick= grid03_click;
    $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});
    $("#grid02").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid02.name;});
    $("#grid03").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid03.name;});

    $(`#${btn_frm_id} [name='${Const.MesButton.Save}']`).off();
    $(`#${btn_frm_id} [name='${Const.MesButton.Save}']`).on(Const.HtmlEvent.click, ()=>{
        if(w2ui['grid03'].records.length === 0){
            mes_alert({msg : '선택된 작업자가 아무도 없습니다.'});
            return false;
        }
        let param = {
            param: [w2ui['grid01'].records[$("#grid01").attr("selrow")-1], w2ui['grid03'].records],
            cnct_btn: "B0005",
            cnct_url: location.pathname,
        };
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
                        w2ui['grid01'].records = W2UiHelper.AddRecID(res.data);
                        w2ui['grid01'].refresh();
                    })
                    .fail(ScriptHelper.OnAjaxFail);
            },
            error: function (a,b,c) {
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });

    });

    w2ui.grid01.onSelect = function (obj){$("#grid01").attr("selrow" , obj.recid);}

    // 그리드 선택
    Const.SelectedGridID = grid01.name;
});
//
// function showChanged() {
//     console.log(w2ui['grid'].getChanges());
//     w2alert('Changed records are displayed in the console');
// }
// //twoGrid
// $(function () {
//     $('#grid1').w2grid({
//         name: 'grid1',
//         show: { header: false },
//         columns: [
//             { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=right' },
//             { field: 'combo', caption: '작업자코드', size: '100px', sortable: true, hidden: true },
//             { field: 'combo', caption: '작업자명', size: '150px', sortable: true }
//         ],
//         records: [
//             { recid: 1, combo: 'ddd', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012', check: true  },
//             { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
//             { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
//             { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
//             { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
//             { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
//         ],
//         onClick: function (event) {
//             var grid = this;
//             // need timer for nicer visual effect that record was selected
//             setTimeout(function () {
//                 w2ui['grid2'].add( $.extend({}, grid.get(event.recid), { selected : false }) );
//                 grid.selectNone();
//                 grid.remove(event.recid);
//             }, 150);
//         }
//     });
//
//     $('#grid2').w2grid({
//         name: 'grid2',
//         show: { header: false },
//         columns: [
//             { field: 'recid', caption: 'NO', size: '50px', sortable: true, attr: 'align=right' },
//             { field: 'combo', caption: '작업자코드', size: '100px', sortable: true, hidden: true },
//             { field: 'combo', caption: '작업자명', size: '150px', sortable: true },
//             { field: 'check', caption: '주작업자', size: '100px', sortable: true, resizable: true, style: 'text-align: center',
//                 editable: { type: 'checkbox', style: 'text-align: center' }
//             }
//         ],
//         onClick: function (event) {
//             var grid = this;
//             // need timer for nicer visual effect that record was selected
//             setTimeout(function () {
//                 w2ui['grid1'].add( $.extend({}, grid.get(event.recid), { selected : false }) );
//                 grid.selectNone();
//                 grid.remove(event.recid);
//             }, 150);
//         }
//     });
// });
