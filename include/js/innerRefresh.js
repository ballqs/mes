$(function () {
    document.addEventListener('keydown', keyEvent);
    function keyEvent(e) {
        if (e.keyCode == 116) {
            e.preventDefault();
            history.go(0);
        }
    }
})