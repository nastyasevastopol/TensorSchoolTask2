import {Component, Popup} from './componentsLib.js';
const mountsArr = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

export class Person extends Component{
    static popupStack = [];
    constructor(options) {
       super(options);
       this.id = options.id || 1;
       this.fullName = options.fullName || '';
       this.university = options.university || '';
       this.birthDate = new Date(options.birthDate) || new Date();
       this.photoUrl = options.photoUrl || '';
       this.type = 'person';
       this.popup = undefined;
    }
    /**
     * функция-getter возраста
     * @returns {string} - возвращает строку даты рождения в формате "число месяц", например "1 июня"
     */
    get birthDateStr() {
       return `${this.birthDate.getDate()} ${mountsArr[this.birthDate.getMonth()]}`;
    }
    /**
     * функция-getter возраста
     * @returns {number} - количество полных лет на текущий момент
     */
    get age() {
        let today = new Date();
        let age = today.getFullYear() - this.birthDate.getFullYear() ;
        let m = today.getMonth() - this.birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
            age--;
        }
        return age;
    }
    // setItem(item){
    //     this.options.item = item;//тут было this.options.item = item;
    //     // this.update();
    // }
    // setItemAndMount(item, container, position){
    //     this.options.item = item;//тут было this.options.item = item;
    //     this.mount(container, position);
    // }
    // update(){
    //     this.container.innerHTML = this.render(this.options.item);
    // }
    render() {
        // if (!item) return '<div class="column"></div>';
        return `<div class="column" id="${this.fullName}">
                    <img class="column__photo" src="${this.photoUrl}" alt="Фото ${this.fullName}">
                    <div class="column__title" title="Фамилия Имя">${this.fullName}</div>
                    <div class="column__subtitle" title="Образование">ВУЗ Курс</div>
                </div>`
    }
    /**
     *  в даннос случае - добавляет обработчик по клику на информацию о человеке для открытия карточки
     */
    afterMount(){
        this.container.addEventListener('click', (event) => {
            this.openCard(); 
        });
        
    }
    /**
     * открывает карточку человека, заранее закрывая остальные
     */
    openCard(){
        Person.popupStack.forEach( popup => {
			popup.unmount();
		});
        this.popup = new Popup(this);//передаем не опции, а объект, чтобы можно было обратиться к getterам
        this.popup.mount(this.container, 'beforeend');
        Person.popupStack.push(this.popup);

    }
}

