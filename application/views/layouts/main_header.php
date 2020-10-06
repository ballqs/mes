

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php if (isset($delete_browser_cache) && $delete_browser_cache) { ?>
        <meta http-equiv="Pragma" content="no-cache">
    <?php }?>
    <?php if ($_SERVER["REMOTE_ADDR"] == '121.65.243.200') { ?>
        <meta http-Equiv="Cache-Control" Content="no-cache" />
        <meta http-Equiv="Pragma" Content="no-cache" />
        <meta http-Equiv="Expires" Content="0" />
    <?php }?>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
    <script type="text/javascript" src="/include/w2ui/w2ui-1.5.rc1.js"></script>
    <link rel="stylesheet" type="text/css" href="/include/w2ui//w2ui-1.5.rc1.css" />
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" media="all"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">

    <link rel="stylesheet" href="/include/css/common.css">
    <link rel="stylesheet" href="/include/css/sub.css">

    <script type="text/javascript" src="/include/js/common.js"></script>
    <script type="text/javascript" src="/include/js/navTree.js"></script>
    <script type="text/javascript" src="/include/js/class/PopupManager.js"></script>
    <script type="text/javascript" src="/include/js/mainRefresh.js"></script>

    <title>MES/<?php echo isset($menu_title) ? $menu_title : '' ; ?></title>
</head>
<body>
<script type="text/javascript">
    $(function(){
        //자동완성 해제
        $('input').attr( 'autocomplete', 'off' );
        <?php if (isset($msg)) { // 성공 메세지가 있을 경우에만 footer에 메세지를 뿌려준다. ?>
        success_msg("<?php echo $msg; ?>");
        <?php } ?>

        common.code({up_cd: "cmpny_cd"}).then((res) => {
            $(".companyName > p").text(res.data[0].cd_nm);
        });
    });
</script>


<div class="mainWrapA cf">
    <div class="header">
        <div class="Hlogo">
            <div class="companyName"><p></p></div>
        </div>
        <ul class="Hnav" id="side_menu"></ul>
    </div>
    <div class="mainBar cf">
        <div class="userMenu">
            <a href="#" id="ham_btn"><i class="fa fa-bars" aria-hidden="true"></i></a>
            <div class="user">
                <span></span>
                <i class="fa fa-cog" aria-hidden="true"></i>
                <div class="userPop">
                    <ul>
                        <li><a onclick='navTree.open_tab("비밀번호변경", "password/change")'><i class="fa fa-unlock-alt" aria-hidden="true"></i>비밀번호 변경</a></li>
                        <li><a href="<?php echo base_url('login/logout'); ?>"><i class="fa fa-sign-out-alt" aria-hidden="true"></i>로그아웃</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <ul id="tab1" ></ul>
    </div>
