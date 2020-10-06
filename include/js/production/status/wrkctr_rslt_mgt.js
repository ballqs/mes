import {FormHelper} from "/include/js/class/PageManager.js";
import {tableManager} from "/include/js/production/status/SiteTerminalManager.js";


// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
// let vh = window.innerHeight * 0.01;

// Then we set the value in the --vh custom property to the root of the document
// document.documentElement.style.setProperty('--vh', `${vh}px`);
// document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01+`px`);



//버튼 색상 변경
// $(".btnCont>div, .btnCont2>div, .btnDiv>div, .btnSelect .btn").on("click", function(){
//     $(this).addClass('on');
// });



$(document).ready(function(){

    let div_id = 'tableMain';
    let form_id = "tabletMain";
    let form_name = 'tabletMain';

    function initDate(){
        let now_date = new Date();
        let y = now_date.getFullYear();
        let m = (now_date.getMonth() + 1) < 10 ? '0' + (now_date.getMonth() + 1) : (now_date.getMonth() + 1);
        let d = now_date.getDate() < 10 ? '0' + now_date.getDate() : now_date.getDate();
        let result = y+'-'+m+'-'+d;
        $(".date1").val(result);
        $(".date2").val(result);
    }

    //메인 버튼이동
    $(".open_popup_btn").on("click", function(){
        let pop_name = $(this).attr("pop_name");
        // $(`.btnCont`).html("");

        // 팝업 띄우기 전 체크사항
        if(pop_name != "popup_sel_wrkctr" && pop_name != "wrkctr_logout_btn" && this.dataset.name === undefined){
            // 작업장이 선택되어있지 않을 경우
            if($(`#${form_id} input[name='selected_wrkctr_cd']`).val() == "") {common.mes_alert({msg : "작업장을 선택해주세요."}); return false;}
        }



        // 팝업별 조건설정.
        if(pop_name == "popup_sel_wrkctr_wrkr"){    // 작업자 선택 버튼클릭시
            // let param = FormHelper.SerializeForm("tabletMain");
            // $.ajax({
            //     url:"/ajax/production/status/get/chk_str_tm",
            //     type:"get",
            //     data:{param:param},
            //     dataType:"json",
            //     success:function (res) {
            //
            //     }
            //
            // });
            if ($(`#tabletMain .hidden_main_wrkr_nm`).val() != '' && $(`#tabletMain .hidden_str_tm`).val() != ''){   // 작업자가 존재하고, 시작시간이 존재하면
                common.mes_alert({msg:'작업자를 선택할 수 없습니다.'})
                return false;
            }
            $(`#popup_sel_wrkctr_wrkr #popup_sel_wrkctr_wrkr_search_btn`).click();
            $(`#popup_sel_wrkctr_wrkr .btnCont`).html("");
            $('#'+pop_name).css("display", "");
        }else if (pop_name == "popup_sel_wrkctr_orderno"){  // 작업지시선택 버튼 클릭시.

            // 작업자가 선택되어있지 않으면 작업자를 선택하세요 메세지.
            if ($(`#tabletMain .hidden_main_wrkr_nm`).val() == ''){
                common.mes_alert({msg:'작업자를 먼저 선택해주세요.'});
                return false;
            }


            let now_date = new Date();
            let y = now_date.getFullYear();
            let m = (now_date.getMonth() + 1) < 10 ? '0' + (now_date.getMonth() + 1) : (now_date.getMonth() + 1);
            let d = now_date.getDate() < 10 ? '0' + now_date.getDate() : now_date.getDate();
            let result = y+'-'+m+'-'+d;
            $(`#popup_sel_wrkctr_orderno input[name='plan_date']`).val(result);


            // 작업지시선택이 되어있으면 이미 선택되었다고 알리고 팝업 띄우지 않기.
            let param = FormHelper.SerializeForm("tabletMain");
            $.ajax({
                url: "/ajax/production/status/get/chkcurwrkctr",
                type: "get",
                data: {param:param},
                dataType:"json",
                success:function (res) {
                    console.log('res',res);
                    if (!res.result) {
                        common.mes_alert({msg:res.msg});
                        $('#'+pop_name).css("display", "none");
                    }else{
                        $(`#sel_wrkctr_orderno_search_all`).click();
                        $('#'+pop_name).css("display", "");
                    }
                },
                error:function (a, b, c) {
                    console.log('a', a);
                }
            });
        }else if (pop_name == "popup_wrkctr_orderno_result"){   // 실적 등록 버튼 클릭시.
            // $(`#popup_wrkctr_orderno_result_sch_btn`).click();...11

            // 가동 이력 있는지 여부 체크 로직 주석 처리 0921
            // let param = FormHelper.SerializeForm("tabletMain");
            // $.ajax({
            //     url:"/ajax/production/status/get/chk_run_hstry",
            //     type:"get",
            //     data:{param:param},
            //     dataType:"json",
            //     success: function (res) {
            //         console.log('res', res);
            //         // return false;
            //         // $(`.hidden_lot_size`).val(res.data[0].lot_size);
            //         if (res.cnt != '0'){
            //             $('#'+pop_name).css("display", "");
            //         }else{
            //             common.mes_alert({msg:res.msg});
            //         }
            //         wrkctr_common.set_action_btn();
            //     }
            // });
            // 생산총수량, 불량 총 합 구해서 해당칸에 입력하는 로직.
            let param = FormHelper.SerializeForm("popup_wrkctr_orderno_result_frm");
            $.ajax({
                url:"/ajax/production/status/get/curr_wrkctr_tmp_err_sum",
                type:"get",
                data:{param:param},
                dataType:"json",
                success: function (res) {
                    console.log('res', res);
                    // $(`#orderno_result_table input[name='err_qty']`).val(res.err_qty_sum);
                    $(`#popup_wrkctr_orderno_result input[name='hidden_sum_prct_qty']`).val(res.data.sum_mach_qty);
                    $(`#popup_wrkctr_orderno_result input[name='hidden_sum_res_qty']`).val(res.data.sum_mach_qty);
                    $(`#popup_wrkctr_orderno_result input[name='hidden_sum_in_qty']`).val(res.data.sum_mach_qty);
                    $(`#orderno_result_table input[name='orderno_result']`).val(res.data.err_qty);
                    $(`#orderno_result_table input[name='prd_good_qty']`).val(0);
                    $(`#orderno_result_table input[name='err_qty']`).val(res.data.err_qty);
                }
            });
            $('#'+pop_name).css("display", "");
        }else if (pop_name == "popup_result_status") {  // 실적현황조회 버튼 클릭시.
            initDate();
            $('#'+pop_name).css("display", "");
        }else if (pop_name == "popup_runstop_status") {  // 비가동 현황조회 버튼 클릭시.
            initDate();
            $('#'+pop_name).css("display", "");
        }else if (pop_name == "popup_bad_status") {  // 불량현황조회 버튼 클릭시.
            initDate();
            $('#'+pop_name).css("display", "");
        }else{
            $('#'+pop_name).css("display", "");
        }
        //$(`#tableMain input[name='set_interval_flag']`).val('F');
        // $('#'+pop_name).css("display", "");
    });

	//TAB
    // $(".tabCont").hide(); //Hide all content
    // $(".tabTitle div:first").addClass("active").show(); //Activate first tab
    // $(".tabCont:first").show(); //Show first tab content

    // On Click Event
    $(".tabTitle div").click(function() {
        // let _idx = $(".tabTitle div").index();
        let _idx = $(this).index();
        // console.log('_idx', _idx);


        $(".tabTitle div").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(".tabCont").hide(); //Hide all tab content


        $(this).parent().siblings(".tabCont").eq(_idx).show();

        var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
        $(activeTab).show(); //Fade in the active ID content
        return false;
    });

    // $('.tab div').click(function(){
    //     var activeTab = $(this).attr('data-tab');
    //     $('.tab div').removeClass('active');
    //     $('.tabCont').removeClass('active');
    //     $(this).addClass('active');
    //     $('#' + activeTab).addClass('active');
    // });

    // let mainpage = new popup_wrkctr("tableMainFrm", "table");
    // console.log(mainpage);
    // mainpage.searchPage("/ajax/production/status/get/wrkctrinfo");


    let trOnClickTypeInputHiddenCallback = {
        post : function(obj) {
            $.ajax({
                url: "/ajax/production/status/get/wrkctrinfo",
                type: "get",
                data: {
                    param: {
                        where: {
                            wrkctr_cd: document.tabletMain.selected_wrkctr_cd.value
                        }
                    }
                },
                dataType: "json",
                success: function (res) {
                    // console.log('res1', res);
                    let d = new Date();
                    $(".noticeFooter .cont").text("");
                    if (!res.result) {
                        common.mes_alert({msg: res.msg});
                        let btn_id = res.data[0][0].out_button;
                        wrkctrManager.btnAlert(btn_id);
                    } else {
                        let cd = obj.dataset.key;
                        let nm = obj.children[1].textContent;
                        $(".hidden_wrkctr_cd").val(obj.dataset.key);
                        $(".hidden_wrkctr_nm").val(obj.children[1].textContent);
                        $(".hidden_str_tm").val(obj.children[3].textContent);
                        $(".hidden_prtnbr_cd").val(obj.children[4].textContent);
                        $(".hidden_prtnbr_nm").val(obj.children[5].textContent);
                        $(".hidden_main_wrkr").val(obj.children[11].textContent);
                        $(".hidden_main_wrkr_nm").val(obj.children[13].textContent == 'null' ? '' : obj.children[13].textContent);
                        $(".hidden_wrkr_qty").val(`총 ${obj.children[12].textContent} 명`);
                        $(obj).children().each(function(){
                            if(this.dataset.key == 'staus'){
                                let txt = this.dataset.value == '가동' ? '비가동' : '가동';
                                let val = this.dataset.value == '가동' ? 'S' : 'R';
                                $(`#tBtn_B0013`).text(txt);
                            }
                        });

                        let btn_info  = res.btninfo;
                        let btn = '';
                        for(let item of btn_info){
                            if (item[0].hasOwnProperty('out_result')){
                                btn = item[0].out_btn;
                            }
                        }
                        if (btn != ''){
                            action_btn = btn;
                        }
                    }
                },
                error: function (a, b, c) {
                    console.log(a.responseText);
                }
            });
        }
    }

    function btn_action(){
        let class_name = 'blink_btn';
        let btn = action_btn;
        if(!$(`#tBtn_${btn}`).hasClass(class_name)){
            $(`.open_popup_btn`).each(function(){
                $(this).removeClass(class_name);
            });
            $(`#tBtn_${btn}`).addClass(class_name);
        }else{
            $(`.open_popup_btn`).each(function(){
                $(this).removeClass(class_name);
            });
        }
        if ($(".cont").hasClass("blink_msg")){
            $(".cont").removeClass("blink_msg");
        }else{
            $(".cont").addClass("blink_msg");
        }

    }
    setInterval(btn_action, 1000);
    // function btn_interval(btn, time){
    //     clearInterval(function(){btn_action(btn)});
    //     setInterval(function(){btn_action(btn)}, time);
    // }
    // function btn_action(btn){
    //     // tBtn_B0031
    //     let class_name = 'btn_red';
    //     if(!$(`#tBtn_${btn}`).hasClass(class_name)){
    //         $(`.open_popup_btn`).each(function(){
    //             $(this).removeClass(class_name);
    //         });
    //         $(`#tBtn_${btn}`).addClass(class_name);
    //     }else{
    //         $(`.open_popup_btn`).each(function(){
    //             $(this).removeClass(class_name);
    //         });
    //     }
    // }


    let param = FormHelper.SerializeForm(form_id);

    // let main_table_hidd_cols = ['main_wrkr', 'wrkr_qty'];
    let main_table = new tableManager("#wrkctrlist_tbl");
    let main_table_cols = ['wrkctr_cd', 'wrkctr_nm', 'staus', 'str_tm', 'prt_nbr_cd', 'prt_nbr_nm', 'ordr_qty', 'prd_qty_meas', 'prd_good_qty', 'err_qty', 'daynight_gbn_nm', 'main_wrkr', 'wrkr_qty', 'emp_nm','daynight_gbn', 'staus_cd', 'wrk_ordr_no', 'stop_cd', 'mach_cd', 'in_crt_gbn'];
    let main_table_key_col = "wrkctr_cd";
    let main_table_url = "/ajax/production/status/get/wrkctrlist";
    main_table.set_hidden_cols(['main_wrkr', 'wrkr_qty', 'emp_nm', 'daynight_gbn', 'staus_cd', 'wrk_ordr_no', 'stop_cd', 'mach_cd', 'in_crt_gbn']);
    main_table.trOnClickTypeInputHidden(`form[name='tabletMain'] input[name='selected_wrkctr_cd']`, 'Ton', trOnClickTypeInputHiddenCallback);
    main_table.draw_tbody(main_table_url, {param : param}, main_table_cols, main_table_key_col);
    main_table.set_class(['','','','text_c','','','text_r','text_r','text_r','text_r','text_c']);
    let intervalFnc = function(){
        if ($(`#tableMain input[name='set_interval_flag']`).val() == 'T' || false) {
            let param = FormHelper.SerializeForm(form_id);
            let callbackFnc = {
                post: function (res) {
                    // console.log('res : ', res);
                    if(res.data.length == 0){ action_btn = 'B0019'; }
                    // else{ action_btn = ''; }
                    $("#wrkctrlist_tbl > tbody > tr").each(function () {
                        // console.log(this.dataset.key);
                        if ($("#tabletMain input[name='selected_wrkctr_cd']").val() == this.dataset.key) {
                            // console.log(this);
                            $(this).addClass("Ton");

                            $(this).children().each(function(){
                                // 주작업자
                                if(this.dataset.key == 'emp_nm'){$(".hidden_main_wrkr_nm").val(this.dataset.value);}
                                // 인원
                                if(this.dataset.key == 'wrkr_qty'){$(".hidden_wrkr_qty").val(`총 ${this.dataset.value} 명`);}
                                // 품번
                                if(this.dataset.key == 'prt_nbr_cd'){$(".hidden_prtnbr_cd").val(this.dataset.value);}
                                // 품명
                                if(this.dataset.key == 'prt_nbr_nm'){$(".hidden_prtnbr_nm").val(this.dataset.value);}
                                // 생산목표
                                if(this.dataset.key == 'ordr_qty'){$(".hidden_ordr_qty").val(this.dataset.value);}
                                // 생산실적
                                if(this.dataset.key == 'prd_qty_meas'){$(".hidden_prd_qty_meas").val(this.dataset.value);}
                                // 지시번호
                                if(this.dataset.key == 'wrk_ordr_no'){$(".hidden_wrk_ordr_no").val(this.dataset.value);}
                            });

                            // 가동/비가동 버튼과 동기화.
                            $(this).children().each(function(){
                                if(this.dataset.key == 'staus'){
                                    let txt = this.dataset.value == '가동' ? '비가동' : '가동';
                                    let val = this.dataset.value == '가동' ? 'S' : 'R';
                                    $(`#tBtn_B0013`).text(txt);
                                }
                            });
                        }



                    });
                    // let wrkctr_cd = $("#tabletMain input[name='selected_wrkctr_cd']").val();
                    // console.log('callback', wrkctr_cd);
                }
            }
            main_table.draw_tbody(main_table_url, {param: param}, main_table_cols, main_table_key_col, callbackFnc);
        }
    }
    setInterval(intervalFnc, 2000);

    // 처음 화면이 뜰 때 공장값이 팝업들에도 들어가게 하는 부분.
    $(".hidden_fact_cd").val($(`#tabletMain select[name='fact_cd']`).val());

    // 공장값을 선택하면 팝업들에도 들어가게 하는 부분.
    $(`#${form_id} select[name='fact_cd']`).on("change", function(obj){
        $(".hidden_fact_cd").val(this.value);
    });

    // function rs_sync(){
    //     console.log('rs_sync');
    //     $("#wrkctrlist_tbl > tbody > tr").each(function () {
    //         // console.log(this.dataset.key);
    //         if ($("#tabletMain input[name='selected_wrkctr_cd']").val() == this.dataset.key) {
    //             // console.log(this);
    //             if($(this).hasClass("on")){
    //                 console.log('on', this);
    //             }
    //         }
    //     });
    // }

    $(`#tBtn_B0013`).on("click", function(){
        let param = FormHelper.SerializeForm(form_id);
        let row_info = main_table.getSelectedRow();
        param.row_info = row_info;
        // if(row_info.staus_cd == 'S' && document.tabletMain.stop_cd.value == ''){
        if(row_info.staus_cd == 'S' && row_info.stop_cd == '' && row_info.in_crt_gbn != 10){
            common.mes_alert({msg:"비가동사유를 입력해주세요."});
            return false;
        }
        $.ajax({
            url:"/ajax/production/status/save/runstop",
            type:"post",
            data:{
                param: param,
                cnct_url: location.pathname,
                cnct_btn: "B0001"
            },
            dataType:"json",
            success: function(res){
                console.log('res', res);
                if (res.result){
                    wrkctr_common.set_action_btn();
                    let d = new Date();
                    $(".noticeFooter .cont").text(res.msg+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
                } else {
                    common.mes_alert({msg:res.msg});
                }
            },
            error: function(a,b,c){

            }
        });
    });

    /*
    지시 완료 버튼 : usp_wrkordcplt_b1
    */
    $(`#tBtn_B0018`).on("click", function(){
        let param = FormHelper.SerializeForm(form_id);
        let row_info = main_table.getSelectedRow();
        param.row_info = row_info;
        $.ajax({
            url:"/ajax/production/status/save/order_complete",
            type:"post",
            data:{
                param: param,
                cnct_url: location.pathname,
                cnct_btn: "B0001"
            },
            dataType:"json",
            success: function(res){
                console.log('res', res);
                if (res.result){
                    let d = new Date();
                    $(".noticeFooter .cont").text(res.msg+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
                    wrkctr_common.set_action_btn();
                } else {
                    common.mes_alert({msg:res.msg});
                }
            },
            error: function(a,b,c){

            }
        });
    });

    // 소재 투입 버튼
    $(`#tBtn_B0015`).on("click", function(){
        $(`#popup_wrkctr_input_material_frm .tabTitle > div`).eq(0).click();
    });

    // 소재 투입 버튼
    $(`#tBtn_B0031`).on("click", function(){
        $(`#popup_wrkctr_input_material_cancel_frm .tabTitle > div`).eq(0).click();
    });

    // BOM 조회 버튼
    $(`#tBtn_B0029`).on("click", function(){
        $(`#popup_bom_status_frm .tablet .btnDiv > div`).eq(0).children().click();
    });

    // 비가동 사유 (자동) tBtn_B0032
    $(`#tBtn_B0032`).on("click", function(){
        $(`#popup_wrkctr_stop_reason_auto_frm .tablet .btnDiv > div`).eq(0).children().click();
    });

    $(`.opBtn`).on("click", function(){
        if (this.dataset.name == "cls") {
            $(`.cont`).text("");
        }
    });

    $(`#${form_id} .arrow`).on("click", function(){
        let callbackFnc = {
            post: function (res) {
                console.log('callbackres : ', res);
                $(`#tabletMain input[name='page']`).val(res.page);
            }

        }
        $(`#${form_id} input[name='arrow_type']`).val(this.dataset.arrow);
        let param = FormHelper.SerializeForm(form_id);
        $(`#${form_id} input[name='arrow_type']`).val("");
        main_table.draw_tbody(main_table_url, {param : param}, main_table_cols, main_table_key_col, callbackFnc);
    });


    // $(`#tBtn_B0031`).on("click", function(){
    //     let param = FormHelper.SerializeForm(form_id);
    //     let row_info = main_table.getSelectedRow();
    //     param.row_info = row_info;
    //     // if(row_info.staus_cd == 'S' && document.tabletMain.stop_cd.value == ''){
    //     // if(row_info.staus_cd == 'S' && row_info.stop_cd == ''){
    //     //     common.mes_alert({msg:"비가동사유를 입력해주세요."});
    //     //     return false;
    //     // }
    //     $.ajax({
    //         url:"/ajax/production/status/save/insert_material_cancel",
    //         type:"post",
    //         data:{ param: param },
    //         dataType:"json",
    //         success: function(res){
    //             console.log('res', res);
    //         },
    //         error: function(a,b,c){
    //
    //         }
    //     });
    // });
});
