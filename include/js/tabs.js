

class Tabs{




    constructor(id, max_tab = 0, active_class = 'on'){
        this.id = id;
        this.max_tab = max_tab;
        this.active_class = active_class;
        this.addFncOnClick(this.active_class);
    }


    addTab(title, html = "", close_icon = "X"){
        let current_tab_cnt = $(`#${this.id} > li`).length;
        // 중복 탭 유무 체크 후 중복 탭 있으면 활성화
        let tabs = $(`.${this.id}_tab_title`);

        for(let i=0;i<tabs.length;i++){
            if(tabs[i].textContent == title){
                $(tabs[i]).click();
                return false;
            }
        }
        // 최대 추가 탭 갯수 체크
        if(this.max_tab != 0 && this.max_tab < current_tab_cnt + 1){
            common.mes_alert({msg : `추가할 수 있는 최대 탭 갯수는 ${this.max_tab}개 입니다.`});
            return false;
        }

        this.addTabTitle(title, close_icon);
        this.addContent(html);
    }

    addTabTitle(title, close_icon = "X"){
        $('.tab_title').removeClass(this.active_class);
        let html = `<li class="tab_title ${this.active_class}">
                        <span class="${this.id}_tab_title">${title}</span>
                        <span class="tab_close_btn ${this.id}_tab_close_btn">${close_icon}</span>
                    </li>`;
        $(`#${this.id}`).append(html);

        let tabs = $(`.${this.id}_tab_title`);

        /*/////////////////////////////////////
        마우스 휠 버튼 닫기
        */////////////////////////////////////
        tabs.mousedown(function (e) {

            if(e.which==2){
                let _idx = $(this).parent().index();
                let id = $(this).parent().parent().attr("id");

                $(`#${id} > li`).eq(_idx).remove();
                $(`#${id}_contents > .tab_pane`).eq(_idx).remove();
            }

        });
       //-----------------------------------------------------------------

    }

    addContent(html = ""){
        $(`#${this.id}_contents > .tab_pane`).css("display", "none");
        let tab_html = `<div class="tab_pane">${html}</div>`;
        $(`#${this.id}_contents`).append(tab_html);
    }

    addFncOnClick(active_class){
        $(`#${this.id}`).delegate(`li > .${this.id}_tab_title`, "click", function(){
            let _idx = $(this).parent().index();
            let id = $(this).parent().parent().attr("id");
            $(`#${id}_contents > .tab_pane`).css("display", "none");
            $(`#${id}_contents > .tab_pane`).eq(_idx).css("display", "");
            $('.tab_title').removeClass(active_class);
            $(this).parent().addClass(active_class);
        });
        $(`#${this.id}`).delegate(`li > .${this.id}_tab_close_btn`, "click", function(){
            let _idx = $(this).parent().index();
            let id = $(this).parent().parent().attr("id");

            $(`#${id} > li`).eq(_idx).remove();
            $(`#${id}_contents > .tab_pane`).eq(_idx).remove();
        });
    }
}
