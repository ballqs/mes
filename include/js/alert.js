window['alert'] = function(msg){    
	if( document.getElementById("alert") == null ){ 
		// var cw = parseInt(document.documentElement.clientWidth); 
		// var ch = parseInt(document.documentElement.clientHeight); 

		// var _top = ch/2 - 50; 
		// var _left = cw/2 - 150; 

		var div = document.createElement('div'); 
		div.id = "alert"; 
		div.style.width = "100%"; 
		div.style.height = "100%"; 
		// div.style.border = "5px solid #f00"; 
		// div.style.fontSize = "9pt"; 
		// div.style.zIndex = "100"; 
		// div.style.position = "absolute"; 
		// div.style.background = "#fff";
		// div.style.opacity = "0.5";
		// div.style.top = _top +"px"; 
		// div.style.left = _left +"px"; 
		var layout = '';
		// layout = '<div style="text-align: center; margin-top: 20px; position: relative;" id="alert-msg">' + msg + '</div>'; 
		// layout += '<div style="text-align: center; margin-top: 10px; bottom: 10px; position: absolute; width: 100%;">';
		// layout += "<a href=\"javascript:void(document.getElementById('alert').style.display='none');\">[close]</a></div>"; 
		
		layout += '<div class="errorWrap">';
		layout += '	<div class="text_r mr_10 mt_10">';
		layout += "	  <a href=\"javascript:void(document.getElementById('errorCode').style.display='')\"><i class='fa fa-exclamation-circle' aria-hidden='true'></i></a>";
		layout += '	</div>';
		layout += '	<div class="text_c">';
		layout += '	  <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>';
		layout += '	  <div class="ib waningText mb_30">';
		layout += '		<h1>오류가 발생했습니다.</h1>';
		layout += '		<h1>다시 시도해주세요.</h1>';
		layout += '	  </div>';
		layout += '	</div>';
		// layout += '	<div class="errorCode" id="errorCode" style="display:none;">';
		layout += '	<div class="errorCode" id="errorCode">';
		layout += '	  <ul>';
		layout += msg;
		layout += '	  </ul>';
		layout += '	</div>';
		layout += '	<div class="text_c">';
		layout += "   <a class='errorBt' href=\"javascript:void(document.getElementById('alert').style.display='none');\">확인</a>"; 
		layout += '	</div>';
		layout += '</div>';
		
		div.innerHTML = layout; 
		document.body.appendChild(div); 
		// console.log(div);
		// document.write(div);

	}else{ 
		// var cw = parseInt(document.documentElement.clientWidth); 
		// var ch = parseInt(document.documentElement.clientHeight); 

		// var _top = ch/2 - 50; 
		// var _left = cw/2 - 150; 

		var div = document.getElementById("alert"); 
		// div.style.top = _top +"px"; 
		// div.style.left = _left +"px"; 

		// document.getElementById("alert-msg").innerHTML = msg; 
		// document.getElementById("alert-msg").innerHTML = '<li>'+msg+'</li>'; 
		document.getElementById("alert").style.display = ""; 
	}
}; 
 