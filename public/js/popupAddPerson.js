import {Component} from './componentsLib.js';
export class PopupAddPerson extends Component{
    constructor(dataset){
        super();
        this.dataset = dataset;
    }
    render(){
        return `                
            <div>
                <form id="form-add-person" class="form-add-person form-add-person_disabled">
                    <p class="form-add-person__string">
                        <label class="form-edit-students__label form-label" for="input-fullname">Введите ФИО</label>
                        <input class="form-edit-students__input form-input" id="input-fullname" type = "text" placeholder="Введите ФИО человека">
                    </p>
                    <p class="form-add-person__string">
                        <label class="form-add-person__label form-label" for="input-ID">Введите ID</label>
                        <input class="form-add-person__input form-input" id="input-ID" type = "text" placeholder="Введите ID человека">
                    </p>
                    <p class="form-add-person__string">
                    <select id="select-type" size="1">
                        <option value="teacher" selected>Учитель</option>
                        <option value="student">Студент</option>
                        </select>
                    </p>
                    <p class="form-add-person__string">
                        <label class="form-add-person__label form-label" for="input-university">Введите университет</label>
                        <input class="form-add-person__input form-input" id="input-university" type = "text" placeholder="Введите университет">
                    </p>
                    <p class="form-add-person__string">
                        <label class="form-add-person__label form-label" for="input-exp-or-course">Введите опыт или курс(число)</label>
                        <input class="form-add-person__input form-input" id="input-exp-or-course" type = "text" placeholder="Введите опыт или курс(число)">
                    </p>
                    <p class="form-add-person__string">
                        <label class="form-add-person__label form-label" for="input-birthDate">Введите дату рождения (в формате ГГГГ, ММ, ДД)</label>
                        <input class="form-add-person__input form-input" id="input-birthDate" type = "text" placeholder="Дата рождения (в формате ГГГГ, ММ, ДД)">
                    </p>
                    <p class="form-add-person__string">
                        <input class="form-add-person__button form-button" type = "submit" id="add-person-button" name="add-person-button" value="Добавить">
                        <input class="form-add-person__button form-button" type = "button" id="add-person-cancel" name="add-person-cancel" value="Отмена">
                    </p>
                </form>                  
            </div>`;
    }
    // afterMount(dataset){   
    //     let buttonAddPerson = this.container.querySelector('#add-button');
    //         buttonAddPerson.addEventListener('click', (event) => {
    //             event.preventDefault();
    //             event.stopPropagation();
    //             if (this.container.querySelector('#select-type').value=='student'){
    //                 let data = {
    //                     id: this.container.querySelector('#input-ID').value || 1,
    //                     type: this.container.querySelector('#select-type').value,
    //                     fullName: this.container.querySelector('#input-fullname').value || '',
    //                     university: this.container.querySelector('#input-university').value || '',
    //                     course: this.container.querySelector('#input-exp-or-course').value || '',
    //                     birthDate: this.container.querySelector('#input-birthDate').value || '',
    //                     photoUrl: '../img/ava0.jfif'
    //                 };
    //                 dataset.create(data);
    //             }
    //             else {
    //                 let data = {
    //                     id: this.container.querySelector('#input-ID').value || 1,
    //                     type: this.container.querySelector('#select-type').value,
    //                     fullName: this.container.querySelector('#input-fullname').value || '',
    //                     university: this.container.querySelector('#input-university').value || '',
    //                     experience: this.container.querySelector('#input-exp-or-course').value || '',
    //                     birthDate: this.container.querySelector('#input-birthDate').value || '',
    //                     photoUrl: '../img/ava0.jfif'
    //                 };
    //                 dataset.create(data);
    //             }
    //     });
    //     let buttonCancelAddPerson = this.container.querySelector('#add-cancel');
    //         buttonCancelAddPerson.addEventListener('click', (event) => {
    //             // event.preventDefault();
    //             event.stopPropagation();
    //             this.unmount();
    //     });
    // }
}