

class PageManager
{
    constructor()
    {
        this.on_load                    = new Function();
        this.on_button_search           = new Function();
        this.on_button_init             = new Function();
        this.on_button_add              = new Function();
        this.on_button_del              = new Function();
        this.on_button_save             = new Function();
        this.on_button_excel_download   = new Function();
        $("#hBtnB0001").on("click", this.on_button_search            );     //조회
        $("#hBtnB0002").on("click", this.on_button_init              );     //초기화
        $("#hBtnB0003").on("click", this.on_button_add               );     //추가
        $("#hBtnB0004").on("click", this.on_button_del               );     //삭제
        $("#hBtnB0005").on("click", this.on_button_save              );     //저장
        $("#hBtnB0006").on("click", this.on_button_excel_download    );     //엑셀다운
    }
    //event
}

var pageManager = new PageManager();

pageManager.OnLoad = function ()
{
    console.log("this:",this);
};

$(function ()
{
    pageManager.OnLoad();
});