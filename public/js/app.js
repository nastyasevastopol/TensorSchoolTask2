import {Component, Header, School} from './componentsLib.js';
import {DataSet} from './dataSet.js'; 
class View extends Component{
    constructor(container){
        super(container);
        this.container = container;
        this.page = 1;
        this.limit = 6;
        this.header = new Header( {
            title: 'Tensor School',
            description: 'Это страница школы Тензор в городе Уфа. Тут вы можете познакомиться с нашими учениками и посмотреть темы занятий.'  
        });
        this.dataset = new DataSet({
            object: 'person',
        });
        this.school = new School();
    }
    /**
     * Функция отображения текущей страницы людей из БД
     */
    async displayPage(){
        let list1 =  await this.dataset.list(this.page, this.limit);
        if (list1.length>0){ 
                this.school.update(list1);
            }
        else //если после текущей страницы уже ничего нет
            this.page--; //останемся на текущей странице
    }
    render(){
        return `<div>
                    <!--__________________________________________________________________________________________________________________________________________ -->
                    <!-- ДАЛЬШЕ ФОРМА ПОИСКА И УДАЛЕНИЯ ЛЮДЕЙ -->
                    <!--__________________________________________________________________________________________________________________________________________ -->
                    <form class="form-edit-students">
                        <p class="form-edit-students__string form-string">
                            <label class="form-edit-students__label form-label" for="input-fullname">Для поиска на странице введите ФИО</label>
                            <input class="form-edit-students__input form-input" id="input-fullname" type = "text" placeholder="Введите ФИО человека">
                        </p>
                        <p class="form-edit-students__string form-string">
                            <input class="form-edit-students__button form-button" type = "button" id="delete-button" name="delete-button" value="Отчислить/Уволить">
                            <input class="form-edit-students__button form-button" type = "button" id="find-button" name="find-button" value="Найти">
                            <input class="form-edit-students__button form-button" type = "button" id="add-button" name="add-button" value="Добавить человека">
                        </p>
                    </form>  
                    <!--__________________________________________________________________________________________________________________________________________ -->
                    <!-- В container БУДЕМ ВСТАВЛЯТЬ СПИСОК ЛЮДЕЙ -->
                    <!--__________________________________________________________________________________________________________________________________________ -->
                    <div id="container"></div>
                    <!--__________________________________________________________________________________________________________________________________________ -->
                    <!-- ДАЛЬШЕ КНОПКИ ДЛЯ ЛИСТАНИЯ СТРАНИЦ -->
                    <!--__________________________________________________________________________________________________________________________________________ -->

                    <div class = "page-buttons">
                            <img class = "page-buttons__item page-button__item_prev" id="prev-page" src="../img/page-button.png" alt="предыдущая страница" id = "prev-page"/>
                            <img class = "page-buttons__item " id="next-page" src="../img/page-button.png" alt="следующая страница" id = "next-page"/>
                    </div>   
                    <!--__________________________________________________________________________________________________________________________________________ -->
                    <!-- ДАЛЬШЕ ФОРМА ДЛЯ ДОБАВЛЕНИЯ ЛЮДЕЙ -->
                    <!--__________________________________________________________________________________________________________________________________________ -->

                    <div id="form-add-person__block" class="form-add-person__block_disabled">
                        <div class="b-popup"> 
                            <form id="form-add-person" class="form-add-person">
                                <p class="form-add-person__string">
                                    <label class="form-add-person__label form-label" for="input-add-fullname">Введите ФИО</label>
                                    <input class="form-add-person__input form-input" id="input-add-fullname" type = "text" placeholder="Введите ФИО человека">
                                </p>
                                <p class="form-add-person__string">
                                    <label class="form-add-person__label form-label" for="input-ID">Введите ID</label>
                                    <input class="form-add-person__input form-input" id="input-ID" type = "text" placeholder="Введите ID человека">
                                </p>
                                <p class="form-add-person__string">
                                    <label class="form-add-person__label form-label" for="select-type">Выберите тип</label>
                                    <select id="select-type" class="form-select" size="1">        
                                        <option value="teacher" selected>Учитель</option>
                                        <option value="student">Студент</option>
                                    </select>
                                </p>
                                <p class="form-add-person__string">
                                    <label class="form-add-person__label form-label" for="input-university">Введите университет</label>
                                    <input class="form-add-person__input form-input" id="input-university" type = "text" placeholder="Введите университет">
                                </p>
                                <p class="form-add-person__string">
                                    <label class="form-add-person__label form-label" for="input-exp-or-course">Введите опыт или курс(число)</label>
                                    <input class="form-add-person__input form-input" id="input-exp-or-course" type = "text" placeholder="Опыт или курс(число)">
                                </p>
                                <p class="form-add-person__string">
                                    <label class="form-add-person__label form-label" for="input-birthDate">Введите дату рождения (в формате ГГГГ, ММ, ДД)</label>
                                    <input class="form-add-person__input form-input" id="input-birthDate" type = "text" placeholder="1998, 10, 2">
                                </p>
                                <p class="form-add-person__string">
                                    <input class="form-add-person__button form-button" type = "submit" id="add-person-button" name="add-person-button" value="Добавить">
                                    <input class="form-add-person__button form-button" type = "button" id="add-person-cancel" name="add-person-cancel" value="Отмена">
                                </p>
                            </form>   
                        </div>     
                    </div>         
                </div>`;    
    }

    /**
     * Функция-прехук до монтирования страницы в DOM, считывает данные из БД для монтирования текущей страницы элементов
     */
    async beforeMount(){
        let list =  await this.dataset.list(this.page, this.limit);
        list.forEach((item) => {
            this.school.enroll(item);
        });
    }

    /**
     * Функция-прехук монтирования страницы в DOM
     */
    async mount(){
        await this.beforeMount();
        this.header.mount(this.container,'afterbegin');
        // this.popupAddPerson.mount(this.container,'beforeend');
        super.mount(this.container,'beforeend');
        this.school.mount(this.container.querySelector('#container'),'beforeend');
        this.afterMount();
    }

    /**
     * Функция-прехук добавления обработчиков на все необходимые кнопки после монтирования страницы в DOM
     */
    afterMount(){
        let findButton = this.container.querySelector('#find-button');
        findButton.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            this.findOnCurrentPage(); 
        });
        let dropButton = this.container.querySelector('#delete-button');
        dropButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.dropPerson();
            });
        let addButton = this.container.querySelector('#add-button');
        addButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.container.querySelector('#form-add-person__block').classList.remove('form-add-person__block_disabled');
            });
        let buttonprev = this.container.querySelector('#prev-page');
        buttonprev.addEventListener('click', (event) => {
            if (this.page>=2) {
                this.page--;
                event.stopImmediatePropagation();
                this.displayPage();
            }
        });
        let buttonnext = this.container.querySelector('#next-page');
        buttonnext.addEventListener('click', (event) => {
                this.page++;
                event.stopImmediatePropagation();
                this.displayPage();
        });
        //____________________________________________________________________________________________________________
        let buttonAddPerson = this.container.querySelector('#add-person-button');
            buttonAddPerson.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopImmediatePropagation();
                let data = {
                    type: 'student',
                    fullName: 'Миша Иванов',
                    university: 'УГАТУ',
                    course: 2,
                    birthDate: '2000, 11, 12',
                    photoUrl: '../img/ava01.jpg'
                }
                // var selind = this.container.querySelector('#select-type").options.selectedIndex;
                if (this.container.querySelector('#select-type').options[1].selected==true){
                    data = {
                        id: this.container.querySelector('#input-ID').value || 1,
                        type: this.container.querySelector('#select-type').value,
                        fullName: this.container.querySelector('#input-add-fullname').value || '',
                        university: this.container.querySelector('#input-university').value || '',
                        course: this.container.querySelector('#input-exp-or-course').value || '',
                        birthDate: this.container.querySelector('#input-birthDate').value || '',
                        photoUrl: '../img/ava0.jfif'
                    };  
                }
                else {
                    data = {
                        id: `${this.container.querySelector('#input-ID').value || 1}`,
                        type: `${this.container.querySelector('#select-type').value}`,
                        fullName: `${this.container.querySelector('#input-add-fullname').value || ''}`,
                        university: `${this.container.querySelector('#input-university').value || ''}`,
                        experience: `${this.container.querySelector('#input-exp-or-course').value || ''}`,
                        birthDate: `${this.container.querySelector('#input-birthDate').value || ''}`,
                        photoUrl: '../img/ava0.jfif'
                    };
                    
                }
                this.dataset.create(data);
                this.displayPage();
                this.container.querySelector('#form-add-person__block').classList.add('form-add-person__block_disabled');
                this.container.querySelectorAll('.form-input').forEach(el=>el.value = '');
        });
        let buttonCancelAddPerson = this.container.querySelector('#add-person-cancel');
            buttonCancelAddPerson.addEventListener('click', (event) => {
                event.stopImmediatePropagation();
                this.container.querySelector('#form-add-person__block').classList.add('form-add-person__block_disabled');
                this.container.querySelectorAll('.form-input').forEach(el=>el.value = '');
        });
    }

    /**
     * удаление человека со страницы и из БД
     */
    dropPerson(){
        let fullNameForDelete = this.container.querySelector('#input-fullname').value;
        let idForDelete = this.school.drop(fullNameForDelete);
        this.dataset.delete(idForDelete);
        this.displayPage(this.page, this.limit);
    }
    /**
     * удаление человека на текущей странице (не глобальный поиск, ищет только среди отображенных элементов)
     */
    findOnCurrentPage(){
        let fullNameForFind = this.container.querySelector('#input-fullname').value;
        this.school.openStudentCard(fullNameForFind);
    }
}


let view = new View(document.getElementById('wrapper'));
view.mount();
