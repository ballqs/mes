class treeTool
{
    constructor(data, p_col, c_col, t_val, v_col)
    {	// 트리 데이터, 부모 칼럼, 자식 칼럼, 최상위 칼럼 값, 보여줄 칼럼
        this.data = this.w2ui_tree_sort(data, p_col, c_col, t_val);
        this.p_col = p_col;
        this.c_col = c_col;
        this.t_val = t_val;
        this.v_col = v_col;
    }



    draw_menu(target_el, class_name, option) // 타겟 ul/ol 요소 ID, ul 클래스명, a tag 에 들어갈 옵션)
    {
        let html = "";
        let depth = 0;
        for (let i = 0; i < this.data.length; i++)
        {
            if (depth < this.data[i].depth) // 이전 배열 보다 depth가 깊으면 ul 열기
            {
                html += '<ul class="' + class_name + '">';
            }
            else if (depth > this.data[i].depth) // 이전 배열보다 depth가 얕으면 차이만큼 ul 닫기
            {
                for (let j = 0; j < (depth - this.data[i].depth); j++)
                {
                    html += '</ul></li>';
                }
            }
            else if (i != 0)
            {
                html += "</li>";
            }
//  	 html += "<li><a " + (option ? option : '') + " id='" + this.data[i][this.c_col] + "_" + this.data[i][this.p_col] + "' data-row-num='" + i + "' data-p-col='" + this.data[i][this.p_col] + "'>"
            html += "<li><a " + (option ? option : '') + " id='" + this.data[i][this.c_col] + "' data-row-num='" + i + "' data-p-col='" + this.data[i][this.p_col] + "'>"
                + this.data[i][this.v_col] + "</a>"
                + " (<span>" + this.data[i][this.c_col] + "</span>)";
            depth = this.data[i].depth;
        }
        html += "</li>";
        $("#" + target_el).html(html);
    }

    w2ui_tree_sort(data, p_col, c_col, t_val)
    {
        console.log(data, 'data');
        var sort_m = function (menu_list, parent, children, depth, p_col, c_col)
        {
            if (children.length <= 0)
            {
                return;
            }

            let current_arr = new Object();
            for (let j = 0; j < children.length; j++)
            {

                if (parent[c_col] == children[j][p_col])
                { // parent.pgm_id == children.up_pgm_id 면 children[j] 추가
                    current_arr = children.splice(j--, 1)[0];

                    current_arr.depth = depth + 1;
                    menu_list.push(current_arr);
                    if (current_arr.pgm_gbm == "M" && children.length != 0)
                    { // _children에 추가된 children.pgm_gbm == "M" 이면 이 함수 다시 호출
                        sort_m(menu_list, current_arr, children, depth + 1, p_col, c_col);
                    }
                }
            }
        }

        var menu = new Array();
        for (let i = 0; i < data.length; i++)
        {
            if (data[i][p_col] == t_val)
            {
                data[i].depth = 0;
                menu.push(data.splice(i--, 1)[0]);
            }
        }

        var menu_list = new Array();
        for (let i = 0; i < menu.length; i++)
        {
            menu_list.push(menu[i])
            sort_m(menu_list, menu[i], data, menu[i].depth, p_col, c_col);
        }
        return menu_list;
    }


}
