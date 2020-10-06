<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
<link rel="stylesheet" href="/include/css/common.css">
<link rel="stylesheet" href="/include/css/sub.css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" media="all"/>
<style media="screen">
    * {font-size: 13px; letter-spacing: 0;}
    .mtrWrap {width: 100%; height: calc(100vh - 105px); position: relative; overflow: hidden;background:#4A5E6E; letter-spacing: 0;}
    .mtrWrap table.status {width: 100%; height: 100%; text-align: center; border-spacing: 0; border-collapse: collapse;}
    .mtrWrap table.status th, .mtrWrap table.status td {color: #fff;}
    .mtrWrap table.status tr {}
    .mtrWrap table.status thead {}
    .mtrWrap table.status thead th {padding: 20px 0; border-right: 2px solid #ddd; background: #566d80; font-size: 4.3em;}
    .mtrWrap table.status thead th:last-of-type {border-right: 0;}
    .mtrWrap table.status tbody {}
    .mtrWrap table.status tbody td {border-right: 1px solid #ddd; border-bottom: 1px solid #ddd; background: #4A5E6E; font-size: 4em;}
    .mtrWrap table.status tbody td:last-of-type {border-right: 0;}
    .mtrWrap table.status tbody .total td {background: #1c212a; color: #fff;}
    .viewHead{padding:10px 10px; width:100%;}
    /* #timer, #factName {border-radius:5px; border:1px solid #444; font-size:1.3em; padding: 5px 15px;top: 4px;position: relative;} */
    #btn_logout {font-size: 1.3em; cursor: pointer; padding: 5px 15px; display: inline-block; vertical-align: middle; background: #fff; color: #6e6e6e; border: 1px solid #d9d9d9; margin-left: 10px;}
    #btn_timer{background-color:#ff9000; color:#fff; border:1px solid #ff9000;}
    .time {display: flex; font-size: 2em; margin-left: auto; font-weight: bold;}
    .right_align {display:block; text-align: right; width: 100%;}
    .space_between_align {display: flex; margin-top: 10px;}
    .bizName {font-size: 2em; margin-right: 10px; display: inline-block; vertical-align: middle;}
    span.enter {content:""; display: block;}

    .searchLine{width: auto;}
    .searchLine select{font-size: 1.3em;padding:6px; vertical-align: middle;}
    .searchLine input{font-size: 1.3em; width:100px; padding:6px; background-color:#ff9000; border:1px solid #ff9000; color:#fff; -webkit-appearance:none; border-radius:0;}

    @media (max-width: 1024px){
        * {font-size: 9px;}
        .searchLine select,.searchLine input, #btn_logout {font-size: 1.8em;}
        .time, .bizName {font-size: 3em;}
    }
    @media (max-width: 749px){
        * {font-size: 8px;}
        .space_between_align {display: block;}
        .time, .bizName { font-size: 2em;}
        .mtrWrap table.status thead th{border-right: 1px solid #ddd;}
        .mtrWrap table.status thead th, .mtrWrap table.status tbody td {font-size: 2.3em; }
    }
    @media (max-width: 560px){
        .mtrWrap table.status thead th, .mtrWrap table.status tbody td {font-size:1.5em;}
        .mtrWrap table.status thead th{padding:10px 0;}
        .searchLine select{width:140px;}
    }

</style>
<div id="loc_timer">
    <div class="viewHead cf">
        <div class="right_align">
            <div class="searchLine">
                <select>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                </select>
                <input type="button" value="적용" onclick="timer_change();"/>
                <a href="<?php echo base_url('login/logout'); ?>" id="btn_logout">로그아웃</a>
            </div>

        </div>

        <div class="space_between_align searchLine">
            <h1 class="bizName">(주)동원정밀</h1>
            <div class="select">
                <select></select>
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
            <th>작업자(여러명)</th><!-- 주작업자 외 4명 -->
            <th>목표</th>
            <th>실적</th>
            <th>달성률</th>
            <th>최종일시</th>
            <th>가동시간</th>
            <th>가동여부</th>
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
    var req_time = 2;
    let interval;
    var pageNum = 0;
    var count = 0;

    $(document).ready(function () {
        //공장 정보 가져오기
        $.ajax({
            url: "/ajax/monitoring/mntrg_data/get/get_fact_cd",
            data: null,
            type:"post",
            dataType:"json",
            success: function (data) {
                //console.log(data);
                for(let i=0; i<data.data.length; i++){
                    $("#factName").append("<option value='"+data.data[i]['cd']+"'>"+data.data[i]['cd_nm']+"</option>");
                }

                var time = new Date();
                let year = time.getFullYear();
                let month = (time.getMonth()+1) < 10 ? '0'+(time.getMonth()+1) : (time.getMonth()+1);
                let date = time.getDate() < 10 ? '0'+time.getDate() : time.getDate();
                let hours = time.getHours() < 10 ? '0'+time.getHours() : time.getHours();
                let minutes = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes();
                let seconds = time.getSeconds() < 10 ? '0'+time.getSeconds() : time.getSeconds();
                let today = year+"년 "+month+"월 "+date+"일 "+hours+"시 "+minutes+"분 "+seconds+"초";
                $(".space_between_align > span").text(today);

                let param = {};
                param['fact_cd'] = $("#factName option:selected").val();
                param['pageNum'] = pageNum;
                //console.log(param);
                $.ajax({
                    url: "/ajax/monitoring/mntrg_data/get/mach_rslt_mntrg",
                    data: param,
                    type:"post",
                    dataType:"json",
                    success: function (data) {
                        //console.log(data.data);
                        let num = 0;
                        for(let i=0; i<data.data.length; i++){
                            let dat = data.data[i]["last_rslt_dt"];
                            let dat_array = dat.split(' ');
                            $(".status tbody").append("<tr>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td><span class='enter'></span></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "</tr>"); // 태그 추가
                            num += Number(data.data[i]["mach_cnt"]);
                        };
                        for(let i=data.data.length; i<5; i++){
                            $(".status tbody").append("<tr>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td><span class='enter'></span></td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "</tr>"); // 태그 추가
                        };

                    },
                    error: function (a,b,c) {
                        console.log(a);
                        console.log(b);
                        console.log(c);
                    }
                });
                setTimer(req_time);

            },
            error: function (a,b,c) {
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
    });

    function setTimer(req_time) {
        interval = setInterval(function () {
            count++;
            if(count === 3){
                count = 0;
                pageNum += 5;
                if(pageNum > 9){
                    pageNum = 0;
                }
            }

            let param = {};
            param['fact_cd'] = $("#factName option:selected").val();
            param['pageNum'] = pageNum;

            $.ajax({
                url: "/ajax/monitoring/mntrg_data/get/mach_rslt_mntrg",
                data: param,
                type:"post",
                dataType:"json",
                success: function (data) {
                    //console.log(data.data);
                    for(let i=0; i<data.data.length; i++){
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(1)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(2)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(3)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(4)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(5)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(6)").html("<span class='enter'> </span>");
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(7)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(8)").text('');
                    };
                    for(let i=data.data.length; i<5; i++){
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(1)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(2)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(3)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(4)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(5)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(6)").html("<span class='enter'> </span>");
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(7)").text('');
                        $(".status tbody tr:nth-child("+(i+1)+")").find("td:nth-child(8)").text('');
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

                    //console.log(time.getFullYear()+"년 "+(time.getMonth()+1)+"월 "+time.getDate()+"일 "+time.getHours()+"시 "+time.getMinutes()+"분 "+time.getSeconds()+"초",req_time);

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
