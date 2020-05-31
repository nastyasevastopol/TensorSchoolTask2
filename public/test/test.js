import {Student, Teacher, PersonFactory} from '../js/componentsLib.js';
describe("Тестируем компоненты", function() {
    'use strict';
    describe("Тестируем компонент Teacher", function() {
        it('Создание объекта компонента Teacher с пустыми полями', function() {
             // arrange
             let item = 
             {
                type: 'teacher'
             };

            // act
            let teacher = new Teacher(item);

            //assert
            assert(teacher instanceof Teacher);
        });
        it('Создание объекта компонента Teacher с непустыми полями', function() {
            // arrange
            let item = 
            {
                id: '1',
                type: 'teacher',
                fullName: 'Петя Сидоров',
                university: 'СевГУ',
                experience: 2,
                birthDate: '1989, 1, 30',
                photoUrl: '../img/ava04.jpg'
            };
            // act
            let teacher = new Teacher(item);

            //assert
            assert(teacher instanceof Teacher);
        });
        it('Тестируем геттер experienceStr компонента Teacher', function() {
            // arrange
            let item = 
            {
                id: '1',
                type: 'teacher',
                fullName: 'Петя Сидоров',
                university: 'СевГУ',
                experience: 2,
                birthDate: '1989, 1, 30',
                photoUrl: '../img/ava04.jpg'
            };
            
            // act
            let str = "Опыт " + item.experience + " года";
            let teacher = new Teacher(item);

            //assert
            assert.equal(teacher.experienceStr, str);
        })
    });
    describe("Тестируем компонент Student", function() {
        it('Создание объекта компонента Student с непустыми полями', function() {
            // arrange
            let item = 
            {
                id: '1',
                type: 'student',
                fullName: 'Петя Сидоров',
                university: 'СевГУ',
                experience: 2,
                birthDate: '1989, 1, 30',
                photoUrl: '../img/ava04.jpg'
            };
            // act
            let student = new Student(item);

            //assert
            assert(student instanceof Student);
        });
        it('Тестируем геттер age объекта компонента Student, унаследованный от Person', function() {
            // arrange
            let item = 
            {
                id: '1',
                type: 'student',
                fullName: 'Петя Сидоров',
                university: 'СевГУ',
                experience: 2,
                birthDate: '2000, 1, 30',
                photoUrl: '../img/ava04.jpg'
            };
            let student = new Student(item);
            // act
            let age = student.age;

            //assert
            assert.equal(age, 20);
        });
        it('Тестируем геттер birthDateStr объекта компонента Student, унаследованный от Person', function() {
            // arrange
            let item = 
            {
                id: '1',
                type: 'student',
                fullName: 'Петя Сидоров',
                university: 'СевГУ',
                experience: 2,
                birthDate: '2000, 1, 30',
                photoUrl: '../img/ava04.jpg'
            };
            let student = new Student(item);
            // act
            let str = "30 января";

            //assert
            assert.equal(student.birthDateStr, str);
        });
        it('Тестируем геттер educationStr объекта компонента Student', function() {
            // arrange
            let item = 
            {
                type: 'student'
            };
            let student = new Student(item);
            // act
            let str = student.educationStr;
            //assert
            assert.equal(str, '');
        });
    
        it('Тестируем метод render объекта компонента Student', function() {
            // arrange
            let item = 
            {
                id: '1',
                type: 'student',
                fullName: 'Петя Сидоров',
                birthDate: '2000, 1, 30',
                photoUrl: '../img/ava04.jpg'
            };
            let student = new Student(item);
            // let elem = document.createElement('div');
            // act
            let render = student.render();
            let str = `<div class="column" id="${item.fullName}">
            <img class="column__photo" src="${item.photoUrl}" alt="Фото ${item.fullName}">
            <div class="column__title" title="Фамилия Имя">${item.fullName}</div>
            <div class="column__subtitle" title="Образование"></div>
        </div>`;
            //assert
            assert.equal(render.replace(/ /g, ''), str.replace(/ /g, ''));
        });
        it('Тестируем метод mount объекта компонента Student', function() {
            // arrange
            let item = 
            {
                id: '1',
                type: 'student',
                fullName: 'Петя Сидоров',
                birthDate: '2000, 1, 30',
                photoUrl: '../img/ava04.jpg'
            };
            let student = new Student(item);
            let render = student.render();
            let elem = document.createElement('div');
            // act
            student.mount(elem,'beforeend');
            
            //assert
            assert.equal(elem.innerHTML.replace(/ /g, ''), render.replace(/ /g, ''));
        });
        it('Тестируем метод unmount объекта компонента Student', function() {
            // arrange
            let item = 
            {
                id: '1',
                type: 'student',
                fullName: 'Петя Сидоров',
                birthDate: '2000, 1, 30',
                photoUrl: '../img/ava04.jpg'
            };
            let student = new Student(item);
            let render = student.render();
            let elem = document.createElement('div');
            student.mount(elem,'beforeend');
            
            // act
            student.unmount();
            
            //assert
            assert.equal(elem.innerHTML, '');
        });
    });
});
describe("Тестируем фабрику для создания людей", function() {
    'use strict';
    describe("Тестируем метод create фабрики", function() {
        it('Создание объекта студента с помощью фабрики', function() {
            // arrange
            let personFactory = new PersonFactory();
            let item = {
                type: 'student'
            };

            // act
            let student = personFactory.create(item.type, item);

            //assert
            assert(student instanceof Student);
        });
        it('Создание объекта учителя с помощью фабрики', function() {
            // arrange
            let personFactory = new PersonFactory();
            let item = {
                type: 'teacher'
            };

            // act
            let teacher = personFactory.create(item.type, item);

            //assert
            assert(teacher instanceof Teacher);
        });
    });
});

mocha.run();
