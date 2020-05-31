import {Component} from './componentsLib.js';
export class Popup extends Component {
    render(){
        switch(this.options.type) {
            case 'student':
                this.strAction = 'Учится';
                break;
            case 'teacher': 
                this.strAction = 'Работает';
                break;
        }
        return `<div class="info-window info-window_active">
                    <img class="info-window__close-button" src="../img/close.png" alt="кнопка закрыть"/>
                    <div class="info-window__container">
                        <div class="info-window__data">
                            <div class="info-window__title">${this.options.fullName}</div>
                            <div class="info-window__row">
                                <p class="info-window__subtitle">День Рождения</p>
                                <p class="info-window__information">${this.options.birthDateStr +", "+ this.options.age + " лет"}</p>
                            </div>
                            <div class="info-window__row">
                                <p class="info-window__subtitle info-window__subtitle_education">${this.strAction}</p>
                                <p class="info-window__information info-window__information_education">${this.options.educationStr || this.options.experienceStr}</p>
                            </div>
                        </div>
                        <img class="info-window__photo" src="${this.options.photoUrl}" alt="Фото ${this.options.fullName}"/>
                    </div>
                </div>`;
    }
    /**
     *  в даннос случае - добавляет обработчик по клику на кнопку закрытия для закрытия карточки человека
     */
    afterMount(parentContainer){   
        let button = this.container.querySelector('.info-window__close-button');
            button.addEventListener('click', (event) => {
                this.unmount();
                event.stopPropagation();
            });
        if (parentContainer.offsetLeft > document.documentElement.clientWidth/2){
            parentContainer.querySelector('.info-window').classList.add('info-window_active-right');
        }
    }
}