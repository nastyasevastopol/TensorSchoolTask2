import {Student} from './student.js';
import {Teacher} from './teacher.js';
export class PersonFactory {
        create(type, params) {
            switch(type) {
                case 'student':
                    return new Student(params);
                case 'teacher': 
                    return new Teacher(params);
            }
        }
    }