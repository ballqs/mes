<style media="screen">
  #grid01 {width: 100%; height:100%;}
  .scrollWrap {height: calc(100% - 683px);}

  /* 차트 */
  .chart text{font-style: normal;}
  .chart circle{fill: #335d7e;}
</style>

<div class="searchWrap cf">
    <div class="searchLine cf">
        <div class="boxW col-3 select"><p>공장</p><select><option>ALL</option></select></div>
        <div class="boxW col-3 search">
            <p>검사일자</p>
            <input type="date" name="" value=""><span> ~ </span><input type="date" name="" value="">
        </div>
    </div>
    <div class="searchLine cf">
        <div class="boxW col-3 search">
            <p>작업장</p>
            <div class="popW">
                <input type="text">
                <a class="popBt" onclick="openPopup1()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <input type="text">
        </div>
        <div class="boxW col-3 search">
            <p>검사품번</p>
            <div class="popW">
                <input type="text">
                <a class="popBt" onclick="openPopup2()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
            </div>
            <input type="text">
        </div>
        <div class="boxW col-3 select"><p>검사구분</p><select><option>ALL</option></select></div>
    </div>
</div>

<div style="position: relative">
    <div id="chart_div" class="chart" style=""></div>
</div>


<div class="contWrap scrollWrap">
  <div id="grid01" style="width: 100%;"></div>
</div>


<script type="text/javascript" src="/include/js/quality/inpct_rslt_staus.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
    google.charts.load('current', {'packages':['corechart']});https://jsfiddle.net/api/post/library/pure/#
    google.charts.setOnLoadCallback(drawVisualization);

    function drawVisualization() {
    // Some raw data (not necessarily accurate)
    var data = google.visualization.arrayToDataTable([
    ['day', 'Bolivia', 'min', 'mid', 'max'],
    ['1', ,30,37.5,50],
    ['2', 30 ,30,37.5,50],
    ['3', 37 ,  30,37.5,50],
    ['4', 35 ,  30,37.5,50],
    ['5', 48 ,  30,37.5,50],
    ['6', 52,  30,37.5,50],
    ['7', ,30,37.5,50],
    ['8', ,30,37.5,50],
    ['9', ,30,37.5,50],
    ['10', ,30,37.5,50],
    ['1', ,30,37.5,50],
    ['2', 30 ,30,37.5,50],
    ['3', 37 ,  30,37.5,50],
    ['4', 35 ,  30,37.5,50],
    ['5', 48 ,  30,37.5,50],
    ['6', 52,  30,37.5,50],
    ['7', ,30,37.5,50],
    ['8', ,30,37.5,50],
    ['9', ,30,37.5,50],
    ['10', ,30,37.5,50],
    ['1', ,30,37.5,50],
    ['2', 30 ,30,37.5,50],
    ['3', 37 ,  30,37.5,50],
    ['4', 35 ,  30,37.5,50],
    ['5', 48 ,  30,37.5,50],
    ['6', 52,  30,37.5,50],
    ['7', ,30,37.5,50],
    ['8', ,30,37.5,50],
    ['9', ,30,37.5,50],
    ['10', ,30,37.5,50],
    ]);

    var options = {
        title : '',
        width: '100%',
        height: '500',
        vAxis: {
            title: 'Value',
            minValue: 0,
            maxValue: 60,
            titleTextStyle: {color: '#636363'},
            gridlines: { color: '#d9d9d9', count: 5},
            viewWindowMode: 'explicit',
            viewWindow: {
                max: 60,
                min: 0
            }
        },
        hAxis: {
            title: 'Date',
            titleTextStyle: {color: '#636363'},
        },
        seriesType: 'scatter',
        series: {
            1: {type: 'line', color: '#00cc00'},
            2: {type: 'line', color: '#0000ff'},
            3: {type: 'line', color: '#ff0000'}
        },
        chartArea: {'width':'85%', 'height': '75%', 'top': '30'}
    };

    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
    }



    </script>
