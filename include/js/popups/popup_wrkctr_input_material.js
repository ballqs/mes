import {FormHelper, ScriptHelper} from "/include/js/class/PageManager.js";
import {tableManager} from "/include/js/production/status/SiteTerminalManager.js";

$(function(){
    let popup_id = "popup_wrkctr_input_material";
    let form_id = "popup_wrkctr_input_material_frm";
    let form_name = "popup_wrkctr_input_material_frm";

    let param = FormHelper.SerializeForm(form_id);
    let get_url = "/ajax/production/status/get/curr_material_list_in_man_whs";
    let get_url_prtnbr = "/ajax/production/status/get/curr_material_list_in_man_whs_prtnbr";
    let key_col = 'lotno';
    let table_arr_lot = ['lotno', 'sprt_nbr', 'stck_qty', 'stck_whs_cd', 'stck_loc_cd', 'stck_qty', 'cd_nm', 'stck_unit'];
    let table_arr_prt = ['sprt_nbr', 'lotno', 'stck_qty', 'stck_whs_cd', 'stck_loc_cd', 'cd_nm', 'stck_unit'];

    let table_lot = new tableManager("#table_lot");
    table_lot.add_checkbox("chk_list", 0, 'sprt_nbr', 'lotno');

    table_lot.set_hidden_cols(['stck_whs_cd', 'stck_loc_cd', 'stck_unit']);
    table_lot.set_class(['','','text_r','','','hidd','','']);
    table_lot.trOnClickTypeCheckbox('on');

    let table_prt = new tableManager("#table_prt");
    table_prt.set_no_data_msg("데이터가 없습니다.");
    table_prt.set_hidden_cols(['stck_whs_cd', 'lotno', 'stck_loc_cd', 'stck_unit']);
    table_prt.set_class(['','','text_r','','','','']);

    let draw_tbl = function(search_type){
        if (search_type == 'lot') {
            $(`#${form_id} input[name='page_for_lot']`).val("1");
            param = FormHelper.SerializeForm(form_id);
            table_lot.draw_tbody(get_url, {param : param, cnct_url: location.pathname, cnct_btn: "B0001"}, table_arr_lot, key_col);
        } else if (search_type == 'prt') {
            $(`#${form_id} input[name='page_for_prt']`).val("1");
            param = FormHelper.SerializeForm(form_id);
            table_prt.draw_tbody(get_url_prtnbr, {param : param}, table_arr_prt, key_col);
        }
    }

    $(`#${form_id} .tabTitle > div`).on("click", function(){
        let search_type = this.dataset.searchType;
        $(`#${form_id} input[name='search_type']`).val(search_type);
        $(`#${form_id} input[name='arrow_type']`).val("");    // 페이지 증감에 관여하지 않아야 하기때문에 초기화.
        draw_tbl(search_type);
    });


    $(`#${form_id} .opBtn`).on("click", function(){

        if (this.dataset.name == "init") {
            let search_type = $(`#${form_id} input[name='search_type']`).val();
            if (search_type == '') {search_type = 'lot';}
            $(`#${form_id} input[name='arrow_type']`).val("");

            draw_tbl(search_type);

        } else if (this.dataset.name == "cfm") {

            param = FormHelper.SerializeForm(form_id);
            param.checked_rows = [];
            /*param.cnct_url = location.pathname;
            param.cnct_btn = "B0005";*/
            $(`#popup_wrkctr_input_material_frm #table_lot > tbody > tr`).each(function(){
                if($(this).children().eq(0).children().eq(0).prop("checked")){
                    param.checked_rows.push({
                        lotno : $(this).children().eq(1).text(),
                        prt_nbr_cd : $(this).children().eq(2).text(),
                        whs_cd : $(this).children().eq(4).text(),
                        loc_cd : $(this).children().eq(5).text()
                    });
                }
            });

            $.ajax({
                url:"/ajax/production/status/save/insert_material",
                type:"post",
                // data: param,
                data: {
                    param: param,
                    cnct_url: location.pathname,
                    cnct_btn: "B0005"
                },
                dataType:"json",
                success:function (res) {
                    console.log(res);
                    if(res.result){
                        draw_tbl('lot');
                        draw_tbl('prt');
                        $(`#table_prt`).css("display", "none");
                        let d = new Date();
                        $(".noticeFooter .cont").text(res.msg+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
                    }
                },
                error: function (a, b, c) {
                    console.log('a', a);
                    console.log('c', c);
                    console.log('b', b);
                }
            });

        } else if (this.dataset.name == "cls") {
            $(`#${popup_id}`).css("display", "none");
            $(`#${popup_id} #table_lot > tbody`).html("");
            $(`#${popup_id} #table_prt > tbody`).html("");
            document.tabletMain.set_interval_flag.value = 'T';
        }

    });

    $(`#${form_id} .arrow`).on("click", function(){
        $(`#${form_id} input[name='arrow_type']`).val(this.dataset.arrow);
        let daynight = $(`#${form_id} input[name='search_type']`).val();
        draw_tbl(daynight);
    });

    $(`#${form_id} .btnCont`).on("click", "label", function(){
        if($(this).children("input").prop("checked")){
            $(this).addClass('on');
        }else{
            $(this).removeClass('on');
        }
        document.getElementById("clicked_wrkctr").value = $(this).children('p').text();
    });
});