<style media="screen">
    .scrollWrap {height: calc(100% - 106px);}
    #grid01 {width: 100%; height:100%;}
    label {display: inline-block; vertical-align: middle; margin-left: 3px;}
</style>

<form id="search_frm">
    <div class="searchWrap scrollWrap cf">
        <div class="searchLine cf">
            <div class="boxW col-4 select">
                <p>공장</p>
                <select name="fact_cd">
                </select>
            </div>
            <div class="boxW col-4 search">
                <p>재고마감</p>
                <input type="text" name="stockdeadline" value="" READONLY>
            </div>
        </div>
    </div>
</form>
<script type="module" src="/include/js/stock/stck_mon_fnsh_mgt.js"></script>
