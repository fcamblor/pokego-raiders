import type {RoutingDefinitions} from "./AppRouter";
import {AppRouter} from "./AppRouter";

interface StartOpts {
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
        this.router.setupRouter(opts.routes, opts.defaultRoute);
        return Promise.resolve(null);
    }
}

export const APP = Application.INSTANCE;