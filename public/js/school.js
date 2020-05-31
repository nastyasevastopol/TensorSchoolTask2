import {PersonFactory, Component} from './componentsLib.js'; 


export class School extends Component{
    constructor() { //тут был container
        super();//тут был container
        this.schoolList = [];
        // this.container = container;//options.container;
        
        this.personFactory = new PersonFactory();
    }

    // get amountOfDataSetPages(){
    //     let amount = this.dataset.allPages();
    //     console.log(this.dataset.allPages());
    //     return amount;
    // }

    /**
     * Добавление людей в школу
     * @param {Object} params объект со всеми полями будущего студента или преподавателя 
     * @returns {String} - строку об успешном зачислении студента или учителя
     */
    enroll(params) {
        let studentOrTeacher = this.personFactory.create(params.type, params);
        // studentOrTeacher.setItem(params);
        this.schoolList.push(studentOrTeacher); 
        return `${studentOrTeacher.type} по имени ${studentOrTeacher.fullName} зачислен`;
    }
    /**
     * удаление человека
     *  @returns {Object} - сам объект школы уже без удаленного человека
     */
    drop(fullName) {
        
        let dropIndex = this.schoolList.findIndex((student) => student.fullName === fullName); 
        if (dropIndex > -1) {
            let deleteId = this.schoolList[dropIndex].id
            this.schoolList[dropIndex].unmount();
            this.schoolList.splice(dropIndex,1);
            return deleteId;
            // this.dataset.delete(deleteId);
        }
        else {
            alert("Человек с введенными Вами ФИО отсутствует на этой странице, возможно он находится на другой");
            return -1;
        }
    }
    /**
     * Поиск человека по фамилии в массиве всех людей
     * @param {String} fullName фамилия человека для поиска
     * @returns {Object} - объект человека которого нашли или undefined(если нет)
     */
    findStudent(fullName) {
        return this.schoolList.find((student) => student.fullName === fullName); 
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
            alert("Человек с введенными Вами ФИО отсутствует на этой странице, возможно он находится на другой");
        }
    }
    render(){
        return `<div>
                    <div id="students-list" class="list">
                    </div>
                    
                </div>`;
    }
    mount(container,position){
        super.mount(container, position);
        this.schoolList.forEach((item) => {
            // switch(item.type) {
            //     case 'student':
                    item.mount(container.querySelector('#students-list'),'beforeend');
            //         break;
            //     case 'teacher': 
            //         item.mount(container.querySelector('#teachers-list'),'beforeend');
            //         break;
            // }
        });
    }
    update(list){
        this.schoolList.forEach((item) => {
                item.unmount();
            });
        this.schoolList.splice(0, this.schoolList.length);
        list.forEach((item) => {
            this.enroll(item);
        });
        this.schoolList.forEach((item) => {
            item.mount(this.container.querySelector('#students-list'),'beforeend');
        });
    }
        
    // async displayPage(page, limit = 6){
    //     // let count = count || 6;
    //     let list =  await this.dataset.list(page, limit);
    //     list.forEach((item) => {
    //         this.enroll(item);
            
    //     });
    //     this.mount(this.container, 'beforeend');
    // }


    /**
     *  в данном случае - добавляет обработчики по клику на кнопку поиска человека и удаления
     */
    // afterMount(){
    // }
}