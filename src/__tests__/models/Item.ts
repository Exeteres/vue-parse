import { prop, model } from "../..";
import Parse from "parse";

@model("Item")
export default class Item extends Parse.Object {
    @prop() p: string;
}
