import {Component} from './componentsLib.js';
export class Header extends Component {
    render({title, description}) {
        return `<header>
                        <div class="information">
                            <img class="information__logo" src="img/logo.jpg" alt="Логотип ${title}"/>
                            <div class="information__title title" title="${title}">${title}</div>
                            <div class="information__subtitle" title="${description}">${description}</div>
                        </div>
                </header>`;
    }
}
