var menu_list = [];
$(function(){
    common.code({up_cd:"service_area"}).then((res)=>{
        common.draw_select('pgm_info_form', "service_area", res.data, 'cd', 'cd_nm');
    });
    $("#hBtnB0002, #hBtnB0003").on("click", function(){
        // $.ajax({
            // url:'/ajax/get/up_pgm_id_list/',
            // type:'get',
            // dataType:'json',
            // success:function(data){
                // var pgm_info = new Object();
                // pgm_info.pgm_id = "";
                // pgm_info.pgm_nm = "";
                // pgm_info.pgm_ordr = "";
                // pgm_info.pgm_img = "";
                // pgm_info.remark = "";
                // pgm_info.pgm_gbm = "";
                // pgm_info.url = "";
                // pgm_info.prc_gbm = "";
                // pgm_info.up_pgm_id = "";
                // pgm_info.use_yn = "";
                // pgm_info.url = "";
                // pgm_info.pgm_id_list = data;
                // menu_detail(pgm_info);
            // }
        // });
		$("#pgm_info_form")[0].reset();
    });

    $("#hBtnB0005").on("click", function(){
        let valid = new Object();
        valid.msg = "";
        if($("input[name='up_pgm_id']").val().trim() == "") valid.msg = "상위 메뉴 아이디를 입력해주세요";
        if($("select[name='pgm_gbm']").val().trim() == "") valid.msg = "구분을 입력해주세요";
        if($("input[name='pgm_nm']").val().trim() == "") valid.msg = "메뉴 이름을 입력해주세요";
        if($("input[name='pgm_id']").val().trim() == "") valid.msg = "메뉴 아이디를 입력해주세요";

        if (valid.msg != "") { mes_alert(valid); return false; }

        $.ajax({
            url:'/ajax/save/pgm_info/',
            type:'post',
            data: $("#pgm_info_form").serialize(),
            dataType:'json',
            success:function(data){
                if(!data.result){
                    alert("저장되지 않았습니다.");
                }else{
                    let d = new Date();
                    $(".footBar > p").text("저장되었습니다.("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
                    draw_menu_tree();
                    navTree.draw_menu();
                }
            },
            error: function (a,b,c){
                console.log(a, 'a');
                console.log(b, 'b');
                console.log(c, 'c');
            }
        });
    });

    $("#hBtnB0034").on("click", function(){
        window.open("about:blank").location.href = "/uploads/img/guide/mnu_pgm_mgt.pdf";
    });

    draw_menu_tree();

    function draw_menu_tree(){
        $.ajax({
            url: "/ajax/get/menu_list/",
            type: "get",
            data: { test : "test" },
            dataType: "json",
            success: function(data){
                menu_list = data;
                navTree.draw_tree(data, 'up_pgm_id', 'pgm_id', 'pgm_nm',"tree_menu"
                    , "subList mt_5", "onclick='menu_select(this)' ondblclick='navTree.menu_tgl(this)'", "onclick='span_text(this);'")
                // navTree.d_menu(data, "#tree_menu", "subList mt_5");
            },
        }); // end of ajax
    }


});


function menu_select(obj){
    // let id = obj.id.split('_')[0];
    let id = obj.id;
    for (let i=0; i<menu_list.length; i++) {
        if (menu_list[i].pgm_id == id){
            $("input[name=up_pgm_id]").val(menu_list[i].up_pgm_id);
            $("input[name=pgm_id]").val(menu_list[i].pgm_id);
            $("input[name=pgm_nm]").val(menu_list[i].pgm_nm);
            $("select[name=pgm_gbm]").val(menu_list[i].pgm_gbm).prop("selected", true);
            $("input[name=pgm_ordr]").val(menu_list[i].pgm_ordr);
            $("input[name=remark]").val(menu_list[i].remark);
            $("input[name=url]").val(menu_list[i].url);
            $("select[name=prc_gbm]").val(menu_list[i].prc_gbm).prop("selected", true);
            $("select[name=up_pgm_id]").val(menu_list[i].up_pgm_id).prop("selected", true);
            $("select[name=service_area]").val(menu_list[i].service_area).prop("selected", true);
            $("input[name=use_yn]").prop("checked", menu_list[i].use_yn == 'Y' ? true : false);
        }
    }
}

function span_text(obj){
    let key_txt = $(obj).text();
    $("#pgm_info_form input[name='up_pgm_id']").val(key_txt);
}
