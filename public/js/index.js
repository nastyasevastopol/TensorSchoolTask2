const templateCard = document.querySelector('.template-card').content;
const infoCard = document.querySelector('.template-info-window').content;
const mountsArr = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

class Person {
    constructor(params) {
       this.fullName = params.fullName;
       this.university = params.university;
       this.birthDate = params.birthDate;
       this.photoUrl = params.photoUrl;
       this.type = 'person';
    }
    get birthDateStr() {
       return `${this.birthDate.getDate()} ${mountsArr[this.birthDate.getMonth()]}`;
    }
    get age() {
        let today = new Date();
        let age = today.getFullYear() - this.birthDate.getFullYear();
        let m = today.getMonth() - this.birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
            age--;
        }
        return age;
    }
    render() {
        let newDiv = templateCard.cloneNode(true);
        let hiddenDiv = infoCard.cloneNode(true);
        newDiv.getElementById('student').id = this.fullName;
        newDiv.querySelector('.column__photo').setAttribute("src", this.photoUrl);
        newDiv.querySelector('.column__photo').alt = "Фото" + this.fullName;
        newDiv.querySelector('.column__title').textContent = this.fullName;
        hiddenDiv.querySelector('.info-window__title').textContent = this.fullName;
        hiddenDiv.querySelector('.info-window__information').textContent = this.birthDateStr +", "+ this.age + " лет";
        hiddenDiv.querySelector('.info-window__photo').setAttribute("src", this.photoUrl);
        hiddenDiv.querySelector('.info-window__information_education').textContent = this.educationStr;
        newDiv.querySelector('.column').appendChild(hiddenDiv);
        return newDiv;
    }
    appendToDOM(parentID) {
        const layout = this.render();
        document.getElementById(parentID).appendChild(layout);
        let studentBlock = document.getElementById(parentID).lastElementChild;
        studentBlock.addEventListener('click', (event) => {
            this.openCard(studentBlock); 
        });
        let buttons = document.querySelectorAll('.info-window__close-button');
        for (let index = 0; index < buttons.length; index++) {
            let button = buttons[index];
            button.addEventListener('click', (event) => {
                this.closeCard(button.parentNode); 
            });
        }
    }
    deleteFromDOM(){
        document.getElementById(this.fullName).remove();
    }
    openCard(student){
        document.querySelectorAll('.info-window').forEach((el) => el.classList.remove('info-window_active')); 
        student.lastElementChild.classList.add('info-window_active');
        if (student.offsetLeft > document.documentElement.clientWidth/2){
            student.lastElementChild.classList.add('info-window_active-right');
        }
        // currentTarget.querySelector('.info-window').classList.add('info-window_active'); 
    }
    closeCard(closeBlock){
        closeBlock.classList.remove("info-window_active");
        event.stopPropagation();
    }
}

class Student extends Person{
    constructor(params) {
       super(params);
       this.course = params.course;
       this.type = 'student';
    }
    get educationStr() {
        return this.university + ", " + this.course + " курс";
    }
    render() {
        let newDiv = super.render();
        newDiv.querySelector('.column__subtitle').textContent = this.educationStr;
        return newDiv;
    }
}

class Teacher extends Person{
    constructor(params) {
       super(params);
       this.experience = params.experience;
       this.type = 'teacher';
    }
    get experienceStr() {
        return "Опыт " + this.experience + " года";
    }
    render() {
        let newDiv = super.render();
        newDiv.querySelector('.info-window__subtitle_education').textContent = "Работает";
        newDiv.querySelector('.info-window__information_education').textContent = this.experienceStr;
        newDiv.querySelector('.column__subtitle').textContent = this.experienceStr;
        return newDiv;
    }
}

class PersonFactory {
    create(type, fullName, university, birthDate, photoUrl, courseOrExperience) {
        switch(type) {
            case 'student':
                let course = courseOrExperience;
                return new Student({fullName, university, birthDate, photoUrl, course});
            case 'teacher': 
                let experience = courseOrExperience;
                return new Teacher({fullName, university, birthDate, photoUrl, experience});
            default: 
                return new Person({fullName});
        }
    }
}

class SchoolList {
    constructor (){
        this.list = [];
    }
    add(person) {
        this.list.push(person);
    }
}

class School {
    constructor() {
        this.school = new SchoolList();
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
    enroll(type, fullName, university, birthDate, photoUrl, courseOrExperience) {
        let studentOrTeacher = this.personFactory.create(type, fullName, university, birthDate, photoUrl, courseOrExperience);
        this.school.add(studentOrTeacher);
        return `${studentOrTeacher.type} по имени ${studentOrTeacher.fullName} зачислен`;
    }
    drop() {
        let fullName = document.getElementById('input-fullname').value;
        let dropIndex = this.school.list.findIndex((student) => student.fullName === fullName); 
        if (dropIndex > -1) {
            this.school.list[dropIndex].deleteFromDOM();
            this.school.list.splice(dropIndex,1);
        }
        else {
            alert("Человек с введенными Вами ФИО отсутствует в списках");
        }
        return this.school;
    }
    findStudent(fullName) {
        return this.school.list.find((student) => student.fullName === fullName); 
    }
}

const ourSchool = new School();
    ourSchool.enroll('student', 'Марата Сидорова', 'БГУ', new Date(1996, 10, 29), '../img/ava03.jpg', 4);
    ourSchool.enroll('student', 'Маша Петрова','УГАТУ',  new Date(1995, 1, 2),'../img/ava02.jpg', 3);
    ourSchool.enroll('student', 'Миша Иванов','СурГУ', new Date(2000, 11, 12),'../img/ava01.jpg', 3);
    ourSchool.enroll('teacher', 'Петя Сидоров', 'СевГУ', new Date(1989, 1, 30),'../img/ava04.jpg', 2);
    ourSchool.enroll('teacher', 'Настя Архипова', 'СевГУ', new Date(1995, 2, 15),'../img/ava05.jpg', 1);
    ourSchool.enroll('teacher', 'Иннокентий Римский-Корсаков', 'БГУ', new Date(1998, 10, 17),'../img/ava06.jpg', 3);
    
ourSchool.school.list.forEach((item) => {
    switch(item.type) {
        case 'student':
            item.appendToDOM("students-list");
            break;
        case 'teacher': 
            item.appendToDOM("teachers-list");
            break;
    }
});

