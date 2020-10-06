$(".cancel").on("click", function(){
    document.pw_chg_frm.pwd.value="";
    document.pw_chg_frm.new_pwd.value="";
    document.pw_chg_frm.re_pwd.value="";
});

$(".ok").on("click", function(){
    if (document.pw_chg_frm.pwd.value.trim() == "") {
        mes_alert({msg:"비밀번호를 입력하세요."});
        return false;
    }
    if (document.pw_chg_frm.new_pwd.value.trim() == "") {
        mes_alert({msg:"새로운 비밀번호를 입력하세요."});
        return false;
    }
    if (document.pw_chg_frm.re_pwd.value.trim() == "") {
        mes_alert({msg:"비밀번호 재확인 란을 입력하세요."});
        return false;
    }
    if (document.pw_chg_frm.new_pwd.value == document.pw_chg_frm.re_pwd.value){
        document.pw_chg_frm.submit();
    }else{
        mes_alert({msg:"새로운 비밀번호와 비밀번호 재확인이 일치하지 않습니다."});
    }
});