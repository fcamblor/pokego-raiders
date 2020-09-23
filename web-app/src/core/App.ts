import type {RoutingDefinitions} from "./AppRouter";
import {States} from "./States";
import {AppRouter} from "./AppRouter";
import type {LanguageCode} from "../models/I18nMessages";
import {Optional} from "../utils/Optional";
import type {User} from "../models/User";


interface StartOpts {
    defaultLang: LanguageCode;
    routes: RoutingDefinitions[];
    defaultRoute: string;
}

export class Application {
    static readonly INSTANCE = new Application();

    private router: AppRouter;

    constructor() {
        this.router = new AppRouter();
    }

    public start(opts: StartOpts): Promise<void> {
        return States.start({ defaultLang: opts.defaultLang }).then(() => {
            this.router.setupRouter(opts.routes, opts.defaultRoute);
        });
    }

    currentUser(): Optional<User> {
        return Optional.fromNullable(States.currentUser);
    }
}

export const APP = Application.INSTANCE;