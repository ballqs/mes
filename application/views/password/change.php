<script type="text/javascript">
    $(function(){
        $('#alert-success').hide();
        $('#alert-danger').hide();
        $("input").keyup(function(){
            var newPw = $('#newPw').val();
            var rePw = $('#rePw').val();
            if(newPw != "" || rePw != ""){
                if(newPw == rePw) {
                    $("#alert-success").show();
                    $("#alert-danger").hide();
                }else{
                    $("#alert-success").hide();
                    $("#alert-danger").show();
                }
            }
        });
    });
</script>
<style media="screen">
    .Wrap {text-align: center;}
    .pwWrap {display: inline-block; vertical-align: middle; background: #F8F8F9; border: 1px solid #e0dbdb; box-shadow: 1px 1px 10px #f1f1f1, -1px -1px 10px #f1f1f1; padding: 50px 0; text-align: center; width: 500px; margin-top: 200px;}
    .formLine {display: block; padding: 5px; width: 345px; margin: auto; text-align: right;}
    .formLine input {margin-left: 10px; padding: 4px 8px; width: 220px;}
    .formLine label {font-size: 16px;}
    .Title {font-size: 24px; font-weight: 500; margin-bottom: 30px;}
    .bt {display: inline-block; padding: 5px 15px; border: 1px solid #aaa; font-size: 16px; margin: 30px 3px 0 3px; }
    .bt.ok {background: #ff9000; color: #fff; border: 1px solid #ff9000;}
    .bt.close {background: #333; color: #fff; border: 1px solid #333;}
    i.fas {font-size: 14px;}
    .danger, .danger i {color: #e00909;}
    .success, .success i {color: #044df8;}
    .danger, .success {margin-top: 5px;}
    hr {width: 340px; margin: auto; margin: 20px auto; border: none; height: 1px; background: #dbdbdb;}
    .footBar {text-align: left;}
</style>
<?php
if(isset($data['result'])){
    if(!$data['result']){
?>
<script>
    common.mes_alert(<?php echo json_encode($data);?>);
</script>
<?php
    }
}
?>
<form method="post" name="pw_chg_frm">
    <div class="pwWrap">
        <h1 class="Title">비밀번호변경</h1>
        <div class="formLine">
            <label for="nowPw">현재 비밀번호</label><input type="password" name="pwd" id="nowPw">
        </div>
        <hr>
        <div class="formLine">
            <label for="newPw">새로운 비밀번호</label><input type="password" name="new_pwd" id="newPw">
        </div>
        <div class="formLine">
            <label for="rePw">비밀번호 재확인</label><input type="password" name="re_pwd" id="rePw">
            <p class="danger" id="alert-danger" ><i class="fas fa-exclamation-circle mr_5"></i>비밀번호가 일치하지않습니다.</p>
            <p class="success" id="alert-success"><i class="fas fa-check-circle mr_5"></i>비밀번호가 일치합니다.</p>
        </div>
        <a class="bt close">닫기</a>
        <a class="bt cancel">초기화</a>
        <a class="bt ok">변경하기</a>
    </div>
</form>

<script type="text/javascript" src="/include/js/password/change.js"></script>
