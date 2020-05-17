import {PersonFactory} from './personLib.js'; //возьмем фабрику из библиотеки, не зря же создавали
export class School {
    constructor() {
        this.schoolList = [];
        this.personFactory = new PersonFactory();

        let findButton = document.getElementById('find-button');
        findButton.addEventListener('click', (event) => {
            this.openStudentCard(); 
        });
        let dropButton = document.getElementById('delete-button');
        dropButton.addEventListener('click', (event) => {
            this.drop(); 
        });
 
    }
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
    enroll(params) {
        let studentOrTeacher = this.personFactory.create(params.type, params);
        this.schoolList.push(studentOrTeacher);
        return `${studentOrTeacher.type} по имени ${studentOrTeacher.fullName} зачислен`;
    }
    drop() {
        let fullName = document.getElementById('input-fullname').value;
        let dropIndex = this.schoolList.findIndex((student) => student.fullName === fullName); 
        if (dropIndex > -1) {
            this.schoolList[dropIndex].deleteFromDOM();
            this.schoolList.splice(dropIndex,1);
        }
        else {
            alert("Человек с введенными Вами ФИО отсутствует в списках");
        }
        return this;
    }
    findStudent(fullName) {
        return this.schoolList.find((student) => student.fullName === fullName); 
    }
    appendToDom(){
        this.schoolList.forEach((item) => {
            switch(item.type) {
                case 'student':
                    item.appendToDOM("students-list");
                    break;
                case 'teacher': 
                    item.appendToDOM("teachers-list");
                    break;
            }
        });
    }
}