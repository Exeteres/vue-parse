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

    public destroy() {
        this.reqs.forEach(x => x.destroy());
    }

    public enumerate(): string[] {
        return this.reqs.map(x => x.name);
    }

    async wait() {
        await Promise.all(this.reqs.map(x => x.promise));
    }

    get logIn() {
        return Parse.User.logIn.bind(Parse.User);
    }

    get logOut() {
        return Parse.User.logOut;
    }

    get user() {
        return Parse.User.current();
    }

    get run() {
        return Parse.Cloud.run;
    }

    get getJobsData(): () => Promise<any> {
        return Parse.Cloud["getJobsData"];
    }

    get startJob(): (name: string, data?: any) => Promise<string> {
        return Parse.Cloud["startJob"];
    }

    get getJobStatus(): (id: string) => Promise<any> {
        return Parse.Cloud["getJobStatus"];
    }
}
