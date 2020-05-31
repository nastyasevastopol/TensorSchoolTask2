import {Component, Header, School} from './componentsLib.js';

import {DataSet} from './dataSet.js'; 
// import {Model} from './model.js'; 
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
            // model: Model
        });
        this.school = new School();
    }
    async displayPage(){
        let list1 =  await this.dataset.list(this.page, this.limit);
        if (list1.length>0){
                this.school.update(list1);
            }
        else
            this.page--;
    }
    render(){
        return `<div>
                    <form class="form-edit-students">
                        <p class="form-edit-students__string">
                            <label class="form-edit-students__label" for="input-fullname">Для поиска введите ФИО</label>
                            <input class="form-edit-students__input" id="input-fullname" type = "text" placeholder="Введите ФИО человека">
                        </p>
                        <p class="form-edit-students__string">
                            <input class="form-edit-students__button" type = "button" id="delete-button" name="delete-button" value="Отчислить/Уволить">
                            <input class="form-edit-students__button" type = "button" id="find-button" name="find-button" value="Найти">
                        </p>
                    </form>  
                    <div id="container"></div>
                    <div class = "page-buttons">
                            <img class = "page-buttons__item page-button__item_prev" id="prev-page" src="../img/page-button.png" alt="предыдущая страница" id = "prev-page"/>
                            <img class = "page-buttons__item " id="next-page" src="../img/page-button.png" alt="следующая страница" id = "next-page"/>
                    </div>                  
                </div>`;    
    }

    async beforeMount(page, limit){
        let list =  await this.dataset.list(page, limit);
        list.forEach((item) => {
            this.school.enroll(item);
        });
    }

    async mount(){
        await this.beforeMount(1,6);
        this.header.mount(this.container,'afterbegin');
        super.mount(this.container,'beforeend');
        this.school.mount(this.container.querySelector('#container'),'beforeend');
        this.afterMount();
    }

    afterMount(){
        let findButton = this.container.querySelector('#find-button');
        findButton.addEventListener('click', (event) => {
            // this.openStudentCard(); 
        });
        let dropButton = this.container.querySelector('#delete-button');
        dropButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.dropPerson();
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
            // console.log(this.school.amountOfDataSetPages);
            // if (this.page<this.school.amountOfDataSetPages) {
                this.page++;
                event.stopImmediatePropagation();
                this.displayPage();
        });
    }
    dropPerson(){
        let fullNameForDelete = this.container.querySelector('#input-fullname').value;
        let idForDelete = this.school.drop(fullNameForDelete);
        this.dataset.delete(idForDelete);
        this.displayPage(this.page, this.limit);
        this.amountOfPeople--; //спорно
    }
}
let view = new View(document.getElementById('wrapper'));
view.mount();


// import { response } from 'express';
// import {DataSet} from './dataSet.js'; 
// import {Model} from './model.js'; 
// const peopleArr = [
//     {
//         type: 'student',
//         fullName: 'Миша Иванов',
//         university: 'УГАТУ',
//         course: 2,
//         birthDate: new Date(2000, 11, 12),
//         photoUrl: '../img/ava01.jpg'
//     },
//     {
//         type: 'student',
//         fullName: 'Маша Петрова',
//         university: 'СурГУ',
//         course: 3,
//         birthDate: new Date(1995, 1, 2),
//         photoUrl: '../img/ava02.jpg'
//     },
//     {
//         type: 'student',
//         fullName: 'Марата Сидорова',
//         university: 'БГУ',
//         course: 4,
//         birthDate: new Date(1996, 10, 29),
//         photoUrl: '../img/ava03.jpg'
//     }
//     ,
//     {
//         type: 'teacher',
//         fullName: 'Петя Сидоров',
//         university: 'СевГУ',
//         experience: 2,
//         birthDate: new Date(1989, 1, 30),
//         photoUrl: '../img/ava04.jpg'
//     },
//     {
//         type: 'teacher',
//         fullName: 'Настя Архипова',
//         university: 'СевГУ',
//         experience: 3,
//         birthDate: new Date(1995, 2, 15),
//         photoUrl: '../img/ava05.jpg'
//     },
//     {
//         type: 'teacher',
//         fullName: 'Иннокентий Римский-Корсаков',
//         university: 'БГУ',
//         experience: 4,
//         birthDate: new Date(1998, 10, 17),
//         photoUrl: '../img/ava06.jpg'
//     }
// ];
//  let personModel = new Model({
//         type: 'student',
//         fullName: 'Миша Иванов',
//         university: 'УГАТУ',
//         course: 2,
//         birthDate: new Date(2000, 11, 12),
//         photoUrl: '../img/ava01.jpg'
//  });
// let dataset = new DataSet({
//     object: 'person',
//     model: Model
// });

// {
//     "person": [
//       {
//         "id": "1",
//         "type": "student",
//         "fullName": "Миша Иванов",
//         "university": "УГАТУ",
//         "course": "2",
//         "birthDate": "2000,11,12",
//         "photoUrl": "../img/ava01.jpg"
//       },
//       {
//         "id": "3",
//         "type": "student",
//         "fullName": "Марата Сидорова",
//         "university": "БГУ",
//         "course": "4",
//         "birthDate": "1996,10,29",
//         "photoUrl": "../img/ava03.jpg"
//       },
//       {
//         "id": "5",
//         "type": "teacher",
//         "fullName": "Настя Архипова",
//         "university": "СевГУ",
//         "experience": "3",
//         "birthDate": "1995, 2, 15",
//         "photoUrl": "../img/ava05.jpg"
//       },
//       {
//         "id": "6",
//         "type": "teacher",
//         "fullName": "Иннокентий Римский-Корсаков",
//         "university": "БГУ",
//         "experience": "4",
//         "birthDate": "1998, 10, 17",
//         "photoUrl": "../img/ava06.jpg"
//       },
//       {
//         "id": "2",
//         "type": "student",
//         "fullName": "Капа Пипинов",
//         "university": "УГАСТУ",
//         "course": "4",
//         "birthDate": "1998,11,12",
//         "photoUrl": "../img/ava04.jpg"
//       },
//       {
//         "id": "4",
//         "type": "student",
//         "fullName": "Митя Митинова",
//         "university": "БГУ",
//         "course": "4",
//         "birthDate": "1995,11,12",
//         "photoUrl": "../img/ava02.jpg"
//       },
//       {
//         "id": "7",
//         "type": "teacher",
//         "fullName": "Станя Астенова",
//         "university": "КФУ",
//         "experience": "3",
//         "birthDate": "1992, 1, 10",
//         "photoUrl": "../img/ava05.jpg"
//       },
//       {
//         "id": "8",
//         "type": "teacher",
//         "fullName": "Сисентий Свинский-Скостанов",
//         "university": "ФГУ",
//         "experience": "4",
//         "birthDate": "1997, 10, 17",
//         "photoUrl": "../img/ava01.jpg"
//       }
//     ]
//   }