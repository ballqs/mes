import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";

export default class GridPageManager {

    frmManager;
    gridManager;
    search_frm_id;
    btn_frm_id;
    page_addr_name;

    constructor(search_frm_id, btn_frm_id, page_addr_name = "") {
        this.search_frm_id = search_frm_id;
        this.btn_frm_id = btn_frm_id;
        this.frmManager = new FormManager();
        this.gridManager = new GridManager();
        this.page_addr_name = page_addr_name;
    }


    BtnFuncList = {
        search: (event, show_msg = true, options = {loading:true}) => {
            if(options.loading){
                $(".loadingW").css("display", "");
            }

            let grid_id = Const.SelectedGridID;

            if(w2ui[grid_id].hasOwnProperty("fncSeletedGridID") && typeof w2ui[grid_id].fncSeletedGridID == "function"){
                w2ui[grid_id].fncSeletedGridID();
            }

            grid_id = Const.SelectedGridID;

            let btn_id = Const.MesButton.Search;
            let param = this.gridManager.GetSearchParam(grid_id);
            if(param === undefined) {
                param = FormHelper.SerializeForm(this.search_frm_id);
                //console.log(param);
                if(w2ui[grid_id].lastGetParam !== undefined){
                    w2ui[grid_id].lastGetParam.param = param;
                }
            }

            // TODO : fncPreSearch 테스트 필요
            if(w2ui[grid_id].hasOwnProperty("fncPreSearch") && typeof w2ui[grid_id].fncPreSearch == "function"){
                if(!w2ui[grid_id].fncPreSearch(param).result){
                    return false;
                };
            }

            // this.gridManager.ClearAll();
            this.gridManager.LoadGridData(grid_id, btn_id, param, show_msg);
            // let rest_url = this.gridManager.GetAjaxUrl(grid_id, btn_id);
            // let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);
            // ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
            //     .then((res)=>{
            //         let record_data = res.data;
            //         let check_info_obj = this.gridManager.GridList[grid_id].CheckBoxConfigList;
            //         W2UiHelper.AddRecID(record_data);
            //         W2UiHelper.CheckBoxDataConvertToGridFormat(record_data, check_info_obj);
            //         // w2ui[grid_id].records = record_data;
            //         w2ui[grid_id].records = record_data;
            //         w2ui[grid_id].reload(true);
            //     })
            //     .fail(this.#on_ajax_error);
            // this.gridManager.OnBtnSearch(grid_id, this.search_frm_id, btn_id, location.pathname)
            //     .then((res)=>{
            //         if(show_msg) {
            //             common.success_msg(res.msg);
            //         }
            //     })
            //     .fail(this.#on_ajax_error);

        },
        init: () => {
            this.frmManager.ClearAll();
            this.gridManager.ClearAll();
        },
        add: () => {
            let grid_id = Const.SelectedGridID;
            if(w2ui[grid_id].hasOwnProperty("fncPreAdd") && typeof w2ui[grid_id].fncPreAdd == "function"){
                if(!w2ui[grid_id].fncPreAdd(grid_id).result){
                    return false;
                };
            }
            this.gridManager.OnAddRow(grid_id,this.search_frm_id);
            if(w2ui[grid_id].hasOwnProperty("fncPostAdd") && typeof w2ui[grid_id].fncPostAdd == "function"){
                if(!w2ui[grid_id].fncPostAdd(grid_id).result){
                    return false;
                };
            }
        },
        delete_do: () => {

        },
        delete: () => {

            w2confirm(Const.MesMsg.confirm)
                .yes(() => {
                    // TODO : fncPreDelete 테스트 필요
//                     if(w2ui[grid_id].hasOwnProperty("fncPreDelete") && typeof w2ui[grid_id].fncPreDelete == "function"){
//                         if(!w2ui[grid_id].fncPreDelete(grid_id).result){
//                             return false;
//                         };
//                     }
                    $(".loadingW").css("display", "");
                    let reload = (btn_id)=>
                    {
                        let search_btn_id = Const.MesButton.Search;
                        let rest_url = this.gridManager.GetAjaxUrl(grid_id, search_btn_id);
                        let param = FormHelper.SerializeForm(this.search_frm_id);
                        let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);
                        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.GET, ajax_args)
                            .then((res)=>{
                                //성공 //디비에서 받아온것 중에서  //디비에 없는거는 지우기
                                let db_records = W2UiHelper.AddRecID(res.data);
                                let pk_list = this.gridManager.GridList[grid_id].PKFieldList;
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
                                w2ui[grid_id].records = db_records;
                                w2ui[grid_id].refresh();
                            })
                            //실패, //암것도 안함
                            .fail(ScriptHelper.OnAjaxFail);
                    }
                    let grid_id = Const.SelectedGridID;

                    let btn_id =  Const.MesButton.DeleteRow;
                    let rest_url = this.gridManager.GetAjaxUrl(grid_id, btn_id);

                    //새로 추가한 열은 지우기
                    let grid_records = this.gridManager.GridList[grid_id].GridObject.records;
                    let selection_field = this.gridManager.GridList[grid_id].SelectionCheckField;
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
                                    for(let pk of this.gridManager.GridList[grid_id].PKFieldList) {
                                        obj[pk] = grid_records[idx][pk];
                                    }
                                    for(let bc of this.gridManager.GridList[grid_id].BCFieldsList) {
                                        obj[bc] = grid_records[idx][bc];
                                    }
                                    if(this.gridManager.GridList[grid_id].AIField.length === 1){
                                        obj[this.gridManager.GridList[grid_id].AIField] = grid_records[idx][this.gridManager.GridList[grid_id].AIField];
                                    }
                                    param.push(obj);
                                }
                                grid_records.splice(idx, 1);
                                idx--;
                            }
                        }
                    }

                    //기존 열 디비에서 지우기
                    if(param.length > 0){
                        param = W2UiHelper.CheckBoxDataConvertToDBFormat(param, this.gridManager.GridList[grid_id].CheckBoxConfigList);
                        let param_arr = [param];
                        let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);
                        //삭제 Ajax 호출
                        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
                            .then((res)=> {
                                $(".loadingW").css("display", "none");
                                //디비에서 신규 받아오기..
                                reload(btn_id);
                                common.success_msg(res.msg);
                            })
                            .fail(ScriptHelper.OnAjaxFail);
                    }
                    else
                    {
                        reload(btn_id);
                        $(".loadingW").css("display", "none");
                    }

                    w2ui[grid_id].refresh();
                })
                .no(function(){
                    return false;
                });

            // if(!confirm(Const.MesMsg.confirm)) return false;







            // let param = this.gridManager.GetDeleteParam(grid_id);
            //
            // if(param.length > 0){
            //     param = W2UiHelper.CheckBoxDataConvertToDBFormat(param, this.gridManager.GridList[this.grid_id].CheckBoxConfigList);
            //     let param_arr = [param];
            //     let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);
            //     ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
            //         .then((res)=> {
            //             this.BtnFuncList.search(false);
            //             common.success_msg(res.msg);
            //         })
            //         .fail(this.#on_ajax_error);
            // }
        },
        save: () => {
            $(".loadingW").css("display", "");
            let grid_id = Const.SelectedGridID;

            let btn_id = Const.MesButton.Save;
            let rest_url =  this.gridManager.GetAjaxUrl(grid_id, btn_id);
            let param = this.gridManager.GetSaveParam(grid_id);
            if(param.length > 0)
            {
                param = W2UiHelper.CheckBoxDataConvertToDBFormat(param, this.gridManager.GridList[grid_id].CheckBoxConfigList);
                let param_arr = [param];
                let ajax_args = ScriptHelper.AjaxArgumentBuild(param_arr, btn_id, location.pathname);
                ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
                    .then((res)=>
                    {
                        console.log(res, 'after ajax');
                        this.BtnFuncList.search(event, false);
                        $(".loadingW").css("display", "none");
                        common.success_msg(res.msg);
                    })
                    .fail(ScriptHelper.OnAjaxFail);
                    // .fail(this.#on_ajax_error);
            }
        },
        savePage: () => {
            $(".loadingW").css("display", "");
            let grids = document.getElementsByClassName(Const.config.gridsClass)
            , ajax_url = ''
            , ajax_args
            , grid_id = ''
            , param = []
            , flag = false;

            for(let i=0; i<grids.length; i++){
                grid_id = grids[i].id;
                
                if(w2ui[grid_id].hasOwnProperty("fncPreSavePage") && typeof w2ui[grid_id].fncPreSavePage == "function"){
                    if(!w2ui[grid_id].fncPreSavePage(grid_id).result){
                        return false;
                    };
                }

                param[i] = this.gridManager.GetSaveParam(grid_id);
                if (this.gridManager.GetAjaxUrl(grid_id, Const.MesButton.SavePage) !== undefined){
                    ajax_url = this.gridManager.GetAjaxUrl(grid_id, Const.MesButton.SavePage);
                }
            }

            if(param[1][0] === undefined){
                $(".loadingW").css("display", "none");
                mes_alert({msg : '두번째 grid에 추가된 값이 없습니다.'},{msg : '발주 내용을 입력 후 다시 시도해주세요!'});
                return false;
            }

            // console.log('param', param);
            if(param.length > 0){
                param.forEach(function(el){
                   if(el.length > 0) flag = true;
                });
            }

            if (flag){
                for(let i=0; i<grids.length; i++){
                    grid_id = grids[i].id;
                    param[i] = W2UiHelper.CheckBoxDataConvertToDBFormat(param[i], this.gridManager.GridList[grid_id].CheckBoxConfigList);
                    ajax_args = ScriptHelper.AjaxArgumentBuild(param, Const.MesButton.Save, location.pathname);
                }
                for(let i=0; i<grids.length; i++){
                    grid_id = grids[i].id;
                    if (!ajax_args.hasOwnProperty("selected_row")) ajax_args["selected_row"] = {};
                    ajax_args["selected_row"][grid_id] = w2ui[grid_id].records[w2ui[grid_id].last.click_recid - 1];
                    ajax_args["records"] = {};
                    ajax_args["records"][grid_id] = w2ui[grid_id].records;
                }


                $.ajax({
                    url: ajax_url,
                    data: ajax_args,
                    type: "post",
                    dataType: "json",
                    success: function(data){
                        $(".loadingW").css("display", "none");
                        // console.log("data", data);
                        // this.BtnFuncList.search(false);
                        // console.log("ajax_args", ajax_args);
                        // if(data.result){
                        //     for(let i=0; i<grids.length; i++){
                        //         grid_id = grids[i].id;
                        //         // console.log(grid_id);
                        //         if(w2ui[grid_id].records[w2ui[grid_id].records.length - 1]["po_no"] == '' || w2ui[grid_id].records[w2ui[grid_id].records.length - 1]["po_no"] == undefined){
                        //             // TODO : crtseq가 넘어 올때... 2개의 Grid가 insert 될때
                        //             if(data.data["crtseq"] !== '' || data.data["crtseq"] !== undefined){
                        //                 w2ui[grid_id].records[w2ui[grid_id].records.length - 1]["po_no"] = data.data["crtseq"];
                        //             // TODO : 그게 아니고 param이 넘어올때... grid2만 insert 될때
                        //             }else if(data.param[0][0]["po_no"] !== '' || data.param[0][0]["po_no"] !== undefined){
                        //                 w2ui[grid_id].records[w2ui[grid_id].records.length - 1]["po_no"] = data.param[0][0]["po_no"];
                        //             }
                        //
                        //         }
                        //         w2ui[grid_id].save();
                        //     }
                        // }
                        

                        for(let i=0; i<grids.length; i++){
                            grid_id = grids[i].id;

                            if(w2ui[grid_id].hasOwnProperty("fncPostSavePage") && typeof w2ui[grid_id].fncPostSavePage == "function"){
                                w2ui[grid_id].fncPostSavePage(data);
                            }
                        }
                        
                        common.success_msg(data.msg);

                    },
                    error: function(a,b,c){
                        ScriptHelper.OnAjaxFail
                        // console.log('a',a);
                        // console.log('b',b);
                        // console.log('c',c);
                    }
                });
            }
        },
        excel_down: ()=>{
            // common.excel_download(this.SelectedGrid);
            this.gridManager.OnExcelDownload(Const.SelectedGridID);
        },
        excel_up: ()=>{
            this.gridManager.OnExcelUpload(Const.SelectedGridID);
        },
        approve: ()=>{
            $(".loadingW").css("display", "");
            let grids = document.getElementsByClassName("grids");
            let grid_id = grids[0].id;

            let btn_id = Const.MesButton.Approve;
            let rest_url =  this.gridManager.GetAjaxUrl(grid_id, btn_id);

            let param = [];

                grid_id = grids[1].id;

            let changes = w2ui[grid_id].getChanges();
            for (let item of changes) {
                if (item.chk) {
                    param.push(w2ui[grid_id].records[item.recid - 1]);
                }
            }

            if(param.length > 0){

                if(w2ui[grid_id].hasOwnProperty("fncPreApprove") && typeof w2ui[grid_id].fncPreApprove == "function"){
                    if(!w2ui[grid_id].fncPreApprove(param).result){
                        return false;
                    };
                }

                // ajax url 은 첫번째 그리드에 등록하기로 한다.
                let ajax_args = ScriptHelper.AjaxArgumentBuild(param, btn_id, location.pathname);

                ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, ajax_args)
                    .then((res)=>
                    {
                        console.log(res, 'after ajax');
                        this.BtnFuncList.search(event, false);
                        $(".loadingW").css("display", "none");
                        common.success_msg(res.msg);
                    })
                    .fail(ScriptHelper.OnAjaxFail);
            }
        },
        guide: ()=>{
            //console.log(this.page_addr_name);
            let url = "/uploads/img/guide/"+this.page_addr_name+".pdf";
            window.open("about:blank").location.href = url;
        },
    };

    // #on_ajax_error = (result, status, status_msg)=>{
    //     let err_obj = {
    //         msg: status_msg,
    //         error: result.error()
    //     };
    //     common.mes_alert(err_obj);
    // };
    BindButtonFunction = (custom_btns = []) =>{
        // bind 하지 않을 버튼을 배열로 넘겨주면 기능 동작 하지 않음
        if(custom_btns.indexOf(Const.MesButton.Search) < 0)
            $(`#${this.btn_frm_id} [name='${Const.MesButton.Search}']`).on(Const.HtmlEvent.click, this.BtnFuncList.search);
        if(custom_btns.indexOf(Const.MesButton.AddRow) < 0)
            $(`#${this.btn_frm_id} [name='${Const.MesButton.AddRow}']`).on(Const.HtmlEvent.click, this.BtnFuncList.add);
        if(custom_btns.indexOf(Const.MesButton.DeleteRow) < 0)
            $(`#${this.btn_frm_id} [name='${Const.MesButton.DeleteRow}']`).on(Const.HtmlEvent.click, this.BtnFuncList.delete);
        if(custom_btns.indexOf(Const.MesButton.Initialize) < 0)
            $(`#${this.btn_frm_id} [name='${Const.MesButton.Initialize}']`).on(Const.HtmlEvent.click, this.BtnFuncList.init);
        if(custom_btns.indexOf(Const.MesButton.Save) < 0 && custom_btns.indexOf(Const.MesButton.SavePage) < 0)
            $(`#${this.btn_frm_id} [name='${Const.MesButton.Save}']`).on(Const.HtmlEvent.click, this.BtnFuncList.save);
        if(!(custom_btns.indexOf(Const.MesButton.SavePage) < 0))    // 페이지 전체의 그리드를 한번에 저장하기 위한 부분
            $(`#${this.btn_frm_id} [name='${Const.MesButton.Save}']`).on(Const.HtmlEvent.click, this.BtnFuncList.savePage);
        if(custom_btns.indexOf(Const.MesButton.ExcelDownload) < 0)
            $(`#${this.btn_frm_id} [name='${Const.MesButton.ExcelDownload}']`).on(Const.HtmlEvent.click, this.BtnFuncList.excel_down);
        if(custom_btns.indexOf(Const.MesButton.ExcelUpload) < 0)
            $(`#${this.btn_frm_id} [name='${Const.MesButton.ExcelUpload}']`).on(Const.HtmlEvent.click, this.BtnFuncList.excel_up);
        if(custom_btns.indexOf(Const.MesButton.Approve) < 0)
            $(`#${this.btn_frm_id} [name='${Const.MesButton.Approve}']`).on(Const.HtmlEvent.click, this.BtnFuncList.approve);
        if(custom_btns.indexOf(Const.MesButton.Guide) < 0)
            $(`#${this.btn_frm_id} [name='${Const.MesButton.Guide}']`).on(Const.HtmlEvent.click, this.BtnFuncList.guide);
    };
    InitializeComponent = () => {
        this.frmManager.InitAll();
        this.gridManager.InitAll();
    };

}
