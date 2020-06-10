import {PersonFactory, DataSet} from './componentsLib.js'; 
import React from 'react';// import {Component} from './componentsLib.js';

export class School extends React.Component{
        constructor() { //тут был container
                super();//тут был container
                this.limit = 6;
                this.state = {schoolList : [],
                        page: 1,
                        valueForFindOrDrop: '',
                        formIsVisible: false
                };
                this.personFactory = new PersonFactory();
                this.dataset = new DataSet({
                        object: 'person',
                });
        }
        /**
         * Добавление людей в школу
         * @param {Object} params объект со всеми полями будущего студента или преподавателя 
         * @returns {String} - строку об успешном зачислении студента или учителя
         */
        enroll(params) {
                let studentOrTeacher = this.personFactory.create(params.type, params);
                this.state.schoolList.push(studentOrTeacher); 
                this.setState({schoolList: this.state.schoolList});
        }
        

        componentDidMount() {
                this.dataset.list(this.state.page, this.limit)
                .then((list)=>
                {
                        list.forEach((item) => {
                                this.enroll(item);
                        });
                        return list;
                })
        }
        render(){
                let classNameForm = this.state.formIsVisible ? '': 'form-add-person__block_disabled';
                        return <div>
                                <form className="form-edit-students">
                                                <p className="form-edit-students__string form-string">
                                                        <label className="form-edit-students__label form-label" htmlFor="input-fullname">Для поиска на странице введите ФИО</label>
                                                        <input className="form-edit-students__input form-input" id="input-fullname" type = "text" placeholder="Введите ФИО человека" value={this.state.valueForFindOrDrop} onChange={this.inputFullnameOnChange.bind(this)}/>
                                                </p>
                                                <p className="form-edit-students__string form-string">
                                                        <input className="form-edit-students__button form-button" type = "button" id="delete-button" name="delete-button" value="Отчислить/Уволить" onClick={this.dropPerson.bind(this)}/>
                                                        <input className="form-edit-students__button form-button" type = "button" id="find-button" name="find-button" value="Найти" onClick = {this.findOnCurrentPage.bind(this)}/>
                                                        <input className="form-edit-students__button form-button" type = "button" id="add-button" name="add-button" value="Добавить человека" onClick={this.openFormAdd.bind(this)}/>
                                                </p>
                                        </form> 
                                        <div id="students-list" className="list">
                                                {this.state.schoolList}
                                        </div>
                                        <div className = "page-buttons">
                                                <img className = "page-buttons__item page-button__item_prev" id="prev-page" src="../img/page-button.png" alt="предыдущая страница" onClick ={this.prevPage.bind(this)}/>
                                                <img className = "page-buttons__item " id="next-page" src="../img/page-button.png" alt="следующая страница" onClick = {this.nextPage.bind(this)}/>
                                        </div>  
                                        <div id="form-add-person__block" className={classNameForm}>
                                                <div className="b-popup"> 
                                                <form id="form-add-person" className="form-add-person">
                                                        <p className="form-add-person__string">
                                                                <label className="form-add-person__label form-label" htmlFor="input-add-fullname">Введите ФИО</label>
                                                                <input className="form-add-person__input form-input" id="input-add-fullname" type = "text" placeholder="Введите ФИО человека" value={this.state.appFullName} onChange={this.addForminputFullnameOnChange.bind(this)}/>
                                                        </p>
                                                        <p className="form-add-person__string">
                                                                <label className="form-add-person__label form-label" htmlFor="input-ID">Введите ID</label>
                                                                <input className="form-add-person__input form-input" id="input-ID" type = "text" placeholder="Введите ID человека" value={this.state.appID} onChange={this.addForminputIDOnChange.bind(this)}/>
                                                        </p>
                                                        <p className="form-add-person__string">
                                                                <label className="form-add-person__label form-label" htmlFor="select-type">Выберите тип</label>
                                                                <select id="select-type" className="form-select" size="1" defaultValue="teacher" value={this.state.addFormSelectValue} onChange={this.addFormSelect.bind(this)}>        
                                                                        <option value="teacher">Учитель</option>
                                                                        <option value="student">Студент</option>
                                                                </select>
                                                        </p>
                                                        <p className="form-add-person__string">
                                                                <label className="form-add-person__label form-label" htmlFor="input-university">Введите университет</label>
                                                                <input className="form-add-person__input form-input" id="input-university" type = "text" placeholder="Введите университет" value={this.state.appUniversity} onChange={this.addForminputUnivercityOnChange.bind(this)}/>
                                                        </p>
                                                        <p className="form-add-person__string">
                                                                <label className="form-add-person__label form-label" htmlFor="input-exp-or-course">Введите опыт или курс(число)</label>
                                                                <input className="form-add-person__input form-input" id="input-exp-or-course" type = "text" placeholder="Опыт или курс(число)" value={this.state.appExpOrCourse} onChange={this.addForminputExpOrCourseOnChange.bind(this)}/>
                                                        </p>
                                                        <p className="form-add-person__string">
                                                                <label className="form-add-person__label form-label" htmlFor="input-birthDate">Введите дату рождения (в формате ГГГГ, ММ, ДД)</label>
                                                                <input className="form-add-person__input form-input" id="input-birthDate" type = "text" placeholder="1998, 10, 2" value={this.state.appBirthDate} onChange={this.addForminputBirthDateOnChange.bind(this)}/>
                                                        </p>
                                                        <p className="form-add-person__string">
                                                                <input className="form-add-person__button form-button" type = "submit" id="add-person-button" name="add-person-button" value="Добавить" onClick = {this.addPerson.bind(this)}/>
                                                                <input className="form-add-person__button form-button" type = "button" id="add-person-cancel" name="add-person-cancel" value="Отмена" onClick = {this.cancelAddPerson.bind(this)}/>
                                                        </p>
                                                </form>   
                                                </div>
                                        </div>         
                                </div>;
        }
        inputFullnameOnChange(event) {
		this.setState({valueForFindOrDrop: event.target.value});
        }
        addForminputFullnameOnChange(event){
                this.setState({appFullName: event.target.value});
        }
        addForminputIDOnChange(event){
                this.setState({appID: event.target.value});
        }
        addForminputUnivercityOnChange(event){
                this.setState({appUniversity: event.target.value});
        }
        addForminputExpOrCourseOnChange(event){
                this.setState({appExpOrCourse: event.target.value});
        }
        addForminputBirthDateOnChange(event){
                this.setState({appBirthDate: event.target.value});
        }
        addFormSelect(event) {
		this.setState({addFormSelectValue: event.target.value || event.target.defaultValue});
	}
        openFormAdd(){
                this.setState({formIsVisible: true});
        }
        updatePage(){
                this.dataset.list(this.state.page, this.limit)
                .then((list)=>
                {
                        this.state.schoolList.splice(0,this.state.schoolList.length);
                        list.forEach((item) => {
                                this.enroll(item);
                        });
                        return list;
                })
        }

        /**
         * удаление человека со страницы и из БД
         */
        dropPerson(event){
                let fullNameForDelete = this.state.valueForFindOrDrop;
                let idForDelete = this.drop(fullNameForDelete);
                event.stopPropagation();
                
                this.dataset.delete(idForDelete)
                .then(()=>{
                        this.updatePage();
                })

        }
        /**
         * удаление человека
         *  @returns {Object} - сам объект школы уже без удаленного человека
         */
        drop(fullName) {
                // debugger;
                let dropIndex = this.state.schoolList.findIndex((student) => student.props.fullName === fullName); 
                // console.log(dropIndex);
                if (dropIndex > -1) {
                        let deleteId = this.state.schoolList[dropIndex].props.id;
                        this.state.schoolList.splice(dropIndex,1);
                        this.setState({schoolList: this.state.schoolList});
                        return deleteId;
                }
                else {
                        alert("Человек с введенными Вами ФИО отсутствует на этой странице, возможно он находится на другой");
                        return -1;
                }
                
        }
        /**
         * поиск человека на текущей странице (не глобальный поиск, ищет только среди отображенных элементов)
         */
        findOnCurrentPage(){
                let fullNameForFind = this.state.valueForFindOrDrop;
                let student = this.state.schoolList.find((student) => student.props.fullName === fullNameForFind);
                if (student){
                    //    student.setState({popupIsActive: true}); Так нельзя делать, увы       
                }
                else {
                        alert("Человек с введенными Вами ФИО отсутствует на этой странице, возможно он находится на другой");
                }
        }

        prevPage(event) {
                if (this.state.page>=2) {
                        this.state.page--;
                        this.setState({page: this.state.page});
                        event.stopPropagation();
                        this.updatePage();
                }
                
        }
        nextPage(event) {
                    this.state.schoolList.splice(0,this.state.schoolList.length);
                    this.state.page++;
                    this.dataset.list(this.state.page, this.limit)
                        .then((list)=>
                        {
                                if (list.length>0){
                                        this.setState({page: this.state.page});
                                        list.forEach((item) => {
                                                this.enroll(item);
                                        });
                                }
                                else 
                                        this.state.page--; 
                                return list;
                        })                    
                    event.stopPropagation();
        }
        addPerson(event){
                event.preventDefault();
                event.stopPropagation();
                let data = {}
                if(!this.state.addFormSelectValue){ //если не менялся селект, и значит тип это учитель

                    data = {
                        id: this.state.appID || 1,
                        type: this.state.addFormSelectValue || 'teacher',
                        fullName: this.state.appFullName || '',
                        university: this.state.appUniversity || '',
                        experience: this.state.appExpOrCourse || '',
                        birthDate: this.state.appBirthDate || '',
                        photoUrl: '../img/ava0.jfif'
                    };  
                }
                else {
                    data = {
                        id: this.state.appID || 1,
                        type: this.state.addFormSelectValue || 'student',
                        fullName: this.state.appFullName || '',
                        university: this.state.appUniversity || '',
                        course: this.state.appExpOrCourse || '',
                        birthDate: this.state.appBirthDate || '',
                        photoUrl: '../img/ava0.jfif'
                    }; 
                }
                this.dataset.create(data)
                .then(()=>
                {
                        this.updatePage();
                        this.setState({formIsVisible: false});
                })
                
        }
        cancelAddPerson(event){
                event.stopPropagation();
                this.setState({formIsVisible: false});
                }
        }