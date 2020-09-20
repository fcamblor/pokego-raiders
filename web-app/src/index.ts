import './components/_components';
import './pages/_pages';
import {APP} from "./core/App";


APP.start({
    defaultLang: 'fr',
    routes: [
        {when: '/registration', html: '<registration-page>'},
        {when: '/button', html: '<action-button>'}
    ],
    defaultRoute: '/registration'
}).then(() => {
    console.log("App started !");
});
