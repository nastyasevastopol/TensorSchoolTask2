import {Person} from './componentsLib.js';
import {Popup} from './componentsLib.js';
import React from 'react';
// import {Popup} from './componentsLib.js';
export class Student extends Person{
                        constructor(props) {
                                super(props);
                                this.course = props.course || '';
                                this.type = 'student'
                                
                        }
                        /**
                         * функция-getter образования
                         * @returns {string} - возвращает строку информации об образовании в формате "Университет курс лет", например "СевГУ 2 курс"
                         */
                        get educationStr() {
                                if ((!this.university)&&(!this.course)){
                                        return '';
                                }
                                else {
                                        return (this.university ||'') + ", " + this.course  + " курс";
                                }
                        }
                        renderPopup(){
                                let popup;
                                if (this.state.popupRight){
                                        // console.log(this.state.type);
                                        popup = this.state.popupIsActive ? 
                                        <Popup 
                                                popupState={ true } 
                                                type = {this.type}
                                                rightOrLeftPopup={ true } 
                                                fullName={this.state.fullName} 
                                                university={this.university} 
                                                birthDateStr={this.birthDateStr} 
                                                photoUrl={this.photoUrl} 
                                                age={this.age} 
                                                educationStr = {this.educationStr}
                                                deletePopup={this.deletePopup.bind(this)}/> : 
                                        <div></div>;
                                }
                                else
                                        popup = this.state.popupIsActive ? 
                                        <Popup 
                                                popupState={ true } 
                                                type = {this.type}
                                                rightOrLeftPopup={ false } 
                                                fullName={this.state.fullName} 
                                                university={this.university} 
                                                birthDateStr={this.birthDateStr} 
                                                photoUrl={this.photoUrl} 
                                                age={this.age} 
                                                education = {this.educationStr}
                                                deletePopup={this.deletePopup.bind(this)}/> : 
                                        <div></div>;
                                return popup;
                        }
                        render() {
                                let popup=this.renderPopup();
                                // this.popup=popup;
                                return <div className="column" id={this.state.id} onClick={this.openCard.bind(this)} >
                                                <img className="column__photo" src={this.photoUrl} alt="Фото + {this.fullName}"/>
                                                <div className="column__title" title="Фамилия Имя">{this.state.fullName}</div>
                                                <div className="column__subtitle" title="Образование">{this.educationStr}</div>
                                                {popup}
                                        </div>
                        }
                }


