import {Student, Teacher} from './componentsLib.js';
export class PersonFactory {
    /**
     * Создание людей на фабрике)))
     * @param {String} type тип создаваемого человека
     * @param {Object} options объект со всеми полями будущего студента или преподавателя 
     *  @returns {Object} - объект студента с переданными полями или учителя в зависимости от типа
     */
        create(type, options) {
            switch(type) {
                case 'student':
                    return new Student(options);
                case 'teacher': 
                    return new Teacher(options);
            }
        }
    }