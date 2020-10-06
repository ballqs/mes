<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/jquery.easy-pie-chart/1.0.1/jquery.easy-pie-chart.js"></script>
<link rel="stylesheet" href="/include/css/common.css">
<link rel="stylesheet" href="/include/css/sub.css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" media="all"/>
<style media="screen">
    * {letter-spacing: -0.0375em;}
    .mtrWrap {background: #59636A; padding: 20px; height: 100vh; overflow: hidden;}
    .mtrBox {margin-bottom: 20px; position: relative;}
    .mtrBox.boxBg {background: #373E43; color: #fff; padding: 10px 30px;}

    .box01 {width: calc((100% - 60px) / 3); background: #3A4146; border: 1px solid #343D45; box-shadow: 1px 1px 5px #41474B; float: left; margin-right: 30px; margin-bottom: 30px;}
    .box01:nth-child(3n) {margin-right: 0;}
    .section {overflow: hidden; padding: 10px; height: ;}
    .contBox {float: left; color: #fff; width: calc(100% - 200px);}
    .contBox.graph {width: 200px;}
    .contBox > p {float: left; background: #40474D; width: 100%; text-align: right; margin-bottom: 10px; padding: 8px 16px; font-size: 2em; }
    .contBox > p:nth-last-child(2) {font-family: 'Roboto', sans-serif; font-weight: 200; letter-spacing: 0;}
    .contBox > p:last-child {margin-bottom: 0;}
    .innerBox {background: #40474D; float: left; width: calc((100% - 10px) / 2); margin-bottom: 10px; padding: 10px;}
    .innerBox:nth-child(2n-1) {margin-right: 10px;}
    .innerBox p:first-of-type {color: #B9B9B9; font-size: 2em; font-weight: 400;}
    .innerBox p:last-of-type {font-family: 'Roboto', sans-serif; font-size: 2.6em; letter-spacing: 0; font-weight: bold;}
    .innerBox.smallBox {text-align: center; height: 48px; line-height: 30px;}
    .innerBox.smallBox p {color: #fff; font-size: 1.2em; font-weight: 500;}
    .innerBox.big p {font-size: 1.6em; font-weight: bold;}
    .innerBox.smallBox:nth-last-child(1),
    .innerBox.smallBox:nth-last-child(2) {margin-bottom: 0;}
    span.fontBold {font-weight: bold; color: #fff;}
    span.fontGray {font-family: 'Roboto', sans-serif; font-weight: 400; color: #B9B9B9; font-size: .8em;}

    .cpNm {font-size: 2.2em; font-weight: bold; display: inline-block;}
    .timer {font-family: 'Roboto', sans-serif; font-size: 2.2em; font-weight: 100; letter-spacing: 0; float: right; position: relative; top:50%; transform: translateY(12%);}
    .contTit {padding: 8px 20px; font-size: 2.2em; color: #fff; font-weight: 500; position: relative; background: #4D565D; box-shadow: 0 1px 5px #2D353B; }
    .contTit i {content: ""; width: 40px; height: 25px; border-radius: 30px; float: right; position: relative; top: 50%; transform: translateY(40%);}
    .contTit i.on {background: #62ECFF;}
    .contTit i.error {background: #EF2E1E;}
    .contTit i.off {background: #FFBA00;}
    .graph {font-family: 'Roboto', sans-serif; padding-right: 10px; text-align: center; padding-top: 30px;}
    .graph span { color: ; font-size: 5.7em; font-weight: bold; text-shadow: 1px 1px 3px #2C3136; width: 100%; text-align: center; display: inline-block;}
    .graph span i {font-size: 0.6em;font-weight: 200; font-style: normal; margin-left: 5px;}
    .chart {display: inline-block;}
    .mtrBox select {background: url('/uploads/img/common/bottom_arrow.png') no-repeat 92%; position: relative; border: 1px solid #ccc; display: inline-block; color: #ccc; font-size: 1.4em; vertical-align: middle; width: 160px; height: 35px; padding: 0 10px;}
    .mtrBox .num {width: 80px;display: inline-block;}

    .state,
    .state h5,
    .state p,
    .state span,
    .notice {display: inline-block; vertical-align: middle;}

    .state {border: 1px dashed #888; padding: 1px 10px; margin-right: 10px;}
    .state h5 {font-size: 1.1em; font-weight: 500; color: #fff;}
    .state p {max-width: 120px; margin-right: ;font-weight: bold; font-size: 1.5em;}
    .state span {content: ""; width: 16px; height: 16px; border-radius: 50%; margin: 0 5px 0 20px;}
    .notice.on p {color: #D1FE1D;}
    .notice.on span {background: #D1FE1D;}
    .notice.errorRed p {color: #EF2E1E;}
    .notice.errorRed span {background: #EF2E1E;}
    .notice.errorOrange p {color: #fbc403;}
    .notice.errorOrange span {background: #fbc403;}

    .bt {border: 1px solid #ccc; color: #ccc; font-size: 1.4em; vertical-align: middle; display: inline-block; height: 35px; text-align: center; padding: 0 15px; line-height: 32px;}
    .bt.orange {background: #ff9000; color: #fff; border: 1px solid #ff9000; margin: 0 5px;}
    .fa-clock-o {margin-right: 10px;}
    .on {color: #62ECFF !important;}
    .error {color: #EF2E1E !important;}
    .off {color: #FFBA00 !important;}

    @media (max-width: 1919px){
        .mtrWrap {height: auto; overflow: auto;}
        .box01 {width: calc((100% - 30px) / 2);}
        .box01:nth-child(3n) {margin-right: 30px;}
        .box01:nth-child(2n) {margin-right: 0;}
        .innerBox.fixHeight p {line-height: 50px; font-size: 2em;}
    }
    @media (max-width: 1359px){
        .box01 {width: 100%;}
        .box01 {margin-right: 0;}
    }
    @media (max-width: 720px){
        body {font-size: 10px;}
        .mtrBox {margin-bottom: 10px; }
        .mtrWrap {padding: 10px;}
        .box01 {margin-bottom: 10px;}
        .graph {padding-top: 15px;}
        .contTit i {transform: translateY(15%);}
    }
    @media (max-width: 570px){
        .contBox {float: none;width: 100%;}
        .contBox.graph {width: 100%;}
        .graph {padding: 10px 0;}
        .section {height: auto;}
        .graph span {width: auto; vertical-align: bottom; margin-left: 20px;}
        .mtrBox.boxBg {padding: 10px;}
    }
    @media (max-width: 490px){
        .mtrBox select {width: 110px;}
        .mtrBox select.num {width: 60px;}
    }

</style>

<div class="mtrWrap">
    <div class="mtrBox cf">
        <select class="fl" id="fact_cd">
        </select>
        <div class="fr cf">
            <div class="state">
                <h5>설비통신상태</h5>
                <div class="notice" id="state_info">
                    <span id="state_led"></span>
                    <p id="state_msg">중단</p>
                </div>
            </div>
            <select class="num" name="" id="ajax_interval_number">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
            </select>
            <a class="bt orange" onclick="ajaxInterval_change();">적용</a>
        </div>
    </div>
    <div class="mtrBox cf boxBg">
        <h1 class="cpNm">(주)동원정밀</h1>
        <p class="timer" id="timer"><i class="fa fa-clock-o" aria-hidden="true"></i>2020.09.01 11:59:00</p>
    </div>
    <div class="mrtBox cf">
        <div class="box01">
            <h2 class="contTit cf wrkctr">작업장 1<i class="on"></i></h2>
            <div class="section cf">
                <div class="contBox graph">
                    <div easyPieChart class="chart" data-percent="50"></div>
                    <span class="on percent">84<i>%</i></span>
                </div>
                <div class="contBox cf">
                    <div class="innerBox">
                        <p>상태</p>
                        <p class="on status">ON</p>
                    </div>
                    <div class="innerBox">
                        <p><span class="fontBold">목표</span></p>
                        <p class="ordr_qty">100,000</p>
                    </div>
                    <div class="innerBox">
                        <p>작업시간</p>
                        <p class="op_time">00:03:10</p>
                    </div>
                    <div class="innerBox">
                        <p><span class="fontBold">설비실적</span>/불량</p>
                        <p class="prd_qty_meas">1000<span class="fontGray">/0000</span></p>
                    </div>
                    <div class="innerBox smallBox big">
                        <p class="wrk_ordr_no">test</p>
                    </div>
                    <div class="innerBox smallBox small">
                        <p class="last_dt">2020.09.01 11:39:00</p>
                    </div>
                    <div class="innerBox smallBox big">
                        <p class="prt_nbr_dsp_nm">test</p>
                    </div>
                    <div class="innerBox smallBox small">
                        <p class="wrkr">홍길동 외 4명</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="box01">
            <h2 class="contTit cf wrkctr">작업장 1<i class="on"></i></h2>
            <div class="section cf">
                <div class="contBox graph">
                    <div easyPieChart class="chart" data-percent="50"></div>
                    <span class="percent">84<i>%</i></span>
                </div>
                <div class="contBox cf">
                    <div class="innerBox">
                        <p>상태</p>
                        <p class="on status">ON</p>
                    </div>
                    <div class="innerBox">
                        <p><span class="fontBold">목표</span></p>
                        <p class="ordr_qty">100,000</p>
                    </div>
                    <div class="innerBox">
                        <p>작업시간</p>
                        <p class="op_time">00:03:10</p>
                    </div>
                    <div class="innerBox">
                        <p><span class="fontBold">설비실적</span>/불량</p>
                        <p class="prd_qty_meas">1000<span class="fontGray">/0000</span></p>
                    </div>
                    <div class="innerBox smallBox big">
                        <p class="wrk_ordr_no">test</p>
                    </div>
                    <div class="innerBox smallBox small">
                        <p class="last_dt">2020.09.01 11:39:00</p>
                    </div>
                    <div class="innerBox smallBox big">
                        <p class="prt_nbr_dsp_nm">test</p>
                    </div>
                    <div class="innerBox smallBox small">
                        <p class="wrkr">홍길동 외 4명</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="box01">
            <h2 class="contTit cf wrkctr">작업장 1<i class="on"></i></h2>
            <div class="section cf">
                <div class="contBox graph">
                    <div easyPieChart class="chart" data-percent="50"></div>
                    <span class="percent">84<i>%</i></span>
                </div>
                <div class="contBox cf">
                    <div class="innerBox">
                        <p>상태</p>
                        <p class="on status">ON</p>
                    </div>
                    <div class="innerBox">
                        <p><span class="fontBold">목표</span></p>
                        <p class="ordr_qty">100,000</p>
                    </div>
                    <div class="innerBox">
                        <p>작업시간</p>
                        <p class="op_time">00:03:10</p>
                    </div>
                    <div class="innerBox">
                        <p><span class="fontBold">설비실적</span>/불량</p>
                        <p class="prd_qty_meas">1000<span class="fontGray">/0000</span></p>
                    </div>
                    <div class="innerBox smallBox big">
                        <p class="wrk_ordr_no">test</p>
                    </div>
                    <div class="innerBox smallBox small">
                        <p class="last_dt">2020.09.01 11:39:00</p>
                    </div>
                    <div class="innerBox smallBox big">
                        <p class="prt_nbr_dsp_nm">test</p>
                    </div>
                    <div class="innerBox smallBox small">
                        <p class="wrkr">홍길동 외 4명</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="box01">
            <h2 class="contTit cf wrkctr">작업장 1<i class="on"></i></h2>
            <div class="section cf">
                <div class="contBox graph">
                    <div easyPieChart class="chart" data-percent="50"></div>
                    <span class="percent">84<i>%</i></span>
                </div>
                <div class="contBox cf">
                    <div class="innerBox">
                        <p>상태</p>
                        <p class="on status">ON</p>
                    </div>
                    <div class="innerBox">
                        <p><span class="fontBold">목표</span></p>
                        <p class="ordr_qty">100,000</p>
                    </div>
                    <div class="innerBox">
                        <p>작업시간</p>
                        <p class="op_time">00:03:10</p>
                    </div>
                    <div class="innerBox">
                        <p><span class="fontBold">설비실적</span>/불량</p>
                        <p class="prd_qty_meas">1000<span class="fontGray">/0000</span></p>
                    </div>
                    <div class="innerBox smallBox big">
                        <p class="wrk_ordr_no">test</p>
                    </div>
                    <div class="innerBox smallBox small">
                        <p class="last_dt">2020.09.01 11:39:00</p>
                    </div>
                    <div class="innerBox smallBox big">
                        <p class="prt_nbr_dsp_nm">test</p>
                    </div>
                    <div class="innerBox smallBox small">
                        <p class="wrkr">홍길동 외 4명</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="box01">
            <h2 class="contTit cf wrkctr">작업장 1<i class="on"></i></h2>
            <div class="section cf">
                <div class="contBox graph">
                    <div easyPieChart class="chart" data-percent="50"></div>
                    <span class="percent">84<i>%</i></span>
                </div>
                <div class="contBox cf">
                    <div class="innerBox">
                        <p>상태</p>
                        <p class="on status">ON</p>
                    </div>
                    <div class="innerBox">
                        <p><span class="fontBold">목표</span></p>
                        <p class="ordr_qty">100,000</p>
                    </div>
                    <div class="innerBox">
                        <p>작업시간</p>
                        <p class="op_time">00:03:10</p>
                    </div>
                    <div class="innerBox">
                        <p><span class="fontBold">설비실적</span>/불량</p>
                        <p class="prd_qty_meas">1000<span class="fontGray">/0000</span></p>
                    </div>
                    <div class="innerBox smallBox big">
                        <p class="wrk_ordr_no">test</p>
                    </div>
                    <div class="innerBox smallBox small">
                        <p class="last_dt">2020.09.01 11:39:00</p>
                    </div>
                    <div class="innerBox smallBox big">
                        <p class="prt_nbr_dsp_nm">test</p>
                    </div>
                    <div class="innerBox smallBox small">
                        <p class="wrkr">홍길동 외 4명</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="box01">
            <h2 class="contTit cf wrkctr">작업장 1<i class="on"></i></h2>
            <div class="section cf">
                <div class="contBox graph">
                    <div easyPieChart class="chart" data-percent="50"></div>
                    <span class="percent">84<i>%</i></span>
                </div>
                <div class="contBox cf">
                    <div class="innerBox">
                        <p>상태</p>
                        <p class="on status">ON</p>
                    </div>
                    <div class="innerBox">
                        <p><span class="fontBold">목표</span></p>
                        <p class="ordr_qty">100,000</p>
                    </div>
                    <div class="innerBox">
                        <p>작업시간</p>
                        <p class="op_time">00:03:10</p>
                    </div>
                    <div class="innerBox">
                        <p><span class="fontBold">설비실적</span>/불량</p>
                        <p class="prd_qty_meas">1000<span class="fontGray">/0000</span></p>
                    </div>
                    <div class="innerBox smallBox big">
                        <p class="wrk_ordr_no">test</p>
                    </div>
                    <div class="innerBox smallBox small">
                        <p class="last_dt">2020.09.01 11:39:00</p>
                    </div>
                    <div class="innerBox smallBox big">
                        <p class="prt_nbr_dsp_nm">test</p>
                    </div>
                    <div class="innerBox smallBox small">
                        <p class="wrkr">홍길동 외 4명</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    var req_time = 10;       //2초 간격으로 AJAX 통신
    let interval;           //AJAX 통신 간격을 재조정하기 위한 interval
    let timer;
    var viewNum = 6;        //View에 보이는 수
    var pageNum = 0;        //페이징 0~6 / 7~12
    var count = 0;          //pageNum 숫자를 바꾸기 위한 카운트 숫자
    var changeNum = 10;     //count 숫자 제한걸기 위한것


    let state_interval;
    let flag = true;

    $(function() {
        $('.chart').easyPieChart({
            // The color of the curcular bar. You can pass either a css valid color string like rgb, rgba hex or string colors. But you can also pass a function that accepts the current percentage as a value to return a dynamically generated color.
            barColor: '#62ECFF',//바 색깔
            // The color of the track for the bar, false to disable rendering.
            trackColor: '#3A4146',//안채워진 바 색깔
            // The color of the scale lines, false to disable rendering.
            scaleColor: '#3A4146',
            // Defines how the ending of the bar line looks like. Possible values are: butt, round and square.
            lineCap: 'round',
            // Width of the bar line in px.
            lineWidth: 30,
            // Size of the pie chart in px. It will always be a square.
            size: 170,
            // Time in milliseconds for a eased animation of the bar growing, or false to deactivate.
            animate: 1000,
            // Callback function that is called at the start of any animation (only if animate is not false).
            onStart: $.noop,
            // Callback function that is called at the end of any animation (only if animate is not false).
            onStop: $.noop,
        });

        //공장 정보 가져오기
        $.ajax({
            url: "/ajax/monitoring/mntrg_data/get/get_fact_cd",
            data: null,
            type:"post",
            dataType:"json",
            success: function (data) {
                //console.log(data);
                for(let i=0; i<data.data.length; i++){
                    $("#fact_cd").append("<option value='"+data.data[i]['cd']+"'>"+data.data[i]['cd_nm']+"</option>");
                }
                nowDateSetting();

                let param = {};
                param['fact_cd'] = $("#fact_cd option:selected").val();
                param['pageNum'] = pageNum;
                //console.log(param);
                ajaxCall(param);
                stateAjaxCall(param);
                setTimer();
                setAjaxInterval(req_time);
            },
            error: function (a,b,c) {
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
    });

    function setTimer() {
        timer = setInterval(function () {
            nowDateSetting();
            count++;
            //console.log(count);
            //console.log(changeNum);
            if(count === changeNum){
                count = 0;
                pageNum += viewNum;
                if(pageNum === viewNum * 2){
                    pageNum = 0;
                }
            }
        }, 1000);
    }
    function setAjaxInterval(req_time) {
        interval = setInterval(function () {
            let param = {};
            param['fact_cd'] = $("#fact_cd option:selected").val();
            param['pageNum'] = pageNum;
            ajaxCall(param);
            stateAjaxCall(param);
        } , req_time * 1000);
    }

    function ajaxInterval_change(){
        req_time = Number($("#ajax_interval_number").val());
        changeNum = Number($("#ajax_interval_number").val());
        count = 0;
        //alert(req_time+"으로 Timer를 변경했습니다.");
        clearInterval(timer);
        setTimer();
        clearInterval(interval);
        setAjaxInterval(req_time);
    }

    function nowDateSetting() {
        var time = new Date();
        let year = time.getFullYear();
        let month = (time.getMonth()+1) < 10 ? '0'+(time.getMonth()+1) : (time.getMonth()+1);
        let date = time.getDate() < 10 ? '0'+time.getDate() : time.getDate();
        let hours = time.getHours() < 10 ? '0'+time.getHours() : time.getHours();
        let minutes = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes();
        let seconds = time.getSeconds() < 10 ? '0'+time.getSeconds() : time.getSeconds();
        let today =  year+"년 "+month+"월 "+date+"일 "+hours+"시 "+minutes+"분 "+seconds+"초";
        $("#timer").text(today).prepend("<i class='fa fa-clock-o' aria-hidden='true'></i>");
    }

    function ajaxCall(param) {
        $.ajax({
            url: "/ajax/monitoring/mntrg_data/get/mach_rslt_mntrg",
            data: param,
            type:"post",
            dataType:"json",
            success: function (data) {
                dataSetting(data);
            },
            error: function (a,b,c) {
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
    }

    function stateAjaxCall(param) {
        $.ajax({
            url: "/ajax/monitoring/mntrg_data/get/state_check",
            data: param,
            type:"post",
            dataType:"json",
            success: function (data) {
                console.log(data.data[0]['cnt']);
                let cnt = data.data[0]['cnt'];
                machStateSetting(cnt);
            },
            error: function (a,b,c) {
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
    }

    function machStateSetting(cnt) {
        if(cnt > 300){
            state_error_interval();
        }else{
            flag = true;
            clearInterval(state_interval);
            $("#state_info").removeClass('errorOrange').removeClass('errorRed').addClass('on');
            $("#state_msg").text("정상");
            //$("#state_led").removeClass('errorOrange').removeClass('errorRed').addClass('on');
        }
    }
    
    function state_error_interval() {
        if(flag){
            flag = false;
            //$("#state_info").addClass('errorOrange');
            $("#state_msg").html('중단');
            let show_flag = true;
            state_interval = setInterval(function () {
                if(show_flag) {
                    $("#state_info").removeClass('errorOrange').removeClass('on').addClass('errorRed');
                    show_flag = false;
                } else {
                    $("#state_info").removeClass('on').removeClass('errorRed').addClass('errorOrange');
                    show_flag = true;
                }
            } , 500);
        }

    }

    function dataSetting(data) {
        console.log(data);
        for(let i=0; i<data.data.length; i++){
            $('.box01').eq(i).css('display','block');
            if(data.data[i]['wrk_ordr_no'] !== null){


                //작업장명 / 가동,비가동 현황
                if(data.data[i]['staus'] === "R"){
                    $('.wrkctr').eq(i).html(data.data[i]['wrkctr_nm']+"<i class='on'></i>");
                    $('.status').eq(i).removeClass('on').removeClass('off').removeClass('error').addClass('on').text("ON");
                    $('.chart').eq(i).data('easyPieChart').options.barColor = '#62ECFF';
                    $('.percent').eq(i).removeClass('on').removeClass('off').removeClass('error').addClass('on');
                }else{
                    if(data.data[i]['stop_cd'] === '' || data.data[i]['pln_yn'] === 'Y'){
                        $('.wrkctr').eq(i).html(data.data[i]['wrkctr_nm']+"<i class='off'></i>");
                        $('.status').eq(i).removeClass('on').removeClass('off').removeClass('error').addClass('off').text("OFF");
                        $('.chart').eq(i).data('easyPieChart').options.barColor = '#FFBA00';
                        $('.percent').eq(i).removeClass('on').removeClass('off').removeClass('error').addClass('off');
                    }else{
                        $('.wrkctr').eq(i).html(data.data[i]['wrkctr_nm']+"<i class='error'></i>");
                        $('.status').eq(i).removeClass('on').removeClass('off').removeClass('error').addClass('error').text("ERROR");
                        $('.chart').eq(i).data('easyPieChart').options.barColor = '#EF2E1E';
                        $('.percent').eq(i).removeClass('on').removeClass('off').removeClass('error').addClass('error');
                    }
                }
                //달성률
                let ordr_qty = data.data[i]['ordr_qty']==null ? 0 : Number(data.data[i]['ordr_qty']);
                let mach_cnt = data.data[i]['mach_cnt']==null ? 0 : Number(data.data[i]['mach_cnt']);
                let percentage_gauge;
                if(ordr_qty == 0 || mach_cnt == 0){
                    percentage_gauge = 0;
                }else{
                    percentage_gauge = Math.floor(mach_cnt / ordr_qty * 100);
                }
                $('.chart').eq(i).data('easyPieChart').update(percentage_gauge);
                $('.percent').eq(i).text(percentage_gauge).append('<i>%</i>');
                //지시수량
                $('.ordr_qty').eq(i).text(ordr_qty);
                //가동시간
                let op_time = data.data[i]['op_time'];
                let h = Math.floor(Number(op_time)/3600) < 10 ? '0'+Math.floor(Number(op_time)/3600) : Math.floor(Number(op_time)/3600);
                let m = Math.floor((Number(op_time)%3600)/60) < 10 ? '0'+Math.floor((Number(op_time)%3600)/60) : Math.floor((Number(op_time)%3600)/60);
                let s = Number(op_time)%60 < 10 ? '0'+Number(op_time)%60 : Number(op_time)%60;
                $('.op_time').eq(i).text(h+':'+m+':'+s);

                //사람이 등록한 실적치
                let prd_qty_meas = data.data[i]['prd_qty_meas']==null ? 0 : Number(data.data[i]['prd_qty_meas']);
                //불량 수량
                let err_qty = data.data[i]['err_qty']==null ? 0 : Number(data.data[i]['err_qty']);

                //실적수량
                $('.prd_qty_meas').eq(i).html(mach_cnt+'<span class="fontGray">/'+err_qty+'</span>');
                //최종일시
                $('.last_dt').eq(i).text(data.data[i]['last_dt']);
                //메인작업자 외 몇명
                let wrkr_qty = Number(data.data[i]['wrkr_qty']) - 1;
                if(wrkr_qty === 0){
                    $('.wrkr').eq(i).text(data.data[i]['main_wrkr']);
                }else{
                    $('.wrkr').eq(i).text(data.data[i]['main_wrkr']+" 외 "+wrkr_qty+"명");
                }
                $('.wrk_ordr_no').eq(i).text(data.data[i]['wrk_ordr_no']);
                $('.prt_nbr_dsp_nm').eq(i).text(data.data[i]['prt_nbr_dsp_nm']);
            }else{
                $('.wrkctr').eq(i).html(data.data[i]['wrkctr_nm']+"<i class='off'></i>");
                $('.status').eq(i).removeClass('on').removeClass('off').removeClass('error').addClass('off').text("OFF");
                $('.chart').eq(i).data('easyPieChart').update(0);
                $('.chart').eq(i).data('easyPieChart').options.barColor = '#FFBA00';
                $('.percent').eq(i).removeClass('on').removeClass('off').removeClass('error').addClass('off');
                $('.percent').eq(i).text(0).append('<i>%</i>');
                $('.ordr_qty').eq(i).text(0);
                $('.op_time').eq(i).text('00:00:00');
                $('.prd_qty_meas').eq(i).html('0<span class="fontGray">/0</span>');
                $('.last_dt').eq(i).text('0000-00-00 00:00:00');
                $('.wrkr').eq(i).text('없음');
                $('.wrk_ordr_no').eq(i).text('없음');
                $('.prt_nbr_dsp_nm').eq(i).text('없음');
            }
        }
        for(let i=data.data.length; i < 6; i++){
            $('.box01').eq(i).css('display','none');
            $('.wrkctr').eq(i).html("　");
            $('.status').eq(i).removeClass('on').removeClass('off').removeClass('error').addClass('off').text("OFF");
            $('.chart').eq(i).data('easyPieChart').update(0);
            $('.chart').eq(i).data('easyPieChart').options.barColor = '#FFBA00';
            $('.percent').eq(i).removeClass('on').removeClass('off').removeClass('error').addClass('off');
            $('.percent').eq(i).text(0).append('<i>%</i>');
            $('.ordr_qty').eq(i).text(0);
            $('.op_time').eq(i).text('00:00:00');
            $('.prd_qty_meas').eq(i).html('0<span class="fontGray">/0</span>');
            $('.last_dt').eq(i).text('0000-00-00 00:00:00');
            $('.wrkr').eq(i).text('없음');
            $('.wrk_ordr_no').eq(i).text('없음');
            $('.prt_nbr_dsp_nm').eq(i).text('없음');
        }
    }
</script>
