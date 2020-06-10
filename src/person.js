// import {Popup} from './componentsLib.js';
import React from 'react';
const mountsArr = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

export class Person extends React.Component{
                        static popupStack = [];
                        constructor(props) {
                                super(props);
                                this.university = this.props.university || '';
                                this.birthDate = new Date(this.props.birthDate) || new Date();
                                this.photoUrl = this.props.photoUrl || '';
                                this.type = 'person';
                                this.popup = undefined;
                                this.state = {
                                        id: this.props.id || 1,
                                        fullName: this.props.fullName || '',
                                        popupIsActive:false, 
                                        popupRight: false};    
                        }
                        /**
                         * функция-getter возраста
                         * @returns {string} - возвращает строку даты рождения в формате "число месяц", например "1 июня"
                         */
                        get birthDateStr() {
                                return `${this.birthDate.getDate()} ${mountsArr[this.birthDate.getMonth()]}`;
                        }
                        /**
                         * функция-getter возраста
                         * @returns {number} - количество полных лет на текущий момент
                         */
                        get age() {
                                let today = new Date();
                                let age = today.getFullYear() - this.birthDate.getFullYear() ;
                                let m = today.getMonth() - this.birthDate.getMonth();
                                if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
                                age--;
                                }
                                return age;
                        }
                        /**
                         * открывает карточку человека, заранее закрывая остальные
                         */
                        openCard(e){
                                //определение положения элемента (открывать попап справа или слева)
                                const parent = e.target.parentNode.parentNode.getBoundingClientRect();
                                const element = e.target.getBoundingClientRect();
                                const x = element.left - parent.left;
                                if (x>parent.width/2){
                                        this.setState({popupIsActive: true, popupRight: true});
                                }
                                this.setState({popupIsActive: true});
                            }

                        deletePopup(event) {
                                this.setState({popupIsActive: false});
                                event.stopPropagation();
                        }
                }

