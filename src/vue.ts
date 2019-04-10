import Vue from "vue";
import VueParse from "./VueParse";
import DollarParse from "./DollarParse";

declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        parse?: VueParse;
    }
}

declare module "vue/types/vue" {
    interface Vue {
        $parse: DollarParse;
    }
}
