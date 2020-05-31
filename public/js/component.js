export class Component {
    'use strict';
    constructor(options){
        this.options = options;
        this.container = undefined;
    }
    /**
     * Создание внешнего вида компонента
     *  @returns {string} - строку с html-кодом компонента
     */
    render(){
        return '<div></div>';
    }
    /**
     * помещает верстку компонента в dom
     * @param {DOMElement} container контейнер в котором строиться верстка, куда поместить
     * @param {String} position insertAdjacentElement позиция куда помесить, до, в, вконец, после
     */
    mount(container, position){
        const newComponent = document.createElement('div');
        newComponent.innerHTML = this.render(this.options);
        this.container = newComponent.firstElementChild;
        container.insertAdjacentElement(position || 'beforeend', newComponent.firstElementChild);
        newComponent.remove();
        this.afterMount(container);
    }
    update(){
    }
    /**
     * Уничтожение компонента из dom
     */
    unmount(){
        this.removeContainer();
    }
    afterMount(){
    }
    /**
     * Уничтожает контейнер из dom и обнуляет ссылку на него
     */
    removeContainer(){
        if (this.container) {
            this.container.remove();
            this.container = undefined;
        }
    }
}