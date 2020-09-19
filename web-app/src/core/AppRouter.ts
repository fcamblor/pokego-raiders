
interface RoutingDefinitions {
    when: string;
    html: string;
}

export class AppRouter {
    private $appPage: HTMLElement|null = null;

    public setupRouter(routingDefs: RoutingDefinitions[], defaultRoute: string) {
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

    private handleHashChanges(routingDefs: RoutingDefinitions[]) {
        const route = location.hash.substr("#".length);
        const routeMatched = routingDefs.some(routingDef => {
            let regexp = new RegExp(`^${routingDef.when}$`);
            let execResult = regexp.exec(route);
            if(execResult) {
                this.$appPage!.innerHTML = routingDef.html;
                return true;
            }
            return false;
        });

        if(!routeMatched) {
            console.warn(`No route matched for route ${route}`);
        }
    }
}