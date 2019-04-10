import Parse from "parse";
import ParseRequest from "./ParseRequest";

export default class DollarParse {
    private reqs: ParseRequest[];

    constructor(reqs: ParseRequest[]) {
        this.reqs = reqs;
    }

    public launch() {
        this.reqs.forEach(x => {
            x.dispatch();
            x.setupWatchers();
            x.setupSubscription();
        });
    }

    public enumerate(): string[] {
        return this.reqs.map(x => x.name);
    }

    async wait() {
        await Promise.all(this.reqs.map(x => x.promise));
    }

    get logIn() {
        return Parse.User.logIn;
    }

    get logOut() {
        return Parse.User.logOut;
    }

    get user() {
        return Parse.User.current();
    }
}