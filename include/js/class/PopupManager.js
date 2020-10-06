class PopupManager {
    static #list = {};
    static get (){return this.#list;}
    static RegisterPopup(register_name, popup_class_instance)
    {
        PopupManager[register_name] = popup_class_instance;
    }
}

