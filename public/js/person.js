const templateCard = document.querySelector('.template-card').content;
const infoCard = document.querySelector('.template-info-window').content;
const mountsArr = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

export class Person {
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