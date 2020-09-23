import './components/_components';
import './pages/_pages';
import {APP} from "./core/App";


APP.start({
    defaultLang: 'fr',
    routes: [
        {when: '/welcome', redirect: () => APP.currentUser().map(() => '/streams').orElse('/registration') },
        {when: '/registration', html: '<registration-page></registration-page>'},
        {when: '/communities', html: '<communities-list-page></communities-list-page>'}
    ],
    defaultRoute: '/welcome'
}).then(() => {
    console.log("App started !");
});
