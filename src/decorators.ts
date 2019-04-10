import Parse from "parse";

export function prop() {
    return <T extends Parse.Object>(target: T, property: string): any => {
        return {
            set(value) {
                this.set(property, value);
            },
            get() {
                return this.get(property);
            }
        };
    };
}

export function model() {
    return <T extends typeof Parse.Object>(target: T): any => {
        const original = target;

        var f: any = function(...args) {
            const instance = new original(...args);
            instance.className = target.name;
            return instance;
        };

        f.prototype = original.prototype;

        Parse.Object.registerSubclass(target.name, f);

        return f;
    };
}
