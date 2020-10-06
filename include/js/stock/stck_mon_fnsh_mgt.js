import {Const, FormHelper, ScriptHelper, GridManager, FormManager, W2UiHelper} from "/include/js/class/PageManager.js";

$(function () {
    $.ajax({
        type: 'POST',
        data: null,
        url: '/ajax/stock/stck_mon_fnsh/get/stck_mon_fnsh_mgt',
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            $("#search_frm [name='fact_cd']").append("<option value="+data[0]['cd']+">"+data[0]['cd_nm']+"</option>");
            //console.log(data[1]['cd_set1']);
            // let date = data[1]['cd_set1'];
            // let str1 = date.substr(0,5);
            // let str2 = date.substr(5,2);
            // str2 = (Number(str2) + 1) >= 10 ? (Number(str2) + 1) : '0' + (Number(str2) + 1);
            // date = str1+str2;
            // $("#search_frm [name='stockdeadline']").val(date);
            date_cal(data);
        },
        error: function (request,status,error) {
            console.log(request);
            console.log(status);
            console.log(error);
        }
    });

    $("#hbtn_frm [name='hBtnB0020']").on("click", function(){
        $(".loadingW").css("display", "");
        console.log("마감버튼");
        let fact_cd = 'winp01';
        let stockdeadline = $("#search_frm [name='stockdeadline']").val();
        console.log(stockdeadline);
        let param = {
                param: {
                    fact_cd : fact_cd,
                    stockdeadline : stockdeadline
                },
                cnct_btn: "B0020",
                cnct_url: location.pathname,
        };
        let rest_url = '/ajax/stock/stck_mon_fnsh/get/B0020';

        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, param)
            .then((b20)=>{
                console.log(b20);
                let msg = b20.msg;
                let result = b20.result;
                if(result){
                    common.success_msg(msg);
                }else{
                    mes_alert({msg : msg},{msg : ""});
                }
                let url = '/ajax/stock/stck_mon_fnsh/get/stck_mon_fnsh_mgt';
                ScriptHelper.AjaxCall(url, Const.AjaxMethod.POST, null)
                    .then((b20_rs)=>{
                        console.log("b20_rs : "+b20_rs);
                        date_cal(b20_rs);
                        $(".loadingW").css("display", "none");
                    })
                    .fail(ScriptHelper.OnAjaxFail);
            })
            .fail(ScriptHelper.OnAjaxFail);

    });

    $("#hbtn_frm [name='hBtnB0021']").on("click", function(){
        $(".loadingW").css("display", "");
        console.log("마감취소버튼");
        let fact_cd = 'winp01';
        let param = {
            param: {
                fact_cd : fact_cd
            },
            cnct_btn: "B0021",
            cnct_url: location.pathname,
        };
        let rest_url = '/ajax/stock/stck_mon_fnsh/get/B0021';

        ScriptHelper.AjaxCall(rest_url, Const.AjaxMethod.POST, param)
            .then((b21)=>{
                console.log(b21);
                let msg = b21.msg;
                let result = b21.result;
                if(result){
                    common.success_msg(msg);
                }else{
                    mes_alert({msg : msg},{msg : ""});
                }
                let url = '/ajax/stock/stck_mon_fnsh/get/stck_mon_fnsh_mgt';
                ScriptHelper.AjaxCall(url, Const.AjaxMethod.POST, null)
                    .then((b21_rs)=>{
                        console.log("b21_rs : "+b21_rs);
                        date_cal(b21_rs);
                        $(".loadingW").css("display", "none");
                    })
                    .fail(ScriptHelper.OnAjaxFail);
            })
            .fail(ScriptHelper.OnAjaxFail);
    });

    // {
    //     param: {}
    //     cnct_btn: "B0021",
    //         cnct_url: location.pathname
    // }
});

function date_cal(param) {
    let date = param[1]['cd_set1'];
    let str1 = date.substr(0,4);
    let str2 = date.substr(5,2);
    str2 = (Number(str2) + 1);
    if(str2 === 13){
        str2 = 1;
        str1 = (Number(str1) + 1);
    }
    str2 = str2 >= 10 ? str2 : '0' + str2;
    date = str1+'-'+str2;
    $("#search_frm [name='stockdeadline']").val(date);
}