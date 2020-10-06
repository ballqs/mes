<style media="screen">
    .half {width: calc(50% - 5px); height: 100%;}
    .scrollWrap {height: calc(100% - 165px);}
    .heightHalf {height: calc(50% - 5px);}
    #grid01,#grid02,#grid03 {width: 100%; height: 100%;}

    .contWrap .Hnav li a {color: #333;}
    .contWrap .Hnav li a i {color: #333;}
</style>
<form id="search_frm">
    <div class="contWrap cf">
        <div class="select">
            <p>공장</p>
            <select name="fact_cd"></select>
            <i class="fa fa-caret-down"></i>
        </div>
        <div class="Search popW">
            <p>모품번</p><input type="text" name="mprt_nbr">
            <a class="popBt" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
        </div>
        <div class="Search">
            <input type="text" name="" value="">
        </div>
    </div>
</form>

<div class="scrollWrap" >
    <div class="contWrap fl half" style="margin-bottom:0;">
        <div id="grid01"></div>
    </div>

    <div class="fl half ml_10">
        <div class="contWrap heightHalf">
            <h4 class="contTitle" >BOM 전개</h4>
            <div id="grid" style="width: 100%; height: 400px;"></div>
<!--            <ul class="Hnav">-->
<!--                <li>-->
<!--                    <a>MENU 01 <i class="fa fa-angle-down"></i></a>-->
<!--                    <ul class="sub_Hnav">-->
<!--                        <li><a>sub 01</a></li>-->
<!--                        <li><a>sub 02</a></li>-->
<!--                        <li><a>sub 03</a></li>-->
<!--                    </ul>-->
<!--                </li>-->
<!--                <li><a>MENU 02 <i class="fa fa-angle-down"></i></a></li>-->
<!--                <li><a>MENU 03 <i class="fa fa-angle-down"></i></a></li>-->
<!--                <li><a>MENU 04 <i class="fa fa-angle-down"></i></a></li>-->
<!--                <li><a>MENU 05 <i class="fa fa-angle-down"></i></a></li>-->
<!--            </ul>-->
        </div>

        <div class="contWrap heightHalf" style="margin-bottom:0;">
            <h4 class="contTitle">자 품목 정보</h4>
            <div>
                <div class="Search cf popW">
                    <p>자품번</p>
                    <input type="text" name="" value="">
                    <a class="popBt" onclick="openPopup()"><i class="far fa-window-restore" style="color: #363c4f;"></i></a>
                </div>
                <div class="Search">
                    <input type="text" name="" value="">
                </div>
            </div>
            <div>
                <div class="Search mt_10" style="margin-right: 0;">
                    <p>소요량</p>
                    <input type="text" name="" value="">
                </div>
                <div class="select" style="margin-right: 0;">
                    <select class="" name="" style="width: 100px;">
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <i class="fa fa-caret-down"></i>
                </div>
                <a class="mainBt">수정</a>
            </div>

        </div>
    </div>
</div>

<script type="module" src="/include/js/base/standard/bom_mgt.js"></script>
<script type="text/javascript">

    $(function () {
        $('#grid').w2grid({
            name: 'grid',
            columns: [
                { field: 'pgm_nm', caption: 'pgm_nm', size: '30%' },
                { field: 'pgm_ordr', caption: 'pgm_ordr', size: '30%' },
                { field: 'pgm_id', caption: 'pgm_id', size: '40%' },
                { field: 'up_pgm_id', caption: 'up_pgm_id', size: '90px' }
            ],
        });
    });
</script>