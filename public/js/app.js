import {Header, School} from './componentsLib.js';

let header = new Header( {
    title: 'Tensor School',
    description: 'Это страница школы Тензор в городе Уфа. Тут вы можете познакомиться с нашими учениками и посмотреть темы занятий.'  
});
let school = new School();

const peopleArr = [
    {
        type: 'student',
        fullName: 'Миша Иванов',
        university: 'УГАТУ',
        course: 2,
        birthDate: new Date(2000, 11, 12),
        photoUrl: '../img/ava01.jpg'
    },
    {
        type: 'student',
        fullName: 'Маша Петрова',
        university: 'СурГУ',
        course: 3,
        birthDate: new Date(1995, 1, 2),
        photoUrl: '../img/ava02.jpg'
    },
    {
        type: 'student',
        fullName: 'Марата Сидорова',
        university: 'БГУ',
        course: 4,
        birthDate: new Date(1996, 10, 29),
        photoUrl: '../img/ava03.jpg'
    }
    ,
    {
        type: 'teacher',
        fullName: 'Петя Сидоров',
        university: 'СевГУ',
        experience: 2,
        birthDate: new Date(1989, 1, 30),
        photoUrl: '../img/ava04.jpg'
    },
    {
        type: 'teacher',
        fullName: 'Настя Архипова',
        university: 'СевГУ',
        experience: 3,
        birthDate: new Date(1995, 2, 15),
        photoUrl: '../img/ava05.jpg'
    },
    {
        type: 'teacher',
        fullName: 'Иннокентий Римский-Корсаков',
        university: 'БГУ',
        experience: 4,
        birthDate: new Date(1998, 10, 17),
        photoUrl: '../img/ava06.jpg'
    }
];
header.mount(document.getElementById('wrapper'),'beforeend');

peopleArr.forEach((item) => {
    school.enroll(item);
});

school.mount(document.getElementById('wrapper'),'beforeend');
