$(function(){

});

function menu_detail(data){
  var html = "";
  html += "<option value='MES'>최상위메뉴</option>";
  data.pgm_id_list = make_menu(data.pgm_id_list);
  for (let i = 0; i < data.pgm_id_list.length; i++) {
    if (data.pgm_id_list[i].pgm_gbm == "M") {
      html += "<option value='"+data.pgm_id_list[i].pgm_id+"'>"+data.pgm_id_list[i].pgm_id+"</option>";
    }
  }
  $("select[name=up_pgm_id]").html(html);

  $("input[name=pgm_id]").val(data.pgm_id);
  $("input[name=pgm_nm]").val(data.pgm_nm);
  $("select[name=pgm_gbm]").val(data.pgm_gbm).prop("selected", true);
  $("input[name=pgm_ordr]").val(data.pgm_ordr);
  $("input[name=remark]").val(data.remark);
  $("input[name=url]").val(data.url);
  $("select[name=prc_gbm]").val(data.prc_gbm).prop("selected", true);
  $("select[name=up_pgm_id]").val(data.up_pgm_id).prop("selected", true);
  $("input[name=use_yn]").prop("checked", data.use_yn == 'Y' ? true : false);
}

// 한개 사라지는 현상 찾아야 함 OR 쿼리로 해결.
function make_menu(data){
  var menu = new Array();

  var sort_menu = function (menu_list, parent, children, depth){
    if (children.length <= 0) {
      return;
    }
    if(parent.pgm_gbm == "M"){  // parent가 메뉴일 경우 menu에 children 추가,
      let current_arr = new Object();
      for (let j = 0; j < children.length; j++) {

        if (parent.pgm_id == children[j].up_pgm_id) { // parent.pgm_id == children.up_pgm_id 면 children[j] 추가
          current_arr = children.splice(j--, 1)[0];

          current_arr.depth = depth + 1;
          menu_list.push(current_arr);
          if (current_arr.pgm_gbm == "M" && children.length != 0) { // _children에 추가된 children.pgm_gbm == "M" 이면 이 함수 다시 호출
            sort_menu(menu_list, current_arr, children, depth + 1);
          }
        }
      }
    }
  }

  for (let i=0; i < data.length; i++) {
    if(data[i].up_pgm_id == "MES"){
      data[i].depth = 0;
      menu.push(data.splice(i--, 1)[0]);
    }
  }

  var menu_list = new Array();
  for (let i = 0; i < menu.length; i++) {
    menu_list.push(menu[i])
    sort_menu(menu_list, menu[i], data, menu[i].depth);
  }
  return menu_list;
}

// 메뉴 관리페이지용
function draw_menu(menu_set, target_el, class_name){ // 메뉴 array, 타겟 요소, ul 클래스명)
  let html = "";
  let depth = 0;
  for (let i = 0; i < menu_set.length; i++) {
    if (depth < menu_set[i].depth) {  // 이전 배열 보다 depth가 깊으면 ul 열기
      html += '<ul class="' + class_name + '">';
    }else if (depth > menu_set[i].depth) {  // 이전 배열보다 depth가 얕으면 차이만큼 ul 닫기
      for (let j = 0; j < (depth - menu_set[i].depth); j++) {
        html += '</ul></li>';
      }
    }else if (i != 0){
      html += "</li>";
    }
    html += "<li><a onclick='menu_select(this)' id='" + menu_set[i].pgm_id + "_" + menu_set[i].up_pgm_id + "_" + menu_set[i].pgm_gbm + "'>" + menu_set[i].pgm_nm + "</a>" + " (" + menu_set[i].pgm_id + ")";
    depth = menu_set[i].depth;
  }
  html += "</li>";
  $(target_el).html(html);
}

function menu_select(obj){
  var id = obj.id.split('_')[0];
  get_pgm_info(id);
}

function get_pgm_info(pgm_id){
  $.ajax({
      url:'/ajax/get/pgm_info/'+pgm_id,
      type:'get',
      dataType:'json',
      success:function(data){
        get_pgm_id_list(pgm_id, data[0]);
      },
  });
}

function get_pgm_id_list(pgm_id, pgm_info){
  $.ajax({
      url:'/ajax/get/up_pgm_id_list/'+pgm_id,
      type:'get',
      dataType:'json',
      success:function(data){
        pgm_info.pgm_id_list = [];
        pgm_info.pgm_id_list = data;
        menu_detail(pgm_info);
      }
  });
}



// function get_menus(){
//   $.ajax({
//     url:'/ajax/get/up_pgm_id_list/',
//     type:'get',
//     dataType:'json',
//     success:function(data){
//       //console.log(data, 'data');
//       let menu_set = make_menu(data, false);
//       draw_menu(menu_set, "#tree_menu", "subList mt_5");
//       // draw_main_menu(menu_set, "#side_menu", "sub_Hnav");
// //      $(".action").parent().addClass('visible');
// //      $(".action").parent().prev().trigger("click");
//     }
//   });
// }

// 하위 메뉴 토글(보임/안보임) 함수
function menu_tgl(obj){
  if ($("#"+obj.id).siblings(".sub_Hnav").hasClass("visible")) {
    $("#"+obj.id).siblings(".sub_Hnav").removeClass('visible');
  }else{
    $("#"+obj.id).siblings(".sub_Hnav").addClass('visible');
  }
}
