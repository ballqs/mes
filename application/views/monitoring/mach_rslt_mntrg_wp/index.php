<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
<link rel="stylesheet" href="/include/css/common.css">
<link rel="stylesheet" href="/include/css/sub.css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" media="all"/>
<style media="screen">
    * {font-size: 13px; letter-spacing: 0;}
    .select {margin-right: 10px;}
    .mtrWrap {width: 100%; height: calc(100vh - 105px); position: relative; overflow: hidden;background: #323c50; letter-spacing: 0;}
    .mtrWrap table.status {width: 100%; height: 100%; text-align: center; border-spacing: 0; border-collapse: collapse;}
    .mtrWrap table.status th, .mtrWrap table.status td {color: #fff;}
    .mtrWrap table.status tr {}
    .mtrWrap table.status thead {}
    .mtrWrap table.status thead th {padding: 20px 0; border-right: 2px solid #323c50; background: #505968; font-size: 4.3em;}
    .mtrWrap table.status thead th:last-of-type {border-right: 0;}
    .mtrWrap table.status tbody {}
    .mtrWrap table.status tbody td {border-right: 1px solid #505968; border-bottom: 1px solid #505968; background: #323c50; font-size: 4em;}
    .mtrWrap table.status tbody td:last-of-type {border-right: 0;}
    .mtrWrap table.status tbody .total td {background: #1c212a; color: #fff;}
    .viewHead{padding:10px 10px; width:100%;}
    #timer, #factName {border-radius:5px; border:1px solid #444; font-size:1.3em; padding: 5 15px;}
    #btn_timer, #btn_logout {border-radius: 5px; font-size: 1.3em; cursor: pointer; padding: 5px 15px; display: inline-block; vertical-align: middle;}
    #btn_timer{background-color:#ff9000; color:#fff; border:1px solid #ff9000;}
    #btn_logout {background: #fff; color: #333; border: 1px solid #333; margin-left: 10px;}
    .select i{top: 10px; right: 10px; font-size:1.3em;}
    .time {display: flex; font-size: 2em; margin-left: auto; font-weight: bold;}
    .right_align {display:block; text-align: right; width: 100%;}
    .space_between_align {display: flex; margin-top: 10px;}
    .bizName {font-size: 2em; margin-right: 10px; display: inline-block; vertical-align: middle;}
    span.enter {content:""; display: block;}

    @media (max-width: 1024px){
        * {font-size: 9px;}
        #timer, #factName, #btn_timer, #btn_logout {font-size: 1.8em;}
        .time, .bizName {font-size: 3em;}
        .select i {top: 12px; font-size: 1.5em;}
    }
    @media (max-width: 749px){
        * {font-size: 8px;}
        #timer, #factName {width: 120px;}
        .space_between_align {display: block;}
        .time, .bizName { font-size: 2em;}
        .mtrWrap table.status thead th, .mtrWrap table.status tbody td {font-size: 2.3em;}
    }

</style>
<div id="loc_timer">
    <div class="viewHead cf">
        <div class="right_align">
            <div class="select">
                <select id="timer">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                </select>
                <i class="fa fa-caret-down"></i>
            </div>

            <input type="button" id="btn_timer" value="적용" onclick="timer_change();"/>
            <a href="<?php echo base_url('login/logout'); ?>" id="btn_logout">로그아웃</a>
        </div>

        <div class="space_between_align">
            <h1 class="bizName">(주)윈플러스</h1>
            <div class="select">
                <select id="factName">
                </select>
                <i class="fa fa-caret-down"></i>
            </div>
            <span class="time"></span>
        </div>

    </div>
</div>
<div class="mtrWrap">
    <table class="status">
        <thead>
        <tr>
            <th>작업장</th>
            <th>작업자</th>
            <th>생산실적</th>
            <th>최종일시</th>
            <th>가동시간</th>
        </tr>
        </thead>
        <tbody>

<!--        <tr class="total">-->
<!--            <td style="border-right: 0;">전체실적</td>-->
<!--            <td></td>-->
<!--            <td>999</td>-->
<!--            <td colspan="2"></td>-->
<!--        </tr>-->
        </tbody>
    </table>
</div>

<script type="text/javascript">
    var req_time = 10;
    let interval;

    $(document).ready(function () {
        var time = new Date();
        let year = time.getFullYear();
        let month = (time.getMonth()+1) < 10 ? '0'+(time.getMonth()+1) : (time.getMonth()+1);
        let date = time.getDate() < 10 ? '0'+time.getDate() : time.getDate();
        let hours = time.getHours() < 10 ? '0'+time.getHours() : time.getHours();
        let minutes = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes();
        let seconds = time.getSeconds() < 10 ? '0'+time.getSeconds() : time.getSeconds();
        let today = year+"년 "+month+"월 "+date+"일 "+hours+"시 "+minutes+"분 "+seconds+"초";
        $(".space_between_align > span").text(today);
        $.ajax({
            // application\controllers\ajax\base\Product.php
            url: "/ajax/monitoring/mntrg_data/get/mach_rslt_mntrg_wp",
            data: null,
            type:"post",
            dataType:"json",
            success: function (data) {
                console.log(data.data);
                let fact_cd = [];
                let fact_nm = [];
                let num = 0;
                for(let i=0; i<data.data.length; i++){
                    fact_nm[i] = data.data[i]["fact_nm"];
                    fact_cd[i] = data.data[i]["fact_cd"];
                    let dat = data.data[i]["last_rslt_dt"];
                    let dat_array = dat.split(' ');
                    $(".status tbody").append("<tr><td>"+data.data[i]["wrkctr_nm"]+"</td><td>"+data.data[i]["wrkr"]+"</td><td>"+data.data[i]["mach_cnt"]+"</td><td>"+dat_array[0]+"<span class='enter'></span>"+dat_array[1]+"</td><td>"+data.data[i]["op_time"]+"</td></tr>"); // 태그 추가
                    num += Number(data.data[i]["mach_cnt"]);
                };
                for(let i=data.data.length; i<5; i++){
                    $(".status tbody").append("<tr><td></td><td></td><td></td><td><span class='enter'></span></td><td></td></tr>"); // 태그 추가
                };
                $(".status tbody").append("<tr class='total'><td colspan='2'>전체실적</td><td>"+num+"</td><td colspan='2'>&nbsp;</td></tr>"); // 태그 추가

                fact_nm = Array.from(new Set(fact_nm));
                fact_cd = Array.from(new Set(fact_cd));
                for(let i=0; i<fact_nm.length; i++){
                    $("#factName").append("<option value='"+fact_cd[i]+"'>"+fact_nm[i]+"</option>");
                }
            },
            error: function (a,b,c) {
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
        setTimer(req_time);
    });

    function setTimer(req_time) {
        interval = setInterval(function () {
            $.ajax({
                // application\controllers\ajax\base\Product.php
                url: "/ajax/monitoring/mntrg_data/get/mach_rslt_mntrg_wp",
                data: null,
                type:"post",
                dataType:"json",
                success: function (data) {
                    //console.log(data.data);
                    let fact_cd = [];
                    let fact_nm = [];
                    let num = 0;
                    for(let i=0; i<data.data.length; i++){
                        fact_nm[i] = data.data[i]["fact_nm"];
                        fact_cd[i] = data.data[i]["fact_cd"];
                        let dat = data.data[i]["last_rslt_dt"];
                        let dat_array = dat.split(' ');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(1)").text(data.data[i]["wrkctr_nm"]);
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(2)").text(data.data[i]["wrkr"]);
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(3)").text(data.data[i]["mach_cnt"]);
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(4)").html(dat_array[0]+"<span class='enter'> </span>"+dat_array[1]);
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(5)").text(data.data[i]["op_time"]);
                        num += Number(data.data[i]["mach_cnt"]);
                    };
                    for(let i=data.data.length; i<5; i++){
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(1)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(2)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(3)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(4)").html("<span class='enter'> </span>");
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(5)").text('');
                    };
                    var time = new Date();
                    let year = time.getFullYear();
                    let month = (time.getMonth()+1) < 10 ? '0'+(time.getMonth()+1) : (time.getMonth()+1);
                    let date = time.getDate() < 10 ? '0'+time.getDate() : time.getDate();
                    let hours = time.getHours() < 10 ? '0'+time.getHours() : time.getHours();
                    let minutes = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes();
                    let seconds = time.getSeconds() < 10 ? '0'+time.getSeconds() : time.getSeconds();
                    let today = year+"년 "+month+"월 "+date+"일 "+hours+"시 "+minutes+"분 "+seconds+"초";
                    $(".space_between_align > span").text(today);
                    $(".status tbody tr:last-child").find("td:nth-child(2)").text(num);

                    fact_nm = Array.from(new Set(fact_nm));
                    fact_cd = Array.from(new Set(fact_cd));

                    for(let i=0; i<fact_nm.length; i++){
                        $("#factName option:nth-child("+i+")").text(fact_nm[i]);
                        $("#factName option:nth-child("+i+")").val(fact_cd[i]);
                    }
                    console.log(time.getFullYear()+"년 "+(time.getMonth()+1)+"월 "+time.getDate()+"일 "+time.getHours()+"시 "+time.getMinutes()+"분 "+time.getSeconds()+"초",req_time);

                },
                error: function (a,b,c) {
                    console.log(a);
                    console.log(b);
                    console.log(c);
                }
            });
        } , req_time * 1000);
    }

    function timer_change(){
        req_time = $("#timer").val();
        //alert(req_time+"으로 Timer를 변경했습니다.");
        clearInterval(interval);
        setTimer(req_time);
    }

</script>
