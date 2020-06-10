import React from 'react';
export class Popup extends React.Component {
        constructor(props) {
                super(props);
                        let strAction1='';
                        switch(this.props.type) {
                        case 'student':
                                strAction1 = 'Учится';
                                break;
                        case 'teacher': 
                                strAction1 = 'Работает';
                                break;
                        }
                        this.state = {popupState: props.popupState, right: props.rightOrLeftPopup, strAction: strAction1 };
        }
        render(){
                let strClassName='info-window info-window_active';
                if (this.state.right==true){
                        strClassName='info-window info-window_active info-window_active-right'
                }
                if (this.state.popupState) {
                return <div className={strClassName}>
                                <img className="info-window__close-button" src="../img/close.png" alt="кнопка закрыть" onClick={(e) => {this.props.deletePopup(e); this.setState({popupState: false})}}/>
                                
                                <div className="info-window__container">
                                        <div className="info-window__data">
                                        <div className="info-window__title">{this.props.fullName}</div>
                                        <div className="info-window__row">
                                                <p className="info-window__subtitle">День Рождения</p>
                                                <p className="info-window__information">{this.props.birthDateStr +", "+ this.props.age + " лет"}</p>
                                        </div>
                                        <div className="info-window__row">
                                                <p className="info-window__subtitle info-window__subtitle_education">{this.state.strAction}</p>
                                                <p className="info-window__information info-window__information_education">{this.props.education || this.props.experience}</p>
                                        </div>
                                        </div>
                                        <img className="info-window__photo" src={this.props.photoUrl} alt="Фото + {this.props.fullName}"/>
                                </div>
                        </div>;
                }
                else return <div></div>
        }
        closePopup(){
                this.setState({popupState: false});
                this.props.deletePopup.bind(null);
        }
}