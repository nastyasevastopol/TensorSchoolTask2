import {Person} from './person.js';
export class Teacher extends Person{
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