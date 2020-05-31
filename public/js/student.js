import {Person} from './componentsLib.js';
export class Student extends Person{
    constructor(options) {
       super(options);
       this.course = options.course || '';
       this.type = 'student';
    }
    /**
     * функция-getter образования
     * @returns {string} - возвращает строку информации об образовании в формате "Университет курс лет", например "СевГУ 2 курс"
     */
    get educationStr() {
        if ((!this.university)&&(!this.course)){
            return '';
        }
        else {
            return (this.university ||'') + ", " + (this.course ||'') + " курс";
        }
    }
    render(item) {
        return super.render(item).replace('ВУЗ Курс', `${this.educationStr}`);
    }
}


