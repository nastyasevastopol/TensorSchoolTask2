import {Person} from './person.js';
export class Student extends Person{
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


