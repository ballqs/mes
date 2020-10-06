import {FormHelper, ScriptHelper} from "/include/js/class/PageManager.js";
import {tableManager} from "/include/js/production/status/SiteTerminalManager.js";

$(function(){
    let popup_id = "popup_wrkctr_orderno_result";
    let form_id = "popup_wrkctr_orderno_result_frm";
    let form_name = "popup_wrkctr_orderno_result_frm";

    let param = FormHelper.SerializeForm(form_id);

    // 작업장 상태 그리는 함수
    let draw_order_result_tbl = function(res){
        $(`#${form_id} input[name='hidden_wrk_ordr_no']`).val(res.data[0].wrk_ordr_no);
        let orderno_result_table_id = 'orderno_result_table';
        let or_td = $(`#${orderno_result_table_id} > tbody > tr > td`);

        $(`.hidden_lot_size`).val(res.data[0].lot_size);

        or_td[0].textContent = res.data[0].wrkctr_cd;   // 작업장 코드
        or_td[1].textContent = res.data[0].wrkctr_nm;   // 작업장명
        or_td[2].textContent = res.data[0].staus;       // 상태
        or_td[3].innerHTML = res.data[0].str_tm.replace(' ', '<br/>');       // 시간
        or_td[4].textContent = res.data[0].prt_nbr_cd;  // 품번
        or_td[5].textContent = res.data[0].prt_nbr_nm;  // 품명
        or_td[6].textContent = res.data[0].ordr_qty;    // 생산목표
        $(or_td[3]).addClass('text_c');
        $(or_td[6]).addClass('text_r');
        $(or_td[9]).addClass('text_r');
        // or_td.eq(9).addClass("text_r");
    }

    // 투입된 자품목 테이블 그리는 함수
    let draw_inserted_materials_tbl = function(inserted_materials){
        let per_page = document[form_name].per_page.value;
        let im_table_id = 'inserted_materials_table';
        let html = '';
        let cnt = 0;
        for(let key in inserted_materials){
            html += `<tr>`;
            html +=     `<td>${inserted_materials[key].prt_nbr_cd}</td>`;
            html +=     `<td>${inserted_materials[key].prt_nbr_nm}</td>`;
            html +=     `<td class="text_r">${inserted_materials[key].sum}</td>`;
            html +=     `<td class="text_r">${inserted_materials[key].base_qty}</td>`;
            html +=     `<td>${inserted_materials[key].base_unit_nm}</td>`;
            html +=     `<td class="text_r">${inserted_materials[key].cmpnt_qty}</td>`;
            html +=     `<td>${inserted_materials[key].cmpnt_unit_nm}</td>`;
            html += `</tr>`;
            cnt++;
        }
        for(cnt; cnt < per_page; cnt++){
            html += `<tr>`;
            html +=     `<td colspan="7" style="border:0px"></td>`;
            html += `</tr>`;
        }

        $(`#${im_table_id} > tbody`).html(html);
    }

    // 상단 정보(생산총수량, 실적수량, 총입고수량)
    let get_curr_result_status = function(){
        let get_url = "/ajax/production/status/get/curr_result_status";
        let param = FormHelper.SerializeForm(form_id);
        $.ajax({
            url : get_url,
            type : "get",
            data : {param:param},
            dataType : "json",
            success: function (res) {
                console.log("get_curr_result_status res", res);
                let sum_prct_qty = res.total_prd.sum_prct_qty;  // 총 생산수량
                let sum_res_qty = res.total_res.sum_res_qty;    // 실적수량, 총입고수량.
                let lot_size = res.total_prd.lot_size;  // lot 사이즈
                let unit_cd = res.total_prd.base_unit;  // 단위 코드
                let unit_nm = res.total_prd.base_unit_nm;   // 단위

                $(`#popup_wrkctr_orderno_result .hidden_sum_prct_qty`).val(sum_prct_qty);
                $(`#popup_wrkctr_orderno_result .hidden_sum_res_qty`).val(sum_res_qty);
                $(`#popup_wrkctr_orderno_result .hidden_sum_in_qty`).val(sum_res_qty);
                $(`#popup_wrkctr_orderno_result .hidden_lot_size`).val(lot_size);

            }
        });
    }

    $("#tetete").on("click", function(){
        get_curr_result_status();
    });

    // 투입된 자품목 그리는 함수
    let get_inserted_materials = function(tbl_arr = [1,2], msg = ''){
        $(`#${popup_id} input[name='err_cd']`).val('');
        let get_url = "/ajax/production/status/get/orderno_result";
        param = FormHelper.SerializeForm(form_id);
        let param_msg = msg;
        $.ajax({
            url: get_url,
            type:"get",
            data:{param: param},
            dataType:"json",
            success:function (res) {
                console.log(res);
                orderno_result_data.data = res.data;
                orderno_result_data.inserted_materials = res.inserted_materials;
                if(res.result){
                    // res.data => 작업장 상태 그리기
                    if (tbl_arr.indexOf(1) != -1) {
                        draw_order_result_tbl(res);
                    }
                    // res.inserted_materials => 작업장에서 생산하는 품번에 투입되는 자품번 리스트 그리기
                    let inserted_materials = orderno_result_data.inserted_materials;
                    if (tbl_arr.indexOf(2) != -1) {
                        draw_inserted_materials_tbl(inserted_materials);
                    }
                    let d = new Date();
                    if (param_msg == 'init'){
                        return false;
                    }else if (param_msg != '') {
                        $(".noticeFooter .cont").text(param_msg + "(" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")");
                    }else if(res.msg != '') {
                        console.log('res.msg', res.msg);
                        $(".noticeFooter .cont").text(res.msg + "(" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")");
                    }
                }
            },
            error: function (a, b, c) {

            }
        });
    }

    // 위쪽 버튼 기능
    $(`#${form_id} .opBtn`).on("click", function(){

        if (this.dataset.name == "init") {
            $(`#${form_id} input[name='page']`).val("1");
        } else if (this.dataset.name == "sch") {
            get_inserted_materials();
        } else if (this.dataset.name == "cfm") {

            // 입력 수량 체크
            let orderno_result = Number($("#orderno_result_table input[name='orderno_result']").val());
            //console.log(orderno_result);
            let prd_good_qty = Number($("#orderno_result_table input[name='prd_good_qty']").val());
            //console.log(prd_good_qty);
            let err_qty = Number($("#orderno_result_table input[name='err_qty']").val());
            //console.log(err_qty);

            let err_msg = '';

            if (prd_good_qty == 0 && err_qty == 0){
                err_msg = "실적 수량을 입력해주세요.";
            }

            // 생산실적 입력 여부
            // if(orderno_result == 0 || orderno_result == ''){err_msg = '생산실적을 입력해주세요.';}
            // 생산실적과 양품 불량 합산 일치 여부
            // if(orderno_result != prd_good_qty + err_qty){err_msg = '양품과 불량 수량의 합이 생산실적과 다릅니다.';}

            if(err_msg != ''){
                common.mes_alert({msg: err_msg});
                return false;
            }

            // 투입된 자재정보보다 많은 생산 실적이 입력되었는지 체크 여부는 서버단에서 해야함.
            //  => 화면을 켜 놓은 상태로 시간이 오래 지난 후 입력할 시 실적현황이 변경되어있을 수 있기 때문.
            param = FormHelper.SerializeForm(form_id);
            $.ajax({
                url:"/ajax/production/status/save/orderno_result",
                type:"post",
                data:{param: param, cnct_url: location.pathname, cnct_btn: "B0024"},
                dataType:"json",
                success:function (res) {
                    console.log('res', res);
                    // document.popup_wrkctr_orderno_result_frm.orderno_result.value = 0;
                    // document.popup_wrkctr_orderno_result_frm.prd_good_qty.value = 0;
                    // document.popup_wrkctr_orderno_result_frm.err_qty.value = 0;
                    $(`#popup_wrkctr_orderno_result span.err_qty`).text("0");


                    if(res.result){
                        get_inserted_materials([1,2], res.msg);
                        get_curr_result_status();
                        wrkctr_common.set_action_btn();
                        $(`#orderno_result_table input[name='orderno_result']`).val(0);
                        $(`#orderno_result_table input[name='prd_good_qty']`).val(0);
                        $(`#orderno_result_table input[name='err_qty']`).val(0);
                        // let d = new Date();
                        // $(".noticeFooter .cont").text(res.msg+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
                    }else{
                        common.mes_alert({msg : res.msg});
                    }
                },
                error: function (a, b, c) {
                    console.log('a', a);
                    console.log('c', c);
                    console.log('b', b);
                }
            });

        } else if (this.dataset.name == "cls") {    // 닫기 버튼
            let orderno_result_table_id = 'orderno_result_table';
            $(`#${popup_id}`).css("display", "none");
            $(`#${popup_id} #${orderno_result_table_id} > tbody > tr > td`)[0].textContent = '';// 작업장코드
            $(`#${popup_id} #${orderno_result_table_id} > tbody > tr > td`)[1].textContent = '';// 작업장명
            $(`#${popup_id} #${orderno_result_table_id} > tbody > tr > td`)[2].textContent = '';// 상태
            $(`#${popup_id} #${orderno_result_table_id} > tbody > tr > td`)[3].textContent = '';// 시간
            $(`#${popup_id} #${orderno_result_table_id} > tbody > tr > td`)[4].textContent = '';// 품번
            $(`#${popup_id} #${orderno_result_table_id} > tbody > tr > td`)[5].textContent = '';// 품명
            $(`#${popup_id} #${orderno_result_table_id} > tbody > tr > td`)[6].textContent = '0'; // 생산목표
            $($(`#${popup_id} #${orderno_result_table_id} > tbody > tr > td`)[6]).addClass('text_r');
            $(`#${popup_id} #${orderno_result_table_id} input[name='orderno_result']`).val(0); // 생산실적
            $(`#${popup_id} #${orderno_result_table_id} input[name='prd_good_qty']`).val(0); // 양품
            $(`#${popup_id} #${orderno_result_table_id} input[name='err_qty']`).val(0); // 불량
            $(`#${popup_id} #${orderno_result_table_id} input[name='err_qty']`).prev().text("0"); // 불량 텍스트
            $(`#${popup_id} #${orderno_result_table_id} input[name='hidden_sum_prct_qty']`).prev().text(""); // 불량 텍스트
            $(`#${popup_id} #${orderno_result_table_id} input[name='hidden_sum_res_qty']`).prev().text(""); // 불량 텍스트
            $(`#${popup_id} #${orderno_result_table_id} input[name='hidden_sum_in_qty']`).prev().text(""); // 불량 텍스트

            $(`#${popup_id} #inserted_materials_table > tbody`).html(""); // 투입가능 품번 테이블


            // let param = FormHelper.SerializeForm(form_id);
            // $.ajax({
            //     url:"/ajax/production/status/delete/tmp_bad",
            //     type:"post",
            //     data:{param:param},
            //     dataType:"json",
            //     success: function (res) {
            //         console.log(res);
            //         click_main_selected_row();
            //     }
            // });
            click_main_selected_row();
            document.tabletMain.set_interval_flag.value = 'T';
        }else if(this.dataset.name == "init_bad"){
            // 불량 초기화
            let param = FormHelper.SerializeForm(form_id);
            $.ajax({
                url:"/ajax/production/status/delete/tmp_bad",
                type:"post",
                data:{param:param, cnct_url: location.pathname, cnct_btn: "B0004"},
                dataType:"json",
                success: function (res) {
                    // console.log(res);
                    if(res.result){
                        let prod_total = document.popup_wrkctr_orderno_result_frm.orderno_result;
                        let prod_bad_target = document.popup_wrkctr_orderno_result_frm.err_qty;
                        let prod_bad = 0;
                        let prod_good = document.popup_wrkctr_orderno_result_frm.prd_good_qty;
                        prod_total.value = Number(prod_good.value) + Number(prod_bad);
                        prod_bad_target.value = prod_bad;
                        let d = new Date();
                        $(".noticeFooter .cont").text(res.msg+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
                    }
                }
            });
        }else if(this.dataset.name == "tmp_bad_status"){
            // 불량 내역 조회 팝업 열기
            // let param = FormHelper.SerializeForm(form_id);
            // $.ajax({
            //     url:"/ajax/production/status/delete/tmp_bad",
            //     type:"post",
            //     data:{param:param, cnct_btn : "B0005", cnct_url: location.pathname},
            //     dataType:"json",
            //     success: function (res) {
            //         // console.log(res);
            //         if(res.result){
            //             let prod_total = document.popup_wrkctr_orderno_result_frm.orderno_result;
            //             let prod_bad_target = document.popup_wrkctr_orderno_result_frm.err_qty;
            //             let prod_bad = 0;
            //             let prod_good = document.popup_wrkctr_orderno_result_frm.prd_good_qty;
            //             prod_total.value = Number(prod_good.value) + Number(prod_bad);
            //             prod_bad_target.value = prod_bad;
            //             let d = new Date();
            //             $(".noticeFooter .cont").text(res.msg+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
            //         }
            //     }
            // });
            console.log('tmp_bad_status', this);
            $(`#tmp_bad_status_search_btn`).click();
            $(`#popup_tmp_bad_status`).css("display", "");
        }

    });

    // 불량 입력 팝업 띄우기
    $("#popup_wrkctr_orderno_result_frm .err_qty").parent().on('click', function(){
        let bad_popup_id = 'popup_wrkctr_bad_reason';
        $(`#${bad_popup_id}`).css("display", "");
    });

    $(`#${form_id} .arrow`).on("click", function(){
        $(`#${form_id} input[name='arrow_type']`).val(this.dataset.arrow);
        get_inserted_materials([2]);
    });

    $(`#tBtn_B0024`).on('click', function(){
        get_inserted_materials([1,2], 'init');
    });

    $(`#${popup_id} input[name='prd_good_qty']`).on('change', function(){
        let target_total = document.popup_wrkctr_orderno_result_frm.orderno_result;
        let target_bad = document.popup_wrkctr_orderno_result_frm.err_qty;
        target_total.value = Number(this.value) + Number(target_bad.value);
    });


});

/*
해당지시번호로 tpb_runstophstry 'R' COUNT(*) >= 1  이면 실적 등록 가능
로직 추가
화면에 첫번째 두번째 그리드 사이에 여유 추가 , 숫자 우측 , 블량수랭 넓이 조절
입력시 양품 수량 , 불량 수량 만 입력(양품 + 불량 = 생산실적
실적 등록 후 메시지 실적이 등록 되었습니다. 로 수정
총 입고 수량 (tpb_machrslthstry) 표시
실적 등록 후 양품 수량,불량 수량 0 으로 셋팅
양품수량 0 ,불량수랭 0 등록시  실적등록 헐수 없다는 에러 메세지 표시
*/