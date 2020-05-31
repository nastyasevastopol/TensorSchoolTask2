
const ourSchool = new School(); 
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
    },
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

peopleArr.forEach((item) => {
    ourSchool.enroll(item);
});
ourSchool.appendToDom();

// const ourSchool = new School();
//     ourSchool.enroll('student', 'Марата Сидорова', 'БГУ', new Date(1996, 10, 29), '../img/ava03.jpg', 4);
//     ourSchool.enroll('student', 'Маша Петрова','УГАТУ',  new Date(1995, 1, 2),'../img/ava02.jpg', 3);
//     ourSchool.enroll('student', 'Миша Иванов','СурГУ', new Date(2000, 11, 12),'../img/ava01.jpg', 3);
//     ourSchool.enroll('teacher', 'Петя Сидоров', 'СевГУ', new Date(1989, 1, 30),'../img/ava04.jpg', 2);
//     ourSchool.enroll('teacher', 'Настя Архипова', 'СевГУ', new Date(1995, 2, 15),'../img/ava05.jpg', 1);
//     ourSchool.enroll('teacher', 'Иннокентий Римский-Корсаков', 'БГУ', new Date(1998, 10, 17),'../img/ava06.jpg', 3);
//     ourSchool.appendToDom();