import {PersonFactory, Component} from './componentsLib.js'; 

export class School extends Component{
    constructor() {
        super();
        this.schoolList = [];
        this.personFactory = new PersonFactory();
    }
    /**
     * Открытие карточки человека если он был найден
     */
    openStudentCard(){
        let fullName = document.getElementById('input-fullname').value;
        let student = this.findStudent(fullName);
        if (student){
            student.openCard(document.getElementById(student.fullName));
        }
        else {
            alert("Человек с введенными Вами ФИО отсутствует в списках");
        }
    }
    /**
     * Добавление людей в школу
     * @param {Object} params объект со всеми полями будущего студента или преподавателя 
     * @returns {String} - строку об успешном зачислении студента или учителя
     */
    enroll(params) {
        let studentOrTeacher = this.personFactory.create(params.type, params);
        this.schoolList.push(studentOrTeacher);
        return `${studentOrTeacher.type} по имени ${studentOrTeacher.fullName} зачислен`;
    }
    /**
     * удаление человека
     *  @returns {Object} - сам объект школы уже без удаленного человека
     */
    drop() {
        let fullName = document.getElementById('input-fullname').value;
        let dropIndex = this.schoolList.findIndex((student) => student.fullName === fullName); 
        if (dropIndex > -1) {
            this.schoolList[dropIndex].unmount();
            this.schoolList.splice(dropIndex,1);
        }
        else {
            alert("Человек с введенными Вами ФИО отсутствует в списках");
        }
        return this;
    }
    /**
     * Поиск человека по фамилии в массиве всех людей
     * @param {String} fullName фамилия человека для поиска
     * @returns {Object} - объект человека которого нашли или undefined(если нет)
     */
    findStudent(fullName) {
        return this.schoolList.find((student) => student.fullName === fullName); 
    }
    render(){
        return `<div>
                    <form class="form-edit-students">
                        <p class="form-edit-students__string">
                            <label class="form-edit-students__label" for="input-fullname">Для поиска или удаления введите ФИО</label>
                            <input class="form-edit-students__input" id="input-fullname" type = "text" placeholder="Введите ФИО человека">
                        </p>
                        <p class="form-edit-students__string">
                            <input class="form-edit-students__button" type = "button" id="delete-button" name="delete-button" value="Отчислить/Уволить">
                            <input class="form-edit-students__button" type = "button" id="find-button" name="find-button" value="Найти">
                        </p>
                    </form>
                    <div id="students-list" class="list">
                    </div>
                    <div id="teachers-list" class="list">
                        <div class="teachers-list__title title">Учителя</div>
                    </div>
                </div>`;
    }
    mount(container,position){
        super.mount(container, position);
        this.schoolList.forEach((item) => {
            switch(item.type) {
                case 'student':
                    item.mount(container.querySelector('#students-list'),'beforeend');
                    break;
                case 'teacher': 
                    item.mount(container.querySelector('#teachers-list'),'beforeend');
                    break;
            }
        });
    }
    /**
     *  в данном случае - добавляет обработчики по клику на кнопку поиска человека и удаления
     */
    afterMount(){
        let findButton = this.container.querySelector('#find-button');
        findButton.addEventListener('click', (event) => {
            this.openStudentCard(); 
        });
        let dropButton = this.container.querySelector('#delete-button');
        dropButton.addEventListener('click', (event) => {
            this.drop(); 
        });
        
    }
}