$(function(){

  // get_button();

  $("#init_btn").on("click", function(){
    console.log("init_btn");
  });

  $("#save_btn").on("click", function(){
    var formData = new FormData();
    formData.append("post", $("#btn_form").serialize());
    formData.append("btn_id", $("input[name=btn_id]").val());
    formData.append("btn_name", $("input[name=btn_name]").val());
    formData.append("YN", $("input:checkbox[name=YN]").is(":checked"));
    formData.append("btn_detail", $("textarea[name=btn_detail]").val());
    formData.append("btn_img", $("input[name=button_img]")[0].files[0]);
    $.ajax({
      url:'/ajax/save/button/',
      type:'post',
      data: formData,
      processData: false,
      contentType: false,
      dataType:'json',
      success:function(data){
        console.log(data);
        if (!data.result) {
          alert(data.msg);
        }else{
          let d = new Date();
          $(".footBar > p").text(data.msg+"("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")");
          // get_menus();
        }
      }
    });
  });

  $("#search_img").on("click", function(){
    console.log("search_img");
    $("input[name=button_img]").trigger("click");
  });



});


function get_buttons(param){
  $.ajax({
      url:'/ajax/get/buttons/'+param,
      type:'get',
      dataType:'json',
      success:function(data){
        console.log(data);
        // for (var i = 0; i < data.length; i++) {
        //   data[i].img =
        // }

        grid_data = data.data;
        grid.resetData(grid_data);
      }
  });
}

// ###################################### TOAST GRID START #################################### //

var Grid = tui.Grid;



const grid = new Grid({
  el: document.getElementById('grid'), // 컨테이너 엘리먼트
  columns: [
  // ...,
  ],
  // ...,
});

grid.setColumns([
  {
  header: 'NO',
  name: 'id'
  },
  {
  header: 'BUTTON ID',
  name: 'btn_id',
  editor: 'text'
  },
  {
  header: 'BUTTON NAME',
  name: 'btn_nm',
  editor: 'text'
  },
  {
  header: 'BUTTON IMAGE',
  name: 'btn_img',
  editor: 'text'
  },
  {
  header: 'USE YN',
  name: 'use_yn',
  editor: 'checkbox'
  }
]);

var grid_data = [
  {
  id: '10012',
  btn_id: 'Seoul',
  btn_nm: 'South Korea',
  btn_img: 'img path',
  use_yn: 'Y'
  },
  {
  id: '10013',
  btn_id: 'Tokyo',
  btn_nm: 'Japan',
  btn_img: 'img path',
  use_yn: 'Y'
  },
  {
  id: '10014',
  btn_id: 'London',
  btn_nm: 'England',
  btn_img: 'img path',
  use_yn: 'Y'
  },
  {
  id: '10015',
  btn_id: 'Ljubljana',
  btn_nm: 'Slovenia',
  btn_img: 'img path',
  use_yn: 'Y'
  },
  {
  id: '10016',
  btn_id: 'Reykjavik',
  btn_nm: 'Iceland',
  btn_img: 'img path',
  use_yn: 'Y'
  }
];

grid.resetData(grid_data);

// ###################################### TOAST GRID END #################################### //
