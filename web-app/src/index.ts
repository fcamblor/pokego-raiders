import {ActionButton} from './components/button';
import {AppRouter} from "./core/AppRouter";
import './pages/_pages';

new AppRouter().setupRouter([
    { when: '/registration', html: '<registration-page>' },
    { when: '/button', html: '<action-button>' }
], '/registration');

console.log("App started !", ActionButton.BLAH);
