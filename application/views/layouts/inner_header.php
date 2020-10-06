<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php if (isset($delete_browser_cache) && $delete_browser_cache) { ?>
        <meta http-equiv="Pragma" content="no-cache">
    <?php }?>
    <?php if ($_SERVER["REMOTE_ADDR"] == '121.65.243.200' || true) { ?>
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
    <script type="text/javascript" src="/include/js/innerRefresh.js"></script>

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
    });
</script>

<div class="loadingW" style="display:none;">
    <div class="container">
        <div class="box">
            <div class="loader4"></div>
            <div class="loader4"></div>
            <div class="loader4"></div>
            <h1 class="loadText">LOADING </h1>
        </div>
    </div>
</div>

<div class="mainWrap tabletWrap cf">

    <div class="Wrap">
        <?php if($menu_title != '' && $menu_sub_title != ''){ ?>
            <form id="hbtn_frm">
                <div class="btWrap cf">
                    <ul class="btn cf">
                        <?php foreach ($header_btns as $key => $value) { ?>
                            <li id="hBtn<?php echo $value->btn_id; ?>" name="hBtn<?php echo $value->btn_id; ?>"><a><img src="/uploads/img/buttons/<?php echo $value->btn_img; ?>"><?php echo $value->btn_nm; ?></a></li>
                        <?php }?>
                    </ul>
                </div>
            </form>

        <?php
        foreach ($header_btns as $key => $value) {
        if (in_array("B0009", (array)$value)) {
        ?>
            <form id="excel_upload_frm" enctype="multipart/form-data" method="post" style="display: none;">
                <input type="file" name="up_file" value="">
            </form>
            <script>

            </script>
            <!--                <form id="excel_upload_frm" enctype="multipart/form-data" action="./excel_read.php" method="post"></form>-->
        <?php
        }
        }
        ?>
<!--
            <div class="Title">
                <h3><?php echo isset($menu_title) ? $menu_title : '' ; ?><span>/ <?php echo isset($menu_sub_title) ? $menu_sub_title : ''; ?></span></h3>
            </div> -->
        <?php } ?>
