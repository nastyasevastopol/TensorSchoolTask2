class Student {
    constructor(params) {
       this.fullName = params.fullName;
       this.university = params.university;
       this.course = params.course;
       this.birthDate = params.birthDate;
       this.photoUrl = params.photoUrl;
    }
    /**
    * Функция для преобразования даты рождения в строку
    *  
    * @returns (string) строку в формате "Дата рождения Месяц рождения"
    */
    get birthDateStr() {
       let mountsArr = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
       return `${this.birthDate.getDate()} ${mountsArr[this.birthDate.getMonth()]}`;
    }
    /**
    * Функция для вывода возраста на основе даты рождения
    *  
    * @returns (number) количество полных лет на сегодняшний день
    */
    get age() {
        let today = new Date();
        let age = today.getFullYear() - this.birthDate.getFullYear();
        let m = today.getMonth() - this.birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
            age--;
        }
        return age;
    }
    /**
    * Функция для вывода информации об образовании
    *  
    * @returns (string) строку в формате "Университет Курс"
    */
    get educationStr() {
        return this.university + ", " + this.course + " курс";
    }
    /**
    * Функция для формирования верстки по this
    *  
    * @returns () сформированный элемент DOM
    */
    render() {
        let newDiv = document.createElement("div");
        newDiv.className="column";
        
        let divImg = document.createElement("img");
            divImg.className = "column__photo";
            divImg.src = this.photoUrl;
            divImg.alt = "Фото" + this.fullName;
        
        let divTitle = document.createElement("div");
            divTitle.className = "column__title";
            divTitle.textContent = this.fullName;

        let divSubTitle = document.createElement("div");
            divSubTitle.className = "column__subtitle";
            divSubTitle.textContent = this.educationStr;
        
            // Формирует верстку скрытого элемента
        let divHiddenWindow = document.createElement("div");
            divHiddenWindow.className ="info-window";

                let closeBtn = document.createElement("img");
                closeBtn.src = "../img/close.png";
                closeBtn.alt = "кнопка закрыть окно";
                closeBtn.className ="info-window__close-button";

                let container = document.createElement("div");  //контейнер для данных
                container.className ="info-window__container";
                    let infoData = document.createElement("div");
                    infoData.className ="info-window__data";
                        let infoTitle = document.createElement("div");
                        infoTitle.textContent = this.fullName;
                        infoTitle.className = "info-window__title";
                    
                        let studentData = document.createElement("div");
                        studentData.className = "info-window__text";
                        let subtitle1 = document.createElement("div");
                        subtitle1.textContent = "День Рождения";
                        subtitle1.className = "info-window__subtitle";
                        let subtitle2 = document.createElement("div");
                        subtitle2.textContent = "Учится";
                        subtitle2.className = "info-window__subtitle";
                        let birthDateDiv = document.createElement("div");
                        birthDateDiv.textContent = this.birthDateStr +", "+ this.age + " лет";
                        birthDateDiv.className = "info-window__information";
                        let educationDiv = document.createElement("div");
                        educationDiv.textContent = this.educationStr;
                        educationDiv.className = "info-window__information";
                        studentData.append(subtitle1,subtitle2,birthDateDiv,educationDiv);
                    infoData.append(infoTitle,studentData);     
                    let infoPhoto = document.createElement("img");
                        infoPhoto.className ="info-window__photo";
                        infoPhoto.src = this.photoUrl;
                        infoPhoto.alt = "Фото" + this.fullName;
                    container.append(infoData,infoPhoto);
            divHiddenWindow.append(closeBtn,container);

        newDiv.append(divImg,divTitle,divSubTitle,divHiddenWindow);
        return newDiv;
    }
    /**
    * Функция для добавленния элемента в дерево DOM и подписания его на клики событий (открытие и закрытие окна)
    */
    appendToDOM() {
        const layout = this.render();
        document.getElementById("list").appendChild(layout);
        let studentBlock = document.getElementById("list").lastElementChild;
        studentBlock.addEventListener('click', (event) => {
            openCard(studentBlock, event.currentTarget); 
        });
        let buttons = document.querySelectorAll('.info-window__close-button');
        for (let index = 0; index < buttons.length; index++) {
            let button = buttons[index];
            button.addEventListener('click', (event) => {
                closeCard(button.parentNode, event.currentTarget); 
            });
        }
    }
}
/**
 * Функция для отображения вложенного элемента по клику
 * @param {object} student - блок, часть которого надо показать
 * @param {object} currentTarget - элемент, на котором произошло событие
 */
function openCard(student, currentTarget){
    student.lastElementChild.classList.add('info-window_active');
}
/**
 * Функция для отображения вложенного элемента по клику
 * @param {object} closeBlock - блок, который нужно скрыть
 * @param {object} currentTarget - элемент, на котором произошло событие
 */
function closeCard(closeBlock, currentTarget){
    closeBlock.classList.remove("info-window_active");
    event.stopPropagation();
}

const studentArr = [
    {
        fullName: 'Миша Иванов',
        university: 'УГАТУ',
        course: 2,
        birthDate: new Date(2000, 11, 12),
        photoUrl: '../img/ava01.jpg'
    },
    {
        fullName: 'Маша Петрова',
        university: 'СурГУ',
        course: 3,
        birthDate: new Date(1995, 1, 2),
        photoUrl: '../img/ava02.jpg'
    },
    {
        fullName: 'Марата Сидорова',
        university: 'БГУ',
        course: 4,
        birthDate: new Date(1996, 10, 29),
        photoUrl: '../img/ava03.jpg'
    },
    {
        fullName: 'Петя Сидоров',
        university: 'СевГУ',
        course: 2,
        birthDate: new Date(1989, 1, 30),
        photoUrl: '../img/ava04.jpg'
    },
    {
        fullName: 'Настя Архипова',
        university: 'СевГУ',
        course: 3,
        birthDate: new Date(1995, 2, 15),
        photoUrl: '../img/ava05.jpg'
    },
    {
        fullName: 'Иннокентий Римский-Корсаков',
        university: 'БГУ',
        course: 4,
        birthDate: new Date(1998, 10, 17),
        photoUrl: '../img/ava06.jpg'
    }
 ];
 
 studentArr.forEach((item) => {
    let student = new Student(item);
    student.appendToDOM();
});

