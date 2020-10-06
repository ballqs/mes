var fact_cd = [];
var account_type = [];
var units = [];
var supply_type = [];
var sagub_type = [];
var prt_nbr_grp_cd = [];
$(function () {
    // select tag에 필요한 데이터 가져오기

    common.code({up_cd:"sagub_type"}).then((res)=>{
        sagub_type = res.data;

        common.code({up_cd:"prt_nbr_grp_cd"}).then((res)=>{
            prt_nbr_grp_cd = res.data;

            common.code({up_cd:"unit_cd"}).then((res)=>{
                units = res.data;

                common.code({up_cd:"supply_type"}).then((res)=>{
                    supply_type = res.data;

                    common.code({up_cd:"fact_cd"}).then((res)=>{
                        fact_cd = res.data;
                        let html = "";
                        for(let arr_item of fact_cd) {
                            html += '<option value="' + arr_item.cd + '">' + arr_item.cd_nm + '</option>';
                        }
                        $("select[name='fact_cd']").html(html);

                        common.code({up_cd:"account_type"}).then((res)=>{
                            account_type = res.data;
                            let html = "";
                            html += '<option value="">전체</option>';
                            for(let arr_item of account_type) {
                                html += '<option value="' + arr_item.cd + '">' + arr_item.cd_nm + '</option>';
                            }
                            $("select[name='account_type']").html(html);

                            draw_grids();

                        }); //account_type
                    }); //fact_cd
                }); //supply_type
            }); //units
        }); //prt_nbr_grp_cd
    }); //sagub_type


    function draw_grids() {
        $('#grid01').w2grid({
            name: 'grid01',
            show: {
                toolbar: false,
                footer: false,
                toolbarSave: false,
            },
            columns: [
                {field: 'recid', caption: 'NO', size: '50px', sortable: false, resizable: true, render: 'number', frozen: true},
                { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center',
                    editable: { type: 'checkbox' }
                },
                {field: 'fact_cd', caption: '공장코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text'}},
                {field: 'fact_cd_nm', caption: '공장', size: '150px', sortable: true, resizable: true, frozen: true, editable: {type: 'select', items: [{id: '', text: ''}].concat(fact_cd)},
                    render: function (record, index, col_index) {
                        var html = '';
                        for (var p in fact_cd) {
                            if (fact_cd[p].id == this.getCellValue(index, col_index)) html = fact_cd[p].text;
                        }
                        return html;
                    }
                },
                {field: 'prt_nbr_cd', caption: '품번코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text'}},
                {field: 'prt_nbr_nm', caption: '품번', size: '150px', sortable: true, resizable: true, editable: {type: 'text'}},
                {field: 'spec', caption: '규격', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}},
                {field: 'prt_nbr_dsp_nm', caption: '모니터링 품번명', size: '150px', sortable: true, resizable: true, editable: {type: 'text', min: 0, max: 32756}},
                {field: 'prt_nbr_grp_cd', caption: '품번그룹 코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text'}},
                {field: 'prt_nbr_grp_cd_nm', caption: '품번그룹명', size: '150px', sortable: true, resizable: true, editable: {type: 'select', items: [{id: '', text: ''}].concat(prt_nbr_grp_cd)},
                    render: function (record, index, col_index) {
                        var html = '';
                        for (var p in prt_nbr_grp_cd) {
                            if (prt_nbr_grp_cd[p].id == this.getCellValue(index, col_index)) html = prt_nbr_grp_cd[p].text;
                        }
                        return html;
                    }
                },
                {field: 'base_unit', caption: '기준단위 코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text', min: 0, max: 32756}},
                {field: 'base_unit_nm', caption: '기준단위', size: '100px', sortable: true, resizable: true, editable: {type: 'select', items: [{id: '', text: ''}].concat(units)},
                    render: function (record, index, col_index) {
                        var html = '';
                        for (var p in units) {
                            if (units[p].id == this.getCellValue(index, col_index)) html = units[p].text;
                        }
                        return html;
                    }
                },
                {field: 'unit_length', caption: '길이', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}, style: 'text-align: right'},
                {field: 'unit_color', caption: '컬러', size: '100px', sortable: true, resizable: true, editable: {type: 'color'}},
                {field: 'unit_thick', caption: '두께', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}, style: 'text-align: right'},
                {field: 'unit_width', caption: '폭', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}, style: 'text-align: right'},
                {field: 'unit_weight', caption: '중량', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}, style: 'text-align: right'},
                {field: 'lot_mgt_yn', caption: 'LOT관리여부', size: '100px', sortable: true, resizable: true, editable: {type: 'checkbox'}},
                {field: 'lot_size', caption: 'LOT사이즈', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}, style: 'text-align: right'},
                {field: 'instd_prt_nbr', caption: '대체품번', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}},
                {field: 'account_type', caption: '계정유형코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text'}},
                {field: 'account_type_nm', caption: '계정유형', size: '100px', sortable: true, resizable: true, editable: {type: 'select', items: [{id: '', text: ''}].concat(account_type)},
                    render: function (record, index, col_index) {
                        var html = '';
                        for (var p in account_type) {
                            if (account_type[p].id == this.getCellValue(index, col_index)) html = account_type[p].text;
                        }
                        return html;
                    }
                },
                {field: 'supply_type', caption: '조달유형코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text'}},
                {field: 'supply_type_nm', caption: '조달유형', size: '100px', sortable: true, resizable: true, editable: {type: 'select', items: [{id: '', text: ''}].concat(supply_type)},
                    render: function (record, index, col_index) {
                        var html = '';
                        for (var p in supply_type) {
                            if (supply_type[p].id == this.getCellValue(index, col_index)) html = supply_type[p].text;
                        }
                        return html;
                    }
                },
                {field: 'sagub_type', caption: '사급유형코드', size: '100px', sortable: true, resizable: true, hidden: true, editable: {type: 'text'}},
                {field: 'sagub_type_nm', caption: '사급유형', size: '100px', sortable: true, resizable: true, editable: {type: 'select', items: [{id: '', text: ''}].concat(sagub_type)},
                    render: function (record, index, col_index) {
                        var html = '';
                        for (var p in sagub_type) {
                            if (sagub_type[p].id == this.getCellValue(index, col_index)) html = sagub_type[p].text;
                        }
                        return html;
                    }
                },
                {field: 'inspct_yn', caption: '검사여부', size: '100px', sortable: true, resizable: true, editable: {type: 'checkbox'}},
                {field: 'cycle_tm', caption: '사이클타임', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}, style: 'text-align: right'},
                {field: 'uph', caption: 'UPH', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}, style: 'text-align: right'},
                {field: 'unit_price', caption: '단가', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}, style: 'text-align: right'},
                {field: 'safe_stck', caption: '안전재고', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}, style: 'text-align: right'},
                {field: 'unit_reprice', caption: '재작업단가', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}, style: 'text-align: right'},
                {field: 'base_whs_cd', caption: '기준창고코드', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}},
                {field: 'base_loc_cd', caption: '기준위치코드', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}},
                {field: 'use_yn', caption: '사용여부', size: '100px', sortable: true, resizable: true, editable: {type: 'checkbox'}},
                {field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: {type: 'text'}},
                {field: 'inst_id', caption: '입력자 ID', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}},
                {field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center', editable: {type: 'date'}},
                {field: 'updt_id', caption: '수정자 ID', size: '100px', sortable: true, resizable: true, editable: {type: 'text'}},
                {field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align: center', editable: {type: 'date'}}
            ],

            toolbar: {
                items: [
                    {id: 'add', type: 'button', caption: 'Add Record', icon: 'w2ui-icon-plus'}
                ],
                // onClick: function (event) {
                //     if (event.target == 'add') {
                //         w2ui.grid.add({recid: w2ui.grid.records.length + 1});
                //     }
                // }
            },

        });
    }



    // 버튼 기능 정의
    // 조회 버튼
    $("#hBtnB0001").on("click", function(){
        on_click_search_btn();
    });

    function on_click_search_btn(){
        $.ajax({
            url: "/ajax/base/standard/get/part_nbr",
            type: "get",
            data:$("#search_frm").serialize(),
            dataType: "json",
            success: function(data){
                w2ui.grid01.records = data;
                w2ui.grid01.reload();
            }
        });
    }

    // 초기화 버튼
    $("#hBtnB0002").on("click", function(){ $("#search_frm")[0].reset(); w2ui.grid01.records = []; w2ui.grid01.reload();});
    // 추가 버튼
    $("#hBtnB0003").on("click", function(){
        let add_id = w2ui.grid01.records.length+1;
        w2ui.grid01.add({ recid: add_id});
        w2ui.grid01.records[add_id-1].cu = 'C';

        // 포커스 이동
        $("#grid_grid_rec_"+add_id).focus();
        let offset = $("#grid_grid_rec_" + add_id).position();
        w2ui.grid01.scrollIntoView(add_id);
    });
    // 삭제 버튼
    $("#hBtnB0004").on("click", function(){
        let changes = w2ui.grid01.getChanges();
        let del_arr = [];
        for (let item of changes){
            if (item.chk == true && item.cu === undefined){  // 삭제리스트로
                del_arr.push({
                    fact_cd : w2ui.grid01.records[item.recid - 1].fact_cd,
                    prt_nbr_cd : w2ui.grid01.records[item.recid - 1].prt_nbr_cd
                });
            }
        }
        $.ajax({
            url: "/ajax/base/standard/delete/part_nbr",
            type: "post",
            data: {
                param: del_arr,
                cnct_url: location.pathname,
                cnct_btn: "B0004",
            },
            dataType: "json",
            success: function (data) {
                if(data.result){
                    success_msg(data.msg);
                    on_click_search_btn();
                }else{
                    mes_alert(data);
                }
            }
        }); // end of ajax
    }); // 삭제버튼 끝
    // 저장 버튼
    $("#hBtnB0005").on("click", function(){
        let changes = w2ui.grid01.getChanges();
        console.log(changes, 'changes');
        let c_arr = [];
        let u_chg = [];
        let u_con = [];
        let chg_rec = {};
        for (let item of changes){

            // update valid check -> insert일 경우는 달라야 함
            // if (item.fact_cd_nm !== undefined){ mes_alert({msg:"공장코드명은 변경 하실 수 없습니다."}); return false; }
            // if (item.prt_nbr_cd !== undefined){ mes_alert({msg:"품번코드는 변경 하실 수 없습니다."}); return false; }

            // setting parameters
            if(item.chk === undefined || item.chk == false){
                chg_rec = w2ui.grid01.rec
                ords[item.recid - 1];
                if (chg_rec.cu === undefined){  // update
                    delete item.recid;
                    u_chg.push(item);
                    u_con.push({
                        fact_cd : chg_rec.fact_cd,
                        prt_nbr_cd : chg_rec.prt_nbr_cd,
                    });
                }else if(chg_rec.cu == 'C'){    // insert
                    c_arr.push(chg_rec);
                }
                console.log(chg_rec, 'chaged_rec');
            }
        }   // end of for

        $.ajax({
            url: "/ajax/base/standard/save/part_nbr",
            type: "post",
            data: {
                param : [u_chg, u_con, c_arr],
                cnct_url: location.pathname,
                cnct_btn: "B0004",
            },
            dataType: "json",
            success: function (data) {
                console.log(data, 'data');
            },
            error: function (a,b,c) {
                console.log(a, 'a');
                console.log(a.responseText, 'a');
                console.log(b, 'b');
                console.log(c, 'c');
            }
        })
    });
    // 엑셀 다운 버튼
    // $("#hBtnB0006").on("click", function(){
    //     let id = $("#selected_grid").val();
    //     console.log(id);
    //     make_tbl(id);
    //     // fnExcelReport('grid_grid01_records > table', w2ui.grid01.columns, 'excel_download');
    // });
    // 엑셀 업로드 버튼
    $("#hBtnB0009").on("click", function(){

    });


    $('.grids').on('click', function(){
        $(this).parents('.contWrap').addClass('gridSelect');
    });


});



function open_pop_prt_nbr_cd() {
    let selected_fact_cd = $("#search_frm select[name='fact_cd']").val();
    let selected_fact_nm = $("#search_frm select[name='fact_cd'] option:checked").text();
    pop_prt_nbr_cd.pop_open(selected_fact_cd, selected_fact_nm);
    // pop_part_nbr(selected_fact_cd, selected_fact_nm, account_type);
}

function on_click_pop_prt_nbr_cd(clicked_record) {
    console.log(clicked_record, 'clicked_record');
    $("#search_frm input[name='prt_nbr_cd']").val(clicked_record.prt_nbr_cd);
    $("#search_frm input[name='prt_nbr_nm']").val(clicked_record.prt_nbr_nm);
    $("#search_frm select[name='account_type']").val(clicked_record.account_type);
}
