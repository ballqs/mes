<style media="screen">
    #grid01 {width: 100%; height: 100%;}
    .scrollWrap {height: calc(100% - 165px);}

</style>

<h1 style="font-size: 22px;">없어질 페이지~~~~~~~~~~~~~~~~~~~</h1>
<h1 style="font-size: 22px;">헷갈려하지말아요~~~</h1>
<br>
<br>
<br>
<br>
<br>
<br>

<div class="contWrap cf">
    <div class="select">
        <p>사업장코드</p>
        <select>
            <option value="">선택</option>
            <option value="">더모모스</option>
            <option value="">BNHLAB</option>
        </select>
        <i class="fa fa-caret-down"></i>
    </div>
    <div class="Search">
        <p>부서코드</p>
        <input type="text" name="" value="">
    </div>
</div>

<div class="contWrap scrollWrap">
    <div id="grid01"></div>
</div>

<script type="text/javascript">
$(function () {
    $('#grid01').w2grid({
        name: 'grid01',
        show: {
            toolbar: false,
            footer: false,
            toolbarSave: false
        },
        columns: [
            { field: 'recid', caption: 'NO<i class="fa fa-sort" aria-hidden="true"></i>', size: '50px', sortable: true, resizable: true, render: 'number' },
            { field: 'chk', caption: '선택', size: '50px', sortable: true, style: 'text-align: center',
                editable: { type: 'checkbox' }
            },
            { field: 'cmpny_cd', caption: '사업장코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'cmpny_nm', caption: '사업장명<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'dept_cd', caption: '부서코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true },
            { field: 'dept_nm', caption: '부서명<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'up_dept_cd', caption: '상위부서코드<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text'}
            },
            { field: 'use_yn', caption: '사용여부', size: '20', sortable: true, resizable: true, size: '100px',
                editable: { type: 'checkbox', style: 'text-align: center' }
            },
            { field: 'remark', caption: '비고<i class="fa fa-sort" aria-hidden="true"></i>', size: '200px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            { field: 'inst_id', caption: '입력자 ID<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text'}
            },
            { field: 'inst_dt', caption: '입력일시<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'date' }
            },
            { field: 'updt_id', caption: '수정자 ID<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'text'}
            },
            { field: 'updt_dt', caption: '수정일시<i class="fa fa-sort" aria-hidden="true"></i>', size: '100px', sortable: true, resizable: true,
                editable: { type: 'date' }
            }
        ],
        toolbar: {
            items: [
                { id: 'add', type: 'button', caption: 'Add Record', icon: 'w2ui-icon-plus' }
            ],
            onClick: function (event) {
                if (event.target == 'add') {
                    w2ui.grid.add({ recid: w2ui.grid.records.length + 1 });
                }
            }
        },
        records: [
            { recid: 1, cmpny_cd:'M9932', dept_cd: 'M00003', dept_nm: '(주)더모모스',up_dept_cd:'M001',remark: 'dddddd', use_yn: true, inst_id: 'admin', inst_dt:'10/21/2020', updt_id: 'admin',  updt_dt: '10/21/2020', chk: true}
        ]
    });
});

function showChanged() {
    console.log(w2ui['grid01'].getChanges());
    w2alert('Changed records are displayed in the console');
}
</script>
