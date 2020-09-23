import './components/_components';
import './pages/_pages';
import {APP} from "./core/App";


APP.start({
    defaultLang: 'fr',
    routes: [
        {when: '/registration', html: '<registration-page></registration-page>'}
    ],
    defaultRoute: '/registration'
}).then(() => {
    console.log("App started !");
});
