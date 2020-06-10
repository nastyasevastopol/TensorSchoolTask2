import {Person} from './componentsLib.js';
import {Popup} from './componentsLib.js';
import React from 'react';
export class Teacher extends Person{
                        constructor(props) {
                                super(props);
                                this.experience = this.props.experience;
                                this.type = 'teacher';
                        }
                        /**
                         * функция-getter опыта
                         * @returns {string} - возвращает строку информации об опыте в формате "Опыт количество лет лет", например "Опыт 2 года"
                         */
                        get experienceStr() {
                                return "Опыт " + this.experience + " года";
                        }
                        renderPopup(){
                                let popup;
                                if (this.state.popupRight){
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
                                                experience = {this.experienceStr}
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
                                                experience = {this.experienceStr}
                                                deletePopup={this.deletePopup.bind(this)}/> : 
                                        <div></div>;
                                return popup;
                        }
                        render() {
                                let popup=this.renderPopup();
                                return <div className="column" id={this.state.id} onClick={this.openCard.bind(this)} >
                                        <img className="column__photo" src={this.photoUrl} alt="Фото + {this.fullName}"/>
                                        <div className="column__title" title="Фамилия Имя">{this.state.fullName}</div>
                                        <div className="column__subtitle" title="Опыт">{this.experienceStr}</div>
                                        {popup}
                                </div>
                }
                }