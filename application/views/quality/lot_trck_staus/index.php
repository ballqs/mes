<style media="screen">
  #grid1 {width: 100%; height: 100%;}
  #w2ui-popup .w2ui-box {height: 790px !important;}
  .scrollWrap {height: calc(50% - 96px);}
</style>

<form id="search_frm">
    <div class="searchWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-3 select">
                <p>공장</p>
                <select name="fact_cd">
                    <option value="winp01">윈플러스01</option>
                    <option value="winp02">윈플러스02</option>
                </select>
            </div>
            <div class="boxW col-3 search">
                <p>일자</p>
                <input type="date" name="" value=""><span> ~ </span><input type="date" name="" value="">
            </div>
            <div class="boxW col-3 search">
                <p>작업장</p>
                <div class="popW">
                    <input type="text">
                    <a class="popBt" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text">
            </div>
        </div>
        <div class="searchLine cf">
            <div class="boxW col-3 select cf">
                <p>주야구분</p>
                <select class="" name="">
                    <option value="">ALL</option>
                </select>
            </div>
            <div class="boxW col-3 search popW">
                <p>품번</p>
                <div class="popW">
                    <input type="text">
                    <a class="popBt" onclick="open_pop_prt_nbr_cd()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <input type="text">
            </div>
            <div class="boxW col-3 search">
                <p>Lot No</p>
                <input type="text">
            </div>
        </div>
    </div>
</form>

<div class="contWrap scrollWrap mb_10">
    <div id="grid1"></div>
</div>
<div class="contWrap scrollWrap">
    <table class="Table">
        <thead>
            <tr>
                <th>NO</th>
                <th>일자</th>
                <th hidden>공정코드</th>
                <th>공정</th>
                <th hidden>품번코드</th>
                <th>품번</th>
                <th>규격</th>
                <th>제품 제조 LOT</th>
                <th>생산수량</th>
                <th>투입공장</th>
                <th hidden>투입품번코드</th>
                <th>투입품번</th>
                <th>투입품번규격</th>
                <th>자재 입고 LOT</th>
                <th>투입수량</th>
                <th>지시번호</th>
                <th>일시</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>2020-04-23</td>
                <td hidden>SC01</td>
                <td>SHAFT 도금</td>
                <td hidden>SC200128D044</td>
                <td>SC200128D044</td>
                <td>20</td>
                <td>45943-3B001-1-HH</td>
                <td>176</td>
                <td>[WJ01]원진테크(주)</td>
                <td hidden>45943-3B001-1-HH</td>
                <td>SHAFT 고주파열처리</td>
                <td>6D20012D005</td>
                <td>176</td>
                <td>SC200128D044</td>
                <td>더모모스</td>
                <td>2020-04-23 15:45:35</td>
            </tr>
        </tbody>
    </table>
    <ul>
        <li>
            <table class="treeTable">
                <tbody>
                    <tr>
                        <td>ㄴ</td>
                        <td>1</td>
                        <td>2020-04-23</td>
                        <td>SC01</td>
                        <td>SHAFT 도금</td>
                        <td>SC200128D044</td>
                        <td>SC200128D044</td>
                        <td>20</td>
                        <td>45943-3B001-1-HH</td>
                        <td>176</td>
                        <td>[WJ01]원진테크(주)</td>
                        <td>45943-3B001-1-HH</td>
                        <td>SHAFT 고주파열처리</td>
                        <td>6D20012D005</td>
                        <td>176</td>
                        <td>SC200128D044</td>
                        <td>더모모스</td>
                        <td>2020-04-23 15:45:35</td>
                    </tr>
                    <tr>
                        <td style="padding:5px 0 5px 10px;">ㄴ</td>
                        <td>1</td>
                        <td>2020-04-23</td>
                        <td>SC01</td>
                        <td>SHAFT 도금</td>
                        <td>SC200128D044</td>
                        <td>SC200128D044</td>
                        <td>20</td>
                        <td>45943-3B001-1-HH</td>
                        <td>176</td>
                        <td>[WJ01]원진테크(주)</td>
                        <td>45943-3B001-1-HH</td>
                        <td>SHAFT 고주파열처리</td>
                        <td>6D20012D005</td>
                        <td>176</td>
                        <td>SC200128D044</td>
                        <td>더모모스</td>
                        <td>2020-04-23 15:45:35</td>
                    </tr>
                </tbody>
            </table>
        </li>
    </ul>
</div>

<script type="text/javascript" src="/include/js/popups/pop_prt_nbr_cd.js"></script>
<script type="text/javascript" src="/include/js/quality/lot_trck_staus.js"></script>
