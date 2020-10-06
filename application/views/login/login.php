<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" media="all"/>
  <link rel="stylesheet" href="/include/css/common.css">
  <script type="text/javascript" src="/include/js/alert.js"></script>
  <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
  <style>
    .loginWrap {position: relative; width: 100%; height: 100vh; background-image: url('/uploads/img/common/loginBg.jpg'); background-position: center; background-size: cover;}
    .loginBg {width: 100%; height: 100vh; background: rgba(50,60,80,0.9);}
    .loginForm {position: absolute; width: 445px; top: 50%; left: 50%; transform: translate(-50%, -50%); }
    .logoW {background: #202633; padding: 20px 0;}
    .logoW p{color: #fff; font-size: 25px; letter-spacing: 1px;}
    .loginInput {background: #293142; padding: 16px 50px;}
    .loginInput i {color:#aaafb8; font-size: 20px; vertical-align: middle;margin-right: 40px;}
    .loginInput input {background: none; border: 0; font-size: 14px; color: #fff; width: 80%;}
    .loginInput input::placeholder {color:#aaafb8; font-size: 14px;}
    .loginInput .loginId {background: }
    .loginBt {width:100%; display: block; text-align: center;}
    .loginBt.orange {background: #ff9000; padding: 20px 0; color: #fff; letter-spacing: 2px; font-size: 17px; font-weight: 300;}
    .loginBt.gray {background: #4e5b71; padding: 12px 0; color: #aaafb8; letter-spacing: 2px; font-size: 15px; font-weight: 300;}

    .screen label.gray{display: block; float:left; cursor:pointer; background-color:#4e5b71; color:#aaafb8; text-align:center; width:calc(100% / 3); padding:12px 0; font-size:15px; border-right:1px solid rgba(0,0,0,0.2);}
    .screen label:last-of-type{border-right:0;}
    /* .shadow {box-shadow: 0px 0px 7px 3px rgba(0,0,0,0.2) inset;} */
    .shadow {box-shadow: inset 0px 20px 20px -20px rgba(0,0,0,0.2);}
    .dbDetail {width: 100%; height: 192px; overflow-y: scroll; background: #63738e; padding: 10px 22px;}
    .dbDetail ul li label.on{background-color:#293142;}
    .dbDetail ul li label {width: 100%; display: block; padding: 6px 0; border-radius: 7px; background: #7587a6;color:#cad0db; font-size: 14px; margin-bottom: 2px; letter-spacing: 1px; cursor:pointer;}
    .dbDetail ul li input {display: none;}
    .dbDetail ul li:last-child a {margin-bottom: 0;}

    .supplyCompanyW {text-align: center; display: inline-block; width: 100%; display: none;}
    .supplyCompanyW h1 {padding: 100px 0 10px;}
    .supplyCompanyW ul li {color: #fff; font-weight: 200; font-size: 12px; letter-spacing: 0;}
    .supplyCompanyW ul li:first-of-type {margin-bottom: 10px;}

    ::-webkit-scrollbar {width: 12px;}
    ::-webkit-scrollbar-track {background: #63738e;}
    ::-webkit-scrollbar-thumb {background: #f6f6f6; border-radius: 5px; background-clip: padding-box; border: 4px solid transparent;}

    @media (max-width: 480px) {
        .loginForm{width:100%;}
        .loginInput{padding:20px 40px;}
        .loginInput i {margin-right: 20px;}
    }

    input[name='device'] { display:none; }

  </style>
  <title>MES</title>
</head>
<body>

<script type="text/javascript">

$(function(){

    if(parent.document.getElementById("side_menu") !== null){
        parent.document.location.reload();
    }


	$("input[name=loginId]").focus();
	$("#loginBtn").on("click", function(){ $("form").submit(); } );


	$("input[name=loginId], input[name=loginPw]").keydown(function(key) {
		if (key.keyCode == 13) {
			$("form").submit();
		}
	});

	$(".dbLabel").on("click", function(){
		$(".dbLabel").removeClass("on");
		$(this).addClass("on");
	});

	function alert(msg){
		console.log(msg);
	}

    $(".screen label.gray").click(function(){
        $(".screen label.gray").css("background-color","#4e5b71");
        $(this).css("background-color","#39465b");
    });

});
</script>

<?php if(!empty($error_msg)){?>
<script type="text/javascript">
	alert("<?php echo $error_msg; ?>");
</script>
<?php } ?>
<style>


</style>
<form action="./login" method="post">
    <div class="loginWrap">
        <div class="loginBg">
            <div class="loginForm">
                <div class="logoW text_c">
                    <p>MES</p>
                </div>
                <div class="loginInput">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <input type="text" class="loginId" name="loginId" value="<?php echo set_value('loginId'); ?>" placeholder="ID" autocomplete="off">
                </div>
                <div class="loginInput shadow">
                    <i class="fa fa-lock" aria-hidden="true"></i>
                <?php echo form_error('password'); ?>
                    <input type="password" class="loginPw" name="loginPw" value="" placeholder="PASSWORD" autocomplete="off">
                </div>
                <a class="loginBt orange" id="loginBtn">LOGIN</a>
                <div class="screen shadow cf">
                    <label for="device_pc" class="gray" style="background-color: rgb(57, 70, 91);">PC</label><input type="radio" name="device" id="device_pc" value="pc" checked>
                    <label for="device_tablet" class="gray">태블릿</label><input type="radio" name="device" id="device_tablet" value="tablet">
                    <label for="device_phone" class="gray">핸드폰</label><input type="radio" name="device" id="device_phone" value="phone">
                    <!--              <label for="device_das" class="gray">DAS</label><input type="radio" name="device" id="device_das" value="das">-->
                </div>

                <a class="loginBt gray shadow" id="tgl_db">DB연결</a>

            	<div class="dbDetail" style="display:none;">
            		<ul class="text_c">
                        <?php if($_SERVER["REMOTE_ADDR"] == "121.65.243.200" || $_SERVER["REMOTE_ADDR"] == "192.168.0.1" || $_SERVER["REMOTE_ADDR"] == "::1"){ ?>
            			<li><label class="dbLabel on" for="db01">localhost [ mes (root/***) ]</label><input type="radio" id="db01" name="dbname" value="default" checked></li>
            			<li><label class="dbLabel" for="db02">localhost [ mes_test (root/***) ]</label><input type="radio" id="db02" name="dbname" value="test"></li>
                        <li><label class="dbLabel" for="db03">localhost [ winplus (root/***) ]</label><input type="radio" id="db03" name="dbname" value="winplus"></li>
                        <li><label class="dbLabel" for="db04">localhost [ dw (root/***) ]</label><input type="radio" id="db04" name="dbname" value="dw"></li>
                        <li><label class="dbLabel" for="db05">localhost [ hs (root/***) ]</label><input type="radio" id="db05" name="dbname" value="hs"></li>
                        <li><label class="dbLabel" for="db06">localhost [ wmk (root/***) ]</label><input type="radio" id="db06" name="dbname" value="wmk"></li>
                            <li><label class="dbLabel" for="db07">localhost [ winplus_t (root/***) ]</label><input type="radio" id="db07" name="dbname" value="winplus_t"></li>
                        <?php }else{ ?>
            <!--                            <li><label class="dbLabel on" for="db03">localhost [ winplus ]</label><input type="radio" id="db03" name="dbname" value="winplus" checked></li>-->
                        <?php } ?>
            		</ul>
            	</div>
                <div class="supplyCompanyW">
                    <h1><img src="/uploads/img/common/loginLogo2.png" alt=""></h1>
                    <ul>
                        <li>A. 경남 창원시 의창구 창원대로 18번길 22, <br> 벤처동 2층 207호 (팔용동, 경남테크노파크)</li>
                        <li>T. 055-714-8133 &nbsp; | &nbsp; F. 070-4324-8133</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</form>
<script type="text/javascript">
  $("#tgl_db").on("click", function(){
		$(".dbDetail").toggle();
	});
</script>
</body>
</html>
