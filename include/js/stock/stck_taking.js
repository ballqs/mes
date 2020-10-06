import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";
import GridPageManager from "/include/js/class/GridPageManager.js";
import Pop_prt_nbr_cd from "/include/js/popups/pop_prt_nbr_cd.js";
import Pop_whs_cd from "/include/js/popups/pop_whs_cd.js";
import Pop_loc_cd from "/include/js/popups/pop_loc_cd.js";

$(function () {
    $.ajax({ // 처음 웹페이지 로딩시 표시하기 위해
        type: 'POST',
        data: null,
        url: '/ajax/stock/stck_taking/get/codeinfo',
        dataType: 'json',
        success: function (data) {

            let grid01 = {
                name: 'grid01',
                show: {
                    toolbar: false,
                    footer: false,
                    toolbarSave: false
                },
                columns: [
                    { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true,  style: 'text-align: right' },
                    { field: 'chk', caption: '선택', size: '50px', sortable: true, resizable: true, style: 'text-align: center',
                        editable: {type: 'checkbox'}
                    },
                    { field: 'fact_cd', caption: '공장', size: '100px', sortable: true, resizable: true ,editable: { type: 'select'}},
                    { field: 'taking_ymd', caption: '실사일자', size: '100px', sortable: true, resizable: true, attr:"align=center", editable: { type: 'date'}},
                    { field: 'prt_nbr_cd', caption: '품번코드', size: '100px', sortable: true, resizable: true},
                    { field: 'prt_nbr_nm', caption: '품번명', size: '150px', sortable: true, resizable: true},
                    { field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true},
                    { field: 'lotno', caption: 'LOT번호', size: '100px', sortable: true, resizable: true, editable: { type: 'text'}},
                    { field: 'account_type', caption: '제품구분', size: '100px', sortable: true, resizable: true, editable: {type: 'select'}},
                    { field: 'whs_cd', caption: '창고코드', size: '100px', sortable: true, resizable: true},
                    { field: 'whs_nm', caption: '창고', size: '150px', sortable: true, resizable: true},
                    { field: 'loc_cd', caption: '위치코드', size: '100px', sortable: true, resizable: true},
                    { field: 'loc_nm', caption: '위치', size: '150px', sortable: true, resizable: true},
                    { field: 'taking_qty', caption: '실사수량', size: '100px', sortable: true, resizable: true, attr:"align=right" , editable: { type: 'text'}},
                    { field: 'stck_unit', caption: '단위', size: '100px', sortable: true, resizable: true, attr:"align=center", editable: { type: 'select'}},
                    { field: 'taking_gbn_cd', caption: '재고조사구분', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: {type: 'select'}},
                    { field: 'confrm_yn', caption: '확정여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: {type: 'checkbox'}},
                    { field: 'aply_yn', caption: '실사반영여부', size: '100px', sortable: true, resizable: true, style: 'text-align: center', editable: {type: 'checkbox'}},
                    { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true,editable: { type: 'text'}},
                    { field: 'inst_id', caption: '입력자 ID', size: '100px', sortable: true, resizable: true},
                    { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center' },
                    { field: 'updt_id', caption: '수정자 ID', size: '100px', sortable: true, resizable: true},
                    { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center'}
                ],
                // records: [
                //     { recid: 1, text: 'ddddd', num:'9999', cm: 'EA', per:'50', pop:'<div style="float:left; line-height:40px;">test</div><a class="popBtInner" onclick="open_pop_prt_nbr_cd()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>'}
                // ]

            };

            //grid01.columns["taking_yn"]
            W2UiHelper.CheckBoxInputRenderFunc(grid01,["confrm_yn","aply_yn"]);


            let search_frm_id = "search_frm";
            let btn_frm_id = "hbtn_frm";
            let pageManager = new GridPageManager(search_frm_id, btn_frm_id);

            let pop_prt_nbr_cd = new Pop_prt_nbr_cd(pageManager, search_frm_id);
            let pop_whs_cd = new Pop_whs_cd(pageManager, search_frm_id);
            let pop_loc_cd = new Pop_loc_cd(pageManager, search_frm_id);

            pop_loc_cd.AddParentReferFormTag(["fact_cd","whs_cd","whs_nm"], ["fact_cd","whs_cd","whs_nm"]);
            pop_prt_nbr_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);
            pop_whs_cd.AddParentReferFormTag(["fact_cd"], ["fact_cd"]);

            pop_loc_cd.AddParentReferGridTag(["fact_cd","whs_cd","whs_nm"], ["fact_cd","whs_cd","whs_nm"]);
            pop_prt_nbr_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);
            pop_whs_cd.AddParentReferGridTag(["fact_cd"], ["fact_cd"]);

            pop_prt_nbr_cd.AddTargetColumnsOnPopupClose(["prt_nbr_cd","prt_nbr_nm","spec","account_type","base_unit"], ["prt_nbr_cd","prt_nbr_nm","spec","account_type","stck_unit"]);
            pop_whs_cd.AddTargetColumnsOnPopupClose(["whs_cd","whs_nm"], ["whs_cd","whs_nm"]);
            pop_loc_cd.AddTargetColumnsOnPopupClose(["loc_cd","loc_nm"],["loc_cd","loc_nm"]);

            //1번 그리드 등록
            grid01 = pageManager.gridManager.AddGrid(grid01);

            //팝업등록
            pageManager.gridManager.AddPopUpOption(grid01.name, "prt_nbr_cd", pop_prt_nbr_cd.PopupName);
            pageManager.gridManager.AddPopUpOption(grid01.name, "whs_cd", pop_whs_cd.PopupName);


            if(data.data[0]["cd_set1"] !== 'Y'){
                pageManager.gridManager.AddPopUpOption(grid01.name, "loc_cd", pop_loc_cd.PopupName);
            }

            //선택필드 등록(디비에는 없는거지만 화면에서 선택용으로 작용할 필드)
            pageManager.gridManager.SetSelectionCheckField(grid01.name, "chk");

            //PK, 필수입력, ReadOnly 필드등록
            pageManager.gridManager.SetPkFields(grid01.name, ["fact_cd", "taking_ymd", "prt_nbr_cd", "lotno"]);
            pageManager.gridManager.SetCompulsoryFields(grid01.name, ["whs_cd","taking_qty","taking_gbn_cd"]);
            pageManager.gridManager.SetReadonlyFields(grid01.name, ["prt_nbr_nm","spec","account_type","whs_nm","stck_unit"]);

            //버튼에 대한 Ajax 경로
            pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Search, "/ajax/stock/stck_taking/get/stck_taking");
            pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.DeleteRow, "/ajax/stock/stck_taking/delete/stck_taking");
            pageManager.gridManager.SetAjaxUrl(grid01.name, Const.MesButton.Save, "/ajax/stock/stck_taking/save/stck_taking");

            //콤보박스 렌더 정보 등록
            //up_cd / cd : 복합키이며 up_cd는 부모가 누구인지 가르키는 것! 공장으로 치면 A공장/B공장 등 cd는 작업코드
            pageManager.gridManager.AddSelectBoxInfo(grid01.name,"fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
            pageManager.gridManager.AddSelectBoxInfo(grid01.name, "account_type", common.code, {up_cd: "account_type"},"cd", "cd_nm");
            pageManager.gridManager.AddSelectBoxInfo(grid01.name, "taking_gbn_cd", common.code, {up_cd: "taking_gbn_cd"},"cd", "cd_nm");
            pageManager.gridManager.AddSelectBoxInfo(grid01.name, "stck_unit", common.code, {up_cd: "unit_cd"},"cd", "cd_nm");

            //체크박스 T/F 정보 등록
            pageManager.gridManager.AddCheckRenderOption(grid01.name, "confrm_yn", "Y", "N");
            pageManager.gridManager.AddCheckRenderOption(grid01.name, "aply_yn", "Y", "N");

            //폼 등록
            pageManager.frmManager.AddForm(search_frm_id);

            //콤보박스(폼) 등록
            pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","fact_cd", common.code, {up_cd: "fact_cd"},"cd", "cd_nm");
            pageManager.frmManager.AddSelectBoxInfo(search_frm_id,"name","account_type", common.code, {up_cd: "account_type"},"cd", "cd_nm", "", "전체");

            //폼 팝업 등록
            let caller_name1 = "pop_loc_cd";
            let target_name1 = ["loc_cd", "loc_nm"];
            pageManager.frmManager.AddPopupLink(search_frm_id, caller_name1, pop_loc_cd.ShowFormDialog, target_name1);

            let caller_name2 = "btn_pop_prt_nbr_cd";
            let target_name2 = ["prt_nbr_cd","prt_nbr_nm"];
            pageManager.frmManager.AddPopupLink(search_frm_id, caller_name2, pop_prt_nbr_cd.ShowFormDialog, target_name2);

            let caller_name3 = "pop_whs_cd";
            let target_name3 = ["whs_cd","whs_nm"];
            pageManager.frmManager.AddPopupLink(search_frm_id, caller_name3, pop_whs_cd.ShowFormDialog, target_name3);

            //Delete
            $("#hbtn_frm [name='hBtnB0004']").on("click", function(){

                w2confirm(Const.MesMsg.confirm)
                    .yes(() => {
                        let reload = (btn_id)=>
                        {
                            let search_btn_id = Const.MesButton.Search;
                            let rest_url = pageManager.gridManager.GetAjaxUrl(grid_id, search_btn_id);
                            let param = FormHelper.SerializeForm(pageManager.search_frm_id);
                            let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);
                            ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
                                .then((res)=>{
                                    //성공 //디비에서 받아온것 중에서  //디비에 없는거는 지우기
                                    let db_records = W2UiHelper.AddRecID(res.data);
                                    let pk_list = pageManager.gridManager.GridList[grid_id].PKFieldList;
                                    for(const grid_rec of grid_records) {
                                        let db_rec = db_records.find((element) => {
                                            let match = true;
                                            for(const pk of pk_list)
                                            {
                                                if(element[pk] !== grid_rec[pk])
                                                {
                                                    match = false;
                                                    break;
                                                }
                                            }
                                            return match;
                                        });
                                        if(db_rec !== undefined)
                                        {
                                            db_rec = grid_rec;
                                        }
                                    }
                                    // w2ui[grid_id].records = db_records;
                                    for(let i=0; i<db_records.length; i++){
                                        if(db_records[i]["confrm_yn"] === "Y"){
                                            db_records[i]["confrm_yn"] = true;
                                        }else if(db_records[i]["confrm_yn"] === "N"){
                                            db_records[i]["confrm_yn"] = false;
                                        }
                                        if(db_records[i]["aply_yn"] === "Y"){
                                            db_records[i]["aply_yn"] = true;
                                        }else if(db_records[i]["aply_yn"] === "N"){
                                            db_records[i]["aply_yn"] = false;
                                        }
                                    }
                                    w2ui[grid_id].records = db_records;
                                    w2ui[grid_id].refresh();
                                })
                                //실패, //암것도 안함
                                .fail(ScriptHelper.OnAjaxFail);
                        }
                        let grid_id = Const.SelectedGridID;

                        let btn_id =  Const.MesButton.DeleteRow;
                        let rest_url = pageManager.gridManager.GetAjaxUrl(grid_id, btn_id);

                        //새로 추가한 열은 지우기
                        let grid_records = pageManager.gridManager.GridList[grid_id].GridObject.records;
                        let selection_field = pageManager.gridManager.GridList[grid_id].SelectionCheckField;
                        let param = [];
                        for(let idx = 0; idx < grid_records.length; idx++) {
                            //변경된 열인지 확인.
                            if(grid_records[idx].w2ui !== undefined && grid_records[idx].w2ui.changes !== undefined)
                            {
                                //체크되어 있는지 확인
                                if(grid_records[idx].w2ui.changes[selection_field] !== undefined && grid_records[idx].w2ui.changes[selection_field] === true)
                                {
                                    //신규 등록한 열인지 확인
                                    if(grid_records[idx].cu !== undefined && (grid_records[idx].cu === "c" || grid_records[idx].cu === "C"))
                                    {
                                        // grid_records.splice(idx, 1);
                                        // idx--;
                                    }
                                    //디비에 있는 열을 삭제하는 경우
                                    else
                                    {
                                        //pk목록을 param으로 정리한다.
                                        let obj = {};
                                        for(let pk of pageManager.gridManager.GridList[grid_id].PKFieldList) {
                                            obj[pk] = grid_records[idx][pk];
                                        }
                                        param.push(obj);
                                    }
                                    //grid_records.splice(idx, 1);
                                    //idx--;
                                }
                            }
                        }
                        let checkdata = w2ui[grid_id].records;
                        let checknum = w2ui[grid_id].records.length;

                        //console.log(checkdata);
                        //console.log(checknum);
                        //console.log(param);

                        for(let i=0; i<checknum; i++){
                            for(let j=0; j<param.length; j++){
                                if((checkdata[i]["fact_cd"] === param[j]["fact_cd"]) &&
                                    (checkdata[i]["lotno"] === param[j]["lotno"]) &&
                                    (checkdata[i]["prt_nbr_cd"] === param[j]["prt_nbr_cd"]) &&
                                    checkdata[i]["confrm_yn"] === true){
                                    for(let k=0; k < checknum; k++){
                                        checkdata[k]["w2ui"] = undefined;
                                    }
                                    w2ui[grid_id].refresh();
                                    mes_alert({msg : 'Error ! '+(Number(i)+1)+'번 데이터는 확정되었기에 삭제할수 없습니다.'},{msg : ''});
                                    return false;
                                }
                            }
                        }


                        //기존 열 디비에서 지우기
                        if(param.length > 0){
                            param = W2UiHelper.CheckBoxDataConvertToDBFormat(param, pageManager.gridManager.GridList[grid_id].CheckBoxConfigList);
                            let param_arr = [param];
                            let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);
                            //삭제 Ajax 호출
                            ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
                                .then((res)=> {
                                    //디비에서 신규 받아오기..
                                    reload(btn_id);
                                    common.success_msg(res.msg);
                                })
                                .fail(ScriptHelper.OnAjaxFail);
                        }
                        else
                        {
                            reload(btn_id);
                        }

                        w2ui[grid_id].refresh();
                    })
                    .no(function(){
                        return false;
                    });
            });
            //Save
            $("#hbtn_frm [name='hBtnB0005']").on("click", function(){
                let grid_id = Const.SelectedGridID;

                let btn_id = Const.MesButton.Save;
                let rest_url =  pageManager.gridManager.GetAjaxUrl(grid_id, btn_id);
                let param = pageManager.gridManager.GetSaveParam(grid_id);

                let checkdata = w2ui[grid_id].records;
                let checknum = w2ui[grid_id].records.length;
                console.log(param);
                console.log(checkdata);
                for(let i=0; i<checknum; i++){
                    for(let j=0; j<param.length; j++){
                        if((checkdata[i]["fact_cd"] === param[j]["fact_cd"]) &&
                            (checkdata[i]["lotno"] === param[j]["lotno"]) &&
                            (checkdata[i]["prt_nbr_cd"] === param[j]["prt_nbr_cd"]) &&
                            checkdata[i]["confrm_yn"] === true){
                            checkdata[i]["w2ui"] = undefined;
                            w2ui[grid_id].refresh();
                            mes_alert({msg : 'Error ! '+(Number(i)+1)+'번 데이터는 확정이 되었기에 변경이 불가능합니다.'},{msg : ''});
                            return false;
                        }
                    }
                }

                if(param.length > 0)
                {
                    param = W2UiHelper.CheckBoxDataConvertToDBFormat(param, pageManager.gridManager.GridList[grid_id].CheckBoxConfigList);
                    let param_arr = [param];
                    let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);
                    ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
                        .then((res)=>
                        {
                            console.log(res, 'after ajax');
                            pageManager.BtnFuncList.search(event, false);
                            common.success_msg(res.msg);
                            w2ui["grid01"].refresh();
                        })
                        .fail(ScriptHelper.OnAjaxFail);
                    // .fail(this.#on_ajax_error);
                }
            });

            //버튼함수와 연결
            pageManager.BindButtonFunction([Const.MesButton.Save,Const.MesButton.DeleteRow]);

            //그리드 초기화
            pageManager.InitializeComponent();

            //div에 클릭펑션 먹인거...
            $("#grid01").on(Const.HtmlEvent.click, function(){    Const.SelectedGridID = grid01.name;});


            //선택한 그리드 초기화
            Const.SelectedGridID = grid01.name;


            $("#hbtn_frm [name='hBtnB0022']").on("click", function(){
                // TODO : 확정 버튼
                let grid_id = Const.SelectedGridID;
                console.log("actualConfirm in stck_taking.js");
                let grid_records = pageManager.gridManager.GridList[grid_id].GridObject.records;
                console.log(w2ui[grid_id]);
                console.log(grid_records);

                let data = [];

                for(let idx = 0, i = 0; idx < grid_records.length; idx++) {
                    if(grid_records[idx].w2ui !== undefined && grid_records[idx].w2ui.changes !== undefined){
                        if(grid_records[idx]["confrm_yn"] === true){
                            grid_records[idx]["w2ui"] = undefined;
                            w2ui[grid_id].refresh();
                            mes_alert({msg : 'Error ! '+(idx+1)+'번은 이미 확정되어 있습니다.'},{msg : ''});
                            return false;
                        }else if(grid_records[idx]["confrm_yn"] === false){
                            grid_records[idx]["w2ui"]["changes"]["confrm_yn"] = true;
                            data[i] = {
                                "fact_cd" : grid_records[idx]['fact_cd'],
                                "taking_ymd" : grid_records[idx]['taking_ymd'],
                                "prt_nbr_cd" : grid_records[idx]['prt_nbr_cd'],
                                "lotno" : grid_records[idx]['lotno'],
                                "confrm_yn" : "Y",
                            };
                            i++;
                        }
                    }
                }

                console.log(data);


                let param = {
                    param: [data],
                    cnct_btn: "B0022",
                    cnct_url: location.pathname,
                };

                let rest_url = "/ajax/stock/stck_taking/confrm/stck_taking";

                ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, param)
                    .then((res)=>{
                        console.log(res);
                        pageManager.BtnFuncList.search(event, false);
                        common.success_msg(res.msg);
                    })
                    .fail(ScriptHelper.OnAjaxFail);

            });

            // initialization in memory
            // $().w2layout(config.layout);
            // $().w2grid(config.grid);
            // $().w2form(config.form);
        },
        error: function (a,b,c) {
            console.log(a);
            console.log(b);
            console.log(c);
        },
    })
});

// function showChanged() {
//     console.log(w2ui['grid'].getChanges());
//     w2alert('Changed records are displayed in the console');
// }
//
// function open_pop_prt_nbr_cd() {
//     let selected_fact_cd = $("#search_frm select[name='fact_cd']").val();
//     let selected_fact_nm = $("#search_frm select[name='fact_cd'] option:checked").text();
//     pop_prt_nbr_cd.pop_open(selected_fact_cd, selected_fact_nm);
//     // pop_part_nbr(selected_fact_cd, selected_fact_nm, account_type);
// }
