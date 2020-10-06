import PageManager from "/include/js/class/PageManager.js";
import SingleGridPageManager from "/include/js/class/SingleGridPageManager.js";

// var month = (new Date()).getMonth() + 1;
// var year  = (new Date()).getFullYear();

$('input[type=us-date]').w2field('date');

$(function () {
    initGrid();

    //기본 버튼 펑션 등록...
    let pageManager = new SingleGridPageManager("id", "grid01", "id", "search_frm", "chk", ["fact_cd", "ymd"], ["day_week", "base_ym", "base_ym"]);

    // //버튼에 대한 url 등록
    pageManager.SetAjaxUrl(PageManager.Buttons.Search, "/ajax/base/standard/get/prd_calnr_mgt");
    // pageManager.SetAjaxUrl(PageManager.Buttons.DeleteRow, "/ajax/base/standard/delete/prd_calnr_mgt");
    pageManager.SetAjaxUrl(PageManager.Buttons.Save, "/ajax/base/standard/save/prd_calnr_mgt");
    // 디비 인터페이스 없는 것들은 url 등록할 필요 없다.
    // pageManager.SetAjaxUrl(PageManager.evtButtons.AddRow, "");
    // pageManager.SetAjaxUrl(PageManager.evtButtons.Initialize, "");

    //폼에 있는 콤보박스 정보 등록
    pageManager.SetFormSelectBox("name", "fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    //default_value 가 없으면 콤보박스 기본값을 안 만든다.
    // pageManager.SetFormSelectBox("name", "trans_unit", common.code, {up_cd: "unit_cd"}, "cd", "cd_nm", "", "ALL");
    //폼 콤보박스 전체 데이터 불러오기..
    pageManager.InitFormSelectBox();

    //콤보박스 다시 채워줄때 호출...부모 콤보박스가 변경될때 하위 콤보박스 데이터 변경이 생기면 사용
    //pageManager.FillFormSelectBox("name","fact_cd", {up_cd: "fact_cd"}, 1);

    //그리드 콤보박스 정보 등록
    pageManager.SetGridSelectBox("week_ordr", common.code, {up_cd: "week_ordr"}, "cd", "cd_nm");
    pageManager.SetGridSelectBox("fact_cd", common.code, {up_cd: "fact_cd"}, "cd", "cd_nm");
    pageManager.SetGridSelectBox("day_week", common.code, {up_cd: "day_week"}, "cd", "cd_nm");
    //그리드 콤보박스 초기화
    pageManager.InitGridSelectBox();

    //그리드 체크박스 정보 등록
    pageManager.SetGridCheckRenderOption("holiday_yn", "Y", "N");

    //그리드 체크박스 초기화
    pageManager.InitGirdCheckBox();

    $("#hBtnB0010").on("click", function () {
        let base_ym = $("#search_frm input[name='base_ym']").val();

        // 기준연월 유무 체크
        if(base_ym == '') { common.mes_alert({msg : "기준연월을 입력해주세요"});return false; }

        // 일괄 생성시 모두 삭제 후 생성된다는 메세지를 띄워 동의 후 실행
        // let confrm = confirm("일괄 생성 실행시 모두 삭제 후 새로 생성됩니다. 진행하시겠습니까?");
        let popup_options = {
            msg          : '일괄 생성 실행시 모두 삭제 후 새로 생성됩니다.<br> 진행하시겠습니까?',
            title        : '확인',
            width        : 450,     // width of the dialog
            height       : 210,     // height of the dialog
            btn_yes      : {
                text     : '확인',   // text for yes button (or yes_text)
                class    : 'w2confirmBtn',      // class for yes button (or yes_class)
                style    : '',      // style for yes button (or yes_style)
                callBack :      // callBack for yes button (or yes_callBack)
                    function (answer) {
                        // 테이블 비우고 프로시저 실행
                        $.ajax({
                            url: "/ajax/base/standard/save/prd_calnr_batch",
                            data: {
                                param: {
                                    fact_cd: $("#search_frm select[name='fact_cd']").val(),
                                    base_ym: $("#search_frm input[name='base_ym']").val() + "-01",
                                },
                                cnct_btn: "B0010",
                                cnct_url: location.pathname
                            },
                            // data: param,
                            type: "post",
                            dataType: "json",
                            success: function (data) {
                                console.log(data, 'after');
                                common.success_msg(data.msg);
                                w2ui.grid01.clear()
                            },
                            error: function (a,b,c) {
                                console.log(a.responseText, 'a');
                            }
                        });
                    }
            },
            btn_no       : {
                text     : '취소',    // text for no button (or no_text)
                class    : 'w2confirmBtn',      // class for no button (or no_class)
                style    : '',      // style for no button (or no_style)
                callBack : null     // callBack for no button (or no_callBack)
            },
            callBack     : null     // common callBack
        }

        w2confirm(popup_options);
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 기준연월 표기하기 시작
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $("#search_frm .Search > input[type='text']").on("click", function(obj){
        $("#base_ym").click();
    });

    $("#base_ym").val(common.get_date());
    $("input[name='base_ym']").val(date_to_ym(common.get_date()));

    $("#base_ym").on("change", function(obj){
        let dt = $(this).val();
        $(this).val(dt);
        $("input[name='base_ym']").val(date_to_ym(dt));
    });

    /**
     * 입력받은 yyyymmdd 을 yyyymm 으로 변경
     * @param dt
     * @returns {string}
     */
    function date_to_ym(dt){
        let tmp = dt.split('-');
        tmp.splice(2, 1);
        dt = tmp.join('-');
        return dt;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 기준연월 표기하기 끝
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});

function initGrid()
{
        $('#grid01').w2grid({
            name: 'grid01',
            columns: [
                { field: 'recid', caption: 'NO', size: '50px', sortable: true, resizable: true},
                // { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center', editable: { type: 'checkbox' }},
                { field: 'fact_cd', caption: '공장', size: '150px', sortable: true, resizable: true, editable: { type: 'select'}},
                { field: 'ymd', caption: '생산일자', size: '150px', sortable: true, resizable: true, style: 'text-align: center', editable: { type: 'date' }},
                { field: 'day_week_cd', caption: '요일코드', size: '100px', sortable: true, resizable: true, hidden: true },
                { field: 'day_week', caption: '요일', size: '100px', sortable: true, resizable: true, style: 'text-align:center;', editable: { type: 'text', maxLength: 20  }},
                { field: 'holiday_yn', caption: '휴일여부', size: '100px', sortable: true, resizable: true, editable: { type: 'checkbox'}},
                { field: 'base_ym', caption: '기준년월', size: '100px', sortable: true, resizable: true, style: 'text-align:center', editable: { type: 'text', maxLength: 7}},
                { field: 'week_ordr', caption: '생산주차', size: '100px', sortable: true, resizable: true, style: 'text-align:center;', editable: { type: 'select'}},
                { field: 'remark', caption: '비고', size: '300px', sortable: true, resizable: true, editable: { type: 'text', maxLength: 1000}},
                { field: 'inst_id', caption: '입력자 ID', size: '100px', sortable: true, resizable: true},
                { field: 'inst_dt', caption: '입력일시', size: '150px', sortable: true, resizable: true, style: 'text-align:center'},
                { field: 'updt_id', caption: '수정자 ID', size: '100px', sortable: true, resizable: true},
                { field: 'updt_dt', caption: '수정일시', size: '150px', sortable: true, resizable: true, style: 'text-align:center'}
            ],
        });
}
