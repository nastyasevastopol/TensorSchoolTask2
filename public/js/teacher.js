import {Person} from './componentsLib.js';
export class Teacher extends Person{
    constructor(options) {
       super(options);
       this.experience = options.experience;
       this.type = 'teacher';
    }
    /**
     * функция-getter опыта
     * @returns {string} - возвращает строку информации об опыте в формате "Опыт количество лет лет", например "Опыт 2 года"
     */
    get experienceStr() {
        return "Опыт " + this.experience + " года";
    }
    render() {
        return super.render().replace('ВУЗ Курс', `${this.experienceStr}`);
    }
}