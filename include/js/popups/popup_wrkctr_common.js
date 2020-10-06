class wrkctr_common{
    static click_main_selected_row(){
        $(`#wrkctrlist_tbl > tbody > tr`).each(function(){
            if($(this).hasClass("Ton")){
                $(this).click();
            }
        });
    }

    static set_action_btn(){
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
                // console.log('set_action_btn', res);
                action_btn = res.btninfo[res.btninfo.length -1][0].out_btn;

            },
            error: function (a, b, c) {
                console.log(a.responseText);
            }
        });
    }
}
function click_main_selected_row(){
    $(`#wrkctrlist_tbl > tbody > tr`).each(function(){
        if($(this).hasClass("Ton")){
            $(this).click();
        }
    });
}

