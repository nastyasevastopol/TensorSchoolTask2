import React from 'react';
import {Header, School} from './componentsLib.js';
// import {DataSet} from './dataSet.js'; 

class App extends React.Component{
                constructor(container){
                super(container);
                this.school = new School();
        }
        render() {

                return <div>
                                <Header title='Tensor School' description='Это страница школы Тензор в городе Уфа. Тут вы можете познакомиться с нашими учениками и посмотреть темы занятий.' />
                                        
                                <div id="container">
                                        <School /> 
                                        
                                </div>
                                        
                                        
                        </div>;    
        }
}


export default App;
