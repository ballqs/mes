let config = {
    layout: {
        name: 'popup_layout',
        padding: 4,
        panels: [{ type: 'left', size: '100%', resizable: true}]
    },
    grid: {
        name: 'popup_grid',
        columns: [
            { field: 'recid', caption: 'NO' , size: '50px', sortable: true, resizable: true, render: 'number',},
            { field: 'fact_cd', caption: '공장코드' , size: '150px', sortable: true, resizable: true, hidden: true },
            { field: 'fact_nm', caption: '공장명' , size: '200px', sortable: true, resizable: true, hidden: true },
            { field: 'prt_nbr_cd', caption: '품번코드' , size: '150px', sortable: true, resizable: true },
            { field: 'prt_nbr_nm', caption: '품번명' , size: '200px', sortable: true, resizable: true},
            { field: 'spec', caption: '규격' , size: '150px', sortable: true, resizable: true },
            { field: 'account_type', caption: '계정유형' , size: '150px', sortable: true, resizable: true },
            { field: 'account_type_nm', caption: '계정유형명' , size: '150px', sortable: true, resizable: true }
        ],
        records: [
            { recid: 1, fact_cd: 'John', fact_nm: 'Doe', prt_nbr_cd: 'jdoe@gmail.com', prt_nbr_nm: '4/3/2012'},
        ],
        onClick: function(event) {
            event.onComplete = (event)=> {
                let clicked_record = this.records[event.recid - 1];
                //this.clear();
                w2popup.close();
                callbackfunc(clicked_record);
            }
        }
    }
};
class PopUp
{
    static list = {};
    static get List(){return this.list;}

}

let obj = {};
obj.config = config;
obj.show = function(){ console.log(this)};
obj.callback = ()=>{console.log(this)};
PopUp.List.ptr_nbr_cd = obj;

PopUp.List.ptr_nbr_cd.show();
