$(function(){
    // var keyEvent = function (e) {
    //     if (e.keyCode == 116) {
    //         e.preventDefault();
    //         w2confirm({
    //             msg : '정말로 새로고침을 하시겠습니까?',
    //             attrs : 'size=6'
    //         })
    //             .yes(function () {
    //                 console.log('user clicked YES');
    //                 history.go(0);
    //             })
    //             .no(function () {
    //                 console.log("user clicked NO")
    //             });
    //     }
    // };
    // window.addEventListener('keydown', keyEvent);
    $(window).bind('beforeunload',function(){
        return 'are you sure you want to leave?';
    });





    // function refresh() {
    //     var cookies = document.cookie.split(';');
    //     for (var i = 0; i < cookies.length; i++) {
    //         var cookie = cookies[i];
    //         var eqPos = cookie.indexOf("=");
    //         var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    //     }
    //
    //     let urls = $(".tab_pane iframe");
    //     let texts = $(".tab1_tab_title");
    //     for(let i=0; i<urls.length; i++){
    //         let src = urls[i].attributes['src']["value"];
    //         let text = texts[i].innerText;
    //         document.cookie = "tab"+i+"="+src+",text"+i+"="+text;
    //     }
    //     console.log(document.cookie);
    //     history.go(0);
    // }
    // var cookies = document.cookie.split(';');
    // if(cookies.length > 0){
    //     for(let i = 0; i < cookies.length; i++){
    //         cookies[i] = cookies[i].trim();
    //         let datalist = cookies[i].split(",");
    //         let url = datalist[0].split("=");
    //         url = url[1].substring(1,url[1].length);
    //         let text = datalist[1].split("=");
    //         text = text[1];
    //         navTree.open_tab(text,url);
    //     }
    // }
});