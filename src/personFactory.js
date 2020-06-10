import {Student, Teacher} from './componentsLib.js';
import React from 'react';// import {Component} from './componentsLib.js';
export class PersonFactory {
                        /**
                         * Создание людей на фабрике)))
                         * @param {String} type тип создаваемого человека
                         * @param {Object} options объект со всеми полями будущего студента или преподавателя 
                         *  @returns {Object} - объект студента с переданными полями или учителя в зависимости от типа
                         */
                            create(type, props) {
                                switch(type) {
                                    case 'student':{
                                        return <Student 
                                        id = {props.id} 
                                        key = {props.id} 
                                        fullName = {props.fullName} 
                                        university = {props.university} 
                                        birthDate = {props.birthDate} 
                                        photoUrl = {props.photoUrl}
                                        course = {props.course}/>;
                                }
                                    case 'teacher': 
                                        return <Teacher 
                                        id = {props.id} 
                                        key = {props.id} 
                                        fullName = {props.fullName} 
                                        university = {props.university} 
                                        birthDate = {props.birthDate} 
                                        photoUrl = {props.photoUrl}
                                        experience = {props.experience}/>;
                                }
                            }
                        }
