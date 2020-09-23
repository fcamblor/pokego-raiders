
interface AbstractRouting {
    when: string;
}
interface HtmlViewRouting extends AbstractRouting{
    html: string;
}
interface RedirectRouting extends AbstractRouting{
    redirect: () => string;
}

export type RoutingDefinition = HtmlViewRouting | RedirectRouting;

export class AppRouter {
    private $appPage: HTMLElement|null = null;

    public setupRouter(routingDefs: RoutingDefinition[], defaultRoute: string) {
        this.$appPage = document.getElementById("app-page");

        window.addEventListener("hashchange", () => {
            this.handleHashChanges(routingDefs);
        });

        // Initializing hash to default page
        if(!location.hash) {
            window.location.href = `#${defaultRoute}`;
        } else {
            window.dispatchEvent(new Event('hashchange'));
        }
    }

    private handleHashChanges(routingDefs: RoutingDefinition[]) {
        const route = location.hash.substr("#".length);
        const routeMatched = routingDefs.some(routingDef => {
            let regexp = new RegExp(`^${routingDef.when}$`);
            let execResult = regexp.exec(route);
            if(execResult) {
                if(AppRouter.isHtmlViewRouting(routingDef)) {
                    this.$appPage!.innerHTML = routingDef.html;
                } else if(AppRouter.isRedirectRouting(routingDef)) {
                    location.hash = routingDef.redirect();
                }
                return true;
            }
            return false;
        });

        if(!routeMatched) {
            console.warn(`No route matched for route ${route}`);
        }
    }

    private static isHtmlViewRouting(route: AbstractRouting): route is HtmlViewRouting {
        return !!(route as HtmlViewRouting).html;
    }
    private static isRedirectRouting(route: AbstractRouting): route is RedirectRouting {
        return !!(route as RedirectRouting).redirect;
    }
}