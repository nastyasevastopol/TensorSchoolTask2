import React from 'react';// import {Component} from './componentsLib.js';
export class Header extends React.Component {
	//       constructor(props) {
	//               super(props);
	//               // this.props=props;
	//  }
	      render() {
	              return  <div className  ="information">
	                              <img className="information__logo" src="img/logo.jpg" alt="Логотип"/>
	                              <div className="information__title title" title={this.props.title}>{this.props.title}</div>
	                              <div className="information__subtitle" title={this.props.description}>{this.props.description}</div>
	                      </div>
	      }
	}
