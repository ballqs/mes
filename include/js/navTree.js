class navTree{
    static draw_menu(){
        $.ajax({
            url:'/ajax/get/menu_nav/',
            type:'get',
            dataType:'json',
            success:function(data){
                draw_main_menu(data['data'], "#side_menu", "sub_Hnav");
            },
        });

        // header 의 메인 메뉴용
        function draw_main_menu(menu_set, target_el, class_name){ // 메뉴 array, 타겟 요소, ul 클래스명)
            let path = window.location.pathname
                , html = ""
                , iframe_tag = ""
                , depth = 1
                , is_curr_page = ""
                , click_func = ""
                , drop_down_arrow = ""
                , drop_down_arrow_sub = "";
            for (let i = 0; i < menu_set.length; i++) {
                if (depth < menu_set[i].depth) {
                    html += '<ul class="' + class_name + '">';
                }else if (depth > menu_set[i].depth) {
                    for (let j = 0; j < (depth - menu_set[i].depth); j++) {
                        html += '</ul></li>';
                    }
                }else if (i != 0){
                    html += "</li>";
                }

                /* 페이지 진입시 현재 페이지 표시 부분 구현 필요 */
                if ((path == '/'+menu_set[i].url || path == menu_set[i].url) && menu_set[i].pgm_gbm == 'P') {
                    is_curr_page = " class='action'";
                }else{
                    is_curr_page = "";
                }

                if (menu_set[i].pgm_gbm == 'M') {
                    click_func = "onclick='navTree.menu_tgl(this);'";
                    drop_down_arrow = '<i class="fa fa-angle-down" aria-hidden="true"></i>';
                    drop_down_arrow_sub = '<i class="fas fa-caret-down"></i>';
                }else{
                    // 기존 페이지이동 방식
                    // click_func = "href=/"+menu_set[i].url;

                    // iframe 을 이용한 tab 방식
                    iframe_tag = `<iframe src="/common/usr_mgt" height="500px" width="100%"></iframe>`;
                    click_func = `onclick='navTree.open_tab("${menu_set[i].pgm_nm}", "${menu_set[i].url}")'`;
                    drop_down_arrow = "";
                    drop_down_arrow_sub = "";
                }

                if(menu_set[i].pgm_gbm == 'P'){
                    // drop_down_arrow_sub = '<img src="/uploads/img/common/find.png" style="width: 15px; margin-right: 3px;">';
                    drop_down_arrow_sub = '';
                }else{

                }

                let detach = menu_set[i]['url'].split('/');
                let pgm_gbm = menu_set[i]['pgm_gbm'];

                if(menu_set[i].up_pgm_id == 'MES'){
                    html += "<li" + is_curr_page + "><a "+click_func+" id='nav_" + menu_set[i].pgm_id + "'data-up-pgm-id='" + menu_set[i].up_pgm_id + "' data-pgm-gbm='" + menu_set[i].pgm_gbm + "' target='_blank'>" + menu_set[i].pgm_nm + drop_down_arrow + "</a>";
                }else{
                    if(detach[0] === 'monitoring' && pgm_gbm === 'P'){
                        html += "<li" + is_curr_page + "><a href='/"+menu_set[i]['url']+"' id='nav_" + menu_set[i].pgm_id + "'data-up-pgm-id='" + menu_set[i].up_pgm_id + "' data-pgm-gbm='" + menu_set[i].pgm_gbm + "' target='_blank'>" + drop_down_arrow_sub + menu_set[i].pgm_nm + "</a>";
                    }else{
                        html += "<li" + is_curr_page + "><a "+click_func+" id='nav_" + menu_set[i].pgm_id + "'data-up-pgm-id='" + menu_set[i].up_pgm_id + "' data-pgm-gbm='" + menu_set[i].pgm_gbm + "' target='_blank'>" + drop_down_arrow_sub + menu_set[i].pgm_nm + "</a>";
                    }
                }

                depth = menu_set[i].depth;
            }
            html += "</li>";
            $(target_el).html(html);
            if(location.pathname != "/" && location.pathname != "/password/change"){
                open_curr($(".action"));
            }
        }

        function open_curr(obj){
            obj.parent().addClass('visible');
            if(obj.parent().siblings("a").data("up-pgm-id") != "MES" && obj.parent().siblings("a").data("up-pgm-id") !== undefined) {
                open_curr(obj.parent().parent());
            }
        }
    }

    static open_tab(title, path){
        tab1.addTab(title, `<iframe src='/${path}' height='900px' frameborder='0' width='100%'></iframe>`, "<i class='fas fa-times'></i>");
    }

    static draw_tree(data, p_col, c_col, v_col, target_el, class_name, option, span_option) // tree array, 부모칼럼, 자식칼럼, 보일칼럼, 타겟 ul/ol 요소 ID, ul 클래스명, a tag 에 들어갈 옵션)
    {
        let html = ""
            , depth = 1
            , p_bold = "";
        for (let i = 0; i < data.length; i++)
        {
            if (depth < data[i].depth) // 이전 배열 보다 depth가 깊으면 ul 열기
            {
                html += '<ul class="' + class_name + '" style="display: none;">';
            }
            else if (depth > data[i].depth) // 이전 배열보다 depth가 얕으면 차이만큼 ul 닫기
            {
                for (let j = 0; j < (depth - data[i].depth); j++)
                {
                    html += '</ul></li>';
                }
            }
            else if (i != 0)
            {
                html += "</li>";
            }

            // 자식 요소를 가지고 있다면
            if(i < data.length-1){
                if(data[i+1][p_col] == data[i][c_col]){
                    p_bold = ' <i class="fa fa-angle-down" aria-hidden="true"></i>';
                    // p_bold = ' style="font-weight:bold;" ';
                }else{
                    p_bold = "";
                }
            }

//  	 html += "<li><a " + (option ? option : '') + " id='" + data[i][c_col] + "_" + data[i][p_col] + "' data-row-num='" + i + "' data-p-col='" + data[i][p_col] + "'>"
            html += "<li><a ondblclick='navTree.menu_tgl(this)' onmouseover='navTree.m_over(this)' onmouseout='navTree.m_out(this)'" + (option ? option : '') + " id='" + data[i][c_col] + "' data-row-num='" + i + "' data-p-col='" + data[i][p_col] + "'>"
                + data[i][v_col] + "</a>"
                + " (<span " + (span_option ? span_option : '') + ">" + data[i][c_col] + "</span>)" + p_bold;
            depth = data[i].depth;
        }
        html += "</li>";
        $("#" + target_el).html(html);

    }

    static m_over(obj){
        let type = obj.id.substring(0,1);
        if (type == 'P') {
            $("#"+obj.id).css("background", "#ccc");
        }
    }

    static m_out(obj){
        $("#"+obj.id).css("background", "#fff");
    }

    // 메인 메뉴의 하위 메뉴 토글(보임/안보임) 함수
    static menu_tgl(obj){
        if ($("#"+obj.id).siblings("ul").hasClass("visible")) {
            $("#"+obj.id).siblings("ul").removeClass('visible');
        }else{
            $("#"+obj.id).siblings("ul").addClass('visible');
        }

        // var open = $("#"+obj.id).siblings("ul").height();
        // var elprv = $("#"+obj.id);
        // var el = $("#"+obj.id).siblings("ul"),
        //     curHeight = el.height(),
        //     autoHeight = el.css('height', '100%').height();
        //
        // if( open === 0 ){
        //     el.addClass('visible');
        //     el.height(curHeight).animate({height: autoHeight}, 300);
        //     elprv.css('background','#fff');
        // }else{
        //     el.removeClass('visible');
        //     el.animate({height: 0}, 300);
        //     elprv.css('background','');
        // }
    }

    /**
     * w2ui tree grid 용 함수
     * @param path
     * @param param
     * @param rootId
     * @param parentColumn
     * @param childColumn
     * @param targetGridId
     */
    static draw_w2ui_tree(path, param, rootId, parentColumn, childColumn, targetGridId){
        // navTree.draw_w2ui_tree("/ajax/get/menu_test", "", "MES", "up_pgm_id", "pgm_id", "grid");
        $.ajax({
            url:path,
            data: param,
            type:"get",
            dataType: "json",
            success: function (data) {
                data = common.role_data(data);
                let rootNodes = navTree.make_w2ui_tree_dataset(data, rootId, parentColumn, childColumn);
                w2ui[targetGridId].records = rootNodes;
                w2ui[targetGridId].refresh();
            }
        });
    }

    /**
     * w2ui tree grid 용 데이터 형태로 정렬
     * @param arrayList
     * @param rootId
     * @param parentColumn
     * @param childColumn
     * @returns {[]}
     */
    static make_w2ui_tree_dataset(arrayList, rootId, parentColumn, childColumn){
        arrayList.forEach(function (item, index, array){
            array[index].w2ui = {};
            array[index].w2ui.children = [];
        });

        var rootNodes = [];
        var traverse = function (nodes, item, index) {
            if (nodes instanceof Array) {
                return nodes.some(function (node) {
                    if (node[childColumn] === item[parentColumn]) {
                        node.w2ui.children = node.w2ui.children || [];
                        return node.w2ui.children.push(arrayList.splice(index, 1)[0]);
                    }

                    return traverse(node.w2ui.children, item, index);
                });
            }
        };

        while (arrayList.length > 0) {
            arrayList.some(function (item, index) {
                if (item[parentColumn] === rootId) {
                    return rootNodes.push(arrayList.splice(index, 1)[0]);
                }

                return traverse(rootNodes, item, index);
            });
        }
        return rootNodes;
    }


    // static make_dataset(arrayList, rootId, parentColumn, childColumn){
    //
    //     //트리 변환 메서드
    //     var treeModel = function (arrayList, rootId) {
    //         var rootNodes = [];
    //         var traverse = function (nodes, item, index) {
    //             if (nodes instanceof Array) {
    //                 return nodes.some(function (node) {
    //                     if (node[childColumn] === item[parentColumn]) {
    //                         node.children = node.children || [];
    //                         return node.children.push(arrayList.splice(index, 1)[0]);
    //                     }
    //
    //                     return traverse(node.children, item, index);
    //                 });
    //             }
    //         };
    //
    //         while (arrayList.length > 0) {
    //             arrayList.some(function (item, index) {
    //                 if (item[parentColumn] === rootId) {
    //                     return rootNodes.push(arrayList.splice(index, 1)[0]);
    //                 }
    //
    //                 return traverse(rootNodes, item, index);
    //             });
    //         }
    //
    //         return rootNodes;
    //     };
    //
    //     let tree_data = treeModel(arrayList, rootId);
    //     console.log('tree_data', tree_data);
    //
    //
    // }
}

$(function(){
    $('.content').click(function(){
      $('.content');
    });
});
