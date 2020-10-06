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
    .innerBox p:last-of-type {font-family: 'Roboto', sans-serif; font-size: 2.8em; letter-spacing: 0; font-weight: bold;}

    .cpNm {font-size: 2.2em; font-weight: 400;display: inline-block;}
    .timer {font-family: 'Roboto', sans-serif; font-size: 2.2em; font-weight: 100; letter-spacing: 0; float: right; position: relative; top:50%; transform: translateY(20%);}
    .contTit {padding: 8px 20px; font-size: 2.2em; color: #fff; font-weight: 400; position: relative; background: #4D565D; box-shadow: 0 1px 5px #2D353B; }
    .contTit i {content: ""; width: 25px; height: 25px; border-radius: 50%; float: right; position: relative; top: 50%; transform: translateY(40%);}
    .contTit i.on {background: #D1FE1D;}
    .contTit i.error {background: #EF2E1E;}
    .contTit i.off {background: #FFBA00;}
    .graph {font-family: 'Roboto', sans-serif; padding-right: 10px; text-align: center; padding-top: 30px;}
    .graph span { color: #61ECFF; font-size: 5.7em; font-weight: bold; text-shadow: 1px 1px 3px #2C3136; width: 100%; text-align: center; display: inline-block;}
    .graph span i {font-size: 0.6em;font-weight: 200; font-style: normal; margin-left: 5px;}
    .chart {display: inline-block;}
    .mtrBox select {background: url('/uploads/img/common/bottom_arrow.png') no-repeat 92%; position: relative; border: 1px solid #ccc; display: inline-block; color: #ccc; font-size: 1.4em; vertical-align: middle; width: 160px; height: 35px; padding: 0 10px;}
    .mtrBox select.num {width: 80px;}
    .mtrBox select option {}
    .bt {border: 1px solid #ccc; color: #ccc; font-size: 1.4em; vertical-align: middle; display: inline-block; height: 35px; text-align: center; padding: 0 15px; line-height: 32px;}
    .bt.orange {background: #ff9000; color: #fff; border: 1px solid #ff9000; margin: 0 5px;}
    .fa-clock-o {margin-right: 10px;}
    .on {color: #D1FE1D;}
    .error {color: #EF2E1E;}
    .off {color: #FFBA00;}

    @media (max-width: 1919px){
        .mtrWrap {height: auto; overflow: auto;}
        .box01 {width: calc((100% - 30px) / 2);}
        .box01:nth-child(3n) {margin-right: 30px;}
        .box01:nth-child(2n) {margin-right: 0;}
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
    }
    @media (max-width: 570px){
        .contBox {float: none;width: 100%;}
        .contBox.graph {width: 100%;}
        .graph {padding: 10px 0;}
        .section {height: auto;}
        .graph span {width: auto; vertical-align: bottom; margin-left: 20px;}
    }
    @media (max-width: 490px){
        .mtrBox select {width: 110px;}
        .mtrBox select.num {width: 60px;}
        .mtrBox.boxBg {padding: 10px;}
    }

</style>

<div class="mtrWrap">
    <div class="mtrBox cf">
        <select class="fl" name="">
            <option value="">HS정밀 01</option>
        </select>
        <div class="fr">
            <select class="num" name="">
                <option value="">2</option>
            </select>
            <a class="bt orange">적용</a>
            <a class="bt">로그아웃</a>
        </div>
    </div>
    <div class="mtrBox cf boxBg">
        <h1 class="cpNm">(주)동원정밀</h1>
        <p class="timer"><i class="fa fa-clock-o" aria-hidden="true"></i>2020.09.01 11:59:00</p>
    </div>
    <div class="mrtBox cf">
        <div class="box01">
            <h2 class="contTit cf">작업장 1<i class="on"></i></h2>
            <div class="section cf">
                <div class="contBox graph">
                    <div class="chart" data-percent="84"></div>
                    <span>84<i>%</i></span>
                </div>
                <div class="contBox cf">
                    <div class="innerBox">
                        <p>상태</p>
                        <p class="on">ON</p>
                    </div>
                    <div class="innerBox">
                        <p>목표</p>
                        <p>100,000</p>
                    </div>
                    <div class="innerBox">
                        <p>가동시간</p>
                        <p>00:03:10</p>
                    </div>
                    <div class="innerBox">
                        <p>실적</p>
                        <p>10,000</p>
                    </div>
                    <p>2020.09.01 11:39:00</p>
                    <p>홍길동 외 4명</p>
                </div>
            </div>
        </div>

        <div class="box01">
            <h2 class="contTit cf">작업장 1<i class="off"></i></h2>
            <div class="section cf">
                <div class="contBox graph">
                    <div class="chart" data-percent="34"></div>
                    <span>34<i>%</i></span>
                </div>
                <div class="contBox cf">
                    <div class="innerBox">
                        <p>상태</p>
                        <p class="off">OFF</p>
                    </div>
                    <div class="innerBox">
                        <p>목표</p>
                        <p>100,000</p>
                    </div>
                    <div class="innerBox">
                        <p>가동시간</p>
                        <p>00:03:10</p>
                    </div>
                    <div class="innerBox">
                        <p>실적</p>
                        <p>10,000</p>
                    </div>
                    <p>2020.09.01 11:39:00</p>
                    <p>홍길동 외 4명</p>
                </div>
            </div>
        </div>

        <div class="box01">
            <h2 class="contTit cf">작업장 1<i class="error"></i></h2>
            <div class="section cf">
                <div class="contBox graph">
                    <div class="chart" data-percent="34"></div>
                    <span>34<i>%</i></span>
                </div>
                <div class="contBox cf">
                    <div class="innerBox">
                        <p>상태</p>
                        <p class="error">ERROR</p>
                    </div>
                    <div class="innerBox">
                        <p>목표</p>
                        <p>100,000</p>
                    </div>
                    <div class="innerBox">
                        <p>가동시간</p>
                        <p>00:03:10</p>
                    </div>
                    <div class="innerBox">
                        <p>실적</p>
                        <p>10,000</p>
                    </div>
                    <p>2020.09.01 11:39:00</p>
                    <p>홍길동 외 4명</p>
                </div>
            </div>
        </div>

        <div class="box01">
            <h2 class="contTit cf">작업장 1<i class="on"></i></h2>
            <div class="section cf">
                <div class="contBox graph">
                    <div class="chart" data-percent="84"></div>
                    <span>84<i>%</i></span>
                </div>
                <div class="contBox cf">
                    <div class="innerBox">
                        <p>상태</p>
                        <p class="on">ON</p>
                    </div>
                    <div class="innerBox">
                        <p>목표</p>
                        <p>100,000</p>
                    </div>
                    <div class="innerBox">
                        <p>가동시간</p>
                        <p>00:03:10</p>
                    </div>
                    <div class="innerBox">
                        <p>실적</p>
                        <p>10,000</p>
                    </div>
                    <p>2020.09.01 11:39:00</p>
                    <p>홍길동 외 4명</p>
                </div>
            </div>
        </div>

        <div class="box01">
            <h2 class="contTit cf">작업장 1<i class="on"></i></h2>
            <div class="section cf">
                <div class="contBox graph">
                    <div class="chart" data-percent="84"></div>
                    <span>84<i>%</i></span>
                </div>
                <div class="contBox cf">
                    <div class="innerBox">
                        <p>상태</p>
                        <p class="on">ON</p>
                    </div>
                    <div class="innerBox">
                        <p>목표</p>
                        <p>100,000</p>
                    </div>
                    <div class="innerBox">
                        <p>가동시간</p>
                        <p>00:03:10</p>
                    </div>
                    <div class="innerBox">
                        <p>실적</p>
                        <p>10,000</p>
                    </div>
                    <p>2020.09.01 11:39:00</p>
                    <p>홍길동 외 4명</p>
                </div>
            </div>
        </div>

        <div class="box01">
            <h2 class="contTit cf">작업장 1<i class="on"></i></h2>
            <div class="section cf">
                <div class="contBox graph">
                    <div class="chart" data-percent="84"></div>
                    <span>84<i>%</i></span>
                </div>
                <div class="contBox cf">
                    <div class="innerBox">
                        <p>상태</p>
                        <p class="on">ON</p>
                    </div>
                    <div class="innerBox">
                        <p>목표</p>
                        <p>100,000</p>
                    </div>
                    <div class="innerBox">
                        <p>가동시간</p>
                        <p>00:03:10</p>
                    </div>
                    <div class="innerBox">
                        <p>실적</p>
                        <p>10,000</p>
                    </div>
                    <p>2020.09.01 11:39:00</p>
                    <p>홍길동 외 4명</p>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(function() {
        $('.chart').easyPieChart({
            // The color of the curcular bar. You can pass either a css valid color string like rgb, rgba hex or string colors. But you can also pass a function that accepts the current percentage as a value to return a dynamically generated color.
            barColor: '#62ECFF',
            // The color of the track for the bar, false to disable rendering.
            trackColor: '#3A4146',
            // The color of the scale lines, false to disable rendering.
            scaleColor: '#3A4146',
            // Defines how the ending of the bar line looks like. Possible values are: butt, round and square.
            lineCap: 'butt',
            // Width of the bar line in px.
            lineWidth: 30,
            // Size of the pie chart in px. It will always be a square.
            size: 170,
            // Time in milliseconds for a eased animation of the bar growing, or false to deactivate.
            animate: false,
            // Callback function that is called at the start of any animation (only if animate is not false).
            onStart: $.noop,
            // Callback function that is called at the end of any animation (only if animate is not false).
            onStop: $.noop
        });
        $('.updatePieCharts').on('click', function(e) {
            e.preventDefault();
            var newValue = Math.floor(100 * Math.random());
            $('.chart').data('easyPieChart').update(newValue);
            $('span', $('.chart')).text(newValue);
        });
    });
</script>
